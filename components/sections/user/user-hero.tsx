"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AnimatedHeadline from "@/components/shared/animated-headline";

gsap.registerPlugin(useGSAP);

// ─── Keep all words the same char-count so AnimatedHeadline never reflows ───
// Each word here is 6–8 chars — tight enough to look equal-width in most fonts.
const ANIMATED_WORDS = ["design", "coding", "finance", "content", "fitness"];

const CATEGORIES = [
  "UI/UX Design",
  "Full Stack Dev",
  "Govt. Exam Prep",
  "Photography",
  "Digital Marketing",
  "Music Production",
  "Content Creation",
  "Finance & Investing",
  "Fitness & Yoga",
  "Data Science",
  "Video Editing",
  "Graphic Design",
] as const;

type Category = (typeof CATEGORIES)[number];

// ─── Tiny category emoji map for the dropdown ───────────────────────────────
const CATEGORY_ICON: Record<Category, string> = {
  "UI/UX Design": "🎨",
  "Full Stack Dev": "💻",
  "Govt. Exam Prep": "📚",
  "Photography": "📷",
  "Digital Marketing": "📣",
  "Music Production": "🎵",
  "Content Creation": "✍️",
  "Finance & Investing": "📈",
  "Fitness & Yoga": "🧘",
  "Data Science": "🔬",
  "Video Editing": "🎬",
  "Graphic Design": "🖌️",
};

export default function UserHero(): React.ReactElement {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ─── Entrance animation ────────────────────────────────────────────────────
  useGSAP(
    () => {
      gsap.from(".u-hero-item", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.1,
      });
    },
    { scope: containerRef },
  );

  // ─── Close dropdown on outside click / Escape ─────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // ─── Filtered list ─────────────────────────────────────────────────────────
  const filtered = query.trim()
    ? CATEGORIES.filter((c) =>
      c.toLowerCase().includes(query.trim().toLowerCase()),
    )
    : CATEGORIES;

  const selectCategory = useCallback((cat: Category) => {
    setActive((prev) => (prev === cat ? null : cat));
    setQuery(cat);
    setOpen(false);
    inputRef.current?.blur();
  }, []);

  const clearSearch = () => {
    setQuery("");
    setActive(null);
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    // Wire up real search here — for now just closes dropdown
    setOpen(false);
  };

  const isActive = open || focused;

  return (
    <section className="section-py relative overflow-hidden">
      <div ref={containerRef} className="page-container">
        <div className="mx-auto max-w-3xl text-center">

          {/* ── Headline ── */}
          <h1 className="u-hero-item text-display text-balance text-foreground">
            Learn{" "}
            <AnimatedHeadline words={ANIMATED_WORDS} />{" "}
            from India&apos;s best creators.
          </h1>

          {/* ── Sub-copy ── */}
          <p className="u-hero-item text-body mx-auto mt-6 max-w-xl text-balance text-muted-foreground">
            Browse courses, book 1-on-1 mentorship sessions, and join communities
            built by verified experts — all in one place.
          </p>

          {/* ── Search + Pills ── */}
          <div className="u-hero-item mt-10 w-full px-1 text-left">

            {/* Search bar wrapper — relative so the dropdown anchors here */}
            <div ref={searchRef} className="relative w-full">

              {/* ── Search Input Row ── */}
              <div
                className={cn(
                  "flex items-center gap-2 rounded-full border-2 bg-card px-3 py-2 shadow-md transition-all duration-200 sm:px-4 sm:py-2.5",
                  isActive
                    ? "border-primary/60 shadow-lg ring-4 ring-primary/10"
                    : "border-border hover:border-primary/30 hover:shadow-lg",
                )}
              >
                {/* Search icon */}
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                />

                {/* Native input — works perfectly on mobile */}
                <input
                  ref={inputRef}
                  type="search"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="Search any course, skill, or topic..."
                  value={query}
                  onFocus={() => { setFocused(true); setOpen(true); }}
                  onBlur={() => { setFocused(false); }}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(null);
                    setOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      // Focus first dropdown item if open
                      const first = searchRef.current?.querySelector<HTMLButtonElement>(
                        "[data-suggestion]",
                      );
                      first?.focus();
                    }
                  }}
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60 sm:text-base [&::-webkit-search-cancel-button]:appearance-none"
                />

                {/* Clear button — shows when there's a query */}
                {query && (
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                  </Button>
                )}

                {/* Search button — text on desktop, icon on mobile */}
                <Button
                  size="sm"
                  onClick={handleSearch}
                  aria-label="Search"
                  className="hidden shrink-0 gap-2 sm:flex"
                >
                  Search
                  <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                </Button>
                {/* Mobile icon-only */}
                <Button
                  size="icon"
                  onClick={handleSearch}
                  aria-label="Search"
                  className="flex shrink-0 sm:hidden"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* ── Suggestions Dropdown ───────────────────────────────────── */}
              {open && (
                <div
                  role="listbox"
                  aria-label="Category suggestions"
                  className={cn(
                    "absolute left-0 right-0 top-[calc(100%+8px)] z-50",
                    "rounded-2xl border border-border bg-popover shadow-xl",
                    "overflow-hidden",
                    // Smooth entrance
                    "animate-in fade-in-0 slide-in-from-top-2 duration-150",
                  )}
                >
                  {/* Heading */}
                  <p className="px-4 pb-1 pt-3 text-xs font-medium uppercase tracking-widest text-muted-foreground/70">
                    {query.trim() ? "Matching topics" : "Browse by category"}
                  </p>

                  {filtered.length === 0 ? (
                    <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                      No results for &ldquo;{query}&rdquo;
                    </p>
                  ) : (
                    <ul className="max-h-72 overflow-y-auto py-1.5 overscroll-contain">
                      {filtered.map((cat, i) => (
                        <li key={cat}>
                          <Button
                            variant="ghost"
                            role="option"
                            data-suggestion
                            aria-selected={active === cat}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              selectCategory(cat);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                selectCategory(cat);
                              }
                              if (e.key === "ArrowDown") {
                                e.preventDefault();
                                const items = searchRef.current?.querySelectorAll<HTMLButtonElement>(
                                  "[data-suggestion]",
                                );
                                items?.[i + 1]?.focus();
                              }
                              if (e.key === "ArrowUp") {
                                e.preventDefault();
                                if (i === 0) {
                                  inputRef.current?.focus();
                                } else {
                                  const items = searchRef.current?.querySelectorAll<HTMLButtonElement>(
                                    "[data-suggestion]",
                                  );
                                  items?.[i - 1]?.focus();
                                }
                              }
                            }}
                            className={cn(
                              "h-auto w-full justify-start gap-3 rounded-none px-4 py-2.5 text-sm",
                              active === cat
                                ? "bg-primary/10 text-primary hover:bg-primary/10"
                                : "text-foreground",
                            )}
                          >
                            <span className="text-base leading-none" aria-hidden>
                              {CATEGORY_ICON[cat]}
                            </span>
                            <span className="flex-1 text-left font-medium">{cat}</span>
                            {active === cat && (
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                className="h-3 w-3 text-primary"
                              />
                            )}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Footer hint */}
                  <div className="border-t border-border/60 px-4 py-2">
                    <p className="text-xs text-muted-foreground/60">
                      Press{" "}
                      <kbd className="rounded border border-border/80 bg-muted px-1 py-0.5 font-mono text-[10px]">
                        ↵
                      </kbd>{" "}
                      to search ·{" "}
                      <kbd className="rounded border border-border/80 bg-muted px-1 py-0.5 font-mono text-[10px]">
                        Esc
                      </kbd>{" "}
                      to close
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ── Category Pills ─────────────────────────────────────────── */}
            <div className="scrollbar-hide mt-4 flex gap-2 overflow-x-auto pb-2 pt-1">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const next = active === cat ? null : cat;
                    setActive(next);
                    setQuery(next ?? "");
                  }}
                  className={cn(
                    "shrink-0 gap-1.5 rounded-full text-xs",
                    active === cat
                      ? "border-primary/50 bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
                      : "border-border text-muted-foreground",
                  )}
                >
                  <span aria-hidden className="text-[11px]">{CATEGORY_ICON[cat]}</span>
                  {cat}
                </Button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}