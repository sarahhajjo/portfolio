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
            "view_projects": "VIEW PROJECTS",
            "download_cv": "↓ DOWNLOAD CV",
            "downloaded": "DOWNLOADED",

            "skills_title": "Skills",
            "skills_and": "&",
            "skills_tech": "Technologies",

            "projects_title_my": "My",
            "projects_title": "Projects",
            "details_btn": "Details",
            "github_btn": "GitHub ➔",

            "contact_title_get": "Get In",
            "contact_title_touch": "Touch",
            "your_name": "Your Name",
            "name_placeholder": "What's your name?",
            "your_email": "Your Email",
            "email_placeholder": "What's your email?",
            "your_message": "Your Message",
            "message_placeholder": "What's your message?",
            "send_btn": "Send Message",
            "sending_btn": "Sending...",
            "success_msg": "Message sent successfully!",
            "damascus": "Damascus, Syria",
            "view_source": "View Source Code on GitHub ➔",
            "view_mobile": "View Mobile App on GitHub ➔",

            // 👇 النصوص الجديدة الخاصة بالرسائل والعداد
            "messages_count": "Total Messages Sent by Visitors:",
            "view_my_messages": "View My Previous Messages",
            "hide_my_messages": "Hide My Messages",
            "no_messages": "You haven't sent any messages yet.",

            "proj1_title": "Royal Events Platform",
            "proj1_desc": "A comprehensive event management platform featuring global state management and real-time database integration.",
            "proj1_long_p1": "Ever thought about the hassle of event planning—juggling venue bookings, equipment rentals, and payments across multiple parties? To solve this real-world challenge, our team built Royal Events, a comprehensive platform designed to digitize the event industry and connect customers with service providers under one reliable digital roof.",
            "proj1_long_p2": "To deliver a highly scalable and professional system, we adopted a Decoupled Architecture, seamlessly integrating three core systems:",
            "proj1_features": [
                {
                    "title": "What does Royal Events offer?",
                    "items": [
                        "All-in-One Marketplace: A unified platform combining venue booking, furniture, lighting, photography, and event coordination.",
                        "Field Recruitment for Freelancers: A dedicated portal for companies to post job offers for specific field tasks.",
                        "Dynamic Product Pricing: A smart system enabling providers to list a single product with multiple variants and independent prices.",
                        "Automated Financial System: Fully automated payments that auto-cancel unpaid bookings within a specific timeframe.",
                        "Anti-Fraud & Secure Operations: Strict operational governance requiring manual document review for all services.",
                        "Flexible UX: Full support for Light & Dark Mode, along with bilingual interfaces (Arabic and English)."
                    ]
                },
                {
                    "title": "Backend & Architecture (Laravel)",
                    "items": [
                        "Tech Stack: Laravel 12 (PHP 8.2) & MySQL with Polymorphic Relationships.",
                        "Clean Architecture: Implemented the Service Layer Pattern, Strategy Pattern, Actions Pattern, and API Resources.",
                        "Async Processing: Utilized Laravel Queues & Jobs, Scheduled Commands, and Redis for lightning-fast OTP storage.",
                        "Auth & Security: Powered by Laravel Sanctum, Google OAuth2, and Spatie Laravel-Permission for granular RBAC.",
                        "Event-Driven: Adopted an Event-Driven Architecture for maximum responsiveness."
                    ]
                },
                {
                    "title": "Frontend (React & Flutter)",
                    "items": [
                        "Web Dashboards (React): Dual Dashboards tailored for Admins and Providers, relying on Redux for state management and styled with Material-UI.",
                        "Defensive Programming: Invented a \"Smart Image Fallback\" algorithm to handle missing API data and ensure UI stability.",
                        "Customer Mobile App (Flutter): Cross-platform app adopting the Cubit/Bloc pattern for advanced State Management and fast performance."
                    ]
                },
                {
                    "title": "Advanced Interactive Features",
                    "items": [
                        "Real-Time Hybrid Chat: Integrated Google Cloud Firestore for live messaging, paired with FCM for push notifications and an Automated Bot.",
                        "Strict Payment Cycle: Workflow where customers upload a PDF payment proof, reviewed manually, with strict Database Transactions to prevent capacity conflicts.",
                        "Instant Notifications & Firebase: Seamless integration with Firebase for real-time data handling and instant alerts across all devices."
                    ]
                }
            ],
            "proj1_team": "Building this platform was an incredible software engineering journey. I’m incredibly proud of what we achieved as a team!",
            "proj1_sec_note": "My contribution to the mobile app: I developed the complete booking cycle and the full booking policy logic. Furthermore, I successfully configured and deployed the project on iOS (iPhone), conducting thorough testing to ensure all features functioned flawlessly. The rest of the app, including code structure and UI, was built by my teammates.",

            "proj2_title": "HaloHomes Application",
            "proj2_desc": "A complete house rental and listing mobile application utilizing an MVC architecture with a Laravel backend.",
            "proj2_long_desc": "HaloHomes is a residential apartment booking application developed as our final project for the Programming Languages course. It offers an integrated experience aimed at simplifying the booking process from start to finish.",
            "proj2_features": [
                {
                    "title": "What does HaloHomes offer?",
                    "items": [
                        "Search for residential apartments across different cities.",
                        "Filter results by price, location, and specifications.",
                        "Complete bookings with easy and secure steps.",
                        "Manage current and past reservations.",
                        "Direct communication with apartment owners."
                    ]
                },
                {
                    "title": "Features focused on comfort and flexibility:",
                    "items": [
                        "User-friendly and simple interfaces.",
                        "A smart system that prevents booking conflicts and ensures accurate availability.",
                        "Ability for the user to modify bookings.",
                        "Empowering the owner to edit and manage apartment data.",
                        "Instant notifications for any updates.",
                        "Dark and Light mode support.",
                        "Bilingual support (Arabic and English).",
                        "A favorites list to save premium apartments."
                    ]
                }
            ],
            "proj2_team": "* Team: Frontend (Sara Hajjo & Ammar Ammar) | Backend (Bashar Sh & Team).",

            "proj3_title": "3D Interactive Portfolio",
            "proj3_desc": "My personal portfolio website featuring immersive 3D web graphics, high-performance animations, and custom UI.",
            "proj3_long_desc": "A cutting-edge personal portfolio utilizing React Three Fiber for WebGL rendering. It showcases interactive 3D models, smooth framer-motion animations, and a sleek glassmorphism UI design to present my skills and projects interactively."
        }
    },
    ar: {
        translation: {
            "greeting": "مرحباً، أنا",
            "name": "سارة حجّو",
            "title_1": "مهندسة",
            "title_2": "برمجيات",
            "role": "طالبة هندسة برمجيات متخصصة في الذكاء الاصطناعي. أصنع تجارب رقمية وتطبيقات تدمج بين واجهات المستخدم الأنيقة والحلول الذكية.",
            "view_projects": "تصفح مشاريعي",
            "download_cv": "↓ تحميل السيرة",
            "downloaded": "تم التحميل",

            "skills_title": "المهارات",
            "skills_and": "و",
            "skills_tech": "التقنيات",

            "projects_title_my": "معرض",
            "projects_title": "مشاريعي",
            "details_btn": "التفاصيل",
            "github_btn": "الكود ➔",
            "contact_title_get": "تواصل",
            "contact_title_touch": "معي",
            "your_name": "اسمك",
            "name_placeholder": "ما هو اسمك؟",
            "your_email": "بريدك الإلكتروني",
            "email_placeholder": "ما هو بريدك الإلكتروني؟",
            "your_message": "رسالتك",
            "message_placeholder": "ما هي رسالتك؟",
            "send_btn": "إرسال الرسالة",
            "sending_btn": "جاري الإرسال...",
            "success_msg": "تم إرسال رسالتك بنجاح!",
            "damascus": "دمشق، سوريا",
            "view_source": "عرض كود الويب على GitHub ➔",
            "view_mobile": "عرض كود الموبايل على GitHub ➔",

            // 👇 النصوص الجديدة الخاصة بالرسائل والعداد
            "messages_count": "عدد الرسائل المرسلة من الزوار:",
            "view_my_messages": "عرض رسائلي السابقة",
            "hide_my_messages": "إخفاء رسائلي",
            "no_messages": "لم تقم بإرسال أي رسائل بعد.",

            "proj1_title": "منصة رويال إيفنتس (Royal Events)",
            "proj1_desc": "منصة شاملة لإدارة الفعاليات تتميز بإدارة حالة عامة (Global State) وتكامل مباشر ولحظي مع قواعد البيانات.",
            "proj1_long_p1": "هل فكرت يوماً في عناء التخطيط للمناسبات - من حجز القاعات، واستئجار المعدات، وتنسيق المدفوعات بين جهات متعددة؟ لحل هذا التحدي الواقعي، قام فريقنا ببناء 'رويال إيفنتس'، منصة متكاملة مصممة لرقمنة قطاع الفعاليات وربط العملاء بمقدمي الخدمات تحت سقف رقمي واحد وموثوق.",
            "proj1_long_p2": "لتقديم نظام احترافي وقابل للتوسع العالي، اعتمدنا معمارية الأنظمة المنفصلة (Decoupled Architecture)، لندمج ثلاثة أنظمة أساسية بسلاسة:",
            "proj1_features": [
                {
                    "title": " ماذا تقدم رويال إيفنتس؟",
                    "items": [
                        "سوق متكامل (All-in-One): منصة موحدة تجمع بين حجز القاعات، الأثاث، الإضاءة، التصوير، وتنسيق الفعاليات.",
                        "بوابة توظيف للمستقلين (Freelancers): منصة مخصصة للشركات لنشر عروض العمل للمهام الميدانية (مثل مصور أو منسق صوت).",
                        "تسعير ديناميكي للمنتجات: نظام ذكي يتيح لمقدمي الخدمات عرض منتج واحد بمتغيرات متعددة (كالألوان والأحجام) بأسعار مستقلة.",
                        "نظام مالي مؤتمت: مدفوعات مؤتمتة بالكامل تلغي الحجوزات غير المدفوعة آلياً ضمن إطار زمني محدد.",
                        "عمليات آمنة ومكافحة للاحتيال: حوكمة تشغيلية صارمة تتطلب مراجعة يدوية للوثائق قبل إتاحة أي خدمة أو منتج.",
                        "تجربة مستخدم مرنة: دعم كامل للوضع الليلي والنهاري، مع واجهات ثنائية اللغة (العربية والإنجليزية)."
                    ]
                },
                {
                    "title": "الواجهة الخلفية (Backend & Laravel)",
                    "items": [
                        "التقنيات المستخدمة: Laravel 12 (PHP 8.2) و MySQL مع تطبيق العلاقات متعددة الأشكال (Polymorphic).",
                        "معمارية نظيفة (Clean Architecture): تطبيق أنماط Service Layer، Strategy Pattern، Actions Pattern، و API Resources.",
                        "المعالجة غير المتزامنة (Async): استخدام طوابير Laravel والأوامر المجدولة و Redis لتخزين وتأكيد الـ OTP بسرعة فائقة.",
                        "المصادقة والأمان: نظام محمي عبر Laravel Sanctum و Google OAuth2 و Spatie لـ RBAC الصارم.",
                        "بنية موجهة بالأحداث (Event-Driven): لضمان أقصى سرعة في استجابة النظام للأوامر."
                    ]
                },
                {
                    "title": "الواجهة الأمامية (React & Flutter)",
                    "items": [
                        "لوحات تحكم الويب (React): لوحات تحكم مزدوجة للمسؤولين ومقدمي الخدمات، تعتمد على Redux لإدارة الحالة ومصممة بـ Material-UI.",
                        "البرمجة الدفاعية: ابتكار خوارزمية 'الاستبدال الذكي للصور' للتعامل مع أخطاء الـ API المفقودة وضمان استقرار الواجهة.",
                        "تطبيق الموبايل للعملاء (Flutter): تطبيق مبني بنمط Cubit/Bloc لإدارة الحالة المتقدمة وضمان أداء فائق السرعة."
                    ]
                },
                {
                    "title": "ميزات تفاعلية متقدمة",
                    "items": [
                        "محادثة هجينة لحظية: دمج Google Cloud Firestore للمراسلة اللحظية، مع FCM للإشعارات المباشرة ونظام رد آلي (Bot).",
                        "دورة دفع صارمة: سير عمل يقوم فيه العملاء برفع إيصال دفع PDF، يُراجع يدوياً، ويُدار عبر معاملات قواعد بيانات صارمة لمنع تضارب الحجوزات.",
                        "إشعارات فورية عبر Firebase: تكامل سلس لمعالجة البيانات اللحظية وإرسال التنبيهات الفورية لجميع الأجهزة."
                    ]
                }
            ],
            "proj1_team": "كان بناء هذه المنصة رحلة هندسية برمجية مذهلة. أنا فخورة جداً بما حققناه معاً كفريق!",
            "proj1_sec_note": "مساهمتي في تطبيق الموبايل: قمت بتطوير دورة الحجز الكاملة وبرمجة منطق سياسة الحجوزات بالكامل. علاوة على ذلك، قمت بتهيئة وتشغيل المشروع بنجاح على نظام التشغيل iOS (الآيفون)، مع إجراء اختبارات شاملة لضمان عمل جميع الميزات بلا عيوب. تم بناء باقي أجزاء التطبيق، بما في ذلك هيكلة الكود وواجهة المستخدم، بواسطة زملائي في الفريق.",

            "proj2_title": "تطبيق هالو هومز (HaloHomes)",
            "proj2_desc": "تطبيق متكامل لتأجير وعرض المنازل يعتمد على معمارية MVC مع واجهة خلفية مبنية بـ Laravel.",
            "proj2_long_desc": "تطبيق 'هالو هومز' هو تطبيق لحجز الشقق السكنية تم تطويره كمشروع نهائي لمقرر لغات البرمجة. يقدم التطبيق تجربة متكاملة تهدف إلى تبسيط عملية الحجز من البداية وحتى النهاية للمستخدم والمالك.",
            "proj2_features": [
                {
                    "title": "ماذا يقدم HaloHomes؟",
                    "items": [
                        "البحث عن شقق سكنية في مدن مختلفة.",
                        "تصفية النتائج حسب السعر، الموقع، والمواصفات بدقة.",
                        "إتمام الحجوزات بخطوات سهلة وآمنة.",
                        "إدارة الحجوزات الحالية والسابقة ببساطة.",
                        "التواصل المباشر مع أصحاب الشقق."
                    ]
                },
                {
                    "title": "ميزات تركز على الراحة والمرونة:",
                    "items": [
                        "واجهات استخدام مريحة وبسيطة للمستخدم النهائي.",
                        "نظام ذكي يمنع تضارب الحجوزات ويضمن دقة التوفر.",
                        "إمكانية تعديل وإلغاء الحجز من قبل المستخدم.",
                        "تمكين المالك من تعديل بيانات الشقة وإدارتها بسلاسة.",
                        "إشعارات فورية وتنبيهات لأي تحديث جديد.",
                        "دعم كامل للوضع الليلي والنهاري.",
                        "دعم اللغتين العربية والإنجليزية.",
                        "قائمة مفضلة لحفظ الشقق المميزة للرجوع إليها."
                    ]
                }
            ],
            "proj2_team": "* الفريق: الواجهة الأمامية (سارة حجو وعمار عمار) | الواجهة الخلفية (بشار ش. والفريق).",

            "proj3_title": "بورتفوليو 3D تفاعلي",
            "proj3_desc": "موقعي الشخصي الذي يبرز مهاراتي باستخدام رسومات ثلاثية الأبعاد تفاعلية وحركات سلسة وتصميم زجاجي.",
            "proj3_long_desc": "موقعي الشخصي المتطور والمبني باستخدام تقنية React Three Fiber لتقديم تصييرات WebGL عالية الأداء. يعرض الموقع نماذج 3D تفاعلية قابلة للتحكم، مع حركات Framer-Motion سلسة جداً، وتصميم واجهة زجاجية (Glassmorphism) أنيقة لتقديم مهاراتي ومشاريعي بأكثر طريقة تفاعلية ومبتكرة."
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