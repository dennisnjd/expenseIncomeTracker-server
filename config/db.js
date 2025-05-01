//  mongoDB connection setup
//  This file contains the MongoDB connection setup using Mongoose.

import mongoose from "mongoose";
import { MONGO_URI } from "../constants.js";


 const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;