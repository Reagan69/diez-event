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

    const name = String(body.name ?? "").trim();
    const slug = String(body.slug ?? "").trim();

    if (!name || !slug) {
      return Response.json(
        { error: "Le nom et le slug sont obligatoires." },
        { status: 400 }
      );
    }

    const existing = await db.orm.public.Category
      .select("id")
      .where({ slug })
      .all();

    if (existing.length > 0) {
      return Response.json(
        { error: "Ce slug existe déjà." },
        { status: 409 }
      );
    }

    const category = await db.orm.public.Category.create({
      name,
      slug,
    });

    return Response.json(
      {
        success: true,
        category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur création catégorie :", error);

    return Response.json(
      { error: "Impossible de créer la catégorie." },
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
    const name = String(body.name ?? "").trim();
    const slug = String(body.slug ?? "").trim();

    if (!Number.isInteger(id) || !name || !slug) {
      return Response.json(
        { error: "Données invalides." },
        { status: 400 }
      );
    }

    const category = await db.orm.public.Category
      .select("id")
      .where({ id })
      .all();

    if (category.length === 0) {
      return Response.json(
        { error: "Catégorie introuvable." },
        { status: 404 }
      );
    }

    const duplicate = await db.orm.public.Category
      .select("id")
      .where({ slug })
      .all();

    if (
      duplicate.length > 0 &&
      duplicate[0].id !== id
    ) {
      return Response.json(
        { error: "Ce slug est déjà utilisé." },
        { status: 409 }
      );
    }

    const updated = await db.orm.public.Category
      .where({ id })
      .update({
        name,
        slug,
      });

    return Response.json({
      success: true,
      category: updated,
    });
  } catch (error) {
    console.error("Erreur modification catégorie :", error);

    return Response.json(
      { error: "Impossible de modifier la catégorie." },
      { status: 500 }
    );
  }
}