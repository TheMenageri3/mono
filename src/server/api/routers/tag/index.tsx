import { createTRPCRouter } from "@/server/api/trpc";
import { createTag } from "./create";
import { readTags, getTagById, readDeletedTags } from "./read";
import { updateTag } from "./update";
import { deleteTag, restoreTag } from "./delete";

export const tagRouter = createTRPCRouter({
  create: createTag,
  read: readTags,
  getById: getTagById,
  readDeleted: readDeletedTags,
  update: updateTag,
  delete: deleteTag,
  restore: restoreTag,
});
