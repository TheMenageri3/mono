import { relations } from "drizzle-orm";
import { documentQuestion } from ".";
import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export type DocumentType = "Assignment" | "Class" | "Event";

const document = pgTable("document", {
  id: uuid().defaultRandom().primaryKey(),
  createdById: uuid().notNull(),
  type: text().$type<DocumentType>().notNull(),
  metadata: jsonb(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const documentRelations = relations(document, ({ many }) => ({
  document: many(documentQuestion),
}));

export default document;
