"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Editorial grid items (bottom mosaic) ───────────────────────────────────
const editorialItems = [
  {
    id: 1,
    name: "The Velvet Cord",
    price: "₹ 11,400",
    image: "/Images/Rectangle8.png",
    size: "sm",
  },
  {
    id: 2,
    name: "The Wide Trouser",
    price: "₹ 11,400",
    image: "/Images/Rectangle9.png",
    size: "sm",
  },
  {
    id: 3,
    name: "Collection I — The Edit",
    label: "Three pieces. One look.",
    image: "/Images/Rectangle10.png",
    size: "lg",
    isEditorial: true,
  },
  {
    id: 4,
    image: "/Images/Rectangle11.png",
    size: "lg",
  },
];

// ─── Swatch dot ─────────────────────────────────────────────────────────────
function Swatch({ color }) {
  return (
    <span
      className="inline-block w-3.5 h-3.5 rounded-full border border-[#D0D0D0]"
      style={{ backgroundColor: color }}
    />
  );
}

function ArchiveCard({ item }) {
  return (
    <Link
      href={`/products/${item.slug}`}
      className="group block"
    >
      {/* image */}
      <div className="relative aspect-3/4 overflow-hidden bg-[#F0EDE8]">
        <Image
          src={item.productImages?.[0]?.url}
          alt={item.productName}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>

      {/* meta */}
      <div className="pt-2.5 pb-1">
        <p className="text-[11px] tracking-[0.08em] text-[#111] font-seasons">
          {item.productName}
        </p>

        <p className="text-[11px] tracking-[0.04em] text-[#555] font-seasons mt-0.5">
          ₹ {item.productSellingPrice?.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

// ─── Archive section (grid + CTA) ───────────────────────────────────────────
export function ArchiveGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products?limit=4", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full bg-white">
      {/* header bar */}
      <div className="flex items-baseline justify-between px-5 md:px-8 pt-8 pb-4 border-b border-[#E8E8E8]">
        <div>
          <h2 className="text-[18px] tracking-[0.12em] uppercase font-nexa text-[black]">
            The Collection
          </h2>
          <p className="text-[16px] font-seasons text-[black] mt-0.5 tracking-[0.04em]">
            Made once. Each piece is numbered and for all.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          {/* <button className="text-[11px] font-seasons tracking-[0.08em] border border-[#D0D0D0] px-4 py-1.5 text-[#111] hover:bg-[#111] hover:text-white transition-colors duration-200">
            Filter
          </button>
          <button className="text-[11px] font-seasons tracking-[0.08em] border border-[#D0D0D0] px-4 py-1.5 text-[#111] hover:bg-[#111] hover:text-white transition-colors duration-200">
            Sort
          </button> */}
          <span className="text-[18px] font-seasons text-[black] tracking-[0.04em]">
            18 Pieces
          </span>
        </div>
      </div>

      {/* product grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E8E8E8] border-b border-[#E8E8E8]">
        {products.map((item) => (
          <div key={item.id} className="bg-white px-4 pt-4 pb-5">
            <ArchiveCard item={item} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center py-8">
        <Link
          href="/products"
          className="inline-block bg-[#111] text-white font-seasons tracking-[0.14em] text-[11px] uppercase px-10 py-3.5 hover:bg-[#333] transition-colors duration-200"
        >
          View The Full Collection
        </Link>
      </div>
    </section>
  );
}

// ─── Hero campaign section ───────────────────────────────────────────────────
export function HeroCampaign() {
  return (
    <section className="w-full relative">
      {/* full-bleed hero image */}
      <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden">
        <Image
          src="/Images/Rectangle12.png"
          alt="Archive I 2026 Campaign"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        {/* frosted card overlay */}
        <div className="absolute inset-0 flex items-center">
          <div
            className="absolute bottom-4 left-4 md:ml-[40%] md:static bg-white/80 backdrop-blur-sm px-4 py-4 sm:px-5 sm:py-5 md:px-7 md:py-6 w-[260px] sm:w-[280px] md:w-[290px] lg:w-[340px] md:max-w-75 shadow-sm"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <p className="text-[8px] sm:text-[9px] md:text-[9px] font-seasons tracking-[0.16em] uppercase text-[#777] mb-2">
              Collection I · 2026
            </p>

            <h2 className="font-nexa text-[14px] sm:text-[18px] md:text-[26px] leading-[1.15] text-[#111] mb-3">
              The pieces that close the archive.
            </h2>

            <p className="text-[9px] sm:text-[10px] md:text-[11px] font-seasons text-[#555] leading-relaxed mb-5">
              Each piece in Archive I is numbered and incl.
              <br />
              When the last piece is claimed, this archive closes.
            </p>

            <Link
              href="/products"
              className="inline-block bg-[#111] text-white font-seasons tracking-[0.14em] text-[8px] sm:text-[9px] md:text-[10px] uppercase px-4 sm:px-5 md:px-6 py-2 md:py-2.5 hover:bg-[#333] transition-colors duration-200"
            >
              Shop The Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Editorial mosaic (bottom section) ──────────────────────────────────────
export function EditorialMosaic() {
  return (
    <section className="w-full bg-[#efefef]">
      {/* ───────── DESKTOP ───────── */}
      <div
        className="hidden md:grid grid-cols-[1.6fr_1fr_1fr] gap-px bg-[#d9d9d9]"
        style={{
          gridTemplateRows: "1fr 1fr",
          height: "820px",
        }}
      >
        {/* LEFT LARGE HERO */}
        <div className="relative row-span-2 overflow-hidden group bg-[#F0EDE8]">
          <Image
            src="/Images/Rectangle11.png"
            alt="Collection I The Edit"
            fill
            sizes="50vw"
            className="object-cover"
          />

          {/* Caption */}
          <div className="absolute bottom-4 left-4 bg-white/90 px-6 py-4 w-[320px]">
            <p className="font-nexa text-[10px] uppercase tracking-[0.18em] text-[#777]">
              Explore I &nbsp;|&nbsp; The Edit
            </p>

            <p className="font-seasons text-[15px] text-black mt-1">
              Three pieces. One look.
            </p>
          </div>
        </div>

        {/* TOP MIDDLE */}
        <Link
          href={`/products/${editorialItems[2].id}`}
          className="relative overflow-hidden group bg-[#F0EDE8]"
        >
          <Image
            src={editorialItems[2].image}
            alt={editorialItems[2].name}
            fill
            sizes="25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          <div className="absolute bottom-4 left-4">
            <div className="bg-black/85 inline-block px-3 py-1">
              <p className="font-seasons text-white text-[11px]">
                {editorialItems[2].name}
              </p>
            </div>

            <p className="text-[#8d8d8d] text-[10px] mt-1 font-nexa">
              {editorialItems[2].price}
            </p>
          </div>
        </Link>

        {/* RIGHT TALL IMAGE */}
        <Link
          href={`/products/${editorialItems[0].id}`}
          className="relative row-span-2 overflow-hidden group bg-[#F0EDE8]"
        >
          <Image
            src={editorialItems[0].image}
            alt={editorialItems[0].name}
            fill
            sizes="25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          <div className="absolute bottom-4 left-4">
            <div className="bg-black/85 inline-block px-3 py-1">
              <p className="font-seasons text-white text-[11px]">
                {editorialItems[0].name}
              </p>
            </div>

            <p className="text-[#8d8d8d] text-[10px] mt-1 font-nexa">
              {editorialItems[0].price}
            </p>
          </div>
        </Link>

        {/* BOTTOM MIDDLE */}
        <Link
          href={`/products/${editorialItems[1].id}`}
          className="relative overflow-hidden group bg-[#F0EDE8]"
        >
          <Image
            src={editorialItems[1].image}
            alt={editorialItems[1].name}
            fill
            sizes="25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          <div className="absolute bottom-4 left-4">
            <div className="bg-black/85 inline-block px-3 py-1">
              <p className="font-seasons text-white text-[11px]">
                {editorialItems[1].name}
              </p>
            </div>

            <p className="text-[#8d8d8d] text-[10px] mt-1 font-nexa">
              {editorialItems[1].price}
            </p>
          </div>
        </Link>
      </div>

      {/* ───────── MOBILE ───────── */}
      <div className="md:hidden flex flex-col gap-px bg-[#d9d9d9]">
        {/* HERO */}
        <div className="relative aspect-3/4 overflow-hidden bg-[#F0EDE8]">
          <Image
            src="/Images/Rectangle11.png"
            alt="Archive I The Edit"
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-3 w-60">
            <p className="font-nexa text-[9px] uppercase tracking-[0.16em] text-[#777]">
              Archive I &nbsp;|&nbsp; The Edit
            </p>

            <p className="font-seasons text-[13px] text-black mt-1">
              Three pieces. One look.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-px bg-[#d9d9d9]">
          {editorialItems.slice(0, 2).map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="relative aspect-3/4 overflow-hidden bg-[#F0EDE8] group"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute bottom-3 left-3">
                <div className="bg-black/85 inline-block px-2 py-1">
                  <p className="font-seasons text-white text-[10px]">
                    {item.name}
                  </p>
                </div>

                <p className="text-[#b5b5b5] text-[9px] mt-1 font-nexa">
                  {item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* LAST CARD */}
        <Link
          href={`/products/${editorialItems[2].id}`}
          className="relative aspect-3/4 overflow-hidden bg-[#F0EDE8] group"
        >
          <Image
            src={editorialItems[2].image}
            alt={editorialItems[2].name}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          <div className="absolute bottom-3 left-3">
            <div className="bg-black/85 inline-block px-2 py-1">
              <p className="font-seasons text-white text-[10px]">
                {editorialItems[2].name}
              </p>
            </div>

            <p className="text-[#b5b5b5] text-[9px] mt-1 font-nexa">
              {editorialItems[2].price}
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}


// ─── Default export: full composed block ────────────────────────────────────
export default function KeptAliveHomeSections() {
  return (
    <>
      <ArchiveGrid />
      <HeroCampaign />
      <EditorialMosaic />
    </>
  );
}
