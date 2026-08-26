import { auth } from "@/auth";
import { put } from "@vercel/blob";
import { db } from "@/src/prisma/db";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return Response.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const file = formData.get("file");
    const eventId = Number(formData.get("eventId"));
    const title = String(formData.get("title") ?? "").trim();

    if (!(file instanceof File)) {
      return Response.json(
        { error: "Aucun fichier image." },
        { status: 400 }
      );
    }

    if (!Number.isInteger(eventId)) {
      return Response.json(
        { error: "Événement invalide." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return Response.json(
        { error: "Le fichier doit être une image." },
        { status: 400 }
      );
    }

    const event = await db.orm.public.Event
      .select("id", "slug")
      .where({
        id: eventId,
      })
      .all();

    if (event.length === 0) {
      return Response.json(
        { error: "Événement introuvable." },
        { status: 404 }
      );
    }

    const filename = `events/${event[0].slug}/${Date.now()}-${file.name}`;

    const blob = await put(filename, file, {
      access: "public",
    });

    const photo = await db.orm.public.Photo.create({
      url: blob.url,
      title: title || null,
      eventId,
    });

    return Response.json(
      {
        success: true,
        photo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur upload photo :", error);

    return Response.json(
      {
        error: "Impossible d'envoyer la photo.",
      },
      { status: 500 }
    );
  }
}