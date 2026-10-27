/* bai-64.js — Bài 64: Phép trừ trong phạm vi 100 000 (Tập 2, Chủ đề 12). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-64.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mẫu bài 55 mở rộng lên năm chữ số): truDoc (phép trừ cột dọc), soDoHieu (sơ đồ hơn kém), soDoXe (nhà máy bán xe).
   check() đọc lại hình từ chuỗi SVG (data-pt, data-so, data-xe) và tính lại; biểu thức so sánh lưu số hạng và dấu để tính lại.
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
function soMuon(a, b){ var k=0, c=0, i, t; for(i=0;i<5;i++){ t=cotSo(a,i)-c-cotSo(b,i); if(t<0){ c=1; k++; } else c=0; } return k; }
/* lấy chữ số lớn trừ chữ số bé trong từng hàng (trừ ngược) */
function truNguoc(a, b){ var r=0, i; for(i=4;i>=0;i--) r=r*10+Math.abs(cotSo(a,i)-cotSo(b,i)); return r; }
/* mượn 10 nhưng quên bớt 1 ở hàng liền bên trái */
function truQuenMuon(a, b){ var r=0, i, t; for(i=4;i>=0;i--){ t=cotSo(a,i)-cotSo(b,i); if(t<0) t+=10; r=r*10+t; } return r; }
function chuSoTru(a, b, tuy){
 tuy=tuy||{}; var X=[34,72,110,148,186], it=[], da=String(a), db=String(b), t=a-b, dt=String(t), i;
 for(i=0;i<da.length;i++) it.push({id:'a'+(da.length-1-i), x:X[5-da.length+i], y:52, ch:da.charAt(i)});
 for(i=0;i<db.length;i++) it.push({id:'b'+(db.length-1-i), x:X[5-db.length+i], y:100, ch:db.charAt(i)});
 if(tuy.an==='hieu') it.push({id:'p', x:117, y:160, ch:'?', rong:true});
 else for(i=0;i<dt.length;i++){ var pidx=dt.length-1-i; it.push({id:'p'+pidx, x:X[5-dt.length+i], y:160, ch:(tuy.an===pidx) ? '?' : dt.charAt(i)}); }
 return it;
}
function truDoc(a, b, tuy){
 var it=chuSoTru(a,b,tuy), s=svgX(220,178,220);
 it.forEach(function(e){
  if(e.ch==='?' && e.rong) s+='<rect x="22" y="126" width="190" height="46" rx="8" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
  else if(e.ch==='?') s+='<rect x="'+(e.x-17)+'" y="'+(e.y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
  s+='<text data-pt="'+e.id+'" x="'+e.x+'" y="'+e.y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(e.ch==='?' ? HM.hoi : 'currentColor')+'">'+e.ch+'</text>';
 });
 s+='<text x="10" y="100" text-anchor="middle" font-size="30" '+HFONT+' fill="currentColor">&#8722;</text><line x1="20" y1="114" x2="212" y2="114" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
 return khungHinh(s);
}
function kiemTruDoc(q){ var p=q._pt, it=chuSoTru(p.a,p.b,p), d=docPT(q.q), want={}; it.forEach(function(e){ want[e.id]=e.ch; }); var ids=Object.keys(want);
 return p.a>=100 && p.a<=99999 && p.b>=10 && p.b<p.a && ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; }); }
/* cặp số a (la chữ số) trừ b (lb chữ số), số lần mượn thuộc ks; co0: a có chữ số 0 (không ở đầu) */
function capTru(la, lb, ks, co0){
 for(var g=0; g<8000; g++){
  var a=rnd(Math.pow(10,la-1), Math.pow(10,la)-1), b=rnd(Math.pow(10,lb-1), Math.pow(10,lb)-1);
  if(b>=a || a-b<1) continue; if(ks.indexOf(soMuon(a,b))<0) continue; if(co0 && String(a).slice(1).indexOf('0')<0) continue; return {a:a, b:b};
 }
 return {a:52746, b:29381};
}
function capHieu(f){ var p, g; for(g=0; g<300; g++){ p=f(); if(p.a-p.b>=0.15*p.a) return p; } return p; }
/* sơ đồ «hơn kém»: hai thanh, thanh dài hơn có phần chênh (ô ?) */
function soDoHieu(ten1, a, ten2, b, dv){
 var W=220, w2=Math.max(50, Math.round(W*b/a)), s=svgX(300,132,300).replace('<svg ','<svg data-so="'+a+','+b+'" ');
 s+='<text x="10" y="16" font-size="15" '+HFONT+' fill="currentColor">'+ten1+': '+sx(a)+' '+dv+'</text><rect x="10" y="22" width="'+W+'" height="28" rx="6" fill="'+HM.troi+'"/>';
 s+='<text x="10" y="74" font-size="15" '+HFONT+' fill="currentColor">'+ten2+': '+sx(b)+' '+dv+'</text><rect x="10" y="80" width="'+w2+'" height="28" rx="6" fill="'+HM.troi+'"/><rect x="'+(10+w2)+'" y="80" width="'+(W-w2)+'" height="28" rx="6" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
 s+='<text x="'+(10+w2+(W-w2)/2)+'" y="100" text-anchor="middle" font-size="18" '+HFONT+' fill="currentColor">?</text><text x="'+(10+w2+(W-w2)/2)+'" y="126" text-anchor="middle" font-size="14" '+HFONT+' fill="currentColor">hơn kém</text>';
 return s;
}
function docSoDoHieu(html){ var m=/data-so="(\d+),(\d+)"/.exec(html); return m ? {a:+m[1], b:+m[2]} : null; }
/* sơ đồ xe: tổng, các lần bán, phần còn lại (ô ?) */
function soDoXe(tong, bs){
 var n=bs.length, w=Math.floor((280-4*n)/(n+1)), s=svgX(300,112,300).replace('<svg ','<svg data-xe="'+tong+':'+bs.join(',')+'" '), i, x;
 s+='<text x="10" y="16" font-size="14" '+HFONT+' fill="currentColor">Nhà máy làm được</text><rect x="10" y="22" width="280" height="30" rx="8" fill="'+HM.troi+'"/>'+chuSo(150, 37, sx(tong)+' xe', 17);
 for(i=0;i<n;i++){ x=10+i*(w+4); s+='<rect x="'+x+'" y="62" width="'+w+'" height="44" rx="8" fill="'+HM.cam+'"/><text x="'+(x+w/2)+'" y="80" text-anchor="middle" font-size="14" '+HFONT+' fill="'+HM.chu+'">Bán '+(i+1)+'</text><text x="'+(x+w/2)+'" y="98" text-anchor="middle" font-size="14" '+HFONT+' fill="'+HM.chu+'">'+sx(bs[i])+'</text>'; }
 x=10+n*(w+4); s+='<rect x="'+x+'" y="62" width="'+w+'" height="44" rx="8" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/><text x="'+(x+w/2)+'" y="77" text-anchor="middle" font-size="14" '+HFONT+' fill="currentColor">Còn lại</text>'+chuSo(x+w/2, 96, '?', 18);
 return s;
}
function docSoDoXe(html){ var m=/data-xe="(\d+):([\d,]+)"/.exec(html); return m ? {t:+m[1], bs:m[2].split(',').map(Number)} : null; }
/* biểu thức: {t:[số], o:['-','+',...]} */
function gtBt(e){ var v=e.t[0], i; for(i=0;i<e.o.length;i++) v = e.o[i]==='+' ? v+e.t[i+1] : v-e.t[i+1]; return v; }
function okBt(e){ var v=e.t[0], i; for(i=0;i<e.o.length;i++){ v = e.o[i]==='+' ? v+e.t[i+1] : v-e.t[i+1]; if(v<0 || v>99999) return false; } return e.t.every(function(x){ return x>0 && x<=99999; }); }
function vietBt(e){ var s=sx(e.t[0]), i; for(i=0;i<e.o.length;i++) s+=' '+(e.o[i]==='+' ? '+' : '−')+' '+sx(e.t[i+1]); return s; }
/* biểu thức có giá trị bằng tg: dạng 'a' = x − y; 'b' = x − y + z; 'c' = x − y − z */
function btTheoGt(dang, tg){
 for(var g=0; g<300; g++){
  var y=rnd(10,60)*100+rnd(0,99), z=rnd(10,60)*100+rnd(0,99), e;
  if(dang==='a') e={t:[tg+y,y], o:['-']};
  else if(dang==='b') e={t:[tg+y-z,y,z], o:['-','+']};
  else e={t:[tg+y+z,y,z], o:['-','-']};
  if(okBt(e) && gtBt(e)===tg && e.t[0]>=e.t[1]) return e;
 }
 return {t:[tg+1000,1000], o:['-']};
}
var GOI={'quen-muon':'Hàng trên bé hơn hàng dưới thì MƯỢN 10 ở hàng bên trái, rồi nhớ BỚT 1 ở hàng đã cho mượn.',
  'tru-nguoc':'Luôn lấy chữ số của số bị trừ (hàng trên) trừ đi chữ số của số trừ (hàng dưới), không đảo ngược.',
  'dat-lech-hang':'Đặt tính thì các chữ số cùng hàng thẳng cột: đơn vị với đơn vị, chục với chục, trăm với trăm.',
  'nham-hang':'Nhẩm theo nghìn hoặc theo chục nghìn rồi viết đủ chữ số 0: 13 nghìn − 6 nghìn = 7 nghìn = 7 000.',
  'thieu-buoc':'Bài này có nhiều bước. Bé làm đủ các bước nhé!',
  'cong-thay-tru':'Hơn kém thì trừ; cả hai thì cộng. Bé đọc kỹ đề nhé.',
  'so-sanh-sai':'Bé tính giá trị của từng biểu thức rồi mới so sánh.',
  'nham-bang':'Bé tính lại từng bước cho đúng nhé.'};
function gy(){ var o={}, k; for(k in GOI) o[k]=GOI[k]; return o; }
var TEN_LOI={'quen-muon':'Quên bớt 1 ở hàng đã cho mượn', 'tru-nguoc':'Lấy chữ số lớn trừ chữ số bé', 'dat-lech-hang':'Đặt tính lệch hàng'};
var DAU3=['>','<','='];
function dau(a,b){ return a>b ? '>' : (a<b ? '<' : '='); }

var BAI = {
 n: 64,
 title: 'Phép Trừ Trong Phạm Vi 100 000',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-muon':'Quên bớt 1 sau khi mượn', 'tru-nguoc':'Trừ ngược chữ số bé cho chữ số lớn', 'dat-lech-hang':'Đặt tính lệch hàng', 'nham-hang':'Nhầm hàng khi nhẩm số tròn', 'thieu-buoc':'Thiếu một bước', 'cong-thay-tru':'Nhầm cộng với trừ', 'so-sanh-sai':'So sánh kết quả sai', 'nham-bang':'Trừ sai'},
 muctieu: [
  {id:'MT1', ten:'Trừ có nhớ (đặt tính)', muc:['Mượn một lần: điền một chữ số của hiệu; số năm chữ số trừ số bốn chữ số.', 'Mượn nhiều lần: điền cả hiệu; số năm chữ số trừ số ba chữ số (34 635 − 927).', 'Mượn qua chữ số 0; năm chữ số trừ hai chữ số; bạn An quên bớt 1.']},
  {id:'MT2', ten:'Nhẩm số tròn nghìn, tròn chục nghìn', muc:['13 000 − 6 000; 80 000 − 50 000; 38 000 − 4 000.', '15 000 − 7 000; 60 000 − 20 000; 57 000 − 3 000.', '17 000 − 8 000; 100 000 − 40 000; 43 000 − 8 000.']},
  {id:'MT3', ten:'Toán đố, so sánh biểu thức', muc:['Nhà máy bán một tháng; xuống dốc ngắn hơn; so sánh hai phép trừ.', 'Nhà máy bán hai tháng; cả đường lên dốc, xuống dốc; so sánh biểu thức ba số.', 'Bán ba tháng; hai phường hơn bao nhiêu người; 70 000 − 9 000 + 6 023 so với 93 279 − 3 279 − 20 000.']}
 ],
 topics: [
  /* D1 — Đặt tính trừ, điền một chữ số */
  {name:'Đặt tính trừ, điền một chữ số', sec:'Khám phá — 23 285 − 12 967 = 10 318: điền chữ số ở ô ?', mt:['MT1'], levels:3,
   muc:['Mượn một lần: điền một chữ số của hiệu.', 'Mượn hai lần: điền một chữ số của hiệu.', 'Mượn qua chữ số 0: điền một chữ số của hiệu.'],
   make:function(lv){
    var p = lv<=1 ? capTru(5,5,[1]) : (lv===2 ? capTru(5,5,[2]) : capTru(5,5,[2,3,4],true)), t=String(p.a-p.b), pos=[], i;
    for(i=0;i<t.length;i++) if(t.charAt(i)!=='0') pos.push(t.length-1-i);
    var an=pick(pos), ans=cotSo(p.a-p.b, an);
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an}, q:truDoc(p.a,p.b,{an:an})+'<div>Chữ số ở ô <b class="text-amber-700">?</b> của hiệu là mấy?</div>', ans:ans, sai:nhanSai([[ans+1,'quen-muon'],[ans-1,'quen-muon'],[Math.abs(cotSo(p.a,an)-cotSo(p.b,an)),'tru-nguoc'],[ans+2,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemTruDoc(q) || p.a<10000 || p.b<10000) return false; var k=soMuon(p.a,p.b), t=p.a-p.b; if(q.ans!==cotSo(t,p.an) || q.ans<=0) return false;
    if(q._lv<=1) return k===1; if(q._lv===2) return k===2; return k>=2 && String(p.a).slice(1).indexOf('0')>=0; }},

  /* D2 — Đặt tính trừ, điền hiệu */
  {name:'Đặt tính trừ, điền hiệu', sec:'Bài 1 — 84 758 − 43 265 = 41 493; 75 046 − 32 638 = 42 408; 97 358 − 89 263 = 8 095', mt:['MT1'], levels:3,
   muc:['Mượn một lần: tìm hiệu.', 'Mượn hai lần: tìm hiệu.', 'Mượn ba hoặc bốn lần: tìm hiệu.'],
   make:function(lv){
    var p=capTru(5,5, lv<=1 ? [1] : (lv===2 ? [2] : [3,4])), t=p.a-p.b;
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'hieu'}, q:truDoc(p.a,p.b,{an:'hieu'})+'<div>Tính hiệu của hai số.</div>', ans:t, sai:nhanSai([[truNguoc(p.a,p.b),'tru-nguoc'],[truQuenMuon(p.a,p.b),'quen-muon'],[t+10,'nham-bang'],[t-100,'nham-bang'],[p.a+p.b,'cong-thay-tru']], t), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemTruDoc(q) || p.a<10000 || p.b<10000 || q.ans!==p.a-p.b) return false; var k=soMuon(p.a,p.b); return q._lv<=2 ? k===q._lv : k>=3; }},

  /* D3 — Hai số khác số chữ số */
  {name:'Hai số khác số chữ số', sec:'Bài 1 — 79 363 − 5 819 = 73 544; 34 635 − 927 = 33 708; 56 492 − 56 = 56 436 (đặt thẳng hàng)', mt:['MT1'], levels:3,
   muc:['Số năm chữ số trừ số bốn chữ số (79 363 − 5 819).', 'Số năm chữ số trừ số ba chữ số (34 635 − 927).', 'Số năm chữ số trừ số hai chữ số (56 492 − 56).'],
   make:function(lv){
    var p = lv<=1 ? capTru(5,4,[1,2,3]) : (lv===2 ? capTru(5,3,[1,2,3]) : capTru(5,2,[1,2,3])), t=p.a-p.b;
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'hieu'}, q:truDoc(p.a,p.b,{an:'hieu'})+'<div>Đặt tính rồi tính hiệu của hai số.</div>', ans:t, sai:nhanSai([[p.a-p.b*10,'dat-lech-hang'],[truNguoc(p.a,p.b),'tru-nguoc'],[truQuenMuon(p.a,p.b),'quen-muon'],[t+10,'nham-bang'],[t-100,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemTruDoc(q) || p.a<10000 || q.ans!==p.a-p.b || soMuon(p.a,p.b)<1) return false;
    if(q._lv<=1) return p.b>=1000 && p.b<10000; if(q._lv===2) return p.b>=100 && p.b<1000; return p.b>=10 && p.b<100; }},

  /* D4 — Nhẩm tròn nghìn */
  {name:'Nhẩm tròn nghìn', sec:'Bài 2 — 13 nghìn − 6 nghìn = 7 nghìn: 13 000 − 6 000 = 7 000', mt:['MT2'], levels:3,
   muc:['Số bị trừ 11 đến 13 nghìn (13 000 − 6 000).', 'Số bị trừ 14 đến 16 nghìn (15 000 − 7 000).', 'Số bị trừ 17 đến 18 nghìn (17 000 − 8 000).'],
   make:function(lv){
    var a, b, g;
    for(g=0; g<500; g++){ a = lv<=1 ? rnd(11,13) : (lv===2 ? rnd(14,16) : rnd(17,18)); b=rnd(3,9); if(a-b>=2) break; }
    var ans=(a-b)*1000;
    return {type:'num', _lv:lv, _a:a*1000, _b:b*1000, q:'<div>Tính nhẩm ('+a+' nghìn − '+b+' nghìn = ? nghìn):</div>'+bieuThucTo(sx(a*1000)+' − '+sx(b*1000)+' = ?'), ans:ans, sai:nhanSai([[a-b,'nham-hang'],[(a-b)*100,'nham-hang'],[ans+1000,'nham-bang'],[ans-1000,'nham-bang'],[(a-b)*10000,'nham-hang'],[(b-a+20)*1000,'quen-muon']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%1000!==0 || b%1000!==0 || b<3000 || b>9000 || a<11000 || a>18000 || a-b<2000 || q.ans!==a-b) return false; var s=a/1000; if(q._lv<=1) return s<=13; if(q._lv===2) return s>=14 && s<=16; return s>=17; }},

  /* D5 — Nhẩm tròn chục nghìn */
  {name:'Nhẩm tròn chục nghìn', sec:'Bài 2 — 8 chục nghìn − 5 chục nghìn = 3 chục nghìn: 80 000 − 50 000 = 30 000; 100 000 − 40 000 = 60 000', mt:['MT2'], levels:3,
   muc:['Số bị trừ 6 đến 9 chục nghìn (80 000 − 50 000).', 'Số bị trừ 3 đến 5 chục nghìn (60 000 − 20 000 dạng nhỏ hơn).', 'Số bị trừ 100 000 (100 000 − 40 000).'],
   make:function(lv){
    var a, b;
    if(lv<=1){ a=rnd(6,9); b=rnd(1,a-2); } else if(lv===2){ a=rnd(3,5); b=rnd(1,a-1); } else { a=10; b=rnd(1,9); }
    var ans=(a-b)*10000;
    return {type:'num', _lv:lv, _a:a*10000, _b:b*10000, q:'<div>Tính nhẩm ('+a+' chục nghìn − '+b+' chục nghìn = ? chục nghìn):</div>'+bieuThucTo(sx(a*10000)+' − '+sx(b*10000)+' = ?'), ans:ans, sai:nhanSai([[a-b,'nham-hang'],[(a-b)*1000,'nham-hang'],[ans+10000,'nham-bang'],[ans-10000,'nham-bang'],[(a-b)*100,'nham-hang']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%10000!==0 || b%10000!==0 || b<10000 || a>100000 || a-b<10000 || q.ans!==a-b) return false; var s=a/10000; if(q._lv<=1) return s>=6 && s<=9; if(q._lv===2) return s>=3 && s<=5; return s===10; }},

  /* D6 — Nhẩm chục nghìn trừ nghìn */
  {name:'Nhẩm số tròn nghìn trừ nghìn', sec:'Bài 2 — 38 000 − 4 000 = 34 000; 57 000 − 3 000 = 54 000; 43 000 − 8 000 = 35 000', mt:['MT2'], levels:3,
   muc:['Không mượn, chữ số hàng nghìn nhỏ (38 000 − 4 000).', 'Không mượn, chữ số hàng nghìn lớn (57 000 − 3 000).', 'Mượn sang hàng chục nghìn (43 000 − 8 000).'],
   make:function(lv){
    var k, t, b, g;
    if(lv<=1){ for(g=0; g<300; g++){ k=rnd(1,9); t=rnd(3,6); b=rnd(1,t-1); if(t>b) break; } }
    else if(lv===2){ for(g=0; g<300; g++){ k=rnd(1,9); t=rnd(7,9); b=rnd(1,t-1); if(t>b) break; } }
    else { for(g=0; g<300; g++){ k=rnd(1,9); t=rnd(0,7); b=rnd(t+1,9); if(b>t) break; } }
    var a=k*10000+t*1000; b=b*1000; var ans=a-b;
    return {type:'num', _lv:lv, _a:a, _b:b, q:'<div>Tính nhẩm:</div>'+bieuThucTo(sx(a)+' − '+sx(b)+' = ?'), ans:ans, sai:nhanSai([[ans+1000,'nham-bang'],[ans-1000,'nham-bang'],[ans+10000,'nham-hang'],[ans-10000,'quen-muon'],[a+b,'cong-thay-tru']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%1000!==0 || b%1000!==0 || a<10000 || b<1000 || b>9000 || a>99000 || a-b<=0 || q.ans!==a-b) return false; var t=(a/1000)%10, bb=b/1000;
    if(q._lv<=1) return t>bb && t<=6; if(q._lv===2) return t>bb && t>=7; return bb>t && a%10000!==0 || (bb>t); }},

  /* D7 — Nhà máy xe ô tô */
  {name:'Nhà máy làm xe ô tô', sec:'Bài 3 — nhà máy làm 24 500 xe, tháng 1 bán 10 600, tháng 2 bán 9 500: còn 4 400 xe', mt:['MT3'], levels:3,
   muc:['Bán một tháng: còn lại bao nhiêu xe.', 'Bán hai tháng (hai bước).', 'Bán ba tháng (ba bước).'],
   make:function(lv){
    var n = lv<=1 ? 1 : (lv===2 ? 2 : 3), tong, bs=[], g, i, s;
    for(g=0; g<500; g++){ tong=rnd(150,900)*100; bs=[]; for(i=0;i<n;i++) bs.push(rnd(30,250)*100); s=bs.reduce(function(x,y){ return x+y; },0); if(tong-s>=2000 && tong-s<=tong-3000) break; }
    var con=tong-s;
    return {type:'num', _lv:lv, q:khungHinh(soDoXe(tong,bs).replace(/<\/svg>$/,''))+'<div>Nhà máy làm được <b>'+sx(tong)+' xe</b>. '+(n===1 ? 'Tháng 1 bán <b>'+sx(bs[0])+' xe</b>.' : bs.map(function(b,k){ return 'Tháng '+(k+1)+' bán <b>'+sx(b)+' xe</b>'; }).join(', ')+'.')+' Nhà máy còn lại bao nhiêu xe?</div>', ans:con, sai:nhanSai([[tong-bs[0],'thieu-buoc'],[tong-(n>1 ? bs[1] : bs[0]),'thieu-buoc'],[tong+s,'cong-thay-tru'],[s,'thieu-buoc'],[con+100,'nham-bang'],[con-1000,'nham-bang']], con), goiY:gy()};
  }, check:function(q){ var t=docSoDoXe(q.q); if(!t) return false; var n = q._lv<=1 ? 1 : (q._lv===2 ? 2 : 3); if(t.bs.length!==n || t.t<15000 || t.t>90000) return false; var s=t.bs.reduce(function(x,y){ return x+y; },0), con=t.t-s;
    if(con<2000 || q.ans!==con || q.q.indexOf('<b>'+sx(t.t)+' xe</b>')<0) return false; return t.bs.every(function(b){ return q.q.indexOf('<b>'+sx(b)+' xe</b>')>=0 && b%100===0; }); }},

  /* D8 — So sánh hai biểu thức */
  {name:'So sánh hai biểu thức', sec:'Bài 4 — 70 000 − 9 000 + 6 023 ? 93 279 − 3 279 − 20 000', mt:['MT3'], levels:3,
   muc:['Hai phép trừ.', 'Biểu thức có ba số.', 'Hai biểu thức ba số, giá trị gần nhau.'],
   make:function(lv){
    var e1, e2, g, v1, tg, delta;
    for(g=0; g<500; g++){
     if(lv<=1) e1=btTheoGt('a', rnd(10,80)*1000+rnd(0,9)*100);
     else if(lv===2) e1=btTheoGt(pick(['b','c']), rnd(10,80)*1000+rnd(0,9)*100);
     else e1=btTheoGt('b', rnd(10,80)*1000+rnd(0,9)*100);
     v1=gtBt(e1); delta = lv<=2 ? pick([0,-1000,1000,-2000,2000,-500,500]) : pick([0,0,-100,100,-1000,1000]); tg=v1+delta; if(tg<1000) continue;
     e2=btTheoGt(lv<=1 ? 'a' : (lv===2 ? pick(['a','b','c']) : 'c'), tg); if(okBt(e1) && okBt(e2) && vietBt(e1)!==vietBt(e2)) break;
    }
    var D=dau(gtBt(e1), gtBt(e2));
    return {type:'mcq', cot:2, _lv:lv, _e1:JSON.stringify(e1), _e2:JSON.stringify(e2), _dung:D, q:'<div>Điền dấu thích hợp vào chỗ <b class="text-amber-700">?</b></div><div class="text-xl font-extrabold text-orange-600 my-2">'+vietBt(e1)+'</div><div class="text-3xl font-extrabold text-amber-700">?</div><div class="text-xl font-extrabold text-orange-600 my-2">'+vietBt(e2)+'</div>', choices:DAU3.slice(), correct:DAU3.indexOf(D), sai:(function(){ var o={}; DAU3.forEach(function(c,i){ if(c!==D) o[String(i)]='so-sanh-sai'; }); return o; })(), goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q) || q.choices.length!==3) return false; var e1=JSON.parse(q._e1), e2=JSON.parse(q._e2); if(!okBt(e1) || !okBt(e2) || q.q.indexOf(vietBt(e1))<0 || q.q.indexOf(vietBt(e2))<0) return false;
    if(q._dung!==dau(gtBt(e1),gtBt(e2))) return false; var n1=e1.t.length, n2=e2.t.length; if(q._lv<=1) return n1===2 && n2===2; if(q._lv===2) return n1===3 || n2===3; return n1===3 && n2===3 && Math.abs(gtBt(e1)-gtBt(e2))<=1000; }},

  /* D9 — Đường lên dốc, xuống dốc; hai phường */
  {name:'Lên dốc, xuống dốc; hai phường', sec:'Bài 5, 6 — lên dốc 6 700 m, xuống dốc ngắn hơn 2 900 m: cả đường 10 500 m; hai phường 23 285 và 12 967 người: hơn 10 318 người', mt:['MT3'], levels:3,
   muc:['Xuống dốc ngắn hơn lên dốc: dài bao nhiêu mét.', 'Cả đường lên dốc và xuống dốc dài bao nhiêu mét.', 'Hai phường: phường A hơn phường B bao nhiêu người.'],
   make:function(lv){
    var a, d, b, ans, q, sai;
    if(lv<=2){ do { a=rnd(40,90)*100; d=rnd(10,35)*100; } while(a-d<1000);
     b=a-d; ans = lv<=1 ? b : a+b; q='<div>Đường lên dốc dài <b>'+sx(a)+' m</b>. Đường xuống dốc ngắn hơn đường lên dốc <b>'+sx(d)+' m</b>. '+(lv<=1 ? 'Đường xuống dốc dài bao nhiêu mét?' : 'Cả đường lên dốc và xuống dốc dài bao nhiêu mét?')+'</div>';
     sai=[[lv<=1 ? a : b,'thieu-buoc'],[a+d,'cong-thay-tru'],[ans+100,'nham-bang'],[ans-10,'nham-bang'],[a+d+d,'thieu-buoc']]; }
    else { var p=capHieu(function(){ return capTru(5,5,[1,2,3]); }); a=p.a; b=p.b; d=0; ans=a-b;
     q='<div>Phường A có <b>'+sx(a)+'</b> người. Phường B có <b>'+sx(b)+'</b> người.</div><div>Phường A có nhiều hơn phường B bao nhiêu người?</div>'; sai=[[a+b,'cong-thay-tru'],[truNguoc(a,b),'tru-nguoc'],[truQuenMuon(a,b),'quen-muon'],[ans+10,'nham-bang'],[ans-100,'nham-bang']]; }
    return {type:'num', _lv:lv, _a:a, _d:d, _b:b, q:q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var a=q._a, d=q._d, b=q._b;
    if(q._lv<=2){ if(a-d!==b || b<1000 || q.q.indexOf('<b>'+sx(a)+' m</b>')<0 || q.q.indexOf('<b>'+sx(d)+' m</b>')<0 || a+b>99999) return false; return q._lv<=1 ? q.ans===b && q.q.indexOf('xuống dốc dài bao nhiêu')>=0 : q.ans===a+b && q.q.indexOf('Cả đường')>=0; }
    return a>b && a>=10000 && b>=10000 && q.ans===a-b && q.q.indexOf('<b>'+sx(a)+'</b>')>=0 && q.q.indexOf('<b>'+sx(b)+'</b>')>=0; }},

  /* D10 — Bạn An làm */
  {name:'Bạn An làm', sec:'Dạng thêm (không có trong SGK) — bạn An tính 75 046 − 32 638 = 43 518: em có đồng ý không, An sai ở đâu, kết quả đúng', mt:['MT1'], levels:3,
   muc:['An tính phép trừ: em có đồng ý không.', 'An tính sai: An sai ở đâu.', 'An tính sai: kết quả đúng là bao nhiêu.'],
   make:function(lv){
    var p, kind, sa, t, g, other;
    for(g=0; g<1200; g++){ p=capTru(5,5,[1,2,3,4]); t=p.a-p.b; kind=pick(['quen-muon','tru-nguoc']); sa = kind==='quen-muon' ? truQuenMuon(p.a,p.b) : truNguoc(p.a,p.b); other = kind==='quen-muon' ? truNguoc(p.a,p.b) : truQuenMuon(p.a,p.b); if(sa!==t && sa>=1000 && (lv<=1 || sa!==other)) break; }
    var dung=Math.random()<0.5, an=(lv<=1 && dung) ? t : sa;
    var mo=nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+sx(p.a)+' − '+sx(p.b)+' = '+sx(an)+'</b>»'+(lv>=2 ? '. An tính sai rồi!' : '.')+'</div>';
    if(lv<=1){ var D=(an===t) ? 'Đồng ý' : 'Không đồng ý'; return {type:'mcq', cot:2, _lv:1, _a:p.a, _b:p.b, _an:an, _dung:D, q:mo+'<div>Em có đồng ý với An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:(an===t?0:1), sai:(an===t?{'1':'quen-muon'}:{'0':'quen-muon'}), goiY:gy()}; }
    if(lv===2){ var ks=['quen-muon','tru-nguoc','dat-lech-hang'], ch=shuffle(ks.slice()).map(function(k){ return TEN_LOI[k]; }), D2=TEN_LOI[kind], sai={}; ch.forEach(function(c,i){ if(c!==D2) sai[String(i)]=ks.filter(function(k){ return TEN_LOI[k]===c; })[0]; });
      return {type:'mcq', cot:1, _lv:2, _a:p.a, _b:p.b, _an:an, _kind:kind, _dung:D2, q:mo+'<div>An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(D2), sai:sai, goiY:gy()}; }
    return {type:'num', _lv:3, _a:p.a, _b:p.b, _an:an, _kind:kind, q:mo+'<div>Kết quả đúng của phép trừ là bao nhiêu?</div>', ans:t, sai:nhanSai([[an,kind],[truNguoc(p.a,p.b),'tru-nguoc'],[truQuenMuon(p.a,p.b),'quen-muon'],[t+10,'nham-bang'],[t-100,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, t=a-b, an=q._an; if(a<10000 || b<10000 || t<=0 || q.q.indexOf(sx(a)+' − '+sx(b)+' = '+sx(an))<0) return false;
    if(q._lv<=1) return kiemMCQ(q) && q.choices.length===2 && (q._dung==='Đồng ý')===(an===t) && (an===t || an===truNguoc(a,b) || an===truQuenMuon(a,b));
    var sa = q._kind==='quen-muon' ? truQuenMuon(a,b) : truNguoc(a,b); if(an!==sa || sa===t) return false; if(q._lv===2) return kiemMCQ(q) && q.choices.length===3 && q._dung===TEN_LOI[q._kind]; return q.ans===t; }}
 ]
};
