/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import toast from "react-hot-toast";
import CustomFormItem from "~/_components/final/CustomForm";
import { ApplyBuildersCourseFormData } from "~/lib/validation";
import { Button } from "~/_components/final/ui/button";
import { Form, FormField } from "~/_components/final/ui/form";
import { Textarea } from "~/_components/final/ui/textarea";

import { Dropdown as _Dropdown } from "~/_components/final/forms/DropDown";

type ApplyBuildersCourseFormDataType = z.infer<
  typeof ApplyBuildersCourseFormData
>;

const Dropdown = ({
  label,
  form,
  getLabel,
  formKey,
  values,
  multiSelect = false,
}: {
  form: UseFormReturn<ApplyBuildersCourseFormDataType>;
  getLabel: () => string;
  formKey: keyof ApplyBuildersCourseFormDataType;
  values: string[];
  multiSelect?: boolean;
  label?: string;
}) => {
  return (
    <_Dropdown
      form={form}
      getLabel={getLabel}
      formKey={formKey}
      values={values}
      multiSelect={multiSelect}
      label={label}
    />
  );
};

export function ApplyBuildersCourse() {
  const form = useForm<ApplyBuildersCourseFormDataType>({
    resolver: zodResolver(ApplyBuildersCourseFormData),
    defaultValues: {
      name: "",
      email: "",
      discord: "",
      github: "",
      city: "",
      country: "",
      timezone: "",
      start: null,
      course: null,
      interests: null,
      jsExperience: null,
      rustExperience: null,
      cExperience: null,
      relevantCourses: "",
      operatingSystem: null,
      commitment: null,
      editor: null,
      IDE: null,
      intent: "",
      priorClasses: [],
      initials: "",
    },
  });

  const handleSubmit = async (values: ApplyBuildersCourseFormDataType) => {
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
          <div className="flex h-[200px] w-full items-center justify-center rounded-lg bg-black px-8">
            <div className="relative flex h-[200px] w-[1200px] items-center justify-center">
              <Image src={"/turbine-logo-text.svg"} layout="fill" alt="logo" />
            </div>
          </div>

          <div className="text-center text-4xl font-semibold">
            Turbin3 Builders Course Q1 2025
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
            label="Where did you get your start in Web 3? *"
            getLabel={() =>
              `${!!form.watch("start") ? `${form.watch("start")}` : "Select"}`
            }
            formKey="start"
            values={ApplyBuildersCourseFormData.shape.start.options}
          />
          <Dropdown
            form={form}
            label="Please Select Cohort you are applying for *"
            getLabel={() =>
              `${!!form.watch("course") ? `${form.watch("course")}` : "Select"}`
            }
            formKey="course"
            values={ApplyBuildersCourseFormData.shape.course.options}
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
            label="Interests *"
            getLabel={() =>
              `${!!form.watch("interests") ? `${form.watch("interests")}` : "Select"}`
            }
            formKey="interests"
            values={ApplyBuildersCourseFormData.shape.interests.options}
          />
          <Dropdown
            form={form}
            label="Javascript Experience *"
            getLabel={() =>
              `${!!form.watch("jsExperience") ? `${form.watch("jsExperience")}` : "Select"}`
            }
            formKey="jsExperience"
            values={ApplyBuildersCourseFormData.shape.jsExperience.options}
          />
          <Dropdown
            form={form}
            label="Rust Experience *"
            getLabel={() =>
              `${!!form.watch("rustExperience") ? `${form.watch("rustExperience")}` : "Select"}`
            }
            formKey="rustExperience"
            values={ApplyBuildersCourseFormData.shape.rustExperience.options}
          />
          <Dropdown
            form={form}
            label="C/C++ Experience *"
            getLabel={() =>
              `${!!form.watch("cExperience") ? `${form.watch("cExperience")}` : "Select"}`
            }
            formKey="cExperience"
            values={ApplyBuildersCourseFormData.shape.cExperience.options}
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
            label="Commitment (Note the course requires minimum of 20 hrs/week) *"
            getLabel={() =>
              `${!!form.watch("commitment") ? `${form.watch("commitment")}` : "Select"}`
            }
            formKey="commitment"
            values={ApplyBuildersCourseFormData.shape.commitment.options}
          />

          <Dropdown
            form={form}
            label="Editor *"
            getLabel={() =>
              `${!!form.watch("editor") ? `${form.watch("editor")}` : "Select"}`
            }
            formKey="editor"
            values={ApplyBuildersCourseFormData.shape.editor.options}
          />

          <Dropdown
            form={form}
            label="IDE *"
            getLabel={() =>
              `${!!form.watch("IDE") ? `${form.watch("IDE")}` : "Select"}`
            }
            formKey="IDE"
            values={ApplyBuildersCourseFormData.shape.IDE.options}
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
            label="Prior Classes *"
            getLabel={() =>
              `${!!form.watch("priorClasses") && form.watch("priorClasses").length > 0 ? `${form.watch("priorClasses").join(", ")}` : "Select"}`
            }
            formKey="priorClasses"
            values={
              ApplyBuildersCourseFormData.shape.priorClasses.element.options
            }
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
