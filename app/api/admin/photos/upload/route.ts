import { auth } from "@/auth";
import {
  handleUpload,
  type HandleUploadBody,
} from "@vercel/blob/client";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return Response.json(
      { error: "Non autorisé." },
      { status: 401 }
    );
  }

  try {
    const body =
      (await request.json()) as HandleUploadBody;

    const response = await handleUpload({
      body,
      request,

      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
          ],
          maximumSizeInBytes: 20 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },

      onUploadCompleted: async () => {
        // Rien ici pour le moment.
        // L'URL est enregistrée ensuite dans PostgreSQL
        // par /api/admin/photos.
      },
    });

    return Response.json(response);
  } catch (error) {
    console.error(
      "Erreur génération token Blob :",
      error
    );

    return Response.json(
      {
        error:
          "Impossible de préparer l'upload de la photo.",
      },
      { status: 500 }
    );
  }
}