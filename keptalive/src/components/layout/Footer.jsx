'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Column 1 - Brand */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-serif mb-4 tracking-wider">ISABELLA</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Elevating your style with premium occasionwear. Where comfort meets sophistication.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/Shopping" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link href="/Journal" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wide">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shipping" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-sm text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/care" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Care Instructions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wide">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-4 py-2 bg-white text-black text-sm focus:outline-none "
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors"
                  aria-label="Subscribe"
                >
                  <Mail size={18} />
                </button>
              </div>
            </form>

            {/* Social Media */}
            <div>
              <h4 className="text-base font-semibold mb-3">Connect</h4>
              <div className="flex flex-wrap gap-3 mb-4">
                <Link
                  href="https://instagram.com/isabella"
                  target="_blank"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="https://facebook.com/isabella"
                  target="_blank"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="https://twitter.com/isabella"
                  target="_blank"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </Link>
                <Link
                  href="https://wa.me/1234567890"
                  target="_blank"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} />
                </Link>
                <Link
                  href="mailto:hello@isabella.com"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </Link>
                <Link
                  href="tel:+1234567890"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  aria-label="Phone"
                >
                  <Phone size={20} />
                </Link>
              </div>
              <p className="text-sm text-gray-400">Follow us for style inspiration and latest updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            {/* Left - Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/exchange-policy" className="hover:text-white transition-colors">
                Exchange Policy
              </Link>
            </div>

            {/* Center - Copyright */}
            <p className="text-center">
              © 2026 kep̃talive. All Rights Reserved
            </p>

            {/* Right - Developer Credit */}
            <p className="text-center md:text-right font-serif">
              Developed by {' '}
              <Link href="https://www.ikrastudio.in/" target='_blank' className="text-white hover:underline">
                iKRA Studio
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}