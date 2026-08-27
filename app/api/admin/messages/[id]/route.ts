import { auth } from "@/auth";
import { db } from "@/src/prisma/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return Response.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const messageId = Number(id);

    if (!Number.isInteger(messageId)) {
      return Response.json(
        { error: "Identifiant invalide." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const status = String(body.status ?? "").trim();

    const allowedStatuses = [
      "NEW",
      "IN_PROGRESS",
      "DONE",
    ];

    if (!allowedStatuses.includes(status)) {
      return Response.json(
        { error: "Statut invalide." },
        { status: 400 }
      );
    }

    const existing = await db.orm.public.Message
      .select("id")
      .where({
        id: messageId,
      })
      .all();

    if (existing.length === 0) {
      return Response.json(
        { error: "Demande introuvable." },
        { status: 404 }
      );
    }

    const updated = await db.orm.public.Message
      .where({
        id: messageId,
      })
      .update({
        status,
      });

    return Response.json({
      success: true,
      message: updated,
    });
  } catch (error) {
    console.error(
      "Erreur modification statut :",
      error
    );

    return Response.json(
      {
        error: "Impossible de modifier le statut.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return Response.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const messageId = Number(id);

    if (!Number.isInteger(messageId)) {
      return Response.json(
        { error: "Identifiant invalide." },
        { status: 400 }
      );
    }

    const existing = await db.orm.public.Message
      .select("id")
      .where({
        id: messageId,
      })
      .all();

    if (existing.length === 0) {
      return Response.json(
        { error: "Demande introuvable." },
        { status: 404 }
      );
    }

    const deleted = await db.orm.public.Message
      .where({
        id: messageId,
      })
      .delete();

    return Response.json({
      success: true,
      message: deleted,
    });
  } catch (error) {
    console.error(
      "Erreur suppression demande :",
      error
    );

    return Response.json(
      {
        error: "Impossible de supprimer la demande.",
      },
      { status: 500 }
    );
  }
}