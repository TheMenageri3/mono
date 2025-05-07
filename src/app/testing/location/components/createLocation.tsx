"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useLocationMutations } from "../hooks/useLocationMutations";
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
import { createLocationSchema } from "@/schemas";
import { LocationType } from "@/generated/prisma";

type CreateLocationInput = z.infer<typeof createLocationSchema>;

const CreateLocation = () => {
  const { useCreateLocation } = useLocationMutations();
  const { createLocation, isPending } = useCreateLocation();

  const form = useForm<CreateLocationInput>({
    resolver: zodResolver(createLocationSchema),
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      latitude: 34.5894,
      longitude: 57.9873,
      country: "",
      type: LocationType.CAMPUS,
      notes: "",
      capacity: 35.8696,
    },
  });

  const onSubmit = (data: CreateLocationInput) => {
    createLocation(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Loctaion name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* AddressLine1 */}
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* AddressLine2 */}
          <FormField
            control={form.control}
            name="addressLine2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 2</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Abu dhabi" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* stateProvince */}
          <FormField
            control={form.control}
            name="stateProvince"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State Province</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="state province" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* country  */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} placeholder="dubai" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(LocationType).map((type) => (
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

        {/* notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input {...field} placeholder="notes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Location"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateLocation;
