import { createTRPCRouter } from "~/server/api/trpc";
import { createCourse } from "./create";

export const courseRouter = createTRPCRouter({
  create: createCourse,
});
