-- DropForeignKey
ALTER TABLE "CompanyCreator" DROP CONSTRAINT "CompanyCreator_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyCreator" DROP CONSTRAINT "CompanyCreator_userId_fkey";

-- AddForeignKey
ALTER TABLE "CompanyCreator" ADD CONSTRAINT "CompanyCreator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyCreator" ADD CONSTRAINT "CompanyCreator_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
