"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const tabs = [
  { id: "home", label: "All" },
  { id: "trending", label: "Trending" },
  { id: "new-arrivals", label: "New Arrivals" },
  { id: "sale", label: "SALE" },
];


export default function CollectionsSection() {
  const [activeTab, setActiveTab] = useState("home");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/products?displayAt=${activeTab}&limit=8`
        );

        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

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
              className={`px-6 py-2 text-sm tracking-wider transition-all duration-300 ${activeTab === tab.id
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
            {products?.map((product) => (
              <div
                key={product._id}
                className="shrink-0 w-72 group cursor-pointer"
              >
                <Link href={`/products/${product.slug}`}>
                  {/* Product Image */}
                  <div className="relative aspect-3/4 mb-4 overflow-hidden bg-gray-100">
                    <Image
                      src={product.productImages[0].url}
                      alt={product.productName}
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
                      {product.productName}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      {product.productOriginalPrice && (
                        <span className="text-sm text-gray-600 line-through">
                          {product.productOriginalPrice}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-gray-500">
                        {product.productSellingPrice}
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
    </section>
  );
}
