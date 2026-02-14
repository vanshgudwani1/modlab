'use client';

import { useActionState } from 'react';
import { register } from '@/app/lib/actions';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Initial state type definition isn't strictly needed for JS useActionState but good for TS
const initialState = {
    message: '',
    success: false
}

export default function RegisterPage() {
    const [state, dispatch, isPending] = useActionState(register, initialState);

    return (
        <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center p-4 pt-32">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full bg-white border-[8px] border-black shadow-[20px_20px_0px_#ec008c] p-10 relative"
            >
                <div className="absolute top-0 right-0 p-4 bg-cyan-400 border-l-[4px] border-b-[4px] border-black font-black italic">
                    NEW_RECRUIT
                </div>

                <h1 className="text-5xl font-black italic uppercase mb-8 underline decoration-pink-500">
                    Register
                </h1>

                <form action={dispatch} className="space-y-6">
                    <div>
                        <label className="block font-bold text-sm uppercase mb-2 font-mono" htmlFor="name">
                            Agent Name
                        </label>
                        <input
                            className="w-full bg-neutral-100 border-[4px] border-neutral-300 p-3 font-mono focus:border-pink-500 focus:outline-none transition-colors"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Commander Shepard"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-bold text-sm uppercase mb-2 font-mono" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="w-full bg-neutral-100 border-[4px] border-neutral-300 p-3 font-mono focus:border-pink-500 focus:outline-none transition-colors"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="agent@modlab.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-bold text-sm uppercase mb-2 font-mono" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full bg-neutral-100 border-[4px] border-neutral-300 p-3 font-mono focus:border-pink-500 focus:outline-none transition-colors"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <div aria-live="polite" aria-atomic="true">
                        {state?.message && (
                            <p className={`text-sm font-bold uppercase blink ${state.success ? 'text-green-600' : 'text-red-500'}`}>
                                {state.message}
                            </p>
                        )}
                        {state?.success && (
                            <div className="mt-4 p-4 bg-green-100 border-2 border-green-500">
                                <p className="font-mono text-xs">Redirecting to login...</p>
                                <Link href="/login" className="block w-full text-center bg-green-600 text-white font-bold py-2 mt-2 uppercase">
                                    Go To Login now
                                </Link>
                            </div>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-black text-white font-black italic uppercase py-4 border-[4px] border-transparent hover:border-pink-500 hover:text-pink-500 transition-all disabled:opacity-50"
                        aria-disabled={isPending}
                        disabled={state?.success}
                    >
                        {isPending ? 'Processing...' : 'Initialize_Account'}
                    </motion.button>
                </form>

                <p className="mt-8 text-center font-mono text-sm">
                    Already active?{' '}
                    <Link href="/login" className="font-bold underline decoration-cyan-400 hover:text-cyan-600">
                        Access_Vault
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
