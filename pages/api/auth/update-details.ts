import { GetServerSidePropsContext, NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import Users from "../../../models/userModel";
import fs from "fs";
import path from "path";
import { getSession } from "next-auth/react";
import connectMongo from "../../../utils/dbConnect";
import formidable from "formidable";
export const config = {
  api: {
    bodyParser: false,
  },
};
export const readfile = async (
  req: NextApiRequest,
  saveLocally: boolean,
  imageName: string
) => {
  let options: formidable.Options = {};
  let name: string;
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), `/public/user`);
    options.filename = (name, ext, path, form) => {
      name = Date.now().toString() + "_" + path.originalFilename;
      imageName = name;
      console.log("here", name);
      return name;
    };
  }
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      if (saveLocally) fields.image = imageName;
      resolve({ fields, files });
    });
  });
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let session;
  try {
    session = await getSession({ req: req });
    if (!session) {
      res.status(401).json({ message: "not authenticated" });
    }
  } catch (err) {
    return res.status(500).json({ message: "something went wrong", err });
  }
  // console.log(session);
  // console.log("here");
  console.log(req.method);
  try {
    const conn = await connectMongo();
  } catch (err) {
    return res.status(500).json({ message: "something went wrong", err });
  }
  if (req.method === "PATCH") {
    const op: any = await readfile(req, false, "");
    console.log(op);
    const { image, role, description, name } = op.fields;
    try {
      const updateUser = await Users.findOneAndUpdate(
        { _id: session?.user?.name },
        {
          avatar: image,
          name: name,
          description: description,
          role: role,
        }
      );
      return res.status(200).json({
        message: "successful",
        user: {
          _id: updateUser?._id,
          email: updateUser?.email,
          avatar: image,
          name: name,
          description: description,
          role: role,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "something went wrong", error });
    }
  } else if (req.method === "PUT") {
    try {
      fs.readdirSync(path.join(process.cwd()) + "/public" + "/user");
    } catch (err) {
      fs.mkdirSync(path.join(process.cwd()) + "/public" + "/user");
    }
    try {
      let imageName = "";
      const op: any = await readfile(req, false, imageName);
      console.log(op);
      const { image, role, description, name } = op.fields;
      const updatedUser = await Users.findOneAndUpdate(
        { _id: session?.user?.name },
        {
          name: name,
          avatar: image,
          role: role,
          description: description,
        }
      );
      return res.status(200).json({
        message: "successful",
        user: {
          _id: updatedUser?._id,
          email: updatedUser?.email,
          avatar: image,
          name: name,
          description: description,
          role: role,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "something went wrong", err });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
