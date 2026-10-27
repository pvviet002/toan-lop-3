/* bai-59.js — Bài 59: Các số có năm chữ số. Số 100 000 (Tập 2, Chủ đề 11). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-59.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mới, mã tự dựng; mẫu bài 45 mở rộng lên năm chữ số): bangHang5 (bảng hàng năm hàng), tiaSo5 (dãy sáu ô số).
   Số viết có khoảng trắng không ngắt ở hàng nghìn ("12 324"). check() đọc lại hình từ chuỗi SVG (data-cot, data-v, data-seq, data-hi) và tính lại.
   QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

var NB='\u00a0';
/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function bieuThucTo(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function sx(n){ var s=String(n); return s.length>=4 ? s.slice(0,s.length-3)+NB+s.slice(-3) : s; }
function lapMCQ(dungStr, cacSai){
 var seen={}, ds=[]; seen[dungStr]=1; cacSai.forEach(function(p){ if(p[0] && !seen[p[0]]){ seen[p[0]]=1; ds.push(p); } });
 var opts=[[dungStr,'']].concat(ds.slice(0,3)); opts=shuffle(opts); var sai={};
 opts.forEach(function(o,i){ if(o[0]!==dungStr) sai[String(i)]=o[1]; });
 var cs=opts.map(function(o){ return o[0]; });
 return {choices:cs, correct:cs.indexOf(dungStr), sai:sai, _dung:dungStr};
}
/* ---- Phép cộng: số nhớ, kết quả sai thường gặp ---- */
function cotSo(n, i){ return Math.floor(n/Math.pow(10,i))%10; }
function demKhong(n){ return (String(n).match(/0/g)||[]).length; }

var CH=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
function docHai(t){
 if(t<10) return CH[t];
 var tn=Math.floor(t/10), u=t%10;
 if(tn===1) return 'mười'+(u ? ' '+(u===5 ? 'lăm' : CH[u]) : '');
 return CH[tn]+' mươi'+(u ? ' '+(u===1 ? 'mốt' : (u===5 ? 'lăm' : (u===4 ? 'tư' : CH[u]))) : '');
}
function docSo5(n){
 if(n===100000) return 'một trăm nghìn';
 var t=Math.floor(n/1000), r=n%1000, h=Math.floor(r/100), tn=Math.floor(r/10)%10, u=r%10, s=docHai(t)+' nghìn';
 if(r===0) return s;
 s+=' '+CH[h]+' trăm';
 if(tn===0){ if(u>0) s+=' linh '+(u===4 ? 'tư' : CH[u]); }
 else { s+= tn===1 ? ' mười' : ' '+CH[tn]+' mươi'; if(u>0) s+=' '+(u===1 && tn>1 ? 'mốt' : (u===5 ? 'lăm' : (u===4 && tn>1 ? 'tư' : CH[u]))); }
 return s;
}
/* số năm chữ số có đúng k chữ số 0 (không ở đầu) */
function soNam(k){
 for(var g=0; g<500; g++){
  var d=[rnd(1,9),rnd(1,9),rnd(1,9),rnd(1,9),rnd(1,9)], pos=shuffle([1,2,3,4]), i, z=0;
  for(i=0;i<pos.length && z<k;i++){ d[pos[i]]=0; z++; }
  var n=+d.join(''); if(demKhong(n)===k) return n;
 }
 return 12324;
}
function gan5(n){
 var d=String(n).split(''), out=[], i, j;
 for(i=0;i<5;i++) for(j=i+1;j<5;j++){ var e=d.slice(), t=e[i]; e[i]=e[j]; e[j]=t; if(e[0]==='0') continue; var v=+e.join(''); if(v!==n) out.push([v, (d[i]==='0' || d[j]==='0') ? 'bo-so-0' : 'doc-sai-hang']); }
 [100,-100,10,-10,1000,-1000,10000,-10000,1,-1].forEach(function(x){ out.push([n+x,'doc-sai-hang']); });
 var seen={}; return shuffle(out.filter(function(p){ if(p[0]<10000 || p[0]>99999 || p[0]===n || seen[p[0]]) return false; seen[p[0]]=1; return true; }));
}
function boKhong(n){ var s=String(n).replace(/0/g,''); return s.length ? +s : 0; }
var HEAD5=['Chục','Nghìn','Trăm','Chục','Đơn vị'], HEAD5B=['nghìn','','','',''];
function bangHang5(n, an){
 var d=String(n).split(''), o=svgX(300,98,300).replace('<svg ','<svg data-bang="'+n+'" '), i, x, cx, hien;
 for(i=0;i<5;i++){
  x=3+i*59; cx=x+28; hien = i===an ? '?' : d[i];
  o+='<rect x="'+x+'" y="4" width="56" height="38" rx="8" fill="'+HM.vang+'"/>';
  if(i===0) o+='<text x="'+cx+'" y="17" text-anchor="middle" font-size="14" '+HFONT+' fill="'+HM.chu+'">Chục</text><text x="'+cx+'" y="37" text-anchor="middle" font-size="14" '+HFONT+' fill="'+HM.chu+'">nghìn</text>';
  else o+='<text x="'+cx+'" y="29" text-anchor="middle" font-size="14" '+HFONT+' fill="'+HM.chu+'">'+HEAD5[i]+'</text>';
  o+='<rect data-cot="'+i+'" data-v="'+hien+'" x="'+x+'" y="46" width="56" height="46" rx="8" fill="#fff" stroke="'+HM.day+'" stroke-width="3"/>'+chuSo(cx, 69, hien, 28);
 }
 return o+'</svg>';
}
function docBang(html){ var re=/data-cot="(\d)" data-v="(\d|\?)"/g, m, v=[]; while((m=re.exec(html))) v[+m[1]]=m[2]; return v; }
/* tia số năm chữ số: các ô chữ nhật, ô hi là ? */
function tiaSo5(seq, hi){
 var n=seq.length, w=Math.floor(296/n)-4, s=svgX(300,56,300), i, x;
 s+='<line x1="8" y1="28" x2="292" y2="28" stroke="'+HM.day+'" stroke-width="3" stroke-linecap="round"/>';
 for(i=0;i<n;i++){ x=4+i*(w+4);
  s+='<rect data-tach="1" x="'+x+'" y="8" width="'+w+'" height="40" rx="8" fill="'+(i===hi ? '#fff' : HM.troi)+'"'+(i===hi ? ' stroke="'+HM.vangDam+'" stroke-width="3"' : '')+'/>'+chuSo(x+w/2, 28, i===hi ? '?' : seq[i], i===hi ? 22 : 14);
 }
 return '<div class="flex justify-center my-2" data-seq="'+seq.join(',')+'" data-hi="'+hi+'">'+s+'</svg></div>';
}
function docTia(html){ var a=/data-seq="([\d,]+)" data-hi="(\d+)"/.exec(html); return a ? {seq:a[1].split(',').map(Number), hi:+a[2]} : null; }
function lamTron(n, b){ return Math.floor((n+b/2)/b)*b; }
var TEN_HANG=['hàng chục nghìn','hàng nghìn','hàng trăm','hàng chục','hàng đơn vị'];
var GOI={'bo-so-0':'Chữ số 0 giữ chỗ cho hàng đó: chín mươi nghìn không trăm năm mươi sáu viết là 90 056.',
  'doc-sai-hang':'Bé đọc và viết từ hàng cao đến hàng thấp: chục nghìn, nghìn, trăm, chục, đơn vị.',
  'nham-hang':'Từ phải sang trái: hàng đơn vị, chục, trăm, nghìn, chục nghìn.',
  'dem-sai-buoc':'Bé xem mỗi bước tăng thêm bao nhiêu (10, 1 000, 5 000, 10 000) rồi đếm tiếp.',
  'nham-truoc-sau':'Liền sau thì thêm 1, liền trước thì bớt 1. Sau 99 999 là 100 000.',
  'lam-tron-nham-5':'Xem chữ số ngay bên phải hàng cần làm tròn: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  'doc-de-sai':'Bé đọc kỹ từng câu: «có thể», «không thể», «chắc chắn».'};
function gy(){ var o={}, k; for(k in GOI) o[k]=GOI[k]; return o; }

var BAI = {
 n: 59,
 title: 'Các Số Có Năm Chữ Số. Số 100 000',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'bo-so-0':'Bỏ sót chữ số 0', 'doc-sai-hang':'Nhầm hàng khi đọc, viết số', 'nham-hang':'Nhầm tên hàng', 'dem-sai-buoc':'Đếm sai bước nhảy', 'nham-truoc-sau':'Nhầm liền trước với liền sau', 'lam-tron-nham-5':'Nhầm quy tắc làm tròn', 'doc-de-sai':'Đọc sai câu «có thể», «không thể»'},
 muctieu: [
  {id:'MT1', ten:'Đọc, viết số có năm chữ số', muc:['Số không có chữ số 0 (12 324); số tròn chục nghìn (40 000).', 'Số có một chữ số 0 (90 056, 50 602).', 'Số có hai chữ số 0; số 100 000.']},
  {id:'MT2', ten:'Bảng hàng, tia số, liền trước, liền sau, phân tích', muc:['Bảng hàng; tia số bước 1; liền trước, liền sau.', 'Tia số bước 10, 1 000; dãy cách 5 000; phân tích số.', 'Liền trước, liền sau qua 99 999 và 10 000; phân tích số có hàng 0; dãy qua tròn chục nghìn.']},
  {id:'MT3', ten:'Suy luận về số', muc:['Chữ số hàng chục nghìn là 1; một điều kiện (bạn An đố).', 'Đúng/Sai về các số liên tiếp; hai điều kiện.', 'Chọn câu sai trong ba câu; ba điều kiện (làm tròn).']}
 ],
 topics: [
  /* D1 — Đọc số, chọn số */
  {name:'Đọc số, chọn số', sec:'Khám phá, bài 5 — 12 324 đọc là mười hai nghìn ba trăm hai mươi tư; 90 056; 50 602; 100 000', mt:['MT1'], levels:3,
   muc:['Số không có chữ số 0.', 'Số có một chữ số 0 (90 056).', 'Số có hai chữ số 0 hoặc 100 000.'],
   make:function(lv){
    var n = lv<=1 ? soNam(0) : (lv===2 ? soNam(1) : (Math.random()<0.25 ? 100000 : soNam(2))), sai;
    sai = n===100000 ? [[sx(10000),'doc-sai-hang'],[sx(99999),'nham-truoc-sau'],[sx(1000),'doc-sai-hang']] : gan5(n).map(function(p){ return [sx(p[0]), p[1]]; });
    var m=lapMCQ(sx(n), sai);
    return {type:'mcq', cot:2, _lv:lv, _n:n, _dung:m._dung, q:'<div>Số nào được đọc là:</div>'+bieuThucTo('«'+docSo5(n)+'»')+'<div>Bé chọn số đúng nhé!</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var n=q._n; if(n<10000 || n>100000 || q.q.indexOf(docSo5(n))<0 || !kiemMCQ(q) || q.choices.length!==4 || q._dung!==sx(n)) return false; var k=demKhong(n); if(q._lv<=1) return k===0; if(q._lv===2) return k===1; return n===100000 || k===2; }},

  /* D2 — Viết số từ lời */
  {name:'Viết số từ lời', sec:'Bài 4 — 1 chục nghìn 5 nghìn 8 trăm 2 chục 6 đơn vị = 15 826; 3 chục nghìn 2 nghìn 0 trăm 4 chục 3 đơn vị = 32 043', mt:['MT1'], levels:3,
   muc:['Viết số từ «chục nghìn, nghìn, trăm, chục, đơn vị», không có 0.', 'Có một hàng bằng 0.', 'Viết số từ lời đọc dài.'],
   make:function(lv){
    var n = lv<=1 ? soNam(0) : (lv===2 ? soNam(1) : soNam(rnd(1,2))), d=String(n).split(''), q;
    if(lv<=2) q='Viết số gồm: <b>'+d[0]+' chục nghìn, '+d[1]+' nghìn, '+d[2]+' trăm, '+d[3]+' chục, '+d[4]+' đơn vị</b>.'; else q='Viết số: <b>«'+docSo5(n)+'»</b>.';
    return {type:'num', _lv:lv, _n:n, q:'<div>'+q+'</div>', ans:n, sai:nhanSai(gan5(n).concat(demKhong(n)>0 ? [[boKhong(n),'bo-so-0']] : []), n), goiY:gy()};
  }, check:function(q){ var n=q._n, d=String(n).split(''); if(q.ans!==n || n<10000 || n>99999) return false; var k=demKhong(n);
    if(q._lv<=1) return k===0 && q.q.indexOf(d[0]+' chục nghìn, '+d[1]+' nghìn, '+d[2]+' trăm, '+d[3]+' chục, '+d[4]+' đơn vị')>=0;
    if(q._lv===2) return k===1 && q.q.indexOf(d[0]+' chục nghìn, '+d[1]+' nghìn, '+d[2]+' trăm, '+d[3]+' chục, '+d[4]+' đơn vị')>=0; return k>=1 && q.q.indexOf(docSo5(n))>=0; }},

  /* D3 — Bảng hàng năm hàng */
  {name:'Bảng hàng năm hàng', sec:'Bài 1 — bảng hàng chục nghìn, nghìn, trăm, chục, đơn vị: 57 465; 90 056', mt:['MT2'], levels:3,
   muc:['Bảng thiếu một chữ số: điền chữ số ở ô ?.', 'Viết số được ghi trong bảng hàng.', 'Viết số trong bảng hàng có chữ số 0.'],
   make:function(lv){
    var n, an=-1, ans, sai, q;
    if(lv<=1){ n=soNam(0); an=rnd(0,4); ans=+String(n).charAt(an); q='<div>Bảng hàng của số <b>'+sx(n)+'</b>. Chữ số ở ô <b class="text-amber-700">?</b> là mấy?</div>'; sai=[[ans+1,'nham-hang'],[ans-1,'nham-hang'],[+String(n).charAt((an+1)%5),'nham-hang'],[+String(n).charAt((an+4)%5),'nham-hang']]; }
    else { n = lv===2 ? soNam(0) : soNam(rnd(1,2)); ans=n; q='<div>Viết số được ghi trong bảng hàng.</div>'; sai=gan5(n).concat([[boKhong(n),'bo-so-0']]); }
    return {type:'num', _lv:lv, _n:n, _an:an, q:khungHinh(bangHang5(n, an).replace(/<\/svg>$/,''))+q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var v=docBang(q.q), n=q._n, hoi=v.indexOf('?'); if(v.length!==5 || String(n).length!==5) return false;
    if(q._lv<=1){ if(hoi<0 || v.filter(function(x){ return x==='?'; }).length!==1 || demKhong(n)!==0) return false; return q.ans===+String(n).charAt(hoi); }
    if(hoi>=0 || +v.join('')!==n) return false; var k=demKhong(n); if(q._lv===2 && k!==0) return false; if(q._lv===3 && k<1) return false; return q.ans===n; }},

  /* D4 — Tia số */
  {name:'Tia số', sec:'Bài 2 — 36 524, 36 525, 36 526, 36 527, ?, ?, ?', mt:['MT2'], levels:3,
   muc:['Tia số bước 1.', 'Tia số bước 10 hoặc bước 1 000.', 'Tia số bước 1 000 hoặc 10 qua số tròn chục nghìn hoặc tròn trăm.'],
   make:function(lv){
    var step, start, seq=[], i, hi=rnd(1,4);
    if(lv<=1){ step=1; start=rnd(11,98)*1000+rnd(5,985); }
    else if(lv===2){ step=pick([10,1000]); start = step===10 ? rnd(11,98)*1000+rnd(0,90)*10 : rnd(11,80)*1000; }
    else if(Math.random()<0.5){ step=1000; start=rnd(3,9)*10000-rnd(2,3)*1000; }
    else { step=10; start=rnd(11,98)*1000+rnd(2,9)*100-rnd(2,3)*10; }
    for(i=0;i<6;i++) seq.push(start+i*step);
    var ans=seq[hi];
    return {type:'num', _lv:lv, q:tiaSo5(seq, hi)+'<div>Số ở ô <b class="text-amber-700">?</b> là số nào?</div>', ans:ans, sai:nhanSai([[ans+step,'dem-sai-buoc'],[ans-step,'dem-sai-buoc'],[ans+1,'dem-sai-buoc'],[ans-1,'dem-sai-buoc'],[ans+100,'dem-sai-buoc']], ans), goiY:gy()};
  }, check:function(q){ var t=docTia(q.q); if(!t || t.seq.length!==6 || t.hi<1 || t.hi>4) return false; var st=t.seq[1]-t.seq[0], i; for(i=1;i<6;i++) if(t.seq[i]-t.seq[i-1]!==st) return false;
    if(t.seq[0]<10000 || t.seq[5]>99999 || q.ans!==t.seq[t.hi]) return false;
    if(q._lv<=1) return st===1; if(q._lv===2) return st===10 || st===1000; return (st===1000 && Math.floor(t.seq[0]/10000)!==Math.floor(t.seq[5]/10000)) || (st===10 && Math.floor(t.seq[0]/100)!==Math.floor(t.seq[5]/100)); }},

  /* D5 — Số tròn chục nghìn, dãy cách 5 000 */
  {name:'Số tròn chục nghìn, dãy cách 5 000', sec:'Bài 3, luyện tập — bốn mươi nghìn là 40 000; 10 000, 15 000, 20 000, ?, ?, 35 000', mt:['MT2'], levels:3,
   muc:['Viết số tròn chục nghìn từ lời (bốn mươi nghìn).', 'Dãy cách 5 000: tìm số ở ô ?.', 'Dãy cách 5 000 hoặc 10 000, ô ? ở xa đầu dãy.'],
   make:function(lv){
    if(lv<=1){ var k=rnd(1,9), n=k*10000; return {type:'num', _lv:1, _n:n, q:'<div>Viết số: <b>«'+docSo5(n)+'»</b>.</div>', ans:n, sai:nhanSai([[k*1000,'nham-hang'],[k*100,'nham-hang'],[k*10000+1000,'nham-hang'],[(k+1)*10000,'nham-hang']], n), goiY:gy()}; }
    var step = lv===2 ? 5000 : pick([5000,10000]), start=rnd(2,(lv===2 ? 12 : 9))*5000, seq=[], i;
    if(step===10000) start=rnd(1,4)*10000; for(i=0;i<6;i++) seq.push(start+i*step);
    var hi = lv===2 ? rnd(2,4) : rnd(3,5), ans=seq[hi];
    return {type:'num', _lv:lv, q:tiaSo5(seq, hi)+'<div>Số ở ô <b class="text-amber-700">?</b> là số nào?</div>', ans:ans, sai:nhanSai([[ans+step,'dem-sai-buoc'],[ans-step,'dem-sai-buoc'],[ans+1000,'dem-sai-buoc'],[ans-1000,'dem-sai-buoc'],[ans+5000,'dem-sai-buoc']], ans), goiY:gy()};
  }, check:function(q){ if(q._lv<=1) return q.ans===q._n && q._n%10000===0 && q._n>=10000 && q._n<=90000 && q.q.indexOf(docSo5(q._n))>=0;
    var t=docTia(q.q); if(!t || t.seq.length!==6) return false; var st=t.seq[1]-t.seq[0], i; for(i=1;i<6;i++) if(t.seq[i]-t.seq[i-1]!==st) return false; if(t.seq[5]>99999 || t.seq[0]<10000 || q.ans!==t.seq[t.hi]) return false;
    if(q._lv===2) return st===5000 && t.hi>=2 && t.hi<=4; return (st===5000 || st===10000) && t.hi>=3; }},

  /* D6 — Liền trước, liền sau */
  {name:'Liền trước, liền sau', sec:'Bài 6 — liền trước 13 450 là 13 449; liền sau 90 000 là 90 001; liền trước 10 001 là 10 000; liền sau 99 999 là 100 000', mt:['MT2'], levels:3,
   muc:['Số liền trước, liền sau không đổi hàng.', 'Liền sau của số tròn chục nghìn; liền trước của số tròn chục nghìn cộng 1.', 'Qua 99 999 và 10 000; X là liền sau của số nào.'],
   make:function(lv){
    var kieu, x, ans, q, ngc=false;
    if(lv<=1){ kieu=pick(['sau','truoc']); do { x=rnd(10,98)*1000+rnd(11,988); } while(x%10===0 || x%10===9); }
    else if(lv===2){ kieu=pick(['sau','truoc']); if(kieu==='sau') x=rnd(2,9)*10000; else x=rnd(2,9)*10000+1; }
    else { var t=rnd(1,3); if(t===1){ kieu='sau'; x=pick([39999,49999,59999,69999,79999,89999,99999]); } else if(t===2){ kieu='truoc'; x=rnd(2,9)*10000; } else { kieu='sau'; ngc=true; x=pick([20000,30000,40000,50000,60000,70000,80000,90000,100000]); } }
    if(ngc){ ans=x-1; q='<div><b>'+sx(x)+'</b> là số liền sau của số nào?</div>'; } else { ans = kieu==='sau' ? x+1 : x-1; q='<div>Số liền '+kieu+' của <b>'+sx(x)+'</b> là số nào?</div>'; }
    var sai = ngc ? [[x+1,'nham-truoc-sau'],[x-10,'dem-sai-buoc'],[x-1000,'dem-sai-buoc'],[x-2,'dem-sai-buoc']] : [[kieu==='sau' ? x-1 : x+1,'nham-truoc-sau'],[ans+10,'dem-sai-buoc'],[ans-10,'dem-sai-buoc'],[ans+1000,'dem-sai-buoc'],[ans-1000,'dem-sai-buoc']];
    return {type:'num', _lv:lv, _kieu:kieu, _ngc:ngc, _x:x, q:q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var x=q._x, e = q._ngc ? x-1 : (q._kieu==='sau' ? x+1 : x-1); if(q.ans!==e || e<9999 || e>100000) return false;
    if(q._lv<=1) return !q._ngc && x%10!==0 && x%10!==9 && x<100000; if(q._lv===2) return !q._ngc && ((q._kieu==='sau' && x%10000===0) || (q._kieu==='truoc' && x%10000===1)); return q._ngc ? x%10000===0 : ((q._kieu==='sau' && x%10000===9999) || (q._kieu==='truoc' && x%10000===0)); }},

  /* D7 — Phân tích số */
  {name:'Phân tích số', sec:'Bài 8 — 54 766 = 50 000 + 4 000 + 700 + 60 + 6; 15 000 = 10 000 + 5 000; 37 059 = 30 000 + 7 000 + 50 + 9', mt:['MT2'], levels:3,
   muc:['Số không có chữ số 0: tìm số hạng cuối.', 'Số tròn nghìn có hai thành phần: tìm thành phần thứ hai.', 'Số có chữ số 0: tìm một số hạng ở giữa hoặc đầu.'],
   make:function(lv){
    var n, parts, idx, exp=[], i, d;
    if(lv<=1){ n=soNam(0); } else if(lv===2){ n=rnd(1,9)*10000+rnd(1,9)*1000; } else { n=soNam(rnd(1,2)); }
    d=String(n).split(''); parts=[+(d[0]+'0000'), +(d[1]+'000'), +(d[2]+'00'), +(d[3]+'0'), +d[4]];
    var nz=[0,1,2,3,4].filter(function(k){ return parts[k]>0; }); idx = lv<=1 ? 4 : (lv===2 ? 1 : pick(nz.filter(function(k){ return k<4 || demKhong(n)<2; })));
    for(i=0;i<5;i++){ if(parts[i]===0) continue; exp.push(i===idx ? '?' : sx(parts[i])); }
    var ans=parts[idx];
    return {type:'num', _lv:lv, _n:n, _idx:idx, q:'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>'+bieuThucTo(sx(n)+' = '+exp.join(' + ')), ans:ans, sai:nhanSai([[ans*10>90000 ? ans/10 : ans*10,'nham-hang'],[ans>=10 ? ans/10 : ans+1,'nham-hang'],[ans+1,'nham-hang'],[ans+1000,'nham-hang']], ans), goiY:gy()};
  }, check:function(q){ var n=q._n, d=String(n).split(''), parts=[+(d[0]+'0000'), +(d[1]+'000'), +(d[2]+'00'), +(d[3]+'0'), +d[4]], idx=q._idx; if(n<10000 || n>99999 || parts[idx]<=0 || q.ans!==parts[idx] || parts.reduce(function(s,x){ return s+x; },0)!==n) return false; var k=demKhong(n);
    if(q._lv<=1) return k===0 && idx===4; if(q._lv===2) return k===3 && idx===1 && n%1000===0; return k>=1; }},

  /* D8 — Chữ số ở hàng nào */
  {name:'Chữ số ở hàng nào', sec:'Bài 9 — số nào có chữ số hàng chục nghìn là 1', mt:['MT3'], levels:3,
   muc:['Chữ số hàng chục nghìn là một chữ số cho trước.', 'Chữ số hàng nghìn hoặc hàng trăm là chữ số cho trước.', 'Chữ số hàng chục hoặc hàng đơn vị là chữ số cho trước; có chữ số 0.'],
   make:function(lv){
    var vt = lv<=1 ? 0 : (lv===2 ? pick([1,2]) : pick([3,4])), d=rnd(1,9), g, o, nums=[], ps, i;
    for(g=0; g<300; g++){ o=shuffle([0,1,2,3,4,5,6,7,8,9].filter(function(x){ return x!==d; })).slice(0,4); if(lv<=2 && o.indexOf(0)>=0) continue; if(lv===3 && o.indexOf(0)<0) continue; if(o[0]===0) continue; break; }
    ps=[vt].concat(shuffle([0,1,2,3,4].filter(function(p){ return p!==vt; })).slice(0,3));
    ps.forEach(function(p){ var e=o.slice(); e.splice(p,0,d); nums.push(+e.join('')); });
    var dung=nums[0], m=lapMCQ(sx(dung), nums.slice(1).map(function(v){ return [sx(v),'nham-hang']; }));
    return {type:'mcq', cot:2, _lv:lv, _vt:vt, _d:d, _nums:nums.join(','), _dung:m._dung, q:'<div>Số nào có chữ số <b>'+d+'</b> ở <b>'+TEN_HANG[vt]+'</b>?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var ns=q._nums.split(',').map(Number); if(ns.length!==4 || !kiemMCQ(q) || q.choices.length!==4 || ns.some(function(v){ return v<10000 || v>99999; })) return false; var hit=ns.filter(function(v){ return +String(v).charAt(q._vt)===q._d; });
    if(hit.length!==1 || sx(hit[0])!==q._dung) return false; if(q._lv<=1) return q._vt===0; if(q._lv===2) return q._vt===1 || q._vt===2; return (q._vt===3 || q._vt===4) && ns.some(function(v){ return String(v).indexOf('0')>=0; }); }},

  /* D9 — Các số liên tiếp: đúng hay sai */
  {name:'Các số liên tiếp: đúng hay sai', sec:'Bài 10 — thùng còn các thẻ số từ 13 820 đến 13 824: «không thể bốc 13 819» đúng; «chắc chắn bốc được 13 824» sai', mt:['MT3'], levels:3,
   muc:['Một câu «có thể bốc»: đúng hay sai.', 'Câu «không thể» hoặc «chắc chắn»: đúng hay sai.', 'Ba câu, chọn câu sai.'],
   make:function(lv){
    var a=rnd(10000,99900), b=a+4, tx=function(k,x){ return k==='co' ? 'Có thể bốc được thẻ số '+sx(x) : (k==='khong' ? 'Không thể bốc được thẻ số '+sx(x) : 'Chắc chắn bốc được thẻ số '+sx(x)); };
    var ev=function(k,x){ var tr = x>=a && x<=b; return k==='co' ? tr : (k==='khong' ? !tr : false); };
    function mot(k, yc){ var x, g; for(g=0; g<100; g++){ x = (k==='co' || k==='chac') ? (yc===true && k==='co' ? rnd(a,b) : (Math.random()<0.5 ? rnd(a,b) : a-rnd(1,3))) : (yc ? (Math.random()<0.5 ? a-rnd(1,3) : b+rnd(1,3)) : rnd(a,b)); if(ev(k,x)===yc) return {k:k, x:x}; } return {k:k, x:a}; }
    var mo='<div>Trong thùng còn các thẻ số liên tiếp từ <b>'+sx(a)+'</b> đến <b>'+sx(b)+'</b> (mỗi số một thẻ). Một người bốc một thẻ.</div>';
    if(lv<=2){ var kind = lv<=1 ? 'co' : pick(['khong','chac']), yc=Math.random()<0.5, st=mot(kind, yc);
      return {type:'mcq', cot:2, _lv:lv, _a:a, _st:JSON.stringify(st), _dung:ev(st.k,st.x)?'Đúng':'Sai', q:mo+'<div>Bé xem câu sau đúng hay sai:</div>'+bieuThucTo(tx(st.k,st.x)), choices:['Đúng','Sai'], correct:ev(st.k,st.x)?0:1, sai:(ev(st.k,st.x)?{'1':'doc-de-sai'}:{'0':'doc-de-sai'}), goiY:gy()}; }
    var ss=[mot('co',true), mot('khong',true), mot(pick(['chac','co']), false)], txt=ss.map(function(s){ return tx(s.k,s.x); }), D=txt[2], ord=shuffle(txt.slice()), sai={}; ord.forEach(function(c,i){ if(c!==D) sai[String(i)]='doc-de-sai'; });
    return {type:'mcq', cot:1, _lv:3, _a:a, _st:JSON.stringify(ss), _dung:D, q:mo+'<div>Có đúng một câu <b>sai</b>. Bé chọn câu sai nhé!</div>', choices:ord, correct:ord.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ var m=/<b>([\d ]+)<\/b> đến <b>([\d ]+)<\/b>/.exec(q.q); if(!m || !kiemMCQ(q)) return false; var u=function(s){ return +String(s).split(NB).join(''); }, a=u(m[1]), b=u(m[2]); if(b-a!==4 || a<10000 || q._a!==a) return false;
    var tx=function(k,x){ return k==='co' ? 'Có thể bốc được thẻ số '+sx(x) : (k==='khong' ? 'Không thể bốc được thẻ số '+sx(x) : 'Chắc chắn bốc được thẻ số '+sx(x)); }, ev=function(k,x){ var tr=x>=a && x<=b; return k==='co' ? tr : (k==='khong' ? !tr : false); };
    if(q._lv<=2){ var st=JSON.parse(q._st); if(q.q.indexOf(tx(st.k,st.x))<0) return false; if(q._lv<=1 && st.k!=='co') return false; if(q._lv===2 && st.k==='co') return false; return (q._dung==='Đúng')===ev(st.k,st.x) && q.choices.length===2; }
    var ss=JSON.parse(q._st); if(ss.length!==3 || q.choices.length!==3) return false; var fa=ss.filter(function(s){ return !ev(s.k,s.x); }); return fa.length===1 && q._dung===tx(fa[0].k,fa[0].x) && ss.every(function(s){ return q.choices.indexOf(tx(s.k,s.x))>=0; }); }},

  /* D10 — Bạn An đố số */
  {name:'Bạn An đố số', sec:'Bài 12 — hàng chục nghìn là 8; làm tròn đến hàng chục thì chữ số hàng chục là 6; làm tròn đến hàng trăm thì chữ số hàng trăm là 4: chọn trong 64 301, 80 458, 82 361, 83 405', mt:['MT3'], levels:3,
   muc:['Một điều kiện (chữ số ở một hàng).', 'Hai điều kiện (hàng chục nghìn và làm tròn đến hàng chục).', 'Ba điều kiện (thêm làm tròn đến hàng trăm).'],
   make:function(lv){
    var n, cs, g, tens=function(x){ return Math.floor(lamTron(x,10)/10)%10; }, hund=function(x){ return Math.floor(lamTron(x,100)/100)%10; }, c1, c2, c3;
    for(g=0; g<2000; g++){
     n=rnd(10000,99999); c1=+String(n).charAt(0); c2=tens(n); c3=hund(n); var ok=function(x){ return +String(x).charAt(0)===c1 && (lv<2 || tens(x)===c2) && (lv<3 || hund(x)===c3); };
     cs=[n]; var t=0; while(cs.length<4 && t++<300){ var x=rnd(10000,99999); if(!ok(x) && cs.indexOf(x)<0 && (+String(x).charAt(0)===c1 || Math.random()<0.4)) cs.push(x); }
     if(cs.length===4) break;
    }
    var ds=[]; ds.push('chữ số ở <b>hàng chục nghìn</b> là <b>'+c1+'</b>'); if(lv>=2) ds.push('làm tròn đến <b>hàng chục</b> thì chữ số hàng chục là <b>'+c2+'</b>'); if(lv>=3) ds.push('làm tròn đến <b>hàng trăm</b> thì chữ số hàng trăm là <b>'+c3+'</b>');
    var ch=shuffle(cs.slice()).map(sx), D=sx(n), sai={}; ch.forEach(function(c,i){ if(c!==D) sai[String(i)]= lv>=2 ? 'lam-tron-nham-5' : 'nham-hang'; });
    return {type:'mcq', cot:2, _lv:lv, _c:[c1,c2,c3].join(','), _dung:D, q:nguoi('boy','Bạn An')+'<div>Bạn An đố: số cần tìm có '+ds.join(', ')+'. Số đó là số nào?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ var u=function(s){ return +String(s).split(NB).join(''); }, c=q._c.split(',').map(Number), tens=function(x){ return Math.floor(lamTron(x,10)/10)%10; }, hund=function(x){ return Math.floor(lamTron(x,100)/100)%10; }; if(!kiemMCQ(q) || q.choices.length!==4) return false;
    var ok=q.choices.map(function(s){ var x=u(s); return +String(x).charAt(0)===c[0] && (q._lv<2 || tens(x)===c[1]) && (q._lv<3 || hund(x)===c[2]); }); return ok.filter(Boolean).length===1 && ok[q.correct]===true && q.choices.every(function(s){ return u(s)>=10000 && u(s)<=99999; }); }}
 ]
};
