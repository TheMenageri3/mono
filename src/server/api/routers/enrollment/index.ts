import { createTRPCRouter } from "@/server/api/trpc";
import { createEnrollment } from "./create";
import { readEnrollments, getEnrollmentById } from "./read";
import { updateEnrollment } from "./update";
import { deleteEnrollment, restoreEnrollment } from "./delete";

export const enrollmentRouter = createTRPCRouter({
  create: createEnrollment,
  read: readEnrollments,
  readById: getEnrollmentById,
  update: updateEnrollment,
  delete: deleteEnrollment,
  restore: restoreEnrollment,
});
