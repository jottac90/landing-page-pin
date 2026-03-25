import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const www = path.join(__dirname, "..");
const indexPath = path.join(www, "index.html");
const pagesDir = path.join(www, "paginas");
fs.mkdirSync(pagesDir, { recursive: true });

const text = fs.readFileSync(indexPath, "utf8");
const parts = text.split(/(?=<!DOCTYPE html>)/g);

/** @type {{ file: string; dataName: string; partIndex: number }[]} */
const map = [
  { file: "home_pincreator.html", dataName: "home_pincreator", partIndex: 1 },
  { file: "home_pincreator_mobile.html", dataName: "home_pincreator_mobile", partIndex: 2 },
  { file: "sobre_servi_os.html", dataName: "sobre_servi_os", partIndex: 3 },
  { file: "sobre_servi_os_mobile.html", dataName: "sobre_servi_os_mobile", partIndex: 4 },
  { file: "portf_lio_galeria.html", dataName: "portf_lio_galeria", partIndex: 5 },
];

function extractBody(html) {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return m ? m[1].trim() : "";
}

for (const { file, dataName, partIndex } of map) {
  const doc = parts[partIndex];
  if (!doc) throw new Error("Missing part " + partIndex);
  const inner = extractBody(doc);
  const wrapped = `<div class="page" data-name="${dataName}">
  <div class="page-content">
${inner}
  </div>
</div>
`;
  fs.writeFileSync(path.join(pagesDir, file), wrapped, "utf8");
  console.log("Wrote", file, inner.length, "chars");
}
