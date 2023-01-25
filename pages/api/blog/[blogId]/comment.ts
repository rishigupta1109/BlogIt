import { NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import likes from "../../../../models/likeModel";
import connectMongo from "../../../../utils/dbConnect";
import blogModel from "../../../../models/blogModel";
import userModel from "../../../../models/userModel";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { blogId, userId, text } = JSON.parse(req.body);
    console.log({ blogId, userId }, JSON.parse(req.body));

    try {
      await connectMongo();
      const user = await userModel.findOne({ _id: userId }, { password: 0 });
      if (!user) return res.status(404).json({ message: "User not found" });
      const comment = {
        blogId,
        user,
        createdAt: new Date(),
        text,
      };
      await blogModel.findOneAndUpdate(
        { _id: blogId },
        { $push: { comments: comment } },
        { new: true }
      );
      res.status(200).json({ message: "successful", comment });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong", err });
    }
  }
}
