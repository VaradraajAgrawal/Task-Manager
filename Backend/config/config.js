import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb_Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
