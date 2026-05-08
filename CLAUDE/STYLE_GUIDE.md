# inplicit.ai — Style Guide & Design System

> Single source of truth. Drop the CSS variables into your `global.css`, copy the patterns, and your Deno/TSX project will look identical to the website.
>
> **Source:** ported from `/src/styles/design.css` and the production Astro components in `/src/components/`.
> **Aesthetic:** brutalist‑minimal, dark by default, monochromatic with a single warm accent (`#f5a623`). No external UI kits.

---

## 0. How to Use This File in a Deno / TSX Project

1. Copy **§1 (design.css)** verbatim into your project's global stylesheet (e.g. `app/styles/design.css` or `app/global.css`). It works as plain CSS — no build step required.
2. Load Inter from Google Fonts (see §2) and import the stylesheet at the root of your app.
3. Use the **CSS custom properties** (e.g. `var(--color-bg)`, `var(--space-6)`) in JSX `style={{ ... }}` props or in CSS modules. **Never hardcode hex/px values** that exist as a token.
4. Drop in the React/TSX components from §6 (button, card, fade-in observer, theme toggle).
5. For animations, use the keyframes defined in §5 — they're already tuned to the easing curves.

---

## 1. design.css — Drop-in Global Stylesheet

This is the single source of truth. Paste it once. Everything else in the system references it.

```css
/* design.css — single source of truth for all design tokens */

/* ---- Dark (The Void) — default ---- */
:root {
  /* Colors */
  --color-bg: #0a0a0a;
  --color-surface: #111111;
  --color-surface-elevated: #161616;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-subtle: rgba(255, 255, 255, 0.04);
  --color-text-primary: #ffffff;
  --color-text-secondary: rgba(255, 255, 255, 0.55);
  --color-text-tertiary: rgba(255, 255, 255, 0.28);
  --color-accent: #f5a623;
  --color-accent-dark: #d4891a;
  --color-accent-light: rgba(245, 166, 35, 0.08);
  --color-accent-muted: rgba(245, 166, 35, 0.18);

  /* CTA tokens — inverted from bg in each mode */
  --color-cta-bg: #ffffff;
  --color-cta-text: #000000;
  --color-cta-icon-bg: rgba(0, 0, 0, 0.12);

  /* Shadows — near-invisible in dark mode */
  --shadow-xs: 0 1px 3px rgba(0, 0, 0, 0.5);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.6);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.7);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.8);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.9);

  /* Typography */
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.25rem;    /* 20px */
  --text-xl: 2rem;       /* 32px */
  --text-2xl: 3rem;      /* 48px */
  --text-3xl: 4rem;      /* 64px */
  --text-4xl: 6rem;      /* 96px */

  /* Spacing (multiples of 4px base unit) */
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
  --space-40: 10rem;     /* 160px */
  --space-48: 12rem;     /* 192px */
  --space-section: 9rem;     /* 144px — standard section gap */
  --space-section-lg: 13rem; /* 208px — hero/feature gap */

  /* Border radii — brutalist sharp */
  --radius-ui: 2px;
  --radius-card: 4px;
  --radius-xl: 4px;
  --radius-full: 9999px;

  /* Easing */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);

  /* Layout */
  --max-width: 1200px;
  --section-padding: var(--space-section) var(--space-4);
}

/* ---- White Enterprise — [data-theme="light"] ---- */
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-surface: #f9f9f9;
  --color-surface-elevated: #f3f4f6;
  --color-border: rgba(0, 0, 0, 0.08);
  --color-border-subtle: rgba(0, 0, 0, 0.04);
  --color-text-primary: #000000;
  --color-text-secondary: rgba(0, 0, 0, 0.55);
  --color-text-tertiary: rgba(0, 0, 0, 0.3);
  --color-accent: #d4891a;
  --color-accent-dark: #b87515;
  --color-accent-light: rgba(245, 166, 35, 0.06);
  --color-accent-muted: rgba(245, 166, 35, 0.14);

  --color-cta-bg: #000000;
  --color-cta-text: #ffffff;
  --color-cta-icon-bg: rgba(255, 255, 255, 0.15);

  --shadow-xs: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 4px 16px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.03);
  --shadow-md: 0 8px 32px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 24px 64px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04);
}

/* Base reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-family);
  font-size: 16px;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body { min-height: 100vh; line-height: 1.6; }
a    { color: inherit; text-decoration: none; }
img  { max-width: 100%; height: auto; }

h1, h2, h3 {
  font-weight: 400 !important;
  letter-spacing: -0.02em !important;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

@media (min-width: 768px) {
  .container { padding: 0 var(--space-8); }
}

/* Section fade-in animation (Intersection Observer targets) */
.section-fade {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-spring);
  transition-delay: var(--delay, 0ms);
}

.section-fade.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .section-fade {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

---

## 2. Typography

**Font:** Inter (Google Fonts), variable weights 100–900.

```html
<!-- in your <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
  rel="stylesheet"
/>
```

### Type scale

| Token | rem | px | Used for |
|-------|-----|-----|----------|
| `--text-xs` | 0.75rem | 12px | Eyebrows, badges, micro-labels |
| `--text-sm` | 0.875rem | 14px | Footer, captions, secondary nav |
| `--text-base` | 1rem | 16px | Body copy, buttons |
| `--text-lg` | 1.25rem | 20px | Lead/sub paragraphs |
| `--text-xl` | 2rem | 32px | Section H2 (small variant) |
| `--text-2xl` | 3rem | 48px | Section H2 |
| `--text-3xl` | 4rem | 64px | Section H1 |
| `--text-4xl` | 6rem | 96px | Hero headline |

### Heading recipes

All headings: **font-weight 800, letter-spacing −0.04em, line-height 1.0–1.05**, fluid via `clamp()`.

```css
/* Hero headline */
.headline-hero {
  font-size: clamp(var(--text-2xl), 8vw, var(--text-4xl));
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.04em;
}

/* Section heading (H2) */
.heading-section {
  font-size: clamp(var(--text-xl), 4vw, var(--text-2xl));
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
}

/* Step / sub-section heading (H3) */
.heading-step {
  font-size: clamp(var(--text-xl), 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

/* Eyebrow (above headings) */
.eyebrow {
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-tertiary);
}

/* Body copy */
.body {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* Big stat number */
.stat-num {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
}
```

### The "two-tone heading" pattern (signature)

Every section heading has **line 1 at full opacity and line 2 at opacity 0.3** — same color, just dimmed. It's the most recognisable typographic move in the brand.

```tsx
<h2 className="heading-section" style={{ display: "flex", flexDirection: "column", gap: "0.06em" }}>
  <span style={{ color: "var(--color-text-primary)" }}>Everything you need</span>
  <span style={{ color: "var(--color-text-primary)", opacity: 0.3 }}>
    to understand any organisation.
  </span>
</h2>
```

---

## 3. Color System

### Roles

| Token | Dark | Light | Use |
|-------|------|-------|-----|
| `--color-bg` | `#0a0a0a` | `#ffffff` | Page background |
| `--color-surface` | `#111111` | `#f9f9f9` | Card / panel background |
| `--color-surface-elevated` | `#161616` | `#f3f4f6` | Mock chrome, button hover, nested surface |
| `--color-border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` | Card borders, dividers |
| `--color-border-subtle` | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.04)` | Internal row separators |
| `--color-text-primary` | `#ffffff` | `#000000` | Headlines, body emphasis |
| `--color-text-secondary` | `rgba(255,255,255,0.55)` | `rgba(0,0,0,0.55)` | Body copy, sub-labels |
| `--color-text-tertiary` | `rgba(255,255,255,0.28)` | `rgba(0,0,0,0.3)` | Eyebrows, captions, muted meta |
| `--color-accent` | `#f5a623` | `#d4891a` | Pulse dot, check marks, single highlight |
| `--color-accent-light` | `rgba(245,166,35,0.08)` | `rgba(245,166,35,0.06)` | Accent-tinted backgrounds |
| `--color-accent-muted` | `rgba(245,166,35,0.18)` | `rgba(245,166,35,0.14)` | Accent-tinted borders |
| `--color-cta-bg` | `#ffffff` | `#000000` | Primary CTA fill (always inverted) |
| `--color-cta-text` | `#000000` | `#ffffff` | Primary CTA text |
| `--color-cta-icon-bg` | `rgba(0,0,0,0.12)` | `rgba(255,255,255,0.15)` | Inner icon tile of primary CTA |

### Semantic accents (universal across themes)

- Success: `#22c55e` (with `rgba(34,197,94,0.1)` bg, `rgba(34,197,94,0.2)` border)
- Warning / mid: `#f59e0b` (with 10%/20% rgba variants)
- Error / red: `#ef4444`

These are used on status pills, "Done" labels, mock "end call" buttons. **Never use them as page accent — only `--color-accent` (orange) plays that role.**

---

## 4. Spacing & Layout

Spacing is on a strict 4px base. Use tokens, never magic numbers.

| Token | Pixels | Common use |
|-------|--------|------------|
| `--space-1` | 4px | tight gap, badge inner pad-y |
| `--space-2` | 8px | gap between adjacent inline elements |
| `--space-3` | 12px | small gap, badge inner pad-x |
| `--space-4` | 16px | card body padding (mobile), default gap |
| `--space-6` | 24px | container side padding |
| `--space-8` | 32px | card padding, CTA pad-x |
| `--space-12` | 48px | card big padding |
| `--space-16` | 64px | header→content gap inside section |
| `--space-24` | 96px | section padding (mobile) |
| `--space-section` | 144px | standard section padding-y (desktop) |
| `--space-section-lg` | 208px | hero section padding-y |

### Container

```tsx
<div className="container">{/* max-width: 1200px, auto-centered */}</div>
```

### Section pattern

```css
.section {
  padding: var(--space-section) 0;
  border-top: 1px solid var(--color-border);
}

@media (max-width: 767px) {
  .section { padding: var(--space-24) 0; }
}
```

### Border radii (brutalist-sharp)

- `--radius-ui: 2px` — buttons, icon tiles, pills
- `--radius-card: 4px` — cards, mock windows
- `--radius-full: 9999px` — badges, status pills, dots

> Don't introduce rounded-lg/xl. Sharp corners are deliberate.

---

## 5. Micro-animations & Easing

### Easing tokens

```css
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275); /* slight overshoot — for transforms, expansions */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);            /* default — for opacity, color */
--ease-out:    cubic-bezier(0, 0, 0.2, 1);              /* enter animations */
```

**Rule of thumb:**
- transforms / size changes → `--ease-spring`
- color, opacity, border → `--ease-smooth`
- entrance fades → `--ease-out`

### Standard durations

- 150ms — color/border hover (links, nav items)
- 200ms — state toggles, opacity hover
- 250ms — accordion height
- 400ms — CTA icon expand
- 500ms — section fade-in
- 700ms — hero entrance

### The signature animations

#### 5.1 Section fade-in (Intersection Observer)

The whole site uses one CSS class + one IntersectionObserver. Stagger delays via inline `--delay` custom property.

```css
.section-fade {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-spring);
  transition-delay: var(--delay, 0ms);
}
.section-fade.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

```tsx
// React/TSX hook — drop into a top-level layout file
import { useEffect } from "react";

export function useSectionFade() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".section-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// usage
<div className="section-fade" style={{ "--delay": "0ms" } as React.CSSProperties}>...</div>
<div className="section-fade" style={{ "--delay": "60ms" } as React.CSSProperties}>...</div>
<div className="section-fade" style={{ "--delay": "120ms" } as React.CSSProperties}>...</div>
```

#### 5.2 Hero entrance (CSS-only stagger)

```css
@keyframes hero-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero__inner    { animation: hero-in 0.7s var(--ease-out) forwards; }
.hero__badge    { animation: hero-in 0.7s var(--ease-out) forwards 0.05s; opacity: 0; }
.hero__headline { animation: hero-in 0.7s var(--ease-out) forwards 0.10s; opacity: 0; }
.hero__sub      { animation: hero-in 0.7s var(--ease-out) forwards 0.18s; opacity: 0; }
.hero__actions  { animation: hero-in 0.7s var(--ease-out) forwards 0.26s; opacity: 0; }
.hero__meta     { animation: hero-in 0.7s var(--ease-out) forwards 0.34s; opacity: 0; }
```

#### 5.3 Pulse dot (live indicator)

```css
@keyframes pulse {
  0%, 100% { opacity: 1;   transform: scale(1); }
  50%      { opacity: 0.5; transform: scale(1.4); }
}

.pulse-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--color-accent);
  animation: pulse 2.5s ease-in-out infinite;
}
```

#### 5.4 Status dot (green = live)

```css
@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #22c55e;
  animation: pulse-dot 2s ease-in-out infinite;
}
```

#### 5.5 Spinner (workflow "active" state)

```css
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.spin svg { animation: spin 1.5s linear infinite; }
```

#### 5.6 Typing dots (chat indicator)

```css
@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0);  opacity: 0.35; }
  30%           { transform: translateY(-4px); opacity: 1; }
}

.typing-dots { display: flex; gap: 3px; padding: 10px 14px; }
.typing-dots span {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--color-text-tertiary);
  animation: typing-bounce 1.3s ease-in-out infinite;
}
.typing-dots span:nth-child(2) { animation-delay: 0.18s; }
.typing-dots span:nth-child(3) { animation-delay: 0.36s; }
```

### Reduced motion

Always wrap any infinite or non-essential animation:

```css
@media (prefers-reduced-motion: reduce) {
  .pulse-dot, .status-dot, .spin svg, .typing-dots span,
  .section-fade, .hero__inner /* etc. */ {
    animation: none;
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

---

## 6. Component Patterns (TSX)

### 6.1 Primary CTA — "icon-expand-on-hover"

The signature button. Label fades out, accent icon tile expands from 25% to ~100% of width.

```tsx
import "./design.css";

interface PrimaryCtaProps {
  href: string;
  children: React.ReactNode;
}

export function PrimaryCta({ href, children }: PrimaryCtaProps) {
  return (
    <a href={href} className="cta cta--primary">
      <span className="cta__label">{children}</span>
      <i className="cta__icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </i>
    </a>
  );
}
```

```css
.cta--primary {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  height: 48px;
  padding: 0 var(--space-8);
  background-color: var(--color-cta-bg);
  color: var(--color-cta-text);
  font-size: var(--text-base);
  font-weight: 700;
  letter-spacing: -0.01em;
  border-radius: var(--radius-ui);
  transition: opacity 0.2s var(--ease-smooth);
}

.cta--primary:hover  { opacity: 0.85; }
.cta--primary:active { transform: scale(0.97); }

.cta__label {
  margin-right: var(--space-10);
  transition: opacity 0.4s var(--ease-smooth);
  white-space: nowrap;
}

.cta--primary:hover .cta__label { opacity: 0; }

.cta__icon {
  position: absolute;
  right: 4px; top: 4px; bottom: 4px;
  border-radius: var(--radius-ui);
  display: grid;
  width: 25%;
  place-items: center;
  background-color: var(--color-cta-icon-bg);
  transition: width 0.4s var(--ease-spring);
  z-index: 1;
}

.cta--primary:hover .cta__icon { width: calc(100% - 8px); }
```

### 6.2 Secondary CTA — outlined

```tsx
<a href="#section" className="cta cta--secondary">How it works</a>
```

```css
.cta--secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  height: 48px;
  padding: var(--space-3) var(--space-6);
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  font-weight: 500;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-ui);
  transition: color 0.15s var(--ease-smooth), border-color 0.15s var(--ease-smooth);
}

.cta--secondary:hover {
  color: var(--color-text-primary);
  border-color: var(--color-text-tertiary);
}
```

### 6.3 Ghost CTA — gap-grows-on-hover

```css
.cta--ghost {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  font-weight: 600;
  border-radius: var(--radius-ui);
  transition:
    color 0.15s var(--ease-smooth),
    border-color 0.15s var(--ease-smooth),
    gap 0.2s var(--ease-spring);
}
.cta--ghost:hover {
  color: var(--color-text-primary);
  border-color: var(--color-text-tertiary);
  gap: var(--space-3); /* arrow scoots */
}
```

### 6.4 Badge / Pill (with optional pulse dot)

```tsx
<div className="badge">
  <span className="badge__dot" aria-hidden="true" />
  AI-powered workforce intelligence
</div>
```

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.badge__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--color-accent);
  animation: pulse 2.5s ease-in-out infinite;
}
```

### 6.5 Eyebrow

```tsx
<p className="eyebrow">How it works</p>
```

```css
.eyebrow {
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-4);
}
```

### 6.6 Card

```tsx
<div className="card">
  <div className="card__icon">{/* svg */}</div>
  <h3>{title}</h3>
  <p>{body}</p>
</div>
```

```css
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  transition: border-color 0.2s var(--ease-smooth);
}
.card:hover { border-color: var(--color-text-tertiary); }

@media (max-width: 767px) {
  .card { padding: var(--space-6); }
}

.card__icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-ui);
  color: var(--color-text-secondary);
}
```

### 6.7 Italic callout (quote)

```css
.callout {
  font-weight: 500;
  font-style: italic;
  color: var(--color-text-primary);
  border-left: 1px solid var(--color-text-tertiary);
  padding-left: var(--space-4);
  opacity: 0.75;
  line-height: 1.8;
}
```

### 6.8 Check-list item

```tsx
<li className="check-item">
  <span className="check-item__icon" aria-hidden="true">
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
  30-minute AI interview session with your team
</li>
```

```css
.check-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.5;
}
.check-item__icon {
  width: 18px; height: 18px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-ui);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-secondary);
  flex-shrink: 0;
  margin-top: 2px;
}
```

The inline meta-row alternative (uses orange ✓):

```css
.meta-check::before {
  content: '✓ ';
  color: var(--color-accent);
  font-weight: 600;
}
```

### 6.9 Theme toggle (dark ⇄ light)

```tsx
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (_) { /* private mode */ }
  }, [theme]);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle theme"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
```

To prevent a flash of wrong theme, add a tiny inline script in `<head>` **before** any stylesheet:

```html
<script>
  (function () {
    try {
      var saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch (_) {}
  })();
</script>
```

### 6.10 Sticky nav with blur + scroll state

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-4) 0;
  transition: border-color 0.2s var(--ease-smooth);
}
.nav.scrolled {
  background-color: color-mix(in srgb, var(--color-bg) 92%, transparent);
}
```

```tsx
useEffect(() => {
  const onScroll = () => {
    document.getElementById("nav")?.classList.toggle("scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

### 6.11 Stat (big number + label)

```css
.stats { display: flex; gap: var(--space-8); padding-top: var(--space-8);
         border-top: 1px solid var(--color-border); }
.stat  { display: flex; flex-direction: column; gap: var(--space-1); }
.stat__num   { font-size: clamp(1.75rem, 3.5vw, 2.5rem);
               font-weight: 600; letter-spacing: -0.04em; line-height: 1;
               color: var(--color-text-primary); }
.stat__label { font-size: var(--text-xs); color: var(--color-text-tertiary);
               font-weight: 500; }
```

### 6.12 Mock window (for product visuals)

The "mock chrome" pattern (traffic-light dots + title bar) is used everywhere illustrative.

```css
.mock {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  font-family: var(--font-family);
}
.mock__chrome {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-surface-elevated);
}
.mock__dots { display: flex; gap: 5px; }
.mock__dot  { width: 9px; height: 9px; border-radius: 50%; }
.mock__dot--r { background: #ef4444; }
.mock__dot--y { background: #f59e0b; }
.mock__dot--g { background: #22c55e; }
.mock__title  { font-size: 11px; font-weight: 500; color: var(--color-text-tertiary); }
.mock__body   { padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }
```

### 6.13 Status pills (colored)

```css
/* Success ("Connected", "Done") */
.pill--success {
  font-size: 10px;
  font-weight: 600;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  padding: 2px 7px;
  border-radius: var(--radius-full);
}

/* Accent ("Opportunities", high-confidence) */
.pill--accent {
  font-size: 10px;
  font-weight: 700;
  color: var(--color-accent);
  background: var(--color-accent-light);
  border: 1px solid var(--color-accent-muted);
  padding: 1px 7px;
  border-radius: var(--radius-full);
}

/* Mid (warning/medium confidence) */
.pill--mid {
  font-size: 10px;
  font-weight: 700;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
  padding: 1px 6px;
  border-radius: var(--radius-full);
}
```

---

## 7. Responsive Breakpoints

Mobile-first. Breakpoints used in production:

| Min-width | Token meaning |
|-----------|---------------|
| 480px | small phone landscape |
| 640px | tablet portrait — first multi-column grid |
| 768px | tablet landscape — full multi-column, hero step layout |
| 1024px | desktop — 3-column grids |

```css
/* Pattern */
.grid { display: grid; grid-template-columns: 1fr; gap: var(--space-2); }

@media (min-width: 640px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }

/* Section padding shrinks on mobile */
.section { padding: var(--space-section) 0; }
@media (max-width: 767px) {
  .section { padding: var(--space-24) 0; }
}
```

---

## 8. Hard Rules — Don't Deviate

1. **Never hardcode hex/px values that have a token.** `#0a0a0a` → `var(--color-bg)`. `16px` → `var(--space-4)`.
2. **Two-tone heading is the brand voice.** Always split section headings into a primary line + a 0.3-opacity dimmed line.
3. **Single accent.** `--color-accent` (#f5a623) is the only "color" the eye should land on. Green/red/amber appear *only* on status indicators, never as primary accent.
4. **Sharp corners.** No `border-radius: 8px+`. The brutalist 2/4px is the look.
5. **Inter, weights 400/500/600/700/800.** No other typeface.
6. **Always include `prefers-reduced-motion`.** Every keyframe + transition needs an opt-out.
7. **Section-fade everywhere.** Anything below the fold should fade in. Stagger with `--delay` in ms increments of 60.
8. **Transitions: spring for transforms, smooth for color/opacity.** Never use `linear` or default browser easing for interactions.

---

## 9. Quick-Start Checklist for a New Deno/TSX Project

- [ ] Copy §1 into `app/global.css`
- [ ] Add Inter font links to `<head>` (§2)
- [ ] Add the no-flash theme script to `<head>` (§6.9)
- [ ] Set `<html data-theme="dark">` as default
- [ ] Mount `useSectionFade()` at app root (§5.1)
- [ ] Use `.container` for max-width wrapping
- [ ] Build pages out of `<section>` blocks following the section pattern (§4)
- [ ] Use `<PrimaryCta>` / `<SecondaryCta>` from §6 instead of bespoke buttons
- [ ] Verify all colors / spacing reference CSS variables (§3, §4)
- [ ] Test with `prefers-reduced-motion: reduce` enabled
