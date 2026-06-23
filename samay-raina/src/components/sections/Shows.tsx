"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import shows from "@/data/shows.json";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Shows() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [filterCity, setFilterCity] = useState<string>("All");
  const [filterType, setFilterType] = useState<string>("All");

  const cities = ["All", ...Array.from(new Set(shows.map((s) => s.city)))];
  const types = ["All", ...Array.from(new Set(shows.map((s) => s.type)))];

  const filtered = shows.filter((s) => {
    const cityMatch = filterCity === "All" || s.city === filterCity;
    const typeMatch = filterType === "All" || s.type === filterType;
    return cityMatch && typeMatch;
  });

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 80, rotateX: -45, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  // Function to determine which image to use based on show type
  const getShowImage = (show: any) => {
    if (show.type === "Taping") return "/show-igl.png";
    return "/show-standup.png";
  };

  return (
    <section ref={sectionRef} id="shows" className="section-aurora relative pt-24 pb-32 px-6 min-h-screen flex flex-col justify-center">
      <div className="section-divider mb-12" />
      
      <div className="relative z-10 w-full lg:px-12 mx-auto">
        <div ref={headingRef} className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-[#F5C518] mb-4">
            <span className="w-8 h-[1px] bg-[#F5C518]" />
            Upcoming Shows
            <span className="w-8 h-[1px] bg-[#F5C518]" />
          </span>
          <h2
            className="text-6xl sm:text-7xl lg:text-9xl font-bold mb-8 tracking-tight"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Catch Him <span className="text-shimmer">Live</span>
          </h2>
          <p className="text-[#a1a1a6] max-w-3xl mx-auto text-2xl leading-relaxed">
            Register your interest for upcoming shows and tapings. Submitting
            does not guarantee a ticket — you will be contacted via email if a
            spot becomes available.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-16 justify-center">
          <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-full">
            <span className="text-base font-medium text-[#6e6e73]">City</span>
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="bg-transparent text-lg text-[#f5f5f7] focus:outline-none cursor-pointer appearance-none pr-4"
            >
              {cities.map((c) => (
                <option key={c} value={c} className="bg-[#141414]">
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-full">
            <span className="text-base font-medium text-[#6e6e73]">Type</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-transparent text-lg text-[#f5f5f7] focus:outline-none cursor-pointer appearance-none pr-4"
            >
              {types.map((t) => (
                <option key={t} value={t} className="bg-[#141414]">
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((show) => (
              <motion.div
                key={show.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 80, rotateX: -30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.8, y: 30, rotateX: 30 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                style={{ transformPerspective: 1000 }}
                className="group glass-card rounded-2xl overflow-hidden flex flex-col relative"
              >
                <div className="absolute top-3 right-3 z-20">
                  <span
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border inline-block whitespace-nowrap",
                      show.status === "On Sale" &&
                        "bg-green-500/20 text-green-400 border-green-500/30",
                      show.status === "Coming Soon" &&
                        "bg-[#F5C518]/20 text-[#F5C518] border-[#F5C518]/30",
                      show.status === "Sold Out" &&
                        "bg-red-500/20 text-red-400 border-red-500/30"
                    )}
                  >
                    {show.status}
                  </span>
                </div>

                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={getShowImage(show)}
                    alt={show.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
                </div>

                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#E91E8C]/10 text-[#E91E8C] border border-[#E91E8C]/20 text-xs font-bold tracking-wide">
                      {show.type}
                    </span>
                    <span className="text-lg font-medium text-[#a1a1a6]">{show.city}</span>
                  </div>

                  <h3 className="text-3xl font-bold text-[#f5f5f7] mb-3 group-hover:text-[#F5C518] transition-colors" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    {show.name}
                  </h3>

                  <p className="text-base text-[#a1a1a6] mb-6 line-clamp-2 leading-relaxed">
                    {show.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-base font-medium">
                        <span className="text-[#f5f5f7]">
                          {new Date(show.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-[#6e6e73] mx-1">•</span>
                        <span className="text-[#f5f5f7]">{show.time}</span>
                      </div>
                      <span className="text-xl font-bold text-shimmer">
                        {show.price}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-sm text-[#a1a1a6]">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {show.venue}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-3xl glass-card text-[#a1a1a6]">
              <svg className="w-12 h-12 mx-auto mb-4 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-lg">No shows match your filters.</p>
              <button
                onClick={() => { setFilterCity("All"); setFilterType("All"); }}
                className="mt-4 text-[#F5C518] hover:underline"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
