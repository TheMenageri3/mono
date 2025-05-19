import { createTRPCRouter } from "@/server/api/trpc";
import { createVenueContactInfo } from "./create";
import {
  readVenueContactInfoById,
  readVenueContactInfos,
  readDeletedVenueContactInfos,
} from "./read";
import { updateVenueContactInfo } from "./update";
import { deleteVenueContactInfo, restoreVenueContactInfo } from "./delete";

export const venueContactInfoRouter = createTRPCRouter({
  create: createVenueContactInfo,
  read: readVenueContactInfos,
  readById: readVenueContactInfoById,
  readDeleted: readDeletedVenueContactInfos,
  update: updateVenueContactInfo,
  delete: deleteVenueContactInfo,
  restore: restoreVenueContactInfo,
});
