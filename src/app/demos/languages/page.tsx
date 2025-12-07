'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceReceptionist } from '@/components/VoiceReceptionist';
import { TeluguVoiceAgent } from '@/components/TeluguVoiceAgent';
import { HindiVoiceAgent } from '@/components/HindiVoiceAgent';

type Language = 'english' | 'telugu' | 'hindi';

export default function LanguagesDemoPage() {
    const [activeLang, setActiveLang] = useState<Language>('english');

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative font-sans">

            {/* Nav */}
            <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-slate-200 z-50">
                <ArrowLeft className="w-4 h-4" />
                Back Home
            </Link>

            <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center mt-12 md:mt-0">

                {/* Left Side: Context & Switcher */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
                        <Languages className="w-4 h-4" /> Multilingual Support
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                        One Agent. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Many Voices.</span>
                    </h1>

                    <p className="text-slate-600 text-lg leading-relaxed">
                        Thrill AI adapts to your customers' native language instantly.
                        Experience seamless triage and appointment booking in English, Hindi, and Telugu.
                    </p>

                    {/* Language Switcher Pills */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setActiveLang('english')}
                            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeLang === 'english' ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                        >
                            🇺🇸 English
                        </button>
                        <button
                            onClick={() => setActiveLang('hindi')}
                            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeLang === 'hindi' ? 'bg-orange-500 text-white shadow-lg scale-105' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                        >
                            🇮🇳 हिंदी (Hindi)
                        </button>
                        <button
                            onClick={() => setActiveLang('telugu')}
                            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeLang === 'telugu' ? 'bg-teal-600 text-white shadow-lg scale-105' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                        >
                            🕉️ తెలుగు (Telugu)
                        </button>
                    </div>

                    {/* Hint Box */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeLang}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
                        >
                            <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">Try Asking:</h3>
                            <ul className="space-y-2 text-slate-600">
                                {activeLang === 'english' && (
                                    <>
                                        <li className="flex items-center gap-2">"Book an appointment for tomorrow"</li>
                                        <li className="flex items-center gap-2">"I have chest pain (Emergency)"</li>
                                    </>
                                )}
                                {activeLang === 'hindi' && (
                                    <>
                                        <li className="flex items-center gap-2">"मुझे डॉक्टर से मिलना है" (I want to meet a doctor)</li>
                                        <li className="flex items-center gap-2 text-red-600">"यह एक एमरजेंसी है!" (This is an emergency!)</li>
                                    </>
                                )}
                                {activeLang === 'telugu' && (
                                    <>
                                        <li className="flex items-center gap-2">"నాకు అపాయింట్‌మెంట్ కావాలి" (I need an appointment)</li>
                                        <li className="flex items-center gap-2">"గుండె డాక్టర్ ఉన్నారు?" (Is a heart doctor there?)</li>
                                    </>
                                )}
                            </ul>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Side: The Agent */}
                <div className="flex justify-center relative">
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
        </main>
    );
}
