import { createTRPCRouter } from "@/server/api/trpc";
import { createLocation } from "./create";
import { readLocations, getLocationById, readDeletedLocations } from "./read";
import { updateLocation } from "./update";
import { deleteLocation, restoreLocation } from "./delete";

export const locationRouter = createTRPCRouter({
  create: createLocation,
  read: readLocations,
  getById: getLocationById,
  readDeleted: readDeletedLocations,
  update: updateLocation,
  delete: deleteLocation,
  restore: restoreLocation,
});
