import Navbar from "@/components/layout/Navbar";

const Img = ({ src, alt, className }) => (
  <img
    src={src || "https://placehold.co/800x900/e8e0d8/888?text=image"}
    alt={alt || ""}
    className={className}
  />
);

// ── About Page ───────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="text-[#1a1a1a] bg-white">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative bg-[#141414] min-h-85 md:min-h-105 overflow-hidden flex items-end pb-14 px-8 md:px-16">
          {/* decorative blob */}
          <div
            className="absolute right-0 top-0 w-[55%] h-full pointer-events-none"
            aria-hidden
          >
            <svg
              viewBox="0 0 700 420"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M700,0 C700,0 500,0 420,80 C340,160 480,260 380,340 C280,420 150,420 0,420 L700,420 Z"
                fill="2a2a2a"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-lg">
            <p className="text-[#888] text-xs tracking-widest uppercase mb-6 font-seasons">
              About
            </p>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-seasons font-light">
              keptalive
              <br />
              is a label,
              <br />
              not a brand.
            </h1>
          </div>
        </section>

        {/* ── WHAT KEPTALIVE IS ────────────────────────────────────────────── */}
        <section className="px-8 md:px-16 lg:px-24 py-20 max-w-7xl">
          <p className="text-[10px] tracking-widest uppercase text-[#2A2A2A] font-seasons mb-6">
            What keptalive is.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-[#1a1a1a] mb-8 max-w-7xl">
            keptalive was built on a simple idea, that fashion should be made
            with intention, numbered for accountability, and closed when it is
            done. Not a capsule. Not a drop. An archive.
          </p>

          <p className="text-sm leading-relaxed text-[black] mb-3 max-w-4xl uppercase tracking-wider font-bold">
            Inspiration — The Wave of Revival
          </p>

          <p className="text-sm leading-relaxed text-[#555 ] mb-8 max-w-4xl">
            Inspired by the rhythm of waves, our philosophy reflects continuous
            movement and renewal. A wave flows only to return again with greater
            force, energy, and spirit — a reminder that what is meaningful
            endures, evolves, and returns with purpose.
          </p>

          <p className="text-sm leading-relaxed text-[#555] mb-8 max-w-4xl">
            Every piece in every archive is designed once and produced once. The
            number on the label is not a marketing technique — it is an honest
            record of what exists. When the archive closes, it closes. There is
            no second run, no restock, no revival.
          </p>

          <p className="text-sm italic text-[#1a1a1a] font-nexa font-bold">
            keptalive does not compete on volume.{" "}
            <em className="not-italic font-bold">It competes on permanence.</em>
          </p>
        </section>

        {/* ── FOUNDER NOTE (split: image left, text right) ─────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 bg-[#F5F5F5]">
          {/* image */}
          <div className="relative min-h-105 md:min-h-140 overflow-hidden">
            <Img
              src="/Images/About1.jpg"
              alt="Founder wearing keptalive"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>

          {/* text */}
          <div className="flex flex-col justify-center px-10 md:px-14 lg:px-20 py-16">
            <p className="text-[10px] tracking-widest uppercase text-[#2A2A2A] font-nexa mb-10">
              A note.
            </p>

            <p className="text-sm leading-relaxed text-[#333] mb-6">
              I started keptalive because I was tired of fashion that pretended
              to be special while being available to everyone, always. The
              contradiction bothered me.
            </p>

            <p className="text-sm leading-relaxed text-[#333] mb-6">
              If something is truly worth keeping, it should be rare. Not
              artificially rare, actually rare. Made once. In a real number.
              Numbered honestly. And then done.
            </p>

            <p className="text-sm leading-relaxed text-[#333] mb-10">
              keptalive is the answer to that contradiction.
              <br />
              Each piece is worth keeping because it actually ends.
            </p>

            {/* signature */}
            <div className="text-2xl font-title text-[#1a1a1a] mb-2 leading-none">
              ~
            </div>
            <p className="text-[11px] tracking-widest uppercase text-[#2A2A2A] font-body">
              Founder, keptalive
            </p>
          </div>
        </section>

        {/* ── VALUES GRID ──────────────────────────────────────────────────── */}
        <section className="px-8 md:px-16 lg:px-24 py-20">
          <p className="text-[10px] tracking-widest uppercase text-[#2A2A2A] font-nexa font-semibold mb-12">
            What we stand for.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                title: "Limitation",
                body: "We make 18 pieces per collection. That number does not change. Ever.",
              },
              {
                title: "Accountability",
                body: "Every piece is numbered. You know exactly what you have and how many exist.",
              },
              {
                title: "Permanence",
                body: "When an collection closes, it is done. No restocks. No revivals. No second chances.",
              },
              {
                title: "Honesty",
                body: "We do not use scarcity as a tactic. We wear it as a fact. This is all of us. This is all of it.",
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <h3 className="text-base font-seasons font-medium mb-3">
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-[#666] font-nexa">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── THE ARCHIVE SYSTEM (text left, image right) ──────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* text */}
          <div className="px-8 md:px-16 lg:px-24 py-20 order-2 md:order-1">
            <p className="text-[10px] tracking-widest uppercase text-[#2A2A2A] font-body mb-6">
              How it works.
            </p>

            <h2 className="text-4xl md:text-5xl font-seasons font-light leading-[1.1] mb-10">
              The Archive
              <br />
              system.
            </h2>

            <p className="text-sm leading-relaxed text-[#555] mb-5 max-w-md">
              Archive I is the first. Archive II will follow when we are ready.
              Each archive is independent — different pieces, different designs,
              same rules.
            </p>

            <p className="text-sm leading-relaxed text-[#555] mb-10 max-w-md">
              When every piece in an archive is claimed, that archive is
              permanently closed. It moves from active to historical. The pieces
              that were made are the only pieces that will ever exist.
            </p>

            <div className="mb-6">
              <p className="text-xs text-[#2A2A2A] font-body mb-3">
                Collection I · 2025 · 18 Pieces · Open
              </p>
              <a
                href="/products"
                className="inline-block border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-widest uppercase font-body px-6 py-3 hover:bg-[#1a1a1a] hover:text-white transition-colors duration-200"
              >
                Explore Collection
              </a>
            </div>
          </div>

          {/* image */}
          <div className="relative min-h-105 md:min-h-140 overflow-hidden order-1 md:order-2">
            <Img
              src="/Images/About2.jpg"
              alt="Model outdoors for keptalive archive"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </section>

        {/* ── GET IN TOUCH ─────────────────────────────────────────────────── */}
        <section className="bg-[#f5f0ea] px-8 md:px-16 lg:px-24 py-16">
          <p className="text-[10px] tracking-widest uppercase text-[#2A2A2A] font-body mb-2">
            Get in touch.
          </p>
          <p className="text-xs text-[#777] font-body mb-10">
            For press, stockist, or general enquiries.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { label: "General", email: "hello@keptalive.com" },
              { label: "Press", email: "press@keptalive.com" },
              { label: "Stockist", email: "trade@keptalive.com" },
            ].map(({ label, email }) => (
              <div key={label}>
                <p className="text-[10px] tracking-widest uppercase text-[#2A2A2A] font-seasons mb-2">
                  {label}
                </p>
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-[#1a1a1a] border-b border-[#bbb] pb-0.5 hover:border-[#1a1a1a] transition-colors font-body"
                >
                  {email}
                </a>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#bbb] font-body mt-12">
            © 2025 keptalive. Collection I is currently open.
          </p>
        </section>
      </main>
    </>
  );
}
