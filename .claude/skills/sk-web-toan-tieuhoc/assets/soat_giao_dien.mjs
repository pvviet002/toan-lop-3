// soat_giao_dien.mjs — SOÁT GIAO DIỆN TỰ ĐỘNG các bài Engine v2 bằng Chrome chạy ngầm (DevTools).
//
//   node soat_giao_dien.mjs <thư-mục-repo> [bai-9 bai-10 ...] [--cau 4] [--chup <thư mục ảnh>]
//
// Không ghi tên bài ⇒ soát mọi bai-<N>.js có trong repo.
// Mỗi bài × 3 giao diện (Sáng/Tối/Dịu mắt) × 2 khổ (điện thoại 375×812, máy tính 1280×800):
// mở từng tab, sinh --cau câu (mặc định 4), mỗi câu soát:
//   ✗ LỖI  (chặn deploy): chữ quá mờ — tương phản < 3:1 · tràn ngang trang · lỗi JavaScript
//   ⚠ CẢNH BÁO: tương phản 3–4.5:1 với chữ nhỏ · chữ nằm đè lên nhiều màu nền (vd số đè lên múi bóng)
//                · chữ tràn khỏi nút · hình/chữ thò ra ngoài thẻ câu hỏi
// Còn soát bảng 🖥 Hiển thị ở mỗi giao diện. Nền chuyển màu (header gradient) được bỏ qua.
// THÍCH ỨNG (trang mở với ?kiemthu=1 -> window.__ENG): soát câu ở TỪNG mức của mỗi tab; tự chơi thử mỗi tab
//   (đúng,đúng -> Mức 2; đúng,đúng -> Mức 3; sai, làm lại đúng (không tính), sai -> Mức 2) và kiểm nhật ký;
//   kiểm luật chấm mức trên 7 nhật ký mẫu; soát màn đánh giá cuối buổi + bảng Hồ sơ ở mọi giao diện/khổ.
//   Đã thử đột biến (lên mức sau 3 câu, ngưỡng 90%) -> công cụ báo LỖI đúng chỗ.
// Chặn tải hits.sh để KHÔNG làm tăng bộ đếm lượt truy cập thật.
// Mã thoát 1 nếu có LỖI — dùng làm cổng trước khi deploy.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import http from "node:http";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
function opt(name, def) { const i = args.indexOf(name); if (i < 0) return def; const v = args[i + 1]; args.splice(i, 2); return v; }
const SO_CAU = +opt("--cau", 2);   // số câu soát ở MỖI mức của mỗi tab
const CHUP = opt("--chup", null);
const ANH = opt("--anh", null);   // --anh <dir>: chụp câu đầu của MỌI tab (điện thoại; cả 3 giao diện) để duyệt bằng mắt
if (ANH) fs.mkdirSync(ANH, { recursive: true });
const REPO = args[0] ? path.resolve(args.shift()) : null;
if (!REPO || !fs.existsSync(REPO)) { console.error("Cách dùng: node soat_giao_dien.mjs <thư-mục-repo> [bai-9 ...] [--cau 4] [--chup <dir>]"); process.exit(2); }
let BAI = args.map((a) => a.replace(/\.(js|html)$/, ""));
if (!BAI.length) BAI = fs.readdirSync(REPO).filter((f) => /^bai-\d+\.js$/.test(f)).map((f) => f.replace(".js", ""))
  .sort((a, b) => +a.split("-")[1] - +b.split("-")[1]);
const THEMES = [["light", "Sáng"], ["dark", "Tối"], ["sepia", "Dịu mắt"]];
const VPS = [["điện thoại", 375, 812, true], ["máy tính", 1280, 800, false]];
if (CHUP) fs.mkdirSync(CHUP, { recursive: true });

// Windows (máy thầy) + Linux (phiên đám mây: Chrome hệ thống hoặc bản Playwright tải về ~/.cache/ms-playwright)
const PW = path.join(os.homedir(), ".cache", "ms-playwright");
const pwChrome = fs.existsSync(PW) ? fs.readdirSync(PW).filter((d) => /^chromium/.test(d)).flatMap((d) =>
  ["chrome-linux/chrome", "chrome-linux64/chrome", "chrome-linux/headless_shell"].map((f) => path.join(PW, d, f))) : [];
const CHROME = process.env.CHROME || ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium", "/usr/bin/chromium-browser", ...pwChrome].find((p) => fs.existsSync(p));
const LINUX = process.platform === "linux" ? ["--no-sandbox", "--disable-dev-shm-usage"] : [];
const CHROME_ARGS = (process.env.CHROME_ARGS || "").split(" ").filter(Boolean);   // cờ thêm cho Chrome, vd giả lập mạng chặn CDN

// CDN -> bản lưu sẵn trong assets/vendor (phiên đám mây chặn CDN; trên máy cũng nhanh, ổn định). CDN_THAT=1: tải thật.
const VENDOR = path.join(path.dirname(fileURLToPath(import.meta.url)), "vendor");
const CDN_LUU = [[/^https:\/\/cdn\.tailwindcss\.com(\/|$)/, "tailwind.js"],
  [/canvas-confetti@[\d.]+\/dist\/confetti\.browser\.min\.js/, "confetti.browser.min.js"]];
let soCdnLuu = 0;
function phucVuCdn(p) {
  const hit = CDN_LUU.find(([re]) => re.test(p.request.url)), f = hit && path.join(VENDOR, hit[1]);
  if (f && fs.existsSync(f)) { soCdnLuu++; cdp("Fetch.fulfillRequest", { requestId: p.requestId, responseCode: 200, body: fs.readFileSync(f).toString("base64"),
    responseHeaders: [{ name: "Content-Type", value: "text/javascript; charset=utf-8" }, { name: "Access-Control-Allow-Origin", value: "*" }] }).catch(() => {}); }
  else cdp("Fetch.continueRequest", { requestId: p.requestId }).catch(() => {});
}
if (!CHROME) { console.error("Không tìm thấy Chrome/Edge — đặt biến CHROME"); process.exit(2); }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// nhật ký mẫu cho M mục tiêu: mức đạt lần lượt 3,2,1,2,0 (lặp) -> ngọn lửa chung = trung vị; engine phải ra đúng và vẽ khớp
const mongTM = (M) => { const d = []; for (let i = 0; i < M; i++) d.push([3, 2, 1, 2, 0][i % 5]); d.sort((x, y) => x - y); return d[Math.floor((M - 1) / 2)]; };
const m5 = (o) => o.tong !== mongTM(o.M) || !o.khop;

// ---- server tĩnh (giống Vercel: phục vụ thẳng thư mục repo) ----
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".json": "application/json" };
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split("?")[0]);
  if (u === "/__trong") { res.writeHead(200, { "content-type": "text/html" }); return res.end("<!doctype html><title>.</title>"); }
  const f = path.join(REPO, u === "/" ? "index.html" : u);
  if (!f.startsWith(REPO) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": MIME[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = "http://127.0.0.1:" + server.address().port;

// ---- Chrome ngầm + DevTools ----
const port = 9300 + Math.floor(Math.random() * 600);
const udd = fs.mkdtempSync(path.join(os.tmpdir(), "sgd-chrome-"));
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--mute-audio", ...LINUX, ...CHROME_ARGS,
  `--remote-debugging-port=${port}`, `--user-data-dir=${udd}`, "about:blank"], { stdio: "ignore" });
let ws, seq = 0; const pend = new Map(); const jsLoi = [];
function cdp(method, params = {}) {
  return new Promise((res, rej) => { const id = ++seq; pend.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); });
}
async function ev(expr) {
  const r = await cdp("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error("lỗi JS khi soát: " + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
  return r.result.value;
}
async function doiDen(expr, ms = 15000) {
  for (let t = 0; t < ms / 100; t++) { if (await ev(expr).catch(() => false)) return true; await sleep(100); }
  return false;
}

// ---- hàm soát chạy TRONG trang: trả { loi:[], canh:[], boQua } ----
const SOAT = (goc) => `(function(){
  var ROOT = document.querySelector(${JSON.stringify(goc)}) || document.body;
  function parse(c){ var m=/rgba?\\(([^)]+)\\)/.exec(c||''); if(!m) return null; var p=m[1].split(/[\\s,\\/]+/).filter(Boolean).map(Number);
    return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; }
  function lum(c){ function f(v){ v/=255; return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4); } return 0.2126*f(c.r)+0.7152*f(c.g)+0.0722*f(c.b); }
  function tp(a,b){ var x=lum(a), y=lum(b); return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05); }
  function hex(c){ return '#'+[c.r,c.g,c.b].map(function(v){ return ('0'+Math.round(v).toString(16)).slice(-2); }).join(''); }
  var SHAPE={circle:1,rect:1,path:1,ellipse:1,polygon:1,polyline:1};
  function nenTai(x,y,el){
    var st=document.elementsFromPoint(x,y), i=st.indexOf(el); if(i<0) i=0;
    for(; i<st.length; i++){
      var e=st[i]; if(e.id==='siteCounter'||e.id==='toast'||(e.closest&&e.closest('#siteCounter,#toast'))) continue;
      var cs=getComputedStyle(e), tag=e.tagName.toLowerCase();
      if(e instanceof SVGElement){
        if(!SHAPE[tag]) continue;
        var f=parse(cs.fill); if(!f||cs.fill==='none') continue;
        var a=f.a*(+cs.fillOpacity||1)*(+cs.opacity||1); if(a>=0.5) return f; continue;
      }
      if(tag==='img') return {anh:1};
      if(cs.backgroundImage && /gradient/.test(cs.backgroundImage)) return {doc:1};
      var b=parse(cs.backgroundColor); if(b && b.a>=0.5) return b;
    }
    return parse(getComputedStyle(document.body).backgroundColor)||{r:255,g:255,b:255,a:1};
  }
  var loi=[], canh=[], boQua=0, soChu=0;
  var W=document.createTreeWalker(ROOT, NodeFilter.SHOW_TEXT), n;
  var ds=[]; while((n=W.nextNode())) ds.push(n);
  ds.forEach(function(n){
    var t=n.nodeValue; if(!/[\\p{L}\\p{N}]/u.test(t)) return;
    var el=n.parentElement; if(!el || el.closest('script,style,#siteCounter,#toast,option')) return;
    var cs=getComputedStyle(el); if(cs.visibility==='hidden' || +cs.opacity<0.2) return;
    var rg=document.createRange(); rg.selectNodeContents(n); var rs=rg.getClientRects(); if(!rs.length) return;
    var r=rs[0]; if(r.width<2||r.height<2) return;
    if(r.top<0||r.bottom>innerHeight){ el.scrollIntoView({block:'center'}); rs=rg.getClientRects(); if(!rs.length) return; r=rs[0]; }
    soChu++;
    var mau=parse(el instanceof SVGElement? cs.fill : cs.color); if(!mau) return;
    var y=r.top+r.height/2, d=Math.min(3,r.width/4), xs=[r.left+d, r.left+r.width/2, r.right-d];
    var nens=[], min=99, nenMin=null;
    for(var k=0;k<xs.length;k++){
      var b=nenTai(xs[k],y,el); if(b.doc||b.anh){ boQua++; return; }
      nens.push(b); var c=tp(mau,b); if(c<min){ min=c; nenMin=b; }
    }
    var fs=parseFloat(cs.fontSize), fw=parseInt(cs.fontWeight,10)||400;
    var lon = fs>=24 || (fs>=18.66 && fw>=700), can = lon?3:4.5;
    var chu=t.trim().replace(/\\s+/g,' ').slice(0,28);
    var tt={chu:chu, tp:Math.round(min*100)/100, mau:hex(mau), nen:hex(nenMin)};
    if(min<3) loi.push(Object.assign({k:'chữ quá mờ'},tt));
    else if(min<can) canh.push(Object.assign({k:'tương phản thấp'},tt));
    var lech=0; for(var a=0;a<nens.length;a++) for(var b2=a+1;b2<nens.length;b2++)
      lech=Math.max(lech, Math.abs(nens[a].r-nens[b2].r)+Math.abs(nens[a].g-nens[b2].g)+Math.abs(nens[a].b-nens[b2].b));
    if(lech>90) canh.push(Object.assign({k:'chữ đè lên nhiều màu nền'},tt));
  });
  if(ROOT===document.body || ROOT.id==='appwrap'){
    if(document.documentElement.scrollWidth>innerWidth+1) loi.push({k:'tràn ngang trang', chu:'rộng '+document.documentElement.scrollWidth+'px > '+innerWidth+'px'});
    var card=document.getElementById('card');
    if(card){
      var cr=card.getBoundingClientRect();
      Array.prototype.forEach.call(card.querySelectorAll('#answerArea button'), function(b){
        if(b.scrollWidth>b.clientWidth+1) canh.push({k:'chữ tràn khỏi nút', chu:b.textContent.trim().slice(0,28)}); });
      var thoRa=null; Array.prototype.forEach.call(card.querySelectorAll('*'), function(e){ if(thoRa) return;
        var r=e.getBoundingClientRect(); if(r.width && (r.right>cr.right+1 || r.left<cr.left-1)) thoRa=e; });
      if(thoRa) canh.push({k:'thò ra ngoài thẻ câu hỏi', chu:(thoRa.textContent||thoRa.tagName).trim().slice(0,28)});
    }
  }
  return {loi:loi, canh:canh, boQua:boQua, soChu:soChu};
})()`;

// ---- chạy ----
let tongLoi = 0, tongCanh = 0;
const tomTat = [];
try {
  let list;
  for (let t = 0; t < 60 && !list; t++) { try { const r = await fetch(`http://127.0.0.1:${port}/json/list`); if (r.ok) list = await r.json(); } catch (e) {} if (!list) await sleep(200); }
  if (!list) throw new Error("không kết nối được Chrome");
  ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.addEventListener("open", r); ws.addEventListener("error", j); });
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); }
    else if (m.method === "Runtime.exceptionThrown") jsLoi.push(m.params.exceptionDetails.exception?.description?.split("\n")[0] || m.params.exceptionDetails.text);
    else if (m.method === "Fetch.requestPaused") phucVuCdn(m.params);
  });
  await cdp("Page.enable"); await cdp("Runtime.enable"); await cdp("Network.enable");
  if (!process.env.CDN_THAT) await cdp("Fetch.enable", { patterns: [{ urlPattern: "*cdn.tailwindcss.com*" }, { urlPattern: "*cdn.jsdelivr.net*" }] });
  await cdp("Network.setBlockedURLs", { urls: ["*hits.sh*"] });

  for (const bai of BAI) {
    if (!fs.existsSync(path.join(REPO, bai + ".html"))) { console.log(`\n■ ${bai}: không có ${bai}.html — bỏ qua`); continue; }
    console.log(`\n■ ${bai}`);
    const gom = new Map();   // khoá vấn đề → {mức, k, vd, lần, nơi:Set}
    const them = (muc, it, noi) => {
      const key = muc + "|" + it.k + "|" + String(it.chu).replace(/\d+/g, "#") + "|" + (it.mau || "") + "|" + (it.nen || "");
      const g = gom.get(key) || { muc, it, lan: 0, noi: new Set() }; g.lan++; g.noi.add(noi); gom.set(key, g);
    };
    for (const [th, thTen] of THEMES) for (const [vpTen, w, h, mob] of VPS) {
      const noi = thTen + " · " + vpTen;
      await cdp("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: mob });
      await cdp("Page.navigate", { url: BASE + "/__trong" }); await doiDen("document.readyState==='complete'");
      await ev(`localStorage.setItem('toanlop3-cfg', JSON.stringify({sound:false,size:'md',device:'auto',theme:'${th}'})); localStorage.removeItem('toanlop3-bai-${bai.split("-")[1]}'); 1`);
      jsLoi.length = 0;
      await cdp("Page.navigate", { url: BASE + "/" + bai + ".html?kiemthu=1" });
      const san = await doiDen("document.querySelectorAll('#tabs button').length>0 && getComputedStyle(document.getElementById('card')).borderTopLeftRadius!=='0px'");
      if (!san) { them("loi", { k: "trang không dựng được (engine/Tailwind chưa chạy)", chu: bai }, noi); continue; }
      const coCong = await ev("!!window.__ENG");
      const soTab = await ev("document.querySelectorAll('#tabs button').length");
      for (let i = 0; i < soTab; i++) {
        const tenTab = await ev(`(function(){ var b=document.querySelectorAll('#tabs button')[${i}]; b.click(); return b.textContent.replace(/★/g,'').trim(); })()`);
        await sleep(250);
        const L = coCong ? await ev("__ENG.nLv()") : 1;
        for (let l = 1; l <= L; l++) {   // soát câu ở TỪNG mức
          if (L > 1) { await ev(`__ENG.datMuc(${l})`); await sleep(250); }
          const nhan = tenTab + (L > 1 ? " · Mức " + l : "");
          let daChup = false;
          for (let q = 0; q < SO_CAU; q++) {
            if (ANH && mob && q === 0) {
              const clip = await ev("(function(){ var s=document.getElementById('secname'); s.scrollIntoView({block:'start'}); var a=s.getBoundingClientRect(), c=document.getElementById('card').getBoundingClientRect(); return {x:0, y:Math.max(0,a.top-6)+scrollY, width:innerWidth, height:Math.min(c.bottom+8, a.top+1400)-Math.max(0,a.top-6)}; })()");
              await sleep(350);
              const s = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { ...clip, scale: 1 } });
              fs.writeFileSync(path.join(ANH, `${bai}_${th}_tab${i + 1}${L > 1 ? "_m" + l : ""}.png`), Buffer.from(s.data, "base64"));
            }
            const kq = await ev(SOAT("#appwrap"));
            kq.loi.forEach((it) => them("loi", it, noi + " · " + nhan));
            kq.canh.forEach((it) => them("canh", it, noi + " · " + nhan));
            if (CHUP && !daChup && (kq.loi.length || kq.canh.length)) {
              await ev("window.scrollTo(0,0); document.getElementById('card').scrollIntoView({block:'center'}); 1");
              const s = await cdp("Page.captureScreenshot", { format: "png" });
              fs.writeFileSync(path.join(CHUP, `${bai}_${th}_${w}_tab${i + 1}_m${l}.png`), Buffer.from(s.data, "base64")); daChup = true;
            }
            await ev("document.getElementById('btnNext').click(); 1"); await sleep(180);
          }
        }
      }
      // bảng Hiển thị
      await ev("document.getElementById('btnDisp').click(); 1"); await sleep(250);
      const kp = await ev(SOAT("#dispPanel > div.relative"));
      kp.loi.forEach((it) => them("loi", it, noi + " · bảng Hiển thị")); kp.canh.forEach((it) => them("canh", it, noi + " · bảng Hiển thị"));
      await ev("document.getElementById('dispClose').click(); 1");
      if (coCong) {
        // TỰ CHƠI THỬ luật thích ứng (một lần mỗi bài: Sáng · máy tính)
        if (th === "light" && !mob) {
          for (let i = 0; i < soTab; i++) {
            await ev(`document.querySelectorAll('#tabs button')[${i}].click(); 1`); await sleep(200);
            if ((await ev("__ENG.nLv()")) < 2) continue;
            await ev("__ENG.datMuc(1)"); await sleep(200);
            const buoc = [["C", 1], ["C", 2], ["C", 2], ["C", 3], ["W", 3], ["R", 3], ["W", 2]];   // R = làm lại đúng câu vừa sai: KHÔNG được tính
            const thucTe = [];
            for (const [kieu, mongDoi] of buoc) {
              const dung = kieu !== "W";
              await ev(`(function(){ var q=__ENG.cur(); if(q.type==='num'){ var i=document.getElementById('ans'); i.value=String(${dung}?q.ans:q.ans+1); document.querySelector('#answerArea button').click(); } else { var bs=document.querySelectorAll('#answerArea button'); var k=${dung}?q.correct:(q.correct+1)%bs.length; bs[k].click(); } return 1; })()`);
              const lvNay = await ev("__ENG.lv()"); thucTe.push(kieu + "→" + lvNay);
              if (lvNay !== mongDoi) { them("loi", { k: "luật lên/xuống mức sai", chu: "chuỗi " + buoc.map((b) => b[0]).join("") + " cho " + thucTe.join(" ") + " (mong " + mongDoi + ")" }, noi + " · " + (await ev(`document.querySelectorAll('#tabs button')[${i}].textContent`))); break; }
              await sleep(dung ? 1150 : 150);
            }
            const soGhi = await ev("__ENG.log().length");
            if (soGhi !== 6) them("loi", { k: "nhật ký lần trả lời đầu sai", chu: "ghi " + soGhi + " lần, mong 6 (lần làm lại không được tính)" }, noi + " · tab " + (i + 1));
            await ev("document.getElementById('btnNext').click(); 1"); await sleep(150);
          }
          // luật chấm mức trên nhật ký mẫu
          const CASE = [[[], 0], [[[1,1],[1,1]], 1], [[[1,1],[1,1],[2,1],[2,1],[3,1],[3,0],[3,1]], 3], [[[1,1],[1,1],[2,0],[2,1],[2,0]], 1],
                        [[[1,0],[1,1],[1,0],[1,1],[1,1]], 1], [[[1,1],[1,1],[2,1],[2,1],[3,0],[3,0],[2,1],[2,1]], 2], [[[1,0],[1,0],[1,1]], 0]];
          const kqCase = await ev("JSON.stringify(" + JSON.stringify(CASE.map((c) => c[0].map((e) => ({ lv: e[0], ok: !!e[1], ms: 4000 })))) + ".map(function(l){ return __ENG.danhGia(l).dat; }))");
          JSON.parse(kqCase).forEach((d, j) => { if (d !== CASE[j][1]) them("loi", { k: "luật chấm mức sai", chu: "nhật ký mẫu " + (j + 1) + ": ra Mức " + d + ", mong Mức " + CASE[j][1] }, noi); });
          // LUYỆN THÔNG MINH: tự chơi trọn một lượt rồi đối chiếu mọi hứa hẹn của thiết kế
          if (await ev("!!(window.__ENG && __ENG.smart)")) {
            await ev("__ENG.batDauTM(); 1"); await sleep(300);
            const kUI = await ev(SOAT("#appwrap"));
            kUI.loi.forEach((it) => them("loi", it, noi + " · Luyện thông minh")); kUI.canh.forEach((it) => them("canh", it, noi + " · Luyện thông minh"));
            const TRA_DUNG = "(function(){ var q=__ENG.cur(); if(q.type==='num'){ document.getElementById('ans').value=String(q.ans); document.querySelector('#answerArea button').click(); } else document.querySelectorAll('#answerArea button')[q.correct].click(); return 1; })()";
            const TRA_SAI = "(function(){ var q=__ENG.cur(), ks=Object.keys(q.sai||{}), k=ks.length?ks[0]:null;"
              + " if(q.type==='num'){ document.getElementById('ans').value = k!==null ? k : String(q.ans+1); document.querySelector('#answerArea button').click(); }"
              + " else { var bs=document.querySelectorAll('#answerArea button'); bs[k!==null ? +k : (q.correct+1)%bs.length].click(); }"
              + " return JSON.stringify({coNhan:k!==null, fb:document.getElementById('feedback').innerText}); })()";
            let daLamLai = false, soSaiCoNhan = 0;
            for (let i = 0; i < 32; i++) {
              if (await ev("!document.getElementById('endscreen').classList.contains('hidden')")) break;
              if (i % 4 !== 2) { await ev(TRA_DUNG); await sleep(1150); continue; }
              const r = JSON.parse(await ev(TRA_SAI));
              if (r.coNhan) { soSaiCoNhan++; if (/^Chưa đúng\. Bé thử lại nhé/.test(r.fb.trim())) them("loi", { k: "sai có nhãn lỗi mà không có gợi ý riêng", chu: r.fb.slice(0, 40) }, noi + " · Luyện thông minh"); }
              if (!daLamLai) {   // làm lại đúng câu vừa sai: KHÔNG được tính thêm vào nhật ký
                const n1 = await ev("__ENG.log().length"); await ev(TRA_DUNG); await sleep(1150);
                const n2 = await ev("__ENG.log().length"); if (n2 !== n1) them("loi", { k: "lần làm lại bị tính vào nhật ký", chu: n1 + " → " + n2 }, noi + " · Luyện thông minh");
                daLamLai = true;
              } else { await ev("document.getElementById('btnNext').click(); 1"); await sleep(250); }
            }
            const kq = JSON.parse(await ev(`(function(){
              var T=__ENG.T(), L=T.log, mts=__ENG.mts(), tp=window.BAI.topics, loi=[], TONG=window.BAI.soCau||18, TRAN=window.BAI.soCauToiDa||24;
              var dau={}; for(var i=0;i<mts.length && i<L.length;i++) dau[L[i].mt]=1;
              if(Object.keys(dau).length!==mts.length) loi.push('khởi động không đủ mỗi mục tiêu một câu');
              var sim={}; mts.forEach(function(m){ sim[m]={lv:2,up:0,down:0}; });
              L.forEach(function(e,i){
                if((tp[e.dang].mt||[]).indexOf(e.mt)<0) loi.push('câu '+(i+1)+': dạng «'+tp[e.dang].name+'» không thuộc mục tiêu '+e.mt);
                if(i>=2 && L[i].dang===L[i-1].dang && L[i].dang===L[i-2].dang) loi.push('câu '+(i+1)+': một dạng 3 câu liền');
                var s=sim[e.mt]; if(e.lv!==s.lv) loi.push('câu '+(i+1)+' ('+e.mt+'): mức '+e.lv+', luật cho mức '+s.lv);
                if(i<mts.length){ if(e.ok){ s.up=1; s.down=0; } else { s.lv=Math.max(1,s.lv-1); s.up=0; s.down=0; } }
                else if(e.ok){ s.up++; s.down=0; if(s.up>=2 && s.lv<3){ s.lv++; s.up=0; } } else { s.down++; s.up=0; if(s.down>=2 && s.lv>1){ s.lv--; s.down=0; } }
                if(!e.ok && i+9<L.length){ var co=false; for(var j=i+1;j<=i+9;j++) if(L[j].mt===e.mt) co=true; if(!co) loi.push('câu sai số '+(i+1)+' ('+e.mt+') không được ôn lại'); }
              });
              var dem={}; L.forEach(function(e){ dem[e.mt]=(dem[e.mt]||0)+1; });
              if(L.length<TONG || L.length>TRAN) loi.push('lượt dài '+L.length+' câu, ngoài khoảng '+TONG+'–'+TRAN);
              if(L.length<TRAN) mts.forEach(function(m){ if((dem[m]||0)<3) loi.push('mục tiêu '+m+' chỉ có '+(dem[m]||0)+' câu'); });
              var het=!document.getElementById('endscreen').classList.contains('hidden'); if(!het) loi.push('lượt không kết thúc');
              var tong=__ENG.uocLuong(L).tong, svg=document.querySelector('#endscreen svg.lua'), nhan=svg?svg.getAttribute('aria-label'):'';
              var mong = tong ? 'Mức '+tong : 'Đang làm quen'; if(nhan.indexOf(mong)<0) loi.push('ngọn lửa cuối «'+nhan+'» không khớp mức chấm ('+mong+')');
              return JSON.stringify({loi:loi, n:L.length});
            })()`));
            kq.loi.forEach((m) => them("loi", { k: "Luyện thông minh sai thiết kế", chu: m }, noi));
            if (!soSaiCoNhan) them("canh", { k: "lượt chơi thử không gặp câu sai nào có nhãn lỗi", chu: "chưa kiểm được gợi ý" }, noi);
            if (!kq.loi.length) console.log(`  · tự chơi Luyện thông minh: ${kq.n} câu, đủ mọi hứa hẹn thiết kế; ${soSaiCoNhan} câu sai có gợi ý riêng`);
            const kE = await ev(SOAT("#endscreen > div"));
            kE.loi.forEach((it) => them("loi", it, noi + " · kết thúc Luyện thông minh")); kE.canh.forEach((it) => them("canh", it, noi + " · kết thúc Luyện thông minh"));
          }
        }
        // màn kết thúc Luyện thông minh (mọi giao diện, mọi khổ) với nhật ký mẫu: 5 mục tiêu ra 3,2,1,2,0 -> ngọn lửa chung Mức 2
        if (await ev("!!(window.__ENG && __ENG.smart)")) {
          const ok = await ev(`(function(){ var m=__ENG.mts(), mau=[[[2,1],[2,1],[3,1],[3,1]],[[2,1],[2,1]],[[2,0],[1,1],[1,1]],[[2,1],[2,0],[2,1],[2,1]],[[2,0],[1,0],[1,1]]], log=[];
            m.forEach(function(id,i){ (mau[i%mau.length]).forEach(function(e){ log.push({mt:id, dang:0, lv:e[0], ok:!!e[1], ms:4000, loi:(e[1]?'':'canh-dong')}); }); });
            var u=__ENG.xongTM(log), svg=document.querySelector('#endscreen svg.lua'), nhan=svg?svg.getAttribute('aria-label'):'';
            return JSON.stringify({M:m.length, tong:u.tong, khop: nhan.indexOf(u.tong?'Mức '+u.tong:'Đang làm quen')>=0}); })()`);
          const o = JSON.parse(ok); await sleep(300);
          if (m5(o)) them("loi", { k: "màn kết thúc Luyện thông minh sai", chu: "chung Mức " + o.tong + " (mong Mức " + mongTM(o.M) + ")" + (o.khop ? "" : ", ngọn lửa không khớp") }, noi);
          const kT = await ev(SOAT("#endscreen > div"));
          kT.loi.forEach((it) => them("loi", it, noi + " · kết thúc Luyện thông minh")); kT.canh.forEach((it) => them("canh", it, noi + " · kết thúc Luyện thông minh"));
          if (ANH && mob) { const s = await cdp("Page.captureScreenshot", { format: "png" }); fs.writeFileSync(path.join(ANH, `${bai}_${th}_ketthuc_tm.png`), Buffer.from(s.data, "base64")); }
          await ev("document.getElementById('btnAgain').click(); 1"); await sleep(250);
          if (ANH && mob) { await ev("window.scrollTo(0,0); 1"); const s = await cdp("Page.captureScreenshot", { format: "png" }); fs.writeFileSync(path.join(ANH, `${bai}_${th}_tm_dangchoi.png`), Buffer.from(s.data, "base64")); }
        }
        // màn đánh giá cuối buổi + hồ sơ (mọi giao diện, mọi khổ)
        await ev("document.querySelectorAll('#tabs button')[0].click(); 1"); await sleep(200);
        const mau = [[1,1],[1,1],[2,1],[2,1],[3,1],[3,0],[3,1]].map((e) => ({ lv: e[0], ok: !!e[1], ms: 5000 }));
        const dg = await ev("__ENG.nLv()>1 ? __ENG.xong(" + JSON.stringify(mau) + ").dat : -1"); await sleep(400);
        if (dg !== -1) {
          const coChu = await ev("document.getElementById('endscreen').innerText.indexOf('Mức 3')>=0");
          if (dg !== 3 || !coChu) them("loi", { k: "màn đánh giá hiển thị sai", chu: "ra Mức " + dg + (coChu ? "" : ", thiếu chữ «Mức 3»") }, noi);
          const ke = await ev(SOAT("#endscreen > div"));
          ke.loi.forEach((it) => them("loi", it, noi + " · màn đánh giá")); ke.canh.forEach((it) => them("canh", it, noi + " · màn đánh giá"));
          const cao = await ev("(function(){ var d=document.querySelector('#endscreen > div').getBoundingClientRect(); return d.top>=0 || document.getElementById('endscreen').scrollHeight>innerHeight; })()");
          if (!cao) them("loi", { k: "màn đánh giá bị cắt, không cuộn được", chu: vpTen }, noi);
          if (ANH && mob) { const s = await cdp("Page.captureScreenshot", { format: "png" }); fs.writeFileSync(path.join(ANH, `${bai}_${th}_danhgia.png`), Buffer.from(s.data, "base64")); }
          await ev("document.getElementById('btnOther').click(); 1"); await sleep(150);
        }
        await ev("__ENG.hoSo(); 1"); await sleep(250);
        const kh = await ev(SOAT("#hoSoBox"));
        kh.loi.forEach((it) => them("loi", it, noi + " · hồ sơ")); kh.canh.forEach((it) => them("canh", it, noi + " · hồ sơ"));
        if (ANH && mob) { const s = await cdp("Page.captureScreenshot", { format: "png" }); fs.writeFileSync(path.join(ANH, `${bai}_${th}_hoso.png`), Buffer.from(s.data, "base64")); }
        await ev("document.getElementById('hoSoClose').click(); 1");
      }
      jsLoi.forEach((m) => them("loi", { k: "lỗi JavaScript", chu: m }, noi));
    }
    const ds = [...gom.values()].sort((a, b) => (a.muc === b.muc ? b.lan - a.lan : a.muc === "loi" ? -1 : 1));
    const nL = ds.filter((g) => g.muc === "loi").length, nC = ds.length - nL;
    tongLoi += nL; tongCanh += nC;
    tomTat.push([bai, nL, nC]);
    if (!ds.length) console.log("  đạt — không lỗi, không cảnh báo");
    ds.slice(0, +process.env.MAX || 25).forEach((g) => {
      const it = g.it, noi = [...g.noi];
      const mau = it.tp ? ` (tương phản ${it.tp}:1, chữ ${it.mau} trên nền ${it.nen})` : "";
      console.log(`  ${g.muc === "loi" ? "✗ LỖI" : "⚠"} ${it.k}: «${it.chu}»${mau} — ${g.lan} lần; ${noi.slice(0, 3).join(" | ")}${noi.length > 3 ? " | … +" + (noi.length - 3) + " nơi" : ""}`);
    });
    if (ds.length > 25) console.log(`  … và ${ds.length - 25} vấn đề khác`);
  }
} catch (e) { console.error("LỖI CÔNG CỤ: " + e.message); tongLoi++; }
finally {
  try { ws && ws.close(); } catch (e) {}
  chrome.kill(); server.close(); await sleep(300);
  try { fs.rmSync(udd, { recursive: true, force: true }); } catch (e) {}
}
console.log("\n── TÓM TẮT ──");
console.log(process.env.CDN_THAT ? "  (CDN tải thật)" : "  (CDN: " + soCdnLuu + " lượt dùng bản lưu sẵn assets/vendor)");
tomTat.forEach(([b, l, c]) => console.log(`  ${b.padEnd(8)} ${l ? l + " lỗi" : "0 lỗi"} · ${c} cảnh báo`));
console.log(tongLoi ? `KẾT QUẢ: ${tongLoi} LỖI — CHƯA ĐƯỢC DEPLOY` : `KẾT QUẢ: ĐẠT (không lỗi chặn; ${tongCanh} loại cảnh báo)`);
process.exit(tongLoi ? 1 : 0);
