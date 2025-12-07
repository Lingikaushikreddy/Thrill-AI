'use client';

import { MessageCircle, Phone, IndianRupee, Languages, Check, Zap, CreditCard, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

export function Features() {
    return (
        <section id="features" className="py-24 bg-[#FFFDF7] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 max-w-2xl">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 text-[#FF6B6B] font-bold text-sm mb-6">
                            <Zap className="w-4 h-4 fill-current" />
                            <span>POWERFUL CAPABILITIES</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-[#2D2520] mb-6">
                            Everything you need to <span className="text-[#FF6B6B]">dominate.</span>
                        </h2>
                        <p className="text-xl text-[#5C5C5C]">
                            We don't just "chat". We sell, support, and scale your business using the latest in generative AI and voice synthesis.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card 1: WhatsApp (Large, spans 2 cols) */}
                    <FadeIn className="md:col-span-2 group relative bg-white rounded-[40px] p-8 md:p-12 border border-[#F5E6D3] overflow-hidden hover:border-[#FF6B6B] transition-colors shadow-sm">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                                    <MessageCircle className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-[#2D2520] mb-4">WhatsApp & Instagram AI</h3>
                                <p className="text-[#5C5C5C] text-lg max-w-md">Unified messaging that feels 100% human. Automate complex sales flows, lead qualification, and support tickets without lifting a finger.</p>
                            </div>

                            <div className="mt-8 flex gap-3 flex-wrap">
                                {['24/7 Availability', 'Instant Responses', 'Human Handover'].map((tag) => (
                                    <span key={tag} className="px-4 py-2 rounded-full bg-[#f0fdf4] text-green-700 text-sm font-bold border border-green-100">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Decorative Visual: Chat Bubbles */}
                        <div className="absolute top-1/2 right-[-50px] md:right-10 w-64 md:w-80 opacity-50 md:opacity-100 transition-transform group-hover:scale-105 duration-500">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="bg-white p-4 rounded-2xl rounded-tr-none shadow-xl border border-gray-100 mb-4 ml-10"
                            >
                                <div className="h-2 w-32 bg-gray-200 rounded-full mb-2"></div>
                                <div className="h-2 w-20 bg-gray-200 rounded-full"></div>
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="bg-[#DCF8C6] p-4 rounded-2xl rounded-tl-none shadow-xl border border-green-100"
                            >
                                <div className="h-2 w-40 bg-green-800/20 rounded-full mb-2"></div>
                                <div className="h-2 w-24 bg-green-800/20 rounded-full"></div>
                            </motion.div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </FadeIn>

                    {/* Card 2: Voice AI (Tall) */}
                    <FadeIn delay={0.1} className="md:row-span-2 group relative bg-[#2D2520] rounded-[40px] p-8 md:p-12 overflow-hidden text-white flex flex-col justify-between shadow-2xl shadow-gray-900/20">
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FFCC5C] flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
                                <Phone className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Human-like Voice AI</h3>
                            <p className="text-white/70 text-lg leading-relaxed mb-8">Outbound sales calls, appointment reminders, and follow-ups. Our voice AI sounds so real, clients say "Thank you" at the end.</p>

                            <ul className="space-y-4">
                                {['Natural Pauses', 'Indian Aaccent Support', 'Handle Interruptions'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-white/90">
                                        <Check className="w-5 h-5 text-[#FFCC5C]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-1 h-16">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: ['20%', '80%', '20%'] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.1
                                    }}
                                    className="w-2 bg-gradient-to-t from-[#FF6B6B] to-[#FFCC5C] rounded-full"
                                />
                            ))}
                        </div>
                    </FadeIn>

                    {/* Card 3: Payments (Rich Animation) */}
                    <FadeIn delay={0.2} className="group relative bg-[#FFF] rounded-[40px] p-8 border border-[#F5E6D3] overflow-hidden hover:border-[#FFCC5C] transition-colors shadow-sm h-[320px] flex flex-col">
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] flex items-center justify-center mb-4">
                                <IndianRupee className="w-6 h-6 text-[#FF8E53]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2D2520] mb-2">Smart Payments</h3>
                            <p className="text-[#5C5C5C] text-sm">Send UPI links & auto-generate receipts instantly.</p>
                        </div>

                        {/* Payment Animation */}
                        <div className="absolute bottom-6 right-6 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="text-xs font-bold text-green-600">PAID</span>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-gray-100 rounded-full" />
                                <div className="h-2 w-2/3 bg-gray-100 rounded-full" />
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                                <span className="text-xs text-gray-400">Total</span>
                                <span className="text-sm font-bold text-[#2D2520]">₹999.00</span>
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -z-0" />
                    </FadeIn>

                    {/* Card 4: Multi-Language (Rich Animation) */}
                    <FadeIn delay={0.3} className="group relative bg-[#FFF] rounded-[40px] p-8 border border-[#F5E6D3] overflow-hidden hover:border-[#FF6B6B] transition-colors shadow-sm h-[320px] flex flex-col">
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] flex items-center justify-center mb-4">
                                <Languages className="w-6 h-6 text-[#FF6B6B]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2D2520] mb-2">Multi-Language</h3>
                            <p className="text-[#5C5C5C] text-sm">Localize your brand in Hindi, Tamil, Telugu & more.</p>
                        </div>

                        {/* Animated Floating Languages */}
                        <div className="absolute bottom-0 right-0 w-full h-32 overflow-hidden pointer-events-none">
                            <motion.div
                                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-[#2D2520] text-white px-3 py-1.5 rounded-lg rounded-br-none shadow-lg text-xs leading-none"
                            >
                                नमस्ते 🙏
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute bottom-16 right-20 bg-white text-[#2D2520] border border-[#F5E6D3] px-3 py-1.5 rounded-lg rounded-tr-none shadow-lg text-xs leading-none"
                            >
                                Hello!
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -5, 0], x: [0, -2, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-4 right-24 bg-[#FF6B6B] text-white px-3 py-1.5 rounded-lg rounded-bl-none shadow-lg text-xs leading-none"
                            >
                                నమస్కారం
                            </motion.div>
                        </div>

                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-50 rounded-full blur-3xl -z-0" />
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
