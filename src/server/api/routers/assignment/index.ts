import { createTRPCRouter } from "@/server/api/trpc";
import { createAssignment } from "./create";
import {
  readAssignments,
  readDeletedAssignments,
  getAssignmentById,
  getAssignmentsByFilter,
} from "./read";
import { updateAssignment } from "./update";
import { deleteAssignment, restoreAssignment } from "./delete";

export const assignmentRouter = createTRPCRouter({
  create: createAssignment,
  read: readAssignments,
  readDeleted: readDeletedAssignments,
  readById: getAssignmentById,
  readByFilter: getAssignmentsByFilter,
  update: updateAssignment,
  delete: deleteAssignment,
  restore: restoreAssignment,
});
