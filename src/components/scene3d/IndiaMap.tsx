'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

// 29 state tiles laid out in a stylised sub-continent shape.
// Each tile is a small emissive plate that hovers and slowly rotates.
const TILES: { id: string; x: number; y: number; z: number; color: string }[] = [
  { id: 'jammu-kashmir', x: -1.6, y:  1.7, z: 0, color: '#fbf6ec' },
  { id: 'ladakh',         x: -1.0, y:  1.7, z: 0, color: '#caa14a' },
  { id: 'himachal-pradesh',x: -1.4, y:  1.0, z: 0, color: '#0f6e54' },
  { id: 'punjab',         x: -1.1, y:  0.7, z: 0, color: '#caa14a' },
  { id: 'uttarakhand',    x: -0.6, y:  1.0, z: 0, color: '#0f6e54' },
  { id: 'haryana',        x: -0.8, y:  0.4, z: 0, color: '#a87f2c' },
  { id: 'delhi',          x: -0.7, y:  0.2, z: 0, color: '#7a1f2b' },
  { id: 'rajasthan',      x: -1.4, y: -0.3, z: 0, color: '#a8430b' },
  { id: 'uttar-pradesh',  x: -0.1, y:  0.2, z: 0, color: '#7a1f2b' },
  { id: 'gujarat',        x: -1.4, y: -1.0, z: 0, color: '#b46a3d' },
  { id: 'madhya-pradesh', x: -0.3, y: -0.6, z: 0, color: '#0f6e54' },
  { id: 'maharashtra',    x: -0.7, y: -1.4, z: 0, color: '#b46a3d' },
  { id: 'goa',            x: -0.8, y: -1.9, z: 0, color: '#d68f63' },
  { id: 'karnataka',      x: -0.5, y: -2.0, z: 0, color: '#caa14a' },
  { id: 'andhra-pradesh', x:  0.0, y: -1.9, z: 0, color: '#caa14a' },
  { id: 'telangana',      x:  0.1, y: -1.6, z: 0, color: '#7a1f2b' },
  { id: 'tamil-nadu',     x:  0.0, y: -2.4, z: 0, color: '#a23a48' },
  { id: 'kerala',         x: -0.6, y: -2.5, z: 0, color: '#fbf6ec' },
  { id: 'odisha',         x:  0.6, y: -1.1, z: 0, color: '#a23a48' },
  { id: 'jharkhand',      x:  0.6, y: -0.5, z: 0, color: '#0f6e54' },
  { id: 'west-bengal',    x:  0.9, y: -0.8, z: 0, color: '#7a1f2b' },
  { id: 'bihar',          x:  0.8, y: -0.1, z: 0, color: '#caa14a' },
  { id: 'chhattisgarh',   x:  0.3, y: -0.7, z: 0, color: '#0f6e54' },
  { id: 'sikkim',         x:  1.2, y:  0.6, z: 0, color: '#caa14a' },
  { id: 'arunachal-pradesh', x:  1.7, y:  0.8, z: 0, color: '#0c6e8f' },
  { id: 'assam',          x:  1.4, y:  0.2, z: 0, color: '#caa14a' },
  { id: 'nagaland',       x:  1.7, y:  0.2, z: 0, color: '#0c6e8f' },
  { id: 'meghalaya',      x:  1.4, y: -0.2, z: 0, color: '#52a08a' },
  { id: 'tripura',        x:  1.5, y: -0.4, z: 0, color: '#0f6e54' },
  { id: 'mizoram',        x:  1.7, y: -0.6, z: 0, color: '#52a08a' }
];

function SubContinent() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.12) * 0.12;
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.05;
  });
  return (
    <group ref={ref}>
      {TILES.map((t) => (
        <Float key={t.id} speed={1.2} rotationIntensity={0.05} floatIntensity={0.4}>
          <mesh position={[t.x, t.y, t.z]}>
            <boxGeometry args={[0.45, 0.45, 0.18]} />
            <meshStandardMaterial
              color={t.color}
              metalness={0.45}
              roughness={0.35}
              emissive={t.color}
              emissiveIntensity={0.25}
            />
          </mesh>
        </Float>
      ))}
      {/* outline silhouette */}
      <mesh position={[-0.1, -0.3, -0.2]}>
        <sphereGeometry args={[3.2, 48, 48]} />
        <meshBasicMaterial color="#caa14a" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function DustParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#caa14a" transparent opacity={0.5} depthWrite={false} />
    </points>
  );
}

export default function IndiaMap() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 7.2], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={[0x0e0908]} />
      <fog attach="fog" args={[0x0e0908, 8, 16]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} color="#f1d68a" />
      <pointLight position={[-2, 2, 4]} intensity={0.8} color="#caa14a" />
      <Suspense fallback={null}>
        <Stars radius={50} depth={50} count={1500} factor={4} fade speed={0.5} />
        <SubContinent />
        <DustParticles />
      </Suspense>
    </Canvas>
  );
}
