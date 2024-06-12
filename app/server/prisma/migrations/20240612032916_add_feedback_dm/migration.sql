-- AlterTable
ALTER TABLE "EventLiveFeedback" ADD COLUMN     "dmRecipientId" UUID,
ADD COLUMN     "isDM" BOOLEAN NOT NULL DEFAULT false;
