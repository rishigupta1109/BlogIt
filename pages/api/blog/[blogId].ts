import { NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import Blogs from "../../../models/blogModel";
import connectMongo from "../../../utils/dbConnect";
import fs from "fs";
import path from "path";
import { readfile } from "./create";
import { getSession } from "next-auth/react";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blogId } = req.query;
  console.log(blogId);
  console.log(req.query);
  console.log(req.method);
  if (req.method === "PATCH") {
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
      // console.log({ updateBlog });
      return res.status(200).json({ message: "successful", blog });
    } catch (error) {
      return res.status(500).json({ message: "something went wrong", error });
    }
  } else if (req.method === "GET") {
    try {
      await connectMongo();
      const blog = await Blogs.findOne({ _id: blogId });
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      return res.status(200).json({ message: "successful", blog });
    } catch (error) {
      return res.status(500).json({ message: "something went wrong", error });
    }
  } else if (req.method === "PUT") {
    try {
      await connectMongo();
      const blog = await Blogs.findOne({ _id: blogId });
      if (!blog) return res.status(404).json({ message: "Blog not found" });

      fs.readdirSync(path.join(process.cwd()) + "/public" + "/blogimages");
    } catch (err) {
      fs.mkdirSync(path.join(process.cwd()) + "/public" + "/blogimages");
    }
    let imageName = "";
    const { saveLocally } = req.query;
    let bool = saveLocally === "true";
    const { fields }: any = await readfile(req, bool, imageName);
    const updatedBlog = await Blogs.findOneAndUpdate({ _id: blogId }, fields, {
      new: true,
    });
    return res.status(200).json({ message: "successful", updatedBlog });
  } else if (req.method === "DELETE") {
    try {
      const session = await getSession({ req });
      if (!session) return res.status(401).json({ message: "Unauthorized" });
      await connectMongo();
      const blog = await Blogs.findOne({ id: blogId });
      if (session?.user?.name !== blog?.author)
        return res.status(401).json({ message: "Unauthorized" });
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      const deletedBlog = await Blogs.findOneAndDelete({ _id: blogId });
      return res.status(200).json({ message: "successful", deletedBlog });
    } catch (error) {
      return res.status(500).json({ message: "something went wrong", error });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
