import { NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import Users from "../../../models/userModel";
import { getSession } from "next-auth/react";
import connectMongo from "./../../../utils/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  // console.log(userId);
  try {
    const session = await getSession({ req: req });
    if (!session) {
      return res.status(401).json({ message: "not authenticated" });
    }
    await connectMongo();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
  if (req.method === "GET") {
    try {
      const user = await Users.findOne({ _id: userId });
      // console.log(user);
      if (!user) return res.status(404).json({ message: "user not found" });
      return res.status(200).json({
        message: "successful",
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          _id: user._id,
          role: user.role,
          description: user.description,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "something went wrong", error });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
