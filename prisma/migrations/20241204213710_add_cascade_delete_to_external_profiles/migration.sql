-- DropForeignKey
ALTER TABLE "ExternalProfile" DROP CONSTRAINT "ExternalProfile_userId_fkey";

-- AddForeignKey
ALTER TABLE "ExternalProfile" ADD CONSTRAINT "ExternalProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
