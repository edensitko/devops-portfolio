import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, ChevronDown, ChevronUp, GraduationCap, Briefcase } from 'lucide-react';

type ExperienceItem = {
    id: string;
    role: string;
    company: string;
    period: string;
    version: string;
    type: 'work' | 'education';
    description: string;
};

const experienceData: ExperienceItem[] = [
    {
        id: 'auraframe',
        role: "DevOps Engineer",
        company: "Auraframe.art",
        period: "Mar 2025 - Present",
        version: "v25.03",
        type: 'work',
        description: "Develop cloud infrastructure with Terraform and Jenkins, deploy apps using Docker and Kubernetes, and automate workflows with Python, Bash, and Ansible. Working with AWS services to build scalable and reliable infrastructure solutions."
    },
    {
        id: 'ramat-gan',
        role: "IT Help Desk",
        company: "Ramat Gan municipality",
        period: "Jan 2025 - Mar 2025",
        version: "v25.01",
        type: 'work',
        description: "Providing support for Windows/Linux systems, network issues, and Microsoft applications. Managing user accounts (Active Directory), remote assistance, system imaging, hardware troubleshooting, and BIOS configuration."
    },
    {
        id: 'election-committee',
        role: "IT Support Coordinator",
        company: "Election Committee",
        period: "Oct 2024 - Jan 2025",
        version: "v24.10",
        type: 'work',
        description: "Provided end-user support including application troubleshooting, system setup (Windows/Linux), image deployment, and network configuration. Assisted users with onboarding and ensured smooth usage of internal systems and software."
    },
    {
        id: 'morevision',
        role: "Website Developer",
        company: "morevision.ai",
        period: "Nov 2023 - Sep 2024",
        version: "v23.11",
        type: 'work',
        description: "Built and maintained websites for company clients using WordPress, HTML, CSS, PHP and JavaScript. Collaborated with the development team to create effective UI/UX designs. Specialized in full-stack web development and optimized sites for performance and SEO."
    }
];

export default function ReleaseStage() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="bg-[#2e1065]/60 backdrop-blur-xl border border-purple-500/30 shadow-2xl rounded-2xl w-full max-w-2xl mx-auto flex flex-col h-[75vh] lg:h-[600px] overflow-hidden"
        >
            <div className="flex-shrink-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-8 border-b border-purple-500/20 bg-[#0d1117]/50 backdrop-blur-md">
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">Professional Journey</h2>
                    <p className="text-purple-200/70 text-xs sm:text-sm max-w-sm">
                        My professional journey as a full-stack developer, devops engineer, IT professional.
                    </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 bg-purple-900/30 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-purple-500/20">
                    <UploadCloud className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-purple-100 font-mono text-xs sm:text-sm font-bold">READY</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-4 p-4 sm:p-8 custom-scrollbar">
                {experienceData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#0d1117] rounded-lg border border-gray-800 hover:border-purple-500/30 transition-colors overflow-hidden"
                    >
                        {/* Clickable Header */}
                        <button
                            onClick={() => toggleExpand(item.id)}
                            className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-4 gap-2 group cursor-pointer"
                        >
                            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                                <div className={`p-1.5 sm:p-2 rounded-lg ${item.type === 'work' ? 'bg-blue-500/10 text-blue-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                    {item.type === 'work' ? <Briefcase size={14} className="sm:w-[18px] sm:h-[18px]" /> : <GraduationCap size={14} className="sm:w-[18px] sm:h-[18px]" />}
                                </div>
                                <div className="flex flex-col flex-1 min-w-0 text-left">
                                    <span className="font-semibold text-xs sm:text-sm md:text-base text-gray-200 break-words">{item.role}</span>
                                    <span className="text-[10px] sm:text-xs text-gray-500">{item.company}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                                <span className="text-gray-500 text-[10px] sm:text-xs font-mono hidden md:inline bg-gray-800/50 px-2 py-1 rounded border border-gray-700">
                                    {item.version}
                                </span>
                                <span className="text-purple-400 font-bold bg-purple-500/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs items-center flex gap-1">
                                    {item.period.split(' - ')[0]}
                                </span>
                                <div className="text-[10px] sm:text-xs text-purple-400 group-hover:text-purple-300 flex items-center gap-0.5 sm:gap-1 transition-all">
                                    {expandedId === item.id ? (
                                        <>
                                            Less <ChevronUp size={12} className="sm:w-3.5 sm:h-3.5" />
                                        </>
                                    ) : (
                                        <>
                                            More <ChevronDown size={12} className="sm:w-3.5 sm:h-3.5" />
                                        </>
                                    )}
                                </div>
                            </div>
                        </button>

                        {/* Expandable Description */}
                        <AnimatePresence>
                            {expandedId === item.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-2 sm:px-4 pb-2 sm:pb-4 pt-0">
                                        <div className="bg-[#161b22] p-3 sm:p-4 rounded-lg border border-gray-800">
                                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs sm:text-sm font-mono">
                                                <span className="bg-purple-500/20 text-purple-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded border border-purple-500/30">
                                                    Release: {item.version}
                                                </span>
                                                <span className="text-gray-400">
                                                    {item.period}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
