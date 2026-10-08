import { useMemo } from 'react';
import * as THREE from 'three';

interface Building {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
}

function generateBuildings(): Building[] {
  const buildings: Building[] = [];
  const gridSize = 120;
  const cellSize = 15;
  const buildingChance = 0.75;

  for (let x = -gridSize; x < gridSize; x += cellSize) {
    for (let z = -gridSize; z < gridSize; z += cellSize) {
      if (Math.random() < buildingChance) {
        // Avoid placing buildings on route area
        const distToRoute = Math.sqrt(x * x + z * z);
        if (distToRoute < 8) continue;

        buildings.push({
          x: x + Math.random() * (cellSize * 0.6),
          z: z + Math.random() * (cellSize * 0.6),
          width: 4 + Math.random() * 5,
          depth: 4 + Math.random() * 5,
          height: 8 + Math.random() * 25,
        });
      }
    }
  }

  return buildings;
}

export function Buildings() {
  const buildings = useMemo(() => generateBuildings(), []);

  return (
    <group>
      {buildings.map((building, i) => (
        <mesh key={i} position={[building.x, building.height / 2, building.z]} castShadow receiveShadow>
          <boxGeometry args={[building.width, building.height, building.depth]} />
          <meshStandardMaterial
            color={`hsl(210, 20%, ${12 + Math.random() * 8}%)`}
            metalness={0.6}
            roughness={0.7}
            emissive={0x1a1f2e}
          />
        </mesh>
      ))}
    </group>
  );
}
