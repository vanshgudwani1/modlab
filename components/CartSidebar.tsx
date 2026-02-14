"use client";

import { useCartStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function CartSidebar() {
    const { items, removeItem, isOpen, toggleCart, clearCart } = useCartStore();

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black z-[140]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white border-l-[8px] border-black z-[150] shadow-[-20px_0px_50px_rgba(0,0,0,0.5)] flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-cyan-400 p-6 border-b-[8px] border-black flex justify-between items-center">
                            <h2 className="text-4xl font-black italic uppercase flex items-center gap-3">
                                <ShoppingBag className="w-8 h-8" />
                                Cart_({items.length})
                            </h2>
                            <button
                                onClick={toggleCart}
                                className="bg-black text-white p-2 hover:bg-neutral-800 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-neutral-400 space-y-4">
                                    <ShoppingBag size={64} className="opacity-20" />
                                    <p className="font-mono uppercase text-sm font-bold">Your vault is empty.</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="flex gap-4 border-[4px] border-black p-4 shadow-[4px_4px_0px_#neutral-200]"
                                    >
                                        <div className="w-20 h-20 bg-neutral-200 border-2 border-black flex items-center justify-center shrink-0">
                                            <span className="font-black opacity-20 text-xs">IMG</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-black italic uppercase text-lg leading-tight">
                                                {item.name}
                                            </h3>
                                            <p className="font-mono text-sm text-neutral-500">
                                                Qty: {item.quantity} x ${item.price}
                                            </p>
                                            <p className="font-black text-cyan-600 mt-1">
                                                ${item.price * item.quantity}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-neutral-400 hover:text-red-500 transition-colors self-start"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t-[8px] border-black p-6 bg-neutral-50 space-y-6">
                            <div className="flex justify-between items-center text-2xl font-black italic uppercase">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <button
                                disabled={items.length === 0}
                                className="w-full bg-black text-white py-4 font-black italic uppercase text-2xl tracking-tighter disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-400 hover:text-black transition-colors border-[4px] border-transparent hover:border-black"
                                onClick={() => alert("Checkout not implemented yet in this demo!")}
                            >
                                SECURE_CHECKOUT
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
