const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  techStack: {
    type: [String],
    required: [true, 'Technology stack is required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one technology is required'
    }
  },
  imageUrl: {
    type: String,
    required: [true, 'Project image URL is required'],
    trim: true
  },
  liveLink: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.*/.test(v);
      },
      message: 'Live link must be a valid URL'
    }
  },
  githubLink: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.*/.test(v);
      },
      message: 'GitHub link must be a valid URL'
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add indexes for better query performance
projectSchema.index({ featured: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);