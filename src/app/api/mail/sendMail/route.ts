import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html } = await req.json();

    const info = await sendMail({ to, subject, html });

    return NextResponse.json({ message: "Email sent", info });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}
