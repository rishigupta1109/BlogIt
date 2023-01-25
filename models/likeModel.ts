import mongoose from "mongoose";
import { ILike } from "../utils/interfaces";
const { Schema } = mongoose;

const likeSchema = new Schema<ILike>({
  blogId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const LikeModel = () => mongoose.model<ILike>("Likes", likeSchema);

export default (mongoose.models.Likes || LikeModel()) as ReturnType<
  typeof LikeModel
>;
