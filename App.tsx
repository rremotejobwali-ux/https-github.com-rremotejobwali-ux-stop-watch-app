import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RefreshCw, Flag, Timer } from 'lucide-react';
import StopwatchDisplay from './components/StopwatchDisplay';
import LapList from './components/LapList';
import Button from './components/Button';

const App: React.FC = () => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  
  // Refs to maintain accurate timing without drift
  const startTimeRef = useRef<number>(0);
  const requestRef = useRef<number>(0);

  const animate = useCallback(() => {
    // Current accumulated time is: (Now - Start Time)
    // We update state to trigger re-render
    setElapsedTime(Date.now() - startTimeRef.current);
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  const start = () => {
    if (!isRunning) {
      // Calculate where the "virtual" start time would be given the currently elapsed time
      // This allows pausing and resuming correctly.
      startTimeRef.current = Date.now() - elapsedTime;
      setIsRunning(true);
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }
  };

  const reset = () => {
    stop();
    setElapsedTime(0);
    setLaps([]);
  };

  const lap = () => {
    // We can only lap if the timer has moved
    if (elapsedTime > 0) {
      // Current lap time is total elapsed time minus sum of previous laps?
      // Standard Stopwatch behavior: Laps usually show "Split" (total time) or "Lap" (interval).
      // Let's store the "Split" time (total elapsed time) for simplicity in display, 
      // but the UI could calculate difference if needed. 
      // For this implementation, we store the *current elapsed time* as a split marker.
      setLaps(prevLaps => [...prevLaps, elapsedTime]);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-10 text-center space-y-2">
        <div className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 mb-4 shadow-lg">
          <Timer className="w-6 h-6 text-blue-500 mr-2" />
          <span className="font-bold text-slate-200 tracking-wide">CHRONOS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
          Precision Stopwatch
        </h1>
        <p className="text-slate-500">Track time with millisecond accuracy</p>
      </div>

      {/* Main Display */}
      <StopwatchDisplay time={elapsedTime} isRunning={isRunning} />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center max-w-lg">
        {!isRunning ? (
          <Button 
            onClick={start} 
            variant="primary" 
            className="w-full sm:w-auto min-w-[140px]"
            icon={<Play className="w-5 h-5 fill-current" />}
          >
            Start
          </Button>
        ) : (
          <Button 
            onClick={stop} 
            variant="danger"
            className="w-full sm:w-auto min-w-[140px]"
            icon={<Pause className="w-5 h-5 fill-current" />}
          >
            Stop
          </Button>
        )}

        <div className="flex gap-4 w-full sm:w-auto">
          <Button 
            onClick={lap} 
            disabled={!isRunning && elapsedTime === 0}
            variant="secondary"
            className="flex-1 sm:flex-initial"
            aria-label="Lap"
          >
            <Flag className="w-5 h-5" />
          </Button>

          <Button 
            onClick={reset}
            disabled={elapsedTime === 0}
            variant="secondary"
            className="flex-1 sm:flex-initial hover:text-red-400 hover:border-red-500/30"
            aria-label="Reset"
          >
            <RefreshCw className={`w-5 h-5 ${elapsedTime === 0 ? '' : 'text-slate-200'}`} />
          </Button>
        </div>
      </div>

      {/* Laps */}
      <LapList laps={laps} />

    </div>
  );
};

export default App;