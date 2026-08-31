/**
 * Writes the reviews the landing page ships with.
 *
 *   npm run seed:testimonials
 *
 * Non-destructive by default: if the table holds anything at all this exits
 * without touching it, because after the first run the admin panel is the
 * source of truth and a review someone deleted must not come back.
 *
 * Pass --force to wipe the table and write these two again.
 */
import { randomUUID } from "node:crypto";
import { config } from "dotenv";

config({ path: ".env.local" });

const force = process.argv.includes("--force");

/**
 * Photos are the clients' own logos, lifted from the screenshots in
 * /public and trimmed to a square badge — see public/reviews.
 */
const REVIEWS = [
  {
    name: "Sreyash Gupta",
    role: "JEE Society",
    quote:
      "Rohan built our student portal end to end. It is the first real tech product my company has shipped, and the students took to it straight away.",
    rating: 5,
    photo: "/reviews/jee-society.png",
  },
  {
    name: "Maa Kamakhya Hardware",
    role: "Architectural hardware store",
    quote:
      "Orvinex gave us a storefront that is clean and genuinely professional — the UI and UX are exactly what we asked for. They stayed with us long after launch, too, and the support never dropped off.",
    rating: 5,
    photo: "/reviews/maa-kamakhya.png",
  },
];

async function main() {
  const { getPrisma } = await import("../lib/prisma");
  const prisma = getPrisma();

  const existing = await prisma.testimonial.count();
  if (existing > 0 && !force) {
    console.log(
      `${existing} review${existing === 1 ? "" : "s"} already written — nothing to do.`
    );
    console.log("Use --force to replace them with the shipped set.");
    await prisma.$disconnect();
    return;
  }

  if (force) {
    const { count } = await prisma.testimonial.deleteMany({});
    console.log(`deleted ${count} existing reviews.`);
  }

  await prisma.testimonial.createMany({
    data: REVIEWS.map((review, index) => ({
      id: randomUUID(),
      position: index,
      published: true,
      ...review,
    })),
  });

  console.log(`created ${REVIEWS.length} reviews.`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
