'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Grid, LayoutGrid, Grid3x3, Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import Navbar from "@/components/layout/Navbar";
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';

export default function NewSeasonPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('4-grid');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSort, setSelectedSort] = useState("newest");
  const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];
  const router = useRouter();

  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        page: reset ? 1 : page,
        limit: 16,
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
        setProducts(prev => [...prev, ...data.products]);
      }

      setHasMore(page < data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }



  // Filter states
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 50000],
    size: []
  });

  const fetchCategories = async (reset = false) => {
    try {
      const categoryRes = await fetch(`/api/category/fetch`);
      const categoryData = await categoryRes.json();

      setCategories(categoryData.categories || []);
      console.log("CATEGORY RESPONSE:", categoryData);

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    setPage(1);
    fetchProducts(true);
    fetchCategories(true);
  }, [filters, selectedSort]);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

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
      <Navbar />
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
                        onClick={() => {
                          setSelectedSort(option)
                          setIsSortOpen(false)
                        }}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-3 text-sm text-gray-900">CATEGORIES</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.categoryName} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="mr-2 rounded border-gray-300"
                          checked={filters.categories.includes(category.categoryName)}
                          onChange={() => toggleFilter('categories', category.categoryName)}
                        />
                        <span className="text-sm text-gray-900">{category.categoryName}</span>
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
                      max="50000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [0, parseInt(e.target.value)]
                      }))}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-900">
                      <span>Rs. {filters.priceRange[0]}</span>
                      <span>Rs.   {filters.priceRange[1]}</span>
                    </div>
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
                        className={`border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 transition ${filters.size.includes(size) ? 'bg-black text-white border-black' : 'text-gray-900'
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
                    priceRange: [0, 5000],
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
          <div className={`grid gap-6 ${selectedView === '2-grid' ? 'grid-cols-1 sm:grid-cols-2' :
            selectedView === '3-grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}>
            {products.map((product) => (
              <div href="" key={product._id} className="group cursor-pointer" onClick={() => router.push(`/products/${product.slug}`)}>
                <div className="aspect-3/4 bg-gray-100 mb-4 overflow-hidden relative">
                  <img
                    src={product.productImages?.[0]?.url}
                    alt={product.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
                </div>
                <h3 className="text-sm mb-2 text-gray-900 group-hover:underline">{product.productName}</h3>
                <p className="text-sm font-medium text-gray-900">Rs. {product.productSellingPrice}</p>
              </div>
            ))}
          </div>

          {hasMore && (
            <button
              onClick={() => {
                setPage(prev => prev + 1);
                fetchProducts();
              }}
              className="border border-black px-8 py-3 hover:bg-black hover:text-white transition text-sm tracking-wider"
            >
              {loading ? "Loading..." : "LOAD MORE"}
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}