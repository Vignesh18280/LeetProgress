
import mongoose from "mongoose";

export async function getProblemData(problemNumber) {
  await mongoose.connect("mongodb+srv://vigguvignesh92:BsY6Ownvf67YR9Gv@cluster0.6firn5r.mongodb.net/leetprogress?retryWrites=true&w=majority");

  const collectionName = `problems${problemNumber}`;

  const DynamicModel = mongoose.models[collectionName] || mongoose.model(
    collectionName,
    new mongoose.Schema({}, { strict: false, collection: collectionName })
  );

  return await DynamicModel.find({});
}

