import { useState } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';

interface LocationInputProps {
  label: string;
  value: { name: string; coordinates: { latitude: number; longitude: number } } | null;
  onChange: (location: { name: string; coordinates: { latitude: number; longitude: number } }) => void;
  placeholder: string;
}

const POPULAR_LOCATIONS = [
  { name: 'PES University', coordinates: { latitude: 12.8354, longitude: 77.6245 } },
  { name: 'Cubbon Park', coordinates: { latitude: 12.9352, longitude: 77.5948 } },
  { name: 'Bangalore Fort', coordinates: { latitude: 12.9716, longitude: 77.5946 } },
  { name: 'Vidhana Soudha', coordinates: { latitude: 12.9880, longitude: 77.5908 } },
  { name: 'Koramangala', coordinates: { latitude: 12.9352, longitude: 77.6245 } },
  { name: 'Indiranagar', coordinates: { latitude: 12.9716, longitude: 77.6412 } }
];

export function LocationInput({ label, value, onChange, placeholder }: LocationInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = POPULAR_LOCATIONS.filter((loc) =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <label className="block mb-2 text-xs uppercase tracking-[0.15em] text-slate-400">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-3 text-amber-400">
          <MapPin className="h-4 w-4" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm || value?.name || ''}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
        />
      </div>
      {isOpen && filteredLocations.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-slate-700 bg-slate-900 shadow-lg z-50">
          {filteredLocations.map((loc) => (
            <button
              key={loc.name}
              onClick={() => {
                onChange(loc);
                setIsOpen(false);
                setSearchTerm('');
              }}
              className="w-full px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-800 first:rounded-t-xl last:rounded-b-xl transition"
            >
              {loc.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface RouteInputPanelProps {
  onSubmit: (origin: { latitude: number; longitude: number }, destination: { latitude: number; longitude: number }) => void;
  isLoading: boolean;
}

export function RouteInputPanel({ onSubmit, isLoading }: RouteInputPanelProps) {
  const [origin, setOrigin] = useState<{ name: string; coordinates: { latitude: number; longitude: number } } | null>(POPULAR_LOCATIONS[0]);
  const [destination, setDestination] = useState<{ name: string; coordinates: { latitude: number; longitude: number } } | null>(POPULAR_LOCATIONS[1]);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSubmit = () => {
    if (origin && destination) {
      onSubmit(origin.coordinates, destination.coordinates);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <Search className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-semibold text-white">Route Planner</h3>
      </div>

      <div className="space-y-4">
        <LocationInput label="From" value={origin} onChange={setOrigin} placeholder="Starting location" />

        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700 hover:text-amber-400"
            title="Swap origin and destination"
          >
            <ArrowRight className="h-4 w-4 rotate-90" />
          </button>
        </div>

        <LocationInput label="To" value={destination} onChange={setDestination} placeholder="Destination" />

        <button
          onClick={handleSubmit}
          disabled={!origin || !destination || isLoading}
          className="w-full rounded-xl border border-amber-500/50 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-4 py-3 text-sm font-semibold text-amber-200 transition disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-500/30 hover:to-orange-500/30"
        >
          {isLoading ? 'Finding Safe Route...' : 'Find Safe Route'}
        </button>
      </div>
    </div>
  );
}
