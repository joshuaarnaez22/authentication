import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardContent from "./_components/dashboard-content";

export default async function Dashboard() {
  const session = await auth();
  console.log(session);

  if (!session) {
    redirect("/unauthorized");
  }
  return <DashboardContent />;
}
