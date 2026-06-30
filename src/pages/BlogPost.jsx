import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Navbar, Footer } from '../components/layout';
import BackgroundDepth from '../components/BackgroundDepth';
import Section from '../components/layout/Section';
import { loadPostBySlug } from '../lib/markdown';
import ExternalLinkPreview from '../components/ui/ExternalLinkPreview';

const BlogPost = () => {
    const { slug } = useParams();
    const post = loadPostBySlug(slug);

    if (!post) {
        return (
            <>
                <BackgroundDepth />
                <Navbar />
                <main className="relative z-10">
                    <Section id="blog" title="Post not found" className="pt-28">
                        <p className="text-text-secondary">That post does not exist.</p>
                        <Link to="/writing" className="text-accent underline">Return to writing</Link>
                    </Section>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <BackgroundDepth />
            <Navbar />
            <main className="relative z-10">
                <Section
                    id="blog"
                    title={post.title}
                    subtitle={post.formattedDate}
                    className="pt-28 blog-post-section"
                >
                    <div className="blog-post-reader">
                        <div className="mb-6 flex items-center justify-between gap-4 text-base text-text-muted">
                            <Link to="/writing" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                                Back to writing
                            </Link>
                            <span className="text-text-secondary">{post.formattedDate}</span>
                        </div>

                        <article className="blog-post-surface">
                            <div className="prose prose-invert blog-post-prose">
                                <ReactMarkdown
                                style={{ fontFamily: 'var(--font-sans)',}}
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        a: ({ href, children, ...props }) => {
                                            const isExternal = typeof href === 'string' && /^https?:\/\//i.test(href);

                                            if (!href || !isExternal) {
                                                return (
                                                    <a href={href} {...props}>
                                                        {children}
                                                    </a>
                                                );
                                            }

                                            return (
                                                <ExternalLinkPreview
                                                    url={href}
                                                    isStatic={false}
                                                    className={props.className}
                                                >
                                                    {children}
                                                </ExternalLinkPreview>
                                            );
                                        },
                                    }}
                                >
                                    {post.content}
                                </ReactMarkdown>
                            </div>

                            <div className="mt-8 flex items-center justify-between text-base text-text-muted">
                                <div className="flex gap-2 flex-wrap">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="tech-badge">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <Link to="/writing" className="text-accent font-medium">Back to all posts</Link>
                            </div>
                        </article>
                    </div>
                </Section>
            </main>
            <Footer />
        </>
    );
};

export default BlogPost;
