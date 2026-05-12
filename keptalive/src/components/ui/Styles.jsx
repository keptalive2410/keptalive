"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section className="w-full bg-[#EBEBEB] px-5 md:px-10 lg:px-16 py-10 md:py-12">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">

        {/* left: copy */}
        <div className="flex-shrink-0">
          <p className="font-seasons text-[11px] tracking-[0.1em] text-[#888] mb-2">
            Join the Archive
          </p>
          <h2 className="font-nexa text-[22px] md:text-[26px] leading-[1.2] text-[#111]">
            Be first to know
            <br />
            when new pieces drop.
          </h2>
          <p className="font-seasons text-[11px] text-[#888] mt-2 tracking-[0.03em]">
            No spam. Only new pieces and archive drops.
          </p>
        </div>

        {/* right: form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full md:max-w-[500px] lg:max-w-[560px]"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 bg-white border-0 px-5 py-3.5 font-seasons text-[12px] text-[#111] placeholder:text-[#AAAAAA] tracking-[0.04em] outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-nexa text-[10px] tracking-[0.18em] uppercase px-6 py-3.5 hover:bg-[#333] transition-colors duration-200 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}