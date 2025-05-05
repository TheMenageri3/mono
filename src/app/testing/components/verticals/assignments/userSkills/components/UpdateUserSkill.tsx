"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useUserSkillsMutations } from "../hooks/useUserSkillsMutations";
import { updateUserSkillSchema } from "@/schemas";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type UpdateUserSkillInput = z.infer<typeof updateUserSkillSchema>;

export function UpdateUserSkill() {
  const { useUpdateUserSkill } = useUserSkillsMutations();
  const { updateUserSkill, isPending } = useUpdateUserSkill();

  const form = useForm<UpdateUserSkillInput>({
    resolver: zodResolver(updateUserSkillSchema),
    defaultValues: {
      id: "",
      tagId: "",
      selfRating: 3,
      notes: "",
      profileId: "", // This should be filled based on context or user
    },
  });

  const onSubmit = (data: UpdateUserSkillInput) => {
    updateUserSkill(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter tag ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="selfRating"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Self Rating (0–5)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(val) => field.onChange(Number(val))}
                  value={String(field.value ?? 0)}
                  className="flex flex-row space-x-4"
                >
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <FormItem
                      key={num}
                      className="flex items-center space-x-2 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={String(num)} />
                      </FormControl>
                      <FormLabel className="font-normal">{num}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Optional notes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profileId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter profile ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Skill"}
        </Button>
      </form>
    </Form>
  );
}
