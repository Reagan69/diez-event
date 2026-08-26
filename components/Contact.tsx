"use client";

import { FormEvent, useState } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

const eventTypes = [
  "Mariage",
  "Anniversaire",
  "Conférence",
  "Événement d'entreprise",
  "Portrait",
  "Autre",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="bg-[#050505] px-6 py-28 text-white lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-20 max-w-3xl">

          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[#FFD400]" />

            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#FFD400]">
              Contact
            </p>
          </div>

          <h2 className="text-5xl font-light leading-[0.95] sm:text-7xl lg:text-8xl">
            Votre histoire
            <br />
            <span className="text-white/30">
              commence ici.
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-base leading-8 text-white/45">
            Vous avez un événement, un projet ou simplement une idée ?
            Parlons-en et construisons ensemble une prestation adaptée
            à vos besoins.
          </p>

        </div>

        {/* CONTENT */}
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

          {/* CONTACT INFO */}
          <div>

            <div className="space-y-8">

              {/* PHONE */}
              <a
                href="tel:+243 977 307 526"
                className="group flex items-start gap-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 transition group-hover:border-[#FFD400] group-hover:bg-[#FFD400] group-hover:text-black">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/30">
                    Téléphone
                  </p>

                  <p className="text-lg text-white/80 transition group-hover:text-white">
                    +243 977 307 526
                  </p>
                </div>
              </a>

              {/* EMAIL */}
              <a
                href="mailto:contact@diez-events.com"
                className="group flex items-start gap-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 transition group-hover:border-[#FFD400] group-hover:bg-[#FFD400] group-hover:text-black">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/30">
                    Email
                  </p>

                  <p className="text-lg text-white/80 transition group-hover:text-white">
                    contact@diez-events.com
                  </p>
                </div>
              </a>

              {/* LOCATION */}
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/30">
                    Localisation
                  </p>

                  <p className="text-lg text-white/80">
                    Kinshasa, RDC
                  </p>
                </div>
              </div>

            </div>

            {/* SOCIAL */}
            <div className="mt-16 border-t border-white/10 pt-8">

              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/30">
                Retrouvez-nous
              </p>

              <div className="flex gap-3">

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center border border-white/10 text-xs font-bold transition hover:border-[#FFD400] hover:bg-[#FFD400] hover:text-black"
                >
                  IG
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center border border-white/10 text-sm font-bold transition hover:border-[#FFD400] hover:bg-[#FFD400] hover:text-black"
                >
                  f
                </a>

                <a
                  href="#"
                  aria-label="WhatsApp"
                  className="flex h-11 w-11 items-center justify-center border border-white/10 text-xs font-bold transition hover:border-[#FFD400] hover:bg-[#FFD400] hover:text-black"
                >
                  WA
                </a>

              </div>

            </div>

          </div>

          {/* FORM */}
          <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-10">

            {submitted ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD400] text-black">
                  <Send size={24} />
                </div>

                <h3 className="text-3xl font-light">
                  Demande envoyée.
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
                  Merci pour votre message. Nous reviendrons vers vous
                  rapidement pour discuter de votre projet.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD400] hover:text-white"
                >
                  Envoyer une autre demande
                </button>

              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                <div className="grid gap-8 sm:grid-cols-2">

                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
                    >
                      Nom complet
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Votre nom"
                      className="w-full border-b border-white/15 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-[#FFD400]"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="vous@email.com"
                      className="w-full border-b border-white/15 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-[#FFD400]"
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
                    >
                      Téléphone
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+243 ..."
                      className="w-full border-b border-white/15 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-[#FFD400]"
                    />
                  </div>

                  {/* EVENT */}
                  <div>
                    <label
                      htmlFor="event"
                      className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
                    >
                      Type d'événement
                    </label>

                    <select
                      id="event"
                      name="event"
                      required
                      defaultValue=""
                      className="w-full border-b border-white/15 bg-[#050505] py-3 text-sm text-white outline-none transition focus:border-[#FFD400]"
                    >
                      <option value="" disabled>
                        Sélectionner
                      </option>

                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* DATE */}
                  <div>
                    <label
                      htmlFor="date"
                      className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
                    >
                      Date de l'événement
                    </label>

                    <input
                      id="date"
                      name="date"
                      type="date"
                      className="w-full border-b border-white/15 bg-transparent py-3 text-sm text-white outline-none transition focus:border-[#FFD400]"
                    />
                  </div>

                  {/* BUDGET */}
                  <div>
                    <label
                      htmlFor="budget"
                      className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
                    >
                      Budget estimatif
                    </label>

                    <select
                      id="budget"
                      name="budget"
                      defaultValue=""
                      className="w-full border-b border-white/15 bg-[#050505] py-3 text-sm text-white outline-none transition focus:border-[#FFD400]"
                    >
                      <option value="" disabled>
                        Sélectionner
                      </option>

                      <option value="moins-300">
                        Moins de 300 $
                      </option>

                      <option value="300-500">
                        300 $ – 500 $
                      </option>

                      <option value="500-1000">
                        500 $ – 1 000 $
                      </option>

                      <option value="plus-1000">
                        Plus de 1 000 $
                      </option>
                    </select>
                  </div>

                </div>

                {/* MESSAGE */}
                <div className="mt-8">

                  <label
                    htmlFor="message"
                    className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/35"
                  >
                    Votre projet
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Parlez-nous de votre événement..."
                    className="w-full resize-none border-b border-white/15 bg-transparent py-3 text-sm leading-7 text-white outline-none placeholder:text-white/20 transition focus:border-[#FFD400]"
                  />

                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="group mt-10 flex w-full items-center justify-center gap-4 bg-[#FFD400] px-7 py-5 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-white"
                >
                  Envoyer ma demande

                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </button>

                <p className="mt-4 text-center text-[10px] leading-5 text-white/25">
                  En envoyant ce formulaire, vous acceptez d'être
                  recontacté concernant votre demande.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}