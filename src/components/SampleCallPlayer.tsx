'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, AlertTriangle } from 'lucide-react';

interface TranscriptItem {
    speaker: 'User' | 'AI';
    text: string;
    lang?: string;
}

interface SampleCallPlayerProps {
    language: string;
    duration: string;
    transcript: TranscriptItem[];
}

export function SampleCallPlayer({ language, duration, transcript }: SampleCallPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentLineIndex, setCurrentLineIndex] = useState(-1);
    const [missingVoice, setMissingVoice] = useState(false);

    const isCancelledRef = useRef(false);

    useEffect(() => {
        return () => {
            isCancelledRef.current = true;
            window.speechSynthesis.cancel();
        };
    }, []);

    const getVoice = (langCode: string) => {
        const voices = window.speechSynthesis.getVoices();
        // Priority 1: Exact lang code match
        let voice = voices.find(v => v.lang.replace('_', '-') === langCode);

        // Priority 2: Fuzzy lang match
        if (!voice) voice = voices.find(v => v.lang.includes(langCode.split('-')[0]));

        // Priority 3: Name match (useful for "Telugu" etc)
        if (!voice) {
            const langName = langCode.includes('te') ? 'Telugu' :
                langCode.includes('hi') ? 'Hindi' : 'English';
            voice = voices.find(v => v.name.toLowerCase().includes(langName.toLowerCase()));
        }

        return voice;
    };

    const playOnlineTTS = (text: string, langCode: string): Promise<void> => {
        return new Promise((resolve) => {
            const lang = langCode.split('-')[0]; // 'te-IN' -> 'te'
            // Use local proxy to avoid CORS/Blocking
            const url = `/api/tts?text=${encodeURIComponent(text)}&lang=${lang}`;

            const audio = new Audio(url);

            audio.onended = () => resolve();
            audio.onerror = (e) => {
                console.error("Online TTS playback failed", e);
                // If it fails, we wait a generic amount of time (e.g. 1.5s) to simulate speech duration
                // so the visualizer doesn't just flash through.
                setTimeout(resolve, 1500);
            };

            audio.play().catch(e => {
                console.error("Audio play() rejected", e);
                setTimeout(resolve, 1500);
            });
        });
    };

    const playSimulation = async () => {
        setIsPlaying(true);
        setMissingVoice(false);
        isCancelledRef.current = false;

        const totalChars = transcript.reduce((acc, item) => acc + item.text.length, 0);
        let charsspoken = 0;

        for (let i = 0; i < transcript.length; i++) {
            if (isCancelledRef.current) break;

            setCurrentLineIndex(i);
            const item = transcript[i];

            // Check for local voice
            const targetVoice = getVoice(item.lang || 'en-US');

            if (targetVoice) {
                // Use Local SpeechSynthesis
                await new Promise<void>((resolve) => {
                    if (isCancelledRef.current) { resolve(); return; }

                    const utterance = new SpeechSynthesisUtterance(item.text);
                    utterance.lang = item.lang || 'en-US';
                    utterance.rate = 1.0;
                    utterance.voice = targetVoice;

                    utterance.onend = () => {
                        charsspoken += item.text.length;
                        setProgress((charsspoken / totalChars) * 100);
                        setTimeout(resolve, 500);
                    };
                    utterance.onerror = () => resolve();
                    window.speechSynthesis.speak(utterance);
                });
            } else {
                // FALLBACK: Use Online TTS
                // Don't show error if we can play online
                await new Promise<void>(async (resolve) => {
                    if (isCancelledRef.current) { resolve(); return; }

                    await playOnlineTTS(item.text, item.lang || 'en-US');

                    charsspoken += item.text.length;
                    setProgress((charsspoken / totalChars) * 100);
                    setTimeout(resolve, 500);
                });
            }
        }

        setIsPlaying(false);
        setCurrentLineIndex(-1);
        setProgress(100);
        setTimeout(() => setProgress(0), 1000);
    };

    const stopSimulation = () => {
        isCancelledRef.current = true;
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setCurrentLineIndex(-1);
    };

    const togglePlay = () => {
        if (isPlaying) {
            stopSimulation();
        } else {
            playSimulation();
        }
    };

    return (
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:border-brand-sky/30 transition-colors group relative overflow-hidden">
            {missingVoice && (
                <div className="absolute top-0 left-0 w-full bg-orange-500/20 text-orange-200 text-xs px-4 py-1 flex items-center gap-2 border-b border-orange-500/30" role="alert">
                    <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                    <span>System voice for {language} not found. Playback may be silent.</span>
                </div>
            )}

            <div className={`flex items-center gap-4 mb-4 ${missingVoice ? 'mt-6' : ''}`}>
                <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-brand-sky/10 text-brand-sky flex items-center justify-center hover:bg-brand-sky hover:text-black transition-all shadow-[0_0_15px_rgba(56,189,248,0.1)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] flex-shrink-0"
                    aria-label={isPlaying ? `Pause ${language} sample` : `Play ${language} sample`}
                >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" aria-hidden="true" /> : <Play className="w-5 h-5 fill-current ml-1" aria-hidden="true" />}
                </button>

                <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-white/40">
                        <span>{language} Sample</span>
                        <div className="flex items-center gap-1">
                            <Volume2 className="w-3 h-3" aria-hidden="true" />
                            <span>{duration}</span>
                        </div>
                    </div>

                    <div className="h-1 bg-white/10 rounded-full overflow-hidden w-full">
                        <div
                            className="h-full bg-brand-sky transition-all duration-300 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2 pl-4 border-l-2 border-white/5 max-h-[150px] overflow-y-auto custom-scrollbar">
                {transcript.map((item, idx) => (
                    <div
                        key={idx}
                        className={`text-xs transition-colors duration-300 ${idx === currentLineIndex ? 'text-brand-sky font-medium' : 'text-white/30'}`}
                    >
                        <span className="opacity-50 uppercase mr-2 tracking-wider text-[10px]">
                            {item.speaker === 'AI' ? 'Thrill AI' : 'Customer'}:
                        </span>
                        "{item.text}"
                    </div>
                ))}
            </div>
        </div>
    );
}
