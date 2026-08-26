import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminMessagesPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-10">

      <div className="mx-auto max-w-7xl">

        <Link
          href="/admin"
          className="mb-10 flex w-fit items-center gap-2 text-xs uppercase tracking-wider text-white/40 hover:text-white"
        >
          <ArrowLeft size={15} />
          Dashboard
        </Link>

        <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#FFD400]">
          Administration
        </p>

        <h1 className="text-5xl font-light">
          Demandes de devis
        </h1>

        <div className="mt-12 border border-white/10 p-10 text-center">
          <p className="text-sm text-white/30">
            Les demandes de clients apparaîtront ici.
          </p>
        </div>

      </div>
    </main>
  );
}