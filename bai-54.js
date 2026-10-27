/* bai-54.js — Bài 54: Phép cộng trong phạm vi 10 000 (Tập 2, Chủ đề 10). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-54.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mới, mã tự dựng): congDoc (phép cộng cột dọc đến bốn chữ số, mẫu nhanDoc bài 41), cuaHang (ba cửa hàng với phép tính), soDoHon (sơ đồ «nhiều hơn»).
   Mọi tổng <= 9999 (trừ nhẩm 1 000 + 9 000 = 10 000). check() đọc lại hình từ chuỗi SVG (data-pt, data-ch, data-so) và tính lại.
   QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function bieuThucTo(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
var NB=' ';
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
function soNhoCong(a, b){ var c=0, k=0, i, t; for(i=0;i<4;i++){ t=cotSo(a,i)+cotSo(b,i)+c; c = t>=10 ? 1 : 0; k+=c; } return k; }
function tongKhongNho(a, b){ var r=0, i; for(i=3;i>=0;i--) r=r*10+(cotSo(a,i)+cotSo(b,i))%10; return r; }
/* nhớ sang cách một hàng (nhớ nhầm hàng): số nhớ của hàng i cộng vào hàng i + 2 */
function tongNhoSai(a, b){ var c=[0,0,0,0], cin=0, i, t, r=0, d=[];
 for(i=0;i<4;i++){ t=cotSo(a,i)+cotSo(b,i)+cin; c[i]=t>=10 ? 1 : 0; cin=c[i]; }
 for(i=0;i<4;i++){ t=cotSo(a,i)+cotSo(b,i)+(i>=2 ? c[i-2] : 0); d.push(t%10); }
 for(i=3;i>=0;i--) r=r*10+d[i]; return r; }
function chuSoCong(a, b, tuy){
 tuy=tuy||{}; var X=[40,78,116,154], it=[], da=String(a), db=String(b), t=a+b, dt=String(t), i;
 for(i=0;i<da.length;i++) it.push({id:'a'+(da.length-1-i), x:X[4-da.length+i], y:52, ch:da.charAt(i)});
 for(i=0;i<db.length;i++) it.push({id:'b'+(db.length-1-i), x:X[4-db.length+i], y:100, ch:db.charAt(i)});
 if(tuy.an==='tong') it.push({id:'p', x:X[1], y:160, ch:'?', rong:true});
 else for(i=0;i<dt.length;i++){ var pidx=dt.length-1-i; it.push({id:'p'+pidx, x:X[4-dt.length+i], y:160, ch:(tuy.an===pidx) ? '?' : dt.charAt(i)}); }
 return it;
}
function congDoc(a, b, tuy){
 var it=chuSoCong(a,b,tuy), s=svgX(180,178,180);
 it.forEach(function(e){
  if(e.ch==='?' && e.rong) s+='<rect x="22" y="126" width="152" height="46" rx="8" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
  else if(e.ch==='?') s+='<rect x="'+(e.x-17)+'" y="'+(e.y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
  s+='<text data-pt="'+e.id+'" x="'+e.x+'" y="'+e.y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(e.ch==='?' ? HM.hoi : 'currentColor')+'">'+e.ch+'</text>';
 });
 s+='<text x="12" y="100" text-anchor="middle" font-size="28" '+HFONT+' fill="currentColor">+</text><line x1="22" y1="114" x2="174" y2="114" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
 return khungHinh(s);
}
function kiemCongDoc(q){ var p=q._pt, it=chuSoCong(p.a,p.b,p), d=docPT(q.q), want={}; it.forEach(function(e){ want[e.id]=e.ch; }); var ids=Object.keys(want);
 return p.a>=100 && p.b>=100 && p.a+p.b<=9999 && ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; }); }
/* cặp số có đúng k lần nhớ, la chữ số a, lb chữ số b, tổng <= 9999 */
function capCong(la, lb, k, minTong){
 for(var g=0; g<4000; g++){
  var a=rnd(Math.pow(10,la-1), Math.pow(10,la)-1), b=rnd(Math.pow(10,lb-1), Math.pow(10,lb)-1);
  if(a+b>9999 || a+b<(minTong||0) || soNhoCong(a,b)!==k) continue; return {a:a, b:b};
 }
 return {a:2576, b:4518};
}
/* ba cửa hàng: mỗi cửa hàng một phép cộng */
function cuaHang(ds){
 var s=svgX(300, ds.length*52+8, 300), i;
 ds.forEach(function(d,i2){ var y=6+i2*52;
  s+='<g data-ch="'+d.t+':'+d.a+'+'+d.b+'"><rect x="8" y="'+y+'" width="284" height="44" rx="10" fill="'+HM.vang+'" stroke="'+HM.vangDam+'" stroke-width="3"/><text x="34" y="'+(y+30)+'" text-anchor="middle" font-size="22" '+HFONT+' fill="'+HM.chu+'">'+d.t+'</text><text x="170" y="'+(y+29)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="'+HM.chu+'">'+sx(d.a)+' + '+sx(d.b)+'</text></g>'; });
 return s;
}
function docCuaHang(html){ var re=/data-ch="(\w):(\d+)\+(\d+)"/g, m, v=[]; while((m=re.exec(html))) v.push({t:m[1], a:+m[2], b:+m[3]}); return v; }
/* sơ đồ «nhiều hơn»: thanh trên là a, thanh dưới là a cộng thêm d */
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
  'nham-hang':'Nhẩm theo nghìn hoặc theo trăm rồi viết đủ chữ số 0: 5 nghìn + 3 nghìn = 8 nghìn = 8 000.',
  'so-sanh-sai':'Bé tính kết quả của từng phép cộng rồi so sánh các kết quả.',
  'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!',
  'cong-thay-tru':'Số hạng chưa biết = tổng − số hạng đã biết.',
  'nham-bang':'Bé cộng lại từng bước cho đúng nhé.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
var TEN_LOI={'quen-nho':'Quên nhớ khi cộng', 'nho-sai-hang':'Nhớ nhầm sang hàng cách một hàng', 'dat-lech-hang':'Đặt tính lệch hàng'};

var BAI = {
 n: 54,
 title: 'Phép Cộng Trong Phạm Vi 10 000',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-nho':'Quên nhớ', 'nho-sai-hang':'Nhớ nhầm hàng', 'dat-lech-hang':'Đặt tính lệch hàng', 'nham-hang':'Nhầm hàng khi nhẩm số tròn', 'so-sanh-sai':'So sánh kết quả sai', 'thieu-buoc':'Thiếu một bước', 'cong-thay-tru':'Nhầm cộng với trừ', 'nham-bang':'Cộng sai'},
 muctieu: [
  {id:'MT1', ten:'Cộng có nhớ (đặt tính)', muc:['Hai số bốn chữ số, nhớ một lần: điền một chữ số của tổng; 837 + 524 (tổng bốn chữ số).', 'Nhớ hai lần: điền cả tổng; số bốn chữ số cộng số ba chữ số (6 307 + 826).', 'Nhớ ba lần; chọn kết quả; bạn An quên nhớ hoặc nhớ nhầm hàng.']},
  {id:'MT2', ten:'Nhẩm số tròn nghìn, tròn trăm', muc:['6 000 + 2 000; 4 200 + 600; chọn cửa hàng trong hai phép.', '5 000 + 4 000; 3 200 + 700; ba cửa hàng cùng một số hạng.', '1 000 + 9 000 (tổng 10 000); 4 700 + 600 (nhớ sang hàng nghìn); ba cửa hàng gần nhau.']},
  {id:'MT3', ten:'Toán đố một, hai bước', muc:['Nhiều hơn: bác Hùng 2 530 kg, bác Dương nhiều hơn 550 kg; số ngựa.', 'Nhiều hơn rồi cộng cả hai; tìm số hạng chưa biết (tròn trăm).', 'Cả hai (hai bước) với số lớn hơn; tìm số hạng chưa biết (? + 837 = 1 361).']}
 ],
 topics: [
  /* D1 — Đặt tính cộng, điền một chữ số (khám phá, bài 1) */
  {name:'Đặt tính cộng, điền một chữ số', sec:'Khám phá, bài 1 — 2 729 + 4 827 = 7 556; 6 428 + 3 481 = 9 909: điền chữ số ở ô ?', mt:['MT1'], levels:3,
   muc:['Nhớ một lần: điền một chữ số của tổng.', 'Nhớ hai lần: điền một chữ số của tổng.', 'Nhớ ba lần: điền một chữ số của tổng.'],
   make:function(lv){
    var k=lv, p=capCong(4,4,k), t=String(p.a+p.b), pos=[], i;
    for(i=0;i<t.length;i++) if(t.charAt(i)!=='0') pos.push(t.length-1-i);
    var an=pick(pos), ans=cotSo(p.a+p.b, an);
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an}, q:congDoc(p.a,p.b,{an:an})+'<div>Chữ số ở ô <b class="text-amber-700">?</b> của tổng là mấy?</div>', ans:ans, sai:nhanSai([[ans+1,'nho-sai-hang'],[ans-1,'quen-nho'],[(cotSo(p.a,an)+cotSo(p.b,an))%10,'quen-nho'],[ans+2,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemCongDoc(q) || p.a<1000 || p.b<1000) return false; var t=p.a+p.b; return soNhoCong(p.a,p.b)===q._lv && q.ans===cotSo(t,p.an) && q.ans>0; }},

  /* D2 — Đặt tính cộng, điền tổng (bài 1, 2) */
  {name:'Đặt tính cộng, điền tổng', sec:'Bài 1, 2 — 6 428 + 3 481 = 9 909; 2 576 + 4 518 = 7 094; 3 628 + 4 845 = 8 473', mt:['MT1'], levels:3,
   muc:['Hai số bốn chữ số, nhớ một lần: tìm tổng.', 'Nhớ hai lần: tìm tổng.', 'Nhớ ba lần: tìm tổng.'],
   make:function(lv){
    var p=capCong(4,4,lv), t=p.a+p.b;
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'tong'}, q:congDoc(p.a,p.b,{an:'tong'})+'<div>Tính tổng của hai số.</div>', ans:t, sai:nhanSai([[tongKhongNho(p.a,p.b),'quen-nho'],[tongNhoSai(p.a,p.b),'nho-sai-hang'],[t+10,'nham-bang'],[t-100,'nham-bang'],[t+1000,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemCongDoc(q) || p.a<1000 || p.b<1000) return false; return soNhoCong(p.a,p.b)===q._lv && q.ans===p.a+p.b; }},

  /* D3 — Hai số khác số chữ số (bài 1) */
  {name:'Hai số khác số chữ số', sec:'Bài 1 — 837 + 524 = 1 361; 6 307 + 826 = 7 133; 3 847 + 635 = 4 482 (đặt thẳng hàng)', mt:['MT1'], levels:3,
   muc:['Hai số ba chữ số, tổng có bốn chữ số (837 + 524).', 'Số bốn chữ số cộng số ba chữ số (6 307 + 826).', 'Số bốn chữ số cộng số ba chữ số, nhớ nhiều lần (3 847 + 635).']
   ,make:function(lv){
    var p = lv<=1 ? capCong(3,3,pick([1,2]),1000) : (lv===2 ? capCong(4,3,pick([1,2]),0) : capCong(4,3,pick([2,3]),0)), t=p.a+p.b;
    if(lv<=1 && t<1000){ p=capCong(3,3,2,1000); t=p.a+p.b; }
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'tong'}, q:congDoc(p.a,p.b,{an:'tong'})+'<div>Đặt tính rồi tính tổng của hai số.</div>', ans:t, sai:nhanSai([[p.a+p.b*10,'dat-lech-hang'],[tongKhongNho(p.a,p.b),'quen-nho'],[t+10,'nham-bang'],[t-100,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemCongDoc(q)) return false; var t=p.a+p.b, k=soNhoCong(p.a,p.b); if(q.ans!==t) return false;
    if(q._lv<=1) return p.a<1000 && p.b<1000 && t>=1000; return p.a>=1000 && p.b<1000 && p.b>=100 && (q._lv===2 ? k>=1 : k>=2); }},

  /* D4 — Nhẩm tròn nghìn (bài 3) */
  {name:'Nhẩm tròn nghìn', sec:'Bài 3 — 5 nghìn + 3 nghìn = 8 nghìn: 6 000 + 2 000, 3 000 + 4 000, 5 000 + 4 000, 1 000 + 9 000', mt:['MT2'], levels:3,
   muc:['Tổng nhỏ (6 000 + 2 000).', 'Tổng 7 nghìn đến 9 nghìn (5 000 + 4 000).', 'Tổng bằng 10 nghìn (1 000 + 9 000).'],
   make:function(lv){
    var a, b;
    if(lv<=1){ a=rnd(1,5); b=rnd(1,6-a>1 ? 6-a : 1); a=rnd(2,5); b=rnd(1,Math.min(4, 6-a)); }
    else if(lv===2){ do { a=rnd(2,7); b=rnd(2,7); } while(a+b<7 || a+b>9); }
    else { a=rnd(1,9); b=10-a; }
    var ans=(a+b)*1000;
    return {type:'num', _lv:lv, _a:a*1000, _b:b*1000, q:'<div>Tính nhẩm ('+a+' nghìn + '+b+' nghìn = ? nghìn):</div>'+bieuThucTo(sx(a*1000)+' + '+sx(b*1000)+' = ?'), ans:ans, sai:nhanSai([[a+b,'nham-hang'],[(a+b)*100,'nham-hang'],[ans+1000,'nham-bang'],[ans-1000,'nham-bang'],[(a+b)*10000,'nham-hang']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%1000!==0 || b%1000!==0 || a<1000 || b<1000 || q.ans!==a+b) return false; var s=(a+b)/1000; if(q._lv<=1) return s<=6; if(q._lv===2) return s>=7 && s<=9; return s===10; }},

  /* D5 — Nhẩm tròn trăm (bài 3) */
  {name:'Nhẩm tròn trăm', sec:'Bài 3 — 2 trăm + 6 trăm = 8 trăm: 4 200 + 600 = 4 800; 3 200 + 700; 5 000 + 500; 8 600 + 200; 6 100 + 800', mt:['MT2'], levels:3,
   muc:['Cộng các trăm, giữ nguyên nghìn (4 200 + 600).', 'Cả hai số đều có trăm (3 200 + 700, 8 600 + 200).', 'Tròn nghìn cộng trăm (5 000 + 500) hoặc nhớ sang hàng nghìn (4 700 + 600).'],
   make:function(lv){
    var th=rnd(1,8)*1000, a, b, ans;
    if(lv<=1){ a=th+rnd(1,4)*100; b=rnd(1,5)*100; }
    else if(lv===2){ a=th+rnd(1,6)*100; b=rnd(1,9-a%1000/100)*100; }
    else if(Math.random()<0.5){ a=th; b=rnd(1,9)*100; }
    else { a=th+rnd(5,9)*100; b=(10-Math.floor(a%1000/100))*100+rnd(0,3)*100; }
    ans=a+b;
    return {type:'num', _lv:lv, _a:a, _b:b, q:'<div>Tính nhẩm:</div>'+bieuThucTo(sx(a)+' + '+sx(b)+' = ?'), ans:ans, sai:nhanSai([[a+b/100,'nham-hang'],[a+b*10,'nham-hang'],[a+b+1000,'nham-hang'],[ans-100,'nham-bang'],[ans+100,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%100!==0 || b%100!==0 || b<100 || q.ans!==a+b || a+b>9999) return false; var ha=Math.floor(a%1000/100), hb=b/100;
    if(q._lv<=1) return a%1000!==0 && ha+hb<=9 && hb<=5; if(q._lv===2) return a%1000!==0 && ha+hb<=9; return a%1000===0 || ha+hb>=10; }},

  /* D6 — Kiến chọn cửa hàng (bài 4) */
  {name:'Kiến chọn cửa hàng', sec:'Bài 4 — kiến chọn cửa hàng có kết quả lớn nhất: 5 800 + 2 000, 5 800 + 2 500, 5 800 + 2 200', mt:['MT2'], levels:3,
   muc:['Hai cửa hàng, hai kết quả khác xa nhau.', 'Ba cửa hàng cùng số hạng thứ nhất (5 800), số hạng thứ hai khác nhau.', 'Ba cửa hàng có kết quả gần nhau.'],
   make:function(lv){
    var n = lv<=1 ? 2 : 3, ten=['A','B','C'].slice(0,n), ds, g, vs;
    for(g=0; g<300; g++){
     if(lv<=1) ds=ten.map(function(t){ return {t:t, a:rnd(10,70)*100, b:rnd(5,25)*100}; });
     else if(lv===2){ var base=rnd(30,65)*100; ds=ten.map(function(t){ return {t:t, a:base, b:rnd(10,30)*100}; }); }
     else { var base3=rnd(30,65)*100; ds=ten.map(function(t){ return {t:t, a:base3+rnd(0,3)*100, b:rnd(15,30)*100}; }); }
     vs=ds.map(function(d){ return d.a+d.b; }); var srt=vs.slice().sort(function(x,y){ return y-x; });
     if(new Set(vs).size===n && (lv<=1 ? srt[0]-srt[1]>=500 : (lv===2 ? srt[0]-srt[1]>=100 : srt[0]-srt[1]===100 || srt[0]-srt[1]===200))) break;
    }
    var vs2=ds.map(function(d){ return d.a+d.b; }), ix=vs2.indexOf(Math.max.apply(null,vs2)), ch=ds.map(function(d){ return 'Cửa hàng '+d.t; }), sai={}; ch.forEach(function(c,i){ if(i!==ix) sai[String(i)]='so-sanh-sai'; });
    return {type:'mcq', cot:2, _lv:lv, _dung:ch[ix], q:khungHinh(cuaHang(ds).replace(/<\/svg>$/,''))+'<div>Kiến muốn chọn cửa hàng có kết quả phép tính <b>lớn nhất</b>. Kiến chọn cửa hàng nào?</div>', choices:ch, correct:ix, sai:sai, goiY:gy()};
  }, check:function(q){ var ds=docCuaHang(q.q), n=q._lv<=1 ? 2 : 3; if(ds.length!==n || !kiemMCQ(q) || q.choices.length!==n) return false; var vs=ds.map(function(d){ return d.a+d.b; }); if(new Set(vs).size!==n || vs.some(function(v){ return v>9999; })) return false;
    var ix=vs.indexOf(Math.max.apply(null,vs)); if(q._dung!=='Cửa hàng '+ds[ix].t) return false; var srt=vs.slice().sort(function(x,y){ return y-x; }), d=srt[0]-srt[1];
    if(q._lv<=1) return d>=500; if(q._lv===2) return ds.every(function(x){ return x.a===ds[0].a; }) && d>=100; return d===100 || d===200; }},

  /* D7 — Thóc của hai bác (bài 5) */
  {name:'Thóc của hai bác', sec:'Bài 5 — bác Hùng thu 2 530 kg thóc, bác Dương nhiều hơn 550 kg: bác Dương thu 3 080 kg', mt:['MT3'], levels:3,
   muc:['Nhiều hơn: tìm số thóc của bác thứ hai.', 'Nhiều hơn: số có nhớ sang hàng nghìn.', 'Cả hai bác thu bao nhiêu kg thóc (hai bước).'],
   make:function(lv){
    var a=rnd(10,60)*50, d=rnd(2,12)*50, ans, hoi;
    if(lv===2){ a=rnd(20,45)*100+rnd(1,9)*10; d=rnd(5,9)*100+rnd(1,9)*10; }
    if(lv>=3){ a=rnd(10,45)*50; d=rnd(4,20)*50; }
    var b=a+d; ans = lv>=3 ? a+b : b; hoi = lv>=3 ? 'Cả hai bác thu hoạch được bao nhiêu ki-lô-gam thóc?' : 'Bác Dương thu hoạch được bao nhiêu ki-lô-gam thóc?';
    return {type:'num', _lv:lv, q:khungHinh(soDoHon('Bác Hùng',a,'Bác Dương',d,'kg').replace(/<\/svg>$/,''))+'<div>Bác Hùng thu hoạch <b>'+sx(a)+' kg</b> thóc. Bác Dương thu hoạch nhiều hơn bác Hùng <b>'+sx(d)+' kg</b>. '+hoi+'</div>', ans:ans, sai:nhanSai([[lv>=3 ? b : a,'thieu-buoc'],[lv>=3 ? a+d : a+d+10,'thieu-buoc'],[Math.abs(a-d),'cong-thay-tru'],[ans+10,'nham-bang'],[ans-100,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var t=docSoDo(q.q); if(!t || q.q.indexOf('<b>'+sx(t.a)+' kg</b>')<0 || q.q.indexOf('<b>'+sx(t.d)+' kg</b>')<0) return false; var b=t.a+t.d, e = q._lv>=3 ? t.a+b : b; if(q.ans!==e || e>9999) return false; if(q._lv>=3) return q.q.indexOf('Cả hai bác')>=0; return q.q.indexOf('Bác Dương thu hoạch được')>=0; }},

  /* D8 — Người vận chuyển (bài 6) */
  {name:'Người vận chuyển gươm, áo giáp, nón, ngựa', sec:'Bài 6 — 1 250 người vận chuyển gươm, áo giáp, nón; số người vận chuyển ngựa nhiều hơn 2 320 người: 3 570 người; cả hai 4 820 người', mt:['MT3'], levels:3,
   muc:['Số người vận chuyển ngựa (nhiều hơn).', 'Cả hai nhóm có bao nhiêu người (hai bước).', 'Cả hai nhóm với số lớn hơn.'],
   make:function(lv){
    var a, d;
    if(lv<=2){ a=rnd(8,30)*50; d=rnd(10,40)*50; } else { do { a=rnd(30,60)*50; d=rnd(20,50)*50; } while(2*a+d>9999 || 2*a+d<6000); }
    var b=a+d, ans = lv<=1 ? b : a+b, hoi = lv<=1 ? 'Có bao nhiêu người vận chuyển ngựa?' : 'Có tất cả bao nhiêu người vận chuyển gươm, áo giáp, nón và ngựa?';
    return {type:'num', _lv:lv, q:khungHinh(soDoHon('Gươm, áo giáp, nón',a,'Ngựa',d,'người').replace(/<\/svg>$/,''))+'<div>Có <b>'+sx(a)+' người</b> vận chuyển gươm, áo giáp và nón. Số người vận chuyển ngựa nhiều hơn số người đó <b>'+sx(d)+' người</b>. '+hoi+'</div>', ans:ans, sai:nhanSai([[lv<=1 ? a : b,'thieu-buoc'],[a+d+d,'thieu-buoc'],[Math.abs(d-a),'cong-thay-tru'],[ans+10,'nham-bang'],[ans-100,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var t=docSoDo(q.q); if(!t || q.q.indexOf('<b>'+sx(t.a)+' người</b>')<0 || q.q.indexOf('<b>'+sx(t.d)+' người</b>')<0) return false; var b=t.a+t.d, e = q._lv<=1 ? b : t.a+b; if(q.ans!==e || e>9999) return false; if(q._lv<=1) return q.q.indexOf('vận chuyển ngựa?')>=0; return q.q.indexOf('Có tất cả')>=0 && (q._lv===2 || e>=6000); }},

  /* D9 — Tìm số hạng chưa biết (không có trong SGK) */
  {name:'Tìm số hạng chưa biết', sec:'Ôn tập — ? + 2 000 = 7 000; 4 500 + ? = 6 700; ? + 837 = 1 361 (tìm số hạng)', mt:['MT3'], levels:3,
   muc:['Số hạng tròn nghìn: ? + 2 000 = 7 000.', 'Số hạng tròn trăm: 4 500 + ? = 6 700.', 'Số hạng bất kỳ: ? + 837 = 1 361.'],
   make:function(lv){
    var x, y, s, vi=Math.random()<0.5;
    if(lv<=1){ x=rnd(2,6)*1000; y=rnd(1,3)*1000; } else if(lv===2){ do { x=rnd(10,50)*100; y=rnd(5,25)*100; } while(x%1000===0); } else { do { x=rnd(100,899); y=rnd(300,899); } while(x%100===0 || y%100===0 || x+y<1000); }
    s=x+y; var ex = vi ? '? + '+sx(y)+' = '+sx(s) : sx(y)+' + ? = '+sx(s);
    return {type:'num', _lv:lv, _x:x, _y:y, _vi:vi, q:'<div>Tìm số ở ô <b class="text-amber-700">?</b></div>'+bieuThucTo(ex), ans:x, sai:nhanSai([[s+y,'cong-thay-tru'],[s,'cong-thay-tru'],[x+10,'nham-bang'],[x-10,'nham-bang'],[y,'cong-thay-tru']], x), goiY:gy()};
  }, check:function(q){ var x=q._x, y=q._y, s=x+y; if(q.ans!==x || s>9999 || x<1) return false; var ex = q._vi ? '? + '+sx(y)+' = '+sx(s) : sx(y)+' + ? = '+sx(s); if(q.q.indexOf(ex)<0) return false;
    if(q._lv<=1) return x%1000===0 && y%1000===0; if(q._lv===2) return x%100===0 && y%100===0 && x%1000!==0; return x%100!==0 && y%100!==0 && s>=1000; }},

  /* D10 — Bạn An làm (không có trong SGK) */
  {name:'Bạn An làm', sec:'Ôn tập — bạn An tính 2 576 + 4 518 = 6 084: em có đồng ý không, An sai ở đâu, kết quả đúng', mt:['MT1'], levels:3,
   muc:['An tính phép cộng: em có đồng ý không.', 'An tính sai: An sai ở đâu.', 'An tính sai: kết quả đúng là bao nhiêu.'],
   make:function(lv){
    var p, kind, sa, t, g;
    for(g=0; g<500; g++){ p=capCong(4,4,rnd(1,3)); t=p.a+p.b; kind=pick(['quen-nho','nho-sai-hang']); sa = kind==='quen-nho' ? tongKhongNho(p.a,p.b) : tongNhoSai(p.a,p.b); if(sa!==t && (lv<=1 || sa!==(kind==='quen-nho' ? tongNhoSai(p.a,p.b) : tongKhongNho(p.a,p.b)))) break; }
    var dung=Math.random()<0.5, an = (lv<=1 && dung) ? t : sa;
    var mo=nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+sx(p.a)+' + '+sx(p.b)+' = '+sx(an)+'</b>»'+(lv>=2 ? '. An tính sai rồi!' : '.')+'</div>';
    if(lv<=1){ var D=(an===t) ? 'Đồng ý' : 'Không đồng ý'; return {type:'mcq', cot:2, _lv:1, _a:p.a, _b:p.b, _an:an, _dung:D, q:mo+'<div>Em có đồng ý với An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:(an===t?0:1), sai:(an===t?{'1':'quen-nho'}:{'0':'quen-nho'}), goiY:gy()}; }
    if(lv===2){ var ks=['quen-nho','nho-sai-hang','dat-lech-hang'], ch=shuffle(ks.slice()).map(function(k){ return TEN_LOI[k]; }), D2=TEN_LOI[kind], sai={}; ch.forEach(function(c,i){ if(c!==D2) sai[String(i)]=ks.filter(function(k){ return TEN_LOI[k]===c; })[0]; });
      return {type:'mcq', cot:1, _lv:2, _a:p.a, _b:p.b, _an:an, _kind:kind, _dung:D2, q:mo+'<div>An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(D2), sai:sai, goiY:gy()}; }
    return {type:'num', _lv:3, _a:p.a, _b:p.b, _an:an, _kind:kind, q:mo+'<div>Kết quả đúng của phép cộng là bao nhiêu?</div>', ans:t, sai:nhanSai([[an,kind],[tongKhongNho(p.a,p.b),'quen-nho'],[t+10,'nham-bang'],[t-100,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, t=a+b, an=q._an; if(a<1000 || b<1000 || t>9999 || q.q.indexOf(sx(a)+' + '+sx(b)+' = '+sx(an))<0) return false;
    if(q._lv<=1) return kiemMCQ(q) && q.choices.length===2 && (q._dung==='Đồng ý')===(an===t) && (an===t || an===tongKhongNho(a,b) || an===tongNhoSai(a,b));
    var sa = q._kind==='quen-nho' ? tongKhongNho(a,b) : tongNhoSai(a,b); if(an!==sa || sa===t) return false; if(q._lv===2) return kiemMCQ(q) && q.choices.length===3 && q._dung===TEN_LOI[q._kind]; return q.ans===t; }}
 ]
};
