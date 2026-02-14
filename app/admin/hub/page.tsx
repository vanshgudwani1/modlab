import { prisma } from "@/lib/prisma";
import { Trash2, AlertTriangle } from "lucide-react";
import { deletePost } from "@/app/lib/actions";

type PostWithUser = {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: Date;
    user: { name: string | null };
};

export default async function AdminHubPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    });

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase text-white">Comms_Moderation</h2>

            <div className="space-y-4">
                {posts.map((post: PostWithUser) => (
                    <div key={post.id} className="bg-neutral-800 p-4 border border-neutral-700 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 ${post.category === 'announcement' ? 'bg-pink-500 text-black' : 'bg-neutral-600 text-white'}`}>
                                    {post.category}
                                </span>
                                <span className="text-neutral-500 text-xs font-mono">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-white font-bold text-lg">{post.title}</h3>
                            <p className="text-neutral-400 text-sm mt-1 line-clamp-2">{post.content}</p>
                            <p className="text-neutral-500 text-xs mt-2 uppercase">OP: {post.user.name}</p>
                        </div>

                        <form action={async () => {
                            'use server';
                            await deletePost(post.id);
                        }}>
                            <button className="text-red-500 hover:bg-red-500/10 p-2 rounded transition-colors">
                                <Trash2 size={20} />
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}
