import { NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import Blogs from "../../../models/blogModel";
import connectMongo from "./../../../utils/dbConnect";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blogId } = req.query;
  console.log(blogId);
  if (req.method === "GET") {
    try {
      await connectMongo();
      const blog = await Blogs.findOne({ _id: blogId });
      console.log(blog);
      return res.status(200).json({ message: "successful", blog });
    } catch (error) {
      return res.status(500).json({ message: "something went wrong", error });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
