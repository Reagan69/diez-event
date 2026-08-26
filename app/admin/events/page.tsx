import Link from "next/link";
import { ArrowLeft, Plus, Pencil, ExternalLink } from "lucide-react";
import { getCategories, getEvents } from "@/lib/events";

export default async function AdminEventsPage() {
  const [events, categories] = await Promise.all([
    getEvents(),
    getCategories(),
  ]);

  const categoryMap = new Map(
    categories.map((category) => [category.id, category.name])
  );

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* RETOUR */}
        <Link
          href="/admin"
          className="mb-10 flex w-fit items-center gap-2 text-xs uppercase tracking-wider text-white/40 transition hover:text-white"
        >
          <ArrowLeft size={15} />
          Dashboard
        </Link>

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#FFD400]">
              Administration
            </p>

            <h1 className="text-5xl font-light">
              Événements
            </h1>

            <p className="mt-4 text-sm text-white/40">
              {events.length} événement
              {events.length > 1 ? "s" : ""} enregistré
              {events.length > 1 ? "s" : ""}.
            </p>
          </div>

          <Link
            href="/admin/events/new"
            className="flex w-fit items-center gap-3 bg-[#FFD400] px-5 py-3 text-sm font-semibold text-black transition hover:bg-white"
          >
            <Plus size={17} />
            Nouvel événement
          </Link>
        </div>

        {/* TABLE */}
        <div className="mt-12 overflow-hidden border border-white/10">

          {events.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-sm text-white/30">
                Aucun événement enregistré.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">

                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] text-left">

                    <th className="px-6 py-4 text-[10px] uppercase tracking-[0.25em] text-white/30">
                      Événement
                    </th>

                    <th className="px-6 py-4 text-[10px] uppercase tracking-[0.25em] text-white/30">
                      Catégorie
                    </th>

                    <th className="px-6 py-4 text-[10px] uppercase tracking-[0.25em] text-white/30">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right text-[10px] uppercase tracking-[0.25em] text-white/30">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {events.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b border-white/10 transition hover:bg-white/[0.02]"
                    >

                      {/* EVENT */}
                      <td className="px-6 py-5">

                        <p className="font-light">
                          {event.title}
                        </p>

                        <p className="mt-1 text-xs text-white/30">
                          /portfolio/{event.slug}
                        </p>

                      </td>

                      {/* CATEGORY */}
                      <td className="px-6 py-5 text-sm text-white/50">
                        {categoryMap.get(event.categoryId) ??
                          "Non classé"}
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-5 text-sm text-white/50">
                        {event.date
                          .toZonedDateTimeISO("Africa/Kinshasa")
                          .year}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-4">

                          <Link
                            href={`/admin/events/${event.id}/edit`}
                            className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/50 transition hover:text-white"
                          >
                            <Pencil size={14} />
                            Modifier
                          </Link>

                          <Link
                            href={`/portfolio/${event.slug}`}
                            className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FFD400] transition hover:text-white"
                          >
                            <ExternalLink size={14} />
                            Voir
                          </Link>

                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}