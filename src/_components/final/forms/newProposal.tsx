/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NewProposalFormData } from "~/lib/validation";
import CustomFormItem from "../CustomForm";
import { Button } from "~/_components/final/ui/button";
import { Form, FormField, FormLabel } from "~/_components/final/ui/form";
import { Textarea } from "~/_components/final/ui/textarea";
import H1 from "~/_components/final/H1";
import { api } from "~/trpc/react";

const initialData = {
  title: "",
  description: "",
  goal: 0,
  end: new Date(),
};

export default function NewProposalForm() {
  const [isEditing, setIsEditing] = useState(true);
  return <div>New Proposal</div>;

  // const form = useForm<z.infer<typeof NewProposalFormData>>({
  //   resolver: zodResolver(NewProposalFormData),
  //   defaultValues: initialData,
  // });

  // const createProposal = api.proposal.create.useMutation({});

  // const handleSubmit = async (values: z.infer<typeof NewProposalFormData>) => {
  //   try {
  //     createProposal.mutate(values);
  //     console.log("Profile updated:", values);
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };
  // return (
  //   <Form {...form}>
  //     <form
  //       onSubmit={form.handleSubmit(handleSubmit)}
  //       className="mx-auto max-w-4xl space-y-6 rounded-lg bg-white p-6 pb-12 shadow md:p-20 md:pb-16 md:pt-6"
  //     >
  //       <H1 className="text-2xl font-bold">New DAO</H1>
  //       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  //         <FormField
  //           control={form.control}
  //           name="title"
  //           render={({ field }) => (
  //             <CustomFormItem
  //               label="Title"
  //               field={field}
  //               placeholder="Enter your proposal title"
  //               isEditing={isEditing}
  //             />
  //           )}
  //           required
  //         />
  //       </div>
  //       <FormField
  //         control={form.control}
  //         name="description"
  //         render={({ field }) => (
  //           <CustomFormItem
  //             label="Description"
  //             field={field}
  //             placeholder="Enter your description"
  //             isEditing={isEditing}
  //             InputComponent={Textarea}
  //           />
  //         )}
  //         required
  //       />
  //       <div className="mt-4"></div>

  //       <FormField
  //         control={form.control}
  //         name="quorum"
  //         render={({ field }) => (
  //           <CustomFormItem
  //             label="Quorum"
  //             field={field}
  //             placeholder="Enter your quorum"
  //             inputProps={{ type: "number" }}
  //           />
  //         )}
  //         required
  //       />

  //       <FormField
  //         control={form.control}
  //         name="threshold"
  //         render={({ field }) => (
  //           <CustomFormItem
  //             label="threshold"
  //             field={field}
  //             placeholder="Enter your threshold"
  //             inputProps={{ type: "number" }}
  //           />
  //         )}
  //         required
  //       />

  //       <FormField
  //         control={form.control}
  //         name="endDate"
  //         render={({ field }) => (
  //           <CustomFormItem
  //             label="End Date / Expiry"
  //             field={field}
  //             placeholder="Enter your end date"
  //             inputProps={{ type: "number" }}
  //           />
  //         )}
  //         required
  //       />
  //       {/* TO DO : dealing with each kind of proposaltype */}
  //       <FormField
  //         control={form.control}
  //         name="proposalType"
  //         render={({ field }) => (
  //           <div className="form-item">
  //             <label htmlFor="proposalType" className="form-label">
  //               Proposal Type
  //             </label>
  //             <select
  //               id="proposalType"
  //               {...field}
  //               disabled={!isEditing}
  //               className="form-select"
  //             >
  //               <option value="" disabled>
  //                 Select your proposal type
  //               </option>
  //               <option value="VOTE_MULTIPLE_CHOICE">
  //                 Vote Multiple Choice
  //               </option>
  //               <option value="BOUNTY">Bounty</option>
  //               <option value="VOTE">Vote</option>
  //               <option value="EXECUTABLE">Executable</option>
  //             </select>
  //           </div>
  //         )}
  //       />

  //       <FormField
  //         control={form.control}
  //         name="analysisPeriod"
  //         render={({ field }) => (
  //           <CustomFormItem
  //             label="Analysis Period (in slots)"
  //             field={field}
  //             placeholder="Enter analysis period"
  //             inputProps={{ type: "number" }}
  //           />
  //         )}
  //         required
  //       />

  //       <FormField
  //         control={form.control}
  //         name="uri"
  //         render={({ field }) => (
  //           <CustomFormItem
  //             label="URI"
  //             field={field}
  //             placeholder="Enter URI"
  //             isEditing={isEditing}
  //             inputProps={{ maxLength: 112 }}
  //           />
  //         )}
  //         required
  //       />
  //       <div className="flex justify-end gap-4">
  //         <Button
  //           type="submit"
  //           className={`w-40 ${
  //             isEditing
  //               ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
  //               : "bg-transparent text-zinc-800 hover:bg-zinc-100"
  //           }`}
  //           variant={isEditing ? "default" : "outline"}
  //           disabled={!isEditing || form.formState.isSubmitting}
  //         >
  //           {form.formState.isSubmitting ? "Submitting..." : "Create Proposal"}
  //         </Button>
  //         <Button
  //           type="button"
  //           className={`w-40 ${
  //             isEditing
  //               ? "bg-transparent text-zinc-800 hover:bg-zinc-100"
  //               : "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
  //           }`}
  //           variant={isEditing ? "outline" : "default"}
  //           disabled={form.formState.isSubmitting}
  //           onClick={() => {
  //             if (isEditing) {
  //               form.reset(initialData);
  //             }
  //             setIsEditing(!isEditing);
  //           }}
  //         >
  //           {isEditing ? "Cancel" : "Edit"}
  //         </Button>
  //       </div>
  //     </form>
  //   </Form>
  // );
}
