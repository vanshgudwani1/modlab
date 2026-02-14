import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function StorePage() {
    const products = await prisma.product.findMany({
        where: { isLimited: false },
    });

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-10">
            <main className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter text-black">
                        MODLAB<br />
                        <span className="text-cyan-400 drop-shadow-[4px_4px_0px_#000]">VAULT</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map(product => (
                        <Link href={`/store/${product.slug}`} key={product.id} className="group">
                            <div className="bg-white border-[6px] border-black shadow-[15px_15px_0px_#000] p-4 h-full flex flex-col hover:-translate-y-2 hover:shadow-[20px_20px_0px_#ec008c] transition-all">
                                <div className="aspect-[3/4] bg-neutral-200 border-2 border-black mb-4 flex items-center justify-center relative overflow-hidden">
                                    <span className="font-black text-6xl opacity-10 italic uppercase">IMG</span>
                                    <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="mt-auto">
                                    <h3 className="font-black italic uppercase text-2xl leading-none mb-2">{product.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono font-bold text-lg">${product.price}</span>
                                        <span className="text-xs font-bold bg-black text-white px-2 py-1 uppercase">In_Stock</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
