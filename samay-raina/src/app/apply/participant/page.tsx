"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import statesCities from "@/data/states-cities.json";

interface FormData {
  stateOfBirth: string;
  cityOfBirth: string;
  stateOfResidence: string;
  cityOfResidence: string;
  sameAsBirth: boolean;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  whatsapp: string;
  email: string;
  instagram: string;
  youtube: string;
  snapchat: string;
  twitter: string;
  latent: string;
  whySelect: string;
  youtubeLinks: string[];
  interestingFacts: string[];
  consent1: boolean;
  consent2: boolean;
  honeypot: string;
}

function buildParticipantMailto(form: FormData): string {
  const subject = encodeURIComponent("India's Got Latent S2 - Participant Application");

  const bodyLines = [
    "Hi Team,",
    "",
    "I would like to apply as a participant for India's Got Latent Season 2.",
    "",
    "--- PERSONAL DETAILS ---",
    `Full Name: ${form.fullName}`,
    `Date of Birth: ${form.dateOfBirth}`,
    `Gender: ${form.gender}`,
    `WhatsApp: ${form.whatsapp}`,
    `Email: ${form.email}`,
    "",
    "--- LOCATION ---",
    `Place of Birth: ${form.cityOfBirth}, ${form.stateOfBirth}`,
    `Place of Residence: ${form.cityOfResidence}, ${form.stateOfResidence}`,
    "",
    "--- SOCIAL MEDIA ---",
    `Instagram: ${form.instagram || "N/A"}`,
    `YouTube: ${form.youtube || "N/A"}`,
    `Snapchat: ${form.snapchat || "N/A"}`,
    `Twitter/X: ${form.twitter || "N/A"}`,
    "",
    "--- MY LATENT ---",
    `Talent: ${form.latent}`,
    "",
    "--- WHY SELECT ME ---",
    form.whySelect,
    "",
    "--- YOUTUBE LINKS ---",
    ...form.youtubeLinks.filter((l) => l.trim()).map((l) => `- ${l}`),
    "",
    "--- INTERESTING FACTS ---",
    ...form.interestingFacts.filter((f) => f.trim()).map((f) => `- ${f}`),
    "",
    "--- CONSENT ---",
    "I confirm that I have read, understood, and unconditionally agree to the India's Got Latent - Season 2 Application Terms and Conditions.",
    "",
    "I consent to my personal data being collected and used for reviewing my application, sending event updates, and planning India's Got Latent Season 2.",
    "",
    "Regards,",
    form.fullName,
  ];

  const body = encodeURIComponent(bodyLines.join("\n"));
  return `mailto:?subject=${subject}&body=${body}`;
}

export default function ApplyParticipant() {
  const [form, setForm] = useState<FormData>({
    stateOfBirth: "",
    cityOfBirth: "",
    stateOfResidence: "",
    cityOfResidence: "",
    sameAsBirth: false,
    fullName: "",
    dateOfBirth: "",
    gender: "",
    whatsapp: "",
    email: "",
    instagram: "",
    youtube: "",
    snapchat: "",
    twitter: "",
    latent: "",
    whySelect: "",
    youtubeLinks: [""],
    interestingFacts: [""],
    consent1: false,
    consent2: false,
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const states = Object.keys(statesCities);

  const getCities = (state: string) => {
    return (statesCities as Record<string, string[]>)[state] || [];
  };

  const updateField = useCallback(
    (field: keyof FormData, value: string | boolean | string[]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    },
    []
  );

  const handleSameAsBirth = (checked: boolean) => {
    updateField("sameAsBirth", checked);
    if (checked) {
      updateField("stateOfResidence", form.stateOfBirth);
      updateField("cityOfResidence", form.cityOfBirth);
    }
  };

  const addYoutubeLink = () => {
    if (form.youtubeLinks.length < 5) {
      updateField("youtubeLinks", [...form.youtubeLinks, ""]);
    }
  };

  const updateYoutubeLink = (index: number, value: string) => {
    const next = [...form.youtubeLinks];
    next[index] = value;
    updateField("youtubeLinks", next);
  };

  const removeYoutubeLink = (index: number) => {
    const next = form.youtubeLinks.filter((_, i) => i !== index);
    updateField("youtubeLinks", next.length ? next : [""]);
  };

  const addFact = () => {
    if (form.interestingFacts.length < 5) {
      updateField("interestingFacts", [...form.interestingFacts, ""]);
    }
  };

  const updateFact = (index: number, value: string) => {
    const next = [...form.interestingFacts];
    next[index] = value;
    updateField("interestingFacts", next);
  };

  const removeFact = (index: number) => {
    const next = form.interestingFacts.filter((_, i) => i !== index);
    updateField("interestingFacts", next.length ? next : [""]);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.stateOfBirth) e.stateOfBirth = "Required";
    if (!form.cityOfBirth) e.cityOfBirth = "Required";
    if (!form.stateOfResidence) e.stateOfResidence = "Required";
    if (!form.cityOfResidence) e.cityOfResidence = "Required";
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.dateOfBirth) e.dateOfBirth = "Required";
    if (!form.gender) e.gender = "Required";
    if (!form.whatsapp.trim() || !/^\d{10}$/.test(form.whatsapp))
      e.whatsapp = "Valid 10-digit number required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.latent) e.latent = "Required";
    if (!form.whySelect.trim()) e.whySelect = "Required";
    if (!form.youtubeLinks.some((l) => l.trim()))
      e.youtubeLinks = "At least one YouTube link required";
    if (!form.consent1) e.consent1 = "Required";
    if (!form.consent2) e.consent2 = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!validate()) return;

    const mailto = buildParticipantMailto(form);
    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#666] hover:text-[#F5C518] transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-2 rounded-full bg-[#E91E8C]/10 text-[#E91E8C] text-base font-semibold">
              India&apos;s Got Latent S2 — Participant
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Apply as a Participant
          </h1>
          <p className="text-xl text-[#a0a0a0]">
            Show us what you&apos;ve got. Fill in your details and share your latent.
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-sm text-[#F5C518] hover:underline mt-4"
          >
            Know more about India&apos;s Got Latent
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <input
            type="text"
            name="website"
            value={form.honeypot}
            onChange={(e) => updateField("honeypot", e.target.value)}
            className="absolute opacity-0 pointer-events-none"
            tabIndex={-1}
            aria-hidden="true"
          />

          <section>
            <h2 className="text-base sm:text-lg uppercase tracking-[0.2em] text-[#666] mb-2">
              Place of Birth
            </h2>
            <div className="h-px bg-[#333] mb-6" />
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  State of Birth <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.stateOfBirth}
                  onChange={(e) => {
                    updateField("stateOfBirth", e.target.value);
                    updateField("cityOfBirth", "");
                  }}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors"
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.stateOfBirth && (
                  <p className="text-base text-red-500 mt-2">{errors.stateOfBirth}</p>
                )}
              </div>
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  City of Birth <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.cityOfBirth}
                  onChange={(e) => updateField("cityOfBirth", e.target.value)}
                  disabled={!form.stateOfBirth}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors disabled:opacity-50"
                >
                  <option value="">Select City</option>
                  {getCities(form.stateOfBirth).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.cityOfBirth && (
                  <p className="text-base text-red-500 mt-2">{errors.cityOfBirth}</p>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base sm:text-lg uppercase tracking-[0.2em] text-[#666] mb-2">
              Place of Residence
            </h2>
            <div className="h-px bg-[#333] mb-6" />
            <label className="flex items-center gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={form.sameAsBirth}
                onChange={(e) => handleSameAsBirth(e.target.checked)}
                className="w-5 h-5 rounded border-[#333] bg-[#111] text-[#F5C518] focus:ring-[#F5C518]"
              />
              <span className="text-sm text-[#a0a0a0]">Same as Place of Birth</span>
            </label>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  State of Residence <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.stateOfResidence}
                  onChange={(e) => {
                    updateField("stateOfResidence", e.target.value);
                    updateField("cityOfResidence", "");
                  }}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors"
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.stateOfResidence && (
                  <p className="text-base text-red-500 mt-2">{errors.stateOfResidence}</p>
                )}
              </div>
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  City of Residence <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.cityOfResidence}
                  onChange={(e) => updateField("cityOfResidence", e.target.value)}
                  disabled={!form.stateOfResidence}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors disabled:opacity-50"
                >
                  <option value="">Select City</option>
                  {getCities(form.stateOfResidence).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.cityOfResidence && (
                  <p className="text-base text-red-500 mt-2">{errors.cityOfResidence}</p>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base sm:text-lg uppercase tracking-[0.2em] text-[#666] mb-2">
              Personal Details
            </h2>
            <div className="h-px bg-[#333] mb-6" />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-[#444]"
                  placeholder="Your full name"
                />
                {errors.fullName && (
                  <p className="text-base text-red-500 mt-2">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) => updateField("dateOfBirth", e.target.value)}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors"
                />
                {errors.dateOfBirth && (
                  <p className="text-base text-red-500 mt-2">{errors.dateOfBirth}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a5] mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <p className="text-base text-red-500 mt-2">{errors.gender}</p>
                )}
              </div>
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => updateField("whatsapp", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-[#444]"
                  placeholder="10-digit number"
                  maxLength={10}
                />
                {errors.whatsapp && (
                  <p className="text-base text-red-500 mt-2">{errors.whatsapp}</p>
                )}
              </div>
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-[#444]"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-base text-red-500 mt-2">{errors.email}</p>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base sm:text-lg uppercase tracking-[0.2em] text-[#666] mb-2">
              Social Media Handles (optional)
            </h2>
            <div className="h-px bg-[#333] mb-6" />
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">Instagram</label>
                <input
                  type="text"
                  value={form.instagram}
                  onChange={(e) => updateField("instagram", e.target.value)}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-[#444]"
                  placeholder="@yourhandle"
                />
              </div>
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">YouTube</label>
                <input
                  type="text"
                  value={form.youtube}
                  onChange={(e) => updateField("youtube", e.target.value)}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-[#444]"
                  placeholder="@yourchannel"
                />
              </div>
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">Snapchat</label>
                <input
                  type="text"
                  value={form.snapchat}
                  onChange={(e) => updateField("snapchat", e.target.value)}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-[#444]"
                  placeholder="@yourhandle"
                />
              </div>
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">X / Twitter</label>
                <input
                  type="text"
                  value={form.twitter}
                  onChange={(e) => updateField("twitter", e.target.value)}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-[#444]"
                  placeholder="@yourhandle"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base sm:text-lg uppercase tracking-[0.2em] text-[#666] mb-2">
              Your Latent
            </h2>
            <div className="h-px bg-[#333] mb-6" />
            <div className="space-y-4">
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  What is your Latent? <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.latent}
                  onChange={(e) => updateField("latent", e.target.value)}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors"
                >
                  <option value="">Select your talent</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Music">Music</option>
                  <option value="Dance">Dance</option>
                  <option value="Magic">Magic</option>
                  <option value="Stunts">Stunts</option>
                  <option value="Other">Other</option>
                </select>
                {errors.latent && (
                  <p className="text-base text-red-500 mt-2">{errors.latent}</p>
                )}
              </div>
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  Why should we select you for the show?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.whySelect}
                  onChange={(e) => updateField("whySelect", e.target.value)}
                  rows={4}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-[#444] resize-none"
                  placeholder="Tell us in a few sentences what makes your act stand out..."
                />
                {errors.whySelect && (
                  <p className="text-base text-red-500 mt-2">{errors.whySelect}</p>
                )}
              </div>

              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  Links to Existing Video / Content / Audition Tape{" "}
                  <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-[#666] mb-3">
                  YouTube links only — paste a public or unlisted YouTube URL
                  (youtube.com or youtu.be).
                </p>
                {form.youtubeLinks.map((link, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => updateYoutubeLink(i, e.target.value)}
                      className="flex-1 bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-[#444]"
                      placeholder="https://youtube.com/..."
                    />
                    {form.youtubeLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeYoutubeLink(i)}
                        className="px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addYoutubeLink}
                  className="text-sm text-[#F5C518] hover:underline mt-1"
                >
                  + Add another YouTube link
                </button>
                {errors.youtubeLinks && (
                  <p className="text-base text-red-500 mt-2">{errors.youtubeLinks}</p>
                )}
              </div>

              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  Interesting Facts or Moments from Your Life (optional, max 5)
                </label>
                <p className="text-xs text-[#666] mb-3">
                  Share anything unique about your journey — judges may use these
                  during post-performance questions.
                </p>
                {form.interestingFacts.map((fact, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={fact}
                      onChange={(e) => updateFact(i, e.target.value)}
                      className="flex-1 bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-[#444]"
                      placeholder="e.g. Taught myself guitar during the lockdown..."
                    />
                    {form.interestingFacts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFact(i)}
                        className="px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {form.interestingFacts.length < 5 && (
                  <button
                    type="button"
                    onClick={addFact}
                    className="text-sm text-[#F5C518] hover:underline mt-1"
                  >
                    + Add another fact
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent1}
                onChange={(e) => updateField("consent1", e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-[#333] bg-[#111] text-[#F5C518] focus:ring-[#F5C518]"
              />
              <span className="text-sm text-[#a0a0a0]">
                By clicking Submit, I confirm that I have read, understood, and
                unconditionally agree to the India&apos;s Got Latent — Season 2
                Application Terms and Conditions.
              </span>
            </label>
            {errors.consent1 && (
              <p className="text-red-500 text-xs ml-8">{errors.consent1}</p>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent2}
                onChange={(e) => updateField("consent2", e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-[#333] bg-[#111] text-[#F5C518] focus:ring-[#F5C518]"
              />
              <span className="text-sm text-[#a0a0a0]">
                By submitting this form, you consent to us collecting and using
                your personal details (name, date of birth, gender, WhatsApp
                number, email), place of birth and residence, social media
                handles, latent details, audition video links, and any personal
                facts you&apos;ve shared — for reviewing your application, sending
                event updates, and planning India&apos;s Got Latent Season 2. For
                details on how we handle your data, please read our full Privacy
                Policy (including the Notice for Consent section).
              </span>
            </label>
            {errors.consent2 && (
              <p className="text-red-500 text-xs ml-8">{errors.consent2}</p>
            )}
          </section>

          <div className="p-4 rounded-lg bg-[#111] border border-[#333]">
            <p className="text-sm text-[#666]">
              <strong className="text-xl text-[#a0a0a0]">Disclaimer:</strong> Submitting
              this form does not guarantee your participation. All applications
              are subject to review and shortlisting.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#F5C518] text-[#080808] font-bold text-lg rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Submit
          </button>

          <p className="text-xs text-[#666] text-center">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </p>
        </form>
      </div>
    </div>
  );
}
