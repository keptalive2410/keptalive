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
              on revival.
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
              Every wave returns.
              <br />
              Every era evolves.
              <br />
              Every piece carries a story forward.
            </h2>

            {/* Paragraph 1 */}
            <p className="font-nexa text-black text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed mb-5 max-w-[480px]">
              Keptalive exists at the intersection of heritage and renewal.
              Drawing inspiration from the continuous rhythm of the sea, our
              collections celebrate timeless craftsmanship reimagined for a new
              generation. We believe true artistry does not disappear with time.
              Like a wave, it returns—reshaped, refined, and filled with new
              purpose.
            </p>

            {/* Paragraph 2 */}
            <p className="font-nexa text-black text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed">
              Where timeless design finds its next movement.
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
              The Philosophy
            </p>
            <h2 className="font-seasons text-black text-[clamp(26px,3.5vw,46px)] leading-[1.1] mb-7 max-w-[340px]">
              Every piece begins with a return.
            </h2>
            <p className="font-nexa text-black text-[13px] md:text-[14px] leading-relaxed max-w-[380px] mb-6">
              At Keptalive, creation is guided by the rhythm of renewal. Every
              design begins with a timeless idea—a silhouette, a detail, a
              memory worth carrying forward. Inspired by the movement of waves,
              we reinterpret heritage through a contemporary lens, allowing
              familiar forms to return with new energy, purpose, and expression.
              Each piece is thoughtfully crafted to honor the past while
              embracing the present, creating garments that feel both enduring
              and alive.
            </p>
            <p className="font-nexa text-black text-[13px] md:text-[14px] leading-relaxed max-w-[380px] mb-6">
              What returns is never repeated. It is revived.
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
              Past
            </p>
            <p className="font-nexa text-[#8A8A8A] text-xs tracking-widest uppercase mb-3">
              WHERE WE BEGIN
            </p>
            <p className="font-nexa text-black text-[13px] leading-relaxed max-w-[240px]">
              Every collection draws inspiration from timeless artistry,
              enduring craftsmanship, and stories worth remembering.
            </p>
          </div>

          {/* 001 */}
          <div className="px-10 md:px-16 py-14 md:py-16">
            <p className="font-seasons text-black text-[clamp(52px,7vw,96px)] leading-none mb-3">
              Present
            </p>
            <p className="font-nexa text-[#8A8A8A] text-xs tracking-widest uppercase mb-3">
              WHERE WE REIMAGINE
            </p>
            <p className="font-nexa text-black text-[13px] leading-relaxed max-w-[240px]">
              Classic influences evolve through contemporary expression, bringing renewed energy to familiar forms.
            </p>
          </div>

          {/* Once */}
          <div className="px-10 md:px-16 py-14 md:py-16">
            <p className="font-seasons text-black text-[clamp(52px,7vw,96px)] leading-none mb-3">
              Future
            </p>
            <p className="font-nexa text-[#8A8A8A] text-xs tracking-widest uppercase mb-3">
              WHERE WE FLOW
            </p>
            <p className="font-nexa text-black text-[13px] leading-relaxed max-w-[240px]">
              Design that carries heritage forward, creating pieces that remain meaningful beyond a single moment.{" "}
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
              VIEW THE COLLECTION
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
