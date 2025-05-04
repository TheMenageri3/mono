import { comparePasswords, hashPassword } from "./password";
import { db } from "../db";
import { signInSchema } from "./zod";
import { UserStatus, UserRole } from "@/generated/prisma";

export async function verifyUserCredentials(email: string, password: string) {
  try {
    console.log("Verifying credentials for email:", email);

    // First validate input using zod
    console.log("Validating input...");
    await signInSchema.parseAsync({ email, password });
    console.log("Input validation successful");

    // Find user by email
    console.log("Looking up user by email...");
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("User not found");
      throw new Error("User not found");
    }
    console.log("User found:", { id: user.id, email: user.email });

    // Verify password
    console.log("Verifying password...");
    if (!user.hashedPassword) {
      throw new Error("Password not set for this user");
    }
    await comparePasswords(password, user.hashedPassword);
    console.log("Password verification successful");

    return {
      success: true,
      message: "User credentials verified successfully",
      data: user,
    };
  } catch (error) {
    console.error("Error in verifyUserCredentials:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Verification failed",
      data: null,
    };
  }
}

export async function createUser(email: string, password: string) {
  try {
    // Validate input
    await signInSchema.parseAsync({ email, password });

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await db.user.create({
      data: {
        email,
        hashedPassword,
        role: UserRole.STANDARD,
        status: UserStatus.ACTIVE,
      },
    });

    return { success: true, message: "User created successfully", data: user };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "User creation failed",
      data: null,
    };
  }
}
