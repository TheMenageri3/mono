/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import CustomFormItem from "~/_components/final/CustomForm";
import { PaperFormData, ProfileFormData } from "~/lib/validation";
import { Button } from "~/_components/final/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/_components/final/ui/form";
import { Textarea } from "~/_components/final/ui/textarea";
import { Camera, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/_components/ui/dropdown-menu";
import clsx from "clsx";

type ProfileFormDataType = z.infer<typeof ProfileFormData>;

export function CreateProfile() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormDataType>({
    resolver: zodResolver(ProfileFormData),
    defaultValues: {
      username: "",
      type: "Student",
      bio: "",
      organization: "",
      profileImage: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        form.setValue("profileImage", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: ProfileFormDataType) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Paper created:", values);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex w-screen flex-col items-center justify-center bg-[#FAC569]">
      <div className="hidden lg:block">
        <Image src={"/backdrop.svg"} layout="fill" alt="logo" />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mx-auto max-w-4xl space-y-6 rounded-lg bg-[#FAC569] p-6 pb-12 md:p-20 md:pb-16 md:pt-6 lg:bg-white lg:shadow"
        >
          <div className="flex h-[200px] w-[200px] items-center justify-center">
            <div className="relative flex h-[200px] w-[200px] items-center justify-center">
              <Image src={"/logo.svg"} layout="fill" alt="logo" />
            </div>
          </div>
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  {`Who are you? (${form.watch("type")})`}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="flex w-64 flex-col gap-2 border border-gray-900 bg-[#FAC569] p-2 lg:bg-white"
                align="start"
              >
                <DropdownMenuItem
                  className={clsx(
                    "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                    form.watch("type") === "Student" &&
                      "bg-[#924428] lg:bg-gray-200",
                  )}
                  onClick={() => form.setValue("type", "Student")}
                >
                  Student
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={clsx(
                    "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                    form.watch("type") === "Developer" &&
                      "bg-[#924428] lg:bg-gray-200",
                  )}
                  onClick={() => form.setValue("type", "Developer")}
                >
                  Developer
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={clsx(
                    "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                    form.watch("type") === "Company" &&
                      "bg-[#924428] lg:bg-gray-200",
                  )}
                  onClick={() => form.setValue("type", "Company")}
                >
                  Company
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <CustomFormItem
                  label="Username"
                  field={field}
                  placeholder="Enter your username"
                />
              )}
              required
            />
            {form.watch("type") === "Student" && (
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <CustomFormItem
                    label="University"
                    field={field}
                    placeholder="University of Maryland"
                  />
                )}
                required
              />
            )}

            {form.watch("type") === "Company" && (
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <CustomFormItem
                    label="Company"
                    field={field}
                    placeholder="Solana Foundation"
                  />
                )}
                required
              />
            )}

            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <CustomFormItem
                  label="Interests (comma-separated)"
                  field={field}
                  placeholder="Cryptography, Blockchain"
                />
              )}
              required
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <CustomFormItem
                label="Bio"
                field={field}
                placeholder="Enter bio"
                InputComponent={Textarea}
                inputProps={{ rows: 10 }}
              />
            )}
            required
          />

          {/* Image and PDF Upload */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-700">
                Profile Image (Optional)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`flex h-28 w-28 cursor-pointer items-center justify-center rounded-md transition-colors ${
                  form.watch("profileImage")
                    ? ""
                    : "border-2 border-dashed border-[#924428] hover:border-gray-400 lg:border-gray-300"
                }`}
              >
                {form.watch("profileImage") ? (
                  <img
                    src={form.watch("profileImage")}
                    alt="Paper"
                    className="h-full w-full rounded-md object-cover"
                  />
                ) : (
                  <Camera className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/png"
                className="hidden"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-40 bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
            variant="default"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Create Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
