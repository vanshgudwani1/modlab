
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@modlab.ai';
    const password = 'admin123'; // Default password (min 6 chars)
    const name = 'COMMANDER_ZERO';

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: 'admin',
        },
        create: {
            email,
            name,
            password: hashedPassword,
            role: 'admin',
        },
    });

    console.log(`
✅ Admin user ready:
   Email: ${email}
   Password: ${password}
   Role: ${user.role}
`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
