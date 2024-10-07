import styles from "~/styles/table.module.css";
import { getServerAuthSession } from "~/server/auth";
import campaignsJSON from "~/constants/campaigns.json";
import { type Campaign } from "~/server/api/routers/campaign/read";
import { CrownfundingContent } from "~/content/build/content";
import { DaoContent } from "~/content/build/dao/context";
import { Decimal } from "@prisma/client/runtime/library";
import { DAO } from "~/server/api/routers/dao/read";
import { DAOType, ProposalStatus, ProposalType } from "@prisma/client";
import ManageDAO from "~/content/build/dao/manage/content";
import { number } from "zod";
// import { DAO } from "@prisma/client";
// const getDAO = async (): Promise<DAO> => {
//   return {
//     id: "dfkljsew4kdsf",
//     name: "Art DAO Collective",
//     description:
//       "An art-focused DAO that funds and supports digital creators across the globe.",
//     type: DAOType.NFT,
//     tokenId: null,
//     collectionTokenId: "nft123",
//     circulatingSupply: new Decimal(500),
//     proposalFeeBounty: new Decimal(10),
//     proposalFeeExecutable: new Decimal(20),
//     proposalFeeVote: new Decimal(5),
//     proposalFeeVoteMultiple: new Decimal(15),
//     maxExpiry: new Decimal(10000000000),
//     minThreshold: new Decimal(100),
//     minQuorum: new Decimal(20),
//     proposalAnalysisPeriod: new Decimal(60),
//     nQuorumEpoch: 3,
//     thresholdCreateProposal: new Decimal(50),
//     vetoCouncil: "veto_council_pubkey",
//     allowSubDAO: true,
//     thresholdCreateSubDao: new Decimal(250),
//     createSubdaoFee: new Decimal(100),
//     proposals: [
//       {
//         id: "1",
//         title: "Proposal 1",
//         description: "Description 1",
//         publicKey: "proposal001",
//         quorum: new Decimal(50),
//         threshold: new Decimal(200),
//         endDate: 10000000,
//         proposalType: ProposalType.BOUNTY,
//         proposalTypeData: {
//           "type": "BOUNTY",
//           "pubkey": "some_pubkey",
//           "amount": 1000
//         },
//         analysisPeriod: 100,
//         uri: "https://ipfs.tech",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         daoId: "dfkljsew4kdsf",
//         creatorId: "art_creator_1",
//         forVotes: 10,
//         againstVotes: 5,
//         abstainVotes: 2,
//         status: ProposalStatus.PENDING,
//       },
//     ],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     parentDAOId: null,
//     creatorId: "art_creator_1",
//     creator: {
//       id: "artist001",
//       name: "Alice Doe",
//       username: "alice_artist",
//       email: "alice@example.com",
//       emailVerified: new Date(),
//       bio: "Digital artist specializing in generative art.",
//       image: "alice_image_url",
//       isVerified: true,
//       hasFailedVerification: false,
//       isAdmin: true,
//       roles: [],
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       domains: [],
//     },
//     treasuryId: "treasury001",
//     treasury: {
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       id: "treasury001",
//       daoId: "dfkljsew4kdsf",
//       balance: new Decimal(1200),
//     },
//   };
// };
async function DAOs() {
  // const dao = await getDAO();
  // table data

  return (
    <div className={styles.main}>
      <div className="container mx-auto px-4 py-8">
        {/* <ManageDAO dao={dao} /> */}
      </div>
    </div>
  );
}

export default DAOs;
