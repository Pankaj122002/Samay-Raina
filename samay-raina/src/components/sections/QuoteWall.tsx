"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import content from "@/data/content.json";

gsap.registerPlugin(ScrollTrigger);

export default function QuoteWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const cards = quotesRef.current?.querySelectorAll(".quote-card");
      if (!cards) return;

      cards.forEach((card, i) => {
        // Create a masonry-style staggered entrance
        const yOffset = (i % 3) * 30; // Different starting heights for columns
        
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 100 + yOffset,
            scale: 0.8,
            rotateZ: (Math.random() - 0.5) * 5,
            rotateX: 45,
            transformPerspective: 1000
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateZ: 0,
            rotateX: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 px-6 overflow-hidden bg-[#050505]">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E91E8C]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full lg:px-12 mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#F5C518] mb-4">
            <span className="w-8 h-[1px] bg-[#F5C518]" />
            Press
            <span className="w-8 h-[1px] bg-[#F5C518]" />
          </span>
          <h2
            className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-12 tracking-tight"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            What They&apos;re <span className="text-shimmer">Saying</span>
          </h2>
        </div>

        <div
          ref={quotesRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
        >
          {content.quotes.map((quote, i) => (
            <div
              key={i}
              className={`quote-card relative p-8 sm:p-10 rounded-3xl glass-card transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(245,197,24,0.05)] ${
                i % 3 === 1 ? 'lg:mt-12' : i % 3 === 2 ? 'lg:mt-24' : ''
              }`}
            >
              <svg
                className="w-12 h-12 text-[#F5C518]/20 mb-6 drop-shadow-[0_0_10px_rgba(245,197,24,0.3)]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-2xl sm:text-3xl text-[#f5f5f7] mb-8 leading-relaxed font-light tracking-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                "{quote.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-[2px] bg-gradient-to-r from-[#F5C518] to-transparent" />
                <span className="text-sm font-bold text-[#F5C518] tracking-widest uppercase">
                  {quote.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
