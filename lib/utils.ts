import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const saltAndHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10); // Generate salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash password
  return { salt, hashedPassword };
};

export const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword); // Compare hashed password
};
