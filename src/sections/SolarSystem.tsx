"use client";

// Directory: src/sections
// SolarSystem: Interactive 3D solar system with planets representing projects.

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Html, Stars, Text, Billboard, Sparkles, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { projects } from "@/lib/projects";
import * as THREE from "three";

/**
 * Central Sun with glow effect and gentle rotation.
 */
function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial color="#FFA500" emissive="#FF6B00" emissiveIntensity={0.6} />
      <pointLight color="#FFA500" intensity={2} distance={15} />
    </mesh>
  );
}

/**
 * Planet component that orbits around the sun and is clickable.
 */
function Planet({ 
  distance, 
  size, 
  color, 
  speed, 
  label, 
  href 
}: { 
  distance: number; 
  size: number; 
  color: string; 
  speed: number; 
  label: string; 
  href: string; 
}) {
  const planetRef = useRef<THREE.Group>(null);
  const router = useRouter();

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += speed;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    router.push(href);
  };

  return (
    <group ref={planetRef}>
      <group position={[distance, 0, 0]} onClick={handleClick}>
        <mesh>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
        </mesh>
        <Billboard>
          <Text 
            fontSize={0.25} 
            color="#ffffff" 
            anchorX="center" 
            anchorY="bottom" 
            position={[0, size + 0.5, 0]}
            outlineWidth={0.01}
            outlineColor="#000"
          >
            {label}
          </Text>
        </Billboard>
        <pointLight color={color} intensity={0.5} distance={2} />
      </group>
      
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.02, distance + 0.02, 64]} />
        <meshBasicMaterial color="#444" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/**
 * Asteroid belt with small floating rocks.
 */
function AsteroidBelt() {
  const asteroids = useMemo(() => {
    const count = 80;
    const radius = 8;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 1.5;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (Math.random() - 0.5) * 0.3;
      return {
        position: [x, y, z] as [number, number, number],
        size: 0.02 + Math.random() * 0.04,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      };
    });
  }, []);

  return (
    <group>
      {asteroids.map((asteroid, i) => (
        <mesh key={i} position={asteroid.position} rotation={asteroid.rotation}>
          <dodecahedronGeometry args={[asteroid.size, 0]} />
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Main solar system scene with sun, planets, and effects.
 */
function SolarSystemScene() {
  const planets = useMemo(() => {
    return projects.map((project, i) => ({
      ...project,
      distance: 3 + i * 1.8,
      size: 0.3 + i * 0.1,
      speed: 0.01 - i * 0.002,
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <Sun />
      
      {planets.map((planet) => (
        <Planet
          key={planet.slug}
          distance={planet.distance}
          size={planet.size}
          color={planet.color}
          speed={planet.speed}
          label={planet.title}
          href={`/project/${planet.slug}`}
        />
      ))}
      
      <AsteroidBelt />
      
      <Stars radius={200} depth={80} count={15000} factor={6} saturation={0} fade speed={0.3} />
      <Sparkles count={300} size={2} speed={0.3} opacity={0.4} color="#ffffff" scale={[80, 15, 80]} />
      
      <EffectComposer>
        <Bloom mipmapBlur intensity={0.8} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  );
}

/**
 * SolarSystem section: full-viewport interactive 3D solar system.
 */
export function SolarSystem() {
  return (
    <section id="solar-system" className="border-b border-zinc-200 dark:border-zinc-800">
      <Container>
        <div className="mb-4 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Solar System</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Click a planet to explore the project in detail. Drag to orbit, scroll to zoom.
          </p>
        </div>
      </Container>
      <div className="relative h-[calc(100vh-56px)] w-full overflow-hidden">
        <Canvas dpr={[1, 2]}>
          <Suspense fallback={<Html center>Loading Solar System…</Html>}> 
            <PerspectiveCamera makeDefault position={[12, 8, 12]} fov={60} />
            <OrbitControls 
              enablePan={false} 
              minDistance={8} 
              maxDistance={25}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2}
            />
            <SolarSystemScene />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

export default SolarSystem;