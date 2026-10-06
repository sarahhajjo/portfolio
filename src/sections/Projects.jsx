import React, { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// --- زر Supernova (نفس الزر البنفسجي من الفيديو: قبل الهوفر وبعده) ---
const SupernovaButton = ({ text, onClick }) => {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    const handleMove = (e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
    };

    const handleEnter = (e) => {
        handleMove(e);
        setHovered(true);
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseEnter={handleEnter}
            onMouseMove={handleMove}
            onMouseLeave={() => setHovered(false)}
            whileTap={{ scale: 0.97 }}
            animate={
                hovered
                    ? {
                        borderColor: 'rgba(192, 132, 252, 1)',
                        boxShadow:
                            '0 0 18px rgba(168, 85, 247, 0.65), inset 0 0 14px rgba(168, 85, 247, 0.35)',
                    }
                    : {
                        borderColor: 'rgba(168, 85, 247, 0.45)',
                        boxShadow:
                            '0 0 6px rgba(168, 85, 247, 0.15), inset 0 0 8px rgba(168, 85, 247, 0.12)',
                    }
            }
            transition={{ duration: 0.3 }}
            className="tech-font"
            style={{
                position: 'relative',
                overflow: 'hidden',
                background:
                    'linear-gradient(135deg, rgba(76, 29, 149, 0.55), rgba(46, 16, 101, 0.75))',
                border: '1px solid rgba(168, 85, 247, 0.45)',
                color: '#F3E8FF',
                padding: '0.55rem 1.4rem',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '110px',
            }}
        >
            {/* خطوط أفقية خفيفة (scanlines) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'repeating-linear-gradient(0deg, transparent 0 3px, rgba(168, 85, 247, 0.10) 3px 4px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* --- الحالة العادية (قبل الهوفر): لمعة نجمية دوّارة + موجة خفيفة من المركز --- */}
            {[0, 1].map((i) => (
                <motion.div
                    key={`glint-${i}`}
                    animate={{
                        rotate: i === 0 ? [15, 30, 15] : [-60, -45, -60],
                        opacity: [0.25, 0.9, 0.25],
                    }}
                    transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.8,
                    }}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: '1px',
                        height: '170%',
                        x: '-50%',
                        y: '-50%',
                        background:
                            'linear-gradient(to bottom, transparent, rgba(255,255,255,0.85), transparent)',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />
            ))}

            {!hovered &&
                [0, 1.2].map((delay) => (
                    <motion.div
                        key={`idle-ring-${delay}`}
                        animate={{ scale: [0, 4], opacity: [0.35, 0] }}
                        transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            delay,
                            ease: 'easeOut',
                        }}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            width: '40px',
                            height: '20px',
                            border: '1px solid rgba(192, 132, 252, 0.7)',
                            borderRadius: '50%',
                            x: '-50%',
                            y: '-50%',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    />
                ))}

            <span
                style={{
                    position: 'relative',
                    zIndex: 3,
                    textShadow: '0 0 6px rgba(216, 180, 254, 0.7)',
                }}
            >
                {text}
            </span>

            {/* --- حالة الهوفر: نقطة بيضاء + نجمة + موجات صدمة من مكان الماوس --- */}
            {hovered && (
                <>
                    {[0, 0.5, 1.0].map((delay) => (
                        <motion.div
                            key={`ring-${delay}`}
                            initial={{ scale: 0, opacity: 0.9 }}
                            animate={{ scale: [0, 4.5], opacity: [0.9, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay,
                                ease: 'easeOut',
                            }}
                            style={{
                                position: 'absolute',
                                left: mx,
                                top: my,
                                width: '36px',
                                height: '20px',
                                border: '1.5px solid rgba(192, 132, 252, 0.9)',
                                borderRadius: '50%',
                                x: '-50%',
                                y: '-50%',
                                pointerEvents: 'none',
                                zIndex: 2,
                            }}
                        />
                    ))}

                    {/* نجمة / أشعة حول الماوس */}
                    <motion.svg
                        width="46"
                        height="46"
                        viewBox="-23 -23 46 46"
                        animate={{ rotate: [0, 90], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            left: mx,
                            top: my,
                            x: '-50%',
                            y: '-50%',
                            pointerEvents: 'none',
                            zIndex: 4,
                        }}
                    >
                        <g stroke="white" strokeLinecap="round" opacity="0.85">
                            <line x1="-22" y1="0" x2="22" y2="0" strokeWidth="0.8" />
                            <line x1="0" y1="-22" x2="0" y2="22" strokeWidth="0.8" />
                            <line x1="-12" y1="-12" x2="12" y2="12" strokeWidth="0.5" />
                            <line x1="12" y1="-12" x2="-12" y2="12" strokeWidth="0.5" />
                        </g>
                    </motion.svg>

                    {/* النقطة البيضاء */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            left: mx,
                            top: my,
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            boxShadow: '0 0 8px 2px rgba(216, 180, 254, 0.9)',
                            x: '-50%',
                            y: '-50%',
                            pointerEvents: 'none',
                            zIndex: 5,
                        }}
                    />
                </>
            )}
        </motion.button>
    );
};

const Projects = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const projectsData = [
        {
            id: 1,
            title: t('proj1_title'),
            description: t('proj1_desc'),
            image: '/projects/img.png',
            tags: ['React.js', 'Laravel'],
            githubUrl: 'https://github.com/sarahhajjo/Royal-Event'
        },
        {
            id: 2,
            title: t('proj2_title'),
            description: t('proj2_desc'),
            image: '/projects/img_1.png',
            tags: ['Flutter', 'Laravel'],
            githubUrl: 'https://github.com/sarahhajjo/HaloHomes_app'
        },
        {
            id: 3,
            title: t('proj3_title'),
            description: t('proj3_desc'),
            image: '/projects/img_2.png',
            tags: ['React', 'Three.js'],
            githubUrl: 'https://github.com/sarahhajjo/portfolio',
            hideDetailsButton: true
        }
    ];

    const getTagColor = (tag) => {
        const lowerTag = tag.toLowerCase();
        if (lowerTag.includes('react')) return '#61DAFB';
        if (lowerTag.includes('laravel')) return '#FF2D20';
        if (lowerTag.includes('flutter')) return '#1976D2';
        if (lowerTag.includes('three.js')) return '#f0f0f0';
        return '#EAD7D1';
    };

    return (
        <section
            id="projects"
            style={{
                padding: '2rem 5% 6rem 5%',
                backgroundColor: 'var(--bg-color)',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h2 className="tech-font" style={{ fontSize: '3.5rem', color: 'var(--text-primary)', margin: 0 }}>
                    {t('projects_title_my')} <span style={{ color: 'var(--accent-light)' }}>{t('projects_title')}</span>
                </h2>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 350px))',
                justifyContent: 'center',
                gap: '2.5rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {projectsData.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(221, 153, 187, 0.3)' }}
                        style={{
                            backgroundColor: 'rgba(123, 80, 111, 0.1)',
                            border: '1px solid rgba(221, 153, 187, 0.3)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            cursor: 'default',
                            transition: 'all 0.3s ease',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            width: '100%',
                            height: '200px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            marginBottom: '0.5rem',
                            position: 'relative'
                        }}>
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </div>

                        <h3 className="tech-font" style={{ color: 'var(--text-primary)', fontSize: '1.6rem', margin: 0 }}>
                            {project.title}
                        </h3>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>
                            {project.description}
                        </p>

                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            marginBottom: '1rem'
                        }}>
                            {project.tags.map(tag => (
                                <span
                                    key={tag}
                                    style={{
                                        color: getTagColor(tag),
                                        fontSize: '0.9rem',
                                        fontWeight: '900',
                                        letterSpacing: '1px',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            marginTop: 'auto',
                            justifyContent: project.hideDetailsButton ? 'flex-start' : 'space-between',
                            alignItems: 'center'
                        }}>
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tech-font"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'var(--accent-light)',
                                    textDecoration: 'none',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    letterSpacing: '1px'
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                {t('github_btn')}
                            </a>

                            {!project.hideDetailsButton && (
                                <SupernovaButton
                                    text={t('details_btn')}
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                />
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;