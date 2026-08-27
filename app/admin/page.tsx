import LogoutButton from "@/components/admin/LogoutButton";
import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  FolderOpen,
  ImageIcon,
  Mail,
} from "lucide-react";
import { db } from "@/src/prisma/db";

const cards = [
  {
    title: "Événements",
    description: "Gérer les événements publiés sur le portfolio.",
    href: "/admin/events",
    icon: Camera,
    key: "events",
  },
  {
    title: "Photos",
    description: "Consulter et organiser les photos.",
    href: "/admin/photos",
    icon: ImageIcon,
    key: "photos",
  },
  {
    title: "Catégories",
    description: "Gérer les catégories du portfolio.",
    href: "/admin/categories",
    icon: FolderOpen,
    key: "categories",
  },
  {
    title: "Demandes",
    description: "Consulter les demandes de devis.",
    href: "/admin/messages",
    icon: Mail,
    key: "messages",
  },
];

export default async function AdminDashboard() {
  const [
    events,
    photos,
    categories,
    messages,
    newMessages,
  ] = await Promise.all([
    db.orm.public.Event.select("id").all(),

    db.orm.public.Photo.select("id").all(),

    db.orm.public.Category.select("id").all(),

    db.orm.public.Message.select("id").all(),

    db.orm.public.Message
      .select("id")
      .where({
        status: "NEW",
      })
      .all(),
  ]);

  const stats = {
    events: events.length,
    photos: photos.length,
    categories: categories.length,
    messages: messages.length,
    newMessages: newMessages.length,
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* HEADER */}
      <section className="border-b border-white/10 bg-[#03182B] px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#FFD400]">
            Diez Events
          </p>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div>
              <h1 className="text-5xl font-light sm:text-7xl">
                Dashboard
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/40">
                Gérez les événements, les photos, les catégories et les
                demandes de clients depuis votre espace d'administration.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <Link
                href="/"
                className="flex items-center gap-3 border border-white/15 px-5 py-3 text-xs uppercase tracking-wider text-white/60 transition hover:border-[#FFD400] hover:text-white"
              >
                Voir le site
                <ArrowUpRight size={15} />
              </Link>

              <LogoutButton />

            </div>

          </div>

        </div>
      </section>

      {/* STATISTIQUES */}
      <section className="px-6 pt-10 lg:px-10 lg:pt-16">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">

          <div className="border border-white/10 bg-white/[0.02] p-6">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              Événements
            </p>

            <p className="mt-4 text-4xl font-light">
              {stats.events}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.02] p-6">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              Photos
            </p>

            <p className="mt-4 text-4xl font-light">
              {stats.photos}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.02] p-6">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              Catégories
            </p>

            <p className="mt-4 text-4xl font-light">
              {stats.categories}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.02] p-6">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              Demandes
            </p>

            <p className="mt-4 text-4xl font-light">
              {stats.messages}
            </p>
          </div>

          <div className="border border-[#FFD400]/20 bg-[#FFD400]/[0.04] p-6">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#FFD400]/70">
              Nouvelles
            </p>

            <p className="mt-4 text-4xl font-light text-[#FFD400]">
              {stats.newMessages}
            </p>
          </div>

        </div>
      </section>

      {/* CARDS */}
      <section className="px-6 py-12 lg:px-10 lg:py-20">

        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">

          {cards.map((card) => {
            const Icon = card.icon;

            const count =
              stats[card.key as keyof typeof stats];

            return (
              <Link
                key={card.title}
                href={card.href}
                className="group border border-white/10 bg-white/[0.02] p-8 transition hover:border-[#075A94] hover:bg-[#075A94]/10"
              >

                <div className="flex items-start justify-between gap-8">

                  <div>

                    <div className="mb-7 flex h-12 w-12 items-center justify-center border border-white/10 transition group-hover:border-[#FFD400] group-hover:bg-[#FFD400] group-hover:text-black">
                      <Icon size={20} />
                    </div>

                    <h2 className="text-2xl font-light">
                      {card.title}
                    </h2>

                    <p className="mt-3 max-w-sm text-sm leading-7 text-white/40">
                      {card.description}
                    </p>

                  </div>

                  <div className="flex flex-col items-end gap-5">

                    <span className="text-3xl font-light text-white/80">
                      {count}
                    </span>

                    <ArrowUpRight
                      size={20}
                      className="text-white/30 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FFD400]"
                    />

                  </div>

                </div>

              </Link>
            );
          })}

        </div>

      </section>

    </main>
  );
}