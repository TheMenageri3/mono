import { z } from "zod";

// CREATE
export const createEmailTemplateSchema = z
  .object({
    name: z.string().min(1),
    subject: z.string().min(1),
    html: z.string().min(1),
    variables: z.array(z.string()),
  })
// READ
export const readEmailTemplateByIdSchema = z.object({ id: z.string() });

export const readAllEmailTemplatesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

// UPDATE
export const updateEmailTemplateSchema = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().min(1).optional(),
    subject: z.string().min(1).optional(),
    html: z.string().min(1).optional(),
    variables: z.array(z.string()).optional(),
  }),
});

// DELETE & RESTORE
export const deleteEmailTemplateSchema = z.object({ id: z.string() });
export const restoreEmailTemplateSchema = z.object({ id: z.string() }); 
