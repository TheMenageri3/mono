import { createTRPCRouter } from "@/server/api/trpc";
import { createJobPosting } from "./create";
import {
  readJobPostings,
  readDeletedJobPosting,
  getJobPostingById,
} from "./read";
import { updateJobPosting } from "./update";
import { restoreJobPosting, deleteJobPosting } from "./delete";

export const jobPostingRouter = createTRPCRouter({
  create: createJobPosting,
  read: readJobPostings,
  getById: getJobPostingById,
  readDeleted: readDeletedJobPosting,
  update: updateJobPosting,
  delete: deleteJobPosting,
  restore: restoreJobPosting,
});
