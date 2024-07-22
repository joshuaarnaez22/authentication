import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground ">
      <h1 className="text-4xl">401</h1>
      <p>Not Authorized</p>
      <Button variant="secondary">
        <Link href="/">Go back to login</Link>
      </Button>
    </div>
  );
}
