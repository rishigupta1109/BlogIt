import { NextApiRequest, NextApiResponse } from "next/types";
import User from "../../../models/userModel";
import Otp from "../../../models/OtpModel";
import connectMongo from "../../../utils/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error while connecting to DB" });
  }
  if (req.method !== "POST") return res.status(404);
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(422).json({ message: "Invalid data" });

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(404).json({ message: "User already Exists" });

    let userOtp;
    try {
      userOtp = await Otp.findOne({ email: email, code: otp });
    } catch (err) {
      return res.status(500).json({ message: "something wentt wrong!", err });
    }
    if (userOtp) {
      let expiry = new Date(userOtp.expiresIn);
      if (expiry > new Date()) {
        return res
          .status(200)
          .json({ message: "otp verified", status: "success" });
      } else {
        return res.status(500).json({ message: "something wentt wrong!" });
      }
    } else {
      return res.status(500).json({ message: "Wrong OTP!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something wentt wrong!", err });
  }
}
