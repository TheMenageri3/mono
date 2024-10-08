/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { ProfileFormData } from "~/lib/validation";
import CustomFormItem from "../CustomForm";

import { Form, FormField } from "~/_components/final/ui/form";
import { Textarea } from "~/_components/ui/textarea";
import { Camera, Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/_components/ui/button";

type ProfileFormProps = {
  initialData: ProfileFormData & { isVerified: boolean; id: string };
};

export default function ProfileForm({ initialData }: ProfileFormProps) {
  // const [isEditing, setIsEditing] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileFormData>>({
    resolver: zodResolver(ProfileFormData),
    defaultValues: initialData,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: ProfileFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Profile created:", values);
      // setIsEditing(false);
      router.push(`/profile/${initialData.id}`);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto max-w-4xl space-y-6 rounded-lg bg-white p-6 pb-12 shadow md:p-20 md:pb-16 md:pt-6"
      >
        <div className="mb-6 flex flex-col items-center">
          <div
            className="group relative mb-2 flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200"
            onClick={() => fileInputRef.current?.click()}
          >
            {form.watch("profileImage") ? (
              <img
                src={(() => {
                  const profileImage = form.watch("profileImage");
                  if (
                    profileImage &&
                    typeof profileImage === "object" &&
                    "name" in profileImage
                  ) {
                    return URL.createObjectURL(profileImage);
                  } else if (typeof profileImage === "string") {
                    return profileImage;
                  }
                })()}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <Camera size={32} className="text-gray-400" />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
              <Upload size={24} className="text-white" />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/png, image/jpeg"
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <CustomFormItem
                label="Name"
                field={field}
                placeholder="Joe Bloggs"
              />
            )}
            required
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <CustomFormItem
                label="Email"
                field={field}
                placeholder="Enter your email"
              />
            )}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <CustomFormItem
                label="Organization"
                field={field}
                placeholder="Enter your organization"
              />
            )}
          />
          <FormField
            control={form.control}
            name="socialLinks"
            render={({ field }) => (
              <CustomFormItem
                label="Twitter/X/Facebook/LinkedIn/Github"
                field={field}
                placeholder="Enter your social link"
              />
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <CustomFormItem
              label="Bio"
              field={field}
              placeholder="Exploring the intersection of cryptography and..."
              InputComponent={Textarea}
              inputProps={{ rows: 6 }}
            />
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-40 bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Profile"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
