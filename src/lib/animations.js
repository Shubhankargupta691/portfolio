// Animation variants for Framer Motion
// Shopify Editions-style: deliberate, slow, impactful. 60fps or nothing.

// Easing functions - smooth, cinematic curves
export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeOutQuint = [0.22, 1, 0.36, 1];
export const easeInOutQuart = [0.76, 0, 0.24, 1];

// --- FADE VARIANTS ---

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: easeOutExpo }
    }
};

export const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: easeOutExpo }
    }
};

export const fadeInDown = {
    hidden: { opacity: 0, y: -40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: easeOutExpo }
    }
};

export const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: easeOutExpo }
    }
};

export const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: easeOutExpo }
    }
};

// --- REVEAL VARIANTS (Shopify Editions style) ---

// Sections should "arrive", not appear
export const sectionReveal = {
    hidden: {
        opacity: 0,
        y: 100,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 1.2,
            ease: easeOutExpo,
        }
    }
};

// Slow kinetic reveal for hero headlines
export const heroReveal = {
    hidden: {
        opacity: 0,
        y: 80,
        filter: 'blur(20px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 1.4,
            ease: easeOutExpo,
        }
    }
};

// Text reveal with blur - for emphasis
export const textReveal = {
    hidden: {
        opacity: 0,
        y: 30,
        filter: 'blur(10px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 1,
            ease: easeOutExpo,
        }
    }
};

// Scale in with fade - for cards
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: easeOutExpo }
    }
};

// --- STAGGER CONTAINERS ---

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
        }
    }
};

export const staggerContainerSlow = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2
        }
    }
};

export const staggerHeroText = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.5
        }
    }
};

// --- HOVER & INTERACTION STATES ---

// Subtle lift on hover - not bouncy
export const hoverLift = {
    rest: { y: 0, scale: 1 },
    hover: {
        y: -6,
        scale: 1.01,
        transition: {
            duration: 0.4,
            ease: easeOutQuint
        }
    }
};

// Glow effect on hover
export const hoverGlow = {
    rest: {
        boxShadow: '0 0 0 rgba(255, 107, 0, 0)',
    },
    hover: {
        boxShadow: '0 0 50px -10px rgba(255, 107, 0, 0.2)',
        transition: { duration: 0.4, ease: easeOutQuint }
    }
};

// Card hover with border highlight
export const cardHover = {
    rest: {
        borderColor: 'rgba(255, 255, 255, 0.05)',
        y: 0,
    },
    hover: {
        borderColor: 'rgba(255, 107, 0, 0.3)',
        y: -4,
        transition: { duration: 0.3, ease: easeOutQuint }
    }
};

// --- NAVIGATION ---

export const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: easeOutExpo,
            delay: 0.3
        }
    }
};

export const navHide = {
    visible: { y: 0, opacity: 1 },
    hidden: {
        y: -100,
        opacity: 0,
        transition: { duration: 0.4, ease: easeInOutQuart }
    }
};

// --- CHARACTER & WORD ANIMATIONS ---

// For animating individual characters
export const charReveal = {
    hidden: {
        opacity: 0,
        y: 50,
        rotateX: -90,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.6,
            ease: easeOutExpo,
        }
    }
};

// For animating individual words
export const wordReveal = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: easeOutExpo,
        }
    }
};

// --- PARALLAX HELPERS ---

// These return transform values for scroll-linked animations
export const parallaxSlow = (scrollProgress) => ({
    y: scrollProgress * -50,
});

export const parallaxMedium = (scrollProgress) => ({
    y: scrollProgress * -100,
});

export const parallaxFast = (scrollProgress) => ({
    y: scrollProgress * -200,
});

// Opacity fade based on scroll
export const scrollFade = (scrollProgress) => ({
    opacity: 1 - scrollProgress,
});

// --- SPRING PHYSICS ---

export const springTransition = {
    type: 'spring',
    stiffness: 200,
    damping: 30,
    mass: 1,
};

export const gentleSpring = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 1,
};

export const snappySpring = {
    type: 'spring',
    stiffness: 400,
    damping: 35,
    mass: 0.8,
};

// --- SLIDE VARIANTS ---

export const slideInFromLeft = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: easeOutExpo }
    }
};

export const slideInFromRight = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: easeOutExpo }
    }
};

export const slideInFromBottom = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: easeOutExpo }
    }
};

// --- METRIC COUNTER ---

// For use with Framer Motion's useSpring
export const metricSpring = {
    stiffness: 100,
    damping: 30,
    duration: 2,
};

// --- DELAYS ---

export const withDelay = (variants, delay) => ({
    ...variants,
    visible: {
        ...variants.visible,
        transition: {
            ...variants.visible.transition,
            delay,
        }
    }
});
