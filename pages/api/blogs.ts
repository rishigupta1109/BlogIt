import { NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import Blogs from "../../models/blogModel";
import connectMongo from "./../../utils/dbConnect";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const conn = await connectMongo();
    const exists = conn.connection.db.collection("blogs");
    const blogs = await Blogs.find();
    console.log(blogs);
    res.status(200).json({ message: "successful", blogs });
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
}
