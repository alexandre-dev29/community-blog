/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostsToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostsToTags" DROP CONSTRAINT "_PostsToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostsToTags" DROP CONSTRAINT "_PostsToTags_B_fkey";

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "Tags" TEXT[];

-- DropTable
DROP TABLE "Tags";

-- DropTable
DROP TABLE "_PostsToTags";
