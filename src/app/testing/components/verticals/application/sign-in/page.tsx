"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/primitives/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Github, Twitter, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function SignInComponentsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sign In Components</h1>
        <p className="text-muted-foreground">
          Authentication components for application sign in, registration, and
          account access
        </p>
      </div>

      {/* Complete Sign In Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Complete Sign In Screen</h2>
        <div className="w-full max-w-md mx-auto">
          <CompleteSignIn />
        </div>
      </section>

      {/* Individual Components */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Individual Components</h2>

        {/* Email/Password Form */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">1. Email/Password Form</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <EmailPasswordForm />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>A standard email and password form with validation.</p>
          </div>
        </div>

        {/* Social Sign In Buttons */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">
            2. Social Sign In Options
          </h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <div className="flex flex-col gap-3 w-full">
              <SocialButton provider="github" />
              <SocialButton provider="twitter" />
              <SocialButton provider="google" />
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Social sign-in buttons with appropriate brand colors and icons.
            </p>
          </div>
        </div>

        {/* Tabbed Auth Form */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">3. Tabbed Authentication</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <TabbedAuthForm />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              A tabbed interface switching between sign in and register forms.
            </p>
          </div>
        </div>

        {/* Password Field with Visibility Toggle */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">
            4. Password Field with Visibility Toggle
          </h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <PasswordField />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              A password field that allows users to show or hide their password.
            </p>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">5. Remember Me Checkbox</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-standalone" />
              <label
                htmlFor="remember-standalone"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me for 30 days
              </label>
            </div>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">6. Forgot Password Link</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <div className="flex justify-end">
              <Button variant="link" className="px-0">
                Forgot password?
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Complete Sign In Component
function CompleteSignIn() {
  const [formType, setFormType] = useState<"signin" | "signup">("signin");
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormState("success");
      // Reset form state after showing success
      setTimeout(() => setFormState("idle"), 1500);
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          {formType === "signin" ? "Sign In" : "Create Account"}
        </CardTitle>
        <CardDescription>
          {formType === "signin"
            ? "Sign in to your account to continue"
            : "Fill in your details to create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {formType === "signin" ? (
          // Sign In Form
          <div className="space-y-4">
            <EmailPasswordForm
              onSubmitStart={() => setFormState("submitting")}
              onSubmitSuccess={() => setFormState("success")}
              formState={formState}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none"
                >
                  Remember me
                </label>
              </div>
              <Button variant="link" className="px-0 font-normal">
                Forgot password?
              </Button>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <SocialButton provider="github" />
              <SocialButton provider="twitter" />
              <SocialButton provider="google" />
            </div>
          </div>
        ) : (
          // Sign Up Form
          <SignUpForm
            onSubmitStart={() => setFormState("submitting")}
            onSubmitSuccess={() => setFormState("success")}
            formState={formState}
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2 border-t p-4">
        <div className="text-sm text-center text-muted-foreground">
          {formType === "signin" ? (
            <>
              Don&apos;t have an account?{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => setFormType("signup")}
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => setFormType("signin")}
              >
                Sign in
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

// Email/Password Form Component
function EmailPasswordForm({
  onSubmitStart,
  onSubmitSuccess,
  formState = "idle",
}: {
  onSubmitStart?: () => void;
  onSubmitSuccess?: () => void;
  formState?: "idle" | "submitting" | "success" | "error";
}) {
  const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (onSubmitStart) onSubmitStart();

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      if (onSubmitSuccess) onSubmitSuccess();
    }, 1000);
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
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    placeholder="email@example.com"
                    disabled={formState === "submitting"}
                    {...field}
                  />
                </div>
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
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    type="password"
                    disabled={formState === "submitting"}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full relative"
          disabled={formState !== "idle"}
        >
          {formState === "submitting" ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Signing in...
            </span>
          ) : formState === "success" ? (
            <span className="flex items-center gap-2 justify-center">
              <svg
                className="h-4 w-4 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Success!
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}

// Social Button Component
function SocialButton({
  provider,
}: {
  provider: "github" | "twitter" | "google";
}) {
  const providers = {
    github: {
      label: "Github",
      icon: <Github className="h-5 w-5" />,
      style: "hover:bg-black hover:text-white",
    },
    twitter: {
      label: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      style: "hover:bg-[#1DA1F2] hover:text-white",
    },
    google: {
      label: "Google",
      icon: <Mail className="h-5 w-5" />,
      style: "hover:bg-[#4285F4] hover:text-white",
    },
  };

  const { label, icon, style } = providers[provider];

  return (
    <Button variant="outline" className={`w-full ${style}`}>
      {icon}
      <span className="ml-2">Continue with {label}</span>
    </Button>
  );
}

// Tabbed Auth Form Component
function TabbedAuthForm() {
  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin" className="pt-4">
        <EmailPasswordForm />
      </TabsContent>
      <TabsContent value="signup" className="pt-4">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
}

// Sign Up Form
function SignUpForm({
  onSubmitStart,
  onSubmitSuccess,
  formState = "idle",
}: {
  onSubmitStart?: () => void;
  onSubmitSuccess?: () => void;
  formState?: "idle" | "submitting" | "success" | "error";
}) {
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (onSubmitStart) onSubmitStart();

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      if (onSubmitSuccess) onSubmitSuccess();
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  disabled={formState === "submitting"}
                  {...field}
                />
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
                <Input
                  placeholder="email@example.com"
                  disabled={formState === "submitting"}
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  disabled={formState === "submitting"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full mt-4"
          disabled={formState !== "idle"}
        >
          {formState === "submitting" ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Creating account...
            </span>
          ) : formState === "success" ? (
            <span className="flex items-center gap-2 justify-center">
              <svg
                className="h-4 w-4 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Account created!
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}

// Password Field with Visibility Toggle
function PasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Password</div>
      <div className="relative">
        <Input
          id="password-standalone"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Password must be at least 6 characters.
      </p>
    </div>
  );
}
