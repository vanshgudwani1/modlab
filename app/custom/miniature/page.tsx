"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomMiniaturePage() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-10 bg-[#f0f0f0]">
            <main className="max-w-5xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-none mb-4">
                        CUSTOM_MINI<br />
                        <span className="text-pink-500">FABRICATION</span>
                    </h1>
                    <p className="font-mono font-bold bg-black text-white inline-block px-4 py-1">
                        // PROTOCOL: BUILD_YOUR_OWN
                    </p>
                </div>

                <div className="bg-white border-[6px] border-black shadow-[20px_20px_0px_#ec008c] p-8 md:p-12 relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="flex justify-between mb-12 border-b-4 border-neutral-200 pb-4">
                        {[1, 2, 3].map(num => (
                            <div key={num} className={`flex items-center gap-2 ${step >= num ? 'opacity-100' : 'opacity-30'}`}>
                                <span className={`w-8 h-8 flex items-center justify-center font-black rounded-full ${step >= num ? 'bg-black text-white' : 'bg-neutral-300'}`}>
                                    {num}
                                </span>
                                <span className="font-black italic uppercase hidden md:inline">STEP_0{num}</span>
                            </div>
                        ))}
                    </div>

                    <form className="space-y-8">
                        {step === 1 && (
                            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                                <h2 className="text-4xl font-black italic uppercase">BASE_SPECIFICATION</h2>

                                <div className="space-y-4">
                                    <label className="block font-bold font-mono">SELECT_SCALE</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {['1/6', '1/12', '1/18', 'CUSTOM'].map(scale => (
                                            <button type="button" key={scale} className="border-4 border-black py-4 font-black hover:bg-pink-500 hover:text-white transition-colors">
                                                {scale}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block font-bold font-mono">ARCHETYPE</label>
                                    <select className="w-full border-4 border-black p-4 font-bold font-mono uppercase focus:outline-none focus:ring-4 ring-pink-500">
                                        <option>CYBERPUNK_OPERATOR</option>
                                        <option>WASTELAND_NOMAD</option>
                                        <option>MECHA_PILOT</option>
                                        <option>STREET_SAMURAI</option>
                                    </select>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                                <h2 className="text-4xl font-black italic uppercase">VISUAL_DATA</h2>
                                <div className="border-4 border-dashed border-black p-12 text-center cursor-pointer hover:bg-pink-50 transition-colors">
                                    <p className="font-black text-2xl mb-2">UPLOAD_REFERENCE</p>
                                    <p className="font-mono text-sm opacity-50">DRAG_AND_DROP_OR_CLICK</p>
                                </div>
                                <textarea
                                    placeholder="ADDITIONAL_NOTES..."
                                    className="w-full border-4 border-black p-4 h-40 font-mono font-bold uppercase resize-none focus:outline-none focus:ring-4 ring-pink-500"
                                />
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6 text-center">
                                <h2 className="text-4xl font-black italic uppercase">CONFIRM_TRANSMISSION</h2>
                                <p className="font-mono max-w-lg mx-auto">
                                    YOUR_BLUEPRINT_IS_READY. MODLAB_ENGINEERS_WILL_REVIEW_AND_RESPOND_WITH_A_QUOTE_WITHIN_24_HOURS.
                                </p>
                                <button type="submit" className="bg-pink-500 text-white text-2xl px-12 py-6 font-black italic uppercase border-[4px] border-black shadow-[8px_8px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                                    TRANSMIT_ORDER
                                </button>
                            </motion.div>
                        )}

                        <div className="flex justify-between mt-12 pt-8 border-t-4 border-neutral-200">
                            {step > 1 && (
                                <button type="button" onClick={() => setStep(step - 1)} className="font-bold font-mono underline hover:text-pink-500">
                                    &lt; BACK
                                </button>
                            )}
                            {step < 3 && (
                                <button type="button" onClick={() => setStep(step + 1)} className="ml-auto bg-black text-white px-8 py-3 font-black italic uppercase hover:bg-pink-500 transition-colors">
                                    NEXT_PHASE &gt;
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
