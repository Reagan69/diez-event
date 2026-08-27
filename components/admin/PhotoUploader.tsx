"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { Upload, X } from "lucide-react";

type PhotoUploaderProps = {
  eventId: number;
  eventSlug: string;
};

export default function PhotoUploader({
  eventId,
  eventSlug,
}: PhotoUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  function handleFiles(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = Array.from(event.target.files ?? []);

    const images = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    setFiles(images);
    setMessage("");
    setProgress(0);
  }

  function removeFile(index: number) {
    setFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index)
    );
  }

  async function handleUpload() {
    if (files.length === 0) {
      setMessage("Sélectionne au moins une image.");
      return;
    }

    setLoading(true);
    setMessage("");
    setProgress(0);

    try {
      let uploaded = 0;

      for (const file of files) {
        const blob = await upload(
          `events/${eventSlug}/${Date.now()}-${file.name}`,
          file,
          {
            access: "public",
            handleUploadUrl: "/api/admin/photos/upload",
          }
        );

        const response = await fetch("/api/admin/photos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId,
            url: blob.url,
            title: file.name,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ?? "Impossible d'enregistrer la photo."
          );
        }

        uploaded += 1;

        setProgress(
          Math.round((uploaded / files.length) * 100)
        );
      }

      setMessage(
        `${uploaded} photo${uploaded > 1 ? "s" : ""} ajoutée${
          uploaded > 1 ? "s" : ""
       } avec succès.`
      );

      setFiles([]);

      window.location.reload();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue pendant l'upload."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6">
      <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-[#FFD400]">
        Ajouter des photos
      </p>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        disabled={loading}
        className="block w-full text-sm text-white/50 file:mr-4 file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-white/20"
      />

      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <p className="text-xs text-white/40">
            {files.length} fichier
            {files.length > 1 ? "s" : ""} sélectionné
            {files.length > 1 ? "s" : ""}
          </p>

          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-3 border border-white/10 px-3 py-2"
            >
              <span className="truncate text-xs text-white/60">
                {file.name}
              </span>

              <button
                type="button"
                onClick={() => removeFile(index)}
                disabled={loading}
                className="text-white/30 hover:text-red-300"
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-[10px] uppercase tracking-wider text-white/30">
            <span>Upload</span>
            <span>{progress}%</span>
          </div>

          <div className="h-1 bg-white/10">
            <div
              className="h-1 bg-[#FFD400] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={loading || files.length === 0}
        className="mt-6 flex items-center gap-3 bg-[#FFD400] px-6 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Upload size={17} />

        {loading
          ? `Envoi ${progress}%...`
          : "Envoyer les photos"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-white/50">
          {message}
        </p>
      )}
    </div>
  );
}