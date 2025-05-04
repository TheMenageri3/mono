import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";
import { createAssignmentSchema } from "@/schemas/assignment";
import { AssignmentStatus, AssignmentType, SubmissionType } from "@/generated/prisma";

export type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>;

const defaultValues: CreateAssignmentInput = {
  title: "",
  description: "",
  type: AssignmentType.INDIVIDUAL,
  status: AssignmentStatus.DRAFT,
  submissionType: SubmissionType.TEXT,
  submissionInstructions: "",
  classId: "",
  pointsPossible: undefined,
  gradingRubric: undefined,
  releaseDate: undefined,
  dueDate: undefined,
  allowLateSubmissions: false,
  latePenalty: undefined,
};

export function useAssignmentForm(onSuccess: () => void) {
  const utils = api.useUtils();

  const form = useForm<CreateAssignmentInput>({
    resolver: zodResolver(createAssignmentSchema),
    defaultValues,
  });

  const [gradingRubricInput, setGradingRubricInput] = useState("");
  const [latePenaltyInput, setLatePenaltyInput] = useState("");
  const [gradingRubricError, setGradingRubricError] = useState(false);
  const [latePenaltyError, setLatePenaltyError] = useState(false);

  const createMutation = api.assignment.create.useMutation({
    onSuccess: () => {
      utils.assignment.read.invalidate();
      showToast.success({ title: "Assignment Created" });
      form.reset();
      onSuccess();
    },
    onError: (error) => {
      showToast.error({ title: "Error", description: error.message });
    },
  });

  useEffect(() => {
    try {
      form.setValue("gradingRubric", JSON.parse(gradingRubricInput));
      setGradingRubricError(false);
    } catch {
      setGradingRubricError(true);
    }
  }, [gradingRubricInput]);

  useEffect(() => {
    try {
      form.setValue("latePenalty", JSON.parse(latePenaltyInput));
      setLatePenaltyError(false);
    } catch {
      setLatePenaltyError(true);
    }
  }, [latePenaltyInput]);

  return {
    form,
    createMutation,
    gradingRubricInput,
    latePenaltyInput,
    gradingRubricError,
    latePenaltyError,
    setGradingRubricInput,
    setLatePenaltyInput,
  };
}
