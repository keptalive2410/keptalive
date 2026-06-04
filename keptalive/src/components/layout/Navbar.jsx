"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        setIsLoggedIn(res.ok);
        if (res.ok) fetchCounts();
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [fetchCounts]);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
      router.push("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="fixed top-0 z-99 w-full bg-white border-b border-[#BFC3C7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-3 items-center h-16">

          {/* Left Nav */}
          <nav className="flex items-center gap-8">
            <Link
              href="/products"
              className="font-nexa font-light text-[11px] uppercase tracking-[0.18em] text-[#000000] hover:text-[#8A8A8A] transition-colors duration-200"
            >
              Explore
            </Link>
            <Link
              href="/Collections"
              className="font-nexa font-light text-[11px] uppercase tracking-[0.18em] text-[#000000] hover:text-[#8A8A8A] transition-colors duration-200"
            >
              Collection
            </Link>
            <Link
              href="/Label"
              className="font-nexa font-light text-[11px] uppercase tracking-[0.18em] text-[#000000] hover:text-[#8A8A8A] transition-colors duration-200"
            >
              The Label
            </Link>
            <Link
              href="/About"
              className="font-nexa font-light text-[11px] uppercase tracking-[0.18em] text-[#000000] hover:text-[#8A8A8A] transition-colors duration-200"
            >
              About
            </Link>
          </nav>

          {/* Center Logo */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="font-seasons text-[26px] tracking-[0.02em] text-[#000000] hover:opacity-75 transition-opacity duration-200 leading-none"
            >
              kep&#771;talive
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center justify-end gap-5">
            {/* Profile / Auth */}
            {!loading && (
              isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    aria-label="Account"
                    className="flex items-center gap-0.5 text-[#000000] hover:text-[#8A8A8A] transition-colors duration-200"
                  >
                    <User size={18} strokeWidth={1.5} />
                    <ChevronDown
                      size={12}
                      strokeWidth={1.5}
                      className={`transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isProfileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-3 w-44 bg-white border border-[#BFC3C7] z-20 overflow-hidden">
                        <Link
                          href="/Profile"
                          className="block px-5 py-3 font-nexa font-light text-[11px] uppercase tracking-[0.15em] text-[#000000] hover:bg-[#F5F5F5] transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/Orders"
                          className="block px-5 py-3 font-nexa font-light text-[11px] uppercase tracking-[0.15em] text-[#000000] hover:bg-[#F5F5F5] transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Order History
                        </Link>
                        <button
                          className="w-full text-left px-5 py-3 font-nexa font-light text-[11px] uppercase tracking-[0.15em] text-[#000000] hover:bg-[#F5F5F5] transition-colors border-t border-[#BFC3C7]"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/Login"
                  aria-label="Account"
                  className="text-[#000000] hover:text-[#8A8A8A] transition-colors duration-200"
                >
                  <User size={18} strokeWidth={1.5} />
                </Link>
              )
            )}

            {/* Cart */}
            <Link
              href="/Cart"
              aria-label="Cart"
              className="relative text-[#000000] hover:text-[#8A8A8A] transition-colors duration-200"
            >
              <ShoppingCart size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#000000] text-white text-[9px] font-nexa font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between h-14">
          {/* Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
            className="flex flex-col gap-[5px] text-[#000000]"
          >
            <span
              className={`block w-5 h-px bg-current transition-all duration-200 ${isMobileMenuOpen ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-current transition-all duration-200 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-current transition-all duration-200 ${isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-seasons text-[22px] tracking-[0.02em] text-[#000000] leading-none"
          >
            kep&#771;talive
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button aria-label="Search" className="text-[#000000]">
              <Search size={17} strokeWidth={1.5} />
            </button>
            <Link href="/Cart" aria-label="Cart" className="relative text-[#000000]">
              <ShoppingCart size={17} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#000000] text-white text-[9px] font-nexa font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t border-[#BFC3C7] py-6 flex flex-col gap-5">
            {[
              { href: "/products", label: "Explore" },
              { href: "/Collections", label: "Collection" },
              { href: "/the-label", label: "The Label" },
              { href: "/about", label: "About" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-nexa font-light text-[11px] uppercase tracking-[0.2em] text-[#000000] hover:text-[#8A8A8A] transition-colors"
              >
                {label}
              </Link>
            ))}

            <div className="border-t border-[#BFC3C7] pt-5 flex flex-col gap-4">
              {!loading && (
                isLoggedIn ? (
                  <>
                    <Link
                      href="/Profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-nexa font-light text-[11px] uppercase tracking-[0.2em] text-[#000000]"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/Orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-nexa font-light text-[11px] uppercase tracking-[0.2em] text-[#000000]"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left font-nexa font-light text-[11px] uppercase tracking-[0.2em] text-[#000000]"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/Login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-nexa font-light text-[11px] uppercase tracking-[0.2em] text-[#000000]"
                    >
                      Login
                    </Link>
                    <Link
                      href="/Signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-nexa font-light text-[11px] uppercase tracking-[0.2em] text-[#000000]"
                    >
                      Sign Up
                    </Link>
                  </>
                )
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
