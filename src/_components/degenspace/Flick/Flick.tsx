"use client";
import {
  type FlickResponse,
  type Flick,
} from "~/server/api/routers/flick/read";
import P from "../P";
import { FlickAction, FlickActions } from "./FlickActions";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ResponseModal } from "../Modal/PostModal";
import { api } from "~/trpc/react";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import Image from "next/image";
import PaperCard from "~/_components/final/Paper/PaperCard";
import { aliceResponse, bobResponse } from "~/seed/flick";

interface FlickProps {
  flick: Flick;
  session: Session;
}

const paper = {
  id: "cl9wvqzh9000000l8mzt6f300",
  user_id: "cjo0grj7u0005x0s9esb6sjrg",
  paper_pubkey: null,
  title: "Ephemeral Rollups are All you Need",
  status: "peer_reviewing",
  authors: ["Gabriele Picco", "Andrea Fortugno"],
  domains: ["Rollups", "Solana", "L2"],
  description: `In the realm of open and composable gaming, we envision platforms
where users actively expand, create, engage, and immerse themselves in
a rich world of entertainment. One promising avenue for achieving this
vision is through fully on-chain (FOC) games, where both game state
and logic reside on the blockchain, maximizing composability. However,
we must grapple with inherent limitations and trade-offs, particularly in
terms of costs and scalability. This paper proposes a framework that
leverages the Solana Virtual Machine (SVM) to scale FOC games without
state fragmentation or compromised trust assumptions. The framework
introduces a systematic approach for discovering, utilizing, and publishing modular pieces of logic as components deeply rooted in the EntityComponent-System (ECS) pattern. To enhance scalability and resource
optimization, we introduce the concept of Ephemeral Rollups (ERs) that
overcome the tradeoffs of L2s horizontal scaling. These dedicated runtimes can be customized to provide higher operational speed, configurable
ticking mechanisms, provable sessions and gasless transactions without
composability-scalability tradeoffs`,
  price: null,
  image_url: "https://example.com/image1.png",
  pdf_url: "https://example.com/pdf1.pdf",
  minted: [],
  version: 1,
  created_at: "2024-01-10T10:00:00.000Z",
  updated_at: null,
  peer_reviews: [
    {
      id: "rev1",
      title: "Promising Research",
      description:
        "This paper shows great potential in advancing medical imaging diagnostics.",
      created_at: "2024-01-15T09:00:00.000Z",
      updated_at: "2024-01-16T11:30:00.000Z",
      rating: 4.5,
      reviewers: {
        id: "user1",
        name: "Elon Musk",
      },
      user_id: "cjo0grj7u0005x0s9esb6sjrg",
      paper_id: "cl9wvqzh9000000l8mzt6f300",
    },
    {
      id: "rev2",
      title: "Innovative Approach",
      description:
        "The authors present an innovative approach to AI-driven diagnostics.",
      created_at: "2024-01-17T10:15:00.000Z",
      updated_at: "2024-01-18T14:00:00.000Z",
      rating: 4.7,
      reviewers: {
        id: "user2",
        name: "Frank Green",
      },
      user_id: "cjo0grj7u0005x0s9esb6sjrg",
      paper_id: "cl9wvqzh9000000l8mzt6f300",
    },
  ],
};

export const FlickComponent: React.FC<FlickProps> = ({ flick, session }) => {
  const [flickResponses, setFlickResponses] = useState<FlickResponse[]>(
    flick.responses,
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isResponseModalOpen, setIsResponseModalOpen] =
    useState<boolean>(false);
  const likeFlick = api.flick.likeFlick.useMutation();
  const unlikeFlick = api.flick.unlikeFlick.useMutation();
  const saveFlick = api.flick.saveFlick.useMutation();
  const unsaveFlick = api.flick.unsaveFlick.useMutation();
  const likedCurrentFlick = !!flick.likedBy.find(
    (liker) => liker.id === session.user.id,
  );
  const savedCurrentFlick = !!flick.savedBy.find(
    (saver) => saver.id === session.user.id,
  );
  const createFlickResponseAdmin = api.flick.createResponseAdmin.useMutation();

  const onClose = () => {
    createFlickResponseAdmin.mutate(
      {
        description: aliceResponse,
        parentId: flick.id,
        username: "aliceanonymous",
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
      },
    );
  };

  const flickActions: FlickAction[] = [
    {
      name: "Like",
      iconPath: "/spock.svg",
      count: 10,
      onClick: () => {
        return likedCurrentFlick
          ? unlikeFlick.mutate(
              {
                flickId: flick.id,
              },
              {
                onSuccess: () => {
                  toast.success("Like Removed from post");

                  window.location.reload();
                },
              },
            )
          : likeFlick.mutate(
              {
                flickId: flick.id,
              },
              {
                onSuccess: () => {
                  toast.success("Liked post");
                  window.location.reload();
                },
              },
            );
      },
      active: likedCurrentFlick,
    },
    {
      name: "reply",
      iconPath: "/reply.svg",
      count: 12,
      onClick: () => setIsResponseModalOpen(true),
    },
    {
      name: "Save",
      iconPath: "/bookmark.svg",
      count: 5,
      onClick: () => {
        return savedCurrentFlick
          ? unsaveFlick.mutate(
              {
                flickId: flick.id,
              },
              {
                onSuccess: () => {
                  toast.success("Post Unsaved");
                  window.location.reload();
                },
              },
            )
          : saveFlick.mutate(
              {
                flickId: flick.id,
              },
              {
                onSuccess: () => {
                  toast.success("Post Saved");
                  window.location.reload();
                },
              },
            );
      },
      active: savedCurrentFlick,
    },
    // {
    //   name: "share",
    //   iconPath: "/share.svg",
    //   count: 20,
    // },
  ];
  return (
    <div className="mb-4 border-b border-zinc-200 pb-4">
      <div className="flex cursor-pointer items-start gap-3">
        <ColorfulAvatar name={flick.creator?.name ?? ""} size={40} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <P className="text-sm font-bold text-zinc-900">
              {flick.creator?.name ?? ""}
            </P>
            <P className="text-sm text-zinc-500">
              {flick.creator?.username ?? ""}
            </P>
          </div>
          <P className="mt-2 text-sm text-zinc-800">{flick.description}</P>
          {flick.creator?.name === "Gabriele Picco" && (
            <div className="mt-4">
              <PaperCard
                key={paper.id}
                title={paper.title}
                authors={paper.authors}
                /** TODO: FOR DEMO ONLY SHOW FIRST DOMAIN */
                domain={paper.domains[0] ?? ""}
                /** TODO: FOR DEMO ONLY SHOW MINTED LENGTH */
                minted={paper.minted.length * 123}
                price={paper.price ?? 0}
                status={paper.status}
                id={paper.id}
                reviewers={paper.peer_reviews.length}
                alternateLayout={true}
              />
            </div>
          )}
          <div className="mt-3 flex w-full items-center justify-between">
            {flickResponses.length > 0 ? (
              isExpanded ? (
                <ChevronDown
                  onClick={() => setIsExpanded(false)}
                  className="text-primary"
                />
              ) : (
                <ChevronRight
                  onClick={() => setIsExpanded(true)}
                  className="text-primary"
                />
              )
            ) : (
              <div></div>
            )}
            <FlickActions flickActions={flickActions} />
          </div>
        </div>
      </div>

      {isExpanded &&
        flick.hasOwnProperty("responses") &&
        flickResponses.length > 0 && (
          <div className="ml-12 mt-4 border-l-2 border-zinc-200 pl-4">
            {flickResponses.map((response) => (
              <FlickResponseComponent
                key={response.id}
                flickResponse={response}
              />
            ))}
          </div>
        )}
      <ResponseModal
        flick={flick}
        isOpen={isResponseModalOpen}
        onClose={() => onClose()}
        closeResponseModal={() => {
          setFlickResponses([
            ...flickResponses,
            {
              id: "res1",
              description: bobResponse,
              creator: {
                id: "bobbuilder",
                name: "Bob Builder",

                createdAt: new Date(),
                updatedAt: new Date(),
                username: "bobbuilder",
                email: "bobbuilder@example.com",
                emailVerified: new Date(),
                bio: "I am Bob Builder",
                domains: [],
                image: null,
                isVerified: false,
                hasFailedVerification: false,
                isAdmin: false,
                roles: [],
              },
              title: "Bob Builder",
              createdAt: new Date(),
              updatedAt: new Date(),
              creatorId: "bobbuilder",
              parentId: flick.id,
            },
          ]);
          setIsResponseModalOpen(false);
        }}
      />
    </div>
  );
};

interface FlickResponseProps {
  flickResponse: FlickResponse;
}
export const FlickResponseComponent: React.FC<FlickResponseProps> = ({
  flickResponse,
}) => {
  return (
    <div className="mb-4 border-b border-zinc-200 pb-4">
      <div className="flex cursor-pointer items-start gap-3">
        <ColorfulAvatar name={flickResponse.creator?.name ?? ""} size={40} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <P className="text-sm font-bold text-zinc-900">
              {flickResponse.creator?.name ?? ""}
            </P>
            <P className="text-sm text-zinc-500">
              {flickResponse.creator?.username ?? ""}
            </P>
          </div>
          <P className="mt-2 text-sm text-zinc-800">
            {flickResponse.description}
          </P>
        </div>
      </div>
    </div>
  );
};

interface ColorfulAvatarProps {
  name: string;
  size?: number;
}

export const ColorfulAvatar: React.FC<ColorfulAvatarProps> = ({
  name,
  size = 40,
}) => {
  if (name === "Alice Anonymous") {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <Image
          src="/alice.png"
          layout="fill"
          className="rounded-full"
          alt="aliceanonymous"
          sizes="40px 40px"
          objectFit="cover"
        />
      </div>
    );
  } else if (name === "Gabriele Picco") {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <Image
          src="/gabi.png"
          layout="fill"
          className="rounded-full"
          alt="gabrielepicco"
          sizes="40px 40px"
          objectFit="cover"
        />
      </div>
    );
  } else if (name === "Anatoly Yakovenko") {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <Image
          src="/anatoly.png"
          layout="fill"
          className="rounded-full"
          alt="anatoly"
          sizes="40px 40px"
          objectFit="cover"
        />
      </div>
    );
  } else if (name === "Spaceman Dev") {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <Image
          src="/spacemandev.png"
          layout="fill"
          className="rounded-full"
          alt="spacemandev"
          objectFit="cover"
          sizes="40px 40px"
        />
      </div>
    );
  } else if (name === "Rawlo Dawgins") {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <Image
          src="/rawlo.png"
          layout="fill"
          className="rounded-full"
          alt="rawlo"
          objectFit="cover"
          sizes="40px 40px"
        />
      </div>
    );
  } else if (name === "Barrett Williams") {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <Image
          src="/barrett.png"
          layout="fill"
          className="rounded-full"
          alt="barrett"
          objectFit="cover"
          sizes="40px 40px"
        />
      </div>
    );
  } else if (name === "Bob Builder") {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <Image
          src="/bob.png"
          layout="fill"
          className="rounded-full"
          alt="bobbuilder"
          sizes="40px 40px"
          objectFit="cover"
        />
      </div>
    );
  }
  const getColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(
      Math.abs((Math.sin(hash) * 16777215) % 1) * 16777215,
    ).toString(16);
    return "#" + "0".repeat(6 - color.length) + color;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 1);
  };

  const color = getColor(name);
  const initials = getInitials(name);

  return (
    <div
      style={{
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "bold",
        fontSize: `${size / 3}px`,
      }}
    >
      {initials}
    </div>
  );
};
