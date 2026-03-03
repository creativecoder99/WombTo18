"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
    const faqs = [
        {
            q: "How is my donation utilized?",
            a: "100% of your donation is tracked. You can view our Financial Transparency Dashboard to see exactly how funds are allocated across active programs. Approximately 85% goes directly to field programs."
        },
        {
            q: "Will I get an 80G tax exemption receipt?",
            a: "Yes. An 80G compliant receipt is automatically generated and emailed to you immediately after your successful donation."
        },
        {
            q: "What is the Donor Dashboard?",
            a: "Contributors donating ₹10,000 or more are granted access to an exclusive Donor Dashboard, which provides deep-dive metrics into the specific programs they funded."
        },
        {
            q: "Can I choose which program to fund?",
            a: "Absolutely! You can choose to pool your funds into specific causes like Healthcare, Education, or Environment directly from our Programs page."
        }
    ];

    const [open, setOpen] = useState(0);

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-lg text-slate-600">Everything you need to know about your impact.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => setOpen(open === idx ? -1 : idx)}
                                className="w-full text-left px-6 py-5 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-bold text-slate-800 pr-8">{faq.q}</span>
                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${open === idx ? 'rotate-180' : ''}`} />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${open === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-6 pb-5 pt-0 border-t border-slate-100 mt-2 pt-4">
                                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
