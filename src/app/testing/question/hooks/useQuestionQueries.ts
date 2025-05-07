import { api, RouterInputs } from "@/trpc/react";

import type { z } from "zod";
import {
    readAllActiveQuestionsSchema,
    readDeletedQuestionsSchema,
    readQuestionByIdSchema,
} from "@/schemas";

// Type inference from schemas
type ReadAllActiveQuestionsInput = RouterInputs["question"]["readAll"];
type ReadQuestionByIdInput = z.infer<typeof readQuestionByIdSchema>;
type ReadDeletedQuestionsInput = z.infer<typeof readDeletedQuestionsSchema>;

export const useQuestionQueries = () => {
    const useAllActiveQuestions = (
        input: ReadAllActiveQuestionsInput = { limit: 10, offset: 0 },
    ) => {
        return api.question.readAll.useQuery(input);
    };

    const useQuestionById = (input: ReadQuestionByIdInput) => {
        const isValidId = typeof input.id === "string" &&
            input.id.trim() !== "";

        return api.question.readById.useQuery(
            { id: input.id },
            {
                enabled: isValidId,
            },
        );
    };

    const useDeletedQuestions = (
        input: ReadDeletedQuestionsInput = { limit: 10, offset: 0 },
    ) => {
        return api.question.readDeleted.useQuery(input);
    };

    return {
        useAllActiveQuestions,
        useQuestionById,
        useDeletedQuestions,
    };
};
