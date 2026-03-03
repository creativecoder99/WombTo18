import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata = {
    title: "WombTo18 Foundation",
    description: "Transparency-first NGO platform",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="antialiased min-h-screen flex flex-col font-inter bg-white">

                {/* Navigation Bar */}
                <header className="fixed top-0 w-full z-50 glass">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/logo.png" alt="WombTo18 Foundation" width={200} height={56} className="h-14 w-auto" />
                        </Link>
                        <nav className="hidden md:flex gap-6 font-medium text-slate-700">
                            <Link href="/#programs" className="hover:text-primary transition-colors">Programs</Link>
                            <Link href="/#impact" className="hover:text-primary transition-colors">Impact</Link>
                            <Link href="/#wall-of-kindness" className="hover:text-primary transition-colors">Donor Board</Link>
                            <Link href="/donor-dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                        </nav>
                        <Link href="/donate" className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-orange-500/30">
                            Donate Now
                        </Link>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 pt-20">
                    {children}
                </main>

                {/* Comprehensive Footer */}
                <footer className="bg-slate-900 text-slate-300 py-16 mt-20">
                    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Column 1: About */}
                        <div className="md:col-span-1">
                            <h1 className="text-3xl font-bold text-white mb-4">WombTo18<span className="text-primary">.</span></h1>
                            <p className="text-sm leading-relaxed mb-6">
                                A Section 8 registered NGO dedicated to empowering mothers and children from prenatal care through age 18. Every rupee tracked, every life transformed.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div>
                            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                                <li><Link href="/#programs" className="hover:text-primary transition-colors">Programs</Link></li>
                                <li><Link href="/#impact" className="hover:text-primary transition-colors">Impact Reports</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Transparency</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Legal */}
                        <div>
                            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal</h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Refund Policy</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Verify Certificate</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Sample 80G Certificate</Link></li>
                            </ul>
                        </div>

                        {/* Column 4: Contact */}
                        <div>
                            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-primary shrink-0" />
                                    <a href="mailto:contact@wombto18.org" className="hover:text-primary transition-colors">contact@wombto18.org</a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-primary shrink-0" />
                                    <span>+91 98765 43210</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                                    <span>Mumbai, Maharashtra, India</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-500">
                        © {new Date().getFullYear()} WombTo18 Foundation. All rights reserved.
                    </div>
                </footer>

            </body>
        </html>
    );
}
