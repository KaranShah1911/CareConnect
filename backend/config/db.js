import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/careConnect`);
    console.log("Connected to MongoDB !");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToMongoDB;
