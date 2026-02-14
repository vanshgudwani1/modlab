"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function GeneratePage() {
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [style, setStyle] = useState("cyberpunk");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, style }),
            });
            const data = await res.json();

            if (data.success) {
                // Redirect to result page (not implemented yet, so just alert or log)
                // router.push(`/result/${data.id}`);
                alert(`Generated! ID: ${data.id}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-10">
            <main className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter text-black">
                        CREATE_YOUR<br />
                        <span className="text-cyan-400 drop-shadow-[4px_4px_0px_#000]">LEGEND</span>
                    </h1>
                    <p className="font-mono font-bold bg-yellow-400 inline-block px-4 py-1 border-2 border-black shadow-[4px_4px_0px_#000]">
                        Accessing Neural Forge v9.2...
                    </p>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="comic-box p-8 md:p-12 rotate-[-1deg] relative z-10"
                >
                    <div className="halftone"></div>

                    <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                        <div className="space-y-4">
                            <label className="block text-2xl font-black italic uppercase">
                                1. Select_Visual_Style
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Cyberpunk', 'Tactical', 'Retro_Sci-Fi', 'Wasteland'].map((s) => (
                                    <button
                                        type="button"
                                        key={s}
                                        onClick={() => setStyle(s.toLowerCase())}
                                        className={`p-4 border-[3px] border-black font-bold uppercase transition-all
                                    ${style === s.toLowerCase()
                                                ? 'bg-cyan-400 text-black shadow-[4px_4px_0px_#000]'
                                                : 'bg-white hover:bg-neutral-100'}`}
                                    >
                                        {s.replace('_', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-2xl font-black italic uppercase">
                                2. Input_Directive
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe your figure... e.g. 'A robotic samurai with neon katana'"
                                className="w-full h-48 border-[4px] border-black p-6 font-mono text-lg resize-none focus:outline-none focus:shadow-[8px_8px_0px_#ec008c] transition-shadow"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-6 text-4xl font-black italic uppercase border-[4px] border-black shadow-[8px_8px_0px_#fdf003] hover:bg-yellow-400 hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_#000] active:shadow-none active:translate-x-[8px] active:translate-y-[8px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'PROCESSING_DATA...' : 'INITIATE_FABRICATION'}
                            </button>
                            {loading && (
                                <p className="text-center mt-4 font-mono text-sm animate-pulse">
                                    &gt;&gt; Neural Networks Spinning Up...
                                </p>
                            )}
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
}
