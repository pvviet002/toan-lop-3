// lay_hinh.mjs — tải hình SVG bản PHẲNG (Flat) từ kho chính thức microsoft/fluentui-emoji (giấy phép MIT).
// Dùng:  node lay_hinh.mjs <thư-mục-đích> "Lady beetle" "Delivery truck" "Boy" …
//   - Tên = đúng tên thư mục trong assets/ của kho (xem danh sách: gh api repos/microsoft/fluentui-emoji/git/trees/main?recursive=1).
//   - Người (Boy, Girl, Child…) tự lấy màu da mặc định (Default).
//   - Mỗi hình lưu thành <slug>.svg (vd lady_beetle.svg); kèm LICENSE-fluentui-emoji.txt (MIT bắt buộc giữ thông báo bản quyền).
// CHỈ chạy khi thầy đã cho phép tải (nêu tên file, nguồn, dung lượng).
import fs from "fs"; import path from "path";
const [dich, ...ten] = process.argv.slice(2);
if (!dich || !ten.length) { console.error('Dùng: node lay_hinh.mjs <thư-mục-đích> "Lady beetle" …'); process.exit(2); }
const GOC = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/";
const NGUOI = /^(Boy|Girl|Child|Man|Woman|Person|Baby|Older person|Old man|Old woman)$/;
fs.mkdirSync(dich, { recursive: true });
async function lay(url) { const r = await fetch(url); if (!r.ok) throw new Error(r.status + " " + url); return await r.text(); }
let tong = 0, loi = 0;
const lic = path.join(dich, "LICENSE-fluentui-emoji.txt");
if (!fs.existsSync(lic)) { const t = await lay(GOC + "LICENSE"); fs.writeFileSync(lic, "Nguồn: https://github.com/microsoft/fluentui-emoji\n\n" + t); tong += t.length; }
for (const t of ten) {
  const slug = t.toLowerCase().replace(/ /g, "_");
  const rel = NGUOI.test(t) ? "assets/" + t + "/Default/Flat/" + slug + "_flat_default.svg" : "assets/" + t + "/Flat/" + slug + "_flat.svg";
  try {
    const s = await lay(GOC + rel.split("/").map(encodeURIComponent).join("/"));
    if (!/^<svg[\s>]/.test(s.trim())) throw new Error("không phải SVG");
    fs.writeFileSync(path.join(dich, slug + ".svg"), s); tong += s.length;
    console.log("  " + String(s.length).padStart(6) + " B  " + slug + ".svg");
  } catch (e) { loi++; console.log("  LỖI  " + t + ": " + e.message); }
}
console.log("Tổng " + (tong / 1024).toFixed(1) + " KB" + (loi ? " · " + loi + " lỗi" : ""));
process.exit(loi ? 1 : 0);
