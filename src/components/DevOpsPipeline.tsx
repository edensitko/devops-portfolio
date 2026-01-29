'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Import Stages
import CodeStage from './stages/CodeStage';
import BuildStage from './stages/BuildStage';
import TestStage from './stages/TestStage';
import ReleaseStage from './stages/ReleaseStage';
import DeployStage from './stages/DeployStage';
import OperateStage from './stages/OperateStage';
import MonitorStage from './stages/MonitorStage';
import PlanStage from './stages/PlanStage';

type Stage = 'plan' | 'code' | 'build' | 'test' | 'release' | 'deploy' | 'operate' | 'monitor';

const stages: Stage[] = ['plan', 'code', 'build', 'test', 'release', 'deploy', 'operate', 'monitor'];

const stageColors: Record<Stage, string> = {
  plan: '#292524',    // Stone 800
  code: '#172554',    // Blue 950
  build: '#422006',   // Yellow/Orange 950 (Brownish)
  test: '#064e3b',    // Emerald 900
  release: '#4c1d95', // Violet 900
  deploy: '#312e81',  // Indigo 900
  operate: '#134e4a', // Teal 900
  monitor: '#111827', // Gray 900
};

const stageDisplayNames: Record<Stage, string> = {
  plan: 'Plan',
  code: 'Code',
  build: 'Build',
  test: 'Test',
  release: 'Release', // Renamed from Release
  deploy: 'Deploy',
  operate: 'Operate',
  monitor: 'Monitor',
};

export default function DevOpsPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState<Stage>('plan');
  const [buildProgress, setBuildProgress] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // Auto-complete initial animation for non-build stages or manual navigation
  useEffect(() => {
    // Reset animation state when stage changes
    setIsAnimationComplete(false);

    // For build stage, we wait for the progress. For others, allow navigation after a short delay
    if (currentStage !== 'build') {
      const timer = setTimeout(() => {
        setIsAnimationComplete(true);
      }, 500); // Short delay for transition
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  // Build simulator effect triggers when we hit the build stage
  useEffect(() => {
    if (currentStage === 'build') {
      setBuildProgress(0); // Reset on entry
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1; // 1% increment per tick
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          // Allow navigation after build completes
          setIsAnimationComplete(true);
        }
        setBuildProgress(progress);
      }, 50); // 50ms interval × 100 ticks = 5000ms (5 seconds)
      return () => clearInterval(interval);
    }
  }, [currentStage]);

  const goToStage = (stage: Stage) => {
    setCurrentStage(stage);
  };

  const nextStage = () => {
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1]);
    }
  };

  const prevStage = () => {
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex > 0) {
      setCurrentStage(stages[currentIndex - 1]);
    }
  };

  const progressPercentage = ((stages.indexOf(currentStage)) / (stages.length - 1)) * 100;

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Viewport Container - Dynamic Background Color */}
      <div
        className="h-screen w-screen overflow-hidden text-[#c9d1d9] font-sans selection:bg-white/30 flex flex-col items-center justify-center transition-colors duration-1000 ease-in-out"
        style={{ backgroundColor: stageColors[currentStage] }}
      >

        {/* Main Content Area */}
        <div className="z-10 w-full h-[90vh]  px-3 md:px-6 lg:px-24 xl:px-32 max-w-[1400px]  relative">
          <AnimatePresence mode="wait">
            {currentStage === 'plan' && (
              <PlanStage key="plan" />
            )}
            {currentStage === 'code' && (
              <CodeStage key="code" />
            )}
            {currentStage === 'build' && (
              <BuildStage key="build" progress={buildProgress} />
            )}
            {currentStage === 'test' && (
              <TestStage key="test" />
            )}
            {currentStage === 'release' && (
              <ReleaseStage key="release" />
            )}
            {currentStage === 'deploy' && (
              <DeployStage key="deploy" />
            )}
            {currentStage === 'operate' && (
              <OperateStage key="operate" />
            )}
            {currentStage === 'monitor' && (
              <MonitorStage key="monitor" />
            )}
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="absolute right-0 bottom-0 h-1 bg-white/10 w-full">
          <motion.div
            className="h-full bg-white/30"
            animate={{ width: `${progressPercentage}%` }}
            initial={false}
            transition={{ duration: 0.5 }}
          />
        </div>


        {/* Vertical Stage Navigation - Right Side */}
        <div className="fixed left-1 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={() => goToStage(stage)}
              className={`
                relative group
                transition-all duration-300
                flex justify-end
                ${currentStage === stage
                  ? 'w-16'
                  : 'w-10 hover:w-20'
                }
              `}
            >
              {/* Background bar */}
              <div className={`
                h-10 rounded-full w-full
                backdrop-blur-xs
                transition-all duration-300
                ${currentStage === stage
                  ? 'bg-white/15 border-2 border-white/10 shadow-xs shadow-white/10'
                  : 'bg-white/0 border border-white/10 hover:bg-white/10 hover:border-white/20'
                }
              `}>
                {/* Glass shine effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                {/* Stage label */}
                <div className={`
                  absolute inset-0 flex items-center justify-center
                  font-mono font-bold uppercase tracking-wider
                  text-[10px]
                  transition-all duration-300
                  ${currentStage === stage
                    ? 'text-white opacity-100'
                    : 'text-white/50 group-hover:text-white/80 opacity-0 group-hover:opacity-100'
                  }
                `}>
                  {stageDisplayNames[stage]}
                </div>

                {/* Active indicator dot */}
                {currentStage === stage && (
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50 animate-pulse" />
                )}
              </div>

              {/* Tooltip on hover for inactive stages */}
              {currentStage !== stage && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap shadow-lg">
                    {stageDisplayNames[stage]}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Up/Down Arrow Navigation - Right Side */}
        <div className="fixed right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          {/* Up Arrow */}
          <button
            onClick={prevStage}
            disabled={stages.indexOf(currentStage) === 0 || !isAnimationComplete}
            className={`
              h-24 w-8 flex items-center justify-center
              transition-all duration-300 group
              ${stages.indexOf(currentStage) === 0 || !isAnimationComplete
                ? 'cursor-not-allowed opacity-30'
                : 'hover:opacity-100 opacity-60'
              }
            `}
          >
            <ChevronUp
              className={`w-6 h-6 transition-all ${stages.indexOf(currentStage) === 0 || !isAnimationComplete
                ? 'text-gray-600'
                : 'text-white group-hover:scale-125'
                }`}
              strokeWidth={3}
            />
          </button>

          {/* Down Arrow */}
          <button
            onClick={nextStage}
            disabled={stages.indexOf(currentStage) === stages.length - 1 || !isAnimationComplete}
            className={`
              h-24 w-8 flex items-center justify-center
              transition-all duration-300 group
              ${stages.indexOf(currentStage) === stages.length - 1 || !isAnimationComplete
                ? 'cursor-not-allowed opacity-30'
                : 'hover:opacity-100 opacity-60'
              }
            `}
          >
            <ChevronDown
              className={`w-6 h-6 transition-all ${stages.indexOf(currentStage) === stages.length - 1 || !isAnimationComplete
                ? 'text-gray-600'
                : 'text-white group-hover:scale-125'
                }`}
              strokeWidth={3}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
