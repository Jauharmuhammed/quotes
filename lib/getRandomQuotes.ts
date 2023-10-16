import { eq, ne } from "drizzle-orm";
import { db } from "./db";
import { authors, categories, quotes, quotesOnCategories } from "./db/schema";

const prevQuoteObj = {
    prev: 1,
    setPrev: function (num: number) {
        this.prev = num;
    },
};

export default async function getRandomQuotes(): Promise<Quote> {
    const result = await db
        .select({
            content: quotes.contend,
            author: authors.name,
            categories: categories.name,
        })
        .from(quotes)
        .innerJoin(authors, eq(quotes.authorId, authors.id))
        .leftJoin(quotesOnCategories, eq(quotes.id, quotesOnCategories.quotesId))
        .leftJoin(categories, eq(quotesOnCategories.categoryId, categories.id))
        .where(ne(quotes.id, 0));

    let randomIndex = prevQuoteObj.prev;

    while (randomIndex === prevQuoteObj.prev) {
        randomIndex = Math.floor(Math.random() * result.length);
    }

    prevQuoteObj.setPrev(randomIndex);

    return result[randomIndex];
}
