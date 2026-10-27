/* bai-45.js — Bài 45: Các số có bốn chữ số. Số 10 000 (Tập 2, Chủ đề 8). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-45.md, PR #39): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình: bangHang (bảng hàng, mới), tiaSo (dãy số bao daySo, mới), theSo (thẻ chữ số, mới), nhaManhMoi (ba ngôi nhà, mới).
   Số viết có khoảng trắng không ngắt ở hàng nghìn ("3 421"); ô nhập là số nguyên không dấu cách. Mọi số trong phạm vi 10 000.
   check() đọc lại hình từ chuỗi SVG (data-bang, data-cot, data-v, data-seq, data-hi, data-the, data-nha) và tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function bieuThucTo(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
var NB=' ';
function sx(n){ var s=String(n); return s.length>=4 ? s.slice(0,s.length-3)+NB+s.slice(-3) : s; }
function demKhong(n){ return (String(n).match(/0/g)||[]).length; }
var CH=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
function docSo(n){
 if(n===10000) return 'mười nghìn';
 var th=Math.floor(n/1000), r=n%1000, h=Math.floor(r/100), t=Math.floor(r/10)%10, u=r%10, s=CH[th]+' nghìn';
 if(r===0) return s;
 s+=' '+CH[h]+' trăm';
 if(t===0){ if(u>0) s+=' linh '+(u===4 ? 'tư' : CH[u]); }
 else { s+= t===1 ? ' mười' : ' '+CH[t]+' mươi'; if(u>0) s+=' '+(u===1 && t>1 ? 'mốt' : (u===5 ? 'lăm' : (u===4 && t>1 ? 'tư' : CH[u]))); }
 return s;
}
/* số có bốn chữ số, có đúng k chữ số 0 (không đứng đầu); endZero: chữ số đơn vị là 0 */
function soBon(k, endZero){
 for(var g=0; g<500; g++){
  var d=[rnd(1,9), rnd(1,9), rnd(1,9), rnd(1,9)], pos=[1,2,3];
  if(endZero){ d[3]=0; pos=[1,2]; k=Math.max(k,1); }
  shuffle(pos); var z = endZero ? 1 : 0, i;
  if(endZero) pos=pos.filter(function(p){ return p!==3; });
  for(i=0; z<k && i<pos.length; i++){ if(d[pos[i]]!==0){ d[pos[i]]=0; z++; } }
  var n=+d.join(''); if(demKhong(n)===k) return n;
 }
 return 3421;
}
/* các số dễ bị chọn nhầm khi viết n: đổi chỗ chữ số, dời chữ số 0, lệch hàng */
function gan(n){
 var d=String(n).split(''), out=[], i, j;
 for(i=0;i<4;i++) for(j=i+1;j<4;j++){ var e=d.slice(), t=e[i]; e[i]=e[j]; e[j]=t; if(e[0]==='0') continue; var v=+e.join(''); if(v!==n) out.push([v, (d[i]==='0' || d[j]==='0') ? 'bo-so-0' : 'doc-sai-hang']); }
 out.push([n+100,'doc-sai-hang'],[n-100,'doc-sai-hang'],[n+10,'doc-sai-hang'],[n-10,'doc-sai-hang'],[n+1000,'doc-sai-hang'],[n-1000,'doc-sai-hang'],[n+1,'doc-sai-hang'],[n-1,'doc-sai-hang']);
 var seen={}; return shuffle(out.filter(function(p){ if(p[0]<1000 || p[0]>9999 || p[0]===n || seen[p[0]]) return false; seen[p[0]]=1; return true; }));
}
function boKhong(n){ var s=String(n).replace(/0/g,''); return s.length ? +s : 0; }
function lapMCQ(dungStr, cacSai){
 var opts=[[dungStr,'']].concat(cacSai.slice(0,3)); opts=shuffle(opts); var sai={};
 opts.forEach(function(o,i){ if(o[0]!==dungStr) sai[String(i)]=o[1]; });
 var cs=opts.map(function(o){ return o[0]; });
 return {choices:cs, correct:cs.indexOf(dungStr), sai:sai, _dung:dungStr};
}
var TEN_HANG=['hàng nghìn','hàng trăm','hàng chục','hàng đơn vị'];
var GOI={'bo-so-0':'Chữ số 0 giữ chỗ cho hàng đó: ba nghìn không trăm sáu mươi bảy viết là 3 067, không phải 367.',
  'doc-sai-hang':'Bé đọc và viết từ hàng cao đến hàng thấp: nghìn, trăm, chục, đơn vị.',
  'dem-sai-buoc':'Bé xem mỗi bước tăng thêm bao nhiêu (1, 100 hay 1 000) rồi đếm tiếp.',
  'nham-truoc-sau':'Liền sau thì thêm 1, liền trước thì bớt 1. Số tròn nghìn thì nhớ đổi cả hàng trăm, chục.',
  'nham-hang':'Từ phải sang trái: hàng đơn vị, hàng chục, hàng trăm, hàng nghìn.',
  'so-0-dau':'Số có bốn chữ số thì chữ số 0 không được đứng đầu.'};
function gy(){ var o={}, k; for(k in GOI) o[k]=GOI[k]; return o; }

/* ---- Hình ---- */
var HEAD_HANG=['Nghìn','Trăm','Chục','Đơn vị'];
/* bảng hàng: ô an (0..3) hiện dấu ?, an=-1 hiện đủ */
function bangHang(n, an){
 var d=String(n).split(''), o=svgHinh(300,94,300).replace('<svg ','<svg data-bang="'+n+'" '), i, x, cx, hien;
 for(i=0;i<4;i++){
  x=6+i*72; cx=x+34; hien = i===an ? '?' : d[i];
  o+='<rect x="'+x+'" y="4" width="68" height="34" rx="8" fill="'+HM.vang+'"/>';
  o+='<text x="'+cx+'" y="26" text-anchor="middle" font-size="15" '+HFONT+' fill="'+HM.chu+'">'+HEAD_HANG[i]+'</text>';
  o+='<rect data-cot="'+i+'" data-v="'+hien+'" x="'+x+'" y="42" width="68" height="46" rx="8" fill="#fff" stroke="'+HM.day+'" stroke-width="3"/>';
  o+=chuSo(cx, 65, hien, 28);
 }
 return o+'</svg>';
}
function docBang(html){ var re=/data-cot="(\d)" data-v="(\d|\?)"/g, m, v=[]; while((m=re.exec(html))) v[+m[1]]=m[2]; return v; }
function tiaSo(seq, hi){ return '<div class="flex justify-center my-2" data-seq="'+seq.join(',')+'" data-hi="'+hi+'">'+daySo(seq, hi, -1, 'tron', HM.troi)+'</div>'; }
function docTia(html){ var a=/data-seq="([\d,]+)" data-hi="(\d+)"/.exec(html); return a ? {seq:a[1].split(',').map(Number), hi:+a[2]} : null; }
function theSo(cs){
 var o=svgHinh(264,76,264), i;
 for(i=0;i<cs.length;i++){ o+='<rect data-the="'+cs[i]+'" x="'+(4+i*65)+'" y="4" width="58" height="68" rx="10" fill="#fff" stroke="'+HM.vangDam+'" stroke-width="4"/>'+chuSo(33+i*65, 38, cs[i], 38); }
 return khungHinh(o);
}
function docThe(html){ var re=/data-the="(\d)"/g, m, v=[]; while((m=re.exec(html))) v.push(+m[1]); return v; }
var DAC_NHA={cay:'cây trước nhà', tron:'ô cửa tròn', vuong:'ô cửa vuông'};
function nhaManhMoi(ds){
 var o=svgHinh(300,110,300), i, x, f;
 for(i=0;i<ds.length;i++){
  f=ds[i]; x=8+i*98;
  o+='<g data-nha="'+f+'"><rect x="'+x+'" y="48" width="80" height="54" fill="'+HM.goNhat+'"/><polygon points="'+(x-6)+',50 '+(x+40)+',14 '+(x+86)+',50" fill="'+HM.do+'"/>';
  o+='<rect x="'+(x+32)+'" y="74" width="16" height="28" fill="'+HM.goDam+'"/>';
  if(f==='tron') o+='<circle cx="'+(x+40)+'" cy="62" r="9" fill="'+HM.troi+'"/>';
  else if(f==='vuong') o+='<rect x="'+(x+31)+'" y="53" width="18" height="18" fill="'+HM.vang+'"/>';
  else o+='<rect x="'+(x+62)+'" y="84" width="6" height="18" fill="'+HM.go+'"/><circle cx="'+(x+65)+'" cy="76" r="12" fill="'+HM.xanhLa+'"/>';
  o+='</g>';
 }
 return khungHinh(o);
}
function docNha(html){ var re=/data-nha="(\w+)"/g, m, v=[]; while((m=re.exec(html))) v.push(m[1]); return v; }

var BAI = {
 n: 45,
 title: 'Các Số Có Bốn Chữ Số. Số 10 000',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'bo-so-0':'Bỏ sót chữ số 0', 'doc-sai-hang':'Nhầm hàng khi đọc, viết số', 'dem-sai-buoc':'Đếm sai bước nhảy', 'nham-truoc-sau':'Nhầm liền trước với liền sau', 'nham-hang':'Nhầm tên hàng', 'so-0-dau':'Để chữ số 0 đứng đầu'},
 muctieu: [
  {id:'MT1', ten:'Đọc, viết số có bốn chữ số', muc:['Nghe, đọc số không có chữ số 0 (3 421); viết số từ 3 nghìn 4 trăm 2 chục 1 đơn vị.', 'Số có một chữ số 0 (3 067, 4 007); viết số có hàng 0.', 'Hai chữ số 0 (8 004), số tròn chục (8 640); viết số từ lời đọc dài.']},
  {id:'MT2', ten:'Cấu tạo thập phân, tia số, liền trước và liền sau', muc:['Bảng hàng: điền chữ số các hàng; tia số bước 1; liền trước, liền sau không đổi hàng.', 'Viết số từ bảng hàng; tia số bước 100; liền trước, liền sau qua tròn nghìn; phân tích số; trang sách bị mất.', 'Tia số qua tròn nghìn hoặc bước 1 000; bảng có hàng 0; X là liền sau của số nào; phân tích số có nhiều hàng.']},
  {id:'MT3', ten:'Lập số và suy luận', muc:['Chữ số hàng nghìn là 7; lập số lớn nhất từ 4 thẻ; nhà có cây trước nhà.', 'Chữ số hàng trăm, hàng chục là 7; lập số bé nhất có thẻ 0; hai manh mối về ba nhà.', 'Chữ số hàng chục, đơn vị là 7; thẻ 0, 2, 0, 4 lập được bao nhiêu số; chọn số đã đọc.']}
 ],
 topics: [
  /* D1 — Đọc số, viết số (khám phá) */
  {name:'Đọc số, viết số', sec:'Khám phá — 3 421 đọc là ba nghìn bốn trăm hai mươi mốt; 3 067; 4 007; 8 640', mt:['MT1'], levels:3,
   muc:['Số không có chữ số 0 (3 421).', 'Số có một chữ số 0 ở giữa (3 067, 4 007).', 'Hai chữ số 0 hoặc chữ số 0 ở cuối (8 004, 8 640).'],
   make:function(lv){
    var n = lv<=1 ? soBon(0) : (lv===2 ? soBon(1) : (Math.random()<0.5 ? soBon(2) : soBon(1, true)));
    var m = lapMCQ(sx(n), gan(n).map(function(p){ return [sx(p[0]), p[1]]; }));
    return {type:'mcq', cot:2, _lv:lv, _n:n, _dung:m._dung, q:'<div>Số nào được đọc là:</div>'+bieuThucTo('«'+docSo(n)+'»')+'<div>Bé chọn số đúng nhé!</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var n=q._n; if(n<1000 || n>9999 || q.q.indexOf(docSo(n))<0 || !kiemMCQ(q) || q.choices.length!==4 || q._dung!==sx(n)) return false;
    var k=demKhong(n); if(q._lv<=1) return k===0; if(q._lv===2) return k===1; return k===2 || (k===1 && n%10===0); }},

  /* D2 — Bảng hàng (bài 1, 3) */
  {name:'Bảng hàng', sec:'Bài 1, 3 — hàng nghìn, trăm, chục, đơn vị', mt:['MT2'], levels:3,
   muc:['Bảng thiếu một chữ số: điền chữ số ở ô ?.', 'Viết số được ghi trong bảng hàng.', 'Viết số trong bảng hàng có chữ số 0.'],
   make:function(lv){
    var n, an=-1, ans, sai, q;
    if(lv<=1){ n=soBon(0); an=rnd(0,3); ans=+String(n).charAt(an); q='<div>Bảng hàng của số <b>'+sx(n)+'</b>. Chữ số ở ô <b class="text-amber-700">?</b> là mấy?</div>'; sai=[[ans+1,'nham-hang'],[ans-1,'nham-hang'],[+String(n).charAt((an+1)%4),'nham-hang'],[+String(n).charAt((an+3)%4),'nham-hang']]; }
    else { n = lv===2 ? soBon(0) : soBon(rnd(1,2)); ans=n; q='<div>Viết số được ghi trong bảng hàng.</div>'; sai=gan(n).concat([[boKhong(n),'bo-so-0']]); }
    return {type:'num', _lv:lv, _n:n, _an:an, q:khungHinh(bangHang(n, an).replace(/<\/svg>$/,''))+q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var v=docBang(q.q), n=q._n, hoi=v.indexOf('?'); if(v.length!==4 || String(n).length!==4) return false;
    if(q._lv<=1){ if(hoi<0 || v.filter(function(x){ return x==='?'; }).length!==1 || demKhong(n)!==0) return false; return q.ans===+String(n).charAt(hoi); }
    if(hoi>=0 || +v.join('')!==n) return false; var k=demKhong(n); if(q._lv===2 && k!==0) return false; if(q._lv===3 && k<1) return false; return q.ans===n; }},

  /* D3 — Tia số (bài 2, 4) */
  {name:'Tia số', sec:'Bài 2, 4 — 2 967 … 2 973; 4 998 … 5 006; 1 000, 2 000, 3 000, ?', mt:['MT2'], levels:3,
   muc:['Tia số bước 1, trong cùng một nghìn.', 'Tia số bước 100.', 'Tia số bước 1 000, hoặc bước 1 qua tròn nghìn.'],
   make:function(lv){
    var step, start, seq=[], i, hi=rnd(1,4);
    if(lv<=1){ step=1; start=rnd(1,9)*1000+rnd(5,985); }
    else if(lv===2){ step=100; start=rnd(1,8)*1000+rnd(0,3)*100; }
    else if(Math.random()<0.5){ step=1000; start=rnd(1,4)*1000; }
    else { step=1; start=rnd(2,9)*1000-rnd(2,3); }
    for(i=0;i<6;i++) seq.push(start+i*step);
    var ans=seq[hi];
    return {type:'num', _lv:lv, q:tiaSo(seq, hi)+'<div>Số ở ô <b class="text-amber-700">?</b> là số nào?</div>', ans:ans, sai:nhanSai([[ans+step,'dem-sai-buoc'],[ans-step,'dem-sai-buoc'],[ans+1,'dem-sai-buoc'],[ans-1,'dem-sai-buoc'],[ans+10,'dem-sai-buoc']], ans), goiY:gy()};
  }, check:function(q){ var t=docTia(q.q); if(!t || t.seq.length<5 || t.hi<1 || t.hi>t.seq.length-2) return false; var st=t.seq[1]-t.seq[0], i;
    for(i=1;i<t.seq.length;i++) if(t.seq[i]-t.seq[i-1]!==st) return false;
    if(t.seq[t.seq.length-1]>9999 || t.seq[0]<1000) return false;
    if(q._lv<=1 && st!==1) return false; if(q._lv===2 && st!==100) return false; if(q._lv===3 && !(st===1000 || (st===1 && Math.floor(t.seq[0]/1000)!==Math.floor(t.seq[t.seq.length-1]/1000)))) return false;
    return q.ans===t.seq[t.hi]; }},

  /* D4 — Viết số từ lời (bài 5) */
  {name:'Viết số từ lời', sec:'Bài 5 — 2 nghìn 9 trăm 4 chục 5 đơn vị; tám nghìn không trăm linh sáu', mt:['MT1'], levels:3,
   muc:['Viết số từ: nghìn, trăm, chục, đơn vị (không có 0).', 'Viết số có một hàng bằng 0.', 'Viết số từ lời đọc dài (có chữ số 0).'],
   make:function(lv){
    var n = lv<=1 ? soBon(0) : (lv===2 ? soBon(1) : soBon(rnd(1,2))), d=String(n).split(''), q;
    if(lv<=2) q='Viết số gồm: <b>'+d[0]+' nghìn, '+d[1]+' trăm, '+d[2]+' chục, '+d[3]+' đơn vị</b>.';
    else q='Viết số: <b>«'+docSo(n)+'»</b>.';
    return {type:'num', _lv:lv, _n:n, q:'<div>'+q+'</div>', ans:n, sai:nhanSai(gan(n).concat(demKhong(n)>0 ? [[boKhong(n),'bo-so-0']] : []), n), goiY:gy()};
  }, check:function(q){ var n=q._n, d=String(n).split(''); if(q.ans!==n || n<1000 || n>9999) return false; var k=demKhong(n);
    if(q._lv<=1) return k===0 && q.q.indexOf(d[0]+' nghìn, '+d[1]+' trăm, '+d[2]+' chục, '+d[3]+' đơn vị')>=0;
    if(q._lv===2) return k===1 && q.q.indexOf(d[0]+' nghìn, '+d[1]+' trăm, '+d[2]+' chục, '+d[3]+' đơn vị')>=0;
    return k>=1 && q.q.indexOf(docSo(n))>=0; }},

  /* D5 — Liền trước, liền sau (bài 6) */
  {name:'Liền trước, liền sau', sec:'Bài 6 — liền trước của 10 000 là 9 999; liền sau của 8 999 là 9 000', mt:['MT2'], levels:3,
   muc:['Liền trước, liền sau của số không đổi hàng khác.', 'Liền sau của số x999, liền trước của số x000 hoặc 10 000.', 'Số tròn nghìn (hoặc 10 000) là liền sau của số nào.'],
   make:function(lv){
    var kieu, x, ans, q, ngc=false;
    if(lv<=1){ kieu=pick(['sau','truoc']); x=rnd(1,9)*1000+rnd(11,988); if(x%10===9 || x%10===0) x+=3; }
    else if(lv===2){ kieu=pick(['sau','truoc']); if(kieu==='sau') x=rnd(1,8)*1000+999; else x=pick([rnd(2,9)*1000, 10000, rnd(1,9)*1000+rnd(1,9)*100]); }
    else { kieu='sau'; ngc=true; x=pick([rnd(2,9)*1000, 10000, rnd(1,9)*1000+rnd(1,9)*100]); }
    if(ngc){ ans=x-1; q='<div><b>'+sx(x)+'</b> là số liền sau của số nào?</div>'; }
    else { ans = kieu==='sau' ? x+1 : x-1; q='<div>Số liền '+kieu+' của <b>'+sx(x)+'</b> là số nào?</div>'; }
    var base = ngc ? x : x;
    var sai = ngc ? [[x+1,'nham-truoc-sau'],[x-10,'dem-sai-buoc'],[x-100,'dem-sai-buoc'],[x-2,'dem-sai-buoc']] : [[kieu==='sau' ? x-1 : x+1,'nham-truoc-sau'],[ans+10,'dem-sai-buoc'],[ans-10,'dem-sai-buoc'],[ans+100,'dem-sai-buoc'],[ans-100,'dem-sai-buoc']];
    return {type:'num', _lv:lv, _kieu:kieu, _ngc:ngc, _x:x, q:q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var x=q._x, e = q._ngc ? x-1 : (q._kieu==='sau' ? x+1 : x-1); if(q.ans!==e || e<999 || e>10000) return false;
    if(q._lv<=1) return !q._ngc && x%10!==9 && x%10!==0 && x<10000; if(q._lv===2) return !q._ngc && ((q._kieu==='sau' && x%1000===999) || (q._kieu==='truoc' && (x===10000 || x%100===0))); return q._ngc && x%100===0; }},

  /* D6 — Chữ số hàng nào là 7 (bài 7) */
  {name:'Chữ số 7 ở hàng nào', sec:'Bài 7 — 8 275, 7 285, 5 782, 2 587: số nào có chữ số hàng trăm (chục, nghìn) là 7', mt:['MT3'], levels:3,
   muc:['Chữ số hàng nghìn (hàng đơn vị) là 7.', 'Chữ số hàng trăm, hàng chục là 7.', 'Chữ số hàng chục, hàng đơn vị là 7; có chữ số 0 trong số.'],
   make:function(lv){
    var vt = lv<=1 ? pick([0,3]) : (lv===2 ? pick([1,2]) : pick([2,3])), o, i, nums=[];
    for(var g=0; g<200; g++){
     o=shuffle([0,1,2,3,4,5,6,8,9]).slice(0,3); if(lv<=2 && o.indexOf(0)>=0) continue; if(lv===3 && o.indexOf(0)<0) continue; if(o[0]===0) continue; break;
    }
    var mk=function(p){ var e=o.slice(); e.splice(p,0,7); return +e.join(''); };
    for(i=0;i<4;i++) nums.push(mk(i));
    var dung=mk(vt), m=lapMCQ(sx(dung), nums.filter(function(v){ return v!==dung; }).map(function(v){ return [sx(v),'nham-hang']; }));
    return {type:'mcq', cot:2, _lv:lv, _vt:vt, _nums:nums.join(','), _dung:m._dung, q:'<div>Số nào có chữ số <b>7</b> ở <b>'+TEN_HANG[vt]+'</b>?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var vt=q._vt, ns=q._nums.split(',').map(Number); if(ns.length!==4 || !kiemMCQ(q)) return false; var hit=ns.filter(function(v){ return String(v).charAt(vt)==='7'; });
    if(hit.length!==1 || sx(hit[0])!==q._dung || q.choices.length!==4) return false; if(q._lv<=1 && !(vt===0 || vt===3)) return false; if(q._lv===2 && !(vt===1 || vt===2)) return false; if(q._lv===3 && !((vt===2 || vt===3) && q.choices.some(function(c){ return c.indexOf('0')>=0; }))) return false; return true; }},

  /* D7 — Phân tích số (luyện tập) */
  {name:'Phân tích số', sec:'Luyện tập — 3 892 = 3 000 + 800 + 90 + ?; 6 008 = 6 000 + ?; 6 411 = ? + 400 + ? + 1', mt:['MT2'], levels:3,
   muc:['Tìm số hạng cuối (hàng đơn vị).', 'Số có hai chữ số 0: tìm số hạng cuối.', 'Tìm số hạng ở giữa hoặc đầu (nghìn, trăm, chục).'],
   make:function(lv){
    var n, ans, q, comp, ps, i, parts;
    if(lv<=1){ n=soBon(0); }
    else if(lv===2){ do { n=soBon(2); } while(n%10===0); }
    else { n=soBon(0); }
    var d=String(n).split(''); parts=[d[0]+'000', d[1]+'00', d[2]+'0', d[3]].map(Number);
    var idx = lv<=2 ? 3 : pick([0,1,2]), exp=[];
    for(i=0;i<4;i++){ if(parts[i]===0) continue; exp.push(i===idx ? '?' : sx(parts[i])); }
    ans=parts[idx];
    return {type:'num', _lv:lv, _n:n, _idx:idx, q:'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>'+bieuThucTo(sx(n)+' = '+exp.join(' + ')), ans:ans, sai:nhanSai([[ans*10 > 9000 ? ans/10 : ans*10,'nham-hang'],[ans/10 >= 1 ? ans/10 : ans+1,'nham-hang'],[ans+1,'nham-hang'],[ans+100,'nham-hang']], ans), goiY:gy()};
  }, check:function(q){ var n=q._n, d=String(n).split(''), parts=[d[0]+'000', d[1]+'00', d[2]+'0', d[3]].map(Number), idx=q._idx;
    if(parts[idx]<=0 || q.ans!==parts[idx] || parts[0]+parts[1]+parts[2]+parts[3]!==n) return false; var k=demKhong(n);
    if(q._lv<=1) return k===0 && idx===3; if(q._lv===2) return k===2 && idx===3 && n%10!==0; return k===0 && idx<=2; }},

  /* D8 — Trang sách bị mất (luyện tập, đính chính) */
  {name:'Trang sách bị mất', sec:'Luyện tập — hai cuốn sách còn các trang 1 504 … 1 507 và 1 998 … 2 001; mất những trang nào', mt:['MT2'], levels:3,
   muc:['Một trang bị mất giữa ba trang.', 'Hai trang liên tiếp bị mất (1 504 … 1 507).', 'Hai cuốn sách, mỗi cuốn mất hai trang.'],
   make:function(lv){
    var a=rnd(1,8)*1000+rnd(11,880), b=a+rnd(300,900);
    if(lv<=1){ return {type:'num', _lv:1, _a:a, q:'<div>Một cuốn sách bị mất trang. Các trang còn lại ghi: <b>'+sx(a)+', ?, '+sx(a+2)+'</b>. Trang bị mất là trang số mấy?</div>', ans:a+1, sai:nhanSai([[a,'dem-sai-buoc'],[a+2,'dem-sai-buoc'],[a+3,'dem-sai-buoc'],[a+10,'dem-sai-buoc']], a+1), goiY:gy()}; }
    var m, txt;
    if(lv===2){ var d2=sx(a+1)+' và '+sx(a+2); m=lapMCQ(d2, [[sx(a)+' và '+sx(a+1),'dem-sai-buoc'],[sx(a+2)+' và '+sx(a+3),'dem-sai-buoc'],[sx(a+1)+' và '+sx(a+3),'dem-sai-buoc']]); txt='Một cuốn sách còn các trang <b>'+sx(a)+' … '+sx(a+3)+'</b> (hai trang ở giữa bị mất). Những trang nào bị mất?'; }
    else { var d3=sx(a+1)+', '+sx(a+2)+' và '+sx(b+1)+', '+sx(b+2); m=lapMCQ(d3, [[sx(a)+', '+sx(a+1)+' và '+sx(b)+', '+sx(b+1),'dem-sai-buoc'],[sx(a+1)+', '+sx(a+2)+' và '+sx(b)+', '+sx(b+1),'dem-sai-buoc'],[sx(a+2)+', '+sx(a+3)+' và '+sx(b+2)+', '+sx(b+3),'dem-sai-buoc']]); txt='Hai cuốn sách, trang còn lại ghi <b>'+sx(a)+' … '+sx(a+3)+'</b> và <b>'+sx(b)+' … '+sx(b+3)+'</b> (mỗi cuốn mất hai trang ở giữa). Những trang nào bị mất?'; }
    return {type:'mcq', cot:1, _lv:lv, _a:a, _b:b, _dung:m._dung, q:'<div>'+txt+'</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var a=q._a; if(a<1000 || a+3>9999) return false; if(q._lv<=1) return q.ans===a+1 && q.q.indexOf(sx(a+2))>=0;
    if(!kiemMCQ(q)) return false; if(q._lv===2) return q._dung===sx(a+1)+' và '+sx(a+2) && q.q.indexOf(sx(a+3))>=0; var b=q._b; return b>a+3 && b+3<=9999 && q._dung===sx(a+1)+', '+sx(a+2)+' và '+sx(b+1)+', '+sx(b+2); }},

  /* D9 — Lập số từ thẻ (luyện tập) */
  {name:'Lập số từ thẻ', sec:'Luyện tập — thẻ 0, 2, 0, 4: lập được bao nhiêu số có bốn chữ số', mt:['MT3'], levels:3,
   muc:['Lập số lớn nhất từ 4 thẻ khác 0.', 'Lập số bé nhất từ 4 thẻ có thẻ 0 (0 không đứng đầu).', 'Thẻ 0, a, 0, b: lập được bao nhiêu số có bốn chữ số.'],
   make:function(lv){
    var cs, ans, sai, q;
    if(lv<=1){ cs=shuffle([1,2,3,4,5,6,7,8,9]).slice(0,4); ans=+cs.slice().sort(function(a,b){ return b-a; }).join(''); q='Dùng cả 4 thẻ, lập số có bốn chữ số <b>lớn nhất</b>.'; sai=[[+cs.slice().sort(function(a,b){ return a-b; }).join(''),'nham-hang'],[ans-9,'nham-hang'],[+cs.join(''),'nham-hang']]; }
    else if(lv===2){ cs=shuffle([0].concat(shuffle([1,2,3,4,5,6,7,8,9]).slice(0,3))); var asc=cs.slice().sort(function(a,b){ return a-b; }); var t=asc[0]; asc[0]=asc[1]; asc[1]=t; ans=+asc.join(''); q='Dùng cả 4 thẻ, lập số có bốn chữ số <b>bé nhất</b>.'; var z=+cs.slice().sort(function(a,b){ return a-b; }).join(''); sai=[[z,'so-0-dau'],[+cs.slice().sort(function(a,b){ return b-a; }).join(''),'nham-hang'],[ans+9,'nham-hang'],[ans+90,'nham-hang']]; }
    else { var a=rnd(1,9), b; do { b=rnd(1,9); } while(b===a); cs=shuffle([0,a,0,b]); ans=6; q='Dùng cả 4 thẻ, lập được bao nhiêu số có bốn chữ số? (Chữ số 0 không đứng đầu.)'; sai=[[12,'so-0-dau'],[4,'dem-sai-buoc'],[8,'dem-sai-buoc'],[3,'dem-sai-buoc'],[24,'so-0-dau']]; }
    return {type:'num', _lv:lv, q:theSo(cs)+'<div>'+q+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docThe(q.q); if(cs.length!==4) return false; var seen={}, hs=[], i, j, k, l, p;
    for(i=0;i<4;i++) for(j=0;j<4;j++) for(k=0;k<4;k++) for(l=0;l<4;l++){ if(i===j||i===k||i===l||j===k||j===l||k===l) continue; if(cs[i]===0) continue; p=cs[i]*1000+cs[j]*100+cs[k]*10+cs[l]; if(!seen[p]){ seen[p]=1; hs.push(p); } }
    var z=cs.filter(function(c){ return c===0; }).length;
    if(q._lv<=1) return z===0 && q.ans===Math.max.apply(null,hs); if(q._lv===2) return z===1 && q.ans===Math.min.apply(null,hs) && q.ans>=1000; return z===2 && q.ans===hs.length && hs.length===6; }},

  /* D10 — Ba nhà theo manh mối (bài 8) */
  {name:'Ba nhà theo manh mối', sec:'Bài 8 — ba nhà ghi 3 405, 6 450, 10 000; nhà có cây trước nhà, nhà có ô cửa tròn', mt:['MT3'], levels:3,
   muc:['Một manh mối: nhà có cây ghi số bé nhất.', 'Hai manh mối, tìm số của ngôi nhà còn lại.', 'Hai manh mối, rồi chọn cách đọc đúng số của nhà đó.'],
   make:function(lv){
    var ns, fs=shuffle(['cay','tron','vuong']), map={}, i, srt;
    for(var g=0; g<100; g++){ ns=[soBon(rnd(0,1)), soBon(rnd(0,2)), soBon(rnd(0,1))]; if(lv===3 && Math.random()<0.5) ns[2]=10000; if(new Set(ns).size===3) break; }
    srt=ns.slice().sort(function(a,b){ return a-b; }); map[fs[0]]=srt[0]; map[fs[1]]=srt[2]; map[fs[2]]=srt[1];
    var tong='Ba ngôi nhà ghi ba số <b>'+srt.map(sx).join(', ')+'</b>. ', hinh=nhaManhMoi(shuffle(fs.slice()));
    if(lv<=1){ var f=fs[0]; var m1=lapMCQ(sx(srt[0]), [[sx(srt[1]),'nham-hang'],[sx(srt[2]),'nham-hang']]);
      return {type:'mcq', cot:2, _lv:1, _map:JSON.stringify(map), _hoi:f, _dung:m1._dung, q:hinh+'<div>'+tong+'Nhà có <b>'+DAC_NHA[f]+'</b> ghi số bé nhất. Nhà đó ghi số nào?</div>', choices:m1.choices, correct:m1.correct, sai:m1.sai, goiY:gy()}; }
    var f3=fs[2], cl='Nhà có <b>'+DAC_NHA[fs[0]]+'</b> ghi số bé nhất. Nhà có <b>'+DAC_NHA[fs[1]]+'</b> ghi số lớn nhất. ';
    if(lv===2){ var m2=lapMCQ(sx(srt[1]), [[sx(srt[0]),'nham-hang'],[sx(srt[2]),'nham-hang']]);
      return {type:'mcq', cot:2, _lv:2, _map:JSON.stringify(map), _hoi:f3, _dung:m2._dung, q:hinh+'<div>'+tong+cl+'Nhà có <b>'+DAC_NHA[f3]+'</b> ghi số nào?</div>', choices:m2.choices, correct:m2.correct, sai:m2.sai, goiY:gy()}; }
    var m3=lapMCQ(docSo(srt[1]), [[docSo(srt[0]),'doc-sai-hang'],[docSo(srt[2]),'doc-sai-hang']]);
    return {type:'mcq', cot:1, _lv:3, _map:JSON.stringify(map), _hoi:f3, _dung:m3._dung, q:hinh+'<div>'+tong+cl+'Số ghi trên nhà có <b>'+DAC_NHA[f3]+'</b> đọc là gì?</div>', choices:m3.choices, correct:m3.correct, sai:m3.sai, goiY:gy()};
  }, check:function(q){ var map=JSON.parse(q._map), fs=docNha(q.q), f; if(fs.length!==3 || new Set(fs).size!==3 || !kiemMCQ(q)) return false;
    var vs=fs.map(function(x){ return map[x]; }), mn=Math.min.apply(null,vs), mx=Math.max.apply(null,vs); if(new Set(vs).size!==3 || vs.some(function(v){ return v<1000 || v>10000; })) return false;
    var tim = q._lv<=1 ? mn : (function(){ var o=vs.filter(function(v){ return v!==mn && v!==mx; }); return o[0]; })();
    if(q._lv<=1) return map[q._hoi]===mn && q._dung===sx(mn) && q.q.indexOf(DAC_NHA[q._hoi])>=0;
    var f1=fs.filter(function(x){ return map[x]===mn; })[0], f2=fs.filter(function(x){ return map[x]===mx; })[0];
    if(q.q.indexOf(DAC_NHA[f1]+'</b> ghi số bé nhất')<0 || q.q.indexOf(DAC_NHA[f2]+'</b> ghi số lớn nhất')<0 || map[q._hoi]!==tim) return false;
    return q._lv===2 ? q._dung===sx(tim) : q._dung===docSo(tim); }}
 ]
};
