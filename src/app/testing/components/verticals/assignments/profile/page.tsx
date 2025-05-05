import React from "react";
import { CreateProfile } from "./components/CreateProfile";
import { UpdateProfile } from "./components/UpdateProfile";
import { RestoreProfile } from "./components/RestoreProfile";
import { DeleteProfile } from "./components/DeleteProfile";
import { ListProfiles } from "./components/ListProfile";

export default function ProfilePage() {
  return (
    <div>
      <CreateProfile />
      <UpdateProfile />
      <RestoreProfile />
      <DeleteProfile />
      <ListProfiles />
    </div>
  );
}
