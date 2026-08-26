import { db } from "@/src/prisma/db";

export async function getEvents() {
  return db.orm.public.Event
    .select(
      "id",
      "title",
      "slug",
      "description",
      "date",
      "coverImage",
      "categoryId"
    )
    .all();
}

export async function getEventBySlug(slug: string) {
  const events = await db.orm.public.Event
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
      slug,
    })
    .all();

  const event = events[0];

  if (!event) {
    return null;
  }

  const photos = await db.orm.public.Photo
    .select(
      "id",
      "url",
      "title",
      "eventId"
    )
    .where({
      eventId: event.id,
    })
    .all();

  return {
    ...event,
    photos,
  };
}

export async function getCategories() {
  return db.orm.public.Category
    .select(
      "id",
      "name",
      "slug"
    )
    .all();
}