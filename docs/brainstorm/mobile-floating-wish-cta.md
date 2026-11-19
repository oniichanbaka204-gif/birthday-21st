# Brainstorm Report: Mobile Floating Wish CTA & Scroll Affordance

- **Date:** 2026-11-19
- **Author:** Solution Brainstormer & UX Architect
- **Status:** Approved by User
- **Chosen Option:** Option 1 - Floating Action Pill / CTA Button on Mobile

---

## 1. Problem Statement & Context
- **Issue:** On mobile viewports (height ~650–850px), the 2-tier 35mm vintage film reel (`FilmReelGallery`) and the header occupy ~630px, consuming the entire initial screen above the fold.
- **UX Bottleneck (False Floor):** Visitors believe the film reel is the whole website and leave without scrolling down to discover the handwritten birthday letter and the "Gửi Lời Chúc" submission button.
- **Goal:** Provide an intuitive, unmissable call-to-action on mobile so 100% of visitors notice and can easily write/send their birthday wishes to the recipient.

---

## 2. Evaluated Approaches & Trade-offs

| Approach | Description | Pros | Cons | Verdict |
| :--- | :--- | :--- | :--- | :--- |
| **Option 1: Floating CTA Pill (Chosen)** | Persistent floating badge at bottom-right/center (`💌 Gửi lời chúc`) with emerald-gold glow. | Visible 100% of the time on mobile; instant 1-tap wish modal or smooth scroll to letter; zero friction. | Needs careful z-index and spacing to avoid overlapping the mascot chick. | **Selected & Recommended** |
| **Option 2: Scroll Down Indicator** | Bouncing arrow indicator (`Lướt xuống để gửi lời chúc ↓`) below film reel. | Preserves sequential storytelling (Film -> Letter -> Wish). | Passive; users in a hurry or browsing casually may still miss or ignore it. | Rejected |
| **Option 3: Hybrid (CTA + Scroll Indicator)** | Both floating pill and bottom bouncing arrow. | Maximum awareness. | Adds extra clutter on compact phone screens. | Rejected as overkill |

---

## 3. Agreed Architecture & Implementation Specifications

### 3.1 Design Details (Floating CTA)
- **Positioning:**
  - Placed at bottom-center (or bottom-right on wider mobile screens): `fixed bottom-5 sm:bottom-6 z-40`.
  - Visible only during `stage === 'film_showcase'`.
  - Subtle entrance animation with Framer Motion (fade in + bounce up after 1.5s).
- **Styling (Luxury Royal Emerald & Gold):**
  - Pill shape: `px-5 py-2.5 sm:px-6 sm:py-3 rounded-full`.
  - Background: Gradient `from-yellow-400 via-amber-300 to-yellow-500 text-emerald-950 font-bold`.
  - Glow & Shadow: `shadow-[0_0_25px_rgba(250,204,21,0.55)] border border-yellow-200/80`.
  - Icons: Floating `Mail` / `Sparkles` icon with gentle pulsing/breathing animation.
- **Interaction Logic:**
  - Clicking the floating CTA directly opens the `WishModal` (or smoothly scrolls to `#birthday-letter` if preferred).
  - Also displays a compact label: *"Gửi lời chúc 💌"* (or *"Viết lời chúc ✨"*).
  - Hides automatically or scales down when the user has already scrolled all the way down to the letter where the full button exists.

### 3.2 Affected Touchpoints
- `src/App.jsx`: Render the `FloatingWishButton` in `film_showcase` connected to `setIsWishModalOpen(true)`.
- `src/components/FloatingWishCTA.jsx`: New clean, modular component encapsulating the button, animation, and responsive layout.

---

## 4. Success Metrics & Validation
- **Visibility:** 100% visible on standard mobile viewports (iPhone SE, iPhone 14/15, Samsung Galaxy, Pixel).
- **No Overlaps:** Zero collision with `PeekABooChicken` mascot (bottom-left) and `FloatingWishes` bubbles.
- **Touch Target:** Minimum 44x44px touch target compliant with mobile accessibility standards.

---

## 5. Next Steps
- User approval of this brainstorm document.
- Plan execution via `/ck:plan` or direct implementation via `/ck:cook`.
