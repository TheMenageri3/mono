"use client";
import styles from "~/styles/table.module.css";
import { api } from "~/trpc/react";

import { Button } from "~/_components/final/ui/button";
import H1 from "~/_components/final/H1";
import { seedUser } from "~/seed/user";
import { seedFlick } from "~/seed/flick";
function AdminContent() {
  const userMutation = api.user.create.useMutation();
  const flickMutation = api.flick.createAdmin.useMutation();

  return (
    <div className={styles.content}>
      <H1 className="pt-4 text-primary">Seed Database</H1>
      <Button onClick={() => seedUser(userMutation)}>Seed User</Button>
      <Button onClick={() => seedFlick(flickMutation)}>Seed Flicks</Button>
    </div>
  );
}

export { AdminContent };
