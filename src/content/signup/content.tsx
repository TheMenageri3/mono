/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import toast from "react-hot-toast";
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
import { api } from "~/trpc/react";
import { CompanyRole, UniversityRole } from "@prisma/client";
import { Input } from "~/_components/final/ui/input";
import { toTitleCase } from "~/lib/utils";

type ProfileFormDataType = z.infer<typeof ProfileFormData>;

export function CreateProfile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createUser = api.user.create.useMutation({});
  const [universitySelected, setUniversitySelected] = useState<boolean>(false);
  const [profileCreated, setProfileCreated] = useState<boolean>(false);
  const [companySelected, setCompanySelected] = useState<boolean>(false);
  const form = useForm<ProfileFormDataType>({
    resolver: zodResolver(ProfileFormData),
    defaultValues: {
      // username: "",
      type: "Student",
      // bio: "",
      // company: "",
      // companyRole: "INDIVIDUAL_CONTRIBUTOR",
      university: "",
      universityRole: "UNDERGRADUATE",
      graduated: false,
      // profileImage: "",
      // currentInterest: "",
      // interests: [],
    },
  });

  const { data: universitySearchResults, status: universitySearchStatus } =
    api.university.search.useQuery(
      { query: form.watch("university") },
      {
        enabled: !!form.watch("university"),
      },
    );

  // const { data: companySearchResults, status: companySearchStatus } =
  //   api.company.search.useQuery(
  //     { query: form.watch("company") },
  //     {
  //       enabled: !!form.watch("company"),
  //     },
  //   );

  // const { data: interestsSearchResults, status: interestsSearchStatus } =
  //   api.interests.search.useQuery(
  //     { query: form.watch("currentInterest") },
  //     {
  //       enabled: !!form.watch("currentInterest"),
  //     },
  //   );

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () =>
  //       form.setValue("profileImage", reader.result as string);
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (values: ProfileFormDataType) => {
    try {
      await createUser.mutateAsync({
        ...values,
      });
      toast.success("Profile created successfully!");
      setProfileCreated(true);
      console.log("User created:", values);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (profileCreated) {
    return (
      <div className="mx-auto max-h-[90vh] w-full space-y-6 overflow-scroll rounded-lg bg-white p-6 pb-12 md:max-w-4xl md:p-20 md:pb-16 md:pt-6 lg:max-w-[1200px] lg:shadow">
        <div className="flex h-[200px] w-full items-center justify-center">
          <div className="relative flex h-[200px] w-[200px] items-center justify-center">
            <Image src={"/logo.svg"} layout="fill" alt="logo" />
          </div>
        </div>
        <div>Profile created successfully!</div>
      </div>
    );
  }

  return (
    <div className="relative inset-0 flex w-full items-center justify-center md:w-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mx-auto max-h-[90vh] w-full space-y-6 overflow-scroll rounded-lg bg-white p-6 pb-12 md:max-w-4xl md:p-20 md:pb-16 md:pt-6 lg:max-w-[1200px] lg:shadow"
        >
          <div className="flex h-[200px] w-full items-center justify-center">
            <div className="relative flex h-[200px] w-[200px] items-center justify-center">
              <Image src={"/logo.svg"} layout="fill" alt="logo" />
            </div>
          </div>
          {/* <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  {`Who are you? (${form.watch("type")})`}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="flex w-64 flex-col gap-2 border border-gray-900 bg-white p-2"
                align="start"
              >
                <DropdownMenuItem
                  className={clsx(
                    "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                    form.watch("type") === "Student" && "bg-gray-200",
                  )}
                  onClick={() => form.setValue("type", "Student")}
                >
                  Student
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={clsx(
                    "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                    form.watch("type") === "Developer" && "bg-gray-200",
                  )}
                  onClick={() => form.setValue("type", "Developer")}
                >
                  Developer
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={clsx(
                    "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                    form.watch("type") === "Company" && "bg-gray-200",
                  )}
                  onClick={() => form.setValue("type", "Company")}
                >
                  Company
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}

          <div className="relative grid grid-cols-1 gap-4">
            {/* <FormField
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
            /> */}

            <div className="relative">
              {universitySelected && (
                <div>
                  <div className="pb-2 text-xs font-semibold text-zinc-700">
                    University *
                  </div>
                  <div className="flex justify-between gap-2">
                    <div>{form.watch("university")}</div>
                    <button
                      onClick={() => setUniversitySelected(false)}
                      className="text-red-500"
                    >
                      X
                    </button>
                  </div>
                </div>
              )}
              {!universitySelected && (
                <>
                  <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                      <CustomFormItem
                        label="University"
                        field={field}
                        placeholder="University of Southern California"
                      />
                    )}
                    // required
                  />
                  {form.watch("university") && (
                    <div className="absolute left-0 top-[4.5rem] z-10 flex w-full flex-col gap-2 rounded-lg border border-gray-900 bg-white p-2">
                      {universitySearchStatus === "pending" && (
                        <div>Loading...</div>
                      )}
                      {universitySearchResults?.map((university) => (
                        <div
                          className={clsx(
                            "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                            form.watch("type") === "Student" && "bg-gray-200",
                          )}
                          onClick={() => {
                            form.setValue("university", university.name);
                            setUniversitySelected(true);
                          }}
                          key={university.id}
                        >
                          {university.name}
                        </div>
                      ))}
                      {universitySearchResults?.length === 0 && (
                        <div
                          className="p-2"
                          onClick={() => {
                            form.setValue(
                              "university",
                              form.watch("university"),
                            );
                            setUniversitySelected(true);
                          }}
                        >
                          Add &quot;{form.watch("university")}&quot;
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              {universitySelected && (
                <div className="relative">
                  <div className="py-2 text-xs font-semibold text-zinc-700">
                    University Role *
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="focus:outline-none">
                        {`${form.watch("universityRole").split("_").map(toTitleCase).join(" ")}`}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="flex w-64 flex-col gap-2 border border-gray-900 bg-white p-2"
                      align="start"
                    >
                      {Object.values(UniversityRole).map((role) => (
                        <DropdownMenuItem
                          key={role}
                          className={clsx(
                            "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                            form.watch("universityRole") === role &&
                              "bg-gray-200",
                          )}
                          onClick={() => form.setValue("universityRole", role)}
                        >
                          {role.split("_").map(toTitleCase).join(" ")}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex items-center gap-2">
                    <Input
                      type="checkbox"
                      className="flex w-fit"
                      checked={form.watch("graduated")}
                      onChange={(e) =>
                        form.setValue("graduated", e.target.checked)
                      }
                    />
                    Graduated
                  </div>
                </div>
              )}
            </div>

            {/* {form.watch("type") === "Company" && (
              <div>
                {companySelected && (
                  <div>
                    <div className="pb-2 text-xs font-semibold text-zinc-700">
                      Company *
                    </div>
                    <div className="flex justify-between gap-2">
                      <div>{form.watch("company")}</div>
                      <button
                        onClick={() => setCompanySelected(false)}
                        className="text-red-500"
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
                {!companySelected && (
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <CustomFormItem
                          label="Company"
                          field={field}
                          placeholder="Solana Foundation"
                        />
                      )}
                      required
                    />
                    {form.watch("company") && (
                      <div className="absolute left-0 top-[4.5rem] flex w-full flex-col gap-2 rounded-lg border border-gray-900 bg-white p-2">
                        {companySearchStatus === "pending" && (
                          <div>Loading...</div>
                        )}
                        {companySearchResults?.map((company) => (
                          <div
                            key={company.id}
                            className={clsx(
                              "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                              form.watch("type") === "Company" && "bg-gray-200",
                            )}
                            onClick={() => {
                              form.setValue("company", company.name);
                              setCompanySelected(true);
                            }}
                          >
                            {company.name}
                          </div>
                        ))}
                        {companySearchResults?.length === 0 && (
                          <div
                            className="p-2"
                            onClick={() => {
                              form.setValue("company", form.watch("company"));
                              setCompanySelected(true);
                            }}
                          >
                            Add &quot;{form.watch("company")}&quot;
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {companySelected && (
                  <div className="relative">
                    <div className="py-2 text-xs font-semibold text-zinc-700">
                      Company Role *
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="focus:outline-none">
                          {`${form.watch("companyRole")}`}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="flex w-64 flex-col gap-2 border border-gray-900 bg-white p-2"
                        align="start"
                      >
                        {Object.values(CompanyRole).map((role) => (
                          <DropdownMenuItem
                            key={role}
                            className={clsx(
                              "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                              form.watch("companyRole") === role &&
                                "bg-gray-200",
                            )}
                            onClick={() => form.setValue("companyRole", role)}
                          >
                            {role}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            )}

            <div>
              {form.watch("interests").length > 0 && (
                <div>
                  <div className="pb-2 text-xs font-semibold text-zinc-700">
                    Interests *
                  </div>
                  <div>
                    {form.watch("interests").map((interest) => (
                      <div
                        className="flex justify-between gap-2"
                        key={interest}
                      >
                        <div>{interest}</div>
                        <button
                          onClick={() =>
                            form.setValue(
                              "interests",
                              form
                                .watch("interests")
                                .filter((i) => i !== interest),
                            )
                          }
                          className="text-red-500"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {form.watch("currentInterest") !== "" && (
                <div className="relative">
                  {form.watch("currentInterest") && (
                    <div className="absolute left-0 top-[5.5rem] flex w-full flex-col gap-2 rounded-lg border border-gray-900 bg-white p-2">
                      {interestsSearchStatus === "pending" && (
                        <div>Loading...</div>
                      )}
                      {interestsSearchResults?.map((interest) => (
                        <div
                          key={interest.id}
                          className={clsx(
                            "p-2 hover:bg-transparent focus:bg-gray-500 focus:text-white",
                            form.watch("type") === "Student" && "bg-gray-200",
                          )}
                          onClick={() => {
                            form.setValue("interests", [
                              ...form.watch("interests"),
                              interest.name,
                            ]);
                            form.setValue("currentInterest", "");
                          }}
                        >
                          {interest.name}
                        </div>
                      ))}
                      {interestsSearchResults?.length === 0 && (
                        <div
                          className="p-2"
                          onClick={() => {
                            form.setValue("interests", [
                              ...form.watch("interests"),
                              form.watch("currentInterest"),
                            ]);
                            form.setValue("currentInterest", "");
                          }}
                        >
                          Add &quot;{form.watch("currentInterest")}&quot;
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="currentInterest"
              render={({ field }) => (
                <CustomFormItem
                  label="Interests"
                  field={field}
                  placeholder="Cryptography, Blockchain"
                />
              )}
              required
            /> */}
          </div>

          {/* <FormField
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

          {/* Image and PDF Upload */}
          {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          </div> */}

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
