import "dotenv/config";
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";

const runtimeGlobal = globalThis as unknown as {
  Temporal: typeof TemporalPolyfill;
};

runtimeGlobal.Temporal ??= TemporalPolyfill;

import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "./contract.d";
import contractJson from "./contract.json" with { type: "json" };

export const db = postgres<Contract>({
  contractJson,
  url: process.env["DATABASE_URL"]!,
});