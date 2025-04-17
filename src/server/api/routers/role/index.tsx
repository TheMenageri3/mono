import { createTRPCRouter } from "@/server/api/trpc";

import { createRole } from "./create";
import {
  readRoles,
  readDeletedRoles,
  readRolesByCompanyId,
  readRolesByProfileId,
} from "./read";
import { updateRole } from "./update";
import { deleteRole, restoreRole } from "./delete";

export const roleRouter = createTRPCRouter({
  create: createRole,
  read: readRoles,
  getByCompany: readRolesByCompanyId,
  getByProfile: readRolesByProfileId,
  readDeleted: readDeletedRoles,
  update: updateRole,
  delete: deleteRole,
  restore: restoreRole,
});
