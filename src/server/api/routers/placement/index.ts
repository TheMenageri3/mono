import { createTRPCRouter } from "@/server/api/trpc";
import { createPlacement } from "./create";
import {
  readPlacements,
  readDeletedPlacements,
  getPlacementById,
  getPlacementByData,
} from "./read";
import { updatePlacement } from "./update";
import { deletePlacement, restorePlacement } from "./delete";

export const placementRouter = createTRPCRouter({
  create: createPlacement,
  read: readPlacements,
  readDeleted: readDeletedPlacements,
  getById: getPlacementById,
  getByData: getPlacementByData,
  update: updatePlacement,
  delete: deletePlacement,
  restore: restorePlacement,
});
