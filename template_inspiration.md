# Design System & Template Inspiration Guide
> **Target Project**: Professor Academic & Research Website  
> **Source Design System**: Obsidian Minimalist Luxury Portfolio (`achyut-portfolio`)  
> **Document Purpose**: Comprehensive technical, structural, and visual blueprint for replicating the exact design language, component architecture, animations, and typography for a professor's academic website.

---

## 📋 Table of Contents
1. [Executive Summary & Design Philosophy](#1-executive-summary--design-philosophy)
2. [Design Tokens & CSS Custom Properties](#2-design-tokens--css-custom-properties)
3. [Typography & Font System](#3-typography--font-system)
4. [Animation & Motion Architecture](#4-animation--motion-architecture)
5. [Complete Component Specification](#5-complete-component-specification)
   - [5.1 Layout & Theme Switcher](#51-layout--theme-switcher)
   - [5.2 Sticky Header & Overlay Navigation](#52-sticky-header--overlay-navigation)
   - [5.3 Academic Hero Section](#53-academic-hero-section)
   - [5.4 Spotlight Feature Card (Grants / Books / Lab)](#54-spotlight-feature-card-grants--books--lab)
   - [5.5 Research & Publication List Items](#55-research--publication-list-items)
   - [5.6 Animated Academic Stat Counters](#56-animated-academic-stat-counters)
   - [5.7 Academic CV / Timeline & Skills Grid](#57-academic-cv--timeline--skills-grid)
   - [5.8 Research Paper & Monograph Reader](#58-research-paper--monograph-reader)
   - [5.9 Contact Form & Footer](#59-contact-form--footer)
6. [Academic Adaptation & Content Mapping](#6-academic-adaptation--content-mapping)
7. [Implementation & Deployment Checklist](#7-implementation--deployment-checklist)

---

## 1. Executive Summary & Design Philosophy

The design identity of this template is **Obsidian Minimalist Luxury** — an editorial, high-precision visual standard characterized by crisp typography, subtle 1px divider lines, generous whitespace, smooth scroll-triggered micro-interactions, and a seamless dual-theme (Light Cream / Dark Obsidian) palette.

### Key Visual Principles
* **Quiet Luxury Palette**: Uses rich warm cream (`#F5F0E6`) for light mode and deep obsidian (`#181818`) for dark mode rather than stark `#FFFFFF`/`#000000`.
* **Editorial Contrast**: Serif titles (`Playfair Display` / `Cormorant Garamond`) paired with high-legibility sans-serif body copy (`Inter`).
* **Precise Geometry**: Strict 1px hairline borders (`var(--color-border)`), constrained container widths (`1180px`), and subtle square photo framing.
* **Fluid Micro-Animations**: Smooth IntersectionObserver scroll reveals, cubic ease-out metric counters, and mobile overlay menu transitions.
* **Academic Dignity**: Minimal ornamentation; content and research take center stage without unnecessary clutter.

---

## 2. Design Tokens & CSS Custom Properties

Copy the following core design system tokens directly into your global stylesheet (`styles/globals.css`).

```css
:root {
  /* Color Palette — Light Mode (Warm Neutral Luxury) */
  --color-bg: #F5F0E6;
  --color-bg-alt: #ECE3D2;
  --color-text: #1A1A1A;
  --color-muted: #6E6658;
  --color-border: #DDD3BE;
  --color-accent: #A9A7A0;
  --color-highlight: #D97757;

  /* Data Visualization / Academic Chart Palette */
  --chart-1: #D97757;
  --chart-2: #4C6B5C;
  --chart-3: #B08A3E;
  --chart-4: #7A5C6E;
  --chart-grid: #DDD3BE;
  --chart-axis: #6E6658;

  /* Spotlight Feature Card Framing */
  --color-spotlight-border: rgba(26, 26, 26, 0.85);
  --color-spotlight-shadow: none;

  /* Layout Constraints */
  --container-width: 1180px;
}

:root[data-theme='dark'] {
  /* Color Palette — Dark Mode (Obsidian Dark) */
  --color-bg: #181818;
  --color-bg-alt: #222222;
  --color-text: #EDEDEA;
  --color-muted: #9B9B96;
  --color-border: #383838;
  --color-accent: #8C8C87;

  /* Dark Data Visualization Palette */
  --chart-1: #E8926A;
  --chart-2: #7FA491;
  --chart-3: #D1AD6C;
  --chart-4: #B08CA0;
  --chart-grid: #383838;
  --chart-axis: #9B9B96;

  /* Dark Spotlight Feature Card Glow */
  --color-spotlight-border: rgba(237, 237, 234, 0.55);
  --color-spotlight-shadow: 0 0 24px rgba(237, 237, 234, 0.12), 0 0 2px rgba(237, 237, 234, 0.35);
}
```

---

## 3. Typography & Font System

### Font Stack & Google Font Integration (`pages/_app.tsx`)

```tsx
import { Inter, Playfair_Display } from 'next/font/google';

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-serif',
  display: 'swap',
});
```

### Type Hierarchy Rules

| Element | Font Family | Size (Desktop) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`h1` Hero Title** | `var(--font-serif)` | `clamp(2.75rem, 6vw, 5rem)` | 400 | `1.02` | `-0.01em` |
| **`h2` Section Title** | `var(--font-serif)` | `clamp(2.00rem, 4vw, 3rem)` | 400 | `1.08` | `-0.01em` |
| **`h3` Item / Paper Title** | `var(--font-serif)` | `1.40rem` - `1.70rem` | 400 | `1.20` | Normal |
| **Eyebrow Label** | `var(--font-sans)` | `0.75rem` | 500 | `1.00` | `0.32em` (UPPERCASE) |
| **Body Paragraph** | `var(--font-sans)` | `1.00rem` - `1.05rem` | 400 | `1.75` - `1.85` | Normal |
| **Meta / Tech Tags** | `var(--font-sans)` | `0.72rem` - `0.80rem` | 500 | `1.00` | `0.14em` (UPPERCASE) |

---

## 4. Animation & Motion Architecture

### 4.1 Scroll Reveal System (`lib/useReveal.ts` & `components/Reveal.tsx`)

The website uses a lightweight `IntersectionObserver` hook to trigger smooth entrance animations when elements enter the viewport.

#### Hook Implementation (`lib/useReveal.ts`)
```typescript
import { useEffect, useRef, useState } from 'react';

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
```

#### CSS Animation Rule (`styles/globals.css`)
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--reveal-delay, 0s);
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

### 4.2 Animated Numeric Counter (`StatCounter.tsx`)

Counts up dynamically using RequestAnimationFrame with cubic ease-out curve (`1 - Math.pow(1 - progress, 3)`).

```typescript
// Easing progress from 0 to 1 over duration (default 1400ms)
const tick = (now: number) => {
  const progress = Math.min((now - start) / duration, 1);
  const eased = 1 - Math.pow(1 - progress, 3);
  setCount(Math.round(eased * targetValue));
  if (progress < 1) requestAnimationFrame(tick);
};
```

---

## 5. Complete Component Specification

### 5.1 Layout & Theme Switcher

#### FOUC Prevention Script (`pages/_document.tsx`)
Prevents light/dark mode flash before client hydration:
```javascript
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;
```

#### Theme Custom Hook (`lib/useTheme.ts`)
```typescript
import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark' || current === 'light') setThemeState(current);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute('data-theme', next);
    window.localStorage.setItem('theme', next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return { theme, toggleTheme };
}
```

---

### 5.2 Sticky Header & Overlay Navigation

* **Fixed Position**: `position: fixed; top: 0; z-index: 1000; height: ~65px;`
* **Border**: Hairline `1px solid var(--color-border)` at bottom.
* **Wordmark**: `text-transform: uppercase`, `letter-spacing: 0.3em`, size `0.85rem`.
* **Hamburger Morphing**: 3 spans transforming into an `X` shape (`rotate(45deg)` & `rotate(-45deg)`).
* **Fullscreen Menu**: Smooth slide/fade down (`transform: translateY(-12px)` to `0`).

#### Header Styles (`styles/Header.module.css`)
```css
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  background: var(--color-bg);
  z-index: 1000;
  padding: 1.4rem 0;
  border-bottom: 1px solid var(--color-border);
}

.wordmark {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text);
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.overlay {
  position: fixed;
  inset: 0;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.25rem;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-12px);
  transition: opacity 0.35s ease, transform 0.35s ease;
  z-index: 1050;
}

.overlayOpen {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
```

---

### 5.3 Academic Hero Section

Grid-based layout: text block on the left (1.1fr), framed professor portrait on the right (0.9fr).

```tsx
<section className={styles.hero}>
  <div className="container">
    <div className={styles.heroGrid}>
      <div className={styles.heroText}>
        <span className={styles.eyebrow}>Professor of Computer Science</span>
        <h1 className={styles.heroTitle}>Dr. Jane Doe</h1>
        <p className={styles.heroBio}>
          Director of the Intelligent Systems Lab at Nipissing University. Researching multimodal machine learning, neural pipeline optimization, and ethical AI systems.
        </p>
        <div className={styles.heroLinks}>
          <a href="#publications">Publications</a>
          <a href="#teaching">Teaching & Courses</a>
        </div>
      </div>

      <div className={styles.heroPhotoFrame}>
        <Image
          src="/professor-portrait.jpg"
          alt="Dr. Jane Doe portrait"
          width={520}
          height={640}
          className={styles.heroPhoto}
          priority
        />
      </div>
    </div>
  </div>
</section>
```

#### Photo Framing CSS (`styles/Home.module.css`)
```css
.heroPhotoFrame {
  border: 1px solid var(--color-text);
  padding: 0.75rem;
  width: 100%;
  max-width: 380px;
  margin-left: auto;
}

.heroPhoto {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}
```

---

### 5.4 Spotlight Feature Card (Grants / Books / Lab)

Used for highlighting major achievements, key grant awards, book launches, or active research initiatives.

```tsx
<div className={styles.card}>
  <div className={styles.animFrame}>
    {/* SVG Architecture / Vector Art / Lab Banner */}
    <InteractiveLabVisual />
  </div>
  <div className={styles.content}>
    <span className={styles.pill}>NSERC Discovery Grant (2026-2031)</span>
    <h3 className={styles.title}>Multimodal Perception & Reasoning</h3>
    <p className={styles.tagline}>$450,000 Research Initiative in Computer Vision & Neural Systems</p>
    <p className={styles.description}>
      Investigating real-time video understanding pipelines, zero-shot temporal segmentation, and resource-constrained inference engines for field robotics.
    </p>
    <ul className={styles.list}>
      <li>3 Fully-funded Ph.D. Fellowships Available</li>
      <li>Industry collaboration with leading AI research labs</li>
    </ul>
    <p className={styles.stack}>Keywords: PyTorch · Distributed Systems · Edge Vision · LLMs</p>
    <a href="/lab" className={styles.link}>Explore Research Lab ↗</a>
  </div>
</div>
```

#### Card CSS (`components/NorleaseCard.module.css`)
```css
.card {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: stretch;
  border: 1px solid var(--color-spotlight-border);
  box-shadow: var(--color-spotlight-shadow);
  margin-bottom: 3rem;
  overflow: hidden;
  transition: box-shadow 0.4s ease, border-color 0.4s ease;
}

.pill {
  display: inline-block;
  align-self: flex-start;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: 0.3rem 0.7rem;
}

.list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-highlight);
}
```

---

### 5.5 Research & Publication List Items

Clean, horizontal rows with subtle top/bottom divider rules.

```tsx
<div className={styles.projectRow}>
  <div className={styles.projectRowBox}>
    {/* SVG or Canvas Visual Preview of Paper Diagrams */}
    <PaperThumbnail paperId={paper.id} />
  </div>
  <div className={styles.projectRowInfo}>
    <h3>{paper.title}</h3>
    <p>{paper.abstractSummary}</p>
    <span className={styles.projectRowMeta}>
      {paper.journalVenue} · {paper.year} · DOI: {paper.doi}
    </span>
  </div>
</div>
```

```css
.projectRow {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2.5rem;
  align-items: center;
  padding: 2rem 0;
  border-bottom: 1px solid var(--color-border);
}

.projectRowBox {
  aspect-ratio: 4 / 2.2;
  border: 1px solid var(--color-border);
  overflow: hidden;
}
```

---

### 5.6 Animated Academic Stat Counters

For displaying impact metrics (e.g., Peer-Reviewed Papers, Total Citations, Grant Funding, Graduate Students Supervised).

```tsx
<div className={styles.statsRow}>
  <StatCounter label="Peer-Reviewed Publications" value={48} suffix="+" />
  <StatCounter label="Academic Citations" value={3420} suffix="+" />
  <StatCounter label="Research Grants Raised" value={1800000} prefix="$" suffix="+" />
  <StatCounter label="Ph.D. & M.Sc. Alumni" value={24} />
</div>
```

```css
.stat {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.value {
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 400;
  color: var(--color-text);
  line-height: 1;
}

.label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--color-muted);
}
```

---

### 5.7 Academic CV / Timeline & Skills Grid

#### Experience & Education Items (`styles/Resume.module.css`)
```tsx
<div className={styles.item}>
  <h3>Full Professor & Department Chair</h3>
  <p className={styles.institution}>Department of Computer Science, Nipissing University</p>
  <p className={styles.date}>2018 – Present</p>
  <ul className={styles.details}>
    <li>Leading departmental research strategy and accreditation.</li>
    <li>Supervised 14 Graduate Thesis Defenses with 100% completion rate.</li>
  </ul>
</div>
```

#### Custom Em-Dash Bullet Style
```css
.details li {
  position: relative;
  padding-left: 1.25rem;
  margin-bottom: 0.65rem;
  line-height: 1.65;
  font-size: 0.95rem;
}

.details li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}
```

#### Skill & Research Tags Grid
```tsx
<div className={styles.skillsGrid}>
  <div className={styles.skillCategory}>
    <h3>Research Areas</h3>
    <div className={styles.skillTags}>
      <span>Computer Vision</span>
      <span>Multimodal Learning</span>
      <span>Distributed Inference</span>
      <span>Ethical AI</span>
    </div>
  </div>
</div>
```

```css
.skillTags span {
  border: 1px solid var(--color-border);
  color: var(--color-muted);
  padding: 0.4rem 0.85rem;
  font-size: 0.82rem;
  transition: border-color 0.25s ease, color 0.25s ease;
}

.skillTags span:hover {
  border-color: var(--color-text);
  color: var(--color-text);
}
```

---

### 5.8 Research Paper & Monograph Reader (`pages/capstone.tsx` Style)

For presenting full capstone papers, open-access journal articles, or lecture monographs directly on the site.

* **Header Metadata Block**: Includes Course / Department info, Grant acknowledgement, and Slide/Presentation preview card.
* **Paper Container**: Styled like a physical paper (`.paper` box with clean margins and academic typography).

```css
.paper {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 3.5rem 4rem;
  max-width: 900px;
  margin: 0 auto;
}
```

---

### 5.9 Contact Form & Footer

#### Minimalist Form Fields (`styles/ContactForm.module.css`)
```css
.input, .textarea {
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  transition: border-color 0.25s ease;
}

.input:focus, .textarea:focus {
  outline: none;
  border-color: var(--color-text);
}
```

#### Footer Architecture (`components/Footer.tsx`)
* **Left Side**: Academic Contact Info (Office Room #, University Email, Phone, Office Hours).
* **Right Side**: Professional & Academic Links (Google Scholar, ORCID, ResearchGate, GitHub, LinkedIn).

---

## 6. Academic Adaptation & Content Mapping

Here is how to map the existing portfolio sections to a Professor's Academic Website:

| Current Portfolio Component | Professor's Website Adaptation |
| :--- | :--- |
| **Hero Bio** | Academic Biography, University Title, Research Statement & Office Hours |
| **Featured Norlease Card** | **Spotlight Research Grant / Lab Banner / Recent Book Release** |
| **Projects List** | **Key Peer-Reviewed Publications / Active Lab Research Projects** |
| **Insurance Services** | **Courses Taught (Undergraduate & Graduate) & Syllabi** |
| **Stat Counter** | **Academic Metrics (Citations, H-Index, Grants, Graduate Students)** |
| **Resume Page** | **Full Academic Curriculum Vitae (CV), Education, Tenure & Awards** |
| **Capstone Showcase Page** | **Open-Access Papers, Monographs, or Major Lecture Notes** |

---

## 7. Implementation & Deployment Checklist

When setting up the new site for the professor:

1. [ ] **Initialize Next.js App**: Run `npx create-next-app@latest professor-site --typescript --eslint`.
2. [ ] **Copy Global Styles**: Import `globals.css` and `design-tokens.css` with the `--color-bg: #F5F0E6` light theme and dark obsidian theme.
3. [ ] **Configure Google Fonts**: Set up `Playfair Display` (or `Cormorant Garamond`) for serif headings and `Inter` for sans-serif body copy in `_app.tsx`.
4. [ ] **Add FOUC Prevention Script**: Place `THEME_INIT_SCRIPT` inside `_document.tsx`.
5. [ ] **Implement Scroll Reveal**: Include `lib/useReveal.ts` and wrap page sections in `<Reveal>`.
6. [ ] **Build Core Components**: Copy and adapt `Header`, `Footer`, `ThemeToggle`, `StatCounter`, `SpotlightCard`, and `ContactForm`.
7. [ ] **Configure CMS / Content**: Connect to WordPress REST API, MDX files, or local JSON for managing publications and lab updates dynamically.
8. [ ] **Verify Responsive Design**: Test layout at mobile (`<600px`), tablet (`<900px`), and desktop (`1180px+`).
9. [ ] **Deploy**: Deploy static build (`next build && next export`) to Firebase Hosting, Vercel, or University Web Servers.

---
*Generated based on the Obsidian Minimalist Luxury Design System of `achyut-portfolio`.*
