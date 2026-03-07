'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, User, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false); 

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white py-4 px-6 z-99">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <div className="shrink-0">
          <Link href="/" className="text-3xl font-serif tracking-wider hover:opacity-80 transition-opacity">
            ISABELLA
<<<<<<< HEAD
          </Link>
=======
          </Link> 
>>>>>>> origin/iKRA
        </div>

        {/* Middle - Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
<<<<<<< HEAD
          <Link href="/Shopping" className="text-sm uppercase tracking-wide hover:text-gray-300 transition-colors">
            Shop
          </Link>
          <Link href="/Shopping" className="text-sm uppercase tracking-wide hover:text-gray-300 transition-colors">
            New In
          </Link>
          <Link href="/Shopping" className="text-sm uppercase tracking-wide hover:text-gray-300 transition-colors">
            Collections
=======
          <Link href="/products" className="text-sm uppercase tracking-wide hover:text-gray-300 transition-colors">
            Shop
          </Link>
          <Link href="/products/type/new-arrivals" className="text-sm uppercase tracking-wide hover:text-gray-300 transition-colors">
            New In
          </Link>
          <Link href="/products/type/sale" className="text-sm uppercase tracking-wide hover:text-gray-300 transition-colors">
            Sale
>>>>>>> origin/iKRA
          </Link>
        </nav>

        {/* Right - Actions */}
        <div className="flex items-center space-x-6">
          {/* Cart */}
          <Link href="/Cart" className="relative hover:text-gray-300 transition-colors">
            <ShoppingCart size={22} />
            {/* <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              0
            </span> */}
          </Link>

          {/* Wishlist */}
          <Link href="/Wishlist" className="relative hover:text-gray-300 transition-colors">
            <Heart size={22} />
            {/* <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              0
            </span> */}
          </Link>

          {/* Profile Dropdown */}
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
                    onClick={() => {
                      setIsProfileOpen(false);
                      // Add your logout logic here
                      console.log('Logout clicked');
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-gray-800">
<<<<<<< HEAD
        <Link href="/Shopping" className="text-xs uppercase tracking-wide hover:text-gray-300 transition-colors">
          Shop
        </Link>
        <Link href="/Shopping" className="text-xs uppercase tracking-wide hover:text-gray-300 transition-colors">
          New In
        </Link>
        <Link href="/Shopping" className="text-xs uppercase tracking-wide hover:text-gray-300 transition-colors">
=======
        <Link href="/products" className="text-xs uppercase tracking-wide hover:text-gray-300 transition-colors">
          Shop
        </Link>
        <Link href="/products" className="text-xs uppercase tracking-wide hover:text-gray-300 transition-colors">
          New In
        </Link>
        <Link href="/products" className="text-xs uppercase tracking-wide hover:text-gray-300 transition-colors">
>>>>>>> origin/iKRA
          Collections
        </Link>
      </nav>
    </header>
  );
}