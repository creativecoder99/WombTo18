"use client";
import { Quote } from "lucide-react";

export default function Testimonials() {
    const testimonials = [
        {
            text: "The sheer transparency of WombTo18 is what made me contribute. I know exactly which program my money is funding.",
            author: "Aditi S.",
            role: "Regular Donor",
        },
        {
            text: "Partnering with WombTo18 for our CSR initiative was seamless. The impact dashboard provides perfect reporting for our stakeholders.",
            author: "Rajiv K.",
            role: "CSR Head, TechCorp",
        },
        {
            text: "Because of the maternal healthcare program, my village finally has access to safe deliveries. We are forever grateful.",
            author: "Meena",
            role: "Beneficiary",
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Voices of Trust</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">Hear from our donors, partners, and the people whose lives have been transformed.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((test, idx) => (
                        <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative">
                            <Quote className="text-green-200 w-12 h-12 absolute top-6 right-6 opacity-50" />
                            <div className="flex text-yellow-400 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                ))}
                            </div>
                            <p className="text-slate-700 italic mb-8 relative z-10">&quot;{test.text}&quot;</p>
                            <div>
                                <h4 className="font-bold text-slate-900">{test.author}</h4>
                                <p className="text-sm text-secondary font-medium">{test.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
