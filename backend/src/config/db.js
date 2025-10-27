const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use fallback MongoDB URI if not set
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    console.log('Attempting to connect to MongoDB...');
    console.log('URI:', mongoURI);
    
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.log('Continuing without database connection...');
    // Don't exit the process, just log the error
    // process.exit(1);
  }
};

module.exports = connectDB;