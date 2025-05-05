import React from "react";
import { CreateUserSkill } from "./components/CreateUserSkill";
import { UpdateUserSkill } from "./components/UpdateUserSkill";
import { DeleteUserSkill } from "./components/DeleteUserSkill";
import { RestoreUserSkill } from "./components/RestoreUserSkill";
import { ListUserSkills } from "./components/ListUserSkill";

export default function UserSkillPage() {
  return (
    <div>
      <CreateUserSkill />
      <UpdateUserSkill />
      <DeleteUserSkill />
      <RestoreUserSkill />
      <ListUserSkills />
    </div>
  );
}
