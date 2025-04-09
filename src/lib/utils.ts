import nodemailer from "nodemailer";

const isDev = process.env.NODE_ENV === "development";

// Create transporter for sending email based on environment
async function createTransporter() {
  if (isDev) {
    // Generate test SMTP account for Ethereal
    const testAccount = await nodemailer.createTestAccount();

    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } else {
    // Use production SMTP credentials from environment
    const host = process.env.EMAIL_HOST;
    const port = parseInt(process.env.EMAIL_PORT || "465", 10);
    const secure = port === 465;

    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
}

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = await createTransporter();

  const mailOptions = {
    from: `"TheMenageri3" <${isDev ? "test@ethereal.email" : process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  const result = await transporter.sendMail(mailOptions);

  if (isDev) {
    console.log("📨 Preview Email:", nodemailer.getTestMessageUrl(result));
  }

  return result;
}
