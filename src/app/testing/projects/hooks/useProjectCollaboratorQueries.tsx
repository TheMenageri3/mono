import { api } from "@/trpc/react";
import { type z } from "zod";

import {
    readProjectCollaboratorSchema,
    readDeletedProjectCollaboratorSchema,
    getProjectCollaboratorByIdSchema,
    getProjectCollaboratorByProjectIdSchema,
    getProjectCollaboratorByUserIdSchema,
    getProjectCollaboratorByDataSchema,
} from "@/schemas";

type ReadProjectCollaboratorInput = z.infer<typeof readProjectCollaboratorSchema>;
type ReadDeletedProjectCollaboratorInput = z.infer<typeof readDeletedProjectCollaboratorSchema>;
type GetProjectCollaboratorByIdInput = z.infer<typeof getProjectCollaboratorByIdSchema>;
type GetProjectCollaboratorByProjectIdInput = z.infer<typeof getProjectCollaboratorByProjectIdSchema>;
type GetProjectCollaboratorByUserIdInput = z.infer<typeof getProjectCollaboratorByUserIdSchema>;
type GetProjectCollaboratorByDataInput = z.infer<typeof getProjectCollaboratorByDataSchema>;

export const useProjectCollaboratorQueries = () => {
    const useAllProjectColaborators = (
        input: ReadProjectCollaboratorInput = { limit: 10, offset: 0 }
    ) => {
        return api.projectCollaborator.read.useQuery(input);
    };

    const useDeletedProjectCollaborators = (
        input: ReadDeletedProjectCollaboratorInput = { limit: 10, offset: 0 }
    ) => {
        return api.projectCollaborator.readDeleted.useQuery(input);
    };

    const useProjectCollaboratorById = (
        input: GetProjectCollaboratorByIdInput = { id: "" }
    ) => {
        return api.projectCollaborator.getById.useQuery(input);
    };

    const useProjectCollaboratorByProjectId = (
        input: GetProjectCollaboratorByProjectIdInput = { projectId: "" }
    ) => {
        return api.projectCollaborator.getByProjectId.useQuery(input);
    };

    const useProjectCollaboratorByUserId = (
        input: GetProjectCollaboratorByUserIdInput = { userId: "" }
    ) => {
        return api.projectCollaborator.getByUserId.useQuery(input);
    }

    const useProjectCollaboratorByDataInput = (
        input: GetProjectCollaboratorByDataInput = { 
            role: "",
            contributions: "",
            userId: "",
            projectId: "",
            profileId: "",
         }
    ) => {
        return api.projectCollaborator.getByData.useQuery(input);
    };

    return {
        useAllProjectColaborators,
        useDeletedProjectCollaborators,
        useProjectCollaboratorById,
        useProjectCollaboratorByProjectId,
        useProjectCollaboratorByUserId,
        useProjectCollaboratorByDataInput,
    };
};