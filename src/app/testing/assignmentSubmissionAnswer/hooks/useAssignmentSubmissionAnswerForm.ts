import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";
import { createAssignmentSubmissionAnswerSchema } from "@/schemas";

export type CreateAnswerInput = z.infer<typeof createAssignmentSubmissionAnswerSchema>;

const defaultValues: CreateAnswerInput = {
  assignmentSubmissionId: "",
  questionId: "",
  assignmentQuestionId: "",
  value: {},
  submitterId: "",
  answerId: undefined,
  feedback: "",
  pointsAwarded: undefined,
};

export function useAssignmentSubmissionAnswerForm(onSuccess: () => void) {
  const utils = api.useUtils();

  const form = useForm<CreateAnswerInput>({
    resolver: zodResolver(createAssignmentSubmissionAnswerSchema),
    defaultValues,
  });

  const createMutation = api.assignmentSubmissionAnswer.create.useMutation({
    onSuccess: () => {
      utils.assignmentSubmissionAnswer.read.invalidate();
      showToast.success({ title: "Answer Created" });
      form.reset();
      onSuccess();
    },
    onError: (error) => {
      showToast.error({
        title: "Submission Failed",
        description: error.message,
      });
    },
  });

  return {
    form,
    createMutation,
  };
}
