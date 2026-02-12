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
    const data = JSON.parse(
      fs.readFileSync(path.join(dirPath, filename), "utf8"),
    );
    // Strip body to keep index lightweight
    const { body: _body, ...meta } = data;
    return {
      ...meta,
      slug: type + "/" + filename.replace(/\.json$/, ""),
    };
  });

  const indexPath = path.join(publicMdDir, type + ".json");
  fs.writeFileSync(indexPath, JSON.stringify(items));
  console.log(`Generated ${indexPath} (${items.length} items)`);
}
