require('dotenv').config();
const express = require('express');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Health-check / Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Management API is running'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
