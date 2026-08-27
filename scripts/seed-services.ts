/**
 * Creates the service pages that do not exist yet.
 *
 *   npm run seed:services
 *
 * Deliberately non-destructive: a page already in the database is left alone,
 * because after the first run the admin panel is the source of truth and this
 * script must never overwrite something the client has written.
 *
 * Pass --force to reset every page back to the shipped copy.
 */
import { randomUUID } from "node:crypto";
import { config } from "dotenv";

config({ path: ".env.local" });

const force = process.argv.includes("--force");

async function main() {
  const { getPrisma } = await import("../lib/prisma");
  const { SERVICE_CONTENT } = await import("./service-content");

  const prisma = getPrisma();
  let created = 0;
  let reset = 0;
  let skipped = 0;

  for (const entry of SERVICE_CONTENT) {
    const existing = await prisma.servicePage.findUnique({
      where: { slug: entry.slug },
    });

    const data = {
      headline: entry.headline,
      intro: entry.intro,
      body: entry.body,
      faq: entry.faq,
      metaTitle: entry.metaTitle,
      metaDescription: entry.metaDescription,
      keyword: entry.keyword,
    };

    if (!existing) {
      await prisma.servicePage.create({
        data: { id: randomUUID(), slug: entry.slug, ...data },
      });
      created++;
    } else if (force) {
      await prisma.servicePage.update({ where: { slug: entry.slug }, data });
      reset++;
    } else {
      skipped++;
    }
  }

  console.log(
    `created ${created}, reset ${reset}, left alone ${skipped} (of ${SERVICE_CONTENT.length}).`
  );
  if (skipped > 0 && !force) {
    console.log("Existing pages were not touched. Use --force to reset them.");
  }

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
