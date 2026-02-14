import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-10 max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm font-bold hover:text-cyan-400 mb-12">
                <ArrowLeft size={16} />
                BACK_TO_HQ
            </Link>

            <div className="bg-white border-[8px] border-black shadow-[24px_24px_0px_#000] p-8 md:p-16">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase mb-12 border-b-[6px] border-black pb-8">
                    TERMS_&_CONDITIONS
                </h1>

                <section className="mb-12 bg-yellow-100 border-[4px] border-yellow-500 p-6 flex items-start gap-4">
                    <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={32} />
                    <div>
                        <h2 className="text-2xl font-black italic uppercase mb-2 text-yellow-800">
                            CRITICAL_NOTICE: MADE_TO_ORDER
                        </h2>
                        <p className="font-mono font-bold text-yellow-900">
                            ALL PRODUCTS ARE MADE TO ORDER. WE DO NOT KEEP STOCK.
                        </p>
                    </div>
                </section>

                <div className="space-y-12 font-mono text-neutral-800">
                    <section>
                        <h2 className="text-2xl font-black italic uppercase mb-4 flex items-center gap-2">
                            <span className="bg-black text-white px-2">01</span> Production Time
                        </h2>
                        <p className="leading-relaxed">
                            Because every unit is crafted individually, please allow <span className="font-bold">2-4 weeks</span> for production before shipping. High-complexity custom orders may require additional time. We prioritize quality over speed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black italic uppercase mb-4 flex items-center gap-2">
                            <span className="bg-black text-white px-2">02</span> Returns & Refunds
                        </h2>
                        <p className="leading-relaxed">
                            Due to the custom, made-to-order nature of our gear, <span className="font-bold bg-pink-200 px-1">ALL SALES ARE FINAL</span>. We cannot accept returns for change of mind.
                        </p>
                        <p className="mt-4 leading-relaxed">
                            If your unit arrives damaged or defective, you must transmit proof (photos) within 48 hours of delivery receipt. We will authorize repairs or replacements for documented tactical failures.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black italic uppercase mb-4 flex items-center gap-2">
                            <span className="bg-black text-white px-2">03</span> Shipping Protocol
                        </h2>
                        <p className="leading-relaxed">
                            We deploy units worldwide. Users are responsible for any local customs duties or import taxes. Once the package is handed to the courier, ModLab is not liable for carrier delays, though we will assist in tracking lost signals.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black italic uppercase mb-4 flex items-center gap-2">
                            <span className="bg-black text-white px-2">04</span> Artistry Disclaimer
                        </h2>
                        <p className="leading-relaxed">
                            These are hand-painted artisan items, not factory injections. Slight variations in color, weathering, and finish are expected and celebrated as part of the unique character of each unit.
                        </p>
                    </section>

                    <div className="mt-16 pt-8 border-t-4 border-neutral-200 text-center text-sm text-neutral-500">
                        <p>LAST_UPDATED: 2026-02-12</p>
                        <p>MOD LAB STUDIO // END_OF_FILE</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
