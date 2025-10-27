const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use fallback MongoDB URI if not set
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    // Continue without database connection
  }
};

module.exports = connectDB;