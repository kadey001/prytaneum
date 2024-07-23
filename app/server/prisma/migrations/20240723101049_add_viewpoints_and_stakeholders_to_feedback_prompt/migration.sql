-- AlterTable
ALTER TABLE "EventLiveFeedbackPrompt" ADD COLUMN     "stakeholders" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "viewpoints" TEXT[] DEFAULT ARRAY[]::TEXT[];
