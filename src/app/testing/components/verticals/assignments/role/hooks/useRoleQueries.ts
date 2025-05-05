import { api } from "@/trpc/react";
import type { z } from "zod";
import {
  readRolesSchema,
  readRolesByCompanyIdSchema,
  readRolesByProfileIdSchema,
  readDeletedRolesSchemas,
} from "@/schemas/role";

type ReadRolesInput = z.infer<typeof readRolesSchema>;
type ReadRolesByCompanyIdInput = z.infer<typeof readRolesByCompanyIdSchema>;
type ReadRolesByProfileIdInput = z.infer<typeof readRolesByProfileIdSchema>;
type ReadDeletedRolesInput = z.infer<typeof readDeletedRolesSchemas>;

export const useRoleQueries = () => {
  const useAllRoles = (input: ReadRolesInput = { limit: 10, offset: 0 }) => {
    return api.role.read.useQuery(input);
  };

  const useRolesByCompanyId = (input: ReadRolesByCompanyIdInput) => {
    return api.role.getByCompany.useQuery({ ...input, limit: 10, offset: 0 });
  };

  const useRolesByProfileId = (input: ReadRolesByProfileIdInput) => {
    return api.role.getByProfile.useQuery({ ...input, limit: 10, offset: 0 });
  };

  const useDeletedRoles = (
    input: ReadDeletedRolesInput = { limit: 10, offset: 0 }
  ) => {
    return api.role.readDeleted.useQuery(input);
  };

  return {
    useAllRoles,
    useRolesByCompanyId,
    useRolesByProfileId,
    useDeletedRoles,
  };
};
