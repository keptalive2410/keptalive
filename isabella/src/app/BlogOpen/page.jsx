'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";

export default function BlogDetailPage() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative h-100 sm:h-125 md:h-150 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&q=80"
          alt="Swimwear Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-wide">
              INTRODUCING OUR 2025
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl tracking-widest">
              SWIMWEAR COLLECTION
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        
        {/* Introduction Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 md:mb-24">
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 tracking-wide">
              INTRODUCING OUR 2025 SWIMWEAR COLLECTION
            </h3>
            <div className="h-1 w-16 bg-gray-300 mb-8"></div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Here at Hope & Ivy, our <a href="#" className="underline hover:text-blue-600">summer collection</a> has been hotting up, particularly with the addition of our three new <a href="#" className="underline hover:text-blue-600">swimwear</a> pieces!
              </p>
              <p>
                Featuring our signature Hope & Ivy hand-painted prints, these vintage-inspired swimsuits are a dreamy addition for your holiday wardrobe. With under-the-sea inspired motifs, including delicate seashells, shimmering seahorses, and captivating coral, each piece evokes the magic of sun-soaked summer escapes.
              </p>
              <p>
                Whether you're basking on salty shores or reclining poolside with a cocktail in hand, our beautifully crafted swimsuits promise to make a splash this season!
              </p>
            </div>
          </div>
          <div className="relative h-100 sm:h-125 lg:h-150">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              alt="Swimsuit Model"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Image Gallery - 3 Images */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 md:mb-24">
          <div className="relative h-87.5 sm:h-112.5 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80"
              alt="Blue Patterned Swimsuit"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="relative h-87.5 sm:h-112.5 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80"
              alt="Blue Patterned Swimsuit Standing"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="relative h-87.5 sm:h-112.5 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80"
              alt="Blue Patterned Swimsuit Side"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </section>

        {/* Design Process Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 md:mb-24">
          <div className="relative h-100 sm:h-125 lg:h-150 order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80"
              alt="Model Portrait"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center order-1 lg:order-2">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 tracking-wide">
              THE SWIMWEAR DESIGN PROCESS
            </h3>
            <div className="h-1 w-16 bg-gray-300 mb-8"></div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We like to think we know a thing or two about designing dresses, but creating swimwear to accompany and flawlessly sit alongside our <a href="#" className="underline hover:text-blue-600">SS25 collection</a> was a new challenge.
              </p>
              <p>
                We browsed through endless options for silhouettes, reimagining each using the beloved hand-painted prints that have decorated the bases of our latest <a href="#" className="underline hover:text-blue-600">wrap dresses</a> and <a href="#" className="underline hover:text-blue-600">vacation-ready styles</a>, until three designs in particular captured our hearts.
              </p>
              <p>
                Staying true to the brand's romantic and timeless aesthetic, these brand-new arrivals offer both beauty and functionality in abundance. The result is a seamless extension of our summer story – one that flows effortlessly from occasion wear to swim essentials.
              </p>
              <p className="font-medium">
                So... let us introduce you!
              </p>
            </div>
          </div>
        </section>

        {/* Product Descriptions Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 md:mb-24">
          <div className="relative h-112.5 sm:h-137.5 lg:h-175">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
              alt="The Mariah Swimsuit"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h4 className="text-xl font-bold mb-3 italic">The Mariah –</h4>
              <p>
                Showcasing a vibrant palette of coral pinks, sea greens, and soft lilacs, this one-piece is adorned with an exclusive, hand-illustrated shell motif, blending tropical flair with refined elegance. The twist-front detail at the bust flatters the neckline and enhances your silhouette, while the supportive straps and premium stretch fabric offer comfort and confidence, from beach to poolside.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3 italic">The Sydney –</h4>
              <p>
                Make a splash this season with the Hope & Ivy Under the Sea Belted Swimsuit, a vibrant, ocean-inspired statement piece, perfect for sun-drenched getaways. Featuring a beautifully illustrated marine print of crabs, shells, seahorses, and fish in shades of teal, indigo, and aqua, this flattering one-piece evokes the spirit of summer and seaside charm.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3 italic">The Sorel –</h4>
              <p>
                Dive into your dreamiest summer yet with this elegant one-piece swimsuit. The belted waist with a tortoiseshell-effect buckle enhances your silhouette while adding a touch of retro sophistication. Crafted from high-quality stretch fabric for a comfortable and secure fit, this swimsuit is ideal for lounging poolside or strolling along the beach.
              </p>
            </div>
          </div>
        </section>

        {/* South of France Shoot Section */}
        <section className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 tracking-wide">
                OUR SOUTH OF FRANCE SHOOT
              </h3>
              <div className="h-1 w-16 bg-gray-300 mb-8"></div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  If you've been a longtime follower of our brand, you'll know we're madly in love with all things French, so it was only natural that we headed to Aix-en-Provence in the sun-drenched South of France for our 2025 swimwear shoot.
                </p>
                <p>
                  Our chosen location was the breathtaking <a href="#" className="underline hover:text-blue-600">Chateau Barbebelle</a>, nestled amidst 300 hectares of lush greenery, and promising the ideal blend of elegance and natural beauty.
                </p>
                <p>
                  With a spectacular setting secured, we spent a magical afternoon shooting alongside our gorgeous model <a href="#" className="underline hover:text-blue-600">Kirsty</a> under the Provençal sun, capturing the essence of effortless summer charm. The golden light and rustic romance of Chateau Barbebelle brought every swimwear piece to life, and we couldn't be happier with the finished result.
                </p>
              </div>
            </div>
            <div className="relative h-100 sm:h-125 lg:h-150">
              <img
                src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80"
                alt="Model with Hat"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Final 3 Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative h-87.5 sm:h-112.5 overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"
                alt="France Shoot 1"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="relative h-87.5 sm:h-112.5 overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                alt="France Shoot 2"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="relative h-87.5 sm:h-112.5 overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80"
                alt="France Shoot 3"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 border-t border-gray-200">
          <p className="text-gray-700 mb-6 text-lg">
            We hope you love the collection as much as we do – If you choose to wear our summer swimsuits on your next holiday, make sure to tag us in your snaps at{' '}
            <a href="#" className="underline hover:text-blue-600">@hopeivylondon</a>
          </p>
          <button className="bg-black text-white px-8 py-3 text-sm tracking-widest hover:bg-gray-800 transition-colors">
            SHOP SWIMWEAR
          </button>
        </section>
      </main>
    </div>
    <Footer/>
    </>
  );
}