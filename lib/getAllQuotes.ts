import { eq } from "drizzle-orm";
import { db } from "./db";
import { authors, categories, quotes, quotesOnCategories } from "./db/schema";

export default async function getAllQuotes(): Promise<Quote[]> {
    const result = await db
        .select({
            content: quotes.contend,
            author: authors.name,
            categories: categories.name,
        })
        .from(quotes)
        .innerJoin(authors, eq(quotes.authorId, authors.id))
        .innerJoin(quotesOnCategories, eq(quotes.id, quotesOnCategories.quotesId))
        .innerJoin(categories, eq(quotesOnCategories.categoryId, categories.id));

    return result;
}
