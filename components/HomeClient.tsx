"use client";
import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useReducedMotion,
    useVelocity,
    useMotionValueEvent
} from "framer-motion";
import type { Variants } from "framer-motion";
import type { Product } from "@prisma/client";
import Link from 'next/link';
import HeroScene from "./HeroScene";
import GlitchText from "./GlitchText";

/* ------------------ MOTION VARIANTS ------------------ */

const panelPop: Variants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -5, y: 50 },
    visible: {
        scale: 1,
        opacity: 1,
        rotate: 0,
        y: 0,
        transition: { type: "spring", bounce: 0.5, duration: 0.8 },
    },
};

const stickerVariant: Variants = {
    hidden: { scale: 0, rotate: 180 },
    visible: {
        scale: 1,
        rotate: 0,
        transition: { type: "spring", bounce: 0.6 }
    }
};

/* ------------------ COMPONENT ------------------ */

export default function HomeClient({ products }: { products: Product[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress, scrollY } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Velocity Effect
    const scrollVelocity = useVelocity(scrollY);
    const skewVelocity = useTransform(scrollVelocity, [-1000, 1000], [-2, 2]);
    const smoothSkew = useSpring(skewVelocity, { stiffness: 400, damping: 30 });

    // Parallax
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const ySticker1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const ySticker2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

    // Rotate for 3D feel
    const rotateX = useTransform(scrollYProgress, [0, 0.5], [5, 25]);

    return (
        <div
            ref={containerRef}
            className="bg-[#f0f0f0] pt-32 pb-24 px-4 md:px-10 overflow-x-hidden relative"
        >
            {/* ------------------ KINETIC BACKGROUND ------------------ */}
            {!prefersReducedMotion && (
                <div className="fixed inset-0 pointer-events-none opacity-[0.03] flex items-center overflow-hidden whitespace-nowrap z-0 select-none">
                    <motion.div
                        animate={{ x: [0, -2000] }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                        className="text-[300px] font-black italic uppercase"
                    >
                        MOD LAB STUDIO // CUSTOM TOYS // INDIA TO GLOBAL // MOD LAB STUDIO //
                    </motion.div>
                </div>
            )}

            <main className="max-w-7xl mx-auto space-y-48 relative z-10 perspective-[1000px]">

                {/* ------------------ HERO ------------------ */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ y: yHero, rotateX: smoothSkew }}
                    className="relative"
                >
                    <HeroScene />
                    <motion.div
                        variants={panelPop}
                        className="bg-cyan-400 border-[10px] border-black shadow-[25px_25px_0px_#000] p-12 -rotate-1 relative z-10 overflow-hidden"
                    >
                        <h1 className="text-[clamp(60px,12vw,160px)] font-black italic uppercase leading-none tracking-tighter text-white drop-shadow-[8px_8px_0px_#000] mix-blend-hard-light relative z-20">
                            <GlitchText text="MOD LAB" />
                            <br />
                            <span className="text-black">STUDIO</span>
                        </h1>

                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full blur-[100px] opacity-50 mix-blend-overlay" />
                    </motion.div>

                    {!prefersReducedMotion && (
                        <motion.div
                            drag
                            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="absolute -top-10 -right-10 bg-yellow-400 border-[6px] border-black p-10 text-6xl font-black italic shadow-[8px_8px_0px_#000] cursor-grab active:cursor-grabbing z-20 hidden md:block"
                        >
                            !
                        </motion.div>
                    )}
                </motion.section>

                {/* ------------------ CAPABILITIES ------------------ */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        variants={panelPop}
                        className="bg-white border-[8px] border-black shadow-[20px_20px_0px_#000] p-10 rotate-1 group"
                    >
                        <h2 className="text-5xl font-black italic mb-8 uppercase underline decoration-cyan-400 decoration-8 underline-offset-4">
                            What We Do_
                        </h2>

                        <div className="space-y-6">
                            {["Custom Sculpt", "3D Printing", "Hand Paint", "Tactical Gear"].map(
                                (text, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: -20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="text-2xl font-black italic uppercase flex items-center gap-4 hover:translate-x-4 transition-transform"
                                    >
                                        <span className="text-cyan-400 text-4xl">⚡</span>
                                        <span className="border-b-4 border-transparent group-hover:border-black transition-colors">{text}</span>
                                    </motion.div>
                                )
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                        className="bg-black text-white border-[8px] border-black shadow-[10px_10px_0px_#fdf003] md:shadow-[20px_20px_0px_#fdf003] p-6 md:p-10 relative overflow-hidden transform md:rotate-[-1deg] translate-y-0"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

                        <h2 className="text-5xl font-black italic mb-8 uppercase text-cyan-400 relative z-10">
                            Reviews_
                        </h2>

                        <motion.div
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="border-l-8 border-pink-500 pl-6 italic uppercase relative z-10"
                        >
                            <p className="text-3xl leading-none font-bold">
                                "THE HAND-PAINTING QUALITY IS MOVIE STUDIO LEVEL."
                            </p>
                            <p className="text-right text-sm font-mono text-neutral-400 mt-4">- Verified Agent</p>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ------------------ VAULT ------------------ */}
                <section className="space-y-12" id="vault">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        className="bg-black text-white py-4 -rotate-1 origin-left"
                    >
                        <h2 className="text-6xl font-black italic uppercase text-center">
                            The_Vault_Inventory
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[800px]">
                        {products.map((product, i) => (
                            <Link href={`/store/${product.slug}`} key={product.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 50, rotateX: 20 }}
                                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                    viewport={{ margin: "-50px" }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        rotate: i % 2 === 0 ? 1 : -1,
                                        z: 50,
                                        boxShadow: "20px 20px 0px #ec008c"
                                    }}
                                    className="bg-white border-[6px] border-black shadow-[15px_15px_0px_#000] p-4 cursor-pointer h-full flex flex-col transform-style-3d transition-all"
                                >
                                    <div className="aspect-[3/4] halftone-bg border-2 border-black mb-4 flex items-center justify-center italic text-neutral-400 overflow-hidden relative group">
                                        {/* Glitch Overlay on Hover */}
                                        <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-hard-light" />

                                        <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                                            ) : (
                                                <span className="text-4xl font-black opacity-20">IMG</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-auto">
                                        <p className="font-black italic uppercase text-center text-xl line-clamp-1">
                                            {product.name}
                                        </p>
                                        <p className="font-mono font-bold text-center text-cyan-600">
                                            ${product.price}
                                        </p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ------------------ COMPARISON ------------------ */}
                <motion.section
                    style={{ skewX: smoothSkew }}
                    className="bg-black border-[10px] border-white shadow-[25px_25px_0px_#000] p-12 overflow-x-auto"
                >
                    <table className="w-full text-white text-left font-black italic uppercase text-2xl tracking-tighter">
                        <thead>
                            <tr className="border-b-4 border-cyan-400">
                                <th className="py-6">Protocol</th>
                                <th className="text-cyan-400">MOD LAB</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-6">Acquisition</td>
                                <td className="text-cyan-400">WORLDWIDE_DEPLOY</td>
                            </tr>
                            <tr>
                                <td className="py-6">Artistry</td>
                                <td className="text-cyan-400">HAND_FINISHED</td>
                            </tr>
                            <tr>
                                <td className="py-6">Exclusivity</td>
                                <td className="text-cyan-400">LIMITED_EDITION</td>
                            </tr>
                        </tbody>
                    </table>
                </motion.section>

                {/* ------------------ CTA ------------------ */}
                <motion.button
                    whileHover={{
                        scale: 1.02,
                        rotate: 1,
                        boxShadow: "35px 35px 0px #fdf003",
                        backgroundColor: "#000",
                        color: "#fff",
                        borderColor: "#fdf003"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="w-full bg-cyan-400 text-black border-[10px] border-black shadow-[30px_30px_0px_#ec008c] py-20 text-[clamp(40px,8vw,110px)] font-black italic uppercase tracking-tighter mb-20"
                >
                    CLAIM_YOUR_SLOT
                </motion.button>
                {/* ------------------ SECTION 1: THE ARMORY (Categories) ------------------ */}
                <section>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        className="mb-12"
                    >
                        <h2 className="text-6xl font-black italic uppercase text-center mb-8 relative z-10">
                            <span className="bg-yellow-400 px-4 border-[6px] border-black shadow-[10px_10px_0px_#000]">
                                The_Armory
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['HEADGEAR', 'FULL_SETS', 'PROPS'].map((cat, i) => (
                            <motion.div
                                key={cat}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                whileHover={{ y: -10, boxShadow: "15px 15px 0px #ec008c" }}
                                className="h-64 bg-black border-[6px] border-black shadow-[10px_10px_0px_#000] flex items-center justify-center relative overflow-hidden group cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-neutral-900 group-hover:bg-neutral-800 transition-colors" />
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                                <h3 className="relative z-10 text-4xl font-black italic uppercase text-white group-hover:text-cyan-400 transition-colors">
                                    {cat}
                                </h3>
                                <div className="absolute bottom-4 right-4 text-xs font-mono text-neutral-500 uppercase">
                                    // Deployment_Ready
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ------------------ SECTION 2: TECH SPECS (Materials) ------------------ */}
                <section className="bg-white border-[8px] border-black p-12 shadow-[20px_20px_0px_#00ffff] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 font-mono text-xs font-bold bg-black text-white">
                        SPEC_SHEET_V9
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-5xl font-black italic uppercase mb-8 leading-none">
                                MATERIAL<br />SUPERIORITY
                            </h2>
                            <ul className="space-y-6 font-mono text-lg">
                                <li className="flex items-start gap-4">
                                    <span className="bg-cyan-400 text-black px-2 font-bold mt-1">01</span>
                                    <span><strong>High-Impact Resin:</strong> Shatter-resistant polymer blend designed for durability, not just display.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="bg-pink-500 text-black px-2 font-bold mt-1">02</span>
                                    <span><strong>Automotive Grade Paint:</strong> We use the same pigments found on supercars. UV resistance guaranteed.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="bg-yellow-400 text-black px-2 font-bold mt-1">03</span>
                                    <span><strong>Magnetic Keying:</strong> Limbs snapping with neodymium magnets for satisfying tactical assembly.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="h-full min-h-[300px] border-[4px] border-black bg-neutral-100 relative flex items-center justify-center">
                            {/* Placeholder for tech diagram */}
                            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] [background-size:20px_20px] [background-position:0_0,10px_10px]" />
                            <div className="w-48 h-48 border-4 border-dashed border-neutral-400 rounded-full flex items-center justify-center">
                                <span className="font-black opacity-20 text-center">POLYMER<br />MATRIX</span>
                            </div>

                            {/* Pointers */}
                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute top-1/4 left-10 bg-black text-white text-xs px-2 py-1 font-mono"
                            >
                                ← CORE_DENSITY
                            </motion.div>
                            <motion.div
                                animate={{ x: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2.5 }}
                                className="absolute bottom-1/3 right-10 bg-black text-white text-xs px-2 py-1 font-mono"
                            >
                                SURFACE_HARDNESS →
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ------------------ SECTION 3: OPERATOR SPOTLIGHT ------------------ */}
                <section className="relative">
                    <div className="bg-black text-white border-[8px] border-black p-10 -rotate-1 mx-4 md:mx-20 shadow-[20px_20px_0px_#fdf003]">
                        <div className="absolute -top-6 -left-6 bg-pink-500 text-white px-6 py-2 border-[4px] border-black font-black italic uppercase text-xl shadow-[4px_4px_0px_#000]">
                            Operator_Spotlight
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-full md:w-1/3 aspect-square bg-neutral-800 border-4 border-white grayscale hover:grayscale-0 transition-all cursor-pointer relative overflow-hidden group">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-black text-6xl opacity-20 italic">IMG</span>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full bg-cyan-400 text-black font-mono text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                                    VIEW_PROFILE
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-4xl font-black italic uppercase mb-2 text-yellow-400">
                                    "NEON_VANGUARD"
                                </h3>
                                <p className="font-mono text-neutral-400 mb-6 uppercase text-sm">
                                    Custom Build by AGENT_KAI // Tokyo, JP
                                </p>
                                <p className="text-xl italic font-bold leading-relaxed mb-8">
                                    "I mixed the MK-4 head with a custom resin body. The magnetic snapping feels incredible. Best kitbash base I've ever used."
                                </p>
                                <Link href="/hub" className="inline-block bg-white text-black px-6 py-3 font-black italic uppercase border-[4px] border-black shadow-[6px_6px_0px_#fff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                                    Join_The_Hub
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ------------------ SECTION 4: INTEL UPLINK (Newsletter) ------------------ */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.5 }}
                    variants={panelPop}
                    className="bg-cyan-400 p-12 border-[8px] border-black text-center relative overflow-hidden"
                >
                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter drop-shadow-md text-white stroke-black" style={{ WebkitTextStroke: "2px black" }}>
                            DONT_MISS_THE_DROP
                        </h2>
                        <p className="font-mono text-lg font-bold bg-black text-white inline-block px-4 py-1">
                            // LIMITED_SLOTS_ONLY
                        </p>

                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="ENTER_COMS_ID..."
                                className="flex-1 bg-white border-[4px] border-black p-4 font-mono font-bold uppercase placeholder:text-neutral-400 focus:outline-none focus:shadow-[8px_8px_0px_#000] transition-shadow"
                            />
                            <button className="bg-black text-white border-[4px] border-black px-8 py-4 font-black italic uppercase hover:bg-yellow-400 hover:text-black transition-colors shadow-[8px_8px_0px_#fff]">
                                TRANSMIT
                            </button>
                        </div>

                        <p className="text-xs font-mono font-bold uppercase opacity-60">
                            *By transmitting, you agree to receive classified tactical updates. No spam. Only signal.
                        </p>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                        <div className="absolute top-10 left-10 w-20 h-20 bg-black rotate-45" />
                        <div className="absolute bottom-[-20px] right-20 w-40 h-40 border-[20px] border-white rounded-full" />
                    </div>
                </motion.section>
            </main>

            {/* ------------------ PARALLAX STICKERS ------------------ */}
            {!prefersReducedMotion && (
                <>
                    <motion.div
                        style={{ y: ySticker1 }}
                        initial="hidden"
                        whileInView="visible"
                        variants={stickerVariant}
                        className="fixed top-1/3 left-10 bg-black text-white px-8 py-2 border-[4px] border-white z-0 font-black italic text-4xl rotate-[-12deg] pointer-events-none opacity-80 hidden md:block"
                    >
                        ZAP!
                    </motion.div>

                    <motion.div
                        style={{ y: ySticker2 }}
                        initial="hidden"
                        whileInView="visible"
                        variants={stickerVariant}
                        className="fixed bottom-1/4 right-10 bg-yellow-400 text-black px-12 py-4 border-[6px] border-black z-20 font-black italic text-5xl rotate-[12deg] shadow-[10px_10px_0px_#000] pointer-events-none hidden md:block"
                    >
                        BOOM!
                    </motion.div>
                </>
            )}
        </div>
    );
}
