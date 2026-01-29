'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play } from 'lucide-react';

interface WelcomeStageProps {
    onStart?: () => void;
}

type TerminalLine = {
    id: string;
    text: React.ReactNode;
    color?: string;
    type?: 'command' | 'output';
    html?: boolean;
};

export default function WelcomeStage({ onStart }: WelcomeStageProps) {
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const runInitialAnimation = async () => {
        const lines = [
            { text: "$ ssh eden@portfolio.dev", color: "text-green-400 ", delay: 800, fontSize: 'text-xs' },
            { text: "Connecting to DevOps Portfolio Server...", color: "text-gray-400", delay: 800, fontSize: 'text-xs' },
            { text: "Connection established.", color: "text-green-400", delay: 800, fontSize: 'text-xs' },
            { text: " ", delay: 100, fontSize: 'text-xs' },
            { text: "$ cat /etc/motd", color: "text-green-400", delay: 800, fontSize: 'text-xs' },
            { text: " ", delay: 400, fontSize: 'text-xs' },
            {
                html: true,
                text: (
                    <div className="border-l-4 border-yellow-500 bg-yellow-500/10 p-2 mb-2">
                        <div className="flex items-start gap-1">
                            <span className="text-yellow-500 font-bold text-xs">⚠ WARNING:</span>
                            <span className="text-yellow-200 text-xs">NOT A REGULAR PORTFOLIO WEBSITE</span>
                        </div>
                        <div className="text-gray-400 text-xs mt-1 ml-2">
                            This is an interactive DevOps CI/CD pipeline experience
                        </div>
                    </div>
                ),
                delay: 200
            },
            {
                html: true,
                text: (
                    <pre className="text-green-400 text-xs leading-tight mb-2 overflow-x-auto font-mono">
                        {`╔════════════════════════════════════════════╗
║  WELCOME TO MY DEVOPS PIPELINE PORTFOLIO ║
╚════════════════════════════════════════════╝`}
                    </pre>
                ),
                delay: 100
            },
            {
                html: true,
                text: (
                    <div className="space-y-0 mb-1">
                        <div className="text-cyan-400">
                            <span className="text-gray-500 text-xs">USER:</span> Eden Sitkovetsky
                        </div>
                        <div className="text-cyan-400">
                            <span className="text-gray-500 text-xs">ROLE:</span> DevOps Engineer & Full-Stack Developer
                        </div>
                        <div className="text-gray-300 text-xs mt-2 mb-2 pl-1 border-l-2 border-gray-700">
                            Hi there! 👋 I'm a passionate developer who loves building scalable applications and automating workflows. Instead of creating a traditional portfolio, I've built this interactive experience that mirrors a real DevOps CI/CD pipeline.
                        </div>
                    </div>
                ),
                delay: 200
            },





        ];




        for (const line of lines) {
            await new Promise(r => setTimeout(r, line.delay));
            setHistory(prev => [...prev, { ...line, id: Math.random().toString(36).substr(2, 9) }]);
        }
        setIsTyping(false);
        // Force focus after animation
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    useEffect(() => {
        runInitialAnimation();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const cmd = input.trim();
            if (!cmd) return;

            // Add command to history
            const newHistoryItem: TerminalLine = {
                id: Math.random().toString(),
                text: `$ ${cmd}`,
                color: "text-green-400",
                type: 'command'
            };

            setHistory(prev => [...prev, newHistoryItem]);
            setInput('');
            processCommand(cmd);
        }
    };

    const processCommand = (cmd: string) => {
        const lowerCmd = cmd.toLowerCase().trim();
        let output: TerminalLine | null = null;

        // Handle 'cat' command
        if (lowerCmd.startsWith('cat ')) {
            const file = lowerCmd.replace('cat ', '').trim();
            if (file === 'about.txt') {
                output = {
                    id: Math.random().toString(),
                    text: "Passionate Full-Stack Developer & DevOps Enthusiast building scalable applications and automating workflows.",
                    color: "text-gray-300",
                    type: 'output'
                };
            } else if (file === 'skills.txt') {
                output = {
                    id: Math.random().toString(),
                    text: "Docker, Kubernetes, Python, Linux, Terraform, React, Next.js, AWS",
                    color: "text-green-300",
                    type: 'output'
                };
            } else if (file === '/etc/motd') {
                output = {
                    id: Math.random().toString(),
                    html: true,
                    text: (
                        <pre className="text-green-400 text-xs leading-tight font-mono">
                            {`╔══════════════════════════════════════════════════════════════╗
║          WELCOME TO THE DEVOPS PIPELINE PORTFOLIO           ║
╚══════════════════════════════════════════════════════════════╝`}
                        </pre>
                    ),
                    type: 'output'
                };
            } else {
                output = {
                    id: Math.random().toString(),
                    text: `cat: ${file}: No such file or directory`,
                    color: "text-red-400",
                    type: 'output'
                };
            }
        } else {
            switch (lowerCmd) {
                case 'help':
                    output = {
                        id: Math.random().toString(),
                        text: "Available commands: ls, whoami, skills, contact, clear, projects, repositories, about, experience, certifications, stats",
                        color: "text-yellow-400",
                        type: 'output'
                    };
                    break;
                case 'ls':
                    output = {
                        id: Math.random().toString(),
                        text: "projects/ repositories/ about.txt skills.txt experience/ certifications/ stats/",
                        color: "text-blue-400",
                        type: 'output'
                    };
                    break;
                case 'whoami':
                    output = {
                        id: Math.random().toString(),
                        text: "Eden Sitkovetsky - DevOps Engineer",
                        color: "text-cyan-400",
                        type: 'output'
                    };
                    break;
                case 'skills':
                    output = {
                        id: Math.random().toString(),
                        text: "Docker, Kubernetes, Python, Linux, Terraform, React, Next.js, AWS",
                        color: "text-green-300",
                        type: 'output'
                    };
                    break;
                case 'contact':
                    output = {
                        id: Math.random().toString(),
                        text: "Email: edensit139@gmail.com | LinkedIn: /in/eden-sitkovetsky",
                        color: "text-gray-300",
                        type: 'output'
                    };
                    break;
                case 'projects':
                    output = {
                        id: Math.random().toString(),
                        text: "DevOps Capstone, RabbitMQ Cluster, ID Profiles Generator, Workflow Notifier, Personal Portfolio",
                        color: "text-purple-400",
                        type: 'output'
                    };
                    break;
                case 'repositories':
                    output = {
                        id: Math.random().toString(),
                        text: "github.com/edensitko",
                        color: "text-blue-300",
                        type: 'output'
                    };
                    break;
                case 'about':
                    output = {
                        id: Math.random().toString(),
                        text: "Passionate Full-Stack Developer & DevOps Enthusiast building scalable applications and automating workflows.",
                        color: "text-gray-300",
                        type: 'output'
                    };
                    break;
                case 'experience':
                    output = {
                        id: Math.random().toString(),
                        text: "Full-Stack Developer (Freelance), DevOps Engineer (Simulation), System Administrator",
                        color: "text-gray-300",
                        type: 'output'
                    };
                    break;
                case 'certifications':
                    output = {
                        id: Math.random().toString(),
                        text: "IBM DevOps Professional, AWS Cloud Practitioner, HashiCorp Terraform Associate",
                        color: "text-yellow-300",
                        type: 'output'
                    };
                    break;
                case 'stats':
                    output = {
                        id: Math.random().toString(),
                        text: "CPU: 12% | MEM: 45% | UPTIME: 99.9% | DEPLOYMENTS: 42",
                        color: "text-green-500",
                        type: 'output'
                    };
                    break;
                case 'clear':
                    setHistory([]);
                    return;
                case './start-pipeline.sh':
                case 'start':
                case 'pipeline':
                case 'execute':
                case 'enter':
                    if (onStart) onStart();
                    return;
                default:
                    output = {
                        id: Math.random().toString(),
                        text: `Command not found: ${cmd}. Type 'help' for available commands.`,
                        color: "text-red-400",
                        type: 'output'

                    };
            }
        }

        if (output) {
            setHistory(prev => [...prev, output!]);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#0d1117] flex items-center justify-center px-4 overflow-y-auto" onClick={() => !isTyping && inputRef.current?.focus()}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl mx-auto my-6"
            >
                {/* Terminal Window */}
                <div className="bg-[#0a0e14] border-2 border-green-500/30 rounded-lg shadow-2xl shadow-green-500/20 overflow-hidden min-h-[500px] flex flex-col">
                    {/* Terminal Header */}
                    <div className="bg-[#1a1f2e] border-b border-green-500/30 px-4 py-2 flex items-center gap-3 flex-shrink-0">
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

                    {/* Terminal Content */}
                    <div className="px-4 py-2 font-mono text-sm flex-1 overflow-y-auto cursor-text [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#0a0e14] [&::-webkit-scrollbar-thumb]:bg-green-500 [&::-webkit-scrollbar-thumb]:rounded relative"
                        onClick={(e) => {
                            if (window.getSelection()?.toString()) return;
                            inputRef.current?.focus();
                        }}
                    >
                        {/* History */}
                        {history.map((line) => (
                            <div key={line.id} className={`${line.color || 'text-gray-300'} mb-1 break-words`}>
                                {line.html ? line.text : line.text}
                            </div>
                        ))}

                        {/* Input Area */}
                        {!isTyping && (
                            <>
                                <div className="text-gray-400 mb-3 mt-2 text-xs">
                                    Type 'help' for available commands.
                                </div>
                                <div className="flex text-md items-center text-green-400 group mb-4">
                                    <span className="mr-2 flex-shrink-0 ">$</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="bg-transparent border-none outline-none flex-1 text-green-400 placeholder-green-400/30 w-full min-w-0"
                                        autoComplete="off"
                                        spellCheck="false"
                                        placeholder="Enter command..."
                                    />
                                </div>
                            </>
                        )}

                        {/* Static Bottom Content (Instructions & Start Button) */}
                        {!isTyping && (
                            <>
                                <div className="mt-2 mb-1">
                                    <div className="text-gray-400 mb-1 text-xs">Type 'Start' or click the Execute button </div>

                                    <button
                                        onClick={onStart}
                                        className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded transition-all duration-300 shadow-lg hover:shadow-green-500/50 flex items-center gap-3 group text-sm w-fit"
                                    >
                                        <Play className="w-4 h-4 group-hover:animate-pulse" />
                                        <span className='text-xs'> [ENTER] Execute Pipeline →</span>
                                    </button>
                                </div>
                            </>
                        )}

                        <div ref={bottomRef} className="h-4" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
