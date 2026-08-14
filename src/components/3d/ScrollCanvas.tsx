'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingSilkKnot() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // 3D Scroll Rotation & Parallax
    const scrollFactor = scrollY * 0.002;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, scrollFactor + state.pointer.y * 0.3, 0.08);
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, state.pointer.x * 0.3, 0.08);
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.6}>
        <torusKnotGeometry args={[1, 0.35, 128, 32, 2, 3]} />
        <MeshWobbleMaterial
          factor={0.3}
          speed={1.5}
          color="#ff8ba7"
          roughness={0.25}
          metalness={0.7}
          emissive="#33272a"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

export function ScrollCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-hidden opacity-60">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ffc6c7" />
        <Suspense fallback={null}>
          <FloatingSilkKnot />
        </Suspense>
      </Canvas>
    </div>
  );
}
