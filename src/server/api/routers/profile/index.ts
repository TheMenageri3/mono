import { createTRPCRouter } from "@/server/api/trpc";
import { createProfile } from "./create";
import { readProfileById, readDeletedProfiles, readProfiles } from "./read";
import { updateProfile } from "./update";
import { deleteProfile, restoreProfile } from "./delete";

export const profileRouter = createTRPCRouter({
  create: createProfile,
  read: readProfiles,
  readDeleted: readDeletedProfiles,
  getById: readProfileById,
  update: updateProfile,
  delete: deleteProfile,
  restore: restoreProfile,
});
