import { createTRPCRouter } from "@/server/api/trpc";
import { createClassApplication } from "./create";
import {
  readClassApplications,
  readClassApplicationById,
  readClassApplicationsByFilter,
  readDeletedClassApplications,
} from "./read";
import { updateClassApplication } from "./update";
import { deleteClassApplication, restoreClassApplication } from "./delete";

export const classApplicationRouter = createTRPCRouter({
  create: createClassApplication,
  read: readClassApplications,
  readById: readClassApplicationById,
  readByFilter: readClassApplicationsByFilter,
  readDeleted: readDeletedClassApplications,
  update: updateClassApplication,
  delete: deleteClassApplication,
  restore: restoreClassApplication,
});
