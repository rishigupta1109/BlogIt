import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "./../../../utils/dbConnect";
import User from "../../../models/userModel";
import { verifyPassword } from "./../../../utils/helper";
import { RequestInternal } from "next-auth";
export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      session: {
        jwt: true,
      },
      async authorize(
        credentials: Record<string, string> | undefined,
        req: Pick<RequestInternal, "body" | "method" | "query" | "headers">
      ) {
        if (!credentials) throw new Error("No credentials provided");
        await connectMongo();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found");
        }
        if (!user.password) {
          throw new Error("Unable to log in");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }
        return {
          name: user._id,
          email: user.email,
        };
      },
    }),
  ],
};
export default NextAuth(authOptions);
