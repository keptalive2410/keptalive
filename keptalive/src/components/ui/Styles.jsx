"use client";

import { Package, Globe, MessageCircle } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Package,
    title: "FREE RETURNS",
    description: "Returns within 14 days receive a full refund. UK only.",
  },
  {
    id: 2,
    icon: Globe,
    title: "WORLDWIDE SHIPPING",
    description: "Ship anywhere, rates available at checkout.",
  },
  {
    id: 3,
    icon: MessageCircle,
    title: "CONTACT US",
    description: "For queries about shipping, products and news.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="pt-4 pb-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-gray-900">
            Why Shop With Us
          </h2>
          <div className="w-12 h-0.5 bg-black mx-auto mt-3"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <feature.icon
                  size={48}
                  strokeWidth={1}
                  className="text-gray-700"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-serif mb-3 tracking-wide text-gray-600">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
