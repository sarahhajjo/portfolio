import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 👈 استدعاء مكتبة التوجيه

import Navbar from './components/Navbar';
import GradientWaves from './components/GradientWaves';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import ProjectDetails from './sections/ProjectDetails'; // 👈 استدعاء صفحة تفاصيل المشروع الجديدة

import './i18n';
import './index.css';

// 👈 تجميع أقسام الصفحة الرئيسية في مكون واحد لترتيب الكود
const Home = () => (
    <>
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Contact />
    </>
);

function App() {
    const { i18n } = useTranslation();

    // تغيير اتجاه الصفحة بناءً على اللغة
    useEffect(() => {
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <Router>
            {/* خلفية الموجات ثابتة وراء كل الصفحات (الرئيسية + تفاصيل المشروع) */}
            <GradientWaves />

            {/* ⚠️ شلنا backgroundColor من هون عشان ما يغطي الخلفية المتحركة (لون الخلفية جاي من GradientWaves ومن body) */}
            <div style={{ minHeight: '100vh' }}>
                <Routes>
                    {/* 1. مسار الصفحة الرئيسية (يضم كل الأقسام) */}
                    <Route path="/" element={<Home />} />

                    {/* 2. مسار صفحة تفاصيل المشروع المستقلة */}
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;