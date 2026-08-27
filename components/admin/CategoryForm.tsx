"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

type Props = {
  category?: {
    id: number;
    name: string;
    slug: string;
  };
};

export default function CategoryForm({ category }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(category);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      id: category?.id,
      name: String(formData.get("name") ?? "").trim(),
      slug: String(formData.get("slug") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/admin/categories", {
        method: isEdit ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Impossible d'enregistrer la catégorie."
        );
      }

      router.push("/admin/categories");
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

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-10">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/admin/categories"
          className="mb-10 flex w-fit items-center gap-2 text-xs uppercase tracking-wider text-white/40 hover:text-white"
        >
          <ArrowLeft size={15} />
          Catégories
        </Link>

        <div className="mb-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#FFD400]">
            Administration
          </p>

          <h1 className="text-5xl font-light">
            {isEdit
              ? "Modifier la catégorie"
              : "Nouvelle catégorie"}
          </h1>
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

          <div className="space-y-8">

            <div>
              <label className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35">
                Nom
              </label>

              <input
                name="name"
                required
                defaultValue={category?.name ?? ""}
                placeholder="Ex. Mariages"
                className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none placeholder:text-white/20 focus:border-[#FFD400]"
              />
            </div>

            <div>
              <label className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35">
                Slug
              </label>

              <input
                name="slug"
                required
                defaultValue={category?.slug ?? ""}
                placeholder="ex. mariages"
                className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none placeholder:text-white/20 focus:border-[#FFD400]"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-10 flex items-center gap-3 bg-[#FFD400] px-7 py-4 text-sm font-semibold text-black disabled:opacity-50"
          >
            <Save size={17} />
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      </div>
    </main>
  );
}