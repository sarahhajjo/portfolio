import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
    const navigate = useNavigate();
    const projectsData = [
        {
            id: 1,
            title: 'Royal Events Platform',
            description: 'A comprehensive event management platform featuring global state management and real-time database integration.',
            image: '/projects/img.png',
            tags: ['React.js', 'Laravel'],
            githubUrl: 'https://github.com/sarahhajjo/Royal-Event'
        },
        {
            id: 2,
            title: 'HaloHomes Application',
            description: 'A complete house rental and listing mobile application utilizing an MVC architecture with a Laravel backend.',
            image: '/projects/img_1.png',
            tags: ['Flutter', 'Laravel'],
            githubUrl: 'https://github.com/sarahhajjo/HaloHomes_app'
        },
        {
            id: 3,
            title: '3D Interactive Portfolio',
            description: 'My personal portfolio website featuring immersive 3D web graphics, high-performance animations, and custom UI.',
            image: '/projects/img_2.png',
            tags: ['React', 'Three.js'],
            githubUrl: 'https://github.com/sarahhajjo/portfolio',
            hideDetailsButton: true // 👈 أضفنا هذه الخاصية لإخفاء زر التفاصيل لهذا المشروع فقط
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
                    My <span style={{ color: 'var(--accent-light)' }}>Projects</span>
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

                        {/* --- الأزرار --- */}
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            marginTop: 'auto',
                            justifyContent: project.hideDetailsButton ? 'flex-start' : 'space-between' // 👈 ترتيب الأزرار ليبقى الـ GitHub مكانه
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
                                GitHub ➔
                            </a>

                            {/* 👇 هنا الشرط: لا يتم عرض الزر إلا إذا كانت الخاصية غير موجودة أو false */}
                            {!project.hideDetailsButton && (
                                <button
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                    className="tech-font"
                                    style={{
                                        backgroundColor: 'rgba(234, 215, 209, 0.05)',
                                        border: '1px solid rgba(234, 215, 209, 0.3)',
                                        color: '#EAD7D1',
                                        padding: '0.4rem 1rem',
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(234, 215, 209, 0.1)'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(234, 215, 209, 0.05)'}
                                >
                                    Details
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;