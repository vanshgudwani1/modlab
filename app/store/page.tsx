import Link from "next/link";

export default function StoreHubPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-4 md:px-10 bg-neutral-100 flex items-center justify-center">
            <main className="max-w-7xl mx-auto w-full space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-6xl md:text-9xl font-black italic uppercase leading-none tracking-tighter text-black">
                        MODLAB<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 drop-shadow-[5px_5px_0px_#000]">STORE</span>
                    </h1>
                    <p className="font-mono text-xl font-bold bg-black text-white inline-block px-4 py-1 transform -rotate-2">
                        // SELECT_YOUR_PATH
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12 perspective-[1000px]">

                    {/* OPTION 1: CATALOG */}
                    <Link href="/store/catalog" className="group">
                        <div className="h-[400px] md:h-[500px] bg-white border-[8px] border-black shadow-[15px_15px_0px_#000] p-8 flex flex-col justify-between hover:-translate-y-4 hover:shadow-[30px_30px_0px_#22d3ee] hover:rotate-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 font-mono font-bold text-4xl opacity-10">01</div>
                            <div className="space-y-4 relative z-10">
                                <h2 className="text-5xl font-black italic uppercase leading-none">CORE<br />CATALOG</h2>
                                <p className="font-mono text-sm font-bold text-neutral-500">
                                    // STANDARD_ISSUE_GEAR<br />
                                    // READY_TO_SHIP
                                </p>
                            </div>
                            <div className="w-full aspect-video bg-neutral-200 border-4 border-black grayscale group-hover:grayscale-0 transition-all flex items-center justify-center">
                                <span className="font-black text-4xl opacity-20">BROWSE</span>
                            </div>
                            <button className="w-full bg-black text-white py-3 font-black italic uppercase group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                                ENTER_CATALOG
                            </button>
                        </div>
                    </Link>

                    {/* OPTION 2: LIMITED RUNS */}
                    <Link href="/store/limited" className="group">
                        <div className="h-[400px] md:h-[500px] bg-neutral-900 border-[8px] border-yellow-400 shadow-[15px_15px_0px_#000] p-8 flex flex-col justify-between hover:-translate-y-4 hover:shadow-[30px_30px_0px_#fdf003] hover:-rotate-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 font-mono font-bold text-4xl opacity-10 text-white">02</div>
                            <div className="space-y-4 relative z-10">
                                <h2 className="text-5xl font-black italic uppercase leading-none text-white">LIMITED<br /><span className="text-yellow-400">DROPS</span></h2>
                                <p className="font-mono text-sm font-bold text-neutral-400">
                                    // EXCLUSIVE_ACCESS<br />
                                    // HIGH_RARITY
                                </p>
                            </div>
                            <div className="w-full aspect-video bg-black border-4 border-yellow-400 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-20 animate-pulse"></div>
                                <span className="font-black text-4xl text-white opacity-20">ACCESS</span>
                            </div>
                            <button className="w-full bg-yellow-400 text-black py-3 font-black italic uppercase hover:bg-white transition-colors">
                                CHECK_DROPS
                            </button>
                        </div>
                    </Link>

                    {/* OPTION 3: THE FORGE (CUSTOM) */}
                    <div className="group relative">
                        <div className="h-[400px] md:h-[500px] bg-black border-[8px] border-pink-500 shadow-[15px_15px_0px_#000] p-8 flex flex-col justify-between hover:-translate-y-4 hover:shadow-[30px_30px_0px_#ec008c] transition-all duration-300 relative overflow-hidden z-10">
                            <div className="absolute top-0 right-0 p-4 font-mono font-bold text-4xl opacity-10 text-white">03</div>
                            <div className="space-y-4 relative z-10">
                                <h2 className="text-5xl font-black italic uppercase leading-none text-white"><span className="text-pink-500">THE</span><br />FORGE</h2>
                                <p className="font-mono text-sm font-bold text-pink-500">
                                    // CUSTOM_COMMISSIONS<br />
                                    // BUILD_YOUR_OWN
                                </p>
                            </div>
                            <div className="space-y-3">
                                <Link href="/custom/miniature" className="block w-full bg-pink-500 text-white py-3 font-black italic uppercase text-center border-2 border-transparent hover:bg-white hover:text-pink-500 hover:border-pink-500 transition-colors">
                                    CUSTOM_MINI
                                </Link>
                                <Link href="/custom/commission" className="block w-full bg-transparent text-white border-2 border-white py-3 font-black italic uppercase text-center hover:bg-white hover:text-black transition-colors">
                                    COMMISSION_REQ
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
