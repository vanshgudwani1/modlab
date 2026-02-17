'use server'

import { signIn, signOut, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

// Auth Actions
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function register(prevState: { message: string; success: boolean }, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
        return { message: 'Missing fields', success: false };
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'user'
            }
        });
        return { message: 'Account created!', success: true };
    } catch (e) {
        return { message: 'Email already exists', success: false };
    }
}

export async function logout() {
    await signOut();
}

// Product Actions
export async function getProductById(id: string) {
    return await prisma.product.findUnique({ where: { id } });
}

export async function createProduct(prevState: { message: string; success: boolean }, formData: FormData) {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string);

    if (isNaN(price)) {
        return { message: 'Invalid price. Please enter a valid number.', success: false };
    }
    if (isNaN(stock)) {
        return { message: 'Invalid stock. Please enter a valid number.', success: false };
    }
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;
    const isLimited = formData.get('isLimited') === 'on';

    let imageUrl = '';

    try {
        if (imageFile && imageFile.size > 0) {
            const { put } = await import('@vercel/blob');
            const blob = await put(imageFile.name, imageFile, {
                access: 'public',
            });
            imageUrl = blob.url;
        } else {
            const imageString = formData.get('image');
            if (typeof imageString === 'string') {
                imageUrl = imageString;
            }
        }

        await prisma.product.create({
            data: {
                name,
                slug,
                price,
                stock,
                description,
                image: imageUrl,
                isLimited,
                dropDate: isLimited ? new Date() : null
            }
        });
        revalidatePath('/admin/products');
        return { message: 'Product Deployed!', success: true };
    } catch (e: any) {
        console.error("Create Product Error:", e);
        if (e.code === 'P2002' && e.meta?.target?.includes('slug')) {
            return { message: 'Product with this ID (slug) already exists.', success: false };
        }
        return { message: `Failed to create product: ${e.message}`, success: false };
    }
}

export async function updateProduct(prevState: { message: string; success: boolean }, formData: FormData) {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string);
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;
    const isLimited = formData.get('isLimited') === 'on';

    if (!id) {
        return { message: 'Product ID missing', success: false };
    }

    if (isNaN(price)) {
        return { message: 'Invalid price. Please enter a valid number.', success: false };
    }
    if (isNaN(stock)) {
        return { message: 'Invalid stock. Please enter a valid number.', success: false };
    }

    try {
        const dataToUpdate: any = {
            name,
            slug,
            price,
            stock,
            description,
            isLimited,
            dropDate: isLimited ? new Date() : null // Reset or set drop date? Logic says if limited, it has a date.
        };

        if (imageFile && imageFile.size > 0) {
            const { put } = await import('@vercel/blob');
            const blob = await put(imageFile.name, imageFile, {
                access: 'public',
            });
            dataToUpdate.image = blob.url;
        }

        await prisma.product.update({
            where: { id },
            data: dataToUpdate
        });

        revalidatePath('/admin/products');
        revalidatePath(`/admin/products/${id}`); // Validation
        return { message: 'Product Updated Successfully!', success: true };
    } catch (e: any) {
        console.error("Update Product Error:", e);
        if (e.code === 'P2002' && e.meta?.target?.includes('slug')) {
            return { message: 'Product with this ID (slug) already exists.', success: false };
        }
        return { message: `Failed to update product: ${e.message}`, success: false };
    }
}



export async function deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin/products');
}

// Hub Actions
export async function createPost(prevState: { message: string, errors?: any }, formData: FormData) {
    // Implementation pending
    return { message: "Not implemented" };
}

export async function deletePost(id: string) {
    await prisma.post.delete({ where: { id } });
    revalidatePath('/admin/hub');
}

export async function addComment(prevState: { message: string, success: boolean, errors?: any }, formData: FormData) {
    return { message: "Not implemented", success: false };
}

// Order Actions
export async function placeOrder(prevState: { message: string, success: boolean }, formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) {
        return { message: 'Authentication required for clearance.', success: false };
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
        return { message: 'User verification failed.', success: false };
    }

    const cartData = formData.get('cartData');
    if (!cartData) {
        return { message: 'Manifest empty.', success: false };
    }

    try {
        const items = JSON.parse(cartData as string);

        // Transaction to ensure atomic order creation and stock adjustment
        await prisma.$transaction(async (tx) => {
            for (const item of items) {
                // Check stock
                const product = await tx.product.findUnique({ where: { id: item.id } });
                if (!product || product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for ${item.name}`);
                }

                // Decrement stock
                await tx.product.update({
                    where: { id: item.id },
                    data: { stock: { decrement: item.quantity } }
                });

                // Create Order
                await tx.order.create({
                    data: {
                        userId: user.id,
                        productId: item.id,
                        quantity: item.quantity,
                        status: 'pending' // pending -> ship
                    }
                });
            }
        });

        // Simulate delay for "Secure Processing"
        await new Promise(resolve => setTimeout(resolve, 2000));

        return { message: 'Order Confirmed', success: true };
    } catch (e: any) {
        console.error(e);
        return { message: e.message || 'Transaction Failed', success: false };
    }
}
