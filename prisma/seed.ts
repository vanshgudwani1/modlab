import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Cleanup
    await prisma.order.deleteMany()
    await prisma.post.deleteMany()
    await prisma.creation.deleteMany()
    await prisma.product.deleteMany()
    await prisma.user.deleteMany()

    // Admin
    const admin = await prisma.user.create({
        data: {
            email: 'admin@modlab.ai',
            name: 'COMMANDER_ZERO',
            role: 'admin',
        }
    })

    // Posts
    await prisma.post.create({
        data: {
            userId: admin.id,
            title: 'PROTOCOL_V2_INITIATED',
            content: 'The new fabrication facility is online. Expect faster turnarounds on all custom orders.',
            category: 'announcement',
        }
    })

    await prisma.post.create({
        data: {
            userId: admin.id,
            title: 'Best paint for PLA?',
            content: 'Looking for advice on priming the new experimental resin batch.',
            category: 'forum',
        }
    })

    // Products
    await prisma.product.create({
        data: {
            name: 'Cyber_Ninja_MK1',
            slug: 'cyber-ninja-mk1',
            image: '/products/cyber-ninja-mk1_front.jpg',
            description: 'Stealth operative with neon katana accents. High articulation.',
            price: 12000.00,
            discountPrice: 9500.00,
            category: 'figures',
            stock: 50,
            isLimited: false,
            isFeatured: true,
        }
    })

    await prisma.product.create({
        data: {
            name: 'Heavy_Assault_Droid',
            slug: 'heavy-assault-droid',
            image: '/products/heavy-assault-droid_front.jpg',
            description: 'Tank-class support unit. Includes dual rotary cannons.',
            price: 180.00,
            stock: 30,
            isLimited: false,
        }
    })

    // Drop
    await prisma.product.create({
        data: {
            name: 'GOLDEN_VANGUARD_LE',
            slug: 'golden-vanguard-le',
            image: '/drops/golden-vanguard_thumb.jpg',
            description: 'Commemorative edition. Real gold leaf detailing.',
            price: 50000.00,
            category: 'custom',
            stock: 100,
            maxSupply: 100,
            isLimited: true,
            dropDate: new Date(Date.now() + 86400000), // Tomorrow
        }
    })

    console.log('Database seeded!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
