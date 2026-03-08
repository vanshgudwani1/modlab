import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function LimitedRunPage() {
    const products = await prisma.product.findMany({
        where: { isLimited: true },
    });

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-10 bg-black text-white border-b-[20px] border-yellow-400">
            <main className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter text-white">
                        LIMITED<br />
                        <span className="text-yellow-400 drop-shadow-[4px_4px_0px_#fff] text-stroke-black">DROPS</span>
                    </h1>
                    <p className="font-mono text-xl font-bold text-yellow-400">// EXCLUSIVE_ACCESS_ONLY</p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 border-[4px] border-dashed border-neutral-700">
                        <h2 className="text-4xl font-black italic uppercase text-neutral-600">NO_ACTIVE_DROPS</h2>
                        <p className="font-mono text-neutral-500 mt-4">CHECK_BACK_LATER // SIGN_UP_FOR_ALERTS</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map(product => (
                            <Link href={`/store/${product.slug}`} key={product.id} className="group">
                                <div className="bg-neutral-900 border-[6px] border-yellow-400 shadow-[15px_15px_0px_#fff] p-4 h-full flex flex-col hover:-translate-y-2 hover:shadow-[20px_20px_0px_#00ffff] transition-all">
                                    <div className="aspect-[3/4] bg-black border-2 border-yellow-400/50 mb-4 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 z-10 animate-pulse">
                                            LIMITED: {product.maxSupply || "NaN"}
                                        </div>
                                        {product.image ? (
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                                        ) : (
                                            <span className="font-black text-6xl opacity-10 italic uppercase text-white">RELIC</span>
                                        )}
                                    </div>
                                    <div className="mt-auto">
                                        <h3 className="font-black italic uppercase text-2xl leading-none mb-2 text-white">{product.name}</h3>
                                        <div className="flex justify-between items-center">
                                            <span className="font-mono font-bold text-lg text-yellow-400">₹{product.price}</span>
                                            {product.stock > 0 ? (
                                                <span className="text-xs font-bold bg-yellow-400 text-black px-2 py-1 uppercase">Available</span>
                                            ) : (
                                                <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 uppercase">SOLD_OUT</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
