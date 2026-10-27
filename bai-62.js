/* bai-62.js — Bài 62: Luyện tập chung (Tập 2, Chủ đề 11). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-62.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Ôn lại bài 59–61: hàm và dạng chép từ bài 59 (đọc, viết, bảng hàng, tia số, phân tích), bài 60 (so sánh), bài 61 (làm tròn).
   check() đọc lại hình từ chuỗi SVG (data-cot, data-v, data-seq, data-hi) và tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

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
/* ---- Từ bài 60: so sánh ---- */
function un(s){ return +String(s).split(NB).join(''); }
function dau(a,b){ return a>b ? '>' : (a<b ? '<' : '='); }
function nguocDau(o){ return o==='>' ? '<' : '>'; }
/* hai số năm chữ số giống nhau từ trái sang tới hàng k-1, khác nhau ở hàng k (0 = chục nghìn); trap: chữ số hàng đơn vị xếp ngược với thứ tự thật */
function haiKhacTai(k, trap){
 for(var g=0; g<400; g++){
  var d1=[], d2=[], i, x, y;
  for(i=0;i<5;i++){ x = i===0 ? rnd(1,9) : rnd(0,9); d1.push(x); d2.push(x); }
  do { y=rnd(k===0 ? 1 : 0, 9); } while(y===d1[k]);
  d2[k]=y; for(i=k+1;i<5;i++){ d1[i]=rnd(0,9); d2[i]=rnd(0,9); }
  var a=+d1.join(''), b=+d2.join('');
  if(!trap || k===4 || (d1[4]!==d2[4] && (a>b)===(d1[4]<d2[4]))) return [a,b];
 }
 return [38197, 38307];
}
function viTriKhac(a,b){ var x=String(a), y=String(b), i; for(i=0;i<x.length;i++) if(x.charAt(i)!==y.charAt(i)) return i; return -1; }
function capSo(lv){
 var p = lv<=1 ? [rnd(1000,9999), rnd(10000,99999)] : haiKhacTai(rnd(0,4), true);
 return Math.random()<0.5 ? p : [p[1],p[0]];
}
function cauSS(a,op,b){ return sx(a)+' '+op+' '+sx(b); }
function sxs(s){ return s.length>=4 ? s.slice(0,s.length-3)+NB+s.slice(-3) : s; }
function tach5(n){ var d=String(n).split(''), ps=[+(d[0]+'0000'), +(d[1]+'000'), +(d[2]+'00'), +(d[3]+d[4])]; return ps.filter(function(x){ return x>0; }); }
function tongArr(a){ return a.reduce(function(s,x){ return s+x; }, 0); }
var DAU3=['>','<','='];
/* ---- Từ bài 61: làm tròn ---- */
function tron(n, b){ return Math.floor((n+b/2)/b)*b; }
function xuong(n, b){ return Math.floor(n/b)*b; }
function len(n, b){ return Math.ceil(n/b)*b; }
var TEN={10:'hàng chục', 100:'hàng trăm', 1000:'hàng nghìn', 10000:'hàng chục nghìn'};
var HANG4=[10,100,1000,10000];
function tachNam(n){ var d=String(n).split(''); return [+(d[0]+'0000'), +(d[1]+'000'), +(d[2]+'00'), +(d[3]+d[4])].filter(function(x){ return x>0; }); }
/* số làm tròn đến hàng nghìn: lv1 hàng trăm < 5; lv2 hàng trăm >= 5; lv3 qua hàng chục nghìn */
function nNghin(lv){
 var g, n, h;
 if(lv>=3) return rnd(0,9)*10000+9000+rnd(5,9)*100+rnd(1,99);
 for(g=0; g<500; g++){ n=rnd(1000,99999); h=Math.floor(n/100)%10; if(n%1000===0) continue; if(lv<=1 && h<5 && n>=10000) return n; if(lv===2 && h>=5 && Math.floor(n/1000)%10!==9) return n; }
 return lv<=1 ? 11204 : 11678;
}
/* số làm tròn đến hàng chục nghìn: lv1 hàng nghìn < 5; lv2 hàng nghìn >= 5; lv3 hàng nghìn bằng 5 hoặc qua 100 000 */
function nChuc(lv){
 var g, n, t;
 if(lv>=3) return Math.random()<0.6 ? rnd(1,8)*10000+5000+rnd(0,999) : 90000+rnd(5,9)*1000+rnd(0,999);
 for(g=0; g<500; g++){ n=rnd(10000,99999); t=Math.floor(n/1000)%10; if(n%10000===0) continue; if(lv<=1 && t<5) return n; if(lv===2 && t>=5 && Math.floor(n/10000)!==9) return n; }
 return lv<=1 ? 82134 : 55712;
}
function nTheo(b, lv){ return b===1000 ? nNghin(lv) : nChuc(lv); }
/* kết quả sai thường gặp: [giá trị, nhãn] */
function saiTron(n, b){
 var c=tron(n,b), o=[], ot = c===xuong(n,b) ? len(n,b) : xuong(n,b);
 o.push([ot,'lam-tron-nham-5']); o.push([c+b,'lam-tron-nham-5']); if(c-b>0) o.push([c-b,'lam-tron-nham-5']);
 o.push([tron(n, b===1000 ? 10000 : 1000),'nham-hang-tron']); o.push([tron(n,100),'nham-hang-tron']);
 var q=Math.floor(n/(b*10))*(b*10); if(c>=q+b*10 || (c===len(n,b) && c%(b*10)===0)) o.unshift([q,'quen-nho-tron']);
 o.push([n,'nham-hang-tron']); o.push([c+2*b,'nham-hang-tron']); if(c-2*b>0) o.push([c-2*b,'nham-hang-tron']);
 var seen={}; return o.filter(function(p){ if(p[0]<=0 || p[0]>100000 || p[0]===c || seen[p[0]]) return false; seen[p[0]]=1; return true; });
}
function saiMCQ(n, b){ return saiTron(n,b).map(function(p){ return [sx(p[0]), p[1]]; }); }
var GOI={'bo-so-0':'Chữ số 0 giữ chỗ cho hàng đó: chín mươi nghìn không trăm năm mươi sáu viết là 90 056.',
  'doc-sai-hang':'Bé đọc và viết từ hàng cao đến hàng thấp: chục nghìn, nghìn, trăm, chục, đơn vị.',
  'nham-hang':'Từ phải sang trái: hàng đơn vị, chục, trăm, nghìn, chục nghìn.',
  'dem-sai-buoc':'Bé xem mỗi bước tăng thêm bao nhiêu (10, 100, 1 000) rồi đếm tiếp.',
  'so-sanh-hang':'Số nào có nhiều chữ số hơn thì lớn hơn. Cùng số chữ số thì so từng hàng từ trái sang phải, dừng ở hàng đầu tiên khác nhau.',
  'sai-thu-tu':'Từ bé đến lớn: số bé nhất đứng trước. Từ lớn đến bé: số lớn nhất đứng trước.',
  'nham-bang':'Bé cộng các hàng thành một số rồi mới so sánh: 50 000 + 2 000 + 700 + 40 = 52 740.',
  'lam-tron-nham-5':'Xem chữ số ngay bên phải hàng cần làm tròn: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  'nham-hang-tron':'Đọc kỹ làm tròn đến hàng nào: hàng nghìn thì xem chữ số hàng trăm; hàng chục nghìn thì xem chữ số hàng nghìn.',
  'quen-nho-tron':'Làm tròn lên thì chữ số ở hàng bên trái tăng thêm 1 (có thể phải nhớ): 49 600 làm tròn đến hàng nghìn là 50 000.'};
function gy(){ var o={}, k; for(k in GOI) o[k]=GOI[k]; return o; }

var BAI = {
 n: 62,
 title: 'Luyện Tập Chung (Số Đến 100 000)',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'bo-so-0':'Bỏ sót chữ số 0', 'doc-sai-hang':'Nhầm hàng khi đọc, viết số', 'nham-hang':'Nhầm tên hàng', 'dem-sai-buoc':'Đếm sai bước nhảy', 'so-sanh-hang':'So sánh sai hàng, nhầm số chữ số', 'sai-thu-tu':'Xếp sai thứ tự', 'nham-bang':'Chưa tính tổng các hàng', 'lam-tron-nham-5':'Nhầm quy tắc làm tròn', 'nham-hang-tron':'Nhầm hàng cần làm tròn', 'quen-nho-tron':'Quên tăng hàng bên trái khi làm tròn lên'},
 muctieu: [
  {id:'MT1', ten:'Đọc, viết số', muc:['Viết số từ lời (38 519); bảng hàng điền chữ số.', 'Đọc số có hàng 0 (79 600, 80 104); viết số trong bảng hàng.', 'Số có hai chữ số 0; bạn An viết số.']},
  {id:'MT2', ten:'Dãy số, so sánh, xếp thứ tự', muc:['Dãy cách 10 (67 210, 67 220 ...); vườn xa nhất; xếp ba số.', 'Dãy cách 100; vườn gần nhất; xếp bốn số; so với tổng các hàng.', 'Dãy cách 1 000; xếp từ lớn đến bé; vườn xa thứ hai; chọn câu đúng.']},
  {id:'MT3', ten:'Làm tròn và phân tích số', muc:['Làm tròn đến hàng nghìn; phân tích số không có chữ số 0.', 'Làm tròn đến hàng chục nghìn; phân tích số tròn nghìn.', 'Số sát nửa; phân tích số có chữ số 0.']}
 ],
 topics: [
  /* D1 — Đọc số, chọn số */
  {name:'Đọc số, chọn số', sec:'Bài 1 — 51 254 đọc là năm mươi mốt nghìn hai trăm năm mươi tư; 38 519; 26 856; 79 600', mt:['MT1'], levels:3,
   muc:['Số không có chữ số 0.', 'Số có một chữ số 0 (90 056).', 'Số có hai chữ số 0 hoặc 100 000.'],
   make:function(lv){
    var n = lv<=1 ? soNam(0) : (lv===2 ? soNam(1) : (Math.random()<0.25 ? 100000 : soNam(2))), sai;
    sai = n===100000 ? [[sx(10000),'doc-sai-hang'],[sx(99999),'nham-truoc-sau'],[sx(1000),'doc-sai-hang']] : gan5(n).map(function(p){ return [sx(p[0]), p[1]]; });
    var m=lapMCQ(sx(n), sai);
    return {type:'mcq', cot:2, _lv:lv, _n:n, _dung:m._dung, q:'<div>Số nào được đọc là:</div>'+bieuThucTo('«'+docSo5(n)+'»')+'<div>Bé chọn số đúng nhé!</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var n=q._n; if(n<10000 || n>100000 || q.q.indexOf(docSo5(n))<0 || !kiemMCQ(q) || q.choices.length!==4 || q._dung!==sx(n)) return false; var k=demKhong(n); if(q._lv<=1) return k===0; if(q._lv===2) return k===1; return n===100000 || k===2; }},

  /* D2 — Viết số từ lời */
  {name:'Viết số từ lời', sec:'Bài 1 — viết số: 3 chục nghìn 8 nghìn 5 trăm 1 chục 9 đơn vị là 38 519', mt:['MT1'], levels:3,
   muc:['Viết số từ «chục nghìn, nghìn, trăm, chục, đơn vị», không có 0.', 'Có một hàng bằng 0.', 'Viết số từ lời đọc dài.'],
   make:function(lv){
    var n = lv<=1 ? soNam(0) : (lv===2 ? soNam(1) : soNam(rnd(1,2))), d=String(n).split(''), q;
    if(lv<=2) q='Viết số gồm: <b>'+d[0]+' chục nghìn, '+d[1]+' nghìn, '+d[2]+' trăm, '+d[3]+' chục, '+d[4]+' đơn vị</b>.'; else q='Viết số: <b>«'+docSo5(n)+'»</b>.';
    return {type:'num', _lv:lv, _n:n, q:'<div>'+q+'</div>', ans:n, sai:nhanSai(gan5(n).concat(demKhong(n)>0 ? [[boKhong(n),'bo-so-0']] : []), n), goiY:gy()};
  }, check:function(q){ var n=q._n, d=String(n).split(''); if(q.ans!==n || n<10000 || n>99999) return false; var k=demKhong(n);
    if(q._lv<=1) return k===0 && q.q.indexOf(d[0]+' chục nghìn, '+d[1]+' nghìn, '+d[2]+' trăm, '+d[3]+' chục, '+d[4]+' đơn vị')>=0;
    if(q._lv===2) return k===1 && q.q.indexOf(d[0]+' chục nghìn, '+d[1]+' nghìn, '+d[2]+' trăm, '+d[3]+' chục, '+d[4]+' đơn vị')>=0; return k>=1 && q.q.indexOf(docSo5(n))>=0; }},

  /* D3 — Bảng hàng */
  {name:'Bảng hàng năm hàng', sec:'Bài 1 — bảng hàng chục nghìn, nghìn, trăm, chục, đơn vị: 51 254; 79 600', mt:['MT1'], levels:3,
   muc:['Bảng thiếu một chữ số: điền chữ số ở ô ?.', 'Viết số được ghi trong bảng hàng.', 'Viết số trong bảng hàng có chữ số 0.'],
   make:function(lv){
    var n, an=-1, ans, sai, q;
    if(lv<=1){ n=soNam(0); an=rnd(0,4); ans=+String(n).charAt(an); q='<div>Bảng hàng của số <b>'+sx(n)+'</b>. Chữ số ở ô <b class="text-amber-700">?</b> là mấy?</div>'; sai=[[ans+1,'nham-hang'],[ans-1,'nham-hang'],[+String(n).charAt((an+1)%5),'nham-hang'],[+String(n).charAt((an+4)%5),'nham-hang']]; }
    else { n = lv===2 ? soNam(0) : soNam(rnd(1,2)); ans=n; q='<div>Viết số được ghi trong bảng hàng.</div>'; sai=gan5(n).concat([[boKhong(n),'bo-so-0']]); }
    return {type:'num', _lv:lv, _n:n, _an:an, q:khungHinh(bangHang5(n, an).replace(/<\/svg>$/,''))+q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var v=docBang(q.q), n=q._n, hoi=v.indexOf('?'); if(v.length!==5 || String(n).length!==5) return false;
    if(q._lv<=1){ if(hoi<0 || v.filter(function(x){ return x==='?'; }).length!==1 || demKhong(n)!==0) return false; return q.ans===+String(n).charAt(hoi); }
    if(hoi>=0 || +v.join('')!==n) return false; var k=demKhong(n); if(q._lv===2 && k!==0) return false; if(q._lv===3 && k<1) return false; return q.ans===n; }},

  /* D4 — Dãy số cách đều */
  {name:'Dãy số cách đều', sec:'Bài 2 — 67 210, 67 220, 67 230, ?, ?; 46 600, 46 700, ?, 46 900, ?; 79 000, ?, 81 000, 82 000, ?', mt:['MT2'], levels:3,
   muc:['Dãy số cách 10.', 'Dãy số cách 100.', 'Dãy số cách 1 000.'],
   make:function(lv){
    var step = lv<=1 ? 10 : (lv===2 ? 100 : 1000), start = step===10 ? rnd(60,98)*1000+rnd(1,60)*10 : (step===100 ? rnd(10,98)*1000+rnd(1,5)*100 : rnd(11,90)*1000), seq=[], i, hi=rnd(1,4);
    for(i=0;i<6;i++) seq.push(start+i*step);
    var ans=seq[hi];
    return {type:'num', _lv:lv, q:tiaSo5(seq, hi)+'<div>Số ở ô <b class="text-amber-700">?</b> là số nào?</div>', ans:ans, sai:nhanSai([[ans+step,'dem-sai-buoc'],[ans-step,'dem-sai-buoc'],[ans+10,'dem-sai-buoc'],[ans-10,'dem-sai-buoc'],[ans+1000,'dem-sai-buoc'],[ans+100,'dem-sai-buoc']], ans), goiY:gy()};
  }, check:function(q){ var t=docTia(q.q); if(!t || t.seq.length!==6 || t.hi<1 || t.hi>4) return false; var st=t.seq[1]-t.seq[0], i; for(i=1;i<6;i++) if(t.seq[i]-t.seq[i-1]!==st) return false;
    if(t.seq[0]<10000 || t.seq[5]>99999 || q.ans!==t.seq[t.hi]) return false; return st===(q._lv<=1 ? 10 : (q._lv===2 ? 100 : 1000)); }},

  /* D5 — Khoảng cách ong */
  {name:'Khoảng cách ong bay', sec:'Bài 3 — ong bay đến vườn hoa hồng 42 890 m, hoa lan 35 000 m, hoa cúc 45 050 m, hướng dương 25 090 m: vườn nào xa nhất, gần nhất', mt:['MT2'], levels:3,
   muc:['Vườn xa nhất.', 'Vườn gần nhất.', 'Vườn xa thứ hai hoặc gần thứ hai.'],
   make:function(lv){
    var HOA=['Hoa hồng','Hoa lan','Hoa cúc','Hướng dương'], ns=[], g, i;
    for(g=0; g<300; g++){ ns=[]; for(i=0;i<4;i++) ns.push(rnd(2,9)*10000+(Math.random()<0.5 ? 0 : rnd(0,9)*1000)+rnd(0,9)*(Math.random()<0.5 ? 0 : 10)); var s=ns.slice().sort(function(a,b){ return a-b; }), ok=new Set(ns).size===4; for(i=1;i<4;i++) if(s[i]-s[i-1]<100) ok=false; if(ok) break; }
    var kind = lv<=1 ? 'max' : (lv===2 ? 'min' : pick(['max2','min2'])), s2=ns.slice().sort(function(a,b){ return a-b; });
    var val = kind==='max' ? s2[3] : (kind==='min' ? s2[0] : (kind==='max2' ? s2[2] : s2[1])), D=HOA[ns.indexOf(val)], dong='';
    ns.forEach(function(x,t){ dong+='<div>'+HOA[t]+': <b>'+sx(x)+'</b> m</div>'; });
    var ch=shuffle(HOA.slice()), sai={}; ch.forEach(function(c,t){ if(c!==D) sai[String(t)]='so-sanh-hang'; });
    return {type:'mcq', cot:2, _lv:lv, _k:kind, _n:ns.join(','), _dung:D, q:'<div class="mb-1">Một chú ong bay từ tổ đến bốn vườn hoa. Quãng đường như sau:</div>'+dong+'<div class="mt-1">Vườn nào '+({max:'xa nhất', min:'gần nhất', max2:'xa thứ hai', min2:'gần thứ hai'})[kind]+'?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q) || q.choices.length!==4) return false; var ns=q._n.split(',').map(Number), HOA=['Hoa hồng','Hoa lan','Hoa cúc','Hướng dương']; if(ns.length!==4 || new Set(ns).size!==4 || ns.some(function(x){ return x<10000 || x>99999; })) return false;
    if(!ns.every(function(x,t){ return q.q.indexOf(HOA[t]+': <b>'+sx(x)+'</b> m')>=0; })) return false;
    var s2=ns.slice().sort(function(a,b){ return a-b; }), kd=q._k, val = kd==='max' ? s2[3] : (kd==='min' ? s2[0] : (kd==='max2' ? s2[2] : s2[1]));
    if(q._dung!==HOA[ns.indexOf(val)]) return false; if(q._lv<=1) return kd==='max'; if(q._lv===2) return kd==='min'; return kd==='max2' || kd==='min2'; }},

  /* D6 — Xếp thứ tự các số */
  {name:'Xếp thứ tự các số', sec:'Bài 3 — xếp các số theo thứ tự từ bé đến lớn, từ lớn đến bé', mt:['MT2'], levels:3,
   muc:['Ba số, xếp từ bé đến lớn.', 'Bốn số, xếp từ bé đến lớn.', 'Bốn số, xếp từ lớn đến bé.'],
   make:function(lv){
    var k = lv<=1 ? 3 : 4, g, ns, i, desc = lv>=3;
    for(g=0; g<300; g++){ var base=rnd(2,8)*10000; ns=[]; for(i=0;i<k;i++) ns.push(base+rnd(0,9)*1000+rnd(0,99)*10); var s=ns.slice().sort(function(a,b){ return a-b; }), ok=new Set(ns).size===k; for(i=1;i<k;i++) if(s[i]-s[i-1]<100) ok=false; if(ok) break; }
    var idx=ns.map(function(_,j){ return j; }).sort(function(a,b){ return desc ? ns[b]-ns[a] : ns[a]-ns[b]; });
    var ord=function(ix){ return ix.map(function(j){ return sx(ns[j]); }).join(', '); }, D=ord(idx), cand=[], t;
    cand.push([ord(idx.slice().reverse()),'sai-thu-tu']);
    for(i=0;i<k-1;i++){ t=idx.slice(); var w=t[i]; t[i]=t[i+1]; t[i+1]=w; cand.push([ord(t),'so-sanh-hang']); }
    var m=lapMCQ(D, cand);
    return {type:'mcq', cot:1, _lv:lv, _h:ns.join(','), _desc:desc?1:0, _dung:m._dung, q:'<div>Các số trên thẻ:</div><div class="text-xl font-extrabold text-orange-600 my-2">'+ns.map(sx).join(' &nbsp; ')+'</div><div>Xếp các số theo thứ tự <b>'+(desc?'từ lớn đến bé':'từ bé đến lớn')+'</b>.</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q)) return false; var ns=q._h.split(',').map(Number), k=ns.length; if(k!==(q._lv<=1 ? 3 : 4) || new Set(ns).size!==k || q.choices.length!==4) return false;
    if(!ns.every(function(x){ return q.q.indexOf(sx(x))>=0 && x>=10000 && x<=99999; })) return false; var desc=q._lv>=3; if((q._desc===1)!==desc || q.q.indexOf(desc ? 'từ lớn đến bé' : 'từ bé đến lớn')<0) return false;
    var s=ns.slice().sort(function(a,b){ return desc ? b-a : a-b; }); return q._dung===s.map(sx).join(', '); }},

  /* D7 — Làm tròn */
  {name:'Làm tròn số', sec:'Bài 3, 4 — làm tròn đến hàng nghìn, hàng chục nghìn; khoảng bao nhiêu mét', mt:['MT3'], levels:3,
   muc:['Làm tròn đến hàng nghìn.', 'Làm tròn đến hàng chục nghìn.', 'Số sát nửa: «khoảng» bao nhiêu mét.'],
   make:function(lv){
    var b = lv<=1 ? 1000 : (lv===2 ? 10000 : pick([1000,10000])), n = lv<=2 ? nTheo(b, rnd(1,2)) : nTheo(b, 3), ans=tron(n,b), q;
    if(lv<=2) q='<div>Làm tròn số sau đến <b>'+TEN[b]+'</b>:</div>'+bieuThucTo(sx(n));
    else q='<div>Vườn hoa lan cách tổ ong <b>'+sx(n)+'</b> m.</div><div>Làm tròn đến <b>'+TEN[b]+'</b>, vườn đó cách tổ khoảng bao nhiêu mét?</div>';
    return {type:'num', _lv:lv, _n:n, _b:b, q:q, ans:ans, sai:nhanSai(saiTron(n,b), ans), goiY:gy()};
  }, check:function(q){ var n=q._n, b=q._b; if(n<1000 || n>99999 || (b!==1000 && b!==10000) || q.ans!==tron(n,b) || q.q.indexOf(q._lv<=2 ? '>'+sx(n)+'<' : '<b>'+sx(n)+'</b>')<0 || q.q.indexOf(TEN[b])<0 || n%b===0) return false;
    var h=Math.floor(n/100)%10, t=Math.floor(n/1000)%10, p=Math.floor(n/10000);
    if(q._lv<=1) return b===1000; if(q._lv===2) return b===10000; return b===1000 ? (h>=5 && t===9) : (t===5 || (p===9 && t>=5)); }},

  /* D8 — Phân tích số */
  {name:'Phân tích số', sec:'Bài 3, 4 — 54 766 = 50 000 + 4 000 + 700 + 60 + 6; số có chữ số 0', mt:['MT3'], levels:3,
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

  /* D9 — Đúng hay sai */
  {name:'Đúng hay sai', sec:'Dạng thêm (không có trong SGK) — câu so sánh số', mt:['MT2'], levels:3,
   muc:['Một câu so sánh hai số.', 'So sánh một số với tổng các hàng.', 'Ba câu, chọn câu đúng.'],
   make:function(lv){
    if(lv<=1){
     var p=capSo(rnd(1,2)), dd=dau(p[0],p[1]), op = Math.random()<0.5 ? dd : nguocDau(dd), ok = op===dd;
     return {type:'mcq', cot:2, _lv:1, _st:JSON.stringify([p[0],op,p[1]]), _dung:ok?'Đúng':'Sai', q:'<div>Bé xem câu sau đúng hay sai:</div>'+bieuThucTo(cauSS(p[0],op,p[1])), choices:['Đúng','Sai'], correct:ok?0:1, sai:(ok?{'1':'so-sanh-hang'}:{'0':'so-sanh-hang'}), goiY:gy()};
    }
    if(lv===2){
     var g, n, ps, tong, a; for(g=0; g<300; g++){ n=rnd(10000,99999); ps=tachNam(n); tong=tongArr(ps); a=tong+pick([-1000,-100,-10,10,100,1000]); if(ps.length>=3 && a>=10000 && a<=99999) break; }
     var d2=dau(a,tong), op2 = Math.random()<0.5 ? d2 : nguocDau(d2), ok2 = op2===d2, ve=sx(a)+' '+op2+' '+ps.map(sx).join(' + ');
     return {type:'mcq', cot:2, _lv:2, _st:JSON.stringify([a,ps,op2]), _dung:ok2?'Đúng':'Sai', q:'<div>Bé xem câu sau đúng hay sai:</div><div class="text-xl font-extrabold text-orange-600 my-2">'+ve+'</div>', choices:['Đúng','Sai'], correct:ok2?0:1, sai:(ok2?{'1':'nham-bang'}:{'0':'nham-bang'}), goiY:gy()};
    }
    var ss=[], seen={}, i, t, p2;
    for(i=0;i<3;i++){ do { p2=capSo(rnd(1,2)); t=p2[0]+','+p2[1]; } while(seen[t] || seen[p2[1]+','+p2[0]]); seen[t]=1; ss.push(i===0 ? [p2[0],dau(p2[0],p2[1]),p2[1]] : [p2[0],nguocDau(dau(p2[0],p2[1])),p2[1]]); }
    var txt=ss.map(function(s){ return cauSS(s[0],s[1],s[2]); }), D=txt[0], ord=shuffle(txt.slice()), sai={};
    ord.forEach(function(c,j){ if(c!==D) sai[String(j)]='so-sanh-hang'; });
    return {type:'mcq', cot:1, _lv:3, _st:JSON.stringify(ss), _dung:D, q:'<div>Có đúng một câu <b>đúng</b>. Bé chọn câu đúng nhé!</div>', choices:ord, correct:ord.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q)) return false; var st=JSON.parse(q._st), tr=function(s){ return dau(s[0],s[2])===s[1]; };
    if(q._lv<=1){ if(q.choices.length!==2 || q.q.indexOf(cauSS(st[0],st[1],st[2]))<0 || st[0]===st[2]) return false; return (q._dung==='Đúng')===tr(st); }
    if(q._lv===2){ var a=st[0], ps=st[1], op=st[2], tg=tongArr(ps); if(ps.length<3 || q.choices.length!==2 || a===tg || a<10000 || a>99999 || q.q.indexOf(sx(a)+' '+op+' '+ps.map(sx).join(' + '))<0) return false; return (q._dung==='Đúng')===(dau(a,tg)===op); }
    if(st.length!==3 || q.choices.length!==3) return false; var oks=st.filter(tr); if(oks.length!==1) return false;
    return q._dung===cauSS(oks[0][0],oks[0][1],oks[0][2]) && st.every(function(s){ return q.choices.indexOf(cauSS(s[0],s[1],s[2]))>=0 && s[0]!==s[2]; }); }},

  /* D10 — Bạn An viết số */
  {name:'Bạn An viết số', sec:'Dạng thêm (không có trong SGK) — bạn An đọc số rồi viết số, bé nhận xét', mt:['MT1'], levels:3,
   muc:['An viết số, em đồng ý không?', 'An viết sai ở đâu?', 'An viết sai, số đúng là số nào?'],
   make:function(lv){
    var an=nguoi('boy','Bạn An'), n=soNam(rnd(1,2)), d=String(n).split(''), g, e, x, loai, i, j, tmp;
    var swap=function(){ for(g=0; g<100; g++){ i=rnd(0,4); j=rnd(0,4); if(i===j || d[i]===d[j] || d[i]==='0' || d[j]==='0') continue; e=d.slice(); tmp=e[i]; e[i]=e[j]; e[j]=tmp; return +e.join(''); } return null; };
    if(lv<=1){
     var ok=Math.random()<0.5; x = ok ? n : (Math.random()<0.5 ? boKhong(n) : swap()); if(x===null || x===n && !ok) x=boKhong(n); ok = x===n;
     return {type:'mcq', cot:2, _lv:1, _n:n, _x:x, _dung:ok?'Đồng ý':'Không đồng ý', q:an+'<div>Bạn An đọc «'+docSo5(n)+'» và viết:</div>'+bieuThucTo(sx(x))+'<div>Em có đồng ý với bạn An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:ok?0:1, sai:(ok?{'1':'bo-so-0'}:{'0':'bo-so-0'}), goiY:gy()};
    }
    var sw=swap(), bo = sw===null || Math.random()<0.5; x = bo ? boKhong(n) : sw;
    if(lv===2){
     var CH2=['An bỏ sót chữ số 0','An đổi chỗ hai chữ số','An viết thừa chữ số 0','An viết đúng rồi'], D=bo ? CH2[0] : CH2[1], ch=shuffle(CH2.slice()), sai={}; ch.forEach(function(c,k){ if(c!==D) sai[String(k)]='doc-sai-hang'; });
     return {type:'mcq', cot:2, _lv:2, _n:n, _x:x, _dung:D, q:an+'<div>Bạn An đọc «'+docSo5(n)+'» và viết:</div>'+bieuThucTo(sx(x))+'<div>An viết sai rồi! An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()};
    }
    var cand=[[sx(x), bo ? 'bo-so-0' : 'doc-sai-hang']].concat(gan5(n).map(function(p){ return [sx(p[0]), p[1]]; })), m=lapMCQ(sx(n), cand);
    return {type:'mcq', cot:2, _lv:3, _n:n, _x:x, _dung:m._dung, q:an+'<div>Bạn An đọc «'+docSo5(n)+'» và viết:</div>'+bieuThucTo(sx(x))+'<div>An viết sai. Số <b>đúng</b> là số nào?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var n=q._n, x=q._x; if(!kiemMCQ(q) || n<10000 || n>99999 || demKhong(n)<1 || q.q.indexOf(docSo5(n))<0 || q.q.indexOf('>'+sx(x)+'<')<0) return false;
    var srt=function(v){ return String(v).split('').sort().join(''); };
    if(q._lv<=1){ return q.choices.length===2 && (q._dung==='Đồng ý')===(x===n); }
    if(x===n) return false; var bo = x===boKhong(n) && String(x).length<5, hoan = String(x).length===5 && srt(x)===srt(n);
    if(!(bo || hoan)) return false; if(q._lv===2) return q.choices.length===4 && q._dung===(bo ? 'An bỏ sót chữ số 0' : 'An đổi chỗ hai chữ số'); return q.choices.length===4 && q._dung===sx(n); }}
 ]
};
