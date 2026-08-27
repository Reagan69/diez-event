"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

type PhotoUploaderProps = {
  eventId: number;
};

export default function PhotoUploader({
  eventId,
}: PhotoUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  function handleFiles(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = Array.from(
      event.target.files ?? []
    ).filter((file) =>
      file.type.startsWith("image/")
    );

    setFiles(selectedFiles);
    setMessage("");
    setProgress(0);
  }

  function removeFile(index: number) {
    setFiles((current) =>
      current.filter((_, i) => i !== index)
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
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();

        formData.append("file", files[i]);
        formData.append("eventId", String(eventId));
        formData.append("title", files[i].name);

        const response = await fetch(
          "/api/admin/photos",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ??
              "Impossible d'envoyer la photo."
          );
        }

        setProgress(
          Math.round(((i + 1) / files.length) * 100)
        );
      }

      setMessage(
        `${files.length} photo${
          files.length > 1 ? "s" : ""
        } ajoutée${
          files.length > 1 ? "s" : ""
        } avec succès.`
      );

      setFiles([]);

      window.location.reload();
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
        Ajouter des photos
      </p>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
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