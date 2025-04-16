import { createTRPCRouter } from "@/server/api/trpc";
import { createAssignment } from "./create";
import { readAssignments } from "./read";
import { updateAssignment } from "./update";
import { deleteAssignment } from "./delete";

export const assignmentRouter = createTRPCRouter({
  create: createAssignment,
  read: readAssignments,
  update: updateAssignment,
  delete: deleteAssignment,
});
