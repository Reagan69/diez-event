import { auth } from "@/auth";
import { db } from "@/src/prisma/db";
import { del } from "@vercel/blob";

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
    const photoId = Number(formData.get("photoId"));

    if (!Number.isInteger(photoId)) {
      return Response.json(
        { error: "Photo invalide." },
        { status: 400 }
      );
    }

    const photos = await db.orm.public.Photo
      .select(
        "id",
        "url"
      )
      .where({
        id: photoId,
      })
      .all();

    const photo = photos[0];

    if (!photo) {
      return Response.json(
        { error: "Photo introuvable." },
        { status: 404 }
      );
    }

    await del(photo.url);

    await db.orm.public.Photo
      .where({
        id: photoId,
      })
      .delete();

    return Response.redirect(
      new URL(
        request.headers.get("referer") ?? "/admin/events",
        request.url
      )
    );
  } catch (error) {
    console.error("Erreur suppression photo :", error);

    return Response.json(
      { error: "Impossible de supprimer la photo." },
      { status: 500 }
    );
  }
}