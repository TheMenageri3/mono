import { createTRPCRouter } from "@/server/api/trpc";
import { createSection } from "./create";
import { readSections, getSectionById, readDeletedSections } from "./read";
import { updateSection } from "./update";
import { deleteSection, restoreSection } from "./delete";

export const sectionRouter = createTRPCRouter({
  create: createSection,
  read: readSections,
  getByName: getSectionById,
  readDeleted: readDeletedSections,
  update: updateSection,
  delete: deleteSection,
  restore: restoreSection,
});
