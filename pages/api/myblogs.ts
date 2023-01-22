import { GetServerSidePropsContext, NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import Blogs from "../../models/blogModel";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  let session: string | null;
  if (req.headers.authorization) {
    session = JSON.parse(req.headers.authorization);
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const blogs = await Blogs.find({ author: session?.user?.name?.id });
    return res.status(200).json({ message: "successful", blogs });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
}
