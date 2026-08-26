import { auth } from "@/auth";
import { db } from "@/src/prisma/db";
import { Temporal } from "@js-temporal/polyfill";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return Response.json(
      {
        error: "Non autorisé.",
      },
      { status: 401 }
    );
  }

  try {
    // reste de ton code...
  } catch (error) {
    // ...
  }
}