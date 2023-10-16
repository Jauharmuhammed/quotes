import getRandomQuotes from "@/lib/getRandomQuotes";
import { cn } from "@/lib/utils";
import { Nunito_Sans } from "next/font/google";

const NunitoSans = Nunito_Sans({ subsets: ["latin"] });

export default async function Home() {
    const quote = await getRandomQuotes();

    return (
        <main
            className={cn(
                NunitoSans.className,
                " w-full min-h-screen h-full flex flex-col justify-center max-w-4xl mx-auto"
            )}>
            <q className="text-6xl font-black whitespace-pre-line" contentEditable>{quote?.content}</q>
            <p className="self-start mt-8 text-xl">-&nbsp;{quote?.author}</p>
        </main>
    );
}
