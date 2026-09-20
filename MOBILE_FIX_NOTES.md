# Mobile fix notes

## Problem 1: homepage photo shifted left on phones

The root cause was not the centering rule itself. The mobile override in `styles/Home.module.css` set `margin: 0` on the photo frame, which is correct for centering only if nothing else forces the frame wider than its column. Two things did.

First, the hero links row (`.heroLinks` in `styles/Home.module.css`) is a flex row with no `flex-wrap`. The three uppercase links (View projects, Insurance services, Download resume) do not fit in a 280 pixel wide phone column, so the flex row refused to shrink below its content width. Because it is a sibling of the photo frame inside the same single column CSS grid track, that oversized row stretched the whole grid track, which in turn stretched the photo frame far past the viewport, most visibly at 320 pixels wide, where the frame extended about 38 pixels past the right edge while the left edge held its normal padding. That asymmetry is what read as the photo sitting left of center.

Second, once the links row was fixed, the same grid track sizing issue reappeared through the photo frame itself, because a CSS grid item without `min-width: 0` is not allowed to shrink below its own content size. Adding `min-width: 0` to `.heroPhotoFrame` and `.heroText` let the grid track settle at the column's real width.

Files changed: `styles/Home.module.css`.

## Problem 2: insurance pages running past the phone width

Only `/insurance` itself actually overflowed the document. The product and account detail pages, the fund table, the TFSA and RRSP comparator, the charts, and the SVG diagrams were already built with responsive handling from earlier work (ResponsiveContainer at 100 percent width, a card based fallback for the fund table instead of horizontal scrolling on phones, viewBox based SVGs, safe overflow clipping on the diagram frame) and did not need changes.

The `/insurance` index overflowed because of the same missing `min-width: 0` pattern as Problem 1. The product and account cards use `white-space: nowrap` on the description paragraph to create a single line summary with an ellipsis. Without `min-width: 0` on `.card` and `.content` in `styles/Insurance.module.css`, that unwrapped text forced the card, and then the single column grid track, to grow to the description's full text width, which was consistently about 580 pixels regardless of the actual phone width. That produced a fixed, oversized document width (about 724 pixels) at every phone size tested.

There was also a pre-existing `overflow-x: hidden` on `html, body` in `styles/globals.css`. This is the blanket fix the working rule for this task warns against. It was not hiding a currently broken layout, since removing it did not change scroll widths on the passing pages, but it was masking how much a page actually overflowed while debugging, and it is exactly the kind of rule that can quietly break `position: sticky` for the section nav on `/insurance` if a scrolling ancestor ever changes. Removed.

While verifying the console had zero errors, an unrelated pre-existing bug showed up on the homepage: `components/ProjectThumbnail.tsx` set `rx="10 10 10 2"` on an SVG rect to draw a chat bubble with three rounded corners and one square corner. SVG `rx` only accepts a single length, so the browser logged a parse error on every load and the rect fell back to square corners. Replaced the rect with an equivalent `path` built from a small helper that accepts four independent corner radii, so the bubble now renders as intended with no console error.

Files changed: `styles/Insurance.module.css`, `styles/globals.css`, `components/insurance/SectionNav.module.css` (back to top button now respects `env(safe-area-inset-bottom)` and `env(safe-area-inset-right)`, which it was not doing before), `components/ProjectThumbnail.tsx`.

## Before and after, document scrollWidth vs viewport width

Measured with a Playwright script against the production static export (`out/`), widths 320 to 430 unless noted.

| Route | Width | Before | After |
| --- | --- | --- | --- |
| / | 320 | frame right edge about 38.6px past viewport, photo visibly off center | scrollWidth 320, centered |
| / | 360 to 430 | photo off center by the same margin bug, no document overflow yet | scrollWidth equals viewport width, centered |
| /insurance | 320 | scrollWidth 724 | scrollWidth 320 |
| /insurance | 360 | scrollWidth 724 | scrollWidth 360 |
| /insurance | 375 | scrollWidth 725 | scrollWidth 375 |
| /insurance | 390 | scrollWidth 724 | scrollWidth 390 |
| /insurance | 412 | scrollWidth 724 | scrollWidth 412 |
| /insurance | 430 | scrollWidth 724 | scrollWidth 430 |
| all 8 product pages, all 8 account pages | 320 to 430 | already passing before this change | still passing |

Also checked and passing after the fix: landscape at 667x375 and 844x390, dark mode at 375 wide on the homepage and three insurance pages, and desktop regression at 768, 1024, 1280, and 1440 wide (no change in scrollWidth from before, confirming desktop and tablet layouts were not touched).

`npm run build` completes with no new warnings. The one existing warning about the capstone page's data size is unrelated to this work and was not touched. The browser console shows zero errors on every route in scope, checked against the actual production static export served from `out/`.

## Out of scope, noticed but not changed

`/projects` was not part of the requested scope and was not touched, but it uses the same reveal on scroll pattern and the same card and grid conventions as the fixed pages, so it is unlikely to have the same bug. Worth a quick manual check on a phone regardless.

`styles/prompt.txt` is a stray HTML file sitting inside the styles folder. It is not imported anywhere in the app and was left alone.
