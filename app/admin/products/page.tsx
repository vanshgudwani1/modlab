import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/lib/actions";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black italic uppercase text-white">Inventory_Matrix</h2>
                <Link href="/admin/products/create" className="bg-cyan-400 text-black px-4 py-2 font-bold uppercase flex items-center gap-2 hover:bg-white transition-colors">
                    <Plus size={18} /> New_Asset
                </Link>
            </div>

            <div className="bg-neutral-800 border border-neutral-700 overflow-hidden">
                <table className="w-full text-left text-sm text-neutral-400">
                    <thead className="bg-neutral-900 uppercase font-mono text-xs">
                        <tr>
                            <th className="p-4 border-b border-neutral-800">Product Name</th>
                            <th className="p-4 border-b border-neutral-800">Slug</th>
                            <th className="p-4 border-b border-neutral-800">Price</th>
                            <th className="p-4 border-b border-neutral-800">Stock</th>
                            <th className="p-4 border-b border-neutral-800 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-neutral-700 hover:bg-neutral-700/50 transition-colors">
                                <td className="p-4 font-bold text-white">{product.name}</td>
                                <td className="p-4 font-mono">{product.slug}</td>
                                <td className="p-4 text-cyan-400">₹{product.price}</td>
                                <td className={`p-4 font-mono font-bold ${product.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>
                                    {product.stock}
                                </td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <Link href={`/admin/products/${product.id}`} className="p-2 bg-neutral-900 border border-neutral-600 hover:border-yellow-400 text-yellow-400 font-mono font-bold text-xs uppercase block text-center">
                                        Edit
                                    </Link>
                                    <form action={async () => {
                                        'use server';
                                        await deleteProduct(product.id);
                                    }}>
                                        <button className="p-2 bg-neutral-900 border border-neutral-600 hover:border-red-500 text-red-500">
                                            <Trash2 size={16} />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
