import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { hashPassword } from "@/server/auth/password";
import { UserRole, UserStatus } from "@/generated/prisma";
import { signUpSchema } from "@/server/auth/zod";

export async function POST(req: Request) {
  try {
    const { email, password, confirmPassword } = await req.json();
	console.log("passoword", password)
	console.log("confirmpassoword", confirmPassword)

    // Validate input using zod
    await signUpSchema.parseAsync({ email, password, confirmPassword });

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password using our utility
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await db.user.create({
      data: {
        email,
        hashedPassword,
        name: email.split("@")[0], // Use the part before @ as the default name
        role: UserRole.STANDARD,
        status: UserStatus.ACTIVE,
      },
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
