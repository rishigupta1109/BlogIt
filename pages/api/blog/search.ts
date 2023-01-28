import { NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import Blogs from "../../../models/blogModel";
import connectMongo from "./../../../utils/dbConnect";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const pattern = new RegExp(req.query.pattern as string, "i");
    const conn = await connectMongo();
    console.log({ pattern });
    const exists = conn.connection.db.collection("blogs");
    const blogs = await Blogs.find({ title: pattern });
    console.log(blogs);
    res.status(200).json({ message: "successful", blogs });
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
}
