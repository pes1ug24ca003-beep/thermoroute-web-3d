export const THERMAL_THRESHOLDS = {
  LOW: { min: 0, max: 29.99, color: '#2e9b4b', label: 'Low Risk' },
  MODERATE: { min: 30, max: 49.99, color: '#eab308', label: 'Moderate Risk' },
  HIGH: { min: 50, max: 69.99, color: '#f97316', label: 'High Risk' },
  EXTREME: { min: 70, max: 100, color: '#ef4444', label: 'Extreme Risk' }
} as const;

export const THERMOROUTE_BENGALURU = {
  apiBaseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
  city: 'Bengaluru',
  state: 'Karnataka',
  country: 'India',
  defaultOrigin: {
    name: 'PES University',
    coordinates: { latitude: 12.8354, longitude: 77.6245 }
  },
  defaultDestination: {
    name: 'Cubbon Park',
    coordinates: { latitude: 12.9352, longitude: 77.5948 }
  },
  bounds: {
    north: 13.1,
    south: 12.7,
    east: 77.8,
    west: 77.4
  }
} as const;

export const HEAT_SAFETY_GUIDANCE = {
  LOW: {
    title: 'Comfortable',
    icon: '✓',
    message: 'Thermal conditions are favorable. Stay hydrated.',
    actions: ['Drink water regularly', 'Wear light clothing', 'Use sunscreen']
  },
  MODERATE: {
    title: 'Caution',
    icon: '!',
    message: 'Moderate heat exposure. Take breaks in shade.',
    actions: ['Take breaks every 15 minutes', 'Seek shade when possible', 'Drink water frequently']
  },
  HIGH: {
    title: 'Warning',
    icon: '⚠',
    message: 'High thermal exposure. Consider an alternate route.',
    actions: ['Use the Coolest route option', 'Wear hat and light clothes', 'Drink electrolyte fluids']
  },
  EXTREME: {
    title: 'Danger',
    icon: '🔴',
    message: 'Extreme heat risk. Strongly consider alternate routes or reschedule.',
    actions: ['Use the Coolest route', 'Travel during cooler hours', 'Carry water and first aid']
  }
} as const;

export const TIME_OF_DAY_CONFIG = {
  min: 8,
  max: 18,
  default: 12,
  step: 0.5,
  sunrise: 6,
  sunset: 18
} as const;
