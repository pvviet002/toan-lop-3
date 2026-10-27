/* bai-56.js — Bài 56: Nhân số có bốn chữ số với số có một chữ số (Tập 2, Chủ đề 10). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-56.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mới, mã tự dựng): nhanDoc4 (phép nhân cột dọc đến bốn chữ số, dựng từ nhanDoc bài 41), chuoiTinh (dãy phép tính), taHinh (đòn tạ), khuDat (khu đất vuông).
   Mọi tích <= 9999. Dạng «chữ số bị che» kiểm bằng máy rằng đáp án duy nhất (soNghiem). check() đọc lại hình từ chuỗi SVG (data-pt, data-dai, data-ta, data-a) và tính lại.
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

/* ---- Phép nhân số bốn chữ số với số có một chữ số ---- */
function soNhoNhan(a, b){ var c=0, k=0, i, t; for(i=0;i<4;i++){ t=cotSo(a,i)*b+c; c=Math.floor(t/10); if(c>0) k++; } return k; }
function demKhongA(a){ return (String(a).match(/0/g)||[]).length; }
/* quên nhớ: chỉ viết chữ số đơn vị của tích từng hàng */
function nhanKhongNho(a, b){ var r=0, i; for(i=3;i>=0;i--) r=r*10+(cotSo(a,i)*b)%10; return r; }
/* bỏ sót chữ số 0 của thừa số: nhân số đã bỏ chữ số 0 */
function nhanBoKhong(a, b){ return +String(a).replace(/0/g,'')*b; }
function chuSoNhan4(a, b, tuy){
 tuy=tuy||{}; var X=[40,78,116,154], it=[], da=String(a), dp=String(a*b), i;
 for(i=0;i<da.length;i++){ var ia=da.length-1-i; it.push({id:'a'+ia, x:X[4-da.length+i], y:52, ch:(tuy.anA===ia) ? '?' : da.charAt(i)}); }
 it.push({id:'b0', x:X[3], y:100, ch:String(b)});
 if(tuy.an==='tich') it.push({id:'p', x:X[1], y:160, ch:'?', rong:true});
 else for(i=0;i<dp.length;i++){ var ip=dp.length-1-i; it.push({id:'p'+ip, x:X[4-dp.length+i], y:160, ch:(tuy.anP===ip) ? '?' : dp.charAt(i)}); }
 return it;
}
function nhanDoc4(a, b, tuy){
 var it=chuSoNhan4(a,b,tuy), s=svgX(180,178,180);
 it.forEach(function(e){
  if(e.ch==='?' && e.rong) s+='<rect x="22" y="126" width="152" height="46" rx="8" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
  else if(e.ch==='?') s+='<rect x="'+(e.x-17)+'" y="'+(e.y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
  s+='<text data-pt="'+e.id+'" x="'+e.x+'" y="'+e.y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(e.ch==='?' ? HM.hoi : 'currentColor')+'">'+e.ch+'</text>';
 });
 s+='<text x="12" y="100" text-anchor="middle" font-size="30" '+HFONT+' fill="currentColor">&#215;</text><line x1="22" y1="114" x2="174" y2="114" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
 return khungHinh(s);
}
function kiemNhanDoc4(q){ var p=q._pt, it=chuSoNhan4(p.a,p.b,p), d=docPT(q.q), want={}; it.forEach(function(e){ want[e.id]=e.ch; }); var ids=Object.keys(want);
 return p.a>=1000 && p.a<=9999 && p.b>=2 && p.b<=9 && p.a*p.b<=9999 && ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; }); }
/* cặp (a, b): a bốn chữ số, tích <= 9999, số lần nhớ thuộc ks, số chữ số 0 của a thuộc zs (nếu có) */
function capNhan(ks, zs, bs){
 for(var g=0; g<8000; g++){
  var b=pick(bs||[2,3,4,5,6,7,8,9]), a=rnd(1000, Math.floor(9999/b)); if(a*b>9999) continue; if(ks.indexOf(soNhoNhan(a,b))<0) continue; if(zs && zs.indexOf(demKhongA(a))<0) continue; return {a:a, b:b};
 }
 return {a:1225, b:3};
}
/* số nghiệm chữ số d (0 đến 9) thay cho ô ? ở hàng pos của a sao cho a' × b khớp mẫu tích (chuỗi có thể có ?) */
function soNghiem(aStr, pStr, b){
 var cnt=0, d, i, A, P, ok;
 for(d=0; d<=9; d++){
  A=aStr.replace('?', String(d)); if(A.charAt(0)==='0') continue; P=String(+A*b); if(P.length!==pStr.length) continue; ok=true;
  for(i=0;i<P.length;i++) if(pStr.charAt(i)!=='?' && pStr.charAt(i)!==P.charAt(i)) ok=false;
  if(ok) cnt++;
 }
 return cnt;
}
/* chuỗi phép tính: số đầu, rồi các phép (×, − ) nối tiếp; hiện số cuối là ? */
function chuoiTinh(start, ops){
 var n=ops.length+1, s=svgX(260, n*48+8, 260).replace('<svg ','<svg data-dai="'+start+'|'+ops.map(function(o){ return o.k+o.v; }).join('|')+'" '), v=start, i;
 for(i=0;i<n;i++){
  var y=6+i*48, an=(i===n-1);
  s+='<rect x="50" y="'+y+'" width="110" height="34" rx="9" fill="'+(an ? 'none' : HM.troi)+'" '+(an ? 'stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"' : '')+'/><text x="105" y="'+(y+25)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="'+(an ? HM.hoi : HM.chu)+'">'+(an ? '?' : sx(v))+'</text>';
  if(i<n-1){ s+='<line x1="105" y1="'+(y+36)+'" x2="105" y2="'+(y+46)+'" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M99 '+(y+40)+' L105 '+(y+47)+' L111 '+(y+40)+'" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><text x="176" y="'+(y+43)+'" font-size="18" '+HFONT+' fill="currentColor">'+ops[i].k+' '+ops[i].v+'</text>'; v = ops[i].k==='×' ? v*ops[i].v : v-ops[i].v; }
 }
 return s;
}
function docChuoi(html){ var m=/data-dai="(\d+)\|([^"]*)"/.exec(html); if(!m) return null; var ops=m[2].split('|').map(function(t){ return {k:t.charAt(0), v:+t.slice(1)}; }); return {start:+m[1], ops:ops}; }
function giaTriChuoi(c){ var v=c.start; c.ops.forEach(function(o){ v = o.k==='×' ? v*o.v : v-o.v; }); return v; }
/* tạ: mỗi bên đĩa 1 000 g (lớn), 500 g (vừa), 100 g (nhỏ); hai bên giống nhau */
function taHinh(n1, n2, n3){
 var s=svgX(300,150,300).replace('<svg ','<svg data-ta="'+n1+','+n2+','+n3+'" '), seq=[], i, xL=140, xR=160;
 for(i=0;i<n1;i++) seq.push([1000,64,10,HM.do]); for(i=0;i<n2;i++) seq.push([500,46,9,HM.cam]); for(i=0;i<n3;i++) seq.push([100,30,8,HM.vang]);
 s+='<rect x="20" y="52" width="260" height="8" rx="4" fill="'+HM.xam+'" stroke="'+HM.goDam+'" stroke-width="2"/>';
 var xl=148, xr=152;
 seq.forEach(function(p){ xl-=p[2]+3; s+='<rect x="'+xl+'" y="'+(56-p[1]/2)+'" width="'+p[2]+'" height="'+p[1]+'" rx="2" fill="'+p[3]+'" stroke="'+HM.goDam+'" stroke-width="1.5"/>'; });
 seq.forEach(function(p){ s+='<rect x="'+xr+'" y="'+(56-p[1]/2)+'" width="'+p[2]+'" height="'+p[1]+'" rx="2" fill="'+p[3]+'" stroke="'+HM.goDam+'" stroke-width="1.5"/>'; xr+=p[2]+3; });
 [[HM.do,'1 000 g',22],[HM.cam,'500 g',112],[HM.vang,'100 g',190]].forEach(function(l){ s+='<rect x="'+l[2]+'" y="112" width="14" height="24" rx="2" fill="'+l[0]+'" stroke="'+HM.goDam+'" stroke-width="1.5"/><text x="'+(l[2]+22)+'" y="130" font-size="15" '+HFONT+' fill="currentColor">'+l[1]+'</text>'; });
 return s;
}
function docTa(html){ var m=/data-ta="(\d+),(\d+),(\d+)"/.exec(html); return m ? {n1:+m[1], n2:+m[2], n3:+m[3]} : null; }
function khuDat(a){
 var s=svgX(260,150,260).replace('<svg ','<svg data-a="'+a+'" ');
 s+='<rect x="70" y="28" width="100" height="100" fill="'+HM.la+'" stroke="'+HM.goDam+'" stroke-width="5" stroke-linejoin="round"/><text x="120" y="20" text-anchor="middle" font-size="16" '+HFONT+' fill="currentColor">'+sx(a)+' m</text>';
 return s;
}
function docKhu(html){ var m=/data-a="(\d+)"/.exec(html); return m ? +m[1] : null; }
var GOI={'quen-nho':'Nhân ở một hàng được số có hai chữ số thì viết chữ số đơn vị, NHỚ chữ số chục sang hàng bên trái.',
  'nho-sai-hang':'Số nhớ cộng vào hàng liền bên trái.',
  'bo-so-0':'Chữ số 0 của thừa số vẫn có hàng: 0 × số = 0, rồi cộng thêm số nhớ (nếu có) và viết ở hàng đó.',
  'nham-hang':'Bé nhẩm theo nghìn, theo trăm rồi viết đủ chữ số 0: 2 nghìn × 3 = 6 nghìn = 6 000.',
  'sai-thu-tu-tinh':'Bé làm lần lượt từng phép tính theo mũi tên, từ trên xuống dưới.',
  'quen-nhan-bon':'Hình vuông có bốn cạnh bằng nhau, nên chu vi bằng cạnh × 4.',
  'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!',
  'dem-sot-dia':'Hai bên đòn tạ có các đĩa giống nhau. Bé tính một bên rồi nhân 2 để được cả hai bên.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
var TEN_LOI={'quen-nho':'Quên nhớ khi nhân', 'bo-so-0':'Bỏ sót chữ số 0 của thừa số', 'nho-sai-hang':'Cộng số nhớ vào sai hàng'};

var BAI = {
 n: 56,
 title: 'Nhân Số Có Bốn Chữ Số Với Số Có Một Chữ Số',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-nho':'Quên nhớ', 'nho-sai-hang':'Nhớ nhầm hàng', 'bo-so-0':'Bỏ sót chữ số 0', 'nham-hang':'Nhầm hàng khi nhẩm số tròn', 'sai-thu-tu-tinh':'Làm sai thứ tự phép tính', 'quen-nhan-bon':'Chu vi hình vuông: quên nhân 4', 'thieu-buoc':'Thiếu một bước', 'dem-sot-dia':'Quên nhân đôi (hai bên đòn tạ)'},
 muctieu: [
  {id:'MT1', ten:'Nhân có nhớ (đặt tính)', muc:['Không nhớ hoặc nhớ một lần (1 034 × 2, 1 225 × 3); thừa số có một chữ số 0 (1 014 × 5).', 'Nhớ hai lần (1 216 × 6); thừa số có chữ số 0 và nhớ (2 051 × 4).', 'Nhớ ba lần; thừa số có hai chữ số 0 (1 008 × 9); bạn An quên nhớ hoặc bỏ sót chữ số 0.']},
  {id:'MT2', ten:'Nhẩm, dãy phép tính, tìm chữ số bị che', muc:['2 000 × 3; một phép tính trong dãy (805 × 2); chữ số bị che trong tích.', '3 000 × 3; dãy hai phép (× 2 rồi − 200); chữ số bị che trong thừa số.', '1 500 × 2; dãy ba phép (× 2, − 200, × 3); hai chữ số bị che, đáp án duy nhất.']},
  {id:'MT3', ten:'Toán đố (chu vi, gấp lên, hai bước)', muc:['Ba tàu mỗi tàu 3 050 l; chu vi khu đất vuông (một nhớ); tạ: mỗi bên nặng bao nhiêu gam.', 'Bốn trung đoàn mỗi trung đoàn 1 300 người; chu vi khu đất (nhớ hai lần); tạ: nâng được bao nhiêu gam.', 'Thêm 450 người (hai bước); chu vi khu đất (nhớ ba lần); tạ có nhiều đĩa.']}
 ],
 topics: [
  /* D1 — Đặt tính nhân, điền một chữ số (khám phá, bài 1) */
  {name:'Đặt tính nhân, điền một chữ số', sec:'Khám phá, bài 1 — 1 034 × 2 = 2 068; 1 225 × 3 = 3 675: điền chữ số ở ô ?', mt:['MT1'], levels:3,
   muc:['Không nhớ hoặc nhớ một lần: điền một chữ số của tích.', 'Nhớ hai lần: điền một chữ số của tích.', 'Nhớ ba lần: điền một chữ số của tích.'],
   make:function(lv){
    var p = lv<=1 ? capNhan([0,1]) : (lv===2 ? capNhan([2]) : capNhan([3])), t=String(p.a*p.b), pos=[], i;
    for(i=0;i<t.length;i++) if(t.charAt(i)!=='0') pos.push(t.length-1-i);
    var an=pick(pos), ans=cotSo(p.a*p.b, an);
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,anP:an}, q:nhanDoc4(p.a,p.b,{anP:an})+'<div>Chữ số ở ô <b class="text-amber-700">?</b> của tích là mấy?</div>', ans:ans, sai:nhanSai([[ans+1,'nho-sai-hang'],[ans-1,'quen-nho'],[(cotSo(p.a,an)*p.b)%10,'quen-nho'],[ans+2,'quen-nho']], ans), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemNhanDoc4(q)) return false; var k=soNhoNhan(p.a,p.b); if(q.ans!==cotSo(p.a*p.b,p.anP) || q.ans<=0) return false; return q._lv<=1 ? k<=1 : k===q._lv+0 ; }},

  /* D2 — Đặt tính nhân, điền tích (bài 1, 3) */
  {name:'Đặt tính nhân, điền tích', sec:'Bài 1, 3 — 1 034 × 2 = 2 068; 3 148 × 2 = 6 296; 1 216 × 6 = 7 296; 1 408 × 7 = 9 856', mt:['MT1'], levels:3,
   muc:['Không nhớ hoặc nhớ một lần: tìm tích.', 'Nhớ hai lần: tìm tích.', 'Nhớ ba lần: tìm tích.'],
   make:function(lv){
    var p = lv<=1 ? capNhan([0,1]) : (lv===2 ? capNhan([2]) : capNhan([3])), t=p.a*p.b;
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'tich'}, q:nhanDoc4(p.a,p.b,{an:'tich'})+'<div>Tính tích của hai số.</div>', ans:t, sai:nhanSai([[nhanKhongNho(p.a,p.b),'quen-nho'],[t+10,'nho-sai-hang'],[t-100,'nho-sai-hang'],[p.a+p.b,'thieu-buoc'],[t+1000,'nho-sai-hang']], t), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemNhanDoc4(q)) return false; var k=soNhoNhan(p.a,p.b); return q.ans===p.a*p.b && (q._lv<=1 ? k<=1 : k===q._lv); }},

  /* D3 — Thừa số có chữ số 0 (bài 1, 3) */
  {name:'Thừa số có chữ số 0', sec:'Bài 1, 3 — 1 014 × 5 = 5 070; 2 051 × 4 = 8 204; 1 021 × 9 = 9 189; 1 008 × 9 = 9 072', mt:['MT1'], levels:3,
   muc:['Thừa số có một chữ số 0, không nhớ hoặc nhớ một lần (1 014 × 5).', 'Thừa số có một chữ số 0, nhớ từ hai lần (2 051 × 4).', 'Thừa số có hai chữ số 0 (1 008 × 9).'],
   make:function(lv){
    var p = lv<=1 ? capNhan([0,1,2],[1]) : (lv===2 ? capNhan([2,3],[1]) : capNhan([0,1,2],[2])), t=p.a*p.b;
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'tich'}, q:nhanDoc4(p.a,p.b,{an:'tich'})+'<div>Tính tích của hai số.</div>', ans:t, sai:nhanSai([[nhanBoKhong(p.a,p.b),'bo-so-0'],[nhanKhongNho(p.a,p.b),'quen-nho'],[t+10,'nho-sai-hang'],[t-100,'nho-sai-hang'],[t+1000,'nho-sai-hang']], t), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemNhanDoc4(q) || q.ans!==p.a*p.b) return false; var z=demKhongA(p.a), k=soNhoNhan(p.a,p.b); if(q._lv<=1) return z===1 && k<=2; if(q._lv===2) return z===1 && k>=2; return z===2; }},

  /* D4 — Nhẩm tròn nghìn (bài 2) */
  {name:'Nhẩm tròn nghìn', sec:'Bài 2 — 2 nghìn × 3 = 6 nghìn: 2 000 × 3 = 6 000; 4 000 × 2; 3 000 × 3; 2 000 × 4', mt:['MT2'], levels:3,
   muc:['Tích đến 6 nghìn (2 000 × 3).', 'Tích 7 nghìn hoặc 8 nghìn (2 000 × 4).', 'Tích 9 nghìn hoặc số tròn nghìn rưỡi (1 500 × 4).'],
   make:function(lv){
    var a, b;
    if(lv<=1){ do { a=rnd(1,4)*1000; b=rnd(2,4); } while(a*b>6000); }
    else if(lv===2){ do { a=rnd(1,4)*1000; b=rnd(2,8); } while(a*b<7000 || a*b>8000); }
    else if(Math.random()<0.5){ a=pick([1000,3000]); b = a===1000 ? 9 : 3; } else { a=pick([1500,2500]); b=rnd(2,3); }
    var ans=a*b;
    return {type:'num', _lv:lv, _a:a, _b:b, q:'<div>Tính nhẩm:</div>'+bieuThucTo(sx(a)+' × '+b+' = ?'), ans:ans, sai:nhanSai([[a/1000*b,'nham-hang'],[ans/10,'nham-hang'],[ans*10,'nham-hang'],[ans+1000,'nham-hang'],[ans-1000,'nham-hang']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(q.ans!==a*b || a*b>9999 || b<2 || q.q.indexOf(sx(a)+' × '+b)<0) return false; if(q._lv<=1) return a%1000===0 && a*b<=6000; if(q._lv===2) return a%1000===0 && a*b>=7000 && a*b<=8000; return (a%1000===0 && a*b===9000) || (a%1000===500 && b<=3); }},

  /* D5 — Dãy phép tính (bài 4) */
  {name:'Dãy phép tính', sec:'Bài 4 — 805 → × 2 → ? → − 200 → ? → × 3 → ?: 1 610; 1 410; 4 230', mt:['MT2'], levels:3,
   muc:['Một phép tính (nhân).', 'Hai phép tính: nhân rồi trừ.', 'Ba phép tính: nhân, trừ, nhân.'],
   make:function(lv){
    var s0, ops, c, ans, g;
    for(g=0; g<200; g++){
     s0=rnd(300,999); ops=[{k:'×',v:rnd(2,4)}];
     if(lv>=2) ops.push({k:'−',v:rnd(1,5)*100}); if(lv>=3) ops.push({k:'×',v:rnd(2,3)});
     c={start:s0, ops:ops}; ans=giaTriChuoi(c); if(ans>0 && ans<=9999 && (lv<2 || s0*ops[0].v-ops[1].v>0)) break;
    }
    return {type:'num', _lv:lv, q:khungHinh(chuoiTinh(s0,ops).replace(/<\/svg>$/,''))+'<div>Làm lần lượt các phép tính theo mũi tên. Số ở ô <b class="text-amber-700">?</b> cuối cùng là bao nhiêu?</div>', ans:ans, sai:nhanSai([[s0*ops[0].v,'sai-thu-tu-tinh'],[lv>=2 ? s0*ops[0].v+ops[1].v : s0+ops[0].v,'sai-thu-tu-tinh'],[ans+10,'thieu-buoc'],[ans-100,'thieu-buoc'],[lv>=3 ? (s0*ops[0].v-ops[1].v)+ops[2].v : ans+1,'sai-thu-tu-tinh']], ans), goiY:gy()};
  }, check:function(q){ var c=docChuoi(q.q); if(!c || c.start<300 || c.start>999 || c.ops.length!==q._lv) return false; var v=c.start, i; for(i=0;i<c.ops.length;i++){ v = c.ops[i].k==='×' ? v*c.ops[i].v : v-c.ops[i].v; if(v<=0 || v>9999) return false; }
    if(c.ops[0].k!=='×' || (c.ops.length>=2 && c.ops[1].k!=='−') || (c.ops.length>=3 && c.ops[2].k!=='×')) return false; return q.ans===v; }},

  /* D6 — Tìm chữ số bị che (bài 6) */
  {name:'Tìm chữ số bị che', sec:'Bài 6 — chữ số bị che trong phép nhân (đáp án duy nhất)', mt:['MT2'], levels:3,
   muc:['Chữ số bị che nằm trong tích.', 'Chữ số bị che nằm trong thừa số.', 'Hai chữ số bị che (một ở thừa số, một ở tích): tìm chữ số ở thừa số.'],
   make:function(lv){
    var g, p, ta, anA=null, anP=null, ans;
    for(g=0; g<500; g++){
     p=capNhan([0,1,2,3]); ta=String(p.a); var tp=String(p.a*p.b), ia=pick([0,1,2,3]), ip=pick([0,1,2,3]);
     if(lv<=1){ if(tp.charAt(ip)==='0') continue; anP=3-ip; anA=null; ans=+tp.charAt(ip); break; }
     if(ta.charAt(ia)==='0') continue;
     if(lv===2){ var aStr=ta.slice(0,ia)+'?'+ta.slice(ia+1); if(soNghiem(aStr, tp, p.b)!==1) continue; anA=3-ia; anP=null; ans=+ta.charAt(ia); break; }
     if(tp.charAt(ip)==='0') continue; var aS=ta.slice(0,ia)+'?'+ta.slice(ia+1), pS=tp.slice(0,ip)+'?'+tp.slice(ip+1); if(soNghiem(aS,pS,p.b)!==1) continue; anA=3-ia; anP=3-ip; ans=+ta.charAt(ia); break;
    }
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,anA:anA===null?undefined:anA,anP:anP===null?undefined:anP}, q:nhanDoc4(p.a,p.b,{anA:anA===null?undefined:anA,anP:anP===null?undefined:anP})+'<div>'+(lv>=3 ? 'Có hai ô <b class="text-amber-700">?</b>. Chữ số ở ô <b class="text-amber-700">?</b> của <b>thừa số thứ nhất</b> là mấy?' : 'Chữ số ở ô <b class="text-amber-700">?</b> là mấy?')+'</div>', ans:ans, sai:nhanSai([[ans+1,'quen-nho'],[ans-1,'quen-nho'],[ans+2,'quen-nho'],[(ans+5)%10===0 ? 1 : (ans+5)%10,'quen-nho']], ans), goiY:gy()};
  }, check:function(q){ var p=q._pt, d=docPT(q.q), i, ha=-1, hp=-1; if(p.a<1000 || p.a>9999 || p.b<2 || p.a*p.b>9999) return false; var ta=String(p.a), tp=String(p.a*p.b);
    var aStr='', pStr=''; for(i=0;i<4;i++) aStr+=d['a'+(3-i)]; for(i=0;i<tp.length;i++) pStr+=d['p'+(tp.length-1-i)];
    if(q._lv<=1){ if(aStr!==ta || pStr.indexOf('?')<0 || (pStr.match(/\?/g)||[]).length!==1) return false; var pi=pStr.indexOf('?'); return q.ans===+tp.charAt(pi) && q.ans>0 && soNghiem(ta.slice(0,0)+ta, pStr, p.b)>=0; }
    if(aStr.indexOf('?')<0 || (aStr.match(/\?/g)||[]).length!==1) return false; var ai=aStr.indexOf('?'); if(q.ans!==+ta.charAt(ai) || q.ans<=0) return false;
    if(q._lv===2){ if(pStr!==tp) return false; return soNghiem(aStr,pStr,p.b)===1; } if((pStr.match(/\?/g)||[]).length!==1) return false; return soNghiem(aStr,pStr,p.b)===1; }},

  /* D7 — Chu vi khu đất vuông (bài 5) */
  {name:'Chu vi khu đất hình vuông', sec:'Bài 5 — khu đất hình vuông cạnh 1 617 m: chu vi 1 617 × 4 = 6 468 m', mt:['MT3'], levels:3,
   muc:['Cạnh 1 000 đến 2 499 m, nhớ không quá một lần.', 'Nhớ hai lần.', 'Nhớ ba lần.'],
   make:function(lv){
    var p = lv<=1 ? capNhan([0,1],null,[4]) : (lv===2 ? capNhan([2],null,[4]) : capNhan([3],null,[4])), ans=p.a*4;
    return {type:'num', _lv:lv, q:khungHinh(khuDat(p.a).replace(/<\/svg>$/,''))+'<div>Khu đất hình vuông có cạnh <b>'+sx(p.a)+' m</b>. Chu vi khu đất là bao nhiêu mét?</div>', ans:ans, sai:nhanSai([[p.a*2,'quen-nhan-bon'],[p.a*3,'quen-nhan-bon'],[p.a+4,'quen-nhan-bon'],[nhanKhongNho(p.a,4),'quen-nho'],[ans+10,'nho-sai-hang']], ans), goiY:gy()};
  }, check:function(q){ var a=docKhu(q.q); if(a===null || a<1000 || a*4>9999 || q.ans!==a*4 || q.q.indexOf('<b>'+sx(a)+' m</b>')<0) return false; var k=soNhoNhan(a,4); return q._lv<=1 ? k<=1 : k===q._lv; }},

  /* D8 — Ba tàu, bốn trung đoàn (bài 5) */
  {name:'Ba tàu, bốn trung đoàn', sec:'Bài 5 — ba tàu mỗi tàu 3 050 l: 9 150 l; 4 trung đoàn mỗi trung đoàn 1 300 người, thêm 450 người: 5 650 người', mt:['MT3'], levels:3,
   muc:['Ba tàu, mỗi tàu có số lít bằng nhau.', 'Bốn trung đoàn, mỗi trung đoàn có số người bằng nhau.', 'Bốn trung đoàn rồi thêm một số người (hai bước).'],
   make:function(lv){
    var a, n, extra=0, q, ans;
    if(lv<=1){ a=rnd(100,333)*10; n=3; ans=a*n; q='Có <b>'+n+' tàu</b> chở xăng, mỗi tàu chở <b>'+sx(a)+' l</b>. Cả '+n+' tàu chở bao nhiêu lít xăng?'; }
    else if(lv===2){ a=rnd(5,24)*100; n=4; ans=a*n; q='Một sư đoàn có <b>'+n+' trung đoàn</b>, mỗi trung đoàn có <b>'+sx(a)+' người</b>. Sư đoàn có bao nhiêu người?'; }
    else { a=rnd(6,23)*100; n=4; extra=rnd(1,9)*50; ans=a*n+extra; q='Một sư đoàn có <b>'+n+' trung đoàn</b>, mỗi trung đoàn có <b>'+sx(a)+' người</b>. Sư đoàn được bổ sung thêm <b>'+sx(extra)+' người</b>. Sau đó sư đoàn có bao nhiêu người?'; }
    return {type:'num', _lv:lv, _a:a, _n:n, _e:extra, q:'<div>'+q+'</div>', ans:ans, sai:nhanSai([[a+n,'thieu-buoc'],[a*n,'thieu-buoc'],[a+extra,'thieu-buoc'],[ans+100,'nho-sai-hang'],[ans-10,'nho-sai-hang']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, n=q._n, e=q._e; if(q.ans!==a*n+e || q.ans>9999 || q.q.indexOf('<b>'+sx(a)+' ')<0) return false; if(q._lv<=1) return n===3 && e===0; if(q._lv===2) return n===4 && e===0; return n===4 && e>0 && q.q.indexOf('<b>'+sx(e)+' người</b>')>=0; }},

  /* D9 — Tạ mèo và rùa (bài 7) */
  {name:'Tạ mèo và rùa', sec:'Bài 7 — đòn tạ có các đĩa 1 000 g, 500 g, 100 g; hai bên giống nhau; nâng được tổng cân nặng', mt:['MT3'], levels:3,
   muc:['Mỗi bên đòn tạ nặng bao nhiêu gam.', 'Nâng được bao nhiêu gam (cả hai bên).', 'Đòn tạ nhiều đĩa: nâng được bao nhiêu gam.'],
   make:function(lv){
    var n1, n2, n3;
    if(lv<=1){ n1=rnd(1,2); n2=rnd(0,2); n3=rnd(1,3); } else if(lv===2){ n1=rnd(1,2); n2=rnd(1,2); n3=rnd(1,3); } else { n1=rnd(2,3); n2=rnd(1,3); n3=rnd(2,3); }
    var bien=n1*1000+n2*500+n3*100, ans = lv<=1 ? bien : bien*2;
    return {type:'num', _lv:lv, q:khungHinh(taHinh(n1,n2,n3).replace(/<\/svg>$/,''))+'<div>Hai bên đòn tạ có các đĩa giống nhau như hình. '+(lv<=1 ? 'Các đĩa ở <b>một bên</b> nặng bao nhiêu gam?' : 'Người ta nâng cả đòn tạ (bỏ qua cân nặng của thanh). Đòn tạ nặng bao nhiêu gam?')+'</div>', ans:ans, sai:nhanSai([[bien,'dem-sot-dia'],[lv<=1 ? bien*2 : bien,'dem-sot-dia'],[(n1+n2+n3)*100,'thieu-buoc'],[ans+100,'thieu-buoc'],[ans-100,'thieu-buoc']], ans), goiY:gy()};
  }, check:function(q){ var t=docTa(q.q); if(!t) return false; var bien=t.n1*1000+t.n2*500+t.n3*100, e = q._lv<=1 ? bien : bien*2; if(q.ans!==e || e>9999) return false; if(q._lv<=1) return q.q.indexOf('một bên')>=0 && t.n1<=2 && t.n3>=1; if(q._lv===2) return q.q.indexOf('Đòn tạ nặng')>=0 && t.n1<=2 && t.n2>=1; return t.n1>=2 && t.n2>=1 && t.n3>=2 && q.q.indexOf('Đòn tạ nặng')>=0; }},

  /* D10 — Bạn An làm (không có trong SGK) */
  {name:'Bạn An làm', sec:'Ôn tập — bạn An tính 1 225 × 3 = 3 665: em có đồng ý không, An sai ở đâu, kết quả đúng', mt:['MT1'], levels:3,
   muc:['An tính phép nhân: em có đồng ý không.', 'An tính sai: An sai ở đâu.', 'An tính sai: kết quả đúng là bao nhiêu.'],
   make:function(lv){
    var p, kind, sa, t, g;
    for(g=0; g<800; g++){ p = Math.random()<0.5 ? capNhan([1,2,3],[1]) : capNhan([1,2,3]); t=p.a*p.b; kind = demKhongA(p.a)>0 ? pick(['quen-nho','bo-so-0']) : 'quen-nho'; sa = kind==='quen-nho' ? nhanKhongNho(p.a,p.b) : nhanBoKhong(p.a,p.b); var other = kind==='quen-nho' ? nhanBoKhong(p.a,p.b) : nhanKhongNho(p.a,p.b); if(sa!==t && sa>0 && (lv<=1 || demKhongA(p.a)===0 || sa!==other)) break; }
    var dung=Math.random()<0.5, an=(lv<=1 && dung) ? t : sa;
    var mo=nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+sx(p.a)+' × '+p.b+' = '+sx(an)+'</b>»'+(lv>=2 ? '. An tính sai rồi!' : '.')+'</div>';
    if(lv<=1){ var D=(an===t) ? 'Đồng ý' : 'Không đồng ý'; return {type:'mcq', cot:2, _lv:1, _a:p.a, _b:p.b, _an:an, _dung:D, q:mo+'<div>Em có đồng ý với An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:(an===t?0:1), sai:(an===t?{'1':'quen-nho'}:{'0':'quen-nho'}), goiY:gy()}; }
    if(lv===2){ var ks=['quen-nho','bo-so-0','nho-sai-hang'], ch=shuffle(ks.slice()).map(function(k){ return TEN_LOI[k]; }), D2=TEN_LOI[kind], sai={}; ch.forEach(function(c,i){ if(c!==D2) sai[String(i)]=ks.filter(function(k){ return TEN_LOI[k]===c; })[0]; });
      return {type:'mcq', cot:1, _lv:2, _a:p.a, _b:p.b, _an:an, _kind:kind, _dung:D2, q:mo+'<div>An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(D2), sai:sai, goiY:gy()}; }
    return {type:'num', _lv:3, _a:p.a, _b:p.b, _an:an, _kind:kind, q:mo+'<div>Kết quả đúng của phép nhân là bao nhiêu?</div>', ans:t, sai:nhanSai([[an,kind],[nhanKhongNho(p.a,p.b),'quen-nho'],[t+10,'nho-sai-hang'],[t-100,'nho-sai-hang']], t), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, t=a*b, an=q._an; if(a<1000 || b<2 || t>9999 || q.q.indexOf(sx(a)+' × '+b+' = '+sx(an))<0) return false;
    if(q._lv<=1) return kiemMCQ(q) && q.choices.length===2 && (q._dung==='Đồng ý')===(an===t) && (an===t || an===nhanKhongNho(a,b) || an===nhanBoKhong(a,b));
    var sa = q._kind==='quen-nho' ? nhanKhongNho(a,b) : nhanBoKhong(a,b); if(an!==sa || sa===t || (q._kind==='bo-so-0' && demKhongA(a)===0)) return false; if(q._lv===2) return kiemMCQ(q) && q.choices.length===3 && q._dung===TEN_LOI[q._kind]; return q.ans===t; }}
 ]
};
