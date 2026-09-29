/**
 * Sets a new password on an existing admin account and signs it out
 * everywhere, so any old session stops working.
 *   npm run admin:reset-password -- you@example.com "a long password"
 */
import { betterAuth } from "better-auth";
import { authOptions } from "@/lib/auth-options";
import { pool } from "@/lib/db";

async function main() {
  const [email, password] = process.argv.slice(2);
  if (!email || !password) {
    throw new Error('Usage: npm run admin:reset-password -- <email> "<password>"');
  }
  if (password.length < authOptions.emailAndPassword.minPasswordLength) {
    throw new Error(`Password must be at least ${authOptions.emailAndPassword.minPasswordLength} characters.`);
  }

  const ctx = await betterAuth(authOptions).$context;
  const found = await ctx.internalAdapter.findUserByEmail(email.toLowerCase());
  if (!found) throw new Error(`No account for ${email}.`);

  await ctx.internalAdapter.updatePassword(found.user.id, await ctx.password.hash(password));
  await ctx.internalAdapter.deleteUserSessions(found.user.id);
  console.log(`Password updated for ${found.user.email}. Sign in at /admin/login`);
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
