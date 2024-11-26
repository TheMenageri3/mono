import { createTRPCRouter } from "~/server/api/trpc";
import { createCourseApplication } from "./create";

export const courseApplicationRouter = createTRPCRouter({
  create: createCourseApplication,
});
