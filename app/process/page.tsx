import Link from "next/link";
import { ArrowLeft, Cpu, Hammer, Paintbrush, Package } from "lucide-react";

export default function ProcessPage() {
    const steps = [
        {
            icon: Cpu,
            title: "Digital_Sculpt",
            desc: "It starts in the neural link. We sculpt high-fidelity 3D models using industry-standard tools, focusing on aggressive silhouettes and intricate mechanical details.",
            color: "bg-cyan-400"
        },
        {
            icon: Package, // Using Package as close proxy for 3D Printer/Box
            title: "Resin_Print",
            desc: "Files are transmitted to our 8K resin fabricators. We print at 0.03mm layer height for invisible layer lines and maximum detail retention.",
            color: "bg-pink-500"
        },
        {
            icon: Hammer,
            title: "Prep_&_Assembly",
            desc: "Supports are removed. Resin is cured. Parts are sanded, keyed, and magnetized. This is the skeleton of the beast.",
            color: "bg-yellow-400"
        },
        {
            icon: Paintbrush,
            title: "Hand_Paint",
            desc: "The soul is added. Using airbrushes and fine bristles, we apply base coats, shadows, highlights, and specialized weathering effects.",
            color: "bg-green-500"
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-10 max-w-6xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm font-bold hover:text-cyan-400 mb-12">
                <ArrowLeft size={16} />
                BACK_TO_HQ
            </Link>

            <header className="mb-20 text-center">
                <h1 className="text-5xl md:text-7xl font-black italic uppercase mb-4 tracking-tighter">
                    MANUFACTURING_LOGS
                </h1>
                <p className="font-mono text-xl text-neutral-600">
                    HOW_IT_IS_MADE // THE_PROCESS
                </p>
            </header>

            <div className="relative border-l-[6px] border-black ml-4 md:ml-1/2 md:pl-0 space-y-16 py-10">
                {steps.map((step, i) => (
                    <div key={i} className={`relative pl-12 md:pl-0 md:flex ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center gap-16`}>

                        {/* Timeline Node */}
                        <div className={`absolute left-[-19px] md:left-1/2 md:ml-[-21px] w-10 h-10 border-[4px] border-black ${step.color} z-10 shadow-[4px_4px_0px_#000] rounded-sm flex items-center justify-center`}>
                            <div className="w-2 h-2 bg-black rounded-full" />
                        </div>

                        {/* Content Card */}
                        <div className="flex-1">
                            <div className={`bg-white border-[6px] border-black p-8 shadow-[12px_12px_0px_#000] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[16px_16px_0px_#000] transition-all group ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                <step.icon size={32} className="mb-4 inline-block" strokeWidth={2.5} />
                                <h2 className="text-3xl font-black italic uppercase mb-3 group-hover:text-cyan-600 transition-colors">
                                    {step.title}
                                </h2>
                                <p className="font-mono text-neutral-600 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>

                        {/* Spacer for alternate side */}
                        <div className="flex-1 hidden md:block" />
                    </div>
                ))}
            </div>
        </div>
    );
}
