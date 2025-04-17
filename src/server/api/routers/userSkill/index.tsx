import { createTRPCRouter } from "../../trpc";
import { createUserSkill } from "./create";
import {
  readUserSkillsByProfileId,
  readDeletedUserSkillsByProfileId,
  readUserSkillById,
  readUserSkills,
  readDeletedUserSkills,
} from "./read";
import { updateUserSkill } from "./update";
import { deleteUserSkill, restoreUserSkill } from "./delete";

export const userSkillRouter = createTRPCRouter({
  create: createUserSkill,
  read: readUserSkills,
  readById: readUserSkillById,
  readByProfileId: readUserSkillsByProfileId,
  readDeletedByProfileId: readDeletedUserSkillsByProfileId,
  readDeleted: readDeletedUserSkills,
  update: updateUserSkill,
  delete: deleteUserSkill,
  restore: restoreUserSkill,
});
