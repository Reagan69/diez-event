import Link from "next/link";
import { ArrowLeft, Camera, ExternalLink } from "lucide-react";
import { getCategories, getEvents } from "@/lib/events";
import { db } from "@/src/prisma/db";

export default async function AdminPhotosPage() {
  const [events, categories, photos] = await Promise.all([
    getEvents(),
    getCategories(),
    db.orm.public.Photo
      .select("id", "eventId")
      .all(),
  ]);

  const categoryMap = new Map(
    categories.map((category) => [
      category.id,
      category.name,
    ])
  );

  const photoCountMap = new Map<number, number>();

  for (const photo of photos) {
    photoCountMap.set(
      photo.eventId,
      (photoCountMap.get(photo.eventId) ?? 0) + 1
    );
  }

  const activeGalleries = events.filter(
    (event) =>
      (photoCountMap.get(event.id) ?? 0) > 0
  ).length;

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">

        <Link
          href="/admin"
          className="mb-10 flex w-fit items-center gap-2 text-xs uppercase tracking-wider text-white/40 transition hover:text-white"
        >
          <ArrowLeft size={15} />
          Dashboard
        </Link>

        <div className="mb-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#FFD400]">
            Administration
          </p>

          <h1 className="text-5xl font-light">
            Galerie photos
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
            Gérez les photos associées à chacun de vos événements.
          </p>
        </div>

        {/* STATISTIQUES */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="border border-white/10 bg-white/[0.02] p-6">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              Galeries
            </p>

            <p className="mt-4 text-4xl font-light">
              {events.length}
            </p>

            <p className="mt-2 text-xs text-white/25">
              événements
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.02] p-6">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              Photos
            </p>

            <p className="mt-4 text-4xl font-light">
              {photos.length}
            </p>

            <p className="mt-2 text-xs text-white/25">
              fichiers enregistrés
            </p>
          </div>

          <div className="border border-[#FFD400]/20 bg-[#FFD400]/[0.04] p-6">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#FFD400]/70">
              Galeries actives
            </p>

            <p className="mt-4 text-4xl font-light text-[#FFD400]">
              {activeGalleries}
            </p>

            <p className="mt-2 text-xs text-white/25">
              avec au moins une photo
            </p>
          </div>

        </div>

        {/* LISTE DES GALERIES */}
        {events.length === 0 ? (
          <div className="border border-white/10 p-16 text-center">
            <p className="text-sm text-white/30">
              Aucun événement disponible.
            </p>

            <Link
              href="/admin/events/new"
              className="mt-6 inline-flex items-center gap-2 bg-[#FFD400] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-black"
            >
              Créer un événement
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {events.map((event) => {
              const photoCount =
                photoCountMap.get(event.id) ?? 0;

              return (
                <article
                  key={event.id}
                  className="group overflow-hidden border border-white/10 bg-white/[0.02]"
                >

                  {/* COUVERTURE */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-14">
                      <span className="inline-block border border-white/20 bg-black/30 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-white/70">
                        {categoryMap.get(event.categoryId) ??
                          "Sans catégorie"}
                      </span>
                    </div>
                  </div>

                  {/* INFORMATIONS */}
                  <div className="p-6">

                    <div className="flex items-start justify-between gap-5">

                      <div>
                        <h2 className="text-2xl font-light">
                          {event.title}
                        </h2>

                        <p className="mt-2 text-xs text-white/30">
                          /portfolio/{event.slug}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 text-white/35">
                        <Camera size={15} />

                        <span className="text-sm">
                          {photoCount}
                        </span>
                      </div>

                    </div>

                    <div className="mt-7 flex gap-3">

                      <Link
                        href={`/admin/events/${event.id}`}
                        className="flex flex-1 items-center justify-center bg-[#FFD400] px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-black transition hover:bg-white"
                      >
                        Gérer la galerie
                      </Link>

                      <Link
                        href={`/portfolio/${event.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center border border-white/10 px-4 py-3 text-white/40 transition hover:border-[#FFD400] hover:text-white"
                        title="Voir le portfolio"
                      >
                        <ExternalLink size={15} />
                      </Link>

                    </div>

                  </div>
                </article>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}