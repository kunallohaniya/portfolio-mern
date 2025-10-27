import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCode, 
  FaPalette, 
  FaMobile, 
  FaRocket, 
  FaStar, 
  FaHeart, 
  FaLightbulb, 
  FaCogs, 
  FaChartLine,
  FaCheck,
  FaArrowRight,
  FaGithub,
  FaExternalLinkAlt
} from 'react-icons/fa';

// Premium Glass Card Component
const GlassCard = ({ children, className = '', hoverEffect = true }) => {
  return (
    <motion.div
      className={`glass-premium rounded-2xl border border-white/20 dark:border-white/10 shadow-xl ${className}`}
      whileHover={hoverEffect ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Premium Gradient Button Component
const GradientButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  icon: Icon,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'btn-glow text-white font-semibold',
    outline: 'btn-outline font-semibold',
    ghost: 'bg-transparent hover:bg-primary-50 dark:hover:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-xl transition-all duration-300 ${className}`}
      {...props}
    >
      <span className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        {children}
        {variant === 'primary' && <FaArrowRight className="w-4 h-4" />}
      </span>
    </motion.button>
  );
};

// Premium Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="h-full"
    >
      <GlassCard className="p-8 h-full">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-white shadow-lg"
          >
            <Icon className="w-8 h-8" />
          </motion.div>
          <h3 className="text-xl font-bold text-dark-800 dark:text-white font-heading">
            {title}
          </h3>
          <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
            {description}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// Premium Testimonial Card Component
const TestimonialCard = ({ name, role, company, content, avatar, rating, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <GlassCard className="p-8 h-full">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg mr-4">
            {avatar}
          </div>
          <div>
            <h4 className="font-bold text-dark-800 dark:text-white">{name}</h4>
            <p className="text-sm text-dark-600 dark:text-dark-300">
              {role} at {company}
            </p>
          </div>
        </div>
        
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-dark-300 dark:text-dark-600'}`} 
            />
          ))}
        </div>
        
        <p className="text-dark-600 dark:text-dark-300 italic">
          "{content}"
        </p>
      </GlassCard>
    </motion.div>
  );
};

// Premium Pricing Card Component
const PricingCard = ({ title, price, features, isPopular = false, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full relative"
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <span className="px-4 py-1 bg-accent-500 text-black text-sm font-bold rounded-full flex items-center gap-1">
            <FaStar className="w-3 h-3" />
            MOST POPULAR
          </span>
        </div>
      )}
      
      <GlassCard className={`p-8 h-full ${isPopular ? 'ring-2 ring-primary-500' : ''}`}>
        {isPopular && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 -z-10" />
        )}
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-dark-800 dark:text-white mb-2 font-heading">
            {title}
          </h3>
          <div className="mb-4">
            <span className="text-4xl font-bold gradient-text-premium font-heading">
              ${price}
            </span>
            <span className="text-dark-600 dark:text-dark-300">/month</span>
          </div>
          <p className="text-dark-600 dark:text-dark-300">
            Perfect for {title.toLowerCase()} projects
          </p>
        </div>
        
        <ul className="space-y-4 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center">
              <FaCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-dark-700 dark:text-dark-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <GradientButton 
          variant={isPopular ? 'primary' : 'outline'} 
          className="w-full"
        >
          Get Started
        </GradientButton>
      </GlassCard>
    </motion.div>
  );
};

// Premium Stats Component
const StatsSection = () => {
  const stats = [
    { value: '100+', label: 'Projects Completed', icon: FaRocket },
    { value: '50+', label: 'Happy Clients', icon: FaHeart },
    { value: '99%', label: 'Client Satisfaction', icon: FaStar },
    { value: '24/7', label: 'Support Available', icon: FaChartLine },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="text-center p-6 rounded-2xl glass-premium border border-white/20 dark:border-white/10"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-block mb-3"
          >
            <stat.icon className="w-8 h-8 text-primary-500" />
          </motion.div>
          <div className="text-2xl font-bold gradient-text-premium mb-1 font-heading">
            {stat.value}
          </div>
          <div className="text-sm text-dark-600 dark:text-dark-300">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Premium Portfolio Showcase Component
const PortfolioShowcase = () => {
  const [activeProject, setActiveProject] = useState(0);
  
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Application',
      image: 'https://placehold.co/600x400/6A3AD7/FFFFFF?text=E-Commerce',
      technologies: ['React', 'Node.js', 'MongoDB'],
      description: 'A full-featured e-commerce platform with payment integration and inventory management.'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'Mobile Application',
      image: 'https://placehold.co/600x400/8E2DE2/FFFFFF?text=Banking+App',
      technologies: ['React Native', 'Firebase', 'Redux'],
      description: 'Secure mobile banking application with biometric authentication and real-time transactions.'
    },
    {
      id: 3,
      title: 'AI Dashboard',
      category: 'Data Visualization',
      image: 'https://placehold.co/600x400/FFD700/000000?text=AI+Dashboard',
      technologies: ['Vue.js', 'D3.js', 'Python'],
      description: 'Interactive dashboard for visualizing complex AI-generated data with real-time analytics.'
    }
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg mb-6"
          >
            <span className="gradient-text-premium">Showcasing Excellence</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-dark-600 dark:text-dark-300 mb-8 leading-relaxed"
          >
            Explore a curated selection of my premium projects that demonstrate 
            cutting-edge design, innovative functionality, and exceptional user experience.
          </motion.p>
          
          <div className="space-y-6 mb-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => setActiveProject(index)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeProject === index 
                    ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30' 
                    : 'glass-premium hover:bg-white/10 dark:hover:bg-dark-800/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-dark-800 dark:text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-dark-600 dark:text-dark-300 mb-2">
                      {project.category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <FaArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                    activeProject === index ? 'text-primary-500 rotate-90' : 'text-dark-400'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex gap-4">
            <GradientButton icon={FaGithub}>
              View on GitHub
            </GradientButton>
            <GradientButton variant="outline" icon={FaExternalLinkAlt}>
              Live Demo
            </GradientButton>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="aspect-video bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center relative">
            <img 
              src={projects[activeProject].image} 
              alt={projects[activeProject].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{projects[activeProject].title}</h3>
              <p className="text-lg opacity-90">{projects[activeProject].description}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Premium UI Showcase Component
const PremiumUI = () => {
  const features = [
    {
      icon: FaCode,
      title: 'Modern Development',
      description: 'Built with the latest technologies and best practices for optimal performance and scalability.'
    },
    {
      icon: FaPalette,
      title: 'Stunning Design',
      description: 'Beautiful, responsive designs that captivate users and deliver exceptional experiences.'
    },
    {
      icon: FaMobile,
      title: 'Fully Responsive',
      description: 'Seamlessly adapts to all devices, from mobile phones to large desktop screens.'
    },
    {
      icon: FaCogs,
      title: 'Custom Solutions',
      description: 'Tailored development to meet your specific business needs and requirements.'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'CEO',
      company: 'TechStart Inc.',
      content: 'The portfolio website exceeded our expectations. The attention to detail and innovative design made our brand stand out in the competitive market.',
      avatar: 'AJ',
      rating: 5
    },
    {
      name: 'Sarah Williams',
      role: 'Marketing Director',
      company: 'Creative Solutions',
      content: 'Working with this developer was a game-changer for our online presence. The results speak for themselves - our engagement increased by 150%.',
      avatar: 'SW',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Innovate Labs',
      content: 'The technical expertise and creative vision delivered a product that truly represents our brand values. Highly recommended for any digital project.',
      avatar: 'MC',
      rating: 4
    }
  ];

  const pricingPlans = [
    {
      title: 'Starter',
      price: '499',
      features: [
        'Basic Website Design',
        'Up to 5 Pages',
        'Responsive Design',
        'Contact Form',
        '1 Month Support'
      ]
    },
    {
      title: 'Professional',
      price: '1299',
      features: [
        'Custom Website Design',
        'Up to 10 Pages',
        'E-commerce Integration',
        'SEO Optimization',
        '3 Months Support',
        'Performance Analytics'
      ],
      isPopular: true
    },
    {
      title: 'Enterprise',
      price: '2999',
      features: [
        'Premium Custom Design',
        'Unlimited Pages',
        'Full E-commerce Solution',
        'Advanced SEO',
        '6 Months Support',
        'Performance Analytics',
        'Content Management System',
        'Priority Development'
      ]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 glass-premium rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 glass-premium rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container-premium relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full glass-premium border border-white/20 dark:border-white/10 shadow-xl mb-6"
          >
            <FaLightbulb className="w-5 h-5 text-accent-500 mr-2" />
            <span className="text-sm font-medium text-dark-700 dark:text-dark-300 font-heading">
              Premium UI Components
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-xl mb-6"
          >
            <span className="gradient-text-premium">
              Stunning Design Meets Functionality
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-body-lg text-dark-600 dark:text-dark-300 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Experience the perfect blend of aesthetics and performance with our 
            premium UI components, designed to elevate your digital presence.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <GradientButton size="lg">
              View Components
            </GradientButton>
            <GradientButton variant="outline" size="lg">
              Documentation
            </GradientButton>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <StatsSection />
        </div>

        {/* Portfolio Showcase */}
        <div className="mb-20">
          <PortfolioShowcase />
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg text-center mb-16"
          >
            <span className="gradient-text-premium">Client Testimonials</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg text-center mb-4"
          >
            <span className="gradient-text-premium">Simple, Transparent Pricing</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-dark-600 dark:text-dark-300 text-center mb-16 max-w-2xl mx-auto"
          >
            Choose the perfect plan for your project. All plans include our core features 
            with options to scale as your needs grow.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={plan.title}
                {...plan}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GlassCard className="p-12 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="inline-block mb-6"
            >
              <FaRocket className="w-16 h-16 text-primary-500" />
            </motion.div>
            
            <h3 className="heading-lg mb-4">
              <span className="gradient-text-premium">Ready to Elevate Your Digital Presence?</span>
            </h3>
            
            <p className="text-body-lg text-dark-600 dark:text-dark-300 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch today and let's discuss 
              how we can bring your vision to life with stunning design and cutting-edge technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GradientButton size="lg">
                Start Your Project
              </GradientButton>
              <GradientButton variant="outline" size="lg">
                Schedule a Call
              </GradientButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumUI;