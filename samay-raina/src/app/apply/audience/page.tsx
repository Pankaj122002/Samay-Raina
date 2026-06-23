"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import statesCities from "@/data/states-cities.json";

interface FormData {
  state: string;
  city: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  whatsapp: string;
  email: string;
  consent: boolean;
  honeypot: string;
}

function buildAudienceMailto(form: FormData): string {
  const subject = encodeURIComponent("India's Got Latent S2 - Audience Registration");

  const bodyLines = [
    "Hi Team,",
    "",
    "I would like to register as an audience member for India's Got Latent Season 2 / Samay Raina Live Tour.",
    "",
    "--- PERSONAL DETAILS ---",
    `Full Name: ${form.fullName}`,
    `Date of Birth: ${form.dateOfBirth}`,
    `Gender: ${form.gender}`,
    `WhatsApp: ${form.whatsapp}`,
    `Email: ${form.email}`,
    "",
    "--- LOCATION ---",
    `State: ${form.state}`,
    `City: ${form.city}`,
    "",
    "--- CONSENT ---",
    "I consent to my personal data being collected and used for processing my registration and sending event updates.",
    "",
    "Regards,",
    form.fullName,
  ];

  const body = encodeURIComponent(bodyLines.join("\n"));
  return `mailto:?subject=${subject}&body=${body}`;
}

export default function RegisterAudience() {
  const [form, setForm] = useState<FormData>({
    state: "",
    city: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    whatsapp: "",
    email: "",
    consent: false,
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const states = Object.keys(statesCities);

  const getCities = (state: string) => {
    return (statesCities as Record<string, string[]>)[state] || [];
  };

  const updateField = useCallback(
    (field: keyof FormData, value: string | boolean) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    },
    []
  );

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.state) e.state = "Required";
    if (!form.city) e.city = "Required";
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.dateOfBirth) e.dateOfBirth = "Required";
    if (!form.gender) e.gender = "Required";
    if (!form.whatsapp.trim() || !/^\d{10}$/.test(form.whatsapp))
      e.whatsapp = "Valid 10-digit number required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.consent) e.consent = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!validate()) return;

    const mailto = buildAudienceMailto(form);
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
              Samay Raina — Live Tour and IGL S2
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Watch Samay Raina Live!
          </h1>
          <p className="text-xl text-[#a0a0a0]">
            Register your interest to attend Samay&apos;s live tour and India&apos;s Got
            Latent Season 2. We&apos;ll add you to the pre-sale list for early ticket
            access.
          </p>
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
              Location
            </h2>
            <div className="h-px bg-[#333] mb-6" />
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.state}
                  onChange={(e) => {
                    updateField("state", e.target.value);
                    updateField("city", "");
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
                {errors.state && (
                  <p className="text-base text-red-500 mt-2">{errors.state}</p>
                )}
              </div>
              <div>
                <label className="block text-lg text-[#a0a0a0] mb-3">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  disabled={!form.state}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-5 py-4 text-lg text-[#f5f5f5] focus:border-[#F5C518] focus:outline-none transition-colors disabled:opacity-50"
                >
                  <option value="">Select City</option>
                  {getCities(form.state).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-base text-red-500 mt-2">{errors.city}</p>
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
                <label className="block text-lg text-[#a0a0a0] mb-3">
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
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => updateField("consent", e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-[#333] bg-[#111] text-[#F5C518] focus:ring-[#F5C518]"
              />
              <span className="text-sm text-[#a0a0a0]">
                By submitting this form, you consent to us collecting and using
                your name, mobile, email, date of birth, gender, and city for
                processing your registration, sending event updates. For details
                on how we handle your data, please read our full Privacy Policy
                (including the Notice for Consent section).
              </span>
            </label>
            {errors.consent && (
              <p className="text-red-500 text-xs ml-8 mt-1">{errors.consent}</p>
            )}
          </section>

          <div className="p-4 rounded-lg bg-[#111] border border-[#333]">
            <p className="text-sm text-[#666]">
              <strong className="text-[#a0a0a0]">Disclaimer:</strong> Submitting
              this form does not guarantee a ticket. It adds you to the pre-sale
              list for early access when tickets go on sale.
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
