"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@diez-events.com");
  const [password, setPassword] = useState("ChangeMoi123!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result || result.error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">

      <div className="w-full max-w-md">

        <div className="mb-10 text-center">

          <div className="mx-auto relative h-20 w-20">
            <Image
              src="/logo-diez-event.png"
              alt="Diez Events"
              fill
              priority
              className="object-contain"
            />
          </div>

          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-[#FFD400]">
            Administration
          </p>

          <h1 className="mt-3 text-4xl font-light">
            Bienvenue
          </h1>

          <p className="mt-3 text-sm text-white/35">
            Connectez-vous à votre espace Diez Events.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-white/10 bg-white/[0.02] p-7 sm:p-9"
        >

          {error && (
            <div className="mb-7 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-7">

            <div>
              <label
                htmlFor="email"
                className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/30"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  className="w-full border-b border-white/15 bg-transparent py-3 pl-8 text-sm outline-none focus:border-[#FFD400]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-white/30"
              >
                Mot de passe
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  className="w-full border-b border-white/15 bg-transparent py-3 pl-8 text-sm outline-none focus:border-[#FFD400]"
                />
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-9 flex w-full items-center justify-center gap-3 bg-[#FFD400] px-6 py-4 text-sm font-semibold text-black transition hover:bg-white disabled:opacity-50"
          >
            {loading
              ? "Connexion..."
              : "Se connecter"}

            <ArrowRight size={17} />
          </button>

        </form>

        <p className="mt-6 text-center text-[10px] text-white/20">
          Diez Events • Administration
        </p>

      </div>
    </main>
  );
}