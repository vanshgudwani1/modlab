
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to create product...');
        const product = await prisma.product.create({
            data: {
                name: 'Test Product JS',
                slug: 'test-product-js-' + Date.now(),
                price: 99.99,
                stock: 10,
                description: 'Created via JS script',
                image: '', // Test empty string image
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
