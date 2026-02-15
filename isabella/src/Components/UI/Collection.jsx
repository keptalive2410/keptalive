"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const tabs = [
  { id: "new-season", label: "NEW SEASON" },
  { id: "sleepwear", label: "SLEEPWEAR" },
  { id: "bridal", label: "BRIDAL" },
  { id: "sale", label: "SALE" },
];

// Sample products for each collection
const collections = {
  "new-season": [
    {
      id: 1,
      name: "Floral Wrap Dress",
      image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=800&q=80",
      price: "$89.99",
      soldOut: false,
    },
    {
      id: 2,
      name: "Summer Midi Dress",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
      price: "$79.99",
      soldOut: false,
    },
    {
      id: 3,
      name: "Elegant Evening Gown",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
      price: "$129.99",
      soldOut: false,
    },
    {
      id: 4,
      name: "Casual Day Dress",
      image:
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
      price: "$69.99",
      soldOut: false,
    },
  ],
  sleepwear: [
  {
    id: 5,
    name: "Silk Pajama Set",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    price: "$95.00",
    soldOut: true,
  },
  {
    id: 6,
    name: "Cotton Sleep Dress",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80",
    price: "$65.00",
    soldOut: true,
  },
  {
    id: 7,
    name: "Luxury Robe",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
    price: "$110.00",
    soldOut: false,
  },
  {
    id: 8,
    name: "Satin Nightgown",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    price: "$75.00",
    soldOut: false,
  },
],

  bridal: [
  {
    id: 9,
    name: "Classic Wedding Gown",
    image: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80",
    price: "$899.00",
    soldOut: false,
  },
  {
    id: 10,
    name: "Modern Bridal Dress",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
    price: "$799.00",
    soldOut: false,
  },
  {
    id: 11,
    name: "Bohemian Wedding Dress",
    image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80",
    price: "$849.00",
    soldOut: false,
  },
  {
    id: 12,
    name: "Vintage Lace Gown",
    image: "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=800&q=80",
    price: "$950.00",
    soldOut: false,
  },
],

  sale: [
  {
    id: 13,
    name: "Discounted Party Dress",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
    price: "$45.00",
    originalPrice: "$90.00",
    soldOut: false,
  },
  {
    id: 14,
    name: "Clearance Maxi Dress",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    price: "$39.99",
    originalPrice: "$79.99",
    soldOut: false,
  },
  {
    id: 15,
    name: "Sale Evening Dress",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
    price: "$59.99",
    originalPrice: "$119.99",
    soldOut: false,
  },
  {
    id: 16,
    name: "Final Sale Dress",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    price: "$35.00",
    originalPrice: "$70.00",
    soldOut: false,
  },
],

};

export default function CollectionsSection() {
  const [activeTab, setActiveTab] = useState("new-season");

  const scrollCarousel = (direction) => {
    const carousel = document.getElementById("product-carousel");
    if (carousel) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 px-4 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-3 text-black">COLLECTIONS</h2>
          <div className="w-16 h-0.5 bg-gray-400 mx-auto"></div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center items-center mb-12 flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 text-sm tracking-wider transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>

          {/* Products Grid */}
          <div
            id="product-carousel"
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {collections[activeTab].map((product) => (
              <div
                key={product.id}
                className="shrink-0 w-72 group cursor-pointer"
              >
                <Link href={`/products/${product.id}`}>
                  {/* Product Image */}
                  <div className="relative aspect-3/4 mb-4 overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Sold Out Badge */}
                    {product.soldOut && (
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs tracking-wider">
                        SOLD OUT
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>

                  {/* Product Info */}
                  <div className="text-center">
                    <h3 className="text-gray-600 text-sm mb-2 group-hover:text-gray-800 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-gray-600 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-gray-500">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={`/collections/${activeTab}`}
            className="inline-block px-8 py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-all duration-300"
          >
            View All {tabs.find((t) => t.id === activeTab)?.label}
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
