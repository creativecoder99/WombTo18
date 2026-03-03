"use client";
import { ArrowRight, BookOpen, Stethoscope, Leaf, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const iconMap = {
    "Healthcare": <Stethoscope className="w-5 h-5" />,
    "Education": <BookOpen className="w-5 h-5" />,
    "Environment": <Leaf className="w-5 h-5" />
};

export default function ProgramCards() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
                const response = await axios.get(`${API_URL}/programs`);
                setPrograms(response.data);
            } catch (error) {
                console.error("Failed to fetch programs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, []);
    return (
        <section id="programs" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Causes That Need You</h2>
                        <p className="text-lg text-slate-600">Choose a program that speaks to you and make a direct impact where it matters most.</p>
                    </div>
                    <button className="text-secondary font-bold flex items-center gap-2 hover:text-primary transition-colors">
                        View All Programs <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64 w-full">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programs.map((prog) => {
                            const percentage = (prog.totalRaised / prog.totalRequired) * 100;
                            return (
                                <div key={prog.id} className="group rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/40 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                                    <div className="h-48 bg-slate-100 mb-6 relative overflow-hidden">
                                        {prog.imageUrl ? (
                                            <img src={prog.imageUrl} alt={prog.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-green-50"></div>
                                        )}
                                        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-secondary flex items-center gap-1.5 shadow-sm">
                                            {iconMap[prog.category] || <Leaf className="w-5 h-5" />} {prog.category}
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1">
                                            <span className={`w-2 h-2 rounded-full ${prog.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span> {prog.isActive ? 'Active' : 'Closed'}
                                        </div>
                                    </div>

                                    <div className="p-6 pt-0">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors">{prog.name}</h3>
                                        <p className="text-slate-600 text-sm mb-6 line-clamp-2">{prog.description}</p>

                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm font-semibold mb-2">
                                                <span className="text-secondary">₹{prog.totalRaised.toLocaleString('en-IN')} raised</span>
                                                <span className="text-slate-400">of ₹{prog.totalRequired.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                                <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-6">
                                            <span className="text-sm text-slate-500 font-medium">Helping {prog.beneficiariesHelped} people</span>
                                            <Link href="/donate" className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full font-bold text-sm transition-colors shadow-md shadow-orange-500/20">
                                                Donate
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
