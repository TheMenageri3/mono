import { createTRPCRouter } from "@/server/api/trpc";
import { createClassroom } from "./create";
import {
  readClassrooms,
  readDeletedClassrooms,
  getClassroomById,
  getClassroomByData,
} from "./read";
import { updateClassroom } from "./update";
import { deleteClassroom, restoreClassroom } from "./delete";

export const classroomRouter = createTRPCRouter({
  create: createClassroom,
  read: readClassrooms,
  readDeleted: readDeletedClassrooms,
  getById: getClassroomById,
  getByData: getClassroomByData,
  update: updateClassroom,
  delete: deleteClassroom,
  restore: restoreClassroom,
});
