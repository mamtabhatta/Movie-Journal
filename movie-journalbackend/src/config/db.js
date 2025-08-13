const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/movie-journal");
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
