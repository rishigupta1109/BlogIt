import formidable from "formidable";
import fs from "fs";
import { NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import path from "path";
import Blogs from "../../../models/blogModel";
import { getSession } from "next-auth/react";
import connectMongo from "./../../../utils/dbConnect";
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
  console.log({ saveLocally });
  let options: formidable.Options = {};
  let name: string;
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), `/public/blogimages`);
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
      if (saveLocally) {
        fields.image = imageName;
      }
      resolve({ fields, files });
    });
  });
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req: req });
    console.log(session);
    if (!session) {
      res.status(401).json({ message: "not authenticated" });
    }
    const conn = await connectMongo();
    fs.readdirSync(path.join(process.cwd()) + "/public" + "/blogimages");
  } catch (err) {
    fs.mkdirSync(path.join(process.cwd()) + "/public" + "/blogimages");
  }
  let imageName = "";
  const { fields }: any = await readfile(req, false, imageName);

  const {
    title,
    tags,
    createdAt,
    body,
    image,
    author,
    authorName,
    authorAvatar,
  } = fields;
  console.log(fields);
  try {
    const blog = await Blogs.create({
      title,
      tags,
      image,
      createdAt,
      body,
      author,
      authorName,
      authorAvatar,
    });
    res.status(201).json({ message: "blog created successfully", blog });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error occured", err });
  }
}
