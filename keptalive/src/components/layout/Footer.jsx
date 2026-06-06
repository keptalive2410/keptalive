import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  ARCHIVE: [
    { label: "All Pieces", href: "/products" },
    { label: "Tops & Blouses", href: "/products?categories=tops" },
    { label: "Dresses", href: "/products?categories=dresses" },
    { label: "Jumpsuits", href: "/products?categories=jumpsuits" },
  ],

  LABEL: [
    { label: "The Label", href: "/Label" },
    { label: "About", href: "/About" },
    // { label: "Campaign", href: "/Label" },
    { label: "Contact", href: "/Help" },
  ],

  HELP: [
    // { label: "Sizing Guide", href: "/Help/sizing" },
    { label: "Shipping", href: "/Help/shipping" },
    { label: "Returns", href: "/Help/#shipping" },
    // { label: "Care Guide", href: "/help/care" },
    { label: "FAQ", href: "/Help#faq" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#EAEAEA]">

      {/* MAIN FOOTER */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 pt-12 pb-12">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-12">

          {/* BRAND COLUMN */}
          <div className="col-span-2 md:col-span-1">

            <Link
              href="/"
              className="font-seasons text-[26px] tracking-[0.02em] text-[#000000] hover:opacity-75 transition-opacity duration-200 leading-none"
            >
              kep&#771;talive
            </Link>

            <p className="text-[12px] text-[#777] leading-[1.9] tracking-[0.03em] max-w-[220px] mt-4">
              Kept Alive is a fashion house inspired by the belief that beauty never truly disappears—it simply waits to be rediscovered.
            </p>
      
            {/* SOCIALS */}
            <div className="flex items-center gap-5 mt-8">

              <Link
                href="https://www.instagram.com/_keptalive"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity duration-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#111" stroke="none" />
                </svg>
              </Link>

              <Link
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity duration-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.562 0-2.387-1.715-4.052-4.163-4.052-2.837 0-4.5 2.126-4.5 4.326 0 .856.33 1.773.741 2.274a.3.3 0 0 1 .069.286c-.076.315-.245.995-.278 1.134-.044.183-.146.222-.336.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.938.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </Link>

              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity duration-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15.5 8H13a1 1 0 0 0-1 1v2h3.5l-.5 3H12v7" />
                </svg>
              </Link>

            </div>
          </div>

          {/* LINK COLUMNS */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>

              <p className="text-[10px] tracking-[0.22em] uppercase text-black mb-6">
                {heading}
              </p>

              <ul className="space-y-4">

                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[#666] hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}

              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#EAEAEA]">

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          <p className="text-[11px] text-[#888] tracking-[0.03em]">
            © 2026 keptalive. All rights reserved.
          </p>

          
        </div>
      </div>
    </footer>
  );
}