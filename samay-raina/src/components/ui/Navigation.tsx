"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#shows", label: "Shows" },
  { href: "/apply/participant", label: "Apply" },
  { href: "/apply/audience", label: "Register" },
  { href: "/about", label: "About IGL" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? "py-3"
            : "py-6"
        }`}
      >
        <div className="w-full mx-auto px-6 lg:px-12">
          <div className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
            scrolled || !isHome 
              ? "bg-[#050505]/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
              : "bg-transparent border border-transparent"
          }`}>
            <Link href="/" className="flex items-center gap-2 group">
              <span
                className="text-3xl font-bold tracking-tight transition-transform group-hover:scale-105"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                India&apos;s Got{" "}
                <span className="text-[#F5C518]">Latent</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-lg font-medium transition-colors group"
                  >
                    <span className={`relative z-10 ${isActive ? "text-[#050505]" : "text-[#a1a1a6] group-hover:text-[#f5f5f7]"}`}>
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[#f5f5f7] rounded-full -z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white/5 border border-white/10"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{
                  rotate: mobileOpen ? 45 : 0,
                  y: mobileOpen ? 6 : 0,
                }}
                className="block w-5 h-[2px] bg-[#f5f5f7] origin-center rounded-full"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="block w-5 h-[2px] bg-[#f5f5f7] rounded-full"
              />
              <motion.span
                animate={{
                  rotate: mobileOpen ? -45 : 0,
                  y: mobileOpen ? -6 : 0,
                }}
                className="block w-5 h-[2px] bg-[#f5f5f7] origin-center rounded-full"
              />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#050505]/80 md:hidden flex flex-col pt-32 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-4 border-b border-white/10 group"
                  >
                    <span className="text-4xl font-bold text-[#f5f5f7] group-hover:text-[#F5C518] transition-colors"
                          style={{ fontFamily: "'Clash Display', sans-serif" }}>
                      {link.label}
                    </span>
                    <svg className="w-6 h-6 text-[#a1a1a6] group-hover:text-[#F5C518] group-hover:translate-x-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto mb-12 text-center text-sm text-[#6e6e73]"
            >
              India's Got Latent © {new Date().getFullYear()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
