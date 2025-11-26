"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
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

    const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
            x: direction > 0 ? 20 : -20,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 20 : -20,
            opacity: 0,
        })
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500 relative overflow-x-hidden">
            {/* Header Image Parallax */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[40vh] z-0 overflow-hidden"
                style={{ y: headerY, opacity: headerOpacity }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
                <Image
                    src={book.headerImage || "/images/greek.png"}
                    alt="Chapter Header"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
                style={{ scaleX }}
            />

            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur-md border-b border-border/40 z-40 flex items-center justify-between px-4 md:px-8 transition-all duration-300">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-secondary rounded-full transition-colors group">
                        <Home className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm md:text-base leading-none tracking-tight">
                            {book.title}
                        </span>
                        <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
                            Chapter {currentChapterIndex + 1} of {totalChapters}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 hover:bg-secondary rounded-full transition-colors text-xs font-medium tracking-wider uppercase"
                    >
                        {theme === "dark" ? "Light" : "Dark"}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="p-2 hover:bg-secondary rounded-full transition-colors group"
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
                            <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/30">
                                <h2 className="font-semibold text-lg">Contents</h2>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-1">
                                {book.chapters.map((c, idx) => (
                                    <Link
                                        key={c.id}
                                        href={`/read/${book.id}/${c.id}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${c.id === chapter.id
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        <span className="text-xs font-mono opacity-50 w-6">{idx + 1}.</span>
                                        <span className="text-sm">{c.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Content Area */}
            <main className="container mx-auto max-w-2xl px-6 pt-[35vh] pb-40 relative z-10">
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
                            opacity: { duration: 0.2 }
                        }}
                        className="bg-card text-card-foreground p-8 md:p-12 shadow-xl rounded-2xl border border-border/50 relative overflow-hidden backdrop-blur-sm bg-opacity-95"
                    >
                        <div className="prose prose-lg dark:prose-invert prose-slate mx-auto">
                            <div className="flex flex-col items-center mb-10">
                                <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-3">
                                    Chapter {currentChapterIndex + 1}
                                </span>
                                <h1 className="font-serif text-3xl md:text-4xl text-center !mb-0 !mt-0 tracking-tight">
                                    {chapter.title}
                                </h1>
                                <div className="w-8 h-1 bg-primary/20 mt-6 rounded-full" />
                            </div>

                            <div
                                dangerouslySetInnerHTML={{ __html: chapter.content }}
                                className="drop-cap leading-relaxed"
                            />

                            <div className="mt-12 pt-8 border-t border-border/30 flex justify-center">
                                <BookOpen className="w-5 h-5 text-muted-foreground/30" />
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
                            className="group flex items-center gap-3 pl-2 pr-4 py-2 rounded-full hover:bg-secondary transition-all"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Previous</span>
                                <span className="text-sm font-medium max-w-[120px] truncate">{prevChapter.title}</span>
                            </div>
                        </Link>
                    ) : (
                        <div className="w-32" />
                    )}

                    <div className="hidden md:flex flex-col items-center">
                        <span className="font-medium text-muted-foreground text-sm">
                            {book.title}
                        </span>
                    </div>

                    {nextChapter ? (
                        <Link
                            href={`/read/${book.id}/${nextChapter.id}`}
                            className="group flex items-center gap-3 pl-4 pr-2 py-2 rounded-full hover:bg-secondary transition-all"
                        >
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Next</span>
                                <span className="text-sm font-medium max-w-[120px] truncate">{nextChapter.title}</span>
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
