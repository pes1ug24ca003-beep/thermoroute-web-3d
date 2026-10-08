import { Bell, Search, SlidersHorizontal } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-300">
          ThermoRoute 2.0
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 md:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <span>Route / climate / safety</span>
        </div>
        <button className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-200 transition hover:border-slate-700">
          <SlidersHorizontal className="h-4 w-4" />
        </button>
        <button className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-200 transition hover:border-slate-700">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
