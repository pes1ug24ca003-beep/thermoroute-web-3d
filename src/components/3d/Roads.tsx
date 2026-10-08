import { useMemo } from 'react';
import * as THREE from 'three';

interface RoadSegment {
  start: [number, number];
  end: [number, number];
  width: number;
}

function generateRoads(): RoadSegment[] {
  const roads: RoadSegment[] = [];
  const gridSpacing = 30;

  // Horizontal roads
  for (let z = -100; z <= 100; z += gridSpacing) {
    roads.push({
      start: [-120, z],
      end: [120, z],
      width: 6
    });
  }

  // Vertical roads
  for (let x = -100; x <= 100; x += gridSpacing) {
    roads.push({
      start: [x, -120],
      end: [x, 120],
      width: 6
    });
  }

  // Diagonal roads for variety
  roads.push({
    start: [-100, -100],
    end: [100, 100],
    width: 5
  });
  roads.push({
    start: [100, -100],
    end: [-100, 100],
    width: 5
  });

  return roads;
}

export function Roads() {
  const roads = useMemo(() => generateRoads(), []);

  return (
    <group>
      {roads.map((road, i) => {
        const [startX, startZ] = road.start;
        const [endX, endZ] = road.end;
        const dx = endX - startX;
        const dz = endZ - startZ;
        const length = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dz, dx);
        const midX = (startX + endX) / 2;
        const midZ = (startZ + endZ) / 2;

        return (
          <mesh key={i} position={[midX, 0.02, midZ]} rotation={[0, angle, 0]} castShadow receiveShadow>
            <planeGeometry args={[length, road.width]} />
            <meshStandardMaterial
              color="#1a1f2e"
              metalness={0.3}
              roughness={0.9}
              emissive={0x0a0f1a}
            />
          </mesh>
        );
      })}

      {/* Road markings */}
      {roads.map((road, i) => {
        if (i % 3 !== 0) return null; // Only mark some roads

        const [startX, startZ] = road.start;
        const [endX, endZ] = road.end;
        const dx = endX - startX;
        const dz = endZ - startZ;
        const length = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dz, dx);
        const midX = (startX + endX) / 2;
        const midZ = (startZ + endZ) / 2;
        const markingCount = Math.floor(length / 10);

        return (
          <group key={`marking-${i}`} position={[midX, 0.03, midZ]} rotation={[0, angle, 0]}>
            {Array.from({ length: markingCount }).map((_, j) => (
              <mesh key={j} position={[(j - markingCount / 2) * 10, 0, 0]}>
                <planeGeometry args={[4, 0.3]} />
                <meshStandardMaterial color="#ffd700" emissive={0x664400} emissiveIntensity={0.3} />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}
