import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import AnimatedBlob from '../components/AnimatedBlob';

const Hero = () => {
    // استدعاء دوال الترجمة ومعرفة اللغة الحالية
    const { t, i18n } = useTranslation();

    // ضبط اتجاه حركة الدخول بناءً على اللغة (RTL/LTR)
    const slideDirection = i18n.language === 'ar' ? 50 : -50;

    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 5%',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* قسم النصوص */}
            <div style={{ flex: 1, zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, x: slideDirection }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 style={{ fontSize: '3.8rem', marginBottom: '1rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                        {t('greeting')} {t('name')}
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, x: slideDirection }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '500px',
                        lineHeight: '1.8',
                        marginBottom: '2.5rem',
                        fontWeight: '500'
                    }}
                >
                    {t('role')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                    style={{ display: 'flex', gap: '1rem' }}
                >
                    <button className="btn-primary">{t('view_projects')}</button>
                    <button className="btn-outline">{t('contact_me')}</button>
                </motion.div>
            </div>

            {/* قسم الـ 3D Canvas */}
            <div style={{ flex: 1, height: '600px', cursor: 'grab' }}>
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[3, 2, 1]} intensity={2} color="#ffffff" />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                    <AnimatedBlob />
                </Canvas>
            </div>
        </section>
    );
};

export default Hero;