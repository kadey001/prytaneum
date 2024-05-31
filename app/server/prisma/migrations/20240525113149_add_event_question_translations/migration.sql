-- CreateTable
CREATE TABLE "EventQuestionTranslations" (
    "id" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "questionTranslations" JSON NOT NULL,

    CONSTRAINT "EventQuestionTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventQuestionTranslations_questionId_key" ON "EventQuestionTranslations"("questionId");

-- AddForeignKey
ALTER TABLE "EventQuestionTranslations" ADD CONSTRAINT "EventQuestionTranslations_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "EventQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
