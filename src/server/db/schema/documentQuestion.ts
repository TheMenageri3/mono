import { pgTable, uuid, timestamp, integer } from "drizzle-orm/pg-core";
import document from "./document";
import { relations } from "drizzle-orm";
import question from "./question";

const documentQuestion = pgTable("document_question", {
  id: uuid().defaultRandom().primaryKey(),
  documentId: uuid().references(() => document.id),
  questionId: uuid().references(() => question.id),
  order: integer().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const documentQuestionRelations = relations(
  documentQuestion,
  ({ one }) => ({
    document: one(document, {
      fields: [documentQuestion.documentId],
      references: [document.id],
    }),
    question: one(question, {
      fields: [documentQuestion.questionId],
      references: [question.id],
    }),
  })
);

export default documentQuestion;
