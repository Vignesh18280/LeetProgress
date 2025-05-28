
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function getProblemData(problemNumber) {
  await mongoose.connect(process.env.MONGODB_URI);
  const collectionName = `problems${problemNumber}`;

  const DynamicModel = mongoose.models[collectionName] || mongoose.model(
    collectionName,
    new mongoose.Schema({}, { strict: false, collection: collectionName })
  );

  return await DynamicModel.find({});
}

