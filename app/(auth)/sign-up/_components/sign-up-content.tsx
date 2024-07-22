"use client";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { createNewUser } from "./action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
const signUpSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function SignUpContent() {
  const [viewPassword, setViewPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof signUpSchema>) => {
    // You can now use the `data` object to send it to your backend or perform any other actions
    startTransition(async () => {
      try {
        const { email, password, fullname } = data;
        await createNewUser({ email, password, fullname });
        toast({
          title: "Success",
          description: "Account created successfully",
        });
        form.reset();
        router.push("/sign-in");
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: `${error.message === "Email already exist" ? "Email already exist" : "Something went wrong"}`,
          description: error.message,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4">
          <div>
            <FormField
              name="fullname"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={viewPassword ? "text" : "password"} {...field} />
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating account..." : "Create an account"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
}
