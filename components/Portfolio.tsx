import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getEvents } from "@/lib/events";

const categories = [
  "Tous",
  "Mariages",
  "Événements",
  "Corporate",
  "Portraits",
];

function getCategoryName(categoryId: number) {
  const categories: Record<number, string> = {
    1: "Mariages",
    2: "Événements",
    3: "Corporate",
    4: "Portraits",
  };

  return categories[categoryId] ?? "Événement";
}

export default async function PortfolioPage() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* HEADER */}
      <section className="relative overflow-hidden bg-[#03182B] px-6 pb-20 pt-36 lg:px-10 lg:pb-28 lg:pt-44">

        {/* BLUE LIGHT */}
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#075A94]/20 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl">

          <Link
            href="/"
            className="mb-12 flex w-fit items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/40 transition hover:text-white"
          >
            <ArrowLeft size={15} />
            Retour à l'accueil
          </Link>

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

            <div>

              <div className="mb-6 flex items-center gap-3">

                <span className="h-[2px] w-10 bg-[#FFD400]" />

                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#FFD400]">
                  Portfolio
                </p>

              </div>

              <h1 className="text-6xl font-light leading-[0.9] sm:text-8xl lg:text-[110px]">
                Nos
                <br />
                <span className="text-white/30">
                  histoires.
                </span>
              </h1>

            </div>

            <p className="max-w-md text-sm leading-7 text-white/40 lg:text-right">
              Une sélection de projets, d'événements et de moments
              capturés par Diez Events.
            </p>

          </div>

        </div>

      </section>

      {/* PORTFOLIO */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">

        <div className="mx-auto max-w-7xl">

          {/* CATEGORIES */}
          <div className="mb-14 flex flex-wrap gap-3">

            {categories.map((category, index) => (
              <button
                key={category}
                className={`border px-5 py-3 text-xs font-medium uppercase tracking-wider transition ${
                  index === 0
                    ? "border-[#FFD400] bg-[#FFD400] text-black"
                    : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}

          </div>

          {/* EVENTS GRID */}

          {events.length === 0 ? (

            <div className="border border-white/10 py-24 text-center">

              <p className="text-sm uppercase tracking-[0.25em] text-white/30">
                Aucun événement
              </p>

              <p className="mt-3 text-sm text-white/20">
                Les prochains projets de Diez Events apparaîtront ici.
              </p>

            </div>

          ) : (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {events.map((event) => (

                <Link
                  key={event.id}
                  href={`/portfolio/${event.slug}`}
                  className="group"
                >

                  <div className="relative aspect-[4/5] overflow-hidden">

                    <Image
                      src={event.coverImage}
                      alt={event.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6">

                      <div className="flex items-end justify-between gap-5">

                        <div>

                          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#FFD400]">
                            {getCategoryName(event.categoryId)}
                          </p>

                          <h2 className="text-2xl font-light">
                            {event.title}
                          </h2>

                          <p className="mt-2 text-xs text-white/40">
                            {event.date.toZonedDateTimeISO("Africa/Kinshasa").year}
                            </p>

                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 transition group-hover:border-[#FFD400] group-hover:bg-[#FFD400] group-hover:text-black">

                          <ArrowUpRight size={17} />

                        </div>

                      </div>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}