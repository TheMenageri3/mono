import { api } from "@/trpc/react";
import type { z } from "zod";
import {
    readAllActiveQuestionsSchema,
    readDeletedQuestionsSchema,
    readQuestionByIdSchema,
} from "@/schemas/question";

// Type inference from schemas
type ReadQuestionByIdInput = z.infer<typeof readQuestionByIdSchema>;
type ReadAllActiveQuestionsInput = z.infer<typeof readAllActiveQuestionsSchema>;
type ReadDeletedQuestionsInput = z.infer<typeof readDeletedQuestionsSchema>;

export const useQuestionQueries = () => {
    const useAllQuestions = (
        input: ReadAllActiveQuestionsInput = { limit: 10, offset: 0 },
    ) => {
        return api.question.readAll.useQuery(input);
    };

    const useQuestionById = (input: ReadQuestionByIdInput) => {
        return api.question.readById.useQuery(input);
    };

    const useDeletedQuestions = (
        input: ReadDeletedQuestionsInput = { limit: 10, offset: 0 },
    ) => {
        return api.question.readDeleted.useQuery(input);
    };

    return {
        useAllQuestions,
        useQuestionById,
        useDeletedQuestions,
    };
};
