import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const projectsData = [
    {
        id: 1,
        title: 'Royal Events Platform',
        description: 'A comprehensive event management platform featuring global state management and real-time database integration.',
        longDescription: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ margin: 0 }}>
                    Ever thought about the hassle of event planning—juggling venue bookings, equipment rentals, and payments across multiple parties?
                    To solve this real-world challenge, our team built Royal Events, a comprehensive platform designed to digitize the event industry and connect customers with service providers under one reliable digital roof.
                </p>
                <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--accent-light)' }}>
                    To deliver a highly scalable and professional system, we adopted a Decoupled Architecture, seamlessly integrating three core systems:
                </p>
            </div>
        ),
        featuresConfig: [
            {
                title: 'What does Royal Events offer?',
                items: [
                    'All-in-One Marketplace: A unified platform combining venue booking, furniture, lighting, photography, and event coordination.',
                    'Field Recruitment for Freelancers: A dedicated portal for companies to post job offers for specific field tasks.',
                    'Dynamic Product Pricing: A smart system enabling providers to list a single product with multiple variants and independent prices.',
                    'Automated Financial System: Fully automated payments that auto-cancel unpaid bookings within a specific timeframe.',
                    'Anti-Fraud & Secure Operations: Strict operational governance requiring manual document review for all services.',
                    'Flexible UX: Full support for Light & Dark Mode, along with bilingual interfaces (Arabic and English).'
                ]
            },
            {
                title: 'Backend & Architecture (Laravel)',
                items: [
                    'Tech Stack: Laravel 12 (PHP 8.2) & MySQL with Polymorphic Relationships.',
                    'Clean Architecture: Implemented the Service Layer Pattern, Strategy Pattern, Actions Pattern, and API Resources.',
                    'Async Processing: Utilized Laravel Queues & Jobs, Scheduled Commands, and Redis for lightning-fast OTP storage.',
                    'Auth & Security: Powered by Laravel Sanctum, Google OAuth2, and Spatie Laravel-Permission for granular RBAC.',
                    'Event-Driven: Adopted an Event-Driven Architecture for maximum responsiveness.'
                ]
            },
            {
                title: 'Frontend (React & Flutter)',
                items: [
                    'Web Dashboards (React): Dual Dashboards tailored for Admins and Providers, relying on Redux for state management and styled with Material-UI.',
                    'Defensive Programming: Invented a "Smart Image Fallback" algorithm to handle missing API data and ensure UI stability.',
                    'Customer Mobile App (Flutter): Cross-platform app adopting the Cubit/Bloc pattern for advanced State Management and fast performance.'
                ]
            },
            {
                title: 'Advanced Interactive Features',
                items: [
                    'Real-Time Hybrid Chat: Integrated Google Cloud Firestore for live messaging, paired with FCM for push notifications and an Automated Bot.',
                    'Strict Payment Cycle: Workflow where customers upload a PDF payment proof, reviewed manually, with strict Database Transactions to prevent capacity conflicts.',
                    'Instant Notifications & Firebase: Seamless integration with Firebase for real-time data handling and instant alerts across all devices.'
                ]
            }
        ],
        image: '/projects/img.png',
        videoUrl: '/videos/royalreact.mp4',
        secondaryVideoUrl: '/videos/royalmobile.mp4',
        secondaryGithubUrl: 'https://github.com/sarahhajjo/events-app-ios', // رابط الريبو للموبايل هنا
        secondaryNote: 'My contribution to the mobile app: I developed the complete booking cycle and the full booking policy logic. Furthermore, I successfully configured and deployed the project on iOS (iPhone), conducting thorough testing to ensure all features functioned flawlessly. The rest of the app, including code structure and UI, was built by my teammates.',        sourceGithubUrl: 'https://github.com/sarahhajjo/Royal-Event', // رابط المصدر (يظهر تحت الفيديو الأساسي) - غيّريه للرابط الصحيح
        tags: ['React.js', 'Laravel', 'Flutter', 'Redux', 'Cubit', 'Firebase', 'Dio', 'Material-UI'],
    },
    {
        id: 2,
        title: 'HaloHomes Application',
        description: 'A complete house rental and listing mobile application utilizing an MVC architecture with a Laravel backend.',
        longDescription: 'HaloHomes is a residential apartment booking application developed as our final project for the Programming Languages course. It offers an integrated experience aimed at simplifying the booking process from start to finish.',
        featuresConfig: [
            {
                title: 'What does HaloHomes offer?',
                items: [
                    'Search for residential apartments across different cities.',
                    'Filter results by price, location, and specifications.',
                    'Complete bookings with easy and secure steps.',
                    'Manage current and past reservations.',
                    'Direct communication with apartment owners.'
                ]
            },
            {
                title: 'Features focused on comfort and flexibility:',
                items: [
                    'User-friendly and simple interfaces.',
                    'A smart system that prevents booking conflicts and ensures accurate availability.',
                    'Ability for the user to modify bookings.',
                    'Empowering the owner to edit and manage apartment data.',
                    'Instant notifications for any updates.',
                    'Dark and Light mode support.',
                    'Bilingual support (Arabic and English).',
                    'A favorites list to save premium apartments.'
                ]
            }
        ],
        image: '/projects/img_1.png',
        videoUrl: '/videos/halohomes.mp4',
        tags: ['Flutter (MVC)', 'Laravel', 'GetX', 'HTTP'],
        githubUrl: 'https://github.com/sarahhajjo/HaloHomes_app'
    },
    {
        id: 3,
        title: '3D Interactive Portfolio',
        description: 'My personal portfolio website featuring immersive 3D web graphics, high-performance animations, and custom UI.',
        longDescription: 'A cutting-edge personal portfolio utilizing React Three Fiber for WebGL rendering. It showcases interactive 3D models, smooth framer-motion animations, and a sleek glassmorphism UI design to present my skills and projects interactively.',
        image: '/projects/img_2.png',
        videoUrl: '/videos/portfolio.mp4',
        tags: ['React', 'Three.js', 'Framer Motion'],
        githubUrl: 'https://github.com/sarahhajjo'
    }
];

// زر الجيت هب (boxSizing: 'border-box' هو الحل لمشكلة خروج الزر عن عرض الفيديو)
const GithubButton = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="tech-font"
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxSizing: 'border-box',
            width: '100%',
            padding: '1rem 2rem',
            border: '2px solid #DD99BB',
            backgroundColor: 'transparent',
            color: '#DD99BB',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#DD99BB';
            e.currentTarget.style.color = '#1F1A38';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#DD99BB';
        }}
    >
        {children}
    </a>
);
const getTagColor = (tag) => {
    const t = tag.toLowerCase();
    if (t.includes('flutter')) return '#42A5F5';   // أزرق
    if (t.includes('laravel')) return '#FF2D20';   // أحمر
    if (t.includes('react')) return '#61DAFB';     // سماوي (لون React)
    if (t.includes('redux')) return '#A78BFA';     // بنفسجي فاتح
    if (t.includes('cubit') || t.includes('bloc')) return '#2DD4BF'; // تركوازي
    if (t.includes('firebase')) return '#FFCA28';  // أصفر
    if (t.includes('dio')) return '#FB923C';       // برتقالي
    if (t.includes('material')) return '#4DA3FF';  // أزرق Material-UI
    if (t.includes('three')) return '#E5E7EB';     // رمادي فاتح
    if (t.includes('framer')) return '#F472B6';    // وردي
    if (t.includes('getx') || t.includes('http')) return '#4CAF50'; // أخضر
    return '#DD99BB';
};

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projectsData.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return <div style={{ color: '#ffffff', textAlign: 'center', marginTop: '20vh', fontSize: '2rem' }}>Project not found!</div>;
    }

    const lists = project.featuresConfig || [];
    const hasVideo = Boolean(project.secondaryVideoUrl || project.secondaryGithubUrl);

    // لما في فيديو: العمود الأيسر = القائمة 1 + القوائم من الرابعة وما فوق، والأيمن = القائمتين 2 و3 ثم الفيديو
    const leftLists = hasVideo ? lists.map((l, i) => ({ l, i })).filter(({ i }) => i === 0 || i >= 3) : [];
    const rightLists = hasVideo ? lists.map((l, i) => ({ l, i })).filter(({ i }) => i === 1 || i === 2) : [];

    const renderList = (list, idx) => (
        <div key={idx} style={{ order: idx }}>
            <h3 className="tech-font" style={{ color: '#DD99BB', marginBottom: '1.2rem', fontSize: '1.3rem' }}>
                {list.title}
            </h3>
            <ul style={{ color: '#ffffff', fontFamily: 'inherit', paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '1rem', lineHeight: '1.6' }}>
                {list.items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <div style={{ backgroundColor: '#1F1A38', minHeight: '100vh', overflowX: 'hidden' }}>
            {/* ستايل الـ grid: 3 أعمدة على الشاشات الكبيرة، والفيديو بياخد عمودين (يغطي المساحة الفاضية) */}
            <style>{`
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 3rem;
                    border-top: 1px solid rgba(221, 153, 187, 0.2);
                    padding-top: 2.5rem;
                }
                /* لما في فيديو: على الشاشات الصغيرة كل شي تحت بعض بنفس ترتيب القوائم */
                .features-split {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                    border-top: 1px solid rgba(221, 153, 187, 0.2);
                    padding-top: 2.5rem;
                }
                .features-left, .features-right, .features-right-lists { display: contents; }

                /* على الشاشات الكبيرة: عمود أيسر (القائمة 1 و4) + عمود أيمن (القائمتين 2 و3 والفيديو تحتهم) */
                @media (min-width: 1250px) {
                    .features-split {
                        display: grid;
                        grid-template-columns: 1fr 2fr;
                        gap: 3rem;
                        align-items: start;
                    }
                    .features-left {
                        display: flex;
                        flex-direction: column;
                        gap: 2.5rem;
                    }
                    .features-right {
                        display: flex;
                        flex-direction: column;
                        gap: 2.5rem;
                    }
                    .features-right-lists {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 3rem;
                    }
                }
            `}</style>

            <Navbar />

            <section style={{
                padding: '120px 5% 4rem 5%',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        border: '1px solid rgba(221, 153, 187, 0.3)',
                        borderRadius: '24px',
                        padding: '3rem',
                        backgroundColor: 'rgba(31, 26, 56, 0.4)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3rem'
                    }}
                >

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4rem',
                        alignItems: 'flex-start'
                    }}>
                        {/* النصف الأيسر: الفيديو الأساسي */}
                        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{
                                width: '100%',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '1px solid rgba(221, 153, 187, 0.3)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                backgroundColor: '#000',
                                position: 'relative',
                                paddingTop: '56.25%'
                            }}>
                                <video
                                    src={project.videoUrl}
                                    controls
                                    autoPlay
                                    muted
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        display: 'block',
                                        objectFit: 'contain'
                                    }}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            {/* زر الجيت هب للمصدر: تحت الفيديو الأساسي */}
                            {project.sourceGithubUrl && (
                                <GithubButton href={project.sourceGithubUrl}>
                                    View Source Code on GitHub ➔
                                </GithubButton>
                            )}
                        </div>

                        {/* النصف الأيمن: النص والتفاصيل */}
                        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h1 className="tech-font" style={{ fontSize: '3.5rem', margin: 0, color: '#DD99BB', lineHeight: 1.1 }}>
                                {project.title}
                            </h1>

                            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                                {project.tags.map(tag => (
                                    <span key={tag} style={{
                                        color: getTagColor(tag),
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div style={{ color: '#ffffff', fontSize: '1.1rem', lineHeight: '1.8', marginTop: '1rem' }}>
                                {project.longDescription}
                            </div>

                            {/* تم ترك زر الجيت هب الأساسي محذوفاً كما طلبتِ */}
                        </div>
                    </div>

                    {/* --- قسم المميزات والفيديو الإضافي --- */}
                    {lists.length > 0 && !hasVideo && (
                        <div className="features-grid">
                            {lists.map((list, idx) => renderList(list, idx))}
                        </div>
                    )}

                    {hasVideo && (
                        <div className="features-split">
                            {/* العمود الأيسر */}
                            <div className="features-left">
                                {leftLists.map(({ l, i }) => renderList(l, i))}
                            </div>

                            {/* العمود الأيمن: القائمتين 2 و3، والفيديو مباشرة تحتهم */}
                            <div className="features-right">
                                <div className="features-right-lists">
                                    {rightLists.map(({ l, i }) => renderList(l, i))}
                                </div>

                                <div style={{ order: 99, display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                                    {project.secondaryVideoUrl && (
                                        <div style={{
                                            width: '100%',
                                            aspectRatio: '16 / 9', // 👈 '16 / 10' أقصر شوي، '4 / 3' أطول
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            border: '1px solid rgba(221, 153, 187, 0.3)',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                            backgroundColor: '#000',
                                            position: 'relative'
                                        }}>
                                            <video
                                                src={project.secondaryVideoUrl}
                                                controls
                                                autoPlay
                                                loop
                                                muted
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'block',
                                                    objectFit: 'cover' // 👈 إذا انقص التلفون كتير بدليها 'contain'
                                                }}
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    )}

                                    {/* ملاحظة مساهمتي بتطبيق الموبايل */}
                                    {project.secondaryNote && (
                                        <p style={{
                                            margin: 0,
                                            padding: '0.9rem 1.2rem',
                                            borderLeft: '3px solid #DD99BB',
                                            backgroundColor: 'rgba(221, 153, 187, 0.08)',
                                            borderRadius: '0 8px 8px 0',
                                            color: '#EAD7D1',
                                            fontSize: '0.95rem',
                                            lineHeight: '1.6',
                                            fontStyle: 'italic'
                                        }}>
                                            {project.secondaryNote}
                                        </p>
                                    )}

                                    {/* زر الجيت هب لتطبيق الموبايل */}
                                    {project.secondaryGithubUrl && (
                                        <GithubButton href={project.secondaryGithubUrl}>
                                            View Mobile App on GitHub ➔
                                        </GithubButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {project.teamNote && (
                        <p style={{ fontSize: '0.9rem', color: '#EAD7D1', fontStyle: 'italic', marginTop: '1rem', textAlign: 'center' }}>
                            {project.teamNote}
                        </p>
                    )}

                </motion.div>
            </section>
        </div>
    );
};

export default ProjectDetails;