# Walkthrough - Philosophy Library

I have successfully built the "Apple Books x Ancient Philosophy" ebook library.

## Features Implemented

### 1. Technical Scaffolding
- Initialized Next.js 15+ project with TypeScript, Tailwind CSS v4, and ESLint.
- Installed `framer-motion`, `lucide-react`, `next-themes`, `clsx`, `tailwind-merge`.

### 2. Content & Assets
- Created `src/data/books.ts` with 3 classic philosophy books:
  - **The Republic** (Plato)
  - **Meditations** (Marcus Aurelius)
  - **Nicomachean Ethics** (Aristotle)
- Each book has 3 chapters with substantial dummy text for a realistic reading experience.
- Used high-quality Unsplash images for book covers.

### 3. Design Language
- **Aesthetics**: Implemented a "Parchment & Deep Navy" theme.
  - Light Mode: `#f8f4ec` background, `#0a0b10` text.
  - Dark Mode: `#0a0b10` background, `#f8f4ec` text.
- **Typography**: 
  - Headers: `Cormorant Garamond` (Serif).
  - Body: `Geist Sans` (Clean Sans).
- **Motion**: Added smooth fade-in and slide-up animations for book cards and page transitions using `framer-motion`.

### 4. Core Components
- **Library Page**: Hero section with blurred backdrop and search functionality.
- **Reader**: Distraction-free reading view with:
  - Progress bar at the top.
  - Collapsible Table of Contents.
  - Smooth chapter navigation (Next/Prev).
  - Theme toggle.
- **Theming**: Fully functional light/dark mode toggle.

## Verification
- Ran `npm run build` successfully.
- Verified static generation of all book chapters.

## How to Run
1. `cd philosophy-library`
2. `npm run dev`
3. Open `http://localhost:3000`
