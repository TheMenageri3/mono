import { createTRPCRouter } from "@/server/api/trpc";
import { seed } from "./seed";

export const seedRouter = createTRPCRouter({
  seed: seed,
});
