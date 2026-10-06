import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ImageReveal from '../components/ImageReveal';

// --- زر Neon Equalizer ---
const BAR_COUNT = 22;
const SIGMA = 0.16;
const MAX_BOOST = 0.75;

// 👇 التعديل الأول: إضافة onClick هنا لاستقبال حدث الضغط
const NeonEqualizerButton = ({ text, onClick }) => {
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
        // 👇 ربط الـ onClick بالزر الفعلي هنا
        <button className="btn-neon-equalizer" ref={btnRef} onClick={onClick} style={{ flexShrink: 0, minWidth: '180px' }}>
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

// --- زر التحميل ---
const VideoStyleDownloadButton = ({ cvUrl = '/Sarah_Hajjo_CV.pdf', label, successLabel }) => {
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
        <div style={{ position: 'relative', flexShrink: 0 }}>
            <motion.button
                onClick={handleClick}
                initial="idle"
                animate={status}
                variants={{
                    idle: {
                        borderColor: 'rgba(234, 215, 209, 0.4)',
                        boxShadow: '0px 0px 0px transparent',
                        backgroundColor: 'transparent',
                        color: '#EAD7D1'
                    },
                    animating: {
                        borderColor: '#DD99BB',
                        boxShadow: '0px 0px 20px rgba(221, 153, 187, 0.6)',
                        backgroundColor: 'transparent',
                        color: '#DD99BB'
                    },
                    success: {
                        borderColor: '#DD99BB',
                        boxShadow: '0px 0px 25px rgba(221, 153, 187, 0.8)',
                        backgroundColor: 'rgba(221, 153, 187, 0.1)',
                        color: '#DD99BB'
                    }
                }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'relative',
                    width: '220px',
                    height: '52px',
                    borderRadius: '26px',
                    border: '2px solid',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontFamily: 'Space Mono, monospace',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                    padding: 0,
                    outline: 'none',
                    overflow: 'hidden'
                }}
            >
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

                <motion.div
                    variants={{
                        idle: { opacity: 0 },
                        animating: { opacity: 1 },
                        success: { opacity: 0 }
                    }}
                    style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                    <motion.div
                        animate={status === 'animating' ? { y: [-1, 2, -1] } : { y: 0 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                        style={{ color: '#DD99BB', zIndex: 2, marginBottom: '2px' }}
                    >
                        <PdfIcon />
                    </motion.div>

                    <div style={{ width: '60%', height: '2px' }}>
                        <motion.div
                            animate={status === 'animating' ? { backgroundPosition: ["0px 0px", "-20px 0px"] } : { backgroundPosition: "0px 0px" }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 0.3 }}
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: 'repeating-linear-gradient(to right, #DD99BB 0, #DD99BB 10px, transparent 10px, transparent 20px)'
                            }}
                        />
                    </div>
                </motion.div>

                <motion.span
                    variants={{
                        idle: { opacity: 0, scale: 0.8 },
                        animating: { opacity: 0, scale: 0.8 },
                        success: { opacity: 1, scale: 1 }
                    }}
                    style={{ position: 'absolute', textShadow: '0 0 8px rgba(221, 153, 187, 0.8)' }}
                >
                    {successLabel}
                </motion.span>
            </motion.button>

            <a ref={linkRef} href={cvUrl} download style={{ display: 'none' }}>cv</a>
        </div>
    );
};

// --- مكون الأحرف المتحركة ---
const AnimatedText = ({ text, baseDelay = 0, isArabic }) => {
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
                    whileHover={{ scale: 1.25, color: 'var(--accent-light)', textShadow: '0px 0px 12px rgba(221, 153, 187, 0.8)', transition: { duration: 0.1 } }}
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

    // 👇 دالة التنقل السلس إلى قسم المشاريع
    const handleScrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <style>{`
                .hero-layout {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    max-width: 100vw;
                    padding: 0 5%;
                    margin-top: -80px;
                    box-sizing: border-box;
                }
                .hero-text-section { 
                    flex: 1; 
                    z-index: 2; 
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    box-sizing: border-box;
                }
                .hero-image-section { 
                    flex: 1.2; 
                    height: 100vh; 
                    display: flex; 
                    align-items: center; 
                    justify-content: flex-end; 
                    z-index: 0; 
                    padding-top: 60px; 
                    box-sizing: border-box;
                }
                .hero-buttons { 
                    display: flex; 
                    gap: 1rem; 
                    align-items: center; 
                    flex-wrap: wrap; 
                }
                
                @media (max-width: 950px) {
                    .hero-layout { 
                        flex-direction: column; 
                        text-align: center; 
                        margin-top: 100px; 
                        padding: 0 15px; 
                        overflow-x: hidden;
                    }
                    .hero-text-section {
                        align-items: center; 
                        width: 100%;
                    }
                    .hero-image-section { 
                        height: 40vh; 
                        justify-content: center; 
                        padding-top: 20px; 
                        width: 100%; 
                    }
                    .hero-buttons { 
                        justify-content: center; 
                        margin-top: 1rem; 
                        width: 100%;
                    }
                }
            `}</style>

            <div className="hero-layout" style={{ direction: isAr ? 'rtl' : 'ltr' }}>

                {/* --- الجزء الأيسر: النصوص والأزرار --- */}
                <div className="hero-text-section">
                    <motion.div
                        initial={{ opacity: 0, x: slideDirection }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ width: '100%' }}
                    >
                        <p className="tech-font" style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 3vw, 1rem)', letterSpacing: '2px', marginBottom: '1rem' }}>
                            {t('greeting')} {t('name')}
                        </p>
                        <h1 className="tech-font" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', margin: '0 0 1.5rem 0', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.1' }}>
                            <div>
                                <AnimatedText text={t('title_1')} baseDelay={0.1} isArabic={isAr} />
                            </div>
                            <div>
                                <AnimatedText text={t('title_2')} baseDelay={0.4} isArabic={isAr} />

                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 0.7 }}
                                    style={{ color: 'var(--accent-light)' }}
                                >
                                    _
                                </motion.span>
                            </div>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: slideDirection }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="tech-font hero-description"
                        style={{
                            fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                            color: 'var(--text-secondary)',
                            width: '100%',
                            maxWidth: '500px',
                            lineHeight: '1.8',
                            marginBottom: '2.5rem',
                            marginInline: 'auto',
                            boxSizing: 'border-box',
                            padding: '0 5px'
                        }}
                    >
                        {t('role')}
                    </motion.p>

                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }} className="hero-buttons">
                        {/* 👇 ربط الدالة الجديدة بزر المشاريع */}
                        <NeonEqualizerButton text={t('view_projects')} onClick={handleScrollToProjects} />
                        <VideoStyleDownloadButton label={t('download_cv')} successLabel={t('downloaded')} />
                    </motion.div>
                </div>

                {/* --- الجزء الأيمن: مكون الصورة --- */}
                <div className="hero-image-section">
                    <ImageReveal />
                </div>
            </div>
        </section>
    );
};

export default Hero;