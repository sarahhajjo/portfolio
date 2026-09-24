import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import './i18n';
import './index.css';

function App() {
    const { i18n } = useTranslation();

    // تغيير اتجاه الصفحة بناءً على اللغة
    useEffect(() => {
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <div>
            <Navbar />
            <Hero />
            <Skills />
            <Projects />
            <Contact />
        </div>
    );
}

export default App;