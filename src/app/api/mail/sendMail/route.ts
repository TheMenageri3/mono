import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, subject, html, cc, bcc, attachments } = body;

    if (!subject || !html) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    //either to or cc or bcc is required
    if (!to && !cc && !bcc) {
      return NextResponse.json(
        { message: "At least one recipient is required" },
        { status: 400 }
      );
    }

    const info = await sendMail({
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(cc && { cc: Array.isArray(cc) ? cc : [cc] }),
      ...(bcc && { bcc: Array.isArray(bcc) ? bcc : [bcc] }),
      ...(attachments && { attachments }),
    });

    return NextResponse.json({ message: "Email sent", info });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}

/**
 *
 * 1. Send to a Single Recipient
 * {
 *   "to": "user@mail.com",
 *   "subject": "Hello message",
 *   "html": "<p>Welcome to the community, user!</p>"
 * }
 *
 * 2. Send to Multiple Recipients
 * {
 *   "to": ["user1@mail.com", "user2@mail.com"],
 *   "subject": "Project Launch Announcement",
 *   "html": "<p>Hey team, we just went live. Great job!</p>"
 * }
 *
 * 3. BCC Only (No 'to' field, backend falls back to EMAIL_USER or Ethereal user)
 * {
 *   "subject": "Confidential Update",
 *   "html": "<p>This update is sent to all stakeholders privately.</p>",
 *   "bcc": ["hidden1@mail.com", "hidden2@mail.com"]
 * }
 *
 * 4. With CC and BCC
 * {
 *   "to": "user@mail.com",
 *   "subject": "Schedule Update",
 *   "html": "<p>The schedule has been revised. Please check the shared calendar.</p>",
 *   "cc": ["teamlead@mail.com"],
 *   "bcc": ["admin@mail.com"]
 * }
 *
 * 5. With Remote Attachment
 * {
 *   "to": "user@mail.com",
 *   "subject": "Monthly Report",
 *   "html": "<p>Please find the report attached.</p>",
 *   "attachments": [
 *     {
 *       "filename": "report.pdf",
 *       "path": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
 *     }
 *   ]
 * }
 *
 * 6. Full Combo: To + CC + BCC + Attachment
 * {
 *   "to": ["user@mail.com", "user1@mail.com"],
 *   "cc": ["user2@mail.com"],
 *   "bcc": ["admin@mail.com"],
 *   "subject": "Final Delivery Notice",
 *   "html": "<p>All packages have been shipped. Details in the attachment.</p>",
 *   "attachments": [
 *     {
 *       "filename": "delivery.pdf",
 *       "path": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
 *     }
 *   ]
 * }
 */
