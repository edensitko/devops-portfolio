import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

type TechItem = {
    name: string;
    icon: string;
};

type TestCategory = {
    id: string;
    name: string;
    status: string;
    time: string;
    items: TechItem[];
};

const skillsData: TestCategory[] = [
    {
        id: 'os',
        name: 'Operating Systems',
        status: 'PASS',
        time: 'Kernel',
        items: [
            { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
            { name: 'Windows', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
            { name: 'macOS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg' }
        ]
    },
    {
        id: 'tools',
        name: 'Software & Tools',
        status: 'PASS',
        time: 'Verified',
        items: [
            { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
            { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { name: 'Xcode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg' },
            { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
            { name: 'Ansible', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg' },
            { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
            { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
            { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            { name: 'VMware', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vmware/vmware-original.svg' },
            { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' },
            { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' }
        ]
    },
    {
        id: 'cloud',
        name: 'Cloud & Database',
        status: 'PASS',
        time: 'Connected',
        items: [
            { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
            { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
            { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
            { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
            { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' }
        ]
    },
    {
        id: 'languages',
        name: 'Programming Languages',
        status: 'PASS',
        time: 'Compiled',
        items: [
            { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
            { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
            { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
            { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
            { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
            { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
            { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' }
        ]
    },
    {
        id: 'frameworks',
        name: 'Frameworks',
        status: 'PASS',
        time: 'Built',
        items: [
            { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
            { name: 'Apache', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg' },
            { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
            { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
            { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
            { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' }
        ]
    },
];

export default function TestStage() {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [testStatuses, setTestStatuses] = useState<Record<string, 'pending' | 'running' | 'completed'>>({});

    useEffect(() => {
        const runTests = async () => {
            // Reset statuses
            const initial: any = {};
            skillsData.forEach(s => initial[s.id] = 'pending');
            setTestStatuses(initial);

            // Run sequentially
            for (const skill of skillsData) {
                setTestStatuses(prev => ({ ...prev, [skill.id]: 'running' }));
                await new Promise(r => setTimeout(r, 600)); // Simulate test duration
                setTestStatuses(prev => ({ ...prev, [skill.id]: 'completed' }));
                await new Promise(r => setTimeout(r, 200)); // Small pause between tests
            }
        };

        runTests();
    }, []);

    const allPassed = Object.values(testStatuses).every(s => s === 'completed');

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="bg-[#052e16]/60 backdrop-blur-xl border border-green-500/30 shadow-2xl rounded-2xl w-full max-w-2xl mx-auto flex flex-col h-[75vh] lg:h-[600px] overflow-hidden"
        >
            <div className="flex-shrink-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-8 border-b border-green-500/20 bg-[#0d1117]/50 backdrop-blur-md">
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">Technical Expertise</h2>
                    <p className="text-green-200/70 text-xs sm:text-sm max-w-sm">
                        A comprehensive overview of my technical skills and proficiency levels.
                    </p>
                </div>
                <div className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border transition-all duration-500 ${allPassed
                    ? 'bg-green-900/30 border-green-500/20'
                    : 'bg-yellow-900/30 border-yellow-500/20'
                    }`}>
                    {allPassed ? (
                        <ShieldCheck className="text-green-400 w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                        <Loader2 className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    )}
                    <span className={`font-mono text-xs sm:text-sm font-bold ${allPassed ? 'text-green-100' : 'text-yellow-100'
                        }`}>
                        {allPassed ? 'PASS' : 'RUNNING...'}
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-4 p-4 sm:p-8 custom-scrollbar">
                {skillsData.map((test, index) => {
                    const status = testStatuses[test.id] || 'pending';
                    const isExpanded = expandedId === test.id;

                    return (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`rounded-lg border transition-all duration-300 overflow-hidden ${status === 'completed'
                                ? 'bg-[#0d1117] border-gray-800 hover:border-green-500/30'
                                : status === 'running'
                                    ? 'bg-[#0d1117] border-yellow-500/30 bg-yellow-500/5'
                                    : 'bg-[#0d1117]/50 border-gray-800/50 opacity-60'
                                }`}
                        >
                            {/* Clickable Header */}
                            <button
                                onClick={() => status === 'completed' && toggleExpand(test.id)}
                                className={`w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-4 gap-2 ${status === 'completed' ? 'cursor-pointer group' : 'cursor-default'}`}
                            >
                                <span className={`font-semibold text-xs sm:text-sm md:text-base break-words w-full sm:w-auto text-left ${status === 'running' ? 'text-yellow-200' : 'text-gray-200'
                                    }`}>
                                    {test.name}
                                </span>

                                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                                    {status === 'running' && (
                                        <span className="text-yellow-400 font-mono text-[10px] sm:text-xs flex items-center gap-1 sm:gap-2">
                                            <span className="animate-pulse">_</span> RUNNING
                                        </span>
                                    )}

                                    {status === 'completed' && (
                                        <>
                                            <span className="text-gray-500 text-[10px] sm:text-xs font-mono hidden md:inline">{test.time}</span>
                                            <span className="text-green-400 font-bold bg-green-500/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs items-center flex gap-1 sm:gap-2">
                                                <CheckCircle size={10} className="sm:w-3 sm:h-3" /> {test.status}
                                            </span>
                                            <div className="text-[10px] sm:text-xs text-blue-400 group-hover:text-blue-300 flex items-center gap-0.5 sm:gap-1 transition-all">
                                                {isExpanded ? (
                                                    <>Less <ChevronUp size={12} className="sm:w-3.5 sm:h-3.5" /></>
                                                ) : (
                                                    <>More <ChevronDown size={12} className="sm:w-3.5 sm:h-3.5" /></>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </button>

                            {/* Expandable Content (Replaced Popup) */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-gray-800"
                                    >
                                        <div className="p-3 sm:p-4 bg-[#161b22]/50">
                                            <h4 className="text-xs text-gray-400 mb-3 font-mono border-b border-gray-800/50 pb-1 inline-block">
                                                {test.name.split(':')[0]} Stack
                                            </h4>

                                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                                {test.items.map((item) => (
                                                    <div key={item.name} className="flex flex-col items-center gap-2 p-2 bg-[#0d1117] rounded-lg border border-gray-800 hover:border-blue-500/30 transition-colors group">
                                                        <div className="w-10 h-10 flex items-center justify-center p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                                            <img
                                                                src={item.icon}
                                                                alt={item.name}
                                                                className="w-full h-full object-contain filter drop-shadow-lg"
                                                            />
                                                        </div>
                                                        <span className="text-[10px] font-medium text-gray-300 text-center leading-tight">{item.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
