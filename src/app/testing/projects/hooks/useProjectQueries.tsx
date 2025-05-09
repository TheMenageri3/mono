import { api } from "@/trpc/react";
import { type z } from "zod";

import {
    readProjectsSchema,
    readDeletedProjectsSchema,
    getProjectByIdSchema,
    getProjectsByDataSchema,
} from "@/schemas";

type ReadProjectsInput = z.infer<typeof readProjectsSchema>;
type ReadDeletedProjectsInput = z.infer<typeof readDeletedProjectsSchema>;
type GetProjectByIdInput = z.infer<typeof getProjectByIdSchema>;
type GetProjectsByDataInput = z.infer<typeof getProjectsByDataSchema>;

export const useProjectQueries = () => {
    const useAllProjects = (
        input: ReadProjectsInput = { limit: 10, offset: 0 }
    ) => {
        return api.project.read.useQuery(input);
    };

    const useDeletedProjects = (
        input: ReadDeletedProjectsInput = { limit: 10, offset: 0 }
    ) => {
        return api.project.readDeleted.useQuery(input);
    };

    const useProjectById = (
        input: GetProjectByIdInput = { id: "" }
    ) => {
        return api.project.getById.useQuery(input);
    };

    const useProjectsByData = (
        input: GetProjectsByDataInput = {
            title: "",
            description: "",
            shortDescription: "",
            status: "IN_PROGRESS",
            visibility: "PUBLIC",
            githubUrl: "",
            demoUrl: "",
            outcome: "",
            challenges: "",
            isFeatured: false,
            startDatetime: new Date(),
            endDatetime: new Date(),
            limit: 10,
            offset: 0,
        }
    ) => {
        return api.project.getByData.useQuery(input);
    };

    return {
        useAllProjects,
        useDeletedProjects,
        useProjectById,
        useProjectsByData,
    };
};