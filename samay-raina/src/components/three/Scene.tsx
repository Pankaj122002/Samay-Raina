"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import FloatingChessPiece from "./FloatingChessPiece";
import ParticleField from "./ParticleField";

export default function Scene() {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#080808] via-[#0f0f0f] to-[#080808]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#F5C518_0%,transparent_70%)]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#F5C518" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#E91E8C" />
          <FloatingChessPiece />
          <ParticleField count={150} />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
