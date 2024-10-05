import { flicks } from "~/_components/degenspace/Flick/dummyData";
import { Flick } from "~/_components/degenspace/Flick/Flick";
import H1 from "~/_components/degenspace/H1";

import { MainContentHeader } from "~/_components/degenspace/MainLayout/MainContentHeader";
import { HorizontalLine } from "~/_components/degenspace/UtilComponents/Horizontalline";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-[10px] backdrop-blur-sm">
      <div>
        <MainContentHeader displaytext="A social community space for degens on solana" />
        <div className="flex w-full justify-center p-[10px]">
          <H1>Trending Flicks</H1>
        </div>
        <div className="flex w-full flex-col">
          <HorizontalLine />
          <div className="flex w-full flex-col">
            {flicks.map((flick) => (
              <Flick key={flick.username} {...flick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
