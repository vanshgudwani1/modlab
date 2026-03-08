import { prisma } from "@/lib/prisma";

export default async function DropsPage() {
    const drops = await prisma.product.findMany({
        where: { isLimited: true },
        orderBy: { dropDate: 'asc' }
    });

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-10 bg-neutral-900 text-white">
            <main className="max-w-6xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter text-yellow-400">
                        LIMITED<br />
                        <span className="text-white drop-shadow-[4px_4px_0px_#fdf003] stroke-black" style={{ WebkitTextStroke: '2px black' }}>DROPS</span>
                    </h1>
                    <p className="font-mono text-cyan-400 uppercase tracking-widest">
                // SECURE_YOUR_ALLOCATION
                    </p>
                </div>

                <div className="space-y-20">
                    {drops.map(drop => (
                        <div key={drop.id} className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-yellow-400 opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>

                            <div className="relative bg-black border-[8px] border-white p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                {/* Image Side */}
                                <div className="aspect-[4/3] bg-neutral-800 border-[4px] border-white flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                                    <span className="font-black text-6xl opacity-20 italic">SECRET</span>

                                    <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 font-black italic uppercase text-lg border-2 border-black">
                                        {drop.maxSupply} Pieces
                                    </div>
                                </div>

                                {/* Info Side */}
                                <div className="space-y-6 text-center md:text-left">
                                    <h2 className="text-5xl font-black italic uppercase leading-none">{drop.name}</h2>
                                    <p className="font-mono text-neutral-400">{drop.description}</p>

                                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start">
                                        <div className="text-center">
                                            <p className="text-xs font-mono uppercase text-neutral-500">Drop Date</p>
                                            <p className="text-xl font-black italic text-yellow-400">
                                                {drop.dropDate ? drop.dropDate.toLocaleDateString() : 'TBA'}
                                            </p>
                                        </div>
                                        <div className="text-center md:border-l border-neutral-700 md:pl-4">
                                            <p className="text-xs font-mono uppercase text-neutral-500">Price</p>
                                            <p className="text-xl font-black italic text-cyan-400">₹{drop.price}</p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-white text-black py-4 font-black italic uppercase text-2xl hover:bg-yellow-400 hover:scale-[1.02] transition-all">
                                        Set_Reminder
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
