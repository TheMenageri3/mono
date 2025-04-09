import nodemailer from "nodemailer";

const isDev = process.env.NODE_ENV === "development";

// Create transporter for sending email based on environment
async function createTransporter() {
  if (isDev) {
    // Generate test SMTP account for Ethereal
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    return { transporter, fallbackTo: testAccount.user, fromEmail: testAccount.user };
  } else {
    // Use production SMTP credentials from environment
    const host = process.env.EMAIL_HOST;
    const port = parseInt(process.env.EMAIL_PORT || "465", 10);
    const secure = port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    return {
      transporter,
      fallbackTo: process.env.EMAIL_USER!,
      fromEmail: process.env.EMAIL_USER!,
    };
  }
}

type MailOptions = {
  to?: string | string[];
  subject: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: {
    filename: string;
    path?: string;
    content?: any;
    contentType?: string;
  }[];
};

export async function sendMail({
  to,
  subject,
  html,
  cc,
  bcc,
  attachments,
}: MailOptions) {
  const { transporter, fallbackTo, fromEmail } = await createTransporter();


  // If "to" is not provided, use the fallback email address whuch is admin email of the app
  const resolvedTo =
    to && (Array.isArray(to) ? to : [to]).length > 0 ? to : fallbackTo;

  const mailOptions = {
    from: `"TheMenageri3" <${fromEmail}>`,
    to: resolvedTo,
    subject,
    html,
    ...(cc && { cc }),
    ...(bcc && { bcc }),
    ...(attachments && { attachments }),
  };

  const result = await transporter.sendMail(mailOptions);

  if (isDev) {
    console.log("📨 Preview Email:", nodemailer.getTestMessageUrl(result));
  }

  return result;
}
