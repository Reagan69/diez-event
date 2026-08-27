import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db } from "@/src/prisma/db";
import MessageActions from "@/components/admin/MessageActions";

export default async function AdminMessagesPage() {
  const messages = await db.orm.public.Message
    .select(
      "id",
      "name",
      "email",
      "phone",
      "eventType",
      "eventDate",
      "budget",
      "message",
      "status",
      "createdAt"
    )
    .all();

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
        <div className="mb-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#FFD400]">
            Administration
          </p>

          <h1 className="text-5xl font-light">
            Demandes de devis
          </h1>

          <p className="mt-4 text-sm text-white/40">
            {messages.length} demande
            {messages.length > 1 ? "s" : ""} reçue
            {messages.length > 1 ? "s" : ""}.
          </p>
        </div>

        {/* MESSAGES */}
        {messages.length === 0 ? (
          <div className="border border-white/10 p-16 text-center">
            <p className="text-sm text-white/30">
              Aucune demande pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">

            {messages.map((item) => (
              <article
                key={item.id}
                className="border border-white/10 bg-white/[0.02] p-7"
              >

                {/* CLIENT */}
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xl font-light">
                      {item.name}
                    </p>

                    <a
                      href={`mailto:${item.email}`}
                      className="mt-1 block text-sm text-white/35 transition hover:text-white"
                    >
                      {item.email}
                    </a>
                  </div>

                  <span
                    className={`border px-3 py-1 text-[9px] uppercase tracking-[0.2em] ${
                      item.status === "DONE"
                        ? "border-green-500/30 text-green-300"
                        : item.status === "IN_PROGRESS"
                          ? "border-blue-500/30 text-blue-300"
                          : "border-[#FFD400]/30 text-[#FFD400]"
                    }`}
                  >
                    {item.status === "NEW"
                      ? "Nouveau"
                      : item.status === "IN_PROGRESS"
                        ? "En cours"
                        : "Traité"}
                  </span>
                </div>

                {/* INFORMATIONS */}
                <div className="mt-7 grid gap-5 sm:grid-cols-2">

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                      Événement
                    </p>

                    <p className="mt-2 text-sm text-white/70">
                      {item.eventType}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                      Téléphone
                    </p>

                    {item.phone ? (
                      <a
                        href={`tel:${item.phone}`}
                        className="mt-2 block text-sm text-white/70 hover:text-white"
                      >
                        {item.phone}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm text-white/30">
                        Non renseigné
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                      Date
                    </p>

                    <p className="mt-2 text-sm text-white/70">
                      {item.eventDate
                        ? item.eventDate
                            .toZonedDateTimeISO(
                              "Africa/Kinshasa"
                            )
                            .toPlainDate()
                            .toString()
                        : "Non renseignée"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                      Budget
                    </p>

                    <p className="mt-2 text-sm text-white/70">
                      {item.budget ?? "Non renseigné"}
                    </p>
                  </div>

                </div>

                {/* MESSAGE */}
                <div className="mt-7 border-t border-white/10 pt-6">

                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                    Projet
                  </p>

                  <p className="mt-3 text-sm leading-7 text-white/55">
                    {item.message}
                  </p>

                </div>

                {/* CONTACT */}
                <div className="mt-7 flex flex-wrap items-center gap-4">

                  <a
                    href={`mailto:${item.email}`}
                    className="text-xs uppercase tracking-[0.2em] text-[#FFD400] transition hover:text-white"
                  >
                    Répondre par email
                  </a>

                  {item.phone && (
                    <a
                      href={`tel:${item.phone}`}
                      className="text-xs uppercase tracking-[0.2em] text-white/40 transition hover:text-white"
                    >
                      Appeler
                    </a>
                  )}

                </div>

                {/* ACTIONS */}
                <MessageActions
                  messageId={item.id}
                  currentStatus={item.status}
                />

              </article>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}