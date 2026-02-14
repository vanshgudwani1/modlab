import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type UserWithData = Prisma.UserGetPayload<{
    include: {
        creations: true;
        orders: { include: { product: true } };
    };
}>;

export default async function ProfilePage() {
    // Mock Auth: Get the first user (Admin or Demo)
    const user: UserWithData | null = await prisma.user.findFirst({
        include: {
            creations: { orderBy: { createdAt: 'desc' } },
            orders: { include: { product: true }, orderBy: { createdAt: 'desc' } }
        }
    });

    if (!user) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h1 className="text-4xl">ACCESS_DENIED // LOGIN_REQUIRED</h1>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-10">
            <main className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="bg-black text-white p-8 border-[6px] border-cyan-400 shadow-[12px_12px_0px_#000] flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 bg-neutral-800 border-4 border-white flex items-center justify-center relative overflow-hidden">
                        <span className="font-black text-4xl opacity-20 italic">IMG</span>
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-transparent"></div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-block bg-yellow-400 text-black px-2 py-1 font-mono text-xs font-bold uppercase mb-2">
                            Level 5 Operative
                        </div>
                        <h1 className="text-5xl font-black italic uppercase leading-none">{user.name}</h1>
                        <p className="font-mono text-neutral-400 uppercase">{user.email} // ID: {user.id.slice(-8)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-mono text-white mb-1">CREDITS</p>
                        <p className="text-4xl font-black italic text-cyan-400">2,450</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Creations */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-black italic uppercase border-b-4 border-black pb-2">
                            My_Fabrications
                        </h2>
                        {user.creations.length === 0 ? (
                            <p className="font-mono opacity-50">// NO_DATA_FOUND</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {user.creations.map(c => (
                                    <div key={c.id} className="border-[3px] border-black p-2 bg-white hover:shadow-[6px_6px_0px_#ec008c] transition-shadow">
                                        <div className="aspect-square bg-neutral-200 mb-2 overflow-hidden">
                                            <img src={c.imageUrl} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="font-bold text-xs uppercase truncate">{c.style} // {c.prompt?.slice(0, 10)}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Orders */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-black italic uppercase border-b-4 border-black pb-2">
                            Supply_Log
                        </h2>
                        {user.orders.length === 0 ? (
                            <p className="font-mono opacity-50">// NO_ACTIVE_ORDERS</p>
                        ) : (
                            <div className="space-y-4">
                                {user.orders.map(o => (
                                    <div key={o.id} className="bg-neutral-100 border-[3px] border-black p-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-black italic uppercase text-lg">{o.product.name}</p>
                                            <p className="font-mono text-xs text-neutral-600">{new Date(o.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold uppercase text-sm bg-black text-white px-2 py-1">{o.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

            </main>
        </div>
    );
}
