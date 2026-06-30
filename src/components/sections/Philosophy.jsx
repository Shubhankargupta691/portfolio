import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { philosophy, sectionTitles } from '../../data/content';

const ease = [0.16, 1, 0.3, 1];

const Philosophy = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="approach" ref={ref} className="section-padding relative">
            {/* Subtle section background wash */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        linear-gradient(180deg,
                            transparent 0%,
                            rgba(232, 224, 240, 0.2) 30%,
                            rgba(232, 224, 240, 0.25) 50%,
                            rgba(232, 224, 240, 0.2) 70%,
                            transparent 100%
                        )
                    `,
                }}
            />
            <div className="section-container relative">
                {/* Header */}
                <motion.header
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease }}
                >
                    <span className="track-title">{sectionTitles.philosophy}</span>
                    <h2 className="text-display-xl text-text-primary mt-4">
                        {philosophy.intro}
                    </h2>
                </motion.header>

                {/* Pillars — 2x2 grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {philosophy.pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            className="card p-6 md:p-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease, delay: index * 0.08 }}
                        >
                            <h3 className="text-display-sm text-text-primary mb-3">
                                {pillar.title}
                            </h3>
                            <p className="text-liner">
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Credo */}
                <motion.div
                    className="pt-12"
                    style={{ borderTop: '1px solid var(--color-divider-strong)' }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <blockquote 
                        className="text-display-md text-text-secondary pt-5"
                        style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
                    >
                        "{philosophy.credo}"
                    </blockquote>
                </motion.div>
            </div>
        </section>
    );
};

export default Philosophy;
