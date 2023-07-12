/*
  Warnings:

  - You are about to drop the column `emailAdress` on the `Subscribers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Subscribers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Subscribers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Subscribers_emailAdress_key";

-- AlterTable
ALTER TABLE "Subscribers" DROP COLUMN "emailAdress",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_email_key" ON "Subscribers"("email");
