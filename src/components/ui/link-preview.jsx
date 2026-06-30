import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const getMicrolinkEndpoint = (url, quality) => {
    const params = new URLSearchParams({
        url,
        screenshot: 'true',
        meta: 'false',
        iframe: 'false',
        embed: 'screenshot.url',
        'screenshot.quality': String(quality),
    });

    return `https://api.microlink.io/?${params.toString()}`;
};

const LinkPreview = ({
    children,
    className,
    url,
    isStatic = true,
    imageSrc,
    width = 200,
    height = 125,
    quality = 50,
    target = '_blank',
    rel = 'noopener noreferrer',
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState(isStatic ? imageSrc : '');
    const [hasFetchError, setHasFetchError] = useState(false);

    const endpoint = useMemo(() => getMicrolinkEndpoint(url, quality), [url, quality]);

    useEffect(() => {
        if (!isOpen || isStatic || previewSrc || hasFetchError) {
            return;
        }

        let isMounted = true;

        const fetchPreview = async () => {
            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error('Microlink request failed');
                }

                const payload = await response.json();
                const screenshotUrl = payload?.data?.screenshot?.url;

                if (isMounted && screenshotUrl) {
                    setPreviewSrc(screenshotUrl);
                }
            } catch {
                if (isMounted) {
                    setHasFetchError(true);
                }
            }
        };

        fetchPreview();

        return () => {
            isMounted = false;
        };
    }, [endpoint, hasFetchError, isOpen, isStatic, previewSrc]);

    return (
        <span className="relative inline-flex">
            <a
                href={url}
                className={className}
                target={target}
                rel={rel}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                {...props}
            >
                {children}
            </a>

            <AnimatePresence>
                {isOpen && previewSrc && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                        className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 overflow-hidden rounded-xl border"
                        style={{
                            width,
                            height,
                            borderColor: 'var(--color-divider)',
                            background: 'var(--color-surface-card)',
                            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
                        }}
                    >
                        <img
                            src={previewSrc}
                            alt={`${url} preview`}
                            width={width}
                            height={height}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};

export default LinkPreview;
