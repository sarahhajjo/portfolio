import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';

// 1. مكون الروبوت الدوار
const OrbitingRobot = () => {
    // قراءة ملف الروبوت
    const { scene } = useGLTF('/models/robot/scene.gltf');
    const orbitRef = useRef();

    // تحريك الروبوت بشكل دائري مستمر
    useFrame((state, delta) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y += delta * 0.6; // التحكم بسرعة الدوران
        }
    });

    return (
        <group ref={orbitRef}>
            <primitive
                object={scene}
                position={[15, 1, 0]} // تصغير المدى الدائري ليظل الروبوت في منتصف الشاشة تماماً
                scale={5}
            />
        </group>
    );
};

// 2. المكون الأساسي (الكمبيوتر الوردي مع الروبوت)
export default function PinkComputer(props) {
    const { scene: computerScene } = useGLTF('/models/pink_computer.glb');

    return (
        <Float
            speed={2.5}
            rotationIntensity={1}
            floatIntensity={2}
        >
            {/* وضعنا الكمبيوتر والروبوت في نفس المجموعة (group) ليكون المركز واحداً */}
            <group position={[1, -1, 0.5]}>

                {/* مجسم الكمبيوتر الوردي */}
                <primitive
                    object={computerScene}
                    scale={120}
                    {...props}
                />

                {/* استدعاء مجسم الروبوت */}
                <OrbitingRobot />

            </group>
        </Float>
    );
}

// التحميل المسبق للملفات لتجنب الشاشة البيضاء
useGLTF.preload('/models/pink_computer.glb');
useGLTF.preload('/models/robot/scene.gltf');