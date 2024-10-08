export const minimizePubkey = (pubkey: string) => {
  return pubkey.slice(0, 4) + "..." + pubkey.slice(-4);
};
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Globe, Twitter, Github, Linkedin, Facebook } from "lucide-react";
import { Rating } from "../validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum Role {
  Researcher = "Researcher",
  Reader = "Reader",
}

// Generate random gradient
const gradients = [
  "linear-gradient(to bottom, #4318FF, #9574E2)",
  "linear-gradient(to bottom, #FFAD08, #9574E2)",
  "linear-gradient(to bottom, #00B69B, #9574E2)",
  "linear-gradient(to bottom, #DC6262, #9574E2)",
  "linear-gradient(to bottom, #919393, #9574E2)",
  "linear-gradient(to bottom, #FF1875, #9574E2)",
  "linear-gradient(to bottom, #51A637, #9574E2)",
  "linear-gradient(to bottom, #A984FF, #9574E2)",
];

export const getGradientForPaper = (paperId: string): string => {
  const index = parseInt(paperId.slice(-1), 16) % gradients.length;
  return gradients[index] ?? "linear-gradient(to bottom, #4318FF, #9574E2)";
};

// Format large numbers with 'k' for thousands
export const formatNumber = (num: number): string => {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
};

// Format time ago
export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const absoluteDiffInSeconds = Math.abs(diffInSeconds);

  const timeUnits = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const { unit, seconds } of timeUnits) {
    const interval = Math.floor(absoluteDiffInSeconds / seconds);
    if (interval >= 1) {
      const suffix = interval === 1 ? "" : "s";
      return diffInSeconds < 0
        ? `in ${interval} ${unit}${suffix}`
        : `${interval} ${unit}${suffix} ago`;
    }
  }

  return "just now";
};

// Get score color
export const getScoreColorClass = (score: number): string => {
  if (score >= 4) return "bg-primary";
  if (score >= 3) return "bg-yellow-500";
  return "bg-rose-500/80";
};

// We need this because frontend uses a 1-5 scale, while the program uses a 1-10 scale.
export const ratingToReview = (
  rating: Rating,
  title: string,
  reviewComments: string,
) => {
  return {
    qualityOfResearch: rating.qualityOfResearch * 2,
    potentialForRealWorldUseCase: rating.potentialForRealWorldUseCase * 2,
    domainKnowledge: rating.domainKnowledge * 2,
    practicalityOfResultObtained: rating.practicalityOfResultObtained * 2,
    metadata: {
      title,
      reviewComments,
    },
  };
};

// Get link icon
export const getLinkIcon = (url: string) => {
  if (!url) return null;

  const domain = new URL(url).hostname.toLowerCase();

  if (domain.includes("twitter.com") || domain.includes("x.com")) {
    return Twitter;
  } else if (domain.includes("github.com")) {
    return Github;
  } else if (domain.includes("linkedin.com")) {
    return Linkedin;
  } else if (domain.includes("facebook.com")) {
    return Facebook;
  } else {
    return Globe;
  }
};
