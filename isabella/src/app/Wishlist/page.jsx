'use client';

import { useState } from 'react';
import { X, Heart, ShoppingBag, Search, User } from 'lucide-react';
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Allen Solly Women Single Breasted Blazer',
      brand: 'Allen Solly',
      image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&h=650&fit=crop',
      price: 3349,
      originalPrice: 5582,
      discount: '40% OFF'
    },
    {
      id: 2,
      name: 'Vero Moda Shawl Collar Open-Front Blazer',
      brand: 'Vero Moda',
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=650&fit=crop',
      price: 2199,
      originalPrice: 3999,
      discount: '45% OFF'
    },
    {
      id: 3,
      name: 'FORTIFY CRAFT PU Shopper Shoulder Bag',
      brand: 'FORTIFY CRAFT',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=650&fit=crop',
      price: 359,
      originalPrice: 2199,
      discount: '84% OFF'
    },
    {
      id: 4,
      name: 'DressBerry Women Solid Formal Blazer',
      brand: 'DressBerry',
      image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&h=650&fit=crop',
      price: 1598,
      originalPrice: 3899,
      discount: '59% OFF'
    },
    {
      id: 5,
      name: 'DressBerry Women Solid Regular Fit Casual Blazer',
      brand: 'DressBerry',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=650&fit=crop',
      price: 1680,
      originalPrice: 4099,
      discount: '59% OFF'
    },
    {
      id: 6,
      name: 'Roadster Women Black Solid Biker',
      brand: 'Roadster',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=650&fit=crop',
      price: 1899,
      originalPrice: 4599,
      discount: '59% OFF'
    },
    {
      id: 7,
      name: 'Sassafras Women Pink Solid Blazer',
      brand: 'Sassafras',
      image: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=500&h=650&fit=crop',
      price: 2099,
      originalPrice: 3999,
      discount: '48% OFF'
    },
    {
      id: 8,
      name: 'StyleCast Women Black Solid',
      brand: 'StyleCast',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=650&fit=crop',
      price: 699,
      originalPrice: 2499,
      discount: '72% OFF'
    },
    {
      id: 9,
      name: 'MANGO Women White Solid Shirt',
      brand: 'MANGO',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=650&fit=crop',
      price: 1599,
      originalPrice: 2999,
      discount: '47% OFF'
    },
    {
      id: 10,
      name: 'Puma Women Black Training Shoes',
      brand: 'Puma',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=650&fit=crop',
      price: 2799,
      originalPrice: 5999,
      discount: '53% OFF'
    }
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const moveToCart = (id) => {
    // Logic to move item to cart
    console.log('Moving item to cart:', id);
    removeFromWishlist(id);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white pt-16">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
          My Wishlist <span className="font-normal text-gray-600">{wishlistItems.length} items</span>
        </h2>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlistItems.map(item => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative group">
              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 z-10"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              {/* Product Image */}
              <div className="relative aspect-3/4 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="p-3">
                <h3 className="font-semibold text-sm text-gray-900 mb-1 truncate">{item.brand}</h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.name}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="font-bold text-sm text-gray-900">Rs.{item.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 line-through">Rs.{item.originalPrice.toLocaleString()}</span>
                  <span className="text-xs text-orange-600 font-medium">({item.discount})</span>
                </div>

                {/* Move to Bag Button */}
                <button
                  onClick={() => moveToCart(item.id)}
                  className="w-full py-2 border border-pink-600 text-pink-600 rounded font-medium text-sm hover:bg-pink-50 transition-colors"
                >
                  MOVE TO BAG
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State - Show when no items */}
        {wishlistItems.length === 0 && (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Add items that you like to your wishlist. Review them anytime and easily move them to the bag.</p>
            <button className="px-6 py-3 bg-pink-600 text-white rounded font-semibold hover:bg-pink-700">
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </main>
    </div>
    <Footer/>
    </>
  );
}