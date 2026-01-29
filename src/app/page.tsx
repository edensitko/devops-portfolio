'use client';

import { useState, useEffect } from 'react';
import DevOpsPipeline from "@/components/DevOpsPipeline";
import WelcomeStage from "@/components/stages/WelcomeStage";
import FloatingTerminal from "@/components/FloatingTerminal";
import LoadingScreen from "@/components/LoadingScreen";
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showPipeline, setShowPipeline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setShowPipeline(true);
  };

  return (
    <main className="bg-[#0d1117] min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            exit={{ opacity: 0.6 }}
            transition={{ duration: 0.4 }}
          >
            <LoadingScreen />
          </motion.div>
        ) : !showPipeline ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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

      {/* Floating Terminal - Always Available after loading */}
      {!isLoading && <FloatingTerminal />}
    </main>
  );
}
