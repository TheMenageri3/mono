import { createTRPCRouter } from "@/server/api/trpc";
import { createMedia } from "./create";
import { readMedias, getMediaById, readDeletedMedias } from "./read";
import { updateMedia } from "./update";
import { deleteMedia, restoreMedia } from "./delete";

export const mediaRouter = createTRPCRouter({
  create: createMedia,
  read: readMedias,
  getById: getMediaById,
  readDeleted: readDeletedMedias,
  update: updateMedia,
  delete: deleteMedia,
  restore: restoreMedia,
});
