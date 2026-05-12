"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setrelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);

  const { slug } = useParams();
  const router = useRouter();

  const {
    incrementCart,
    incrementWishlist,
    decrementWishlist,
  } = useCart();

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
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

        const wishlistRes = await fetch("/api/wishlist/fetch", {
          method: "POST",
        });

        const wishlistData = await wishlistRes.json();

        if (wishlistData.success) {
          setWishlist(
            wishlistData.wishlist.some(
              (p) => p._id === data.product._id
            )
          );
        }

        const relatedRes = await fetch(
          `/api/products/${slug}/related`
        );

        const relatedData = await relatedRes.json();

        setrelatedProducts(
          relatedData.relatedProducts || []
        );

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f1ed]">
        <p className="text-[11px] tracking-[0.18em] uppercase text-[#666]">
          Loading
        </p>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f1ed]">
        <p className="text-[11px] tracking-[0.18em] uppercase text-[#666]">
          Product Not Found
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
          incrementWishlist();
          toast.success("Added to wishlist");
        } else {
          setWishlist(false);
          decrementWishlist();
          toast.success("Removed from wishlist");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const addToCart = async () => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID: product._id,
          productSize: selectedSize,
          productQuantity: quantity,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Added to cart");
        incrementCart();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const discount =
    product.productOriginalPrice &&
    product.productSellingPrice
      ? Math.round(
          ((product.productOriginalPrice -
            product.productSellingPrice) /
            product.productOriginalPrice) *
            100
        )
      : null;

  return (
    <>
      <Navbar />

      <div className="bg-[#f3f1ed] md:mt-16 mt-28 min-h-screen">
        <main className="w-full">

          {/* MOBILE */}

          <div className="xl:hidden bg-white">

            <div className="aspect-[3/4] bg-[#f5f5f3] overflow-hidden">
              <img
                src={product.productImages?.[selectedImage]?.url}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-[1px] bg-[#d9d9d9]">
              {product.productImages?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className="bg-white aspect-[3/4] overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="px-5 py-6 flex flex-col gap-7 bg-white">

              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#777] mb-2">
                    Archive 2026
                  </p>

                  <h1
                    className="text-[32px] leading-[36px] tracking-[-0.03em] text-black"
                    style={{
                      fontFamily: "'The Seasons', serif",
                    }}
                  >
                    {product.productName}
                  </h1>
                </div>

                <button
                  onClick={toggleWishlist}
                  className="mt-2"
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 ${
                      wishlist
                        ? "fill-black text-black"
                        : "text-black"
                    }`}
                  />
                </button>
              </div>

              <div className="border-t border-b border-[#d9d9d9] py-5">

                <div className="flex items-center gap-3">
                  <span className="text-[28px] tracking-[-0.03em] text-black">
                    ₹
                    {product.productSellingPrice?.toLocaleString()}
                  </span>

                  {product.productOriginalPrice && (
                    <span className="text-[14px] text-[#888] line-through">
                      ₹
                      {product.productOriginalPrice?.toLocaleString()}
                    </span>
                  )}

                  {discount && (
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#777]">
                      {discount}% Off
                    </span>
                  )}
                </div>

                <p className="text-[10px] uppercase tracking-[0.15em] text-[#888] mt-2">
                  Inclusive of all taxes
                </p>
              </div>

              {product.productSize?.length > 0 && (
                <div>

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] uppercase tracking-[0.18em] text-[#777]">
                      Size
                    </h3>

                    <button className="text-[10px] uppercase tracking-[0.15em] text-[#888]">
                      Size Guide
                    </button>
                  </div>

                  <div className="flex gap-[1px] bg-[#d9d9d9]">
                    {product.productSize.map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setSelectedSize(size)
                        }
                        className={`w-[42px] h-[32px] text-[11px] transition-all ${
                          selectedSize === size
                            ? "bg-[#111] text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>

                <h3 className="text-[10px] uppercase tracking-[0.18em] text-[#777] mb-4">
                  Quantity
                </h3>

                <div className="flex gap-[1px] bg-[#d9d9d9] w-fit">

                  <button
                    onClick={() =>
                      setQuantity(
                        Math.max(1, quantity - 1)
                      )
                    }
                    className="w-[42px] h-[42px] bg-white"
                  >
                    −
                  </button>

                  <div className="w-[42px] h-[42px] bg-white flex items-center justify-center text-[12px]">
                    {quantity}
                  </div>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="w-[42px] h-[42px] bg-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-[1px] bg-[#d9d9d9]">

                <button
                  onClick={addToCart}
                  className="h-[44px] bg-black text-white text-[11px] uppercase tracking-[0.18em]"
                >
                  Add To Archive
                </button>

                <button
                  onClick={toggleWishlist}
                  className="h-[44px] bg-white text-[11px] uppercase tracking-[0.18em]"
                >
                  Save Piece
                </button>
              </div>

              <div className="border-t border-[#d9d9d9] pt-5">
                <h3 className="text-[10px] uppercase tracking-[0.18em] text-[#777] mb-4">
                  About The Piece
                </h3>

                <p className="text-[13px] leading-[24px] text-[#333] font-light">
                  {product.productDescription}
                </p>
              </div>
            </div>
          </div>

          {/* DESKTOP */}

          <div className="hidden xl:grid grid-cols-[1.35fr_0.7fr_1fr] gap-[1px] bg-[#d9d9d9]">

            {/* LEFT */}

            <div className="bg-white">

              <div className="aspect-[3/4] overflow-hidden bg-[#f5f5f3]">
                <img
                  src={
                    product.productImages?.[
                      selectedImage
                    ]?.url
                  }
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-[1px] mt-[1px] bg-[#d9d9d9]">

                {product.productImages
                  ?.slice(0, 4)
                  .map((image, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSelectedImage(index)
                      }
                      className="aspect-[3/4] overflow-hidden bg-white"
                    >
                      <img
                        src={image.url}
                        alt=""
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                      />
                    </button>
                  ))}
              </div>
            </div>

            {/* MIDDLE */}

            <div className="bg-white flex flex-col gap-[1px]">

              {product.productImages
                ?.slice(1, 5)
                .map((image, index) => (
                  <div
                    key={index}
                    className="aspect-[3/4] overflow-hidden bg-[#f5f5f3]"
                  >
                    <img
                      src={image.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>

            {/* RIGHT */}

            <div className="bg-white px-[42px] py-[32px] flex flex-col gap-8 min-h-screen">

              <div>

                <p className="text-[10px] uppercase tracking-[0.18em] text-[#777] mb-3">
                  Archive 2026
                </p>

                <h1
                  className="text-[38px] leading-[42px] font-normal tracking-[-0.03em] text-black"
                  style={{
                    fontFamily: "'The Seasons', serif",
                  }}
                >
                  {product.productName}
                </h1>
              </div>

              <div className="border-t border-b border-[#d9d9d9] py-6">

                <div className="flex items-center gap-3 flex-wrap">

                  <span className="text-[28px] tracking-[-0.03em] text-black">
                    ₹
                    {product.productSellingPrice?.toLocaleString()}
                  </span>

                  {product.productOriginalPrice && (
                    <span className="text-[14px] text-[#888] line-through">
                      ₹
                      {product.productOriginalPrice?.toLocaleString()}
                    </span>
                  )}

                  {discount && (
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#777]">
                      {discount}% Off
                    </span>
                  )}
                </div>

                <p className="text-[10px] uppercase tracking-[0.15em] text-[#888] mt-2">
                  Inclusive of all taxes
                </p>
              </div>

              {product.productSize?.length > 0 && (
                <div>

                  <div className="flex items-center justify-between mb-4">

                    <h3 className="text-[10px] uppercase tracking-[0.18em] text-[#777]">
                      Size
                    </h3>

                    <button className="text-[10px] uppercase tracking-[0.15em] text-[#888]">
                      Size Guide
                    </button>
                  </div>

                  <div className="flex gap-[1px] bg-[#d9d9d9] w-fit">

                    {product.productSize.map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setSelectedSize(size)
                        }
                        className={`w-[42px] h-[32px] text-[11px] transition-all ${
                          selectedSize === size
                            ? "bg-[#111] text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>

                <h3 className="text-[10px] uppercase tracking-[0.18em] text-[#777] mb-4">
                  Quantity
                </h3>

                <div className="flex gap-[1px] bg-[#d9d9d9] w-fit">

                  <button
                    onClick={() =>
                      setQuantity(
                        Math.max(1, quantity - 1)
                      )
                    }
                    className="w-[42px] h-[42px] bg-white"
                  >
                    −
                  </button>

                  <div className="w-[42px] h-[42px] bg-white flex items-center justify-center text-[12px]">
                    {quantity}
                  </div>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="w-[42px] h-[42px] bg-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-[1px] bg-[#d9d9d9]">

                <button
                  onClick={addToCart}
                  className="h-[44px] bg-black text-white text-[11px] tracking-[0.18em] uppercase"
                >
                  Add To Archive
                </button>

                <button
                  onClick={toggleWishlist}
                  className="h-[44px] bg-white text-[11px] tracking-[0.18em] uppercase"
                >
                  Save Piece
                </button>
              </div>

              <div className="border-t border-[#d9d9d9] pt-6">

                <h3 className="text-[10px] uppercase tracking-[0.18em] text-[#777] mb-4">
                  About The Piece
                </h3>

                <p className="text-[13px] leading-[24px] text-[#333] font-light">
                  {product.productDescription}
                </p>
              </div>

              <div className="border-t border-[#d9d9d9] pt-5 text-[10px] uppercase tracking-[0.15em] text-[#777]">
                This piece is numbered and comes with
                a certificate of authenticity.
              </div>
            </div>
          </div>

          {/* RELATED */}

          <section className="mt-[1px] bg-[#d9d9d9]">

            <div className="bg-white px-8 py-8 border-b border-[#d9d9d9]">

              <p className="text-[10px] uppercase tracking-[0.18em] text-[#777] mb-2">
                From Archive 2026
              </p>

              <h2
                className="text-[28px] tracking-[-0.03em]"
                style={{
                  fontFamily: "'The Seasons', serif",
                }}
              >
                You May Also Like
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px]">

              {relatedProducts.map((item) => (

                <div
                  key={item._id}
                  onClick={() =>
                    router.push(
                      `/products/${item.slug}`
                    )
                  }
                  className="bg-white cursor-pointer"
                >

                  <div className="aspect-[3/4] overflow-hidden bg-[#f5f5f3]">

                    <img
                      src={
                        item.productImages?.[0]?.url
                      }
                      alt={item.productName}
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  <div className="p-4">

                    <p className="text-[13px] leading-[20px] text-black mb-2">
                      {item.productName}
                    </p>

                    <div className="flex items-center gap-2">

                      <span className="text-[13px] text-black">
                        ₹
                        {item.productSellingPrice?.toLocaleString()}
                      </span>

                      {item.productOriginalPrice && (
                        <span className="text-[12px] text-[#888] line-through">
                          ₹
                          {item.productOriginalPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}