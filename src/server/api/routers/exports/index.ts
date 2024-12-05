import { createTRPCRouter } from "~/server/api/trpc";
import { exportApplications } from "./applications";

export const exportsRouter = createTRPCRouter({
  exportApplications: exportApplications,
});
