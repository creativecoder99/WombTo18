import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function MediaCoverage() {
    const pressItems = [
        {
            publisher: "The Daily Impact",
            headline: "WombTo18 Opens 50th Rural Clinic",
            excerpt: "Providing critical healthcare access to pregnant mothers in India's most remote villages...",
            date: "Oct 12, 2025",
            logo: "/images/press/press-1.png"
        },
        {
            publisher: "Global NGO Times",
            headline: "Setting New Standards for Transparency",
            excerpt: "How this organization's live dashboard is tracking every single rupee donated.",
            date: "Sep 28, 2025",
            logo: "/images/press/press-2.png"
        },
        {
            publisher: "Community Voices",
            headline: "10,000 Girls Return to School",
            excerpt: "The massive education drive that changed the future of an entire district.",
            date: "Aug 15, 2025",
            logo: "/images/press/press-3.png"
        },
        {
            publisher: "The Social Standard",
            headline: "Top 10 Emerging Nonprofits in 2026",
            excerpt: "Recognized for outstanding scalable impact and transparent financial reporting.",
            date: "Jan 10, 2026",
            logo: "/images/press/press-4.png"
        }
    ];

    // Double the items to create a seamless infinite scrolling effect
    const marqueeItems = [...pressItems, ...pressItems];

    return (
        <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
                <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">In The News</span>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Media & Press Coverage</h2>
            </div>

            <div className="relative w-full flex overflow-hidden group">
                {/* Left/Right fading gradients to blend the marquee */}
                <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] gap-8 px-4">
                    {marqueeItems.map((item, idx) => (
                        <div key={idx} className="w-[400px] flex-shrink-0 bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300">
                            <div className="h-12 mb-6 relative">
                                <Image fill src={item.logo} alt={item.publisher} className="object-contain mix-blend-multiply" />
                            </div>
                            <div className="text-xs font-bold text-slate-400 mb-3 tracking-widest uppercase">
                                {item.date}
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 leading-snug mb-3">
                                {item.headline}
                            </h3>
                            <p className="text-slate-600 mb-6 line-clamp-3">
                                &quot;{item.excerpt}&quot;
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors">
                                Read Article <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
