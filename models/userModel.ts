import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  description: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  description: { type: String, default: "" },
});

const UserModel = () => mongoose.model<IUser>("User", UserSchema);

export default (mongoose.models.User || UserModel()) as ReturnType<
  typeof UserModel
>;
