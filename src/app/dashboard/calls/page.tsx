'use client';

import { useState } from 'react';
import { Upload, Play, FileText, Phone, CheckCircle2, Clock, Loader2, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AICallsPage() {
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [campaignStatus, setCampaignStatus] = useState<'idle' | 'running' | 'completed'>('idle');

    const handleStartCampaign = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setCampaignStatus('running');
            // Simulate progress
            setTimeout(() => setCampaignStatus('completed'), 5000);
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-serif font-medium text-white tracking-tight">AI Voice Campaigns</h1>
                <p className="text-white/50 mt-1">Automate your outreach with human-like AI calling.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Create Campaign Card */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0F110E] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                        {/* Step Indicator */}
                        <div className="flex items-center gap-4 mb-8 text-sm">
                            <span className={`flex items-center gap-2 ${step >= 1 ? 'text-brand-sky' : 'text-white/30'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-brand-sky text-black' : 'bg-white/10'}`}>1</span>
                                Audience
                            </span>
                            <div className="w-8 h-[1px] bg-white/10" />
                            <span className={`flex items-center gap-2 ${step >= 2 ? 'text-brand-sky' : 'text-white/30'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-brand-sky text-black' : 'bg-white/10'}`}>2</span>
                                Script
                            </span>
                            <div className="w-8 h-[1px] bg-white/10" />
                            <span className={`flex items-center gap-2 ${step >= 3 ? 'text-brand-sky' : 'text-white/30'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-brand-sky text-black' : 'bg-white/10'}`}>3</span>
                                Launch
                            </span>
                        </div>

                        {/* Step Content */}
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-2">Upload Contacts (CSV)</label>
                                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-brand-sky/50 hover:bg-white/5 transition-all group">
                                            <Upload className="w-8 h-8 text-white/30 group-hover:text-brand-sky mb-4 transition-colors" />
                                            <p className="text-sm text-white/50">Drag & drop your CSV file here</p>
                                            <p className="text-xs text-brand-sky mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Browse Files</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={() => setStep(2)} className="px-6 py-2 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-colors">
                                            Next Step
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-2">Campaign Script</label>
                                        <textarea
                                            placeholder="Hello, I am calling from Thrill AI to confirm your appointment..."
                                            className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-sky/50"
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <button onClick={() => setStep(1)} className="text-white/50 hover:text-white transition-colors">Back</button>
                                        <button onClick={() => setStep(3)} className="px-6 py-2 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-colors">
                                            Next Step
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-center py-8">
                                    <div className="w-20 h-20 bg-brand-sky/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        {campaignStatus === 'running' ? (
                                            <Loader2 className="w-10 h-10 text-brand-sky animate-spin" />
                                        ) : campaignStatus === 'completed' ? (
                                            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                                        ) : (
                                            <Phone className="w-10 h-10 text-brand-sky" />
                                        )}
                                    </div>

                                    {campaignStatus === 'idle' && (
                                        <>
                                            <h3 className="text-xl font-medium text-white mb-2">Ready to Launch?</h3>
                                            <p className="text-white/50 mb-8 max-w-sm mx-auto">You are about to start a campaign for <strong>1,250 contacts</strong>. Estimated completion: 12 mins.</p>
                                            <div className="flex justify-center gap-4">
                                                <button onClick={() => setStep(2)} className="text-white/50 hover:text-white transition-colors">Back</button>
                                                <button
                                                    onClick={handleStartCampaign}
                                                    disabled={isProcessing}
                                                    className="px-8 py-3 bg-brand-sky text-black rounded-xl font-bold hover:bg-brand-sky/90 transition-colors shadow-[0_0_20px_rgba(56,189,248,0.3)] disabled:opacity-50"
                                                >
                                                    {isProcessing ? 'Initiating...' : 'Launch Campaign'}
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {campaignStatus === 'running' && (
                                        <div>
                                            <h3 className="text-xl font-medium text-white mb-2">Campaign Active</h3>
                                            <p className="text-brand-sky animate-pulse">Dialing contacts...</p>
                                        </div>
                                    )}

                                    {campaignStatus === 'completed' && (
                                        <div>
                                            <h3 className="text-xl font-medium text-white mb-2">Campaign Completed!</h3>
                                            <p className="text-emerald-400">All calls have been processed.</p>
                                            <button onClick={() => { setStep(1); setCampaignStatus('idle'); }} className="mt-8 text-white/50 hover:text-white underline">
                                                Start New Campaign
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Panel: Campaign Guide */}
                <div className="space-y-6">
                    <div className="bg-[#0F110E] border border-white/5 p-6 rounded-2xl">
                        <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-brand-sky" />
                            Best Practices
                        </h3>
                        <ul className="space-y-4 text-xs text-white/60">
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 flex-shrink-0" />
                                Run campaigns between 9 AM - 6 PM local time.
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 flex-shrink-0" />
                                Keep usage scripts under 45 seconds for better engagement.
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 flex-shrink-0" />
                                Ensure your CSV has a "Phone" column.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-brand-sky/10 to-transparent border border-brand-sky/20 p-6 rounded-2xl">
                        <h3 className="text-brand-sky font-medium mb-2">Need Help?</h3>
                        <p className="text-xs text-white/50 mb-4">Our support team can help you optimize your first campaign script.</p>
                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
