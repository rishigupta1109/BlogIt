import formidable from "formidable";
import fs from "fs";
import { NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import path from "path";
import Blogs from "../../../models/blogModel";
export const config = {
  api: {
    bodyParser: false,
  },
};
const readfile = async (
  req: NextApiRequest,
  saveLocally: boolean,
  imageName: string
) => {
  let options: formidable.Options = {};
  let name: string;
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/blogimages");
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
      fields.image = imageName;
      resolve({ fields, files });
    });
  });
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    fs.readdirSync(path.join(process.cwd()) + "/public" + "/blogimages");
  } catch (err) {
    fs.mkdirSync(path.join(process.cwd()) + "/public" + "/blogimages");
  }
  let imageName = "";
  const { fields } = await readfile(req, true, imageName);
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
    res.status(500).json({ message: err });
  }
}
