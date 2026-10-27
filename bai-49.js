/* bai-49.js — Bài 49: Luyện tập chung (Tập 2, Chủ đề 8). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-49.md, PR #39): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Ôn lại bài 45–48: số có bốn chữ số và 10 000, so sánh, số La Mã đến XX, làm tròn. Mọi hàm chép nguyên từ bài 45–48 (mỗi bài một tệp):
   bangHang, tiaSo (bài 45); bonVat, hoanVi4 (bài 46); laMa (bài 47); tron, xuong, len (bài 48). Số viết có khoảng trắng không ngắt ở hàng nghìn.
   check() đọc lại hình từ chuỗi SVG (data-seq, data-hi, data-cot, data-v) hoặc từ trường _ của câu, rồi tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

var NB='\u00a0';
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function bieuThucTo(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
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
function lapMCQ(dungStr, cacSai){
 var seen={}, ds=[]; seen[dungStr]=1; cacSai.forEach(function(p){ if(p[0] && !seen[p[0]]){ seen[p[0]]=1; ds.push(p); } });
 var opts=[[dungStr,'']].concat(ds.slice(0,3)); opts=shuffle(opts); var sai={};
 opts.forEach(function(o,i){ if(o[0]!==dungStr) sai[String(i)]=o[1]; });
 var cs=opts.map(function(o){ return o[0]; });
 return {choices:cs, correct:cs.indexOf(dungStr), sai:sai, _dung:dungStr};
}
/* làm tròn: xuống hoặc lên theo quy tắc; ham: 10 hoặc 100 */
function tron(n, b){ return Math.floor((n+b/2)/b)*b; }
function xuong(n, b){ return Math.floor(n/b)*b; }
function len(n, b){ return Math.ceil(n/b)*b; }
function tenHang(b){ return b===10 ? 'hàng chục' : 'hàng trăm'; }
/* số có bốn chữ số với chữ số đơn vị / chục cho trước (một khoảng) */
function soVoi(donvi, chuc){ var a=rnd(10,99); return a*100+(chuc===null ? rnd(0,9) : chuc)*10+(donvi===null ? rnd(0,9) : donvi); }
function boKhong(n){ var s=String(n).replace(/0/g,''); return s.length ? +s : 0; }
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
/* số bốn chữ số ngẫu nhiên (chữ số đầu khác 0); cs: các chữ số cần khác nhau? không bắt buộc */
function so4(){ return rnd(1,9)*1000+rnd(0,999); }
function hoanVi4(){
 for(var g=0; g<300; g++){
  var d=shuffle([0,1,2,3,4,5,6,7,8,9]).slice(0,4), s={}, i, out=[];
  if(d.indexOf(0)>=0 && Math.random()<0.7) continue;
  for(i=0;i<40 && out.length<4;i++){ var p=shuffle(d.slice()); if(p[0]===0) continue; var v=+p.join(''); if(!s[v]){ s[v]=1; out.push(v); } }
  if(out.length===4) return out;
 }
 return [3768,6783,3687,6738];
}
/* bài "vật nào dài/nặng/cao ... nhất": lv1 lớn nhất trong 3 số khác hàng nghìn; lv2 nhỏ nhất/lớn nhất trong 4 số; lv3 lớn thứ hai */
function bonVat(lv){
 var ns, g;
 if(lv<=1){ ns=shuffle([1,2,3,4,5,6,7,8,9]).slice(0,3).map(function(t){ return t*1000+rnd(0,999); }); }
 else if(lv===2){ ns=hoanVi4(); }
 else { for(g=0;g<1000;g++){ ns=hoanVi4(); var h=ns.slice().sort(function(a,b){ return a-b; }); if(h[3]-h[2]>=90) break; } }
 return ns;
}
var LM1=['','I','II','III','IV','V','VI','VII','VIII','IX'];
function laMa(n){ return n>=10 ? 'X'+laMa(n-10) : LM1[n]; }
function hoanvi(a){ if(a.length<=1) return [a]; var r=[]; a.forEach(function(x,i){ hoanvi(a.slice(0,i).concat(a.slice(i+1))).forEach(function(t){ r.push([x].concat(t)); }); }); return r; }
/* các số dễ bị chọn nhầm khi viết n: đổi chỗ chữ số, dời chữ số 0, lệch hàng */
function gan(n){
 var d=String(n).split(''), out=[], i, j;
 for(i=0;i<4;i++) for(j=i+1;j<4;j++){ var e=d.slice(), t=e[i]; e[i]=e[j]; e[j]=t; if(e[0]==='0') continue; var v=+e.join(''); if(v!==n) out.push([v, (d[i]==='0' || d[j]==='0') ? 'bo-so-0' : 'doc-sai-hang']); }
 out.push([n+100,'doc-sai-hang'],[n-100,'doc-sai-hang'],[n+10,'doc-sai-hang'],[n-10,'doc-sai-hang'],[n+1000,'doc-sai-hang'],[n-1000,'doc-sai-hang'],[n+1,'doc-sai-hang'],[n-1,'doc-sai-hang']);
 var seen={}; return shuffle(out.filter(function(p){ if(p[0]<1000 || p[0]>9999 || p[0]===n || seen[p[0]]) return false; seen[p[0]]=1; return true; }));
}

var CANH=[['Đàn gà','con gà'],['Thư viện','cuốn sách'],['Trường học','học sinh'],['Sân vận động','người xem'],['Kho','quả trứng']];
function nguoiTen(){ return shuffle(['Mai','Nam','Lan','Hùng','Hà','Bình','Cúc','Dũng']).slice(0,4); }
function ghiDiem(ten, ds){ return '<div class="text-center">'+ten.map(function(t,i){ return '<div>'+t+': <b>'+sx(ds[i])+' điểm</b></div>'; }).join('')+'</div>'; }
function parseDiem(s){ return s.split(',').map(function(x){ var p=x.split(':'); return {t:p[0], v:+p[1]}; }); }
var GOI={'bo-so-0':'Chữ số 0 giữ chỗ cho hàng đó: bảy nghìn không trăm linh sáu viết là 7 006.',
  'doc-sai-hang':'Bé đọc và viết từ hàng cao đến hàng thấp: nghìn, trăm, chục, đơn vị.',
  'dem-sai-buoc':'Bé xem mỗi bước tăng thêm bao nhiêu (1, 100 hay 1 000) rồi đếm tiếp. Sau 9 999 là 10 000.',
  'nham-hang':'Từ phải sang trái: hàng đơn vị, hàng chục, hàng trăm, hàng nghìn.',
  'so-sanh-hang':'Cùng số chữ số thì so từng cặp chữ số từ trái sang phải; số nào có nhiều chữ số hơn thì lớn hơn.',
  'lam-tron-nham-5':'Xem chữ số ngay bên phải hàng cần làm tròn: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  'nham-hang-tron':'Làm tròn đến hàng chục thì chữ số hàng đơn vị về 0; làm tròn đến hàng trăm thì hàng chục và hàng đơn vị về 0.',
  'nham-IV-VI':'Chữ số bé đứng TRƯỚC chữ số lớn thì trừ (IV = 4); đứng SAU thì cộng (VI = 6).',
  'doc-de-sai':'Bé đọc kỹ từng câu gợi ý: «nặng nhất», «nhẹ hơn» rồi xếp thứ tự từ nặng đến nhẹ.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
function saiTron(n, b){
 var ds=[], x=xuong(n,b), l=len(n,b), ung=tron(n,b);
 ds.push([ung===x ? l : x, 'lam-tron-nham-5']);
 ds.push([b===10 ? tron(n,100) : tron(n,10), 'nham-hang-tron']);
 ds.push([ung+b,'lam-tron-nham-5'],[ung-b,'lam-tron-nham-5'],[n,'nham-hang-tron']);
 return ds;
}

var BAI = {
 n: 49,
 title: 'Luyện Tập Chung (Chủ Đề 8)',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'bo-so-0':'Bỏ sót chữ số 0', 'doc-sai-hang':'Nhầm hàng khi đọc, viết số', 'dem-sai-buoc':'Đếm sai bước nhảy trên tia số', 'nham-hang':'Nhầm tên hàng', 'so-sanh-hang':'So sánh sai hàng, nhầm số chữ số', 'lam-tron-nham-5':'Nhầm quy tắc làm tròn (xuống hay lên)', 'nham-hang-tron':'Nhầm hàng cần làm tròn', 'nham-IV-VI':'Nhầm IV với VI, IX với XI', 'doc-de-sai':'Đọc sai gợi ý của đề'},
 muctieu: [
  {id:'MT1', ten:'Đọc, viết số, bảng hàng, tia số', muc:['Nghe viết số 3 992; bảng hàng 4 128; chữ số hàng chục; tia số qua tròn trăm.', 'Số có hàng 0 (8 504, 5 062); tia số đến 9 999; phân tích số có một chữ số 0.', 'Viết 10 000; tia số có số 10 000; làm tròn kèm bảng hàng; phân tích số có hai chữ số 0.']},
  {id:'MT2', ten:'So sánh và xếp thứ tự', muc:['Số lớn nhất trong ba số; ai nhiều điểm nhất.', 'Bốn số cùng chữ số (3 768, 6 783, 3 687, 6 738); ai được trên 2 000 điểm; tê giác nặng bao nhiêu.', 'Số lớn thứ hai; đếm bạn dưới 2 000 điểm; gán đủ ba con vật; thẻ 5?01 > 5 799.']},
  {id:'MT3', ten:'Làm tròn và số La Mã', muc:['Làm tròn đến hàng chục (2 846); bình thiếu số La Mã (XIV).', 'Trường 1 992 học sinh khoảng bao nhiêu; sách I đến VIII mất hai cuốn.', 'Chọn số khoảng đúng trong bốn số; xếp XIII, XVII, XII, XVIII.']}
 ],
 topics: [
  /* D1 — Nghe viết số (bài 1) */
  {name:'Nghe viết số', sec:'Bài 1 — 3 992; mười nghìn; 8 504; 7 006', mt:['MT1'], levels:3,
   muc:['Số không có chữ số 0 (3 992).', 'Số có một chữ số 0 (8 504).', 'Số có hai chữ số 0 (7 006) hoặc 10 000.'],
   make:function(lv){
    var n = lv<=1 ? soBon(0) : (lv===2 ? soBon(1) : (Math.random()<0.3 ? 10000 : soBon(2))), sai;
    if(n===10000) sai=[[sx(1000),'doc-sai-hang'],[sx(9999),'doc-sai-hang'],[sx(9000),'doc-sai-hang']]; else sai=gan(n).map(function(p){ return [sx(p[0]), p[1]]; });
    var m=lapMCQ(sx(n), sai);
    return {type:'mcq', cot:2, _lv:lv, _n:n, _dung:m._dung, q:'<div>Số nào được đọc là:</div>'+bieuThucTo('«'+docSo(n)+'»')+'<div>Bé chọn số đúng nhé!</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var n=q._n; if(n<1000 || n>10000 || q.q.indexOf(docSo(n))<0 || !kiemMCQ(q) || q.choices.length!==4 || q._dung!==sx(n)) return false; var k=demKhong(n);
    if(q._lv<=1) return k===0; if(q._lv===2) return k===1; return n===10000 || k===2; }},

  /* D2 — Tia số (bài 2) */
  {name:'Tia số', sec:'Bài 2 — 3 496 … 3 504; 9 992 … 9 999', mt:['MT1'], levels:3,
   muc:['Tia số bước 1 qua tròn trăm (3 496 … 3 504).', 'Tia số bước 1 đến 9 999 (9 992 … 9 999).', 'Tia số bước 1 000 hoặc có số 10 000.'],
   make:function(lv){
    var seq=[], i, hi, step=1, start;
    if(lv<=1){ start=rnd(11,95)*100-rnd(2,3); hi=rnd(1,4); }
    else if(lv===2){ start=9994; hi=rnd(1,4); }
    else if(Math.random()<0.5){ step=1000; start=5000; hi=5; }
    else { step=1000; start=rnd(1,3)*1000; hi=rnd(1,4); }
    for(i=0;i<6;i++) seq.push(start+i*step);
    var ans=seq[hi];
    return {type:'num', _lv:lv, q:tiaSo(seq, hi)+'<div>Số ở ô <b class="text-amber-700">?</b> là số nào?</div>', ans:ans, sai:nhanSai([[ans+step,'dem-sai-buoc'],[ans-step,'dem-sai-buoc'],[ans+1,'dem-sai-buoc'],[ans-1,'dem-sai-buoc'],[ans+10,'dem-sai-buoc'],[ans-100,'dem-sai-buoc']], ans), goiY:gy()};
  }, check:function(q){ var t=docTia(q.q); if(!t || t.seq.length<6 || t.hi<1) return false; var st=t.seq[1]-t.seq[0], i; for(i=1;i<t.seq.length;i++) if(t.seq[i]-t.seq[i-1]!==st) return false;
    if(q.ans!==t.seq[t.hi] || t.seq[0]<1000 || t.seq[t.seq.length-1]>10000) return false;
    if(q._lv<=1) return st===1 && Math.floor(t.seq[0]/100)!==Math.floor(t.seq[5]/100) && t.seq[5]<=9999; if(q._lv===2) return st===1 && t.seq[5]===9999 && t.hi<=4; return st===1000 && (t.seq[t.hi]<=10000); }},

  /* D3 — Bảng hàng, chữ số hàng chục (bài 3) */
  {name:'Bảng hàng và chữ số hàng chục', sec:'Bài 3 — số 2 846 có chữ số hàng chục là 4; bảng hàng của 4 128, 5 062, 6 704, 7 053', mt:['MT1'], levels:3,
   muc:['Đọc bảng hàng: chữ số hàng chục là mấy.', 'Bảng thiếu một chữ số, số có chữ số 0 (5 062).', 'Làm tròn số trong bảng hàng đến hàng chục.'],
   make:function(lv){
    var n, an=-1, ans, sai, q;
    if(lv<=1){ n=soBon(0); ans=+String(n).charAt(2); q='<div>Chữ số ở <b>hàng chục</b> của số <b>'+sx(n)+'</b> là mấy?</div>'; sai=[[+String(n).charAt(1),'nham-hang'],[+String(n).charAt(3),'nham-hang'],[+String(n).charAt(0),'nham-hang'],[ans+1,'nham-hang']]; }
    else if(lv===2){ n=soBon(1); var nz=[0,1,2,3].filter(function(i){ return n>=0 && String(n).charAt(i)!=='0'; }); an=pick(nz); ans=+String(n).charAt(an); q='<div>Bảng hàng của số <b>'+sx(n)+'</b>. Chữ số ở ô <b class="text-amber-700">?</b> là mấy?</div>'; sai=[[ans+1,'nham-hang'],[ans-1,'nham-hang'],[+String(n).charAt((an+1)%4)||ans+2,'nham-hang'],[+String(n).charAt((an+3)%4)||ans+3,'nham-hang']]; }
    else { do { n=soBon(0); } while(n%10<5 || (Math.floor(n/10)%10)===9); ans=tron(n,10); q='<div>Làm tròn số trong bảng hàng đến <b>hàng chục</b>.</div>'; sai=saiTron(n,10); }
    return {type:'num', _lv:lv, _n:n, _an:an, q:khungHinh(bangHang(n, an).replace(/<\/svg>$/,''))+q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var v=docBang(q.q), n=q._n, hoi=v.indexOf('?'); if(v.length!==4 || n<1000 || n>9999) return false;
    if(q._lv<=1) return hoi<0 && +v.join('')===n && demKhong(n)===0 && q.ans===+String(n).charAt(2);
    if(q._lv===2) return hoi>=0 && v.filter(function(x){ return x==='?'; }).length===1 && demKhong(n)===1 && q.ans===+String(n).charAt(hoi) && q.ans>0 && q.q.indexOf(sx(n))>=0;
    return hoi<0 && +v.join('')===n && n%10>=5 && q.ans===tron(n,10); }},

  /* D4 — Phân tích số (bài 4) */
  {name:'Phân tích số', sec:'Bài 4 — 6 409 = 6 000 + ? + 9; 6 411 = ? + 400 + 10 + 1; 6 008 = 6 000 + ?', mt:['MT1'], levels:3,
   muc:['Số không có chữ số 0: tìm số hạng cuối.', 'Số có một chữ số 0: tìm một số hạng.', 'Số có hai chữ số 0 (6 008): tìm một số hạng.'],
   make:function(lv){
    var n=soBon(lv<=1 ? 0 : (lv===2 ? 1 : 2)), d=String(n).split(''), parts=[+(d[0]+'000'), +(d[1]+'00'), +(d[2]+'0'), +d[3]], nz=[0,1,2,3].filter(function(i){ return parts[i]>0; }), idx = lv<=1 ? 3 : pick(nz), exp=[], i;
    for(i=0;i<4;i++){ if(parts[i]===0) continue; exp.push(i===idx ? '?' : sx(parts[i])); }
    var ans=parts[idx];
    return {type:'num', _lv:lv, _n:n, _idx:idx, q:'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>'+bieuThucTo(sx(n)+' = '+exp.join(' + ')), ans:ans, sai:nhanSai([[ans*10>9000 ? ans/10 : ans*10,'nham-hang'],[ans>=10 ? ans/10 : ans+1,'nham-hang'],[ans+1,'nham-hang'],[ans+100,'nham-hang']], ans), goiY:gy()};
  }, check:function(q){ var n=q._n, d=String(n).split(''), parts=[+(d[0]+'000'), +(d[1]+'00'), +(d[2]+'0'), +d[3]], idx=q._idx; if(parts[idx]<=0 || q.ans!==parts[idx]) return false; var k=demKhong(n);
    if(q._lv<=1) return k===0 && idx===3; if(q._lv===2) return k===1; return k===2; }},

  /* D5 — Số lớn nhất, bé nhất (bài 5) */
  {name:'Số lớn nhất, bé nhất', sec:'Bài 5 — trong các số 3 768, 6 783, 3 687, 6 738', mt:['MT2'], levels:3,
   muc:['Số lớn nhất trong ba số.', 'Bốn số gồm các chữ số giống nhau: lớn nhất hoặc bé nhất.', 'Số lớn thứ hai trong bốn số.'],
   make:function(lv){
    var ns = lv<=1 ? bonVat(1) : bonVat(lv), kieu = lv<=1 ? 'max' : (lv===2 ? pick(['min','max']) : 'hai'), srt=ns.slice().sort(function(a,b){ return b-a; }), dung = kieu==='max' ? srt[0] : (kieu==='min' ? srt[srt.length-1] : srt[1]);
    var cs=ns.map(sx), dungS=sx(dung), sai={}; cs.forEach(function(c,i){ if(c!==dungS) sai[String(i)]='so-sanh-hang'; });
    return {type:'mcq', cot:2, _lv:lv, _kieu:kieu, _ns:ns.join(','), _dung:dungS, q:'<div>Trong các số dưới đây, số nào <b>'+(kieu==='max' ? 'lớn nhất' : (kieu==='min' ? 'bé nhất' : 'lớn thứ hai'))+'</b>?</div>', choices:cs, correct:cs.indexOf(dungS), sai:sai, goiY:gy()};
  }, check:function(q){ var ns=q._ns.split(',').map(Number); if(new Set(ns).size!==ns.length || ns.some(function(v){ return v<1000 || v>9999; }) || !kiemMCQ(q) || q.choices.length!==ns.length) return false;
    var srt=ns.slice().sort(function(a,b){ return b-a; }), e = q._kieu==='max' ? srt[0] : (q._kieu==='min' ? srt[srt.length-1] : srt[1]); if(q._dung!==sx(e)) return false;
    if(q._lv<=1) return ns.length===3 && q._kieu==='max'; if(q._lv===2) return ns.length===4 && q._kieu!=='hai'; return ns.length===4 && q._kieu==='hai' && srt[0]-srt[1]>=90; }},

  /* D6 — Điểm trò chơi (bài 6) */
  {name:'Điểm trò chơi', sec:'Bài 6 — điểm các bạn 2 150, 1 650, 2 300, 1 850: ai cao nhất, ai trên (dưới) 2 000', mt:['MT2'], levels:3,
   muc:['Bạn nào được nhiều điểm nhất.', 'Bạn nào được hơn 2 000 điểm (chỉ một bạn).', 'Có mấy bạn được dưới 2 000 điểm.'],
   make:function(lv){
    var tn=nguoiTen(), ds, k, i, g;
    function diem(lo,hi){ return rnd(lo/50,hi/50)*50; }
    if(lv<=1){ do { ds=[diem(1000,3000),diem(1000,3000),diem(1000,3000),diem(1000,3000)]; } while(new Set(ds).size<4 || ds.indexOf(2000)>=0); }
    else if(lv===2){ do { ds=shuffle([diem(1000,1950),diem(1000,1950),diem(1000,1950),diem(2050,3000)]); } while(new Set(ds).size<4); }
    else { k=rnd(1,3); do { ds=[]; for(i=0;i<4;i++) ds.push(i<k ? diem(1000,1950) : diem(2050,3000)); } while(new Set(ds).size<4); ds=shuffle(ds); }
    var pts=tn.map(function(t,i){ return t+':'+ds[i]; }).join(',');
    var ghi=ghiDiem(tn, ds);
    if(lv>=3){ var cnt=ds.filter(function(v){ return v<2000; }).length; return {type:'num', _lv:3, _pts:pts, q:ghi+'<div>Có mấy bạn được <b>dưới 2 000</b> điểm?</div>', ans:cnt, sai:nhanSai([[cnt+1,'so-sanh-hang'],[cnt-1,'so-sanh-hang'],[4-cnt,'so-sanh-hang'],[cnt+2,'so-sanh-hang']], cnt), goiY:gy()}; }
    var dungI = lv<=1 ? ds.indexOf(Math.max.apply(null,ds)) : ds.findIndex(function(v){ return v>2000; }), D=tn[dungI], ch=tn.slice(), sai={}; ch.forEach(function(c,i){ if(c!==D) sai[String(i)]='so-sanh-hang'; });
    return {type:'mcq', cot:2, _lv:lv, _pts:pts, _dung:D, q:ghi+'<div>Bạn nào được '+(lv<=1 ? '<b>nhiều điểm nhất</b>' : '<b>hơn 2 000</b> điểm')+'?</div>', choices:ch, correct:dungI, sai:sai, goiY:gy()};
  }, check:function(q){ var ps=parseDiem(q._pts); if(ps.length!==4 || new Set(ps.map(function(p){ return p.t; })).size!==4 || new Set(ps.map(function(p){ return p.v; })).size!==4 || ps.some(function(p){ return p.v<1000 || p.v>3000 || p.v===2000 || q.q.indexOf(sx(p.v))<0; })) return false;
    if(q._lv>=3){ var c=ps.filter(function(p){ return p.v<2000; }).length; return c>=1 && c<=3 && q.ans===c; }
    if(!kiemMCQ(q) || q.choices.length!==4) return false;
    if(q._lv<=1){ var mx=ps.reduce(function(a,b){ return b.v>a.v ? b : a; }); return q._dung===mx.t; }
    var tren=ps.filter(function(p){ return p.v>2000; }); return tren.length===1 && q._dung===tren[0].t; }},

  /* D7 — Ba con vật (bài 7) */
  {name:'Ba con vật', sec:'Bài 7 — voi châu Phi, hươu cao cổ, tê giác trắng nặng 2 287 kg, 6 125 kg, 1 687 kg', mt:['MT2'], levels:3,
   muc:['Voi châu Phi nặng nhất: voi nặng bao nhiêu.', 'Hươu nhẹ hơn tê giác: tê giác nặng bao nhiêu.', 'Ghép đủ ba con vật với cân nặng.'],
   make:function(lv){
    var voi=rnd(40,99)*100+rnd(0,99), te=rnd(20,39)*100+rnd(0,99), huou=rnd(10,19)*100+rnd(0,99), ws=shuffle([voi,te,huou]);
    var dau='<div>Voi châu Phi, hươu cao cổ và tê giác trắng nặng <b>'+ws.map(function(w){ return sx(w)+' kg'; }).join(', ')+'</b> (không theo thứ tự). Voi châu Phi nặng nhất.'+(lv>=2 ? ' Hươu cao cổ nhẹ hơn tê giác trắng.' : '')+'</div>';
    var base={_lv:lv, _w:[voi,te,huou].join(',')};
    if(lv<=1){ var m1=lapMCQ(sx(voi)+' kg', [[sx(te)+' kg','doc-de-sai'],[sx(huou)+' kg','doc-de-sai'],[sx(voi+rnd(1,5)*100>9999 ? voi-100 : voi+300)+' kg','doc-de-sai']]); base._dung=m1._dung; base.type='mcq'; base.cot=2; base.q=dau+'<div>Voi châu Phi nặng bao nhiêu?</div>'; base.choices=m1.choices; base.correct=m1.correct; base.sai=m1.sai; base.goiY=gy(); return base; }
    if(lv===2){ var m2=lapMCQ(sx(te)+' kg', [[sx(voi)+' kg','doc-de-sai'],[sx(huou)+' kg','doc-de-sai'],[sx(te+300)+' kg','doc-de-sai']]); base._dung=m2._dung; base.type='mcq'; base.cot=2; base.q=dau+'<div>Tê giác trắng nặng bao nhiêu?</div>'; base.choices=m2.choices; base.correct=m2.correct; base.sai=m2.sai; base.goiY=gy(); return base; }
    function gan3(a,b,c){ return 'Voi: '+sx(a)+' kg; tê giác: '+sx(b)+' kg; hươu: '+sx(c)+' kg'; }
    var D=gan3(voi,te,huou), m3=lapMCQ(D, [[gan3(te,voi,huou),'doc-de-sai'],[gan3(voi,huou,te),'doc-de-sai'],[gan3(huou,te,voi),'doc-de-sai'],[gan3(te,huou,voi),'doc-de-sai']]);
    base._dung=m3._dung; base.type='mcq'; base.cot=1; base.q=dau+'<div>Cách ghép nào đúng?</div>'; base.choices=m3.choices; base.correct=m3.correct; base.sai=m3.sai; base.goiY=gy(); return base;
  }, check:function(q){ var w=q._w.split(',').map(Number), voi=w[0], te=w[1], huou=w[2]; if(!(voi>te && te>huou) || w.some(function(v){ return v<1000 || v>9999; }) || !kiemMCQ(q)) return false;
    if(w.some(function(v){ return q.q.indexOf(sx(v)+' kg')<0; })) return false;
    if(q._lv<=1) return q._dung===sx(voi)+' kg' && q.q.indexOf('Hươu cao cổ nhẹ hơn')<0; if(q._lv===2) return q._dung===sx(te)+' kg' && q.q.indexOf('Hươu cao cổ nhẹ hơn tê giác')>=0;
    return q._dung==='Voi: '+sx(voi)+' kg; tê giác: '+sx(te)+' kg; hươu: '+sx(huou)+' kg' && q.choices.length>=3; }},

  /* D8 — Thẻ chữ số ? (bài 8) */
  {name:'Thẻ chữ số', sec:'Bài 8 — thẻ chữ số 0 đến 9: 5?01 > 5 799, chữ số ? là mấy, có bao nhiêu cách', mt:['MT2'], levels:3,
   muc:['Chọn chữ số điền vào ? để so sánh đúng.', 'Chữ số bé nhất có thể điền vào ?.', 'Có bao nhiêu cách điền chữ số vào ?.'],
   make:function(lv){
    var A=rnd(2,8), x0 = lv<=1 ? pick([5,6,7,8]) : (lv===2 ? pick([4,5,6,7]) : pick([4,5,6,7,8])), bc=rnd(1,98), s=(bc<10 ? '0' : '')+bc, K=A*1000+x0*100+99;
    var ve=bieuThucTo(A+'?'+s+' &gt; '+sx(K)), th='<div>Có các thẻ chữ số từ 0 đến 9. Số <b>'+A+'?'+s+'</b> lớn hơn <b>'+sx(K)+'</b>.</div>';
    if(lv<=1){ var dung=String(x0+1+rnd(0,8-x0)), sai=[], i; for(i=0;i<=x0;i++) sai.push([String(i),'so-sanh-hang']); var m=lapMCQ(dung, shuffle(sai));
      return {type:'mcq', cot:2, _lv:1, _A:A, _s:s, _K:K, _dung:m._dung, q:th+ve+'<div>Chữ số nào có thể điền vào ô <b class="text-amber-700">?</b>?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()}; }
    if(lv===2){ var ans=x0+1; return {type:'num', _lv:2, _A:A, _s:s, _K:K, q:th+ve+'<div>Chữ số <b>bé nhất</b> có thể điền vào ô <b class="text-amber-700">?</b> là mấy?</div>', ans:ans, sai:nhanSai([[x0,'so-sanh-hang'],[x0+2,'so-sanh-hang'],[9,'so-sanh-hang'],[x0-1>0 ? x0-1 : x0+3,'so-sanh-hang']], ans), goiY:gy()}; }
    var c=9-x0; return {type:'num', _lv:3, _A:A, _s:s, _K:K, q:th+ve+'<div>Có bao nhiêu cách chọn chữ số điền vào ô <b class="text-amber-700">?</b></div>', ans:c, sai:nhanSai([[c+1,'so-sanh-hang'],[c-1>0 ? c-1 : c+2,'so-sanh-hang'],[x0,'so-sanh-hang'],[10-x0,'so-sanh-hang']], c), goiY:gy()};
  }, check:function(q){ var A=q._A, s=q._s, K=q._K, ok=[], d; for(d=0;d<=9;d++) if(+(A+String(d)+s)>K) ok.push(d); if(!ok.length || ok.length>5 || K<1000) return false; if(q.q.indexOf(A+'?'+s)<0 || q.q.indexOf(sx(K))<0) return false;
    if(q._lv<=1) return kiemMCQ(q) && q.choices.length===4 && ok.indexOf(+q._dung)>=0 && q.choices.filter(function(c){ return ok.indexOf(+c)>=0; }).length===1;
    if(q._lv===2) return q.ans===Math.min.apply(null,ok) && q.ans>0; return q.ans===ok.length; }},

  /* D9 — Làm tròn và khoảng (bài 9) */
  {name:'Làm tròn và khoảng', sec:'Bài 9 — 2 846 làm tròn đến hàng chục là 2 850; trường 1 992 học sinh khoảng 2 000', mt:['MT3'], levels:3,
   muc:['Làm tròn đến hàng chục (2 846).', 'Làm tròn đến hàng trăm để ước lượng (trường 1 992 học sinh).', 'Chọn số khoảng đúng trong bốn số.'],
   make:function(lv){
    var c=pick(CANH), n, b = lv<=1 ? 10 : 100;
    if(lv<=1){ do { n=soVoi(null,null); } while(tron(n,10)===n); return {type:'num', _lv:1, _n:n, q:'<div>Làm tròn số <b>'+sx(n)+'</b> đến <b>hàng chục</b>.</div>', ans:tron(n,10), sai:nhanSai(saiTron(n,10), tron(n,10)), goiY:gy()}; }
    if(lv===2){ do { n=soVoi(null,null); } while(tron(n,100)===n); return {type:'num', _lv:2, _n:n, q:'<div>'+c[0]+' có <b>'+sx(n)+'</b> '+c[1]+'. Làm tròn đến <b>hàng trăm</b>, '+c[0].toLowerCase()+' có khoảng bao nhiêu '+c[1]+'?</div>', ans:tron(n,100), sai:nhanSai(saiTron(n,100), tron(n,100)), goiY:gy()}; }
    do { n=rnd(1,9)*1000+rnd(5,9)*100+rnd(5,9)*10+rnd(0,9); } while(tron(n,10)===tron(n,100));
    var T=tron(n,100), m=lapMCQ(sx(T), [[tron(n,10),'nham-hang-tron'],[xuong(n,100),'lam-tron-nham-5'],[xuong(n,1000),'nham-hang-tron'],[T+100,'lam-tron-nham-5']].map(function(p){ return [sx(p[0]),p[1]]; }));
    return {type:'mcq', cot:2, _lv:3, _n:n, _dung:m._dung, q:'<div>'+c[0]+' có <b>'+sx(n)+'</b> '+c[1]+'. Làm tròn đến <b>hàng trăm</b>, '+c[0].toLowerCase()+' có khoảng bao nhiêu '+c[1]+'?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var n=q._n; if(n<1000 || n>9999 || q.q.indexOf(sx(n))<0) return false; if(q._lv<=1) return q.ans===tron(n,10) && tron(n,10)!==n; if(q._lv===2) return q.ans===tron(n,100) && tron(n,100)!==n;
    return kiemMCQ(q) && q.choices.length===4 && q._dung===sx(tron(n,100)) && tron(n,10)!==tron(n,100); }},

  /* D10 — Số La Mã trong bài (bài 10) */
  {name:'Số La Mã trong bài', sec:'Bài 10 — bình vỡ XIV: XII, XIII, ?, XV; sách đánh số I đến VIII mất hai cuốn; xếp XIII, XVII, XII, XVIII', mt:['MT3'], levels:3,
   muc:['Điền số La Mã còn thiếu trong dãy (XII, XIII, ?, XV).', 'Sách đánh số I đến VIII bị lấy mất hai cuốn: hai cuốn đó là số nào.', 'Xếp bốn số La Mã từ bé đến lớn.'],
   make:function(lv){
    var m;
    if(lv<=1){ var a=rnd(10,16), hi=rnd(1,3), seq=[a,a+1,a+2,a+3,a+4], ans=seq[hi], sai=[], c=[ans+1,ans-1,ans+2,ans-2,ans+5].filter(function(x){ return x>=1 && x<=20 && x!==ans; });
      c.forEach(function(x){ sai.push([laMa(x),'dem-sai-buoc']); }); var dao=laMa(ans).split('').reverse().join(''); if(dao!==laMa(ans)) sai.unshift([dao,'nham-IV-VI']);
      m=lapMCQ(laMa(ans), sai); return {type:'mcq', cot:2, _lv:1, _seq:seq.join(','), _hi:hi, _dung:m._dung, q:'<div>Cái bình vỡ ghi số La Mã. Điền số La Mã vào chỗ <b class="text-amber-700">?</b></div>'+bieuThucTo(seq.map(function(x,k){ return k===hi ? '?' : laMa(x); }).join(', ')), choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()}; }
    if(lv===2){ var pr=shuffle([1,2,3,4,5,6,7,8]).slice(0,2).sort(function(u,v){ return u-v; }), x=pr[0], y=pr[1], rest=[1,2,3,4,5,6,7,8].filter(function(v){ return v!==x && v!==y; }), D=laMa(x)+' và '+laMa(y);
      function cap(p,q2){ return laMa(Math.min(p,q2))+' và '+laMa(Math.max(p,q2)); }
      var w=shuffle([[x+1,y],[x,y+1],[x-1,y],[x,y-1],[x+1,y+1],[x-1,y-1]].filter(function(pp){ return pp[0]>=1 && pp[1]>=1 && pp[0]<=8 && pp[1]<=8 && pp[0]!==pp[1]; })).map(function(pp){ return [cap(pp[0],pp[1]),'dem-sai-buoc']; });
      m=lapMCQ(D, w); return {type:'mcq', cot:2, _lv:2, _x:Math.min(x,y), _y:Math.max(x,y), _dung:m._dung, q:'<div>Bộ sách đánh số từ I đến VIII. Bạn lấy đi hai cuốn, còn lại các cuốn <b>'+rest.map(laMa).join(', ')+'</b>. Hai cuốn bạn lấy đi là số nào?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()}; }
    var ns=shuffle([11,12,13,14,15,16,17,18,19,20]).slice(0,4), srt=ns.slice().sort(function(p,q2){ return p-q2; }), dung=srt.map(laMa).join(' < '), sai3=shuffle(hoanvi(ns.slice()).map(function(a){ return a.map(laMa).join(' < '); }).filter(function(c){ return c!==dung; })).map(function(c){ return [c,'doc-sai-hang']; });
    m=lapMCQ(dung, sai3); return {type:'mcq', cot:1, _lv:3, _ns:ns.join(','), _dung:m._dung, q:'<div>Các số: <b>'+shuffle(ns.slice()).map(laMa).join(', ')+'</b>. Cách xếp nào đúng từ bé đến lớn?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q) || q.choices.length<3) return false;
    if(q._lv<=1){ var seq=q._seq.split(',').map(Number), hi=q._hi; return seq.length===5 && seq.every(function(v,i){ return i===0 || v-seq[i-1]===1; }) && hi>=1 && hi<=3 && seq[0]>=10 && seq[4]<=20 && q._dung===laMa(seq[hi]); }
    if(q._lv===2){ var mm=/<b>([^<]+)<\/b>\. Hai/.exec(q.q); if(!mm || q._x<1 || q._y>8 || q._x>=q._y) return false; var toks=mm[1].split(', '), want=[1,2,3,4,5,6,7,8].filter(function(v){ return v!==q._x && v!==q._y; }).map(laMa); return toks.join('|')===want.join('|') && q._dung===laMa(q._x)+' và '+laMa(q._y); }
    var ns=q._ns.split(',').map(Number); return new Set(ns).size===4 && ns.every(function(v){ return v>=11 && v<=20; }) && q._dung===ns.slice().sort(function(p,q2){ return p-q2; }).map(laMa).join(' < '); }}
 ]
};
