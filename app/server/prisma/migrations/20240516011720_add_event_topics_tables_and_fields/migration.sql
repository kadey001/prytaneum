-- AlterTable
ALTER TABLE "EventQuestion" ADD COLUMN     "offensive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "relevant" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "substantive" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "EventTopic" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "topic" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500) NOT NULL,

    CONSTRAINT "EventTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventQuestionTopic" (
    "questionId" UUID NOT NULL,
    "topicId" UUID NOT NULL,

    CONSTRAINT "EventQuestionTopic_pkey" PRIMARY KEY ("questionId","topicId")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventTopic_eventId_topic_key" ON "EventTopic"("eventId", "topic");

-- AddForeignKey
ALTER TABLE "EventTopic" ADD CONSTRAINT "EventTopic_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventQuestionTopic" ADD CONSTRAINT "EventQuestionTopic_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "EventQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventQuestionTopic" ADD CONSTRAINT "EventQuestionTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "EventTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
