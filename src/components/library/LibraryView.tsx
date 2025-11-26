"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Book } from "@/data/books";
import { BookCard } from "./BookCard";

interface LibraryViewProps {
    books: Book[];
}

export function LibraryView({ books }: LibraryViewProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border-none text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Search Library"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Book Grid */}
            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                    {filteredBooks.map((book, index) => (
                        <BookCard key={book.id} book={book} index={index} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-muted-foreground">
                    <p>No books found matching your search.</p>
                </div>
            )}
        </div>
    );
}
