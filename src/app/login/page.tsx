"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { Chrome, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { emailLogin, emailSignUp, googleLogin } from "@/app/auth/actions";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const formSchema = isLoginView ? loginSchema : signupSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isLoginView
      ? { email: "", password: "" }
      : { name: "", email: "", password: "" },
  });

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const result = await googleLogin();
    if (result.success) {
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: result.error,
      });
      setIsLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = isLoginView
      ? await emailLogin(values)
      : await emailSignUp(values as z.infer<typeof signupSchema>);
    
    setIsLoading(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: isLoginView ? "Login Failed" : "Sign Up Failed",
        description: result.error,
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4 mb-8">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <Logo />
        </Link>
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">
              {isLoginView ? "Login" : "Sign Up"}
            </CardTitle>
            <CardDescription>
              Enter your details below to access your artisan dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                <Chrome className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {!isLoginView && (
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          {isLoginView && (
                            <Link
                              href="#"
                              className="ml-auto inline-block text-sm underline"
                            >
                              Forgot your password?
                            </Link>
                          )}
                        </div>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoginView ? "Login" : "Sign Up"}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="mt-4 text-center text-sm">
              {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => {
                  setIsLoginView(!isLoginView);
                  form.reset();
                }}
              >
                {isLoginView ? "Sign up" : "Login"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
