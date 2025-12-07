'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, PhoneOff, Activity, HeartPulse, AlertCircle } from 'lucide-react';

type AgentState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

export function VoiceReceptionist() {
    const [status, setStatus] = useState<AgentState>('idle');
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('Welcome to City General Hospital. Tap the microphone to start.');
    const [errorMessage, setErrorMessage] = useState('');

    const recognitionRef = useRef<any>(null);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthesisRef.current = window.speechSynthesis;

            // Browser Compatibility Check
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                setStatus('error');
                setErrorMessage('Your browser does not support Voice Recognition. Please use Google Chrome or Microsoft Edge on Desktop.');
                return;
            }

            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

            try {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false; // Stop after one sentence
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = 'en-US';

                recognitionRef.current.onstart = () => {
                    console.log("Recognition started");
                    setStatus('listening');
                    setErrorMessage('');
                };

                recognitionRef.current.onresult = (event: any) => {
                    const text = event.results[0][0].transcript;
                    console.log("Recognized:", text);
                    setTranscript(text);
                    handleUserMessage(text);
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error("Recognition Error:", event.error);
                    if (event.error === 'not-allowed') {
                        setErrorMessage('Microphone access denied. Please allow microphone permissions.');
                        setStatus('error');
                    } else if (event.error === 'no-speech') {
                        // Just reset if no speech
                        setStatus('idle');
                    } else {
                        setErrorMessage(`Error: ${event.error}`);
                        setStatus('error');
                    }
                };

                recognitionRef.current.onend = () => {
                    console.log("Recognition ended");
                    if (status === 'listening') setStatus('processing');
                };
            } catch (err) {
                console.error("Setup Error", err);
                setErrorMessage("Failed to initialize voice engine.");
                setStatus('error');
            }
        }
    }, []);

    const speak = (text: string) => {
        if (!synthesisRef.current) return;
        synthesisRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = synthesisRef.current.getVoices();
        // Prefer a smooth voice
        const voice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha') || v.name.includes('Female'));
        if (voice) utterance.voice = voice;
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onstart = () => setStatus('speaking');
        utterance.onend = () => setStatus('idle');
        utterance.onerror = (e) => console.error("Speech Synthesis Error", e);

        synthesisRef.current.speak(utterance);
        setResponse(text);
    };

    const handleUserMessage = (text: string) => {
        setStatus('processing');

        // Simple Logic Engine
        const lowerText = text.toLowerCase();

        // Simulate network delay for realism
        setTimeout(() => {
            if (lowerText.includes('appointment') || lowerText.includes('book') || lowerText.includes('schedule')) {
                speak("I can help with that. Are you a new patient or returning?");
            } else if (lowerText.includes('cardiology') || lowerText.includes('heart')) {
                speak("Dr. Reynolds in Cardiology is available tomorrow at 9 AM. Shall I book it?");
            } else if (lowerText.includes('emergency') || lowerText.includes('pain') || lowerText.includes('blood')) {
                speak("Alert. Please hang up and dial 911 immediately. This sounds like a medical emergency.");
            } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
                speak("Hello. I am the hospital's voice assistant. How can I help you?");
            } else {
                speak("I didn't quite catch that. Could you say it again?");
            }
        }, 1000);
    };

    const startListening = () => {
        if (status === 'error') {
            alert(errorMessage);
            return;
        }

        if (recognitionRef.current) {
            // Must serve over HTTPS or localhost
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error("Start Error", e);
                recognitionRef.current.stop();
                setTimeout(() => recognitionRef.current.start(), 100);
            }
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 min-h-[600px] flex flex-col relative">

            {/* Header */}
            <div className={`p-6 text-white flex items-center justify-between transition-colors ${status === 'error' ? 'bg-red-600' : 'bg-[#0F766E]'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <HeartPulse className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">City General</h3>
                        <p className="text-teal-100 text-xs">Virtual Receptionist</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-black/20 rounded-full text-xs font-mono">
                    <span className={`w-2 h-2 rounded-full ${status === 'listening' ? 'bg-red-400 animate-pulse' : 'bg-gray-400'}`} />
                    {status.toUpperCase()}
                </div>
            </div>

            {/* Main Visual Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 relative overflow-hidden">

                {errorMessage && (
                    <div className="absolute top-4 inset-x-4 bg-red-100 border border-red-200 text-red-700 p-3 rounded-lg flex items-start gap-2 text-sm z-50">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <p>{errorMessage}</p>
                    </div>
                )}

                <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 p-1 shadow-xl mb-8">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                        <img
                            src="https://img.freepik.com/free-photo/portrait-3d-female-doctor_23-2151107434.jpg"
                            alt="AI Avatar"
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=AI&background=0F766E&color=fff')}
                        />

                        {/* Listening Ring */}
                        {status === 'listening' && (
                            <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-ping opacity-20" />
                        )}
                    </div>
                </div>

                {/* Dialogue */}
                <div className="text-center space-y-4 max-w-sm relative z-10 min-h-[100px]">
                    {transcript && (
                        <p className="text-sm text-slate-400 animate-in fade-in slide-in-from-bottom-2">
                            You: "{transcript}"
                        </p>
                    )}
                    <p className="text-slate-800 font-medium text-lg">
                        "{response}"
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="p-8 bg-white border-t border-slate-100">
                <div className="flex justify-center mb-6">
                    <button
                        onClick={startListening}
                        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95 ${status === 'listening' ? 'bg-red-500 text-white animate-pulse' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
                    >
                        {status === 'listening' ? <Activity className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </button>
                </div>
                <p className="text-center text-slate-400 text-sm">
                    {status === 'error' ? 'Check Microphone Permissions' : 'Tap mic to speak'}
                </p>
            </div>
        </div>
    );
}
