'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { StateScene } from '@/data/india';

function SareeForm({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.35;
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.08;
  });
  return (
    <group ref={ref}>
      {/* pleated skirt */}
      <mesh castShadow receiveShadow position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.85, 1.15, 1.2, 32, 1, true]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.45} metalness={0.25} />
      </mesh>
      {/* draped pallu */}
      <mesh position={[0.4, 0.4, 0.1]} rotation={[0, 0, -0.45]}>
        <planeGeometry args={[1.4, 1.8]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.5} metalness={0.2} />
      </mesh>
      {/* gold border */}
      <mesh position={[0, -1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.05, 16, 48]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[0.4, 0.4, 0.12]} rotation={[0, 0, -0.45]}>
        <torusGeometry args={[0.62, 0.03, 16, 48]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} metalness={0.95} roughness={0.15} />
      </mesh>
      {/* embellishment dots */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.05, -1.42, Math.sin(a) * 1.05]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.7} />
          </mesh>
        );
      })}
    </group>
  );
}

function PashminaForm({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.08;
  });
  return (
    <mesh ref={ref} castShadow>
      <torusKnotGeometry args={[0.7, 0.25, 96, 16, 2, 5]} />
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
    </mesh>
  );
}

function LehengaForm({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
  });
  return (
    <group ref={ref}>
      {/* skirt */}
      <mesh castShadow position={[0, -0.6, 0]}>
        <coneGeometry args={[1.1, 1.5, 24, 1, true]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} metalness={0.3} roughness={0.4} />
      </mesh>
      {/* choli top */}
      <mesh position={[0, 0.45, 0]}>
        <sphereGeometry args={[0.55, 24, 24, 0, Math.PI * 2, 0, Math.PI / 1.4]} />
        <meshStandardMaterial color={color} metalness={0.25} roughness={0.45} />
      </mesh>
      {/* mirror work dots */}
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        const y = -0.6 + (i % 4) * 0.18;
        const r = 0.9 + ((i + 1) % 3) * 0.15;
        return (
          <mesh key={i} position={[Math.cos(a) * r, y, Math.sin(a) * r]}>
            <circleGeometry args={[0.06, 16]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.7} />
          </mesh>
        );
      })}
      {/* hem border */}
      <mesh position={[0, -1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.05, 16, 48]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} metalness={0.95} roughness={0.15} />
      </mesh>
    </group>
  );
}

function GarmentOrnament({ color, accent, garment }: { color: string; accent: string; garment: string }) {
  if (garment.includes('Saree') || garment.includes('Sari')) return <SareeForm color={color} accent={accent} />;
  if (garment.includes('Pashmina') || garment.includes('Shawl') || garment.includes('Puan') || garment.includes('Rumal'))
    return <PashminaForm color={color} accent={accent} />;
  return <LehengaForm color={color} accent={accent} />;
}

function Ground({ ground }: { ground: string }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]} receiveShadow>
      <circleGeometry args={[6, 64]} />
      <meshStandardMaterial color={ground} roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

function SnowParticles({ count = 240 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = Math.random() * 6 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);
  useFrame((state) => {
    if (!ref.current) return;
    const positions = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= 0.012;
      if (positions[i * 3 + 1] < -1) positions[i * 3 + 1] = 5;
    }
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#fbf6ec" transparent opacity={0.9} depthWrite={false} />
    </points>
  );
}

function RainParticles({ count = 400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = Math.random() * 6 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);
  useFrame(() => {
    if (!ref.current) return;
    const positions = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= 0.08;
      if (positions[i * 3 + 1] < -1) positions[i * 3 + 1] = 5;
    }
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#caa14a" transparent opacity={0.6} depthWrite={false} />
    </points>
  );
}

function SandParticles({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = Math.random() * 3 - 1.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#d8b285" transparent opacity={0.6} depthWrite={false} />
    </points>
  );
}

function Fireflies({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = Math.random() * 3 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#f1d68a" transparent opacity={0.9} depthWrite={false} />
    </points>
  );
}

function LotusParticles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = Math.random() * 2 - 1.2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, [count]);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#a23a48" transparent opacity={0.8} depthWrite={false} />
    </points>
  );
}

function IncenseParticles({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = Math.random() * 3 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, [count]);
  useFrame((state) => {
    if (!ref.current) return;
    const positions = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += 0.005;
      if (positions[i * 3 + 1] > 3) positions[i * 3 + 1] = -1;
    }
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#caa14a" transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

function SceneBackdrop({ state }: { state: StateScene }) {
  const items: JSX.Element[] = [];
  if (state.scene === 'desert') {
    for (let i = 0; i < 5; i++) {
      items.push(<mesh key={`d${i}`} position={[i * 0.8 - 2, -0.4, -2]}>
        <coneGeometry args={[0.5, 0.9, 6]} />
        <meshStandardMaterial color="#d8b285" />
      </mesh>);
    }
  } else if (state.scene === 'snow') {
    items.push(<mesh position={[-3, 0.8, -2]}>
      <coneGeometry args={[1.4, 3.2, 8]} />
      <meshStandardMaterial color="#fbf6ec" />
    </mesh>);
    items.push(<mesh position={[3, 0.4, -2.5]}>
      <coneGeometry args={[1.0, 2.4, 8]} />
      <meshStandardMaterial color="#fbf6ec" />
    </mesh>);
  } else if (state.scene === 'temple') {
    items.push(<mesh position={[0, -0.5, -2.5]}>
      <boxGeometry args={[3, 1.5, 0.4]} />
      <meshStandardMaterial color="#7a1f2b" />
    </mesh>);
    items.push(<mesh position={[-2.5, -0.3, -2.2]}>
      <cylinderGeometry args={[0.18, 0.18, 1.6, 16]} />
      <meshStandardMaterial color="#caa14a" />
    </mesh>);
    items.push(<mesh position={[2.5, -0.3, -2.2]}>
      <cylinderGeometry args={[0.18, 0.18, 1.6, 16]} />
      <meshStandardMaterial color="#caa14a" />
    </mesh>);
  } else if (state.scene === 'river' || state.scene === 'backwaters') {
    items.push(<mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[12, 4]} />
      <meshStandardMaterial color={state.palette.ground} metalness={0.6} roughness={0.3} />
    </mesh>);
  } else if (state.scene === 'forest' || state.scene === 'mountains' || state.scene === 'mist') {
    for (let i = 0; i < 5; i++) {
      items.push(<mesh key={`m${i}`} position={[i * 1.2 - 2.4, 0.2 + Math.sin(i) * 0.3, -2.5]}>
        <coneGeometry args={[0.4, 1.2, 6]} />
        <meshStandardMaterial color={state.palette.primary} />
      </mesh>);
    }
  }
  return <>{items}</>;
}

export default function StateSceneCanvas({ state }: { state: StateScene }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.2, 4.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={[0x0e0908]} />
      <fog attach="fog" args={[0x0e0908, 6, 14]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 4, 3]} intensity={1.2} color={state.palette.accent} castShadow />
      <pointLight position={[0, 0.6, 2]} intensity={1.3} color={state.palette.accent} />
      <Suspense fallback={null}>
        <Stars radius={40} depth={50} count={400} factor={3} fade speed={0.3} />
        <Ground ground={state.palette.ground} />
        <Float speed={1} rotationIntensity={0.05} floatIntensity={0.3}>
          <GarmentOrnament color={state.palette.primary} accent={state.palette.accent} garment={state.signatureGarment} />
        </Float>
        <SceneBackdrop state={state} />
        {state.particles === 'snow' && <SnowParticles />}
        {state.particles === 'rain' && <RainParticles />}
        {state.particles === 'sand' && <SandParticles />}
        {state.particles === 'fireflies' && <Fireflies />}
        {state.particles === 'lotus' && <LotusParticles />}
        {state.particles === 'incense' && <IncenseParticles />}
      </Suspense>
    </Canvas>
  );
}
