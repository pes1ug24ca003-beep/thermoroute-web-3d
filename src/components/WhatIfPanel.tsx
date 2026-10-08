import { useState } from 'react';
import { Sliders, Clock, Wind, Zap, TrendingUp } from 'lucide-react';

interface WhatIfPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  departureTime: number;
  onDepartureTimeChange: (time: number) => void;
  walkingSpeed: number;
  onWalkingSpeedChange: (speed: number) => void;
  maxExtraTime: number;
  onMaxExtraTimeChange: (time: number) => void;
  thermalBudget: number;
  onThermalBudgetChange: (budget: number) => void;
  onApply: () => void;
  isLoading: boolean;
}

export function WhatIfPanel({
  isOpen,
  onToggle,
  departureTime,
  onDepartureTimeChange,
  walkingSpeed,
  onWalkingSpeedChange,
  maxExtraTime,
  onMaxExtraTimeChange,
  thermalBudget,
  onThermalBudgetChange,
  onApply,
  isLoading
}: WhatIfPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 backdrop-blur-sm">
      <button
        onClick={onToggle}
        className="mb-4 flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">What If?</h3>
        </div>
        <span className="text-xs text-slate-400">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.1em] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Departure Time
              </span>
              <span className="text-white">{Math.floor(departureTime)}:{String(Math.round((departureTime % 1) * 60)).padStart(2, '0')}</span>
            </label>
            <input
              type="range"
              min="8"
              max="18"
              step="0.5"
              value={departureTime}
              onChange={(e) => onDepartureTimeChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.1em] text-slate-400">
              <span className="flex items-center gap-1">
                <Wind className="h-3 w-3" />
                Walking Speed
              </span>
              <span className="text-white">{walkingSpeed.toFixed(2)} km/h</span>
            </label>
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={walkingSpeed}
              onChange={(e) => onWalkingSpeedChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.1em] text-slate-400">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Max Extra Time
              </span>
              <span className="text-white">{maxExtraTime} min</span>
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={maxExtraTime}
              onChange={(e) => onMaxExtraTimeChange(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.1em] text-slate-400">
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Thermal Budget
              </span>
              <span className="text-white">{thermalBudget}/100</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={thermalBudget}
              onChange={(e) => onThermalBudgetChange(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={onApply}
            disabled={isLoading}
            className="w-full rounded-xl border border-amber-500/50 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-4 py-2 text-xs font-semibold text-amber-200 transition disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-500/30 hover:to-orange-500/30"
          >
            {isLoading ? 'Recalculating...' : 'Recalculate Route'}
          </button>
        </div>
      )}
    </div>
  );
}
