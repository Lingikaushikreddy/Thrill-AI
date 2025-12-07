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
                recognitionRef.current.lang = 'te-IN'; // Telugu India

                recognitionRef.current.onstart = () => {
                    setStatus('listening');
                    setErrorMessage('');
                };

                recognitionRef.current.onresult = (event: any) => {
                    const text = event.results[0][0].transcript;
                    console.log("Recognized (Telugu):", text);
                    setTranscript(text);
                    handleUserMessage(text);
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error("Recognition Error:", event.error);
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

        // Find Telugu Voice
        const voice = voices.find(v => v.lang.includes('te-IN')) ||
            voices.find(v => v.name.toLowerCase().includes('telugu'));

        if (voice) {
            utterance.voice = voice;
            setMissingVoice(false);
        } else {
            console.warn("Telugu voice not found");
            setMissingVoice(true);
            // Fallback: Use English voice but warn user
        }

        utterance.rate = 0.9; // Slightly slower for clarity
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
        <div className="w-full max-w-lg mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden border border-orange-100 min-h-[600px] flex flex-col relative">

            {/* Header */}
            <div className={`p-6 text-white flex items-center justify-between transition-colors ${status === 'error' ? 'bg-red-600' : 'bg-orange-600'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <HeartPulse className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">City General (Telugu)</h3>
                        <p className="text-orange-100 text-xs">వర్చువల్ రిసెప్షనిస్ట్</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-black/20 rounded-full text-xs font-mono">
                    <span className={`w-2 h-2 rounded-full ${status === 'listening' ? 'bg-red-400 animate-pulse' : 'bg-gray-400'}`} />
                    {status.toUpperCase()}
                </div>
            </div>

            {/* Main Visual Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-orange-50/30 relative overflow-hidden">
                {errorMessage && (
                    <div className="absolute top-4 inset-x-4 bg-red-100 border border-red-200 text-red-700 p-3 rounded-lg flex items-start gap-2 text-sm z-50">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <p>{errorMessage}</p>
                    </div>
                )}

                {missingVoice && (
                    <div className="absolute top-4 inset-x-4 bg-yellow-100 border border-yellow-200 text-yellow-800 p-3 rounded-lg flex items-start gap-2 text-sm z-50 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <p>
                            <strong>No Telugu Voice Found!</strong><br />
                            Using fallback voice. Please install a Telugu language pack on your device settings for the real experience.
                        </p>
                    </div>
                )}

                <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-500 p-1 shadow-xl mb-8">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                        <img
                            src="https://img.freepik.com/free-photo/indian-woman-doctor-wearing-white-coat-stethoscope_23-2148053675.jpg"
                            alt="Indian Doctor AI"
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=Te&background=EA580C&color=fff')}
                        />
                        {status === 'listening' && (
                            <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-ping opacity-20" />
                        )}
                    </div>
                </div>

                <div className="text-center space-y-4 max-w-sm relative z-10 min-h-[100px]">
                    {transcript && (
                        <p className="text-sm text-slate-400 animate-in fade-in slide-in-from-bottom-2">
                            You: "{transcript}"
                        </p>
                    )}
                    <p className="text-[#2D2520] font-medium text-lg font-serif">
                        "{response}"
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="p-8 bg-white border-t border-orange-100">
                <div className="flex justify-center mb-6">
                    <button
                        onClick={startListening}
                        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95 ${status === 'listening' ? 'bg-red-500 text-white animate-pulse' : 'bg-orange-600 text-white hover:bg-orange-700'}`}
                    >
                        {status === 'listening' ? <Activity className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </button>
                </div>
                <p className="text-center text-slate-400 text-sm">
                    {status === 'error' ? 'Check Microphone' : 'మాట్లాడటానికి నొక్కండి (Tap to speak)'}
                </p>
            </div>
        </div>
    );
}
