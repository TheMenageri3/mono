/*
  Warnings:

  - You are about to drop the column `isHybrid` on the `DAO` table. All the data in the column will be lost.
  - You are about to drop the column `isSubDAO` on the `DAO` table. All the data in the column will be lost.
  - You are about to drop the column `publicKey` on the `DAO` table. All the data in the column will be lost.
  - You are about to drop the column `subDAOCreationThreshold` on the `DAO` table. All the data in the column will be lost.
  - You are about to drop the column `treasuryId` on the `DAO` table. All the data in the column will be lost.
  - The primary key for the `Proposal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Proposal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `daoId` on the `Treasury` table. All the data in the column will be lost.
  - Added the required column `maxExpiry` to the `DAO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minQuorum` to the `DAO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minThreshold` to the `DAO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nQuorumEpoch` to the `DAO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposalAnalysisPeriod` to the `DAO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposalFeeBounty` to the `DAO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposalFeeExecutable` to the `DAO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposalFeeVote` to the `DAO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposalFeeVoteMultiple` to the `DAO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thresholdCreateProposal` to the `DAO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vetoCouncil` to the `DAO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `analysisPeriod` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposalType` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threshold` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uri` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `endDate` on the `Proposal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `proposalId` on the `Vote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProposalType" AS ENUM ('VOTE_MULTIPLE_CHOICE', 'BOUNTY', 'VOTE', 'EXECUTABLE');

-- AlterEnum
ALTER TYPE "ProposalStatus" ADD VALUE 'CANCELED';

-- DropForeignKey
ALTER TABLE "DAO" DROP CONSTRAINT "DAO_treasuryId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_proposalId_fkey";

-- DropIndex
DROP INDEX "DAO_treasuryId_key";

-- DropIndex
DROP INDEX "Treasury_daoId_key";

-- AlterTable
ALTER TABLE "DAO" DROP COLUMN "isHybrid",
DROP COLUMN "isSubDAO",
DROP COLUMN "publicKey",
DROP COLUMN "subDAOCreationThreshold",
DROP COLUMN "treasuryId",
ADD COLUMN     "collectionTokenId" TEXT,
ADD COLUMN     "createSubdaoFee" DECIMAL(65,30),
ADD COLUMN     "maxExpiry" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "minQuorum" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "minThreshold" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "nQuorumEpoch" INTEGER NOT NULL,
ADD COLUMN     "proposalAnalysisPeriod" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "proposalFeeBounty" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "proposalFeeExecutable" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "proposalFeeVote" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "proposalFeeVoteMultiple" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "thresholdCreateProposal" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "thresholdCreateSubDao" DECIMAL(65,30),
ADD COLUMN     "vetoCouncil" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_pkey",
ADD COLUMN     "analysisPeriod" INTEGER NOT NULL,
ADD COLUMN     "proposalType" "ProposalType" NOT NULL,
ADD COLUMN     "proposalTypeData" JSONB,
ADD COLUMN     "threshold" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "uri" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "endDate",
ADD COLUMN     "endDate" INTEGER NOT NULL,
ADD CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Treasury" DROP COLUMN "daoId";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "proposalId",
ADD COLUMN     "proposalId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DAO" ADD CONSTRAINT "DAO_collectionTokenId_fkey" FOREIGN KEY ("collectionTokenId") REFERENCES "Token"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
