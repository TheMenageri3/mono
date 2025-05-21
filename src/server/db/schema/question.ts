import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { DocumentType } from "./document";
import { relations } from "drizzle-orm";
import { documentQuestion } from ".";

const question = pgTable("question", {
  id: uuid().defaultRandom().primaryKey(),
  createdById: uuid().notNull(),
  type: text().$type<DocumentType>().notNull(),
  text: text().notNull(),
  metadata: jsonb(),
  uri: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const questionRelations = relations(question, ({ many }) => ({
  documentQuestions: many(documentQuestion),
}));

export default question;
