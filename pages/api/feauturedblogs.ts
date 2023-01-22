import { NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import Blogs from "../../models/blogModel";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const blogs = await Blogs.find().sort({ likes: -1 }).limit(6);
    res.status(200).json({ message: "successful", blogs });
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
}
