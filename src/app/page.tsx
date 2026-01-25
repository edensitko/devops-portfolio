'use client';

import { useState } from 'react';
import DevOpsPipeline from "@/components/DevOpsPipeline";
import WelcomeStage from "@/components/stages/WelcomeStage";
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showPipeline, setShowPipeline] = useState(false);

  const handleStart = () => {
    setShowPipeline(true);
  };

  return (
    <main className="bg-[#0d1117]">
      <AnimatePresence mode="wait">
        {!showPipeline ? (
          <motion.div
            key="welcome"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeStage onStart={handleStart} />
          </motion.div>
        ) : (
          <motion.div
            key="pipeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DevOpsPipeline />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
