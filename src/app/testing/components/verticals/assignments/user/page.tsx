import React from "react";
import { DeleteUser } from "./components/DeleteUser";
import { RestoreUser } from "./components/RestoreUser";
import { CreateUser } from "./components/CreateUser";
import { UpdateUser } from "./components/UpdateUser";
import { ListUsers } from "./components/ListUser";

export default function UserPage() {
  return (
    <div>
      <DeleteUser />
      <RestoreUser />
      <CreateUser />
      <UpdateUser />
      <ListUsers />
    </div>
  );
}
