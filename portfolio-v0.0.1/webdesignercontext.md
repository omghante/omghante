# Web Designer Context – Landing Page Reconstruction

**File**: `webdesignercontext.md`  
**Role**: Principal Web Designer (Systems-Level UI Architect)  
**Input Source**: `productmanagersuggestions.md`

---

## 1️⃣ Design Philosophy Adjustment

**Goal**: Shift the visual language from "Portfolio Site" to "System Architecture Interface".

The current design is clean but leans towards "Standard SaaS Template". To achieve the **Founder/Architect** authority requested by the Product Manager, we must move towards **editorial precision** and **utilitarian luxury**.

-   **Emotional Tone**: "The Machine is Running." (Stable, precise, active).
-   **Visual Metaphor**: A server dashboard meets a high-end architectural portfolio.
-   **Eliminating**: "Helper" graphics (arrows, bounce animations), generic gradients, and instructional text.
-   **Restraint**: White space is not "empty space"; it is "breathing room" for dense information.

---

## 2️⃣ Hero Redesign Specification

**Visual Hierarchy & Layout Logic:**

1.  **The Brand Anchor (H1)**:
    *   Content: "Om Ghante"
    *   Size: `text-7xl` to `text-9xl` (Keep massive scale).
    *   Tracking: Tighten slightly (`tracking-tighter`) to block-in the characters.
    *   Color: `text-ink` (Primary).

2.  **The Value Proposition (H2)**:
    *   Content: "Building **Intelligent Systems** & **Scalable Architecture**."
    *   Styling: `text-2xl` or `text-3xl`.
    *   Weight: `font-light` with **Bold** emphasis on key terms (Systems, Architecture).
    *   Color: `text-ink-muted`.

3.  **CTA Assembly**:
    *   **Primary Button**: "View Engineering Case Studies"
        *   Style: Solid `bg-ink`, `text-surface`. Sharp corners (radius-sm).
        *   Interaction: No bounce. Subtle lift or brightness shift.
        *   Icon: None. The text carries the weight.
    *   **Secondary Button**: "Download CV"
        *   Style: Text link or Ghost button.
        *   Visual weight: 30% of Primary.
    *   **Spacing**: Gap `gap-6`.

4.  **Bottom Credibility Strip**:
    *   Position: Absolute bottom (sticky or fixed relative to hero fold).
    *   Format: "Ticker" style.
    *   Element: **Live Status Dot** (Pulsing Green `bg-emerald-500`).
    *   Text: "System Status: Building ERP & CRM at Prismas."

---

## 3️⃣ Typography Enforcement Plan

**Font Discipline:**

-   **Display**: `Space Grotesk`
    *   Usage: H1, H2, Section Headers.
    *   Rule: Do not use below `24px`. It gets muddy.
-   **Body/Tech**: `Inter`
    *   Usage: Paragraphs, CTAs, Metadata.
    *   Rule: High readability. Leading `relaxed` (1.6 to 1.8).

**Correction Rules:**
-   **Length Limit**: Max line width `65ch` (characters) for body text. Never span the full container.
-   **H1 Structure**: Ensure SEO compliance without breaking design.
    *   Code: `<h1><span class="sr-only">Senior Full Stack Developer</span> Om Ghante</h1>`

---

## 4️⃣ Layout & Grid Refinement

**Grid Logic:**

-   **Background Grid**: The PM flagged this as "generic".
    *   *Correction*: Reduce opacity to `0.015` (1.5%). It should be subliminal, felt rather than seen.
    *   *Masking*: Use a tighter radial mask so the grid fades out quickly, focusing attention on the center content.
-   **Container Width**:
    *   `max-w-[1120px]` (standard).
    *   Enforce `px-6` on mobile to prevent edge-hugging.

---

## 5️⃣ Visual Authority Corrections

**Killing Junior Signals:**

1.  **Remove "Scroll" Instructions**: No `ArrowDown` bouncing icons. Users know how to scroll 2024 web pages.
2.  **Gradient Overdose**: Remove any "glow" effects behind the text unless they are strictly essential for contrast. The text should stand on its own.
3.  **Animation Restraint**:
    *   *Old*: Fade-up + Slide-up + Bounce.
    *   *New*: Instant load (0ms delay) or extremely fast dissolve (200ms ease-out). Speed = Competence.

---

## 6️⃣ Trust Architecture Integration

**Data over Decoration:**

-   **"Tech Stack Marquee"**:
    *   Design: Monochromatic logos (Greyscale).
    *   Placement: Below the buttons, very small (`h-6`), low contrast (`opacity-40` -> `hover:opacity-100`).
    *   Msg: "Powered by: Next.js / AWS / Python."
-   **Status Indicator**:
    *   Implementation: `span.relative.flex.h-2.w-2` -> `span.animate-ping`.
    *   Color: `bg-green-500`.

---

## 7️⃣ Vulnerability-Aware Design Adjustments

**Technical Design constraints:**

1.  **LCP (Largest Contentful Paint)**:
    *   **Action**: Preload `Space Grotesk` in `layout.tsx` or `next/font`.
    *   **Font-Display**: Set to `swap` to ensure text is visible immediately, even if unstyled for 50ms.
2.  **Contrast & Accessibility**:
    *   **Check**: `text-ink-muted` (#52525B).
    *   **Action**: Ensure it passes AA on `#FAFAFA` (Surface). If not, darken to `#3F3F46`.
3.  **Client-Side Hydration**:
    *   Keep Hero 100% static HTML/CSS. Do not use complex client-side animation libraries (`framer-motion`) for the initial render of the text. Standard CSS transitions are safer for TBT (Total Blocking Time).

---

## 8️⃣ Interaction Philosophy

**"The Machine" Aesthetic:**

-   **Scroll**: Standard browser scroll. Do not hijack scroll.
-   **Hover States**:
    *   Buttons: Standard brightness or invert-color. No "grow/shrink".
    *   Links: Underline expands or color shift to `text-accent`.
-   **Motion**:
    *   Ease: `cubic-bezier(0.16, 1, 0.3, 1)` (Professional "snap" feel).
    *   Duration: Max `300ms`.

---

## 9️⃣ Final Design Direction Summary

> “This landing page will now signal **Senior Systems Architect / Founding Engineer** level engineering authority.”
