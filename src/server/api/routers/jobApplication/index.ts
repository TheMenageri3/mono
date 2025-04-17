import { createTRPCRouter } from "../../trpc";
import { createJobApplication } from "./create";
import { deleteJobApplication, restoreJobApplication } from "./delete";
import {
  readAllJobApplications,
  readDeletedJobApplications,
  getJobApplicationById,
} from "./read";
import { updateJobApplication } from "./update";

export const jobAppiclationRouter = createTRPCRouter({
  create: createJobApplication,
  getById: getJobApplicationById,
  readAll: readAllJobApplications,
  readDeleted: readDeletedJobApplications,
  update: updateJobApplication,
  delete: deleteJobApplication,
  restore: restoreJobApplication,
});
