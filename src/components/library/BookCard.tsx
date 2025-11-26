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
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-sm group-hover:shadow-xl transition-all duration-300 ease-out">
                    <Image
                        src={book.coverUrl}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
                <div className="mt-3 space-y-1">
                    <h3 className="font-semibold text-sm md:text-base leading-tight text-foreground group-hover:text-primary transition-colors">
                        {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
            </Link>
        </motion.div>
    );
}
