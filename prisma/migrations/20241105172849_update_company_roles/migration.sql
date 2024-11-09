/*
  Warnings:

  - The values [OWNER,ADMIN,MEMBER] on the enum `CompanyRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CompanyRole_new" AS ENUM ('C_LEVEL', 'INDIVIDUAL_CONTRIBUTOR', 'MANAGER');
ALTER TABLE "CompanyUser" ALTER COLUMN "role" TYPE "CompanyRole_new" USING ("role"::text::"CompanyRole_new");
ALTER TYPE "CompanyRole" RENAME TO "CompanyRole_old";
ALTER TYPE "CompanyRole_new" RENAME TO "CompanyRole";
DROP TYPE "CompanyRole_old";
COMMIT;
