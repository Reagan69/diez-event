import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505]">

      {/* IMAGE PRINCIPALE */}
      <Image
        src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2400&auto=format&fit=crop"
        alt="Diez Events - Photographie événementielle"
        fill
        priority
        className="object-cover"
      />

      {/* OVERLAY NOIR */}
      <div className="absolute inset-0 bg-black/60" />

      {/* DÉGRADÉ BLEU */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#03182b]/95 via-[#063B63]/45 to-transparent" />

      {/* DÉGRADÉ BAS */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent" />

      {/* LUMIÈRE BLEUE */}
      <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#075A94]/20 blur-[120px]" />

      {/* PETIT ACCENT JAUNE */}
      <div className="absolute right-[12%] top-[32%] hidden h-3 w-3 rounded-full bg-[#FFD400] shadow-[0_0_30px_#FFD400] md:block" />

      {/* CONTENU */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-20 pt-32 lg:px-10 lg:pb-28">

        <div className="w-full">

          {/* SURTITRE */}
          <div className="mb-7 flex items-center gap-4">

            <span className="h-[2px] w-12 bg-[#FFD400]" />

            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/80">
              Diez Events
            </p>

          </div>

          {/* TITRE */}
          <h1 className="max-w-5xl text-5xl font-light leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-[110px]">

            Capturer

            <br />

            <span className="font-semibold text-white">
              l'instant.
            </span>

          </h1>

          {/* DESCRIPTION + CTA */}
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-xl">

              <p className="text-base leading-7 text-white/65 sm:text-lg">
                Nous transformons vos moments les plus précieux
                en images qui racontent votre histoire.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                <Link
                  href="#portfolio"
                  className="group flex w-fit items-center gap-4 bg-[#FFD400] px-7 py-4 text-sm font-bold text-black transition hover:bg-white"
                >
                  Voir notre portfolio

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="#contact"
                  className="flex w-fit items-center gap-3 border border-white/30 px-7 py-4 text-sm font-medium text-white transition hover:border-white hover:bg-white/10"
                >
                  Demander un devis
                </Link>

              </div>

            </div>

            {/* INDEX */}
            <div className="hidden items-end gap-5 lg:flex">

              <div className="text-right">

                <p className="text-3xl font-light">
                  01
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/40">
                  Photography
                </p>

              </div>

              <div className="h-16 w-[1px] bg-[#FFD400]" />

              <div className="text-right">

                <p className="text-sm text-white/40">
                  Events
                </p>

                <p className="mt-1 text-sm text-white/40">
                  Stories
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* SCROLL */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">

        <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">
          Découvrir
        </span>

        <ArrowDown
          size={15}
          className="animate-bounce text-[#FFD400]"
        />

      </div>

    </section>
  );
}