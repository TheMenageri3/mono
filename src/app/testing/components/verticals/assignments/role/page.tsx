import React from "react";
import { CreateRole } from "./components/CreateRole";
import { UpdateRole } from "./components/UpdateRole";
import { DeleteRole } from "./components/DeleteRole";
import { RestoreRole } from "./components/RestoreRole";
import { ListRoles } from "./components/ListRole";

export default function RolePage() {
  return (
    <div>
      <CreateRole />
      <UpdateRole />
      <DeleteRole />
      <RestoreRole />
      <ListRoles />
    </div>
  );
}
