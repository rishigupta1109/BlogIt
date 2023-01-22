import { GetServerSidePropsContext, NextApiRequest } from "next/types";
import { NextApiResponse } from "next/types";
import Users from "../../../models/userModel";
import { readfile } from "../blog/create";
import fs from "fs";
import path from "path";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req: req });
  console.log(session);
  console.log("here");
  if (!session) {
    res.status(401).json({ message: "not authenticated" });
  }

  if (req.method === "PATCH") {
    const { name, description, role, image } = JSON.parse(req.body);
    try {
      const updateUser = await Users.findOneAndUpdate(
        { _id: session?.user?.name?.id },
        {
          avatar: image,
          name: name,
          description: description,
          role: role,
        }
      );
      return res.status(200).json({ message: "successful", updateUser });
    } catch (error) {
      return res.status(500).json({ message: "something went wrong", error });
    }
  } else if (req.method === "PUT") {
    let imageName = "";
    try {
      fs.readdirSync(path.join(process.cwd()) + "/public" + "/user");
    } catch (err) {
      fs.mkdirSync(path.join(process.cwd()) + "/public" + "/user");
    }
    try {
      const { fields } = await readfile(req, true, imageName, "user");
      console.log(fields);
      const { image, role, description, name } = fields;
      const updatedUser = await Users.findOneAndUpdate(
        { _id: session?.user?.name?.id },
        {
          name: name,
          avatar: image,
          role: role,
          description: description,
        }
      );
      return res.status(200).json({ message: "successful", updatedUser });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "something went wrong", err });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
