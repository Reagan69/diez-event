import { auth } from "@/auth";
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

    const body = await request.json();

    const eventId = Number(body.eventId);
    const url = String(body.url ?? "").trim();
    const title = String(body.title ?? "").trim();

    if (!Number.isInteger(eventId)) {
      return Response.json(
        { error: "Événement invalide." },
        { status: 400 }
      );
    }

    if (!url) {
      return Response.json(
        { error: "URL de photo manquante." },
        { status: 400 }
      );
    }

    const event = await db.orm.public.Event
      .select("id")
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

    const photo = await db.orm.public.Photo.create({
      url,
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
    console.error("Erreur enregistrement photo :", error);

    return Response.json(
      {
        error: "Impossible d'enregistrer la photo.",
      },
      { status: 500 }
    );
  }
}