"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-2 border border-primary bg-primary text-primary-foreground group-hover:bg-background group-hover:text-primary transition-colors duration-300">
                        <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif text-2xl font-medium leading-none tracking-tight">PHILOSOPHY</span>
                        <span className="museum-label text-[0.6rem] leading-none tracking-[0.2em]">LIBRARY</span>
                    </div>
                </Link>

                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-3 border border-transparent hover:border-primary transition-colors duration-300"
                    aria-label="Toggle theme"
                >
                    {mounted && theme === "dark" ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}
                </button>
            </div>
        </header>
    );
}
