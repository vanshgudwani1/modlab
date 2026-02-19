'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

function Model(props: any) {
    const { scene } = useGLTF('/models/goku.glb');
    const ref = useRef<Group>(null);

    useFrame((state) => {
        if (ref.current) {
            // Get base rotation from props (Y axis is index 1), default to 0
            const rotationProp = props.rotation as [number, number, number] | undefined;
            const baseY = rotationProp ? rotationProp[1] : 0;

            // Gentle swaying motion (Left <-> Right)
            // Math.sin(time * speed) * amplitude
            ref.current.rotation.y = baseY + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
        }
    });

    return (
        <group ref={ref} {...props} dispose={null}>
            <primitive object={scene} />
        </group>
    );
}

function ResponsiveModel() {
    const { viewport } = useThree();
    const isMobile = viewport.width < 5; // Adjust threshold based on testing

    // Desktop: Scale 2.5, Position [1.7, -0.7, 1]
    // Mobile: Scale 1.8, Position [0, -2.5, 0] (Lower & Centered)
    const scale = isMobile ? 1.8 : 2.5;
    const position: [number, number, number] = isMobile ? [0, -2.2, 0] : [1.7, -0.7, 1];

    return (
        <Float speed={2} rotationIntensity={0.05} floatIntensity={0.1} floatingRange={[-0.02, 0.02]}>
            <Model position={position} scale={scale} rotation={[0, 4.4, 0]} />
        </Float>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 h-[600px] md:h-full w-full pointer-events-none">
            {/* Move camera back to capture more width (z: 8) and slightly up (y: 0.5) */}
            <Canvas camera={{ position: [0, 0.5, 8], fov: 35 }}>
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.2} castShadow />
                <pointLight position={[-10, 0, -10]} intensity={1.5} color="#00ffff" />
                <pointLight position={[10, 5, -5]} intensity={1.5} color="#ec008c" />

                <ResponsiveModel />

                <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.5} far={10} color="#000000" />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}

useGLTF.preload('/models/goku.glb');
