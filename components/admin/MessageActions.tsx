"use client";

import { useState } from "react";
import { Check, Loader2, Trash2 } from "lucide-react";

type Props = {
  messageId: number;
  currentStatus: string;
};

const statuses = [
  {
    value: "NEW",
    label: "Nouveau",
  },
  {
    value: "IN_PROGRESS",
    label: "En cours",
  },
  {
    value: "DONE",
    label: "Traité",
  },
];

export default function MessageActions({
  messageId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function updateStatus(newStatus: string) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/messages/${messageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Impossible de modifier le statut."
        );
      }

      setStatus(newStatus);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette demande ?"
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/messages/${messageId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Impossible de supprimer la demande."
        );
      }

      window.location.reload();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
      setDeleting(false);
    }
  }

  return (
    <div className="mt-7 border-t border-white/10 pt-5">
      <div className="flex flex-wrap gap-2">
        {statuses.map((item) => {
          const active = status === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => updateStatus(item.value)}
              disabled={loading || deleting || active}
              className={`px-4 py-2 text-[10px] uppercase tracking-wider transition ${
                active
                  ? "bg-[#FFD400] text-black"
                  : "border border-white/10 text-white/45 hover:border-[#FFD400] hover:text-white"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {loading && active ? (
                <Loader2
                  size={13}
                  className="animate-spin"
                />
              ) : (
                item.label
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={handleDelete}
          disabled={loading || deleting}
          className="ml-auto flex items-center gap-2 border border-red-500/30 px-4 py-2 text-[10px] uppercase tracking-wider text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
        >
          {deleting ? (
            <Loader2
              size={13}
              className="animate-spin"
            />
          ) : (
            <Trash2 size={13} />
          )}

          Supprimer
        </button>
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-300">
          {error}
        </p>
      )}

      {status === "DONE" && (
        <p className="mt-3 flex items-center gap-2 text-xs text-white/35">
          <Check size={14} />
          Demande traitée
        </p>
      )}
    </div>
  );
}