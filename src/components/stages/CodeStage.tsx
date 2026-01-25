import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, FileCode } from 'lucide-react';

// Typewriter effect for individual lines
function TypewriterLine({ text, speed = 2 }: { text: string, speed?: number }) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, text, speed]);

    return <span>{displayedText}</span>;
}

// IDE Code Editor Component
function IDECodeEditor() {
    const [currentLine, setCurrentLine] = useState(0);
    const [typedContent, setTypedContent] = useState<string[]>([]);

    const codeLines = [
        { text: "// ABOUT_ME.TSX", color: "text-green-500", lineNum: 1, delay: 0 },
        { text: "", color: "", lineNum: 2, delay: 5 },
        { text: "export const AboutMe = () => {", color: "text-purple-400", lineNum: 3, delay: 10 },
        { text: "  const greeting = \"Hi, my name is Eden Sitkovetsky\"", color: "text-gray-300", lineNum: 4, delay: 15 },
        { text: "", color: "", lineNum: 5, delay: 20 },
        { text: "  const intro = `", color: "text-purple-400", lineNum: 6, delay: 25 },
        { text: "    Hi, I'm Eden Sitkovetsky – a passionate", color: "text-blue-300", lineNum: 7, delay: 30 },
        { text: "    Full-Stack Developer & DevOps enthusiast", color: "text-blue-300", lineNum: 8, delay: 35 },
        { text: "    with a strong background in web, mobile,", color: "text-blue-300", lineNum: 9, delay: 40 },
        { text: "    and cloud-based development.", color: "text-blue-300", lineNum: 10, delay: 45 },
        { text: "", color: "", lineNum: 11, delay: 50 },
        { text: "    This portfolio showcases my work across", color: "text-blue-300", lineNum: 12, delay: 55 },
        { text: "    multiple domains including:", color: "text-blue-300", lineNum: 13, delay: 60 },
        { text: "  `;", color: "text-purple-400", lineNum: 14, delay: 65 },
        { text: "", color: "", lineNum: 15, delay: 70 },
        { text: "  const domains = [", color: "text-purple-400", lineNum: 16, delay: 75 },
        { text: "    {", color: "text-gray-400", lineNum: 17, delay: 80 },
        { text: "      title: \"⚙️ DevOps & Cloud Infrastructure\",", color: "text-gray-300", lineNum: 18, delay: 85 },
        { text: "      description:", color: "text-gray-300", lineNum: 19, delay: 90 },
        { text: "        \"Projects involving Terraform, Docker, AWS,\"", color: "text-blue-300", lineNum: 20, delay: 95 },
        { text: "        + \" CI/CD pipelines, Prometheus, and Alerting systems.\"", color: "text-blue-300", lineNum: 21, delay: 100 },
        { text: "    },", color: "text-gray-400", lineNum: 22, delay: 105 },
        { text: "", color: "", lineNum: 23, delay: 110 },
        { text: "    {", color: "text-gray-400", lineNum: 24, delay: 115 },
        { text: "      title: \"📱 Mobile App Development\",", color: "text-gray-300", lineNum: 25, delay: 120 },
        { text: "      description:", color: "text-gray-300", lineNum: 26, delay: 125 },
        { text: "        \"Beautiful and functional apps built with Flutter\"", color: "text-blue-300", lineNum: 27, delay: 130 },
        { text: "        + \" and Firebase, tailored for real-world needs\"", color: "text-blue-300", lineNum: 28, delay: 135 },
        { text: "        + \" like scheduling, chat, and more.\"", color: "text-blue-300", lineNum: 29, delay: 140 },
        { text: "    },", color: "text-gray-400", lineNum: 30, delay: 145 },
        { text: "", color: "", lineNum: 31, delay: 150 },
        { text: "    {", color: "text-gray-400", lineNum: 32, delay: 155 },
        { text: "      title: \"🌐 Web Development\",", color: "text-gray-300", lineNum: 33, delay: 160 },
        { text: "      description:", color: "text-gray-300", lineNum: 34, delay: 165 },
        { text: "        \"Interactive web apps and SaaS platforms built\"", color: "text-blue-300", lineNum: 35, delay: 170 },
        { text: "        + \" with React, Next.js, Node.js, and integrated\"", color: "text-blue-300", lineNum: 36, delay: 175 },
        { text: "        + \" AI tools (OpenAI, Serverless).\"", color: "text-blue-300", lineNum: 37, delay: 180 },
        { text: "    },", color: "text-gray-400", lineNum: 38, delay: 185 },
        { text: "", color: "", lineNum: 39, delay: 190 },
        { text: "    {", color: "text-gray-400", lineNum: 40, delay: 195 },
        { text: "      title: \"🧠 AI & Automation\",", color: "text-gray-300", lineNum: 41, delay: 200 },
        { text: "      description:", color: "text-gray-300", lineNum: 42, delay: 205 },
        { text: "        \"Smart systems using OpenAI, automation scripts,\"", color: "text-blue-300", lineNum: 43, delay: 210 },
        { text: "        + \" and prompt-based tools to streamline workflows\"", color: "text-blue-300", lineNum: 44, delay: 215 },
        { text: "        + \" and enhance user experience.\"", color: "text-blue-300", lineNum: 45, delay: 220 },
        { text: "    }", color: "text-gray-400", lineNum: 46, delay: 225 },
        { text: "  ];", color: "text-purple-400", lineNum: 47, delay: 230 },
        { text: "", color: "", lineNum: 48, delay: 235 },
        { text: "  return (", color: "text-purple-400", lineNum: 49, delay: 240 },
        { text: "    <Portfolio", color: "text-gray-300", lineNum: 50, delay: 245 },
        { text: "      greeting={greeting}", color: "text-gray-300", lineNum: 51, delay: 250 },
        { text: "      intro={intro}", color: "text-gray-300", lineNum: 52, delay: 255 },
        { text: "      domains={domains}", color: "text-gray-300", lineNum: 53, delay: 260 },
        { text: "    />", color: "text-gray-300", lineNum: 54, delay: 265 },
        { text: "  );", color: "text-purple-400", lineNum: 55, delay: 270 },
        { text: "};", color: "text-purple-400", lineNum: 56, delay: 275 },
    ];

    useEffect(() => {
        if (currentLine < codeLines.length) {
            const timer = setTimeout(() => {
                setTypedContent(prev => [...prev, codeLines[currentLine].text]);
                setCurrentLine(prev => prev + 1);
            }, codeLines[currentLine].delay);
            return () => clearTimeout(timer);
        }
    }, [currentLine]);

    return (
        <div className="bg-[#1e1e1e] rounded-lg border border-[#2d2d30] font-mono text-xs sm:text-sm h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#1e1e1e] [&::-webkit-scrollbar-thumb]:bg-blue-500 [&::-webkit-scrollbar-thumb]:rounded">
                {/* Line Numbers */}
                <div className="bg-[#1e1e1e] text-gray-600 text-xs text-right pr-2 pl-2 py-2 select-none border-r border-[#2d2d30] min-h-full">
                    {codeLines.map((line, index) => (
                        <div key={index} className="min-h-[18px] sm:min-h-[20px] leading-relaxed">
                            {index < typedContent.length && line.lineNum}
                        </div>
                    ))}
                </div>

                {/* Code Content */}
                <div className="flex-1 py-2 pl-2 pr-2">
                    {codeLines.map((line, index) => (
                        <div key={index} className="min-h-[18px] sm:min-h-[20px] leading-relaxed whitespace-pre-wrap break-words">
                            {index < typedContent.length && (
                                <div className={`${line.color} flex items-center`}>
                                    <TypewriterLine
                                        text={line.text}
                                        speed={line.text.length > 60 ? 1 : 2}
                                    />
                                    {/* Cursor only on current active line */}
                                    {index === currentLine && (
                                        <div className="inline-block w-1.5 h-4 bg-blue-500 animate-pulse ml-1" />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CodeStage() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full mx-auto px-1 sm:px-1"
        >
            <div className="bg-[#1e1e1e] mx-0 border border-blue-500/20 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl">
                {/* IDE Header */}
                <div className="bg-[#323233] px-1 sm:px-1 py-1 border-b border-[#2d2d30] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-gray-400 font-mono text-[10px] sm:text-xs">
                        Visual Studio Code
                    </div>
                    <div className="w-8 sm:w-16" />
                </div>

                {/* File Tabs */}
                <div className="bg-[#252526] border-b border-[#2d2d30] flex items-center overflow-x-auto">
                    <div className="bg-[#1e1e1e] px-3 sm:px-4 py-1 border-r border-[#2d2d30] flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-mono whitespace-nowrap">
                        <FileCode size={14} className="text-blue-400 flex-shrink-0" />
                        <span>about_me.tsx</span>
                    </div>
                    <div className="px-3 sm:px-4 py-1 flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-mono whitespace-nowrap opacity-60">
                        <FileCode size={14} className="text-gray-500 flex-shrink-0" />
                        <span>portfolio.tsx</span>
                    </div>
                </div>

                <div className="p-2 sm:p-2 md:p-1">
                    {/* IDE Code Editor - Full Width */}
                    <IDECodeEditor />
                </div>
            </div>
        </motion.div>
    );
}
