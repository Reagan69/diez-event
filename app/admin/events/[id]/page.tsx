import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Trash2 } from "lucide-react";
import { db } from "@/src/prisma/db";
import PhotoUploader from "@/components/admin/PhotoUploader";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminEventPage({ params }: Props) {
  const { id } = await params;
  const eventId = Number(id);

  if (!Number.isInteger(eventId)) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-white/40">Identifiant invalide.</p>
        </div>
      </main>
    );
  }

  const events = await db.orm.public.Event
    .select(
      "id",
      "title",
      "slug",
      "description",
      "coverImage"
    )
    .where({
      id: eventId,
    })
    .all();

  const event = events[0];

  if (!event) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-white/40">
            Événement introuvable.
          </p>

          <Link
            href="/admin/events"
            className="mt-6 inline-flex items-center gap-2 text-sm text-[#FFD400]"
          >
            <ArrowLeft size={16} />
            Retour aux événements
          </Link>
        </div>
      </main>
    );
  }

  const photos = await db.orm.public.Photo
    .select(
      "id",
      "url",
      "title",
      "eventId"
    )
    .where({
      eventId: event.id,
    })
    .all();

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* NAVIGATION */}
        <div className="mb-10 flex flex-wrap items-center gap-5">
          <Link
            href="/admin/events"
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/40 transition hover:text-white"
          >
            <ArrowLeft size={15} />
            Événements
          </Link>

          <span className="text-white/10">/</span>

          <Link
            href={`/portfolio/${event.slug}`}
            target="_blank"
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FFD400] transition hover:text-white"
          >
            Voir le portfolio
            <ExternalLink size={14} />
          </Link>
        </div>

        {/* HEADER */}
        <div className="mb-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#FFD400]">
            Gestion de l'événement
          </p>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-5xl font-light sm:text-6xl">
                {event.title}
              </h1>

              <p className="mt-3 text-sm text-white/35">
                /portfolio/{event.slug}
              </p>
            </div>

            <div className="text-sm text-white/40">
              {photos.length} photo
              {photos.length > 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* COVER + UPLOAD */}
        <section className="grid gap-8 lg:grid-cols-[1fr_380px]">

          <div className="border border-white/10 bg-white/[0.02] p-5">
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/30">
              Couverture
            </p>

            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
              />
            </div>
          </div>

          <PhotoUploader
            eventId={event.id}
            />

        </section>

        {/* GALLERY */}
        <section className="mt-16">

          <div className="mb-7 flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
                Galerie
              </p>

              <h2 className="text-3xl font-light">
                Photos de l'événement
              </h2>
            </div>

            <p className="text-xs text-white/30">
              {photos.length} fichier
              {photos.length > 1 ? "s" : ""}
            </p>
          </div>

          {photos.length === 0 ? (
            <div className="border border-white/10 py-24 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-white/30">
                Galerie vide
              </p>

              <p className="mt-3 text-sm text-white/20">
                Ajoutez les premières photos de cet événement.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group border border-white/10 bg-white/[0.02]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={photo.url}
                      alt={photo.title ?? event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-white/70">
                        {photo.title ?? "Sans titre"}
                      </p>

                      <p className="mt-1 text-[10px] uppercase tracking-wider text-white/25">
                        ID {photo.id}
                      </p>
                    </div>

                    <form action="/api/admin/photos/delete" method="POST">
                      <input
                        type="hidden"
                        name="photoId"
                        value={photo.id}
                      />

                      <button
                        type="submit"
                        title="Supprimer"
                        className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/35 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 size={15} />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

      </div>
    </main>
  );
}