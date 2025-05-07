import { api } from "@/trpc/react";
import type { z } from "zod";
import { readCompaniesSchema } from "@/schemas";

type ReadCompaniesInput = z.infer<typeof readCompaniesSchema>;

export const useCompanyQuerry = (
  input: ReadCompaniesInput = { limit: 10, offset: 0 }
) => {
  return api.company.read.useQuery(input);
};
