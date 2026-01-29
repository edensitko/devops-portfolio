import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react';

export default function FloatingTerminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
        { type: 'output', content: 'Welcome to DevOps Terminal v1.0.0' },
        { type: 'output', content: 'Type "help" for available commands' },
    ]);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when terminal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Auto-scroll to bottom when history updates
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        // Add input to history
        setHistory(prev => [...prev, { type: 'input', content: `$ ${cmd}` }]);

        let output = '';

        switch (trimmedCmd) {
            case 'help':
                output = `Available commands:
  help      - Show this help message
  about     - About this portfolio
  skills    - List technical skills
  contact   - Get contact information
  clear     - Clear terminal
  whoami    - Display user info`;
                break;
            case 'about':
                output = 'DevOps Engineer & Cloud Architect\nBuilding scalable infrastructure and automation solutions';
                break;
            case 'skills':
                output = `Technical Skills:
  • Cloud: AWS, Azure, GCP
  • Containers: Docker, Kubernetes
  • IaC: Terraform, CloudFormation
  • CI/CD: GitHub Actions, Jenkins
  • Monitoring: Prometheus, Grafana`;
                break;
            case 'contact':
                output = 'Email: contact@edensitko.com\nWebsite: https://edensitko.com';
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case 'whoami':
                output = 'devops-engineer@portfolio:~$';
                break;
            case '':
                break;
            default:
                output = `Command not found: ${cmd}\nType "help" for available commands`;
        }

        if (output) {
            setHistory(prev => [...prev, { type: 'output', content: output }]);
        }

        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input);
        }
    };

    return (
        <>
            {/* Floating Button - Responsive sizing */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300"
                style={{ display: isOpen ? 'none' : 'flex' }}
            >
                <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Terminal Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        {/* Terminal Window - Fully responsive */}
                        <motion.div
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{
                                y: 0,
                                opacity: 1,
                            }}
                            exit={{ y: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className={`fixed z-50 bg-[#1e1e1e] shadow-2xl overflow-hidden border border-gray-700
                                ${isMaximized
                                    ? 'inset-2 sm:inset-4 rounded-lg'
                                    : 'bottom-0 left-0 right-0 sm:bottom-4 sm:left-auto sm:right-4 sm:w-full sm:max-w-2xl h-[70vh] sm:h-[500px] rounded-t-lg sm:rounded-lg'
                                }`}
                        >
                            {/* Terminal Header */}
                            <div className="bg-[#2d2d2d] px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between border-b border-gray-700">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="flex gap-1.5 sm:gap-2">
                                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer active:scale-90 transition-transform" onClick={() => setIsOpen(false)} />
                                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer active:scale-90 transition-transform" onClick={() => setIsMaximized(!isMaximized)} />
                                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer" />
                                    </div>
                                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-300">
                                        <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        <span className="text-xs sm:text-sm font-mono hidden xs:inline">terminal</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <button
                                        onClick={() => setIsMaximized(!isMaximized)}
                                        className="text-gray-400 hover:text-white transition-colors p-1 active:scale-90"
                                        aria-label={isMaximized ? "Minimize" : "Maximize"}
                                    >
                                        {isMaximized ? <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-400 hover:text-white transition-colors p-1 active:scale-90"
                                        aria-label="Close"
                                    >
                                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Terminal Body */}
                            <div className="bg-[#1e1e1e] h-full flex flex-col">
                                {/* Output Area */}
                                <div
                                    ref={terminalRef}
                                    className="flex-1 overflow-y-auto p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-1.5 sm:space-y-2 no-scrollbar"
                                    onClick={() => inputRef.current?.focus()}
                                >
                                    {history.map((item, index) => (
                                        <div key={index} className={item.type === 'input' ? 'text-green-400' : 'text-gray-300'}>
                                            {item.content.split('\n').map((line, i) => (
                                                <div key={i} className="break-words">{line}</div>
                                            ))}
                                        </div>
                                    ))}

                                    {/* Input Line */}
                                    <div className="flex items-center gap-2 text-green-400">
                                        <span className="flex-shrink-0">$</span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="flex-1 bg-transparent outline-none caret-green-400 min-w-0"
                                            spellCheck={false}
                                            autoComplete="off"
                                            autoCapitalize="off"
                                            autoCorrect="off"
                                        />
                                    </div>
                                </div>

                                {/* Status Bar */}
                                <div className="bg-[#007acc] px-3 py-1 sm:px-4 text-[10px] sm:text-xs font-mono text-white flex items-center justify-between">
                                    <span className="truncate">devops-engineer@portfolio:~</span>
                                    <span className="flex-shrink-0 ml-2">{history.length} lines</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
