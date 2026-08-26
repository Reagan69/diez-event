import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const links = [
  { name: "Accueil", href: "/" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "À propos", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#03182B] text-white">

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">

          {/* BRAND */}
          <div>

            <Link
              href="/"
              className="relative block h-20 w-20"
            >
              <Image
                src="/logo-diez-event-v2.png"
                alt="Diez Events"
                fill
                className="object-contain"
              />
            </Link>

            <p className="mt-8 max-w-sm text-sm leading-7 text-white/40">
              Nous capturons vos moments, racontons vos histoires
              et transformons vos événements en souvenirs durables.
            </p>

            <Link
              href="#contact"
              className="group mt-8 flex w-fit items-center gap-3 text-sm font-semibold text-[#FFD400]"
            >
              Parlons de votre projet

              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

          </div>

          {/* NAVIGATION */}
          <div>

            <p className="mb-7 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/30">
              Navigation
            </p>

            <nav className="flex flex-col items-start gap-4">

              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  {link.name}
                </Link>
              ))}

            </nav>

          </div>

          {/* CONTACT */}
          <div>

            <p className="mb-7 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/30">
              Contact
            </p>

            <div className="space-y-5">

              <a
                href="tel:+243 977307526"
                className="group flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
              >
                <Phone
                  size={15}
                  className="text-[#FFD400]"
                />

                +243 977 307 526
              </a>

              <a
                href="mailto:contact@diez-events.com"
                className="group flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
              >
                <Mail
                  size={15}
                  className="text-[#FFD400]"
                />

                contact@diez-events.com
              </a>

              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin
                  size={15}
                  className="text-[#FFD400]"
                />

                Kinshasa, RDC
              </div>

            </div>

            {/* SOCIAL */}
            <div className="mt-8 flex gap-3">

              <Link
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border border-white/10 text-xs font-bold transition hover:border-[#FFD400] hover:bg-[#FFD400] hover:text-black"
              >
                IG
              </Link>

              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center border border-white/10 text-sm font-bold transition hover:border-[#FFD400] hover:bg-[#FFD400] hover:text-black"
              >
                f
              </Link>

              <Link
                href="#"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center border border-white/10 text-xs font-bold transition hover:border-[#FFD400] hover:bg-[#FFD400] hover:text-black"
              >
                WA
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">

          <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
            © {new Date().getFullYear()} Diez Events. Tous droits réservés.
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
            Photography • Events • Stories
          </p>

        </div>

      </div>

    </footer>
  );
}