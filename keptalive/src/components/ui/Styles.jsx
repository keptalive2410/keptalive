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
        <div className="text-center mb-4">
          <h2
            className="text-[clamp(1.4rem,3vw,2rem)] font-bold text-black tracking-wide"
            style={{ fontFamily: "'The Seasons', serif" }}
          >
            Why Shop With Us
          </h2>
          <div className="w-10 h-px bg-black mx-auto mt-2" />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="text-center">

              {/* Icon */}
              <div className="flex justify-center mb-5">
                <feature.icon
                  size={44}
                  strokeWidth={1}
                  className="text-[#2B2B2B]"
                />
              </div>

              {/* Title */}
              <h3 className="text-[0.82rem] font-bold tracking-[0.14em] text-black mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[0.78rem] font-light text-[#8A8A8A] leading-relaxed tracking-wide">
                {feature.description}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
