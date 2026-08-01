/**
 * Creates or resets the admin account.
 *
 *   npm run seed:admin
 *
 * Sign-up is disabled in lib/auth.ts, so there is no public path to an
 * account — this script is it. Re-running with a different ADMIN_PASSWORD
 * resets the existing account's password rather than creating a duplicate.
 *
 * Passwords are hashed through Better Auth's own context so they match
 * exactly what sign-in will verify against. Hashing them here by hand would
 * silently drift the moment Better Auth changes algorithm or parameters.
 */
import { config } from "dotenv";

config({ path: ".env.local" });

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local first.");
  process.exit(1);
}

if (password.length < 12) {
  console.error(
    `ADMIN_PASSWORD is ${password.length} characters; the minimum is 12.`
  );
  process.exit(1);
}

async function main(adminEmail: string, adminPassword: string) {
  const { auth } = await import("../lib/auth");
  const { getPrisma } = await import("../lib/prisma");

  const prisma = getPrisma();
  const ctx = await auth.$context;
  const hash = await ctx.password.hash(adminPassword);

  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existing) {
    // Credential logins live on the "credential" account row, not the user.
    await prisma.account.updateMany({
      where: { userId: existing.id, providerId: "credential" },
      data: { password: hash },
    });
    // A password change does not invalidate live sessions on its own.
    const { count } = await prisma.session.deleteMany({
      where: { userId: existing.id },
    });
    console.log(
      `Reset password for ${adminEmail} (signed out ${count} session(s)).`
    );
  } else {
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        email: adminEmail,
        name: adminEmail.split("@")[0]!,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    await prisma.account.create({
      data: {
        id: crypto.randomUUID(),
        userId: user.id,
        accountId: user.id,
        providerId: "credential",
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log(`Created admin ${adminEmail}.`);
  }

  await prisma.$disconnect();
}

main(email, password).catch((error) => {
  console.error(error);
  process.exit(1);
});
