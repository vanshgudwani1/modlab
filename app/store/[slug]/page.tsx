import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await prisma.product.findUnique({
        where: { slug },
    });

    if (!product) notFound();

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-10">
            <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Image */}
                <div className="comic-box p-4 bg-white rotate-2 hover:rotate-0 transition-transform">
                    <div className="aspect-square bg-neutral-200 border-4 border-black flex items-center justify-center">
                        <span className="font-black text-8xl opacity-10 italic uppercase">IMG</span>
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-black italic uppercase leading-none mb-4">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-mono font-bold text-cyan-600">${product.price}</span>
                            <span className="bg-black text-white px-3 py-1 font-mono text-sm font-bold uppercase">
                                Stock: {product.stock}
                            </span>
                        </div>
                    </div>

                    <p className="font-mono text-lg leading-relaxed border-l-4 border-yellow-400 pl-4">
                        {product.description}
                    </p>

                    <button className="w-full bg-cyan-400 text-black py-4 border-[4px] border-black font-black italic uppercase text-2xl shadow-[8px_8px_0px_#000] hover:bg-black hover:text-white hover:shadow-[10px_10px_0px_#fdf003] hover:-translate-y-1 transition-all">
                        Add_To_Cart
                    </button>

                    <div className="p-4 border-[2px] border-black border-dashed opacity-60">
                        <h4 className="font-bold uppercase text-xs mb-2">Specs_</h4>
                        <ul className="text-xs font-mono space-y-1">
                            <li>- MATERIAL: High-Impact Resin</li>
                            <li>- PAINT: Hand-Finished</li>
                            <li>- SCALE: 1/12</li>
                        </ul>
                    </div>
                </div>

            </main>
        </div>
    );
}
