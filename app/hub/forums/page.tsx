import { prisma } from "@/lib/prisma";

export default async function ForumsPage() {
    const posts = await prisma.post.findMany({
        where: { category: 'forum' },
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black italic uppercase border-l-8 border-yellow-400 pl-4">
                    Field_Discussions__
                </h2>
                <button className="bg-black text-white px-6 py-2 font-bold uppercase border-[2px] border-white shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                    New_Topic +
                </button>
            </div>

            <div className="space-y-4">
                {posts.length === 0 ? (
                    <div className="p-12 text-center border-[4px] border-black border-dashed opacity-50 font-mono">
                    // CHANNEL_SILENT
                    </div>
                ) : (
                    posts.map(post => (
                        <div key={post.id} className="bg-white border-[4px] border-black p-6 shadow-[8px_8px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] transition-all cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-black italic uppercase mb-2">{post.title}</h3>
                                    <p className="font-mono text-sm text-neutral-600 line-clamp-2">{post.content}</p>
                                </div>
                                <span className="font-mono text-xs bg-neutral-200 px-2 py-1">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="w-6 h-6 bg-cyan-400 rounded-full border border-black"></div>
                                <span className="font-bold text-xs uppercase">{post.user.name}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
