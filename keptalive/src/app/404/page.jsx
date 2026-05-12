"use client";

import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      {/* Large 404 */}
      <p
        className="font-seasons text-[clamp(8rem,22vw,18rem)] leading-none text-[#2A2A2A] select-none"
        aria-hidden="true"
      >
        404
      </p>

      {/* Headline */}
      <h1 className="font-seasons text-[clamp(1.2rem,3vw,1.8rem)] text-white mt-[-1rem] mb-3 tracking-wide">
        This piece has been archived.
      </h1>

      {/* Sub-copy */}
      <p className="font-nexa font-light text-[0.72rem] text-[#8A8A8A] tracking-wide max-w-sm leading-relaxed mb-12">
        The page you are looking for does not exist, has been moved, or has already been claimed.
      </p>

      {/* Divider line */}
      <div className="w-16 border-t border-[#2B2B2B] mb-6" />

      {/* Flavour text */}
      <p className="font-nexa font-light text-[0.65rem] text-[#555555] tracking-widest mb-10">
        Like every piece in our archive — once it's gone, it's gone.
      </p>

      {/* CTAs */}
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={() => router.push("/products")}
          className="font-nexa text-[0.65rem] tracking-[0.2em] uppercase px-8 py-4 bg-white text-black hover:bg-[#F2F2F0] transition min-w-[160px]"
        >
          Back to Archive
        </button>
        <button
          onClick={() => router.push("/Collections")}
          className="font-nexa text-[0.65rem] tracking-[0.2em] uppercase px-8 py-4 bg-transparent text-white border border-[#444] hover:border-white transition min-w-[160px]"
        >
          View Collection
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
}