"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useState } from "react";

type Category = {
  id: number;
  name: string;
};

type EventData = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  date: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  coverImage: string;
  categoryId: number;
};

type Props = {
  event: EventData;
  categories: Category[];
};

export default function EventEditForm({
  event,
  categories,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const initialDate =
    `${event.date.year}-${String(event.date.month).padStart(
      2,
      "0"
    )}-${String(event.date.day).padStart(
      2,
      "0"
    )}T${String(event.date.hour).padStart(
      2,
      "0"
    )}:${String(event.date.minute).padStart(
      2,
      "0"
    )}`;

  async function handleSubmit(
    formEvent: React.FormEvent<HTMLFormElement>
  ) {
    formEvent.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(formEvent.currentTarget);

    const payload = {
      id: event.id,
      title: String(formData.get("title") ?? "").trim(),
      slug: String(formData.get("slug") ?? "").trim(),
      description: String(
        formData.get("description") ?? ""
      ).trim(),
      date: String(formData.get("date") ?? ""),
      coverImage: String(
        formData.get("coverImage") ?? ""
      ).trim(),
      categoryId: Number(formData.get("categoryId")),
    };

    try {
      const response = await fetch(
        "/api/admin/events",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Impossible de modifier l'événement."
        );
      }

      router.push("/admin/events");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet événement ? Les photos associées seront également supprimées."
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(
        "/api/admin/events",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: event.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Impossible de supprimer l'événement."
        );
      }

      router.push("/admin/events");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
      setDeleting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-10">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/admin/events"
          className="mb-10 flex w-fit items-center gap-2 text-xs uppercase tracking-wider text-white/40 transition hover:text-white"
        >
          <ArrowLeft size={15} />
          Événements
        </Link>

        <div className="mb-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#FFD400]">
            Administration
          </p>

          <h1 className="text-5xl font-light">
            Modifier l'événement
          </h1>

          <p className="mt-4 text-sm text-white/35">
            Modifiez les informations de cet événement.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-white/10 bg-white/[0.02] p-6 sm:p-10"
        >
          {error && (
            <div className="mb-8 border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="grid gap-8 sm:grid-cols-2">

            {/* NOM */}
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
              >
                Nom de l'événement
              </label>

              <input
                id="title"
                name="title"
                type="text"
                required
                defaultValue={event.title}
                className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none focus:border-[#FFD400]"
              />
            </div>

            {/* SLUG */}
            <div>
              <label
                htmlFor="slug"
                className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
              >
                Slug
              </label>

              <input
                id="slug"
                name="slug"
                type="text"
                required
                defaultValue={event.slug}
                className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none focus:border-[#FFD400]"
              />

              <p className="mt-2 text-[10px] text-white/20">
                Exemple : john-sarah
              </p>
            </div>

            {/* CATEGORIE */}
            <div>
              <label
                htmlFor="categoryId"
                className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
              >
                Catégorie
              </label>

              <select
                id="categoryId"
                name="categoryId"
                required
                defaultValue={event.categoryId}
                className="w-full border-b border-white/15 bg-[#050505] py-3 text-sm outline-none focus:border-[#FFD400]"
              >
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DATE */}
            <div className="sm:col-span-2">
              <label
                htmlFor="date"
                className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
              >
                Date
              </label>

              <input
                id="date"
                name="date"
                type="datetime-local"
                required
                defaultValue={initialDate}
                className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none focus:border-[#FFD400]"
              />
            </div>

            {/* COVER */}
            <div className="sm:col-span-2">
              <label
                htmlFor="coverImage"
                className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
              >
                Image de couverture
              </label>

              <input
                id="coverImage"
                name="coverImage"
                type="url"
                required
                defaultValue={event.coverImage}
                className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none focus:border-[#FFD400]"
              />

              <p className="mt-2 text-[10px] text-white/20">
                URL de l'image utilisée pour le portfolio.
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={6}
                defaultValue={event.description ?? ""}
                className="w-full resize-none border border-white/10 bg-transparent p-4 text-sm leading-7 outline-none focus:border-[#FFD400]"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">

            <button
              type="submit"
              disabled={loading || deleting}
              className="flex items-center gap-3 bg-[#FFD400] px-7 py-4 text-sm font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={17} />

              {loading
                ? "Enregistrement..."
                : "Enregistrer"}
            </button>

            <button
              type="button"
              disabled={loading || deleting}
              onClick={handleDelete}
              className="flex items-center gap-3 border border-red-500/30 px-7 py-4 text-sm font-medium text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={17} />

              {deleting
                ? "Suppression..."
                : "Supprimer"}
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}