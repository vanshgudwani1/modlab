"use client";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-20 px-6 border-t-[12px] border-yellow-400 relative overflow-hidden">
      {/* Background Halftone for Grit */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:10px_10px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">

        {/* 1. BRAND FINAL SLAP */}
        <div className="md:col-span-5 space-y-6">
          <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-none text-cyan-400">
            MOD<br />LAB
          </h2>
          <div className="bg-white text-black p-4 rotate-1 border-2 border-black inline-block">
            <p className="font-mono text-xs font-bold uppercase tracking-widest">
              Origin: New Delhi, India // Studio_v2.6
            </p>
          </div>
          <p className="font-mono text-sm text-neutral-400 max-w-sm uppercase leading-tight italic">
            Architects of high-fidelity custom legends. Every figure is sculpted in Blender and hand-painted by our master artists.
          </p>
        </div>

        {/* 2. NAVIGATION (The "Checklist") */}
        <div className="md:col-span-3 space-y-8">
          <div>
            <h3 className="text-2xl font-black italic uppercase border-b-2 border-neutral-800 pb-2 mb-4">Sectors_</h3>
            <nav className="flex flex-col gap-2 font-black italic uppercase text-lg">
              <Link href="/#vault" className="cursor-pointer hover:text-cyan-400 transition-colors">The_Vault</Link>
              <Link href="/hub" className="cursor-pointer hover:text-pink-500 transition-colors">The_Hub</Link>
              <Link href="/#portal" className="cursor-pointer hover:text-yellow-400 transition-colors">Portal</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-2xl font-black italic uppercase border-b-2 border-neutral-800 pb-2 mb-4">Intel_</h3>
            <nav className="flex flex-col gap-2 font-black italic uppercase text-lg text-neutral-400">
              <Link href="/about" className="cursor-pointer hover:text-white transition-colors">Origins</Link>
              <Link href="/process" className="cursor-pointer hover:text-white transition-colors">Manufacturing</Link>
              <Link href="/terms" className="cursor-pointer hover:text-white transition-colors">Terms_&_Cond</Link>
            </nav>
          </div>
        </div>

        {/* 3. CONNECT (The "Social Matrix") */}
        <div className="md:col-span-4 space-y-6">
          <h3 className="text-2xl font-black italic uppercase border-b-2 border-neutral-800 pb-2">Uplink_Signal_</h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-neutral-900 border-2 border-neutral-800 p-4 flex items-center justify-center italic font-black uppercase text-xs hover:border-cyan-400 cursor-pointer">
              Instagram
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-neutral-900 border-2 border-neutral-800 p-4 flex items-center justify-center italic font-black uppercase text-xs hover:border-pink-500 cursor-pointer">
              ArtStation
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-neutral-900 border-2 border-neutral-800 p-4 flex items-center justify-center italic font-black uppercase text-xs hover:border-yellow-400 cursor-pointer">
              Twitter_X
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-neutral-900 border-2 border-neutral-800 p-4 flex items-center justify-center italic font-black uppercase text-xs hover:border-white cursor-pointer">
              Discord
            </motion.div>
          </div>
          <div className="mt-6 font-mono text-[10px] text-neutral-600 uppercase">
            © 2026 MOD LAB STUDIO. ALL RIGHTS RESERVED. // MADE IN INDIA.
          </div>
        </div>

      </div>

      {/* FOOTER MARQUEE (The Final Warning) */}
      <div className="absolute bottom-0 left-0 w-full bg-cyan-400 text-black py-2 overflow-hidden whitespace-nowrap border-t-4 border-black">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="inline-block font-black italic text-xs uppercase tracking-[1em]"
        >
          NOT A TOY // ADULT COLLECTIBLE ONLY // BATTLE READY // WORLDWIDE DEPLOYMENT // MOD LAB //
        </motion.div>
      </div>
    </footer>
  );
}