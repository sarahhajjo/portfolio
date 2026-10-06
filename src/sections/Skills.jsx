import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, PresentationControls, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';

// --- مكون الشكل المضلع الواحد مع الأيقونة العائمة ---
const SkillPolygon = ({ position, iconPath, baseColor, glowColor, isMobile }) => {
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
                    {/* 👇 تم تكبير الحجم في الموبايل إلى 3.2 ليظهروا بشكل بارز وواضح */}
                    <group scale={isMobile ? 6.6 : 3.6}>
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
                        <mesh position={[0, 0, 1.05]}>
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
    const { i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 850);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 👇 تم إبعادهم عن بعض (14 بدلاً من 12) لاستيعاب الحجم الجديد الضخم
    const programmingLanguages = [
        { pos: isMobile ? [-14, 20, 0] : [-31, 8, 0], icon: '/icons/c++-removebg-preview.png', color: '#00599C' },
        { pos: isMobile ? [0, 20, 0]   : [-22, 8, 0], icon: '/icons/java-removebg-preview.png', color: '#E76F00', glowColor: '#5382A1' },
        { pos: isMobile ? [14, 20, 0]  : [-13, 8, 0], icon: '/icons/python_icon-removebg-preview.png', color: '#306998', glowColor: '#FFD43B' },

        { pos: isMobile ? [-14, 6, 0]  : [-4,  8, 0], icon: '/icons/php-removebg-preview.png', color: '#777BB4' },
        { pos: isMobile ? [0, 6, 0]    : [4,   8, 0], icon: '/icons/javascript-removebg-preview.png', color: '#F7DF1E' },
        { pos: isMobile ? [14, 6, 0]   : [13,  8, 0], icon: '/icons/dart-removebg-preview.png', color: '#0175C2', glowColor: '#00B4AB' },

        { pos: isMobile ? [-14, -8, 0] : [22,  8, 0], icon: '/icons/html-removebg-preview.png', color: '#E34F26' },
        { pos: isMobile ? [0, -8, 0]   : [31,  8, 0], icon: '/icons/css-removebg-preview.png', color: '#1572B6' }
    ];

    const frameworks = [
        { pos: isMobile ? [14, -8, 0]   : [-10, -3, 0], icon: '/icons/React-removebg-preview.png', color: '#282C34', glowColor: '#61DAFB' },
        { pos: isMobile ? [-7, -22, 0]  : [0,   -3, 0], icon: '/icons/Flutter-removebg-preview.png', color: '#02569B', glowColor: '#42A5F5' },
        { pos: isMobile ? [7, -22, 0]   : [10,  -3, 0], icon: '/icons/Laravel-removebg-preview.png', color: '#FF2D20' }
    ];

    const allSkills = [...programmingLanguages, ...frameworks];

    return (
        <section
            id="skills"
            style={{
                padding: isMobile ? '3rem 5%' : '6rem 5%',
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
                style={{ textAlign: 'center', marginBottom: isMobile ? '1rem' : '2rem', direction: isAr ? 'rtl' : 'ltr' }}
            >
                <h2 className="tech-font" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--text-primary)', margin: 0 }}>
                    {isAr ? (
                        <>المهارات <span style={{ color: 'var(--accent-light)' }}>و</span> التقنيات</>
                    ) : (
                        <>Skills <span style={{ color: 'var(--accent-light)' }}>&</span> Technologies</>
                    )}
                </h2>
            </motion.div>

            <div style={{ width: '100%', height: isMobile ? '65vh' : '70vh', minHeight: '550px' }}>

                {/* 👇 الكاميرا تم توسيعها قليلاً لتتسع للحجم الجديد دون أن يتم قص أطرافها */}
                <Canvas camera={{ position: [0, isMobile ? 1 : 0, 190], fov: isMobile ? 24 : 10 }}>
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
                                isMobile={isMobile}
                            />
                        ))}
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};

export default Skills;