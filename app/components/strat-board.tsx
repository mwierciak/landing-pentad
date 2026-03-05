"use client";

import { useEffect, useState } from "react";

const MAP_LINES = [
  "  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510",
  "  \u2502              \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557                  \u2502",
  "  \u2502   \u250c\u2500\u2500\u2500\u2510      \u2551SITE A \u2551     \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2510    \u2502",
  "  \u2502   \u2502 T \u251c\u2500\u2500    \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d     \u2502      \u2502    \u2502",
  "  \u2502   \u2514\u2500\u2500\u2500\u2518   \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510    \u2502spawn \u2502    \u2502",
  "  \u2502    \u2571      \u2502          \u2502    \u2502      \u2502    \u2502",
  "  \u2502   \u2571  \u250c\u2500\u2500\u2500\u2500\u2524   MID    \u251c\u2500\u2500\u2500\u2500\u2510 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518    \u2502",
  "  \u2502  \u2571   \u2502    \u2502          \u2502    \u2502     \u2572      \u2502",
  "  \u2502 \u2571    \u2502    \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518    \u2502      \u2572     \u2502",
  "  \u2502      \u2502         \u2502          \u2502       \u2572    \u2502",
  "  \u2502  \u2500\u2500\u2192 \u2502    \u2500\u2500\u2192  \u2502          \u2502  \u2190\u2500\u2500   \u2502   \u2502",
  "  \u2502      \u2502  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2510   \u2502        \u2502   \u2502",
  "  \u2502      \u2514\u2500\u2500\u2524             \u251c\u2500\u2500\u2500\u2518   \u250c\u2500\u2500\u2500\u2510\u2502   \u2502",
  "  \u2502  \u25c9 \u25c9   \u2502   SITE B    \u2502  \u25c9    \u2502 T \u2502\u2502   \u2502",
  "  \u2502  \u2197 \u2197   \u2502   \u2605 PUSH    \u2502  \u2196    \u2514\u2500\u2500\u2500\u2518\u2502   \u2502",
  "  \u2502         \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518              \u2502",
  "  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518",
];

const STRAT_LINES = [
  { text: "ROUND 14 \u2014 RETAKE B", style: "title" },
  { text: "" },
  { text: "1. smoke deep corner", style: "blue" },
  { text: "2. flash over site wall", style: "blue" },
  { text: "3. 2 players push tunnel", style: "red" },
  { text: "4. 1 lurk mid for rotate", style: "red" },
  { text: "5. trade into site together", style: "pencil" },
  { text: "" },
  { text: "KEY: fast execute, don't peek alone", style: "underline" },
];

function MapLine({ line, index }: { line: string; index: number }) {
  const hasRedMarkers = index === 14;

  if (hasRedMarkers) {
    return (
      <span>
        {"  \u2502  "}
        <span className="text-[var(--red-marker)]">\u2197 \u2197</span>
        {"   \u2502   "}
        <span className="text-[var(--red-marker)]">\u2605 PUSH</span>
        {"    \u2502  "}
        <span className="text-[var(--blue-marker)]">\u2196</span>
        {"    \u2514\u2500\u2500\u2500\u2518\u2502   \u2502"}
      </span>
    );
  }

  return <span>{line}</span>;
}

export function StratBoard() {
  const [mounted, setMounted] = useState(false);
  const [visibleMapLines, setVisibleMapLines] = useState(0);
  const [visibleStratLines, setVisibleStratLines] = useState(0);

  useEffect(() => {
    setMounted(true);

    const mapInterval = setInterval(() => {
      setVisibleMapLines((prev) => {
        if (prev >= MAP_LINES.length) {
          clearInterval(mapInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 120);

    const stratTimer = setTimeout(() => {
      const stratInterval = setInterval(() => {
        setVisibleStratLines((prev) => {
          if (prev >= STRAT_LINES.length) {
            clearInterval(stratInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 250);
    }, MAP_LINES.length * 120 + 300);

    return () => {
      clearInterval(mapInterval);
      clearTimeout(stratTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-center gap-5">
        <div className="animate-fade-in-up flex items-center gap-3 font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.25em] text-[var(--pencil)]">
          <span className="h-px w-8 bg-[var(--pencil)]" />
          EST. 2026
          <span className="h-px w-8 bg-[var(--pencil)]" />
        </div>

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
            <span>SITE B &mdash; ATTACK STRAT</span>
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
            <span className="text-[var(--red-marker)]">&#9679; T side push</span>
            <span className="text-[var(--blue-marker)]">&#9679; CT rotate</span>
            <span className="text-[var(--pencil)]">&#9673; smoke</span>
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
    </>
  );
}
