import { StratBoard } from "./components/strat-board";
import { DownloadButton } from "./components/download-button";

export default function Home() {
  return (
    <div className="paper-grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--background)] font-[family-name:var(--font-geist-sans)]">
      {/* Paper grid background */}
      <div className="paper-grid pointer-events-none absolute inset-0 opacity-40" />

      {/* Fold crease */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-px bg-[var(--grid-line)] opacity-30" />

      <main className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-14 px-6 py-16 sm:py-24">
        <StratBoard />

        {/* Download CTA — server component with dynamic GitHub Release URL */}
        <DownloadButton />

        {/* Feature tags */}
        <div className="animate-fade-in delay-1000 flex flex-wrap justify-center gap-3">
          {["10-Man Lobbies", "Custom ELO", "Leaderboards", "Match History"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-sm border border-[var(--grid-line)] bg-[var(--paper)] px-4 py-1.5 font-[family-name:var(--font-geist-mono)] text-[11px] tracking-wide text-[var(--ink-light)] shadow-sm"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-8 font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.2em] text-[var(--pencil)]">
        PENTAD &middot; 2026
      </footer>
    </div>
  );
}
