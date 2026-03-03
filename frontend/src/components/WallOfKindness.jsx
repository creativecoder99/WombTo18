"use client";
import { Award, UserCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WallOfKindness() {
    const [topDonors, setTopDonors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
                const response = await axios.get(`${API_URL}/donors/top`);
                setTopDonors(response.data || []);
            } catch (error) {
                console.error("Failed to fetch top donors", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDonors();
    }, []);

    return (
        <section id="wall-of-kindness" className="py-24 bg-green-50/50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Wall of Kindness</h2>
                    <p className="text-lg text-slate-600">Celebrating our community of change-makers who make our mission possible.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : !topDonors || topDonors.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-slate-500 font-medium">Be the first to step up and make an incredible impact.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topDonors.map((donor, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center transform transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-green-100">
                                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <UserCircle className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1 flex justify-center items-center gap-2">
                                    {donor.name}
                                    {donor.dashboardAccess && <Award className="w-5 h-5 text-primary" />}
                                </h3>
                                <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-4">{donor.dashboardAccess ? "Leading Contributor" : "Supporter"}</p>
                                <div className="inline-block bg-slate-50 px-4 py-2 rounded-full text-slate-700 font-bold border border-slate-100">
                                    ₹{donor.totalContributed.toLocaleString('en-IN')}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
