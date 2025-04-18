const mongoose = require('mongoose');

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_STRING);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { dbconnect };
