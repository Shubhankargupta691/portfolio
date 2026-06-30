import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, hero } from '../../data/content';
import ExternalLinkPreview from '../ui/ExternalLinkPreview';

const ease = [0.4, 0, 0.2, 1];

const Hero = () => {
    const grooveRef = useRef(null);
    const sectionRef = useRef(null);
    const [grooveOpacity, setGrooveOpacity] = useState(1);

    // Groove parallax — subtle mousemove shift
    const handleMouseMove = useCallback((e) => {
        if (!grooveRef.current || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        grooveRef.current.style.transform = `translate(${x * 5}px, ${y * 3}px)`;
    }, []);

    // Scroll-reactive groove opacity
    useEffect(() => {
        const handleScroll = () => {
            const depth = Math.min(window.scrollY / 100, 1);
            setGrooveOpacity(1 + depth * 0.15); // 1.0 → 1.15
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-screen min-h-dvh flex items-end overflow-hidden"
            style={{ paddingBottom: 'clamp(4rem, 10vh, 8rem)' }}
            onMouseMove={handleMouseMove}
        >
            {/* Layer 1 — Top-down lilac wash (intensified) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(199,184,255,0.32) 0%, rgba(199,184,255,0.15) 35%, transparent 62%)',
                }}
            />

            {/* Shading depth — top-right quadrant */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 80% 20%, rgba(199,184,255,0.18), transparent 60%)',
                }}
            />

            {/* Layer 2 — Organic groove lines (with parallax) */}
            <svg
                ref={grooveRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1440 900"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    filter: 'blur(0.5px)',
                    mixBlendMode: 'multiply',
                    opacity: grooveOpacity,
                    transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
                }}
            >
                {/* Top — lighter */}
                <path d="M-20 140 Q 250 90, 540 170 T 1050 120 T 1460 195" stroke="rgba(0,0,0,0.10)" strokeWidth="1.0" fill="none" />
                {/* Upper-mid — moderate */}
                <path d="M-40 300 Q 200 240, 520 330 T 980 270 T 1460 350" stroke="rgba(0,0,0,0.14)" strokeWidth="1.6" fill="none" />
                {/* Mid — strongest */}
                <path d="M-10 460 Q 320 390, 680 480 T 1180 420 T 1460 500" stroke="rgba(0,0,0,0.18)" strokeWidth="2.2" fill="none" />
                {/* Lower-mid — moderate */}
                <path d="M-30 620 Q 280 560, 620 640 T 1080 590 T 1460 660" stroke="rgba(0,0,0,0.13)" strokeWidth="1.4" fill="none" />
                {/* Bottom — softer near text */}
                <path d="M-50 770 Q 310 730, 700 790 T 1150 750 T 1460 800" stroke="rgba(0,0,0,0.08)" strokeWidth="1.0" fill="none" />
            </svg>

            {/* Noise mask over grooves (embeds them into paper) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.03,
                    mixBlendMode: 'overlay',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='gn'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23gn)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Layer 3 — Paper texture */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.05,
                    mixBlendMode: 'multiply',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="section-container relative z-10 w-full">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">
                    {/* Left — Editorial content */}
                    <div className="max-w-2xl">
                        {/* Overline */}
                        <motion.p
                            className="track-title mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease }}
                        >
                            Aspiring Penetration Tester | Passionate About Offensive Security
                        </motion.p>

                        {/* H1 — Large serif name */}
                        <motion.h1
                            className="text-name mb-6"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease, delay: 0.1 }}
                        >
                            Shubhankar<br />Gupta
                        </motion.h1>

                        {/* Statement */}
                        <motion.p
                            className="text-display-md text-text-secondary max-w-lg pt-5"
                            style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease, delay: 0.25 }}
                        >
                            {hero.statement}
                        </motion.p>

                        {/* Subtext */}
                        <motion.p
                            className="text-liner mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.45 }}
                        >
                            {hero.subtext}
                        </motion.p>
                    </div>

                    {/* Right — CTA + Social */}
                    <motion.div
                        className="flex flex-col items-start md:items-end gap-5 md:gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease, delay: 0.5 }}
                    >
                        <a href="/resume" className="cta-primary group">
                            View Resume
                        </a>

                        <div className="flex items-center gap-6">
                            <ExternalLinkPreview
                                url={personalInfo.github}
                                isStatic={false}
                                className="link-quiet social-tooltip-wrap"
                                data-tooltip="GitHub Profile"
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </ExternalLinkPreview>
                            <ExternalLinkPreview
                                url={personalInfo.linkedin}
                                isStatic={false}
                                className="link-quiet social-tooltip-wrap"
                                data-tooltip="LinkedIn"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </ExternalLinkPreview>
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className="link-quiet social-tooltip-wrap"
                                data-tooltip="Email"
                                aria-label="Email"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Editorial divider at bottom */}
            <div className="absolute bottom-0 left-0 right-0">
                <div className="section-container">
                    <div className="editorial-divider" />
                </div>
            </div>
        </section>
    );
};

export default Hero;

