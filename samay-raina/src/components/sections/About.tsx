"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import content from "@/data/content.json";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // Text entrance
      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 80, rotateX: -45, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image 3D tilt entrance
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 100, rotateX: -30, rotateY: 15, transformPerspective: 1000 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Stats entrance
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 60, rotateX: -45, transformPerspective: 1000 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="section-aurora relative py-24 sm:py-32 px-6"
    >
      <div className="relative z-10 w-full lg:px-12 mx-auto">
        <div className="w-full grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <div ref={textRef} className="space-y-6 lg:col-span-7 lg:pr-12">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#F5C518] mb-4">
              <span className="w-8 h-[1px] bg-[#F5C518]" />
              About
            </span>
            <h2
              className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              The Man Behind
              <br />
              <span className="text-shimmer">the Chaos</span>
            </h2>

            {content.bio.paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-lg sm:text-xl lg:text-2xl text-[#a1a1a6] leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>

          <div className="space-y-8 lg:col-span-5 lg:col-start-8">
            {/* Photo with glassmorphism frame */}
            <div
              ref={imageRef}
              className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden group shadow-2xl"
              style={{ perspective: '1000px' }}
            >
              <img
                src="/samay-about.jpg"
                alt="Samay Raina"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 to-transparent" />

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-24 h-24 border border-[#F5C518]/20 rounded-full animate-pulse" />
              <div className="absolute bottom-8 left-8 w-36 h-36 border border-[#E91E8C]/10 rounded-full" style={{ animation: 'float 6s ease-in-out infinite' }} />

              {/* Glass label */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="text-sm text-[#a1a1a6]">Comedian · Streamer · Creator</p>
                <p className="text-lg font-bold text-[#f5f5f7]" style={{ fontFamily: "'Clash Display', sans-serif" }}>Samay Raina</p>
              </div>
            </div>

            {/* Stats grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-y-10 gap-x-4 w-full max-w-md mx-auto mt-4"
            >
              {content.bio.stats.map((stat, i) => (
                <div
                  key={i}
                  className="stat-item cursor-default flex flex-col items-start"
                >
                  <p className="text-5xl font-bold text-[#f5f5f7] mb-1 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#a1a1a6]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
