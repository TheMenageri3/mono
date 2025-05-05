import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";
import { createAssignmentSubmissionSchema } from "@/schemas";
import { SubmissionStatus } from "@/generated/prisma";

export type CreateAssignmentSubmissionInput = z.infer<typeof createAssignmentSubmissionSchema>;

const defaultValues: CreateAssignmentSubmissionInput = {
  status: SubmissionStatus.DRAFT,
  submissionText: "",
  submissionUrl: "",
  submittedAt: undefined,
  gradedAt: undefined,
  score: undefined,
  feedback: "",
  gradedById: "",
  submitterId: "",
  assignmentId: "",
};

export function useAssignmentSubmissionForm(onSuccess: () => void) {
  const utils = api.useUtils();

  const form = useForm<CreateAssignmentSubmissionInput>({
    resolver: zodResolver(createAssignmentSubmissionSchema),
    defaultValues,
  });

  const createMutation = api.assignmentSubmission.create.useMutation({
    onSuccess: () => {
      utils.assignmentSubmission.read.invalidate();
      showToast.success({ title: "Submission Created" });
      form.reset();
      onSuccess();
    },
    onError: (error) => {
      showToast.error({ title: "Error", description: error.message });
    },
  });

  return {
    form,
    createMutation,
  };
}
