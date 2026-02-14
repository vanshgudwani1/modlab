'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
    const [errorMessage, dispatch, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center p-4 pt-32">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full bg-white border-[8px] border-black shadow-[20px_20px_0px_#000] p-10 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 bg-yellow-400 border-l-[4px] border-b-[4px] border-black font-black italic">
                    SECURE_ACCESS
                </div>

                <h1 className="text-5xl font-black italic uppercase mb-8 underline decoration-cyan-400">
                    Login
                </h1>

                <form action={dispatch} className="space-y-6">
                    <div>
                        <label className="block font-bold text-sm uppercase mb-2 font-mono" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="w-full bg-neutral-100 border-[4px] border-neutral-300 p-3 font-mono focus:border-cyan-400 focus:outline-none transition-colors"
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
                            className="w-full bg-neutral-100 border-[4px] border-neutral-300 p-3 font-mono focus:border-cyan-400 focus:outline-none transition-colors"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {errorMessage && (
                            <p className="text-sm text-red-500 font-bold uppercase blink">
                                {errorMessage}
                            </p>
                        )}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-black text-white font-black italic uppercase py-4 border-[4px] border-transparent hover:border-cyan-400 hover:text-cyan-400 transition-all disabled:opacity-50"
                        aria-disabled={isPending}
                    >
                        {isPending ? 'Authenticating...' : 'Enter_Vault'}
                    </motion.button>
                </form>

                <p className="mt-8 text-center font-mono text-sm">
                    Need clearance?{' '}
                    <Link href="/register" className="font-bold underline decoration-pink-500 hover:text-pink-600">
                        Register_New_Agent
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
