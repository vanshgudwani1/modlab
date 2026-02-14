import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { prompt, style } = data;

        // Simulate AI delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const mockImageUrl = `/ai-outputs/mock_${Math.floor(Math.random() * 5)}.png`;

        // Create a dummy user if not auth (Review this in prod)
        // For now, ensuring a user exists to link to.
        let user = await prisma.user.findFirst();
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: 'demo@modlab.ai',
                    name: 'Agent_Demo',
                    role: 'user'
                }
            });
        }

        const creation = await prisma.creation.create({
            data: {
                userId: user.id,
                imageUrl: mockImageUrl,
                style,
                prompt,
                isPublic: false
            }
        });

        return NextResponse.json({
            success: true,
            imageUrl: mockImageUrl,
            id: creation.id
        });
    } catch (error) {
        console.error('Generation error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to generate image' },
            { status: 500 }
        );
    }
}
