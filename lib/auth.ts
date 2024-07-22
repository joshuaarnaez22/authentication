import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";
import Google from "next-auth/providers/google";
import { db } from "@/db/db";
import Credentials from "next-auth/providers/credentials";
import { saltAndHashPassword } from "./utils";
import { getUserFromDb } from "@/use-cases/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to verify if user exists
        user = await getUserFromDb(credentials.email as string, credentials.password as string);

        return user ?? null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    signOut: "/sign-out",
    error: "/",
  },
});
