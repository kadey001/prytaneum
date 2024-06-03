-- AlterTable
ALTER TABLE "EventBroadcastMessage" ADD COLUMN     "broadcastMessageTranslations" JSON NOT NULL DEFAULT '{}',
ALTER COLUMN "lang" SET DEFAULT 'EN';
