import { notFound } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import { db } from "@/src/prisma/db";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCategoryPage({
  params,
}: Props) {
  const { id } = await params;
  const categoryId = Number(id);

  if (!Number.isInteger(categoryId)) {
    notFound();
  }

  const categories = await db.orm.public.Category
    .select(
      "id",
      "name",
      "slug"
    )
    .where({
      id: categoryId,
    })
    .all();

  const category = categories[0];

  if (!category) {
    notFound();
  }

  return <CategoryForm category={category} />;
}