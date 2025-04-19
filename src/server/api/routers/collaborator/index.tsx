import { createTRPCRouter } from "@/server/api/trpc";
import { createProjectCollaborator } from "./create";
import {
    readProjectCollaborator,
    readDeletedProjectCollaborator,
    getProjectCollaboratorById,
    getProjectCollaboratorByProjectId,
    getProjectCollaboratorByUserId
} from "./read";
import { updateProjectCollaborator } from "./update";
import {
    deleteProjectCollaborator,
    restoreProjectCollaborator,
} from "./delete";

export const projectCollaboratorRouter = createTRPCRouter({
    create: createProjectCollaborator,
    read: readProjectCollaborator,
    readDeleted: readDeletedProjectCollaborator,
    getById: getProjectCollaboratorById,
    getByProjectId: getProjectCollaboratorByProjectId,
    getByUserId: getProjectCollaboratorByUserId,
    update: updateProjectCollaborator,
    delete: deleteProjectCollaborator,
    restore: restoreProjectCollaborator,
})