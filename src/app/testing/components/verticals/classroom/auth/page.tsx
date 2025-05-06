"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Github, Mail } from "lucide-react";

export default function AuthComponentsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          User Authentication Components
        </h1>
        <p className="text-muted-foreground">
          Components for user login, registration, and authentication flows
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Complete Auth Flow Example
        </h2>
        <div className="w-full max-w-md mx-auto">
          <AuthFlowTabs />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Individual Components</h2>

        {/* Login Form */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">1. Login Form</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <LoginForm />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Standard login form with email/password authentication.</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">2. Registration Form</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <RegistrationForm />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>User registration form with validation.</p>
          </div>
        </div>

        {/* Social Auth Buttons */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">3. Social Authentication</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <SocialAuthButtons />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Authentication options using third-party providers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function AuthFlowTabs() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-center">Welcome to ClassroomX</CardTitle>
        <CardDescription className="text-center">
          {activeTab === "login"
            ? "Sign in to access your account"
            : "Create a new account to get started"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">
                Don&apos;t have an account?{" "}
              </span>
              <Button
                variant="link"
                className="p-0"
                onClick={() => setActiveTab("register")}
              >
                Create one
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="register">
            <RegistrationForm />
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Button
                variant="link"
                className="p-0"
                onClick={() => setActiveTab("login")}
              >
                Sign in
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    rememberMe: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Login form data:", data);
    // Handle login logic
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label
                  htmlFor="rememberMe"
                  className="text-sm font-normal cursor-pointer"
                >
                  Remember me
                </Label>
              </FormItem>
            )}
          />

          <Button variant="link" className="p-0 h-auto text-sm">
            Forgot password?
          </Button>
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <SocialAuthButtons />
      </form>
    </Form>
  );
}

function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      acceptTerms: true,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Registration form data:", data);
    // Handle registration logic
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
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

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the{" "}
                  <Button variant="link" className="p-0 h-auto text-sm">
                    terms of service
                  </Button>{" "}
                  and{" "}
                  <Button variant="link" className="p-0 h-auto text-sm">
                    privacy policy
                  </Button>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create Account
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <SocialAuthButtons />
      </form>
    </Form>
  );
}

function SocialAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" className="w-full">
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
      <Button variant="outline" className="w-full">
        <Mail className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}
