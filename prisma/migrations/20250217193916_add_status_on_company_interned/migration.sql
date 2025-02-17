-- CreateEnum
CREATE TYPE "approvalStatus" AS ENUM ('pending', 'approved', 'rejected');

-- DropForeignKey
ALTER TABLE "CompanyCreator" DROP CONSTRAINT "CompanyCreator_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyCreator" DROP CONSTRAINT "CompanyCreator_userId_fkey";

-- AlterTable
ALTER TABLE "Company_Student_Interned" ADD COLUMN     "status" "approvalStatus" NOT NULL DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE "CompanyCreator" ADD CONSTRAINT "CompanyCreator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyCreator" ADD CONSTRAINT "CompanyCreator_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
