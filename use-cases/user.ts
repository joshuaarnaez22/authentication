import { db } from "@/db/db";
import { users } from "@/db/schema";
import { comparePassword } from "@/lib/utils";
import { eq, and } from "drizzle-orm";

export const checkExistingUser = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return user;
};

export const createUser = async (email: string, hashedPassword: string, fullname: string) => {
  const user = await db.insert(users).values({
    email,
    hashedPassword,
    name: fullname,
  });
  return user;
};

export const getUserFromDb = async (email: string, password: string) => {
  const user = await db.query.users.findFirst({
    where: and(eq(users.email, email)),
  });

  console.log("====================================");
  console.log(user);
  console.log("====================================");
  if (!user || user.hashedPassword === null) return null;

  const comparePass = await comparePassword(password, user?.hashedPassword!);
  if (!comparePass) return null;
  return {
    id: user?.id,
    email: user?.email,
    name: user?.name,
    image: user?.image,
  };
};
