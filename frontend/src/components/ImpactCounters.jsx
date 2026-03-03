"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Heart, Users, Target, Leaf, Loader2 } from "lucide-react";
import axios from "axios";

const Counter = ({ end, label, icon }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, end]);

    return (
        <div ref={ref} className="bg-white p-8 rounded-3xl flex flex-col items-center text-center shadow-lg shadow-slate-200/50 border border-slate-100">
            <div className="w-16 h-16 bg-green-50 text-secondary rounded-2xl flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
                {count.toLocaleString()}+
            </h3>
            <p className="text-slate-500 font-medium">{label}</p>
        </div>
    );
};

export default function ImpactCounters() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImpact = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
                const response = await axios.get(`${API_URL}/impact`);
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch impact metrics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchImpact();
    }, []);

    return (
        <section id="impact" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Numbers That Inspire</h2>
                    <p className="text-lg text-slate-600">Our measurable impact over the last 12 months</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-48 w-full">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : data ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Counter end={data.financials?.received || 0} label="Funds Raised (INR)" icon={<Heart className="w-8 h-8" />} />
                        <Counter end={data.impactMetrics?.childrenRegistered || 0} label="Beneficiaries" icon={<Users className="w-8 h-8" />} />
                        <Counter end={data.programs?.length || 0} label="Active Programs" icon={<Target className="w-8 h-8" />} />
                        <Counter end={data.impactMetrics?.treesPlanted || 0} label="Trees Planted" icon={<Leaf className="w-8 h-8" />} />
                    </div>
                ) : null}
            </div>

            <div className="absolute top-1/2 left-0 w-full h-full bg-white/50 -skew-y-3 origin-top-left -z-0" />
        </section>
    );
}
