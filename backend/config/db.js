const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  // const MONGO_URI = process.env.MONGO_URI;
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb'; // Fallback URI
  console.log(mongoURI);
  
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;