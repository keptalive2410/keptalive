'use client';

import { useState } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight, Truck, RefreshCw, Shield } from 'lucide-react';
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";

// Sample product data
const product = {
  id: 1,
  name: "Shawl Collar Open-Front Blazer",
  brand: "Vero Moda",
  rating: 4.3,
  reviews: 106,
  price: 2199,
  originalPrice: 3999,
  discount: 45,
  description: "Beige solid formal blazer, has a shawl collar, long sleeves, open front, two flap pockets, with polyester lining",
  images: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&h=1000&fit=crop",
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    { name: 'Beige', hex: '#E8DCC4' },
    { name: 'Navy', hex: '#1E3A5F' },
    { name: 'Black', hex: '#1A1A1A' },
    { name: 'Grey', hex: '#9CA3AF' }
  ],
  specifications: {
    closure: 'Front-Open',
    collar: 'Shawl Collar',
    fabric: 'Polyester',
    fit: 'Regular Fit',
    frontStyling: 'Open Front',
    length: 'Regular',
    liningFabric: 'Polyester',
    netQuantityUnit: 'Piece',
    occasions: 'Formal',
    pattern: 'Solid',
    sleeveLength: 'Long Sleeves',
    sustainable: 'Regular',
    vents: 'Single Vent',
    washCare: 'Machine Wash'
  },
  sizeAndFit: "The model of height (5'8\") is wearing a size S",
  materialAndCare: {
    composition: "77% Polyester, 17% Viscose, 6% Elastane",
    care: "Machine wash"
  },
  seller: "VERO MODA RETAIL PVT LTD"
};

const relatedProducts = [
  {
    id: 2,
    name: "Classic Navy Blazer",
    brand: "Isabella",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400&h=500&fit=crop",
    rating: 4.5
  },
  {
    id: 3,
    name: "Tailored Black Blazer",
    brand: "Isabella",
    price: 2799,
    originalPrice: 4999,
    discount: 44,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=500&fit=crop",
    rating: 4.4
  },
  {
    id: 4,
    name: "Casual Linen Blazer",
    brand: "Isabella",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    rating: 4.2
  },
  {
    id: 5,
    name: "Double Breasted Blazer",
    brand: "Isabella",
    price: 2999,
    originalPrice: 5499,
    discount: 45,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
    rating: 4.6
  }
];

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('Beige');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [pincode, setPincode] = useState('');

  return (
    <>
    <Navbar/>
    <div className="pt-12 min-h-screen bg-[#fafaf9]">
      {/* Main Product Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left - Images */}
          <div className="space-y-4">
            {/* Image Grid - 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className="relative aspect-3/4 bg-stone-100 rounded-sm overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {index === 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-sm">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="space-y-6">
            {/* Brand & Name */}
            <div>
              <p className="text-sm font-medium text-stone-500 tracking-widest uppercase mb-2">{product.brand}</p>
              <h1 className="text-3xl lg:text-4xl font-light text-stone-900 tracking-tight mb-3">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-stone-900 text-white px-2 py-1 rounded-sm">
                  <span className="text-sm font-medium">{product.rating}</span>
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span className="text-sm text-stone-500">| {product.reviews} Ratings</span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-stone-200 py-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-light text-stone-900">₹{product.price}</span>
                <span className="text-xl text-stone-400 line-through">₹{product.originalPrice}</span>
                <span className="text-lg font-medium text-red-500">({product.discount}% OFF)</span>
              </div>
              <p className="text-sm text-green-600 mt-2 font-medium">inclusive of all taxes</p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium tracking-widest uppercase text-stone-900">Select Size</h3>
                <button className="text-sm text-red-500 font-medium hover:underline">Size Chart →</button>
              </div>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-full border-2 transition-all font-medium ${
                      selectedSize === size
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-stone-300 text-stone-700 hover:border-stone-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium tracking-widest uppercase text-stone-900 mb-4">Select Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative group ${
                      selectedColor === color.name ? 'ring-2 ring-stone-900 ring-offset-2' : ''
                    }`}
                    title={color.name}
                  >
                    <div 
                      className="w-12 h-12 rounded-full border-2 border-stone-200 transition-all hover:border-stone-900"
                      style={{ backgroundColor: color.hex }}
                    />
                    {selectedColor === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full shadow-md"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-sm font-medium tracking-widest uppercase text-stone-900 mb-4">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border-2 border-stone-300 rounded-sm hover:border-stone-900 transition-all"
                >
                  <span className="text-xl font-light text-gray-600">−</span>
                </button>
                <span className="text-lg font-medium min-w-[3ch] text-center text-gray-600">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center border-2 border-stone-300 rounded-sm hover:border-stone-900 transition-all"
                >
                  <span className="text-xl font-light text-gray-600">+</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button className="flex-1 bg-red-500 text-white py-4 px-6 rounded-sm font-medium tracking-wide uppercase hover:bg-red-600 transition-colors shadow-md hover:shadow-lg">
                Add to Bag
              </button>
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`p-4 border-2 rounded-sm transition-all ${
                  wishlist ? 'border-red-500 bg-red-50' : 'border-stone-300 hover:border-stone-900'
                }`}
              >
                <Heart className={`w-6 h-6 ${wishlist ? 'fill-red-500 text-red-500' : 'text-stone-700'}`} />
              </button>
            </div>

            {/* Seller Info */}
            <div className="bg-stone-100 p-4 rounded-sm">
              <p className="text-sm text-stone-600">
                <span className="font-medium text-stone-900">Seller:</span> {product.seller}
              </p>
              <button className="text-sm text-red-500 font-medium mt-1 hover:underline">
                1 more seller available
              </button>
            </div>

            {/* Delivery Options */}
            <div className="border-t border-stone-200 pt-6">
              <h3 className="text-sm font-medium tracking-widest uppercase text-stone-900 mb-4">Delivery Options</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter pincode"
                  className="flex-1 px-4 py-3 border border-stone-300 rounded-sm focus:outline-none focus:border-stone-900"
                />
                <button className="px-6 py-3 bg-stone-900 text-white rounded-sm font-medium hover:bg-stone-800 transition-colors">
                  Check
                </button>
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Please enter PIN code to check delivery time & Pay on Delivery Availability
              </p>

              {/* Benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-600">100% Original Products</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Truck className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-600">Pay on delivery might be available</p>
                </div>
                <div className="flex items-start space-x-3">
                  <RefreshCw className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-600">Easy 14 days returns and exchanges</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-stone-200 pt-6">
              <h3 className="text-sm font-medium tracking-widest uppercase text-stone-900 mb-4">Product Details</h3>
              <p className="text-stone-600 leading-relaxed mb-6">{product.description}</p>

              {/* Size & Fit */}
              <div className="mb-6">
                <h4 className="font-medium text-stone-900 mb-2">Size & Fit</h4>
                <p className="text-sm text-stone-600">{product.sizeAndFit}</p>
              </div>

              {/* Material & Care */}
              <div className="mb-6">
                <h4 className="font-medium text-stone-900 mb-2">Material & Care</h4>
                <p className="text-sm text-stone-600 mb-1">{product.materialAndCare.composition}</p>
                <p className="text-sm text-stone-600">{product.materialAndCare.care}</p>
              </div>

              {/* Specifications */}
              <div>
                <h4 className="font-medium text-stone-900 mb-3">Specifications</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-xs text-stone-500 uppercase tracking-wider mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm text-stone-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <section className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-light text-stone-900 tracking-tight">You May Also Like</h2>
            <button className="text-sm text-red-500 font-medium hover:underline">View All →</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative aspect-3/4 bg-stone-100 rounded-sm overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded-sm">
                    {item.discount}% OFF
                  </div>
                  <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-stone-700" />
                  </button>
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-1">{item.brand}</p>
                  <h3 className="text-sm font-medium text-stone-900 mb-2 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-medium text-stone-900">₹{item.price}</span>
                    <span className="text-sm text-stone-400 line-through">₹{item.originalPrice}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-stone-900 text-stone-900" />
                    <span className="text-xs text-stone-600">{item.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
    <Footer/>
    </>
  );
}