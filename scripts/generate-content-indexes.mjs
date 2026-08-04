import fs from "node:fs";
import path from "node:path";

const publicMdDir = path.join(process.cwd(), "public", "content");
const contentTypes = ["blog", "resume", "talks"];

for (const type of contentTypes) {
  const dirPath = path.join(publicMdDir, type);
  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const items = files.map((filename) => {
    const data = JSON.parse(fs.readFileSync(path.join(dirPath, filename), "utf8"));
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
