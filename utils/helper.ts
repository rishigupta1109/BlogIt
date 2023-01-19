import { compare, hash, genSaltSync } from "bcryptjs";

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await compare(password, hashedPassword);
  return isMatch;
};
