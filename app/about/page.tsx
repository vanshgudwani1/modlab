import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-10 max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm font-bold hover:text-cyan-400 mb-12">
                <ArrowLeft size={16} />
                BACK_TO_HQ
            </Link>

            <header className="mb-16 border-b-[4px] border-black pb-8">
                <h1 className="text-6xl md:text-8xl font-black italic uppercase mb-4 tracking-tighter">
                    ORIGIN_STORY
                </h1>
                <p className="font-mono text-xl text-neutral-600 max-w-2xl">
                // CLASSIFIED_INTEL <br />
                    ModLab was founded to break the monotony of mass production.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="bg-white border-[6px] border-black p-8 shadow-[16px_16px_0px_#ec008c] rotate-1">
                    <h2 className="text-4xl font-black italic uppercase mb-6 text-pink-500">
                        The_Mission
                    </h2>
                    <p className="font-mono text-lg mb-6 leading-relaxed">
                        We believe every collector deserves a centerpiece that screams individuality. In a world of factory clones, we are the glitch in the system.
                    </p>
                    <p className="font-mono text-lg leading-relaxed">
                        Our goal is simple: To fuse high-end digital sculpting with gritty, hand-painted artistry. We don't just sell toys; we deploy <span className="font-bold bg-yellow-300 px-1">Tactical Art Units</span>.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="bg-black text-white p-8 border-[6px] border-black shadow-[16px_16px_0px_#00ffff] -rotate-1">
                        <h3 className="text-2xl font-black italic uppercase mb-2 text-cyan-400">
                        // 01. HAND_CRAFTED
                        </h3>
                        <p className="font-mono text-neutral-300">
                            Every scratch, wash, and detail is applied by human hands. No two units are identical.
                        </p>
                    </div>

                    <div className="bg-black text-white p-8 border-[6px] border-black shadow-[16px_16px_0px_#fdf003] rotate-1">
                        <h3 className="text-2xl font-black italic uppercase mb-2 text-yellow-400">
                        // 02. LIMITED_RUNS
                        </h3>
                        <p className="font-mono text-neutral-300">
                            We operate in small batches. When a drop is gone, it's gone for good.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
