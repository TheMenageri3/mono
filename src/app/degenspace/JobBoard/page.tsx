import { MainContentHeader } from "~/_components/degenspace/MainLayout/MainContentHeader";
import { PostJob } from "~/_components/degenspace/Job/PostJob";

const JobBoard = () => {
  return (
    <div className="flex h-full w-full flex-col gap-[10px] backdrop-blur-sm">
      <div className="my-[10px]">
        <MainContentHeader displaytext="Job Board" />
        <PostJob />
      </div>
    </div>
  );
};

export default JobBoard;