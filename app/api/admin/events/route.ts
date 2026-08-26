import { auth } from "@/auth";
import { db } from "@/src/prisma/db";
import { Temporal } from "@js-temporal/polyfill";

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

    const title = String(body.title ?? "").trim();
    const slug = String(body.slug ?? "").trim();
    const description = body.description
      ? String(body.description).trim()
      : null;
    const coverImage = String(body.coverImage ?? "").trim();
    const categoryId = Number(body.categoryId);
    const date = String(body.date ?? "").trim();

    if (!title || !slug || !coverImage || !date) {
      return Response.json(
        {
          error:
            "Le titre, le slug, la date et l'image de couverture sont obligatoires.",
        },
        { status: 400 }
      );
    }

    if (!Number.isInteger(categoryId)) {
      return Response.json(
        { error: "La catégorie est invalide." },
        { status: 400 }
      );
    }

    const category = await db.orm.public.Category
      .select("id")
      .where({ id: categoryId })
      .all();

    if (category.length === 0) {
      return Response.json(
        { error: "La catégorie sélectionnée n'existe pas." },
        { status: 400 }
      );
    }

    const existingEvent = await db.orm.public.Event
      .select("id")
      .where({ slug })
      .all();

    if (existingEvent.length > 0) {
      return Response.json(
        { error: "Un événement utilise déjà ce slug." },
        { status: 409 }
      );
    }

    const created = await db.orm.public.Event.create({
      title,
      slug,
      description,
      date: Temporal.Instant.from(
        new Date(date).toISOString()
      ) as never,
      coverImage,
      categoryId,
    });

    return Response.json(
      {
        success: true,
        event: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur création événement :", error);

    return Response.json(
      { error: "Impossible de créer l'événement." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return Response.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const id = Number(body.id);
    const title = String(body.title ?? "").trim();
    const slug = String(body.slug ?? "").trim();
    const description = body.description
      ? String(body.description).trim()
      : null;
    const coverImage = String(body.coverImage ?? "").trim();
    const categoryId = Number(body.categoryId);
    const date = String(body.date ?? "").trim();

    if (!Number.isInteger(id)) {
      return Response.json(
        { error: "Identifiant invalide." },
        { status: 400 }
      );
    }

    if (!title || !slug || !coverImage || !date) {
      return Response.json(
        {
          error:
            "Le titre, le slug, la date et l'image de couverture sont obligatoires.",
        },
        { status: 400 }
      );
    }

    if (!Number.isInteger(categoryId)) {
      return Response.json(
        { error: "La catégorie est invalide." },
        { status: 400 }
      );
    }

    const event = await db.orm.public.Event
      .select("id")
      .where({ id })
      .all();

    if (event.length === 0) {
      return Response.json(
        { error: "Événement introuvable." },
        { status: 404 }
      );
    }

    const duplicateSlug = await db.orm.public.Event
      .select("id")
      .where({ slug })
      .all();

    if (
      duplicateSlug.length > 0 &&
      duplicateSlug[0].id !== id
    ) {
      return Response.json(
        { error: "Ce slug est déjà utilisé." },
        { status: 409 }
      );
    }

    const category = await db.orm.public.Category
      .select("id")
      .where({ id: categoryId })
      .all();

    if (category.length === 0) {
      return Response.json(
        { error: "La catégorie n'existe pas." },
        { status: 400 }
      );
    }

    const updated = await db.orm.public.Event
      .where({ id })
      .update({
        title,
        slug,
        description,
        date: Temporal.Instant.from(
          new Date(date).toISOString()
        ) as never,
        coverImage,
        categoryId,
      });

    if (!updated) {
      return Response.json(
        { error: "Impossible de modifier l'événement." },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      event: updated,
    });
  } catch (error) {
    console.error("Erreur modification événement :", error);

    return Response.json(
      { error: "Impossible de modifier l'événement." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return Response.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const id = Number(body.id);

    if (!Number.isInteger(id)) {
      return Response.json(
        { error: "Identifiant invalide." },
        { status: 400 }
      );
    }

    const event = await db.orm.public.Event
      .select("id")
      .where({ id })
      .all();

    if (event.length === 0) {
      return Response.json(
        { error: "Événement introuvable." },
        { status: 404 }
      );
    }

    await db.orm.public.Photo
      .where({ eventId: id })
      .deleteAll();

    const deleted = await db.orm.public.Event
      .where({ id })
      .delete();

    return Response.json({
      success: true,
      event: deleted,
    });
  } catch (error) {
    console.error("Erreur suppression événement :", error);

    return Response.json(
      { error: "Impossible de supprimer l'événement." },
      { status: 500 }
    );
  }
}