import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowUp, Activity, FileText } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function MonitorStage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Rate Limiting Logic
        const RATE_LIMIT = 5;
        const today = new Date().toDateString(); // "Sun Jan 25 2026"
        const storageKey = 'portfolio_contact_limit';

        let usage = { count: 0, date: today };
        const stored = localStorage.getItem(storageKey);

        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Reset if it's a new day
                if (parsed.date === today) {
                    usage = parsed;
                }
            } catch (err) {
                console.error("Error parsing limit usage", err);
            }
        }

        if (usage.count >= RATE_LIMIT) {
            alert(`Daily transmission limit reached (${RATE_LIMIT}/${RATE_LIMIT}). Please try again tomorrow.`);
            return;
        }

        setIsSubmitting(true);

        // Your Credentials
        const SERVICE_ID = 'service_djs7hdo';
        const TEMPLATE_ID = 'template_135jwnh';
        const PUBLIC_KEY = 'Bi_8Y30sRs9mcFLS0';

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: formState.name,
                    from_email: formState.email,
                    message: formState.message,
                },
                PUBLIC_KEY
            );

            // 2. Increment usage on success
            usage.count++;
            localStorage.setItem(storageKey, JSON.stringify(usage));

            setIsSent(true);
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setIsSent(false), 5000);
        } catch (error: any) {
            console.error("Error sending email:", error);
            alert(`Failed to send transmission: ${error.text || "Check console"}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto px-4"
        >
            <div className="bg-[#111827]/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[70vh] lg:h-[600px]">

                {/* Header */}
                <div className="bg-[#0f1115] px-6 py-4 border-b border-gray-700/50 flex items-center justify-between flex-shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">System Monitor & Contact</h2>
                        <p className="text-gray-400 text-xs sm:text-sm">
                            Real-time communication uplink established
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                        <Activity className="text-green-400 w-4 h-4 animate-pulse" />
                        <span className="text-green-400 font-mono text-xs font-bold">ONLINE</span>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    {/* Contact Info Sidebar */}
                    <div className="h-[200px] md:h-auto md:w-1/3 bg-[#161b22]/50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-700/50 overflow-y-auto">
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-200 uppercase tracking-wider text-sm flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-blue-500 rounded-sm"></span>
                                Contact Details
                            </h3>

                            <div className="space-y-4">


                                <a href="mailto:edensit139@gmail.com" className="group flex items-start gap-3 p-3 rounded-lg bg-[#0d1117] border border-gray-800 hover:border-blue-500/30 transition-all hover:bg-blue-500/5">
                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-mono mb-1">EMAIL</p>
                                        <p className="text-sm text-gray-200 font-medium break-all">edensit139@gmail.com</p>
                                    </div>
                                </a>

                                <a href="/Eden Sitkovetsky.pdf" download="Eden Sitkovetsky.pdf" className="group flex items-start gap-3 p-3 rounded-lg bg-[#0d1117] border border-gray-800 hover:border-blue-500/30 transition-all hover:bg-blue-500/5">
                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-mono mb-1">RESUME</p>
                                        <p className="text-sm text-gray-200 font-medium">Download CV</p>
                                    </div>
                                </a>

                                <div className="mt-6 pt-6 border-t border-gray-700/50">
                                    <h4 className="text-xs text-gray-500 font-mono mb-3 uppercase flex items-center gap-2">
                                        <Activity size={12} className="text-green-500" />
                                        System Metrics
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] text-gray-400">
                                            <span>CPU Load</span>
                                            <span className="text-green-400">12%</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-green-500 rounded-full"
                                                initial={{ width: "12%" }}
                                                animate={{ width: ["12%", "18%", "10%", "12%"] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                            />
                                        </div>

                                        <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                                            <span>Memory</span>
                                            <span className="text-blue-400">45%</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full w-[45%]" />
                                        </div>

                                        {/* Abstract Graph Representation */}
                                        <div className="mt-4 flex items-end justify-between h-12 gap-1">
                                            {[30, 45, 35, 60, 40, 55, 30, 40].map((height, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-1.5 bg-green-500/20 rounded-t-sm"
                                                    animate={{
                                                        height: [`${height}%`, `${height + 20}%`, `${height}%`],
                                                        backgroundColor: ["rgba(34, 197, 94, 0.2)", "rgba(34, 197, 94, 0.5)", "rgba(34, 197, 94, 0.2)"]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: i * 0.1,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="hidden md:block">
                            <button
                                onClick={() => window.scrollTo({ top: 0 })}
                                className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors group"
                            >
                                <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
                                Return to pipeline start
                            </button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                        <h3 className="text-lg font-bold text-gray-200 uppercase tracking-wider text-sm flex items-center gap-2 mb-6">
                            <span className="w-1.5 h-4 bg-green-500 rounded-sm"></span>
                            Send Message
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label htmlFor="name" className="text-xs font-mono text-gray-400 ml-1">NAME</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="email" className="text-xs font-mono text-gray-400 ml-1">EMAIL</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="message" className="text-xs font-mono text-gray-400 ml-1">MESSAGE_PAYLOAD</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={6}
                                    value={formState.message}
                                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                                    className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm resize-none"
                                    placeholder="Enter your message transmission here..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isSent}
                                className={`
                                    w-full py-3 rounded-lg font-bold text-sm tracking-wide
                                    flex items-center justify-center gap-2
                                    transition-all duration-300
                                    ${isSent
                                        ? 'bg-green-600 text-white cursor-default'
                                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                                    }
                                    ${isSubmitting ? 'opacity-70 cursor-wait' : ''}
                                `}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Activity className="w-4 h-4 animate-spin" />
                                        TRANSMITTING...
                                    </>
                                ) : isSent ? (
                                    <>
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                        MESSAGE RECEIVED
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        SEND TRANSMISSION
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
