import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";
import { createEnrollemntSchema } from "@/schemas/enrollment";
import { EnrollmentStatus } from "@/generated/prisma";

export type CreateEnrollmentInput = z.infer<typeof createEnrollemntSchema>;

const defaultValues: CreateEnrollmentInput = {
  status: EnrollmentStatus.ENROLLED,
  enrollmentDate: undefined,
  completionDate: undefined,
  finalGrade: undefined,
  studentId: "",
  classId: "",
};

export function useEnrollmentForm(onSuccess: () => void) {
  const utils = api.useUtils();

  const form = useForm<CreateEnrollmentInput>({
    resolver: zodResolver(createEnrollemntSchema),
    defaultValues,
  });

  const createMutation = api.enrollment.create.useMutation({
    onSuccess: () => {
      utils.enrollment.read.invalidate();
      showToast.success({ title: "Enrollment Created" });
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
