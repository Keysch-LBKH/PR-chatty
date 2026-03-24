import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TerrainWireframe() {
  const meshRef = useRef();
  
  const geometry = useMemo(() => {
    // Create a dense grid geometry
    const geo = new THREE.PlaneGeometry(100, 100, 60, 60);
    geo.rotateX(-Math.PI / 2); // Lay flat
    
    // Create topography with sine waves
    const pos = geo.attributes.position;
    for(let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const y = Math.sin(x * 0.2) * 2 + Math.cos(z * 0.2) * 2 + Math.sin(x * 0.05 + z * 0.05) * 5;
        pos.setY(i, y);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    const { pointer, clock } = state;
    if (meshRef.current) {
        // Move terrain towards the camera
        meshRef.current.position.z = (clock.elapsedTime * 2) % 10;
        
        // Tilt slightly based on mouse/touch pointer
        const targetRotZ = pointer.x * 0.2;
        const targetRotX = pointer.y * 0.1;
        
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotZ, 0.05);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -10, 0]}>
      <meshBasicMaterial 
        color="#00A8A8" 
        wireframe={true} 
        transparent={true}
        opacity={0.4}
      />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full pointer-events-auto">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        <fog attach="fog" args={['#121212', 10, 50]} />
        <ambientLight intensity={0.5} />
        <TerrainWireframe />
      </Canvas>
    </div>
  );
}
