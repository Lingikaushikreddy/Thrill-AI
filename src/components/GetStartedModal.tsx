'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle } from 'lucide-react';

export function GetStartedModal({ isOpen, onClose, plan = 'starter' }: { isOpen: boolean; onClose: () => void; plan?: string }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, plan })
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    setFormData({ name: '', email: '', company: '' });
                }, 2000);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting form.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-[#FFFDF7] w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-[#F5E6D3]"
                    >
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-[#2D2520]">
                                    {success ? 'You are all set!' : 'Start your journey'}
                                </h3>
                                <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-[#5C5C5C]" />
                                </button>
                            </div>

                            {success ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    <p className="text-[#5C5C5C]">Thanks for signing up! We'll be in touch shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-[#2D2520] mb-1.5">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Jane Doe"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-[#F5E6D3] bg-white focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[#2D2520] mb-1.5">Work Email</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="jane@company.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-[#F5E6D3] bg-white focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[#2D2520] mb-1.5">Company Name</label>
                                        <input
                                            type="text"
                                            placeholder="Acme Inc."
                                            value={formData.company}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-[#F5E6D3] bg-white focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 transition-all"
                                        />
                                    </div>

                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="w-full py-4 bg-[#2D2520] text-white rounded-xl font-bold hover:bg-[#FF6B6B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            'Start Free Trial'
                                        )}
                                    </button>

                                    <p className="text-xs text-center text-[#5C5C5C] mt-4">
                                        By signing up, you agree to our Terms and Privacy Policy.
                                    </p>
                                </form>
                            )}
                        </div>

                        {/* Sunrise Gradient Bottom Bar */}
                        <div className="h-2 w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFCC5C]" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
