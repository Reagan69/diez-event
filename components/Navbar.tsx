"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "À propos", href: "#about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* LOGO */}
        <Link
          href="/"
          className="relative z-50 h-16 w-16 shrink-0"
        >
          <Image
            src="/logo-diez-event.png"
            alt="Diez Events"
            fill
            priority
            className="object-contain"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-9 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-white/80 transition hover:text-white"
            >
              {item.name}

              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#FFD400] transition-all duration-300 hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <Link
          href="#contact"
          className="hidden items-center gap-3 bg-[#FFD400] px-5 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white lg:flex"
        >
          Demander un devis
          <ArrowRight size={15} />
        </Link>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-11 w-11 items-center justify-center border border-white/20 text-white lg:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`absolute left-0 top-0 min-h-screen w-full bg-[#063B63] px-6 pt-32 transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col">

          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-white/10 py-5 text-2xl font-light text-white"
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-8 flex w-fit items-center gap-3 bg-[#FFD400] px-6 py-4 text-sm font-bold uppercase text-black"
          >
            Demander un devis
            <ArrowRight size={17} />
          </Link>

        </nav>
      </div>
    </header>
  );
}