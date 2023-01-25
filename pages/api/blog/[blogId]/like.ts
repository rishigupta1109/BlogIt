import { NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import likes from "../../../../models/likeModel";
import connectMongo from "../../../../utils/dbConnect";
import blogModel from "../../../../models/blogModel";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { blogId, userId } = JSON.parse(req.body);
    console.log({ blogId, userId }, JSON.parse(req.body));

    try {
      await connectMongo();
      const like = await likes.create({
        blogId,
        userId,
        createdAt: new Date(),
      });
      await blogModel.findOneAndUpdate(
        { _id: blogId },
        { $inc: { likes: 1 } },
        { new: true }
      );
      res.status(200).json({ message: "successful", like });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong", err });
    }
  } else if (req.method === "GET") {
    let { blogId, userId } = req.query;
    try {
      console.log(userId, blogId);
      await connectMongo();
      const like = await likes.findOne({ blogId, userId });
      if (!like) return res.status(404).json({ message: "Like not found" });
      res.status(200).json({ message: "successful", like });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong", err });
    }
  } else if (req.method === "DELETE") {
    let { blogId, userId } = req.query;
    try {
      await connectMongo();
      const like = await likes.findOne({ blogId, userId });
      if (!like) return res.status(404).json({ message: "Like not found" });
      const deletedLike = await likes.findOneAndDelete({ blogId, userId });
      await blogModel.findOneAndUpdate(
        { _id: blogId },
        { $inc: { likes: -1 } },
        { new: true }
      );
      res.status(200).json({ message: "successful", deletedLike });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong", err });
    }
  }
}
