import mongoose from "mongoose";
import { IUser } from "../utils/interfaces";
const { Schema } = mongoose;

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "profile.jpg" },
  role: { type: String, default: "" },
  description: { type: String, default: "" },
});

const UserModel = () => mongoose.model<IUser>("User", UserSchema);

export default (mongoose.models.User || UserModel()) as ReturnType<
  typeof UserModel
>;
