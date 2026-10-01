"use client";

import { useState } from "react";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative w-full bg-white">

      {/* ── Wrapper: image + badge overlay ── */}
      <div className="relative w-full">

        {/* Hero Video */}
        <video
          src="/Images/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          className="w-full h-full object-cover block"
        />

      </div>

      {/* Loader */}
      {!videoLoaded && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-700"
        >
          <div className="flex flex-col items-center gap-4">

            {/* Logo */}
            <img
              src="/logo.png"
              alt="The 101"
              className="w-24 h-auto"
            />

            {/* Loading line */}
            <div className="w-48 h-[2px] bg-[#BFC3C7] overflow-hidden">
              <div className="h-full w-1/2 bg-black animate-[loading_1.2s_ease-in-out_infinite]" />
            </div>

          </div>
        </div>
      )}

      {/* ── White section below image — card lives here ── */}
      {/* <div className="bg-white w-full px-4 sm:px-8 md:px-14 z-10">
        <div className="border border-[#e0e0e0] bg-white p-6 w-[300px] relative -top-[180px] z-20 shadow-sm hidden md:block">
          <div className="flex gap-3 items-start mb-3">
            <div className="w-[2px] bg-black self-stretch shrink-0" />
            <p className="text-black text-[11px] tracking-[0.15em] uppercase leading-tight">
              Explore I · 2026
            </p>
          </div>
          <p className="text-black text-[13px] leading-relaxed mb-5 pl-[14px]">
            Eighteen pieces. Timeless retro
            <br />
            artistry, remembered and Keptalive.
          </p>
          <div className="pl-[14px]">
            <Link
              href="/products"
              className="inline-block bg-black text-white text-[10px] uppercase tracking-[0.2em] px-5 py-3 hover:bg-[#2b2b2b] transition-colors duration-200"
            >
              EXPLORE THE COLLECTION
            </Link>
          </div>
        </div>
      </div> */}

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
              {/* <span className="px-7">Made once. Never restocked.</span>
              <span className="text-[#555]">·</span>
              <span className="px-7">Each piece is numbered and final.</span>
              <span className="text-[#555]">·</span> */}
              <span className="px-7">
                The grace of yesterday alive for today .
              </span>
              <span className="text-[#555]">·</span>
              <span className="px-7">
                Bringing forgotten silhouettes back to life.
              </span>
              <span className="text-[#555]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}