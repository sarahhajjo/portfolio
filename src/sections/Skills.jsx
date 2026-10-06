import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, PresentationControls, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// --- مكون الشكل المضلع الواحد مع الأيقونة العائمة ---
const SkillPolygon = ({ position, iconPath, baseColor, glowColor }) => {
    const texture = useTexture(iconPath);

    return (
        <group position={position}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1.2}>
                <PresentationControls
                    global={false}
                    cursor={true}
                    snap={true}
                    speed={10}
                    polar={[-Math.PI, Math.PI]}
                    azimuth={[-Math.PI, Math.PI]}
                >
                    <group scale={3.6}>

                        {/* 1. المجسم الأساسي (المسدس) بألوانه المدموجة */}
                        <mesh>
                            <icosahedronGeometry args={[1, 0]} />
                            <meshStandardMaterial
                                color={baseColor}
                                emissive={glowColor || '#000000'}
                                emissiveIntensity={0.3}
                                flatShading={true}
                                roughness={0.3}
                                metalness={0.4}
                            />
                        </mesh>

                        {/* 2. الأيقونة العائمة أمامه (تم تقريبها للمركز لتقف على رأس المجسم تماماً) */}
                        <mesh position={[0, 0, 1.05]}>
                            {/* تم تكبير الأيقونة قليلاً لتعويض بُعد الكاميرا الجديد ولتبدو أجمل */}
                            <planeGeometry args={[1.3, 1.3]} />
                            <meshBasicMaterial
                                map={texture}
                                transparent={true}
                                alphaTest={0.1}
                                side={THREE.DoubleSide}
                            />
                        </mesh>

                    </group>
                </PresentationControls>
            </Float>
        </group>
    );
};

const Skills = () => {
    const programmingLanguages = [
        { pos: [-31, 8, 0], icon: '/icons/c++-removebg-preview.png', color: '#00599C' },
        { pos: [-22, 8, 0], icon: '/icons/java-removebg-preview.png', color: '#E76F00', glowColor: '#5382A1' },
        { pos: [-13, 8, 0], icon: '/icons/python_icon-removebg-preview.png', color: '#306998', glowColor: '#FFD43B' },
        { pos: [-4,  8, 0], icon: '/icons/php-removebg-preview.png', color: '#777BB4' },
        { pos: [4,   8, 0], icon: '/icons/javascript-removebg-preview.png', color: '#F7DF1E' },
        { pos: [13,  8, 0], icon: '/icons/dart-removebg-preview.png', color: '#0175C2', glowColor: '#00B4AB' },
        { pos: [22,  8, 0], icon: '/icons/html-removebg-preview.png', color: '#E34F26' },
        { pos: [31,  8, 0], icon: '/icons/css-removebg-preview.png', color: '#1572B6' }
    ];

    const frameworks = [
        { pos: [-10, -3, 0], icon: '/icons/React-removebg-preview.png', color: '#282C34', glowColor: '#61DAFB' },
        { pos: [0,   -3, 0], icon: '/icons/Flutter-removebg-preview.png', color: '#02569B', glowColor: '#42A5F5' },
        { pos: [10,  -3, 0], icon: '/icons/Laravel-removebg-preview.png', color: '#FF2D20' }
    ];

    const allSkills = [...programmingLanguages, ...frameworks];

    return (
        <section
            id="skills"
            style={{
                padding: '6rem 5%',
                backgroundColor: 'var(--bg-color)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '2rem' }}
            >
                <h2 className="tech-font" style={{ fontSize: '3.5rem', color: 'var(--text-primary)', margin: 0 }}>
                    Skills <span style={{ color: 'var(--accent-light)' }}>&</span> Technologies
                </h2>
            </motion.div>

            <div style={{ width: '100%', height: '70vh', minHeight: '500px' }}>
                {/* 👇 هنا السحر: أرجعنا الكاميرا لـ 190 ووضعنا fov: 10 لتسوية المنظور وتوسيط جميع الأيقونات بدقة متناهية */}
                <Canvas camera={{ position: [0, 0, 190], fov: 10 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                    <pointLight position={[-10, -10, -5]} intensity={1.5} color="#DD99BB" />

                    <Environment preset="city" />

                    <Suspense fallback={null}>
                        {allSkills.map((skill, index) => (
                            <SkillPolygon
                                key={index}
                                position={skill.pos}
                                iconPath={skill.icon}
                                baseColor={skill.color}
                                glowColor={skill.glowColor}
                            />
                        ))}
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};

export default Skills;