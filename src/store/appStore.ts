import { create } from 'zustand';
import { type OptimizeResponse } from '../types/api';

interface AppState {
  activeSidebar: string;
  routeData: OptimizeResponse | null;
  selectedRoute: string;
  selectedSegment: number | null;
  cameraMode: 'orbit' | 'fly-through' | 'focus-route';
  timeOfDay: number;
  showHeatLayer: boolean;
  showBuildings: boolean;
  showTrees: boolean;
  isPanelOpen: boolean;
  isLoadingRoute: boolean;
  errorMessage: string | null;
  setActiveSidebar: (item: string) => void;
  setRouteData: (data: OptimizeResponse) => void;
  setSelectedRoute: (route: string) => void;
  setSelectedSegment: (segment: number | null) => void;
  setCameraMode: (mode: AppState['cameraMode']) => void;
  setTimeOfDay: (time: number) => void;
  setLoadingRoute: (loading: boolean) => void;
  setErrorMessage: (message: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeSidebar: 'overview',
  routeData: null,
  selectedRoute: 'best',
  selectedSegment: null,
  cameraMode: 'orbit',
  timeOfDay: 12.5,
  showHeatLayer: true,
  showBuildings: true,
  showTrees: true,
  isPanelOpen: true,
  isLoadingRoute: false,
  errorMessage: null,
  setActiveSidebar: (item) => set({ activeSidebar: item }),
  setRouteData: (data) => set({ routeData: data }),
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  setSelectedSegment: (segment) => set({ selectedSegment: segment }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  setTimeOfDay: (time) => set({ timeOfDay: time }),
  setLoadingRoute: (loading) => set({ isLoadingRoute: loading }),
  setErrorMessage: (message) => set({ errorMessage: message })
}));
