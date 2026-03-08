'use client';

import { useActionState } from 'react';
import { createProduct } from '@/app/lib/actions';
import Link from 'next/link';

const initialState = {
    message: '',
    success: false
};

export default function CreateProductPage() {
    // @ts-ignore
    const [state, formAction] = useActionState(createProduct, initialState);

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black italic uppercase text-white">New_Asset_Protocol</h2>
                <Link href="/admin/products" className="text-neutral-400 hover:text-white font-mono text-xs uppercase underline">
                    Cancel_Operation
                </Link>
            </div>

            <form action={formAction} className="bg-neutral-800 p-8 border border-neutral-700 space-y-6">
                {state?.message && (
                    <div className={`p-4 font-bold uppercase ${state.success ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}>
                        {state.message}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-neutral-400 text-xs font-mono uppercase">Product Name</label>
                    <input type="text" name="name" required className="w-full bg-neutral-900 border border-neutral-700 p-3 text-white focus:border-cyan-400 outline-none" placeholder="e.g. CYBER_NINJA_MK1" />
                </div>

                <div className="space-y-2">
                    <label className="text-neutral-400 text-xs font-mono uppercase">Slug (ID)</label>
                    <input type="text" name="slug" required className="w-full bg-neutral-900 border border-neutral-700 p-3 text-white focus:border-cyan-400 outline-none" placeholder="e.g. cyber-ninja-mk1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-neutral-400 text-xs font-mono uppercase">Base Price (INR)</label>
                        <input type="number" name="price" step="0.01" required className="w-full bg-neutral-900 border border-neutral-700 p-3 text-white focus:border-cyan-400 outline-none" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-neutral-400 text-xs font-mono uppercase">Discount Price (INR)</label>
                        <input type="number" name="discountPrice" step="0.01" className="w-full bg-neutral-900 border border-neutral-700 p-3 text-white focus:border-cyan-400 outline-none" placeholder="0.00" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-neutral-400 text-xs font-mono uppercase">Category</label>
                        <select name="category" className="w-full bg-neutral-900 border border-neutral-700 p-3 text-white focus:border-cyan-400 outline-none uppercase font-mono text-sm">
                            <option value="figures">Figures</option>
                            <option value="accessories">Accessories</option>
                            <option value="custom">Custom</option>
                            <option value="digital">Digital</option>
                            <option value="merch">Merch</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-neutral-400 text-xs font-mono uppercase">Stock Count</label>
                        <input type="number" name="stock" required className="w-full bg-neutral-900 border border-neutral-700 p-3 text-white focus:border-cyan-400 outline-none" placeholder="0" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-neutral-400 text-xs font-mono uppercase">Description</label>
                    <textarea name="description" rows={4} required className="w-full bg-neutral-900 border border-neutral-700 p-3 text-white focus:border-cyan-400 outline-none" placeholder="Asset details..." />
                </div>

                <div className="space-y-2">
                    <label className="text-neutral-400 text-xs font-mono uppercase">Image File</label>
                    <input type="file" name="image" accept="image/*" className="w-full bg-neutral-900 border border-neutral-700 p-3 text-white focus:border-cyan-400 outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="isLimited" className="w-5 h-5 accent-cyan-400" />
                            <span className="text-white font-bold uppercase">Limited Run?</span>
                        </label>
                    </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="isFeatured" className="w-5 h-5 accent-cyan-400" />
                            <span className="text-white font-bold uppercase">Featured?</span>
                        </label>
                    </div>
                </div>

                <button type="submit" className="w-full bg-cyan-400 hover:bg-white text-black font-black italic uppercase py-3 border-[3px] border-black shadow-[4px_4px_0px_#fff] transition-all active:translate-y-1 active:shadow-none flex justify-center items-center gap-2">
                    DEPLOY_ASSET
                </button>
            </form>
        </div>
    );
}
