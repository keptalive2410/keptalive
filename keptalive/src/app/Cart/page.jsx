"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X, Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
export default function CartPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const { decrementCart, incrementWishlist } = useCart();

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "GET",
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        setCartItems(data.cart);
        setCartTotal(data.cartTotal);
        setCheckoutUrl(data.checkoutUrl);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productID, size) => {
    try {
      const res = await fetch("/api/cart/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID,
          productSize: size,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Product removed from cart");
        fetchCart();
        decrementCart();
      } else {
        toast.error("Product removal failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const updateQuantity = async (productID, size, action) => {
    try {
      const res = await fetch("/api/cart/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID,
          productSize: size,
          action,
        }),
      });

      const data = await res.json();

      if (data.success) {
        fetchCart();
      } else {
        toast.error(data.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const moveToWishlist = async (productID, size) => {
    try {
      const wishlistRes = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productID }),
      });

      const wishlistData = await wishlistRes.json();

      if (!wishlistData.success) {
        toast.error("Failed to move to wishlist");
        return;
      }

      const cartRes = await fetch("/api/cart/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID,
          productSize: size,
        }),
      });

      const cartData = await cartRes.json();

      if (cartData.success) {
        toast.success("Moved to wishlist");
        fetchCart();
        incrementWishlist();
        decrementCart();
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );

  const discount = totalMRP - totalPrice;
  const platformFee = 0;
  const finalAmount = totalPrice + platformFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    if (checkoutUrl) {
      // Redirect to Shopify generated Checkout URL
      window.location.href = checkoutUrl;
    } else {
      toast.error("Checkout is currently unavailable");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── LEFT: Cart Items ── */}
            <div className="lg:col-span-2 space-y-4">
              {/* Items Selection Header */}
              <div className="bg-white border border-[#BFC3C7] p-4">
                <h1 className="text-black text-2xl text-center">
                  Your Products
                </h1>

                {/* Cart Items */}
                <div className="space-y-6">
                  {cartItems?.map((item) => (
                    <div
                      key={item.productID + item.size}
                      className="border-t border-[#BFC3C7] pt-5"
                    >
                      <div className="flex gap-4 items-start">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-24 h-32 object-cover rounded-xl bg-[#f4f4f4] shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                              <p className="text-[0.78rem] font-light text-[#2B2B2B] tracking-wide">
                                {item.productName}
                              </p>
                              <div className="flex gap-3 mt-2">
                                <div className="border border-[#BFC3C7] px-3 py-1.5 text-[0.75rem] font-light text-black bg-white focus:outline-none focus:border-black transition">
                                  <span>Size: {item.size}</span>
                                </div>
                                <div className="flex items-center border border-[#BFC3C7] text-black">
                                  <button
                                    onClick={() => updateQuantity(item.productID, item.size, "dec")}
                                    className="px-3 py-1 text-sm hover:bg-gray-100"
                                  >
                                    −
                                  </button>

                                  <span className="px-3 text-[0.8rem]">
                                    {item.quantity}
                                  </span>

                                  <button
                                    onClick={() => updateQuantity(item.productID, item.size, "inc")}
                                    className="px-3 py-1 text-sm hover:bg-gray-100"
                                  >
                                    +
                                  </button>
                                </div>
                                {item.badge && (
                                  <span className="bg-black text-white px-2 py-1 text-[0.65rem] font-bold tracking-widest">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="mt-3 flex items-center gap-2">
                                <span className="text-[0.88rem] font-bold text-black">
                                  ₹{item.price.toLocaleString()}
                                </span>
                                <span className="text-[0.75rem] font-light text-[#8A8A8A] line-through">
                                  ₹{item.originalPrice?.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-[0.72rem] font-light text-[#8A8A8A] mt-1 tracking-wide">
                                ✓ 7 days return available
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                title="Move to wishlist"
                                onClick={() =>
                                  moveToWishlist(item.productID, item.size)
                                }
                                className="text-[#BFC3C7] hover:text-black transition"
                              >
                                <Heart className="w-6 h-6" />
                              </button>

                              <button
                                title="Remove from cart"
                                onClick={() =>
                                  removeItem(item.productID, item.size)
                                }
                                className="text-[#BFC3C7] hover:text-black transition"
                              >
                                <X className="w-6 h-6" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Summary ── */}
            <div className="space-y-4">
              {/* Price Details */}
              <div className="bg-white border border-[#BFC3C7] p-5">
                <h3 className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-5">
                  PRICE DETAILS ({cartItems.length} ITEMS)
                </h3>
                <div className="space-y-3 text-[0.78rem]">
                  <div className="flex justify-between">
                    <span className="font-light text-[#2B2B2B] tracking-wide">
                      Total
                    </span>
                    <span className="font-light text-[#2B2B2B]">
                      ₹{totalMRP.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-light text-[#2B2B2B] tracking-wide">
                      Discount
                    </span>
                    <span className="font-bold text-black">
                      − ₹{discount.toLocaleString()}
                    </span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="font-light text-[#2B2B2B] tracking-wide">
                      Coupon Discount
                    </span>
                    <button className="font-bold text-black underline underline-offset-2 hover:no-underline transition">
                      Apply Coupon
                    </button>
                  </div> */}
                  <div className="flex justify-between">
                    <span className="font-light text-[#2B2B2B] tracking-wide">
                      Platform Fee
                    </span>
                    <span className="font-light text-[#2B2B2B]">
                      ₹{platformFee}
                    </span>
                  </div>
                  <div className="border-t border-[#BFC3C7] pt-4 flex justify-between">
                    <span className="font-bold text-black tracking-wide text-[0.82rem]">
                      Total Amount
                    </span>
                    <span className="font-bold text-black text-[0.82rem]">
                      ₹{finalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-4 text-[0.75rem] font-bold tracking-[0.18em] uppercase hover:bg-[#2B2B2B] transition mt-6"
                >
                  PLACE ORDER
                </button>
                <p className="text-[0.7rem] font-light text-[#8A8A8A] mt-3 tracking-wide leading-relaxed">
                  By placing the order, you agree to our{" "}
                  <a
                    href="#"
                    className="text-black underline underline-offset-2 hover:no-underline"
                  >
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-black underline underline-offset-2 hover:no-underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
