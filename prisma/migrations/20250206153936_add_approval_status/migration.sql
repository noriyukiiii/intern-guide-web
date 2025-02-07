-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "approvalStatus" TEXT NOT NULL DEFAULT 'pending';

-- CreateTable
CREATE TABLE "CompanyCreator" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyCreator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyCreator_userId_companyId_key" ON "CompanyCreator"("userId", "companyId");

-- AddForeignKey
ALTER TABLE "CompanyCreator" ADD CONSTRAINT "CompanyCreator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyCreator" ADD CONSTRAINT "CompanyCreator_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
