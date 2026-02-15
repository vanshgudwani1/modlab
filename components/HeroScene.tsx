'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, TorusKnot } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

function AnimatedKnot() {
    const ref = useRef<Group>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group ref={ref}>
                <TorusKnot args={[1, 0.3, 128, 16]}>
                    <MeshDistortMaterial
                        color="#00ffff"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0}
                        metalness={1}
                        wireframe
                    />
                </TorusKnot>
                {/* Inner solid core for better visibility */}
                <TorusKnot args={[1, 0.3, 128, 16]} scale={0.9}>
                    <meshBasicMaterial color="#ec008c" wireframe={false} opacity={0.1} transparent />
                </TorusKnot>
            </group>
        </Float>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60 overflow-hidden">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} resize={{ scroll: false }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <AnimatedKnot />
            </Canvas>
        </div>
    );
}
