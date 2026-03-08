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

          <h1 className="animate-fade-in-up delay-100 text-center text-6xl font-bold tracking-tight text-[var(--ink)] sm:text-8xl" style={{ fontVariant: "small-caps" }}>
            Pentad
          </h1>

          <div className="animate-fade-in-up delay-200 relative">
            <p className="max-w-lg text-center text-lg leading-relaxed text-[var(--ink-light)]">
              Your 10-mans, drawn up. Track lobbies with friends, climb the
              leaderboard, own your ELO.
            </p>
            <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2" width="200" height="8" viewBox="0 0 200 8">
              <path
                d="M0 4 Q25 0, 50 4 T100 4 T150 4 T200 4"
                fill="none"
                stroke="var(--pencil)"
                strokeWidth="1.5"
                opacity="0.4"
                className="animate-draw delay-500"
              />
            </svg>
          </div>
        </div>

        {/* Main content: Strat board + play notes */}
        <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-0">
          {/* ASCII Tactical Map */}
          <div className="animate-fade-in delay-300 relative rounded-sm border border-[var(--grid-line)] bg-[var(--paper)] p-5 shadow-[2px_3px_8px_rgba(0,0,0,0.08)]" style={{ transform: "rotate(-0.8deg)" }}>
            {/* Tape pieces */}
            <div className="absolute -top-2 left-8 h-5 w-16 rounded-sm bg-[#e8dcc8]/80 shadow-sm" style={{ transform: "rotate(-2deg)" }} />
            <div className="absolute -top-2 right-10 h-5 w-12 rounded-sm bg-[#e8dcc8]/80 shadow-sm" style={{ transform: "rotate(1.5deg)" }} />

            <div className="mb-3 flex items-center justify-between font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] text-[var(--pencil)]">
              <span>SITE B — ATTACK STRAT</span>
              <span className="text-[var(--red-marker)]">CLASSIFIED</span>
            </div>

            <pre className="font-[family-name:var(--font-geist-mono)] text-[10px] leading-[1.6] text-[var(--ink)] sm:text-xs sm:leading-[1.6]">
              {MAP_LINES.map((line, i) => (
                <div
                  key={i}
                  className="transition-all duration-200"
                  style={{
                    opacity: i < visibleMapLines ? 1 : 0,
                    transform: i < visibleMapLines ? "translateX(0)" : "translateX(-8px)",
                  }}
                >
                  <MapLine line={line} index={i} />
                </div>
              ))}
            </pre>

            {/* Arrow legend */}
            <div
              className="mt-3 flex gap-4 font-[family-name:var(--font-geist-mono)] text-[10px] transition-opacity duration-500"
              style={{ opacity: visibleMapLines >= MAP_LINES.length ? 1 : 0 }}
            >
              <span className="text-[var(--red-marker)]">● T side push</span>
              <span className="text-[var(--blue-marker)]">● CT rotate</span>
              <span className="text-[var(--pencil)]">◉ smoke</span>
            </div>
          </div>

          {/* Strat notes */}
          <div
            className="animate-fade-in delay-300 margin-line relative w-full max-w-xs rounded-sm border border-[var(--grid-line)] bg-[var(--paper)] p-5 pl-6 shadow-[2px_3px_8px_rgba(0,0,0,0.08)] lg:-ml-2"
            style={{ transform: "rotate(0.5deg)" }}
          >
            {/* Paper holes */}
            <div className="absolute top-6 -left-[1px] flex flex-col gap-16">
              <div className="h-3 w-3 rounded-full border border-[var(--grid-line)] bg-[var(--background)]" />
              <div className="h-3 w-3 rounded-full border border-[var(--grid-line)] bg-[var(--background)]" />
              <div className="h-3 w-3 rounded-full border border-[var(--grid-line)] bg-[var(--background)]" />
            </div>

            <div className="mb-3 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] text-[var(--pencil)]">
              CALL SHEET
            </div>

            <div className="flex flex-col gap-2 font-[family-name:var(--font-geist-mono)] text-[12px] leading-relaxed">
              {STRAT_LINES.map((line, i) => {
                const visible = i < visibleStratLines;
                let className = "transition-all duration-300 text-[var(--ink)]";
                if (!visible) className += " opacity-0 translate-y-1";
                if (line.style === "title")
                  className += " font-bold text-[var(--ink)] text-sm border-b border-[var(--ink)]/20 pb-1 mb-1";
                if (line.style === "red")
                  className += " text-[var(--red-marker)]";
                if (line.style === "blue")
                  className += " text-[var(--blue-marker)]";
                if (line.style === "pencil")
                  className += " text-[var(--pencil)] italic";
                if (line.style === "underline")
                  className += " underline decoration-[var(--pencil)] decoration-wavy decoration-1 underline-offset-4 text-[var(--ink-light)] text-[11px] mt-2";

                return (
                  <div key={i} className={className}>
                    {line.text || "\u00A0"}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Download CTA */}
        <div className="animate-fade-in-up delay-700 flex flex-col items-center gap-4">
          <a
            href="/download/windows"
            className="group relative flex h-14 items-center gap-3 rounded-sm border-2 border-[var(--ink)] bg-[var(--ink)] px-8 font-[family-name:var(--font-geist-sans)] text-sm font-semibold text-[var(--paper)] transition-all duration-200 hover:bg-[var(--paper)] hover:text-[var(--ink)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-y-0.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download for Windows
          </a>
          <span className="font-[family-name:var(--font-geist-mono)] text-[11px] tracking-wide text-[var(--pencil)]">
            Latest release &middot; Windows 10+
          </span>
        </div>

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
