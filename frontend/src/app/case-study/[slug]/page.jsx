import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CaseStudyPage({ params }) {
    const { slug } = params;

    return (
        <article className="bg-white min-h-screen pb-24">
            <div className="bg-slate-50 py-16 border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4">
                    <Link href="/programs" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Programs
                    </Link>
                    <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-4">
                        Case Study
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6 capitalize">
                        {slug.replace(/-/g, ' ')}
                    </h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 pt-16">
                <div className="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-primary max-w-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                            <h3 className="text-red-800 mt-0">The Problem</h3>
                            <p className="text-red-900/80 mb-0">Lack of medical facilities in remote villages leading to high maternal mortality rates.</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                            <h3 className="text-green-800 mt-0">Our Intervention</h3>
                            <p className="text-green-900/80 mb-0">Deployed mobile health clinics and trained local midwives in safe delivery practices.</p>
                        </div>
                    </div>

                    <h2>The Outcome</h2>
                    <p>
                        Within 12 months, we witnessed a dramatic 40% reduction in maternal mortality in the targeted districts.
                        Over 150 mothers received essential prenatal and postnatal care, ensuring secure futures for their families.
                    </p>

                    <div className="bg-slate-900 text-white p-8 rounded-3xl my-12 text-center">
                        <h3 className="text-white mt-0 mb-8">Impact Numbers</h3>
                        <div className="flex justify-around">
                            <div>
                                <div className="text-4xl font-black text-primary mb-2">150+</div>
                                <div className="text-slate-400 font-medium">Mothers Helped</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-secondary mb-2">5</div>
                                <div className="text-slate-400 font-medium">Clinics Established</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
