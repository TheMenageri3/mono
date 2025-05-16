import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { sendMail } from "@/lib/mail";

export const emailRouter = createTRPCRouter({
  send: protectedProcedure
    .input(
      z.object({
        to: z.union([z.string(), z.array(z.string())]).optional(),
        cc: z.union([z.string(), z.array(z.string())]).optional(),
        bcc: z.union([z.string(), z.array(z.string())]).optional(),
        subject: z.string(),
        html: z.string(),
        attachments: z
          .array(
            z.object({
              filename: z.string(),
              path: z.string().optional(),
              content: z.union([z.string(), z.instanceof(Buffer)]).optional(),
              contentType: z.string().optional(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { to, cc, bcc, subject, html, attachments } = input;

      if (!subject || !html) {
        throw new Error("Missing subject or html content");
      }

      if (!to && !cc && !bcc) {
        throw new Error("At least one recipient is required");
      }

      const info = await sendMail({
        to,
        cc,
        bcc,
        subject,
        html,
        attachments,
      });

      return {
        message: "Email sent",
        info,
        previewUrl:
          process.env.NODE_ENV === "development"
            ? require("nodemailer").getTestMessageUrl(info)
            : undefined,
      };
    }),
});
