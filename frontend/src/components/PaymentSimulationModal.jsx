"use client";
import { useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function PaymentSimulationModal({ orderId, amount, onSuccess, onReject }) {
    const [status, setStatus] = useState("idle"); // idle, loading, success, failed

    const simulatePayment = async (result) => {
        setStatus("loading");
        try {
            if (result === "success") {
                await onSuccess();
                setStatus("success");
            } else {
                await onReject();
                setStatus("failed");
            }
        } catch (error) {
            setStatus("failed");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 bg-slate-50">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
                        Simulated Payment Gateway
                    </h3>
                </div>

                <div className="p-8 text-center">
                    <div className="mb-8">
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Order ID</p>
                        <p className="font-mono text-xs bg-slate-100 py-1.5 px-3 rounded-md text-slate-700 inline-block mb-4">{orderId}</p>
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Amount Payable</p>
                        <p className="text-4xl font-black text-slate-900">₹{amount.toLocaleString('en-IN')}</p>
                    </div>

                    {status === "idle" && (
                        <div className="flex gap-4">
                            <button
                                onClick={() => simulatePayment("failed")}
                                className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                            >
                                Simulate Failure
                            </button>
                            <button
                                onClick={() => simulatePayment("success")}
                                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
                            >
                                Simulate Success
                            </button>
                        </div>
                    )}

                    {status === "loading" && (
                        <div className="py-8 flex flex-col items-center justify-center space-y-4">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            <p className="text-slate-600 font-medium">Processing payment securely...</p>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="py-6 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-300">
                            <CheckCircle2 className="w-16 h-16 text-green-500" />
                            <p className="text-xl font-bold text-slate-900">Payment Successful</p>
                            <p className="text-slate-500 text-sm">Your generous contribution has been securely processed.</p>
                        </div>
                    )}

                    {status === "failed" && (
                        <div className="py-6 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-300">
                            <XCircle className="w-16 h-16 text-red-500" />
                            <p className="text-xl font-bold text-slate-900">Payment Failed</p>
                            <p className="text-slate-500 text-sm">The simulation was instructed to reject the payment. Try again.</p>
                            <button
                                onClick={() => setStatus("idle")}
                                className="mt-4 px-6 py-2 rounded-full font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                            >
                                Retry Payment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
