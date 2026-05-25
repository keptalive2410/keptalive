"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

// ─── Size & Fit Drawer ────────────────────────────────────────────────────────
function SizeFitDrawer({ onClose }) {
  const sizeRows = [
    ["XS", "80–84", "64–68", "88–92"],
    ["S", "84–88", "68–72", "92–96"],
    ["M", "88–92", "72–76", "96–100"],
    ["L", "92–96", "76–80", "100–104"],
    ["XL", "96–100", "80–84", "104–108"],
  ];
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div className="w-full max-w-[420px] bg-white h-full overflow-y-auto flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5]">
          <span className="font-nexa text-[0.65rem] uppercase tracking-[0.2em] text-black">
            Size &amp; Fit Guide
          </span>
          <button onClick={onClose} className="p-1 hover:opacity-50 transition">
            <X className="w-4 h-4 text-black" />
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-7">
          {/* How to measure */}
          <div>
            <p className="font-nexa text-[0.6rem] uppercase tracking-[0.18em] text-black mb-2">
              How to Measure
            </p>
            <p className="font-nexa font-light text-[0.7rem] text-black leading-relaxed">
              Measure your chest at the fullest point. Measure your waist at the
              narrowest point. Measure your hips at the fullest point.
            </p>
          </div>

          {/* Size Chart */}
          <div>
            <p className="font-nexa text-[0.6rem] uppercase tracking-[0.18em] text-black mb-3">
              Size Chart
            </p>
            <table className="w-full font-nexa border-collapse text-[0.7rem]">
              <thead>
                <tr className="bg-black text-white">
                  {["Size", "Chest", "Waist", "Hips"].map((h) => (
                    <th
                      key={h}
                      className="py-2.5 px-3 text-left font-light tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeRows.map(([size, chest, waist, hips], i) => (
                  <tr
                    key={size}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#F2F2F0]"}
                  >
                    <td className="py-2.5 px-3 text-black">{size}</td>
                    <td className="py-2.5 px-3 text-black font-light">
                      {chest}
                    </td>
                    <td className="py-2.5 px-3 text-black font-light">
                      {waist}
                    </td>
                    <td className="py-2.5 px-3 text-black font-light">
                      {hips}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Model note */}
          <div className="bg-[#F2F2F0] px-4 py-3">
            <p className="font-nexa text-[0.7rem] text-black">
              This piece has a relaxed, oversized fit.
            </p>
          </div>

          {/* Fit Notes */}
          <div>
            <p className="font-nexa text-[0.6rem] uppercase tracking-[0.18em] text-black mb-3">
              Fit Notes
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                "Relaxed, slightly oversized silhouette",
                "True to size, size down if between sizes",
                "Length hits mid-thigh on a 5'9\" frame",
              ].map((note, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 bg-black flex-shrink-0 mt-[2px]" />
                  <span className="font-nexa font-light text-[0.7rem] text-black">
                    {note}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Still unsure */}
          <div>
            <p className="font-nexa text-[0.7rem] text-black mb-1">
              Still unsure?
            </p>
            <p className="font-nexa font-light text-[0.7rem] text-black mb-5">
              Contact us and we'll help you find the right size.
            </p>
            <a
              href="mailto:hello@keptalive.com"
              className="inline-block border border-black px-5 py-2.5 font-nexa text-[0.65rem] tracking-[0.18em] uppercase text-black hover:bg-black hover:text-white transition"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────
function Accordion({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[#E5E5E5]">
      <button
        className="w-full flex items-center justify-between py-[14px] text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-nexa text-[0.65rem] uppercase tracking-[0.18em] text-black">
          {label}
        </span>
        <span className="font-nexa text-base text-black leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

// ─── Details & Care Content ───────────────────────────────────────────────────
function DetailsCareContent({ product }) {
  const details = product?.productDetails || {
    Fabric: "100% Cotton · Lightweight woven",
    Print: "Botanical · Hand-painted · Gold zari embellishment",
    Fit: "Relaxed, slightly oversized",
    Length: "Hip length · Slightly longer at back",
    Sleeves: "3/4 length · Flutter hem",
    Closure: "Pull over · No fastenings",
    Lining: "Unlined",
  };
  const care = product?.productCare || [
    "Hand wash cold · Mild detergent only",
    "Do not tumble dry · Lay flat to dry",
    "Iron on low heat inside out",
    "Do not bleach",
    "Dry clean recommended for embellished areas",
  ];

  return (
    <div className="border border-[#E5E5E5] bg-[#F9F9F8]">
      <div className="px-4 pt-4 pb-2">
        <p className="font-nexa text-[0.6rem] uppercase tracking-[0.18em] text-black">
          Details
        </p>
      </div>

      <table className="w-full font-nexa text-[0.7rem] border-collapse">
        <tbody>
          {Object.entries(details).map(([key, val], i) => (
            <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-[#F2F2F0]"}>
              <td className="py-2.5 px-4 text-[#8A8A8A] font-light w-28 capitalize">
                {key}
              </td>
              <td className="py-2.5 px-4 text-black font-light">{val}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-4 pt-5 pb-2">
        <p className="font-nexa text-[0.6rem] uppercase tracking-[0.18em] text-black">
          Care
        </p>
      </div>
      <div className="px-4 pb-4 flex flex-col gap-2">
        {care.map((c, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="w-2.5 h-2.5 bg-black flex-shrink-0 mt-[3px]" />
            <span className="font-nexa font-light text-[0.7rem] text-black">
              {c}
            </span>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <p className="font-nexa font-light text-[0.65rem] text-[#8A8A8A]">
          Country of origin: India
        </p>
      </div>
    </div>
  );
}

// ─── Shipping & Returns Content ───────────────────────────────────────────────
function ShippingReturnsContent() {
  const shippingRows = [
    ["Standard delivery", "5–7 business days · ₹ 299"],
    ["Express delivery", "2–3 business days · ₹ 599"],
    ["International", "7–14 business days · Calculated at checkout"],
    ["Free shipping", "On all orders over ₹ 5,000"],
  ];
  return (
    <div className="border border-[#E5E5E5] bg-[#F9F9F8]">
      <div className="px-4 pt-4 pb-2">
        <p className="font-nexa text-[0.6rem] uppercase tracking-[0.18em] text-black">
          Shipping
        </p>
      </div>

      <table className="w-full font-nexa text-[0.7rem] border-collapse">
        <tbody>
          {shippingRows.map(([label, val], i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F2F2F0]"}>
              <td className="py-2.5 px-4 text-[#8A8A8A] font-light w-36">
                {label}
              </td>
              <td className="py-2.5 px-4 text-black font-light">{val}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mx-4 my-3 border border-[#E5E5E5] bg-white px-3 py-2.5">
        <p className="font-nexa text-[0.7rem] text-black">
          Orders dispatched within 2–3 business days.
        </p>
        <p className="font-nexa font-light text-[0.7rem] text-[#8A8A8A]">
          Tracking number sent once shipped.
        </p>
      </div>

      <div className="px-4 pt-2 pb-1">
        <p className="font-nexa text-[0.6rem] uppercase tracking-[0.18em] text-black">
          Returns
        </p>
      </div>
      <div className="px-4 pb-2">
        <p className="font-nexa font-light text-[0.7rem] text-black mb-3">
          We do not accept returns for change of mind. Each piece is numbered
          and final.
        </p>
        <p className="font-nexa text-[0.7rem] text-black mb-2">
          We accept returns if:
        </p>
        <div className="flex flex-col gap-2">
          {[
            "Piece arrives damaged or defective",
            "Wrong piece sent",
            "Piece does not match description",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="w-2.5 h-2.5 bg-black flex-shrink-0 mt-[3px]" />
              <span className="font-nexa font-light text-[0.7rem] text-black">
                {item}
              </span>
            </div>
          ))}
        </div>
        <p className="font-nexa font-light text-[0.7rem] text-[#8A8A8A] mt-3">
          Contact us within 48 hours of delivery.
        </p>
      </div>

      <div className="px-4 pb-5 pt-2 border-t border-[#E5E5E5] mt-3">
        <a
          href="mailto:hello@keptalive.com"
          className="font-nexa text-[0.7rem] text-black border-b border-black pb-px"
        >
          hello@keptalive.com
        </a>
      </div>
    </div>
  );
}

// ─── Product Info Core ────────────────────────────────────────────────────────
function ProductInfoCore({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  colours,
  stockLeft,
  isLowStock,
  wishlist,
  toggleWishlist,
  addToCart,
  setShowSizeDrawer,
}) {
  const pieceNumber = product.pieceNumber || "001";
  const archiveLabel = product.archiveLabel || "Discover I · 2026";

  return (
    <div className="flex flex-col">
      {/* Available */}
      <div className="mb-4">
        <span className="inline-block border border-[#5C9E6A] text-[#5C9E6A] font-nexa text-[0.58rem] tracking-[0.2em] px-2.5 py-[3px] uppercase">
          Available
        </span>
      </div>

      {/* Name */}
      <h1 className="font-seasons text-[2rem] leading-tight text-black mb-1">
        {product.productName}
      </h1>

      {/* Archive label */}
      <p className="font-nexa font-light text-[0.65rem] text-[#8A8A8A] mb-5">
        {archiveLabel}
      </p>

      {/* Price */}
      <p className="font-seasons text-[1.9rem] text-black mb-5">
        ₹ {product.productSellingPrice?.toLocaleString()}
      </p>

      <div className="border-t border-[#E5E5E5] mb-5" />

      {/* Size */}
      {product.productSize?.length > 0 &&
        (() => {
          const sizeOrder = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

          const sortedSizes = [...product.productSize].sort(
            (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b),
          );

          return (
            <div className="mb-5">
              <p className="font-nexa text-[0.6rem] uppercase tracking-[0.18em] text-black mb-3">
                Size
              </p>

              <div className="flex gap-2 flex-wrap mb-2">
                {sortedSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 font-nexa text-xs border transition ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-[#CCCCCC] hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowSizeDrawer(true)}
                className="font-nexa font-light text-[0.65rem] text-[#8A8A8A] underline underline-offset-2 hover:text-black transition"
              >
                Size &amp; Fit Guide →
              </button>
            </div>
          );
        })()}

      {/* Colour */}
      {colours.length > 0 && (
        <div className="mb-5">
          <p className="font-nexa text-[0.6rem] uppercase tracking-[0.18em] text-black mb-1">
            Colour
          </p>
          <p className="font-nexa font-light text-[0.65rem] text-[#8A8A8A] mb-2">
            {typeof selectedColor === "string"
              ? selectedColor
              : selectedColor?.name || ""}
          </p>
          <div className="flex gap-2">
            {colours.map((col, i) => {
              const colName = typeof col === "string" ? col : col?.name;
              const colHex = typeof col === "string" ? null : col?.hex;
              const active =
                selectedColor === col || selectedColor?.name === colName;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedColor(col)}
                  title={colName}
                  className={`w-6 h-6 rounded-full border-2 transition ${active ? "border-black" : "border-[#CCCCCC] hover:border-[#8A8A8A]"}`}
                  style={{
                    backgroundColor:
                      colHex || colName?.toLowerCase() || "#ffffff",
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Low stock */}
      {isLowStock && (
        <div className="mb-4">
          <span className="inline-block font-nexa text-[0.65rem] text-black bg-[#F2F2F0] border border-[#E5E5E5] px-3 py-1.5">
            Only {stockLeft} pieces remaining
          </span>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-2 mb-6">
        <button
          onClick={addToCart}
          disabled={!selectedSize}
          className="w-full bg-black text-white font-nexa text-[0.65rem] tracking-[0.22em] uppercase py-[14px] hover:bg-[#1a1a1a] transition disabled:opacity-40"
        >
          Add to Cart
        </button>
        <button
          onClick={toggleWishlist}
          className={`w-full border font-nexa text-[0.65rem] tracking-[0.22em] uppercase py-[14px] transition ${
            wishlist
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-[#F5F5F3]"
          }`}
        >
          {wishlist ? "Wishlist" : "Wishlist"}
        </button>
      </div>

      {/* About */}
      <div className="border-t border-[#E5E5E5] pt-4 mb-0">
        <p className="font-nexa text-[0.6rem] uppercase tracking-[0.18em] text-black mb-2">
          About this piece
        </p>
        <p className="font-nexa font-light text-[0.7rem] text-black leading-relaxed">
          {product.productDescription}
        </p>
      </div>

      {/* Accordions */}
      <Accordion label="Details & Care">
        <DetailsCareContent product={product} />
      </Accordion>
      <Accordion label="Shipping & Returns">
        <ShippingReturnsContent />
      </Accordion>

      {/* Certificate card */}
      <div className="border border-[#E5E5E5] bg-[#F9F9F8] px-4 py-4 mt-4">
        <p className="font-nexa text-[0.7rem] text-black mb-1">
          This piece is numbered and comes with a certificate of authenticity.
        </p>
        <p className="font-nexa font-light text-[0.7rem] text-black">
          Piece #{String(pieceNumber).padStart(3, "0")} of {archiveLabel}.
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [wishlist, setWishlist] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showSizeDrawer, setShowSizeDrawer] = useState(false);

  const { slug } = useParams();
  const router = useRouter();
  const { incrementCart, incrementWishlist, decrementWishlist } = useCart();

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();

        if (!res.ok) {
          router.push("/products");
          return;
        }

        setProduct(data.product);

        if (data.product?.productSize?.length) {
          setSelectedSize(data.product.productSize[0]);
        }
        if (data.product?.productColour?.length) {
          setSelectedColor(data.product.productColour[0]);
        }

        const wRes = await fetch("/api/wishlist/fetch", { method: "POST" });
        const wData = await wRes.json();
        if (wData.success)
          setWishlist(wData.wishlist.some((p) => p._id === data.product._id));

        const rRes = await fetch(`/api/products/${slug}/related`);
        const rData = await rRes.json();
        setRelatedProducts(rData.relatedProducts || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="font-nexa text-[#8A8A8A] text-[0.65rem] tracking-[0.2em] uppercase">
          Loading...
        </p>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="font-nexa text-[#8A8A8A] text-[0.65rem] tracking-[0.2em] uppercase">
          Product not found
        </p>
      </div>
    );

  const toggleWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID: product._id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.action === "added") {
          setWishlist(true);
          toast.success("Added to wishlist");
          incrementWishlist();
        } else {
          setWishlist(false);
          toast.success("Removed from wishlist");
          decrementWishlist();
          toast.success("Removed from wishlist");
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong.");
    }
  };

  const addToCart = async () => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productID: product._id,
          productSize: selectedSize,
          productQuantity: 1,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Added to Cart");
        incrementCart();
      } else toast.error(data.message || "Failed to add.");
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong.");
    }
  };

  const allImages = product.productImages || [];
  const totalSlides = allImages.length;
  const prevSlide = () =>
    setActiveSlide((p) => (p === 0 ? totalSlides - 1 : p - 1));
  const nextSlide = () =>
    setActiveSlide((p) => (p === totalSlides - 1 ? 0 : p + 1));

  const stockLeft =
    product.productStock?.get?.(selectedSize) ??
    product.productStock?.[selectedSize];
  const isLowStock = stockLeft != null && stockLeft <= 5;
  const colours = product.productColour || [];

  const infoProps = {
    product,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    colours,
    stockLeft,
    isLowStock,
    wishlist,
    toggleWishlist,
    addToCart,
    setShowSizeDrawer,
  };

  return (
    <>
      <Navbar />
      {showSizeDrawer && (
        <SizeFitDrawer onClose={() => setShowSizeDrawer(false)} />
      )}

      <div className="bg-white min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b border-[#E5E5E5] px-5 md:px-8 py-3">
          <p className="font-nexa text-[0.65rem] text-[#8A8A8A]">
            <button
              onClick={() => router.push("/archive")}
              className="hover:text-black transition"
            >
              Collection
            </button>
            <span className="mx-1.5">/</span>
            <span className="text-black">{product.productName}</span>
          </p>
        </div>

        {/* ── MOBILE ─────────────────────────────────────────────────── */}
        <div className="lg:hidden">
          {/* Carousel */}
          <div
            className="relative w-full overflow-hidden bg-[#F2F2F0]"
            style={{ aspectRatio: "4/4" }}
          >
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {allImages.map((img, i) => (
                <div key={i} className="min-w-full h-full shrink-0">
                  <img
                    src={img.url}
                    alt={`${product.productName} ${i + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 z-10"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 z-10"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails below — 1px gap */}
          {allImages.length > 1 && (
            <div className="flex gap-[1px] bg-[#E5E5E5]">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  style={{ aspectRatio: "3/4" }}
                  className={`flex-1 overflow-hidden transition ${i === activeSlide ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="px-5 pt-7 pb-10">
            <ProductInfoCore {...infoProps} />
          </div>
        </div>

        {/* ── DESKTOP ────────────────────────────────────────────────── */}
        <div className="hidden lg:flex items-start max-w-[1440px] mx-auto">
          {/* LEFT — sticky, image + thumbnail strip below */}
          <div className="w-[50%] sticky top-0 self-start">
            <div
              className="w-full overflow-hidden bg-[#F2F2F0]"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={allImages[activeSlide]?.url}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails — 1px gap, below main image */}
            {allImages.length > 1 && (
              <div className="flex gap-[1px] bg-[#E5E5E5]">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    style={{ aspectRatio: "3/4" }}
                    className={`flex-1 overflow-hidden transition ${i === activeSlide ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — scrollable product info */}
          <div className="w-[50%] px-10 py-8 border-l border-[#E5E5E5] min-h-screen">
            <ProductInfoCore {...infoProps} />
          </div>
        </div>

        {/* ── YOU MAY ALSO LIKE ──────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-[#E5E5E5] px-5 md:px-8 pt-10 pb-16">
            <p className="font-nexa text-[0.6rem] uppercase tracking-[0.2em] text-black mb-0.5">
              You May Also Like
            </p>
            <p className="font-nexa font-light text-[0.65rem] text-[#8A8A8A] mb-7">
              From Collection I · {new Date().getFullYear()}
            </p>

            {/* 3 columns, 1px gap using bg trick */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#E5E5E5]">
              {relatedProducts
                .slice(0, window.innerWidth < 1024 ? 4 : 3)
                .map((item) => (
                  <div
                    key={item._id}
                    className="bg-white cursor-pointer group"
                    onClick={() => router.push(`/products/${item.slug}`)}
                  >
                    <div
                      className="w-full overflow-hidden bg-[#F2F2F0]"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <img
                        src={item.productImages?.[0]?.url}
                        alt={item.productName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="px-3 pt-3 pb-4">
                      <p className="font-seasons text-sm text-black mb-0.5 group-hover:underline underline-offset-2">
                        {item.productName}
                      </p>
                      <p className="font-nexa font-light text-[0.65rem] text-black">
                        ₹ {item.productSellingPrice?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}
