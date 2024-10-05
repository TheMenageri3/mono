import { MainContentHeader } from "~/_components/degenspace/MainLayout/MainContentHeader";
import { PostJob } from "~/_components/degenspace/Job/PostJob";
import { Jobs } from "~/_components/degenspace/Job/Jobs";

const JobBoard = () => {
  return (
    <div className="flex h-full w-full flex-col backdrop-blur-sm">
      <MainContentHeader displaytext="Job Board" />
      <PostJob />
      <Jobs />
    </div>
  );
};

export default JobBoard;
