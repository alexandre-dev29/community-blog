-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "postTotalLikes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "postTotalShares" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Subscribers" (
    "id" TEXT NOT NULL,
    "emailAdress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_emailAdress_key" ON "Subscribers"("emailAdress");
