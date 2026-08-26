import { notFound } from "next/navigation";
import EventEditForm from "@/components/admin/EventEditForm";
import { db } from "@/src/prisma/db";
import { getCategories } from "@/lib/events";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditEventPage({
  params,
}: Props) {
  const { id } = await params;
  const eventId = Number(id);

  if (!Number.isInteger(eventId)) {
    notFound();
  }

  const [events, categories] = await Promise.all([
    db.orm.public.Event
      .select(
        "id",
        "title",
        "slug",
        "description",
        "date",
        "coverImage",
        "categoryId"
      )
      .where({ id: eventId })
      .all(),
    getCategories(),
  ]);

  const event = events[0];

  if (!event) {
    notFound();
  }

  return (
    <EventEditForm
      event={event}
      categories={categories}
    />
  );
}