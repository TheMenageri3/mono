"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/_components/final/ui/button";
import { Avatar } from "../Avatar";
import { SolanaLogo } from "../SolanaLogo";
import H4 from "../H4";
import P from "../P";
import { PAPER_STATUS } from "~/lib/utils/constants";
import { getGradientForPaper } from "~/lib/utils/helpers";
import React from "react";

interface PaperCardProps {
  id: string;
  title: string;
  authors: string[];
  domain: string;
  minted?: number; // Optional - only for published papers
  price: number;
  status: string;
  alternateLayout?: boolean; // Only for demo
  reviewers?: number; // Optional - only for peer reviewing papers
}

export default function PaperCard({
  id,
  title,
  authors,
  domain,
  minted,
  price,
  status,
  reviewers,
  alternateLayout,
}: PaperCardProps) {
  const router = useRouter();
  const handleClick = () =>
    router.push(`/research/paper/${status.toLowerCase()}/${id}`);

  const gradient = getGradientForPaper(id);

  return (
    <div
      className={`overflow-hidden rounded-lg shadow-lg ${
        status === PAPER_STATUS.PUBLISHED ? "cursor-pointer" : ""
      }`}
    >
      <CardHeader
        title={title}
        domain={domain}
        status={status}
        handleClick={handleClick}
        gradient={gradient}
      />
      {alternateLayout ? (
        <div className="flex items-center justify-between bg-white px-6 py-4">
          <AuthorsList authors={authors} />
          <div className="flex items-center">
            {status === PAPER_STATUS.PUBLISHED && (
              <MintedInfo count={minted ?? 0} />
            )}
            {status === PAPER_STATUS.PEER_REVIEWING && (
              <ReviewersInfo count={reviewers ?? 0} />
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white px-6 py-4">
          <AuthorsList authors={authors} />
          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center">
              {status === PAPER_STATUS.PUBLISHED && (
                <MintedInfo count={minted ?? 0} />
              )}
              {status === PAPER_STATUS.PEER_REVIEWING && (
                <ReviewersInfo count={reviewers ?? 0} />
              )}
            </div>
            <ActionButton
              status={status}
              price={price}
              handleClick={handleClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// helper components for the card
const CardHeader = ({
  title,
  domain,
  status,
  handleClick,
  gradient,
}: {
  title: string;
  domain: string;
  status: string;
  handleClick: () => void;
  gradient: string;
}) => (
  <div
    className="group relative h-48 p-6 md:h-56"
    style={{ background: gradient }}
  >
    {status === PAPER_STATUS.PUBLISHED && (
      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
    )}
    <span className="mb-2 inline-block rounded-full bg-zinc-800 bg-opacity-50 px-3 py-1 text-xs font-semibold text-white">
      {domain}
    </span>
    <H4 className="mb-2 text-balance font-semibold text-white">{title}</H4>
    {status === PAPER_STATUS.PUBLISHED && (
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Button
          variant="secondary"
          className="bg-white text-zinc-800 hover:bg-zinc-100"
          onClick={handleClick}
        >
          Read More
        </Button>
      </div>
    )}
  </div>
);

const AuthorsList = ({ authors }: { authors: string[] }) => (
  <P className="mb-2 text-sm font-semibold text-zinc-900">
    {authors.length === 1 ? authors[0] : authors.join(", ")}
  </P>
);

const MintedInfo = ({ count }: { count: number }) => (
  <>
    <div className="mr-2 flex -space-x-2">
      {count > 0 &&
        Array.from({ length: Math.min(count, 3) }).map((_, index) => (
          <Avatar
            key={index}
            className="h-6 w-6 rounded-full border-2 border-white shadow-md"
          />
        ))}
    </div>
    <span className="text-xs text-zinc-600">{count} minted</span>
  </>
);

const ReviewersInfo = ({ count }: { count: number }) => (
  <>
    <div className="mr-2 flex -space-x-2">
      {count > 0 &&
        count <= 3 &&
        Array.from({ length: count }).map((_, index) => (
          <Avatar
            key={index}
            className="h-6 w-6 rounded-full border-2 border-white shadow-md"
          />
        ))}
    </div>
    <span className="text-xs text-zinc-600">
      {count === 0
        ? "No reviews yet"
        : `${count} review${count !== 1 ? "s" : ""}`}
    </span>
  </>
);

const ActionButton = ({
  status,
  price,
  handleClick,
}: {
  status: string;
  price: number;
  handleClick: () => void;
}) => {
  if (status === PAPER_STATUS.PUBLISHED) {
    return (
      <Button className="flex w-full items-center justify-center bg-zinc-800 text-xs hover:bg-zinc-700 sm:w-[120px]">
        <SolanaLogo className="mr-2 h-3 w-3" />
        {price} SOL
      </Button>
    );
  }
  if (status === PAPER_STATUS.PEER_REVIEWING) {
    return (
      <Button
        className="group relative flex w-full items-center justify-center overflow-hidden bg-zinc-800 text-xs font-semibold hover:bg-zinc-700 sm:w-auto"
        onClick={handleClick}
      >
        <span className="relative z-10 px-4 py-2">Write Review</span>
        <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-violet-400 via-pink-500 to-red-500 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-75"></span>
      </Button>
    );
  }
  return null;
};
