"use client";
import { Shield, Lock, FileText, CheckSquare, Building } from "lucide-react";

export default function TrustSection() {
    const trustItems = [
        { icon: <Building />, title: "Section 8 Registered" },
        { icon: <Lock />, title: "Razorpay Secure" },
        { icon: <FileText />, title: "80G Tax Benefits" },
        { icon: <Shield />, title: "100% Transparent" },
        { icon: <CheckSquare />, title: "12A Approved" },
    ];

    return (
        <section className="py-12 bg-white border-b border-slate-100 relative z-20">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-center text-sm font-bold tracking-widest text-slate-400 uppercase mb-8">
                    Officially Recognized & Verified
                </p>
                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                    {trustItems.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-3 transition-opacity opacity-70 hover:opacity-100">
                            <div className="p-4 bg-slate-50 rounded-2xl text-secondary shadow-sm border border-slate-100">
                                {item.icon}
                            </div>
                            <span className="text-sm font-semibold text-slate-600">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
