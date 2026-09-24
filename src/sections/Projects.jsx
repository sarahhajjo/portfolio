import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// مكون فرعي لبطاقة المشروع (Project Card)
const ProjectCard = ({ title, description, link }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                borderRadius: '16px',
                width: '320px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
        >
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>
                {title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                {description}
            </p>
            <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
                style={{ display: 'inline-block', textDecoration: 'none' }}
            >
                GitHub
            </a>
        </motion.div>
    );
};

const Projects = () => {
    const { t } = useTranslation();

    return (
        <section id="projects" style={{ padding: '6rem 5%', minHeight: '100vh' }}>
            {/* عنوان القسم مع الترجمة والأنيميشن */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{ fontSize: '2.8rem', textAlign: 'center', marginBottom: '4rem', color: 'var(--text-primary)', fontWeight: '900' }}
            >
                {t('projects_title')}
            </motion.h2>

            {/* حاوية بطاقات المشاريع */}
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <ProjectCard
                    title={t('proj1_title')}
                    description={t('proj1_desc')}
                    link="https://github.com/sarahhajjo/Royal-Event"
                />
                <ProjectCard
                    title={t('proj2_title')}
                    description={t('proj2_desc')}
                    link="https://github.com/sarahhajjo/HaloHomes_app"
                />
            </div>
        </section>
    );
};

export default Projects;