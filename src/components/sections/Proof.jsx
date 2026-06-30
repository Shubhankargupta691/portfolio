import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { proof, sectionTitles } from '../../data/content';

const ease = [0.16, 1, 0.3, 1];

const techLinks = {
    Python: 'https://python.org',
    Go: 'https://go.dev',
    MySQL: 'https://mysql.com',
    SQLite: 'https://sqlite.org',
    Docker: 'https://docker.com',
    Linux: 'https://kernel.org',
    AWS: 'https://aws.amazon.com',
    Git: 'https://git-scm.com',
};

const stackSections = [
    { key: 'security', title: 'Security', techs: proof.stack.security },
    { key: 'tools', title: 'Security Tools', techs: proof.stack.tools },
    { key: 'concepts', title: 'Security Concepts', techs: proof.stack.concepts },
    { key: 'programming', title: 'Programming', techs: proof.stack.programming },
    { key: 'operations', title: 'Operations', techs: proof.stack.operations },
];

// Category accents for the editorial stack layout
const stackZones = {
    
    security: {
        accent: '#2D9CDB',
    },
    tools: {
        accent: '#E76F51',
    },
    operations: {
        accent: '#27AE60',
    },
    programming: {
        accent: '#7C6AF7',
    },
    concepts: {
        accent: '#F2C94C',
    },
};

const Proof = () => {
    const ref = useRef(null);
    const stackRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const stackInView = useInView(stackRef, { once: true, margin: '-50px' });

    return (
        <section id="credentials" ref={ref} className="section-padding section-padding--stack relative">
            {/* Subtle section wash */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        linear-gradient(180deg,
                            transparent 0%,
                            rgba(242, 224, 232, 0.15) 30%,
                            rgba(242, 224, 232, 0.2) 50%,
                            rgba(242, 224, 232, 0.15) 70%,
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
                    <span className="track-title">{sectionTitles.proof}</span>
                    <h2 className="text-display-xl text-text-primary mt-4">
                        Proof.
                    </h2>
                </motion.header>

                {/* Metrics grid */}
                {/* <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease, delay: 0.1 }}
                >
                    {proof.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                            <div className="metric-value">{metric.value}</div>
                            <div className="metric-label mt-2">{metric.label}</div>
                        </div>
                    ))}
                </motion.div> */}

                {/* Report 1 */}
                {/* <motion.div
                    className="card p-8 mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease, delay: 0.2 }}
                >
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="era-badge">{proof.report1.status}</span>
                        <span className="text-liner text-sm text-text-muted">
                            {proof.report1.number}
                        </span>
                    </div>
                    <h3 className="text-display-sm text-text-primary mb-2">
                        {proof.report1.title}
                    </h3>
                    <p className="text-liner text-sm text-text-muted">
                        Reported {proof.report1.date}
                    </p>
                    <span className="text-liner text-sm text-text-primary">

                        <p className="mt-2">
                            {proof.report1.data}
                        </p>
                    </span>

                </motion.div> */}

                {/* Report 2 */}
                {/* <motion.div
                    className="card p-8 mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease, delay: 0.2 }}
                >
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="text-liner text-sm text-text-muted">
                            {proof.report2.number}
                        </span>
                    </div>
                    <h3 className="text-display-sm text-text-primary mb-2">
                        {proof.report2.title}
                    </h3>
                    <p className="text-liner text-sm text-text-muted">
                        Reported {proof.report2.date}
                    </p>
                    <span className="text-liner text-sm text-text-primary">
                        <p className="mt-2">
                            {proof.report2.data}
                        </p>
                    </span>

                </motion.div> */}

                {/* Report */}
                {/* {Object.values(proof).map((report, index) => (
                    <motion.div
                        key={report.number}
                        className="card p-8 mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ 
                            duration: 0.7, 
                            ease, 
                            delay: 0.2 + index * 0.1 
                        }}
                    >
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <span className="era-badge"
                            style={!report.status || report.status.trim() === '' ? { display: 'contents' } : {}}>
                                {report.status}
                            </span>
                            <span className="text-liner text-sm text-text-muted">
                                {report.number}
                            </span>
                        </div>
                        
                        <h3 className="text-display-sm text-text-primary mb-2">
                            {report.title}
                        </h3>
                        
                        <p className="text-liner text-sm text-text-muted">
                            Reported {report.date}
                        </p>
                        
                        <div className="text-liner text-sm text-text-primary">
                            <p className="mt-2">
                                {report.data}
                            </p>
                        </div>
                    </motion.div>
                ))} */}

                {Object.values(proof)
                    .filter(report => report && report.title) // Skips any broken, empty, or incomplete objects
                    .map((report, index) => (
                        <motion.div
                            key={report.number || index}
                            className="card p-8 mb-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ 
                                duration: 0.7, 
                                ease, 
                                delay: 0.2 + index * 0.1 
                            }}
                        >
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                {report.status && 
                                <span className="era-badge"
                                    style={!report.status || report.status.trim() === '' ? { display: 'contents' } : {}}>
                                                {report.status}
                                </span>}
                                {report.number && (
                                    <span className="text-liner text-sm text-text-muted">
                                        {report.number}
                                    </span>
                                )}
                            </div>
                            
                            <h3 className="text-display-sm text-text-primary mb-2">
                                {report.title}
                            </h3>
                            
                            <p className="text-liner text-sm text-text-muted">
                                Reported {report.date}
                            </p>
                            
                            <div className="text-liner text-sm text-text-primary">
                                <p className="mt-2">
                                    {report.data}
                                </p>
                            </div>
                        </motion.div>
                    ))
                }

                {/* The Stack */}
                <div ref={stackRef} className="stack-constellation">
                    <motion.div
                        className="stack-anchor"
                        initial={{ opacity: 0 }}
                        animate={stackInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, ease }}
                    >
                        <span className="stack-anchor-text">The Stack</span>
                        <div className="stack-anchor-line" />
                    </motion.div>

                    <motion.p
                        className="stack-descriptor"
                        initial={{ opacity: 0, y: 6 }}
                        animate={stackInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease, delay: 0.05 }}
                    >
                        The tools I reach for first.
                    </motion.p>

                    <div className="stack-section-list">
                        {stackSections.map(({ key, title, techs }, zoneIndex) => {
                            const zone = stackZones[key];

                            return (
                                <motion.section
                                    key={key}
                                    className="stack-section"
                                    style={{
                                        '--stack-accent': zone.accent,
                                    }}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={stackInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.5,
                                        ease,
                                        delay: 0.1 + zoneIndex * 0.06,
                                    }}
                                >
                                    <div className="stack-section-header">
                                        <h3 className="stack-category-title">{title}</h3>
                                    </div>

                                    <ul className="stack-pill-list" aria-label={title}>
                                        {techs.map((tech, techIndex) => {
                                            const href = techLinks[tech];

                                            return (
                                                <motion.li
                                                    key={tech}
                                                    className="stack-pill-item"
                                                    initial={{ opacity: 0, y: 4 }}
                                                    animate={stackInView ? { opacity: 1, y: 0 } : {}}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease,
                                                        delay: 0.16 + zoneIndex * 0.04 + techIndex * 0.015,
                                                    }}
                                                >
                                                    <a
                                                        href={href}
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        className="stack-pill"
                                                        style={{ '--stack-pill-accent': zone.accent }}
                                                        aria-label={`${tech} official website`}
                                                    >
                                                        {tech}
                                                    </a>
                                                </motion.li>
                                            );
                                        })}
                                    </ul>
                                </motion.section>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Proof;
