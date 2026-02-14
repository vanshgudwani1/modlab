'use client';

import { useCartStore } from "@/lib/store";
import { useActionState, useEffect, useState } from "react";
import { placeOrder } from "@/app/lib/actions";
import Link from "next/link";

export default function CheckoutPage() {
    const { items, clearCart } = useCartStore();
    const [isSuccess, setIsSuccess] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Calculate totals (Client side for display, Server will re-calc for security)
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 15.00;
    const total = subtotal + shipping;

    const initialState = {
        message: '',
        success: false
    };

    // @ts-ignore
    const [state, formAction] = useActionState(placeOrder, initialState);

    // Hydration fix
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (state?.success) {
            setIsSuccess(true);
            clearCart();
        }
    }, [state?.success, clearCart]);

    if (!mounted) return <div className="min-h-screen pt-32 text-center font-mono">LOADING_SECURE_CHANNEL...</div>;

    if (isSuccess) {
        return (
            <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center">
                <div className="bg-white border-[6px] border-black p-10 max-w-2xl text-center shadow-[16px_16px_0px_#00ff00]">
                    <h1 className="text-5xl font-black italic uppercase text-green-600 mb-6">MISSION_CONFIRMED</h1>
                    <p className="font-mono text-lg mb-8">Your supply drop has been authorized. Prepare for deployment.</p>
                    <Link href="/store" className="inline-block bg-black text-white px-8 py-4 font-black italic uppercase text-xl hover:bg-cyan-400 hover:text-black border-[3px] border-black transition-colors">
                        Return_to_Base
                    </Link>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-24 px-4 text-center">
                <h1 className="text-4xl font-black italic uppercase mb-4">Cart_Empty // Null_Void</h1>
                <Link href="/store" className="inline-block bg-cyan-400 text-black px-6 py-3 font-bold uppercase border-[3px] border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all">
                    Acquire_Assets
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* LEFT: FORM */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 border-b-4 border-black pb-4">
                        <span className="text-4xl">🔒</span>
                        <h1 className="text-4xl font-black italic uppercase">Secure_Checkout</h1>
                    </div>

                    <form action={formAction} className="space-y-6">
                        {/* Hidden inputs to pass cart data to server action */}
                        <input type="hidden" name="cartData" value={JSON.stringify(items)} />

                        {state?.message && !state.success && (
                            <div className="bg-red-500 text-white p-4 font-bold uppercase border border-black">
                                Error: {state.message}
                            </div>
                        )}

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold uppercase bg-black text-white px-2 inline-block">Shipping_Intel</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="firstName" required placeholder="First Name" className="w-full bg-white border-[3px] border-neutral-300 p-3 font-mono focus:border-cyan-400 outline-none" />
                                <input type="text" name="lastName" required placeholder="Last Name" className="w-full bg-white border-[3px] border-neutral-300 p-3 font-mono focus:border-cyan-400 outline-none" />
                            </div>
                            <input type="email" name="email" required placeholder="Email Address" className="w-full bg-white border-[3px] border-neutral-300 p-3 font-mono focus:border-cyan-400 outline-none" />
                            <input type="text" name="address" required placeholder="Street Address" className="w-full bg-white border-[3px] border-neutral-300 p-3 font-mono focus:border-cyan-400 outline-none" />
                            <div className="grid grid-cols-3 gap-4">
                                <input type="text" name="city" required placeholder="City" className="col-span-1 bg-white border-[3px] border-neutral-300 p-3 font-mono focus:border-cyan-400 outline-none" />
                                <input type="text" name="state" required placeholder="State" className="col-span-1 bg-white border-[3px] border-neutral-300 p-3 font-mono focus:border-cyan-400 outline-none" />
                                <input type="text" name="zip" required placeholder="ZIP" className="col-span-1 bg-white border-[3px] border-neutral-300 p-3 font-mono focus:border-cyan-400 outline-none" />
                            </div>
                        </section>

                        <section className="space-y-4 opacity-50 pointer-events-none">
                            <h2 className="text-xl font-bold uppercase bg-neutral-500 text-white px-2 inline-block">Payment_Method</h2>
                            <div className="p-4 border-[3px] border-neutral-300 bg-neutral-100 flex items-center justify-between">
                                <span className="font-mono">CREDIT_CARD // (Simulated)</span>
                                <span className="font-bold text-green-600">ACTIVE</span>
                            </div>
                        </section>

                        <button type="submit" className="w-full bg-yellow-400 text-black font-black italic uppercase text-2xl py-4 border-[4px] border-black shadow-[8px_8px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all flex justify-center items-center gap-4">
                            Confirm_Deployment &rarr;
                        </button>
                        <p className="text-xs font-mono text-center text-neutral-500 mt-4">
                            By clicking confirm, you authorize the requisition of these assets.
                        </p>
                    </form>
                </div>

                {/* RIGHT: SUMMARY */}
                <div className="bg-neutral-100 p-8 border-[4px] border-black h-fit">
                    <h2 className="text-2xl font-black italic uppercase border-b-2 border-black pb-4 mb-6">Requisition_Manifest</h2>
                    <div className="space-y-4 mb-8">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-neutral-300 border border-black overflow-hidden">
                                        {/* Image placeholder would go here */}
                                    </div>
                                    <span className="font-bold uppercase w-48 truncate">{item.name}</span>
                                </div>
                                <div className="font-mono">x{item.quantity}</div>
                                <div className="font-mono font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t-2 border-black pt-4 space-y-2 font-mono text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-black italic mt-4 border-t-2 border-dashed border-black pt-4">
                            <span>TOTAL</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
