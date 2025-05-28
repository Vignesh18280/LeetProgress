import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
      }
    try{
        await mongoose.connect(process.env.MONGODB_URI);
    }
    catch (error) {
        console.log(error);
    }
}

export default connectDB;