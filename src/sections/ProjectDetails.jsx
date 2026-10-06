import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';

// مكون زر الجيت هب
const GithubButton = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="tech-font"
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxSizing: 'border-box',
            width: '100%',
            padding: '1rem 2rem',
            border: '2px solid #DD99BB',
            backgroundColor: 'transparent',
            color: '#DD99BB',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#DD99BB';
            e.currentTarget.style.color = '#1F1A38';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#DD99BB';
        }}
    >
        {children}
    </a>
);

const getTagColor = (tag) => {
    const t = tag.toLowerCase();
    if (t.includes('flutter')) return '#42A5F5';
    if (t.includes('laravel')) return '#FF2D20';
    if (t.includes('react')) return '#61DAFB';
    if (t.includes('redux')) return '#A78BFA';
    if (t.includes('cubit') || t.includes('bloc')) return '#2DD4BF';
    if (t.includes('firebase')) return '#FFCA28';
    if (t.includes('dio')) return '#FB923C';
    if (t.includes('material')) return '#4DA3FF';
    if (t.includes('three')) return '#E5E7EB';
    if (t.includes('framer')) return '#F472B6';
    if (t.includes('getx') || t.includes('http')) return '#4CAF50';
    return '#DD99BB';
};

const ProjectDetails = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const projectsData = [
        {
            id: 1,
            title: t('proj1_title'),
            longDescription: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <p style={{ margin: 0 }}>{t('proj1_long_p1')}</p>
                    <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--accent-light)' }}>
                        {t('proj1_long_p2')}
                    </p>
                </div>
            ),
            // جلب القوائم والمميزات من ملف الترجمة كمصفوفة
            featuresConfig: t('proj1_features', { returnObjects: true }),
            secondaryNote: t('proj1_sec_note'),
            image: '/projects/img.png',
            videoUrl: '/videos/royalreact.mp4',
            secondaryVideoUrl: '/videos/royalmobile.mp4',
            secondaryGithubUrl: 'https://github.com/sarahhajjo/events-app-ios',
            sourceGithubUrl: 'https://github.com/sarahhajjo/Royal-Event',
            tags: ['React.js', 'Laravel', 'Flutter', 'Redux', 'Cubit', 'Firebase', 'Dio', 'Material-UI'],
        },
        {
            id: 2,
            title: t('proj2_title'),
            longDescription: t('proj2_long_desc'),
            featuresConfig: t('proj2_features', { returnObjects: true }),
            image: '/projects/img_1.png',
            videoUrl: '/videos/halohomes.mp4',
            tags: ['Flutter (MVC)', 'Laravel', 'GetX', 'HTTP'],
            githubUrl: 'https://github.com/sarahhajjo/HaloHomes_app'
        },
        {
            id: 3,
            title: t('proj3_title'),
            longDescription: t('proj3_long_desc'),
            image: '/projects/img_2.png',
            videoUrl: '/videos/portfolio.mp4',
            tags: ['React', 'Three.js', 'Framer Motion'],
            githubUrl: 'https://github.com/sarahhajjo'
        }
    ];

    const project = projectsData.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return <div style={{ color: '#ffffff', textAlign: 'center', marginTop: '20vh', fontSize: '2rem' }}>
            {isAr ? 'المشروع غير موجود!' : 'Project not found!'}
        </div>;
    }

    const lists = project.featuresConfig || [];
    const hasVideo = Boolean(project.secondaryVideoUrl || project.secondaryGithubUrl);

    const leftLists = hasVideo ? lists.map((l, i) => ({ l, i })).filter(({ i }) => i === 0 || i >= 3) : [];
    const rightLists = hasVideo ? lists.map((l, i) => ({ l, i })).filter(({ i }) => i === 1 || i === 2) : [];

    const renderList = (list, idx) => (
        <div key={idx} style={{ order: idx }}>
            <h3 className="tech-font" style={{ color: '#DD99BB', marginBottom: '1.2rem', fontSize: '1.3rem' }}>
                {list.title}
            </h3>
            <ul style={{
                color: '#ffffff',
                fontFamily: 'inherit',
                paddingLeft: isAr ? '0' : '1.5rem',
                paddingRight: isAr ? '1.5rem' : '0',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
                fontSize: '1rem',
                lineHeight: '1.6'
            }}>
                {list.items && list.items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <div style={{ backgroundColor: '#1F1A38', minHeight: '100vh', overflowX: 'hidden' }}>
            <style>{`
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 3rem;
                    border-top: 1px solid rgba(221, 153, 187, 0.2);
                    padding-top: 2.5rem;
                }
                .features-split {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                    border-top: 1px solid rgba(221, 153, 187, 0.2);
                    padding-top: 2.5rem;
                }
                .features-left, .features-right, .features-right-lists { display: contents; }

                @media (min-width: 1250px) {
                    .features-split {
                        display: grid;
                        grid-template-columns: 1fr 2fr;
                        gap: 3rem;
                        align-items: start;
                    }
                    .features-left {
                        display: flex;
                        flex-direction: column;
                        gap: 2.5rem;
                    }
                    .features-right {
                        display: flex;
                        flex-direction: column;
                        gap: 2.5rem;
                    }
                    .features-right-lists {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 3rem;
                    }
                }
            `}</style>

            <Navbar />

            <section style={{
                padding: '120px 5% 4rem 5%',
                maxWidth: '1400px',
                margin: '0 auto',
                direction: isAr ? 'rtl' : 'ltr'
            }}>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        border: '1px solid rgba(221, 153, 187, 0.3)',
                        borderRadius: '24px',
                        padding: '3rem',
                        backgroundColor: 'rgba(31, 26, 56, 0.4)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3rem'
                    }}
                >

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4rem',
                        alignItems: 'flex-start'
                    }}>
                        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{
                                width: '100%',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '1px solid rgba(221, 153, 187, 0.3)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                backgroundColor: '#000',
                                position: 'relative',
                                paddingTop: '56.25%'
                            }}>
                                <video
                                    src={project.videoUrl}
                                    controls
                                    autoPlay
                                    muted
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        display: 'block',
                                        objectFit: 'contain'
                                    }}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            {project.sourceGithubUrl && (
                                <GithubButton href={project.sourceGithubUrl}>
                                    {t('view_source')}
                                </GithubButton>
                            )}
                        </div>

                        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h1 className="tech-font" style={{ fontSize: '3.5rem', margin: 0, color: '#DD99BB', lineHeight: 1.1 }}>
                                {project.title}
                            </h1>

                            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                                {project.tags.map(tag => (
                                    <span key={tag} style={{
                                        color: getTagColor(tag),
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div style={{ color: '#ffffff', fontSize: '1.1rem', lineHeight: '1.8', marginTop: '1rem' }}>
                                {project.longDescription}
                            </div>
                        </div>
                    </div>

                    {lists.length > 0 && !hasVideo && (
                        <div className="features-grid">
                            {lists.map((list, idx) => renderList(list, idx))}
                        </div>
                    )}

                    {hasVideo && (
                        <div className="features-split">
                            <div className="features-left">
                                {leftLists.map(({ l, i }) => renderList(l, i))}
                            </div>

                            <div className="features-right">
                                <div className="features-right-lists">
                                    {rightLists.map(({ l, i }) => renderList(l, i))}
                                </div>

                                <div style={{ order: 99, display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                                    {project.secondaryVideoUrl && (
                                        <div style={{
                                            width: '100%',
                                            aspectRatio: '16 / 9',
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            border: '1px solid rgba(221, 153, 187, 0.3)',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                            backgroundColor: '#000',
                                            position: 'relative'
                                        }}>
                                            <video
                                                src={project.secondaryVideoUrl}
                                                controls
                                                autoPlay
                                                loop
                                                muted
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'block',
                                                    objectFit: 'cover'
                                                }}
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    )}

                                    {project.secondaryNote && (
                                        <p style={{
                                            margin: 0,
                                            padding: '0.9rem 1.2rem',
                                            borderInlineStart: '3px solid #DD99BB',
                                            backgroundColor: 'rgba(221, 153, 187, 0.08)',
                                            borderRadius: isAr ? '8px 0 0 8px' : '0 8px 8px 0',
                                            color: '#EAD7D1',
                                            fontSize: '0.95rem',
                                            lineHeight: '1.6',
                                            fontStyle: 'italic'
                                        }}>
                                            {project.secondaryNote}
                                        </p>
                                    )}

                                    {project.secondaryGithubUrl && (
                                        <GithubButton href={project.secondaryGithubUrl}>
                                            {t('view_mobile')}
                                        </GithubButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {project.teamNote && (
                        <p style={{ fontSize: '0.9rem', color: '#EAD7D1', fontStyle: 'italic', marginTop: '1rem', textAlign: 'center' }}>
                            {project.teamNote}
                        </p>
                    )}

                </motion.div>
            </section>
        </div>
    );
};

export default ProjectDetails;