import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { type OptimizeResponse } from '../../types/api';
import { THERMAL_THRESHOLDS } from '../../utils/constants';

function getThermalColor(exposure: number): THREE.Color {
  if (exposure < 30) {
    return new THREE.Color(THERMAL_THRESHOLDS.LOW.color);
  } else if (exposure < 50) {
    return new THREE.Color(THERMAL_THRESHOLDS.MODERATE.color);
  } else if (exposure < 70) {
    return new THREE.Color(THERMAL_THRESHOLDS.HIGH.color);
  } else {
    return new THREE.Color(THERMAL_THRESHOLDS.EXTREME.color);
  }
}

function RoutePath({ routeData }: { routeData: OptimizeResponse }) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const pulseRef = useRef(0);

  const { points, color } = useMemo(() => {
    const journey = routeData.recommendation?.best_journey;
    if (!journey?.geometry?.coordinates) {
      return { points: [], color: new THREE.Color(0x2e9b4b) };
    }

    // Convert lat/lon to local 3D coordinates (simplified)
    const baseX = journey.origin_lon;
    const baseZ = journey.origin_lat;
    const scale = 1000; // Scale factor for visualization

    const pointsArray = journey.geometry.coordinates.map(([lon, lat]: [number, number]) => {
      return new THREE.Vector3((lon - baseX) * scale, 0.3, (lat - baseZ) * scale);
    });

    return {
      points: pointsArray,
      color: getThermalColor(journey.thermal_exposure)
    };
  }, [routeData]);

  const geometry3D = useMemo(() => {
    if (points.length < 2) return null;

    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, 1.5, 8, false);
    return tubeGeometry;
  }, [points]);

  useFrame(({ clock }) => {
    pulseRef.current = clock.getElapsedTime();
    if (materialRef.current) {
      const pulse = Math.sin(pulseRef.current * 2) * 0.3 + 0.7;
      materialRef.current.emissiveIntensity = pulse;
    }
  });

  if (!geometry3D || points.length < 2) {
    return null;
  }

  return (
    <mesh geometry={geometry3D} castShadow>
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
}

function RouteMarkers({ routeData }: { routeData: OptimizeResponse }) {
  const journey = routeData.recommendation?.best_journey;
  if (!journey) return null;

  const baseX = journey.origin_lon;
  const baseZ = journey.origin_lat;
  const scale = 1000;

  const originPos = [0, 1.5, 0] as const;
  const destX = (journey.destination_lon - baseX) * scale;
  const destZ = (journey.destination_lat - baseZ) * scale;

  return (
    <group>
      {/* Origin marker */}
      <mesh position={originPos} castShadow>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.6} />
      </mesh>

      {/* Origin glow */}
      <mesh position={originPos}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshStandardMaterial color="#22c55e" transparent opacity={0.2} emissive="#22c55e" emissiveIntensity={0.3} />
      </mesh>

      {/* Destination marker */}
      <mesh position={[destX, 1.5, destZ]} castShadow>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.6} />
      </mesh>

      {/* Destination glow */}
      <mesh position={[destX, 1.5, destZ]}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshStandardMaterial color="#ef4444" transparent opacity={0.2} emissive="#ef4444" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export function Route3D({ routeData }: { routeData: OptimizeResponse }) {
  return (
    <group>
      <RoutePath routeData={routeData} />
      <RouteMarkers routeData={routeData} />
    </group>
  );
}
