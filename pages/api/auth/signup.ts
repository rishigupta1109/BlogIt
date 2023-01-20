import { NextApiRequest, NextApiResponse } from "next/types";
import User from "../../../models/userModel";
import { hashPassword } from "../../../utils/helper";
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
  const { name, email, password } = req.body;
  if (!email || !password || !name)
    return res.status(422).json({ message: "Invalid data" });
  else if (password.length < 6)
    return res
      .status(422)
      .json({ message: "Password must be at least 6 characters long" });
  try {
    const hashedPassword = await hashPassword(password);
    await User.create({ name, email, password: hashedPassword });
    return res
      .status(201)
      .json({ message: "User created", user: { name, email } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something wentt wrong!", err });
  }
}
