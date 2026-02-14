import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ResultPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const creation = await prisma.creation.findUnique({
        where: { id },
        include: { user: true }
    });

    if (!creation) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-10">
            <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* LEFT: Image Display */}
                <div className="comic-box p-4 md:p-6 rotate-1">
                    <div className="aspect-square bg-neutral-900 border-4 border-black relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] opacity-20 [background-size:20px_20px]"></div>
                        {/* Fallback for mock images since they might not exist on disk yet */}
                        <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-neutral-600 font-black italic text-4xl">
                            <img
                                src={creation.imageUrl}
                                alt="Generated Figure"
                                className="w-full h-full object-cover relative z-10"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                                    if (e.currentTarget.parentElement) e.currentTarget.parentElement.innerText = "MOCK_IMG_NOT_FOUND";
                                }}
                            />
                        </div>

                        <div className="absolute bottom-0 left-0 w-full bg-cyan-400 text-black font-mono text-center py-1 font-bold border-t-4 border-black">
                            ID: {creation.id.slice(-8).toUpperCase()}
                        </div>
                    </div>
                </div>

                {/* RIGHT: controls */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-5xl font-black italic uppercase leading-none mb-4">
                            Target_Acquired
                        </h1>
                        <div className="font-mono text-sm bg-black text-white p-4 border-[4px] border-yellow-400 shadow-[8px_8px_0px_#000]">
                            <p>TYPE: {creation.style.toUpperCase()}</p>
                            <p>DIRECTIVE: "{creation.prompt}"</p>
                            <p>OPERATOR: {creation.user.name}</p>
                            <p>STATUS: <span className="text-green-400">FABRICATION_COMPLETE</span></p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <button className="bg-white border-[4px] border-black p-4 font-black italic uppercase hover:bg-neutral-100 shadow-[6px_6px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-left flex items-center justify-between group">
                            <span>Download_Schematic</span>
                            <span className="text-2xl group-hover:rotate-90 transition-transform">↓</span>
                        </button>

                        <button className="bg-white border-[4px] border-black p-4 font-black italic uppercase hover:bg-neutral-100 shadow-[6px_6px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-left flex items-center justify-between group">
                            <span>Publish_To_Hub</span>
                            <span className="text-2xl group-hover:text-pink-500 transition-colors">↗</span>
                        </button>

                        <div className="h-4"></div>

                        <Link href="/store" className="bg-cyan-400 border-[4px] border-black p-6 font-black italic uppercase text-2xl text-center shadow-[8px_8px_0px_#ec008c] hover:bg-black hover:text-white hover:border-yellow-400 hover:shadow-[10px_10px_0px_#fdf003] transition-all hover:-rotate-1">
                            Commence_Physical_Build
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
