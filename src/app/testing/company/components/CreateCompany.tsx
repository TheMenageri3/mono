"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useCompanyMutations } from "../hooks/useCompanyMutations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { createCompanySchema } from "@/schemas";
import { X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// We'll use the direct schema inference to ensure type consistency
// This avoids potential mismatches between our local type and the actual schema

export default function CreateCompany() {
  const { useCreateCompany } = useCompanyMutations();
  const { createCompany, isPending, isSuccess, isError, error, reset } =
    useCreateCompany();

  // For locations field management
  const [locationInput, setLocationInput] = useState("");
  const [locations, setLocations] = useState<string[]>([]);

  // Import the exact schema type to ensure consistency
  const form = useForm<z.infer<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
      description: "",
      headquarters: "",
      website: "",
      active: true,
      locations: [],
      size: undefined,
      foundedYear: undefined,
      logoId: undefined,
      missionStatement: undefined,
      benefits: undefined,
      culture: undefined,
      notes: undefined,
    },
  });

  const isNonEmptyArray = (arr: string[]): arr is [string, ...string[]] => {
    return arr.length > 0;
  };

  // Update the form when locations change
  useEffect(() => {
    if (isNonEmptyArray(locations)) {
      form.setValue("locations", locations, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [locations, form]);

  // Handle adding a location
  const handleAddLocation = () => {
    if (locationInput.trim() !== "") {
      setLocations([...locations, locationInput.trim()]);
      setLocationInput("");
    }
  };

  // Handle removing a location
  const handleRemoveLocation = (index: number) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
  };

  // Handle form submission
  const onSubmit = (data: z.infer<typeof createCompanySchema>) => {
    // Ensure locations is not empty before submitting
    if (!data.locations || data.locations.length === 0) {
      form.setError("locations", {
        type: "manual",
        message: "At least one location is required",
      });
      return;
    }

    // Submit the data to the API
    createCompany(data);
  };

  // Reset form after successful submission
  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setLocations([]);
    }
  }, [isSuccess, form]);

  // Reset mutation state when form is unmounted
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter company name" />
              </FormControl>
              <FormDescription>
                The official name of the company
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter company description"
                  className="min-h-24"
                />
              </FormControl>
              <FormDescription>
                Brief description of the company&apos;s business and activities
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Size */}
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="STARTUP">Startup</SelectItem>
                  <SelectItem value="SMALL">Small</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LARGE">Large</SelectItem>
                  <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The approximate size of the company
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Founded Year */}
        <FormField
          control={form.control}
          name="foundedYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Founded Year</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter founding year"
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value
                      ? parseInt(e.target.value)
                      : undefined;
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormDescription>Year the company was founded</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Headquarters */}
        <FormField
          control={form.control}
          name="headquarters"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headquarters</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter company headquarters location"
                />
              </FormControl>
              <FormDescription>
                Main location of the company&apos;s headquarters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Locations */}
        <FormField
          control={form.control}
          name="locations"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Locations</FormLabel>
              <div className="flex space-x-2">
                <Input
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Enter a location"
                  className={fieldState.error ? "border-red-500" : ""}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddLocation();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddLocation}
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md flex items-center gap-1"
                  >
                    {location}
                    <button
                      type="button"
                      onClick={() => handleRemoveLocation(index)}
                      className="text-secondary-foreground/70 hover:text-secondary-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {locations.length === 0 && fieldState.error && (
                  <div className="text-sm text-red-500">
                    Please add at least one location
                  </div>
                )}
              </div>
              <FormDescription>
                Office locations of the company (at least one required)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Website */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter company website URL" />
              </FormControl>
              <FormDescription>
                Official website URL of the company
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mission Statement */}
        <FormField
          control={form.control}
          name="missionStatement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mission Statement</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter company mission statement"
                  className="min-h-20"
                />
              </FormControl>
              <FormDescription>
                The company&apos;s mission statement
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Benefits */}
        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Benefits</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter company benefits"
                  className="min-h-20"
                />
              </FormControl>
              <FormDescription>Benefits offered by the company</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Culture */}
        <FormField
          control={form.control}
          name="culture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Culture</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe the company culture"
                  className="min-h-20"
                />
              </FormControl>
              <FormDescription>
                Description of the company&apos;s culture and work environment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Additional notes about the company"
                  className="min-h-20"
                />
              </FormControl>
              <FormDescription>
                Any additional information about the company
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active Status */}
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active</FormLabel>
                <FormDescription>
                  Mark this company as active in the system
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating..." : "Create Company"}
        </Button>
      </form>
    </Form>
  );
}
