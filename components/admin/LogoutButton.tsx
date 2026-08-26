"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="flex items-center gap-3 border border-white/10 px-5 py-3 text-xs uppercase tracking-wider text-white/50 transition hover:border-[#FFD400] hover:bg-[#FFD400] hover:text-black"
    >
      <LogOut size={15} />
      Déconnexion
    </button>
  );
}