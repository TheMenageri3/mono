import styles from "~/styles/table.module.css";

import { AdminContent } from "~/content/admin/context";

async function Campaigns() {
  return (
    <div className={styles.main}>
      <div className="container mx-auto px-4 py-8">
        <AdminContent />
      </div>
    </div>
  );
}

export default Campaigns;
