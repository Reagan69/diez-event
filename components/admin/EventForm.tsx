"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

type Category = {
  id: number;
  name: string;
};

type EventFormProps = {
  categories: Category[];
};

export default function EventForm({
  categories,
}: EventFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      date: formData.get("date"),
      coverImage: formData.get("coverImage"),
      categoryId: Number(formData.get("categoryId")),
    };

    try {
      const response = await fetch("/api/admin/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Une erreur est survenue."
        );
      }

      router.push("/admin/events");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Impossible de créer l'événement."
      );
    } finally {
      setLoading(false);
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
            Nouvel événement
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
            Ajoutez un nouvel événement au portfolio de Diez Events.
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

            {/* TITLE */}
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
                placeholder="Ex. John & Sarah"
                className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none placeholder:text-white/20 focus:border-[#FFD400]"
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
                placeholder="john-sarah"
                className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none placeholder:text-white/20 focus:border-[#FFD400]"
              />
            </div>

            {/* CATEGORY */}
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
                defaultValue=""
                className="w-full border-b border-white/15 bg-[#050505] py-3 text-sm outline-none focus:border-[#FFD400]"
              >
                <option value="" disabled>
                  Sélectionner une catégorie
                </option>

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
            <div>
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
                className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none focus:border-[#FFD400]"
              />
            </div>

            {/* COVER */}
            <div>
              <label
                htmlFor="coverImage"
                className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
              >
                URL de l'image de couverture
              </label>

              <input
                id="coverImage"
                name="coverImage"
                type="url"
                required
                placeholder="https://..."
                className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none placeholder:text-white/20 focus:border-[#FFD400]"
              />
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
                rows={5}
                placeholder="Décrivez l'événement..."
                className="w-full resize-none border-b border-white/15 bg-transparent py-3 text-sm leading-7 outline-none placeholder:text-white/20 focus:border-[#FFD400]"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-10 flex items-center justify-center gap-3 bg-[#FFD400] px-7 py-4 text-sm font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} />

            {loading
              ? "Enregistrement..."
              : "Créer l'événement"}
          </button>

        </form>
      </div>
    </main>
  );
}