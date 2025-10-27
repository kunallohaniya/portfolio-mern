import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendarAlt, FaUser, FaTag, FaArrowRight, FaSearch } from 'react-icons/fa';

// Sample blog data - in production, this would come from a CMS or API
const BLOG_POSTS = [
  {
    id: 1,
    title: 'Building Scalable MERN Applications',
    excerpt: 'Learn how to architect and build scalable MERN stack applications with best practices for performance and maintainability.',
    content: 'Full article content here...',
    author: 'Kunal Lohaniya',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['MERN', 'Node.js', 'MongoDB', 'React'],
    image: '/blog/mern-scalable.jpg',
    featured: true,
    slug: 'building-scalable-mern-applications'
  },
  {
    id: 2,
    title: 'Modern React Patterns and Hooks',
    excerpt: 'Exploring advanced React patterns, custom hooks, and how to write more maintainable React code.',
    content: 'Full article content here...',
    author: 'Kunal Lohaniya',
    date: '2024-01-10',
    readTime: '6 min read',
    tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
    image: '/blog/react-patterns.jpg',
    featured: false,
    slug: 'modern-react-patterns-hooks'
  },
  {
    id: 3,
    title: 'Database Design Best Practices',
    excerpt: 'Essential database design principles for MongoDB and how to optimize your data models for better performance.',
    content: 'Full article content here...',
    author: 'Kunal Lohaniya',
    date: '2024-01-05',
    readTime: '10 min read',
    tags: ['MongoDB', 'Database', 'Performance', 'Backend'],
    image: '/blog/database-design.jpg',
    featured: false,
    slug: 'database-design-best-practices'
  },
  {
    id: 4,
    title: 'Deploying Full-Stack Applications',
    excerpt: 'A comprehensive guide to deploying MERN applications using modern cloud platforms and CI/CD pipelines.',
    content: 'Full article content here...',
    author: 'Kunal Lohaniya',
    date: '2024-01-01',
    readTime: '12 min read',
    tags: ['Deployment', 'DevOps', 'AWS', 'CI/CD'],
    image: '/blog/deployment-guide.jpg',
    featured: true,
    slug: 'deploying-full-stack-applications'
  }
];

const BlogCard = ({ post, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card card-hover group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {post.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        </div>
      )}

      {/* Blog Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
          <span className="text-primary-600 dark:text-primary-400 text-4xl font-bold">
            {post.title.charAt(0)}
          </span>
        </div>
        <motion.div
          className="absolute inset-0 bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Blog Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-1">
            <FaCalendarAlt className="w-3 h-3" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaUser className="w-3 h-3" />
            <span>{post.author}</span>
          </div>
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-dark-800 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
        >
          {post.title}
        </motion.h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <motion.div
          className="flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          <span>Read More</span>
          <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.div>
      </div>
    </motion.article>
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
    <section id="blog" className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-responsive font-bold gradient-text mb-6">
            Latest Articles
          </h2>
          <p className="text-responsive text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sharing insights, tutorials, and thoughts on modern web development, 
            MERN stack, and software engineering best practices.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          {/* Search Bar */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            className="btn-primary inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Articles</span>
            <FaArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
