import { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Buildings } from './Buildings';
import { Roads } from './Roads';
import { Route3D } from './Route3D';
import { HeatLayer } from './HeatLayer';
import { type OptimizeResponse } from '../../types/api';

function Lighting() {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.copy(new THREE.Vector3(50, 80, 50));
      lightRef.current.target.position.copy(new THREE.Vector3(0, 0, 0));
      lightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      {/* Directional Light */}
      <directionalLight ref={lightRef} intensity={0.8} color="#ffffff" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-left={-100} shadow-camera-right={100} shadow-camera-top={100} shadow-camera-bottom={-100} />
      {/* Ambient Light */}
      <ambientLight intensity={0.3} color="#87ceeb" />
      {/* Accent Light */}
      <pointLight position={[100, 100, 50]} intensity={0.2} color="#ffa500" />
    </>
  );
}

function Ground() {
  return (
    <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[300, 300]} />
      <meshStandardMaterial color="#0a0e27" metalness={0.1} roughness={0.8} />
    </mesh>
  );
}

function SceneContent({ routeData }: { routeData: OptimizeResponse | null }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 40, 60);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 40, 60]} fov={60} />
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        autoRotate={false}
        minDistance={20}
        maxDistance={200}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2}
      />
      <Lighting />
      <Ground />
      <Buildings />
      <Roads />
      {routeData && <Route3D routeData={routeData} />}
      <HeatLayer />
      {/* Grid Helper for reference */}
      <gridHelper args={[200, 40]} position={[0, 0.05, 0]} />
    </>
  );
}

export function CityScene({ routeData }: { routeData: OptimizeResponse | null }) {
  return (
    <Canvas shadows gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }} dpr={[1, 1.5]}>
      <color attach="background" args={['#0a0e27']} />
      <SceneContent routeData={routeData} />
    </Canvas>
  );
}
