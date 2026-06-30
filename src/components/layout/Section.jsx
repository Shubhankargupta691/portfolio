import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

const Section = ({
    id,
    children,
    className = '',
    title,
    subtitle,
    fullHeight = false,
    noPadding = false,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id={id}
            ref={ref}
            className={`
        ${fullHeight ? 'min-h-screen' : ''}
        ${noPadding ? '' : 'section-padding'}
        ${className}
      `}
        >
            <motion.div
                className="section-container"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {(title || subtitle) && (
                    <motion.div className="mb-16" variants={fadeInUp}>
                        {subtitle && (
                            <span className="inline-block text-accent text-base font-medium tracking-wider uppercase mb-3">
                                {subtitle}
                            </span>
                        )}
                        {title && (
                            <h2 className="text-display-sm md:text-display-md font-bold text-text-primary" style={{ fontFamily: 'var(--font-sans)',}}>
                                {title}
                            </h2>
                        )}
                    </motion.div>
                )}
                {children}
            </motion.div>
        </section>
    );
};

export default Section;
