"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { updateRoleSchema } from "@/schemas/role";
import { useRoleMutations } from "../hooks/useRoleMutations";
import { RoleCategory, RoleLevel } from "@/generated/prisma";

type UpdateRoleInput = z.infer<typeof updateRoleSchema>;

export function UpdateRole() {
  const { useUpdateRole } = useRoleMutations();
  const { updateRole, isPending } = useUpdateRole();

  const form = useForm<UpdateRoleInput>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
      category: undefined,
      department: "",
      level: undefined,
      isInternal: false,
      profileId: "",
      companyId: "",
    },
  });

  const onSubmit = (data: UpdateRoleInput) => {
    updateRole(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter role ID (UUID)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Optional role name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Optional description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Role Category</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                  className="flex flex-col space-y-1"
                >
                  {Object.values(RoleCategory).map((category) => (
                    <FormItem
                      key={category}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={category} />
                      </FormControl>
                      <FormLabel className="font-normal">{category}</FormLabel>
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
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Optional department" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Role Level</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                  className="flex flex-col space-y-1"
                >
                  {Object.values(RoleLevel).map((level) => (
                    <FormItem
                      key={level}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={level} />
                      </FormControl>
                      <FormLabel className="font-normal">{level}</FormLabel>
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
          name="isInternal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is Internal</FormLabel>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
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
                <Input {...field} placeholder="Optional profile ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Optional company ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Role"}
        </Button>
      </form>
    </Form>
  );
}
