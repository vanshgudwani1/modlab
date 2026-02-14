import Link from "next/link";

export default function CommunityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-10">
            <main className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter text-black">
                        MODLAB<br />
                        <span className="text-pink-500 drop-shadow-[4px_4px_0px_#000]">HUB</span>
                    </h1>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-4 border-b-4 border-black pb-8">
                    <Link href="/hub" className="px-6 py-3 bg-black text-white font-black italic uppercase text-xl hover:bg-cyan-400 hover:text-black transition-colors border-[3px] border-black">
                        Hub_Feed
                    </Link>
                    <Link href="/hub/forums" className="px-6 py-3 bg-white text-black font-black italic uppercase text-xl hover:bg-yellow-400 border-[3px] border-black transition-colors">
                        Tactical_Forums
                    </Link>
                    <Link href="/hub/announcements" className="px-6 py-3 bg-white text-black font-black italic uppercase text-xl hover:bg-pink-500 hover:text-white border-[3px] border-black transition-colors">
                        Intel_Drops
                    </Link>
                </div>

                {children}
            </main>
        </div>
    );
}
