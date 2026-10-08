// dong-bo-skill.mjs — giữ hai skill trên máy thầy (~/.claude/skills) và bản trong repo (.claude/skills) KHỚP NHAU.
// Phiên Claude chạy trên đám mây chỉ thấy repo GitHub, nên cần bản trong repo để dùng đúng luật + công cụ.
//
//   node .claude/dong-bo-skill.mjs             so hai bên, liệt kê tệp lệch (không chép gì)
//   node .claude/dong-bo-skill.mjs --len-repo  máy -> repo  (vừa sửa skill trên máy; rồi commit .claude/skills)
//   node .claude/dong-bo-skill.mjs --ve-may    repo -> máy  (vừa gộp PR mà phiên đám mây sửa .claude/skills; git pull trước)
//
// Chạy ở thư mục gốc repo, trên máy thầy. Trên máy, skill cá nhân thắng skill dự án cùng tên nên không bị trùng.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const SKILLS = ["sk-web-toan-tieuhoc", "sk-ve-hinh-tieuhoc"];
const MAY = path.join(os.homedir(), ".claude", "skills");
const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), "skills");
const che = process.argv.includes("--len-repo") ? "len" : process.argv.includes("--ve-may") ? "ve" : "so";

const tep = (goc) => fs.existsSync(goc) ? fs.readdirSync(goc, { recursive: true }).map(String)
  .filter((f) => fs.statSync(path.join(goc, f)).isFile()).map((f) => f.split(path.sep).join("/")) : [];
const doc = (f) => fs.existsSync(f) ? fs.readFileSync(f) : null;

let lech = 0;
for (const s of SKILLS) {
  const a = path.join(MAY, s), b = path.join(REPO, s);
  if (!fs.existsSync(path.join(a, "SKILL.md"))) { console.error("✗ Không thấy " + a + " — chỉ chạy được trên máy thầy."); process.exit(1); }
  const ds = [...new Set([...tep(a), ...tep(b)])].sort().filter((f) => {
    const x = doc(path.join(a, f)), y = doc(path.join(b, f));
    return !x || !y || !x.equals(y);
  });
  for (const f of ds) console.log("  ≠ " + s + "/" + f + (doc(path.join(a, f)) ? "" : "  (chỉ có ở repo)") + (doc(path.join(b, f)) ? "" : "  (chỉ có ở máy)"));
  lech += ds.length;
  if (che === "so" || !ds.length) continue;
  const [tu, toi] = che === "len" ? [a, b] : [b, a];
  fs.rmSync(toi, { recursive: true, force: true });
  fs.cpSync(tu, toi, { recursive: true });
}
if (!lech) console.log("KHỚP — hai skill ở máy và trong repo giống hệt nhau.");
else if (che === "so") { console.log(lech + " tệp lệch. Chọn chiều: --len-repo (máy -> repo) hoặc --ve-may (repo -> máy)."); process.exit(1); }
else console.log("ĐÃ CHÉP " + (che === "len" ? "máy -> repo (nhớ commit .claude/skills)" : "repo -> máy") + ".");
