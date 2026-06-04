"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CollectionPage() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-white text-black overflow-x-hidden">
        {/* ══════════════════════════════════════
          HERO — full-bleed, text bottom-left
      ══════════════════════════════════════ */}
        <section className="relative w-full h-[62vw] max-h-195 min-h-85 overflow-hidden">
          <img
            src="/Images/Collections7.jpeg"
            alt="DISCOVER I · 2026"
            className="w-full h-full object-cover object-top"
          />
          {/* gradient for legibility */}
          <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-14">
            <p className="font-nexa text-white text-[9px] md:text-[10px] tracking-widest uppercase mb-2 opacity-70">
              DISCOVER I
            </p>
            <h1 className="font-seasons text-white text-[clamp(28px,5vw,68px)] leading-[1.05] mb-2">
              THE WAVE OF REVIVAL
            </h1>
            <p className="font-nexa text-white text-[11px] md:text-[13px] leading-relaxed opacity-80 max-w-90">
              Timeless retro artistry, revived with purpose.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════
          INTRO BAR — text left, piece count right
      ══════════════════════════════════════ */}
        <section className="border-b border-[#E0E0E0] px-8 md:px-14 lg:px-20 py-10 md:py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-140">
            <p className="font-nexa text-black text-[12px] md:text-[13px] leading-relaxed mb-4">
              A wave never truly disappears—it returns, transformed. Collection
              I draws from timeless craftsmanship and retro artistry,
              reimagining familiar forms through a contemporary lens. Each piece
              reflects movement, renewal, and the enduring beauty of design that
              refuses to fade. Created with intention and made to be remembered,
              these eighteen pieces embody the spirit of revival—where the past
              flows forward and every return carries new meaning. 
            </p>
            <p className="font-nexa text-[#8A8A8A] text-[11px] md:text-[12px] tracking-wide italic">
              Inspired by
              movement. Designed for renewal.
            </p>
          </div>

          {/* Piece count — top right */}
          <div className="flex flex-col items-start md:items-end shrink-0">
            <p className="font-seasons text-black text-[clamp(36px,4vw,56px)] leading-none">
              18
            </p>
            <p className="font-nexa text-[#8A8A8A] text-[10px] tracking-widest uppercase mt-1">
              Pieces
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════
          EDIT 01 — THE WHITE SHIRT EDIT
          Layout: big left img + 2 stacked right imgs
      ══════════════════════════════════════ */}
        <section className="border-b border-[#E0E0E0]">
          {/* Edit label + title */}
          <div className="px-8 md:px-14 lg:px-20 py-5 md:py-6 border-b border-[#E0E0E0]">
            <p className="font-nexa text-[#8A8A8A] text-[10px] tracking-widest uppercase mb-1">
              LOOK 01
            </p>
            <h2 className="font-seasons text-black text-[clamp(18px,2.2vw,30px)] leading-tight">
              The Bloom Floral Jumpsuit
            </h2>
          </div>

          {/* Image grid: left big, right 2 stacked */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left — tall single image */}
            <div className="relative overflow-hidden aspect-3/4 md:aspect-auto md:min-h-150">
              <img
                src="/Images/Collections6.jpeg"
                alt="The White Shirt Edit"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right — 2 images stacked */}
            <div className="grid grid-rows-2">
              <div className="relative overflow-hidden aspect-4/3 md:aspect-auto">
                <img
                  src="/Images/Collections5.jpeg"
                  alt="White shirt detail"
                  className="w-full h-full object-cover"
                />
                {/* Pill label */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                  <span className="font-nexa text-white text-[9px] tracking-widest uppercase bg-black/60 px-4 py-1.5 whitespace-nowrap">
                    THE LABEL
                  </span>
                </div>
              </div>
              <div className="relative overflow-hidden aspect-4/3 md:aspect-auto">
                <img
                  src="/Images/Collections4.jpeg"
                  alt="White shirt detail 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Caption bar */}
          <div className="px-8 md:px-14 lg:px-20 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-[#E0E0E0]">
            <p className="font-nexa text-[#8A8A8A] text-[10px] tracking-widest uppercase">
              Shown in this look
            </p>
            <p className="font-nexa text-black text-[11px] md:text-[12px]">
              The Bloom Floral Jumpsuit
              The Bloom Floral Jumpsuit #001 · Indigo Charm Top #002 · Sunkissed Bloom Top #003
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════
    EDIT 02 — THE DARK EDIT
══════════════════════════════════════ */}
        <section className="border-b border-[#DCDCD8] bg-[#F3F3F1]">
          {/* Header */}
          <div className="px-6 md:px-10 lg:px-14 py-4 border-b border-[#DCDCD8]">
            <p className="font-nexa text-[#8A8A8A] text-[9px] tracking-[0.22em] uppercase mb-1">
              LOOK 02
            </p>

            <h2 className="font-seasons text-black text-[clamp(18px,2vw,28px)]">
              Fern Evergreen Top
            </h2>
          </div>

          {/* IMAGES */}
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr]">
            {/* LEFT SMALLER */}
            <div className="relative overflow-hidden h-85 md:h-105">
              <img
                src="/Images/Collections3.jpeg"
                alt="The Dark Edit"
                className="w-full h-full object-cover"
              />

              {/* tiny label */}
              <div className="absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2">
                <span className="font-nexa text-[8px] tracking-[0.16em] uppercase bg-white/90 text-black px-4 py-1">
                  Editorial Image
                </span>
              </div>
            </div>

            {/* RIGHT LARGER */}
            <div className="relative overflow-hidden h-85 md:h-105 border-l border-[#DCDCD8]">
              <img
                src="/Images/Collections2.jpeg"
                alt="The Dark Edit detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* CAPTION */}
          <div className="px-6 md:px-10 lg:px-14 py-3 border-t border-[#DCDCD8] flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            {/* <p className="font-nexa text-[#9A9A96] text-[8px] tracking-[0.18em] uppercase whitespace-nowrap">
              Pieces in this look:
            </p>

            <p className="font-nexa text-[#2B2B2B] text-[10px] md:text-[11px]">
              The Column Dress #001 · The Crystal Tight #007 · The Garnet Ring
              #008
            </p> */}
          </div>
        </section>

        {/* ══════════════════════════════════════
    EDIT 03 — THE DRAPE EDIT
══════════════════════════════════════ */}
        <section className="border-b border-[#DCDCD8] bg-[#F3F3F1]">
          {/* Header */}
          <div className="px-6 md:px-10 lg:px-14 py-4 border-b border-[#DCDCD8]">
            <p className="font-nexa text-[#8A8A8A] text-[9px] tracking-[0.22em] uppercase mb-1">
              LOOK 03
            </p>

            <h2 className="font-seasons text-black text-[clamp(18px,2vw,28px)]">
              Midnight Bloom Dress
            </h2>
          </div>

          {/* IMAGES */}
          <div className="grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr]">
            {/* LEFT SMALLER */}
            <div className="relative overflow-hidden h-90 md:h-125">
              <img
                src="/Images/Collections1.jpeg"
                alt="The Drape Edit"
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT BIGGER */}
            <div className="relative overflow-hidden h-90 md:h-125 border-l border-[#DCDCD8]">
              <img
                src="/Images/Collections8.jpeg"
                alt="The Drape Edit detail"
                className="w-full h-full object-cover"
              />

              {/* tiny floating tag */}
              <div className="absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2">
                <span className="font-nexa text-[8px] tracking-[0.16em] uppercase bg-white/90 text-black px-4 py-1">
                  Editorial Image
                </span>
              </div>
            </div>
          </div>

          {/* CAPTION */}
          <div className="px-6 md:px-10 lg:px-14 py-3 border-t border-[#DCDCD8] flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            {/* <p className="font-nexa text-[#9A9A96] text-[8px] tracking-[0.18em] uppercase whitespace-nowrap">
              Pieces in this look:
            </p>

            <p className="font-nexa text-[#2B2B2B] text-[10px] md:text-[11px]">
              The Drape Skirt #005 · The Wrap Blouse #013 · The Silk Slip #016
            </p> */}
          </div>
        </section>

        {/* ══════════════════════════════════════
          BLACK TICKER / STATS BAR
      ══════════════════════════════════════ */}
        <section className="bg-black w-full overflow-hidden relative">
          <img
            src="/images/wave-black-banner.png"
            alt=""
            aria-hidden="true"
            className="w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20 px-0">
              {[
                { stat: "Archive I is open" },
                { stat: "18 pieces total" },
                { stat: "Made once. Never restocked." },
                { stat: "Each piece is numbered and final." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="px-6 md:px-10 py-5 md:py-6 flex items-center justify-center"
                >
                  <p className="font-nexa text-white text-[9px] md:text-[10px] tracking-widest uppercase text-center">
                    {item.stat}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
          CTA — centred, white bg
      ══════════════════════════════════════ */}
        <section className="px-8 md:px-14 lg:px-20 py-20 md:py-28 flex flex-col items-center text-center">
          <h2 className="font-seasons text-black text-[clamp(22px,3vw,42px)] leading-[1.1] mb-3">
            All eighteen pieces are available now.
          </h2>
          <p className="font-nexa text-[#8A8A8A] text-[12px] md:text-[13px] italic mb-10">
            Each one numbered. Each one final.
          </p>

          <a
            href="/products"
            className="inline-block bg-black text-white font-nexa text-[10px] tracking-widest uppercase px-14 py-4 mb-4 hover:bg-[#2B2B2B] transition-colors duration-200 w-full max-w-85 text-center"
          >
            EXPLORE THE FULL COLLECTION
          </a>

          <a
            href="/"
            className="inline-block border border-black text-black font-nexa text-[10px] tracking-widest uppercase px-14 py-4 hover:bg-black hover:text-white transition-colors duration-200 w-full max-w-85 text-center"
          >
            JOIN THE ARCHIVE LIST
          </a>

          <p className="font-nexa text-[#8A8A8A] text-[10px] leading-relaxed max-w-90 mt-8 text-center">
            When Archive I closes, it closes permanently. Archive II will be
            announced to the Archive List.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
