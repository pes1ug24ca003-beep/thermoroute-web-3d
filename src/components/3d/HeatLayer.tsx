import { useMemo } from 'react';
import * as THREE from 'three';

interface HeatZone {
  x: number;
  z: number;
  radius: number;
  intensity: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
}

function getHeatColor(intensity: string): [number, number, number, number] {
  switch (intensity) {
    case 'LOW':
      return [0.18, 0.61, 0.29, 0.2];
    case 'MODERATE':
      return [0.92, 0.7, 0.02, 0.25];
    case 'HIGH':
      return [0.98, 0.45, 0.1, 0.3];
    case 'EXTREME':
      return [0.94, 0.27, 0.27, 0.35];
    default:
      return [0.18, 0.61, 0.29, 0.2];
  }
}

function generateHeatZones(): HeatZone[] {
  const zones: HeatZone[] = [
    { x: 40, z: 30, radius: 25, intensity: 'EXTREME' },
    { x: -50, z: -60, radius: 30, intensity: 'HIGH' },
    { x: 20, z: -80, radius: 20, intensity: 'MODERATE' },
    { x: -70, z: 40, radius: 22, intensity: 'HIGH' },
    { x: 60, z: -30, radius: 18, intensity: 'MODERATE' },
  ];

  return zones;
}

export function HeatLayer() {
  const zones = useMemo(() => generateHeatZones(), []);

  return (
    <group>
      {zones.map((zone, i) => {
        const [r, g, b, opacity] = getHeatColor(zone.intensity);

        return (
          <group key={i}>
            {/* Thermal ground decal */}
            <mesh position={[zone.x, 0.05, zone.z]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[zone.radius, 32]} />
              <meshStandardMaterial
                color={new THREE.Color(r, g, b)}
                transparent
                opacity={opacity * 0.6}
                emissive={new THREE.Color(r, g, b)}
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Thermal glow ring */}
            <mesh position={[zone.x, 0.1, zone.z]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[zone.radius * 0.8, zone.radius, 32]} />
              <meshStandardMaterial
                color={new THREE.Color(r, g, b)}
                transparent
                opacity={opacity * 0.3}
                emissive={new THREE.Color(r, g, b)}
                emissiveIntensity={0.2}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Floating heat particles */}
            {Array.from({ length: 8 }).map((_, j) => {
              const angle = (j / 8) * Math.PI * 2;
              const distance = zone.radius * 0.7;
              const px = zone.x + Math.cos(angle) * distance;
              const pz = zone.z + Math.sin(angle) * distance;
              const py = 2 + Math.random() * 3;

              return (
                <mesh key={`particle-${j}`} position={[px, py, pz]}>
                  <sphereGeometry args={[0.5, 16, 16]} />
                  <meshStandardMaterial
                    color={new THREE.Color(r, g, b)}
                    emissive={new THREE.Color(r, g, b)}
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.4}
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}
