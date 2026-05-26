"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-white">
      {/* ── Wrapper: image + badge overlay ── */}
      <div className="relative w-full">
        {/* ARCHIVE I 2025 — top right badge */}
        <div className="absolute top-5 right-5 z-10">
          <span className="bg-black text-black border border-black text-[10px] uppercase tracking-[0.2em] px-3 py-[5px] inline-block">
            ARCHIVE I 2025
          </span>
        </div>

        {/* The masked hero image — photo with wave cutout, bg is transparent */}
        <img
          src="/Images/hero-sec.png"
          alt="Archive I 2025 Campaign"
          className="w-full block"
        />
      </div>

      {/* ── White section below image — card lives here ── */}
      <div className="bg-white w-full px-4 sm:px-8 md:px-14 z-10">
        {/* Info card */}
        <div className="border border-[#e0e0e0] bg-white p-6 w-[300px] relative -top-[180px] z-20 shadow-sm hidden md:block">
          {/* Left accent line + eyebrow */}
          <div className="flex gap-3 items-start mb-3">
            <div className="w-[2px] bg-black self-stretch shrink-0" />
            <p className="text-black text-[11px] tracking-[0.15em] uppercase leading-tight">
              Explore I · 2026
            </p>
          </div>
          {/* Body */}
          <p className="text-black text-[13px] leading-relaxed mb-5 pl-[14px]">
            Eighteen pieces. Each one numbered,
            <br />
            made once, and never returning.
          </p>
          {/* CTA */}
          <div className="pl-[14px]">
            <Link
              href="/products"
              className="inline-block bg-black text-white text-[10px] uppercase tracking-[0.2em] px-5 py-3 hover:bg-[#2b2b2b] transition-colors duration-200"
            >
              EXPLORE THE COLLECTION
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white w-full h-[160px] md:hidden" />
      {/* ── Ticker bar ── */}
      <div className="bg-black overflow-hidden py-[10px] -mt-[150px] relative z-10">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "heroTicker 24s linear infinite" }}
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="flex items-center shrink-0 text-white uppercase text-[10px] tracking-[0.18em]"
            >
              <span className="px-7">Made once. Never restocked.</span>
              <span className="text-[#555]">·</span>
              <span className="px-7">Each piece is numbered and final.</span>
              <span className="text-[#555]">·</span>
              <span className="px-7">Worn. Kept. Archived.</span>
              <span className="text-[#555]">·</span>
              <span className="px-7">keptalive &nbsp;&nbsp; Explore I</span>
              <span className="text-[#555]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
