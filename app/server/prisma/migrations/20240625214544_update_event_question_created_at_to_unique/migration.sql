/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `EventQuestion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EventQuestion_createdAt_key" ON "EventQuestion"("createdAt");
