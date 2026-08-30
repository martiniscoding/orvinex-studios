/**
 * Writes the five reviews the landing page used to hard-code.
 *
 *   npm run seed:testimonials
 *
 * Runs once and only once: if the table holds anything at all, this exits
 * without touching it. Reviews have no natural key, so a per-row check would
 * resurrect any review the client had deliberately deleted.
 */
import { randomUUID } from "node:crypto";
import { config } from "dotenv";

config({ path: ".env.local" });

/**
 * Ratings are four fives and a four, which averages to exactly the 4.8/5 the
 * heading claimed while it was hard-coded. The heading now reads the average
 * off these rows, so seeding straight fives would silently raise the site's
 * public claim to 5.0.
 */
const REVIEWS = [
  {
    name: "Amit C.",
    role: "CEO, LogisticsTech",
    quote:
      "Orvinex delivered our custom ERP 2 weeks ahead of schedule. The code is immaculate and the system handles our 10k daily orders without breaking a sweat.",
  },
  {
    name: "Sarah J.",
    role: "Founder, FinSaaS",
    quote:
      "We hired them for a massive web application. Rohan and his team at Orvinex act like true technical co-founders. Best software agency we have worked with by far.",
  },
  {
    name: "Rahul M.",
    role: "Director, EduGrow",
    quote:
      "Their mobile app development team is insane. The Flutter app they built for us looks native and performs beautifully.",
  },
  {
    name: "Priya S.",
    role: "Marketing Head",
    rating: 4,
    quote:
      "Not only did they build our platform, their SEO and digital marketing services skyrocketed our organic traffic by 300% in 4 months.",
  },
  {
    name: "Vikram B.",
    role: "Operations VP",
    quote:
      "If you need custom software development, stop looking. They fixed the spaghetti code our previous agency left and scaled our AWS infrastructure perfectly.",
  },
];

async function main() {
  const { getPrisma } = await import("../lib/prisma");
  const prisma = getPrisma();

  const existing = await prisma.testimonial.count();
  if (existing > 0) {
    console.log(
      `${existing} review${existing === 1 ? "" : "s"} already written — nothing to do.`
    );
    return;
  }

  await prisma.testimonial.createMany({
    data: REVIEWS.map((review, index) => ({
      id: randomUUID(),
      position: index,
      rating: 5,
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
