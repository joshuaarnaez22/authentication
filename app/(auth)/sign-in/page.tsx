import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInContent from "./_components/sign-in-content";

export default async function SignIn() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <SignInContent />;
}
