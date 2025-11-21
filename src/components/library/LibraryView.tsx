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
        <div className="space-y-12">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-input rounded-full leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow shadow-sm"
                    placeholder="Search title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Book Grid */}
            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
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
