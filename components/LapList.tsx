import React from 'react';
import { formatTimeFull } from '../utils/timeUtils';
import { Flag } from 'lucide-react';

interface LapListProps {
  laps: number[];
}

const LapList: React.FC<LapListProps> = ({ laps }) => {
  if (laps.length === 0) return null;

  // We want to display the most recent lap at the top
  const reversedLaps = [...laps].reverse();

  // Find fastest and slowest laps for highlighting
  const minLap = Math.min(...laps);
  const maxLap = Math.max(...laps);

  return (
    <div className="w-full max-w-md mt-8 overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
        <h3 className="flex items-center text-sm font-semibold text-slate-400">
          <Flag className="w-4 h-4 mr-2" />
          Laps
        </h3>
        <span className="text-xs text-slate-500">{laps.length} Total</span>
      </div>
      
      <div className="max-h-64 overflow-y-auto scrollbar-hide">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-800/50">
              <th className="px-6 py-2 font-medium">Lap #</th>
              <th className="px-6 py-2 font-medium text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {reversedLaps.map((lapTime, index) => {
              const actualIndex = laps.length - index;
              const isFastest = laps.length > 1 && lapTime === minLap;
              const isSlowest = laps.length > 1 && lapTime === maxLap;

              let rowClass = "border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors";
              let timeClass = "font-mono font-medium";
              
              if (isFastest) timeClass += " text-green-400";
              else if (isSlowest) timeClass += " text-red-400";
              else timeClass += " text-slate-300";

              return (
                <tr key={actualIndex} className={rowClass}>
                  <td className="px-6 py-3 text-sm text-slate-500">
                    {actualIndex.toString().padStart(2, '0')}
                  </td>
                  <td className={`px-6 py-3 text-right ${timeClass}`}>
                    {formatTimeFull(lapTime)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LapList;