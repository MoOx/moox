import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox"] });
for (const p of ["/", "/resume"]) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:1360${p}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const r = await page.evaluate(() => {
    const all = [...document.body.querySelectorAll("*")];
    // A Spacer renders as a div with fixed width+height and nothing inside.
    const emptyBoxes = all.filter(
      (e) => e.tagName === "DIV" && e.childNodes.length === 0 && !e.getAttribute("role"),
    );
    const sized = emptyBoxes.filter((e) => {
      const s = getComputedStyle(e);
      return parseFloat(s.height) > 0 && parseFloat(s.width) > 0;
    });
    // Container = wrapper div whose only child is the max-width div
    const containerish = all.filter((e) => {
      if (e.tagName !== "DIV" || e.children.length !== 1) return false;
      const s = getComputedStyle(e);
      const c = getComputedStyle(e.firstElementChild);
      return s.alignItems === "center" && c.maxWidth !== "none";
    });
    return { total: all.length, empty: emptyBoxes.length, sizedEmpty: sized.length, containerish: containerish.length };
  });
  console.log(`${p.padEnd(9)} total=${r.total}  empty divs=${r.empty} (sized: ${r.sizedEmpty})  container wrappers=${r.containerish}`);
  await ctx.close();
}
await b.close();
