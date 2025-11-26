"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Book } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full glass">
            <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-70">
                    <Book className="h-5 w-5 text-primary" />
                    <span className="font-semibold tracking-tight text-sm md:text-base">Philosophy Library</span>
                </Link>

                <nav className="flex items-center gap-4">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="Toggle theme"
                    >
                        {mounted && theme === "dark" ? (
                            <Moon className="h-4 w-4" />
                        ) : (
                            <Sun className="h-4 w-4" />
                        )}
                    </button>
                </nav>
            </div>
        </header>
    );
}
