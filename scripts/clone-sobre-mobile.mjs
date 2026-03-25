import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const d = path.join(__dirname, "..", "paginas");
let s = fs.readFileSync(path.join(d, "sobre_servi_os.html"), "utf8");
s = s.replace(
  'data-name="sobre_servi_os"',
  'data-name="sobre_servi_os_mobile"'
);
fs.writeFileSync(path.join(d, "sobre_servi_os_mobile.html"), s);
console.log("Wrote sobre_servi_os_mobile.html");
