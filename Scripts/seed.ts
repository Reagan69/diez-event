import "dotenv/config";
import { Temporal } from "@js-temporal/polyfill";

(globalThis as Record<string, unknown>).Temporal = Temporal;

const { db } = await import("../src/prisma/db");

const categories = [
  {
    name: "Mariages",
    slug: "mariages",
  },
  {
    name: "Événements",
    slug: "evenements",
  },
  {
    name: "Corporate",
    slug: "corporate",
  },
  {
    name: "Portraits",
    slug: "portraits",
  },
];

const events = [
  {
    title: "John & Sarah",
    slug: "john-sarah",
    description:
      "Une célébration remplie d'émotions, de sourires et de moments inoubliables.",
    date: "2026-02-14T14:00:00Z",
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1800&auto=format&fit=crop",
    categorySlug: "mariages",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1800&auto=format&fit=crop",
        title: "Cérémonie",
      },
      {
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1800&auto=format&fit=crop",
        title: "Moment des mariés",
      },
      {
        url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1800&auto=format&fit=crop",
        title: "Échange de regards",
      },
      {
        url: "https://images.unsplash.com/photo-1460364157752-926555421a7e?q=80&w=1800&auto=format&fit=crop",
        title: "Célébration",
      },
    ],
  },

  {
    title: "Celebration Night",
    slug: "celebration-night",
    description:
      "Une soirée festive où chaque instant méritait d'être immortalisé.",
    date: "2026-03-21T18:00:00Z",
    coverImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1800&auto=format&fit=crop",
    categorySlug: "evenements",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1800&auto=format&fit=crop",
        title: "Ambiance",
      },
      {
        url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1800&auto=format&fit=crop",
        title: "Soirée",
      },
      {
        url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1800&auto=format&fit=crop",
        title: "Public",
      },
      {
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1800&auto=format&fit=crop",
        title: "Événement",
      },
    ],
  },

  {
    title: "Business Conference",
    slug: "business-conference",
    description:
      "Une rencontre professionnelle capturée sous tous ses angles.",
    date: "2026-04-18T09:00:00Z",
    coverImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1800&auto=format&fit=crop",
    categorySlug: "corporate",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1800&auto=format&fit=crop",
        title: "Conférence",
      },
      {
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1800&auto=format&fit=crop",
        title: "Présentation",
      },
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1800&auto=format&fit=crop",
        title: "Participants",
      },
      {
        url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1800&auto=format&fit=crop",
        title: "Networking",
      },
    ],
  },

  {
    title: "Portrait Session",
    slug: "portrait-session",
    description:
      "Une séance portrait pensée autour de l'identité et de la personnalité.",
    date: "2026-05-09T10:00:00Z",
    coverImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1800&auto=format&fit=crop",
    categorySlug: "portraits",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1800&auto=format&fit=crop",
        title: "Portrait principal",
      },
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1800&auto=format&fit=crop",
        title: "Portrait studio",
      },
      {
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1800&auto=format&fit=crop",
        title: "Portrait naturel",
      },
      {
        url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1800&auto=format&fit=crop",
        title: "Portrait extérieur",
      },
    ],
  },

  {
    title: "Wedding Moments",
    slug: "wedding-moments",
    description:
      "Une collection d'instants spontanés capturés au cœur d'un mariage.",
    date: "2026-06-13T15:00:00Z",
    coverImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1800&auto=format&fit=crop",
    categorySlug: "mariages",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1800&auto=format&fit=crop",
        title: "Mariés",
      },
      {
        url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1800&auto=format&fit=crop",
        title: "Cérémonie",
      },
      {
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1800&auto=format&fit=crop",
        title: "Couple",
      },
      {
        url: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=1800&auto=format&fit=crop",
        title: "Réception",
      },
    ],
  },

  {
    title: "Birthday Celebration",
    slug: "birthday-celebration",
    description:
      "Une célébration pleine de couleurs, d'énergie et de souvenirs.",
    date: "2026-07-25T17:00:00Z",
    coverImage:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1800&auto=format&fit=crop",
    categorySlug: "evenements",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1800&auto=format&fit=crop",
        title: "Anniversaire",
      },
      {
        url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1800&auto=format&fit=crop",
        title: "Célébration",
      },
      {
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1800&auto=format&fit=crop",
        title: "Ambiance",
      },
      {
        url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1800&auto=format&fit=crop",
        title: "Décoration",
      },
    ],
  },
];
async function seed() {
  console.log("🌱 Début du seed Diez Events...\n");

  const categoryMap = new Map<string, number>();

  for (const category of categories) {
    const result = await db.orm.public.Category.upsert({
      create: category,
      update: {
        name: category.name,
      },
      conflictOn: {
        slug: category.slug,
      },
    });

    categoryMap.set(category.slug, result.id);

    console.log(`✅ Catégorie : ${result.name}`);
  }

  console.log("");

  for (const event of events) {
  const categoryId = categoryMap.get(event.categorySlug);

  if (!categoryId) {
    throw new Error(
      `Catégorie introuvable : ${event.categorySlug}`
    );
  }

  const result = await db.orm.public.Event.upsert({
    create: {
      title: event.title,
      slug: event.slug,
      description: event.description,
      date: Temporal.Instant.from(event.date) as never,
      coverImage: event.coverImage,
      categoryId,
    },
    update: {
      title: event.title,
      description: event.description,
      date: Temporal.Instant.from(event.date) as never,
      coverImage: event.coverImage,
      categoryId,
    },
    conflictOn: {
      slug: event.slug,
    },
  });

  console.log(`✅ Événement : ${result.title}`);

  // Supprimer les anciennes photos de cet événement
  await db.orm.public.Photo
  .where({
    eventId: result.id,
  })
  .deleteAll();

  // Ajouter les nouvelles photos
  for (const photo of event.photos) {
    await db.orm.public.Photo.create({
             url: photo.url,
        title: photo.title,
        eventId: result.id,
    });
  }

  console.log(
    `   📸 ${event.photos.length} photos ajoutées`
  );
}

  console.log("\n Seed Diez Events terminé.");
}

seed().catch((error) => {
  console.error("\n❌ Erreur pendant le seed :");
  console.error(error);
  process.exit(1);
});