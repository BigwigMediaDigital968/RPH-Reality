"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import logo from "../assets/RPH-logo-nav.png"

type NavLink = {
  name: string;
  href?: string;
  isDropdown?: boolean;
  dropdownItems?: { name: string; href: string }[];
};

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  {
    name: "Properties",
    isDropdown: true,
    dropdownItems: [
      { name: "Buy", href: "/buy" },
      { name: "Sell", href: "/sell" },
      { name: "Rent", href: "/rent" },
      { name: "Lease Property", href: "/lease" },
    ],
  },
  { name: "Blogs", href: "/blog" },
];

export default function Navbar({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${scrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-40 h-10 lg:w-48 lg:h-12">
              <Image
                src={logo}
                alt="Royal Prime Homes"
                className={`object-contain w-full h-full ${scrolled ? "" : "invert brightness-0 invert"} `}
                fill
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isDropdown ? (
                <div key={link.name} className="relative group">
                  <span className={`cursor-pointer text-sm font-sans font-medium tracking-widest uppercase transition-colors duration-200 relative ${scrolled ? "text-charcoal-700 hover:text-navy-900" : "text-white/85 hover:text-white"}`}>
                    {link.name}
                  </span>
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full" />

                  {/* Dropdown Menu */}
                  <div className="absolute top-full -left-4 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white shadow-xl rounded-lg py-2 min-w-[200px] border border-gray-100">
                      {link.dropdownItems?.map(item => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-6 py-2.5 text-sm font-sans font-medium text-charcoal-700 hover:text-navy-900 hover:bg-gray-50 transition-colors uppercase tracking-widest"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href!}
                  className={`text-sm font-sans font-medium tracking-widest uppercase transition-colors duration-200 relative group ${scrolled
                    ? "text-charcoal-700 hover:text-navy-900"
                    : "text-white/85 hover:text-white"
                    }`}
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="#contact"
              className={`text-xs font-sans font-semibold tracking-widest uppercase px-5 py-2.5 rounded border transition-all duration-200 ${scrolled
                ? "border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white"
                : "border-white/50 text-white hover:bg-white/10 hover:border-white"
                }`}
            >
              List Property
            </Link>
            <Link
              href="/contact"
              className="text-xs font-sans font-semibold tracking-widest uppercase px-5 py-2.5 rounded bg-gold-400 text-navy-900 hover:brightness-105 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors ${scrolled ? "text-navy-900" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-5 flex flex-col gap-1">
              <span
                className={`block h-px transition-all duration-300 ${scrolled ? "bg-navy-900" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`block h-px transition-all duration-300 ${scrolled ? "bg-navy-900" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px transition-all duration-300 ${scrolled ? "bg-navy-900" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-5 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isDropdown ? (
                  <div key={link.name} className="flex flex-col gap-2">
                    <span className="text-sm font-sans font-semibold tracking-widest uppercase text-navy-900 py-1 border-b border-gray-100">
                      {link.name}
                    </span>
                    <div className="flex flex-col gap-1 pl-4">
                      {link.dropdownItems?.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-sm font-sans font-medium tracking-widest uppercase text-charcoal-600 hover:text-navy-900 py-2"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href!}
                    className="text-sm font-sans font-medium tracking-widest uppercase text-navy-900 py-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="#contact"
                  className="text-center text-xs font-sans font-semibold tracking-widest uppercase px-5 py-3 rounded border border-navy-900 text-navy-900"
                >
                  List Property
                </Link>
                <Link
                  href="#contact"
                  className="text-center text-xs font-sans font-semibold tracking-widest uppercase px-5 py-3 rounded bg-gold-400 text-navy-900"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
