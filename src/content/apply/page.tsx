/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import toast from "react-hot-toast";
import CustomFormItem from "~/_components/final/CustomForm";
import {
  ApplyFormData,
  PaperFormData,
  ProfileFormData,
} from "~/lib/validation";
import { Button } from "~/_components/final/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/_components/final/ui/form";
import { Textarea } from "~/_components/final/ui/textarea";
import { Camera, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/_components/ui/dropdown-menu";
import clsx from "clsx";
import { api } from "~/trpc/react";
import { CompanyRole, UniversityRole } from "@prisma/client";
import { Input } from "~/_components/final/ui/input";

type ApplyFormDataType = z.infer<typeof ApplyFormData>;

const Dropdown = ({
  form,
  getLabel,
  formKey,
  values,
  multiSelect = false,
}: {
  form: UseFormReturn<ApplyFormDataType>;
  getLabel: () => string;
  formKey: keyof ApplyFormDataType;
  values: string[];
  multiSelect?: boolean;
}) => {
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full min-w-64 items-center justify-between rounded-md border border-zinc-200 p-2 focus:outline-none">
            <div className="text-sm">{getLabel()}</div>
            <div>
              <ChevronDown className="h-4 w-4" />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="flex w-full min-w-64 flex-col gap-2 border border-gray-900 bg-white p-2"
          align="start"
        >
          {values.map((value) => (
            <DropdownMenuItem
              key={value}
              className={clsx(
                "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                form.watch(formKey) === value && "bg-gray-200",
              )}
              onClick={() => {
                if (multiSelect) {
                  // @ts-expect-error: we know it's an array
                  const containsValue = form.watch(formKey).includes(value);
                  if (containsValue) {
                    form.setValue(
                      formKey,
                      // @ts-expect-error: we know it's an array

                      form.watch(formKey).filter((v) => v !== value),
                    );
                  } else {
                    // @ts-expect-error: we know it's an array
                    form.setValue(formKey, [...form.watch(formKey), value]);
                  }
                } else {
                  form.setValue(formKey, value);
                }
              }}
            >
              {value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export function Apply() {
  const [showPriorClasses, setShowPriorClasses] = useState<boolean>(false);
  const form = useForm<ApplyFormDataType>({
    resolver: zodResolver(ApplyFormData),
    defaultValues: {
      name: "",
      email: "",
      discord: "",
      github: "",
      city: "",
      country: "",
      timezone: "",
      start: "Hackathon",
      course: "Solana Q1 2025 Builders",
      interests: "Defi",
      jsExperience: "Jr Dev Capacity",
      rustExperience: "None",
      cExperience: "None",
      relevantCourses: "",
      operatingSystem: "Linux",
      commitment: "10-20 hours/week",
      editor: "VsCode",
      IDE: "VSCode",
      intent: "",
      priorClasses: [],
      initials: "",
    },
  });

  const handleSubmit = async (values: ApplyFormDataType) => {
    try {
      toast.success("Profile created successfully!");
      console.log("User created:", values);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative inset-0 flex w-full items-center justify-center md:w-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mx-auto space-y-6 overflow-scroll rounded-lg bg-white p-6 pb-12 md:max-w-4xl md:p-20 md:pb-16 md:pt-6 lg:w-[900px] lg:shadow"
        >
          <div className="flex h-[200px] w-full items-center justify-center">
            <div className="relative flex h-[200px] w-[200px] items-center justify-center">
              <Image src={"/logo.svg"} layout="fill" alt="logo" />
            </div>
          </div>
          {/* <Dropdown
            form={form}
            getLabel={() => `Who are you? (${form.watch("type")})`}
            key="type"
            values={["Student", "Developer", "Company"]}
          /> */}
          {/* Textarea */}
          {/* 
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
          /> */}
          {/* Input */}
          {/* <div className="relative grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <CustomFormItem
                  label="Name"
                  field={field}
                  placeholder="Enter your name"
                />
              )}
              required
            />
          </div> */}
          <div className="relative grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <CustomFormItem
                  label="Name"
                  field={field}
                  placeholder="Enter your name"
                />
              )}
              required
            />
          </div>
          <div className="relative grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <CustomFormItem
                  label="Email Address"
                  field={field}
                  placeholder="Enter your email address"
                />
              )}
              required
            />
          </div>
          <div className="relative grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="discord"
              render={({ field }) => (
                <CustomFormItem
                  label="Discord Username"
                  field={field}
                  placeholder="Enter your discord username"
                />
              )}
              required
            />
          </div>
          <div className="relative grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <CustomFormItem
                  label="Github Username"
                  field={field}
                  placeholder="Enter your github username"
                />
              )}
              required
            />
          </div>
          <div className="relative grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <CustomFormItem
                  label="City"
                  field={field}
                  placeholder="Enter your city"
                />
              )}
              required
            />
          </div>
          <div className="relative grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <CustomFormItem
                  label="Country"
                  field={field}
                  placeholder="Enter your country"
                />
              )}
              required
            />
          </div>
          <div className="relative grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <CustomFormItem
                  label="Timezone"
                  field={field}
                  placeholder="Enter your timezone"
                />
              )}
              required
            />
          </div>
          <Dropdown
            form={form}
            getLabel={() =>
              `Where did you get your start in Web 3? ${
                !!form.watch("start") ? `(${form.watch("start")})` : ""
              }`
            }
            formKey="start"
            values={ApplyFormData.shape.start.options}
          />
          <Dropdown
            form={form}
            getLabel={() =>
              `Please Select Cohort you are applying for ${
                !!form.watch("course") ? `(${form.watch("course")})` : ""
              }`
            }
            formKey="course"
            values={ApplyFormData.shape.course.options}
          />

          <FormField
            control={form.control}
            name="why"
            render={({ field }) => (
              <CustomFormItem
                label="Why Turbin3?"
                field={field}
                placeholder="Enter why you want to join this cohort"
                InputComponent={Textarea}
                inputProps={{ rows: 6 }}
              />
            )}
            required
          />
          <Dropdown
            form={form}
            getLabel={() =>
              `Interests ${
                !!form.watch("interests") ? `(${form.watch("interests")})` : ""
              }`
            }
            formKey="interests"
            values={ApplyFormData.shape.interests.options}
          />
          <Dropdown
            form={form}
            getLabel={() =>
              `Javascript Experience ${
                !!form.watch("jsExperience")
                  ? `(${form.watch("jsExperience")})`
                  : ""
              }`
            }
            formKey="jsExperience"
            values={ApplyFormData.shape.jsExperience.options}
          />
          <Dropdown
            form={form}
            getLabel={() =>
              `Rust Experience ${
                !!form.watch("rustExperience")
                  ? `(${form.watch("rustExperience")})`
                  : ""
              }`
            }
            formKey="rustExperience"
            values={ApplyFormData.shape.rustExperience.options}
          />
          <Dropdown
            form={form}
            getLabel={() =>
              `C/C++ Experience ${
                !!form.watch("cExperience")
                  ? `(${form.watch("cExperience")})`
                  : ""
              }`
            }
            formKey="cExperience"
            values={ApplyFormData.shape.cExperience.options}
          />

          <FormField
            control={form.control}
            name="relevantCourses"
            render={({ field }) => (
              <CustomFormItem
                label="Relevant Courses"
                field={field}
                placeholder="Enter relevant courses"
                InputComponent={Textarea}
                inputProps={{ rows: 6 }}
              />
            )}
            required
          />

          <div className="relative grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="operatingSystem"
              render={({ field }) => (
                <CustomFormItem
                  label="Operating System"
                  field={field}
                  placeholder="Enter your operating system"
                />
              )}
              required
            />
          </div>

          <Dropdown
            form={form}
            getLabel={() =>
              `Commitment (Note the course requires minimum of 20 hrs/week) ${
                !!form.watch("commitment")
                  ? `(${form.watch("commitment")})`
                  : ""
              }`
            }
            formKey="commitment"
            values={ApplyFormData.shape.commitment.options}
          />

          <Dropdown
            form={form}
            getLabel={() =>
              `Editor ${!!form.watch("editor") ? `(${form.watch("editor")})` : ""}`
            }
            formKey="editor"
            values={ApplyFormData.shape.editor.options}
          />

          <Dropdown
            form={form}
            getLabel={() =>
              `IDE ${!!form.watch("IDE") ? `(${form.watch("IDE")})` : ""}`
            }
            formKey="IDE"
            values={ApplyFormData.shape.IDE.options}
          />

          <FormField
            control={form.control}
            name="intent"
            render={({ field }) => (
              <CustomFormItem
                label="In 200 words or less, why do you want to participate in this Turbin3 program?"
                field={field}
                placeholder="Enter your intent"
                InputComponent={Textarea}
                inputProps={{ rows: 6 }}
              />
            )}
            required
          />

          <div className="relative grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="wallet"
              render={({ field }) => (
                <CustomFormItem
                  label="Dev Net Wallet Address"
                  field={field}
                  placeholder="Enter your wallet address"
                  warning={`Please enter your Solana dev net wallet address. Your ability to securely manage the wallet address you submitted is a critical component of your application and future success in this program. This is not just a technicality; it's a fundamental requirement for anyone aspiring to work in the crypto space.- KEEP TRACK of IT`}
                />
              )}
              required
            />
          </div>

          <Dropdown
            form={form}
            getLabel={() =>
              `Prior Classes ${
                !!form.watch("priorClasses")
                  ? `(${form.watch("priorClasses").join(", ")})`
                  : ""
              }`
            }
            formKey="priorClasses"
            values={ApplyFormData.shape.priorClasses.element.options}
            multiSelect
          />

          <div className="relative grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="initials"
              render={({ field }) => (
                <CustomFormItem
                  label="By Submitting this Application, you confirm that you understand the following: "
                  field={field}
                  placeholder="Enter your initials"
                  warning={`1. This is a live program and attendance is required every session. 
2. After two (2) absences, participant status will be in review. 
3. Three (3) absences is grounds for deferral to a future cohort. 
4. You have saved the devnet wallet used to apply. 
5. Deliverables are expected to be submitted on time. Including
-Prerequisite Assessments
-Letter of Intent for Capstones
-User Story
-Architectural Diagram 
-Weekly github pushes with the week’s code. 
6. Joining from a phone is not allowed. 
Initial Below`}
                />
              )}
              required
            />
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
