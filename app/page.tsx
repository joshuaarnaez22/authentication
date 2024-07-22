import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MainPage() {
  const session = await auth();

  return session?.user ? redirect("/dashboard") : redirect("/sign-in");
}
