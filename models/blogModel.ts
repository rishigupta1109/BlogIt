import mongoose from "mongoose";
import { IBlog } from "../utils/interfaces";
const { Schema } = mongoose;

const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorAvatar: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
  },
});

const BlogModel = () => mongoose.model<IBlog>("Blogs", BlogSchema);

export default (mongoose.models.Blogs || BlogModel()) as ReturnType<
  typeof BlogModel
>;
