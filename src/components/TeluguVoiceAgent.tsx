'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, PhoneOff, Activity, HeartPulse, AlertCircle } from 'lucide-react';

type AgentState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

export function TeluguVoiceAgent() {
    const [status, setStatus] = useState<AgentState>('idle');
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('నమస్కారం! సిటీ జనరల్ హాస్పిటల్ కి స్వాగతం. (Welcome! Tap mic to speak)');
    const [errorMessage, setErrorMessage] = useState('');

    const recognitionRef = useRef<any>(null);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthesisRef.current = window.speechSynthesis;
            const loadVoices = () => {
                const voices = synthesisRef.current?.getVoices() || [];
                if (voices.length > 0) setVoicesLoaded(true);
            };
            if (synthesisRef.current?.onvoiceschanged !== undefined) {
                synthesisRef.current.onvoiceschanged = loadVoices;
            }
            loadVoices();

            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                setStatus('error');
                setErrorMessage('మీ బ్రౌజర్ లో వాయిస్ సపోర్ట్ లేదు. దయచేసి Chrome ఉపయోగించండి.');
                return;
            }

            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

            try {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = 'te-IN';

                recognitionRef.current.onstart = () => {
                    setStatus('listening');
                    setErrorMessage('');
                };

                recognitionRef.current.onresult = (event: any) => {
                    const text = event.results[0][0].transcript;
                    setTranscript(text);
                    handleUserMessage(text);
                };

                recognitionRef.current.onerror = (event: any) => {
                    if (event.error === 'not-allowed') {
                        setErrorMessage('Microphone Blocked! Please click the Lock 🔒 icon in the address bar and Allow Microphone access.');
                        setStatus('error');
                    } else if (event.error === 'no-speech') {
                        setStatus('idle');
                    } else {
                        setErrorMessage(`లోపం: ${event.error}`);
                        setStatus('error');
                    }
                };

                recognitionRef.current.onend = () => {
                    if (status === 'listening') setStatus('processing');
                };
            } catch (err) {
                setErrorMessage("వాయిస్ ఇంజిన్ ప్రారంభించలేకపోయాము.");
                setStatus('error');
            }
        }
    }, []);

    const [missingVoice, setMissingVoice] = useState(false);

    const speak = (text: string) => {
        if (!synthesisRef.current) return;
        synthesisRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = synthesisRef.current.getVoices();

        const voice = voices.find(v => v.lang.includes('te-IN')) ||
            voices.find(v => v.name.toLowerCase().includes('telugu'));

        if (voice) {
            utterance.voice = voice;
            setMissingVoice(false);
        } else {
            console.warn("Telugu voice not found");
            setMissingVoice(true);
        }

        utterance.rate = 0.9;
        utterance.pitch = 1.0;

        utterance.onstart = () => setStatus('speaking');
        utterance.onend = () => setStatus('idle');
        utterance.onerror = (e) => {
            console.error("Speech Error", e);
            setStatus('idle');
        };

        synthesisRef.current.speak(utterance);
        setResponse(text);
    };

    const unlockAudio = () => {
        if (synthesisRef.current && synthesisRef.current.paused) {
            synthesisRef.current.resume();
        }
        const dummy = new SpeechSynthesisUtterance('');
        dummy.volume = 0;
        synthesisRef.current?.speak(dummy);
    };

    const handleUserMessage = (text: string) => {
        setStatus('processing');
        const lowerText = text.toLowerCase();

        setTimeout(() => {
            if (lowerText.includes('appointment') || lowerText.includes('అపాయింట్మెంట్') || lowerText.includes('బుక్') || lowerText.includes('కావాలి')) {
                speak("అవును, నేను సహాయం చేయగలను. మీకు ఏ డాక్టర్ కావాలి? (Yes, I can help. Which doctor do you need?)");
            } else if (lowerText.includes('గుండె') || lowerText.includes('cardiology') || lowerText.includes('heart')) {
                speak("రేపు ఉదయం 10 గంటలకు డాక్టర్ గారు అందుబాటులో ఉన్నారు. బుక్ చేయమంటారా? (Doctor is available tomorrow at 10 AM. Should I book?)");
            } else if (lowerText.includes('అత్యవసర') || lowerText.includes('emergency') || lowerText.includes('నొప్పి')) {
                speak("దయచేసి వెంటనే 9 1 1 కి కాల్ చేయండి. ఇది అత్యవసర పరిస్థితి. (Please call 911 immediately.)");
            } else if (lowerText.includes('నమస్కారం') || lowerText.includes('hello')) {
                speak("నమస్కారం! నేను మీ హాస్పిటల్ అసిస్టెంట్ ని. ఎలా సహాయపడగలను? (Namaskaram! How can I help?)");
            } else {
                speak("క్షమించండి, నాకు అర్థం కాలేదు. మళ్ళీ చెప్పండి. (Sorry, I didn't understand. Please say again.)");
            }
        }, 1000);
    };

    const startListening = () => {
        if (status === 'error') {
            alert(errorMessage);
            return;
        }
        unlockAudio();
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                recognitionRef.current.stop();
                setTimeout(() => recognitionRef.current.start(), 100);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg mx-auto relative group perspective-1000"
        >
            {/* 3D Glass Card */}
            <div className="relative bg-white/80 backdrop-blur-2xl rounded-[40px] shadow-2xl overflow-hidden border border-white/50 min-h-[600px] flex flex-col transform transition-transform duration-500 hover:rotate-x-2 hover:rotate-y-2 hover:scale-[1.02] preserve-3d">

                {/* Floating Gradient Orb Background */}
                <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-orange-400/20 via-teal-400/20 to-yellow-400/20 blur-3xl pointer-events-none animate-pulse-slow" />

                {/* Header */}
                <div className={`relative z-10 p-6 flex items-center justify-between transition-colors duration-500 ${status === 'error' ? 'bg-red-500/90' : 'bg-gradient-to-r from-orange-600 to-red-600'} text-white shadow-lg`}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner">
                            <HeartPulse className="w-6 h-6 text-white drop-shadow-md" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl tracking-wide">City General (Telugu)</h3>
                            <p className="text-orange-100 text-xs font-medium uppercase tracking-wider">వర్చువల్ రిసెప్షనిస్ట్</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-black/20 rounded-full text-xs font-mono border border-white/10 backdrop-blur-sm">
                        <span className={`w-2.5 h-2.5 rounded-full shadow-lg ${status === 'listening' ? 'bg-red-500 animate-ping' : 'bg-orange-400'}`} />
                        {status.toUpperCase()}
                    </div>
                </div>

                {/* Main Visual Area */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                    {errorMessage && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-4 inset-x-4 bg-red-100/90 backdrop-blur-md border border-red-200 text-red-700 p-4 rounded-2xl flex items-start gap-3 text-sm z-50 shadow-xl"
                        >
                            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                            <p className="font-medium">{errorMessage}</p>
                        </motion.div>
                    )}

                    {missingVoice && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-4 inset-x-4 bg-yellow-100/90 backdrop-blur-md border border-yellow-200 text-yellow-800 p-4 rounded-2xl flex items-start gap-3 text-sm z-50 shadow-xl"
                        >
                            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                            <p className="font-medium text-xs">Audio Warning: Native Telugu voice not found.</p>
                        </motion.div>
                    )}

                    {/* 3D Avatar Container */}
                    <div className="relative z-10 w-48 h-48 mb-10 group-hover:scale-105 transition-transform duration-500">
                        {/* Glowing Ring */}
                        <div className={`absolute inset-[-10px] rounded-full bg-gradient-to-tr from-orange-400 to-teal-400 opacity-60 blur-xl transition-all duration-300 ${status === 'listening' ? 'scale-125 opacity-100' : 'scale-100'}`} />

                        <div className="w-full h-full rounded-full bg-gradient-to-b from-white to-orange-50 p-1.5 shadow-2xl relative overflow-hidden border-4 border-white">
                            <img
                                src="https://img.freepik.com/free-photo/indian-woman-doctor-wearing-white-coat-stethoscope_23-2148053675.jpg"
                                alt="Indian Doctor AI"
                                className="w-full h-full object-cover rounded-full transform transition-transform duration-700 hover:scale-110"
                                onError={(e) => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=Te&background=EA580C&color=fff&size=256')}
                            />

                            <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${status === 'listening' ? 'opacity-0' : 'opacity-20'}`} />
                        </div>

                        {/* Speech Bubble / Transcript */}
                        <AnimatePresence>
                            {transcript && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-slate-200 min-w-[200px] text-center"
                                >
                                    <p className="text-sm text-slate-600 font-medium">"{transcript}"</p>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b border-r border-slate-200"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Assistant Response */}
                    <div className="relative z-10 text-center space-y-4 max-w-sm">
                        <p className="text-slate-800 font-medium text-xl leading-relaxed font-sans drop-shadow-sm">
                            {response}
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="p-8 bg-white/60 backdrop-blur-lg border-t border-white/50">
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={startListening}
                            className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 group/btn ${status === 'listening' ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-red-500/50' : 'bg-gradient-to-br from-orange-600 to-teal-600 text-white shadow-orange-600/50'}`}
                        >
                            <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            {status === 'listening' ? (
                                <Activity className="w-10 h-10 animate-bounce" />
                            ) : (
                                <Mic className="w-10 h-10 drop-shadow-md" />
                            )}
                        </button>
                    </div>
                    <p className="text-center text-slate-500 text-sm font-medium tracking-wide">
                        {status === 'error' ? 'Check Microphone' : 'మాట్లాడటానికి నొక్కండి (Tap to speak)'}
                    </p>
                </div>
            </div>

            {/* Background Decor Elements */}
            <div className="absolute top-10 -right-10 w-32 h-32 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </motion.div>
    );
}
