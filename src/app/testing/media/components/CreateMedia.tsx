"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useMediaMutations } from "../hooks/useMediaMutations";
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
import { createMediaSchema } from "@/schemas";
import { MediaType, StorageType } from "@/generated/prisma";

type CreateMediaInput = z.infer<typeof createMediaSchema>;

const CreateMedia = () => {
  const { useCreateMedia } = useMediaMutations();
  const { createMedia, isPending } = useCreateMedia();

  const form = useForm<CreateMediaInput>({
    resolver: zodResolver(createMediaSchema),
    defaultValues: {
      title: "",
      type: MediaType.DOCUMENT,
      storageType: StorageType.LOCAL,
      url: "",
      originalFilename: "",
      mimeType: "",
    },
  });

  const onSubmit = (data: CreateMediaInput) => {
    createMedia(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Media name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Media type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Media Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(MediaType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Storage type */}
        <FormField
          control={form.control}
          name="storageType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Storage Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(StorageType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Url */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input {...field} placeholder="image/cloudinary.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Original filename */}
        <FormField
          control={form.control}
          name="originalFilename"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original filename</FormLabel>
              <FormControl>
                <Input {...field} placeholder="nice image" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* mimeType */}
        <FormField
          control={form.control}
          name="mimeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mime Type</FormLabel>
              <FormControl>
                <Input {...field} placeholder="jpg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Media"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateMedia;
