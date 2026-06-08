"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";

/* ─────────────────────────────────────────────
   PRODUCT CARD
   • Full-bleed image, no border-radius
   • "VIEW PIECE" button slides up on hover
   • "Sold out" badge top-right when unavailable
   • Name + price below; greyed out when sold out
───────────────────────────────────────────── */
function ProductCard({ product, onClick }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [hovered, setHovered] = useState(false);
  const images = product.productImages || [];
  const intervalRef = useRef(null);
  const isSoldOut = product.isSoldOut || product.stock === 0;

  const startSlideshow = () => {
    setHovered(true);
    if (images.length <= 1) return;
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % images.length;
      setCurrentImg(idx);
    }, 1500);
  };

  const stopSlideshow = () => {
    setHovered(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImg(0);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div
      className="cursor-pointer group"
      onClick={onClick}
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
    >
      {/* Image wrapper — no rounding, no margin between cards */}
      <div
        className="relative overflow-hidden bg-[#f0eeec]"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Images */}
        {images.length === 0 && (
          <div className="absolute inset-0 bg-[#f0eeec]" />
        )}
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={product.productName}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === currentImg ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Sold out badge — top right */}
        {isSoldOut && (
          <div className="absolute top-3 right-3 bg-white px-2.5 py-1 text-[0.65rem] tracking-[0.12em] font-medium text-black z-10">
            Sold out
          </div>
        )}

        {/* VIEW PIECE overlay — slides up from bottom on hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 flex items-center justify-center py-4 bg-black transition-all duration-300 z-10 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
          }`}
        >
          <span
            className="text-white text-[0.65rem] tracking-[0.2em] font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            VIEW PIECE
          </span>
        </div>
      </div>

      {/* Info — below image */}
      <div className="px-1 pt-2 pb-5 min-h-[62px] flex flex-col justify-start">
        <p
          className={`text-[0.82rem] leading-[1.1rem] font-light tracking-wide ${
            isSoldOut ? "text-[#aaa]" : "text-[#1a1a1a]"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {product.productName}
        </p>

        <p
          className={`text-[0.78rem] leading-[1rem] mt-1 font-light tracking-wide ${
            isSoldOut ? "text-[#aaa]" : "text-[#1a1a1a]"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          ₹ {product.productSellingPrice?.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ArchivePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [selectedCategory, setSelectedCategory] = useState(null); // single select like wireframe
  const [availability, setAvailability] = useState({
    available: false,
    soldOut: false,
  });
  const router = useRouter();

  // const searchParams = useSearchParams();

  const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];

  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 50000],
    size: [],
  });

//   useEffect(() => {
//   const category = searchParams.get("categories");

//   if (!category) return;

//   setSelectedCategory(category);

//   setFilters((prev) => ({
//     ...prev,
//     categories: [category],
//   }));
// }, [searchParams]);

  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: reset ? 1 : page,
        limit: 50,
        sort: selectedSort,
        categories: filters.categories.join(","),
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        size: filters.size.join(","),
      });
      const res = await fetch(`/api/products?${query}`);
      const data = await res.json();
      if (reset) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }
      setHasMore(page < data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`/api/category/fetch`);
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchProducts(true);
    fetchCategories();
  }, [filters, selectedSort]);

  const handleCategoryClick = (categoryId) => {
    const newCat = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newCat);
    setFilters((prev) => ({
      ...prev,
      categories: newCat ? [newCat] : [],
    }));
  };

  return (
    <>
      <Navbar />

      {/* Full-width layout below navbar */}
      <div className="h-screen bg-white pt-15 flex overflow-hidden">
        {/* ── LEFT SIDEBAR ─────────────────────────── */}
        <aside className="hidden lg:block w-75 shrink-0 px-6 pt-8 border-r border-[#e8e8e8] h-full overflow-hidden">
          {/* THE ARCHIVE heading */}
          <div className="mb-6">
            <p
              className="text-[1rem] tracking-[0.18em] font-semibold text-black mb-1 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              THE COLLECTION
            </p>
            {/* Breadcrumb-style subtitle */}
            <p
              className="text-[0.88rem] text-[#999] font-light tracking-wide"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Discover I · 2026
            </p>
            <p
              className="text-[0.88rem] text-[#999] font-light tracking-wide mt-0.5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {products.length} Pieces
            </p>
          </div>

          <div className="w-full h-px bg-[#e8e8e8] mb-6" />

          {/* CATEGORY */}
          <div className="mb-8">
            <p
              className="text-[0.95rem] tracking-[0.18em] font-semibold text-[#999] uppercase mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              CATEGORY
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`text-[0.85rem] font-light tracking-wide transition-colors ${
                    !selectedCategory
                      ? "text-black font-semibold underline underline-offset-2"
                      : "text-[#555] hover:text-black"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  All Pieces
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <button
                    onClick={() => handleCategoryClick(cat.slug)}
                    className={`text-[0.85rem] font-light tracking-wide transition-colors text-left ${
                      selectedCategory === cat.slug
                        ? "text-black font-semibold underline underline-offset-2"
                        : "text-[#555] hover:text-black"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full h-px bg-[#e8e8e8] mb-6" />

          {/* AVAILABILITY */}
          <div className="mb-8">
            <p
              className="text-[0.95rem] tracking-[0.18em] font-semibold text-[#999] uppercase mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              AVAILABILITY
            </p>
            <div className="space-y-2">
              {["Available", "Sold Out"].map((label) => {
                const key = label.toLowerCase().replace(" ", "");
                return (
                  <label
                    key={label}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="accent-black w-3 h-3"
                      checked={availability[key] || false}
                      onChange={() =>
                        setAvailability((prev) => ({
                          ...prev,
                          [key]: !prev[key],
                        }))
                      }
                    />
                    <span
                      className="text-[0.75rem] font-light text-[#555] tracking-wide"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="w-full h-px bg-[#e8e8e8] mb-6" />

          {/* SORT BY */}
          <div className="mb-8">
            <p
              className="text-[0.95rem] tracking-[0.18em] font-semibold text-[#999] uppercase mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              SORT BY
            </p>
            <ul className="space-y-2">
              {sortOptions.map((option) => (
                <li key={option}>
                  <button
                    onClick={() => setSelectedSort(option)}
                    className={`text-[0.85rem] font-light tracking-wide transition-colors text-left ${
                      selectedSort === option
                        ? "text-black font-semibold"
                        : "text-[#555] hover:text-black"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── MAIN CONTENT ──────────────────────────── */}
        <main className="flex-1 min-w-0 overflow-y-auto no-scrollbar">
          {/* Breadcrumb (visible on large screens, matching wireframe) */}
          <div className="hidden lg:flex items-center gap-2 px-6 pt-6 pb-4">
            <span
              className="text-[0.7rem] text-[#888] tracking-wide font-light cursor-pointer hover:text-black transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
              onClick={() => router.push("/products")}
            >
              Explore
            </span>
            <span className="text-[0.7rem] text-[#bbb]">/</span>
            <span
              className="text-[0.7rem] text-[#555] tracking-wide font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Collection I · 2026
            </span>
          </div>

          {/* Mobile: simple header */}
          <div className="lg:hidden px-4 pt-6 pb-3">
            <h1
              className="text-xl font-light tracking-widest text-black"
              style={{
                fontFamily: "var(--font-heading, 'The Seasons', serif)",
              }}
            >
              THE COLLECTION
            </h1>
          </div>

          {/* 2-column product grid — edge-to-edge, no outer padding on sides */}
          {loading && products.length === 0 ? (
            <div className="grid grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#f0eeec] animate-pulse"
                  style={{ aspectRatio: "3/4" }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={() => router.push(`/products/${product.slug}`)}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center py-12">
              <button
                onClick={() => {
                  setPage((prev) => prev + 1);
                  fetchProducts();
                }}
                disabled={loading}
                className="px-10 py-3 text-[0.65rem] font-light tracking-[0.2em] border border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer disabled:opacity-50"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {loading ? "LOADING..." : "LOAD MORE"}
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}
