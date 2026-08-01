import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "./generated/prisma/client";

/**
 * One Prisma client per process.
 *
 * Next's dev server re-evaluates modules on every hot reload, so a plain
 * `new PrismaClient()` would open a fresh connection pool each time until
 * Postgres refuses new connections. Stashing it on globalThis survives the
 * reload; production gets a single instance anyway.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
  }

  return new PrismaClient({
    // Prisma 7 connects through a driver adapter. This is the pooled Neon
    // endpoint — schema changes go over DIRECT_URL instead, via
    // prisma.config.ts.
    adapter: new PrismaPg({ connectionString }),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

/**
 * Resolved lazily and cached. Reading DATABASE_URL at module scope would
 * make `next build` fail on any machine without the env var set, even though
 * nothing is queried during the build.
 */
export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}
