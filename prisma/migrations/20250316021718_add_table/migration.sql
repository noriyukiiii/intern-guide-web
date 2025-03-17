-- DropForeignKey
ALTER TABLE "CompanyCreator" DROP CONSTRAINT "CompanyCreator_userId_fkey";

-- CreateTable
CREATE TABLE "CompanyAppeal" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "approvalStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CompanyAppeal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompanyCreator" ADD CONSTRAINT "CompanyCreator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAppeal" ADD CONSTRAINT "CompanyAppeal_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAppeal" ADD CONSTRAINT "CompanyAppeal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
