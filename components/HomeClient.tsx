"use client";
import React, { useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
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


/* ------------------ COMPONENT ------------------ */

export default function HomeClient({ products, limitedProducts = [] }: { products: Product[], limitedProducts?: Product[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress, scrollY } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Velocity Effect
    const scrollVelocity = useVelocity(scrollY);
    const skewVelocity = useTransform(scrollVelocity, [-1000, 1000], [-2, 2]);
    const smoothSkew = useSpring(skewVelocity, { stiffness: 400, damping: 30 });


    return (
        <div
            ref={containerRef}
            className="bg-neutral-950 pt-0 pb-12 md:pb-24 px-0 overflow-x-hidden relative"
        >
            {/* ------------------ KINETIC BACKGROUND ------------------ */}
            {!prefersReducedMotion && (
                <div className="fixed inset-0 pointer-events-none opacity-[0.02] flex items-center overflow-hidden whitespace-nowrap z-0 select-none">
                    <motion.div
                        animate={{ x: [0, -2000] }}
                        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                        className="text-[300px] font-black italic uppercase text-white"
                    >
                        MOD LAB STUDIO // TACTICAL ART // PRECISION ENGINEERED // MOD LAB STUDIO //
                    </motion.div>
                </div>
            )}

            <main className="w-full relative z-10">

                {/* ------------------ HERO ------------------ */}
                <section className="relative min-h-screen w-full flex items-center bg-neutral-950 overflow-hidden">
                    {/* Background Gradient & Grid - Improved Polish */}
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_60%_50%,_var(--tw-gradient-stops))] from-neutral-900/50 via-neutral-950 to-black" />
                    <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />

                    {/* 3D Scene Background */}
                    <div className="absolute inset-0 z-10">
                        <HeroScene />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 h-full items-center pointer-events-none">

                        {/* Text Content - Wider max-width & Better spacing */}
                        <div className="pointer-events-auto mt-20 md:mt-0 col-span-1 md:max-w-2xl z-30">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-10"
                            >
                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="h-[1px] w-16 bg-cyan-400/60" />
                                        <p className="font-mono text-cyan-400 text-xs tracking-[0.2em] uppercase font-bold opacity-80">
                                            Studio_Drop_01
                                        </p>
                                    </motion.div>

                                    <h1 className="text-7xl md:text-[7.5rem] font-black italic text-white leading-[0.85] tracking-tighter">
                                        MOD LAB<br />
                                        <span className="text-white/10" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>STUDIO</span>
                                    </h1>
                                </div>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.7 }}
                                    transition={{ delay: 0.6, duration: 1 }}
                                    className="text-white text-xl md:text-2xl max-w-lg font-light leading-relaxed tracking-wide"
                                >
                                    Engineering high-fidelity collectibles for the tactical art enthusiast.
                                    Precision sculpted, hand-finished, and strictly limited.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                    className="flex flex-col sm:flex-row gap-6 pt-6"
                                >
                                    <Link href="/store" className="group">
                                        <button
                                            className="px-10 py-5 bg-neutral-900/80 border border-cyan-500/30 text-white font-bold uppercase tracking-widest flex items-center gap-3 group-hover:bg-cyan-500/10 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)] transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <span className="text-cyan-400 group-hover:text-white transition-colors duration-300">01</span>
                                            View Collection
                                        </button>
                                    </Link>
                                    <Link href="/hub">
                                        <button
                                            className="px-10 py-5 border border-white/10 text-white/80 font-bold uppercase tracking-widest hover:bg-white/5 hover:text-white hover:border-white/30 transition-all duration-300"
                                        >
                                            Custom Commissions
                                        </button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Right side is clear for the model */}
                        <div />
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-20"
                    >
                        <p className="text-[10px] font-mono tracking-widest uppercase">Scroll to Explore</p>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400/50 to-transparent" />
                    </motion.div>
                </section>

                <div className="max-w-7xl mx-auto space-y-16 md:space-y-48 relative z-10 px-4 md:px-10 pt-20">

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
                                {[
                                    { title: "Custom Sculpt", desc: "Original high-detail 3D character creation." },
                                    { title: "3D Printing", desc: "Precision resin casting for durability." },
                                    { title: "Hand Paint", desc: "Automotive-grade pigments. Studio finish." },
                                    { title: "Tactical Gear", desc: "Modular accessories engineered for display." }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: -20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group/item cursor-default"
                                    >
                                        <div className="text-2xl font-black italic uppercase flex items-center gap-4 hover:translate-x-4 transition-transform">
                                            <span className="text-cyan-400 text-4xl">⚡</span>
                                            <span className="border-b-4 border-transparent group-hover/item:border-black transition-colors">{item.title}</span>
                                        </div>
                                        <div className="h-0 overflow-hidden group-hover/item:h-auto group-hover/item:mt-2 transition-all duration-300">
                                            <p className="font-mono text-sm font-bold bg-black text-white px-3 py-1 ml-12 inline-block -rotate-1">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
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
                                animate={{ opacity: [0.9, 1, 0.9] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="relative z-10"
                            >
                                <div className="flex text-yellow-400 text-2xl mb-4 gap-1">
                                    {Array(5).fill("★").map((star, i) => (
                                        <span key={i}>{star}</span>
                                    ))}
                                </div>
                                <div className="border-l-8 border-pink-500 pl-6 italic uppercase">
                                    <p className="text-xl md:text-3xl leading-none font-bold">
                                        "Insane detailing. The paint finish rivals high-end Japanese collectibles."
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-neutral-800 rounded-full border-2 border-white overflow-hidden">
                                        {/* Avatar Placeholder */}
                                        <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-pink-500" />
                                    </div>
                                    <div>
                                        <p className="font-mono font-bold text-white uppercase">— Arjun Mehta, Delhi</p>
                                        <p className="font-mono text-xs text-neutral-400 uppercase">Product: Limited Goku Drop</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </section>

                    {/* ------------------ LIMITED DROPS ------------------ */}
                    {limitedProducts && limitedProducts.length > 0 && (
                        <section className="space-y-12" id="limited-drops">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                className="bg-yellow-400 text-black py-4 rotate-1 origin-right border-y-[6px] border-black"
                            >
                                <h2 className="text-3xl md:text-6xl font-black italic uppercase text-center tracking-tighter">
                                    ⚠ LIMITED_DROPS ⚠
                                </h2>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[800px]">
                                {limitedProducts.map((product, i) => (
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
                                                boxShadow: "20px 20px 0px #00ffff"
                                            }}
                                            className="bg-neutral-900 border-[6px] border-yellow-400 shadow-[15px_15px_0px_#000] p-4 cursor-pointer h-full flex flex-col transform-style-3d transition-all group"
                                        >
                                            <div className="aspect-[3/4] bg-black border-2 border-yellow-400/50 mb-4 flex items-center justify-center italic text-neutral-400 overflow-hidden relative">
                                                {/* Limited Badge */}
                                                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 z-20 animate-pulse border-2 border-black">
                                                    LIMITED RUN
                                                </div>

                                                {/* Scarcity Badge */}
                                                {product.stock > 0 && product.stock < 10 && (
                                                    <div className="absolute bottom-2 left-2 bg-yellow-400 text-black text-[10px] font-black italic px-2 py-1 z-20 border-2 border-black">
                                                        ONLY {product.stock} LEFT
                                                    </div>
                                                )}

                                                {/* Glitch Overlay on Hover */}
                                                <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-hard-light" />

                                                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                                                    ) : (
                                                        <span className="text-4xl font-black opacity-20 text-white">RELIC</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-auto space-y-3">
                                                <p className="font-black italic uppercase text-center text-xl line-clamp-1 text-white group-hover:text-yellow-400 transition-colors">
                                                    {product.name}
                                                </p>

                                                {/* Stats Grid */}
                                                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400 uppercase">
                                                    <div className="border border-neutral-700 p-1">
                                                        <span className="block text-neutral-500">Edition</span>
                                                        <span className="text-white font-bold">25 Units</span>
                                                    </div>
                                                    <div className="border border-neutral-700 p-1">
                                                        <span className="block text-neutral-500">Material</span>
                                                        <span className="text-white font-bold">Resin</span>
                                                    </div>
                                                    <div className="border border-neutral-700 p-1">
                                                        <span className="block text-neutral-500">Height</span>
                                                        <span className="text-white font-bold">7 Inch</span>
                                                    </div>
                                                    <div className="border border-neutral-700 p-1">
                                                        <span className="block text-neutral-500">Ships</span>
                                                        <span className="text-white font-bold">14 Days</span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-center items-center gap-2 pt-2 border-t border-neutral-800">
                                                    <p className="font-mono font-bold text-center text-yellow-400 text-lg">
                                                        ${product.price}
                                                    </p>
                                                    {product.stock <= 0 && (
                                                        <span className="text-[10px] bg-red-600 text-white px-1 font-bold uppercase">SOLD_OUT</span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ------------------ VAULT ------------------ */}
                    <section className="space-y-12" id="vault">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            className="bg-black text-white py-4 -rotate-1 origin-left"
                        >
                            <h2 className="text-3xl md:text-6xl font-black italic uppercase text-center">
                                The_Vault_Inventory
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 perspective-[800px]">
                            {products.map((product, i) => (
                                <Link href={`/store/${product.slug}`} key={product.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 50, rotateX: 20 }}
                                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                        viewport={{ margin: "-50px" }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{
                                            scale: 1.02,
                                            rotate: i % 2 === 0 ? 1 : -1,
                                            z: 50,
                                            boxShadow: "20px 20px 0px #ec008c"
                                        }}
                                        className="bg-white border-[6px] border-black shadow-[15px_15px_0px_#000] p-0 cursor-pointer h-full flex flex-col transform-style-3d transition-all group overflow-hidden"
                                    >
                                        <div className="aspect-[4/5] halftone-bg border-b-[6px] border-black flex items-center justify-center italic text-neutral-400 overflow-hidden relative">
                                            {/* Glitch Overlay on Hover */}
                                            <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity z-20 mix-blend-hard-light pointer-events-none" />

                                            {/* Quick View Button Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span className="bg-black text-white px-6 py-2 font-black italic uppercase text-lg border-2 border-white shadow-[4px_4px_0px_#ec008c] transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                    QUICK_VIEW
                                                </span>
                                            </div>

                                            <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center overflow-hidden">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 will-change-transform" />
                                                ) : (
                                                    <span className="text-4xl font-black opacity-20">IMG</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="font-black italic uppercase text-xl md:text-2xl leading-none line-clamp-2">
                                                    {product.name}
                                                </p>
                                            </div>
                                            <div className="mt-auto pt-4 border-t-2 border-neutral-200 flex justify-between items-end">
                                                <span className="font-mono text-xs font-bold text-neutral-500 uppercase">IN_STOCK</span>
                                                <p className="font-mono font-bold text-xl text-cyan-600">
                                                    ${product.price}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* ------------------ COMPARISON ------------------ */}
                    <motion.section
                        style={{ skewX: smoothSkew }}
                        className="bg-black border-[6px] md:border-[10px] border-white shadow-[10px_10px_0px_#000] md:shadow-[25px_25px_0px_#000] p-4 md:p-12 overflow-x-auto"
                    >
                        <table className="w-full text-white text-left font-black italic uppercase text-sm md:text-2xl tracking-tighter">
                            <thead>
                                <tr className="border-b-4 border-cyan-400">
                                    <th className="py-3 md:py-6">Protocol</th>
                                    <th className="text-cyan-400">MOD LAB</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-3 md:py-6">Acquisition</td>
                                    <td className="text-cyan-400">WORLDWIDE_DEPLOY</td>
                                </tr>
                                <tr>
                                    <td className="py-3 md:py-6">Artistry</td>
                                    <td className="text-cyan-400">HAND_FINISHED</td>
                                </tr>
                                <tr>
                                    <td className="py-3 md:py-6">Exclusivity</td>
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
                        className="w-full bg-cyan-400 text-black border-[6px] md:border-[10px] border-black shadow-[15px_15px_0px_#ec008c] md:shadow-[30px_30px_0px_#ec008c] py-10 md:py-20 text-[clamp(30px,8vw,110px)] font-black italic uppercase tracking-tighter mb-10 md:mb-20"
                    >
                        CLAIM_YOUR_SLOT
                    </motion.button>
                    {/* ------------------ SECTION 1: THE ARMORY (Categories) ------------------ */}
                    <section>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3 }}
                            className="mb-8 md:mb-12"
                        >
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase text-center mb-8 relative z-10">
                                <span className="bg-yellow-400 px-4 border-[6px] border-black shadow-[10px_10px_0px_#000]">
                                    The_Armory
                                </span>
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: 'HEADGEAR', link: '/store?cat=headgear', color: 'hover:text-cyan-400', shadow: '#00ffff' },
                                { title: 'FULL_SETS', link: '/store?cat=sets', color: 'hover:text-pink-500', shadow: '#ec008c' },
                                { title: 'PROPS', link: '/store?cat=props', color: 'hover:text-yellow-400', shadow: '#fdf003' }
                            ].map((cat, i) => (
                                <Link href={cat.link} key={cat.title} className="block h-48 md:h-64">
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                        whileHover={{ y: -10, boxShadow: `15px 15px 0px ${cat.shadow}` }}
                                        className="h-full bg-black border-[6px] border-black shadow-[10px_10px_0px_#000] flex items-center justify-center relative overflow-hidden group cursor-pointer"
                                    >
                                        <div className="absolute inset-0 bg-neutral-900 group-hover:bg-neutral-800 transition-colors" />
                                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] group-hover:scale-110 transition-transform duration-500" />

                                        {/* Preview Image Fade Placeholder */}
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-300`} />

                                        <h3 className={`relative z-10 text-3xl md:text-4xl font-black italic uppercase text-white ${cat.color} transition-colors`}>
                                            {cat.title}
                                        </h3>
                                        <div className="absolute bottom-4 right-4 text-[10px] md:text-xs font-mono text-neutral-500 uppercase">
                                        // Deployment_Ready
                                        </div>

                                        {/* Decoration Line */}
                                        <div className="absolute top-4 left-4 w-8 h-1 bg-neutral-800 group-hover:bg-white transition-colors" />
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* ------------------ SECTION 2: TECH SPECS (Materials) ------------------ */}
                    <section className="bg-white border-[8px] border-black p-6 md:p-12 shadow-[10px_10px_0px_#00ffff] md:shadow-[20px_20px_0px_#00ffff] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 md:p-4 font-mono text-[10px] md:text-xs font-bold bg-black text-white">
                            SPEC_SHEET_V9
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black italic uppercase mb-8 leading-none">
                                    MATERIAL<br />SUPERIORITY
                                </h2>
                                <ul className="space-y-6 font-mono text-sm md:text-lg">
                                    {[
                                        { num: "01", title: "High-Impact Resin:", desc: "Shatter-resistant polymer blend designed for durability, not just display.", color: "bg-cyan-400" },
                                        { num: "02", title: "Automotive Grade Paint:", desc: "We use the same pigments found on supercars. UV resistance guaranteed.", color: "bg-pink-500" },
                                        { num: "03", title: "Magnetic Keying:", desc: "Limbs snapping with neodymium magnets for satisfying tactical assembly.", color: "bg-yellow-400" }
                                    ].map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.2 }}
                                            className="flex items-start gap-4"
                                        >
                                            <span className={`${item.color} text-black px-2 font-bold mt-1 shadow-[4px_4px_0px_#000]`}>{item.num}</span>
                                            <span><strong>{item.title}</strong> {item.desc}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            <div className="h-full min-h-[350px] border-[4px] border-black bg-neutral-900 relative flex items-center justify-center overflow-hidden">
                                {/* Tech Diagram Visual */}
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00ffff_1px,transparent_1px)] [background-size:20px_20px]" />

                                <div className="relative w-64 h-64">
                                    {/* Layers Animation */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border-[2px] border-dashed border-neutral-700 rounded-full"
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-4 border-[2px] border-cyan-400/30 rounded-full"
                                    />

                                    {/* Core Visual */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-32 h-32 bg-cyan-400/10 rounded-full border-4 border-cyan-400 animate-pulse flex items-center justify-center relative">
                                            <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-20" />
                                            <span className="font-black italic text-cyan-400 text-center text-xs leading-none relative z-10">
                                                HIGH-IMPACT<br />RESIN CORE
                                            </span>
                                        </div>
                                    </div>

                                    {/* Floating Labels */}
                                    <motion.div
                                        animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                                        transition={{ repeat: Infinity, duration: 3 }}
                                        className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-cyan-400 px-2 py-1 text-[10px] font-mono border border-cyan-400"
                                    >
                                        DENSITY: 1.2g/cm³
                                    </motion.div>
                                </div>

                                {/* Pointers */}
                                <motion.div
                                    animate={{ x: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute top-1/4 left-5 md:left-8 bg-black text-white text-[10px] md:text-xs px-2 py-1 font-mono border border-white"
                                >
                                    ← SHATTER_PROOF
                                </motion.div>
                                <motion.div
                                    animate={{ x: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2.5 }}
                                    className="absolute bottom-1/3 right-5 md:right-8 bg-black text-white text-[10px] md:text-xs px-2 py-1 font-mono border border-white"
                                >
                                    UV_RESISTANT →
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* ------------------ SECTION 3: OPERATOR SPOTLIGHT ------------------ */}
                    <section className="relative">
                        <div className="bg-black text-white border-[8px] border-black p-6 md:p-10 -rotate-1 mx-0 md:mx-20 shadow-[10px_10px_0px_#fdf003] md:shadow-[20px_20px_0px_#fdf003]">
                            <div className="absolute -top-4 -left-2 md:-top-6 md:-left-6 bg-pink-500 text-white px-4 md:px-6 py-2 border-[4px] border-black font-black italic uppercase text-lg md:text-xl shadow-[4px_4px_0px_#000]">
                                Operator_Spotlight
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 items-center mt-6 md:mt-0">
                                <div className="w-full md:w-1/3 aspect-square bg-neutral-800 border-4 border-white grayscale hover:grayscale-0 transition-all cursor-pointer relative overflow-hidden group">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="font-black text-6xl opacity-20 italic">IMG</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full bg-cyan-400 text-black font-mono text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                                        VIEW_PROFILE
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-3xl md:text-4xl font-black italic uppercase mb-2 text-yellow-400">
                                        "NEON_VANGUARD"
                                    </h3>
                                    <p className="font-mono text-neutral-400 mb-6 uppercase text-sm">
                                        Custom Build by AGENT_KAI // Tokyo, JP
                                    </p>
                                    <p className="text-lg md:text-xl italic font-bold leading-relaxed mb-8">
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
                        className="bg-cyan-400 p-6 md:p-12 border-[8px] border-black text-center relative overflow-hidden"
                    >
                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <AnimatePresence mode="wait">
                                {!emailSubmitted ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className="text-4xl md:text-7xl font-black italic uppercase leading-none tracking-tighter drop-shadow-md text-white stroke-black" style={{ WebkitTextStroke: "1px black" }}>
                                            ENTER_EMAIL_FOR<br />EARLY_DROP_ACCESS
                                        </h2>
                                        <p className="font-mono text-sm md:text-lg font-bold bg-black text-white inline-block px-4 py-1">
                                        // LIMITED_SLOTS_ONLY. NO_SPAM.
                                        </p>

                                        <form
                                            onSubmit={(e) => { e.preventDefault(); setEmailSubmitted(true); }}
                                            className="flex flex-col md:flex-row gap-4"
                                        >
                                            <input
                                                type="email"
                                                required
                                                placeholder="ENTER_COMS_ID..."
                                                className="flex-1 bg-white border-[4px] border-black p-4 font-mono font-bold uppercase placeholder:text-neutral-400 focus:outline-none focus:shadow-[8px_8px_0px_#000] transition-shadow"
                                            />
                                            <button type="submit" className="bg-black text-white border-[4px] border-black px-8 py-4 font-black italic uppercase hover:bg-yellow-400 hover:text-black transition-colors shadow-[8px_8px_0px_#fff]">
                                                TRANSMIT
                                            </button>
                                        </form>

                                        <p className="text-[10px] font-mono font-bold uppercase opacity-60">
                                            *By transmitting, you agree to receive classified tactical updates. No spam. Only signal.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-black text-white border-[4px] border-white p-8 md:p-12 rotate-1"
                                    >
                                        <div className="text-6xl mb-4">✅</div>
                                        <h3 className="text-3xl md:text-5xl font-black italic uppercase text-cyan-400 mb-4">
                                            TRANSMISSION_RECEIVED
                                        </h3>
                                        <p className="font-mono font-bold text-lg">
                                            YOU ARE NOW ON THE LIST. STAND BY.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Background decoration */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                            <div className="absolute top-10 left-10 w-20 h-20 bg-black rotate-45" />
                            <div className="absolute bottom-[-20px] right-20 w-40 h-40 border-[20px] border-white rounded-full" />
                        </div>
                    </motion.section>
                </div>
            </main>

        </div>
    );
}
