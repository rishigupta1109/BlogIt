import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGO_URI is not defined");
let connectMongo: any;
if (MONGODB_URI) {
  connectMongo = async () => await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB", MONGODB_URI);
}

export default connectMongo;
