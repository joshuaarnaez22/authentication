"use server";
import { saltAndHashPassword } from "@/lib/utils";
import { checkExistingUser, createUser } from "@/use-cases/user";
type CreateUser = {
  email: string;
  password: string;
  fullname: string;
};
export const createNewUser = async ({ email, password, fullname }: CreateUser) => {
  const { hashedPassword } = await saltAndHashPassword(password);
  const checkEmail = await checkExistingUser(email);
  if (checkEmail) {
    throw new Error("Email already exist");
  }
  const user = await createUser(email, hashedPassword, fullname);
  return user;
};
