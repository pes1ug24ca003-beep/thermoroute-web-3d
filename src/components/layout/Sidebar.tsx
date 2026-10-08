import { Activity, BrainCircuit, Map, ShieldCheck, SunMedium } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

const navItems = [
  { label: 'Overview', icon: Activity, key: 'overview' },
  { label: 'Navigation', icon: Map, key: 'navigation' },
  { label: 'Environment', icon: SunMedium, key: 'environment' },
  { label: 'AI Insights', icon: BrainCircuit, key: 'ai' },
  { label: 'Safety', icon: ShieldCheck, key: 'safety' }
];

export function Sidebar() {
  const activeSidebar = useAppStore((state) => state.activeSidebar);
  const setActiveSidebar = useAppStore((state) => state.setActiveSidebar);

  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-950/90 p-4 backdrop-blur-sm">
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-lg font-bold text-white shadow-glow">
          T
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-slate-400">Climate</div>
          <div className="text-lg font-semibold text-white">ThermoRoute</div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ label, icon: Icon, key }) => {
          const isActive = activeSidebar === key;

          return (
            <button
              key={key}
              onClick={() => setActiveSidebar(key)}
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${
                isActive
                  ? 'border border-amber-500/40 bg-amber-500/10 text-amber-100'
                  : 'border border-transparent bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
