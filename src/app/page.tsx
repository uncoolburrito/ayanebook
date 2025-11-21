import { Header } from "@/components/layout/Header";
import { LibraryView } from "@/components/library/LibraryView";
import { books } from "@/data/books";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background z-10" />
          <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />

          <div className="container mx-auto relative z-20 text-center space-y-6">
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-primary">
              Ancient Wisdom
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Explore the foundational texts of Western philosophy in a distraction-free, curated environment.
            </p>
          </div>
        </section>

        {/* Library Section */}
        <section className="container mx-auto px-4 pb-20">
          <LibraryView books={books} />
        </section>
      </main>

      <footer className="py-8 border-t border-border/40 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Philosophy Library. Built with Next.js.</p>
      </footer>
    </div>
  );
}
