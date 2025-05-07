import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createIndustrySchema, updateIndustrySchema } from "@/schemas/industry";

// Form schema (lighter, unified schema for UI purposes)
const formIndustrySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  parentIndustryId: z.string().optional(), // can be "" or actual ID
});

type FormValues = z.infer<typeof formIndustrySchema>;

type IndustryFormProps = {
  initialData?: z.infer<typeof updateIndustrySchema>;
  onSubmit: (
    values:
      | z.infer<typeof createIndustrySchema>
      | z.infer<typeof updateIndustrySchema>
  ) => void;
};

export const IndustryForm = ({ initialData, onSubmit }: IndustryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formIndustrySchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      parentIndustryId: initialData?.parentIndustryId ?? "",
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    const transformed = {
      ...values,
      parentIndustryId: values.parentIndustryId?.trim() || undefined,
    };

    if (initialData) {
      onSubmit({ ...transformed, id: initialData.id });
    } else {
      onSubmit(transformed);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label>Name</label>
        <input {...register("name")} className="input" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label>Description</label>
        <input {...register("description")} className="input" />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label>Parent Industry ID</label>
        <input {...register("parentIndustryId")} className="input" />
        {errors.parentIndustryId && (
          <p className="text-red-500">{errors.parentIndustryId.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        {initialData ? "Update" : "Create"} Industry
      </button>
    </form>
  );
};
