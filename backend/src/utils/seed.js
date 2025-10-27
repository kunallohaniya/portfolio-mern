/**
 * Database Seed Script
 * Run this script to create initial admin user and sample projects
 */

const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

// Seed admin user
const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists:', adminEmail);
      return existingAdmin;
    }

    // Create new admin user
    const admin = new User({
      username: adminUsername,
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      isActive: true
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('👤 Username:', adminUsername);
    
    return admin;
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    throw error;
  }
};

// Seed sample projects
const seedProjects = async () => {
  try {
    const existingProjects = await Project.countDocuments();
    
    if (existingProjects > 0) {
      console.log(`⚠️  ${existingProjects} projects already exist. Skipping project seeding.`);
      return;
    }

    const sampleProjects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce application with payment integration, user authentication, and admin dashboard. Features include product catalog, shopping cart, order management, and real-time inventory tracking.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'],
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
        liveLink: 'https://example-ecommerce.vercel.app',
        githubLink: 'https://github.com/yourusername/ecommerce-platform',
        featured: true,
        status: 'published'
      },
      {
        title: 'Task Management System',
        description: 'A collaborative task management tool with real-time updates, team collaboration features, and analytics dashboard. Supports project boards, task assignments, and progress tracking.',
        techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Socket.io', 'shadcn/ui'],
        imageUrl: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800',
        liveLink: 'https://example-taskmanager.vercel.app',
        githubLink: 'https://github.com/yourusername/task-manager',
        featured: true,
        status: 'published'
      },
      {
        title: 'Weather Dashboard',
        description: 'A modern weather application with 7-day forecast, interactive maps, and location-based weather alerts. Features real-time data visualization and historical weather trends.',
        techStack: ['Vue.js', 'Vuex', 'OpenWeather API', 'Chart.js', 'Leaflet'],
        imageUrl: 'https://images.unsplash.com/photo-1561553543-4e04d1d44d3c?w=800',
        liveLink: 'https://example-weather.netlify.app',
        githubLink: 'https://github.com/yourusername/weather-dashboard',
        featured: true,
        status: 'published'
      },
      {
        title: 'Social Media App',
        description: 'A social networking platform with user profiles, post sharing, real-time messaging, and content moderation. Includes features like likes, comments, followers, and media uploads.',
        techStack: ['React Native', 'Firebase', 'Redux', 'Expo', 'Node.js'],
        imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
        liveLink: '',
        githubLink: 'https://github.com/yourusername/social-app',
        featured: false,
        status: 'published'
      },
      {
        title: 'Portfolio CMS',
        description: 'A content management system specifically designed for developers to manage their portfolio projects, blog posts, and resume. Features drag-and-drop editor and template customization.',
        techStack: ['React', 'GraphQL', 'Strapi', 'PostgreSQL', 'AWS S3'],
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        liveLink: 'https://example-cms.vercel.app',
        githubLink: 'https://github.com/yourusername/portfolio-cms',
        featured: false,
        status: 'published'
      },
      {
        title: 'AI Chatbot Assistant',
        description: 'An intelligent chatbot powered by natural language processing and machine learning. Provides customer support automation, intent recognition, and multi-language support.',
        techStack: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Docker', 'Redis'],
        imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
        liveLink: '',
        githubLink: 'https://github.com/yourusername/ai-chatbot',
        featured: false,
        status: 'published'
      }
    ];

    await Project.insertMany(sampleProjects);
    console.log(`✅ ${sampleProjects.length} sample projects created successfully!`);
  } catch (error) {
    console.error('❌ Error creating sample projects:', error.message);
    throw error;
  }
};

// Main seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...\n');
    
    await connectDB();
    await seedAdmin();
    await seedProjects();
    
    console.log('\n✅ Database seed completed successfully!');
    console.log('\n🚀 You can now start the server and login with the admin credentials above.');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  }
};

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedAdmin, seedProjects, seedDatabase };

