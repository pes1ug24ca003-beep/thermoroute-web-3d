import { Sun, Map, Cpu, ShieldCheck } from 'lucide-react';
import { useAppStore } from './store/appStore';
import { useOptimizeRoute } from './hooks/useOptimizeRoute';
import { MainLayout } from './components/layout/MainLayout';
import { CityScene } from './components/3d/CityScene';
import { type RouteRequest } from './types/api';

const defaultRequest: RouteRequest = {
  origin: { latitude: 33.4484, longitude: -112.074 },
  destination: { latitude: 33.485, longitude: -111.87 },
  mode: 'walking',
  time_of_day: 12.5,
  avoid_heat: true
};

function App() {
  const { routeData, selectedRoute, setRouteData, setSelectedRoute } = useAppStore();
  const { optimizeRoute, isLoading, error, resetError } = useOptimizeRoute();

  const handleOptimize = async () => {
    resetError();
    const response = await optimizeRoute(defaultRequest);

    if (response) {
      setRouteData(response);
      setSelectedRoute('best');
    }
  };

  const thermalScore = routeData?.recommendation?.best_journey?.thermal_exposure ?? 0;
  const thermalLevel = routeData?.recommendation?.best_journey?.thermal_level ?? 'LOW';

  return (
    <MainLayout>
      <div className="flex h-full w-full flex-col gap-4 p-4">
        {/* Top Cards */}
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { label: 'Route Health', value: thermalLevel, icon: ShieldCheck },
            { label: 'Thermal Exposure', value: `${thermalScore.toFixed(1)} / 100`, icon: Sun },
            { label: 'City Context', value: 'Bengaluru', icon: Map },
            { label: 'AI Forecast', value: 'Stable', icon: Cpu }
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 shadow-glow">
              <div className="mb-2 flex items-center justify-between text-slate-400">
                <span className="text-xs uppercase tracking-[0.2em]">{label}</span>
                <Icon className="h-3 w-3 text-amber-400" />
              </div>
              <div className="text-lg font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>

        {/* Main 3D Scene + Panel */}
        <div className="grid flex-1 gap-4 overflow-hidden xl:grid-cols-[1fr_320px]">
          {/* 3D Canvas */}
          <div className="relative flex-1 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
            <CityScene routeData={routeData} />
            
            {/* Optimize Button Overlay */}
            <div className="absolute top-4 left-4 z-10">
              <button
                onClick={handleOptimize}
                className="rounded-lg border border-amber-500/50 bg-amber-500/15 px-3 py-2 text-xs font-medium text-amber-200 transition hover:bg-amber-500/25"
              >
                {isLoading ? 'Optimizing...' : 'Find Safe Route'}
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-4 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div>
              <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">AI Insight</div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-amber-300">Recommendation</div>
                <p className="text-xs text-slate-300">
                  {routeData?.recommendation?.best_journey?.thermal_explanation ??
                    'Run optimization to get thermal guidance.'}
                </p>
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Route Summary</div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 space-y-2 text-xs text-slate-300">
                <div>Time: {routeData?.recommendation?.best_journey?.travel_time_min ?? '--'} min</div>
                <div>Distance: {routeData?.recommendation?.best_journey?.distance_km ?? '--'} km</div>
                <div>Exposure: {thermalScore.toFixed(1)}/100</div>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
