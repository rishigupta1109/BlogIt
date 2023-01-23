import { GetServerSidePropsContext, NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import Blogs from "../../models/blogModel";
import connectMongo from "../../utils/dbConnect";
import { getSession } from "next-auth/react";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req: req });
    console.log({ session, params: req.query });
    const { _id } = req.query;
    // if (!session) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    const conn = await connectMongo();
    const exists = conn.connection.db.collection("blogs");
    console.log(_id);
    const blogs = await Blogs.find({ author: _id });
    console.log({ blogs });
    return res.status(200).json({ message: "successful", blogs });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
}
