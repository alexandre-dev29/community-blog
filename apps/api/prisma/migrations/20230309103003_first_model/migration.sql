-- CreateTable
CREATE TABLE "AuthUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "refreshToken" TEXT,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "isPhoneConfirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AuthUser_pkey" PRIMARY KEY ("id")
);
