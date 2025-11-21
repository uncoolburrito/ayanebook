"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, Menu, X, BookOpen } from "lucide-react";
import { Book, Chapter } from "@/data/books";
import { useTheme } from "next-themes";

interface ReaderShellProps {
    book: Book;
    chapter: Chapter;
    nextChapter?: { id: string; title: string };
    prevChapter?: { id: string; title: string };
}

export function ReaderShell({ book, chapter, nextChapter, prevChapter }: ReaderShellProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    // Calculate progress
    const currentChapterIndex = book.chapters.findIndex(c => c.id === chapter.id);
    const totalChapters = book.chapters.length;
    const progressPercentage = Math.round(((currentChapterIndex + 1) / totalChapters) * 100);

    // Direction logic for animation
    const prevChapterIdRef = useRef(chapter.id);
    const [direction, setDirection] = useState(0); // 1 for right (next), -1 for left (prev)

    useEffect(() => {
        const prevIndex = book.chapters.findIndex(c => c.id === prevChapterIdRef.current);
        const currentIndex = book.chapters.findIndex(c => c.id === chapter.id);

        if (currentIndex > prevIndex) {
            setDirection(1);
        } else if (currentIndex < prevIndex) {
            setDirection(-1);
        } else {
            setDirection(0);
        }

        prevChapterIdRef.current = chapter.id;
    }, [chapter.id, book.chapters]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
            rotateY: direction > 0 ? 5 : -5,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            rotateY: 0,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0,
            rotateY: direction < 0 ? 5 : -5,
        })
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500 relative overflow-x-hidden">
            {/* Grain Overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-50 opacity-[0.07] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
                style={{ scaleX }}
            />

            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border/40 z-40 flex items-center justify-between px-4 md:px-8 transition-all duration-300">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-accent rounded-full transition-colors group">
                        <Home className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                    <div className="flex flex-col">
                        <span className="font-serif font-medium text-sm md:text-base leading-none">
                            {book.title}
                        </span>
                        <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mt-1">
                            Chapter {currentChapterIndex + 1} of {totalChapters}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 hover:bg-accent rounded-full transition-colors text-xs font-medium tracking-wider uppercase"
                    >
                        {theme === "dark" ? "Light" : "Dark"}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="p-2 hover:bg-accent rounded-full transition-colors group"
                    >
                        <Menu className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </button>
                </div>
            </nav>

            {/* Sidebar / Table of Contents */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-80 bg-background border-l border-border z-50 shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
                                <h2 className="font-serif text-xl font-bold">Contents</h2>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-accent rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                {book.chapters.map((c, idx) => (
                                    <Link
                                        key={c.id}
                                        href={`/read/${book.id}/${c.id}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${c.id === chapter.id
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "hover:bg-accent text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        <span className="text-xs font-mono opacity-50 w-6">{idx + 1}.</span>
                                        <span className="text-sm">{c.title}</span>
                                    </Link>
                                ))}
                            </div>
                            <div className="p-4 border-t border-border bg-muted/30">
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{progressPercentage}% Complete</span>
                                    <span>{currentChapterIndex + 1}/{totalChapters}</span>
                                </div>
                                <div className="h-1 bg-border mt-2 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500"
                                        style={{ width: `${progressPercentage}%` }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Content Area */}
            <main className="container mx-auto max-w-3xl px-4 pt-28 pb-40 relative z-10 perspective-1000">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={chapter.id}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            rotateY: { duration: 0.4 }
                        }}
                        className="bg-card text-card-foreground p-8 md:p-16 shadow-2xl rounded-sm min-h-[60vh] border border-border/50 relative overflow-hidden"
                    >
                        {/* Decorative page elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50" />

                        <div className="prose prose-lg md:prose-xl dark:prose-invert prose-serif mx-auto">
                            <div className="flex flex-col items-center mb-12">
                                <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-4">
                                    Chapter {currentChapterIndex + 1}
                                </span>
                                <h1 className="font-serif text-4xl md:text-5xl text-center !mb-0 !mt-0">
                                    {chapter.title}
                                </h1>
                                <div className="w-12 h-1 bg-primary/20 mt-8 rounded-full" />
                            </div>

                            <div
                                dangerouslySetInnerHTML={{ __html: chapter.content }}
                                className="drop-cap"
                            />

                            <div className="mt-16 pt-8 border-t border-border/30 flex justify-center">
                                <BookOpen className="w-6 h-6 text-muted-foreground/30" />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Chapter Navigation Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/40 p-4 z-40">
                <div className="container mx-auto max-w-3xl flex justify-between items-center">
                    {prevChapter ? (
                        <Link
                            href={`/read/${book.id}/${prevChapter.id}`}
                            className="group flex items-center gap-3 pl-2 pr-4 py-2 rounded-full hover:bg-accent transition-all"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Previous</span>
                                <span className="text-sm font-serif font-medium max-w-[120px] truncate">{prevChapter.title}</span>
                            </div>
                        </Link>
                    ) : (
                        <div className="w-32" />
                    )}

                    <div className="hidden md:flex flex-col items-center">
                        <span className="font-serif italic text-muted-foreground text-sm">
                            {book.title}
                        </span>
                    </div>

                    {nextChapter ? (
                        <Link
                            href={`/read/${book.id}/${nextChapter.id}`}
                            className="group flex items-center gap-3 pl-4 pr-2 py-2 rounded-full hover:bg-accent transition-all"
                        >
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Next</span>
                                <span className="text-sm font-serif font-medium max-w-[120px] truncate">{nextChapter.title}</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </Link>
                    ) : (
                        <div className="w-32" />
                    )}
                </div>
            </div>
        </div>
    );
}
