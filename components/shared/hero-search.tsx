"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  CATEGORY_ICON,
  type Category,
  type HeroSearchProps,
  type SearchResult,
} from "@/types/search";

// ── Result type labels shown in the dropdown ─────────────────────────────────
const RESULT_TYPE_LABEL: Record<SearchResult["type"], string> = {
  creator: "Creator",
  course: "Course",
  category: "Topic",
  "learning-path": "Learning Path",
};

export default function HeroSearch({
  onSearch,
  onCategorySelect,
  results,
  isLoading = false,
  className,
}: HeroSearchProps): React.ReactElement {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  // ── Close on outside click / Escape ──────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
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

  // ── Filtered category suggestions (used when no API results) ─────────────
  const filteredCategories = query.trim()
    ? CATEGORIES.filter((c) => c.toLowerCase().includes(query.trim().toLowerCase()))
    : CATEGORIES;

  // Whether to show API results or fall back to category suggestions
  const showResults = results && results.length > 0;

  const selectCategory = useCallback(
    (cat: Category) => {
      const next = active === cat ? null : cat;
      setActive(next);
      setQuery(next ?? "");
      setOpen(false);
      inputRef.current?.blur();
      onCategorySelect?.(next);
    },
    [active, onCategorySelect],
  );

  const handleSearch = useCallback(() => {
    setOpen(false);
    onSearch?.(query.trim(), active);
  }, [query, active, onSearch]);

  const clearSearch = () => {
    setQuery("");
    setActive(null);
    onCategorySelect?.(null);
    inputRef.current?.focus();
  };

  const isActive = open || focused;

  return (
    <div className={cn("w-full", className)}>

      {/* ── Search bar + dropdown wrapper ─────────────────────────────────── */}
      <div ref={wrapperRef} className="relative w-full">

        {/* Input row */}
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border-2 bg-card px-3 py-2 shadow-md transition-all duration-200 sm:px-4 sm:py-2.5",
            isActive
              ? "border-primary/60 shadow-lg ring-4 ring-primary/10"
              : "border-border hover:border-primary/30 hover:shadow-lg",
          )}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={cn(
              "h-4 w-4 shrink-0 transition-colors duration-200",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          />

          <input
            ref={inputRef}
            type="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Search creators, courses, topics..."
            value={query}
            onFocus={() => { setFocused(true); setOpen(true); }}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(null);
              setOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
              if (e.key === "ArrowDown") {
                e.preventDefault();
                wrapperRef.current
                  ?.querySelector<HTMLButtonElement>("[data-suggestion]")
                  ?.focus();
              }
            }}
            className={cn(
              "min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60 sm:text-base",
              "[&::-webkit-search-cancel-button]:appearance-none",
            )}
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
            </button>
          )}

          {/* Desktop search button */}
          <button
            type="button"
            onClick={handleSearch}
            aria-label="Search"
            className="hidden shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 active:scale-95 sm:flex"
          >
            Search
            <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
          </button>

          {/* Mobile icon-only search button */}
          <button
            type="button"
            onClick={handleSearch}
            aria-label="Search"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 active:scale-95 sm:hidden"
          >
            <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Dropdown */}
        {open && (
          <div
            role="listbox"
            aria-label="Search suggestions"
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-border bg-popover shadow-xl animate-in fade-in-0 slide-in-from-top-2 duration-150"
          >
            {isLoading ? (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                Searching…
              </p>
            ) : showResults ? (
              // ── API results (creators / courses / learning paths) ──────────
              <>
                <p className="px-4 pb-1 pt-3 text-xs font-medium uppercase tracking-widest text-muted-foreground/70">
                  Results
                </p>
                <ul className="max-h-72 overflow-y-auto overscroll-contain py-1.5">
                  {results!.map((result, i) => (
                    <li key={result.id}>
                      <a
                        href={result.href}
                        data-suggestion
                        role="option"
                        aria-selected={false}
                        onKeyDown={(e) => {
                          const items = wrapperRef.current?.querySelectorAll<HTMLElement>("[data-suggestion]");
                          if (e.key === "ArrowDown") { e.preventDefault(); items?.[i + 1]?.focus(); }
                          if (e.key === "ArrowUp") { e.preventDefault(); i === 0 ? inputRef.current?.focus() : items?.[i - 1]?.focus(); }
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                      >
                        {result.thumbnailUrl ? (
                          <img
                            src={result.thumbnailUrl}
                            alt=""
                            aria-hidden
                            className="h-8 w-8 shrink-0 rounded-md object-cover"
                          />
                        ) : (
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold text-muted-foreground">
                            {result.title[0]}
                          </span>
                        )}
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate font-medium">{result.title}</span>
                          {result.subtitle && (
                            <span className="truncate text-xs text-muted-foreground">{result.subtitle}</span>
                          )}
                        </span>
                        <span className="ml-auto shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                          {RESULT_TYPE_LABEL[result.type]}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              // ── Category suggestions fallback ──────────────────────────────
              <>
                <p className="px-4 pb-1 pt-3 text-xs font-medium uppercase tracking-widest text-muted-foreground/70">
                  {query.trim() ? "Matching topics" : "Browse by category"}
                </p>
                {filteredCategories.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  <ul className="max-h-72 overflow-y-auto overscroll-contain py-1.5">
                    {filteredCategories.map((cat, i) => (
                      <li key={cat}>
                        <button
                          type="button"
                          role="option"
                          data-suggestion
                          aria-selected={active === cat}
                          onMouseDown={(e) => { e.preventDefault(); selectCategory(cat); }}
                          onKeyDown={(e) => {
                            const items = wrapperRef.current?.querySelectorAll<HTMLButtonElement>("[data-suggestion]");
                            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectCategory(cat); }
                            if (e.key === "ArrowDown") { e.preventDefault(); items?.[i + 1]?.focus(); }
                            if (e.key === "ArrowUp") { e.preventDefault(); i === 0 ? inputRef.current?.focus() : items?.[i - 1]?.focus(); }
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-100 focus-visible:outline-none",
                            active === cat
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted focus-visible:bg-muted",
                          )}
                        >
                          <span className="text-base leading-none" aria-hidden>{CATEGORY_ICON[cat]}</span>
                          <span className="flex-1 font-medium">{cat}</span>
                          {active === cat && (
                            <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 text-primary" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            <div className="border-t border-border/60 px-4 py-2">
              <p className="text-xs text-muted-foreground/60">
                Press{" "}
                <kbd className="rounded border border-border/80 bg-muted px-1 py-0.5 font-mono text-[10px]">↵</kbd>
                {" "}to search ·{" "}
                <kbd className="rounded border border-border/80 bg-muted px-1 py-0.5 font-mono text-[10px]">Esc</kbd>
                {" "}to close
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Category pills ──────────────────────────────────────────────────── */}
      <div className="scrollbar-hide mt-4 flex gap-2 overflow-x-auto pb-2 pt-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => selectCategory(cat)}
            className={cn(
              "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              active === cat
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            <span aria-hidden className="text-[11px]">{CATEGORY_ICON[cat]}</span>
            {cat}
          </button>
        ))}
      </div>

    </div>
  );
}
