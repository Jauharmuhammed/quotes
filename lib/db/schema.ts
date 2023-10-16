import { relations, sql } from "drizzle-orm";
import {
    boolean,
    integer,
    pgTable,
    primaryKey,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const authors = pgTable("authors", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).unique().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const categoryRelations = relations(categories, ({ many }) => ({
    posts: many(quotesOnCategories),
}));

export const quotes = pgTable("quotes", {
    id: serial("id").primaryKey(),
    contend: text("content").unique().notNull(),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    authorId: integer("author_id")
        .references(() => authors.id)
        .notNull(),
});

export const quotesRelations = relations(quotes, ({ many }) => ({
    postCategories: many(quotesOnCategories),
}));

export const quotesOnCategories = pgTable(
    "quotes_categories",
    {
        quotesId: integer("quotes_id")
            .notNull()
            .references(() => quotes.id),
        categoryId: integer("category_id")
            .notNull()
            .references(() => categories.id),
    },
    (t) => ({
        pk: primaryKey(t.quotesId, t.categoryId),
    })
);

export const quotesOnCategoriesRelations = relations(quotesOnCategories, ({ one }) => ({
    post: one(quotes, {
        fields: [quotesOnCategories.quotesId],
        references: [quotes.id],
    }),

    category: one(categories, {
        fields: [quotesOnCategories.categoryId],
        references: [categories.id],
    }),
}));
