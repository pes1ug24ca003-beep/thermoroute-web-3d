import { Zap, AlertCircle, TrendingDown, Shield } from 'lucide-react';
import { type RiskLevel } from '../types/api';
import { HEAT_SAFETY_GUIDANCE } from '../utils/constants';

interface SafetyGuidanceProps {
  thermalLevel: RiskLevel;
  explanation: string;
}

export function SafetyGuidance({ thermalLevel, explanation }: SafetyGuidanceProps) {
  const guidance = HEAT_SAFETY_GUIDANCE[thermalLevel];
  const iconColor = {
    LOW: 'text-green-400',
    MODERATE: 'text-yellow-400',
    HIGH: 'text-orange-400',
    EXTREME: 'text-red-400'
  }[thermalLevel];

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <Shield className={`h-4 w-4 ${iconColor}`} />
        <h3 className="text-sm font-semibold text-white">Safety Guidance</h3>
      </div>

      <div className="mb-4 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-lg">{guidance.icon}</span>
          <span className="text-sm font-semibold text-white">{guidance.title}</span>
        </div>
        <p className="text-xs text-slate-300">{guidance.message}</p>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-[0.1em] text-slate-400">Route Explanation</p>
        <p className="text-xs text-slate-300">{explanation}</p>
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.1em] text-slate-400">Recommendations</p>
        <ul className="space-y-1">
          {guidance.actions.map((action, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
