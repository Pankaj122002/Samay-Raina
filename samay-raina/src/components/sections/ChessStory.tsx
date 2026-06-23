"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function ChessStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const squares = boardRef.current?.querySelectorAll(".chess-square");
      if (!squares) return;

      gsap.fromTo(
        squares,
        { opacity: 0, scale: 0.1, rotateZ: 45, y: 50 },
        {
          opacity: 1,
          scale: 1,
          rotateZ: 0,
          y: 0,
          duration: 0.6,
          stagger: {
            each: 0.02,
            from: "random",
            grid: [8, 8],
          },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Continuous floating board animation
      gsap.to(boardRef.current, {
        y: -25,
        rotateX: 18,
        rotateY: 25,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformPerspective: 1000
      });

      // 3D text scroll entrance
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, x: 50, rotateY: -30, transformPerspective: 1000 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isDark = (row + col) % 2 === 1;
      squares.push(
        <div
          key={`${row}-${col}`}
          className={`chess-square aspect-square rounded-[2px] transition-all duration-300 hover:scale-90 hover:rounded-xl ${
            isDark 
              ? "bg-[#F5C518]/30 shadow-[0_0_15px_rgba(245,197,24,0.3)] hover:bg-[#F5C518] hover:shadow-[0_0_30px_rgba(245,197,24,0.8)]" 
              : "bg-white/5 hover:bg-white/20"
          }`}
        />
      );
    }
  }

  return (
    <section ref={sectionRef} className="section-aurora relative py-24 sm:py-32 px-6 overflow-hidden">
      <div className="section-divider mb-24" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#F5C518]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full lg:px-12 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div
            ref={boardRef}
            className="relative aspect-square max-w-2xl mx-auto w-full"
            style={{
              transform: 'perspective(1000px) rotateX(10deg) rotateY(15deg)'
            }}
          >
            <div className="absolute inset-0 grid grid-cols-8 gap-1 p-6 rounded-3xl glass-card transition-transform duration-700 ease-out group-hover:rotate-x-[15deg] group-hover:rotate-y-[15deg] group-hover:scale-105 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              {squares}
            </div>
            
            {/* 3D floating pieces (visual only) */}
            <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-white/10 rounded-full blur-md animate-pulse" />
            <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-[#F5C518]/20 rounded-full blur-md" style={{ animation: 'float 4s ease-in-out infinite' }} />
          </div>

          <div ref={textRef} className="space-y-8">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#F5C518]">
              <span className="w-8 h-[1px] bg-[#F5C518]" />
              Checkmate
            </span>
            <h2
              className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Where Comedy
              <br />
              <span className="text-shimmer">Meets Chess</span>
            </h2>
            
            <div className="space-y-6">
              <p className="text-xl lg:text-2xl text-[#a1a1a6] leading-relaxed">
                Samay didn&apos;t just play chess — he turned it into a cultural
                movement. Millions discovered the game through his chaotic streams,
                where grandmasters became friends and every match was a roast
                battle waiting to happen.
              </p>
              <div className="w-12 h-[1px] bg-white/10" />
              <p className="text-xl lg:text-2xl text-[#a1a1a6] leading-relaxed">
                The knight. The rook. The bishop. Every piece tells a story of a
                comedian who refused to stay in one box.
              </p>
            </div>
            
            {/* Stats mini-bar */}
            <div className="flex gap-8 items-center pt-4">
              <div>
                <p className="text-3xl font-bold text-[#f5f5f7]">1.2K+</p>
                <p className="text-sm text-[#6e6e73]">Chess Streams</p>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-[#f5f5f7]">Millions</p>
                <p className="text-sm text-[#6e6e73]">Games Played</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
