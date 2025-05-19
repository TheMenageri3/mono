import { createTRPCRouter } from "@/server/api/trpc";
import { createJobApplication } from "./create";
import { deleteJobApplication, restoreJobApplication } from "./delete";
import {
  readAllJobApplications,
  readDeletedJobApplications,
  getJobApplicationById,
} from "./read";
import { updateJobApplication } from "./update";

export const jobApplicationRouter = createTRPCRouter({
  create: createJobApplication,
  getById: getJobApplicationById,
  readAll: readAllJobApplications,
  readDeleted: readDeletedJobApplications,
  update: updateJobApplication,
  delete: deleteJobApplication,
  restore: restoreJobApplication,
});
