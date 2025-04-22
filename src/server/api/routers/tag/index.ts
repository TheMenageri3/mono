import { createTRPCRouter } from "@/server/api/trpc";
import { createTag } from "./create";
import { readTags, getTagByName, readDeletedTags } from "./read";
import { updateTag } from "./update";
import { deleteTag, restoreTag } from "./delete";

export const tagRouter = createTRPCRouter({
  create: createTag,
  read: readTags,
  getByName: getTagByName,
  readDeleted: readDeletedTags,
  update: updateTag,
  delete: deleteTag,
  restore: restoreTag,
});
