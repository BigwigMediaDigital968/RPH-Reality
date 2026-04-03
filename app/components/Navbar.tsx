"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { name: "Buy", href: "/buy" },
  { name: "Rent", href: "/rent" },
  { name: "Off-Plan", href: "/off-plan" },
  { name: "Developers", href: "/developers" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about-us" },
];

export default function Navbar({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <div
              className={`font-display font-semibold tracking-tight transition-colors duration-300 ${scrolled ? "text-navy-900" : "text-white"}`}
            >
              <div className="text-xl lg:text-2xl leading-none">
                FORTUNE ASIA
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`block h-px w-5 transition-colors duration-300 ${scrolled ? "bg-gold-400" : "bg-gold-300"}`}
                />
                <span className="text-xs tracking-[0.25em] font-sans font-medium">
                  REALTY
                </span>
                <span
                  className={`block h-px w-5 transition-colors duration-300 ${scrolled ? "bg-gold-400" : "bg-gold-300"}`}
                />
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-sans font-medium tracking-widest uppercase transition-colors duration-200 relative group ${
                  scrolled
                    ? "text-charcoal-700 hover:text-navy-900"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className={`text-xs font-sans font-semibold tracking-widest uppercase px-5 py-2.5 rounded border transition-all duration-200 ${
                scrolled
                  ? "border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white"
                  : "border-white/50 text-white hover:bg-white/10 hover:border-white"
              }`}
            >
              List Property
            </a>
            <a
              href="#contact"
              className="text-xs font-sans font-semibold tracking-widest uppercase px-5 py-2.5 rounded bg-gold-400 text-navy-900 hover:brightness-105 transition-all duration-200"
            >
              Contact Us
            </a>
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
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-sans font-medium tracking-widest uppercase text-navy-900 py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="#contact"
                  className="text-center text-xs font-sans font-semibold tracking-widest uppercase px-5 py-3 rounded border border-navy-900 text-navy-900"
                >
                  List Property
                </a>
                <a
                  href="#contact"
                  className="text-center text-xs font-sans font-semibold tracking-widest uppercase px-5 py-3 rounded bg-gold-400 text-navy-900"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
