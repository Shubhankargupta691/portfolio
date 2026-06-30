import fm from 'front-matter';

const formatDate = (input) => new Date(input).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
});

export const loadPosts = () => {
    const files = import.meta.glob('../posts/*.md', { eager: true, query: '?raw', import: 'default' });

    return Object.entries(files)
        .map(([path, raw]) => {
            const { attributes, body } = fm(raw);
            const data = attributes || {};
            const content = body;
            const slug = path.split('/').pop().replace('.md', '');
            return {
                slug,
                content,
                title: data.title || slug,
                date: data.date || '2026-01-01',
                formattedDate: formatDate(data.date || '2026-01-01'),
                summary: data.summary || '',
                tags: data.tags || [],
            };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const loadPostBySlug = (slug) => {
    const posts = loadPosts();
    return posts.find((p) => p.slug === slug);
};
