'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-[#0d1117] flex items-center justify-center z-50">
            <motion.div
                animate={{
                    scale: [1, 1.8, 1],
                }}
                transition={{
                    duration: 1.0,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative w-40 h-40 md:w-56 md:h-56"
            >
                <Image
                    src="/mylogo1.png"
                    alt="Loading..."
                    fill
                    className="object-contain"
                    priority
                />
            </motion.div>
        </div>
    );
}
