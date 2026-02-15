"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { ShoppingBag, User as UserIcon, Menu, X } from "lucide-react";
import Link from 'next/link';
import { logout } from '@/app/lib/actions';

export default function Header({ user }: { user?: any }) {
  const { toggleCart, items } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-[100] p-2 md:p-4 flex justify-center pointer-events-none"
      >
        <div className="bg-black border-[2px] md:border-[4px] border-white shadow-[4px_4px_0px_#ec008c] md:shadow-[8px_8px_0px_#ec008c] px-4 md:px-8 py-2 md:py-3 flex items-center justify-between md:justify-center gap-4 md:gap-12 pointer-events-auto -rotate-1 skew-x-[-5deg] md:skew-x-[-10deg] w-full max-w-[95%] md:max-w-fit">

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="md:hidden text-white hover:text-cyan-400">
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-4 md:gap-8 text-white font-black italic uppercase tracking-tighter text-xl whitespace-nowrap">
            <Link href="/#vault" className="cursor-pointer hover:text-cyan-400 transition-colors">The_Vault</Link>
            <Link href="/#portal" className="cursor-pointer hover:text-yellow-400 transition-colors">Portal</Link>
            <Link href="/hub" className="cursor-pointer hover:text-[#ec008c] transition-colors">Hub</Link>
          </nav>

          {/* Mobile Logo / Placeholder if needed (Optional) */}
          <div className="md:hidden text-white font-black italic uppercase text-sm tracking-tighter">
            MOD LAB
          </div>

          {/* User & Status (Desktop) */}
          <div className="hidden md:flex items-center gap-3 md:gap-6 border-l-2 border-neutral-700 pl-4 md:pl-8">
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
          <div className="border-l-0 md:border-l-2 border-neutral-700 pl-0 md:pl-8">
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-sm pt-24 px-6 md:hidden"
          >
            {/* Close Button */}
            <button
              onClick={toggleMobileMenu}
              className="absolute top-6 right-6 text-white hover:text-red-500 border-2 border-white p-2"
            >
              <X className="w-8 h-8" />
            </button>

            <nav className="flex flex-col gap-8 text-white font-black italic uppercase tracking-tighter text-4xl">
              <Link href="/#vault" onClick={toggleMobileMenu} className="hover:text-cyan-400">The_Vault</Link>
              <Link href="/#portal" onClick={toggleMobileMenu} className="hover:text-yellow-400">Portal</Link>
              <Link href="/hub" onClick={toggleMobileMenu} className="hover:text-[#ec008c]">Hub</Link>

              <div className="h-1 w-full bg-neutral-800 my-4" />

              {/* Mobile User Actions */}
              {user ? (
                <div className="space-y-4">
                  <div className="text-sm font-mono text-neutral-400">Signed in as AGENT_{user.name?.split(' ')[0]}</div>
                  <button onClick={() => { logout(); toggleMobileMenu(); }} className="text-pink-500 hover:text-white">
                    [TERMINATE_SESSION]
                  </button>
                </div>
              ) : (
                <Link href="/login" onClick={toggleMobileMenu} className="flex items-center gap-4 hover:text-cyan-400">
                  <UserIcon className="w-8 h-8" />
                  LOGIN
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}