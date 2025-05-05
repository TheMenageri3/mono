"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateProfileSchema } from "@/schemas/profile";
import { useProfileMutations } from "../hooks/useProfileMutations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export function UpdateProfile() {
  const { useUpdateProfile } = useProfileMutations();
  const { updateProfile, isPending } = useUpdateProfile();

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      username: "",
      jobTitle: "",
      department: "",
      bio: "",
      email: "",
      phoneNumber: "",
      timezone: "",
      languagePreference: "",
      walletAddress: "",
      onboardingCompleted: false,
      locationId: "",
      companyId: "",
      profilePictureId: "",
      notificationPreferences: {},
      socialMediaLinks: {},
      customFields: {},
    },
  });

  const onSubmit = (data: UpdateProfileInput) => {
    updateProfile(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {[
          "firstName",
          "lastName",
          "username",
          "jobTitle",
          "department",
          "email",
          "phoneNumber",
          "timezone",
          "languagePreference",
          "walletAddress",
          "locationId",
          "companyId",
          "profilePictureId",
        ].map((name) => (
          <FormField
            key={name}
            control={form.control}
            name={name as keyof UpdateProfileInput}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{name}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={`Enter ${name}`} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Bio (textarea) */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter bio" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Onboarding Completed (switch) */}
        <FormField
          control={form.control}
          name="onboardingCompleted"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3">
              <FormLabel>Onboarding Completed</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notification Preferences (JSON) */}
        <FormField
          control={form.control}
          name="notificationPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notification Preferences (JSON)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='e.g. {"email": true, "sms": false}'
                  onChange={(e) =>
                    field.onChange(JSON.parse(e.target.value || "{}"))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Social Media Links (JSON) */}
        <FormField
          control={form.control}
          name="socialMediaLinks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Media Links (JSON)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='e.g. {"twitter": "https://twitter.com/handle"}'
                  onChange={(e) =>
                    field.onChange(JSON.parse(e.target.value || "{}"))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Custom Fields (JSON) */}
        <FormField
          control={form.control}
          name="customFields"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Fields (JSON)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='e.g. {"hobby": "cycling"}'
                  onChange={(e) =>
                    field.onChange(JSON.parse(e.target.value || "{}"))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
}
