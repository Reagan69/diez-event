import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "../src/prisma/db";

async function createAdmin() {
  const email = "admin@diez-events.com";
  const password = "ChangeMoi123!";
  const name = "Diez Events Admin";

  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await db.orm.public.Admin
    .select("id")
    .where({
      email,
    })
    .all();

  if (existing.length > 0) {
    console.log("⚠️ Un administrateur avec cet email existe déjà.");
    return;
  }

  const admin = await db.orm.public.Admin.create({
    email,
    passwordHash,
    name,
  });

  console.log("✅ Administrateur créé.");
  console.log(`Email : ${admin.email}`);
}

createAdmin().catch((error) => {
  console.error("❌ Erreur :", error);
  process.exit(1);
});