import { api, RouterInputs } from "@/trpc/react";

import type { z } from "zod";
import {
    getClassApplicationAnswerByIdSchema,
    getClassApplicationAnswerByQuestionIdSchema,
    getClassApplicationAnswersByClassApplicationQuestionIdSchema,
    getClassApplicationAnswersByClassApplicationResponseIdSchema,
    getClassApplicationAnswersSchema,
    getDeletedClassApplicationAnswersSchema,
} from "@/schemas";

// Type inference from schemas
type GetAllClassApplicationAnswersInput =
    RouterInputs["classApplicationAnswer"]["readAll"];
type GetClassApplicationAnswerByIdInput = z.infer<
    typeof getClassApplicationAnswerByIdSchema
>;
type GetClassApplicationAnswerByQuestionIdInput = z.infer<
    typeof getClassApplicationAnswerByQuestionIdSchema
>;
type GetClassApplicationAnswersByClassApplicationQuestionIdInput = z.infer<
    typeof getClassApplicationAnswersByClassApplicationQuestionIdSchema
>;
type GetClassApplicationAnswersByClassApplicationResponseIdInput = z.infer<
    typeof getClassApplicationAnswersByClassApplicationResponseIdSchema
>;
type GetDeletedClassApplicationAnswersInput = z.infer<
    typeof getDeletedClassApplicationAnswersSchema
>;

export const useClassApplicationAnswerQueries = () => {
    const useAllClassApplicationAnswers = (
        input: GetAllClassApplicationAnswersInput,
    ) => {
        return api.classApplicationAnswer.readAll.useQuery(input);
    };

    const useClassApplicationAnswerById = (
        input: GetClassApplicationAnswerByIdInput,
    ) => {
        const isValidId = typeof input.id === "string" &&
            input.id.trim() !== "";

        return api.classApplicationAnswer.readById.useQuery(
            { id: input.id },
            {
                enabled: isValidId,
            },
        );
    };

    const useClassApplicationAnswerByQuestionId = (
        input: GetClassApplicationAnswerByQuestionIdInput,
    ) => {
        return api.classApplicationAnswer.readByQuestionId.useQuery(input);
    };

    const useClassApplicationAnswersByClassApplicationQuestionId = (
        input: GetClassApplicationAnswersByClassApplicationQuestionIdInput,
    ) => {
        return api.classApplicationAnswer.readByClassApplicationQuestionId
            .useQuery(
                input,
            );
    };

    const useClassApplicationAnswersByClassApplicationResponseId = (
        input: GetClassApplicationAnswersByClassApplicationResponseIdInput,
    ) => {
        return api.classApplicationAnswer.readByClassApplicationResponseId
            .useQuery(
                input,
            );
    };

    const useDeletedClassApplicationAnswers = (
        input: GetDeletedClassApplicationAnswersInput,
    ) => {
        return api.classApplicationAnswer.readDeleted.useQuery(input);
    };

    return {
        useAllClassApplicationAnswers,
        useClassApplicationAnswerById,
        useClassApplicationAnswerByQuestionId,
        useClassApplicationAnswersByClassApplicationQuestionId,
        useClassApplicationAnswersByClassApplicationResponseId,
        useDeletedClassApplicationAnswers,
    };
};
