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
  originLocation: { name: string; coordinates: { latitude: number; longitude: number } } | null;
  destinationLocation: { name: string; coordinates: { latitude: number; longitude: number } } | null;
  whatIfMode: boolean;
  whatIfParams: {
    departureTime: number;
    walkingSpeed: number;
    maxExtraTime: number;
    thermalBudget: number;
  };
  setActiveSidebar: (item: string) => void;
  setRouteData: (data: OptimizeResponse | null) => void;
  setSelectedRoute: (route: string) => void;
  setSelectedSegment: (segment: number | null) => void;
  setCameraMode: (mode: AppState['cameraMode']) => void;
  setTimeOfDay: (time: number) => void;
  setLoadingRoute: (loading: boolean) => void;
  setErrorMessage: (message: string | null) => void;
  setOriginLocation: (location: { name: string; coordinates: { latitude: number; longitude: number } } | null) => void;
  setDestinationLocation: (location: { name: string; coordinates: { latitude: number; longitude: number } } | null) => void;
  setWhatIfMode: (mode: boolean) => void;
  setWhatIfParams: (params: Partial<AppState['whatIfParams']>) => void;
  setShowHeatLayer: (show: boolean) => void;
  setShowBuildings: (show: boolean) => void;
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
  originLocation: {
    name: 'PES University',
    coordinates: { latitude: 12.8354, longitude: 77.6245 }
  },
  destinationLocation: {
    name: 'Cubbon Park',
    coordinates: { latitude: 12.9352, longitude: 77.5948 }
  },
  whatIfMode: false,
  whatIfParams: {
    departureTime: 12,
    walkingSpeed: 1.4,
    maxExtraTime: 10,
    thermalBudget: 50
  },
  setActiveSidebar: (item) => set({ activeSidebar: item }),
  setRouteData: (data) => set({ routeData: data }),
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  setSelectedSegment: (segment) => set({ selectedSegment: segment }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  setTimeOfDay: (time) => set({ timeOfDay: time }),
  setLoadingRoute: (loading) => set({ isLoadingRoute: loading }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  setOriginLocation: (location) => set({ originLocation: location }),
  setDestinationLocation: (location) => set({ destinationLocation: location }),
  setWhatIfMode: (mode) => set({ whatIfMode: mode }),
  setWhatIfParams: (params) => set((state) => ({ whatIfParams: { ...state.whatIfParams, ...params } })),
  setShowHeatLayer: (show) => set({ showHeatLayer: show }),
  setShowBuildings: (show) => set({ showBuildings: show })
}));
