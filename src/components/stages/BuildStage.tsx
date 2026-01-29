import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface ServiceItem {
    text: string;
    type: 'info' | 'output' | 'success';
    subItems?: string[];
}

// Typing component for green titles
function TypingText({ text, delay = 0, onComplete }: { text: string; delay?: number; onComplete?: () => void }) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            if (currentIndex < text.length) {
                const timer = setTimeout(() => {
                    setDisplayedText(prev => prev + text[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                }, 30); // 30ms per character for titles
                return () => clearTimeout(timer);
            } else if (currentIndex === text.length && onComplete) {
                onComplete();
            }
        }, delay);
        return () => clearTimeout(startTimer);
    }, [currentIndex, text, delay, onComplete]);

    return <span>{displayedText}</span>;
}

export default function BuildStage({ progress: externalProgress }: { progress: number }) {
    const [commandText, setCommandText] = useState('');
    const [showContent, setShowContent] = useState(false);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [currentServiceIndex, setCurrentServiceIndex] = useState(-1);

    const command = '$ cat services.txt';

    const services: ServiceItem[] = [
        {
            text: '01 • CLOUD ENGINEERING',
            type: 'success',
            subItems: [
                'Designing and implementing scalable solutions on AWS,',
                'Azure, and GCP. Expertise in EC2, S3, Lambda, IAM, and',
                'cloud-native architectures.'
            ]
        },
        {
            text: '02 • DEVOPS & CI/CD',
            type: 'success',
            subItems: [
                'Setting up automated pipelines with GitHub Actions,',
                'Azure DevOps, Jenkins. Containerization with Docker and',
                'orchestration with Kubernetes.'
            ]
        },
        {
            text: '03 • WEB DEVELOPMENT',
            type: 'success',
            subItems: [
                'Full-stack development with JavaScript/TypeScript,',
                'React, Node.js, and modern frameworks. RESTful APIs and',
                'database integration.'
            ]
        },
        {
            text: '04 • INFRASTRUCTURE AS CODE',
            type: 'success',
            subItems: [
                'Automating infrastructure provisioning with Terraform,',
                'CloudFormation, and AWS CDK. Configuration management',
                'with Ansible.'
            ]
        },
        {
            text: '05 • DATABASE MANAGEMENT',
            type: 'success',
            subItems: [
                'Design and optimization of relational and NoSQL',
                'databases. Experience with MySQL, DynamoDB, Redshift,',
                'and data warehousing solutions.'
            ]
        },
        {
            text: '06 • SYSTEM ADMINISTRATION',
            type: 'success',
            subItems: [
                'Managing Windows and Linux servers, networking',
                'infrastructure, security implementations, and',
                'performance optimization.'
            ]
        },
    ];

    // Typing effect for command
    useEffect(() => {
        if (currentCharIndex < command.length) {
            const timer = setTimeout(() => {
                setCommandText(command.substring(0, currentCharIndex + 1));
                setCurrentCharIndex(prev => prev + 1);
            }, 100); // 100ms per character
            return () => clearTimeout(timer);
        } else if (currentCharIndex === command.length && !showContent) {
            // Wait 500ms after typing completes, then show content
            const timer = setTimeout(() => {
                setShowContent(true);
                setCurrentServiceIndex(0);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [currentCharIndex, command.length, showContent]);

    // Blinking cursor
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    const handleServiceComplete = () => {
        if (currentServiceIndex < services.length - 1) {
            setTimeout(() => {
                setCurrentServiceIndex(prev => prev + 1);
            }, 100); // Small delay between services
        }
    };

    const getLineStyle = (type: string) => {
        switch (type) {
            case 'success':
                return 'text-green-400 font-bold';
            case 'info':
                return 'text-blue-400';
            default:
                return 'text-gray-400';
        }
    };

    const progress = showContent
        ? 50 + Math.round((currentServiceIndex + 1) / services.length * 50)
        : Math.round((currentCharIndex / command.length) * 50);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto px-4 sm:px-2"
        >
            <div className="bg-[#0d1117] border border-yellow-500/20 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl flex flex-col h-[75vh] lg:h-[600px]">
                {/* Terminal Header */}
                <div className="bg-[#161b22] px-2 sm:px-3 py-1 border-b border-gray-800 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-gray-400 font-mono text-[10px] sm:text-xs flex items-center gap-1.5">
                        <Terminal size={12} />
                        <span>services.sh</span>
                    </div>
                    <div className="text-yellow-400 font-bold text-xs sm:text-sm">{progress}%</div>
                </div>

                {/* Progress Bar */}
                <div className="bg-[#161b22] px-2 sm:px-3 py-1 border-b border-gray-800 flex-shrink-0">
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Terminal Content */}
                <div className="bg-black/60 p-2 sm:p-3 md:p-4 font-mono text-xs sm:text-sm flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-900 [&::-webkit-scrollbar-thumb]:bg-yellow-600 [&::-webkit-scrollbar-thumb]:rounded">
                    <div className="space-y-1">
                        {/* Command line with typing effect */}
                        <div className="text-yellow-500 font-bold">
                            {commandText}
                            {!showContent && showCursor && <span className="animate-pulse">▊</span>}
                        </div>

                        {/* Content appears after command is typed */}
                        {showContent && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-1 mt-2"
                            >
                                {/* Header */}
                                <div className="text-blue-400 break-words">══════════════════════════════════════════</div>
                                <div className="text-blue-400 text-center font-bold break-words">MY SERVICES</div>
                                <div className="text-blue-400 break-words">══════════════════════════════════════════</div>
                                <div className="text-gray-400 break-words">Professional services I offer across cloud engineering,</div>
                                <div className="text-gray-400 break-words">web development, DevOps, and infrastructure management.</div>
                                <div className="text-gray-400"></div>

                                {/* Services with typing titles */}
                                {services.map((service, index) => (
                                    <div key={index}>
                                        {index < currentServiceIndex && (
                                            // Already completed services - show everything instantly
                                            <>
                                                <div className="text-gray-400 break-words">──────────────────────────────────────────</div>
                                                <div className={getLineStyle(service.type)}>
                                                    {service.text}
                                                </div>
                                                <div className="text-gray-400 break-words">──────────────────────────────────────────</div>
                                                {service.subItems?.map((subItem, subIndex) => (
                                                    <div key={subIndex} className="text-gray-400 break-words">
                                                        {subItem}
                                                    </div>
                                                ))}
                                                <div className="text-gray-400"></div>
                                            </>
                                        )}
                                        {index === currentServiceIndex && (
                                            // Current service - typing title with instant subtext
                                            <>
                                                <div className="text-gray-400 break-words">──────────────────────────────────────────</div>
                                                <div className={getLineStyle(service.type)}>
                                                    <TypingText
                                                        text={service.text}
                                                        onComplete={handleServiceComplete}
                                                    />
                                                </div>
                                                <div className="text-gray-400 break-words">──────────────────────────────────────────</div>
                                                {/* Subtext appears instantly when title starts typing */}
                                                {service.subItems?.map((subItem, subIndex) => (
                                                    <motion.div
                                                        key={subIndex}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="text-gray-400 break-words"
                                                    >
                                                        {subItem}
                                                    </motion.div>
                                                ))}
                                                <div className="text-gray-400"></div>
                                            </>
                                        )}
                                    </div>
                                ))}


                                {/* Footer - shows when all services are done */}
                                {currentServiceIndex >= services.length - 1 && (
                                    <>
                                        <div className="text-blue-400">═══════════════════════════════════════════</div>
                                        <div className="text-green-400">✨ Services catalog loaded successfully!</div>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
