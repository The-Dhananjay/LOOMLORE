'use client';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function StateCanvasDolly({ children, progress }: { children: React.ReactNode; progress: number }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.2, 4.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={[0x0e0908]} />
      <fog attach="fog" args={[0x0e0908, 6, 14]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 4, 3]} intensity={1.2} color="#f1d68a" />
      <CameraDolly progress={progress} />
      <Stars radius={40} depth={50} count={400} factor={3} fade speed={0.3} />
      {children}
    </Canvas>
  );
}

function CameraDolly({ progress }: { progress: number }) {
  const { camera } = useThree() as { camera: THREE.PerspectiveCamera };
  useFrame(() => {
    const z = 4.4 - progress * 1.6;
    const y = 0.2 + Math.sin(progress * Math.PI) * 0.4;
    camera.position.z += (z - camera.position.z) * 0.06;
    camera.position.y += (y - camera.position.y) * 0.06;
    camera.lookAt(0, 0, 0);
  });
  return null;
}
