'use client';

import { useState } from 'react';
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const blogPosts = [
    {
      id: 1,
      title: "The Psychology of Dressing Well: How Clothes Influence",  
      excerpt: "What you wear does more than shape your appearance",
      author: "Admin",
      date: "February 8, 2026",
      category: "STYLE",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    },
    {
      id: 2,
      title: "Capsule Wardrobe Guide: Own Less, Style More",
      excerpt: "Discover how a thoughtfully curated wardrobe can simplify dressing while maximizing style.",
      author: "Admin",
      date: "January 20, 2026",
      category: "STYLE",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
    },
    {
      id: 3,
      title: "Wardrobe Essentials Every Modern Woman Needs in 2026",
      excerpt: "Build a timeless wardrobe with versatile pieces that elevate your everyday style effortlessly.",
      author: "Admin",
      date: "January 6, 2026",
      category: "STYLE",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    },
  ];

  const categories = ['ALL', 'STYLE'];

  const filteredPosts = selectedCategory === 'ALL' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white pt-18">
      {/* Hero Section */}
      <section className="bg-black text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Fashion Journal
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover the latest trends, styling tips, and sustainable fashion insights
            from our design studio
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Category Filter */}
        <div className="flex justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 text-sm font-semibold tracking-wide transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="text-center text-gray-600 mb-12">
          {filteredPosts.length} posts
        </p>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white overflow-hidden group cursor-pointer"
            >
              {/* Image with grayscale to color hover effect */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime}
                </div>
              </div>

              {/* Content */}
              <div className="py-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{post.date}</span>
                  </div>
                </div>

                <button className="text-black hover:text-blue-600 font-medium text-sm flex items-center gap-2 group/btn transition-colors">
                  Read More
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Summary */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-2">
            Showing {filteredPosts.length} of {blogPosts.length} blog posts
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <span>Total Reading Time: 14 minutes</span>
            <span>Latest: {blogPosts[0].date}</span>
          </div>
        </div>
      </main>
    </div>
    <Footer/>
    </>
  );
}