import Link from "next/link";
import { MessageSquare, LogOut, LayoutDashboard } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

async function checkAdmin() {
    const session = await auth();
    if ((session?.user as any)?.role !== 'admin') redirect('/');
    return true;
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await checkAdmin();

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-neutral-800 p-6 flex flex-col">
                <div className="mb-10">
                    <h1 className="text-3xl font-black italic uppercase text-cyan-400">
                        MOD<br /><span className="text-white">ADMIN</span>
                    </h1>
                    <p className="font-mono text-xs text-neutral-500 mt-2">v2.0 // COMMAND_MODE</p>
                </div>

                <nav className="space-y-4 flex-1">
                    <Link href="/admin" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors font-bold uppercase text-sm">
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors font-bold uppercase text-sm">
                        <span className="text-lg font-mono">::</span> Inventory
                    </Link>
                    <Link href="/admin/hub" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors font-bold uppercase text-sm">
                        <MessageSquare size={18} /> Moderation
                    </Link>
                </nav>

                <div className="pt-6 border-t border-neutral-800">
                    <Link href="/" className="flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors font-bold uppercase text-sm">
                        <LogOut size={18} /> Exit_System
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
