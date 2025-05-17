import { createTRPCRouter } from "@/server/api/trpc";
import { createEmailTemplate } from "./create";
import { readEmailTemplateById, readAllEmailTemplates } from "./read";
import { updateEmailTemplate } from "./update";
import { deleteEmailTemplate, restoreEmailTemplate } from "./delete";

export const emailTemplateRouter = createTRPCRouter({
  create: createEmailTemplate,
  readAll: readAllEmailTemplates,
  readById: readEmailTemplateById,
  update: updateEmailTemplate,
  delete: deleteEmailTemplate,
  restore: restoreEmailTemplate,
});
