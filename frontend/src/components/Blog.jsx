import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight, FaSearch } from 'react-icons/fa';

// Sample blog data - in production, this would come from a CMS or API
const BLOG_POSTS = [
  {
    id: 1,
    title: 'Building Scalable MERN Applications',
    excerpt: 'Learn how to architect and build scalable MERN stack applications with best practices for performance and maintainability.',
    author: 'Kunal Lohaniya',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['MERN', 'Node.js', 'MongoDB', 'React'],
    featured: true,
  },
  {
    id: 2,
    title: 'Modern React Patterns and Hooks',
    excerpt: 'Exploring advanced React patterns, custom hooks, and how to write more maintainable React code.',
    author: 'Kunal Lohaniya',
    date: '2024-01-10',
    readTime: '6 min read',
    tags: ['React', 'Hooks', 'JavaScript'],
    featured: false,
  },
  {
    id: 3,
    title: 'Database Design Best Practices',
    excerpt: 'Essential database design principles for MongoDB and how to optimize your data models for better performance.',
    author: 'Kunal Lohaniya',
    date: '2024-01-05',
    readTime: '10 min read',
    tags: ['MongoDB', 'Database', 'Performance'],
    featured: false,
  },
  {
    id: 4,
    title: 'Deploying Full-Stack Applications',
    excerpt: 'A comprehensive guide to deploying MERN applications using modern cloud platforms and CI/CD pipelines.',
    author: 'Kunal Lohaniya',
    date: '2024-01-01',
    readTime: '12 min read',
    tags: ['Deployment', 'DevOps', 'AWS'],
    featured: true,
  }
];

const BlogCard = ({ post }) => {
  return (
    <article className="py-8 border-b border-[var(--border-dim)] flex flex-col md:flex-row gap-6 justify-between items-start md:items-center group">
      <div className="max-w-2xl">
        <div className="flex gap-4 items-center mb-3 text-xs font-mono text-[var(--muted)]">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          {post.featured && (
            <>
              <span>•</span>
              <span className="text-[var(--amber)]">FEATURED</span>
            </>
          )}
        </div>
        <h3 className="text-section-heading mb-3 group-hover:text-[var(--amber)] transition-colors duration-250">
          {post.title}
        </h3>
        <p className="text-xs font-mono text-[var(--muted)] leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono text-[var(--offwhite)] group-hover:text-[var(--amber)] transition-colors duration-250 cursor-none">
        <span>READ ARTICLE</span>
        <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-250" />
      </div>
    </article>
  );
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.1 });

  // Get all unique tags
  const allTags = ['All', ...new Set(BLOG_POSTS.flatMap(post => post.tags))];

  // Filter posts based on search and tag
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <section id="blog" ref={ref} className="section-gap relative overflow-hidden bg-[var(--base)]">
      {/* Editorial section number texture */}
      <span className="section-number-bg" style={{ top: '-60px', left: '40px' }}>05</span>

      <div className="container-editorial relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <p className="label-caps-amber mb-4">PUBLICATIONS</p>
          <h2 className="text-display mb-6">
            JOURNAL &<br />
            TECHNICAL ESSAYS
          </h2>
          <p className="text-sm text-[var(--muted)] max-w-xl font-mono leading-relaxed">
            Thoughts, tutorials, and practical architectures regarding full-stack scalability, database schema optimization, and deployment procedures.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12 border-b border-[var(--border-dim)] pb-6">
          <div className="relative w-full md:max-w-xs font-mono text-xs">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="SEARCH CATALOG //"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[var(--surface)] text-[var(--offwhite)] border border-[var(--border-dim)] outline-none focus:border-[var(--amber)] transition-colors duration-250 cursor-none"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`filter-btn ${selectedTag === tag ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog entries list */}
        <div className="border-t border-[var(--border-std)]">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* No results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 font-mono text-xs text-[var(--muted)] border-b border-[var(--border-dim)]">
            NO JOURNAL ENTRIES FOUND FOR THE ACTIVE QUERY.
          </div>
        )}

      </div>
    </section>
  );
};

export default Blog;
