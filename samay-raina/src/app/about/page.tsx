import Link from "next/link";
import content from "@/data/content.json";

export default function AboutIGL() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#666] hover:text-[#F5C518] transition-colors mb-6"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Link>

          <h1
            className="text-5xl sm:text-6xl font-bold mb-8"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            About India&apos;s Got Latent
          </h1>
        </div>

        <div className="space-y-6 mb-16">
          {content.aboutIGL.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-xl sm:text-2xl text-[#a0a0a0] leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-10"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Rules & <span className="text-[#F5C518]">Guidelines</span>
          </h2>

          <ol className="space-y-4">
            {content.aboutIGL.rules.map((rule, i) => (
              <li
                key={i}
                className="flex gap-6 p-6 rounded-xl bg-[#111] border border-[#222]"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F5C518]/10 text-[#F5C518] flex items-center justify-center text-lg font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-lg sm:text-xl text-[#a0a0a0] leading-relaxed">{rule}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply/participant"
            className="inline-flex items-center justify-center px-12 py-6 text-xl sm:text-2xl bg-[#F5C518] text-[#080808] font-bold rounded-full hover:scale-105 transition-transform"
          >
            Apply as Participant
          </Link>
          <Link
            href="/apply/audience"
            className="inline-flex items-center justify-center px-12 py-6 text-xl sm:text-2xl border-2 border-[#F5C518] text-[#F5C518] font-bold rounded-full hover:bg-[#F5C518] hover:text-[#080808] transition-all"
          >
            Register as Audience
          </Link>
        </div>
      </div>
    </div>
  );
}
