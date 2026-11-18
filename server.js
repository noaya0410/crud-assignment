require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Connect to MongoDB Database
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Health-check / Welcome Route
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.status(200).json({
    success: true,
    message: 'Student Management API is running',
    database: dbStatus,
  });
});

// Middleware to check database connectivity for API routes
app.use('/api/students', (req, res, next) => {
  if (mongoose.connection.readyState === 0) {
    return res.status(503).json({
      success: false,
      message: 'Database is not connected. Please check your MONGO_URL in .env and ensure your MongoDB Atlas cluster is active.',
    });
  }
  next();
});

// Mount Student API Routes
app.use('/api/students', studentRoutes);

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
