/*
  Warnings:

  - You are about to drop the column `readingMaterialsUrl` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "readingMaterialsUrl",
ADD COLUMN     "issueGuideUrl" VARCHAR(500) NOT NULL DEFAULT '';
