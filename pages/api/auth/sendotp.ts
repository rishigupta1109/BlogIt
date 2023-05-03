import { NextApiRequest, NextApiResponse } from "next/types";
import User from "../../../models/userModel";
import Otp from "../../../models/OtpModel";
import { hashPassword } from "../../../utils/helper";
import connectMongo from "../../../utils/dbConnect";
const nodemailer = require("nodemailer");
const mail = (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thebookbajaar@gmail.com",
      pass: "yihuoxpbqpcqhobv",
    },
  });

  const mailOptions = {
    from: "thebookbajaar@gmail.com",
    to: email,
    subject: `Otp to reset your password`,
    text: `The otp to reset your password is ${otp}. Thanks,The Book Bajaar`,
    replyTo: "thebookbajaar@gmail.com",
  };
  transporter.sendMail(mailOptions, function (err: any, res: any) {
    if (err) {
      console.error("there was an error: ", err);
    } else {
      console.log("here is the res: ", res);
    }
  });
};

// const checkOtp = async (req, res, next) => {
//   const { email, password, otp } = req.body;
//   let userOtp;
//   try {
//     userOtp = await Otp.findOne({ email: email, code: otp });
//   } catch (err) {
//     return next(new Error("something went wrong"));
//   }
//   if (userOtp) {
//     let expiry = new Date(userOtp.expiresIn);
//     if (expiry > new Date()) {
//       return res.json({ message: "otp verified", status: "success" });
//     } else {
//       return next(new Error("Otp expired"));
//     }
//   } else {
//     return next(new Error("wrong otp"));
//   }
// };
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
  const { email } = req.body;
  if (!email) return res.status(422).json({ message: "Invalid data" });

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(404).json({ message: "User already Exists" });
    let code = await Otp.findOne({ email: email });
    let otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
    if (code) {
      code.expiresIn = new Date(new Date().getTime() + 300 * 1000);
      code.createdAt = new Date();
      code.code = String(otp);
      try {
        await code.save();
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "something wentt wrong!", err });
      }
    } else {
      code = new Otp({
        email: email,
        code: otp,
        expiresIn: new Date(new Date().getTime() + 300 * 1000),
        createdAt: new Date(),
      });
      try {
        await code.save();
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "something wentt wrong!", err });
      }
    }
    mail(email, String(otp));
    res.json({ message: "otp sent to your email", status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something wentt wrong!", err });
  }
}
