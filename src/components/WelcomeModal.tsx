'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';

export default function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        // Check if user has seen the modal before
        const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal');

        if (!hasSeenModal) {
            // Show modal after a short delay
            setTimeout(() => {
                setIsOpen(true);
            }, 500);
        }

        // Blinking cursor effect
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        return () => clearInterval(cursorInterval);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenWelcomeModal', 'true');
    };

    // Terminal text with typing animation delays
    const terminalLines = [
        { delay: 0.3, text: "$ ssh eden@portfolio.dev", color: "text-green-400" },
        { delay: 0.6, text: "Connecting to DevOps Portfolio Server...", color: "text-gray-400" },
        { delay: 1.0, text: "Connection established.", color: "text-green-400" },
        { delay: 1.3, text: "", color: "" },
        { delay: 1.5, text: "$ cat /etc/motd", color: "text-green-400" },
        { delay: 1.8, text: "", color: "" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
                    />

                    {/* Terminal Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.target === e.currentTarget && handleClose()}
                    >
                        <div className="bg-[#0a0e14] border-2 border-green-500/30 rounded-lg shadow-2xl shadow-green-500/20 max-w-4xl w-full max-h-[90vh] overflow-hidden">
                            {/* Terminal Header */}
                            <div className="bg-[#1a1f2e] border-b border-green-500/30 px-4 py-2 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-400">
                                        <Terminal size={16} />
                                        <span className="font-mono text-sm">eden@portfolio:~</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="text-gray-400 hover:text-green-400 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-6 font-mono text-sm overflow-y-auto max-h-[calc(90vh-60px)] terminal-scrollbar">
                                {/* Animated terminal lines */}
                                {terminalLines.map((line, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: line.delay, duration: 0.3 }}
                                        className={`${line.color} mb-1`}
                                    >
                                        {line.text}
                                    </motion.div>
                                ))}

                                {/* Main content */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.0, duration: 0.5 }}
                                    className="space-y-4 mt-2"
                                >
                                    {/* Warning Box */}
                                    <div className="border-l-4 border-yellow-500 bg-yellow-500/10 p-4 mb-4">
                                        <div className="flex items-start gap-2">
                                            <span className="text-yellow-500 font-bold">⚠ WARNING:</span>
                                            <span className="text-yellow-200">NOT A REGULAR PORTFOLIO WEBSITE</span>
                                        </div>
                                        <div className="text-gray-400 text-xs mt-1 ml-6">
                                            This is an interactive DevOps CI/CD pipeline experience
                                        </div>
                                    </div>

                                    {/* ASCII Art Header */}
                                    <pre className="text-green-400 text-xs leading-tight mb-4 overflow-x-auto">
                                        {`╔══════════════════════════════════════════════════════════════╗
║          WELCOME TO THE DEVOPS PIPELINE PORTFOLIO           ║
╚══════════════════════════════════════════════════════════════╝`}
                                    </pre>

                                    {/* User Info */}
                                    <div className="space-y-2">
                                        <div className="text-cyan-400">
                                            <span className="text-gray-500">USER:</span> Eden Sitkovetsky
                                        </div>
                                        <div className="text-cyan-400">
                                            <span className="text-gray-500">ROLE:</span> Full-Stack Developer & DevOps Enthusiast
                                        </div>
                                        <div className="text-gray-400 text-xs mt-2 pl-4 border-l-2 border-gray-700">
                                            Hi there! 👋 I'm a passionate developer who loves building scalable<br />
                                            applications and automating workflows. Instead of creating a traditional<br />
                                            portfolio, I've built this interactive experience that mirrors a real<br />
                                            DevOps CI/CD pipeline.
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="grid md:grid-cols-2 gap-3 mt-4">
                                        <div className="bg-[#1a1f2e] border border-cyan-500/30 p-3 rounded">
                                            <div className="text-cyan-400 font-bold mb-1">▸ Full-Stack Development</div>
                                            <div className="text-gray-500 text-xs">Web & Mobile Applications</div>
                                        </div>
                                        <div className="bg-[#1a1f2e] border border-purple-500/30 p-3 rounded">
                                            <div className="text-purple-400 font-bold mb-1">▸ DevOps & Cloud</div>
                                            <div className="text-gray-500 text-xs">Infrastructure & Automation</div>
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div className="mt-6 space-y-2">
                                        <div className="text-green-400 font-bold">$ ./pipeline --help</div>
                                        <div className="text-gray-400 text-xs space-y-1 pl-4">
                                            <div><span className="text-green-500">→</span> Scroll through stages: Each section represents a DevOps lifecycle phase</div>
                                            <div><span className="text-cyan-500">→</span> Interactive animations: Watch the pipeline come to life as you explore</div>
                                            <div><span className="text-purple-500">→</span> Real content: Discover my skills, projects, and experience along the way</div>
                                        </div>
                                    </div>

                                    {/* Command prompt */}
                                    <div className="mt-6 pt-4 border-t border-gray-800">
                                        <div className="text-green-400 mb-3">
                                            $ ./start-pipeline.sh
                                            {showCursor && <span className="animate-pulse">▊</span>}
                                        </div>

                                        <button
                                            onClick={handleClose}
                                            className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/50"
                                        >
                                            [ENTER] Execute Pipeline →
                                        </button>

                                        <div className="text-gray-600 text-xs text-center mt-3">
                                            Press ENTER or click to start • This message won't show again
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    <style jsx global>{`
                        .terminal-scrollbar::-webkit-scrollbar {
                            width: 8px;
                        }
                        .terminal-scrollbar::-webkit-scrollbar-track {
                            background: #0a0e14;
                        }
                        .terminal-scrollbar::-webkit-scrollbar-thumb {
                            background: #22c55e;
                            border-radius: 4px;
                        }
                        .terminal-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: #16a34a;
                        }
                    `}</style>
                </>
            )}
        </AnimatePresence>
    );
}
