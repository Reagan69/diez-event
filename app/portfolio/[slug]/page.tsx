import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategories, getEvents } from "@/lib/events";
import PortfolioGrid from "@/components/PortfolioGrid";

export default async function PortfolioPage() {
  const [events, categories] = await Promise.all([
    getEvents(),
    getCategories(),
  ]);

  const portfolioEvents = events.map((event) => {
    const category = categories.find(
      (item) => item.id === event.categoryId
    );

    return {
      id: event.id,
      title: event.title,
      slug: event.slug,
      categoryId: event.categoryId,
      categoryName: category?.name ?? "Événement",
      year: event.date.toZonedDateTimeISO(
        "Africa/Kinshasa"
      ).year,
      coverImage: event.coverImage,
    };
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* HEADER */}
      <section className="relative overflow-hidden bg-[#03182B] px-6 pb-20 pt-36 lg:px-10 lg:pb-28 lg:pt-44">
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
          <PortfolioGrid
            events={portfolioEvents}
            categories={categories.map((category) => ({
              id: category.id,
              name: category.name,
            }))}
          />
        </div>
      </section>
    </main>
  );
}