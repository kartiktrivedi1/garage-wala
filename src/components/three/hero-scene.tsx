"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Torus } from "@react-three/drei";
import * as THREE from "three";

const BRAND = "#ff5a1f";
const INK = "#111111";

function LogoMark() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.1}>
      <group ref={group} position={[0, 1.3, 0]}>
        <RoundedBox args={[1.6, 1.6, 1.6]} radius={0.28} smoothness={6}>
          <meshPhysicalMaterial
            color={INK}
            roughness={0.25}
            metalness={0.35}
            clearcoat={1}
            clearcoatRoughness={0.15}
          />
        </RoundedBox>
        <Torus args={[1.05, 0.09, 24, 64]} rotation={[Math.PI / 2.4, 0, 0]}>
          <meshStandardMaterial color={BRAND} emissive={BRAND} emissiveIntensity={0.6} />
        </Torus>
      </group>
    </Float>
  );
}

function Road() {
  const stripes = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.z = (group.current.position.z + delta * 2.4) % 2;
    }
  });
  return (
    <group position={[0, -1.4, 0]} rotation={[-Math.PI / 2.35, 0, 0]}>
      <mesh receiveShadow>
        <planeGeometry args={[6, 16]} />
        <meshStandardMaterial color={INK} roughness={0.9} />
      </mesh>
      <group ref={group}>
        {stripes.map((i) => (
          <mesh key={i} position={[0, 0.01, i * 1.6 - 8]}>
            <planeGeometry args={[0.18, 0.7]} />
            <meshStandardMaterial color={BRAND} emissive={BRAND} emissiveIntensity={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Vehicle() {
  const car = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (car.current) {
      car.current.position.x = Math.sin(state.clock.elapsedTime * 0.6) * 1.1;
      car.current.rotation.y = -Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
    }
  });
  return (
    <group ref={car} position={[0, -0.55, 2.4]}>
      <RoundedBox args={[1.3, 0.45, 0.7]} radius={0.12} smoothness={4} position={[0, 0.28, 0]}>
        <meshPhysicalMaterial color={BRAND} roughness={0.3} metalness={0.5} clearcoat={1} />
      </RoundedBox>
      <RoundedBox args={[0.75, 0.32, 0.66]} radius={0.1} smoothness={4} position={[-0.05, 0.58, 0]}>
        <meshPhysicalMaterial color="#f5f4f1" roughness={0.2} metalness={0.1} transparent opacity={0.85} />
      </RoundedBox>
      {[[-0.42, 0.02, 0.36], [0.42, 0.02, 0.36], [-0.42, 0.02, -0.36], [0.42, 0.02, -0.36]].map(
        (p, i) => (
          <mesh key={i} position={p as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.14, 20]} />
            <meshStandardMaterial color="#1b1b1e" roughness={0.6} />
          </mesh>
        )
      )}
    </group>
  );
}

function LocationPin() {
  const pin = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (pin.current) {
      pin.current.position.y = 2.4 + Math.sin(state.clock.elapsedTime * 1.6) * 0.12;
    }
  });
  return (
    <group ref={pin} position={[1.8, 2.4, 1]}>
      <mesh>
        <coneGeometry args={[0.28, 0.55, 32]} />
        <meshStandardMaterial color={BRAND} emissive={BRAND} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial color={BRAND} emissive={BRAND} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <sphereGeometry args={[0.11, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
      <pointLight position={[-4, 2, -2]} intensity={12} color={BRAND} />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [3.4, 2.2, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <Road />
          <Vehicle />
          <LogoMark />
          <LocationPin />
          <fog attach="fog" args={[INK, 6, 14]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
