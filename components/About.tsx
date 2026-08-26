import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

const values = [
  "Un regard authentique",
  "Une approche personnalisée",
  "Une attention aux détails",
  "Des souvenirs qui durent",
];

export default function About() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-[#063B63] px-6 py-28 text-white lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">

        {/* TOP */}
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">

          {/* IMAGE */}
          <div className="relative min-h-[550px] overflow-hidden lg:min-h-[700px]">

            <Image
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1800&auto=format&fit=crop"
              alt="Photographe Diez Events"
              fill
              className="object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#063B63]/70 via-transparent to-transparent" />

            {/* BADGE */}
            <div className="absolute bottom-8 left-8 border border-white/20 bg-black/20 px-6 py-5 backdrop-blur-md">

              <p className="text-3xl font-light">
                Diez
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.35em] text-white/50">
                Photography & Events
              </p>

            </div>

          </div>

          {/* CONTENT */}
          <div>

            <div className="mb-6 flex items-center gap-3">

              <span className="h-[2px] w-10 bg-[#FFD400]" />

              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#FFD400]">
                À propos
              </p>

            </div>

            <h2 className="text-4xl font-light leading-[1.05] sm:text-6xl lg:text-7xl">
              Plus qu'une
              <br />
              <span className="text-white/40">
                photographie.
              </span>
            </h2>

            <div className="mt-10 max-w-xl space-y-6">

              <p className="text-base leading-8 text-white/70">
                Chez Diez Events, nous croyons qu'une photographie ne
                doit pas seulement montrer un moment. Elle doit permettre
                de le ressentir à nouveau.
              </p>

              <p className="text-base leading-8 text-white/50">
                Chaque événement possède son atmosphère, ses émotions
                et ses détails. Notre rôle est de les observer, de les
                comprendre et de les transformer en images intemporelles.
              </p>

            </div>

            {/* VALUES */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              {values.map((value) => (

                <div
                  key={value}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFD400] text-black">
                    <Check size={14} />
                  </span>

                  <span className="text-sm text-white/70">
                    {value}
                  </span>

                </div>

              ))}

            </div>

            {/* CTA */}
            <Link
              href="#contact"
              className="group mt-12 flex w-fit items-center gap-4 border border-white/25 px-7 py-4 text-sm font-medium transition hover:border-[#FFD400] hover:bg-[#FFD400] hover:text-black"
            >
              Découvrir notre histoire

              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />

            </Link>

          </div>

        </div>

        {/* STATS */}
        <div className="mt-24 grid border-y border-white/10 sm:grid-cols-3">

          <div className="border-b border-white/10 py-10 sm:border-b-0 sm:border-r sm:border-white/10 sm:px-10">
            <p className="text-5xl font-light">
              100+
            </p>

            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
              Événements couverts
            </p>
          </div>

          <div className="border-b border-white/10 py-10 sm:border-b-0 sm:border-r sm:border-white/10 sm:px-10">
            <p className="text-5xl font-light">
              5+
            </p>

            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
              Années d'expérience
            </p>
          </div>

          <div className="py-10 sm:px-10">
            <p className="text-5xl font-light">
              ∞
            </p>

            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
              Histoires à raconter
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}