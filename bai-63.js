/* bai-63.js — Bài 63: Phép cộng trong phạm vi 100 000 (Tập 2, Chủ đề 12). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-63.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mẫu bài 54 mở rộng lên năm chữ số): congDoc (phép cộng cột dọc, có ô ? ở tổng hoặc số hạng), soDoHon (sơ đồ «nhiều hơn»).
   Mọi tổng <= 99 999 (nhẩm: 50 000 + 50 000 = 100 000). check() đọc lại hình từ chuỗi SVG (data-pt, data-so) và tính lại; chữ số bị che có đáp án duy nhất (giải bằng vét cạn).
   QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

var NB=' ';
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

function docPT(s){ var o={}, re=/data-pt="(\w+)"[^>]*>([^<]*)<\/text>/g, m; while((m=re.exec(String(s)))) o[m[1]]=m[2]; return o; }
function soNhoCong(a, b){ var c=0, k=0, i, t; for(i=0;i<5;i++){ t=cotSo(a,i)+cotSo(b,i)+c; c = t>=10 ? 1 : 0; k+=c; } return k; }
function tongKhongNho(a, b){ var r=0, i; for(i=4;i>=0;i--) r=r*10+(cotSo(a,i)+cotSo(b,i))%10; return r; }
/* nhớ sang cách một hàng (nhớ nhầm hàng): số nhớ của hàng i cộng vào hàng i + 2 */
function tongNhoSai(a, b){ var c=[0,0,0,0,0], cin=0, i, t, r=0, d=[];
 for(i=0;i<5;i++){ t=cotSo(a,i)+cotSo(b,i)+cin; c[i]=t>=10 ? 1 : 0; cin=c[i]; }
 for(i=0;i<5;i++){ t=cotSo(a,i)+cotSo(b,i)+(i>=2 ? c[i-2] : 0); d.push(t%10); }
 for(i=4;i>=0;i--) r=r*10+d[i]; return r; }
/* các chữ số của phép cộng cột dọc; tuy.an = 'tong' (ô rộng) hoặc chỉ số hàng của tổng; tuy.hide = danh sách id bị che */
function chuSoCong(a, b, tuy){
 tuy=tuy||{}; var X=[34,72,110,148,186], it=[], da=String(a), db=String(b), t=a+b, dt=String(t), hide=tuy.hide||[], i, id;
 for(i=0;i<da.length;i++){ id='a'+(da.length-1-i); it.push({id:id, x:X[5-da.length+i], y:52, ch: hide.indexOf(id)>=0 ? '?' : da.charAt(i)}); }
 for(i=0;i<db.length;i++){ id='b'+(db.length-1-i); it.push({id:id, x:X[5-db.length+i], y:100, ch: hide.indexOf(id)>=0 ? '?' : db.charAt(i)}); }
 if(tuy.an==='tong') it.push({id:'p', x:117, y:160, ch:'?', rong:true});
 else for(i=0;i<dt.length;i++){ var pidx=dt.length-1-i; id='p'+pidx; it.push({id:id, x:X[5-dt.length+i], y:160, ch:(tuy.an===pidx || hide.indexOf(id)>=0) ? '?' : dt.charAt(i)}); }
 return it;
}
function congDoc(a, b, tuy){
 var it=chuSoCong(a,b,tuy), s=svgX(220,178,220);
 it.forEach(function(e){
  if(e.ch==='?' && e.rong) s+='<rect x="22" y="126" width="190" height="46" rx="8" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
  else if(e.ch==='?') s+='<rect x="'+(e.x-17)+'" y="'+(e.y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
  s+='<text data-pt="'+e.id+'" x="'+e.x+'" y="'+e.y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(e.ch==='?' ? HM.hoi : 'currentColor')+'">'+e.ch+'</text>';
 });
 s+='<text x="10" y="100" text-anchor="middle" font-size="28" '+HFONT+' fill="currentColor">+</text><line x1="20" y1="114" x2="212" y2="114" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
 return khungHinh(s);
}
function kiemCongDoc(q){ var p=q._pt, it=chuSoCong(p.a,p.b,p), d=docPT(q.q), want={}; it.forEach(function(e){ want[e.id]=e.ch; }); var ids=Object.keys(want);
 return p.a>=10 && p.b>=10 && p.a+p.b<=99999 && ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; }); }
/* cặp số có đúng k lần nhớ, la chữ số a, lb chữ số b, tổng <= 99 999 */
function capCong(la, lb, k, minTong){
 for(var g=0; g<6000; g++){
  var a=rnd(Math.pow(10,la-1), Math.pow(10,la)-1), b=rnd(Math.pow(10,lb-1), Math.pow(10,lb)-1);
  if(a+b>99999 || a+b<(minTong||0) || soNhoCong(a,b)!==k) continue; return {a:a, b:b};
 }
 return {a:25746, b:38519};
}
/* đọc phép cộng cột dọc từ hình: {A:[chữ số từ cao đến thấp], B:[...], T:[...]} (ký tự '?' nếu bị che) */
function docPhep(html){
 var d=docPT(html), A=[], B=[], T=[], i;
 for(i=4;i>=0;i--){ if(('a'+i) in d) A.push(d['a'+i]); if(('b'+i) in d) B.push(d['b'+i]); if(('p'+i) in d) T.push(d['p'+i]); }
 return {A:A, B:B, T:T};
}
/* số cách điền các ô ? sao cho phép cộng đúng (chữ số đầu khác 0); trả về {n, hoi:[chữ số của cách điền đầu tiên]} */
function giaiPhep(ph){
 var pos=[], ar=[ph.A,ph.B,ph.T], r, i, nghiem=[], tong=0, g;
 ar.forEach(function(row,ri){ row.forEach(function(c,ci){ if(c==='?') pos.push([ri,ci]); }); });
 var tot=Math.pow(10,pos.length);
 for(g=0; g<tot; g++){
  var cp=[ph.A.slice(), ph.B.slice(), ph.T.slice()], x=g, ds=[];
  for(i=0;i<pos.length;i++){ var dg=x%10; x=Math.floor(x/10); cp[pos[i][0]][pos[i][1]]=String(dg); ds.push(dg); }
  if(cp.some(function(row){ return row[0]==='0'; })) continue;
  if(+cp[0].join('')+ +cp[1].join('')===+cp[2].join('')) nghiem.push(ds);
 }
 return {n:nghiem.length, ds:nghiem[0]||[], pos:pos.length};
}
var CAUHANG=['sách','vở','bút chì','hộp bút'];
function soDoHon(ten1, a, ten2, d, dv){
 var s=svgX(300,132,300).replace('<svg ','<svg data-so="'+a+','+d+'" ');
 s+='<text x="10" y="16" font-size="14" '+HFONT+' fill="currentColor">'+ten1+'</text><rect x="10" y="22" width="130" height="28" rx="6" fill="'+HM.troi+'"/><text x="75" y="42" text-anchor="middle" font-size="16" '+HFONT+' fill="'+HM.chu+'">'+sx(a)+' '+dv+'</text>';
 s+='<text x="10" y="74" font-size="14" '+HFONT+' fill="currentColor">'+ten2+'</text><rect x="10" y="80" width="130" height="28" rx="6" fill="'+HM.troi+'"/><rect x="140" y="80" width="130" height="28" rx="6" fill="'+HM.cam+'"/><text x="75" y="100" text-anchor="middle" font-size="16" '+HFONT+' fill="'+HM.chu+'">?</text><text x="205" y="100" text-anchor="middle" font-size="16" '+HFONT+' fill="'+HM.chu+'">'+sx(d)+' '+dv+'</text>';
 s+='<text x="205" y="126" text-anchor="middle" font-size="14" '+HFONT+' fill="currentColor">nhiều hơn</text>';
 return s;
}
function docSoDo(html){ var m=/data-so="(\d+),(\d+)"/.exec(html); return m ? {a:+m[1], d:+m[2]} : null; }
var GOI={'quen-nho':'Cộng ở một hàng được từ 10 trở lên thì viết chữ số đơn vị, NHỚ 1 sang hàng bên trái.',
  'nho-sai-hang':'Số nhớ cộng vào hàng liền bên trái, không nhảy cách một hàng.',
  'dat-lech-hang':'Đặt tính thì các chữ số cùng hàng thẳng cột: đơn vị với đơn vị, chục với chục, trăm với trăm.',
  'nham-hang':'Nhẩm theo nghìn hoặc theo chục nghìn rồi viết đủ chữ số 0: 6 nghìn + 5 nghìn = 11 nghìn = 11 000.',
  'thieu-buoc':'Bài này có nhiều bước. Bé làm đủ các bước nhé!',
  'nham-bang':'Bé cộng lại từng bước cho đúng nhé.'};
function gy(){ var o={}, k; for(k in GOI) o[k]=GOI[k]; return o; }
var TEN_LOI={'quen-nho':'Quên nhớ khi cộng', 'nho-sai-hang':'Nhớ nhầm sang hàng cách một hàng', 'dat-lech-hang':'Đặt tính lệch hàng'};

var BAI = {
 n: 63,
 title: 'Phép Cộng Trong Phạm Vi 100 000',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-nho':'Quên nhớ', 'nho-sai-hang':'Nhớ nhầm hàng', 'dat-lech-hang':'Đặt tính lệch hàng', 'nham-hang':'Nhầm hàng khi nhẩm số tròn', 'thieu-buoc':'Thiếu một bước', 'nham-bang':'Cộng sai'},
 muctieu: [
  {id:'MT1', ten:'Cộng có nhớ (đặt tính)', muc:['Hai số năm chữ số, nhớ một lần: điền một chữ số của tổng.', 'Nhớ nhiều lần: điền cả tổng; số năm chữ số cộng số ba chữ số hoặc hai chữ số.', 'Số bốn chữ số cộng số năm chữ số; chọn kết quả; bạn An quên nhớ hoặc nhớ nhầm hàng.']},
  {id:'MT2', ten:'Nhẩm số tròn nghìn, tròn chục nghìn', muc:['6 000 + 5 000; 30 000 + 50 000; 25 000 + 4 000.', '9 000 + 4 000; 40 000 + 20 000; 49 000 + 2 000.', '7 000 + 9 000; 50 000 + 50 000 = 100 000; 55 000 + 5 000.']},
  {id:'MT3', ten:'Toán đố, chữ số bị che', muc:['Cửa hàng nhập hai lần; hồ cá ba sa (lần hai nhiều hơn); chữ số che ở tổng.', 'Biểu thức ba số hạng tròn nghìn; cả hai lần; chữ số che ở số hạng.', 'Ba lần nhập không tròn nghìn; số lớn; hai chữ số bị che, đáp án duy nhất.']}
 ],
 topics: [
  /* D1 — Đặt tính cộng, điền một chữ số */
  {name:'Đặt tính cộng, điền một chữ số', sec:'Khám phá, bài 1 — 12 547 + 23 628 = 36 175; 67 294 + 25 431 = 92 725: điền chữ số ở ô ?', mt:['MT1'], levels:3,
   muc:['Nhớ một lần: điền một chữ số của tổng.', 'Nhớ hai lần: điền một chữ số của tổng.', 'Nhớ ba lần: điền một chữ số của tổng.'],
   make:function(lv){
    var k=lv, p=capCong(5,5,k), t=String(p.a+p.b), pos=[], i;
    for(i=0;i<t.length;i++) if(t.charAt(i)!=='0') pos.push(t.length-1-i);
    var an=pick(pos), ans=cotSo(p.a+p.b, an);
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an}, q:congDoc(p.a,p.b,{an:an})+'<div>Chữ số ở ô <b class="text-amber-700">?</b> của tổng là mấy?</div>', ans:ans, sai:nhanSai([[ans+1,'nho-sai-hang'],[ans-1,'quen-nho'],[(cotSo(p.a,an)+cotSo(p.b,an))%10,'quen-nho'],[ans+2,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemCongDoc(q) || p.a<10000 || p.b<10000) return false; var t=p.a+p.b; return soNhoCong(p.a,p.b)===q._lv && q.ans===cotSo(t,p.an) && q.ans>0; }},

  /* D2 — Đặt tính cộng, điền tổng */
  {name:'Đặt tính cộng, điền tổng', sec:'Bài 1 — 93 246 + 4 825 = 98 071; 43 835 + 55 807 = 99 642; 25 346 + 37 292 = 62 638', mt:['MT1'], levels:3,
   muc:['Hai số năm chữ số, nhớ một lần: tìm tổng.', 'Nhớ hai lần: tìm tổng.', 'Nhớ ba hoặc bốn lần: tìm tổng.'],
   make:function(lv){
    var p=capCong(5,5,lv<=2 ? lv : pick([3,4])), t=p.a+p.b;
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'tong'}, q:congDoc(p.a,p.b,{an:'tong'})+'<div>Tính tổng của hai số.</div>', ans:t, sai:nhanSai([[tongKhongNho(p.a,p.b),'quen-nho'],[tongNhoSai(p.a,p.b),'nho-sai-hang'],[t+10,'nham-bang'],[t-100,'nham-bang'],[t+1000,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemCongDoc(q) || p.a<10000 || p.b<10000) return false; var k=soNhoCong(p.a,p.b); return (q._lv<=2 ? k===q._lv : k>=3) && q.ans===p.a+p.b; }},

  /* D3 — Hai số khác số chữ số */
  {name:'Hai số khác số chữ số', sec:'Bài 1 — 86 362 + 918 = 87 280; 67 254 + 92 = 67 346; 7 528 + 5 345 = 12 873 (đặt thẳng hàng)', mt:['MT1'], levels:3,
   muc:['Số năm chữ số cộng số ba chữ số (86 362 + 918).', 'Số năm chữ số cộng số hai chữ số (67 254 + 92).', 'Số bốn chữ số cộng số năm chữ số (7 528 + 45 345).'],
   make:function(lv){
    var p = lv<=1 ? capCong(5,3,pick([1,2,3])) : (lv===2 ? capCong(5,2,pick([1,2,3])) : capCong(4,5,pick([1,2,3]))), t=p.a+p.b;
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'tong'}, q:congDoc(p.a,p.b,{an:'tong'})+'<div>Đặt tính rồi tính tổng của hai số.</div>', ans:t, sai:nhanSai([[p.a+p.b*10,'dat-lech-hang'],[tongKhongNho(p.a,p.b),'quen-nho'],[t+10,'nham-bang'],[t-100,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemCongDoc(q)) return false; var t=p.a+p.b; if(q.ans!==t || soNhoCong(p.a,p.b)<1) return false;
    if(q._lv<=1) return p.a>=10000 && p.b>=100 && p.b<1000; if(q._lv===2) return p.a>=10000 && p.b>=10 && p.b<100; return p.a>=1000 && p.a<10000 && p.b>=10000; }},

  /* D4 — Nhẩm tròn nghìn */
  {name:'Nhẩm tròn nghìn', sec:'Bài 2 — 6 nghìn + 5 nghìn = 11 nghìn: 6 000 + 5 000 = 11 000', mt:['MT2'], levels:3,
   muc:['Tổng 10 nghìn đến 12 nghìn (6 000 + 5 000).', 'Tổng 13 nghìn đến 15 nghìn (9 000 + 4 000).', 'Tổng 16 nghìn đến 18 nghìn (7 000 + 9 000).'],
   make:function(lv){
    var lo = lv<=1 ? 10 : (lv===2 ? 13 : 16), hi = lv<=1 ? 12 : (lv===2 ? 15 : 18), a, b, g;
    for(g=0; g<500; g++){ a=rnd(2,9); b=rnd(2,9); if(a+b>=lo && a+b<=hi) break; }
    var ans=(a+b)*1000;
    return {type:'num', _lv:lv, _a:a*1000, _b:b*1000, q:'<div>Tính nhẩm ('+a+' nghìn + '+b+' nghìn = ? nghìn):</div>'+bieuThucTo(sx(a*1000)+' + '+sx(b*1000)+' = ?'), ans:ans, sai:nhanSai([[a+b,'nham-hang'],[(a+b)*100,'nham-hang'],[ans+1000,'nham-bang'],[ans-1000,'nham-bang'],[(a+b)*10000,'nham-hang'],[(a+b-10)*1000,'quen-nho']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%1000!==0 || b%1000!==0 || a<2000 || b<2000 || a>9000 || b>9000 || q.ans!==a+b) return false; var s=(a+b)/1000; if(q._lv<=1) return s>=10 && s<=12; if(q._lv===2) return s>=13 && s<=15; return s>=16 && s<=18; }},

  /* D5 — Nhẩm tròn chục nghìn */
  {name:'Nhẩm tròn chục nghìn', sec:'Bài 2 — 3 chục nghìn + 5 chục nghìn = 8 chục nghìn: 30 000 + 50 000 = 80 000; 50 000 + 50 000 = 100 000', mt:['MT2'], levels:3,
   muc:['Tổng 4 đến 5 chục nghìn (10 000 + 30 000).', 'Tổng 6 đến 9 chục nghìn (40 000 + 20 000).', 'Tổng 10 chục nghìn (50 000 + 50 000 = 100 000).'],
   make:function(lv){
    var a, b, g;
    if(lv<=1){ for(g=0; g<300; g++){ a=rnd(1,4); b=rnd(1,4); if(a+b>=4 && a+b<=5) break; } }
    else if(lv===2){ for(g=0; g<300; g++){ a=rnd(1,8); b=rnd(1,8); if(a+b>=6 && a+b<=9) break; } }
    else { a=rnd(1,9); b=10-a; }
    var ans=(a+b)*10000;
    return {type:'num', _lv:lv, _a:a*10000, _b:b*10000, q:'<div>Tính nhẩm ('+a+' chục nghìn + '+b+' chục nghìn = ? chục nghìn):</div>'+bieuThucTo(sx(a*10000)+' + '+sx(b*10000)+' = ?'), ans:ans, sai:nhanSai([[a+b,'nham-hang'],[(a+b)*1000,'nham-hang'],[ans+10000,'nham-bang'],[ans-10000,'nham-bang'],[(a+b)*100,'nham-hang']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%10000!==0 || b%10000!==0 || a<10000 || b<10000 || q.ans!==a+b) return false; var s=(a+b)/10000; if(q._lv<=1) return s>=4 && s<=5; if(q._lv===2) return s>=6 && s<=9; return s===10; }},

  /* D6 — Nhẩm nghìn cộng chục nghìn */
  {name:'Nhẩm nghìn cộng số tròn nghìn', sec:'Bài 2 — 25 000 + 4 000 = 29 000; 49 000 + 2 000 = 51 000; 55 000 + 5 000 = 60 000', mt:['MT2'], levels:3,
   muc:['Không nhớ sang hàng chục nghìn (25 000 + 4 000).', 'Nhớ sang hàng chục nghìn (49 000 + 2 000).', 'Tổng tròn chục nghìn (55 000 + 5 000).'],
   make:function(lv){
    var k, t, b, g, a;
    if(lv<=1){ for(g=0; g<300; g++){ k=rnd(1,8); t=rnd(1,8); b=rnd(1,9-t); if(t+b<=9) break; } }
    else if(lv===2){ for(g=0; g<300; g++){ k=rnd(1,8); t=rnd(6,9); b=rnd(10-t+1,9); if(t+b>=11) break; } }
    else { k=rnd(1,8); t=rnd(1,9); b=10-t; }
    a=k*10000+t*1000; b=b*1000; var ans=a+b;
    return {type:'num', _lv:lv, _a:a, _b:b, q:'<div>Tính nhẩm:</div>'+bieuThucTo(sx(a)+' + '+sx(b)+' = ?'), ans:ans, sai:nhanSai([[ans+1000,'nham-bang'],[ans-1000,'nham-bang'],[ans+10000,'nham-hang'],[ans-10000,'nham-hang'],[a+b/10,'nham-hang']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%1000!==0 || b%1000!==0 || a<10000 || b<1000 || b>9000 || a>89000 || q.ans!==a+b) return false; var t=(a/1000)%10, bb=b/1000;
    if(q._lv<=1) return t+bb<=9; if(q._lv===2) return t>=6 && t+bb>=11 && a%10000!==0; return t+bb===10 && t>=1; }},

  /* D7 — Biểu thức và cửa hàng nhập */
  {name:'Cửa hàng nhập hàng', sec:'Bài 3, 4 — 35 000 + 27 000 + 13 000 = 75 000; 6 500 + 3 860 + 8 500 = 18 860 cuốn', mt:['MT3'], levels:3,
   muc:['Cửa hàng nhập hai lần.', 'Biểu thức ba số hạng tròn nghìn.', 'Cửa hàng nhập ba lần, số không tròn nghìn.'],
   make:function(lv){
    var h=pick(CAUHANG), a, b, c, ans, q, sai;
    if(lv<=1){ do { a=rnd(30,300)*100; b=rnd(30,300)*100; } while(a+b>99900 || a%1000===0 || b%1000===0 || a+b<10000);
     ans=a+b; q='<div>Một cửa hàng nhập '+h+': lần đầu <b>'+sx(a)+'</b>, lần sau <b>'+sx(b)+'</b>.</div><div>Cả hai lần cửa hàng nhập bao nhiêu '+(h==='hộp bút' ? 'hộp bút' : (h==='bút chì' ? 'cái bút chì' : (h==='vở' ? 'quyển vở' : 'cuốn sách')))+'?</div>'; sai=[[a,'thieu-buoc'],[b,'thieu-buoc'],[ans+100,'nham-bang'],[ans-1000,'nham-bang'],[ans+1000,'nham-bang']]; c=0; }
    else if(lv===2){ do { a=rnd(5,45)*1000; b=rnd(5,45)*1000; c=rnd(5,45)*1000; } while(a+b+c>99000 || a+b+c<40000);
     ans=a+b+c; q='<div>Tính giá trị của biểu thức:</div>'+bieuThucTo(sx(a)+' + '+sx(b)+' + '+sx(c)); sai=[[a+b,'thieu-buoc'],[b+c,'thieu-buoc'],[ans+1000,'nham-bang'],[ans-1000,'nham-bang'],[ans+10000,'nham-bang']]; }
    else { do { a=rnd(40,300)*50; b=rnd(100,400)*10; c=rnd(40,300)*50; } while(a+b+c>99000 || a+b+c<10000 || b%100===0);
     ans=a+b+c; q='<div>Một cửa hàng nhập '+h+' ba lần: lần đầu <b>'+sx(a)+'</b>, lần hai <b>'+sx(b)+'</b>, lần ba <b>'+sx(c)+'</b>.</div><div>Cả ba lần cửa hàng nhập bao nhiêu '+(h==='hộp bút' ? 'hộp bút' : (h==='bút chì' ? 'cái bút chì' : (h==='vở' ? 'quyển vở' : 'cuốn sách')))+'?</div>'; sai=[[a+b,'thieu-buoc'],[b+c,'thieu-buoc'],[ans+10,'nham-bang'],[ans-100,'nham-bang'],[ans+1000,'nham-bang']]; }
    return {type:'num', _lv:lv, _h:h, _a:a, _b:b, _c:c, q:q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, c=q._c; if(q.q.indexOf(sx(a))<0 || q.q.indexOf(sx(b))<0) return false;
    if(q._lv<=1) return c===0 && q.ans===a+b && a+b<=99999 && a+b>=10000 && q.q.indexOf('<b>'+sx(a)+'</b>')>=0 && q.q.indexOf('<b>'+sx(b)+'</b>')>=0;
    if(q.q.indexOf(sx(c))<0 || q.ans!==a+b+c || a+b+c>99999) return false;
    if(q._lv===2) return a%1000===0 && b%1000===0 && c%1000===0 && q.q.indexOf(sx(a)+' + '+sx(b)+' + '+sx(c))>=0; return b%100!==0 && q.q.indexOf('<b>'+sx(c)+'</b>')>=0; }},

  /* D8 — Hồ cá ba sa (hai bước) */
  {name:'Hồ cá ba sa', sec:'Bài 5 — hồ cá ba sa: lần đầu thả 10 800 con, lần hai nhiều hơn 950 con: cả hai lần 22 550 con', mt:['MT3'], levels:3,
   muc:['Lần hai nhiều hơn: tìm số cá lần hai.', 'Cả hai lần thả bao nhiêu con cá.', 'Cả hai lần với số lớn.'],
   make:function(lv){
    var a, d, g;
    if(lv<=2){ a=rnd(200,600)*50; d=rnd(5,40)*50; } else { for(g=0; g<500; g++){ a=rnd(500,900)*50; d=rnd(100,400)*50; if(2*a+d<=99900 && 2*a+d>=60000) break; } }
    var b=a+d, ans = lv<=1 ? b : a+b, hoi = lv<=1 ? 'Lần thứ hai người ta thả bao nhiêu con cá?' : 'Cả hai lần người ta thả bao nhiêu con cá?';
    return {type:'num', _lv:lv, q:khungHinh(soDoHon('Lần thứ nhất',a,'Lần thứ hai',d,'con').replace(/<\/svg>$/,''))+'<div>Lần thứ nhất người ta thả <b>'+sx(a)+' con</b> cá ba sa giống vào hồ. Lần thứ hai thả nhiều hơn lần thứ nhất <b>'+sx(d)+' con</b>. '+hoi+'</div>', ans:ans, sai:nhanSai([[lv<=1 ? a : b,'thieu-buoc'],[a+d+d,'thieu-buoc'],[ans+10,'nham-bang'],[ans-100,'nham-bang'],[ans+1000,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var t=docSoDo(q.q); if(!t || q.q.indexOf('<b>'+sx(t.a)+' con</b>')<0 || q.q.indexOf('<b>'+sx(t.d)+' con</b>')<0) return false; var b=t.a+t.d, e = q._lv<=1 ? b : t.a+b; if(q.ans!==e || e>99999) return false;
    if(q._lv<=1) return q.q.indexOf('Lần thứ hai người ta thả')>=0 && t.a>=10000; return q.q.indexOf('Cả hai lần')>=0 && t.a>=10000 && (q._lv===2 || e>=60000); }},

  /* D9 — Chữ số bị che */
  {name:'Chữ số bị che', sec:'Bài 6 — tìm chữ số bị che trong phép cộng cột dọc', mt:['MT3'], levels:3,
   muc:['Một ô ? ở tổng.', 'Một ô ? ở số hạng.', 'Hai ô ?, chỉ có một cách điền đúng.'],
   make:function(lv){
    var g, p, ids, hide, ans, it, i;
    for(g=0; g<3000; g++){
     p=capCong(5,5,rnd(1,4)); var t=p.a+p.b, dt=String(t), ia=[], ib=[], ip=[];
     for(i=0;i<5;i++){ if(cotSo(p.a,i)>0) ia.push('a'+i); if(cotSo(p.b,i)>0) ib.push('b'+i); }
     for(i=0;i<dt.length;i++) if(dt.charAt(dt.length-1-i)!=='0') ip.push('p'+i);
     if(lv<=1) hide=[pick(ip)]; else if(lv===2) hide=[pick(ia.concat(ib))]; else { hide=shuffle(ia.concat(ib,ip)).slice(0,2); }
     var val=function(id){ var r=id.charAt(0), k=+id.slice(1); return r==='a' ? cotSo(p.a,k) : (r==='b' ? cotSo(p.b,k) : cotSo(t,k)); };
     ans = hide.reduce(function(s,id){ return s+val(id); }, 0);
     if(ans<=0) continue;
     var ph=docPhep(congDoc(p.a,p.b,{hide:hide})), gp=giaiPhep(ph); if(gp.n===1) break;
    }
    var hoi = lv<=2 ? 'Chữ số ở ô <b class="text-amber-700">?</b> là mấy?' : 'Tổng của hai chữ số ở hai ô <b class="text-amber-700">?</b> là bao nhiêu?';
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,hide:hide}, q:congDoc(p.a,p.b,{hide:hide})+'<div>'+hoi+'</div>', ans:ans, sai:nhanSai([[ans+1,'nho-sai-hang'],[ans-1,'quen-nho'],[ans+2,'nham-bang'],[ans+10,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemCongDoc(q)) return false; var ph=docPhep(q.q), gp=giaiPhep(ph), hoi=q.q.split('data-pt').length-1;
    if(gp.n!==1 || gp.pos!==p.hide.length) return false; var s=gp.ds.reduce(function(x,y){ return x+y; },0); if(q.ans!==s || q.ans<=0) return false;
    if(q._lv<=1) return p.hide.length===1 && p.hide[0].charAt(0)==='p'; if(q._lv===2) return p.hide.length===1 && p.hide[0].charAt(0)!=='p'; return p.hide.length===2; }},

  /* D10 — Bạn An làm */
  {name:'Bạn An làm', sec:'Dạng thêm (không có trong SGK) — bạn An tính 25 346 + 37 292 = 52 538: em có đồng ý không, An sai ở đâu, kết quả đúng', mt:['MT1'], levels:3,
   muc:['An tính phép cộng: em có đồng ý không.', 'An tính sai: An sai ở đâu.', 'An tính sai: kết quả đúng là bao nhiêu.'],
   make:function(lv){
    var p, kind, sa, t, g;
    for(g=0; g<800; g++){ p=capCong(5,5,rnd(1,4)); t=p.a+p.b; kind=pick(['quen-nho','nho-sai-hang']); sa = kind==='quen-nho' ? tongKhongNho(p.a,p.b) : tongNhoSai(p.a,p.b); if(sa!==t && sa>=10000 && (lv<=1 || sa!==(kind==='quen-nho' ? tongNhoSai(p.a,p.b) : tongKhongNho(p.a,p.b)))) break; }
    var dung=Math.random()<0.5, an = (lv<=1 && dung) ? t : sa;
    var mo=nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+sx(p.a)+' + '+sx(p.b)+' = '+sx(an)+'</b>»'+(lv>=2 ? '. An tính sai rồi!' : '.')+'</div>';
    if(lv<=1){ var D=(an===t) ? 'Đồng ý' : 'Không đồng ý'; return {type:'mcq', cot:2, _lv:1, _a:p.a, _b:p.b, _an:an, _dung:D, q:mo+'<div>Em có đồng ý với An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:(an===t?0:1), sai:(an===t?{'1':'quen-nho'}:{'0':'quen-nho'}), goiY:gy()}; }
    if(lv===2){ var ks=['quen-nho','nho-sai-hang','dat-lech-hang'], ch=shuffle(ks.slice()).map(function(k){ return TEN_LOI[k]; }), D2=TEN_LOI[kind], sai={}; ch.forEach(function(c,i){ if(c!==D2) sai[String(i)]=ks.filter(function(k){ return TEN_LOI[k]===c; })[0]; });
      return {type:'mcq', cot:1, _lv:2, _a:p.a, _b:p.b, _an:an, _kind:kind, _dung:D2, q:mo+'<div>An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(D2), sai:sai, goiY:gy()}; }
    return {type:'num', _lv:3, _a:p.a, _b:p.b, _an:an, _kind:kind, q:mo+'<div>Kết quả đúng của phép cộng là bao nhiêu?</div>', ans:t, sai:nhanSai([[an,kind],[tongKhongNho(p.a,p.b),'quen-nho'],[t+10,'nham-bang'],[t-100,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, t=a+b, an=q._an; if(a<10000 || b<10000 || t>99999 || q.q.indexOf(sx(a)+' + '+sx(b)+' = '+sx(an))<0) return false;
    if(q._lv<=1) return kiemMCQ(q) && q.choices.length===2 && (q._dung==='Đồng ý')===(an===t) && (an===t || an===tongKhongNho(a,b) || an===tongNhoSai(a,b));
    var sa = q._kind==='quen-nho' ? tongKhongNho(a,b) : tongNhoSai(a,b); if(an!==sa || sa===t) return false; if(q._lv===2) return kiemMCQ(q) && q.choices.length===3 && q._dung===TEN_LOI[q._kind]; return q.ans===t; }}
 ]
};
