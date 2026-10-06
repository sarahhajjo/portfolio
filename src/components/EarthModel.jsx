import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function EarthModel(props) {
    const { scene } = useGLTF('/models/earth/scene.gltf');
    const earthRef = useRef();

    useFrame((state, delta) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <primitive
            ref={earthRef}
            object={scene}
            scale={1.6} // 👈 تم تصغير الحجم هنا لكي لا يخرج عن الحدود
            position={[0, 0, 0]}
            {...props}
        />
    );
}

useGLTF.preload('/models/earth/scene.gltf');