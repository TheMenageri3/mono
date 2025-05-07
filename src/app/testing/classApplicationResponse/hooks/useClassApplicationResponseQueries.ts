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
        return api.classApplicationResponse.readById.useQuery(input);
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
