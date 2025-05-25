import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
      }
    try{
        await mongoose.connect(`mongodb+srv://vigguvignesh92:BsY6Ownvf67YR9Gv@cluster0.6firn5r.mongodb.net/?appName=Cluster0`);
        console.log("mongoDB connected successfully");
    }
    catch (error) {
        console.log(error);
    }
}

export default connectDB;