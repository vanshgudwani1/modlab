import { prisma } from "@/lib/prisma";
import { DollarSign, ShoppingBag, Users as UsersIcon } from "lucide-react";

export default async function AdminDashboard() {
    const stats = {
        totalUsers: await prisma.user.count(),
        totalOrders: await prisma.order.count(),
        totalRevenue: (await prisma.order.findMany({ include: { product: true } }))
            .reduce((acc, order) => acc + order.product.price, 0),
        lowStock: await prisma.product.count({ where: { stock: { lte: 10 } } })
    };

    return (
        <div className="space-y-8">
            <h2 className="text-4xl font-black italic uppercase text-white mb-8">System_Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-800 p-6 border-l-4 border-cyan-400">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-mono text-neutral-400 uppercase text-xs">Total Revenue</h3>
                        <DollarSign className="text-cyan-400" size={20} />
                    </div>
                    <p className="text-3xl font-black italic text-white">${stats.totalRevenue.toLocaleString()}</p>
                </div>

                <div className="bg-neutral-800 p-6 border-l-4 border-pink-500">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-mono text-neutral-400 uppercase text-xs">Active Orders</h3>
                        <ShoppingBag className="text-pink-500" size={20} />
                    </div>
                    <p className="text-3xl font-black italic text-white">{stats.totalOrders}</p>
                </div>

                <div className="bg-neutral-800 p-6 border-l-4 border-yellow-400">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-mono text-neutral-400 uppercase text-xs">Operatives</h3>
                        <UsersIcon className="text-yellow-400" size={20} />
                    </div>
                    <p className="text-3xl font-black italic text-white">{stats.totalUsers}</p>
                </div>
            </div>

            <div className="bg-neutral-800 p-6 border border-neutral-700">
                <h3 className="text-xl font-bold uppercase text-white mb-4">System_Alerts</h3>
                {stats.lowStock > 0 ? (
                    <div className="bg-red-500/10 text-red-500 p-4 font-mono text-sm border border-red-500/20">
                        ⚠ WARNING: {stats.lowStock} products are running low on stock. Check Inventory.
                    </div>
                ) : (
                    <div className="bg-green-500/10 text-green-500 p-4 font-mono text-sm border border-green-500/20">
                        ✔ All systems nominal. Inventory levels sufficient.
                    </div>
                )}
            </div>
        </div>
    );
}
