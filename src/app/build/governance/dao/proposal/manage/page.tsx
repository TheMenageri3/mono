import styles from "~/styles/table.module.css";
import ManageProposal from "~/content/build/proposal/manage/content";
import { api } from "~/trpc/react";
// import { DAO } from "@prisma/client";

async function DAOs() {
  const { data: proposal, isLoading } = api.proposal.read.useQuery({
    id: "1",
  });
  // table data

  return (
    <div className={styles.main}>
      {/* {!isLoading && proposal && <ManageProposal proposal={proposal} />} */}
    </div>
  );
}

export default DAOs;
