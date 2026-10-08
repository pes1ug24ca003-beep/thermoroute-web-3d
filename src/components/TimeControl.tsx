import { useState, useEffect } from 'react';
import { Sun, Cloud } from 'lucide-react';

interface TimeControlProps {
  timeOfDay: number;
  onChange: (time: number) => void;
}

export function TimeControl({ timeOfDay, onChange }: TimeControlProps) {
  const hours = Math.floor(timeOfDay);
  const minutes = Math.round((timeOfDay % 1) * 60);

  const getTimeLabel = () => {
    if (timeOfDay < 9) return 'Early Morning';
    if (timeOfDay < 12) return 'Morning';
    if (timeOfDay < 15) return 'Afternoon';
    if (timeOfDay < 18) return 'Late Afternoon';
    return 'Evening';
  };

  const getWeatherIcon = () => {
    if (timeOfDay < 9 || timeOfDay > 17) return <Cloud className="h-4 w-4" />;
    return <Sun className="h-4 w-4" />;
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          {getWeatherIcon()}
          <span className="text-xs uppercase tracking-[0.1em]">Time of Day</span>
        </div>
        <div className="text-sm font-semibold text-white">
          {hours}:{String(minutes).padStart(2, '0')}
        </div>
      </div>

      <input
        type="range"
        min="8"
        max="18"
        step="0.5"
        value={timeOfDay}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mb-3 w-full"
      />

      <div className="text-xs text-slate-400">{getTimeLabel()}</div>
    </div>
  );
}
