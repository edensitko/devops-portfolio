import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Cloud, Award, Linkedin, ExternalLink, Mail, ShieldCheck, Terminal, Cpu, GraduationCap, LinkIcon } from 'lucide-react';

const certifications = [
    {
        title: 'Google AI Essentials',
        issuer: 'Google',
        date: 'Jan 2026',
        description: 'Comprehensive AI fundamentals covering generative AI, prompt engineering, and responsible AI practices.',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
        color: "bg-white",
        credentialUrl: "https://www.coursera.org/account/accomplishments/verify/GOOGLE_AI_ESSENTIALS_PLACEHOLDER"
    },
    {
        title: 'DevOps and Software Engineering',
        issuer: 'IBM',
        date: 'Jan 2026',
        description: 'Advanced specialization in DevOps, CI/CD, Microservices, Security Ops, and Agile methodologies.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
        color: "bg-white",
        credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/451XD4JAGCZ7"
    },
    {
        title: 'DevOps, Cloud, and Agile Foundations',
        issuer: 'IBM',
        date: 'Nov 2025',
        description: 'Foundational cloud infrastructure, Scrum, TDD, and software engineering principles.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
        color: "bg-white",
        credentialUrl: "https://www.credly.com/badges/80f9f51d-bd28-428f-af9e-175d41451a38/linked_in_profile"
    }
];

const education = [
    {
        school: 'TRTech',
        degree: 'DevOps Course',
        date: '2023 - 2024',
        description: 'Intensive DevOps training covering Linux, Python, AWS, Docker, Kubernetes, Jenkins, and GitOps.',
        logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQG7D9_8yQyMQA/company-logo_200_200/company-logo_200_200/0/1684661596716?e=2147483647&v=beta&t=TritechLogo',
        fallbackIcon: <Terminal className="w-5 h-5 text-green-400" />,
        color: "bg-green-500/10"
    },
    {
        school: 'John Bryce',
        degree: 'Full Stack Development',
        date: 'Jan 2023 - Aug 2023',
        description: 'Comprehensive 600+ hour bootcamp. Web Development, MERN Stack, and full software lifecycle.',
        logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQGkX0G9s9q8qQ/company-logo_200_200/company-logo_200_200/0/1630565656736?e=2147483647&v=beta&t=JohnBryceLogo',
        fallbackIcon: <GraduationCap className="w-5 h-5 text-red-500" />,
        color: "bg-red-500/10"
    }
];

export default function OperateStage() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto px-4"
        >
            <div className="bg-[#134e4a]/60 backdrop-blur-xl border border-teal-500/30 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[70vh] lg:h-[600px]">

                {/* Header - Fixed */}
                <div className="px-4 sm:px-6 py-4 border-b border-teal-500/20 bg-[#0d1117]/80 backdrop-blur-md z-10 flex-shrink-0">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Certifications & Education</h2>
                            <p className="text-teal-200/70 text-xs sm:text-sm">
                                Professional qualifications and academic background
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-teal-900/30 px-3 py-1.5 rounded-lg border border-teal-500/20">
                            <Award className="text-teal-400 w-4 h-4" />
                            <span className="text-teal-100 font-mono text-xs font-bold">VERIFIED</span>
                        </div>
                    </div>
                </div>

                {/* Content - Scrollable Middle Section */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-6 min-h-0">

                    {/* Certifications Section */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                            <BookOpen className="w-3 h-3" />
                            Official Certifications
                        </h3>
                        <div className="flex flex-col gap-3">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[#0d1117] border border-gray-800 rounded-lg p-3 hover:border-teal-500/30 transition-all hover:bg-[#161b22] group relative"
                                >
                                    <div className="flex gap-3 items-start">
                                        <div className={`p-1.5 w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${cert.color} overflow-hidden`}>
                                            <img src={cert.logo} alt={cert.issuer} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-sm font-bold text-white mb-0.5 group-hover:text-teal-300 transition-colors pr-20">
                                                    {cert.title}
                                                </h4>
                                                <span className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700 whitespace-nowrap ml-2">
                                                    {cert.date}
                                                </span>
                                            </div>
                                            <div className="text-[10px] text-teal-400 font-mono mb-1.5 font-bold">
                                                {cert.issuer}
                                            </div>
                                            <p className="text-[11px] text-gray-400 leading-relaxed mb-2">
                                                {cert.description}
                                            </p>

                                            {/* Credential Button */}
                                            {cert.credentialUrl && (
                                                <a
                                                    href={cert.credentialUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 px-2 py-1 rounded border border-teal-500/20 hover:border-teal-500/40 text-[10px] font-medium transition-all"
                                                >
                                                    <LinkIcon size={10} />
                                                    Show Credential
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education Section */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                            <GraduationCap className="w-3 h-3" />
                            Education
                        </h3>
                        <div className="flex flex-col gap-3">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="bg-[#0d1117] border border-gray-800 rounded-lg p-3 hover:border-teal-500/30 transition-all hover:bg-[#161b22] group"
                                >
                                    <div className="flex gap-3 items-start">
                                        <div className={`p-2 w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${edu.color}`}>
                                            {edu.fallbackIcon}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-sm font-bold text-white mb-0.5 group-hover:text-teal-300 transition-colors">
                                                    {edu.degree}
                                                </h4>
                                                <span className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700 whitespace-nowrap ml-2">
                                                    {edu.date}
                                                </span>
                                            </div>
                                            <div className="text-[10px] text-teal-400 font-mono mb-1.5 font-bold">
                                                {edu.school}
                                            </div>
                                            <p className="text-[11px] text-gray-400 leading-relaxed">
                                                {edu.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer - Connect Section - Fixed at Bottom */}
                <div className="p-4 border-t border-teal-500/10 bg-[#0d1117]/80 backdrop-blur-md flex-shrink-0">
                    <h3 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                        <ExternalLink className="w-3 h-3" />
                        Let's Connect
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <motion.a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-3 bg-[#0a66c2]/10 border border-[#0a66c2]/20 p-2.5 rounded-lg hover:bg-[#0a66c2]/20 hover:border-[#0a66c2]/40 transition-all group"
                        >
                            <div className="bg-[#0a66c2] p-1.5 rounded text-white">
                                <Linkedin className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#0a66c2] transition-colors">
                                    LinkedIn
                                </h4>
                                <p className="text-[10px] text-blue-200/60 truncate hidden sm:block">
                                    Connect professionally
                                </p>
                            </div>
                        </motion.a>

                        <motion.a
                            href="mailto:contact@example.com"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-3 bg-teal-500/10 border border-teal-500/20 p-2.5 rounded-lg hover:bg-teal-500/20 hover:border-teal-500/40 transition-all group"
                        >
                            <div className="bg-teal-600 p-1.5 rounded text-white">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                                    Email Me
                                </h4>
                                <p className="text-[10px] text-teal-200/60 truncate hidden sm:block">
                                    Get in touch
                                </p>
                            </div>
                        </motion.a>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
