"use client";
import { PieChart, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FinancialTransparency() {
    const [fin, setFin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFin = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
                const response = await axios.get(`${API_URL}/impact`);
                setFin(response.data.financials);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchFin();
    }, []);

    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-green-400 text-sm font-bold mb-6 border border-white/20">
                                <PieChart className="w-4 h-4" /> 100% Transparent
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Radical Financial Transparency</h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                We believe in showing you exactly where every rupee goes. Browse our interactive dashboard to trace program-level funding pools and verifiable financial logs.
                            </p>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-full bg-white/10 rounded-full h-3">
                                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                    <span className="min-w-[120px] text-sm font-bold">85% Programs</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-full bg-white/10 rounded-full h-3">
                                        <div className="bg-blue-400 h-3 rounded-full" style={{ width: '10%' }}></div>
                                    </div>
                                    <span className="min-w-[120px] text-sm font-bold text-slate-300">10% Operations</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-full bg-white/10 rounded-full h-3">
                                        <div className="bg-orange-500 h-3 rounded-full" style={{ width: '5%' }}></div>
                                    </div>
                                    <span className="min-w-[120px] text-sm font-bold text-slate-300">5% Fundraising</span>
                                </div>
                            </div>

                            <button className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all">
                                View Dashboard <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative">
                            <div className="aspect-square rounded-full border border-white/10 flex items-center justify-center p-8 relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent rounded-full animate-pulse blur-3xl"></div>
                                <div className="text-center relative z-10">
                                    <div className="text-7xl md:text-9xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">{fin?.utilizationPercentage || 85}<span className="text-4xl lg:text-5xl text-green-400">%</span></div>
                                    <p className="text-lg font-bold text-slate-300 tracking-wider uppercase">Directly to Programs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
