/* kiemtra.js — Bộ kiểm chứng DÙNG CHUNG cho engine v2.
   Chạy: node kiemtra.js <thư-mục-repo> <bai-N.js> [số-lượt]
   Ví dụ: node kiemtra.js E:/Dat_Thoi/Lop3/web-toan3 bai-12.js 300000

   Nạp figures.js + bai-N.js trong sandbox (make() thuần chuỗi, không DOM), chạy mỗi
   generator nhiều lượt và khẳng định:
     - num: ans là số nguyên; nếu topic có check(q) thì check phải đúng.
     - mcq: choices là mảng >=2, đúng MỘT correct hợp lệ; nếu có check(q) thì đúng.
     - Không lượt nào ném lỗi.
   Đồng thời soát các file (figures.js, bai-N.js, engine.js) KHÔNG chứa backtick/"${",
   và bai-N.html có đúng 1 <!DOCTYPE>. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = process.argv[2] || '.';
const baiJs = process.argv[3] || 'bai-12.js';
const N = parseInt(process.argv[4] || '300000', 10);
const baiHtml = baiJs.replace(/\.js$/, '.html');

function read(f){ return fs.readFileSync(path.join(dir, f), 'utf8'); }

// ---- Sandbox: figures.js + bai-N.js ----
const sandbox = { Math: Math, Object: Object, Array: Array, parseInt: parseInt, Number: Number, console: console };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(read('figures.js'), sandbox);
vm.runInContext(read(baiJs), sandbox);
const BAI = sandbox.BAI;

if(!BAI || !Array.isArray(BAI.topics)){ console.log('FAIL: khong tim thay BAI.topics'); process.exit(1); }

let errors = [];
let mcqMinChoices = 99;
const per = Math.max(1, Math.floor(N / BAI.topics.length));
const chiTiet = process.argv.includes('--chitiet');   // in bảng theo mức: đáp số TB/lớn nhất, số lựa chọn
const bang = [];

// LUYỆN THÔNG MINH: BAI.muctieu = [{id, ten, muc:[3]}] -> mỗi topic phải có mt:[id…] hợp lệ, mỗi mục tiêu có >= 1 dạng.
const MTS = Array.isArray(BAI.muctieu) && BAI.muctieu.length ? {} : null;
if(MTS) BAI.muctieu.forEach(function(m){ MTS[m.id]=0; if(!(Array.isArray(m.muc) && m.muc.length===3)) errors.push('Mục tiêu '+m.id+' thiếu muc:[3 câu tả Mức 1/2/3]'); });
// THÍCH ỨNG: topic có levels>1 thì chạy make(lv) ở TỪNG mức 1..levels (mỗi mức per/levels lượt).
BAI.topics.forEach(function(tp, ti){
  const tag = 'T'+ti+' ('+tp.name+')';
  const L = tp.levels>1 ? Math.min(3, tp.levels) : 1;
  if(L>1 && !(Array.isArray(tp.muc) && tp.muc.length===3)) errors.push(tag+' có levels nhưng thiếu muc:[3 câu tả từng mức]');
  const dsMT = (Array.isArray(tp.mt) && tp.mt.length) ? tp.mt : [undefined];
  if(MTS){ if(!Array.isArray(tp.mt) || !tp.mt.length) errors.push(tag+' thiếu mt:[mục tiêu]');
    else tp.mt.forEach(function(m){ if(!(m in MTS)) errors.push(tag+' mt «'+m+'» không có trong BAI.muctieu'); else MTS[m]++; }); }
  for(let lv=1; lv<=L; lv++){
    const st = { ten: tp.name, lv: lv, n: 0, tong: 0, max: -1e9, nchon: 0, loai: {} };
    for(let i=0;i<Math.ceil(per/L);i++){
      let q; const mtGoi = dsMT[i % dsMT.length];
      try { q = tp.make(lv, mtGoi); }
      catch(e){ errors.push(tag+' mức '+lv+' NÉM LỖI: '+e.message); break; }
      if(!q || !q.type){ errors.push(tag+' mức '+lv+' thiếu type'); break; }
      st.loai[q.type] = 1;
      if(q.type==='num'){
        if(typeof q.ans!=='number' || !Number.isInteger(q.ans)){ errors.push(tag+' mức '+lv+' ans khong nguyen: '+q.ans); break; }
        st.n++; st.tong += q.ans; st.max = Math.max(st.max, q.ans);
      } else if(q.type==='mcq'){
        if(!Array.isArray(q.choices) || q.choices.length<2){ errors.push(tag+' mức '+lv+' choices xau'); break; }
        if(!(q.correct>=0 && q.correct<q.choices.length)){ errors.push(tag+' mức '+lv+' correct ngoai pham vi'); break; }
        if(new Set(q.choices).size!==q.choices.length){ errors.push(tag+' mức '+lv+' lựa chọn TRÙNG NHAU'); break; }
        mcqMinChoices = Math.min(mcqMinChoices, q.choices.length);
        st.nchon = Math.max(st.nchon, q.choices.length);
      } else { errors.push(tag+' type la: '+q.type); break; }
      if(q.mt!==undefined && dsMT.indexOf(q.mt)<0){ errors.push(tag+' mức '+lv+' q.mt «'+q.mt+'» không thuộc mt của dạng'); break; }
      if(q.sai){   // nhãn lỗi KHÔNG được gắn vào đáp án đúng (bé làm đúng lại bị báo sai)
        const khoaDung = q.type==='num' ? String(q.ans) : String(q.correct);
        let hong = null; Object.keys(q.sai).forEach(function(k2){ if(k2===khoaDung) hong='gắn vào ĐÁP ÁN ĐÚNG'; else if(!q.sai[k2]) hong='nhãn rỗng'; else if(q.type==='mcq' && !(+k2>=0 && +k2<q.choices.length)) hong='chỉ số ngoài lựa chọn'; });
        if(hong){ errors.push(tag+' mức '+lv+' q.sai '+hong); break; }
      }
      if(typeof tp.check==='function' && !tp.check(q)){ errors.push(tag+' mức '+lv+' check() SAI o mot luot'); break; }
    }
    bang.push(st);
  }
});
if(MTS){ Object.keys(MTS).forEach(function(m){ if(!MTS[m]) errors.push('Mục tiêu '+m+' không có dạng nào'); });
  console.log('Mục tiêu → số dạng: '+Object.keys(MTS).map(function(m){ return m+':'+MTS[m]; }).join('  ')); }
if(chiTiet){
  console.log('Dạng / mức        | loại    | đáp số TB | lớn nhất | số lựa chọn');
  bang.forEach(function(s){
    console.log((s.ten+' ').padEnd(16).slice(0,16)+' '+s.lv+' | '+Object.keys(s.loai).join('+').padEnd(7)+' | '
      +(s.n? (s.tong/s.n).toFixed(1).padStart(9) : '        -')+' | '+(s.n? String(s.max).padStart(8) : '       -')+' | '+(s.nchon||'-'));
  });
}

// ---- Soát file: khong backtick/"${" ----
['figures.js', baiJs, 'engine.js'].forEach(function(f){
  let s; try{ s=read(f); }catch(e){ errors.push('Khong doc duoc '+f); return; }
  if(s.indexOf(String.fromCharCode(96))>=0) errors.push(f+' CÓ backtick');
  if(s.indexOf('${')>=0) errors.push(f+' CÓ ${');
});
try {
  const html = read(baiHtml);
  const dc = (html.match(/<!DOCTYPE/g)||[]).length;
  if(dc!==1) errors.push(baiHtml+' co '+dc+' DOCTYPE (can 1)');
} catch(e){ errors.push('Khong doc duoc '+baiHtml); }

console.log('So topic:', BAI.topics.length, '| Lượt/topic:', per, '| mcq min choices:', mcqMinChoices===99?'(khong co mcq)':mcqMinChoices);
if(errors.length){ console.log('❌ FAIL ('+errors.length+'):'); errors.slice(0,20).forEach(function(e){ console.log('  - '+e); }); process.exit(1); }
else { console.log('✅ OK — tat ca topic dat, khong loi.'); }
