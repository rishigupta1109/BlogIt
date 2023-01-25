import { NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import Users from "../../../../models/userModel";
import { getSession } from "next-auth/react";
import connectMongo from "../../../../utils/dbConnect";
import blogModel from "../../../../models/blogModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  // console.log(userId);
  try {
    await connectMongo();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
  if (req.method === "GET") {
    try {
      const blogs = await blogModel.find({ author: userId });
      // console.log(user);
      return res.status(200).json({
        message: "successful",
        blogs,
      });
    } catch (error) {
      return res.status(500).json({ message: "something went wrong", error });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
