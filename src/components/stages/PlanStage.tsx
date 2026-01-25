import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Link as LinkIcon, ArrowRight, GitBranch, CheckCircle2 } from 'lucide-react';

export default function PlanStage() {
    const roadmap = [
        { id: 'plan', label: 'Plan', desc: 'Blueprint & Strategy' },
        { id: 'code', label: 'Code', desc: 'About Me' },
        { id: 'build', label: 'Build', desc: 'Services Catalog' },
        { id: 'test', label: 'Test', desc: 'Tech Stack & Skills' },
        { id: 'release', label: 'Release', desc: 'Professional Journey' },
        { id: 'deploy', label: 'Deploy', desc: 'Projects Gallery' },
        { id: 'operate', label: 'Operate', desc: 'Certifications' },
        { id: 'monitor', label: 'Monitor', desc: 'Contact & CV' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-[85%] max-w-4xl mx-auto px-4"
        >
            <div className="bg-[#fff1f2] border-4 border-dashed border-gray-400/50 shadow-xl rounded-md overflow-hidden flex flex-col h-[600px] md:h-[600px] transform rotate-1 sticky-note-effect text-gray-800 relative">

                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 bg-repeat opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                {/* Header */}
                <div className="px-4 py-4 border-b-2 border-gray-300 relative z-10 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-marker font-bold text-gray-900 mb-2 flex items-center gap-3">
                            <FileText className="w-8 h-8 text-indigo-600" />
                            Project Blueprint
                        </h2>
                        <p className="text-gray-600 font-handwriting text-md italic">
                            Initial planning and architecture phase
                        </p>
                    </div>
                    <div className="bg-yellow-200 px-4 py-2 transform -rotate-2 shadow-md border border-yellow-300">
                        <span className="font-bold text-yellow-800 font-mono text-xs">STATUS: APPROVED</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Section 1: External Link */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold border-b-2 border-indigo-200 pb-1 inline-block">Freelance & Services</h3>
                            <a
                                href="https://edensitko.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group bg-white border-2 border-gray-200 p-4 rounded-lg hover:border-indigo-500 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-indigo-600 group-hover:underline text-lg">edensitko.com</span>
                                    <LinkIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-500" />
                                </div>
                                <p className="text-sm text-gray-600">
                                    Check out my full professional services, freelance offerings, and detailed portfolio on my main site.
                                </p>
                            </a>
                        </div>

                        {/* Section 2: Pipeline Plan */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold border-b-2 border-indigo-200 pb-1 inline-block">Pipeline Strategy</h3>
                            <div className="bg-white/50 p-4 rounded-lg border border-gray-200">
                                <div className="space-y-3">
                                    {roadmap.map((item, index) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${index === 0 ? 'bg-indigo-600 ring-2 ring-indigo-200' : 'bg-gray-400'}`}>
                                                    {index + 1}
                                                </div>
                                                {index < roadmap.length - 1 && <div className="w-0.5 h-3 bg-gray-300 my-0.5"></div>}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-sm text-gray-800 flex items-center gap-2">
                                                    {item.label}
                                                    {index === 0 && <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">Current</span>}
                                                </div>
                                                <div className="text-xs text-gray-500">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sketch/Diagram Area */}
                    <div className="mt-8 bg-white border-2 border-gray-200 p-4 rounded-lg relative overflow-hidden">
                        <div className="absolute top-2 right-2 text-gray-300">
                            <GitBranch className="w-24 h-24 opacity-20" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Architecture Sketch</h3>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-600">
                            <span className="border border-gray-400 px-2 py-1 rounded bg-gray-50">Next.js App</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <span className="border border-gray-400 px-2 py-1 rounded bg-gray-50">GitHub Action</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <span className="border border-gray-400 px-2 py-1 rounded bg-gray-50">Docker</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <span className="border border-gray-400 px-2 py-1 rounded bg-gray-50">GitHub Pages</span>
                        </div>
                    </div>
                </div>

                {/* Footer Notes */}
                <div className="bg-yellow-50 p-2 border-t border-gray-200 text-xs font-handwriting text-gray-500 flex justify-between items-center">
                    <span>Draft v1.0 - Approved for Development</span>
                    <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        <span>Ready to Code</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
