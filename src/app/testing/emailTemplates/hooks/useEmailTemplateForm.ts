import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";
import { createEmailTemplateSchema } from "@/schemas/emailTemplates";
import { extractMustacheVariables } from "@/lib/mustacheUtils";

export type CreateEmailTemplateInput = z.infer<typeof createEmailTemplateSchema>;

const defaultValues: CreateEmailTemplateInput = {
  name: "",
  subject: "",
  html: "",
  variables: [],
};

export function useEmailTemplateForm(onSuccess: () => void) {
  const utils = api.useUtils();

  const form = useForm<CreateEmailTemplateInput>({
    resolver: zodResolver(createEmailTemplateSchema),
    defaultValues,
  });

  const createMutation = api.emailTemplate.create.useMutation({
    onSuccess: () => {
      utils.emailTemplate.read.invalidate();
      showToast.success({ title: "Email Template Created" });
      form.reset();
      onSuccess();
    },
    onError: (error) => {
      showToast.error({ title: "Error", description: error.message });
    },
  });

  const handleSubmit = (data: CreateEmailTemplateInput) => {
    const variables = extractMustacheVariables(data.html);
    createMutation.mutate({ ...data, variables });
  };

  return {
    form,
    createMutation,
    handleSubmit,
  };
}

