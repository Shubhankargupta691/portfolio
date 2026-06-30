import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { projects, sectionTitles } from '../../data/content';
import ExternalLinkPreview from '../ui/ExternalLinkPreview';

const ease = [0.16, 1, 0.3, 1];

const ProjectCard = ({ project, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.article
            ref={ref}
            className="card p-8 md:p-10"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: index * 0.1 }}
        >
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                <div>
                    <h3 className="text-display-lg text-text-primary">
                        {project.name}
                    </h3>
                    <p className="text-liner mt-2">
                        {project.tagline}
                    </p>
                    {(project.github || project.live) && (
                        <div className="project-actions">
                            {project.github && (
                                <ExternalLinkPreview
                                    url={project.github}
                                    isStatic={false}
                                    className="project-action-link"
                                >
                                    GitHub →
                                </ExternalLinkPreview>
                            )}
                            {project.live && (
                                <ExternalLinkPreview
                                    url={project.live}
                                    isStatic={false}
                                    className="project-action-link"
                                >
                                    Live →
                                </ExternalLinkPreview>
                            )}
                        </div>
                    )}
                </div>
                <div className="text-right">
                    <div className="metric-value">
                        {project.metrics.value}
                    </div>
                    <div className="metric-label mt-1">
                        {project.metrics.label}
                    </div>
                </div>
            </div>

            {/* Problem / Solution */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h4 className="track-title mb-3">Problem</h4>
                    <p className="text-liner">{project.problem}</p>
                </div>
                <div>
                    <h4 className="track-title mb-3">Solution</h4>
                    <p className="text-liner">{project.solution}</p>
                </div>
            </div>

            {/* Depth */}
            <div className="mb-8">
                <h4 className="track-title mb-4">Technical Depth</h4>
                <ul className="space-y-2">
                    {project.depth.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-liner">
                            <span className="accent mt-0.5">→</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-end justify-between gap-4 pt-6" style={{ borderTop: '1px solid var(--color-divider)' }}>
                <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                        <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                </div>
                <p className="text-liner text-text-muted text-sm">
                    {project.ownership}
                </p>
            </div>
        </motion.article>
    );
};

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" ref={ref} className="section-padding">
            <div className="section-container">
                {/* Header */}
                <motion.header
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease }}
                >
                    <span className="track-title">{sectionTitles.projects}</span>
                    <h2 className="text-display-xl text-text-primary mt-4">
                        Hands-on Security Projects.
                    </h2>
                </motion.header>

                {/* Projects */}
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.name} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
