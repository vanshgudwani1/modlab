
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@modlab.com'; // Adjust if checking a different user
    const password = 'modlab123';    // Adjust to the password you are trying

    console.log(`Checking user: ${email}`);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        console.log('❌ User not found in database.');
        return;
    }

    console.log('✅ User found:', user.id);
    console.log('   Role:', user.role);
    console.log('   Password Hash:', user.password);

    if (user.password) {
        const match = await bcrypt.compare(password, user.password);
        console.log(`   Password match for '${password}':`, match ? '✅ YES' : '❌ NO');
    } else {
        console.log('   ❌ No password set for user.');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
