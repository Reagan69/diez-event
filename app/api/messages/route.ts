import { db } from "@/src/prisma/db";
import { Temporal } from "@js-temporal/polyfill";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const eventType = String(body.eventType ?? "").trim();
    const date = String(body.date ?? "").trim();
    const budget = String(body.budget ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !eventType || !message) {
      return Response.json(
        {
          error:
            "Le nom, l'email, le type d'événement et le message sont obligatoires.",
        },
        { status: 400 }
      );
    }

    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      return Response.json(
        {
          error: "Adresse email invalide.",
        },
        { status: 400 }
      );
    }

    let eventDate: Temporal.Instant | null = null;

    if (date) {
      const parsedDate = new Date(`${date}T00:00:00+01:00`);

      if (Number.isNaN(parsedDate.getTime())) {
        return Response.json(
          {
            error: "Date d'événement invalide.",
          },
          { status: 400 }
        );
      }

      eventDate = Temporal.Instant.from(
        parsedDate.toISOString()
      );
    }

    const created = await db.orm.public.Message.create({
      name,
      email,
      phone: phone || null,
      eventType,
      eventDate: eventDate as never,
      budget: budget || null,
      message,
    });

    return Response.json(
      {
        success: true,
        message: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur création demande :", error);

    return Response.json(
      {
        error: "Impossible d'envoyer votre demande.",
      },
      { status: 500 }
    );
  }
}