"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Photo = {
  id: number;
  url: string;
  title: string | null;
};

type PhotoLightboxProps = {
  photos: Photo[];
};

export default function PhotoLightbox({
  photos,
}: PhotoLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);

  const previous = () => {
    if (activeIndex === null || photos.length === 0) return;

    setActiveIndex(
      activeIndex === 0 ? photos.length - 1 : activeIndex - 1
    );
  };

  const next = () => {
    if (activeIndex === null || photos.length === 0) return;

    setActiveIndex(
      activeIndex === photos.length - 1 ? 0 : activeIndex + 1
    );
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  if (photos.length === 0) {
    return null;
  }

  return (
    <>
      {/* GRID */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/5] overflow-hidden text-left"
          >
            <Image
              src={photo.url}
              alt={photo.title ?? "Photo Diez Events"}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

            {photo.title && (
              <div className="absolute bottom-5 left-5 text-left text-sm text-white opacity-0 transition group-hover:opacity-100">
                {photo.title}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95">

          {/* CLOSE */}
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center border border-white/10 text-white transition hover:border-[#FFD400] hover:bg-[#FFD400] hover:text-black"
          >
            <X size={22} />
          </button>

          {/* PREVIOUS */}
          <button
            type="button"
            onClick={previous}
            aria-label="Photo précédente"
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/10 text-white transition hover:border-[#FFD400] hover:bg-[#FFD400] hover:text-black md:left-8"
          >
            <ChevronLeft size={24} />
          </button>

          {/* NEXT */}
          <button
            type="button"
            onClick={next}
            aria-label="Photo suivante"
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/10 text-white transition hover:border-[#FFD400] hover:bg-[#FFD400] hover:text-black md:right-8"
          >
            <ChevronRight size={24} />
          </button>

          {/* PHOTO */}
          <div className="relative flex h-full w-full items-center justify-center p-6 md:p-12">
            <div className="relative h-full w-full max-w-6xl">
              <Image
                src={photos[activeIndex].url}
                alt={
                  photos[activeIndex].title ??
                  "Photo Diez Events"
                }
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* COUNTER */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] text-white/50">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(photos.length).padStart(2, "0")}
          </div>

        </div>
      )}
    </>
  );
}