"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, User, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    cartCount,
    wishlistCount,
    fetchCounts,
    setCartCount,
    setWishlistCount,
  } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        setIsLoggedIn(res.ok);

        if (res.ok) {
          fetchCounts();
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [fetchCounts]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    setIsProfileOpen(false);

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
      setCartCount(0);
      setWishlistCount(0);
      router.push("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full text-white py-4 px-6 z-50 transition-all duration-300 ${
        isHomePage
          ? isScrolled
            ? "bg-black shadow-md"
            : "bg-transparent"
          : "bg-black shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <div className="shrink-0">
          <Link
            href="/"
            className="text-3xl font-serif tracking-wider hover:opacity-80 transition-opacity"
          >
            kep̃talive
          </Link>
        </div>

        {/* Middle - Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/products"
            className="text-sm uppercase tracking-wide hover:text-gray-300 transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/products/type/new-arrivals"
            className="text-sm uppercase tracking-wide hover:text-gray-300 transition-colors"
          >
            New In
          </Link>
          <Link
            href="/products/type/sale"
            className="text-sm uppercase tracking-wide hover:text-gray-300 transition-colors"
          >
            Sale
          </Link>
        </nav>

        {/* Right - Actions */}
        <div className="flex items-center space-x-6">
          {/* Cart */}
          <Link
            href="/Cart"
            className="relative hover:text-gray-300 transition-colors"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold px-1.5 py-[1px] rounded-full min-w-[16px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link
            href="/Wishlist"
            className="relative hover:text-gray-300 transition-colors"
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold px-1.5 py-[1px] rounded-full min-w-[16px] flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Profile / Auth */}
          {!loading &&
            (isLoggedIn ? (
              /* Logged-in dropdown */
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
                >
                  <User size={22} />
                  <ChevronDown size={16} />
                </button>

                {isProfileOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsProfileOpen(false)}
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20 overflow-hidden">
                      <Link
                        href="/Profile"
                        className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/Orders"
                        className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Order History
                      </Link>
                      <button
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors border-t border-gray-200"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Logged-out: Login / Signup links */
              <div className="flex items-center space-x-4">
                <Link
                  href="/Login"
                  className="text-sm uppercase tracking-wide hover:text-gray-300 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/Signup"
                  className="text-sm uppercase tracking-wide bg-white text-black px-4 py-1.5 rounded hover:bg-gray-200 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-gray-800">
        <Link
          href="/products"
          className="text-xs uppercase tracking-wide hover:text-gray-300 transition-colors"
        >
          Shop
        </Link>
        <Link
          href="/products/type/new-arrivals"
          className="text-xs uppercase tracking-wide hover:text-gray-300 transition-colors"
        >
          New In
        </Link>
        <Link
          href="/products/type/sale"
          className="text-xs uppercase tracking-wide hover:text-gray-300 transition-colors"
        >
          Sale
        </Link>
      </nav>
    </header>
  );
}
