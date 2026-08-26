"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

type PhotoUploaderProps = {
  eventId: number;
};

export default function PhotoUploader({
  eventId,
}: PhotoUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpload() {
    if (!file) {
      setMessage("Sélectionne d'abord une image.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("eventId", String(eventId));
    formData.append("title", title);

    try {
      const response = await fetch("/api/admin/photos", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Échec de l'upload."
        );
      }

      setMessage("Photo ajoutée avec succès.");
      setFile(null);
      setTitle("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6">
      <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-[#FFD400]">
        Ajouter une photo
      </p>

      <div className="space-y-5">

        <input
          type="file"
          accept="image/*"
          onChange={(event) =>
            setFile(event.target.files?.[0] ?? null)
          }
          className="block w-full text-sm text-white/50"
        />

        <input
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Titre de la photo (optionnel)"
          className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none placeholder:text-white/20 focus:border-[#FFD400]"
        />

        <button
          type="button"
          onClick={handleUpload}
          disabled={loading}
          className="flex items-center gap-3 bg-[#FFD400] px-6 py-3 text-sm font-semibold text-black disabled:opacity-50"
        >
          <Upload size={17} />
          {loading ? "Envoi..." : "Envoyer la photo"}
        </button>

        {message && (
          <p className="text-sm text-white/50">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}