"use client";
import React from 'react';

export default function CommissionPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-10 bg-black text-white">
            <main className="max-w-4xl mx-auto">
                <div className="mb-12 border-l-[12px] border-cyan-400 pl-8">
                    <h1 className="text-5xl md:text-8xl font-black italic uppercase leading-none mb-4">
                        ELITE<br />
                        <span className="text-cyan-400 text-stroke-white">COMMISSIONS</span>
                    </h1>
                    <p className="font-mono text-cyan-400 font-bold text-xl">
                        // FULL_CUSTOM_CHARACTER_REALIZATION
                    </p>
                </div>

                <div className="space-y-12">
                    <p className="text-xl md:text-2xl font-bold leading-relaxed max-w-3xl">
                        Looking for a specific Anime character, Game protagonist, or OC?
                        Our master artisans will sculpt, print, and paint it from scratch.
                    </p>

                    <form className="space-y-8 bg-neutral-900 p-8 border-[2px] border-cyan-400/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block font-black italic uppercase text-cyan-400">CHARACTER_NAME</label>
                                <input type="text" className="w-full bg-black border-b-4 border-white p-4 font-bold text-white focus:border-cyan-400 outline-none" placeholder="E.G. GUTS (BERSERK)" />
                            </div>
                            <div className="space-y-2">
                                <label className="block font-black italic uppercase text-cyan-400">SERIES / SOURCE</label>
                                <input type="text" className="w-full bg-black border-b-4 border-white p-4 font-bold text-white focus:border-cyan-400 outline-none" placeholder="E.G. MANGA / ANIME" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block font-black italic uppercase text-cyan-400">DESIRED_SCALE</label>
                            <div className="flex gap-4">
                                {['1/12', '1/6', '1/4', 'LIFE_SIZE'].map(opt => (
                                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="scale" className="accent-cyan-400 w-6 h-6" />
                                        <span className="font-mono font-bold">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block font-black italic uppercase text-cyan-400">BUDGET_RANGE (INR)</label>
                            <select className="w-full bg-black border-4 border-white p-4 font-bold text-white focus:border-cyan-400 outline-none">
                                <option>₹15,000 - ₹40,000 (Standard)</option>
                                <option>₹40,000 - ₹80,000 (High Detail)</option>
                                <option>₹80,000+ (Masterpiece)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block font-black italic uppercase text-cyan-400">DETAILED_BRIEF</label>
                            <textarea className="w-full bg-black border-4 border-white p-4 font-mono font-bold text-white focus:border-cyan-400 outline-none h-40" placeholder="DESCRIBE POSE, ACCESSORIES, BASE, ETC." />
                        </div>

                        <button className="w-full bg-cyan-400 text-black py-6 font-black italic uppercase text-3xl hover:bg-white hover:text-cyan-400 transition-colors shadow-[0_0_20px_#22d3ee]">
                            INITIATE_REQUEST
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
