# Creonex Style Guide

Source: Figma `RpnOkkAMw3S4VsZUjyIASy`. Brand migrated from purple to **blue `#337DEB`** (2026-05-22). All gradients removed — flat solid colors only.

---

## Brand Colors

| Token | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| `--brand` | `oklch(0.582 0.165 249.0)` | `#337DEB` | CTA buttons, links, active UI |
| `--brand-dark` | `oklch(0.516 0.160 249.5)` | `#2466CC` | Deeper shade |
| `--brand-end` | `oklch(0.470 0.155 250.0)` | `#1A5BC4` | Darkest shade |
| `--brand-dim` | `oklch(0.443 0.140 250.0)` | `#2B5FAA` | Logo wordmark |
| `--brand-ghost` | `oklch(0.953 0.030 249.0)` | `#EBF2FD` | Badge backgrounds |
| `--brand-faint` | `oklch(0.972 0.015 249.0)` | `#F0F6FF` | Hero glow, section tints |

## Text & Surface Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--foreground` | `#0f172a` | All headings + body text |
| `--charcoal` | `#1c1c1e` | Nav links |
| `--muted-foreground` | `#737373` | Labels, footer headings |
| `--subtle` | `#8c8c8c` | Footer description, copyright |
| `--background` | `#ffffff` | Page, cards, nav |
| `--surface` | `#f8fafc` | Alternate section bg (zebra) |
| `--border` | `#e2e8f0` | Card and section borders |
| `--input` | `#c4c4c5` | Input field border |

## Icon Accent Pad Colors

| Token | Hex | Class |
|-------|-----|-------|
| `--accent-indigo` | `#eef2ff` | `.icon-pad-indigo` |
| `--accent-orange` | `#fff7ed` | `.icon-pad-orange` |
| `--accent-green` | `#f0fdf4` | `.icon-pad-green` |
| `--accent-purple` | `#fdf4ff` | `.icon-pad-purple` |

---

## Typography

### Fonts

| Variable | Font | Usage |
|----------|------|-------|
| `--font-inter` / `font-sans` | Inter | All UI — body, headings, labels, buttons |
| `--font-instrument-serif` / `font-serif` | Instrument Serif | Logo wordmark only |
| `--font-plus-jakarta` / `font-display` | Plus Jakarta Sans | Step numbers only |

### Scale

| Class | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-hero` | 52px | 800 | Desktop hero H1 |
| `text-hero-mobile` | 36px | 800 | Mobile hero H1 |
| `h1`, `h2` | 42px | 800 | Section headings |
| `h3` | 20px | 700 | Card titles |
| `h4` | 18px | 700 | Step titles (Plus Jakarta) |
| `h5` | 16px | 600 | Sub-headings |
| `h6` | 14px | 600 | Small labels |
| `.body-lg` | 15px | 400 | Hero subtext, card body |
| `.body-md` | 14px | 400 | General paragraphs |
| `.body-sm` | 12px | 400 | Captions, meta |
| `.label-muted` | 14px | 500 | Form labels, footer columns |
| `.section-badge` | 10.5px | 700 | Section pill labels |

---

## Spacing & Layout

| Class | Behaviour |
|-------|-----------|
| `.section` | Full-width section — responsive horizontal padding, `py-24` vertical |
| `.section-sm` | Same padding, `py-16` vertical |
| `.section-surface` | Adds `--surface` background to `.section` |
| `.container-inner` | Max-width 1100px, centered |

### Section Zebra

```
Navbar / Hero     → bg-background
Stats / WhyCreonex / HowItWorks / Testimonials  → bg-surface
Courses / Experts / FAQ / CTA / Footer          → bg-background
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 5px | Inputs, tags |
| `--radius-md` | 7.5px | Small cards |
| `--radius-lg` | 10px | Buttons |
| `--radius-xl` | 15px | Cards |
| `--radius-2xl` | 20px | Feature cards |
| `--radius-3xl` | 32px | Step circles |
| `--radius-full` | 9999px | Pills, avatars |

## Shadows

| Context | Value |
|---------|-------|
| Nav | `drop-shadow(0 0 4px oklch(0 0 0 / 0.1))` |
| Step circles | `0 8px 16px oklch(0.516 0.160 249.5 / 0.2)` |
| Card hover | `shadow-lg` |

---

## No Gradients

`.bg-brand-gradient` → `background-color: var(--brand)` (solid blue)
`.text-brand-gradient` → `color: var(--brand)`
`.hero-glow` → `background-color: var(--brand-faint)`

Never reintroduce `linear-gradient` or `radial-gradient` declarations.

---

## Dark Mode

Toggle via `.dark` on `<html>`. Never use `prefers-color-scheme`.

Key overrides: background → deep navy, brand → `oklch(0.650 0.155 249.0)` (brighter for contrast), cards → lifted surface.

---

## Figma Fixes Applied

| Figma issue | Our standard |
|-------------|-------------|
| Headings used both `#0f172a` and `#121212` | Always `--foreground` |
| Button font 10–11px | `text-sm` (14px) |
| Plus Jakarta Sans in random places | Step numbers only |
| Section badges inconsistent | `.section-badge` class |
| Purple brand `#7C5CFF` | Blue `#337DEB` |
| Gradients throughout | All removed |
