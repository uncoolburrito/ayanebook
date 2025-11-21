import { notFound } from "next/navigation";
import { books } from "@/data/books";
import { ReaderShell } from "@/components/reader/ReaderShell";

interface PageProps {
    params: Promise<{
        slug: string;
        chapter: string;
    }>;
}

export async function generateStaticParams() {
    return books.flatMap((book) =>
        book.chapters.map((chapter) => ({
            slug: book.id,
            chapter: chapter.id,
        }))
    );
}

export default async function ReaderPage({ params }: PageProps) {
    const { slug, chapter: chapterId } = await params;

    const book = books.find((b) => b.id === slug);
    if (!book) notFound();

    const chapterIndex = book.chapters.findIndex((c) => c.id === chapterId);
    if (chapterIndex === -1) notFound();

    const chapter = book.chapters[chapterIndex];
    const nextChapter = book.chapters[chapterIndex + 1];
    const prevChapter = book.chapters[chapterIndex - 1];

    return (
        <ReaderShell
            book={book}
            chapter={chapter}
            nextChapter={nextChapter}
            prevChapter={prevChapter}
        />
    );
}
