import React from 'react';
import { formatTimeParts } from '../utils/timeUtils';

interface StopwatchDisplayProps {
  time: number;
  isRunning: boolean;
}

const StopwatchDisplay: React.FC<StopwatchDisplayProps> = ({ time, isRunning }) => {
  const { minutes, seconds, centiseconds } = formatTimeParts(time);

  return (
    <div className="relative flex flex-col items-center justify-center p-10 mb-8 rounded-full shadow-2xl bg-slate-900 w-72 h-72 sm:w-80 sm:h-80 ring-1 ring-slate-800/50">
      
      {/* Outer Glow Ring */}
      <div className={`absolute inset-0 rounded-full opacity-20 blur-xl transition-all duration-1000 ${isRunning ? 'bg-blue-500/30' : 'bg-transparent'}`}></div>

      {/* Progress Ring (Purely visual decoration for now) */}
      <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none">
        <circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-slate-800"
        />
        <circle
          cx="50%"
          cy="50%"
          r="46%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="text-slate-800 opacity-50"
        />
      </svg>

      {/* Time Display */}
      <div className="z-10 flex flex-col items-center">
        <div className="flex items-baseline space-x-1 font-mono text-slate-200">
           {/* Minutes */}
           <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-bold tracking-tighter tabular-nums text-shadow-lg">
                {minutes}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">min</span>
           </div>
           
           <span className="text-4xl sm:text-5xl text-slate-600 font-light mb-4">:</span>
           
           {/* Seconds */}
           <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-bold tracking-tighter tabular-nums text-shadow-lg">
                {seconds}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">sec</span>
           </div>
           
           <span className="text-4xl sm:text-5xl text-slate-600 font-light mb-4">.</span>

           {/* Centiseconds */}
           <div className="flex flex-col items-center">
              <span className={`text-4xl sm:text-5xl font-bold tracking-tighter tabular-nums transition-colors duration-300 ${isRunning ? 'text-blue-400' : 'text-slate-400'}`}>
                {centiseconds}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">ms</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StopwatchDisplay;