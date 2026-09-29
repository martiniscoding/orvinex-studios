/**
 * Creates an admin account (public sign-up is disabled).
 *   npm run admin:create -- you@example.com "a long password" "Your Name"
 */
import { betterAuth } from "better-auth";
import { authOptions } from "@/lib/auth-options";
import { pool } from "@/lib/db";

async function main() {
  const [email, password, name = "Admin"] = process.argv.slice(2);
  if (!email || !password) {
    throw new Error('Usage: npm run admin:create -- <email> "<password>" ["<name>"]');
  }
  if (password.length < authOptions.emailAndPassword.minPasswordLength) {
    throw new Error(`Password must be at least ${authOptions.emailAndPassword.minPasswordLength} characters.`);
  }

  const ctx = await betterAuth(authOptions).$context;
  if (await ctx.internalAdapter.findUserByEmail(email.toLowerCase())) {
    throw new Error(`An account for ${email} already exists.`);
  }

  const user = await ctx.internalAdapter.createUser({
    email: email.toLowerCase(),
    name,
    emailVerified: true,
  }, { method: "admin" });
  await ctx.internalAdapter.linkAccount({
    userId: user.id,
    providerId: "credential",
    accountId: user.id,
    password: await ctx.password.hash(password),
  });
  console.log(`Admin created: ${user.email}. Sign in at /admin/login`);
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
