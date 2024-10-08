import React from "react";
import H4 from "../H4";
import P from "../P";
import { AvatarWithName, AvatarWithNameImage } from "../Avatar";
import { getScoreColorClass } from "~/lib/utils/helpers";
import { Review } from "~/lib/validation";

interface PeerReviewProps {
  review: Review & { time: string };
  isExpanded: boolean;
  onToggle: () => void;
}

export default function PeerReviewComponent({
  review,
  isExpanded,
  onToggle,
}: PeerReviewProps) {
  const scoreColorClass = getScoreColorClass(review.rating);

  return (
    <div className="border-b border-zinc-200 py-4">
      <div className="cursor-pointer" onClick={onToggle}>
        <div className="mb-2 grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <AvatarWithNameImage
            name={review.reviewers.name}
            image={review.reviewers.image ?? ""}
          />
          <div className="flex items-center gap-2">
            {/* <P className="text-xs font-medium">{review.reviewers.name}</P> */}
            <P className="text-xs text-zinc-500">{review.time}</P>
          </div>
          <div
            className={`flex items-center justify-center ${scoreColorClass} h-10 w-10 rounded-md font-arbutus text-xs font-medium text-white`}
          >
            {review.rating.toFixed(1)}
          </div>
        </div>
        <H4 className="text-pretty font-extralight leading-6 text-zinc-900">
          {review.title}
        </H4>
      </div>
      {isExpanded && (
        <div className="mt-4">
          <P className="text-pretty text-sm text-zinc-600">
            {review.description}
          </P>
        </div>
      )}
    </div>
  );
}

// TODO: We'll need this later
// function calculateScore(reviewScores: ReviewScores): number {
//   const {
//     qualityOfResearch,
//     potentialForRealWorldUseCase,
//     domainKnowledge,
//     practicalityOfResultObtained,
//   } = reviewScores;

//   // Calculate the average score (1-10 scale)
//   const totalScore =
//     (qualityOfResearch +
//       potentialForRealWorldUseCase +
//       domainKnowledge +
//       practicalityOfResultObtained) /
//     4;

//   // Convert the average score from 1-10 to 1-5 scale
//   return +(totalScore / 2).toFixed(1);
// }
