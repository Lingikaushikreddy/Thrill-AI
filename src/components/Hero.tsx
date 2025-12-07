'use client';

import { ArrowRight, Sparkles, MessageCircle, Play, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useState } from 'react';
import { GetStartedModal } from './GetStartedModal';
import Link from 'next/link';

export function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Animated Background Ambience */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFCC5C]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, 50, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 left-[-200px] w-[600px] h-[600px] bg-[#FF6B6B]/15 rounded-full blur-[100px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <FadeIn>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-orange-100 mb-8 backdrop-blur-sm shadow-sm hover:scale-105 transition-transform cursor-default">
                        <Sparkles className="w-4 h-4 text-[#FF6B6B] fill-[#FF6B6B]" />
                        <span className="text-sm font-bold text-[#FF6B6B] uppercase tracking-wider">WHATSAPP-NATIVE FROM DAY ONE</span>
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-[#2D2520]">
                        Run Your Business <br className="hidden md:block" />
                        <span className="vibe-gradient-text relative inline-block">
                            <span className="relative z-10">On Autopilot</span>
                            <svg className="absolute -bottom-2 w-full h-3 text-[#FFCC5C]/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <p className="text-xl md:text-2xl text-[#5C5C5C] max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Unified messaging across WhatsApp and Instagram. Automate FAQs, capture leads, and provide 24/7 support.
                    </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
                        <motion.button
                            onClick={() => setIsModalOpen(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white rounded-full font-bold text-lg shadow-lg shadow-orange-500/25 flex items-center gap-2"
                        >
                            Start Free Trial <ArrowRight className="w-5 h-5" />
                        </motion.button>

                        <Link href="/demos/languages">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-4 bg-white text-[#2D2520] border border-[#F5E6D3] rounded-full font-bold text-lg hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm"
                            >
                                <span className="flex items-center gap-2"><Languages className="w-5 h-5 text-blue-500" /> Try Multilingual Demo</span>
                            </motion.button>
                        </Link>

                    </div>
                </FadeIn>

                {/* Chat UI Mockup */}
                <FadeIn delay={0.4} className="relative w-full max-w-sm md:max-w-4xl mx-auto">
                    <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-orange-900/10 border-8 border-white/80 backdrop-blur-xl bg-gradient-to-br from-[#FFF5EB] to-[#FFFDF7]">
                        {/* WhatsApp/Chat Header Mock */}
                        <div className="h-16 bg-[#075E54]/90 md:bg-white/50 border-b border-orange-100/50 flex items-center px-6 gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FFCC5C] flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="h-3 w-32 bg-gray-200/50 rounded-full mb-1"></div>
                                <div className="h-2 w-20 bg-gray-200/30 rounded-full"></div>
                            </div>
                        </div>

                        {/* Converation Area */}
                        <div className="p-8 h-80 md:h-96 flex flex-col gap-6 relative">
                            {/* Message 1 (User) */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="self-end bg-[#DCF8C6] md:bg-[#FF6B6B]/10 p-4 rounded-2xl rounded-tr-none max-w-[80%]"
                            >
                                <p className="text-[#2D2520] text-sm md:text-lg">Hi, I'm interested in your pricing plans for enterprise.</p>
                            </motion.div>

                            {/* Message 2 (Kaarya AI) */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, x: -20 }}
                                whileInView={{ scale: 1, opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                                className="self-start bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] border border-orange-50"
                            >
                                <p className="text-[#2D2520] text-sm md:text-lg mb-2">Hello! 👋 Thanks for reaching out. Thrill AI Enterprise plans start at ₹6,999/month.</p>
                                <div className="h-24 bg-gray-50 rounded-xl border border-gray-100 p-3 flex gap-3 items-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B6B] to-[#FFCC5C] rounded-lg opacity-50"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-2 w-3/4 bg-gray-200 rounded-full"></div>
                                        <div className="h-2 w-1/2 bg-gray-200 rounded-full"></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </FadeIn>

                <GetStartedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </section>
    );
}
