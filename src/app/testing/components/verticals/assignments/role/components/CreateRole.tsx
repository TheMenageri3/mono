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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { createRoleSchema } from "@/schemas/role";
import { useRoleMutations } from "../hooks/useRoleMutations";
import { RoleCategory, RoleLevel } from "@/generated/prisma";

type CreateRoleInput = z.infer<typeof createRoleSchema>;

export function CreateRole() {
  const { useCreateRole } = useRoleMutations();
  const { createRole, isPending } = useCreateRole();

  const form = useForm<CreateRoleInput>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: "",
      description: "",
      category: RoleCategory.TECHNICAL,
      department: "",
      level: RoleLevel.ENTRY,
      isInternal: false,
      profileId: "",
      companyId: "",
    },
  });

  const onSubmit = (data: CreateRoleInput) => {
    createRole(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter role name" />
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
                <Input {...field} placeholder="Enter description" />
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
                  value={field.value}
                  defaultValue="TECHNICAL"
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
                <Input {...field} placeholder="Enter department" />
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
                  value={field.value}
                  defaultValue="ENTRY"
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
                <Input {...field} placeholder="Enter profile ID" />
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
                <Input {...field} placeholder="Enter company ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Role"}
        </Button>
      </form>
    </Form>
  );
}
