import { createTRPCRouter } from "~/server/api/trpc";
import { createUser } from "./create";

export const userRouter = createTRPCRouter({
  create: createUser,
});
