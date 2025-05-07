import { api, RouterInputs } from "@/trpc/react";

import type { z } from "zod";
import {
    getClassApplicationResponseByApplicantSchema,
    getClassApplicationResponseByIdSchema,
    getClassApplicationResponsesByClassApplicationSchema,
    getClassApplicationResponsesSchema,
} from "@/schemas";

// Type inference from schemas
type GetAllClassApplicationResponsesInput =
    RouterInputs["classApplicationResponse"]["readAll"];
type GetClassApplicationResponseByIdInput = z.infer<
    typeof getClassApplicationResponseByIdSchema
>;
type GetClassApplicationResponseByApplicantInput = z.infer<
    typeof getClassApplicationResponseByApplicantSchema
>;
type GetClassApplicationResponsesByClassApplicationInput = z.infer<
    typeof getClassApplicationResponsesByClassApplicationSchema
>;

export const useClassApplicationResponseQueries = () => {
    const useAllClassApplicationResponses = (
        input: GetAllClassApplicationResponsesInput,
    ) => {
        return api.classApplicationResponse.readAll.useQuery(input);
    };

    const useClassApplicationResponseById = (
        input: GetClassApplicationResponseByIdInput,
    ) => {
        const isValidId = typeof input.id === "string" &&
            input.id.trim() !== "";

        return api.classApplicationResponse.readById.useQuery(
            { id: input.id },
            {
                enabled: isValidId,
            },
        );
    };

    const useClassApplicationResponseByApplicant = (
        input: GetClassApplicationResponseByApplicantInput,
    ) => {
        return api.classApplicationResponse.readByApplicant.useQuery(input);
    };

    const useClassApplicationResponsesByClassApplication = (
        input: GetClassApplicationResponsesByClassApplicationInput,
    ) => {
        return api.classApplicationResponse.readByClassApplication.useQuery(
            input,
        );
    };

    return {
        useAllClassApplicationResponses,
        useClassApplicationResponseById,
        useClassApplicationResponseByApplicant,
        useClassApplicationResponsesByClassApplication,
    };
};
