"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

type PortfolioEvent = {
  id: number;
  title: string;
  slug: string;
  categoryId: number;
  categoryName: string;
  year: number;
  coverImage: string;
};

type PortfolioGridProps = {
  events: PortfolioEvent[];
  categories: {
    id: number;
    name: string;
  }[];
};

export default function PortfolioGrid({
  events,
  categories,
}: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(
    null
  );

  const filteredEvents =
    activeCategory === null
      ? events
      : events.filter(
          (event) => event.categoryId === activeCategory
        );

  return (
    <>
      {/* CATEGORIES */}
      <div className="mb-14 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`border px-5 py-3 text-xs font-medium uppercase tracking-wider transition ${
            activeCategory === null
              ? "border-[#FFD400] bg-[#FFD400] text-black"
              : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
          }`}
        >
          Tous
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={`border px-5 py-3 text-xs font-medium uppercase tracking-wider transition ${
              activeCategory === category.id
                ? "border-[#FFD400] bg-[#FFD400] text-black"
                : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* GRID */}
      {filteredEvents.length === 0 ? (
        <div className="border border-white/10 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-white/30">
            Aucun événement
          </p>

          <p className="mt-3 text-sm text-white/20">
            Aucun projet ne correspond à cette catégorie.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              href={`/portfolio/${event.slug}`}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#FFD400]">
                        {event.categoryName}
                      </p>

                      <h2 className="text-2xl font-light">
                        {event.title}
                      </h2>

                      <p className="mt-2 text-xs text-white/40">
                        {event.year}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 transition group-hover:border-[#FFD400] group-hover:bg-[#FFD400] group-hover:text-black">
                      <ArrowUpRight size={17} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}