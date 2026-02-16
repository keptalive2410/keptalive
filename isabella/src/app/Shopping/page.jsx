'use client';

import { useState } from 'react';
import { ChevronDown, Grid, LayoutGrid, Grid3x3, Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import Navbar from "@/Components/Layout/Navbar";
import Footer  from '@/Components/Layout/Footer';

export default function NewSeasonPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('4-grid');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 500],
    gender: [],
    availability: [],
    size: []
  });

  const categories = ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'];
  const genders = ['Women', 'Men', 'Unisex'];
  const availability = ['In Stock', 'Pre-Order', 'Coming Soon'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Selling'];

  const products = [
    {
      id: 1,
      name: "The Áine x McElhinney's",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=900&fit=crop",
      price: 145,
      color: 'blue'
    },
    {
      id: 2,
      name: "The Aisling x McElhinney's",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=900&fit=crop",
      price: 135,
      color: 'floral'
    },
    {
      id: 3,
      name: "The Caoimhe x McElhinneys",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=900&fit=crop",
      price: 155,
      color: 'pink'
    },
    {
      id: 4,
      name: "The Sorcha x McElhinney's",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
      price: 145,
      color: 'navy'
    },
    {
      id: 5,
      name: "The Niamh x McElhinney's",
      image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=600&h=900&fit=crop",
      price: 145,
      color: 'blue'
    },
    {
      id: 6,
      name: "The Siobhan x McElhinney's",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=900&fit=crop",
      price: 135,
      color: 'floral'
    },
    {
      id: 7,
      name: "The Aoife x McElhinneys",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=900&fit=crop",
      price: 155,
      color: 'pink'
    },
    {
      id: 8,
      name: "The Maeve x McElhinney's",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=900&fit=crop",
      price: 145,
      color: 'navy'
    }
  ];

  const toggleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white pt-16">
      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl sm:text-4xl font-serif tracking-wider text-center text-gray-900">NEW SEASON</h2>
      </div>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 border-t border-b border-gray-200 py-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 border border-gray-300 px-4 py-2 hover:bg-gray-50 transition text-sm text-gray-900"
            >
              <span>FILTER</span>
              <ChevronDown size={16} className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:flex-none">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 hover:bg-gray-50 transition text-sm w-full sm:w-auto justify-between text-gray-900"
              >
                <span>FEATURED</span>
                <ChevronDown size={16} className={`transform transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSortOpen && (
                <div className="absolute top-full left-0 mt-2 w-full sm:w-64 bg-white border border-gray-300 shadow-lg z-40">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-900"
                      onClick={() => setIsSortOpen(false)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* View Options */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedView('2-grid')}
              className={`p-2 border border-gray-300 hover:bg-gray-50 transition text-gray-900 ${selectedView === '2-grid' ? 'bg-gray-100' : ''}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setSelectedView('3-grid')}
              className={`p-2 border border-gray-300 hover:bg-gray-50 transition text-gray-900 ${selectedView === '3-grid' ? 'bg-gray-100' : ''}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setSelectedView('4-grid')}
              className={`p-2 border border-gray-300 hover:bg-gray-50 transition text-gray-900 ${selectedView === '4-grid' ? 'bg-gray-100' : ''}`}
            >
              <Grid3x3 size={20} />
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="mb-8 border border-gray-200 p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3 text-sm text-gray-900">CATEGORIES</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-2 rounded border-gray-300"
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleFilter('categories', category)}
                      />
                      <span className="text-sm text-gray-900">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="font-medium mb-3 text-sm text-gray-900">PRICE</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [0, parseInt(e.target.value)]
                    }))}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-900">
                    <span>£{filters.priceRange[0]}</span>
                    <span>£{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div>
                <h3 className="font-medium mb-3 text-sm text-gray-900">GENDER</h3>
                <div className="space-y-2">
                  {genders.map((gender) => (
                    <label key={gender} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-2 rounded border-gray-300"
                        checked={filters.gender.includes(gender)}
                        onChange={() => toggleFilter('gender', gender)}
                      />
                      <span className="text-sm text-gray-900">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-medium mb-3 text-sm text-gray-900">AVAILABILITY</h3>
                <div className="space-y-2">
                  {availability.map((status) => (
                    <label key={status} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-2 rounded border-gray-300"
                        checked={filters.availability.includes(status)}
                        onChange={() => toggleFilter('availability', status)}
                      />
                      <span className="text-sm text-gray-900">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-medium mb-3 text-sm text-gray-900">SIZE</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleFilter('size', size)}
                      className={`border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 transition ${
                        filters.size.includes(size) ? 'bg-black text-white border-black' : 'text-gray-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-6 pt-6 border-t border-gray-300 flex justify-end">
              <button
                onClick={() => setFilters({
                  categories: [],
                  priceRange: [0, 500],
                  gender: [],
                  availability: [],
                  size: []
                })}
                className="text-sm underline hover:no-underline text-gray-900"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className={`grid gap-6 ${
          selectedView === '2-grid' ? 'grid-cols-1 sm:grid-cols-2' :
          selectedView === '3-grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-3/4 bg-gray-100 mb-4 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
              </div>
              <h3 className="text-sm mb-2 text-gray-900 group-hover:underline">{product.name}</h3>
              <p className="text-sm font-medium text-gray-900">£{product.price}</p>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition text-sm tracking-wider text-gray-900">
            LOAD MORE
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}