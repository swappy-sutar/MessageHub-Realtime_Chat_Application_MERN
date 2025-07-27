import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

export { connectDB };
