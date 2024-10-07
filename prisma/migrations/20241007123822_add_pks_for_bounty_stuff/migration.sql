/*
  Warnings:

  - Added the required column `creatorPk` to the `Bounty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicKey` to the `Bounty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorPk` to the `BountyApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicKey` to the `BountyApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bounty" ADD COLUMN     "creatorPk" TEXT NOT NULL,
ADD COLUMN     "publicKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BountyApplication" ADD COLUMN     "creatorPk" TEXT NOT NULL,
ADD COLUMN     "publicKey" TEXT NOT NULL;
