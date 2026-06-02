"use client";

import Link from "next/link";

// ── 04 — Category Tiles ──────────────────────────────
function CategoryTiles() {
  const categories = [
    {
      label: "Bloom Floral Jumpsuit",
      img: "/Images/Rectangle1.png",
      href: "/products/bloom-floral-jumpsuit",
    },
    {
      label: "SUNKISSED BLOOM TOP",
      img: "/Images/Rectangle2.png",
      href: "/products/sunkissed-bloom-top",
    },
    {
      label: "Fern Evergreen Top",
      img: "/Images/Rectangle3.png",
      href: "/products/fern-evergreen-top",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <Link
          key={cat.label}
          href={cat.href}
          className="relative overflow-hidden group block h-[420px] sm:h-[500px] lg:h-[580px]"
        >
          {/* Photo */}
          <img
            src={cat.img}
            alt={cat.label}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />

          {/* Label */}
          <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
            <span className="bg-black text-white text-[9px] sm:text-[10px] uppercase tracking-[0.18em] px-3 sm:px-4 py-[6px] sm:py-[7px] inline-block font-body">
              {cat.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

// ── 05 — Brand Story ───────────────────────────
function BrandStory() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[auto] lg:min-h-[540px]">
      
      {/* Image */}
      <div className="bg-[#7ec8e3] flex items-center justify-center overflow-hidden h-[420px] sm:h-[520px] lg:h-auto">
        <img
          src="/Images/brand-story.png"
          alt="The Label — keptalive dress"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Text */}
      <div className="bg-white flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 py-14 sm:py-16">
        
        {/* Eyebrow */}
        <p className="font-body text-black text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-5">
          The Label
        </p>

        {/* Heading */}
        <h2 className="font-title text-black text-[34px] sm:text-[42px] md:text-[48px] leading-[1.1] mb-7">
          AN ERA 
          <br />
          REIMAGINED.
        </h2>

        {/* Body */}
        <p className="font-body text-black text-[13px] sm:text-[14px] leading-relaxed mb-5 max-w-[420px]">
          Keptalive is a celebration of living fabrics and timeless craftsmanship.
          Every garment is thoughtfully created to being movement,
          expression and soul into fashion carrying the past forward.
        </p>

        {/* Tagline
        <p className="font-body text-black text-[13px] sm:text-[14px] italic leading-relaxed mb-10 max-w-[420px]">
          This is not scarcity as a strategy.
          <br />
          <em>It is the entire point.</em>
        </p> */}

        {/* CTA */}
        <div>
          <Link
            href="/Label"
            className="inline-block bg-black text-white text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-5 sm:px-6 py-3 sm:py-4 hover:bg-[#2b2b2b] transition-colors duration-200 font-body"
          >
            ABOUT THE LABEL
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Export ─────────────────────────────────────
export default function CategoryAndStory() {
  return (
    <>
      <CategoryTiles />
      <BrandStory />
    </>
  );
}