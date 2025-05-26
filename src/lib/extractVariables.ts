import { ZodObject } from "zod";
import { createUserSchema } from "@/schemas/user";
import { createCompanySchema } from "@/schemas/company";

function extractVariableKeysFromZodSchema<T extends ZodObject<any>>(
  schema: T,
  prefix: string
): string[] {
  const shape = schema.shape;
  return Object.keys(shape).map((key) => `${prefix}.${key}`);
}

// Remove sensitive fields like 'hashedPassword'
const userVariables = extractVariableKeysFromZodSchema(createUserSchema, "user").filter(
  (v) => v !== "user.hashedPassword"
);

const companyVariables = extractVariableKeysFromZodSchema(createCompanySchema, "company");

export const AVAILABLE_TEMPLATE_VARIABLES = [...userVariables, ...companyVariables];
