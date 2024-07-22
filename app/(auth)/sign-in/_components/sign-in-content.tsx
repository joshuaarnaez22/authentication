"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ImGithub } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignInContent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!response?.url) {
      setLoading(false);
      return toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      });
    }
    router.push("/dashboard");
    setLoading(false);
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={viewPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {viewPassword ? (
                <EyeOff
                  strokeWidth={1.3}
                  className="absolute top-2 right-2 hover:cursor-pointer"
                  onClick={() => setViewPassword(!viewPassword)}
                />
              ) : (
                <Eye
                  strokeWidth={1.3}
                  className="absolute top-2 right-2 hover:cursor-pointer"
                  onClick={() => setViewPassword(!viewPassword)}
                />
              )}
            </div>
          </div>
          <Button className="w-full " onClick={handleSignIn} disabled={loading}>
            {loading ? <Loader2 className="size-4 mr-2 animate-spin" /> : null}
            Login
          </Button>
          <div className="flex justify-center gap-x-2 items-center">
            <Separator className="my-4 flex-1" />
            <p className="text-sm">OR</p>
            <Separator className="my-4 flex-1" />
          </div>
          <div className="flex justify-center gap-2">
            <Button variant="outline" className="size-14 rounded-full">
              <ImGithub className="size-6" />
            </Button>
            <Button
              variant="outline"
              className="size-14 rounded-full"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <FcGoogle className="size-6" />
            </Button>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
