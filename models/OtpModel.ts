import mongoose from "mongoose";
import { IOtp } from "../utils/interfaces";
const { Schema } = mongoose;

const OtpSchema = new Schema<IOtp>({
  email: {
    type: String,
    required: true,
  },
  expiresIn: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const OtpModel = () => mongoose.model<IOtp>("Otp", OtpSchema);

export default (mongoose.models.Otp || OtpModel()) as ReturnType<
  typeof OtpModel
>;
