"use client";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { ShoppingBag, User as UserIcon } from "lucide-react";
import Link from 'next/link';
import { logout } from '@/app/lib/actions'; // We need to create this

export default function Header({ user }: { user?: any }) {
  const { toggleCart, items } = useCartStore();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-[100] p-2 md:p-4 flex justify-center pointer-events-none"
    >
      <div className="bg-black border-[2px] md:border-[4px] border-white shadow-[4px_4px_0px_#ec008c] md:shadow-[8px_8px_0px_#ec008c] px-4 md:px-8 py-2 md:py-3 flex items-center gap-4 md:gap-12 pointer-events-auto -rotate-1 skew-x-[-5deg] md:skew-x-[-10deg] max-w-full overflow-x-auto custom-scrollbar-hide">

        {/* Nav Links - High contrast comic style */}
        <nav className="flex gap-4 md:gap-8 text-white font-black italic uppercase tracking-tighter text-xs md:text-xl whitespace-nowrap">
          <motion.a href="/#vault" whileHover={{ color: "#00ffff", x: -2 }} className="cursor-pointer">The_Vault</motion.a>
          <motion.a href="/#portal" whileHover={{ color: "#fdf003", x: -2 }} className="cursor-pointer">Portal</motion.a>
          <Link href="/hub" className="cursor-pointer hover:text-[#ec008c] transition-colors">Hub</Link>
        </nav>

        {/* User & Status */}
        <div className="flex items-center gap-3 md:gap-6 border-l-2 border-neutral-700 pl-4 md:pl-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#00ffff]" />
            <span className="text-cyan-400 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hidden lg:inline">Studio_Active</span>
          </div>

          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-white font-mono text-xs md:text-sm uppercase hidden sm:inline">
                AGENT_{user.name?.split(' ')[0]}
              </span>
              <button
                onClick={() => logout()}
                className="text-pink-500 hover:text-white font-bold text-[10px] md:text-xs uppercase whitespace-nowrap"
              >
                [Sign_Out]
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors">
              <UserIcon size={16} className="md:w-5 md:h-5" />
              <span className="font-bold italic uppercase text-xs md:text-sm hidden sm:inline">Login</span>
            </Link>
          )}
        </div>

        {/* Cart Trigger */}
        <div className="border-l-2 border-neutral-700 pl-4 md:pl-8">
          <button onClick={toggleCart} className="text-white hover:text-cyan-400 transition-colors relative">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[8px] md:text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border-2 border-black">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}