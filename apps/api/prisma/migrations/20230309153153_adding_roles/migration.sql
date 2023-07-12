-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Editor');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Editor';
