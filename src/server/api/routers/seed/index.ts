import { createTRPCRouter } from "@/server/api/trpc";
import { seed, checkEmptyTables } from "./seed";
export const seedRouter = createTRPCRouter({
  seed: seed,
  checkEmptyTables: checkEmptyTables,
});
