import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Text } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// مكون الكرة الواحدة الذي سنقوم بتكراره لكل تقنية
const TechSphere = ({ text, color, position }) => {
    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={position}>
            <mesh castShadow receiveShadow>
                {/* بناء المجسم الكروي */}
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.5} />
                {/* إضافة النص البارز فوق الكرة */}
                <Text
                    position={[0, 0, 1.4]}
                    fontSize={0.4}
                    color="var(--text-primary)"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                >
                    {text}
                </Text>
            </mesh>
        </Float>
    );
};

const Skills = () => {
    const { t } = useTranslation();

    return (
        <section id="skills" style={{ padding: '6rem 5%', minHeight: '100vh', position: 'relative' }}>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{ fontSize: '2.8rem', textAlign: 'center', marginBottom: '2rem', color: 'var(--text-primary)' }}
            >
                {t('skills_title', 'Skills & Technologies')} {/* النص الافتراضي في حال لم تتم إضافته للترجمة بعد */}
            </motion.h2>

            {/* مساحة الـ 3D Canvas للكرات العائمة */}
            <div style={{ height: '70vh', width: '100%', cursor: 'grab' }}>
                <Canvas camera={{ position: [0, 0, 9] }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} intensity={2} color="var(--accent-light)" />
                    {/* أداة التحكم للتدوير */}
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />

                    {/* كرات التقنيات موزعة في الفضاء ثلاثي الأبعاد */}
                    <TechSphere text="React.js" color="rgba(255, 255, 255, 0.2)" position={[-4, 2, 0]} />
                    <TechSphere text="Flutter" color="rgba(255, 255, 255, 0.4)" position={[0, 3, -1]} />
                    <TechSphere text="Python" color="rgba(255, 255, 255, 0.3)" position={[4, 1.5, 0]} />
                    <TechSphere text="Laravel" color="rgba(255, 255, 255, 0.5)" position={[-2.5, -2, 1]} />
                    <TechSphere text="AI" color="var(--accent-dark)" position={[2.5, -2, 0]} />

                </Canvas>
            </div>
        </section>
    );
};

export default Skills;