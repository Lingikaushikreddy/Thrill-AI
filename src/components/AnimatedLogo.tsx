'use client';

import React from 'react';

export const AnimatedLogo = () => {
    return (
        <div className="relative w-10 h-10 flex items-center justify-center">
            {/* 3D Glass Background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]"></div>

            {/* Core Orb - Syncs with beam (pulse-fast) */}
            <div className="w-3 h-3 bg-brand-sky rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)] animate-[var(--animate-pulse-fast)] relative z-10"></div>

            {/* Inner Ring - Syncs with slow spin */}
            <div className="absolute w-6 h-6 border border-brand-sky/30 rounded-full animate-[var(--animate-spin-slow)] border-t-transparent"></div>

            {/* Outer Ring - Syncs with reverse spin and sonar */}
            <div className="absolute w-8 h-8 border border-white/10 rounded-full animate-[var(--animate-spin-slow-reverse)] border-b-transparent"></div>

            {/* Nano Beam Effect */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-sky/50 to-transparent animate-[beam_3s_linear_infinite]"></div>
            </div>
        </div>
    );
};
