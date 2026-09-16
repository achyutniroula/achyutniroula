# Insurance Refinement + Norlease Spotlight Rework — Claude Code Prompt

Eight scoped changes. Keep the existing design system (off-white `#FAF8F5`, near-black text, light sans + tracked uppercase labels, generous whitespace). Do not restyle anything outside the scope below.

**House style note for all copy written in this pass:** minimal em dashes. Use commas, periods, or restructure the sentence instead.

---

## 1. Stock thumbnails for the Accounts cards

Same treatment already applied to the 8 insurance service cards, now for the 8 account cards on `/insurance`.

Source from **Unsplash or Pexels only**. Download, optimize, commit locally, do not hotlink. Save to `public/images/accounts/{slug}.webp`, 1200×800, quality ~80, under 150KB, with blur placeholder. Add to the existing `CREDITS.md`.

| Slug | Search terms | Direction |
|---|---|---|
| `tfsa` | "saving money jar plant", "young person budgeting laptop" | Accessible, everyday |
| `rrsp` | "retirement planning couple", "long term horizon path" | Long-horizon, steady |
| `fhsa` | "first home keys couple", "new homeowner door" | Milestone, hopeful |
| `resp` | "child studying desk", "graduation family proud" | Education, future-focused |
| `non-registered` | "stock market screen calm", "investment portfolio review" | Flexible, open-ended |
| `rrif` | "retired person morning coffee", "senior enjoying retirement" | Calm income, arrived |
| `lira-lif` | "office worker leaving job", "pension documents desk" | Transition, locked-in |
| `rdsp` | "accessible home support", "caregiver family warmth" | Dignified, supportive. **No pity framing, no medical-equipment close-ups.** |

Rest state `filter: saturate(0.9)`, hover to full saturation with `scale(1.03)` over 600ms. Descriptive `alt` on every image (AODA). Lazy-load below the fold.

---

## 2. Section navigation on `/insurance`

Add a sticky secondary nav bar that sits below the main header, tracked uppercase, matching existing label typography.

- Two anchors: `Products` (`#products`) and `Accounts` (`#accounts`)
- Active section highlights automatically using IntersectionObserver as the user scrolls
- Smooth scroll with `scroll-behavior: smooth`, and `scroll-margin-top` on both section targets so the sticky bar does not cover the heading
- Add a **back to top** control that fades in once the user scrolls past the products section. Small, unobtrusive, bottom-right, matching the site's restraint. Respect `prefers-reduced-motion` (no smooth scroll animation when set).
- On mobile, the section nav collapses to a single compact row, no horizontal overflow

---

## 3. Deepen every insurance product page

Each of the 8 product pages needs substantially more depth than currently published. Still plain English, still no jargon without an inline definition. Target roughly double the current body length per page.

Add these sections where not already present:

- **How it actually works, step by step** — from application through underwriting, policy issue, premium payment, claim, payout. Explain what underwriting means, what a beneficiary designation does, what happens if you miss a premium.
- **Key terms defined inline** — premium, rider, elimination period, survival period, cash surrender value, paid-up, dividend scale, guarantee level, reset, ACB. Define at first use, in a sentence, not a glossary dump.
- **What affects your cost** — age, health, smoking status, coverage amount, term length, riders selected.
- **Common questions** — 5 to 8 per product, written as real client questions with direct answers.
- **What to watch for** — renewal pricing on term, policy lapse risk on UL, contract wording on CI definitions. Frame practically, as things an advisor helps you avoid.

Keep every existing SVG animation and table. This is additive.

---

## 4. Table sizing and padding

Current tables, the Equitable segregated fund table especially, feel cramped.

- **Fit tables to content.** Do not force `width: 100%` on tables that hold 3 or 4 short columns. Use `width: auto` with `max-width: 100%` and let narrow tables be narrow, centered or left-aligned to the text column. Only the wide fund performance table should span the full content width.
- **Cell padding**: minimum `0.9rem` vertical, `1.25rem` horizontal.
- **Edge breathing room**: first and last cells in every row get extra inline padding, `2rem`, so content never sits against the table border.
- Column headers get slightly tighter tracking and the same generous padding.
- On mobile, wide tables scroll horizontally inside a container with a visible scroll affordance. Never squash columns below readability.
- Zebra striping stays subtle if present, or use a hairline row rule in `--color-border`.

---

## 5. Expanded illustrative examples

Rewrite the illustrative example on each product page as a **full worked walkthrough** that demonstrates most of the concepts introduced on that page, not just a single number.

Structure per example:
1. Who the person is (age, situation, goal)
2. What they choose and why, referencing the concepts defined earlier on the page
3. What they pay, and what affects that
4. What happens over time, year 1, year 10, year 25
5. What happens at the claim or maturity event
6. What the outcome means for them or their family

Rounded numbers throughout. Keep the existing label: "Illustrative only, not advice or a quote." Add: "Actual figures depend on health, age, and underwriting."

---

## 6. Interactive charts

Add real interactive charts where a visual makes the concept land faster. Use **Recharts** (already React, no new heavy dependency) or lightweight custom SVG. Every chart needs hover tooltips, a legend, keyboard focus support, and readable labels at mobile widths.

Colour: use a distinct chart palette derived from the site's accent tones, saturated enough to be legible, not the muted UI greys.

| Page | Chart |
|---|---|
| Segregated funds | Line chart, contract value vs guaranteed floor over 20 years, with a market-drop scenario showing the guarantee holding and a reset locking in a gain |
| Whole / Universal Life | Stacked area, cash value plus death benefit growth over 40 years, with a paid-up point marker |
| Critical illness | Simple flow with a bar showing typical out-of-pocket costs during recovery vs lump sum received |
| Disability | Line chart, income with and without coverage after a disabling event, elimination period visible |
| Term life | Stepped line showing level premium during term, then renewal step-ups |
| Annuities | Bar chart, lump sum converted to guaranteed monthly income across payout ages |
| TFSA / RRSP | **Interactive comparator.** User inputs current marginal rate, expected retirement rate, annual contribution, years. Chart shows after-tax outcome of each. This is the single most useful tool on the site, make it good. |
| FHSA | Stacked bar, contribution plus deduction value plus growth toward a down payment |
| RESP | Bar chart, contributions vs CESG grant vs growth over 18 years |
| RRIF | Line chart, prescribed minimum withdrawal percentage by age, with account depletion projection |

All charts respect `prefers-reduced-motion` by rendering without entry animation.

---

## 7. Competitive positioning, segregated funds and across the site

The current segregated funds page runs a comparison against mutual funds that lands flat. Rewrite the positioning across all product pages so the advantages of working with an independent licensed advisor are specific, quantified, and prominent.

**Lead with the advantages that are genuinely unique and that a bank branch cannot match:**

- **Maturity and death benefit guarantees.** 75/75, 75/100, and 100/100 contracts. A mutual fund or ETF has no floor at all. This is the headline. Show it on the chart, do not bury it in prose.
- **Annual resets.** Lock in market gains, available to age 80 on Estate and Protection classes. Every reset raises the guaranteed floor permanently.
- **Estate bypass through named beneficiary.** Proceeds pass directly, outside the estate, so they skip probate. In Ontario, Estate Administration Tax runs roughly **1.5% on estate value above $50,000**. On a $500,000 portfolio that is meaningful, and settlement takes weeks rather than the months a probated estate typically needs. Put a worked number on this, it is concrete and it is real.
- **Potential creditor protection.** Genuinely valuable for business owners, incorporated professionals, and the self-employed. A bank mutual fund offers nothing comparable.
- **Independent advice across carriers.** A branch representative sells that bank's proprietary shelf. An independent LLQP advisor selects across the market for the client's actual situation. Make this a recurring theme site-wide.
- **Guaranteed floor lets clients hold their allocation through a downturn.** The behavioural benefit is real: the single largest destroyer of retail returns is selling at the bottom. A contractual floor is what keeps someone invested.

**Two constraints, both non-negotiable:**

**Do not state or imply that segregated funds carry lower fees than bank mutual funds or ETFs.** They do not. The GIF lineup MERs run 1.95% to 3.81%, and that column is displayed on the same page. A low-fee claim would be contradicted by the site's own table, which destroys credibility with exactly the informed prospect worth winning, and it is a misrepresentation under FSRA conduct rules. The honest and stronger framing: **the MER buys a contractual guarantee, resets, creditor protection, and probate bypass that no fund without those features can offer. Price the guarantee, do not hide it.**

**Where a comparison table exists, keep it complete.** Do not delete the fee row or any other unfavourable row. Instead, add a "What the difference buys you" column immediately alongside, so the higher MER is read next to the guarantee and estate benefits it purchases. A comparison that omits a material fact is both less persuasive to a sophisticated reader and a compliance exposure on a licensed advisor's public site. A comparison that names the cost and then justifies it decisively is what actually closes.

**On performance claims:** do not publish return figures sourced from internal client documents. Use only the Fundata published figures already on the page, dated, with the standard past-performance disclaimer. Unaudited internal performance claims on a public advisor site are a direct regulatory risk and are not worth it.

---

## 8. Norlease spotlight rework

### Copy
Norlease is a verified rental housing platform for **North Bay, Ontario, serving everyone**: families, working professionals, newcomers, retirees, and students. Students are one early audience because of Nipissing University and Canadore College, not the whole market. Remove all student-only framing. Rewrite the description to lead with verified listings and trustworthy rental search for the whole city.

### Border and theme
Remove the blue accent border entirely. Replace `--color-spotlight` with a theme-aware neutral:
- **Light mode**: near-black hairline border, `1.5px`, in `--color-text`
- **Dark mode**: off-white border, plus a soft diffuse glow. `box-shadow: 0 0 24px 2px rgba(255,255,255,0.18)`, tuned to read as subtle ambient light, not neon. Add a second wider, fainter layer for falloff.
- Transition the glow gently on hover, no colour shift
- The "In development" pill label follows the same neutral treatment

### Layout
The spotlight card is a two-column split. **The SVG animation must fill the entire right column, full height, edge to edge within the border.** It currently occupies only the upper half. Use `height: 100%`, `object-fit: cover` behaviour on the SVG viewBox, and `preserveAspectRatio="xMidYMid slice"` so it fills without distortion. Left column content stays exactly as is. On mobile, animation stacks above the text at a 16:9 crop.

### SVG animation, rebuilt
Concept: **North Bay at dusk, alive with connection.** Directional reference is the project image `istockphoto-1361245642-640x640.jpg`: a city skyline at blue hour with vertical light beams and glowing connection nodes rising from buildings. **Build an original illustration in that spirit. Do not trace or reproduce the stock image, it is licensed.**

**Use real North Bay geography.** The site already has a Protomaps extract of Ontario in Cloudflare R2 from the map pipeline. Derive actual street geometry from it rather than inventing shapes. Anchors to include:
- Lake Nipissing along the southwest edge, the defining feature, render as a dark reflective plane
- Highway 11 / 17 as the main arterial sweep
- Algonquin Avenue running north to south
- Main Street and the downtown core
- Lakeshore Drive following the water
- The escarpment rising to the northwest, where Nipissing University and Canadore College sit
- Trout Lake to the east if it fits the frame

Verify these against the Protomaps data or OpenStreetMap before committing to the geometry. Recognizably North Bay is the entire point.

**Animation sequence, 8 to 10 second loop:**
1. Lake and land masses fade in first, establishing the real shape of the city
2. Street network draws itself along true geometry with animated `stroke-dasharray`
3. Building blocks rise from the downtown core and along arterials, simple extruded forms, warm window lights flickering on in staggered sequence
4. Vertical light beams rise from buildings, echoing the reference image, in a vibrant gradient: deep indigo at the base through cyan and teal, into a warm amber accent at the tips
5. Connection nodes pulse at the top of the beams and link to each other with thin animated arcs, people connecting across the city
6. A soft radius sweep passes across the frame, nodes it touches settling into a verified state with a small scale-bounce
7. Gentle idle drift, then loop

**Technical:**
- Pure inline SVG plus CSS animation, optional light JS for sequencing. No animation library.
- Multi-stop gradients, real saturation. This animation is allowed to be vivid where the rest of the site is restrained. The neutral border is what keeps it tasteful.
- Dusk palette works in both themes. In light mode, lift the sky values so it does not read as a black hole in the layout.
- `prefers-reduced-motion`: render the composed final frame, fully lit, static.
- 60fps, animate only `transform` and `opacity`, never layout-triggering properties.
- IntersectionObserver pause when off-screen.
- Zero console errors.
- Shared component, identical on homepage and `/projects`.

---

## Global QA
- `npm run build` clean, zero console errors
- All new thumbnails have meaningful alt text
- Charts keyboard-accessible and legible at 375px width
- Tables never overflow their container without a scroll affordance
- Dark mode glow renders correctly across Safari, Chrome, Firefox
- Norlease animation geometry verified against real map data
- Every figure on every page traced to CRA, Equitable, or Fundata. No numbers from memory.
- Achyut reviews all product and account copy before publishing
