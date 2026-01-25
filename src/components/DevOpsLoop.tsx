import React from 'react';
import { motion } from 'framer-motion';

export default function DevOpsLoop({ className = "" }: { className?: string }) {
    // Enhanced animation variants
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: {
                    delay: i * 0.2,
                    type: "spring" as const,
                    duration: 2,
                    bounce: 0
                },
                opacity: { delay: i * 0.2, duration: 0.3 }
            }
        })
    };

    const textFade = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.2 + 0.8,
                duration: 0.6,
                type: "spring" as const,
                bounce: 0.3
            }
        })
    };

    const iconFloat = {
        hidden: { opacity: 0, y: 10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2 + 1,
                duration: 0.8,
                type: "spring" as const,
                bounce: 0.4
            }
        })
    };

    return (
        <div className={`relative ${className}`}>

            <motion.svg
                viewBox="0 0 800 450"
                className="w-full h-full relative z-10"
                initial="hidden"
                animate="visible"
            >
                <defs>
                    {/* Enhanced gradients with more vibrant colors */}
                    <linearGradient id="segmentGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient id="segmentGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                    <linearGradient id="segmentGradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <linearGradient id="segmentGradIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="50%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>

                    {/* Glow filters */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="strongGlow">
                        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* 1. PLAN (Top Left) */}
                <motion.path
                    custom={0}
                    variants={draw}
                    d="M 330 140 A 130 130 0 0 0 200 90"
                    stroke="url(#segmentGradBlue)"
                    strokeWidth="60"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />
                <motion.circle
                    custom={0}
                    variants={iconFloat}
                    cx="260"
                    cy="100"
                    r="35"
                    fill="rgba(59, 130, 246, 0.2)"
                    stroke="url(#segmentGradBlue)"
                    strokeWidth="3"
                    filter="url(#glow)"
                />
                <motion.text
                    custom={0}
                    variants={textFade}
                    className="fill-white text-xl font-bold font-sans tracking-wider uppercase"
                    x="260"
                    y="107"
                    textAnchor="middle"
                    style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}
                >
                    Plan
                </motion.text>

                {/* 2. CODE (Top Left Curve) */}
                <motion.path
                    custom={1}
                    variants={draw}
                    d="M 195 90 A 135 135 0 0 0 65 225"
                    stroke="url(#segmentGradCyan)"
                    strokeWidth="60"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />
                <motion.circle
                    custom={1}
                    variants={iconFloat}
                    cx="110"
                    cy="150"
                    r="35"
                    fill="rgba(6, 182, 212, 0.2)"
                    stroke="url(#segmentGradCyan)"
                    strokeWidth="3"
                    filter="url(#glow)"
                />
                <motion.text
                    custom={1}
                    variants={textFade}
                    className="fill-white text-xl font-bold font-sans tracking-wider uppercase"
                    x="110"
                    y="157"
                    textAnchor="middle"
                    style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.8)' }}
                >
                    Code
                </motion.text>

                {/* 3. BUILD (Bottom Left Curve) */}
                <motion.path
                    custom={2}
                    variants={draw}
                    d="M 65 230 A 135 135 0 0 0 215 355"
                    stroke="url(#segmentGradPurple)"
                    strokeWidth="60"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />
                <motion.circle
                    custom={2}
                    variants={iconFloat}
                    cx="120"
                    cy="300"
                    r="35"
                    fill="rgba(139, 92, 246, 0.2)"
                    stroke="url(#segmentGradPurple)"
                    strokeWidth="3"
                    filter="url(#glow)"
                />
                <motion.text
                    custom={2}
                    variants={textFade}
                    className="fill-white text-xl font-bold font-sans tracking-wider uppercase"
                    x="120"
                    y="307"
                    textAnchor="middle"
                    style={{ textShadow: '0 0 10px rgba(139, 92, 246, 0.8)' }}
                >
                    Build
                </motion.text>

                {/* 4. TEST (Bottom Center) */}
                <motion.path
                    custom={3}
                    variants={draw}
                    d="M 220 355 Q 320 365 380 290"
                    stroke="url(#segmentGradIndigo)"
                    strokeWidth="60"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />
                <motion.circle
                    custom={3}
                    variants={iconFloat}
                    cx="300"
                    cy="340"
                    r="35"
                    fill="rgba(99, 102, 241, 0.2)"
                    stroke="url(#segmentGradIndigo)"
                    strokeWidth="3"
                    filter="url(#glow)"
                />
                <motion.text
                    custom={3}
                    variants={textFade}
                    className="fill-white text-xl font-bold font-sans tracking-wider uppercase"
                    x="300"
                    y="347"
                    textAnchor="middle"
                    style={{ textShadow: '0 0 10px rgba(99, 102, 241, 0.8)' }}
                >
                    Test
                </motion.text>

                {/* 5. RELEASE (Center Crossing - The Big Arrow) */}
                <motion.g custom={4} variants={draw}>
                    <path
                        d="M 375 285 L 520 120"
                        stroke="url(#segmentGradBlue)"
                        strokeWidth="70"
                        fill="none"
                        strokeLinecap="round"
                        filter="url(#strongGlow)"
                    />
                    {/* Arrow Head */}
                    <path
                        d="M 500 85 L 560 120 L 510 155 Z"
                        fill="#60a5fa"
                        filter="url(#strongGlow)"
                    />
                </motion.g>
                <motion.rect
                    custom={4}
                    variants={iconFloat}
                    x="410"
                    y="175"
                    width="80"
                    height="50"
                    rx="8"
                    fill="rgba(59, 130, 246, 0.3)"
                    stroke="url(#segmentGradBlue)"
                    strokeWidth="3"
                    filter="url(#glow)"
                    transform="rotate(-50 450 200)"
                />
                <motion.text
                    custom={4}
                    variants={textFade}
                    className="fill-white text-2xl font-extrabold font-sans tracking-wider uppercase"
                    x="450"
                    y="208"
                    textAnchor="middle"
                    transform="rotate(-50 450 208)"
                    style={{ textShadow: '0 0 15px rgba(59, 130, 246, 1)' }}
                >
                    Release
                </motion.text>

                {/* 6. DEPLOY (Top Right) */}
                <motion.path
                    custom={5}
                    variants={draw}
                    d="M 540 110 Q 600 85 670 120"
                    stroke="url(#segmentGradCyan)"
                    strokeWidth="60"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />
                <motion.circle
                    custom={5}
                    variants={iconFloat}
                    cx="610"
                    cy="100"
                    r="35"
                    fill="rgba(6, 182, 212, 0.2)"
                    stroke="url(#segmentGradCyan)"
                    strokeWidth="3"
                    filter="url(#glow)"
                />
                <motion.text
                    custom={5}
                    variants={textFade}
                    className="fill-white text-xl font-bold font-sans tracking-wider uppercase"
                    x="610"
                    y="107"
                    textAnchor="middle"
                    style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.8)' }}
                >
                    Deploy
                </motion.text>

                {/* 7. OPERATE (Right Side) */}
                <motion.path
                    custom={6}
                    variants={draw}
                    d="M 675 125 A 135 135 0 0 1 665 335"
                    stroke="url(#segmentGradPurple)"
                    strokeWidth="60"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />
                <motion.circle
                    custom={6}
                    variants={iconFloat}
                    cx="700"
                    cy="230"
                    r="35"
                    fill="rgba(139, 92, 246, 0.2)"
                    stroke="url(#segmentGradPurple)"
                    strokeWidth="3"
                    filter="url(#glow)"
                />
                <motion.text
                    custom={6}
                    variants={textFade}
                    className="fill-white text-xl font-bold font-sans tracking-wider uppercase"
                    x="700"
                    y="237"
                    textAnchor="middle"
                    style={{ textShadow: '0 0 10px rgba(139, 92, 246, 0.8)' }}
                >
                    Operate
                </motion.text>

                {/* 8. MONITOR (Bottom Right) */}
                <motion.path
                    custom={7}
                    variants={draw}
                    d="M 660 340 Q 580 375 500 320"
                    stroke="url(#segmentGradIndigo)"
                    strokeWidth="60"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />
                <motion.circle
                    custom={7}
                    variants={iconFloat}
                    cx="580"
                    cy="350"
                    r="35"
                    fill="rgba(99, 102, 241, 0.2)"
                    stroke="url(#segmentGradIndigo)"
                    strokeWidth="3"
                    filter="url(#glow)"
                />
                <motion.text
                    custom={7}
                    variants={textFade}
                    className="fill-white text-xl font-bold font-sans tracking-wider uppercase"
                    x="580"
                    y="357"
                    textAnchor="middle"
                    style={{ textShadow: '0 0 10px rgba(99, 102, 241, 0.8)' }}
                >
                    Monitor
                </motion.text>

                {/* 9. Back Crossing (Monitor -> Plan) - Behind Release */}
                <motion.path
                    custom={8}
                    variants={draw}
                    d="M 495 315 L 345 155"
                    stroke="url(#segmentGradBlue)"
                    strokeWidth="60"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.4"
                    filter="url(#glow)"
                />

                {/* Connection dots for visual continuity */}
                <motion.circle custom={0} variants={iconFloat} cx="330" cy="140" r="8" fill="#60a5fa" filter="url(#glow)" />
                <motion.circle custom={1} variants={iconFloat} cx="200" cy="90" r="8" fill="#22d3ee" filter="url(#glow)" />
                <motion.circle custom={2} variants={iconFloat} cx="65" cy="225" r="8" fill="#a78bfa" filter="url(#glow)" />
                <motion.circle custom={3} variants={iconFloat} cx="215" cy="355" r="8" fill="#818cf8" filter="url(#glow)" />
                <motion.circle custom={5} variants={iconFloat} cx="540" cy="110" r="8" fill="#22d3ee" filter="url(#glow)" />
                <motion.circle custom={6} variants={iconFloat} cx="670" cy="120" r="8" fill="#a78bfa" filter="url(#glow)" />
                <motion.circle custom={7} variants={iconFloat} cx="665" cy="335" r="8" fill="#818cf8" filter="url(#glow)" />

            </motion.svg>
        </div >
    );
}
