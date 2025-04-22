import { createTRPCRouter } from "@/server/api/trpc";
import { createClassApplication } from "./create";
import {
  getClassApplicationById,
  getClassApplicationsByClass,
  getClassApplicationsByFilter,
  getDeletedClassApplicationsByClass,
} from "./read";
import { updateClassApplication } from "./update";
import { deleteClassApplication } from "./delete";

export const classApplicationRouter = createTRPCRouter({
  create: createClassApplication,
  readById: getClassApplicationById,
  readByClass: getClassApplicationsByClass,
  readByFilter: getClassApplicationsByFilter,
  readDeletedByClass: getDeletedClassApplicationsByClass,
  update: updateClassApplication,
  delete: deleteClassApplication,
});
