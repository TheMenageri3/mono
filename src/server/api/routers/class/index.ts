import { createTRPCRouter } from "@/server/api/trpc";
import { createClass } from "./create";
import {
  readClasses,
  readDeletedClasses,
  getClassById,
  getClassesByData,
} from "./read";
import { updateClass } from "./update";
import { deleteClass, restoreClass } from "./delete";

export const classRouter = createTRPCRouter({
  create: createClass,
  read: readClasses,
  readDeleted: readDeletedClasses,
  getById: getClassById,
  getByData: getClassesByData,
  update: updateClass,
  delete: deleteClass,
  restore: restoreClass,
});
