"use client";
import { useState } from "react";
import { Download, Lock, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

export default function DonorDashboard() {
    const [email, setEmail] = useState("");
    const [locked, setLocked] = useState(true);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
            const response = await axios.get(`${API_URL}/donors/dashboard?email=${email}`);

            // The backend returns { success: true, data: { donor, donations } }
            // So axios response.data will be that object
            const resultData = response.data;

            if (resultData && resultData.success && resultData.data) {
                setData(resultData.data);
                setLocked(false);
            } else if (resultData && resultData.donor) {
                // Fallback in case backend returns the object directly
                setData(resultData);
                setLocked(false);
            } else {
                throw new Error("Invalid response format from server");
            }

        } catch (err) {
            setError(err.response?.data?.error || err.message || "There was a problem accessing your dashboard.");
        } finally {
            setLoading(false);
        }
    };

    if (locked || !data) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-24 px-4">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Donor Dashboard</h2>
                    <p className="text-slate-600 mb-8 text-sm">Sign in to securely access your donation receipts, transaction history, and detailed impact tracking.</p>

                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary mb-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {error && (
                            <div className="text-red-500 text-sm mb-4 flex items-center justify-center gap-1">
                                <AlertCircle className="w-4 h-4" /> {error}
                            </div>
                        )}
                        <button type="submit" disabled={loading} className="w-full flex justify-center items-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Access Dashboard"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const { donor, donations } = data;
    const totalContributed = donor?.totalContributed || 0;

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-slate-900 pt-16 pb-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-3xl font-bold text-white">Welcome Back, Donor</h1>
                        <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                    </div>
                    <p className="text-slate-400 max-w-2xl">Thank you for your immense support. Here is a transparent breakdown of your impact.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-slate-500 font-medium text-sm mb-1">Total Contributed</p>
                        <h3 className="text-3xl font-black text-slate-900">₹{totalContributed.toLocaleString('en-IN')}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-slate-500 font-medium text-sm mb-1">Total Donations</p>
                        <h3 className="text-3xl font-black text-secondary">{donor._count?.donations || 0}</h3>
                        <p className="text-xs text-slate-400 mt-1">across all programs</p>
                    </div>
                    <div className="bg-primary p-6 rounded-2xl shadow-sm text-white">
                        <p className="font-medium text-sm mb-1 opacity-90">Thank you!</p>
                        <h3 className="text-xl font-bold leading-tight mt-2">Your contribution funded essential support for multiple causes.</h3>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100">
                        <h3 className="font-bold text-slate-900 text-lg">Your Receipts</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {donations.map((d) => (
                            <div key={d.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div>
                                    <p className="font-bold text-slate-900">₹{d.amount.toLocaleString('en-IN')} • {d.program?.name || 'General Fund'}</p>
                                    <p className="text-sm text-slate-500">Receipt • {new Date(d.createdAt).toLocaleDateString('en-IN')}</p>
                                </div>
                                {d.receiptId ? (
                                    <a href={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}/receipts/${d.receiptId}.pdf`} target="_blank" rel="noreferrer" className="text-secondary hover:bg-green-50 p-2 rounded-full transition-colors cursor-pointer block">
                                        <Download className="w-5 h-5" />
                                    </a>
                                ) : (
                                    <span className="text-slate-300 p-2 rounded-full block" title="Receipt pending">
                                        <Download className="w-5 h-5" />
                                    </span>
                                )}
                            </div>
                        ))}
                        {donations.length === 0 && (
                            <div className="p-8 text-center text-slate-500">No donations found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
