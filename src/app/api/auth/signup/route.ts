import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { hashPassword } from "@/server/auth/password";
import { UserRole, UserStatus } from "@/generated/prisma/client";
import { signUpSchema } from "@/server/auth/zod";

export async function POST(req: Request) {
  try {
    const { email, password, confirmPassword } = await req.json();
    console.log("Signup attempt for email:", email);

    // Validate input using zod
    console.log("Validating input...");
    await signUpSchema.parseAsync({ email, password, confirmPassword });
    console.log("Input validation successful");

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", email);
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password using our utility
    console.log("Hashing password...");
    const hashedPassword = await hashPassword(password);
    console.log("Password hashed successfully");

    // Create user
    console.log("Creating user...");
    const user = await db.user.create({
      data: {
        email,
        hashedPassword,
        name: email.split("@")[0], // Use the part before @ as the default name
        role: UserRole.STANDARD,
        status: UserStatus.ACTIVE,
      },
    });
    console.log("User created successfully:", {
      id: user.id,
      email: user.email,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in signup:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
