import mongoose from "mongoose";
import { Icomment } from "../utils/interfaces";
const { Schema } = mongoose;

const commentSchema = new Schema<Icomment>({
  blogId: {
    type: String,
    required: true,
  },
  user: {
    type: {},
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const CommentModel = () => mongoose.model<Icomment>("Comments", commentSchema);

export default (mongoose.models.Comments || CommentModel()) as ReturnType<
  typeof CommentModel
>;
