-- DropForeignKey
ALTER TABLE "CompanyCreator" DROP CONSTRAINT "CompanyCreator_companyId_fkey";

-- AddForeignKey
ALTER TABLE "CompanyCreator" ADD CONSTRAINT "CompanyCreator_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
