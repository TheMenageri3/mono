import { createTRPCRouter } from "@/server/api/trpc";
import { createClassApplication } from "./create";
import {
  getClassApplications,
  getClassApplicationById,
  getClassApplicationsByFilter,
  getDeletedClassApplications,
} from "./read";
import { updateClassApplication } from "./update";
import { deleteClassApplication, restoreClassApplication } from "./delete";

export const classApplicationRouter = createTRPCRouter({
  create: createClassApplication,
  read: getClassApplications,
  readById: getClassApplicationById,
  readByFilter: getClassApplicationsByFilter,
  readDeleted: getDeletedClassApplications,
  update: updateClassApplication,
  delete: deleteClassApplication,
  restore: restoreClassApplication,
});
