import { create } from 'zustand';
import { type OptimizeResponse, type RouteRequest } from '../types/api';

interface AppState {
  // Location state
  originLocation: { name: string; coordinates: { latitude: number; longitude: number } } | null;
  destinationLocation: { name: string; coordinates: { latitude: number; longitude: number } } | null;
  
  // Route state
  routeData: OptimizeResponse | null;
  selectedRoute: 'best' | 'option1' | 'option2' | null;
  selectedSegment: number | null;
  
  // UI state
  activeSidebar: string;
  cameraMode: 'orbit' | 'fly-through' | 'focus-route';
  timeOfDay: number; // 8-18 hours
  showHeatLayer: boolean;
  showBuildings: boolean;
  showSegmentMarkers: boolean;
  isPanelOpen: boolean;
  isLoadingRoute: boolean;
  errorMessage: string | null;
  
  // What-if state
  whatIfMode: boolean;
  whatIfParams: {
    departureTime: number;
    walkingSpeed: number; // km/h
    maxExtraTime: number; // minutes
    thermalBudget: number; // 0-100
  };
  
  // Actions
  setOriginLocation: (location: { name: string; coordinates: { latitude: number; longitude: number } } | null) => void;
  setDestinationLocation: (location: { name: string; coordinates: { latitude: number; longitude: number } } | null) => void;
  setRouteData: (data: OptimizeResponse | null) => void;
  setSelectedRoute: (route: 'best' | 'option1' | 'option2' | null) => void;
  setSelectedSegment: (segment: number | null) => void;
  setActiveSidebar: (item: string) => void;
  setCameraMode: (mode: AppState['cameraMode']) => void;
  setTimeOfDay: (time: number) => void;
  setShowHeatLayer: (show: boolean) => void;
  setShowBuildings: (show: boolean) => void;
  setShowSegmentMarkers: (show: boolean) => void;
  setLoadingRoute: (loading: boolean) => void;
  setErrorMessage: (message: string | null) => void;
  setWhatIfMode: (mode: boolean) => void;
  setWhatIfParams: (params: Partial<AppState['whatIfParams']>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  originLocation: null,
  destinationLocation: null,
  routeData: null,
  selectedRoute: null,
  selectedSegment: null,
  activeSidebar: 'overview',
  cameraMode: 'orbit',
  timeOfDay: 12,
  showHeatLayer: true,
  showBuildings: true,
  showSegmentMarkers: true,
  isPanelOpen: true,
  isLoadingRoute: false,
  errorMessage: null,
  whatIfMode: false,
  whatIfParams: {
    departureTime: 12,
    walkingSpeed: 1.4,
    maxExtraTime: 10,
    thermalBudget: 50
  },
  setOriginLocation: (location) => set({ originLocation: location }),
  setDestinationLocation: (location) => set({ destinationLocation: location }),
  setRouteData: (data) => set({ routeData: data }),
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  setSelectedSegment: (segment) => set({ selectedSegment: segment }),
  setActiveSidebar: (item) => set({ activeSidebar: item }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  setTimeOfDay: (time) => set({ timeOfDay: time }),
  setShowHeatLayer: (show) => set({ showHeatLayer: show }),
  setShowBuildings: (show) => set({ showBuildings: show }),
  setShowSegmentMarkers: (show) => set({ showSegmentMarkers: show }),
  setLoadingRoute: (loading) => set({ isLoadingRoute: loading }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  setWhatIfMode: (mode) => set({ whatIfMode: mode }),
  setWhatIfParams: (params) => set((state) => ({ whatIfParams: { ...state.whatIfParams, ...params } }))
}));
