import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { sendMail } from "@/lib/mail";
import { renderTemplate } from "@/lib/utils/renderTemplate";
import { db } from "@/server/db";

// Define schema separately for reuse + type inference
const sendEmailSchema = z.object({
  templateId: z.string().optional(),
  to: z.union([z.string(), z.array(z.string())]).optional(),
  cc: z.union([z.string(), z.array(z.string())]).optional(),
  bcc: z.union([z.string(), z.array(z.string())]).optional(),
  subject: z.string().optional(),
  html: z.string().optional(),
  variables: z.record(z.string(), z.any()).optional(),
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
});

export const emailRouter = createTRPCRouter({
  send: protectedProcedure
    .input(sendEmailSchema)
    .mutation(async ({ input, ctx }): Promise<any> => {
      const {
        templateId,
        to,
        cc,
        bcc,
        subject,
        html,
        attachments,
        variables = {},
      } = input;

      if (!to && !cc && !bcc) {
        throw new Error("At least one recipient is required");
      }

      let resolvedHtml = html;
      let resolvedSubject = subject;

      if (templateId) {
        const template = await db.emailTemplate.findUnique({
          where: { id: templateId },
        });

        if (!template) throw new Error("Email template not found");

        resolvedHtml = renderTemplate(template.html, variables);
        resolvedSubject = renderTemplate(template.subject, variables);
      }

      if (!resolvedSubject || !resolvedHtml) {
        throw new Error("Missing subject or html content");
      }

      const info = await sendMail({
        to,
        cc,
        bcc: bcc || [],
        subject: resolvedSubject,
        html: resolvedHtml,
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
