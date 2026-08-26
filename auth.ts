import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/src/prisma/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Mot de passe",
          type: "password",
        },
      },

      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim();
        const password = String(credentials?.password ?? "");

        if (!email || !password) {
          return null;
        }

        const admins = await db.orm.public.Admin
          .select(
            "id",
            "email",
            "passwordHash",
            "name"
          )
          .where({
            email,
          })
          .all();

        const admin = admins[0];

        if (!admin) {
          return null;
        }

        const validPassword = await bcrypt.compare(
          password,
          admin.passwordHash
        );

        if (!validPassword) {
          return null;
        }

        return {
          id: String(admin.id),
          email: admin.email,
          name: admin.name,
        };
      },
    }),
  ],

  pages: {
    signIn: "/admin/login",
  },

  session: {
    strategy: "jwt",
  },
});