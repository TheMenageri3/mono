"use client";

import { useState, useEffect } from "react";
import H4 from "../H4";
import P from "../P";
import H2 from "../H2";
import PeerReviewComponent from "../PeerReview";
import { AvatarWithName } from "../Avatar";
import { Lock } from "lucide-react";
import type { Paper, Review } from "~/lib/validation";
import { formatTimeAgo } from "~/lib/utils/helpers";
import { PAPER_STATUS } from "~/lib/utils/constants";
import dynamic from "next/dynamic";
import { pdfjs } from "react-pdf";
import PeerReviewEditor from "../PeerReview/PeerReviewEditor";
import PaperActionButton from "./PaperActionButton";
import useScreen from "~/hooks/useScreen";
import React from "react";
import { Button } from "~/_components/ui/button";
import RatingModal from "../Rating";

const PDFViewComponent = dynamic(() => import("../PDFView"), { ssr: false });

export default function PaperContentComponent({ paper }: { paper: Paper }) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const screenSize = useScreen();
  const isMobile = screenSize === "sm" || screenSize === "md";

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();
  }, []);

  const [expandedReviews, setExpandedReviews] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (paper.peer_reviews && paper.peer_reviews.length > 0) {
      setExpandedReviews((prev) => ({
        ...prev,
        [paper.peer_reviews[0]?.id ?? "default"]: true,
      }));
    }
  }, [paper.peer_reviews]);

  const toggleReview = (reviewId: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const renderReviews = () => {
    if (paper.peer_reviews.length === 0) {
      return <P className="text-zinc-500">No reviews yet.</P>;
    }

    return paper.peer_reviews?.map((review: Review) => (
      <PeerReviewComponent
        key={review.id}
        review={{
          ...review,
          time: formatTimeAgo(review.created_at),
        }}
        isExpanded={!!expandedReviews[review.id]}
        onToggle={() => toggleReview(review.id)}
      />
    ));
  };

  const handleRateButtonClick = () => {
    setIsRatingModalOpen(true);
  };

  return (
    <div className="mx-auto px-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {paper.domains.map((domain, index) => (
                <span
                  key={index}
                  className="rounded bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800"
                >
                  {domain}
                </span>
              ))}
            </div>
            <span className="rounded bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800">
              v{paper.version}
            </span>
          </div>
          <H2 className="mb-4 text-pretty font-semibold text-zinc-700">
            {paper.title}
          </H2>
          <P className="mb-4 text-pretty font-light leading-[1.5]">
            {paper.description}
          </P>
          <div className="mb-4 flex items-center space-x-1">
            {paper.authors.map((author: string, index) => (
              <AvatarWithName key={index} name={author} />
            ))}
            <span className="text-sm text-zinc-500">
              {paper.authors.join(", ")} • {formatTimeAgo(paper.created_at)}
            </span>
          </div>

          {/* Write a review button for mobile and tablet */}
          {(screenSize === "sm" || screenSize === "md") && (
            <>
              <div className="mb-5 mt-16 flex justify-center">
                <PaperActionButton
                  paper={paper}
                  onToggleReview={() => setIsEditorOpen(true)}
                  onUpdateNewPaper={() => {}}
                  onPublishPaper={() => {}}
                  onBuyPaper={() => {}}
                />
              </div>
              {paper.status === PAPER_STATUS.PEER_REVIEWING && (
                <Button
                  className="mb-16 flex w-full items-center justify-center text-sm md:w-[240px]"
                  size="lg"
                  variant="outline"
                  onClick={handleRateButtonClick}
                >
                  ⭐ Rate this Paper
                </Button>
              )}
            </>
          )}

          {/* TODO: NEED TO CHECK PAPER STATUS + USER ROLE + MINTED ID TO SHOW PDF*/}
          {paper.status === PAPER_STATUS.PUBLISHED && (
            <div className="mt-6 flex items-center bg-zinc-100 p-4">
              <Lock className="mr-2 h-4 w-4" />
              <P className="text-pretty text-sm text-zinc-900">
                Support research to show the paper
              </P>
            </div>
          )}
          {(paper.status === PAPER_STATUS.PEER_REVIEWING ||
            paper.status === PAPER_STATUS.REQUEST_REVISION ||
            paper.status === PAPER_STATUS.APPROVED) && (
            <div className="mt-6 flex items-center justify-center bg-zinc-700 p-4">
              <PDFViewComponent url="/test.pdf" />
            </div>
          )}
        </div>

        <div className="mt-20 flex flex-col">
          {/* Write a review button for desktop */}
          {(screenSize === "lg" || screenSize === "xl") && (
            <>
              <PaperActionButton
                paper={paper}
                onToggleReview={() => setIsEditorOpen(true)}
                onUpdateNewPaper={() => {}}
                onPublishPaper={() => {}}
                onBuyPaper={() => {}}
              />
              {paper.status === PAPER_STATUS.PEER_REVIEWING && (
                <Button
                  className="mt-5 flex w-full items-center justify-center text-sm md:w-[240px]"
                  size="lg"
                  variant="outline"
                  onClick={handleRateButtonClick}
                >
                  ⭐ Rate this Paper
                </Button>
              )}
            </>
          )}
          <div className="md:hidden">
            <H4 className="mb-4 font-atkinson font-semibold">Peer-Reviews</H4>
            {renderReviews()}
          </div>
          <div className="hidden md:block">
            <H4 className="pt-24 font-atkinson font-semibold">Peer-Reviews</H4>
            {renderReviews()}
          </div>
        </div>
      </div>
      <PeerReviewEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        paper={paper}
        onSubmit={(rating) => {
          console.log(rating);
        }}
      />
    </div>
  );
}
