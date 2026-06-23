"use client";

import Link from "next/link";
import content from "@/data/content.json";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#F5C518]/5 rounded-t-full blur-[100px] pointer-events-none" />

      <div className="w-full mx-auto px-6 lg:px-12 pt-24 pb-12 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-5">
            <h3
              className="text-4xl font-bold mb-6 tracking-tight"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              India&apos;s Got <span className="text-shimmer">Latent</span>
            </h3>
            <p className="text-xl text-[#a1a1a6] max-w-md mb-8 leading-relaxed font-light">
              {content.brand.description}
            </p>
            <div className="flex gap-3">
              {content.bio.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#a1a1a6] hover:text-[#f5f5f7] hover:bg-white/10 transition-all duration-300"
                  aria-label={social.platform}
                >
                  {/* SVG icons same as before but sized slightly larger */}
                  {social.platform === "YouTube" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                  {social.platform === "Instagram" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  )}
                  {social.platform === "Twitter" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {social.platform === "Twitch" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-lg font-semibold uppercase tracking-widest text-[#f5f5f7] mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/apply/audience"
                  className="text-lg text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors inline-block"
                >
                  Register as Audience
                </Link>
              </li>
              <li>
                <Link
                  href="/apply/participant"
                  className="text-lg text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors inline-block"
                >
                  Apply as Participant
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-lg text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors inline-block"
                >
                  About IGL
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-lg font-semibold uppercase tracking-widest text-[#f5f5f7] mb-6">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <span className="text-lg text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors cursor-pointer inline-block">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-lg text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors cursor-pointer inline-block">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-lg text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors cursor-pointer inline-block">
                  Cookie Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-lg text-[#6e6e73]">
            &copy; {new Date().getFullYear()} Samay Raina. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-base font-medium text-[#6e6e73] tracking-wide uppercase">
              Systems Operational
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
