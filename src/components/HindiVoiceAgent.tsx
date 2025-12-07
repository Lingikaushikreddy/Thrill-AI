'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, PhoneOff, Activity, HeartPulse, AlertCircle } from 'lucide-react';

type AgentState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

export function HindiVoiceAgent() {
    const [status, setStatus] = useState<AgentState>('idle');
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('नमस्ते! सिटी जनरल अस्पताल में आपका स्वागत है। (Namaste! Welcome to City General Hospital)');
    const [errorMessage, setErrorMessage] = useState('');
    const [missingVoice, setMissingVoice] = useState(false);

    const recognitionRef = useRef<any>(null);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthesisRef.current = window.speechSynthesis;

            // Browser Compatibility Check
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                setStatus('error');
                setErrorMessage('इस ब्राउज़र में वॉयस सपोर्ट नहीं है। कृपया Chrome का उपयोग करें। (Voice not supported)');
                return;
            }

            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

            try {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = 'hi-IN'; // Hindi India

                recognitionRef.current.onstart = () => {
                    setStatus('listening');
                    setErrorMessage('');
                };

                recognitionRef.current.onresult = (event: any) => {
                    const text = event.results[0][0].transcript;
                    console.log("Recognized (Hindi):", text);
                    setTranscript(text);
                    handleUserMessage(text);
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error("Recognition Error:", event.error);
                    if (event.error === 'not-allowed') {
                        setErrorMessage('माइक्रोफ़ोन एक्सेस अस्वीकृत। कृपया लॉक आइकन 🔒 पर क्लिक करें और अनुमति दें। (Microphone Blocked!)');
                        setStatus('error');
                    } else if (event.error === 'no-speech') {
                        setStatus('idle');
                    } else {
                        setErrorMessage(`त्रुटि: ${event.error}`);
                        setStatus('error');
                    }
                };

                recognitionRef.current.onend = () => {
                    if (status === 'listening') setStatus('processing');
                };
            } catch (err) {
                setErrorMessage("वॉयस इंजन शुरू करने में विफल।");
                setStatus('error');
            }
        }
    }, []);

    const speak = (text: string) => {
        if (!synthesisRef.current) return;
        synthesisRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = synthesisRef.current.getVoices();

        // Find Hindi Voice
        const voice = voices.find(v => v.lang.includes('hi-IN')) ||
            voices.find(v => v.name.toLowerCase().includes('hindi')) ||
            voices.find(v => v.name.toLowerCase().includes('lekha')); // Common Google Hindi voice

        if (voice) {
            utterance.voice = voice;
            setMissingVoice(false);
        } else {
            console.warn("Hindi voice not found");
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
            // Basic Hindi Keyword Matching
            if (lowerText.includes('appointment') || lowerText.includes('अप्वाइंटमेंट') || lowerText.includes('बुकिंग') || lowerText.includes('मिलना')) {
                speak("ज़रूर, आपको किस डॉक्टर से मिलना है? (Sure, which doctor do you want to see?)");
            } else if (lowerText.includes('दिल') || lowerText.includes('heart') || lowerText.includes('cardiology') || lowerText.includes('हृदय')) {
                speak("कल सुबह 10 बजे डॉक्टर उपलब्ध हैं। क्या मैं इसे बुक करूँ? (Doctor is available tomorrow at 10 AM. Book it?)");
            } else if (lowerText.includes('emergency') || lowerText.includes('एमरजेंसी') || lowerText.includes('दर्द') || lowerText.includes('खून')) {
                speak("कृपया तुरंत 9 1 1 पर कॉल करें। यह एक आपात स्थिति है। (Please call 911 immediately.)");
            } else if (lowerText.includes('नमस्ते') || lowerText.includes('namaste') || lowerText.includes('hello')) {
                speak("नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ? (Namaste! How can I help?)");
            } else {
                speak("क्षमा करें, मुझे समझ नहीं आया। कृपया दोबारा कहें। (Sorry, I didn't understand.)");
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
            <div className={`p-6 text-white flex items-center justify-between transition-colors ${status === 'error' ? 'bg-red-600' : 'bg-orange-500'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <HeartPulse className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">City General (Hindi)</h3>
                        <p className="text-orange-100 text-xs">वर्चुअल रिसेप्शनिस्ट</p>
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
                            <strong>No Hindi Voice Found!</strong><br />
                            Using fallback voice. Please install a Hindi language pack on your device settings.
                        </p>
                    </div>
                )}

                <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 p-1 shadow-xl mb-8">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                        <img
                            src="https://img.freepik.com/free-photo/young-indian-woman-doctor-isolated-white-background_185193-78028.jpg"
                            alt="Hindi Doctor AI"
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=Hi&background=F97316&color=fff')}
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
                        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95 ${status === 'listening' ? 'bg-red-500 text-white animate-pulse' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                    >
                        {status === 'listening' ? <Activity className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </button>
                </div>
                <p className="text-center text-slate-400 text-sm">
                    {status === 'error' ? 'Check Microphone' : 'बोलने के लिए टैप करें (Tap to speak)'}
                </p>
            </div>
        </div>
    );
}
