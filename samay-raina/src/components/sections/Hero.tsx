"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30, scale: 0.8, rotateX: -20, transformPerspective: 1000 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1 }
      )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 80, rotateX: -30, transformPerspective: 1000 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.2 },
          "-=1"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 50, rotateX: -20, transformPerspective: 1000 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1 },
          "-=0.8"
        );

      // Removed parallax scroll-away to fix empty space gap
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden pb-32"
    >
      {/* Hero background image with higher opacity */}
      <div className="absolute inset-0 z-0">
        <img
          src="/samay-hero.jpg"
          alt=""
          className="w-full h-full object-cover object-top"
          style={{ opacity: 0.7 }}
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />
      </div>

      <div className="relative z-10 text-center px-6 w-full lg:px-12 mx-auto flex flex-col items-center">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5C518] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5C518]" />
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-[#a1a1a6] font-medium px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
            Season 2 — Streaming Now
          </span>
        </div>

        <p
          ref={taglineRef}
          className="text-3xl sm:text-4xl lg:text-5xl text-[#f5f5f7] mb-6 w-full max-w-[1400px] mx-auto font-medium tracking-tight lg:whitespace-nowrap"
        >
          Comedian. Chess Enthusiast. Chaos Agent.
        </p>

        <p className="text-xl sm:text-2xl lg:text-2xl text-[#a1a1a6] mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          India&apos;s most unpredictable comedian. From roasting the nation on
          YouTube to checkmating grandmasters on Twitch.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            href="/apply/audience"
            className="btn-glow group relative inline-flex items-center justify-center px-10 py-4 bg-[#F5C518] text-[#050505] font-bold text-xl rounded-full"
          >
            <span className="relative z-10 flex items-center gap-2">
              Register for Shows
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          <Link
            href="/apply/participant"
            className="group inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-xl text-[#f5f5f7] bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:border-[#F5C518]/30 hover:shadow-[0_0_40px_rgba(245,197,24,0.1)]"
          >
            Apply as Participant
            <svg
              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#6e6e73] font-medium">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#F5C518] to-transparent origin-top" style={{ animation: 'scroll-line 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
