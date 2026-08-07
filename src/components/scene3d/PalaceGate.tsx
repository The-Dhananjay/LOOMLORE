'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

// 60-30-10 Color System for 3D Palace Hall:
// 60% Dominant: Dark Teak & Obsidian (#0c0a09, #1c1411)
// 30% Secondary: Banarasi Royal Crimson Silk (#7a1f2b)
// 10% Accent: Luminous Zari Gold & Brass (#f1d68a, #caa14a)

function LeftDoor() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    // Smooth door opening rotation outwards
    const angle = Math.sin(t * 0.4) * 0.12 - 0.45;
    ref.current.rotation.y = angle;
  });

  return (
    <group ref={ref} position={[-2.2, 0, -0.5]}>
      {/* Wood Door Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.7, 4.2, 0.16]} />
        <meshStandardMaterial color="#221510" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Gold Inlay Trim */}
      <mesh position={[0.7, 0, 0.09]}>
        <boxGeometry args={[0.08, 4.0, 0.02]} />
        <meshStandardMaterial color="#caa14a" metalness={0.9} roughness={0.2} emissive="#caa14a" emissiveIntensity={0.3} />
      </mesh>
      {/* Brass Door Handle Knocker (Side-mounted, off-center to avoid text block) */}
      <mesh position={[0.6, -0.2, 0.11]}>
        <ringGeometry args={[0.08, 0.16, 32]} />
        <meshStandardMaterial color="#f1d68a" metalness={0.95} roughness={0.15} emissive="#f1d68a" emissiveIntensity={0.4} />
      </mesh>
      {/* Brass Studs */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-0.5 + (i % 2) * 0.6, -1.5 + i * 0.7, 0.09]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#f1d68a" metalness={0.95} roughness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function RightDoor() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const angle = -Math.sin(t * 0.4) * 0.12 + 0.45;
    ref.current.rotation.y = angle;
  });

  return (
    <group ref={ref} position={[2.2, 0, -0.5]}>
      {/* Wood Door Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.7, 4.2, 0.16]} />
        <meshStandardMaterial color="#221510" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Gold Inlay Trim */}
      <mesh position={[-0.7, 0, 0.09]}>
        <boxGeometry args={[0.08, 4.0, 0.02]} />
        <meshStandardMaterial color="#caa14a" metalness={0.9} roughness={0.2} emissive="#caa14a" emissiveIntensity={0.3} />
      </mesh>
      {/* Brass Door Handle Knocker */}
      <mesh position={[-0.6, -0.2, 0.11]}>
        <ringGeometry args={[0.08, 0.16, 32]} />
        <meshStandardMaterial color="#f1d68a" metalness={0.95} roughness={0.15} emissive="#f1d68a" emissiveIntensity={0.4} />
      </mesh>
      {/* Brass Studs */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0.5 - (i % 2) * 0.6, -1.5 + i * 0.7, 0.09]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#f1d68a" metalness={0.95} roughness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function FlowingSilkBanner({ position, side }: { position: [number, number, number]; side: -1 | 1 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const count = pos.count;
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i);
      const wave = Math.sin(t * 1.8 + y * 2.5) * 0.08 * (1.5 - y);
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[0, side * 0.25, 0]}>
      <planeGeometry args={[1.2, 4.2, 24, 24]} />
      <meshStandardMaterial
        color={side === -1 ? '#7a1f2b' : '#a23a48'}
        roughness={0.35}
        metalness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function PalacePillars() {
  return (
    <group>
      {/* Left Pillar */}
      <mesh position={[-3.4, 0, -0.8]} castShadow receiveShadow>
        <cylinderGeometry args={[0.28, 0.35, 4.8, 32]} />
        <meshStandardMaterial color="#3a271e" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[-3.4, 2.2, -0.8]}>
        <boxGeometry args={[0.8, 0.25, 0.8]} />
        <meshStandardMaterial color="#caa14a" metalness={0.85} roughness={0.2} emissive="#a87f2c" emissiveIntensity={0.2} />
      </mesh>

      {/* Right Pillar */}
      <mesh position={[3.4, 0, -0.8]} castShadow receiveShadow>
        <cylinderGeometry args={[0.28, 0.35, 4.8, 32]} />
        <meshStandardMaterial color="#3a271e" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[3.4, 2.2, -0.8]}>
        <boxGeometry args={[0.8, 0.25, 0.8]} />
        <meshStandardMaterial color="#caa14a" metalness={0.85} roughness={0.2} emissive="#a87f2c" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function GoldDust({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = Math.random() * 6 - 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const positions = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 0.003 + 0.002;
      if (positions[i * 3 + 1] > 4) positions[i * 3 + 1] = -2;
    }
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f1d68a"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function PalaceGate() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.1, 4.8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={[0x0c0a09]} />
      <fog attach="fog" args={[0x0c0a09, 5, 12]} />
      
      {/* Lighting Setup */}
      <ambientLight intensity={0.65} color="#fbf6ec" />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#f1d68a" castShadow />
      <spotLight position={[0, 4, 2]} intensity={2.2} angle={0.6} penumbra={0.8} color="#f1d68a" castShadow />
      <pointLight position={[0, -1, 1.5]} intensity={0.9} color="#caa14a" />

      <Suspense fallback={null}>
        <Environment preset="night" />
        <PalacePillars />
        <LeftDoor />
        <RightDoor />
        <FlowingSilkBanner position={[-4.1, 0, -1.2]} side={-1} />
        <FlowingSilkBanner position={[4.1, 0, -1.2]} side={1} />
        <GoldDust />
      </Suspense>
    </Canvas>
  );
}
