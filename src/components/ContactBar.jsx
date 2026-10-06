import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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

const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#EAD7D1',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s',
};
const hoverOn = (e) => { e.currentTarget.style.color = 'var(--accent-light)'; };
const hoverOff = (e) => { e.currentTarget.style.color = '#EAD7D1'; };

// شريط معلومات التواصل — مستخدم بصفحة Contact وبآخر صفحة تفاصيل المشروع
const ContactBar = () => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
            style={{
                width: '100%',
                boxSizing: 'border-box',
                borderTop: '1px solid rgba(221, 153, 187, 0.2)',
                paddingTop: '2rem',
                marginTop: '2rem',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '3rem',
            }}
        >
            <a href="tel:+963967348415" style={linkStyle} onMouseOver={hoverOn} onMouseOut={hoverOff}>
                <PhoneIcon />
                <span className="tech-font" style={{ direction: 'ltr' }}>+963 967348415</span>
            </a>

            <a href="mailto:sarahhajjo98@gmail.com" style={linkStyle} onMouseOver={hoverOn} onMouseOut={hoverOff}>
                <EmailIcon />
                <span className="tech-font">sarahhajjo98@gmail.com</span>
            </a>

            <div style={{ ...linkStyle, transition: 'none' }}>
                <LocationIcon />
                <span className="tech-font">{t('damascus')}</span>
            </div>

            <a href="https://github.com/sarahhajjo" target="_blank" rel="noreferrer" style={linkStyle} onMouseOver={hoverOn} onMouseOut={hoverOff}>
                <GithubIcon />
                <span className="tech-font">/sarahhajjo</span>
            </a>
        </motion.div>
    );
};

export default ContactBar;