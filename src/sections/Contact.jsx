import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <section
            id="contact"
            style={{
                padding: '6rem 5%',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}
        >
            {/* حركة العنوان: يظهر من الأسفل عند التمرير */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                style={{ fontSize: '2.8rem', marginBottom: '3rem', fontWeight: '900', color: 'var(--text-primary)' }}
            >
                {t('contact_title')}
            </motion.h2>

            {/* حركة البطاقة: تكبر بلطف بتأثير زجاجي */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', // خلفية شفافة
                    padding: '3rem',
                    borderRadius: '16px',
                    maxWidth: '600px',
                    width: '100%',
                    backdropFilter: 'blur(10px)', // تأثير الزجاج (Glassmorphism)
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    textAlign: 'center'
                }}
            >
                <div style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{t('email')}:</strong> <br />
                    <a href="mailto:sarahhajjo98@gmail.com" style={{ color: 'var(--accent-light)', textDecoration: 'none', fontWeight: 'bold' }}>
                        sarahhajjo98@gmail.com
                    </a>
                </div>

                <div style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{t('phone')}:</strong> <br />
                    <span style={{ color: 'var(--text-secondary)' }} dir="ltr">+963-967348415</span>
                </div>

                <div style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{t('location')}:</strong> <br />
                    <span style={{ color: 'var(--text-secondary)' }}>{t('damascus')}</span>
                </div>

                <div style={{ fontSize: '1.2rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{t('github')}:</strong> <br />
                    <a href="https://github.com/sarahhajjo" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-light)', textDecoration: 'none', fontWeight: 'bold' }}>
                        github.com/sarahhajjo
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;