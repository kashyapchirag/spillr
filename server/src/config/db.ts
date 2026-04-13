import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("database was connected successfully!");
  } catch (error) {
    console.log("database connection failed!");
  }
};

export default dbConnection;
