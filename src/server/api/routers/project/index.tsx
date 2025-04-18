import { createTRPCRouter } from "@/server/api/trpc";
import { createProject } from "./create";
import {
    readProjects,
    readDeletedProjects,
    getProjectById,
    getProjectByData,
} from "./read";
import { updateProject } from "./update";
import { deleteProject, restoreProject } from "./delete";

export const projectRouter = createTRPCRouter({
    create: createProject,
    read: readProjects,
    readDeleted: readDeletedProjects,
    getById: getProjectById,
    getByData: getProjectByData,
    update: updateProject,
    delete: deleteProject,
    restore: restoreProject,
});