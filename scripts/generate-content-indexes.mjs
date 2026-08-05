import fs from "node:fs";
import path from "node:path";

const publicMdDir = path.join(process.cwd(), "public", "content");
const contentTypes = ["blog", "resume", "talks"];

const isEmptyNode = (node) => !node || !Array.isArray(node.children) || node.children.length === 0;

/**
 * Splits a résumé body into its language versions.
 *
 * A bilingual entry is authored as one markdown file, English first, then a
 * horizontal rule, then French - one file per experience, never two (see
 * WEB-REWORK.md decision 1). The split happens here, at compile time, so the
 * app reads `body.en` / `body.fr` instead of re-scanning the tree for an `hr`
 * on every render. English-only entries keep an `en` version and no `fr`,
 * which is exactly what the `l()` fallback expects.
 */
const splitBody = (body) => {
  // ~10 old entries have no prose at all: an empty body would render an empty
  // block instead of nothing.
  if (!body || isEmptyNode(body)) return undefined;
  // Already split (the script is idempotent - `npm run markdown` may re-run
  // over generated files).
  if (!Array.isArray(body.children)) return "en" in body ? body : { en: body };
  const hrIndex = body.children.findIndex(
    (child) => child != null && typeof child === "object" && child.tag === "hr",
  );
  if (hrIndex === -1) return { en: body };
  const en = { ...body, children: body.children.slice(0, hrIndex) };
  const fr = { ...body, children: body.children.slice(hrIndex + 1) };
  return isEmptyNode(fr) ? { en } : { en, fr };
};

for (const type of contentTypes) {
  const dirPath = path.join(publicMdDir, type);
  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const items = files.map((filename) => {
    const filePath = path.join(dirPath, filename);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (type === "resume") {
      // Rewritten in place too: the standalone entry pages fetch this file
      // directly (`fetchOne`), so both it and the index must carry the split.
      const body = splitBody(data.body);
      if (body === undefined) delete data.body;
      else data.body = body;
      fs.writeFileSync(filePath, JSON.stringify(data));
    }
    // Keep the body inline for resume entries: it is rendered directly in the
    // timeline. Other types fetch their full file on dedicated slug pages, so
    // their index stays lightweight (body stripped).
    const { body: _body, ...meta } = data;
    const fields = type === "resume" ? data : meta;
    return {
      ...fields,
      slug: type + "/" + filename.replace(/\.json$/, ""),
    };
  });

  const indexPath = path.join(publicMdDir, type + ".json");
  fs.writeFileSync(indexPath, JSON.stringify(items));
  console.log(`Generated ${indexPath} (${items.length} items)`);
}
