-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "issue" VARCHAR(150) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "EventQuestion" ADD COLUMN     "onDeckPosition" VARCHAR(14) NOT NULL DEFAULT '-1',
ALTER COLUMN "isVisible" SET DEFAULT true;

-- AlterTable
ALTER TABLE "EventQuestionTopic" ADD COLUMN     "position" VARCHAR(14) NOT NULL DEFAULT '-1';
