import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { getCategories } from "@/lib/events";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-10">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/admin"
          className="mb-10 flex w-fit items-center gap-2 text-xs uppercase tracking-wider text-white/40 transition hover:text-white"
        >
          <ArrowLeft size={15} />
          Dashboard
        </Link>

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#FFD400]">
              Administration
            </p>

            <h1 className="text-5xl font-light">
              Catégories
            </h1>

            <p className="mt-4 text-sm text-white/40">
              {categories.length} catégorie
              {categories.length > 1 ? "s" : ""} enregistrée
              {categories.length > 1 ? "s" : ""}.
            </p>
          </div>

          <Link
            href="/admin/categories/new"
            className="flex w-fit items-center gap-3 bg-[#FFD400] px-5 py-3 text-sm font-semibold text-black transition hover:bg-white"
          >
            <Plus size={17} />
            Nouvelle catégorie
          </Link>
        </div>

        <div className="mt-12 overflow-hidden border border-white/10">
          {categories.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-sm text-white/30">
                Aucune catégorie enregistrée.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] text-left">
                    <th className="px-6 py-4 text-[10px] uppercase tracking-[0.25em] text-white/30">
                      Nom
                    </th>

                    <th className="px-6 py-4 text-[10px] uppercase tracking-[0.25em] text-white/30">
                      Slug
                    </th>

                    <th className="px-6 py-4 text-right text-[10px] uppercase tracking-[0.25em] text-white/30">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-white/10 transition hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-5 font-light">
                        {category.name}
                      </td>

                      <td className="px-6 py-5 text-sm text-white/40">
                        {category.slug}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <Link
                          href={`/admin/categories/${category.id}/edit`}
                          className="text-xs uppercase tracking-wider text-[#FFD400] hover:text-white"
                        >
                          Modifier
                        </Link>
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