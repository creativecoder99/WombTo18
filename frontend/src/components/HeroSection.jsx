"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const CAROUSEL_IMAGES = [
    "/images/hero/hero-1.jpg",
    "/images/hero/hero-2.jpg",
    "/images/hero/hero-3.jpg",
    "/images/hero/hero-4.jpg",
];

export default function HeroSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900 min-h-[90vh] flex items-center">
            {/* Carousel Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <AnimatePresence initial={false}>
                    <motion.img
                        key={currentImageIndex}
                        src={CAROUSEL_IMAGES[currentImageIndex]}
                        alt="Hero background"
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </AnimatePresence>
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
                {/* Gradient elements for visual flair */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap justify-center gap-3 mb-8"
                    >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-green-300 text-sm font-medium border border-white/20">
                            <CheckCircle2 className="w-4 h-4" /> Section 8 Registered
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-green-300 text-sm font-medium border border-white/20">
                            <CheckCircle2 className="w-4 h-4" /> 80G Certified
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6"
                    >
                        Empowering Lives, <br className="hidden md:block" />
                        <span className="text-primary">Building Futures.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl text-shadow-sm"
                    >
                        Join our mission to provide essential healthcare, education, and resources to those who need it most. Every contribution creates measurable impact.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <Link href="/donate" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1">
                            Donate Now <ArrowRight className="w-5 h-5" />
                        </Link>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg border-2 border-white/30 transition-all hover:border-white/50 shadow-sm">
                            Explore Programs
                        </button>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-sm text-slate-300 font-medium"
                    >
                        ✓ 80G certificate instantly • ✓ 100% transparent funding
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
