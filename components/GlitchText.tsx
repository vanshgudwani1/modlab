'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="relative z-10">{text}</span>

            {/* Glitch Layer 1 - Cyan */}
            <motion.span
                className="absolute top-0 left-0 -z-10 text-cyan-400 opacity-70 mix-blend-screen"
                animate={isHovered ? {
                    x: [-2, 2, -1, 0],
                    y: [1, -1, 0],
                    clipPath: ['inset(0 0 0 0)', 'inset(20% 0 80% 0)', 'inset(0 0 0 0)']
                } : { x: 0, y: 0 }}
                transition={{ repeat: Infinity, duration: 0.2, repeatType: "mirror" }}
            >
                {text}
            </motion.span>

            {/* Glitch Layer 2 - Magenta */}
            <motion.span
                className="absolute top-0 left-0 -z-10 text-pink-500 opacity-70 mix-blend-multiply"
                animate={isHovered ? {
                    x: [2, -2, 1, 0],
                    y: [-1, 1, 0],
                    clipPath: ['inset(0 0 0 0)', 'inset(80% 0 20% 0)', 'inset(0 0 0 0)']
                } : { x: 0, y: 0 }}
                transition={{ repeat: Infinity, duration: 0.3, repeatType: "mirror" }}
            >
                {text}
            </motion.span>
        </div>
    );
}
