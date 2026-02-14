import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";

type CreationWithUser = Prisma.CreationGetPayload<{
    include: { user: true };
}>;

export default async function CommunityPage() {
    const creations: CreationWithUser[] = await prisma.creation.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    });

    return (
        <div className="space-y-8">
            <h2 className="text-4xl font-black italic uppercase border-l-8 border-cyan-400 pl-4">
                HUB_TRANSMISSIONS
            </h2>

            {creations.length === 0 ? (
                <div className="p-12 text-center border-[4px] border-black border-dashed opacity-50 font-mono">
                // NO_SIGNALS_DETECTED
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {creations.map((creation) => (
                        <Link href={`/result/${creation.id}`} key={creation.id} className="group">
                            <div className="comic-box p-3 hover:rotate-1 hover:shadow-[16px_16px_0px_#ec008c] transition-all">
                                <div className="aspect-square bg-neutral-900 border-2 border-black overflow-hidden relative">
                                    <img src={creation.imageUrl} alt={creation.prompt || 'Creation'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-hard-light"></div>
                                </div>
                                <div className="mt-3 flex justify-between items-end">
                                    <div>
                                        <p className="font-black italic uppercase text-lg line-clamp-1">{creation.style}</p>
                                        <p className="font-mono text-xs text-neutral-500">OP: {creation.user ? creation.user.name : 'Unknown'}</p>
                                    </div>
                                    <div className="text-xs font-bold bg-yellow-400 px-2 border border-black">
                                        V1.0
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
