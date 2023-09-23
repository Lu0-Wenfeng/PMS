require("dotenv").config();
const express = require("express");
const router = require('../routes/auth.js');
const mongoose = require("mongoose");

const PORT = 3000;
const app = express();

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log('About to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('err:', err.message);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
