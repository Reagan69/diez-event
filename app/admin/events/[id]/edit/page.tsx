import { notFound } from "next/navigation";
import EventEditForm from "@/components/admin/EventEditForm";
import { getCategories } from "@/lib/events";
import { db } from "@/src/prisma/db";

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
      .where({
        id: eventId,
      })
      .all(),

    getCategories(),
  ]);

  const event = events[0];

  if (!event) {
    notFound();
  }

  const zonedDate = event.date.toZonedDateTimeISO(
    "Africa/Kinshasa"
  );

  const eventForClient = {
    id: event.id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    date: {
      year: zonedDate.year,
      month: zonedDate.month,
      day: zonedDate.day,
      hour: zonedDate.hour,
      minute: zonedDate.minute,
    },
    coverImage: event.coverImage,
    categoryId: event.categoryId,
  };

  return (
    <EventEditForm
      event={eventForClient}
      categories={categories}
    />
  );
}