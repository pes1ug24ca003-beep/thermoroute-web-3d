import { THERMAL_THRESHOLDS } from '../utils/constants';
import { type Journey } from '../types/api';
import { Zap, Clock, Map as MapIcon, TrendingUp } from 'lucide-react';

interface RouteOptionCardProps {
  route: Journey;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function RouteOptionCard({ route, label, isSelected, onSelect }: RouteOptionCardProps) {
  const thermal = THERMAL_THRESHOLDS[route.thermal_level];
  const riskColor = thermal.color;

  return (
    <button
      onClick={onSelect}
      className={`w-full rounded-xl border-2 p-4 text-left transition ${
        isSelected
          ? `border-amber-500 bg-amber-500/10`
          : `border-slate-700 bg-slate-900/50 hover:border-slate-600`
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: riskColor }}
          />
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white">{label}</span>
        </div>
        <span className="text-xs text-slate-400">{thermal.label}</span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-blue-400" />
          <span>{route.travel_time_min.toFixed(0)} min</span>
        </div>
        <div className="flex items-center gap-1">
          <MapIcon className="h-3 w-3 text-green-400" />
          <span>{route.distance_km.toFixed(1)} km</span>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="h-3 w-3 text-amber-400" />
          <span>{route.thermal_exposure.toFixed(0)}</span>
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-400">
        {route.thermal_explanation?.substring(0, 80)}...
      </div>
    </button>
  );
}

interface RouteComparisonPanelProps {
  routeData: any;
  selectedRoute: string | null;
  onSelectRoute: (route: string) => void;
}

export function RouteComparisonPanel({ routeData, selectedRoute, onSelectRoute }: RouteComparisonPanelProps) {
  if (!routeData) return null;

  const { best_journey, options } = routeData.recommendation;

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-semibold text-white">Route Options</h3>
      </div>

      <div className="space-y-3">
        <RouteOptionCard
          route={best_journey}
          label="Recommended"
          isSelected={selectedRoute === 'best'}
          onSelect={() => onSelectRoute('best')}
        />

        {options && options.length > 0 && options.slice(0, 2).map((route, idx) => (
          <RouteOptionCard
            key={idx}
            route={route}
            label={idx === 0 ? 'Alternative' : 'Alternative 2'}
            isSelected={selectedRoute === `option${idx + 1}`}
            onSelect={() => onSelectRoute(`option${idx + 1}`)}
          />
        ))}
      </div>
    </div>
  );
}
