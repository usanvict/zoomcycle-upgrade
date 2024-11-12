/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MembershipType" AS ENUM ('PAID', 'WALK_IN');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "participants" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "membership" "MembershipType" NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spinning_classes" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "trainerName" TEXT NOT NULL,
    "music" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "paidMembers" INTEGER NOT NULL DEFAULT 0,
    "walkIns" INTEGER NOT NULL DEFAULT 0,
    "trainerId" INTEGER NOT NULL,

    CONSTRAINT "spinning_classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_registrations" (
    "participantId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_registrations_pkey" PRIMARY KEY ("participantId","classId")
);

-- CreateTable
CREATE TABLE "trainers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "trainers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpinningClassToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "participants_email_key" ON "participants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "trainers_email_key" ON "trainers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_SpinningClassToUser_AB_unique" ON "_SpinningClassToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SpinningClassToUser_B_index" ON "_SpinningClassToUser"("B");

-- AddForeignKey
ALTER TABLE "spinning_classes" ADD CONSTRAINT "spinning_classes_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_registrations" ADD CONSTRAINT "class_registrations_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_registrations" ADD CONSTRAINT "class_registrations_classId_fkey" FOREIGN KEY ("classId") REFERENCES "spinning_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpinningClassToUser" ADD CONSTRAINT "_SpinningClassToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "spinning_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpinningClassToUser" ADD CONSTRAINT "_SpinningClassToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
