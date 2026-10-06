import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const GithubIcon = () => (
    <svg className="nav-svg" viewBox="0 0 24 24" fill="currentColor" style={{ transition: 'color 0.3s ease' }}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);
const EmailIcon = () => (
    <svg className="nav-svg" viewBox="0 0 24 24" fill="currentColor" style={{ transition: 'color 0.3s ease' }}><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.866l5.6-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
);

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const isProjectPage = location.pathname.includes('/projects/');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setIsLangOpen(false);
    };

    const currentLangName = isAr ? 'العربية' : 'English';

    return (
        <>
            <style>{`
                .nav-wrapper {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 100;
                    transition: all 0.3s ease;
                    box-sizing: border-box;
                    padding: ${isScrolled ? '1rem 5%' : '1.5rem 5%'};
                }
                .nav-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .back-btn {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 5px;
                    padding: 6px 12px;
                    font-size: 0.9rem;
                    white-space: nowrap;
                }
                .profile-pic-container {
                    width: 45px;
                    height: 45px;
                }
                .brand-name {
                    font-size: 1.4rem;
                    white-space: nowrap;
                }
                .social-icons {
                    display: flex;
                    gap: 12px;
                    margin-inline-start: 10px;
                }
                .nav-svg {
                    width: 20px;
                    height: 20px;
                }
                .lang-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 12px;
                    font-size: 0.9rem;
                    font-weight: bold;
                    letter-spacing: 1px;
                    white-space: nowrap;
                }

                @media (max-width: 850px) {
                    .nav-wrapper {
                        padding-left: 3% !important;
                        padding-right: 3% !important;
                    }
                    .nav-left {
                        gap: 0.5rem;
                    }
                    .back-btn {
                        padding: 4px 8px;
                        font-size: 0.8rem;
                        gap: 3px;
                    }
                    .profile-pic-container {
                        width: 32px;
                        height: 32px;
                    }
                    .brand-name {
                        font-size: 1.1rem;
                        ${isProjectPage ? 'display: none;' : ''} 
                    }
                    .social-icons {
                        gap: 8px;
                        margin-inline-start: 4px;
                    }
                    .nav-svg {
                        width: 16px;
                        height: 16px;
                    }
                    .lang-btn {
                        padding: 4px 8px;
                        font-size: 0.8rem;
                        gap: 4px;
                    }
                }
            `}</style>

            <nav
                className="nav-wrapper"
                style={{
                    backgroundColor: isScrolled ? 'rgba(15, 10, 25, 0.9)' : 'transparent',
                    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                    borderBottom: isScrolled ? '1px solid rgba(221, 153, 187, 0.1)' : '1px solid transparent',
                    direction: isAr ? 'rtl' : 'ltr'
                }}
            >
                <div className="nav-left">
                    {isProjectPage && (
                        <button
                            // 👇 التعديل هنا: الانتقال للصفحة الرئيسية ثم التمرير السلس لقسم المشاريع
                            onClick={() => {
                                navigate('/');
                                setTimeout(() => {
                                    const projectsSection = document.getElementById('projects');
                                    if (projectsSection) {
                                        projectsSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }, 150);
                            }}
                            className="tech-font back-btn"
                            style={{
                                background: 'rgba(234, 215, 209, 0.1)',
                                border: '1px solid rgba(234, 215, 209, 0.4)',
                                color: '#EAD7D1',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-light)'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(234, 215, 209, 0.4)'}
                        >
                            {isAr ? 'رجوع →' : '← Back'}
                        </button>
                    )}

                    <div
                        onClick={() => setIsImageOpen(true)}
                        className="profile-pic-container"
                        style={{
                            borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'transform 0.2s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <img src="/profile.png" alt="Sarah Hajjo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                    </div>

                    <span className="tech-font brand-name" style={{ fontWeight: 'bold', color: 'var(--text-primary)', letterSpacing: '1px' }}>
                        {isAr ? 'سارة حجّو' : 'Sarah Hajjo'}
                    </span>

                    <div className="social-icons">
                        <a href="https://github.com/sarahhajjo" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-light)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'} title="GitHub"><GithubIcon /></a>
                        <a href="mailto:sarahhajjo98@gmail.com" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-light)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'} title="Email"><EmailIcon /></a>
                    </div>
                </div>

                <div style={{ position: 'relative' }}>
                    <button className="btn-outline tech-font lang-btn" onClick={() => setIsLangOpen(!isLangOpen)}>
                        {currentLangName}
                        <span style={{ fontSize: '0.7em', transition: '0.3s', transform: isLangOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                    </button>

                    {isLangOpen && (
                        <div style={{ position: 'absolute', top: '120%', right: isAr ? 'auto' : 0, left: isAr ? 0 : 'auto', backgroundColor: 'var(--bg-color)', border: '2px solid var(--accent-light)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', minWidth: '100px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                            <button className="tech-font" onClick={() => changeLanguage('en')} style={{ padding: '10px 15px', backgroundColor: !isAr ? 'var(--accent-light)' : 'transparent', color: !isAr ? 'var(--accent-dark)' : 'var(--text-primary)', border: 'none', textAlign: isAr ? 'right' : 'left', cursor: 'pointer', fontWeight: 'bold' }}>English</button>
                            <button className="tech-font" onClick={() => changeLanguage('ar')} style={{ padding: '10px 15px', backgroundColor: isAr ? 'var(--accent-light)' : 'transparent', color: isAr ? 'var(--accent-dark)' : 'var(--text-primary)', border: 'none', textAlign: isAr ? 'right' : 'left', cursor: 'pointer', fontWeight: 'bold' }}>العربية</button>
                        </div>
                    )}
                </div>
            </nav>

            <AnimatePresence>
                {isImageOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setIsImageOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(10, 5, 20, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'zoom-out' }}>
                        <button onClick={() => setIsImageOpen(false)} style={{ position: 'absolute', top: '20px', right: isAr ? 'auto' : '20px', left: isAr ? '20px' : 'auto', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '2.5rem', cursor: 'pointer', zIndex: 1001 }}>&times;</button>
                        <motion.img initial={{ scale: 0.5, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} src="/profile.png" alt="Sarah Hajjo" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '20px', border: '2px solid rgba(221, 153, 187, 0.5)', boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(221, 153, 187, 0.2)', cursor: 'default' }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;