'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2 } from 'lucide-react';

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

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    setFormData({ name: '', email: '', company: '' });
                    window.location.href = '/dashboard';
                }, 1500);
            } else {
                alert(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting form.");
        } finally {
            setLoading(false);
        }
    };

    const modalRef = useRef<HTMLDivElement>(null);

    // Focus Trap & Escape Key Handler
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }

            if (e.key === 'Tab') {
                if (!modalRef.current) return;

                const focusableElements = modalRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );

                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Focus first input on open
        const timer = setTimeout(() => {
            const firstInput = modalRef.current?.querySelector('input');
            firstInput?.focus();
        }, 100);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            clearTimeout(timer);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-[#0F110E] w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-white/10 ring-1 ring-white/5"
                    >
                        {/* Background Grid Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-20"></div>

                        <div className="p-8 relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 id="modal-title" className="text-2xl font-serif font-medium text-white tracking-tight">
                                    {success ? 'All set!' : 'Start your journey'}
                                </h3>
                                <button onClick={onClose} aria-label="Close modal" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {success ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-brand-sky/10 rounded-full flex items-center justify-center mb-6 border border-brand-sky/20">
                                        <CheckCircle2 className="w-8 h-8 text-brand-sky" />
                                    </div>
                                    <p className="text-white/70 font-light text-lg">Thanks for signing up! We'll be in touch shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-2">Full Name</label>
                                        <input
                                            id="name"
                                            required
                                            type="text"
                                            placeholder="Jane Doe"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-sky/50 focus:ring-1 focus:ring-brand-sky/50 transition-all font-light"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-2">Work Email</label>
                                        <input
                                            id="email"
                                            required
                                            type="email"
                                            placeholder="jane@company.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-sky/50 focus:ring-1 focus:ring-brand-sky/50 transition-all font-light"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-2">Company Name</label>
                                        <input
                                            id="company"
                                            type="text"
                                            placeholder="Acme Inc."
                                            value={formData.company}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-sky/50 focus:ring-1 focus:ring-brand-sky/50 transition-all font-light"
                                        />
                                    </div>

                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-brand-sky transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-sky"
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

                                    <p className="text-[10px] text-center text-white/30 mt-4 leading-relaxed">
                                        By signing up, you agree to our Terms and Privacy Policy.
                                        <br />Your data is processed securely.
                                    </p>
                                </form>
                            )}
                        </div>

                        {/* Bottom Gradient Line */}
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-sky to-transparent opacity-50" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

