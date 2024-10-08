"use client";

import { useState, useEffect } from "react";
import H4 from "../H4";
import P from "../P";
import H2 from "../H2";
import PeerReviewComponent from "../PeerReview";
import { AvatarWithName, AvatarWithNameImage } from "../Avatar";
import { Lock } from "lucide-react";
import { PaperSchema, type Paper, type Review } from "~/lib/validation";
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
import papersPost from "~/constants/dummyPapersPost.json";

const PDFViewComponent = dynamic(() => import("../PDFView"), { ssr: false });

export default function PaperContentComponent({ _paper }: { _paper: Paper }) {
  const [paper, setPaper] = useState(_paper);
  const [showPDF, setShowPDF] = useState(false);
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

  const handleUpdatePaper = () => {
    const newPaper: Paper = {
      ...paper,
      peer_reviews: [
        {
          id: "tuewvqzh9000000l8mzt6f311",
          title: "Innovative and Scalable Solution",
          description:
            "The framework introduces Ephemeral Rollups in a creative manner, pushing the boundaries of scalability in blockchain-based games. The idea of gasless transactions and provable sessions is well-articulated, making this a forward-thinking contribution to the field. The authors manage to balance innovation with practical concerns of cost and operational speed.",
          created_at: new Date().toISOString(),
          updated_at: "2024-10-03T14:00:00.000Z",
          rating: 4.8,
          reviewers: {
            id: "web456",
            name: "Alice Anonymous",
            image: "/alice.png",
          },
          user_id: "wed0grj7u0005x0s9esb6sjrg",
          paper_id: "wedwvqzh9000000l8mzt6f300",
        },
        ...paper.peer_reviews,
      ],
    };

    try {
      setPaper(newPaper);
    } catch (error) {
      console.error("Invalid paper data:", error);
    }
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

  const onBuyPaper = () => {
    handleUpdatePaper();
    setShowPDF(true);
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
                  className="bg-primary-20 rounded px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {domain}
                </span>
              ))}
            </div>
            <span className="bg-primary-20 rounded px-2.5 py-0.5 text-xs font-medium text-primary">
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
              <AvatarWithNameImage
                key={index}
                name={author}
                image={index === 0 ? "/gabi.png" : "/andrea.jpg"}
              />
            ))}
            <span className="text-sm text-zinc-500">
              • {formatTimeAgo(paper.created_at)}
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
          {showPDF ? (
            <div className="mt-6 flex items-center justify-center bg-zinc-700 p-4">
              <PDFViewComponent url="/rollup.pdf" />
            </div>
          ) : (
            <div className="mt-6 flex items-center bg-zinc-100 p-4">
              <Lock className="mr-2 h-4 w-4" />
              <P className="text-pretty text-sm text-zinc-900">
                Support research to show the paper
              </P>
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
                onBuyPaper={onBuyPaper}
              />
              {/* {paper.status === PAPER_STATUS.PEER_REVIEWING && ( */}
              <Button
                className="mt-5 flex w-full items-center justify-center text-sm md:w-[240px]"
                size="lg"
                variant="outline"
                onClick={() => {
                  setIsEditorOpen(true);
                }}
              >
                Write a Review
              </Button>
              {/* )} */}
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
