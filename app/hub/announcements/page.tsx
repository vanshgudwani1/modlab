import { prisma } from "@/lib/prisma";

export default async function AnnouncementsPage() {
    const posts = await prisma.post.findMany({
        where: { category: 'announcement' },
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    });

    return (
        <div className="space-y-8">
            <h2 className="text-4xl font-black italic uppercase border-l-8 border-pink-500 pl-4">
                Official_Intel__
            </h2>

            <div className="space-y-8">
                {posts.length === 0 ? (
                    <div className="bg-black text-white p-12 text-center border-[4px] border-pink-500 border-dashed font-mono">
                    // AWAITING_COMMAND_UPLINK
                    </div>
                ) : (
                    posts.map(post => (
                        <div key={post.id} className="bg-black text-white border-[6px] border-pink-500 p-8 shadow-[12px_12px_0px_#000] relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-pink-500 text-black px-4 py-1 font-black uppercase text-xs">
                                PRIORITY_ONE
                            </div>
                            <h3 className="text-3xl font-black italic uppercase mb-4 text-cyan-400">{post.title}</h3>
                            <p className="font-mono text-neutral-300 leading-relaxed max-w-2xl">{post.content}</p>
                            <div className="mt-8 border-t border-neutral-800 pt-4 font-mono text-xs text-neutral-500 uppercase">
                                Authorized By: {post.user.name} // {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
