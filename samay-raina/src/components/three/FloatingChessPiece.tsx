"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function KnightGeometry() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.3, 0);
    shape.lineTo(0.35, 0.1);
    shape.lineTo(0.3, 0.3);
    shape.lineTo(0.25, 0.5);
    shape.lineTo(0.3, 0.7);
    shape.lineTo(0.35, 0.85);
    shape.lineTo(0.3, 1.0);
    shape.lineTo(0.15, 1.05);
    shape.lineTo(0.05, 0.95);
    shape.lineTo(0.0, 0.8);
    shape.lineTo(-0.05, 0.6);
    shape.lineTo(-0.1, 0.4);
    shape.lineTo(-0.15, 0.2);
    shape.lineTo(-0.1, 0.1);
    shape.lineTo(0, 0);

    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial
        color="#F5C518"
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={1}
      />
    </mesh>
  );
}

function BaseGeometry() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.4, 0);
    shape.lineTo(0.4, 0);
    shape.lineTo(0.35, 0.15);
    shape.lineTo(-0.35, 0.15);
    shape.lineTo(-0.4, 0);

    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  return (
    <mesh geometry={geometry} position={[0, -0.05, -0.05]} castShadow>
      <meshStandardMaterial
        color="#F5C518"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function FloatingChessPiece() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.2;
    groupRef.current.rotation.x =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseRef.current.y * 0.15,
        0.05
      );
    groupRef.current.rotation.z =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -mouseRef.current.x * 0.1,
        0.05
      );
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef} scale={1.2} position={[0, 0, 0]}>
        <KnightGeometry />
        <BaseGeometry />
      </group>
    </Float>
  );
}
