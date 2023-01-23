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
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      console.log(typeof blog["views"], blog.views);
      if (blog.views === undefined) blog.views = 0;
      const updateBlog = await Blogs.findOneAndUpdate(
        { _id: blogId },
        { views: blog?.views + 1 },
        {
          new: true,
        }
      );
      console.log({ updateBlog });
      return res.status(200).json({ message: "successful", blog });
    } catch (error) {
      return res.status(500).json({ message: "something went wrong", error });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
