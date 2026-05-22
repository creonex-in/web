# Creonex Style Guide

Source: Figma file `RpnOkkAMw3S4VsZUjyIASy` (Creonex Main — Learn Page)

---

## Color Palette

All values in `oklch(L C H)`. Hex refs for designer cross-reference only.

### Brand — Primary Indigo

| Token              | OKLCH                        | Hex       | Usage                          |
|--------------------|------------------------------|-----------|--------------------------------|
| `--brand`          | `oklch(0.566 0.237 275.8)`   | `#7C5CFF` | CTA buttons, links, active UI  |
| `--brand-dark`     | `oklch(0.516 0.249 271.5)`   | `#5b4dff` | Gradient start                 |
| `--brand-end`      | `oklch(0.513 0.258 289.5)`   | `#7c3aed` | Gradient end                   |
| `--brand-dim`      | `oklch(0.443 0.168 276.8)`   | `#534ab7` | Logo wordmark, dark brand text |
| `--brand-ghost`    | `oklch(0.938 0.043 278.2)`   | `#ECE9FF` | Brand/100 tint, badge bg       |
| `--brand-faint`    | `oklch(0.966 0.022 278.4)`   | `#f4f3ff` | Lightest tint, section badges  |

### Text

| Token               | OKLCH                        | Hex       | Usage                              |
|---------------------|------------------------------|-----------|------------------------------------|
| `--foreground`      | `oklch(0.131 0.030 264.0)`   | `#0f172a` | All headings, primary content text |
| `--charcoal`        | `oklch(0.180 0.002 247)`     | `#1c1c1e` | Nav links, body on white bg        |
| `--muted-foreground`| `oklch(0.532 0 0)`           | `#737373` | Section labels, footer headings    |
| `--subtle`          | `oklch(0.621 0 0)`           | `#8c8c8c` | Footer description, copyright      |

> **Fix applied:** Design uses both `#0f172a` and `#121212` for headings.
> We standardise on `--foreground` (`#0f172a`) everywhere. `#121212` is retired.

### Backgrounds / Surfaces

| Token        | OKLCH                       | Hex       | Usage                            |
|--------------|-----------------------------|-----------|----------------------------------|
| `--background`| `oklch(1 0 0)`             | `#ffffff` | Page bg, cards, nav              |
| `--surface`  | `oklch(0.984 0.004 247)`    | `#f8fafc` | Alternate section bg (zebra)     |
| `--muted`    | `oklch(0.984 0.004 247)`    | `#f8fafc` | Same as surface (shadcn alias)   |
| `--border`   | `oklch(0.918 0.010 254)`    | `#e2e8f0` | Card / section borders           |
| `--input`    | `oklch(0.796 0 0)`          | `#c4c4c5` | Input field border               |

### Icon Accent Pads

Used as background squares behind card icons only.

| Token             | OKLCH                       | Hex       | Pair with         |
|-------------------|-----------------------------|-----------|-------------------|
| `--accent-indigo` | `oklch(0.957 0.030 270)`    | `#eef2ff` | Account-check icon|
| `--accent-orange` | `oklch(0.979 0.032 75)`     | `#fff7ed` | Skip/next icons   |
| `--accent-green`  | `oklch(0.984 0.030 155)`    | `#f0fdf4` | Browser icons     |
| `--accent-purple` | `oklch(0.968 0.026 308)`    | `#fdf4ff` | Flag/misc icons   |

---

## Typography

### Font Families

| Variable                    | Font              | Usage                            |
|-----------------------------|-------------------|----------------------------------|
| `--font-inter` / `font-sans`| **Inter**         | All body, UI, labels, buttons    |
| `--font-instrument-serif`   | **Instrument Serif** | Logo wordmark only (`Creonex`) |
| `--font-plus-jakarta`       | **Plus Jakarta Sans** | Step numbers, display numerals |

> **Note:** Designer used Plus Jakarta Sans only for step numbers and display headings.
> Default heading font is Inter. Do not mix Plus Jakarta Sans into body text.

### Type Scale

| Class              | Size  | Weight   | Line-height | Usage                    |
|--------------------|-------|----------|-------------|--------------------------|
| `h1` / `h2`        | 42px  | 800      | 1.2         | Page hero / section headings |
| `h3` / `.heading-card` | 20px | 700  | normal      | Card titles              |
| `h4` / `.heading-step` | 18px | 700  | normal      | Step titles (display font) |
| `h5`               | 16px  | 600      | normal      | Sub-headings             |
| `h6`               | 14px  | 600      | normal      | Small labels             |
| `.body-lg`         | 15px  | 400      | 1.7         | Hero subtext, card body  |
| `.body-md`         | 14px  | 400      | 1.6         | General paragraphs       |
| `.body-sm`         | 12px  | 400      | 1.6         | Captions, meta           |
| `.label-muted`     | 14px  | 500      | —           | Form labels, footer cols |
| `.section-badge`   | 10.5px| 700      | —           | Section pill labels      |

---

## Layout & Spacing

### Section Padding

Use the `.section` class on all full-width page sections:

```tsx
<section className="section section-surface">
  <div className="container-inner">
    {/* content */}
  </div>
</section>
```

| Class         | Horizontal pad               | Vertical pad |
|---------------|------------------------------|--------------|
| `.section`    | Responsive (4px→8px→16px→~11vw) | `py-24` (96px) |
| `.section-sm` | Same responsive              | `py-16` (64px) |

### Container Width

Max content width: **1100px**, centered.

```tsx
<div className="container-inner">…</div>
```

### Section Alternation (Zebra Pattern)

Alternate between white and surface backgrounds section by section:

```
Navbar         → bg-background
Hero           → bg-background
Stats bar      → bg-surface
WhyCreonex     → bg-surface
Courses        → bg-background
HowItWorks     → bg-surface
Workshops      → bg-background
...
Footer         → bg-background (radial brand gradient overlay)
```

---

## Gradients

### Brand Gradient

```css
background-image: linear-gradient(135deg, var(--brand-dark), var(--brand-end));
```

**Usage:** CTA buttons, step circles, submit buttons, gradient text.

CSS classes: `.bg-brand-gradient`, `.text-brand-gradient`

> **Do NOT use a flat `#7C5CFF`** for primary buttons — always use the gradient.
> Flat brand color (`--brand`) is for borders, text links, and focus rings only.

### Footer Radial

```css
background-image: radial-gradient(ellipse at 50% 100%, oklch(0.443 0.168 276.8 / 0.08), transparent 70%),
                  linear-gradient(0deg, white, white);
```

---

## Border Radius

| Token          | Value            | Usage                    |
|----------------|------------------|--------------------------|
| `--radius-sm`  | ~0.3rem (5px)    | Inputs, tags             |
| `--radius-md`  | ~0.47rem (7.5px) | Small cards              |
| `--radius-lg`  | 0.625rem (10px)  | Default / buttons        |
| `--radius-xl`  | ~0.94rem (15px)  | Cards                    |
| `--radius-2xl` | ~1.25rem (20px)  | Feature cards (design uses 20px explicitly) |
| `--radius-3xl` | ~2rem (32px)     | Step circles             |
| `--radius-full`| 9999px           | Pills, avatar, tag chips |

---

## Shadows

| Context          | Value                                       |
|------------------|---------------------------------------------|
| Nav shadow       | `drop-shadow(0 0 4px oklch(0 0 0 / 0.1))`  |
| Step circles     | `0 8px 16px oklch(0.516 0.249 271.5 / 0.2)` |
| Card hover       | Tailwind `shadow-lg`                        |

---

## Component Patterns

### Section Badge

```tsx
<span className="section-badge">Why Creonex</span>
```

### Section Header

```tsx
<div className="section-header">
  <span className="section-badge">How It Works</span>
  <h2>Start learning in minutes</h2>
  <p className="body-lg max-w-xl">…</p>
</div>
```

### Feature Card

```tsx
<div className="card-feature-hover">
  <div className="icon-pad-indigo mb-6">
    <Icon className="size-8" />
  </div>
  <h3 className="mb-3">Card title</h3>
  <p className="body-lg">Description text.</p>
</div>
```

### Primary Button

```tsx
<button className="btn-primary">Get Started Free</button>
```

### Step Circle (HowItWorks)

```tsx
<div className="bg-brand-gradient rounded-full size-20 flex items-center justify-center
                shadow-[0_8px_16px_oklch(0.516_0.249_271.5/0.2)]">
  <span className="font-display font-extrabold text-[28px] text-white">1</span>
</div>
```

---

## Dark Mode

Dark mode tokens are in `.dark` class (not `prefers-color-scheme`). Toggle by adding/removing the `dark` class on `<html>`.

Design decisions (Figma had no dark designs):
- Base: deep navy-black `oklch(0.098 0.020 264)` — complements brand purple
- Cards: lifted surface `oklch(0.148 0.022 268)`
- Brand color brightened slightly for contrast: `oklch(0.638 0.220 275.8)`
- Icon accent pads: darkened to match surface energy

---

## Inconsistencies Fixed (vs. Figma)

| Problem in Figma                           | What we standardised in code         |
|--------------------------------------------|--------------------------------------|
| Headings use both `#0f172a` and `#121212`  | Always `--foreground` (#0f172a)      |
| Button font-size 10-11px (too small)       | Standardised to `text-sm` (14px)     |
| Plus Jakarta Sans in random places         | Only `.heading-step` + step numbers  |
| Logo color `#534ab7` vs CTA `#7C5CFF`      | Logo uses `--brand-dim`, CTA uses gradient |
| Section badges inconsistent size/border    | `.section-badge` utility class        |
| No dark mode                               | Designed from scratch with brand palette |
