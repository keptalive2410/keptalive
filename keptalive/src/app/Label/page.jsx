import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TheLabelPage() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-white text-black overflow-x-hidden">
        {/* ── HERO ── */}
        <section className="relative w-full h-[55vw] max-h-[700px] min-h-[320px] overflow-hidden">
          <img
            src="/Images/Label5.jpeg"
            alt="A label built on limitation"
            className="w-full h-full object-cover object-top"
          />
          {/* dark gradient on left-bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-14">
            <p className="font-nexa text-white text-[10px] md:text-xs tracking-widest uppercase mb-2 opacity-80">
              THE LABEL
            </p>
            <h1 className="font-seasons text-white text-[clamp(28px,5vw,64px)] leading-[1.05] max-w-[520px]">
              A label built
              <br />
              on limitation.
            </h1>
          </div>
        </section>

        {/* ── MANIFESTO ── */}
        <section className="relative px-5 sm:px-8 md:px-14 lg:px-20 py-12 sm:py-16 md:py-20 overflow-hidden">
          {/* Wave blob */}
          <div className="absolute right-[-40px] sm:right-0 top-1/2 -translate-y-1/2 w-[120px] sm:w-[180px] md:w-[260px] lg:w-[340px] pointer-events-none select-none opacity-70 md:opacity-100">
            <img
              src="/Images/Vector.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto"
            />
          </div>

          {/* Content wrapper */}
          <div className="relative z-10 max-w-[540px]">
            {/* Heading */}
            <h2 className="font-seasons text-black text-[clamp(24px,5vw,38px)] leading-[1.12] mb-6 md:mb-8">
              We make things once.
              <br />
              We number them.
              <br />
              We never make them again.
            </h2>

            {/* Paragraph 1 */}
            <p className="font-nexa text-black text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed mb-5 max-w-[480px]">
              keptalive is not a brand that restocks. It is a label that closes.
              Every archive is a moment in time — designed, produced, numbered,
              and done. The pieces that exist, exist. The pieces that are gone,
              are gone.
            </p>

            {/* Paragraph 2 */}
            <p className="font-nexa text-black text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed">
              This is the entire point.
            </p>
          </div>
        </section>

        {/* ── THE PROCESS ── split image / text ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]">
          {/* Left — photo */}
          <div className="relative overflow-hidden aspect-[4/5] md:aspect-auto">
            <img
              src="/Images/Label4.jpeg"
              alt="The process"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right — text on light grey bg */}
          <div className="bg-[#F2F2F0] flex flex-col justify-center px-10 md:px-16 py-14 md:py-20">
            <p className="font-nexa text-[#8A8A8A] text-[10px] md:text-xs tracking-widest uppercase mb-5">
              The process
            </p>
            <h2 className="font-seasons text-black text-[clamp(26px,3.5vw,46px)] leading-[1.1] mb-7 max-w-[340px]">
              Each piece starts with a single decision.
            </h2>
            <p className="font-nexa text-black text-[13px] md:text-[14px] leading-relaxed max-w-[380px] mb-6">
              keptalive does not design collections. It designs pieces. Each one
              is considered independently — the shape, the fabric, the wave
              detail that runs through everything. Once the decision is made, it
              goes into production. Once production is done, that is the
              archive.
            </p>
            <p className="font-nexa text-black text-[13px] md:text-[14px] leading-relaxed max-w-[380px] mb-6">
              No second runs. No reissues. No 'back by popular demand'.
            </p>
            <p className="font-nexa text-[#8A8A8A] text-[13px] md:text-[14px] italic max-w-[380px]">
              If you missed it, you missed it.
            </p>
          </div>
        </section>

        {/* ── BLACK WAVE BANNER ── */}
        <section className="relative w-full overflow-hidden bg-black">
          {/* wave image spans full width */}
          <img
            src="/Images/Label6.jpeg"
            alt=""
            aria-hidden="true"
            className="w-full object-cover"
          />
          {/* centered caption text over wave */}
          <div className="absolute inset-0 flex items-center justify-between px-8 md:px-20">
            <p className="font-nexa text-white text-[10px] md:text-xs tracking-widest opacity-60 uppercase">
              The wave is the brand. Everything else follows.
            </p>
            <p className="font-nexa text-white text-[10px] md:text-xs tracking-widest opacity-60 uppercase hidden md:block">
              Appears on every piece. In every detail.
            </p>
          </div>
        </section>

        {/* ── THE WAVE DETAIL ── text left / image right ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]">
          {/* Left — text on white */}
          <div className="flex flex-col justify-center px-10 md:px-16 py-14 md:py-20 order-2 md:order-1">
            <p className="font-nexa text-[#8A8A8A] text-[10px] md:text-xs tracking-widest uppercase mb-5">
              The wave detail
            </p>
            <h2 className="font-seasons text-black text-[clamp(28px,3.8vw,50px)] leading-[1.1] mb-7">
              Not a logo.
              <br />A language.
            </h2>
            <p className="font-nexa text-black text-[13px] md:text-[14px] leading-relaxed max-w-[400px] mb-6">
              The wave is not placed on keptalive pieces as a branding exercise.
              It is the design itself — the colour, the cut, the waved bond
              edge, the handle of the poly mailer, the shape of the ring stone.
            </p>
            <p className="font-nexa text-black text-[13px] md:text-[14px] leading-relaxed max-w-[400px] mb-6">
              When you look at a keptalive piece, you see the wave. When you
              look at the bag it arrives in, you see the wave. When you open the
              box and find the certificate, the wave is there too.
            </p>
            <p className="font-nexa text-black text-[13px] md:text-[14px] max-w-[400px]">
              One motif. <span className="italic">Everywhere. Always.</span>
            </p>
          </div>

          {/* Right — photo */}
          <div className="relative overflow-hidden aspect-[4/5] md:aspect-auto order-1 md:order-2">
            <img
              src="/Images/Label3.jpeg"
              alt="The wave detail"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* ── STATS ROW ── */}
        <section className="bg-[#F3F3F1] border-t border-[#D9D9D6] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#D9D9D6]">
          {/* 18 */}
          <div className="px-10 md:px-16 py-14 md:py-16">
            <p className="font-seasons text-black text-[clamp(52px,7vw,96px)] leading-none mb-3">
              18
            </p>
            <p className="font-nexa text-[#8A8A8A] text-xs tracking-widest uppercase mb-3">
              Pieces per archive
            </p>
            <p className="font-nexa text-black text-[13px] leading-relaxed max-w-[240px]">
              Each archive is exactly 18 pieces. No more.
            </p>
          </div>

          {/* 001 */}
          <div className="px-10 md:px-16 py-14 md:py-16">
            <p className="font-seasons text-black text-[clamp(52px,7vw,96px)] leading-none mb-3">
              001
            </p>
            <p className="font-nexa text-[#8A8A8A] text-xs tracking-widest uppercase mb-3">
              Number on every piece
            </p>
            <p className="font-nexa text-black text-[13px] leading-relaxed max-w-[240px]">
              Every piece is numbered. Every number is unique.
            </p>
          </div>

          {/* Once */}
          <div className="px-10 md:px-16 py-14 md:py-16">
            <p className="font-seasons text-black text-[clamp(52px,7vw,96px)] leading-none mb-3">
              Once
            </p>
            <p className="font-nexa text-[#8A8A8A] text-xs tracking-widest uppercase mb-3">
              Made once, never repeated
            </p>
            <p className="font-nexa text-black text-[13px] leading-relaxed max-w-[240px]">
              When the archive closes, it is permanent.
            </p>
          </div>
        </section>

        {/* ── CLOSING CTA ── full-bleed image with button ── */}
        <section className="relative w-full h-[70vw] max-h-[760px] min-h-[380px] overflow-hidden">
          <img
            src="/Images/Label1.jpeg"
            alt="View the Archive"
            className="w-full h-full object-cover object-center"
          />
          {/* subtle dark vignette bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          {/* CTA button bottom-left */}
          <div className="absolute bottom-10 left-8 md:bottom-14 md:left-14">
            <a
              href="/products"
              className="inline-block bg-black text-white font-nexa text-[11px] tracking-widest uppercase px-8 py-4 hover:bg-[#2B2B2B] transition-colors duration-200"
            >
              VIEW THE ARCHIVE
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
