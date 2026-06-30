import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, personalInfo } from '../../data/content';
import { getNavLinkTo, isNavLinkActive } from '../../lib/navigation';

const ease = [0.4, 0, 0.2, 1];

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [scrollDepth, setScrollDepth] = useState(0);
    const lastScrollY = useRef(0);

    const { scrollY } = useScroll();
    const location = useLocation();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = lastScrollY.current;

        if (latest > previous && latest > 100) {
            setIsVisible(false);
            setIsMobileMenuOpen(false);
        } else {
            setIsVisible(true);
        }

        setScrollDepth(Math.min(latest / 100, 1));
        lastScrollY.current = latest;
    });

    useEffect(() => {
        if (location.pathname !== '/' && location.pathname !== '/projects') {
            setActiveSection('');
            return undefined;
        }

        const handleScroll = () => {
            const sectionIds = ['home', 'approach', 'record', 'credentials', 'contact'];

            for (const sectionId of [...sectionIds].reverse()) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const renderNavLink = (link, { mobile = false } = {}) => {
        const navLinkTo = getNavLinkTo(link);
        const isActive = isNavLinkActive(link, location.pathname, activeSection);

        const linkStyle = mobile
            ? {
                fontFamily: 'var(--font-sans)',
                fontSize: '18px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--color-plum)' : 'rgba(40,30,70,0.85)',
                textDecoration: 'none',
                transition: 'color 150ms ease, transform 150ms ease',
                display: 'block',
            }
            : {
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontSize: '0.8125rem',
                color: isActive ? 'var(--color-plum)' : 'rgba(40,30,70,0.85)',
            };

        const commonClasses = mobile
            ? 'mobile-menu-item'
            : `px-3 py-2 text-sm tracking-wider transition-colors duration-200 ${isActive ? 'text-plum font-medium' : ''}`;

        const handleMouseEnter = (event) => {
            if (!isActive) {
                event.currentTarget.style.color = '#7E64E8';
            }
        };

        const handleMouseLeave = (event) => {
            if (!isActive) {
                event.currentTarget.style.color = mobile ? 'rgba(40,30,70,0.85)' : 'rgba(40,30,70,0.85)';
            }
        };

        return (
            <Link
                key={link.name}
                to={navLinkTo}
                className={commonClasses}
                style={linkStyle}
                onClick={closeMobileMenu}
                onMouseEnter={mobile ? undefined : handleMouseEnter}
                onMouseLeave={mobile ? undefined : handleMouseLeave}
                aria-current={isActive ? 'page' : undefined}
            >
                {link.name}
            </Link>
        );
    };

    // Scroll-reactive nav styles
    const blurAmount = 16 + scrollDepth * 8;
    const navShadowOpacity = 0.18 + scrollDepth * 0.08;

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.4, ease }}
                style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
            >
                <nav
                    className="mobile-nav-container transition-all duration-300"
                    style={{
                        maxWidth: '1100px',
                        margin: '20px auto 0',
                        padding: '14px 28px',
                        borderRadius: '999px',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(255,255,255,0.18))',
                        backdropFilter: `blur(${blurAmount}px) saturate(120%)`,
                        WebkitBackdropFilter: `blur(${blurAmount}px) saturate(120%)`,
                        border: '1px solid rgba(255,255,255,0.35)',
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6), 0 15px 40px rgba(120,100,200,${navShadowOpacity})`,
                    }}
                >
                    <div className="flex items-center justify-between">
                        {/* Logo — clean morph (G → Shubhankar) */}
                        <Link
                            to="/"
                            className="font-bold text-xl"
                            style={{
                                fontFamily: 'var(--font-serif)',
                                textDecoration: 'none',
                                position: 'relative',
                                display: 'inline-block',
                                width: '5.5rem',
                                height: '1.5em',
                            }}
                            onMouseEnter={() => setIsLogoHovered(true)}
                            onMouseLeave={() => setIsLogoHovered(false)}
                            onClick={closeMobileMenu}
                        >
                            {/* Short state: G */}
                            <span
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    opacity: isLogoHovered ? 0 : 1,
                                    transform: isLogoHovered ? 'translateY(-4px)' : 'translateY(0)',
                                    transition: 'opacity 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)',
                                    color: 'var(--color-text-primary)',
                                }}
                            >
                                G
                            </span>
                            {/* Full state: Shubhankar */}
                            <span
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    opacity: isLogoHovered ? 1 : 0,
                                    transform: isLogoHovered ? 'translateY(0)' : 'translateY(4px)',
                                    letterSpacing: isLogoHovered ? '0.02em' : '0.12em',
                                    transition: 'opacity 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1), letter-spacing 0.25s cubic-bezier(0.4,0,0.2,1)',
                                    color: 'var(--color-plum)',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Shubhankar
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-2">
                            {navLinks.map((link) => renderNavLink(link))}
                        </div>

                        {/* Hamburger — morphs ☰ → × */}
                        <button
                            className="md:hidden relative w-6 h-5"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            style={{ color: 'rgba(40,30,70,0.85)' }}
                        >
                            <span
                                className="absolute left-0 w-full h-[1.5px] rounded-full"
                                style={{
                                    background: 'currentColor',
                                    top: isMobileMenuOpen ? '50%' : '0',
                                    transform: isMobileMenuOpen ? 'rotate(45deg)' : 'rotate(0)',
                                    transition: 'top 250ms cubic-bezier(0.4,0,0.2,1), transform 250ms cubic-bezier(0.4,0,0.2,1)',
                                }}
                            />
                            <span
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.5px] rounded-full"
                                style={{
                                    background: 'currentColor',
                                    opacity: isMobileMenuOpen ? 0 : 1,
                                    transition: 'opacity 150ms ease',
                                }}
                            />
                            <span
                                className="absolute left-0 w-full h-[1.5px] rounded-full"
                                style={{
                                    background: 'currentColor',
                                    bottom: isMobileMenuOpen ? 'calc(50% - 0.75px)' : '0',
                                    top: isMobileMenuOpen ? '50%' : 'auto',
                                    transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'rotate(0)',
                                    transition: 'top 250ms cubic-bezier(0.4,0,0.2,1), bottom 250ms cubic-bezier(0.4,0,0.2,1), transform 250ms cubic-bezier(0.4,0,0.2,1)',
                                }}
                            />
                        </button>
                    </div>
                </nav>

                {/* Mobile dropdown panel — positioned below nav */}
                <div
                    className="md:hidden"
                    style={{
                        maxWidth: '1100px',
                        margin: '0 auto',
                        padding: '0 12px',
                    }}
                >
                    <div
                        className="mobile-dropdown-panel"
                        style={{
                            maxHeight: isMobileMenuOpen ? '500px' : '0',
                            opacity: isMobileMenuOpen ? 1 : 0,
                            overflow: 'hidden',
                            background: 'rgba(255,255,255,0.6)',
                            backdropFilter: 'blur(20px) saturate(120%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(120%)',
                            borderRadius: '0 0 24px 24px',
                            borderBottom: isMobileMenuOpen ? '1px solid rgba(200,190,255,0.4)' : 'none',
                            borderLeft: isMobileMenuOpen ? '1px solid rgba(200,190,255,0.25)' : 'none',
                            borderRight: isMobileMenuOpen ? '1px solid rgba(200,190,255,0.25)' : 'none',
                            boxShadow: isMobileMenuOpen ? '0 20px 40px rgba(120,100,200,0.12)' : 'none',
                            transition: 'max-height 0.35s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.25s ease',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '24px',
                                padding: '32px',
                            }}
                        >
                            {navLinks.map((link) => renderNavLink(link, { mobile: true }))}
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Background dim overlay */}
            <div
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.08)',
                    opacity: isMobileMenuOpen ? 1 : 0,
                    pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease',
                    zIndex: 40,
                }}
            />
        </>
    );
};

export default Navbar;
