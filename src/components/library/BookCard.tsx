"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book } from "@/data/books";

interface BookCardProps {
    book: Book;
    index: number;
}

export function BookCard({ book, index }: BookCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link href={`/read/${book.id}/${book.chapters[0].id}`} className="group block h-full">
                <div className="relative aspect-[2/3] overflow-hidden border border-transparent group-hover:border-primary transition-colors duration-300">
                    <Image
                        src={book.coverUrl}
                        alt={book.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                </div>
                <div className="mt-4 space-y-2 border-l-2 border-transparent pl-3 group-hover:border-primary transition-all duration-300">
                    <h3 className="font-serif text-2xl font-medium leading-none group-hover:translate-x-1 transition-transform duration-300">
                        {book.title}
                    </h3>
                    <p className="museum-label text-xs text-muted-foreground">{book.author}</p>
                </div>
            </Link>
        </motion.div>
    );
}
