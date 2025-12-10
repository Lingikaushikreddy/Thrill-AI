'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Languages, Play, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceReceptionist } from '@/components/VoiceReceptionist';
import { TeluguVoiceAgent } from '@/components/TeluguVoiceAgent';
import { HindiVoiceAgent } from '@/components/HindiVoiceAgent';
import { SampleCallPlayer } from '@/components/SampleCallPlayer';

type Language = 'english' | 'telugu' | 'hindi';

export default function LanguagesDemoPage() {
    const [activeLang, setActiveLang] = useState<Language>('english');

    return (
        <main className="min-h-screen bg-[#050505] relative font-sans selection:bg-brand-sky selection:text-black overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-20" />

            {/* Navigation */}
            <nav className="fixed top-6 left-6 z-50">
                <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md hover:border-brand-sky/30 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Home</span>
                </Link>
            </nav>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-sky/20 bg-brand-sky/10 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sky opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-sky"></span>
                        </span>
                        <span className="text-xs font-mono uppercase tracking-widest text-brand-sky">Multilingual Neural Engine</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white tracking-tight text-glow">
                        One Agent. <span className="text-white/40 italic">Many Voices.</span>
                    </h1>
                    <p className="text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
                        Thrill AI adapts to your customers' native language instantly.
                        Experience seamless triage in English, Hindi, and Telugu.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Sample Recordings & Context */}
                    <div className="space-y-12">
                        {/* Sample Calls Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-medium text-white flex items-center gap-3">
                                <Play className="w-5 h-5 text-brand-sky" />
                                <span className="text-glow">Sample Recordings</span>
                            </h3>
                            <div className="space-y-4">
                                <SampleCallPlayer
                                    language="English (US)"
                                    duration="0:20"
                                    transcript={[
                                        { speaker: 'User', text: "I'd like to book an appointment with Dr. Sarah.", lang: 'en-US' },
                                        { speaker: 'AI', text: "Sure. Dr. Sarah has an opening tomorrow at 10 AM. Should I book that?", lang: 'en-US' },
                                        { speaker: 'User', text: "Yes please, that works perfectly.", lang: 'en-US' },
                                        { speaker: 'AI', text: "Done. I've scheduled your appointment. Anything else?", lang: 'en-US' }
                                    ]}
                                />
                                <SampleCallPlayer
                                    language="Hindi (India)"
                                    duration="0:20"
                                    transcript={[
                                        { speaker: 'User', text: "मुझे डॉ. शर्मा से अपॉइंटमेंट चाहिए।", lang: 'hi-IN' },
                                        { speaker: 'AI', text: "ज़रूर। डॉ. शर्मा कल सुबह 11 बजे उपलब्ध हैं। क्या मैं इसे बुक करूँ?", lang: 'hi-IN' },
                                        { speaker: 'User', text: "हाँ, कृप्या बुक कर दीजिये।", lang: 'hi-IN' },
                                        { speaker: 'AI', text: "ठीक है, आपकी अपॉइंटमेंट बुक हो गई है।", lang: 'hi-IN' }
                                    ]}
                                />
                                <SampleCallPlayer
                                    language="Telugu (India)"
                                    duration="0:20"
                                    transcript={[
                                        { speaker: 'User', text: "నాకు డాక్టర్ రెడ్డితో అపాయింట్‌మెంట్ కావాలి.", lang: 'te-IN' },
                                        { speaker: 'AI', text: "తప్పకుండా. డాక్టర్ రెడ్డి రేపు సాయంత్రం 4 గంటలకు అందుబాటులో ఉన్నారు. బుక్ చేయమంటారా?", lang: 'te-IN' },
                                        { speaker: 'User', text: "సరే, బుక్ చేయండి.", lang: 'te-IN' },
                                        { speaker: 'AI', text: "ధన్యవాదాలు. మీ అపాయింట్‌మెంట్ ఖరారు చేయబడింది.", lang: 'te-IN' }
                                    ]}
                                />
                            </div>
                        </div>

                        {/* Interactive Switcher */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-medium text-white flex items-center gap-3">
                                <Mic className="w-5 h-5 text-brand-sky" />
                                <span className="text-glow">Live Interaction</span>
                            </h3>

                            <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl w-fit backdrop-blur-sm">
                                <button
                                    onClick={() => setActiveLang('english')}
                                    className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeLang === 'english' ? 'bg-brand-sky text-black shadow-[0_0_15px_rgba(56,189,248,0.3)]' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => setActiveLang('hindi')}
                                    className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeLang === 'hindi' ? 'bg-brand-sky text-black shadow-[0_0_15px_rgba(56,189,248,0.3)]' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                                >
                                    Hindi
                                </button>
                                <button
                                    onClick={() => setActiveLang('telugu')}
                                    className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeLang === 'telugu' ? 'bg-brand-sky text-black shadow-[0_0_15px_rgba(56,189,248,0.3)]' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                                >
                                    Telugu
                                </button>
                            </div>

                            {/* Hint Box */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeLang}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-white/5 border border-white/10 p-6 rounded-2xl overflow-hidden"
                                >
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Try Asking</h4>
                                    <ul className="space-y-3 text-white/80 font-light">
                                        {activeLang === 'english' && (
                                            <>
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_5px_#38BDF8]"></span>
                                                    "Book an appointment for tomorrow"
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_#EF4444]"></span>
                                                    "I have chest pain (Emergency)"
                                                </li>
                                            </>
                                        )}
                                        {activeLang === 'hindi' && (
                                            <>
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_5px_#38BDF8]"></span>
                                                    "मुझे डॉक्टर से मिलना है" (I want to meet a doctor)
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_#EF4444]"></span>
                                                    "यह एक एमरजेंसी है!" (This is an emergency!)
                                                </li>
                                            </>
                                        )}
                                        {activeLang === 'telugu' && (
                                            <>
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_5px_#38BDF8]"></span>
                                                    "నాకు అపాయింట్‌మెంట్ కావాలి" (I need an appointment)
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_5px_#38BDF8]"></span>
                                                    "గుండె డాక్టర్ ఉన్నారు?" (Is a heart doctor there?)
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Column: The Agent */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-sky/5 blur-3xl rounded-full pointer-events-none"></div>
                        <AnimatePresence mode="wait">
                            {activeLang === 'english' && (
                                <motion.div key="en" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full flex justify-center">
                                    <VoiceReceptionist />
                                </motion.div>
                            )}
                            {activeLang === 'hindi' && (
                                <motion.div key="hi" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full flex justify-center">
                                    <HindiVoiceAgent />
                                </motion.div>
                            )}
                            {activeLang === 'telugu' && (
                                <motion.div key="te" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full flex justify-center">
                                    <TeluguVoiceAgent />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
