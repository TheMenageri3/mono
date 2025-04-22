import { createTRPCRouter } from "@/server/api/trpc";
import { createIndustry } from "./create";
import { readIndustries, getIndustryById, readDeletedIndustries } from "./read";
import { updateIndustry } from "./update";
import { deleteIndustry, restoreIndustry } from "./delete";

export const industryRouter = createTRPCRouter({
  create: createIndustry,
  read: readIndustries,
  getById: getIndustryById,
  readDeleted: readDeletedIndustries,
  update: updateIndustry,
  delete: deleteIndustry,
  restore: restoreIndustry,
});