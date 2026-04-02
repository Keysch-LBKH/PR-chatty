import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// ─── Graph data ────────────────────────────────────────────────────────────────
// Node types: 'doc' (source documents), 'topic' (AI-derived topics),
//             'question' (community questions), 'answer' (AI answers)
const GRAPH_DATA = {
  nodes: [
    // Central hub
    { id: 'hub', label: 'LBKH Liaison', type: 'hub', x: 0, y: 0, z: 0 },

    // Source documents
    { id: 'doc1', label: 'Environmental Impact Report', type: 'doc', x: -6, y: 2, z: -3 },
    { id: 'doc2', label: 'Traffic Study 2024', type: 'doc', x: 5, y: 3, z: -4 },
    { id: 'doc3', label: 'Community Benefit Agreement', type: 'doc', x: -5, y: -3, z: 2 },
    { id: 'doc4', label: 'NEPA Compliance Filing', type: 'doc', x: 6, y: -2, z: 3 },
    { id: 'doc5', label: 'Public Meeting Transcript', type: 'doc', x: 0, y: 5, z: -5 },
    { id: 'doc6', label: 'Noise Mitigation Plan', type: 'doc', x: -3, y: -5, z: -2 },

    // Topics
    { id: 'topic1', label: 'Traffic & Access', type: 'topic', x: 3, y: 1, z: -1 },
    { id: 'topic2', label: 'Environmental', type: 'topic', x: -3, y: 1, z: -1 },
    { id: 'topic3', label: 'Community Impact', type: 'topic', x: 0, y: -3, z: 1 },
    { id: 'topic4', label: 'Noise & Vibration', type: 'topic', x: -1, y: 3, z: 2 },
    { id: 'topic5', label: 'Jobs & Economy', type: 'topic', x: 4, y: -1, z: -2 },

    // Questions
    { id: 'q1', label: 'Will construction close Main St?', type: 'question', x: 5, y: 2, z: 1 },
    { id: 'q2', label: 'What are the noise hours?', type: 'question', x: -2, y: 4, z: 3 },
    { id: 'q3', label: 'How many local jobs created?', type: 'question', x: 6, y: -3, z: 0 },
    { id: 'q4', label: 'Is the water supply affected?', type: 'question', x: -6, y: 0, z: 1 },
    { id: 'q5', label: 'When does Phase 2 begin?', type: 'question', x: 1, y: -5, z: -3 },
    { id: 'q6', label: 'Who do I contact with concerns?', type: 'question', x: -4, y: 2, z: 4 },

    // Answers
    { id: 'a1', label: 'Answered · Traffic Study §4.2', type: 'answer', x: 7, y: 1, z: 2 },
    { id: 'a2', label: 'Answered · Noise Plan §2.1', type: 'answer', x: -1, y: 5, z: 4 },
    { id: 'a3', label: 'Answered · CBA §7', type: 'answer', x: 7, y: -4, z: 1 },
    { id: 'a4', label: 'Answered · EIR §9.3', type: 'answer', x: -7, y: -1, z: 2 },
  ],
  edges: [
    // Hub to topics
    { source: 'hub', target: 'topic1' },
    { source: 'hub', target: 'topic2' },
    { source: 'hub', target: 'topic3' },
    { source: 'hub', target: 'topic4' },
    { source: 'hub', target: 'topic5' },

    // Docs to topics
    { source: 'doc2', target: 'topic1' },
    { source: 'doc1', target: 'topic2' },
    { source: 'doc3', target: 'topic3' },
    { source: 'doc6', target: 'topic4' },
    { source: 'doc4', target: 'topic2' },
    { source: 'doc5', target: 'topic3' },
    { source: 'doc5', target: 'topic4' },

    // Topics to questions
    { source: 'topic1', target: 'q1' },
    { source: 'topic4', target: 'q2' },
    { source: 'topic5', target: 'q3' },
    { source: 'topic2', target: 'q4' },
    { source: 'topic3', target: 'q5' },
    { source: 'topic3', target: 'q6' },

    // Questions to answers
    { source: 'q1', target: 'a1' },
    { source: 'q2', target: 'a2' },
    { source: 'q3', target: 'a3' },
    { source: 'q4', target: 'a4' },
  ],
};

// ─── Node config ───────────────────────────────────────────────────────────────
const NODE_CONFIG = {
  hub:      { color: '#4BE3CF', emissive: '#00A8A8', size: 0.55, ringColor: '#4BE3CF' },
  doc:      { color: '#7C6FFF', emissive: '#4B3FCC', size: 0.32, ringColor: '#7C6FFF' },
  topic:    { color: '#00D4FF', emissive: '#007799', size: 0.28, ringColor: '#00D4FF' },
  question: { color: '#FF9F43', emissive: '#CC6600', size: 0.22, ringColor: '#FF9F43' },
  answer:   { color: '#26de81', emissive: '#0A8A3A', size: 0.20, ringColor: '#26de81' },
};

// ─── Edge line component ───────────────────────────────────────────────────────
function EdgeLine({ start, end, color = '#4BE3CF', opacity = 0.25 }) {
  const ref = useRef();
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ], [start, end]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = opacity + Math.sin(clock.elapsedTime * 0.8) * 0.05;
    }
  });

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} linewidth={1} />
    </line>
  );
}

// ─── Single node component ─────────────────────────────────────────────────────
function GraphNode({ node, isHovered, onHover, onUnhover }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const cfg = NODE_CONFIG[node.type] || NODE_CONFIG.topic;
  const isHub = node.type === 'hub';

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;

    // Gentle float
    meshRef.current.position.y = node.y + Math.sin(t * 0.6 + node.id.length) * 0.12;

    // Pulse scale on hover
    const targetScale = isHovered ? 1.5 : 1.0;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
    );

    // Hub slow rotation
    if (isHub) {
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = t * 0.15;
    }

    // Ring pulse
    if (ringRef.current) {
      const ringScale = 1 + Math.sin(t * 1.2 + node.id.length * 0.5) * 0.08;
      ringRef.current.scale.setScalar(ringScale);
      ringRef.current.material.opacity = isHovered ? 0.7 : 0.25;
    }
  });

  return (
    <group position={[node.x, node.y, node.z]}>
      {/* Main sphere */}
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => { e.stopPropagation(); onHover(node); }}
        onPointerLeave={(e) => { e.stopPropagation(); onUnhover(); }}
      >
        <sphereGeometry args={[cfg.size, isHub ? 32 : 20, isHub ? 32 : 20]} />
        <meshStandardMaterial
          color={cfg.color}
          emissive={cfg.emissive}
          emissiveIntensity={isHovered ? 1.2 : 0.6}
          roughness={0.2}
          metalness={0.7}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Orbit ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[cfg.size * 1.6, 0.015, 8, 48]} />
        <meshBasicMaterial color={cfg.ringColor} transparent opacity={0.25} />
      </mesh>

      {/* Hover label */}
      {isHovered && (
        <Html
          center
          distanceFactor={12}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div style={{
            background: 'rgba(10, 15, 25, 0.92)',
            border: `1px solid ${cfg.color}55`,
            borderLeft: `3px solid ${cfg.color}`,
            borderRadius: '6px',
            padding: '6px 12px',
            color: '#fff',
            fontSize: '11px',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            boxShadow: `0 0 16px ${cfg.color}33`,
            transform: 'translateY(-28px)',
          }}>
            <span style={{ color: cfg.color, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
              {node.type}
            </span>
            {node.label}
          </div>
        </Html>
      )}
    </group>
  );
}

// ─── Particle field (ambient depth) ───────────────────────────────────────────
function ParticleField() {
  const ref = useRef();
  const count = 280;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.015;
      ref.current.rotation.x = clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#4BE3CF" size={0.04} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

// ─── Scene root ────────────────────────────────────────────────────────────────
function GraphScene({ onHoverNode }) {
  const [hoveredId, setHoveredId] = useState(null);
  const { camera } = useThree();
  const groupRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Mouse tracking for camera drift
  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;

    // Slow auto-rotation
    groupRef.current.rotation.y = t * 0.04 + mouseRef.current.x * 0.15;
    groupRef.current.rotation.x = mouseRef.current.y * 0.08;

    // Camera gentle bob
    camera.position.y = 1 + Math.sin(t * 0.25) * 0.4;
  });

  // Build edge positions from node map
  const nodeMap = useMemo(() => {
    const m = {};
    GRAPH_DATA.nodes.forEach(n => { m[n.id] = n; });
    return m;
  }, []);

  const handleHover = useCallback((node) => {
    setHoveredId(node.id);
    onHoverNode && onHoverNode(node);
  }, [onHoverNode]);

  const handleUnhover = useCallback(() => {
    setHoveredId(null);
    onHoverNode && onHoverNode(null);
  }, [onHoverNode]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#4BE3CF" />
      <pointLight position={[-10, -5, -10]} intensity={0.6} color="#7C6FFF" />
      <pointLight position={[0, 15, 0]} intensity={0.4} color="#ffffff" />
      <fog attach="fog" args={['#080C14', 18, 45]} />

      <ParticleField />

      <group ref={groupRef}>
        {/* Edges */}
        {GRAPH_DATA.edges.map((edge, i) => {
          const src = nodeMap[edge.source];
          const tgt = nodeMap[edge.target];
          if (!src || !tgt) return null;
          const srcCfg = NODE_CONFIG[src.type] || NODE_CONFIG.topic;
          return (
            <EdgeLine
              key={i}
              start={[src.x, src.y, src.z]}
              end={[tgt.x, tgt.y, tgt.z]}
              color={srcCfg.color}
              opacity={hoveredId === src.id || hoveredId === tgt.id ? 0.55 : 0.18}
            />
          );
        })}

        {/* Nodes */}
        {GRAPH_DATA.nodes.map(node => (
          <GraphNode
            key={node.id}
            node={node}
            isHovered={hoveredId === node.id}
            onHover={handleHover}
            onUnhover={handleUnhover}
          />
        ))}
      </group>
    </>
  );
}

// ─── Legend overlay ────────────────────────────────────────────────────────────
function GraphLegend() {
  const items = [
    { color: '#7C6FFF', label: 'Source Document' },
    { color: '#00D4FF', label: 'Topic Cluster' },
    { color: '#FF9F43', label: 'Community Question' },
    { color: '#26de81', label: 'AI Answer' },
  ];
  return (
    <div style={{
      position: 'absolute',
      bottom: '24px',
      left: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      pointerEvents: 'none',
    }}>
      {items.map(item => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: item.color, boxShadow: `0 0 6px ${item.color}`,
          }} />
          <span style={{
            color: 'rgba(255,255,255,0.55)', fontSize: '11px',
            fontFamily: 'system-ui, sans-serif', letterSpacing: '0.04em',
          }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Exports ───────────────────────────────────────────────────────────────────
export default function KnowledgeGraph3D({ onHoverNode }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1, 22], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <GraphScene onHoverNode={onHoverNode} />
      </Canvas>
      <GraphLegend />
    </div>
  );
}
