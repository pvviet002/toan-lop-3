// phong_tranh.mjs — "PHÒNG TRANH": bày MỌI hình của một bài đúng như học sinh thấy, SOÁT TỰ ĐỘNG lỗi hình, chụp để soi bằng mắt.
//
//   node phong_tranh.mjs <repo> <thư-mục-ảnh> bai-9 [bai-10 …] [--giao light,dark] [--rong 1200,375] [--lan 1] [--hat 1]
//       mỗi bài: mọi dạng × 3 mức (× --lan mẫu mỗi mức), đúng HTML câu hỏi + lựa chọn; chụp khúc 900px.
//       --hat: hạt ngẫu nhiên (mặc định 1) -> cùng hạt thì cùng câu hỏi, chụp lại so được với lần trước.
//   … --soat            SOÁT HÌNH tự động trên mọi thẻ câu (xem SOAT bên dưới); có lỗi -> mã thoát 1. Thêm --khong-chup nếu chỉ soát.
//   … --so HEAD         TRƯỚC / SAU: mỗi câu hai cột «Cũ (git HEAD)» | «Mới (đang sửa)», CÙNG hạt -> cùng câu hỏi. Gửi thầy duyệt.
//   node phong_tranh.mjs <repo> <thư-mục-ảnh> --danhmuc       danh mục MỌI hình dùng chung của figures.js (mẫu gọi + tên hàm)
//   node phong_tranh.mjs <repo> <thư-mục-ảnh> --hinh hinh     bảng soi kho hình <repo>/hinh/*.svg (96px + 48px, nền sáng + tối)
//   node phong_tranh.mjs <repo> <thư-mục-ảnh> --trang x.html  chụp một trang bất kỳ (trong repo, hoặc đường dẫn tuyệt đối)
//
// Ảnh ra: <bai>_<giao>_<rộng>_<k>.png. Đọc từng ảnh bằng công cụ xem ảnh, chấm theo references/tieu-chi-soi.md.
import { spawn, spawnSync } from "node:child_process"; import fs from "node:fs"; import path from "node:path";
import os from "node:os"; import http from "node:http"; import vm from "node:vm";

const argv = process.argv.slice(2), opt = {}, pos = [], CO = new Set(["soat", "khong-chup", "danhmuc"]);
for (let i = 0; i < argv.length; i++) { if (argv[i].startsWith("--")) { const k = argv[i].slice(2); opt[k] = CO.has(k) ? true : argv[++i]; } else pos.push(argv[i]); }
const [REPO0, OUT0, ...BAIS] = pos;
if (!REPO0 || !OUT0) { console.error("Dùng: node phong_tranh.mjs <repo> <thư-mục-ảnh> bai-9 … [--soat] [--so HEAD] | --danhmuc | --hinh hinh | --trang x.html"); process.exit(2); }
const REPO = path.resolve(REPO0), OUT = path.resolve(OUT0); fs.mkdirSync(OUT, { recursive: true });
const GIAO = (opt.giao || "light").split(","), RONGS = String(opt.rong || 1200).split(",").map(Number), LAN = +(opt.lan || 1), HAT = +(opt.hat || 1);
const CHUP = !opt["khong-chup"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const docFile = (f, ref) => ref ? spawnSync("git", ["show", ref + ":" + f], { cwd: REPO, encoding: "utf8" }).stdout : fs.readFileSync(path.join(REPO, f), "utf8");

// ---- ngẫu nhiên có hạt (mulberry32): cùng hạt -> cùng câu hỏi, so trước/sau được ----
function mathHat(hat) { let a = hat >>> 0; const M = Object.create(Math);
  M.random = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  return M; }
function napBai(bai, ref) {
  const ctx = { Math: mathHat(HAT), String, Number, Array, Object, Set, JSON, parseInt, parseFloat, isNaN, console, window: {} };
  vm.createContext(ctx);
  vm.runInContext(docFile("figures.js", ref), ctx);
  if (bai) vm.runInContext(docFile(bai + ".js", ref) + "\n;window.BAI=(typeof BAI!=='undefined'?BAI:window.BAI);", ctx);
  return ctx;
}
// một thẻ câu hỏi = đúng HTML học sinh thấy (lời + hình + các lựa chọn)
function theCau(q, nhan) {
  let h = '<div class="o bg-white" data-vitri="' + nhan + '"><div class="text-xs text-slate-500">' + nhan + '</div><div class="text-xl font-bold text-slate-700">' + q.q + '</div>';
  if (q.choices) h += '<div class="grid ' + (q.cot === 1 ? 'grid-cols-1' : 'grid-cols-2') + ' gap-2 mt-2">' + q.choices.map((c) => '<div class="px-2 py-3 bg-white border-2 border-amber-200 rounded-xl font-extrabold text-lg flex items-center justify-center">' + (q.figFn ? q.figFn(c) : c) + '</div>').join("") + '</div>';
  else h += '<div class="mt-2 text-slate-500">[ ô nhập số ]' + (q.unit ? ' ' + q.unit : '') + '</div>';
  return h + '</div>';
}
function cacCau(bai, ref) {   // [[nhãn dạng, nhãn ô, html]]
  const B = napBai(bai, ref).window.BAI, out = [];
  B.topics.forEach((tp, ti) => { for (let lv = 1; lv <= Math.min(3, tp.levels || 1); lv++) for (let k = 0; k < LAN; k++) {
    const nhan = 'Dạng ' + (ti + 1) + ' · Mức ' + lv + (LAN > 1 ? ' · mẫu ' + (k + 1) : '');
    let html; try { html = theCau(tp.make(lv, (tp.mt || [])[0]), nhan); } catch (e) { html = '<div class="o" data-vitri="' + nhan + '">LỖI ' + e.message + '</div>'; }
    out.push([(ti + 1) + '. ' + tp.name + ' <span class="text-sm font-normal text-slate-600">' + (tp.sec || "") + '</span>', nhan, html]);
  } });
  return { B, out };
}
function dungBai(bai, rong) {
  const { B, out } = cacCau(bai), cot = rong < 700 ? 1 : 3;
  let h = '<h1 class="text-2xl font-extrabold text-orange-700 mb-3">Bài ' + B.n + ' — ' + B.title + '</h1>', dang = null;
  out.forEach(([d, , html]) => { if (d !== dang) { h += (dang ? '</div>' : '') + '<div class="text-lg font-extrabold text-slate-700 mt-5 mb-1">' + d + '</div><div class="grid gap-3" style="grid-template-columns:repeat(' + cot + ',minmax(0,1fr))">'; dang = d; } h += html; });
  return h + '</div>';
}
function dungSoSanh(bai, ref) {   // Cũ | Mới, cùng hạt
  const moi = cacCau(bai), cu = cacCau(bai, ref);
  let h = '<h1 class="text-2xl font-extrabold text-orange-700 mb-1">Bài ' + moi.B.n + ' — trước / sau</h1><div class="text-sm text-slate-600 mb-3">Trái: bản cũ (' + ref + ') · Phải: bản mới. Cùng câu hỏi để so đúng hình.</div>';
  h += '<div class="grid gap-3" style="grid-template-columns:1fr 1fr"><div class="font-extrabold text-slate-500 text-center">CŨ</div><div class="font-extrabold text-emerald-700 text-center">MỚI</div>';
  moi.out.forEach(([, nhan, html], i) => { const c = cu.out[i]; h += (c ? c[2] : '<div class="o">(bản cũ không có)</div>').replace('class="o bg-white"', 'class="o bg-white cu"') + html; });
  return h + '</div>';
}
// ---- danh mục hình dùng chung: mẫu gọi từng hàm; hàm vẽ nào trong figures.js chưa có mẫu thì báo ----
const DANH_MUC = [
  ["Bọ rùa 6 chấm", "ladybug()"], ["Xe tải chở phép tính", "truck('6 × 7')+truck('6 × 7 + 6')"], ["Đồng hồ kim", "clockSVG(3,30)"],
  ["Dãy số (tròn / vuông / thoi)", "daySo([6,12,18,24,30],2,-1,'tron',HM.vang)+daySo([8,16,24,32,40],1,3,'vuong',HM.vang)+daySo([45,36,27,18,9],3,-1,'thoi',HM.troi)"],
  ["Hộp bút n chiếc", "hopBut(6)+hopBut(8)"], ["Chuỗi bướm → hoa", "chuoiBuom(6,['× 4',': 3'],[null,null])"], ["Thanh gỗ cưa n đoạn", "thanhGo(6,48)"],
  ["Đội kéo co", "doiKeoCo(1)"], ["Sơ đồ mũi tên", "soDo([{v:7,h:'tron'},{v:null,h:'vuong'}],['× 4'])+soDo([{v:8,h:'vuong'},{v:'',h:'tron'},{v:null,h:'vuong'}],['× 3','+ 5'])"],
  ["Bạch tuộc 8 xúc tu", "bachTuoc()"], ["Con cua 8 chân 2 càng", "conCua()"], ["Quả bóng chở phép tính", "bong('7 × 4')"],
  ["Tuần lễ (dải 7 ngày)", "tuanLe(1)"], ["Hộp đựng cốc", "hopCoc(7)"], ["Bảng nhiều cột", "bangCot(['Thừa số','Thừa số','Tích'],[[6,2,12],[6,3,18],[6,4,24]],{c:1,r:2})"],
  ["Đội múa rồng", "doiMuaRong(1)"], ["Dưa hấu chở phép tính", "melon('9 × 4')+melon('9 × 5 + 9')"], ["Hướng dương chở phép tính", "flower('81 : 9')+flower('63 : 9 + 3')"],
  ["Thuyền buồm", "thuyen()"], ["Túi 9 quả cam", "tuiCam()"], ["Hàng can", "hangCan(5)"], ["Hàng hình cân đối", "xepHang([ladybug(),ladybug(),ladybug(),ladybug(),ladybug()],4)"],
  ["Ảnh kho hinh/", "anh('boy',48)+anh('girl',48)+anh('bouquet',48)"],
];
const KHONG_PHAI_HINH = new Set(["rnd", "pick", "shuffle", "svgHinh", "anh", "anhSVG", "chuSo", "nhanTron", "nhanVien", "xepHang", "coChu", "tinhBT", "soChon", "oHoi",
  "bnDaySo", "bnKiemDay", "bnBang", "bnKiemBang", "bnTinh", "bnKiemTinh"]);
function dungDanhMuc() {
  const ctx = napBai(null), src = docFile("figures.js"), co = new Set(DANH_MUC.map(([, e]) => (e.match(/^\w+/) || [])[0]));
  const thieu = [...src.matchAll(/^function (\w+)/gm)].map((m) => m[1]).filter((f) => !KHONG_PHAI_HINH.has(f) && !co.has(f) && !DANH_MUC.some(([, e]) => e.includes(f + "(")));
  if (thieu.length) console.log("  ⚠ Hàm vẽ chưa có mẫu trong DANH_MUC: " + thieu.join(", "));
  let h = '<h1 class="text-2xl font-extrabold text-orange-700 mb-3">Danh mục hình dùng chung (figures.js)</h1><div class="grid gap-3" style="grid-template-columns:repeat(2,minmax(0,1fr))">';
  for (const [ten, e] of DANH_MUC) { let v; try { v = vm.runInContext(e, ctx); } catch (er) { v = 'LỖI ' + er.message; }
    h += '<div class="o bg-white" data-vitri="' + ten + '"><div class="font-extrabold text-slate-700">' + ten + '</div><code class="text-xs text-slate-600" style="word-break:break-all">' + e.replace(/</g, "&lt;") + '</code><div class="mt-2">' + v + '</div></div>'; }
  return h + '</div>';
}
function dungKhoHinh(dir) {
  const ds = fs.readdirSync(path.join(REPO, dir)).filter((f) => f.endsWith(".svg")).sort();
  const o = (nen, mau) => '<div style="background:' + nen + ';padding:10px;border-radius:12px;display:flex;flex-wrap:wrap;gap:14px">' + ds.map((f) =>
    '<div style="text-align:center;width:120px;color:' + mau + ';font:12px system-ui"><img src="' + dir + '/' + f + '" width="96" height="96"><br><img src="' + dir + '/' + f + '" width="48" height="48"><br>' + f + '</div>').join("") + '</div>';
  return '<h1 class="text-xl font-extrabold mb-2">Kho hình ' + dir + '/ (' + ds.length + ')</h1>' + o("#ffffff", "#334155") + '<div style="height:12px"></div>' + o("#1e293b", "#e2e8f0");
}
const KHUNG = (giao, body) => '<!doctype html><html lang="vi" data-theme="' + giao + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
  + '<script src="https://cdn.tailwindcss.com"></script><link rel="stylesheet" href="/engine.css">'
  + '<style>body{padding:16px} .o{border:2px solid #fde68a;border-radius:16px;padding:10px;text-align:center;min-width:0} .cu{opacity:.92;border-style:dashed}</style></head>'
  + '<body class="bg-amber-50"><div id="card">' + body + '</div></body></html>';

// ---- SOÁT HÌNH tự động — chạy TRONG trang, trên từng thẻ câu .o (bỏ thẻ «cũ» ở chế độ so sánh) ----
// lỗi: emoji hệ thống · chữ trong hình nhỏ < 12px sau khi co · chữ đè chữ · chữ tràn khỏi nhãn trắng / khỏi hình ·
//      thẻ tràn ngang · ảnh hỏng.   cảnh báo: chữ < 14px · hàng hình rớt một hình lẻ · màu ngoài bảng HM.
const SOAT = (bang) => `(function(){
  var BANG=${JSON.stringify(bang)}, loi=[], canh=[], lechMau={};
  function hex(c){ var m=/rgba?\\(([^)]+)\\)/.exec(c||''); if(!m) return null; var p=m[1].split(/[\\s,\\/]+/).filter(Boolean).map(Number); if(p.length>3 && p[3]<0.5) return null;
    return '#'+p.slice(0,3).map(function(v){ return ('0'+Math.round(v).toString(16)).slice(-2); }).join('').toUpperCase(); }
  function giao(a,b){ var w=Math.min(a.right,b.right)-Math.max(a.left,b.left), h=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top); return (w>1.5 && h>1.5) ? w*h : 0; }
  function trong(a,b,du){ return a.left>=b.left-du && a.right<=b.right+du && a.top>=b.top-du && a.bottom<=b.bottom+du; }
  document.querySelectorAll('.o:not(.cu)').forEach(function(o){
    var vt=o.getAttribute('data-vitri')||'?';
    o.scrollIntoView({block:'center'});   /* elementsFromPoint chỉ thấy phần đang trong màn hình */
    var W=document.createTreeWalker(o, NodeFilter.SHOW_TEXT), n; while((n=W.nextNode())){ if(/\\p{Extended_Pictographic}/u.test(n.nodeValue)) loi.push(vt+': EMOJI hệ thống «'+n.nodeValue.trim().slice(0,12)+'» — thay bằng hình (anh() hoặc tự vẽ)'); }
    o.querySelectorAll('img').forEach(function(i){ if(!i.naturalWidth) loi.push(vt+': ẢNH HỎNG '+i.getAttribute('src')); });
    if(o.scrollWidth>o.clientWidth+2) loi.push(vt+': thẻ TRÀN NGANG '+o.scrollWidth+' > '+o.clientWidth+'px');
    o.querySelectorAll('svg').forEach(function(sv){
      var R=sv.getBoundingClientRect(), vb=sv.viewBox&&sv.viewBox.baseVal, k=(vb&&vb.width)?R.width/vb.width:1, tx=[].slice.call(sv.querySelectorAll('text'));
      tx.forEach(function(t,i){
        var co=parseFloat(t.getAttribute('font-size')||getComputedStyle(t).fontSize)*k, r=t.getBoundingClientRect(), chu=(t.textContent||'').trim();
        if(!chu) return;
        if(co<12) loi.push(vt+': chữ «'+chu+'» trong hình chỉ '+co.toFixed(1)+'px (cần ≥ 14)'); else if(co<14) canh.push(vt+': chữ «'+chu+'» '+co.toFixed(1)+'px (nên ≥ 14)');
        if(!trong(r,R,1)) loi.push(vt+': chữ «'+chu+'» TRÀN khỏi hình');
        for(var j=i+1;j<tx.length;j++){ var r2=tx[j].getBoundingClientRect(); if(giao(r,r2)>4 && (tx[j].textContent||'').trim()) loi.push(vt+': chữ «'+chu+'» ĐÈ chữ «'+tx[j].textContent.trim()+'»'); }
        var duoi=document.elementsFromPoint(r.left+r.width/2, r.top+r.height/2).filter(function(e){ return e!==t && sv.contains(e) && /^(rect|circle|ellipse|path)$/.test(e.tagName); })[0];
        if(duoi && hex(getComputedStyle(duoi).fill)==='#FFFFFF' && !trong(r, duoi.getBoundingClientRect(), 1)) loi.push(vt+': chữ «'+chu+'» TRÀN khỏi nhãn trắng');
      });
      var tach=[].slice.call(sv.querySelectorAll('circle[data-dem],rect[data-dem],ellipse[data-dem],circle[data-tach],rect[data-tach]'));   /* chi tiết để đếm / hạt dãy số: không được chạm nhau */
      for(var a=0;a<tach.length;a++) for(var b2=a+1;b2<tach.length;b2++){ var ra=tach[a].getBoundingClientRect(), rb=tach[b2].getBoundingClientRect();
        if(tach[a].tagName==='circle' && tach[b2].tagName==='circle'){ var d=Math.hypot((ra.left+ra.right-rb.left-rb.right)/2,(ra.top+ra.bottom-rb.top-rb.bottom)/2); if(d < (ra.width+rb.width)/2-0.5){ loi.push(vt+': hai chi tiết «'+(tach[a].getAttribute('data-dem')||'hạt')+'» CHẠM / ĐÈ nhau'); a=tach.length; break; } }
        else if(giao(ra,rb)>2){ loi.push(vt+': hai chi tiết «'+(tach[a].getAttribute('data-dem')||'hạt')+'» CHẠM / ĐÈ nhau'); a=tach.length; break; } }
      sv.querySelectorAll('rect,circle,ellipse,path,polygon').forEach(function(e){ var b=e.getBBox ? e.getBBox() : {width:9,height:9}; if(b.width<1 || b.height<1) return;   /* nét thẳng (dây, gậy) không có diện tích tô */
        var f=hex(getComputedStyle(e).fill); if(f && BANG.indexOf(f)<0) lechMau[f]=(lechMau[f]||0)+1; });
    });
    o.querySelectorAll('div').forEach(function(d){   /* hàng hình: các con trực tiếp đều chứa svg/img -> xem có rớt 1 hình lẻ không */
      var con=[].slice.call(d.children); if(con.length<3 || !con.every(function(c){ return c.matches('svg,img') || (c.querySelector && c.querySelector('svg,img') && c.children.length<=1); })) return;
      var hang={}; con.forEach(function(c){ var y=Math.round(c.getBoundingClientRect().top/4); hang[y]=(hang[y]||0)+1; });
      var ds=Object.keys(hang).sort(function(a,b){ return a-b; }).map(function(y){ return hang[y]; });
      if(ds.length>1 && ds[ds.length-1]===1 && ds[0]>=3) canh.push(vt+': hàng hình RỚT 1 hình lẻ ('+ds.join(' + ')+') — dùng xepHang() hoặc gộp thành một SVG');
    });
  });
  var lm=Object.keys(lechMau).sort(function(a,b){ return lechMau[b]-lechMau[a]; });
  if(lm.length) canh.push('màu NGOÀI bảng HM: '+lm.slice(0,10).map(function(c){ return c+'×'+lechMau[c]; }).join(', ')+(lm.length>10?' …':''));
  return {loi:loi, canh:canh};
})()`;
function bangMau() {   // màu được phép: mọi giá trị trong HM + vài màu phụ dùng chung
  const src = docFile("figures.js"), m = /var HM = \{([\s\S]*?)\};/.exec(src), ds = new Set(["#FFFFFF", "#F4F4F4", "#00A35F", "#FFC83D", "#475569"]);
  if (m) for (const x of m[1].matchAll(/#[0-9A-Fa-f]{6}/g)) ds.add(x[0].toUpperCase());
  return [...ds];
}

// ---- server tĩnh: phục vụ repo (hinh/, engine.css như trên Vercel) + các trang dựng trong bộ nhớ ----
const TRANG = {};
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png" };
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split("?")[0]);
  if (TRANG[u]) { res.writeHead(200, { "content-type": MIME[".html"] }); return res.end(TRANG[u]); }
  const f = path.join(REPO, u);
  if (!f.startsWith(REPO) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": MIME[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = "http://127.0.0.1:" + server.address().port;

const viec = [];   // [tên, đường-dẫn, rộng]
const them = (ten, html, rong) => { const u = "/__" + ten + ".html"; TRANG[u] = html; viec.push([ten, u, rong]); };
if (opt.hinh) for (const g of GIAO) them("kho-hinh_" + g, KHUNG(g, dungKhoHinh(opt.hinh)), RONGS[0]);
else if (opt.danhmuc) for (const g of GIAO) them("danh-muc_" + g, KHUNG(g, dungDanhMuc()), RONGS[0]);
else if (opt.trang) { const html = path.isAbsolute(opt.trang) ? fs.readFileSync(opt.trang, "utf8") : fs.readFileSync(path.join(REPO, opt.trang), "utf8"); them(path.basename(opt.trang, ".html"), html, RONGS[0]); }
else for (const b of BAIS) for (const g of GIAO) for (const r of RONGS)
  them(b + "_" + g + "_" + r + (opt.so ? "_so" : ""), KHUNG(g, opt.so ? dungSoSanh(b, opt.so) : dungBai(b, r)), opt.so ? Math.max(r, 900) : r);
if (!viec.length) { console.error("Không có gì để làm"); process.exit(2); }

// ---- Chrome ngầm ----
// Windows (máy thầy) + Linux (phiên đám mây: Chrome hệ thống hoặc bản Playwright tải về ~/.cache/ms-playwright)
const PW = path.join(os.homedir(), ".cache", "ms-playwright");
const pwChrome = fs.existsSync(PW) ? fs.readdirSync(PW).filter((d) => /^chromium/.test(d)).flatMap((d) =>
  ["chrome-linux/chrome", "chrome-linux64/chrome", "chrome-linux/headless_shell"].map((f) => path.join(PW, d, f))) : [];
const CHROME = process.env.CHROME || ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium", "/usr/bin/chromium-browser", ...pwChrome].find((p) => fs.existsSync(p));
if (!CHROME) { console.error("Không tìm thấy Chrome/Edge/Chromium — đặt biến CHROME"); process.exit(2); }
const LINUX = process.platform === "linux" ? ["--no-sandbox", "--disable-dev-shm-usage"] : [];
const port = 9300 + Math.floor(Math.random() * 600);
const udd = fs.mkdtempSync(path.join(os.tmpdir(), "sgd-chrome-"));
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--mute-audio", ...LINUX,
  `--remote-debugging-port=${port}`, `--user-data-dir=${udd}`, "about:blank"], { stdio: "ignore" });
let list; for (let i = 0; i < 60 && !list; i++) { await sleep(200); try { list = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch {} }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let seq = 0; const pend = new Map();
ws.addEventListener("message", (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result || {}); pend.delete(d.id); } });
const cdp = (method, params = {}) => new Promise((res) => { const id = ++seq; pend.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
const ev = async (e) => (await cdp("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true })).result?.value;
await cdp("Page.enable"); await cdp("Runtime.enable");

const BANG = bangMau(); let tongLoi = 0, tongCanh = 0;
for (const [ten, url, rong] of viec) {
  await cdp("Emulation.setDeviceMetricsOverride", { width: rong, height: 900, deviceScaleFactor: 1, mobile: rong < 700 });
  await cdp("Page.navigate", { url: BASE + url });
  for (let t = 0; t < 100; t++) { await sleep(150); if (await ev("document.readyState==='complete' && !!window.tailwind && [...document.images].every(i=>i.complete)")) break; }
  await sleep(600);
  if (opt.soat) {
    const kq = await ev(SOAT(BANG)) || { loi: ["không chạy được bộ soát"], canh: [] };
    tongLoi += kq.loi.length; tongCanh += kq.canh.length;
    console.log("■ " + ten + ": " + (kq.loi.length || kq.canh.length ? kq.loi.length + " lỗi · " + kq.canh.length + " cảnh báo" : "sạch"));
    kq.loi.forEach((x) => console.log("  ✗ " + x)); kq.canh.slice(0, 12).forEach((x) => console.log("  ⚠ " + x)); if (kq.canh.length > 12) console.log("  ⚠ … và " + (kq.canh.length - 12) + " cảnh báo nữa");
  } else {
    const vo = await ev("[...document.images].filter(i=>!i.naturalWidth).map(i=>i.getAttribute('src'))");
    if (vo && vo.length) { tongLoi += vo.length; console.log("  ẢNH HỎNG trong " + ten + ": " + [...new Set(vo)].join(", ")); }
  }
  if (CHUP) {
    const H = await ev("document.documentElement.scrollHeight"); let k = 0;
    for (let y = 0; y < H; y += 900) {
      const s = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y, width: rong, height: Math.min(900, H - y), scale: 1 } });
      fs.writeFileSync(path.join(OUT, ten + "_" + (++k) + ".png"), Buffer.from(s.data, "base64"));
    }
    console.log("  " + ten + ": " + k + " ảnh (cao " + H + "px)");
  }
}
ws.close(); chrome.kill(); server.close();
try { fs.rmSync(udd, { recursive: true, force: true }); } catch {}
if (opt.soat) { console.log("── SOÁT HÌNH: " + (tongLoi ? "CÓ LỖI (" + tongLoi + ")" : "ĐẠT") + " · " + tongCanh + " cảnh báo"); process.exit(tongLoi ? 1 : 0); }
