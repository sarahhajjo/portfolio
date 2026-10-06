import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import EarthModel from '../components/EarthModel.jsx';

const EmailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.866l5.6-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
);
const PhoneIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.022-3.498-6.82-2.108 1.039c-1.121.55-2.285 2.155-2.285 4.316 0 6.649 7.643 16.644 14.654 16.644 2.138 0 3.65-1.206 4.148-2.316l-2.8-1.063z"/></svg>
);
const GithubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);
const LocationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
);
const MessagesIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);

const Contact = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [globalCount, setGlobalCount] = useState(0);
    const [userMessages, setUserMessages] = useState([]);
    const [showMyMessages, setShowMyMessages] = useState(false);

    useEffect(() => {
        fetch('https://api.counterapi.dev/v1/sarahhajjo/portfolio_messages')
            .then(res => res.json())
            .then(data => setGlobalCount(data.count || 0))
            .catch(err => console.error("Error fetching count:", err));

        const saved = localStorage.getItem('sarah_portfolio_msgs');
        if (saved) {
            setUserMessages(JSON.parse(saved));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // 👇 هنا تم استدعاء المفتاح من ملف البيئة المخفي
        const payload = {
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            name: formData.name,
            email: formData.email,
            message: formData.message,
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                fetch('https://api.counterapi.dev/v1/sarahhajjo/portfolio_messages/up')
                    .then(res => res.json())
                    .then(data => setGlobalCount(data.count || globalCount + 1))
                    .catch(() => setGlobalCount(prev => prev + 1));

                const newMsg = {
                    id: Date.now(),
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    date: new Date().toLocaleDateString()
                };
                const updatedMessages = [newMsg, ...userMessages];
                localStorage.setItem('sarah_portfolio_msgs', JSON.stringify(updatedMessages));
                setUserMessages(updatedMessages);

                alert(t('success_msg'));
                setFormData({ name: '', email: '', message: '' });
                setShowMyMessages(true);
            }
        } catch (error) {
            console.error("Error sending message", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            style={{
                padding: '6rem 5% 2rem 5%',
                backgroundColor: 'var(--bg-color)',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <style>{`
                .contact-layout {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    max-width: 1300px;
                    margin: 0 auto;
                    gap: 4rem;
                    box-sizing: border-box;
                }
                .contact-form-side {
                    flex: 1;
                    width: 100%;
                    max-width: 500px;
                    box-sizing: border-box;
                }
                .contact-earth-side {
                    flex: 1.5;
                    width: 100%;
                    height: 600px;
                }
                
                @media (max-width: 950px) {
                    .contact-layout {
                        flex-direction: column;
                        gap: 2rem;
                        margin-top: 60px;
                    }
                    .contact-form-side {
                        max-width: 100%;
                    }
                    .form-container {
                        padding: 1.5rem !important;
                    }
                    .contact-earth-side {
                        height: 350px;
                    }
                }
            `}</style>

            <div className="contact-layout" style={{ direction: isAr ? 'rtl' : 'ltr' }}>

                <motion.div
                    className="contact-form-side form-container"
                    initial={{ opacity: 0, x: isAr ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{
                        backgroundColor: 'rgba(31, 26, 56, 0.4)',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(221, 153, 187, 0.2)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(10px)',
                        position: 'relative'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 className="tech-font" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', margin: 0, color: 'var(--text-primary)' }}>
                            {t('contact_title_get')} <span style={{ color: 'var(--accent-light)' }}>{t('contact_title_touch')}</span>
                        </h2>

                        <button
                            onClick={() => setShowMyMessages(!showMyMessages)}
                            style={{ background: 'transparent', border: 'none', color: '#DD99BB', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            title={showMyMessages ? t('hide_my_messages') : t('view_my_messages')}
                        >
                            <MessagesIcon />
                            {userMessages.length > 0 && (
                                <span style={{ background: '#FF2D20', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', marginTop: '-25px', marginLeft: '15px', fontWeight: 'bold' }}>
                                    {userMessages.length}
                                </span>
                            )}
                        </button>
                    </div>

                    <div style={{ display: 'inline-block', backgroundColor: 'rgba(221, 153, 187, 0.1)', border: '1px solid rgba(221, 153, 187, 0.3)', padding: '6px 12px', borderRadius: '20px', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#EAD7D1' }}>
                        <strong>{globalCount}</strong> {t('messages_count')}
                    </div>

                    <AnimatePresence mode='wait'>
                        {showMyMessages ? (
                            <motion.div
                                key="my-messages"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '10px' }}
                            >
                                {userMessages.length === 0 ? (
                                    <p style={{ color: '#EAD7D1', textAlign: 'center', fontStyle: 'italic' }}>{t('no_messages')}</p>
                                ) : (
                                    userMessages.map(msg => (
                                        <div key={msg.id} style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderLeft: `3px solid var(--accent-light)`, padding: '15px', borderRadius: '8px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem', color: '#EAD7D1' }}>
                                                <strong>{msg.name}</strong>
                                                <span>{msg.date}</span>
                                            </div>
                                            <p style={{ color: '#fff', fontSize: '0.9rem', margin: 0, fontStyle: 'italic', wordBreak: 'break-word' }}>"{msg.message}"</p>
                                        </div>
                                    ))
                                )}
                            </motion.div>
                        ) : (
                            <motion.form
                                key="contact-form"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                onSubmit={handleSubmit}
                                style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label className="tech-font" style={{ color: '#EAD7D1', fontSize: '0.85rem', fontWeight: 'bold' }}>{t('your_name')}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('name_placeholder')}
                                        style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: 'none', backgroundColor: 'rgba(0, 0, 0, 0.25)', color: '#fff', outline: 'none', fontFamily: 'inherit', fontSize: '0.95rem', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)', boxSizing: 'border-box' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label className="tech-font" style={{ color: '#EAD7D1', fontSize: '0.85rem', fontWeight: 'bold' }}>{t('your_email')}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('email_placeholder')}
                                        style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: 'none', backgroundColor: 'rgba(0, 0, 0, 0.25)', color: '#fff', outline: 'none', fontFamily: 'inherit', fontSize: '0.95rem', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)', boxSizing: 'border-box' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label className="tech-font" style={{ color: '#EAD7D1', fontSize: '0.85rem', fontWeight: 'bold' }}>{t('your_message')}</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('message_placeholder')}
                                        style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: 'none', backgroundColor: 'rgba(0, 0, 0, 0.25)', color: '#fff', outline: 'none', fontFamily: 'inherit', fontSize: '0.95rem', resize: 'none', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)', boxSizing: 'border-box' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="tech-font"
                                    style={{
                                        marginTop: '0.5rem',
                                        padding: '0.9rem 2rem',
                                        borderRadius: '8px',
                                        border: '1px solid #DD99BB',
                                        backgroundColor: 'rgba(221, 153, 187, 0.1)',
                                        color: '#DD99BB',
                                        fontSize: '0.95rem',
                                        fontWeight: 'bold',
                                        cursor: isSubmitting ? 'wait' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        letterSpacing: '1px',
                                        opacity: isSubmitting ? 0.6 : 1
                                    }}
                                    onMouseOver={(e) => { if (!isSubmitting) e.target.style.backgroundColor = 'rgba(221, 153, 187, 0.3)' }}
                                    onMouseOut={(e) => { if (!isSubmitting) e.target.style.backgroundColor = 'rgba(221, 153, 187, 0.1)' }}
                                >
                                    {isSubmitting ? t('sending_btn') : t('send_btn')}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="contact-earth-side"
                    initial={{ opacity: 0, x: isAr ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{
                        cursor: 'grab'
                    }}
                >
                    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
                        <pointLight position={[-10, -10, -5]} intensity={2} color="#DD99BB" />

                        <Environment preset="city" />

                        <OrbitControls
                            enableZoom={false}
                            autoRotate={false}
                        />

                        <Suspense fallback={null}>
                            <group scale={1.2}>
                                <EarthModel />
                            </group>
                        </Suspense>
                    </Canvas>
                </motion.div>

            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                viewport={{ once: true }}
                style={{
                    width: '100%',
                    borderTop: '1px solid rgba(221, 153, 187, 0.2)',
                    paddingTop: '2rem',
                    marginTop: '2rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '3rem'
                }}
            >
                <a href="tel:+963967348415" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#EAD7D1', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-light)'} onMouseOut={(e) => e.currentTarget.style.color = '#EAD7D1'}>
                    <PhoneIcon/>
                    <span className="tech-font" style={{ direction: 'ltr' }}>+963 967348415</span>
                </a>

                <a href="mailto:sarahhajjo98@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#EAD7D1', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-light)'} onMouseOut={(e) => e.currentTarget.style.color = '#EAD7D1'}>
                    <EmailIcon/>
                    <span className="tech-font">sarahhajjo98@gmail.com</span>
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#EAD7D1', fontSize: '1rem' }}>
                    <LocationIcon/>
                    <span className="tech-font">{t('damascus')}</span>
                </div>

                <a href="https://github.com/sarahhajjo" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#EAD7D1', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-light)'} onMouseOut={(e) => e.currentTarget.style.color = '#EAD7D1'}>
                    <GithubIcon/>
                    <span className="tech-font">/sarahhajjo</span>
                </a>
            </motion.div>
        </section>
    );
};

export default Contact;