"use client";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, HeartPulse, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function StoriesOfImpact() {
    const stories = [
        {
            category: "Education",
            title: "A Brighter Future for Rural Classrooms",
            excerpt: "How our primary education initiative helped 1,200 children return to school after the pandemic with full learning kits.",
            image: "/images/stories/education.png",
            icon: <BookOpen className="w-4 h-4" />,
            link: "/stories/education-future"
        },
        {
            category: "Healthcare",
            title: "Safe Deliveries in Remote Villages",
            excerpt: "Our mobile health clinics have ensured critical maternal care for over 300 expecting mothers in the hardest-to-reach areas.",
            image: "/images/stories/healthcare.png",
            icon: <HeartPulse className="w-4 h-4" />,
            link: "/stories/safe-deliveries"
        },
        {
            category: "Women Empowerment",
            title: "Stitching a New Destiny",
            excerpt: "Meet the 50 women who started their own tailoring cooperative, gaining financial independence through our skill development program.",
            image: "/images/stories/community.png",
            icon: <Users className="w-4 h-4" />,
            link: "/stories/stitching-destiny"
        }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
                        >
                            Stories of <span className="text-primary">Impact</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-600"
                        >
                            Read about the real lives changed through your generous contributions and our on-ground efforts.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/stories" className="group flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors">
                            View All Stories
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stories.map((story, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={story.image}
                                    alt={story.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-sm">
                                    <span className="text-primary">{story.icon}</span>
                                    {story.category}
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                                    {story.title}
                                </h3>
                                <p className="text-slate-600 mb-6 flex-grow">
                                    {story.excerpt}
                                </p>
                                <Link
                                    href={story.link}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-primary transition-colors mt-auto"
                                >
                                    Read Full Story <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl" />
        </section>
    );
}
