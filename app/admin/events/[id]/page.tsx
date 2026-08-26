import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { db } from "@/src/prisma/db";

type AdminEventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminEventPage({
  params,
}: AdminEventPageProps) {
  const { id } = await params;
  const eventId = Number(id);

  if (!Number.isInteger(eventId)) {
    return <div>Événement invalide.</div>;
  }

  const events = await db.orm.public.Event
    .select(
      "id",
      "title",
      "slug",
      "coverImage"
    )
    .where({
      id: eventId,
    })
    .all();

  const event = events[0];

  if (!event) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
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

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-10">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/admin/events"
          className="mb-10 flex w-fit items-center gap-2 text-xs uppercase tracking-wider text-white/40 hover:text-white"
        >
          <ArrowLeft size={15} />
          Événements
        </Link>

        <div className="mb-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#FFD400]">
            Administration
          </p>

          <h1 className="text-5xl font-light">
            {event.title}
          </h1>

          <p className="mt-3 text-sm text-white/35">
            /portfolio/{event.slug}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

          <section>
            <div className="border border-white/10 p-6">
              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/30">
                Image de couverture
              </p>

              <img
                src={event.coverImage}
                alt={event.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </section>

          <aside>
            <PhotoUploader eventId={event.id} />
          </aside>

        </div>

      </div>
    </main>
  );
}