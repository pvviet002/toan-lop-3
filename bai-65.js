/* bai-65.js — Bài 65: Luyện tập chung (Tập 2, Chủ đề 12). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-65.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Ôn lại bài 63, 64: hàm cột dọc (congDoc, truDoc) chép từ hai bài đó; hình mới: soDoXang (cửa hàng xăng, data-xang).
   check() đọc lại hình từ chuỗi SVG (data-pt, data-xang) và tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

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
function bt20(t){ return '<div class="text-xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
function dau(a,b){ return a>b ? '>' : (a<b ? '<' : '='); }
var MINUS=' − ';
/* sơ đồ cửa hàng xăng: có sẵn, nhập thêm (+), bán (-), kết quả (ô ?) */
function soDoXang(a, ops, nhan){
 var items=[['Có sẵn', a, 'co']], i, n, w, s, x;
 ops.forEach(function(o){ items.push([o>0 ? 'Nhập' : 'Bán', Math.abs(o), o>0 ? 'nhap' : 'ban']); });
 items.push([nhan, '?', 'kq']); n=items.length; w=Math.floor((322-4*(n-1))/n);
 s=svgX(330,70,330).replace('<svg ','<svg data-xang="'+a+'|'+ops.join('|')+'" ');
 items.forEach(function(it,k){ x=4+k*(w+4);
  if(it[2]==='kq') s+='<rect x="'+x+'" y="6" width="'+w+'" height="56" rx="8" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/><text x="'+(x+w/2)+'" y="26" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+it[0]+'</text>'+chuSo(x+w/2, 46, '?', 20);
  else s+='<rect x="'+x+'" y="6" width="'+w+'" height="56" rx="8" fill="'+(it[2]==='co' ? HM.troi : (it[2]==='nhap' ? HM.la : HM.cam))+'"/><text x="'+(x+w/2)+'" y="26" text-anchor="middle" font-size="15" '+HFONT+' fill="'+HM.chu+'">'+it[0]+'</text><text x="'+(x+w/2)+'" y="48" text-anchor="middle" font-size="15" '+HFONT+' fill="'+HM.chu+'">'+sx(it[1])+'</text>';
 });
 return s;
}
function docXang(html){ var m=/data-xang="(\d+)((?:\|-?\d+)+)"/.exec(html); return m ? {a:+m[1], ops:m[2].slice(1).split('|').map(Number)} : null; }
/* biểu thức nhẩm: kiểu và số hạng */
function btNhamTho(k, n){
 if(k==='p3') return {txt:sx(n[0])+' + '+sx(n[1])+MINUS+sx(n[2]), val:n[0]+n[1]-n[2]};
 if(k==='m3') return {txt:sx(n[0])+MINUS+sx(n[1])+' + '+sx(n[2]), val:n[0]-n[1]+n[2]};
 if(k==='q4') return {txt:sx(n[0])+MINUS+sx(n[1])+' + '+sx(n[2])+MINUS+sx(n[3]), val:n[0]-n[1]+n[2]-n[3]};
 if(k==='ng1') return {txt:sx(n[0])+MINUS+'('+sx(n[1])+' + '+sx(n[2])+')', val:n[0]-(n[1]+n[2]), naive:n[0]-n[1]+n[2]};
 if(k==='ng2') return {txt:sx(n[0])+MINUS+'('+sx(n[1])+MINUS+sx(n[2])+')', val:n[0]-(n[1]-n[2]), naive:n[0]-n[1]-n[2]};
 return {txt:'('+sx(n[0])+' + '+sx(n[1])+')'+MINUS+'('+sx(n[2])+MINUS+sx(n[3])+')', val:(n[0]+n[1])-(n[2]-n[3]), naive:n[0]+n[1]-n[2]-n[3]};
}
function btHopLe(k, n){
 var tm=function(x){ return x>0 && x<=100000 && x%1000===0; };
 if(!n.every(tm)) return false;
 if(k==='p3') return n[0]+n[1]<=100000 && n[0]+n[1]-n[2]>=1000;
 if(k==='m3') return n[0]>n[1] && n[0]-n[1]+n[2]<=100000;
 if(k==='q4') return n[0]>n[1] && n[0]-n[1]+n[2]<=100000 && n[0]-n[1]+n[2]-n[3]>=1000;
 if(k==='ng1') return n[1]+n[2]<n[0];
 if(k==='ng2') return n[1]>n[2] && n[0]>n[1]-n[2];
 return n[2]>n[3] && n[0]+n[1]<=100000 && n[0]+n[1]>n[2]-n[3];
}
function nBt(k, lo, hi){
 var g, n, m=(k==='q4' || k==='ng3') ? 4 : 3;
 for(g=0; g<2000; g++){ n=[]; var i; for(i=0;i<m;i++) n.push(rnd(lo,hi)*1000); if(btHopLe(k,n) && btNhamTho(k,n).val>=1000) return n; }
 return k==='p3' ? [30000,6000,20000] : [80000,40000,10000];
}
function bt3(a, b, c, k){ return k==='p' ? {txt:sx(a)+' + '+sx(b)+MINUS+sx(c), val:a+b-c} : (k==='n1' ? {txt:sx(a)+MINUS+'('+sx(b)+' + '+sx(c)+')', val:a-(b+c), naive:a-b+c} : {txt:sx(a)+MINUS+'('+sx(b)+MINUS+sx(c)+')', val:a-(b-c), naive:a-b-c}); }
var GOI={'quen-nho':'Cộng ở một hàng được từ 10 trở lên thì viết chữ số đơn vị, NHỚ 1 sang hàng bên trái.',
  'nho-sai-hang':'Số nhớ cộng vào hàng liền bên trái, không nhảy cách một hàng.',
  'quen-muon':'Hàng trên bé hơn hàng dưới thì MƯỢN 10 ở hàng bên trái, rồi nhớ BỚT 1 ở hàng đã cho mượn.',
  'tru-nguoc':'Luôn lấy chữ số của số bị trừ (hàng trên) trừ đi chữ số của số trừ (hàng dưới), không đảo ngược.',
  'dat-lech-hang':'Đặt tính thì các chữ số cùng hàng thẳng cột: đơn vị với đơn vị, chục với chục, trăm với trăm.',
  'bo-ngoac':'Có dấu ngoặc thì tính TRONG NGOẶC trước.',
  'sai-thu-tu-tinh':'Biểu thức chỉ có cộng, trừ thì tính từ trái sang phải.',
  'thieu-buoc':'Bài này có nhiều bước. Bé làm đủ các bước nhé!',
  'cong-thay-tru':'Số hạng = tổng − số hạng kia. Số bị trừ = hiệu + số trừ. Số trừ = số bị trừ − hiệu.',
  'nham-hang':'Nhẩm theo nghìn rồi viết đủ chữ số 0: 30 nghìn + 6 nghìn − 20 nghìn = 16 nghìn = 16 000.',
  'nham-bang':'Bé tính lại từng bước cho đúng nhé.'};
function gy(){ var o={}, k; for(k in GOI) o[k]=GOI[k]; return o; }
var TEN_LOI={'quen-nho':'Quên nhớ khi cộng', 'nho-sai-hang':'Nhớ nhầm sang hàng cách một hàng', 'quen-muon':'Quên bớt 1 ở hàng đã cho mượn', 'tru-nguoc':'Lấy chữ số lớn trừ chữ số bé', 'dat-lech-hang':'Đặt tính lệch hàng'};

var BAI = {
 n: 65,
 title: 'Luyện Tập Chung (Cộng, Trừ Đến 100 000)',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-nho':'Quên nhớ', 'nho-sai-hang':'Nhớ nhầm hàng', 'quen-muon':'Quên bớt 1 sau khi mượn', 'tru-nguoc':'Trừ ngược chữ số bé cho chữ số lớn', 'dat-lech-hang':'Đặt tính lệch hàng', 'bo-ngoac':'Bỏ qua dấu ngoặc', 'sai-thu-tu-tinh':'Tính sai thứ tự', 'thieu-buoc':'Thiếu một bước', 'cong-thay-tru':'Nhầm cộng với trừ', 'nham-hang':'Nhầm hàng khi nhẩm', 'nham-bang':'Tính sai'},
 muctieu: [
  {id:'MT1', ten:'Nhẩm và tính nhanh', muc:['Nhẩm ba số hạng tròn nghìn (30 000 + 6 000 − 20 000); a − (b + c).', 'Nhẩm a − b + c; có dấu ngoặc a − (b − c).', 'Nhẩm bốn số hạng; hai dấu ngoặc.']},
  {id:'MT2', ten:'Đặt tính cộng, trừ; đúng sai; tìm số', muc:['Đặt tính cộng, trừ nhớ một lần (8 563 + 7 284; 32 679 − 946); đúng/sai phép cộng.', 'Đặt tính có nhớ nhiều lần (42 758 + 9 235; 83 627 − 76 253); đúng/sai phép trừ; tìm số bị trừ.', 'Mượn qua chữ số 0; chọn phép tính sai; tìm số năm chữ số.']},
  {id:'MT3', ten:'Toán đố nhiều bước, biểu thức', muc:['Cửa hàng xăng nhập thêm hoặc bán; a + b − c tròn trăm; a − (b + c).', 'Cửa hàng bán hơn có sẵn; 8 647 + 6 500 − 13 217; 15 654 − (7 460 + 2 140).', 'Nhập thêm rồi bán (16 500 + 9 000 − 17 350); biểu thức số lớn; ngoặc trừ.']}
 ],
 topics: [
  /* D1 — Nhẩm ba số hạng */
  {name:'Nhẩm ba số hạng', sec:'Bài 1 — 30 000 + 6 000 − 20 000 = 16 000; 18 000 − 9 000 + 40 000 = 49 000', mt:['MT1'], levels:3,
   muc:['a + b − c (số tròn nghìn).', 'a − b + c (số tròn nghìn).', 'Bốn số hạng, cộng trừ liên tiếp.'],
   make:function(lv){
    var k = lv<=1 ? 'p3' : (lv===2 ? 'm3' : 'q4'), n=nBt(k, lv<=1 ? 3 : 2, lv<=1 ? 60 : 60), e=btNhamTho(k,n), ans=e.val;
    return {type:'num', _lv:lv, _k:k, _n:n.join(','), q:'<div>Tính nhẩm:</div>'+bt20(e.txt+' = ?'), ans:ans, sai:nhanSai([[ans+1000,'nham-bang'],[ans-1000,'nham-bang'],[ans+10000,'nham-hang'],[n.reduce(function(s,x){ return s+x; },0),'cong-thay-tru'],[ans/10,'nham-hang']], ans), goiY:gy()};
  }, check:function(q){ var n=q._n.split(',').map(Number), e=btNhamTho(q._k,n); if(!btHopLe(q._k,n) || q.ans!==e.val || e.val<1000 || q.q.indexOf(e.txt)<0) return false; return q._lv<=1 ? q._k==='p3' : (q._lv===2 ? q._k==='m3' : q._k==='q4'); }},

  /* D2 — Nhẩm có dấu ngoặc */
  {name:'Nhẩm có dấu ngoặc', sec:'Bài 1 — 80 000 − (40 000 + 10 000) = 30 000; 70 000 − (60 000 − 30 000) = 40 000', mt:['MT1'], levels:3,
   muc:['a − (b + c).', 'a − (b − c).', 'Hai dấu ngoặc: (a + b) − (c − d).'],
   make:function(lv){
    var k = lv<=1 ? 'ng1' : (lv===2 ? 'ng2' : 'ng3'), n=nBt(k, lv<=2 ? 3 : 5, lv<=2 ? 90 : 90), e=btNhamTho(k,n), ans=e.val;
    return {type:'num', _lv:lv, _k:k, _n:n.join(','), q:'<div>Tính nhẩm:</div>'+bt20(e.txt+' = ?'), ans:ans, sai:nhanSai([[e.naive,'bo-ngoac'],[ans+1000,'nham-bang'],[ans-1000,'nham-bang'],[ans+10000,'nham-hang']], ans), goiY:gy()};
  }, check:function(q){ var n=q._n.split(',').map(Number), e=btNhamTho(q._k,n); if(!btHopLe(q._k,n) || q.ans!==e.val || e.val<1000 || q.q.indexOf(e.txt)<0 || e.naive===e.val) return false; return q._lv<=1 ? q._k==='ng1' : (q._lv===2 ? q._k==='ng2' : q._k==='ng3'); }},

  /* D3 — Đúng hay sai phép tính */
  {name:'Đúng hay sai phép tính', sec:'Bài 2 — 32 467 + 2 825 = 60 717 (sai, đúng 35 292); 62 958 − 473 = 62 485 (đúng); 73 865 − 68 529 = 15 346 (sai)', mt:['MT2'], levels:3,
   muc:['Phép cộng: đúng hay sai.', 'Phép trừ: đúng hay sai.', 'Bốn phép tính, chọn phép tính sai.'],
   make:function(lv){
    var one=function(cong, dung){ var a, b, t, sa;
     if(cong){ var p=capCong(5, pick([4,5]), pick([1,2,3])); a=p.a; b=p.b; t=a+b; sa=pick([tongKhongNho(a,b), tongNhoSai(a,b)]); if(sa===t || sa<1000) sa=tongKhongNho(a,b); }
     else { var p2=capTru(5, pick([3,4]), [1,2,3]); a=p2.a; b=p2.b; t=a-b; sa=pick([truQuenMuon(a,b), truNguoc(a,b)]); if(sa===t || sa<1000) sa=truQuenMuon(a,b); }
     return {a:a, b:b, c:cong, r:dung ? t : sa, d:dung}; };
    var txt=function(s){ return sx(s.a)+(s.c ? ' + ' : MINUS)+sx(s.b)+' = '+sx(s.r); };
    if(lv<=2){ var cong = lv<=1, dung=Math.random()<0.5, s=one(cong, dung);
     return {type:'mcq', cot:2, _lv:lv, _s:JSON.stringify(s), _dung:dung?'Đúng':'Sai', q:'<div>Bé xem phép tính sau đúng hay sai:</div>'+bt20(txt(s)), choices:['Đúng','Sai'], correct:dung?0:1, sai:(dung?{'1':cong?'quen-nho':'quen-muon'}:{'0':cong?'quen-nho':'quen-muon'}), goiY:gy()}; }
    var ss=[one(true,true), one(true,true), one(false,true), one(false,true)], bad=rnd(0,3), kk;
    ss[bad]=one(bad<2, false); var tx=ss.map(txt), D=tx[bad], ord=shuffle(tx.slice()), sai={}; ord.forEach(function(c,i){ if(c!==D) sai[String(i)]='quen-nho'; });
    return {type:'mcq', cot:1, _lv:3, _s:JSON.stringify(ss), _dung:D, q:'<div>Có đúng một phép tính <b>sai</b>. Bé chọn phép tính sai nhé!</div>', choices:ord, correct:ord.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q)) return false; var s=JSON.parse(q._s), ok=function(x){ return x.r===(x.c ? x.a+x.b : x.a-x.b); }, txt=function(x){ return sx(x.a)+(x.c ? ' + ' : MINUS)+sx(x.b)+' = '+sx(x.r); };
    if(q._lv<=2){ if(q.choices.length!==2 || q.q.indexOf(txt(s))<0 || s.a<10000 || s.r<=0 || s.r>99999) return false; if((q._lv<=1)!==s.c) return false; return (q._dung==='Đúng')===ok(s); }
    if(s.length!==4 || q.choices.length!==4) return false; var bad=s.filter(function(x){ return !ok(x); }); if(bad.length!==1 || q._dung!==txt(bad[0])) return false; return s.every(function(x){ return q.choices.indexOf(txt(x))>=0 && x.a>=10000 && x.r>0 && x.r<=99999; }); }},

  /* D4 — Đặt tính cộng */
  {name:'Đặt tính cộng', sec:'Bài 3 — 8 563 + 7 284 = 15 847; 42 758 + 9 235 = 51 993', mt:['MT2'], levels:3,
   muc:['Hai số bốn chữ số, tổng năm chữ số (8 563 + 7 284).', 'Số năm chữ số cộng số bốn chữ số (42 758 + 9 235).', 'Hai số năm chữ số, nhớ nhiều lần.'],
   make:function(lv){
    var p = lv<=1 ? capCong(4,4,pick([1,2,3]),10000) : (lv===2 ? capCong(5,4,pick([2,3])) : capCong(5,5,pick([3,4]))), t=p.a+p.b;
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'tong'}, q:congDoc(p.a,p.b,{an:'tong'})+'<div>Đặt tính rồi tính tổng của hai số.</div>', ans:t, sai:nhanSai([[tongKhongNho(p.a,p.b),'quen-nho'],[tongNhoSai(p.a,p.b),'nho-sai-hang'],[t+10,'nham-bang'],[t-100,'nham-bang'],[t+1000,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemCongDoc(q) || q.ans!==p.a+p.b) return false; var k=soNhoCong(p.a,p.b);
    if(q._lv<=1) return p.a>=1000 && p.a<10000 && p.b>=1000 && p.b<10000 && p.a+p.b>=10000; if(q._lv===2) return p.a>=10000 && p.b>=1000 && p.b<10000 && k>=2; return p.a>=10000 && p.b>=10000 && k>=3; }},

  /* D5 — Đặt tính trừ */
  {name:'Đặt tính trừ', sec:'Bài 3 — 32 679 − 946 = 31 733; 83 627 − 76 253 = 7 374', mt:['MT2'], levels:3,
   muc:['Số năm chữ số trừ số ba chữ số (32 679 − 946).', 'Hai số năm chữ số, mượn nhiều lần (83 627 − 76 253).', 'Mượn qua chữ số 0.'],
   make:function(lv){
    var p = lv<=1 ? capTru(5,3,[1,2]) : (lv===2 ? capTru(5,5,[2,3]) : capTru(5,pick([3,4,5]),[2,3,4],true)), t=p.a-p.b;
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'hieu'}, q:truDoc(p.a,p.b,{an:'hieu'})+'<div>Đặt tính rồi tính hiệu của hai số.</div>', ans:t, sai:nhanSai([[truNguoc(p.a,p.b),'tru-nguoc'],[truQuenMuon(p.a,p.b),'quen-muon'],[p.a-p.b*10,'dat-lech-hang'],[t+10,'nham-bang'],[t-100,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemTruDoc(q) || p.a<10000 || q.ans!==p.a-p.b) return false; var k=soMuon(p.a,p.b);
    if(q._lv<=1) return p.b>=100 && p.b<1000 && k>=1 && k<=2; if(q._lv===2) return p.b>=10000 && k>=2 && k<=3; return k>=2 && String(p.a).slice(1).indexOf('0')>=0; }},

  /* D6 — Cửa hàng xăng */
  {name:'Cửa hàng xăng', sec:'Bài 4 — cửa hàng xăng có 16 500 l, nhập thêm 9 000 l, bán 17 350 l: còn 8 150 l', mt:['MT3'], levels:3,
   muc:['Nhập thêm: có tất cả bao nhiêu lít.', 'Bán: còn lại bao nhiêu lít.', 'Nhập thêm rồi bán: còn lại bao nhiêu lít.'],
   make:function(lv){
    var a, b=0, c=0, ops, ans, q, g;
    if(lv<=1){ a=rnd(100,600)*50; b=rnd(40,300)*50; ops=[b]; ans=a+b; q='<div>Cửa hàng xăng có <b>'+sx(a)+' l</b> xăng. Cửa hàng nhập thêm <b>'+sx(b)+' l</b>. Cửa hàng có tất cả bao nhiêu lít xăng?</div>'; }
    else if(lv===2){ a=rnd(300,900)*50; c=rnd(100,Math.floor(a/50)-40)*50; ops=[-c]; ans=a-c; q='<div>Cửa hàng xăng có <b>'+sx(a)+' l</b> xăng. Cửa hàng bán <b>'+sx(c)+' l</b>. Cửa hàng còn lại bao nhiêu lít xăng?</div>'; }
    else { for(g=0; g<500; g++){ a=rnd(200,700)*50; b=rnd(100,400)*50; c=rnd(Math.floor(a/50)+10, Math.floor((a+b)/50)-30)*50; if(c>a && a+b-c>=1500) break; } ops=[b,-c]; ans=a+b-c; q='<div>Cửa hàng xăng có <b>'+sx(a)+' l</b> xăng. Cửa hàng nhập thêm <b>'+sx(b)+' l</b>, rồi bán <b>'+sx(c)+' l</b>. Cửa hàng còn lại bao nhiêu lít xăng?</div>'; }
    return {type:'num', _lv:lv, _a:a, _b:b, _c:c, q:khungHinh(soDoXang(a, ops, lv<=1 ? 'Có tất cả' : 'Còn lại').replace(/<\/svg>$/,''))+q, ans:ans, sai:nhanSai([[a+b+c,'cong-thay-tru'],[a+b,'thieu-buoc'],[Math.abs(a-c),'thieu-buoc'],[ans+100,'nham-bang'],[ans-1000,'nham-bang'],[lv<=1 ? Math.abs(a-b) : a+c,'cong-thay-tru']], ans), goiY:gy()};
  }, check:function(q){ var t=docXang(q.q); if(!t) return false; var a=t.a, ops=t.ops, ans=ops.reduce(function(s,x){ return s+x; }, a);
    if(q.ans!==ans || ans<1500 || ans>99999 || q.q.indexOf('<b>'+sx(a)+' l</b>')<0 || a!==q._a) return false; if(!ops.every(function(o){ return q.q.indexOf('<b>'+sx(Math.abs(o))+' l</b>')>=0 && Math.abs(o)%50===0; })) return false;
    if(q._lv<=1) return ops.length===1 && ops[0]>0 && q._b===ops[0]; if(q._lv===2) return ops.length===1 && ops[0]<0 && q._c===-ops[0]; return ops.length===2 && ops[0]>0 && ops[1]<0 && -ops[1]>a && q._b===ops[0] && q._c===-ops[1]; }},

  /* D7 — Biểu thức ba số hạng */
  {name:'Biểu thức ba số hạng', sec:'Bài 5 — 8 647 + 6 500 − 13 217 = 1 930', mt:['MT3'], levels:3,
   muc:['a + b − c với số tròn trăm.', 'Số bốn chữ số + tròn trăm − số năm chữ số (8 647 + 6 500 − 13 217).', 'Ba số năm chữ số.'],
   make:function(lv){
    var a, b, c, g;
    for(g=0; g<2000; g++){
     if(lv<=1){ a=rnd(20,90)*100; b=rnd(20,90)*100; c=rnd(10,Math.floor((a+b)/100)-5)*100; }
     else if(lv===2){ a=rnd(2000,9999); b=rnd(30,90)*100; c=rnd(10001,19999); }
     else { a=rnd(20000,60000); b=rnd(10000,40000); c=rnd(10000,a+b-1000); }
     if(a+b-c>=1000 && a+b<=99999 && a+b-c<=99999 && (lv>=2 || (a%1000!==0 && b%1000!==0))) break;
    }
    var e=bt3(a,b,c,'p'), ans=e.val;
    return {type:'num', _lv:lv, _a:a, _b:b, _c:c, q:'<div>Tính giá trị của biểu thức:</div>'+bt20(e.txt+' = ?'), ans:ans, sai:nhanSai([[a+b+c,'cong-thay-tru'],[tongKhongNho(a,b)-c,'quen-nho'],[c-a+b,'sai-thu-tu-tinh'],[ans+100,'nham-bang'],[ans-10,'nham-bang'],[a+b,'thieu-buoc']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, c=q._c, e=bt3(a,b,c,'p'); if(q.ans!==e.val || e.val<1000 || a+b>99999 || q.q.indexOf(e.txt)<0) return false;
    if(q._lv<=1) return a%100===0 && b%100===0 && c%100===0 && a<10000 && b<10000; if(q._lv===2) return a>=2000 && a<10000 && b%100===0 && c>=10000 && c<20000; return a>=20000 && b>=10000 && c>=10000; }},

  /* D8 — Biểu thức có ngoặc */
  {name:'Biểu thức có dấu ngoặc', sec:'Bài 5 — 15 654 − (7 460 + 2 140) = 6 054', mt:['MT3'], levels:3,
   muc:['a − (b + c), số bốn chữ số.', 'a − (b + c), số năm chữ số (15 654 − (7 460 + 2 140)).', 'a − (b − c), số lớn.'],
   make:function(lv){
    var a, b, c, g, k = lv<=2 ? 'n1' : 'n2';
    for(g=0; g<2000; g++){
     if(lv<=1){ a=rnd(5000,9990); b=rnd(1000,4000); c=rnd(500,3000); }
     else if(lv===2){ a=rnd(10001,30000); b=rnd(3000,9000); c=rnd(1000,5000); }
     else { a=rnd(30000,90000); b=rnd(20000,60000); c=rnd(1000,19000); }
     var e0=bt3(a,b,c,k); if(e0.val>=500 && e0.val<=99999 && e0.naive>0 && e0.naive!==e0.val && (k==='n1' ? b+c<a : (b>c && a>b-c)) && a<=99999) break;
    }
    var e=bt3(a,b,c,k), ans=e.val;
    return {type:'num', _lv:lv, _k:k, _a:a, _b:b, _c:c, q:'<div>Tính giá trị của biểu thức:</div>'+bt20(e.txt+' = ?'), ans:ans, sai:nhanSai([[e.naive,'bo-ngoac'],[ans+100,'nham-bang'],[ans-10,'nham-bang'],[a-b,'thieu-buoc']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, c=q._c, e=bt3(a,b,c,q._k); if(q.ans!==e.val || e.val<500 || e.naive===e.val || e.naive<=0 || q.q.indexOf(e.txt)<0) return false;
    if(q._lv<=1) return q._k==='n1' && a<10000 && b+c<a; if(q._lv===2) return q._k==='n1' && a>=10000 && b+c<a; return q._k==='n2' && b>c && a>=30000; }},

  /* D9 — Tìm số hạng, số bị trừ */
  {name:'Tìm số hạng, số bị trừ', sec:'Dạng thêm (không có trong SGK) — ? + 2 000 = 7 000; ? − 827 = 1 557', mt:['MT2'], levels:3,
   muc:['Tìm số hạng chưa biết (số tròn nghìn).', 'Tìm số bị trừ (? − 827 = 1 557).', 'Số năm chữ số: tìm số hạng, số bị trừ hoặc số trừ.'],
   make:function(lv){
    var x, y, s, ex, ans, kd;
    if(lv<=1){ do { x=rnd(2,50)*1000; y=rnd(1,40)*1000; } while(x+y>99000); s=x+y; kd='cong'; ex = Math.random()<0.5 ? '? + '+sx(y)+' = '+sx(s) : sx(y)+' + ? = '+sx(s); ans=x; }
    else if(lv===2){ do { x=rnd(1000,9999); y=rnd(100,999); } while(x<=y || x%100===0 || y%100===0); s=x-y; kd='tru'; ex='? − '+sx(y)+' = '+sx(s); ans=x; }
    else { kd=pick(['cong','tru','sotru']); do { x=rnd(10000,70000); y=rnd(10000,29000); } while(x+y>99999 || x<=y);
     if(kd==='cong'){ s=x+y; ex='? + '+sx(y)+' = '+sx(s); ans=x; } else if(kd==='tru'){ s=x-y; ex='? − '+sx(y)+' = '+sx(s); ans=x; } else { s=x-y; ex=sx(x)+' − ? = '+sx(s); ans=y; } }
    return {type:'num', _lv:lv, _kd:kd, _x:x, _y:y, _s:s, q:'<div>Tìm số ở ô <b class="text-amber-700">?</b></div>'+bt20(ex), ans:ans, sai:nhanSai([[kd==='cong' ? s+y : (kd==='tru' ? s-y : x+s),'cong-thay-tru'],[s,'cong-thay-tru'],[ans+10,'nham-bang'],[ans-100,'nham-bang'],[kd==='sotru' ? x+s : y,'cong-thay-tru']], ans), goiY:gy()};
  }, check:function(q){ var x=q._x, y=q._y, s=q._s, kd=q._kd, ex = kd==='cong' ? '? + '+sx(y)+' = '+sx(s) : (kd==='tru' ? '? − '+sx(y)+' = '+sx(s) : sx(x)+' − ? = '+sx(s)); var okx = kd==='cong' ? x+y===s : x-y===s;
    if(!okx || x<1 || y<1 || s<1 || s>99999 || q.ans!==(kd==='sotru' ? y : x)) return false; if(q.q.indexOf(ex)<0 && !(q._lv<=1 && q.q.indexOf(sx(y)+' + ? = '+sx(s))>=0)) return false;
    if(q._lv<=1) return kd==='cong' && x%1000===0 && y%1000===0; if(q._lv===2) return kd==='tru' && x<10000 && y<1000; return x>=10000 && y>=10000; }},

  /* D10 — Bạn An làm */
  {name:'Bạn An làm', sec:'Dạng thêm (không có trong SGK) — bạn An tính cộng hoặc trừ: em có đồng ý không, An sai ở đâu, kết quả đúng', mt:['MT2'], levels:3,
   muc:['An tính: em có đồng ý không.', 'An tính sai: An sai ở đâu.', 'An tính sai: kết quả đúng là bao nhiêu.'],
   make:function(lv){
    var cong=Math.random()<0.5, p, kind, sa, t, g, other, sym = cong ? ' + ' : MINUS;
    for(g=0; g<1200; g++){
     if(cong){ p=capCong(5,5,rnd(1,4)); t=p.a+p.b; kind=pick(['quen-nho','nho-sai-hang']); sa = kind==='quen-nho' ? tongKhongNho(p.a,p.b) : tongNhoSai(p.a,p.b); other = kind==='quen-nho' ? tongNhoSai(p.a,p.b) : tongKhongNho(p.a,p.b); }
     else { p=capTru(5,5,[1,2,3,4]); t=p.a-p.b; kind=pick(['quen-muon','tru-nguoc']); sa = kind==='quen-muon' ? truQuenMuon(p.a,p.b) : truNguoc(p.a,p.b); other = kind==='quen-muon' ? truNguoc(p.a,p.b) : truQuenMuon(p.a,p.b); }
     if(sa!==t && sa>=1000 && (lv<=1 || sa!==other)) break; }
    var dung=Math.random()<0.5, an=(lv<=1 && dung) ? t : sa, base=cong ? 'quen-nho' : 'quen-muon';
    var mo=nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+sx(p.a)+sym+sx(p.b)+' = '+sx(an)+'</b>»'+(lv>=2 ? '. An tính sai rồi!' : '.')+'</div>';
    if(lv<=1){ var D=(an===t) ? 'Đồng ý' : 'Không đồng ý'; return {type:'mcq', cot:2, _lv:1, _c:cong?1:0, _a:p.a, _b:p.b, _an:an, _dung:D, q:mo+'<div>Em có đồng ý với An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:(an===t?0:1), sai:(an===t?{'1':base}:{'0':base}), goiY:gy()}; }
    if(lv===2){ var ks = cong ? ['quen-nho','nho-sai-hang','dat-lech-hang'] : ['quen-muon','tru-nguoc','dat-lech-hang'], ch=shuffle(ks.slice()).map(function(k){ return TEN_LOI[k]; }), D2=TEN_LOI[kind], sai={}; ch.forEach(function(c,i){ if(c!==D2) sai[String(i)]=ks.filter(function(k){ return TEN_LOI[k]===c; })[0]; });
      return {type:'mcq', cot:1, _lv:2, _c:cong?1:0, _a:p.a, _b:p.b, _an:an, _kind:kind, _dung:D2, q:mo+'<div>An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(D2), sai:sai, goiY:gy()}; }
    return {type:'num', _lv:3, _c:cong?1:0, _a:p.a, _b:p.b, _an:an, _kind:kind, q:mo+'<div>Kết quả đúng của phép tính là bao nhiêu?</div>', ans:t, sai:nhanSai([[an,kind],[cong ? tongKhongNho(p.a,p.b) : truNguoc(p.a,p.b),cong ? 'quen-nho' : 'tru-nguoc'],[t+10,'nham-bang'],[t-100,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, cong=q._c===1, t = cong ? a+b : a-b, an=q._an, sym = cong ? ' + ' : MINUS; if(a<10000 || b<10000 || t<=0 || t>99999 || q.q.indexOf(sx(a)+sym+sx(b)+' = '+sx(an))<0) return false;
    var saiTinh=function(k){ return k==='quen-nho' ? tongKhongNho(a,b) : (k==='nho-sai-hang' ? tongNhoSai(a,b) : (k==='quen-muon' ? truQuenMuon(a,b) : truNguoc(a,b))); };
    if(q._lv<=1) return kiemMCQ(q) && q.choices.length===2 && (q._dung==='Đồng ý')===(an===t) && (an===t || (cong ? (an===tongKhongNho(a,b) || an===tongNhoSai(a,b)) : (an===truQuenMuon(a,b) || an===truNguoc(a,b))));
    var okk = cong ? (q._kind==='quen-nho' || q._kind==='nho-sai-hang') : (q._kind==='quen-muon' || q._kind==='tru-nguoc'); if(!okk) return false; var sa=saiTinh(q._kind); if(an!==sa || sa===t) return false;
    if(q._lv===2) return kiemMCQ(q) && q.choices.length===3 && q._dung===TEN_LOI[q._kind]; return q.ans===t; }}
 ]
};
