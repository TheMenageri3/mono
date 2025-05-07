import { api, RouterInputs } from "@/trpc/react";

import type { z } from "zod";
import {
    readAllAnswersSchema,
    readAnswerByIdSchema,
    readDeletedAnswersSchema,
} from "@/schemas";

// Type inference from schemas
type ReadAllAnswersInput = RouterInputs["answer"]["readAll"];
type ReadAnswerByIdInput = z.infer<typeof readAnswerByIdSchema>;
type ReadDeletedAnswersInput = z.infer<typeof readDeletedAnswersSchema>;

export const useAnswerQueries = () => {
    const useAllAnswers = (
        input: ReadAllAnswersInput = { limit: 10, offset: 0 },
    ) => {
        return api.answer.readAll.useQuery(input);
    };

    const useAnswerById = (input: ReadAnswerByIdInput) => {
        // Validate the input ID
        const isValidId = typeof input.id === "string" &&
            input.id.trim() !== "";

        return api.answer.readById.useQuery(
            { id: input.id },
            {
                enabled: isValidId,
            },
        );
    };

    const useDeletedAnswers = (
        input: ReadDeletedAnswersInput = { limit: 10, offset: 0 },
    ) => {
        return api.answer.readDeleted.useQuery(input);
    };

    return {
        useAllAnswers,
        useAnswerById,
        useDeletedAnswers,
    };
};
