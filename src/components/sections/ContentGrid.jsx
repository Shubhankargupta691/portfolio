import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { philosophy, projects, platforms, Certifications } from '../../data/content';

const ease = [0.16, 1, 0.3, 1];

const columns = [
    {
        title: 'Techniques',
        items: philosophy.pillars.map(p => p.title),
    },
    {
        title: 'PORTFOLIO',
        items: platforms.platforms.map(p => p.title),
        links: platforms.platforms.map(p => p.link),
    },
    {
        title: 'CERTIFICATIONS',
        items: Certifications.certs.map(c => c.title),
        links: Certifications.certs.map(c => c.link),
    }
];

const ContentGrid = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} className="section-padding">
            <div className="section-container">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-0"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease }}
                >
                    {columns.map((col, index) => (
                        <div
                            key={col.title}
                            className={`py-6 md:py-0 ${index < columns.length - 1 ? 'md:border-r border-b md:border-b-0' : ''
                                } ${index > 0 ? 'md:pl-8' : ''} ${index < columns.length - 1 ? 'md:pr-8' : ''}`}
                            style={{ borderColor: 'var(--color-divider-strong)' }}
                        >
                            <h3
                                className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
                                style={{
                                    fontFamily: 'var(--font-sans)',
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                {col.title}
                            </h3>
                            <ul className="space-y-4">
                                {col.items.map((item) => (
                                    <li
                                        key={item}
                                        className="text-base content-grid-item"
                                        style={{
                                            fontFamily: 'var(--font-serif)',
                                            color: 'var(--color-text-primary)',
                                            fontWeight: 500,
                                        }}
                                    >
                                        <a target="_blank" href={col.links ? col.links[col.items.indexOf(item)] : '#'} className="hover:text-accent transition-colors">
                                            {item}
                                        </a>
                                        
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ContentGrid;
