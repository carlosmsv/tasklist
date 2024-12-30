-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TO_DO', 'DONE', 'IN_PROGRESS');

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
