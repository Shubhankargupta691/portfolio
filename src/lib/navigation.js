const DEFAULT_SCROLL_BEHAVIOR = 'smooth';
const MAX_HASH_SCROLL_ATTEMPTS = 8;

export const createSectionTo = (hash) => ({
    pathname: '/',
    hash: `#${hash}`,
});

export const getNavLinkTo = (link) => {
    if (link.type === 'section') {
        return createSectionTo(link.hash);
    }

    return link.path;
};

const pathMatches = (pathname, path) => pathname === path || pathname.startsWith(`${path}/`);

export const isNavLinkActive = (link, pathname, activeSection) => {
    if (link.type === 'section') {
        return pathname === '/' && activeSection === link.hash;
    }

    const paths = [link.path, ...(link.aliases ?? [])];
    return paths.some((path) => pathMatches(pathname, path));
};

export const scrollToHash = (hash) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return false;
    }

    const targetHash = hash.startsWith('#') ? hash.slice(1) : hash;
    if (!targetHash) {
        return false;
    }

    const element = document.getElementById(targetHash);
    if (!element) {
        return false;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : DEFAULT_SCROLL_BEHAVIOR,
        block: 'start',
    });

    return true;
};

export const scheduleHashScroll = (hash, maxAttempts = MAX_HASH_SCROLL_ATTEMPTS) => {
    if (typeof window === 'undefined') {
        return () => {};
    }

    let attempts = 0;
    let frameId = 0;

    const attemptScroll = () => {
        if (scrollToHash(hash)) {
            return;
        }

        attempts += 1;
        if (attempts >= maxAttempts) {
            return;
        }

        frameId = window.requestAnimationFrame(attemptScroll);
    };

    frameId = window.requestAnimationFrame(attemptScroll);

    return () => {
        if (frameId) {
            window.cancelAnimationFrame(frameId);
        }
    };
};
