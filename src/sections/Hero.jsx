import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ImageReveal from '../components/ImageReveal';

// --- زر Neon Equalizer ---
const BAR_COUNT = 22;
const SIGMA = 0.16;
const MAX_BOOST = 0.75;

const NeonEqualizerButton = ({ text }) => { // 👈 يستقبل النص كمتغير للترجمة
    const btnRef = useRef(null);
    const barsRef = useRef([]);
    const pointerRef = useRef({ x: 0.5, y: 0.5, influence: 0, target: 0 });

    const barPropsRef = useRef(
        Array.from({ length: BAR_COUNT }, (_, i) => ({
            x: i / (BAR_COUNT - 1),
            restBase: 0.08 + Math.random() * 0.10,
            idleAmp: 0.10 + Math.random() * 0.15,
            idleSpeed: 0.6 + Math.random() * 1.2,
            idlePhase: Math.random() * Math.PI * 2,
        }))
    );

    useEffect(() => {
        const btn = btnRef.current;
        let rafId;

        const updatePointer = (clientX, clientY) => {
            const rect = btn.getBoundingClientRect();
            const p = pointerRef.current;
            p.x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
            p.y = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
            p.target = 1;
        };
        const clearPointer = () => { pointerRef.current.target = 0; };

        const onMouseMove = (e) => updatePointer(e.clientX, e.clientY);
        const onTouchMove = (e) => {
            const t = e.touches[0];
            if (t) updatePointer(t.clientX, t.clientY);
        };
        const onTouchStart = (e) => {
            const t = e.touches[0];
            if (t) updatePointer(t.clientX, t.clientY);
        };

        btn.addEventListener('mousemove', onMouseMove);
        btn.addEventListener('mouseleave', clearPointer);
        btn.addEventListener('touchmove', onTouchMove, { passive: true });
        btn.addEventListener('touchstart', onTouchStart, { passive: true });
        btn.addEventListener('touchend', clearPointer);

        const loop = () => {
            const t = performance.now() / 1000;
            const p = pointerRef.current;
            p.influence += (p.target - p.influence) * 0.08;
            const verticalFactor = 0.6 + (1 - p.y) * 0.6;

            barPropsRef.current.forEach((bp, i) => {
                const idle = bp.restBase + bp.idleAmp * (0.5 + 0.5 * Math.sin(t * bp.idleSpeed + bp.idlePhase));
                const dx = bp.x - p.x;
                const gauss = Math.exp(-(dx * dx) / (2 * SIGMA * SIGMA));
                const boost = MAX_BOOST * gauss * p.influence * verticalFactor;
                const scale = Math.min(1, idle + boost);
                const el = barsRef.current[i];
                if (el) el.style.transform = `scaleY(${scale.toFixed(3)})`;
            });

            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        return () => {
            btn.removeEventListener('mousemove', onMouseMove);
            btn.removeEventListener('mouseleave', clearPointer);
            btn.removeEventListener('touchmove', onTouchMove);
            btn.removeEventListener('touchstart', onTouchStart);
            btn.removeEventListener('touchend', clearPointer);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <button className="btn-neon-equalizer" ref={btnRef}>
            <span className="btn-text">{text}</span>
            <div className="equalizer-container">
                {barPropsRef.current.map((_, i) => (
                    <span
                        key={i}
                        className="bar"
                        ref={(el) => (barsRef.current[i] = el)}
                    ></span>
                ))}
            </div>
        </button>
    );
};

// --- أيقونة ملف PDF ---
const PdfIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <text x="7.5" y="17" fontSize="6.5" fontWeight="900" stroke="none" fill="currentColor" fontFamily="sans-serif">PDF</text>
    </svg>
);

// --- زر التحميل (اللون الموف + تقبل الترجمة كـ props) ---
const VideoStyleDownloadButton = ({ cvUrl = '/cv.pdf', label, successLabel }) => {
    const [status, setStatus] = useState('idle');
    const linkRef = useRef(null);

    const handleClick = () => {
        if (status !== 'idle') return;

        setStatus('animating');

        setTimeout(() => {
            setStatus('success');
            linkRef.current?.click();

            setTimeout(() => {
                setStatus('idle');
            }, 2500);

        }, 2000);
    };

    return (
        <div style={{ position: 'relative' }}>
            <motion.button
                onClick={handleClick}
                initial="idle"
                animate={status}
                variants={{
                    idle: {
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        boxShadow: '0px 0px 0px transparent',
                        backgroundColor: 'transparent',
                        color: '#ffffff'
                    },
                    animating: {
                        borderColor: '#A855F7',
                        boxShadow: '0px 0px 20px rgba(168, 85, 247, 0.6)',
                        backgroundColor: 'transparent',
                        color: '#A855F7'
                    },
                    success: {
                        borderColor: '#A855F7',
                        boxShadow: '0px 0px 25px rgba(168, 85, 247, 0.8)',
                        backgroundColor: 'rgba(168, 85, 247, 0.1)',
                        color: '#A855F7'
                    }
                }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'relative',
                    width: '240px',
                    height: '52px',
                    borderRadius: '26px',
                    border: '2px solid',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontFamily: 'Space Mono, monospace',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    letterSpacing: '1px',
                    padding: 0,
                    outline: 'none',
                    overflow: 'hidden'
                }}
            >
                {/* النص الافتراضي (مترجم) */}
                <motion.span
                    variants={{
                        idle: { opacity: 1, y: 0 },
                        animating: { opacity: 0, y: -10 },
                        success: { opacity: 0, y: 10 }
                    }}
                    style={{ position: 'absolute' }}
                >
                    {label}
                </motion.span>

                {/* طبقة الحركة */}
                <motion.div
                    variants={{
                        idle: { opacity: 0 },
                        animating: { opacity: 1 },
                        success: { opacity: 0 }
                    }}
                    style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                    {/* الملف */}
                    <motion.div
                        animate={status === 'animating' ? { y: [-1, 2, -1] } : { y: 0 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                        style={{ color: '#A855F7', zIndex: 2, marginBottom: '2px' }}
                    >
                        <PdfIcon />
                    </motion.div>

                    {/* الطريق المتحرك الموف */}
                    <div style={{ width: '60%', height: '2px' }}>
                        <motion.div
                            animate={status === 'animating' ? { backgroundPosition: ["0px 0px", "-20px 0px"] } : { backgroundPosition: "0px 0px" }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 0.3 }}
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: 'repeating-linear-gradient(to right, #A855F7 0, #A855F7 10px, transparent 10px, transparent 20px)'
                            }}
                        />
                    </div>
                </motion.div>

                {/* نص النجاح (مترجم) */}
                <motion.span
                    variants={{
                        idle: { opacity: 0, scale: 0.8 },
                        animating: { opacity: 0, scale: 0.8 },
                        success: { opacity: 1, scale: 1 }
                    }}
                    style={{ position: 'absolute', textShadow: '0 0 8px rgba(168, 85, 247, 0.8)' }}
                >
                    {successLabel}
                </motion.span>
            </motion.button>

            <a ref={linkRef} href={cvUrl} download style={{ display: 'none' }}>cv</a>
        </div>
    );
};

// --- مكون الأحرف المتحركة (تم إضافة حماية للغة العربية) ---
const AnimatedText = ({ text, baseDelay = 0, isArabic }) => {
    // 👈 لحماية الخطوط المتصلة العربية، نمرر الكلمة ككتلة واحدة إذا كانت عربية، ونقطعها حروفاً في الإنجليزية
    const items = isArabic ? [text] : Array.from(text);
    const total = items.length;

    return (
        <span style={{ display: 'inline-block' }}>
            {items.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: baseDelay + ((total - 1 - index) * 0.05), ease: "easeOut" }}
                    whileHover={{ scale: 1.25, color: '#A855F7', textShadow: '0px 0px 12px rgba(168, 85, 247, 0.8)', transition: { duration: 0.1 } }}
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal', cursor: 'default' }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};
const Hero = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';
    const slideDirection = isAr ? 50 : -50;

    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                // التعديل الأول: الهامش يصبح 5% من اليمين في العربي، و5% من اليسار في الإنجليزي
                padding: isAr ? '0 5% 0 0' : '0 0 0 5%',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '-80px' }}>

                <div style={{ flex: 1, zIndex: 2 }}>
                    <motion.div initial={{ opacity: 0, x: slideDirection }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                        <p className="tech-font" style={{ color: 'var(--text-secondary)', fontSize: '1rem', letterSpacing: '2px', marginBottom: '1rem' }}>
                            {t('greeting')} {t('name')}
                        </p>
                        <h1 className="tech-font" style={{ fontSize: '4.5rem', margin: '0 0 1.5rem 0', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.1' }}>
                            <div>
                                <AnimatedText text={t('title_1')} baseDelay={0.1} isArabic={isAr} />
                            </div>
                            <div>
                                <AnimatedText text={t('title_2')} baseDelay={0.4} isArabic={isAr} />

                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 0.7 }}
                                    style={{ color: '#A855F7' }}
                                >
                                    _
                                </motion.span>
                            </div>
                        </h1>
                    </motion.div>

                    <motion.p initial={{ opacity: 0, x: slideDirection }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }} className="tech-font" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                        {t('role')}
                    </motion.p>

                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <NeonEqualizerButton text={t('view_projects')} />
                        <VideoStyleDownloadButton label={t('download_cv')} successLabel={t('downloaded')} />
                    </motion.div>
                </div>

                {/* التعديل الثاني: عكسنا إزاحة الصورة للجهة المعاكسة في اللغة العربية لكي لا تقترب كثيراً من حافة الشاشة اليسرى */}
                <div style={{
                    flex: 1.2,
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    zIndex: 0,
                    paddingTop: '60px',
                    ...(isAr
                            ? { paddingLeft: '0', marginLeft: '2%', transform: 'translateX(40px)' }
                            : { paddingRight: '0', marginRight: '2%', transform: 'translateX(-40px)' }
                    )
                }}>
                    <ImageReveal />
                </div>
            </div>
        </section>
    );
};

export default Hero;
