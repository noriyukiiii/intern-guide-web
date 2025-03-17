/*
  Warnings:

  - Added the required column `companyName` to the `CompanyAppeal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyAppeal" DROP CONSTRAINT "CompanyAppeal_companyId_fkey";

-- AlterTable
ALTER TABLE "CompanyAppeal" ADD COLUMN     "companyName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CompanyAppeal" ADD CONSTRAINT "CompanyAppeal_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
