import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    githubUrl: string;
    liveUrl?: string;
    tags: string[];
    stars?: number;
    forks?: number;
};

const projects: Project[] = [
    {
        id: 'devops-capstone',
        title: '🎓 DevOps Capstone Project',
        description: 'Production-ready RESTful microservice for account management with Flask. Features TDD (95%+ coverage), CI/CD via GitHub Actions & Tekton, containerization, and Kubernetes orchestration. Part of IBM DevOps Professional Certificate.',
        image: '/api/placeholder/400/250',
        githubUrl: 'https://github.com/edensitko/devops-capstone-project',
        tags: ['Python', 'Flask', 'PostgreSQL', 'Docker', 'Kubernetes', 'Tekton'],
        stars: 12,
        forks: 5
    },
    {
        id: 'rabbitmq-cluster',
        title: '🐇 RabbitMQ Cluster on AWS',
        description: 'Highly available RabbitMQ cluster automated with Terraform on AWS. implemented using Auto Scaling Groups, Application Load Balancer, and Docker for a robust, scalable messaging infrastructure.',
        image: '/api/placeholder/400/250',
        githubUrl: 'https://github.com/edensitko/terraform-rabbitmq-cluster',
        tags: ['Terraform', 'AWS', 'RabbitMQ', 'Docker', 'ASG'],
        stars: 19,
        forks: 6
    },
    {
        id: 'id-profiles-generator',
        title: '🛠️ ID Profiles Generator',
        description: 'Modern full-stack application for generating ID profiles, built with React (Next.js), Flask, Docker, and Kubernetes (Helm). Supports local development and cloud-native deployment with robust CI/CD pipelines.',
        image: '/api/placeholder/400/250',
        githubUrl: 'https://github.com/edensitko/id-profiles-generator',
        tags: ['React', 'Flask', 'Kubernetes', 'Helm', 'Docker'],
        stars: 24,
        forks: 7
    },
    {
        id: 'workflow-notifier',
        title: '🌐 Workflow Notifier',
        description: 'Multi-channel notification system (Discord, Slack, Telegram) for Terraform operations and CI/CD events. Features template-based alerts, robust error handling, and seamless GitHub Actions integration via repository_dispatch.',
        image: '/api/placeholder/400/250',
        githubUrl: 'https://github.com/edensitko/workflow-notifier',
        tags: ['Shell', 'GitHub Actions', 'Terraform', 'Discord', 'Slack', 'Telegram'],
        stars: 8,
        forks: 2
    },
    {
        id: 'my-portfolio',
        title: '🎨 Personal Portfolio',
        description: 'Modern, responsive personal portfolio website built with Next.js 14 and Tailwind CSS. Features Firebase Hosting deployment, analytics integration, and optimized static export for high performance.',
        image: '/api/placeholder/400/250',
        githubUrl: 'https://github.com/edensitko/myPortfolio',
        liveUrl: 'https://edensitko.com',
        tags: ['Next.js 14', 'Tailwind CSS', 'Firebase', 'React'],
        stars: 15,
        forks: 3
    },

    {
        id: 'skreep',
        title: '🧠 Skreep - AI Solutions',
        description: 'Real-world website and AI chatbot developed for a client using Next.js and Tailwind CSS. Features custom AI implementation, full Hebrew/RTL support, and production deployment on Vercel.',
        image: '/api/placeholder/400/250',
        githubUrl: 'https://github.com/edensitko/skreep',
        liveUrl: 'https://skreep.com',
        tags: ['Next.js', 'Tailwind CSS', 'AI', 'Vercel', 'RTL'],
        stars: 22,
        forks: 5
    }
];

export default function DeployStage() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [deploymentComplete, setDeploymentComplete] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const deploymentSteps = [
        { label: 'Initializing deployment...', duration: 200 },
        { label: 'Building Docker images...', duration: 300 },
        { label: 'Pushing to registry...', duration: 250 },
        { label: 'Deploying to production...', duration: 300 },
        { label: 'Running health checks...', duration: 200 },
        { label: '✓ Deployment successful!', duration: 300 }
    ];

    useEffect(() => {
        if (currentStep < deploymentSteps.length) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, deploymentSteps[currentStep].duration);
            return () => clearTimeout(timer);
        } else {
            // Show projects after deployment completes
            const showProjects = setTimeout(() => {
                setDeploymentComplete(true);
            }, 400);
            return () => clearTimeout(showProjects);
        }
    }, [currentStep]);

    if (!deploymentComplete) {
        // Deployment Timeline Animation
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl mx-auto px-4"
            >
                <div className="bg-[#1e1e1e] border border-indigo-500/20 rounded-xl overflow-hidden shadow-2xl">
                    {/* Header */}
                    <div className="bg-[#161b22] px-4 sm:px-6 py-4 border-b border-indigo-500/20">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                            Deploying Projects
                        </h2>
                        <p className="text-indigo-200/60 text-xs sm:text-sm">
                            Automated deployment pipeline in progress...
                        </p>
                    </div>

                    {/* Deployment Timeline */}
                    <div className="p-6 sm:p-8 bg-black/40 min-h-[400px] flex items-center justify-center">
                        <div className="w-full max-w-md space-y-4">
                            {deploymentSteps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={index <= currentStep ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-center gap-4"
                                >
                                    {/* Step Indicator */}
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${index < currentStep
                                        ? 'bg-green-500 border-green-500'
                                        : index === currentStep
                                            ? 'bg-indigo-500 border-indigo-500 animate-pulse'
                                            : 'bg-gray-800 border-gray-700'
                                        }`}>
                                        {index < currentStep ? (
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : index === currentStep ? (
                                            <div className="w-3 h-3 bg-white rounded-full" />
                                        ) : (
                                            <div className="w-2 h-2 bg-gray-600 rounded-full" />
                                        )}
                                    </div>

                                    {/* Step Label */}
                                    <div className={`flex-1 font-mono text-sm transition-all duration-300 ${index < currentStep
                                        ? 'text-green-400'
                                        : index === currentStep
                                            ? 'text-indigo-300 font-semibold'
                                            : 'text-gray-600'
                                        }`}>
                                        {step.label}
                                    </div>

                                    {/* Loading Spinner for Current Step */}
                                    {index === currentStep && index < deploymentSteps.length - 1 && (
                                        <div className="flex-shrink-0">
                                            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {/* Progress Bar */}
                            <div className="mt-8 pt-6 border-t border-gray-800">
                                <div className="flex justify-between text-xs text-gray-400 mb-2">
                                    <span>Progress</span>
                                    <span>{Math.round((currentStep / deploymentSteps.length) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(currentStep / deploymentSteps.length) * 100}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Projects Dashboard (shown after deployment completes)
    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl mx-auto px-4"
            >
                {/* Container Card */}
                <div className="bg-[#1e1e1e] border border-indigo-500/20 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[70vh] lg:h-[600px]">
                    {/* Header */}
                    <div className="bg-[#161b22] px-4 sm:px-6 py-2 border-b border-indigo-500/20 flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                                    Deployed Projects
                                </h2>
                                <p className="text-indigo-200/60 text-xs sm:text-sm">
                                    Production-ready applications and infrastructure
                                </p>
                            </div>
                            <a
                                href="https://github.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 rounded-lg transition-colors text-sm border border-indigo-500/30"
                            >
                                <Github size={16} />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>

                    {/* Projects Grid - 2 per row */}
                    <div className="p-4 sm:p-6 bg-black/40 flex-1 overflow-y-auto min-h-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layoutId={`project-${project.id}`}
                                    onClick={() => setSelectedProject(project)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="group bg-[#0d1117] border border-gray-800 rounded-lg overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 flex flex-col cursor-pointer"
                                >
                                    {/* Project Info */}
                                    <div className="p-4 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <p className="text-gray-400 text-xs mb-3 line-clamp-3 leading-relaxed flex-1">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {project.tags.slice(0, 4).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] px-1.5 py-0.5 bg-indigo-500/10 text-indigo-300 rounded border border-indigo-500/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 4 && (
                                                <span className="text-[10px] px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded border border-gray-700">
                                                    +{project.tags.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        <div className="text-xs text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            Click to view details →
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-[#161b22] px-4 py-3 border-t border-indigo-500/20 text-center">
                        <a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition-colors text-sm"
                        >
                            <span>View all projects on GitHub</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Project Details Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
                    <motion.div
                        layoutId={`project-${selectedProject.id}`}
                        className="bg-[#161b22] w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl border border-indigo-500/30 shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full text-white transition-colors z-10"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-6 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 pr-8">{selectedProject.title}</h2>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedProject.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-300 rounded-md border border-indigo-500/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="prose prose-invert prose-sm max-w-none mb-8">
                                <p className="text-gray-300 leading-relaxed text-base">
                                    {selectedProject.description}
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <a
                                    href={selectedProject.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium border border-gray-600"
                                >
                                    <Github size={18} />
                                    <span>View Source Code</span>
                                </a>
                                {selectedProject.liveUrl && (
                                    <a
                                        href={selectedProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-900/30"
                                    >
                                        <ExternalLink size={18} />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}
