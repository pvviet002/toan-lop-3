/* bai-55.js — Bài 55: Phép trừ trong phạm vi 10 000 (Tập 2, Chủ đề 10). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-55.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mới, mã tự dựng): truDoc (phép trừ cột dọc đến bốn chữ số, dựng từ congDoc bài 54 và nhanDoc bài 41), soDoHieu (sơ đồ «hơn kém»).
   Mọi hiệu dương; số bị trừ <= 9999 (trừ nhẩm 10 000 − ...). check() đọc lại hình từ chuỗi SVG (data-pt, data-so) và tính lại.
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
function docPT(s){ var o={}, re=/data-pt="(\w+)"[^>]*>([^<]*)<\/text>/g, m; while((m=re.exec(String(s)))) o[m[1]]=m[2]; return o; }
/* ---- Phép cộng: số nhớ, kết quả sai thường gặp ---- */
function cotSo(n, i){ return Math.floor(n/Math.pow(10,i))%10; }

/* ---- Phép trừ: số mượn, kết quả sai thường gặp ---- */
function soMuon(a, b){ var k=0, c=0, i, t; for(i=0;i<4;i++){ t=cotSo(a,i)-c-cotSo(b,i); if(t<0){ c=1; k++; } else c=0; } return k; }
/* lấy chữ số lớn trừ chữ số bé trong từng hàng (trừ ngược) */
function truNguoc(a, b){ var r=0, i; for(i=3;i>=0;i--) r=r*10+Math.abs(cotSo(a,i)-cotSo(b,i)); return r; }
/* mượn 10 nhưng quên bớt 1 ở hàng liền bên trái */
function truQuenMuon(a, b){ var r=0, i, t; for(i=3;i>=0;i--){ t=cotSo(a,i)-cotSo(b,i); if(t<0) t+=10; r=r*10+t; } return r; }
function chuSoTru(a, b, tuy){
 tuy=tuy||{}; var X=[40,78,116,154], it=[], da=String(a), db=String(b), t=a-b, dt=String(t), i;
 for(i=0;i<da.length;i++) it.push({id:'a'+(da.length-1-i), x:X[4-da.length+i], y:52, ch:da.charAt(i)});
 for(i=0;i<db.length;i++) it.push({id:'b'+(db.length-1-i), x:X[4-db.length+i], y:100, ch:db.charAt(i)});
 if(tuy.an==='hieu') it.push({id:'p', x:X[1], y:160, ch:'?', rong:true});
 else for(i=0;i<dt.length;i++){ var pidx=dt.length-1-i; it.push({id:'p'+pidx, x:X[4-dt.length+i], y:160, ch:(tuy.an===pidx) ? '?' : dt.charAt(i)}); }
 return it;
}
function truDoc(a, b, tuy){
 var it=chuSoTru(a,b,tuy), s=svgX(180,178,180);
 it.forEach(function(e){
  if(e.ch==='?' && e.rong) s+='<rect x="22" y="126" width="152" height="46" rx="8" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
  else if(e.ch==='?') s+='<rect x="'+(e.x-17)+'" y="'+(e.y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
  s+='<text data-pt="'+e.id+'" x="'+e.x+'" y="'+e.y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(e.ch==='?' ? HM.hoi : 'currentColor')+'">'+e.ch+'</text>';
 });
 s+='<text x="12" y="100" text-anchor="middle" font-size="30" '+HFONT+' fill="currentColor">&#8722;</text><line x1="22" y1="114" x2="174" y2="114" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
 return khungHinh(s);
}
function kiemTruDoc(q){ var p=q._pt, it=chuSoTru(p.a,p.b,p), d=docPT(q.q), want={}; it.forEach(function(e){ want[e.id]=e.ch; }); var ids=Object.keys(want);
 return p.a>=100 && p.a<=9999 && p.b>=10 && p.b<p.a && ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; }); }
/* cặp số a (la chữ số) trừ b (lb chữ số), số lần mượn thuộc ks; kieu 'khong0': a có chữ số 0 (ở hàng trăm, chục) */
function capTru(la, lb, ks, co0){
 for(var g=0; g<6000; g++){
  var a=rnd(Math.pow(10,la-1), Math.pow(10,la)-1), b=rnd(Math.pow(10,lb-1), Math.pow(10,lb)-1);
  if(b>=a || a-b<1) continue; if(ks.indexOf(soMuon(a,b))<0) continue; if(co0 && String(a).slice(1).indexOf('0')<0) continue; if(co0===false && String(a).indexOf('0')>=0) continue; return {a:a, b:b};
 }
 return {a:5274, b:2928};
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
var GOI={'quen-muon':'Hàng trên bé hơn hàng dưới thì MƯỢN 10 ở hàng bên trái, rồi nhớ BỚT 1 ở hàng đã cho mượn.',
  'tru-nguoc':'Luôn lấy chữ số của số bị trừ (hàng trên) trừ đi chữ số của số trừ (hàng dưới), không đảo ngược.',
  'dat-lech-hang':'Đặt tính thì các chữ số cùng hàng thẳng cột: đơn vị với đơn vị, chục với chục, trăm với trăm.',
  'nham-hang':'Nhẩm theo nghìn hoặc theo trăm rồi viết đủ chữ số 0: 10 nghìn − 6 nghìn = 4 nghìn = 4 000.',
  'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!',
  'cong-thay-tru':'Số bị trừ = hiệu + số trừ. Số trừ = số bị trừ − hiệu.',
  'nham-bang':'Bé tính lại từng bước cho đúng nhé.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
var TEN_LOI={'quen-muon':'Quên bớt 1 ở hàng đã cho mượn', 'tru-nguoc':'Lấy chữ số lớn trừ chữ số bé', 'dat-lech-hang':'Đặt tính lệch hàng'};

var BAI = {
 n: 55,
 title: 'Phép Trừ Trong Phạm Vi 10 000',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-muon':'Quên bớt 1 sau khi mượn', 'tru-nguoc':'Trừ ngược chữ số bé cho chữ số lớn', 'dat-lech-hang':'Đặt tính lệch hàng', 'nham-hang':'Nhầm hàng khi nhẩm số tròn', 'thieu-buoc':'Thiếu một bước', 'cong-thay-tru':'Nhầm cộng với trừ', 'nham-bang':'Trừ sai'},
 muctieu: [
  {id:'MT1', ten:'Trừ có nhớ (đặt tính)', muc:['Mượn một lần: điền một chữ số của hiệu; số bốn chữ số trừ số ba chữ số.', 'Mượn hai lần, số bị trừ có chữ số 0; trừ số hai chữ số (6 729 − 43); thử lại bằng phép cộng.', 'Mượn nhiều lần (4 291 − 3 864); tìm phép tính sai; bạn An quên bớt 1 hoặc trừ ngược.']},
  {id:'MT2', ten:'Nhẩm số tròn nghìn, tròn trăm', muc:['7 000 − 3 000; 7 500 − 300.', '9 000 − 7 000; 6 700 − 600.', '10 000 − 6 000; 8 400 − 6 000; mượn sang hàng nghìn (5 200 − 700).']},
  {id:'MT3', ten:'Toán đố một, hai bước', muc:['Cao hơn bao nhiêu mét (3 143 − 1 634); xe chở dầu bơm một lần; ? − 2 000 = 5 000.', 'Dài hơn bao nhiêu km (6 650 − 1 149); bơm hai lần (9 000 − 2 500 − 2 200); 7 500 − ? = 7 200.', 'Số liệu lớn hơn; bơm ba lần; ? − 827 = 1 557.']}
 ],
 topics: [
  /* D1 — Đặt tính trừ, điền một chữ số (khám phá, bài 1) */
  {name:'Đặt tính trừ, điền một chữ số', sec:'Khám phá, bài 1 — 3 143 − 1 634 = 1 509; 5 274 − 2 928 = 2 346: điền chữ số ở ô ?', mt:['MT1'], levels:3,
   muc:['Mượn một lần: điền một chữ số của hiệu.', 'Mượn hai lần: điền một chữ số của hiệu.', 'Mượn nhiều lần, số bị trừ có chữ số 0: điền một chữ số của hiệu.'],
   make:function(lv){
    var p = lv<=1 ? capTru(4,4,[1]) : (lv===2 ? capTru(4,4,[2]) : capTru(4,4,[2,3],true)), t=String(p.a-p.b), pos=[], i;
    for(i=0;i<t.length;i++) if(t.charAt(i)!=='0') pos.push(t.length-1-i);
    var an=pick(pos), ans=cotSo(p.a-p.b, an);
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an}, q:truDoc(p.a,p.b,{an:an})+'<div>Chữ số ở ô <b class="text-amber-700">?</b> của hiệu là mấy?</div>', ans:ans, sai:nhanSai([[ans+1,'quen-muon'],[ans-1,'quen-muon'],[Math.abs(cotSo(p.a,an)-cotSo(p.b,an)),'tru-nguoc'],[ans+2,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemTruDoc(q) || p.a<1000 || p.b<1000) return false; var k=soMuon(p.a,p.b), t=p.a-p.b; if(q.ans!==cotSo(t,p.an) || q.ans<=0) return false;
    if(q._lv<=1) return k===1; if(q._lv===2) return k===2; return k>=2 && String(p.a).slice(1).indexOf('0')>=0; }},

  /* D2 — Đặt tính trừ, điền hiệu (bài 1, 3) */
  {name:'Đặt tính trừ, điền hiệu', sec:'Bài 1, 3 — 5 274 − 2 928 = 2 346; 4 291 − 3 864 = 427; 6 378 − 2 549 = 3 829', mt:['MT1'], levels:3,
   muc:['Mượn một lần: tìm hiệu.', 'Mượn hai lần: tìm hiệu.', 'Mượn ba lần: tìm hiệu.'],
   make:function(lv){
    var p=capTru(4,4,[lv]), t=p.a-p.b;
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'hieu'}, q:truDoc(p.a,p.b,{an:'hieu'})+'<div>Tính hiệu của hai số.</div>', ans:t, sai:nhanSai([[truNguoc(p.a,p.b),'tru-nguoc'],[truQuenMuon(p.a,p.b),'quen-muon'],[t+10,'nham-bang'],[t-100,'nham-bang'],[p.a+p.b,'cong-thay-tru']], t), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemTruDoc(q) || p.a<1000 || p.b<1000) return false; return soMuon(p.a,p.b)===q._lv && q.ans===p.a-p.b; }},

  /* D3 — Hai số khác số chữ số (bài 1, 3) */
  {name:'Hai số khác số chữ số', sec:'Bài 1, 3 — 2 384 − 827 = 1 557; 6 729 − 43 = 6 686; 4 628 − 719 = 3 909 (đặt thẳng hàng)', mt:['MT1'], levels:3,
   muc:['Số bốn chữ số trừ số ba chữ số (2 384 − 827).', 'Số bốn chữ số trừ số hai chữ số (6 729 − 43, 8 372 − 39).', 'Số bốn chữ số trừ số ba chữ số, mượn nhiều lần (4 628 − 719).'],
   make:function(lv){
    var p = lv<=1 ? capTru(4,3,[1,2]) : (lv===2 ? capTru(4,2,[1,2]) : capTru(4,3,[2,3])), t=p.a-p.b;
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'hieu'}, q:truDoc(p.a,p.b,{an:'hieu'})+'<div>Đặt tính rồi tính hiệu của hai số.</div>', ans:t, sai:nhanSai([[p.a-p.b*10,'dat-lech-hang'],[truNguoc(p.a,p.b),'tru-nguoc'],[truQuenMuon(p.a,p.b),'quen-muon'],[t+10,'nham-bang'],[t-100,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemTruDoc(q) || p.a<1000 || q.ans!==p.a-p.b) return false; var k=soMuon(p.a,p.b);
    if(q._lv<=1) return p.b>=100 && p.b<1000 && k>=1 && k<=2; if(q._lv===2) return p.b>=10 && p.b<100 && k>=1; return p.b>=100 && p.b<1000 && k>=2; }},

  /* D4 — Nhẩm tròn nghìn (bài 2) */
  {name:'Nhẩm tròn nghìn', sec:'Bài 2 — 7 nghìn − 3 nghìn = 4 nghìn: 7 000 − 3 000, 8 000 − 5 000, 9 000 − 7 000, 10 000 − 6 000', mt:['MT2'], levels:3,
   muc:['Số bị trừ 7 nghìn đến 8 nghìn (7 000 − 3 000).', 'Số bị trừ 9 nghìn (9 000 − 7 000).', 'Số bị trừ 10 000 (10 000 − 6 000).'],
   make:function(lv){
    var a, b;
    if(lv<=1){ a=rnd(5,8); b=rnd(1,a-2); } else if(lv===2){ a=rnd(8,9); b=rnd(2,a-1); } else { a=10; b=rnd(1,9); }
    var ans=(a-b)*1000;
    return {type:'num', _lv:lv, _a:a*1000, _b:b*1000, q:'<div>Tính nhẩm ('+a+' nghìn − '+b+' nghìn = ? nghìn):</div>'+bieuThucTo(sx(a*1000)+' − '+sx(b*1000)+' = ?'), ans:ans, sai:nhanSai([[a-b,'nham-hang'],[(a-b)*100,'nham-hang'],[ans+1000,'nham-bang'],[ans-1000,'nham-bang'],[(a+b)*1000,'cong-thay-tru']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%1000!==0 || b%1000!==0 || b<1000 || b>=a || q.ans!==a-b) return false; if(q._lv<=1) return a>=5000 && a<=8000; if(q._lv===2) return a>=8000 && a<=9000; return a===10000; }},

  /* D5 — Nhẩm tròn trăm (bài 2) */
  {name:'Nhẩm tròn trăm', sec:'Bài 2 — 5 trăm − 3 trăm = 2 trăm: 7 500 − 300 = 7 200; 6 700 − 600; 8 400 − 6 000; 4 300 − 2 000', mt:['MT2'], levels:3,
   muc:['Trừ các trăm, giữ nguyên nghìn (7 500 − 300).', 'Trừ các trăm có hiệu tròn trăm (6 700 − 600, 5 200 − 200).', 'Trừ tròn nghìn (8 400 − 6 000) hoặc mượn sang hàng nghìn (5 200 − 700).'],
   make:function(lv){
    var th=rnd(2,8)*1000, a, b;
    if(lv<=1){ var h=rnd(2,9); a=th+h*100; b=rnd(1,h-1)*100; }
    else if(lv===2){ var h2=rnd(2,9); a=th+h2*100; b=rnd(1,h2)*100; }
    else if(Math.random()<0.5){ var th3=rnd(3,9); a=th3*1000+rnd(1,9)*100; b=rnd(1,th3-1)*1000; }
    else { var h4=rnd(1,6); a=th+h4*100; b=(h4+rnd(1,3))*100; }
    var ans=a-b;
    return {type:'num', _lv:lv, _a:a, _b:b, q:'<div>Tính nhẩm:</div>'+bieuThucTo(sx(a)+' − '+sx(b)+' = ?'), ans:ans, sai:nhanSai([[a-b/100,'nham-hang'],[a-b*10,'nham-hang'],[a-b-1000,'nham-hang'],[ans+100,'nham-bang'],[ans-100,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%100!==0 || b%100!==0 || b<100 || b>=a || q.ans!==a-b) return false; var ha=Math.floor(a%1000/100), hb=b%1000/100;
    if(q._lv<=1) return b<1000 && hb<ha && ha>=2; if(q._lv===2) return b<1000 && hb<=ha; return (b%1000===0 && b<a) || (b<1000 && hb>ha); }},

  /* D6 — Cao hơn, dài hơn bao nhiêu (khám phá, bài 4) */
  {name:'Cao hơn, dài hơn bao nhiêu', sec:'Khám phá, bài 4 — Phan-xi-păng cao hơn Chư Yang Sin: 3 143 − 1 634 = 1 509 m; sông Nin dài hơn sông Hồng: 6 650 − 1 149', mt:['MT3'], levels:3,
   muc:['Hai ngọn núi: núi nào cao hơn bao nhiêu mét.', 'Hai con sông: sông nào dài hơn bao nhiêu ki-lô-mét.', 'Số liệu lớn, mượn nhiều lần.'],
   make:function(lv){
    var p = lv<=1 ? capHieu(function(){ return capTru(4,4,[2]); }) : (lv===2 ? capHieu(function(){ return capTru(4,4,[1,2,3]); }) : capHieu(function(){ return capTru(4,4,[3,2],true); })), dv = lv===2 ? 'km' : 'm', n1 = lv===2 ? 'Sông A' : 'Núi A', n2 = lv===2 ? 'Sông B' : 'Núi B', so = lv===2 ? 'dài' : 'cao';
    var t=p.a-p.b;
    return {type:'num', _lv:lv, q:khungHinh(soDoHieu(n1,p.a,n2,p.b,dv).replace(/<\/svg>$/,''))+'<div>'+n1+' '+so+' <b>'+sx(p.a)+' '+dv+'</b>, '+n2+' '+so+' <b>'+sx(p.b)+' '+dv+'</b>. '+n1+' '+so+' hơn '+n2+' bao nhiêu '+(dv==='km' ? 'ki-lô-mét' : 'mét')+'?</div>', ans:t, sai:nhanSai([[p.a+p.b,'cong-thay-tru'],[truNguoc(p.a,p.b),'tru-nguoc'],[truQuenMuon(p.a,p.b),'quen-muon'],[t+100,'nham-bang'],[t-10,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var t=docSoDoHieu(q.q); if(!t || t.a<1000 || t.b<1000 || t.a<=t.b || q.ans!==t.a-t.b || q.q.indexOf('<b>'+sx(t.a))<0 || q.q.indexOf('<b>'+sx(t.b))<0) return false; var k=soMuon(t.a,t.b);
    if(q._lv<=1) return k===2 && q.q.indexOf(' m</b>')>=0; if(q._lv===2) return k>=1 && q.q.indexOf(' km</b>')>=0; return k>=2 && q.q.indexOf(' m</b>')>=0; }},

  /* D7 — Xe chở dầu (bài 5) */
  {name:'Xe chở dầu bơm ra', sec:'Bài 5 — xe chở 9 000 l dầu, bơm 2 500 l rồi 2 200 l: còn 4 300 l', mt:['MT3'], levels:3,
   muc:['Bơm một lần: còn lại bao nhiêu lít.', 'Bơm hai lần (hai bước).', 'Bơm ba lần (ba bước).'],
   make:function(lv){
    var n = lv<=1 ? 1 : (lv===2 ? 2 : 3), tong, bs=[], g, i;
    for(g=0; g<200; g++){ tong=rnd(60,100)*100; bs=[]; for(i=0;i<n;i++) bs.push(rnd(10,30)*100); var s=bs.reduce(function(x,y){ return x+y; },0); if(tong-s>=500) break; }
    var con=tong-bs.reduce(function(x,y){ return x+y; },0), lan=['một lần','lần thứ nhất','lần thứ hai','lần thứ ba'], mo='Xe chở <b>'+sx(tong)+' l</b> dầu. ';
    if(n===1) mo+='Người ta bơm ra <b>'+sx(bs[0])+' l</b>.'; else mo+='Người ta bơm ra '+bs.map(function(b,k){ return 'lần '+(k+1)+' <b>'+sx(b)+' l</b>'; }).join(', ')+'.';
    return {type:'num', _lv:lv, _t:tong, _bs:bs.join(','), q:'<div>'+mo+' Trên xe còn lại bao nhiêu lít dầu?</div>', ans:con, sai:nhanSai([[tong-bs[0],'thieu-buoc'],[tong-(bs.length>1 ? bs[1] : bs[0]),'thieu-buoc'],[tong+bs.reduce(function(x,y){ return x+y; },0),'cong-thay-tru'],[bs.reduce(function(x,y){ return x+y; },0),'thieu-buoc'],[con+100,'nham-bang']], con), goiY:gy()};
  }, check:function(q){ var bs=q._bs.split(',').map(Number), n=q._lv<=1 ? 1 : (q._lv===2 ? 2 : 3), t=q._t; if(bs.length!==n || t>10000 || t<6000) return false; var con=t-bs.reduce(function(x,y){ return x+y; },0); if(con<500 || q.ans!==con || q.q.indexOf('<b>'+sx(t)+' l</b>')<0) return false; return bs.every(function(b){ return q.q.indexOf('<b>'+sx(b)+' l</b>')>=0 && b%100===0; }); }},

  /* D8 — Tìm số bị trừ, số trừ (không có trong SGK) */
  {name:'Tìm số bị trừ, số trừ', sec:'Ôn tập — ? − 2 000 = 5 000; 7 500 − ? = 7 200; ? − 827 = 1 557', mt:['MT3'], levels:3,
   muc:['Số bị trừ chưa biết, số tròn nghìn: ? − 2 000 = 5 000.', 'Số trừ chưa biết, số tròn trăm: 7 500 − ? = 7 200.', 'Số bị trừ chưa biết: ? − 827 = 1 557.'],
   make:function(lv){
    var a, b, d, ex, ans;
    if(lv<=1){ b=rnd(1,4)*1000; d=rnd(2,5)*1000; a=b+d; ex='? − '+sx(b)+' = '+sx(d); ans=a; }
    else if(lv===2){ do { a=rnd(30,90)*100; b=rnd(1,6)*100; } while(a%1000===0); d=a-b; ex=sx(a)+' − ? = '+sx(d); ans=b; }
    else { do { b=rnd(100,899); d=rnd(300,1999); } while(b%100===0 || d%100===0 || b+d>9999); a=b+d; ex='? − '+sx(b)+' = '+sx(d); ans=a; }
    return {type:'num', _lv:lv, _ex:ex, _ans:ans, q:'<div>Tìm số ở ô <b class="text-amber-700">?</b></div>'+bieuThucTo(ex), ans:ans, sai:nhanSai([[lv===2 ? a+b : d-b>0 ? d-b : d+b+1,'cong-thay-tru'],[ans+10,'nham-bang'],[ans-10,'nham-bang'],[lv===2 ? d : b,'cong-thay-tru'],[ans+100,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var m=/^\? − ([\d ]+) = ([\d ]+)$/.exec(q._ex), m2=/^([\d ]+) − \? = ([\d ]+)$/.exec(q._ex), u=function(s){ return +s.split(NB).join(''); }; if(q.q.indexOf(q._ex)<0) return false;
    if(m){ var b=u(m[1]), d=u(m[2]); if(q.ans!==b+d || b+d>9999) return false; return q._lv<=1 ? (b%1000===0 && d%1000===0) : (q._lv===3 && b%100!==0 && d%100!==0); }
    if(m2){ var a2=u(m2[1]), d2=u(m2[2]); return q._lv===2 && q.ans===a2-d2 && a2%100===0 && d2%100===0 && q.ans>=100; } return false; }},

  /* D9 — Thử lại bằng phép cộng (không có trong SGK) */
  {name:'Thử lại bằng phép cộng', sec:'Ôn tập — thử lại phép trừ: hiệu + số trừ = số bị trừ', mt:['MT1'], levels:3,
   muc:['Hiệu cộng số trừ bằng bao nhiêu (số bị trừ).', 'Chọn phép cộng dùng để thử lại phép trừ.', 'Tìm phép trừ có kết quả sai.'],
   make:function(lv){
    var p=capTru(4,4,[1,2,3]), a=p.a, b=p.b, d=a-b;
    if(lv<=1) return {type:'num', _lv:1, _a:a, _b:b, q:'<div>Phép trừ <b>'+sx(a)+' − '+sx(b)+' = '+sx(d)+'</b>. Muốn thử lại, bé tính hiệu cộng số trừ: <b>'+sx(d)+' + '+sx(b)+' = ?</b></div>', ans:a, sai:nhanSai([[d+b+10,'nham-bang'],[a+b,'cong-thay-tru'],[d,'cong-thay-tru'],[a-1,'nham-bang']], a), goiY:gy()};
    if(lv===2){ var D=sx(d)+' + '+sx(b), m=lapMCQ(D, [[sx(a)+' + '+sx(b),'cong-thay-tru'],[sx(a)+' + '+sx(d),'cong-thay-tru'],[sx(a)+' − '+sx(d),'cong-thay-tru'],[sx(d)+' − '+sx(b),'cong-thay-tru']]);
      return {type:'mcq', cot:2, _lv:2, _a:a, _b:b, _dung:m._dung, q:'<div>Bạn An vừa tính <b>'+sx(a)+' − '+sx(b)+' = '+sx(d)+'</b>. Phép tính nào dùng để thử lại phép trừ này?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()}; }
    var ps=[], i, tru=[]; for(i=0;i<4;i++){ var q2=capTru(4,4,[1,2,3]); tru.push({a:q2.a, b:q2.b, r:q2.a-q2.b}); }
    var sai=rnd(0,3), wrong=tru[sai].r + pick([-100,100,10,-10,1000]); if(wrong<=0) wrong=tru[sai].r+10; tru[sai].r=wrong;
    var txt=tru.map(function(t){ return sx(t.a)+' − '+sx(t.b)+' = '+sx(t.r); }), Dd=txt[sai], sai2={}; txt.forEach(function(c,k){ if(k!==sai) sai2[String(k)]='nham-bang'; });
    return {type:'mcq', cot:1, _lv:3, _dung:Dd, q:'<div>Chỉ có một phép trừ có kết quả <b>sai</b>. Bé tìm phép trừ sai nhé!</div>', choices:txt, correct:sai, sai:sai2, goiY:gy()};
  }, check:function(q){ if(q._lv<=1) return q.ans===q._a && q.q.indexOf('<b>'+sx(q._a)+' − '+sx(q._b)+' = '+sx(q._a-q._b)+'</b>')>=0 && q._a-q._b>0;
    if(!kiemMCQ(q)) return false; if(q._lv===2) return q.choices.length===4 && q._dung===sx(q._a-q._b)+' + '+sx(q._b);
    var okk=q.choices.map(function(c){ var m=/^([\d ]+) − ([\d ]+) = ([\d ]+)$/.exec(c); if(!m) return null; var u=function(s){ return +s.split(NB).join(''); }; return u(m[1])-u(m[2])===u(m[3]); }); if(okk.some(function(x){ return x===null; })) return false; return okk.filter(function(x){ return !x; }).length===1 && okk[q.correct]===false && q.choices.length===4; }},

  /* D10 — Bạn An làm (không có trong SGK) */
  {name:'Bạn An làm', sec:'Ôn tập — bạn An tính 4 291 − 3 864 = 1 437: em có đồng ý không, An sai ở đâu, kết quả đúng', mt:['MT1'], levels:3,
   muc:['An tính phép trừ: em có đồng ý không.', 'An tính sai: An sai ở đâu.', 'An tính sai: kết quả đúng là bao nhiêu.'],
   make:function(lv){
    var p, kind, sa, t, g;
    for(g=0; g<800; g++){ p=capTru(4,4,[1,2,3]); t=p.a-p.b; kind=pick(['quen-muon','tru-nguoc']); sa = kind==='quen-muon' ? truQuenMuon(p.a,p.b) : truNguoc(p.a,p.b); var other = kind==='quen-muon' ? truNguoc(p.a,p.b) : truQuenMuon(p.a,p.b); if(sa!==t && sa>0 && (lv<=1 || sa!==other)) break; }
    var dung=Math.random()<0.5, an=(lv<=1 && dung) ? t : sa;
    var mo=nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+sx(p.a)+' − '+sx(p.b)+' = '+sx(an)+'</b>»'+(lv>=2 ? '. An tính sai rồi!' : '.')+'</div>';
    if(lv<=1){ var D=(an===t) ? 'Đồng ý' : 'Không đồng ý'; return {type:'mcq', cot:2, _lv:1, _a:p.a, _b:p.b, _an:an, _dung:D, q:mo+'<div>Em có đồng ý với An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:(an===t?0:1), sai:(an===t?{'1':'quen-muon'}:{'0':'quen-muon'}), goiY:gy()}; }
    if(lv===2){ var ks=['quen-muon','tru-nguoc','dat-lech-hang'], ch=shuffle(ks.slice()).map(function(k){ return TEN_LOI[k]; }), D2=TEN_LOI[kind], sai={}; ch.forEach(function(c,i){ if(c!==D2) sai[String(i)]=ks.filter(function(k){ return TEN_LOI[k]===c; })[0]; });
      return {type:'mcq', cot:1, _lv:2, _a:p.a, _b:p.b, _an:an, _kind:kind, _dung:D2, q:mo+'<div>An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(D2), sai:sai, goiY:gy()}; }
    return {type:'num', _lv:3, _a:p.a, _b:p.b, _an:an, _kind:kind, q:mo+'<div>Kết quả đúng của phép trừ là bao nhiêu?</div>', ans:t, sai:nhanSai([[an,kind],[truNguoc(p.a,p.b),'tru-nguoc'],[truQuenMuon(p.a,p.b),'quen-muon'],[t+10,'nham-bang'],[t-100,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, t=a-b, an=q._an; if(a<1000 || b<1000 || t<=0 || q.q.indexOf(sx(a)+' − '+sx(b)+' = '+sx(an))<0) return false;
    if(q._lv<=1) return kiemMCQ(q) && q.choices.length===2 && (q._dung==='Đồng ý')===(an===t) && (an===t || an===truNguoc(a,b) || an===truQuenMuon(a,b));
    var sa = q._kind==='quen-muon' ? truQuenMuon(a,b) : truNguoc(a,b); if(an!==sa || sa===t) return false; if(q._lv===2) return kiemMCQ(q) && q.choices.length===3 && q._dung===TEN_LOI[q._kind]; return q.ans===t; }}
 ]
};
