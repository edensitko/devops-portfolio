import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowDown } from 'lucide-react';
import Image from 'next/image';

export default function StartStage({ onStart }: { onStart?: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center space-y-12"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                className="relative w-64 h-32 md:w-96 md:h-48"
            >
                <Image
                    src="/devops.png"
                    alt="DevOps Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                    priority
                />
            </motion.div>

            <div className="space-y-6">

                <p className="text-gray-300 font-mono text-base md:text-lg max-w-2xl mx-auto tracking-wide leading-relaxed">
                    Hi, I’m <span className="text-blue-400 font-bold">Eden Sitkovetsky</span> – a passionate Full-Stack Developer & DevOps enthusiast.
                    <br />
                    <span className="text-sm opacity-80 mt-2 block">
                        Specializing in Web, Mobile, and Cloud Infrastructure.
                    </span>
                </p>

            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex flex-col items-center gap-2 text-white font-mono text-sm font-bold"
            >
                <span>SCROLL TO BEGIN</span>
                <ArrowDown className="text-white" />
            </motion.div>
        </motion.div>
    );
}
