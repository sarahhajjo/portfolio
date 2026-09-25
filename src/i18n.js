import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "greeting": "HELLO, I'M",
            "name": "SARAH HAJJO",
            "title_1": "Software",
            "title_2": "Engineer",
            "role": "Software Engineering student specializing in AI. I craft digital experiences and applications that blend elegant UIs with smart solutions.",
            "view_projects": "VIEW PROJECTS", // بدلاً من NEON EQUALIZER
            "download_cv": "↓ DOWNLOAD CV",
            "downloaded": "DOWNLOADED",
            "skills_title": "Skills & Technologies",
            "projects_title": "My Projects",
            "proj1_title": "Royal Events",
            "proj1_desc": "React.js, Redux, Context API, REST APIs, Firebase, MySQL",
            "proj2_title": "HaloHomes",
            "proj2_desc": "Flutter (MVC), GetX, HTTP, MySQL - House rental & listing app",
            "github_btn": "GitHub",
            "contact_title": "Get In Touch",
            "email": "Email",
            "phone": "Phone",
            "location": "Location",
            "damascus": "Damascus, Syria",
            "github": "GitHub"
        }
    },
    ar: {
        translation: {
            "greeting": "مرحباً، أنا",
            "name": "سارة حجّو",
            "title_1": "مهندسة",
            "title_2": "برمجيات",
            "role": "طالبة هندسة برمجيات متخصصة في الذكاء الاصطناعي. أصنع تجارب رقمية وتطبيقات تدمج بين واجهات المستخدم الأنيقة والحلول الذكية.",
            "view_projects": "تصفح مشاريعي", // بدلاً من NEON EQUALIZER
            "download_cv": "↓ تحميل السيرة",
            "downloaded": "تم التحميل",
            "skills_title": "المهارات والتقنيات",
            "projects_title": "مشاريعي",
            "proj1_title": "رويال إيفنتس (Royal Events)",
            "proj1_desc": "تطوير باستخدام: React.js, Redux, Context API, REST APIs, Firebase, MySQL",
            "proj2_title": "هالو هومز (HaloHomes)",
            "proj2_desc": "تطبيق لتأجير المنازل باستخدام: Flutter (MVC), GetX, HTTP, MySQL",
            "github_btn": "عرض الكود",
            "contact_title": "تواصل معي",
            "email": "البريد الإلكتروني",
            "phone": "الهاتف",
            "location": "الموقع",
            "damascus": "دمشق، سوريا",
            "github": "GitHub"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;