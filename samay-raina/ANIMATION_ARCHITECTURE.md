# Animation Architecture

This document explains how animations are structured and how to add new animated sections.

## Stack Overview

| Library | Purpose | Where Used |
|---------|---------|------------|
| **GSAP + ScrollTrigger** | Scroll-driven animations, pinned sections, timeline reveals | Hero entrance, About text reveal, Chess board assembly, Quote wall |
| **Framer Motion** | Component transitions, mobile menu, filter animations | Navigation mobile menu, Shows filter UI |
| **React Three Fiber** | 3D WebGL scenes | Hero floating chess piece, particle field |
| **Lenis** | Smooth scroll (ready to integrate) | Not yet wired — can be added in `layout.tsx` |

## Global Setup

### Reduced Motion

All animation hooks check `useReducedMotion()` before running. This hook reads `window.matchMedia("(prefers-reduced-motion: reduce)")`.

When reduced motion is enabled:
- GSAP animations are skipped entirely
- Framer Motion animations still run but with CSS `transition-duration: 0.01ms`
- 3D scene renders but without mouse parallax

### GSAP Context Pattern

Every component using GSAP wraps animations in `gsap.context()`:

```tsx
useEffect(() => {
  if (reduced) return;
  const ctx = gsap.context(() => {
    // animations here
  }, sectionRef);
  return () => ctx.revert();
}, [reduced]);
```

This ensures all ScrollTrigger instances are cleaned up on unmount.

## Section-by-Section

### Hero (`src/components/sections/Hero.tsx`)
- **Entrance:** GSAP timeline — title → tagline → CTAs stagger in
- **Scroll:** Fade + scale down as user scrolls (scrub: true)
- **3D:** R3F Canvas with floating chess piece + particles

### About (`src/components/sections/About.tsx`)
- **Text:** Slides in from left with stagger
- **Stats:** Fade up with stagger when entering viewport
- **Image:** Placeholder with decorative border rings

### Shows (`src/components/sections/Shows.tsx`)
- **Heading:** Fade up on scroll
- **Cards:** Framer Motion `AnimatePresence` for filter transitions
- **Hover:** Border glow + scale via Tailwind

### Chess Story (`src/components/sections/ChessStory.tsx`)
- **Board Assembly:** GSAP ScrollTrigger with `scrub: 1`, squares animate in random order
- **Text:** Static (no animation)

### Quote Wall (`src/components/sections/QuoteWall.tsx`)
- **Cards:** GSAP from random directions (top/left/right/bottom) with slight rotation
- **Trigger:** Each card triggers individually at `top 85%`

## Adding a New Animated Section

1. Create component in `src/components/sections/`
2. Import `useReducedMotion` and conditionally skip animations
3. Use `gsap.context()` for cleanup
4. Register ScrollTrigger if used: `gsap.registerPlugin(ScrollTrigger)`
5. Add to `src/app/page.tsx`

### Template

```tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function NewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // Your animations here
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="py-24 px-6">
      {/* Content */}
    </section>
  );
}
```

## Performance Notes

- 3D Canvas uses `dpr={[1, 2]}` to limit pixel ratio on high-DPI screens
- Particle count is capped at 150 for mobile performance
- WebGL is feature-detected; fallback gradient shown if unsupported
- All GSAP animations use `transform` and `opacity` only (GPU-accelerated)
