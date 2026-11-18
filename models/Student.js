const mongoose = require('mongoose');

// Define Schema for Student
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide student name'],
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, 'Please provide roll number / student ID'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide student email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    course: {
      type: String,
      required: [true, 'Please provide enrolled course'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Please provide academic year (e.g., 1, 2, 3, 4)'],
      min: [1, 'Year must be at least 1'],
      max: [5, 'Year cannot exceed 5'],
    },
    gpa: {
      type: Number,
      min: [0, 'GPA cannot be negative'],
      max: [10, 'GPA cannot exceed 10'],
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Student', studentSchema);
