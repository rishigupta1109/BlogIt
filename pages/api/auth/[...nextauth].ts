import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "./../../../utils/dbConnect";
import User from "../../../models/userModel";
import { verifyPassword } from "./../../../utils/helper";
export const authOptions = {
  providers: [
    CredentialsProvider({
      session: {
        jwt: true,
      },
      async authorize(credentials: any) {
        await connectMongo();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }
        return {
          name: {
            name: user.name,
            id: user?._id,
            avatar: user?.avatar,
          },
          email: user.email,
        };
      },
    }),
  ],
};
export default NextAuth(authOptions);
