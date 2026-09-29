/**
 * Starts a new article from content/articles/_template.md.
 *
 *   npm run new:post -- "custom software vs off the shelf"
 *
 * The keyword becomes the slug and is filled into the frontmatter. The file
 * starts as a draft: visible in `npm run dev`, never published.
 */
import fs from "node:fs";
import path from "node:path";

const keyword = process.argv.slice(2).join(" ").trim();
if (!keyword) {
  console.error('Usage: npm run new:post -- "your target keyword"');
  process.exit(1);
}

const slug = keyword
  .toLowerCase()
  .replace(/[’']/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
const dir = path.join(process.cwd(), "content/articles");
const file = path.join(dir, `${slug}.md`);

if (fs.existsSync(file)) {
  console.error(`content/articles/${slug}.md already exists`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const body = fs
  .readFileSync(path.join(dir, "_template.md"), "utf8")
  .replaceAll("{{keyword}}", keyword)
  .replaceAll("{{date}}", today);

fs.writeFileSync(file, body);
console.log(`Created content/articles/${slug}.md`);
console.log(`Preview: http://localhost:3000/articles/${slug}  (npm run dev)`);
console.log(`Audit:   npm run seo:check -- ${slug}`);
