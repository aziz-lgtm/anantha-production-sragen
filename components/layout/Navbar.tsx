"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Owl from "@/public/owl-new.png";

// NOTE: you also had `import { navbar } from "@/data/navbar"` in the
// original file, but it was never used -- NAV_ITEMS below is what
// actually renders. If data/navbar.ts already holds this same list,
// tell me its shape and I'll wire this component to read from there
// instead of the hardcoded array, to match the rest of the project's
// data-file pattern.
const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "our-team", label: "Our Team" },
  { id: "contact", label: "Contact" },
  { id: "blog", label: "Blog" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActive(id);
    setMenuOpen(false);

    // BUG FIX: this was document.getElementById('id') -- the literal
    // string "id", not the id argument passed in. Every click was
    // looking for an element named exactly id="id", which doesn't
    // exist, so el was always null and nothing ever scrolled.
    const el = document.getElementById(id);
    if (!el) return;

    const navbarOffset = 96;
    const y = el.getBoundingClientRect().top + window.scrollY - navbarOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    // BUG FIX: z-100 isn't a real Tailwind class (the default scale
    // stops at z-50) -- it silently did nothing, so the navbar had no
    // explicit stacking order. Needs the arbitrary-value syntax z-[100].
    // Also added inset-x-0 + flex justify-center so this actually
    // centers itself instead of just sticking to the left edge, which
    // is what "self-center" on a fixed element does (self-center only
    // works on a flex/grid child, and a fixed element isn't one).
    <header className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4">
      <nav className="relative flex w-full max-w-[1200px] items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-6 py-3 backdrop-blur-lg">
        {/* logo + wordmark */}
        <div className="flex items-center gap-3">
          <Image src={Owl} width={64} height={64} alt="Owl Logo" priority />
          <div className="flex flex-col justify-center leading-none">
            <span
              className="text-2xl text-white md:text-3xl"
              style={{ fontFamily: "'Afacad Flux', sans-serif" }}
            >
              ANANTHA
            </span>
            <span
              className="-mt-1 text-xs tracking-[0.15em] text-white/80 md:text-sm"
              style={{ fontFamily: "'Afacad Flux', sans-serif" }}
            >
              -PRODUCTION-
            </span>
          </div>
        </div>

        {/* desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-colors duration-200 ${
                active === item.id ? "text-[#e8c77a]" : "text-white/80 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* mobile menu toggle -- menuOpen was declared in your original
            file but never actually used anywhere; this is what makes it
            do something */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* mobile dropdown */}
        {menuOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#0b1410]/95 p-4 backdrop-blur-lg md:hidden">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200 ${
                  active === item.id
                    ? "bg-white/10 text-[#e8c77a]"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}