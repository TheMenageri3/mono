/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import toast from "react-hot-toast";
import CustomFormItem from "~/_components/final/CustomForm";
import {
  ApplyFrontendCourseFormData,
  frontendExperienceOptions,
} from "~/lib/validation";
import { Button } from "~/_components/final/ui/button";
import { Form, FormField } from "~/_components/final/ui/form";
import { Textarea } from "~/_components/final/ui/textarea";
import { Dropdown as _Dropdown } from "~/_components/final/forms/DropDown";
import { signIn, useSession } from "next-auth/react";

import CircularCheckboxList from "~/_components/final/forms/CheckBoxList";
import BubbleRating from "~/_components/final/forms/BubbleRating";
import { useWallet } from "@solana/wallet-adapter-react";
import { api } from "~/trpc/react";
import useScreen from "~/hooks/useScreen";

type ApplyFrontendCourseFormDataType = z.infer<
  typeof ApplyFrontendCourseFormData
>;

export function ApplyFrontendCourse() {
  const session = useSession();
  const { publicKey } = useWallet();
  const form = useForm<ApplyFrontendCourseFormDataType>({
    resolver: zodResolver(ApplyFrontendCourseFormData),
    defaultValues: {
      name: "",
      discord: "",
      wallet: "",
      experience: frontendExperienceOptions.map((option) => ({
        experience: option,
        level: 1,
      })),
      employed: false,
      support: false,
      agree: false,
    },
  });
  const screenWidth = useScreen();

  const createCourse = api.course.create.useMutation();
  const createCourseApplication = api.courseApplication.create.useMutation();

  useEffect(() => {
    if (!!session?.data?.user?.name && session.status === "authenticated") {
      form.setValue("name", session.data.user.name);
    }
  }, [session, form]);

  useEffect(() => {
    if (!!publicKey) {
      form.setValue("wallet", publicKey.toString());
    }
  }, [publicKey, form]);

  const handleSubmit = async (values: ApplyFrontendCourseFormDataType) => {
    console.log("hi2");
    try {
      toast.success("Application created successfully!");
      await createCourseApplication.mutateAsync({
        ...values,
        courseId: "cm3yznp0h00005ue6tivs1c6z",
      });
      console.log("Application created:", values);
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
            Turbin3 Front End Engineering Q1 2025
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
              name="wallet"
              render={({ field }) => (
                <CustomFormItem
                  label="Dev Net Wallet Address"
                  field={field}
                  disabled={!!publicKey}
                  placeholder="Enter your wallet address"
                  warning={`Please enter your Solana dev net wallet address. Your ability to securely manage the wallet address you submitted is a critical component of your application and future success in this program. This is not just a technicality; it's a fundamental requirement for anyone aspiring to work in the crypto space.- KEEP TRACK of IT`}
                />
              )}
              required
            />
          </div>

          {
            <div className="flex flex-col gap-4 pt-10">
              {frontendExperienceOptions.map((option, index) => (
                <BubbleRating
                  key={index}
                  label={option}
                  value={form.watch(`experience.${index}.level`)}
                  onChange={(value) => {
                    form.setValue(`experience.${index}.level`, value);
                  }}
                  includeHeader={index === 0}
                  headerValues={[
                    "None",
                    screenWidth === "sm" ? "" : "Some",
                    screenWidth === "sm" ? "" : "Shipped",
                    screenWidth === "sm" ? "" : "Regular Use",
                    screenWidth === "sm" ? "Pro" : "Total Pro",
                  ]}
                />
              ))}
            </div>
          }

          <FormField
            control={form.control}
            name="motivation"
            render={({ field }) => (
              <CustomFormItem
                label="Briefly Describe Your Motivation for Applying to this Program"
                field={field}
                placeholder="Enter why you want to join this cohort"
                InputComponent={Textarea}
                inputProps={{ rows: 6 }}
              />
            )}
            required
          />

          <CircularCheckboxList
            label="Are you currently employed by a Solana ecosystem team? *"
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ]}
            onSelect={(value) => {
              form.setValue("employed", value as boolean);
            }}
            selected={form.watch("employed")}
          />

          {form.watch("employed") && (
            <div className="space-y-4">
              <div className="relative grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="employer"
                  render={({ field }) => (
                    <CustomFormItem
                      label="Employer"
                      field={field}
                      placeholder="Enter your employer"
                    />
                  )}
                />
              </div>
              <CircularCheckboxList
                label="Do they support your participation in this program? *"
                options={[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ]}
                onSelect={(value) => {
                  form.setValue("support", value as boolean);
                }}
                selected={form.watch("support")}
              />
            </div>
          )}

          <CircularCheckboxList
            label="Confirm that you understand the time requirements of this program. *"
            warning="3 times a week live (remote) for 60 minutes a session.  Weekly deliverables.  You cannot do this through watching videos async nor can you join calls from your phone. "
            options={[
              { value: true, label: "I agree" },
              { value: false, label: "I do not agree" },
            ]}
            onSelect={(value) => {
              form.setValue("agree", value as boolean);
            }}
            selected={form.watch("agree")}
          />

          <Button
            type="submit"
            className="w-40 bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
            variant="default"
            disabled={form.formState.isSubmitting || !form.watch("agree")}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Create Profile"}
          </Button>
          <div className="absolute left-0 top-0">
            <p className="text-sm text-red-500">
              {form.formState.errors.agree?.message}
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
