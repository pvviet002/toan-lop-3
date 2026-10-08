// kiem_dem.mjs — KIỂM ĐẾM: hình có vật học sinh phải ĐẾM thì số chi tiết vẽ ra phải ĐÚNG số trong lời (6 chấm, 8 xúc tu…).
// Mỗi chi tiết để đếm mang thuộc tính data-dem="<loại>" (quy ước trong figures.js). Công cụ gọi từng hàm với nhiều n,
// đếm data-dem theo loại, so với số mong đợi; chi tiết tròn (chấm, quả) còn phải KHÔNG chạm nhau (đếm được bằng mắt).
//   node kiem_dem.mjs <repo>          -> in bảng, có sai thì mã thoát 1
// Thêm hình đếm mới: gắn data-dem trong figures.js rồi thêm một dòng vào DAC_TA bên dưới.
import fs from "node:fs"; import path from "node:path"; import vm from "node:vm";
const REPO = path.resolve(process.argv[2] || ".");
const src = fs.readFileSync(path.join(REPO, "figures.js"), "utf8");
const ctx = { Math, String, Number, Array, Object, Set, JSON, parseInt, parseFloat, isNaN, console, window: {} };
vm.createContext(ctx); vm.runInContext(src, ctx);

const day = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
// [hàm, các bộ tham số, (tham số) => {loại: số mong đợi}]
const DAC_TA = [
  ["ladybug", [[], [56], [72]], () => ({ cham: 6 })],
  ["hopBut", day(1, 10).map((n) => [n]), ([n]) => ({ but: n })],
  ["thanhGo", day(2, 10).map((n) => [n, n * 6]), ([n]) => ({ vach: n - 1 })],
  ["doiKeoCo", day(1, 5).flatMap((d) => [[d], [d, 9]]), ([d, m]) => ({ ban: d * (m || 7) })],
  ["bachTuoc", [[], [72]], () => ({ xuctu: 8 })],
  ["conCua", [[], [72]], () => ({ chan: 8, cang: 2 })],
  ["tuanLe", day(1, 5).map((t) => [t]), ([t]) => ({ ngay: 7 * t })],
  ["hopCoc", day(1, 9).map((k) => [k]), ([k]) => ({ hop: k })],
  ["doiMuaRong", day(1, 4).flatMap((d) => [[d], [d, 6]]), ([d, m]) => ({ ban: d * (m || 9) })],
  ["tuiCam", day(1, 9).map((q) => [60, q]), ([, q]) => ({ qua: q })],
  ["hangCan", day(1, 10).map((k) => [k]), ([k]) => ({ can: k })],
];
const dem = (html) => { const o = {}; for (const m of html.matchAll(/data-dem="(\w+)"/g)) o[m[1]] = (o[m[1]] || 0) + 1; return o; };
function tronCham(html) {   // các chi tiết tròn có data-dem: tâm cách nhau >= tổng bán kính + 0.8
  const c = [...html.matchAll(/<circle data-dem="\w+" cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"/g)].map((m) => m.slice(1).map(Number));
  for (let i = 0; i < c.length; i++) for (let j = i + 1; j < c.length; j++)
    if (Math.hypot(c[i][0] - c[j][0], c[i][1] - c[j][1]) < c[i][2] + c[j][2] + 0.8) return "chi tiết " + (i + 1) + " và " + (j + 1) + " chạm nhau";
  return null;
}
let sai = 0, lan = 0;
const coDem = ("\n" + src.replace(/\/\*[\s\S]*?\*\//g, "")).split(/\nfunction /).slice(1).filter((t) => t.includes("data-dem")).map((t) => t.match(/^\w+/)[0]);   /* thân hàm = đoạn tới "function" kế tiếp */
const thieu = coDem.filter((f) => !DAC_TA.some((d) => d[0] === f));
for (const [ham, bo, mong] of DAC_TA) {
  if (typeof ctx[ham] !== "function") { console.log("✗ " + ham + ": không có trong figures.js"); sai++; continue; }
  let loiHam = 0;
  for (const ts of bo) {
    lan++; const html = ctx[ham](...ts), co = dem(html), can = mong(ts);
    const lech = Object.keys({ ...can, ...co }).filter((k) => (co[k] || 0) !== (can[k] || 0));
    if (lech.length) { loiHam++; console.log("✗ " + ham + "(" + ts.join(", ") + "): " + lech.map((k) => k + " vẽ " + (co[k] || 0) + ", cần " + (can[k] || 0)).join("; ")); }
    const cham = tronCham(html); if (cham) { loiHam++; console.log("✗ " + ham + "(" + ts.join(", ") + "): " + cham); }
  }
  sai += loiHam; console.log((loiHam ? "✗ " : "✓ ") + ham.padEnd(11) + bo.length + " bộ tham số" + (loiHam ? " — " + loiHam + " sai" : ""));
}
if (thieu.length) { console.log("✗ Hàm có data-dem nhưng CHƯA có dòng DAC_TA: " + thieu.join(", ")); sai += thieu.length; }
console.log("── KIỂM ĐẾM: " + (sai ? "SAI " + sai : "ĐẠT") + " (" + lan + " lần gọi)");
process.exit(sai ? 1 : 0);
