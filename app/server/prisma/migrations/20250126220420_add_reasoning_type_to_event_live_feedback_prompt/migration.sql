-- CreateEnum
CREATE TYPE "ReasoningType" AS ENUM ('DISABLED', 'OPTIONAL', 'REQUIRED');

-- AlterTable
ALTER TABLE "EventLiveFeedbackPrompt" ADD COLUMN     "reasoningType" "ReasoningType" NOT NULL DEFAULT 'OPTIONAL';
