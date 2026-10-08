// dang_web.mjs — ĐƯA LÊN WEB bằng git (thay cho commit qua trình duyệt).
//
//   node dang_web.mjs <thư-mục-repo> <file-thông-điệp-commit.txt> [--khong-soat] [--thu]
//
// Trình tự (dừng ngay nếu một bước hỏng):
//   1. Liệt kê file đã sửa (git status). Không có gì ⇒ thoát.
//   2. kiemtra.js cho các bai-<N>.js bị ảnh hưởng (sửa engine/figures/css ⇒ mọi bài).
//   2b. SOÁT HÌNH (skill sk-ve-hinh-tieuhoc, nếu có): kiem_dem.mjs (số chi tiết để đếm) + phong_tranh.mjs --soat
//       (emoji, chữ nhỏ, chữ đè / tràn nhãn, chi tiết chạm nhau, rớt dòng) cho các bài đó, 375 + 1200 px, sáng + tối.
//       Lỗi ⇒ KHÔNG commit; riêng bài ghi trong sk-ve-hinh-tieuhoc/assets/chua_chuan.txt (chưa vẽ lại) chỉ cảnh báo.
//   3. soat_giao_dien.mjs cho các bài đó — có LỖI ⇒ KHÔNG commit.  (--khong-soat để bỏ, chỉ khi sửa file không phải giao diện)
//   4. git add (các file đã sửa/mới) → commit (thông điệp lấy nguyên từ file, tự ghi dòng Co-Authored-By vào đó) → push.
//   5. Chờ Vercel (tối đa ~3 phút) tới khi MỌI file đã đẩy trên toan-lop-3.vercel.app khớp mã băm bản cục bộ.
// --thu : chạy bước 1–3 rồi dừng (không commit).
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import os from "node:os";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const khongSoat = args.includes("--khong-soat"), thu = args.includes("--thu");
const [repoArg, msgFile] = args.filter((a) => !a.startsWith("--"));
if (!repoArg || (!thu && !msgFile)) { console.error("Cách dùng: node dang_web.mjs <repo> <commit-msg.txt> [--khong-soat] [--thu]"); process.exit(2); }
const REPO = path.resolve(repoArg);
const SITE = process.env.SITE || "https://toan-lop-3.vercel.app";
const sh = (cmd, a, o = {}) => spawnSync(cmd, a, { cwd: REPO, encoding: "utf8", ...o });
const git = (...a) => { const r = sh("git", a); if (r.status !== 0) throw new Error("git " + a.join(" ") + ": " + (r.stderr || r.stdout)); return r.stdout; };
const buoc = (s) => console.log("\n▶ " + s);
const hash = (b) => crypto.createHash("sha256").update(b).digest("hex");

try {
  buoc("1. File đã sửa");
  const doi = git("status", "--porcelain", "-uall").split("\n")   /* -uall: thư mục mới (vd hinh/) hiện TỪNG file -> commit + kiểm Vercel từng ảnh */.filter(Boolean).map((l) => ({ st: l.slice(0, 2).trim(), f: l.slice(3).replace(/^"|"$/g, "") }));
  if (!doi.length) { console.log("  không có thay đổi — thôi."); process.exit(0); }
  doi.forEach((d) => console.log("  " + d.st.padEnd(2) + " " + d.f));
  const files = doi.map((d) => d.f);
  const chung = files.some((f) => /^(engine\.js|engine\.css|figures\.js)$/.test(f));
  const moiBai = fs.readdirSync(REPO).filter((f) => /^bai-\d+\.js$/.test(f)).map((f) => f.replace(".js", ""));
  const bai = chung ? moiBai : [...new Set(files.map((f) => (/^(bai-\d+)\.(js|html)$/.exec(f) || [])[1]).filter((b) => b && moiBai.includes(b)))];

  buoc("2. Kiểm logic (kiemtra.js): " + (bai.join(", ") || "không có bài engine nào bị ảnh hưởng"));
  for (const b of bai) {
    const r = sh("node", [path.join(HERE, "kiemtra.js"), REPO, b + ".js", "20000"]);
    const cuoi = (r.stdout + r.stderr).trim().split("\n").pop();
    console.log("  " + b.padEnd(7) + " " + cuoi);
    if (r.status !== 0 || !/OK/.test(cuoi)) throw new Error("kiemtra " + b + " chưa đạt");
  }

  const VH = path.join(HERE, "..", "..", "sk-ve-hinh-tieuhoc", "assets");
  if (!bai.length) buoc("2b. Soát hình — bỏ qua (không có bài engine)");
  else if (!fs.existsSync(path.join(VH, "phong_tranh.mjs"))) buoc("2b. Soát hình — bỏ qua (chưa có skill sk-ve-hinh-tieuhoc)");
  else {
    buoc("2b. Soát hình (kiem_dem + phong_tranh --soat): " + bai.join(", "));
    const cc = fs.existsSync(path.join(VH, "chua_chuan.txt")) ? fs.readFileSync(path.join(VH, "chua_chuan.txt"), "utf8").split(/\s+/).filter((x) => /^bai-\d+$/.test(x)) : [];
    const d = sh("node", [path.join(VH, "kiem_dem.mjs"), REPO]);
    console.log("  " + (d.stdout || "").trim().split("\n").pop());
    if (d.status !== 0) { console.log((d.stdout || "").split("\n").filter((l) => /✗/.test(l)).slice(0, 10).join("\n")); throw new Error("kiểm đếm hình SAI — chưa được đưa lên"); }
    const tam = fs.mkdtempSync(path.join(os.tmpdir(), "soathinh-"));
    const r = sh("node", [path.join(VH, "phong_tranh.mjs"), REPO, tam, ...bai, "--soat", "--khong-chup", "--rong", "375,1200", "--giao", "light,dark", "--lan", "2"], { timeout: 1200000 });
    const out = r.stdout || "", chan = [];
    for (const m of out.matchAll(/^■ (bai-\d+)_\S+: (\d+) lỗi/gm)) if (+m[2] > 0) (cc.includes(m[1]) ? null : chan.push(m[1]));
    for (const b of bai) { const loi = [...out.matchAll(new RegExp("^■ " + b + "_\\S+: (\\d+) lỗi", "gm"))].reduce((t, m) => t + +m[1], 0);
      console.log("  " + b.padEnd(7) + " " + (loi ? loi + " lỗi hình" + (cc.includes(b) ? " (chưa chuẩn hoá — chỉ cảnh báo)" : "") : "sạch")); }
    if (chan.length) { console.log(out.split("\n").filter((l) => /✗/.test(l)).slice(0, 15).join("\n")); throw new Error("soát hình có LỖI ở " + [...new Set(chan)].join(", ") + " — chưa được đưa lên"); }
    try { fs.rmSync(tam, { recursive: true, force: true }); } catch {}
  }

  if (khongSoat || !bai.length) buoc("3. Soát giao diện — bỏ qua" + (khongSoat ? " (--khong-soat)" : " (không có bài engine)"));
  else {
    buoc("3. Soát giao diện (soat_giao_dien.mjs): " + bai.join(", "));
    const r = sh("node", [path.join(HERE, "soat_giao_dien.mjs"), REPO, ...bai, "--cau", "2"], { stdio: ["ignore", "pipe", "pipe"], timeout: 1200000 });
    const out = r.stdout + r.stderr, tt = out.slice(out.indexOf("── TÓM TẮT"));
    console.log(tt.split("\n").map((l) => "  " + l).join("\n"));
    if (r.status !== 0) { console.log(out.split("\n").filter((l) => /✗/.test(l)).slice(0, 15).join("\n")); throw new Error("soát giao diện có LỖI — chưa được đưa lên"); }
  }
  if (thu) { console.log("\n(--thu) dừng trước khi commit."); process.exit(0); }

  buoc("4. Commit + push");
  git("add", "--", ...files);
  git("commit", "-q", "-F", path.resolve(msgFile));
  console.log("  " + git("log", "--oneline", "-1").trim());
  const p = sh("git", ["push", "origin", "HEAD:main"], { env: { ...process.env, GIT_TERMINAL_PROMPT: "0" }, timeout: 120000 });
  if (p.status !== 0) throw new Error("push hỏng: " + (p.stderr || p.stdout) + "\n(Commit đã nằm ở máy — sửa quyền rồi chạy `git push`.)");
  console.log("  " + (p.stderr || p.stdout).trim().split("\n").pop());

  buoc("5. Chờ Vercel khớp bản vừa đẩy");
  /* .claude/, CLAUDE.md, phan-tich-su-pham/, tệp chấm đầu: nằm trong .vercelignore, không lên web -> không chờ khớp */
  const soDoi = files.filter((f) => fs.existsSync(path.join(REPO, f)) && !f.endsWith("/") && !/^(\.|CLAUDE\.md$|phan-tich-su-pham\/)/.test(f));
  for (let t = 0; t < 36; t++) {
    const chua = [];
    for (const f of soDoi) {
      try { const r = await fetch(SITE + "/" + f.split("/").map(encodeURIComponent).join("/") + "?v=" + Date.now()); const b = Buffer.from(await r.arrayBuffer());
        if (hash(b) !== hash(fs.readFileSync(path.join(REPO, f)))) chua.push(f); } catch (e) { chua.push(f); }
    }
    if (!chua.length) { console.log(`  KHỚP ${soDoi.length}/${soDoi.length} file sau ~${t * 5}s — ĐÃ LÊN WEB: ${SITE}`); process.exit(0); }
    await new Promise((r) => setTimeout(r, 5000));
    if (t === 35) throw new Error("sau 3 phút Vercel vẫn chưa khớp: " + chua.join(", ") + " (xem trang Deployments của Vercel)");
  }
} catch (e) { console.error("\n✗ DỪNG: " + e.message); process.exit(1); }
