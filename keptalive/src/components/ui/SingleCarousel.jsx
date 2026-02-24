"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "The Garden",
    price: "$129.00",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
  },
  {
    id: 2,
    name: "The Meadow",
    price: "$145.00",
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
  },
  {
    id: 3,
    name: "The Blossom",
    price: "$139.00",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
  },
  {
    id: 4,
    name: "The Wildflower",
    price: "$155.00",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
  },
];

export default function ProductShowcaseSection() {
  const [currentProduct, setCurrentProduct] = useState(0);

  const goToPrevious = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToNext = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length);
  };

  const goToSlide = (index) => {
    setCurrentProduct(index);
  };

  return (
    <section className="bg-gray-50">
      <div className="grid md:grid-cols-2">
        {/* Left - Product Carousel */}
        <div className="flex items-center justify-center py-6 px-8 md:px-12 bg-white">
          <div className="max-w-md w-full">
            {/* Collection Title */}
            <h2 className="text-2xl md:text-3xl font-serif text-center mb-2 text-gray-900">
              MIDNIGHT BLOOM
            </h2>
            <div className="w-12 h-0.5 bg-gray-400 mx-auto mb-4"></div>

            {/* Product Display */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-all"
                aria-label="Previous product"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-all"
                aria-label="Next product"
              >
                <ChevronRight size={20} />
              </button>

              {/* Product Image */}
              <Link href={`/products/${products[currentProduct].id}`}>
                <div className="relative aspect-3/4 mb-4 overflow-hidden group cursor-pointer max-w-70 mx-auto">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${products[currentProduct].image}')`,
                    }}
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-serif mb-1 text-gray-700">
                  {products[currentProduct].name}
                </h3>
                <p className="text-base text-gray-600">{products[currentProduct].price}</p>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mb-6">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentProduct
                        ? "bg-black w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to product ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right - Static Lifestyle Image */}
        <div className="bg-gray-100">
          <div className="relative w-full h-150 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&q=80"
              alt="Lifestyle"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
