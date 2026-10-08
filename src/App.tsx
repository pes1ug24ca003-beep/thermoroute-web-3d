import { Map, ShieldCheck, Sun, Cpu, Gauge, Route as RouteIcon } from 'lucide-react';
import { MainLayout } from './components/layout/MainLayout';
import { CityScene } from './components/3d/CityScene';
import { RouteInputPanel } from './components/RouteInputPanel';
import { RouteComparisonPanel } from './components/RouteComparisonPanel';
import { SafetyGuidance } from './components/SafetyGuidance';
import { WhatIfPanel } from './components/WhatIfPanel';
import { TimeControl } from './components/TimeControl';
import { useAppStore } from './store/appStore';
import { useOptimizeRoute } from './hooks/useOptimizeRoute';
import { type RouteRequest } from './types/api';
import { THERMOROUTE_BENGALURU, THERMAL_THRESHOLDS } from './utils/constants';

function App() {
  const {
    routeData,
    selectedRoute,
    setRouteData,
    setSelectedRoute,
    originLocation,
    destinationLocation,
    setOriginLocation,
    setDestinationLocation,
    timeOfDay,
    setTimeOfDay,
    whatIfParams,
    setWhatIfParams,
    whatIfMode,
    setWhatIfMode,
    isLoadingRoute,
    errorMessage,
    setErrorMessage
  } = useAppStore();

  const { optimizeRoute, isLoading, error, resetError } = useOptimizeRoute();

  const defaultOrigin = originLocation ?? THERMOROUTE_BENGALURU.defaultOrigin;
  const defaultDestination = destinationLocation ?? THERMOROUTE_BENGALURU.defaultDestination;

  const buildRequest = (
    origin = defaultOrigin.coordinates,
    destination = defaultDestination.coordinates,
    departure = timeOfDay
  ): RouteRequest => ({
    origin,
    destination,
    mode: 'walking',
    time_of_day: departure,
    avoid_heat: true
  });

  const handleOptimize = async (
    nextOrigin = defaultOrigin.coordinates,
    nextDestination = defaultDestination.coordinates,
    departureTime = timeOfDay
  ) => {
    resetError();
    setErrorMessage(null);

    const request = buildRequest(nextOrigin, nextDestination, departureTime);
    const response = await optimizeRoute(request);

    if (response) {
      setRouteData(response);
      setSelectedRoute('best');
    }
  };

  const thermalScore = routeData?.recommendation?.best_journey?.thermal_exposure ?? 0;
  const thermalLevel = routeData?.recommendation?.best_journey?.thermal_level ?? 'LOW';
  const thermalThreshold = THERMAL_THRESHOLDS[thermalLevel as keyof typeof THERMAL_THRESHOLDS] ?? THERMAL_THRESHOLDS.LOW;
  const routeSummary = routeData?.recommendation?.best_journey;
  const resultExplanation = routeSummary?.thermal_explanation ?? 'Run optimization to get thermal guidance.';

  const routeCards = [
    { label: 'Route Health', value: thermalLevel, icon: ShieldCheck },
    { label: 'Thermal Exposure', value: `${thermalScore.toFixed(1)} / 100`, icon: Sun },
    { label: 'City Context', value: THERMOROUTE_BENGALURU.city, icon: Map },
    { label: 'AI Forecast', value: 'Stable', icon: Cpu }
  ];

  return (
    <MainLayout>
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <div className="grid gap-3 md:grid-cols-4">
          {routeCards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 shadow-glow">
              <div className="mb-2 flex items-center justify-between text-slate-400">
                <span className="text-xs uppercase tracking-[0.2em]">{label}</span>
                <Icon className="h-3 w-3 text-amber-400" />
              </div>
              <div className="text-lg font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>

        <div className="grid flex-1 gap-4 overflow-hidden xl:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                <RouteIcon className="h-3 w-3 text-amber-400" />
                Bengaluru Route Planner
              </div>
              <RouteInputPanel
                isLoading={isLoading || isLoadingRoute}
                onSubmit={(origin, destination) => {
                  setOriginLocation({
                    name: defaultOrigin.name,
                    coordinates: origin
                  });
                  setDestinationLocation({
                    name: defaultDestination.name,
                    coordinates: destination
                  });
                  handleOptimize(origin, destination, timeOfDay);
                }}
              />
            </div>

            <div className="relative flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              <CityScene routeData={routeData} />

              <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                <button
                  onClick={() => handleOptimize()}
                  className="rounded-lg border border-amber-500/50 bg-amber-500/15 px-3 py-2 text-xs font-medium text-amber-200 transition hover:bg-amber-500/25"
                >
                  {isLoading ? 'Optimizing...' : 'Find Safe Route'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto">
            <TimeControl
              timeOfDay={timeOfDay}
              onChange={(time) => {
                setTimeOfDay(time);
                setWhatIfParams({ departureTime: time });
              }}
            />

            {routeData && (
              <RouteComparisonPanel
                routeData={routeData}
                selectedRoute={selectedRoute}
                onSelectRoute={(route) => setSelectedRoute(route as 'best' | 'option1' | 'option2')}
              />
            )}

            {routeData && (
              <SafetyGuidance
                thermalLevel={thermalLevel as keyof typeof THERMAL_THRESHOLDS}
                explanation={resultExplanation}
              />
            )}

            <WhatIfPanel
              isOpen={whatIfMode}
              onToggle={() => setWhatIfMode(!whatIfMode)}
              departureTime={whatIfParams.departureTime}
              onDepartureTimeChange={(time) => setWhatIfParams({ departureTime: time })}
              walkingSpeed={whatIfParams.walkingSpeed}
              onWalkingSpeedChange={(speed) => setWhatIfParams({ walkingSpeed: speed })}
              maxExtraTime={whatIfParams.maxExtraTime}
              onMaxExtraTimeChange={(minutes) => setWhatIfParams({ maxExtraTime: minutes })}
              thermalBudget={whatIfParams.thermalBudget}
              onThermalBudgetChange={(budget) => setWhatIfParams({ thermalBudget: budget })}
              onApply={() => handleOptimize(defaultOrigin.coordinates, defaultDestination.coordinates, whatIfParams.departureTime)}
              isLoading={isLoading || isLoadingRoute}
            />

            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                <Gauge className="h-3 w-3 text-amber-400" />
                Route Summary
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Time</span>
                  <span>{routeSummary?.travel_time_min ?? '--'} min</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance</span>
                  <span>{routeSummary?.distance_km ? `${routeSummary.distance_km.toFixed(1)} km` : '--'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Exposure</span>
                  <span>{thermalScore.toFixed(1)}/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk</span>
                  <span className="font-semibold" style={{ color: thermalThreshold.color }}>{thermalLevel}</span>
                </div>
              </div>
            </div>

            {(error || errorMessage) && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
                {error ?? errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
