"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#FAF8F3]/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link
            href="/"
            className="font-heading text-2xl lg:text-3xl tracking-[0.15em] text-text mr-12"
          >
            {SITE.name}
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm tracking-widest uppercase text-text/70 hover:text-gold transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${SITE.phone}`}
              className="text-sm tracking-wider text-text/70 hover:text-gold transition-colors ml-4"
            >
              {SITE.phone}
            </a>
            <Link
              href="/#contact"
              className="px-6 py-2.5 text-sm tracking-widest uppercase bg-text text-bg hover:bg-gold hover:text-text transition-all duration-300 ml-8"
            >
              Enquire
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "block w-6 h-[1px] bg-text transition-all duration-300",
                mobileOpen && "rotate-45 translate-y-[3px]"
              )}
            />
            <span
              className={cn(
                "block w-6 h-[1px] bg-text transition-all duration-300",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-6 h-[1px] bg-text transition-all duration-300",
                mobileOpen && "-rotate-45 -translate-y-[3px]"
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-bg/95 backdrop-blur-xl border-t border-border/50"
          >
            <nav className="px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg tracking-widest uppercase text-text/70 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-block text-center px-6 py-3 tracking-widest uppercase bg-text text-bg hover:bg-gold hover:text-text transition-all duration-300"
              >
                Enquire Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
