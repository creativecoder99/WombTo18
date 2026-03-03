"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PaymentSimulationModal from "@/components/PaymentSimulationModal";
import Link from "next/link";
import { CheckCircle2, Heart, ArrowRight } from "lucide-react";

export default function DonatePage() {
    const [programs, setPrograms] = useState([]);
    const [formData, setFormData] = useState({
        donorName: "",
        email: "",
        amount: "",
        programId: "",
        purpose: "",
        paymentMode: "ONLINE"
    });

    const [orderData, setOrderData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [successData, setSuccessData] = useState(null);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
                const res = await axios.get(`${API_URL}/programs`);
                const programsData = res.data.data ? res.data.data : res.data;
                setPrograms(programsData);
                if (programsData.length > 0) {
                    setFormData(prev => ({ ...prev, programId: programsData[0].id }));
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchPrograms();
    }, []);

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
            const res = await axios.post(`${API_URL}/payments/create-order`, {
                ...formData,
                amount: parseFloat(formData.amount)
            });
            setOrderData(res.data);
            setShowModal(true);
        } catch (error) {
            console.error("Order creation failed", error);
            alert("Failed to create order");
        }
    };

    const handlePaymentSuccess = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
        try {
            const res = await axios.post(`${API_URL}/payments/verify`, {
                orderId: orderData.orderId,
                status: "success"
            });
            setSuccessData(res.data);
            setShowModal(false);
        } catch (error) {
            console.error("Verification failed", error);
            alert("Payment verification failed");
        }
    };

    const handlePaymentFailure = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
        try {
            await axios.post(`${API_URL}/payments/verify`, {
                orderId: orderData.orderId,
                status: "failed"
            });
            alert("Payment marked as failed in our system.");
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    if (successData) {
        return (
            <div className="min-h-screen pt-24 bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white max-w-lg w-full p-8 rounded-3xl shadow-xl shadow-slate-200/50 text-center border border-slate-100 animate-in fade-in zoom-in duration-300">
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Thank You!</h2>
                    <p className="text-slate-600 mb-8">Your contribution has been successfully processed and recorded.</p>

                    <div className="bg-slate-50 p-4 rounded-xl mb-8 flex justify-between items-center text-left border border-slate-100">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Receipt ID</p>
                            <p className="font-bold text-slate-900">{successData.receiptId}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {(() => {
                            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"; return (
                                <a
                                    href={`${API_URL}/receipts/${successData.receiptId}.pdf`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full flex justify-center items-center py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-500/20"
                                >
                                    Download PDF Receipt
                                </a>
                            );
                        })()}
                        <Link href="/donor-dashboard" className="w-full flex justify-center items-center py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
                            Go to Donor Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 bg-slate-50 pb-24">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="inline-flex items-center justify-center p-4 bg-green-100 text-green-600 rounded-full mb-6">
                        <Heart className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Make a Verified Impact</h1>
                    <p className="text-lg text-slate-600 max-w-xl mx-auto">Your donation is securely tracked, completely transparent, and immediately put to work.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                    <form onSubmit={handleCreateOrder} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                <input required type="text" value={formData.donorName} onChange={e => setFormData({ ...formData, donorName: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Select Program to Support</label>
                            <select required value={formData.programId} onChange={e => setFormData({ ...formData, programId: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all bg-white">
                                {programs.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Amount (INR)</label>
                            <input required type="number" min="100" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-xl font-bold text-slate-900 transition-all" placeholder="5000" />
                            <p className="text-xs text-slate-500 mt-2">Become a Leading Contributor by covering 10% of a program&apos;s funding goal.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Purpose (Optional)</label>
                            <input type="text" value={formData.purpose} onChange={e => setFormData({ ...formData, purpose: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all" placeholder="E.g. In memory of..." />
                        </div>

                        <button type="submit" className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex justify-center items-center gap-2 mt-8 shadow-md">
                            Continue to Payment <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>

            {showModal && orderData && (
                <PaymentSimulationModal
                    orderId={orderData.orderId}
                    amount={orderData.amount}
                    onSuccess={handlePaymentSuccess}
                    onReject={handlePaymentFailure}
                />
            )}
        </div>
    );
}
