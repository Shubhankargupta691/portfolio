import { useEffect, useState } from 'react';
import LinkPreview from './link-preview';

const MOBILE_QUERY = '(max-width: 767px)';

const getInitialMobileState = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia(MOBILE_QUERY).matches;
};

const ExternalLinkPreview = ({
    url,
    children,
    className,
    isStatic = false,
    width = 200,
    height = 125,
    quality = 50,
    target = '_blank',
    rel = 'noopener noreferrer',
    ...props
}) => {
    const [isMobile, setIsMobile] = useState(getInitialMobileState);

    useEffect(() => {
        const mediaQuery = window.matchMedia(MOBILE_QUERY);

        const updateMobileState = (event) => {
            setIsMobile(event.matches);
        };

        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', updateMobileState);

        return () => {
            mediaQuery.removeEventListener('change', updateMobileState);
        };
    }, []);

    if (isMobile) {
        return (
            <a href={url} className={className} target={target} rel={rel} {...props}>
                {children}
            </a>
        );
    }

    return (
        <LinkPreview
            url={url}
            className={className}
            target={target}
            rel={rel}
            isStatic={isStatic}
            width={width}
            height={height}
            quality={quality}
            {...props}
        >
            {children}
        </LinkPreview>
    );
};

export default ExternalLinkPreview;
