import { config } from "dotenv";
config({ path: ".env.local" });
async function main() {
  const { getPrisma } = await import("../lib/prisma");
  const p = getPrisma();
  const rows = await p.servicePage.findMany({ select: { slug: true, status: true } as any });
  console.log(JSON.stringify(rows));
  await p.$disconnect();
}
main();
