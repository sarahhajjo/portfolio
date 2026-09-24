import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { i18n } = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false); // حالة فتح وإغلاق القائمة

    // دالة لتغيير اللغة وإغلاق القائمة بعدها
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setIsLangOpen(false);
    };

    // تحديد اسم اللغة الحالية لعرضه على الزر
    const currentLangName = i18n.language === 'ar' ? 'العربية' : 'English';

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 5%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10
        }}>
            {/* الشعار أو الاسم */}
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                SH<span style={{ color: 'var(--accent-light)' }}>.</span>
            </div>

            {/* حاوية زر الترجمة */}
            <div style={{ position: 'relative' }}>
                <button
                    className="btn-outline"
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px' }}
                >
                    {currentLangName}
                    <span style={{ fontSize: '0.8rem', transition: '0.3s', transform: isLangOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
            ▼
          </span>
                </button>

                {/* القائمة المنسدلة للخيارات */}
                {isLangOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '120%',
                        right: i18n.language === 'en' ? 0 : 'auto',
                        left: i18n.language === 'ar' ? 0 : 'auto',
                        backgroundColor: 'var(--bg-color)',
                        border: '2px solid var(--accent-light)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '120px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }}>
                        <button
                            onClick={() => changeLanguage('en')}
                            style={{
                                padding: '10px 15px',
                                backgroundColor: i18n.language === 'en' ? 'var(--accent-light)' : 'transparent',
                                color: i18n.language === 'en' ? 'var(--accent-dark)' : 'var(--text-primary)',
                                border: 'none',
                                textAlign: i18n.language === 'ar' ? 'right' : 'left',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            English
                        </button>
                        <button
                            onClick={() => changeLanguage('ar')}
                            style={{
                                padding: '10px 15px',
                                backgroundColor: i18n.language === 'ar' ? 'var(--accent-light)' : 'transparent',
                                color: i18n.language === 'ar' ? 'var(--accent-dark)' : 'var(--text-primary)',
                                border: 'none',
                                textAlign: i18n.language === 'ar' ? 'right' : 'left',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            العربية
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;