import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const www = path.join(__dirname, "..");
const idx = fs.readFileSync(path.join(www, "index.html"), "utf8");
const startTag = '<div class="page" data-name="home_pincreator">';
const start = idx.indexOf(startTag);
if (start < 0) throw new Error("home page not found in index");
const footerEnd = idx.indexOf("</footer>", start);
if (footerEnd < 0) throw new Error("footer not found");
const afterFooter = idx.indexOf("\n", footerEnd + 9) + 1;
let depth = 0;
let i = start;
while (i < idx.length) {
  const open = idx.indexOf("<div", i);
  const close = idx.indexOf("</div>", i);
  if (close < 0) throw new Error("unclosed");
  if (open >= 0 && open < close) {
    depth++;
    i = open + 4;
  } else {
    depth--;
    i = close + 6;
    if (depth === 0) {
      const chunk = idx.slice(start, i).trimEnd();
      const mobile = chunk.replace(
        'data-name="home_pincreator"',
        'data-name="home_pincreator_mobile"'
      );
      fs.writeFileSync(
        path.join(www, "paginas", "home_pincreator_mobile.html"),
        mobile + "\n",
        "utf8"
      );
      console.log("Wrote home_pincreator_mobile.html", mobile.length);
      process.exit(0);
    }
  }
}
