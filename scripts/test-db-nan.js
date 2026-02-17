
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to create product with NaN price...');
        const product = await prisma.product.create({
            data: {
                name: 'Test Product NaN',
                slug: 'test-product-nan-' + Date.now(),
                price: NaN, // Invalid float
                stock: 10,
                description: 'Created via JS script',
                image: '',
                isLimited: false,
            },
        });
        console.log('Product created successfully:', product);
    } catch (e) {
        console.error('Error creating product:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
