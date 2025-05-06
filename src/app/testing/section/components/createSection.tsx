"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, type z } from "zod";
import { useSectionMutations } from "../hooks/useSectionMutations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createSectionSchema } from "@/schemas";
import { EventType, EventStatus } from "@/generated/prisma";

type CreateSectionInput = z.infer<typeof createSectionSchema>;

const CreateSection = () => {
  const { useCreateSection } = useSectionMutations();
  const { createSection, isPending } = useCreateSection();

  const form = useForm<CreateSectionInput>({
	resolver: zodResolver(createSectionSchema),
	defaultValues: {
	  header: "",
	  metadata: {
		type: "",
		order: 1,
		duration: "",
		description: "",
	  }
	},
  });

 
  const onSubmit = (data: CreateSectionInput) => {
	const {header, metadata} = data;
	const { type, order, duration, description} = metadata;
	createSection({
		header,
		metadata: {
			type,
			order,
			duration,
			description
		}
	});
  };

  return (
	<Form {...form}>
	  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
		{/* Header */}
		<FormField
		  control={form.control}
		  name="header"
		  render={({ field }) => (
			<FormItem>
			  <FormLabel>Header</FormLabel>
			  <FormControl>
				<Input {...field} placeholder="Course overview" />
			  </FormControl>
			  <FormMessage />
			</FormItem>
		  )}
		/>

		{/* Type */}
		<FormField
		  control={form.control}
		  name="metadata.type"
		  render={({ field }) => (
			<FormItem>
			  <FormLabel>Type</FormLabel>
			  <FormControl>
				<Input {...field} placeholder="Learning" />
			  </FormControl>
			  <FormMessage />
			</FormItem>
		  )}
		/>

		{/* Order */}
		<FormField
		  control={form.control}
		  name="metadata.order"
		  render={({ field }) => (
			<FormItem>
			  <FormLabel>Order</FormLabel>
			  <FormControl>
				<Input {...field} placeholder="1" />
			  </FormControl>
			  <FormMessage />
			</FormItem>
		  )}
		/>

		{/* Duration */}
		<FormField
		  control={form.control}
		  name="metadata.duration"
		  render={({ field }) => (
			<FormItem>
			  <FormLabel>Duration</FormLabel>
			  <FormControl>
				<Input {...field} placeholder="2 hours" />
			  </FormControl>
			  <FormMessage />
			</FormItem>
		  )}
		/>


		{/* Order */}
		<FormField
		  control={form.control}
		  name="metadata.description"
		  render={({ field }) => (
			<FormItem>
			  <FormLabel>Order</FormLabel>
			  <FormControl>
				<Input {...field} placeholder="introduction to learning" />
			  </FormControl>
			  <FormMessage />
			</FormItem>
		  )}
		/>



		{/* Submit Button */}
		<Button type="submit" disabled={isPending}>
		  {isPending ? "Creating..." : "Create Section"}
		</Button>
	  </form>
	</Form>
  );
};

export default CreateSection;
