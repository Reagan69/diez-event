import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Événements",
    description:
      "Conférences, anniversaires, cérémonies et événements privés. Nous capturons l'énergie et les moments forts de chaque occasion.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1400&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "Mariages",
    description:
      "Des images naturelles et élégantes pour raconter chaque émotion de votre journée, des préparatifs jusqu'à la célébration.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "Corporate",
    description:
      "Portraits professionnels, événements d'entreprise et communication visuelle pour renforcer l'image de votre organisation.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1400&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "Portraits",
    description:
      "Des portraits personnels et professionnels conçus pour révéler votre personnalité et votre identité.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-white px-6 py-28 text-black lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-20 grid gap-10 lg:grid-cols-[1fr_400px] lg:items-end">

          <div>

            <div className="mb-5 flex items-center gap-3">

              <span className="h-[2px] w-10 bg-[#075A94]" />

              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#075A94]">
                Nos services
              </p>

            </div>

            <h2 className="max-w-3xl text-4xl font-light leading-[1.05] sm:text-6xl lg:text-7xl">
              Donner une image
              <br />
              <span className="text-black/30">
                à vos moments.
              </span>
            </h2>

          </div>

          <p className="max-w-md text-sm leading-7 text-black/50">
            Que ce soit pour un événement privé, une entreprise ou un
            projet personnel, nous adaptons notre regard à chaque histoire.
          </p>

        </div>

        {/* SERVICES */}
        <div className="border-t border-black/10">

          {services.map((service) => (

            <Link
              href="#contact"
              key={service.number}
              className="group grid gap-8 border-b border-black/10 py-10 transition hover:bg-[#F5F9FC] lg:grid-cols-[80px_1fr_380px_60px] lg:items-center"
            >

              {/* NUMBER */}
              <span className="text-sm font-semibold text-[#075A94]">
                {service.number}
              </span>

              {/* TITLE */}
              <h3 className="text-3xl font-light transition duration-300 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                {service.title}
              </h3>

              {/* IMAGE + DESCRIPTION */}
              <div className="grid grid-cols-[120px_1fr] gap-5">

                <div className="relative hidden aspect-square overflow-hidden sm:block">

                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />

                </div>

                <p className="self-center text-sm leading-7 text-black/45">
                  {service.description}
                </p>

              </div>

              {/* ARROW */}
              <div className="hidden h-11 w-11 items-center justify-center border border-black/10 transition duration-300 group-hover:border-[#075A94] group-hover:bg-[#075A94] group-hover:text-white lg:flex">

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </div>

            </Link>

          ))}

        </div>

        {/* BOTTOM CTA */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">

          <p className="max-w-lg text-sm leading-7 text-black/40">
            Vous avez un projet particulier ? Nous pouvons également
            concevoir une prestation adaptée à vos besoins.
          </p>

          <Link
            href="#contact"
            className="group flex items-center gap-4 bg-[#075A94] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#063B63]"
          >
            Parlons de votre projet

            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />

          </Link>

        </div>

      </div>
    </section>
  );
}