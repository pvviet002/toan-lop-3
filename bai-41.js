/* bai-41.js — Bài 41: Ôn tập phép nhân, phép chia trong phạm vi 100, 1 000 (Chủ đề 7). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-41.md, PR #31): 4 MỤC TIÊU (muctieu) × 12 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình: nhanDoc (đặt tính nhân 2 hoặc 3 chữ số, viết mới từ nhanDoc3 bài 36, có ô "?" ở thừa số cho dạng tìm chữ số), chiaDoc2 (bài 26), chiaDoc3 (bài 37),
   theTinh (bài 38), luoiSao (mới, data-dem). Mọi hàm chép nguyên (mỗi bài một tệp). 500 × 2 = 1 000 viết "1 000" bằng so(); check() tính lại mọi giá trị.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn41(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
function so(n){ return n>=1000 ? Math.floor(n/1000)+' '+('00'+(n%1000)).slice(-3) : String(n); }
function docPT(s){ var o={}, re=/data-pt="(\w+)"[^>]*>([^<]*)<\/text>/g, m; while((m=re.exec(String(s)))) o[m[1]]=m[2]; return o; }
var GOI={'nham-bang':'Bé nhẩm lại bảng nhân, bảng chia rồi tính từng bước.', 'cong-thay-nhan':'Nhiều phần bằng nhau thì nhân, chia đều thì chia.', 'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!', 'dao-vai':'Bé xem lại: ô ? là thừa số, tích, số bị chia, số chia hay thương?', 'chon-sai-phep':'Bé đọc kỹ đề: gấp lên là nhân, chia đều là chia.',
  'quen-nho':'Nhân ở một hàng được số có hai chữ số thì viết chữ số đơn vị, NHỚ chữ số chục sang hàng bên trái.', 'nho-sai-hang':'Số nhớ cộng vào hàng liền bên trái.', 'quen-ha':'Chia xong một hàng, bé HẠ chữ số tiếp theo xuống rồi chia tiếp.', 'thieu-so-0':'Hạ chữ số xuống mà không chia được thì viết 0 ở thương rồi hạ tiếp (510 : 5 = 102).',
  'du-lon-hon-chia':'Số dư luôn bé hơn số chia.', 'nham-thuong-du':'Thương là kết quả phép chia, số dư là phần còn lại.', 'quen-du':'Còn thừa thì phải thêm một nữa: thương cộng 1.', 'nham-hang':'Bé nhẩm theo chục, theo trăm rồi viết đủ chữ số 0: 5 chục × 2 = 10 chục = 100.', 'tru-sai-buoc':'Bé tính lại bước trừ.', 'dem-sai':'Bé đếm lại số hàng, số cột nhé.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }

/* ---- Hình mới 1: đặt tính nhân 2 hoặc 3 chữ số. tuy.an = 'tich' | 'donvi' | 'chuc' | 'tram' (ô ? ở tích); tuy.anTS = chỉ số chữ số của THỪA SỐ bị che (0 = hàng đơn vị, 1 = chục, 2 = trăm);
   tuy.anTich = mảng chỉ số chữ số của tích bị che (tìm chữ số); tuy.bieuDien = tích do bạn An viết. Mỗi chữ số data-pt: a{i} (thừa số, i từ phải), b0, p{i} (tích). ---- */
function chuSoNhan(a, b, tuy){
  tuy=tuy||{}; var it=[], da=String(a), tich=a*b, dp=String(tuy.bieuDien!==undefined ? tuy.bieuDien : tich), X=[44,80,116], i;
  for(i=0;i<da.length;i++){ var idx=da.length-1-i, col=3-da.length+i; it.push({id:'a'+idx, x:X[col], y:64, ch:(tuy.anTS===idx) ? '?' : da.charAt(i)}); }
  it.push({id:'b0', x:X[2], y:114, ch:String(b)});
  if(tuy.an==='tich') it.push({id:'p', x:X[1], y:168, ch:'?', rong:true});
  else for(i=0;i<dp.length;i++){ var pidx=dp.length-1-i, pcol=3-dp.length+i, anP = (tuy.an==='donvi'&&pidx===0)||(tuy.an==='chuc'&&pidx===1)||(tuy.an==='tram'&&pidx===2)||(tuy.anTich && tuy.anTich.indexOf(pidx)>=0); it.push({id:'p'+pidx, x:X[pcol], y:168, ch:anP ? '?' : dp.charAt(i)}); }
  return it;
}
function nhanDoc(a, b, tuy){
  var it=chuSoNhan(a,b,tuy), s=svgX(150,182,150);
  it.forEach(function(e){
    if(e.ch==='?' && e.rong) s+='<rect x="24" y="138" width="112" height="38" rx="8" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
    else if(e.ch==='?') s+='<rect x="'+(e.x-17)+'" y="'+(e.y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
    s+='<text data-pt="'+e.id+'" x="'+e.x+'" y="'+e.y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(e.ch==='?'?HM.hoi:'currentColor')+'">'+e.ch+'</text>';
  });
  s+='<text x="14" y="114" text-anchor="middle" font-size="28" '+HFONT+' fill="currentColor">&#215;</text><line x1="26" y1="128" x2="136" y2="128" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
  return khungHinh(s);
}
function kiemNhanDoc(q){ var p=q._pt, it=chuSoNhan(p.a,p.b,p), d=docPT(q.q), want={}; it.forEach(function(e){ want[e.id]=e.ch; }); var ids=Object.keys(want);
  return p.a>=10 && p.a<=999 && p.b>=2 && p.b<=9 && p.a*p.b<=999 && ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; }); }
/* phép nhân hai chữ số × một chữ số, tích <= 99 (soNho = 0/1) */
function phepNhan2(soNho){ for(var g=0;g<3000;g++){ var b=rnd(2,9), a=rnd(11,Math.floor(99/b)), c0=Math.floor((a%10)*b/10); if(a%10===0) continue; if((c0>0?1:0)!==soNho) continue; return {a:a,b:b,tich:a*b}; } return {a:12,b:4,tich:48}; }
/* tìm chữ số: thừa số a che chữ số idx, tích che các chữ số anTich; đúng một chữ số 0–9 thoả */
function duyNhat(a, b, idx, anTich){ var da=String(a), n=0, d; for(d=0;d<=9;d++){ if(d===0 && idx===da.length-1) continue; var a2=+(da.slice(0,da.length-1-idx)+d+da.slice(da.length-idx)), t2=a2*b, dt=String(t2), dt0=String(a*b); if(dt.length!==dt0.length) continue; var ok=true, j; for(j=0;j<dt.length;j++){ var pidx=dt.length-1-j; if(anTich.indexOf(pidx)<0 && dt.charAt(j)!==dt0.charAt(j)) ok=false; } if(ok) n++; } return n===1; }

/* ---- Hình mới 2 (D12): lưới ngôi sao r hàng × c cột, mỗi sao data-dem="sao" ---- */
function ngoiSao(cx, cy, R){ var p='', i; for(i=0;i<10;i++){ var r = i%2===0 ? R : R*0.45, a=-Math.PI/2+i*Math.PI/5; p+=(i?' L':'M')+(cx+r*Math.cos(a)).toFixed(1)+' '+(cy+r*Math.sin(a)).toFixed(1); } return p+' Z'; }
function luoiSao(r, c){
  var D=34, ox=12, oy=12, W=ox*2+c*D, H=oy*2+r*D, s=svgX(W,H), i, j;
  for(i=0;i<r;i++) for(j=0;j<c;j++) s+='<path data-dem="sao" data-r="'+i+'" data-c="'+j+'" d="'+ngoiSao(ox+j*D+D/2, oy+i*D+D/2, 14)+'" fill="'+HM.vang+'" stroke="'+HM.vangDam+'" stroke-width="1.5" stroke-linejoin="round"/>';
  return khungHinh(s);
}
function docSao(s){ var rs=new Set(), cs=new Set(), re=/data-dem="sao" data-r="(\d+)" data-c="(\d+)"/g, m, n=0; while((m=re.exec(String(s)))){ n++; rs.add(+m[1]); cs.add(+m[2]); } return {n:n, r:rs.size, c:cs.size}; }
function phanSo(k){ return '<span class="inline-flex flex-col items-center align-middle mx-1 leading-none"><span class="border-b-2 border-slate-700 px-1">1</span><span class="px-1">'+k+'</span></span>'; }
function buocNhan(a, b){
  var a2=Math.floor(a/100), a1=Math.floor(a/10)%10, a0=a%10, p0=a0*b, c0=Math.floor(p0/10), p1=a1*b+c0, c1=Math.floor(p1/10), p2=a2*b+c1, tich=a*b;
  return {a2:a2, a1:a1, a0:a0, c0:c0, c1:c1, d0:p0%10, d1:p1%10, d2:p2, tich:tich, soNho:(c0>0?1:0)+(c1>0?1:0)};
}
function phepNhan(soNho, lo){
  lo=lo||{}; for(var g=0;g<4000;g++){ var b=rnd(2,9), a=rnd(100, Math.floor(999/b)), B=buocNhan(a,b);
    if(B.soNho!==soNho) continue; if(lo.coSo0 && B.a1!==0) continue; if(lo.khongSo0 && (B.a1===0 || B.a0===0)) continue; if(lo.tramLon && B.a2<2) continue;
    return {a:a, b:b, tich:B.tich}; }
  return {a:111, b:2, tich:222};
}
function chuSoTich(t, vt){ var d=('00'+t).slice(-3); return +d.charAt(vt); }
function ketQuaSai(a, b, kieu){ var B=buocNhan(a,b);
  if(kieu==='quen-nho') return Number(''+(B.a2*b)+String(B.a1*b%10)+String(B.d0)) ;
  return B.tich + (B.c0 ? 90*B.c0 : 0) + (B.c1 ? 900*B.c1 : 0); }
function cacBuoc(a, b){
  var a1=Math.floor(a/10), a0=a%10, q1=Math.floor(a1/b), t1=q1*b, c1=a1-t1, cur=c1*10+a0, q0=Math.floor(cur/b), t0=q0*b, r=cur-t0;
  return {a1:a1, a0:a0, q1:q1, t1:t1, c1:c1, cur:cur, q0:q0, t0:t0, r:r};
}
function chiaDoc2(a, b, tuy){
  tuy=tuy||{}; var B=cacBuoc(a,b), s=svgX(200,290,200), X=[44,80];
  function hang(x, y, ch, id){
    var r='';
    if(ch==='?') r+='<rect x="'+(x-17)+'" y="'+(y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
    return r+'<text data-pt="'+id+'" x="'+x+'" y="'+y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(ch==='?'?HM.hoi:'currentColor')+'">'+ch+'</text>'; }
  function so(v, an, pre, y){ var d=String(v), L=d.length, i, r=''; for(i=0;i<L;i++) r+=hang(X[2-L+i], y, an ? '?' : d.charAt(i), pre+(L-1-i)); return r; }
  s+=hang(X[0], 44, String(B.a1), 'a1')+hang(X[1], 44, String(B.a0), 'a0')+hang(134, 44, String(b), 'b0');
  s+='<text x="12" y="96" text-anchor="middle" font-size="26" '+HFONT+' fill="currentColor">&#8722;</text>'+hang(X[0], 96, tuy.an==='t1' ? '?' : String(B.t1), 't1')+hang(134, 96, tuy.an==='q1' ? '?' : String(B.q1), 'q1')+hang(170, 96, tuy.an==='q0' ? '?' : String(B.q0), 'q0');
  if(B.c1>0) s+=hang(X[0], 148, String(B.c1), 'c1');
  s+=hang(X[1], 148, tuy.an==='ha' ? '?' : String(B.a0), 'c0');
  s+='<text x="12" y="200" text-anchor="middle" font-size="26" '+HFONT+' fill="currentColor">&#8722;</text>'+so(B.t0, tuy.an==='u', 'u', 200);
  s+=hang(X[1], 252, tuy.an==='r' ? '?' : String(B.r), 'r0');
  s+='<line x1="104" y1="10" x2="104" y2="106" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="104" y1="54" x2="196" y2="54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'
    +'<line x1="30" y1="108" x2="64" y2="108" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="30" y1="212" x2="98" y2="212" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
  return khungHinh(s);
}
function kiemChia2(q){
  var p=q._pt, B=cacBuoc(p.a,p.b), d=docPT(q.q), want={};
  want.a1=String(B.a1); want.a0=String(B.a0); want.b0=String(p.b);
  want.t1 = p.an==='t1' ? '?' : String(B.t1); want.q1 = p.an==='q1' ? '?' : String(B.q1); want.q0 = p.an==='q0' ? '?' : String(B.q0);
  if(B.c1>0) want.c1=String(B.c1);
  want.c0 = p.an==='ha' ? '?' : String(B.a0);
  String(B.t0).split('').reverse().forEach(function(ch,i){ want['u'+i]= p.an==='u' ? '?' : ch; });
  want.r0 = p.an==='r' ? '?' : String(B.r);
  var ids=Object.keys(want);
  return ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; });
}
/* phép chia hai chữ số hợp lệ cho hình chiaDoc2: chữ số hàng chục >= số chia */
function phepHaiBuoc(lo){
  for(var g=0;g<3000;g++){ var b=rnd(2,9), a=rnd(10,99), c=chia(a,b), B=cacBuoc(a,b);
    if(Math.floor(a/10)<b) continue;
    if(lo.het===true && c.r!==0) continue; if(lo.het===false && c.r===0) continue;
    if(lo.q0khac0 && B.q0===0) continue; if(lo.q0bang0 && B.q0!==0) continue;
    return {a:a, b:b, q:c.q, r:c.r}; }
  return null;
}
function chia(a, b){ var q=Math.floor(a/b); return {q:q, r:a-q*b}; }
function buocChia3(a, b){
  var d=[Math.floor(a/100), Math.floor(a/10)%10, a%10], steps=[], start=0, cur=d[0], j;
  if(cur<b){ cur=d[0]*10+d[1]; start=1; }
  var q=Math.floor(cur/b), t=q*b, r=cur-t; steps.push({col:start, cur:cur, q:q, t:t, r:r});
  for(j=start+1;j<3;j++){ cur=r*10+d[j]; q=Math.floor(cur/b); t=q*b; r=cur-t; steps.push({col:j, cur:cur, q:q, t:t, r:r}); }
  return {d:d, steps:steps, thuong:steps.map(function(s){ return s.q; }).join(''), q:Math.floor(a/b), r:a%b, soBuoc:steps.length};
}
/* Danh sách chữ số của khung ⌐ (id, cột, hàng, chữ) — dùng chung cho vẽ và kiểm. an = 'q0'|'q1'|'q2' (chữ số thương tính từ phải), 'ha' (chữ số hạ cuối), 'u' (tích cuối), 'r' (số dư cuối).
   Mọi bước đều vẽ hàng tích và số dư, kể cả bước thương 0 (như sách: 714 : 7 → hạ 1, 1 : 7 = 0, viết 0, hạ 4). */
function chuSoChia3(a, b, tuy){
  tuy=tuy||{}; var B=buocChia3(a,b), it=[], X=[44,80,116], Q=[170,206,242], row=0, k, s, lastU=-1, lastHa=-1, lastR=-1, i;
  function add(id, x, y, ch){ it.push({id:id, x:x, y:y, ch:ch}); }
  add('a2', X[0], 44, String(B.d[0])); add('a1', X[1], 44, String(B.d[1])); add('a0', X[2], 44, String(B.d[2])); add('b0', 170, 44, String(b));
  var th=B.thuong, L=th.length;
  for(i=0;i<L;i++){ var qi=L-1-i; add('q'+qi, Q[i], 96, (tuy.an==='q'+qi) ? '?' : th.charAt(i)); }
  var yRow=44, lines=[];   /* hàng đang chứa số dư và chữ số hạ */
  for(k=0;k<B.steps.length;k++){ s=B.steps[k];
    if(k>0) add('h'+k, X[s.col], yRow, String(B.d[s.col]));
    var yU=yRow+52, tt=String(s.t), n=tt.length;
    for(i=0;i<n;i++) add('u'+k+'_'+(n-1-i), X[s.col-(n-1)+i], yU, tt.charAt(i));
    lines.push([X[s.col-(n-1)]-18, yU+12, X[s.col]+18]); lastU=k; yRow=yU+52;
    add('r'+k, X[s.col], yRow, String(s.r)); lastR=k;
  }
  lastHa=B.steps.length-1;
  if(tuy.an==='ha' && lastHa>=1) it.forEach(function(e){ if(e.id==='h'+lastHa) e.ch='?'; });
  if(tuy.an==='u' && lastU>=0) it.forEach(function(e){ if(e.id.indexOf('u'+lastU+'_')===0) e.ch='?'; });
  if(tuy.an==='r' && lastR>=0) it.forEach(function(e){ if(e.id==='r'+lastR) e.ch='?'; });
  return {it:it, H:yRow+30, B:B, lines:lines};
}
function chiaDoc3(a, b, tuy){
  var o=chuSoChia3(a,b,tuy), s=svgX(270,o.H,270);
  o.it.forEach(function(e){
    if(e.ch==='?') s+='<rect x="'+(e.x-17)+'" y="'+(e.y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
    s+='<text data-pt="'+e.id+'" x="'+e.x+'" y="'+e.y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(e.ch==='?'?HM.hoi:'currentColor')+'">'+e.ch+'</text>';
  });
  o.lines.forEach(function(l){ s+='<text x="12" y="'+(l[1]-12)+'" text-anchor="middle" font-size="26" '+HFONT+' fill="currentColor">&#8722;</text><line x1="'+l[0]+'" y1="'+l[1]+'" x2="'+l[2]+'" y2="'+l[1]+'" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'; });
  s+='<line x1="140" y1="10" x2="140" y2="106" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="140" y1="54" x2="266" y2="54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
  return khungHinh(s);
}
function kiemChia3(q){
  var p=q._pt, o=chuSoChia3(p.a, p.b, {an:p.an}), d=docPT(q.q), want={};
  o.it.forEach(function(e){ want[e.id]=e.ch; });
  var ids=Object.keys(want);
  return p.a>=100 && p.a<=999 && p.b>=2 && p.b<=9 && ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; });
}
/* sinh phép chia ba chữ số theo yêu cầu: het (true/false), so0 (thương có chữ số 0 ở giữa hoặc cuối), khong0 (thương không có 0), baSo (thương ba chữ số), haiSo (thương hai chữ số), tronChuc (thương tận cùng 0) */
function phepChia3(lo){
  lo=lo||{}; for(var g=0;g<6000;g++){ var b=rnd(2,9), a=rnd(100,999), c=chia(a,b), B=buocChia3(a,b), th=String(c.q);
    if(c.q<10) continue;
    if(lo.het===true && c.r!==0) continue; if(lo.het===false && c.r===0) continue;
    if(lo.so0 && th.indexOf('0')<0) continue; if(lo.khong0 && th.indexOf('0')>=0) continue;
    if(lo.baSo && th.length!==3) continue; if(lo.haiSo && th.length!==2) continue;
    if(lo.tronChuc && c.q%10!==0) continue; if(lo.giua0 && !(th.length===3 && th.charAt(1)==='0')) continue;
    if(lo.cuoiKhac0 && B.steps[B.steps.length-1].q===0) continue;
    return {a:a, b:b, q:c.q, r:c.r}; }
  return {a:312, b:2, q:156, r:0};
}
function nhieuChia(a, b){ var c=chia(a,b), B=buocChia3(a,b), th=String(c.q), ds=[];
  ds.push([+th.replace(/0/g,''),'thieu-so-0']); ds.push([+th.slice(0,-1),'quen-ha']); ds.push([c.q+1,'nham-bang']); ds.push([c.q-1,'nham-bang']); if(c.r) ds.push([c.r,'nham-thuong-du']); return ds; }
function theTinh(ds){
  var s='<div class="flex flex-wrap justify-center gap-2 my-2">';
  ds.forEach(function(t){ s+='<span class="inline-block px-3 py-2 rounded-xl border-2 border-amber-300 text-slate-700 font-extrabold text-xl whitespace-nowrap">'+t+'</span>'; });
  return s+'</div>';
}
function docThe(s){ var o=[], re=/<span class="inline-block px-3 py-2[^>]*>([^<]*)<\/span>/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }
function okEq(s){ var re=/(\d+) ([+−×:]) (\d+) = (\d+)/g, m, n=0, ok=true; while((m=re.exec(s))){ n++; if(tinhBT(m[1]+' '+m[2]+' '+m[3])!==+m[4]) ok=false; } return ok && n>=1; }

/* Nhẩm tròn chục / tròn trăm: trả về {t, v} với t là biểu thức, v giá trị; pham = 100 | 1000 */
function nhamTron(pham, nhan){
  for(var g=0;g<500;g++){ var t, v;
    if(pham===100){ if(nhan){ var a=10*rnd(1,5), b=rnd(2,5); v=a*b; t=a+' × '+b; } else { var b2=rnd(2,5), q=10*rnd(1,5); v=q; t=(q*b2)+' : '+b2; if(q*b2>100) continue; } if(v>100) continue; }
    else { if(nhan){ var a3=100*rnd(1,5), b3=rnd(2,5); v=a3*b3; t=a3+' × '+b3; } else { var b4=rnd(2,9), q4=100*rnd(1,4); v=q4; t=(q4*b4)+' : '+b4; } if(v>1000) continue; if(!nhan && q4*b4>999) continue; }
    return {t:t, v:v}; }
  return {t:'20 × 3', v:60};
}
function bieuThucTo(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }

var BAI = {
 n: 41,
 title: 'Ôn Tập Phép Nhân, Phép Chia Trong Phạm Vi 100, 1 000',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-nho':'Quên nhớ', 'nho-sai-hang':'Nhớ nhầm hàng', 'quen-ha':'Quên hạ chữ số', 'thieu-so-0':'Thương thiếu chữ số 0', 'du-lon-hon-chia':'Số dư lớn hơn hoặc bằng số chia', 'nham-thuong-du':'Nhầm thương với số dư', 'quen-du':'Quên cộng 1 khi còn dư', 'nham-hang':'Nhẩm sai hàng', 'tru-sai-buoc':'Trừ sai ở bước đặt tính', 'dem-sai':'Đếm sai hàng, cột'},
 muctieu: [
  {id:'MT1', ten:'Nhẩm và đặt tính trong phạm vi 100', muc:['20 × 3, 60 : 2; 34 × 2 (không nhớ).', '15 × 6 (có nhớ); 69 : 3, 84 : 7; 50 × 2 = 100.', '95 : 8 = 11 (dư 7); Đúng / Sai 17 × 5 = 55; chọn thẻ nhẩm.']},
  {id:'MT2', ten:'Nhẩm và đặt tính trong phạm vi 1 000', muc:['300 × 3, 800 : 4; 423 × 2; 848 : 4.', '107 × 9, 91 × 8; 740 : 5; 500 × 2 = 1 000; tìm chữ số 1?2 × 4 = 608.', '569 : 9 (dư 2); Đúng / Sai 510 : 5 = 12; 3? × 7 = ??6.']},
  {id:'MT3', ten:'Chọn đáp án và tìm thành phần', muc:['192 × 4 trong bốn số; ? × 6 = 186.', '906 : 3 trong bốn số; ? : 7 = 105.', 'Số dư của 628 : 8; 72 : ? = 8; đố em 21 × 3 = 63.']},
  {id:'MT4', ten:'Giải toán', muc:['Hai xe, mỗi xe 45 học sinh; Mai gấp 3 lần Mi hái 25 bông; 1/3 của 15 ngôi sao.', '256 bánh, mỗi hộp 8; cả hai bạn hái bao nhiêu; 1/5 của 15 ngôi sao.', 'Thùng 28 l, can 5 l: cần ít nhất mấy can; lưới sao khác.']}
 ],
 topics: [
  /* D1 — Nhẩm trong phạm vi 100 (trang 1) */
  {name:'Nhẩm trong phạm vi 100', sec:'Trang 1 — Tính nhẩm: 20 × 3 = 60; 40 × 2 = 80; 50 × 2 = 100; 60 : 2 = 30; 80 : 4 = 20; 100 : 5 = 20', mt:['MT1'], levels:3,
   muc:['20 × 3, 60 : 2 (nhân, chia số tròn chục).', '50 × 2 = 100; 100 : 5 = 20.', 'Chọn thẻ có kết quả bằng số đã cho trong bốn thẻ.'],
   make:function(lv){
    if(lv<=2){ var o, g=0; do{ o=nhamTron(100, Math.random()<0.5); g++; }while(g<200 && (lv<=1 ? o.v>=100 : (o.v!==100 && o.t.indexOf('100')<0)));
      return {type:'num', _lv:lv, _bt:o.t, q:kyHieu('Tính nhẩm', o.t+' ='+oHoi()), ans:o.v, sai:nhanSai([[o.v/10,'nham-hang'],[o.v*10,'nham-hang'],[o.v+10,'nham-bang']], o.v), goiY:gy()}; }
    var T=pick([60,80,90,100,40]), ds=[], tries=0, dung=null;
    while(tries<400 && ds.length<4){ tries++; var c=nhamTron(100, Math.random()<0.5); if(ds.some(function(x){ return x.t===c.t; })) continue; if(c.v===T && !dung){ dung=c.t; ds.push(c); } else if(c.v!==T && ds.every(function(x){ return x.v!==c.v; })) ds.push(c); }
    if(!dung) return BAI.topics[0].make(3);
    var th=shuffle(ds.map(function(x){ return x.t; })), sai={}; th.forEach(function(t,i){ if(t!==dung) sai[String(i)]='nham-hang'; });
    return {type:'mcq', cot:1, _lv:3, _T:T, _ds:th, _dung:dung, q:theTinh(th)+'<div>Phép tính nào có kết quả bằng <b class="text-2xl text-orange-600">'+T+'</b>?</div>', choices:th, correct:th.indexOf(dung), sai:sai, goiY:gy({'nham-hang':'Bé nhẩm từng thẻ theo chục: 2 chục × 3 = 6 chục = 60.'})};
  }, check:function(q){
    if(q._lv<=2) return tinhBT(q._bt)===q.ans && q.ans<=100 && Number.isInteger(q.ans);
    var v=q._ds.map(tinhBT); return kiemMCQ(q) && q._ds.length===4 && docThe(q.q).join('|')===q._ds.join('|') && v.filter(function(x){ return x===q._T; }).length===1 && tinhBT(q._dung)===q._T; }},

  /* D2 — Đặt tính hai chữ số (trang 1) */
  {name:'Đặt tính hai chữ số', sec:'Trang 1 — Đặt tính rồi tính: 34 × 2 = 68; 15 × 6 = 90; 69 : 3 = 23; 84 : 7 = 12; 95 : 8 = 11 (dư 7)', mt:['MT1'], levels:3,
   muc:['34 × 2, 23 × 4 (không nhớ): điền tích.', '15 × 6 (có nhớ) hoặc 69 : 3 (chia hết): điền tích hoặc thương.', '95 : 8 = 11 (dư 7): thương hoặc số dư.'],
   make:function(lv){
    if(lv<=1 || (lv===2 && Math.random()<0.5)){ var p=phepNhan2(lv<=1 ? 0 : 1), T=p.tich;
      return {type:'num', _lv:lv, _kieu:'nhan', _pt:{a:p.a,b:p.b,an:'tich'}, q:nhanDoc(p.a,p.b,{an:'tich'})+'<div>Tích ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:T, sai:nhanSai([[ketQuaSai(p.a,p.b,'quen-nho'),'quen-nho'],[p.a+p.b,'cong-thay-nhan'],[T+10,'nham-bang'],[T-10,'nham-bang']], T), goiY:gy()}; }
    var d = lv===2 ? phepHaiBuoc({het:true, q0khac0:true}) : phepHaiBuoc({het:false, q0khac0:true}), c=chia(d.a,d.b), hoiDu = lv===3 && Math.random()<0.5, an = hoiDu ? 'r' : 'q0';
    return {type:'num', _lv:lv, _kieu:'chia', _pt:{a:d.a,b:d.b,an:an}, _hoi:(hoiDu?'r':'q'), q:chiaDoc2(d.a,d.b,{an:an})+'<div>'+(hoiDu ? 'Số dư ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : 'Thương của phép chia <b>'+d.a+' : '+d.b+'</b> là bao nhiêu? (Ô <b class="text-amber-700">?</b> là chữ số cuối của thương.)')+'</div>', ans:(hoiDu ? c.r : c.q), sai:nhanSai(hoiDu ? [[c.q,'nham-thuong-du'],[c.r+d.b,'du-lon-hon-chia'],[c.r+1,'tru-sai-buoc']] : [[Math.floor(c.q/10),'quen-ha'],[c.r,'nham-thuong-du'],[c.q+1,'nham-bang'],[c.q-1,'nham-bang']], hoiDu ? c.r : c.q), goiY:gy()};
  }, check:function(q){ var p=q._pt;
    if(q._kieu==='nhan'){ if(!kiemNhanDoc(q) || p.a>99 || p.a*p.b>99) return false; var c0=Math.floor((p.a%10)*p.b/10); return q.ans===p.a*p.b && ((c0>0)===(q._lv===2)); }
    var c=chia(p.a,p.b); if(!kiemChia2(q) || p.a>99 || Math.floor(p.a/10)<p.b) return false; if(q._lv===2 && c.r!==0) return false; if(q._lv===3 && c.r===0) return false; return q.ans===(q._hoi==='r' ? c.r : c.q); }},

  /* D3 — Đúng hay sai trong phạm vi 100 (trang 1) */
  {name:'Đúng hay sai (100)', sec:'Trang 1 — Đ, S?: 17 × 5 = 55 (S, đúng là 85); 86 : 6 = 14 (dư 2) (Đ)', mt:['MT1'], levels:3,
   muc:['17 × 5 = 55: Đúng hay Sai.', '86 : 6 = 14 (dư 2): Đúng hay Sai.', 'Bạn An sai ở đâu: quên nhớ, số dư lớn hơn số chia, quên hạ.'],
   make:function(lv){
    if(lv<=1){ var p=phepNhan2(1), T=p.tich, dung=Math.random()<0.5, x = dung ? T : ketQuaSai(p.a,p.b,'quen-nho');
      return {type:'mcq', figNoCho:true, figFn:dsBtn41, _lv:1, _a:p.a, _b:p.b, _x:x, _dung:(x===T?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+p.a+' × '+p.b+' = '+x+'.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(x===T?0:1), sai:(x===T?{}:{'0':'quen-nho'}), goiY:gy()}; }
    if(lv===2){ var d=phepHaiBuoc({het:false, q0khac0:true}), c=chia(d.a,d.b), dung2=Math.random()<0.5, kind=pick(['du-lon-hon-chia','quen-ha']), xq = dung2 ? c.q : (kind==='du-lon-hon-chia' ? c.q-1 : Math.floor(c.q/10)), xr = dung2 ? c.r : (kind==='du-lon-hon-chia' ? c.r+d.b : cacBuoc(d.a,d.b).c1);
      return {type:'mcq', figFn:dsBtn41, _lv:2, _a:d.a, _b:d.b, _xq:xq, _xr:xr, _dung:(dung2?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+d.a+' : '+d.b+' = '+xq+(xr ? ' (dư '+xr+')' : '')+'.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(dung2?0:1), sai:(dung2?{}:{'0':kind}), goiY:gy()}; }
    var kinds=['quen-nho','du-lon-hon-chia','quen-ha'], kind3=pick(kinds), ten={'quen-nho':'Quên nhớ khi nhân', 'du-lon-hon-chia':'Số dư lớn hơn hoặc bằng số chia', 'quen-ha':'Quên hạ chữ số hàng đơn vị'}, noi, a, b;
    if(kind3==='quen-nho'){ var p3=phepNhan2(1); a=p3.a; b=p3.b; noi=a+' × '+b+' = '+ketQuaSai(a,b,'quen-nho'); }
    else { var d3=phepHaiBuoc({het:false, q0khac0:true}), c3=chia(d3.a,d3.b); a=d3.a; b=d3.b; noi = kind3==='du-lon-hon-chia' ? a+' : '+b+' = '+(c3.q-1)+' (dư '+(c3.r+b)+')' : a+' : '+b+' = '+Math.floor(c3.q/10)+(cacBuoc(a,b).c1 ? ' (dư '+cacBuoc(a,b).c1+')' : ''); }
    var ch=shuffle(kinds.slice()).map(function(k){ return ten[k]; }), dung3=ten[kind3], sai3={}; ch.forEach(function(c,i){ if(c!==dung3) sai3[String(i)]=kinds.filter(function(k){ return ten[k]===c; })[0]; });
    return {type:'mcq', cot:1, _lv:3, _a:a, _b:b, _kind:kind3, _noi:noi, _dung:dung3, q:nguoi('boy','Bạn An')+'<div>Bạn An viết: «<b>'+noi+'</b>». An làm sai rồi! An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(dung3), sai:sai3, goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b;
    if(q._lv<=1){ var T=a*b; return T<=99 && q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===T) && q.correct===(q._x===T?0:1); }
    if(q._lv===2){ var c=chia(a,b), ok=(q._xq===c.q && q._xr===c.r); return a<=99 && c.r>0 && q.choices.join()==='Đ,S' && (q._dung==='Đ')===ok && q.correct===(ok?0:1); }
    var m=/= (\d+)(?: \(dư (\d+)\))?/.exec(q._noi), xq=+m[1], xr=m[2] ? +m[2] : 0; if(q._kind==='quen-nho') return a*b<=99 && xq!==a*b && kiemMCQ(q); var c2=chia(a,b); return a<=99 && !(xq===c2.q && xr===c2.r) && kiemMCQ(q) && q.choices.length===3; }},

  /* D4 — Nhẩm trong phạm vi 1 000 (trang 2) */
  {name:'Nhẩm trong phạm vi 1 000', sec:'Trang 2 — Tính nhẩm: 300 × 3 = 900; 500 × 2 = 1 000; 800 : 4 = 200; 700 : 7 = 100', mt:['MT2'], levels:3,
   muc:['300 × 3, 800 : 4.', '500 × 2 = 1 000; 700 : 7 = 100.', 'Chọn thẻ có kết quả bằng số đã cho.'],
   make:function(lv){
    if(lv<=2){ var o, g=0; do{ o=nhamTron(1000, Math.random()<0.5); g++; }while(g<200 && (lv<=1 ? o.v>=1000 : (o.v!==1000 && o.v!==100)));
      return {type:'num', _lv:lv, _bt:o.t, q:kyHieu('Tính nhẩm', o.t+' ='+oHoi())+(o.v===1000 ? '<div class="text-base text-slate-500">Viết số có bốn chữ số dạng 1 000 (có dấu cách).</div>' : ''), ans:o.v, sai:nhanSai([[o.v/10,'nham-hang'],[o.v/100,'nham-hang'],[o.v+100,'nham-bang']], o.v), goiY:gy()}; }
    var T=pick([600,800,900,200,100]), ds=[], tries=0, dung=null;
    while(tries<400 && ds.length<4){ tries++; var c=nhamTron(1000, Math.random()<0.5); if(c.v>=1000) continue; if(ds.some(function(x){ return x.t===c.t; })) continue; if(c.v===T && !dung){ dung=c.t; ds.push(c); } else if(c.v!==T && ds.every(function(x){ return x.v!==c.v; })) ds.push(c); }
    if(!dung) return BAI.topics[3].make(3);
    var th=shuffle(ds.map(function(x){ return x.t; })), sai={}; th.forEach(function(t,i){ if(t!==dung) sai[String(i)]='nham-hang'; });
    return {type:'mcq', cot:1, _lv:3, _T:T, _ds:th, _dung:dung, q:theTinh(th)+'<div>Phép tính nào có kết quả bằng <b class="text-2xl text-orange-600">'+T+'</b>?</div>', choices:th, correct:th.indexOf(dung), sai:sai, goiY:gy({'nham-hang':'Bé nhẩm từng thẻ theo trăm: 3 trăm × 3 = 9 trăm = 900.'})};
  }, check:function(q){
    if(q._lv<=2) return tinhBT(q._bt)===q.ans && q.ans<=1000 && Number.isInteger(q.ans);
    var v=q._ds.map(tinhBT); return kiemMCQ(q) && q._ds.length===4 && docThe(q.q).join('|')===q._ds.join('|') && v.filter(function(x){ return x===q._T; }).length===1 && tinhBT(q._dung)===q._T; }},

  /* D5 — Đặt tính ba chữ số (trang 2) */
  {name:'Đặt tính ba chữ số', sec:'Trang 2 — Đặt tính rồi tính: 423 × 2 = 846; 107 × 9 = 963; 848 : 4 = 212; 740 : 5 = 148; 569 : 9 = 63 (dư 2)', mt:['MT2'], levels:3,
   muc:['423 × 2 (không nhớ); 848 : 4: ô ? một chữ số.', '107 × 9, 91 × 8 (có nhớ); 740 : 5: điền cả kết quả.', '569 : 9 = 63 (dư 2); thương có chữ số 0: thương hoặc số dư.'],
   make:function(lv){
    var nhan = lv<=2 ? Math.random()<0.5 : Math.random()<0.3;
    if(nhan){ var p = lv<=1 ? phepNhan(0,{khongSo0:true}) : phepNhan(lv===2 ? 1 : 2), B=buocNhan(p.a,p.b), an = lv<=1 ? pick(['tram','chuc','donvi']) : 'tich', ans = an==='tich' ? B.tich : chuSoTich(B.tich, an==='tram' ? 0 : (an==='chuc' ? 1 : 2));
      return {type:'num', _lv:lv, _kieu:'nhan', _pt:{a:p.a,b:p.b,an:an}, q:nhanDoc(p.a,p.b,{an:an})+'<div>'+(an==='tich' ? 'Tích ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : 'Chữ số ở ô <b class="text-amber-700">?</b> là bao nhiêu?')+'</div>', ans:ans, sai:nhanSai(an==='tich' ? [[ketQuaSai(p.a,p.b,'quen-nho'),'quen-nho'],[p.a+p.b,'cong-thay-nhan'],[ans+10,'nham-bang']] : [[ans+1,'nham-bang'],[ans-1,'nham-bang']], ans), goiY:gy()}; }
    var d = lv<=1 ? phepChia3({het:true, khong0:true}) : (lv===2 ? phepChia3({het:true}) : (Math.random()<0.5 ? phepChia3({het:false, cuoiKhac0:true}) : phepChia3({het:true, so0:true}))), c=chia(d.a,d.b), L=String(c.q).length, an, hoi, ans, sai;
    if(lv<=1){ an='q'+(L-1); hoi='qd'; ans=+String(c.q).charAt(0); sai=[[+String(c.q).charAt(1),'dao-vai'],[ans+1,'nham-bang']]; }
    else if(c.r>0 && Math.random()<0.5){ an='r'; hoi='r'; ans=c.r; sai=[[c.q,'nham-thuong-du'],[c.r+d.b,'du-lon-hon-chia'],[c.r+1,'tru-sai-buoc']]; }
    else { an='q0'; hoi='q'; ans=c.q; sai=nhieuChia(d.a,d.b); }
    var loi = hoi==='qd' ? 'Chữ số ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : (hoi==='r' ? 'Số dư ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : 'Thương của phép chia <b>'+d.a+' : '+d.b+'</b> là bao nhiêu? (Ô <b class="text-amber-700">?</b> là chữ số cuối của thương.)');
    return {type:'num', _lv:lv, _kieu:'chia', _pt:{a:d.a,b:d.b,an:an}, _hoi:hoi, q:chiaDoc3(d.a,d.b,{an:an})+'<div>'+loi+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var p=q._pt;
    if(q._kieu==='nhan'){ if(!kiemNhanDoc(q) || p.a<100) return false; var B=buocNhan(p.a,p.b); if(B.soNho!==(q._lv<=1 ? 0 : (q._lv===2 ? 1 : 2))) return false; return q.ans===(p.an==='tich' ? B.tich : chuSoTich(B.tich, p.an==='tram' ? 0 : (p.an==='chuc' ? 1 : 2))); }
    var c=chia(p.a,p.b); if(!kiemChia3(q) || c.q<10) return false; if(q._lv<=2 && c.r!==0) return false; return q.ans===(q._hoi==='qd' ? +String(c.q).charAt(0) : (q._hoi==='r' ? c.r : c.q)); }},

  /* D6 — Đúng hay sai trong phạm vi 1 000 (trang 2) */
  {name:'Đúng hay sai (1 000)', sec:'Trang 2 — Đ, S?: 114 × 6 = 684 (Đ); 510 : 5 = 12 (S, đúng là 102)', mt:['MT2'], levels:3,
   muc:['114 × 6 = 684: Đúng hay Sai.', '510 : 5 = 12: Đúng hay Sai (thương thiếu chữ số 0).', 'Kết quả đúng là bao nhiêu.'],
   make:function(lv){
    if(lv<=1){ var p=phepNhan(1), T=p.tich, dung=Math.random()<0.5, x = dung ? T : ketQuaSai(p.a,p.b,'quen-nho');
      return {type:'mcq', figFn:dsBtn41, _lv:1, _kieu:'nhan', _a:p.a, _b:p.b, _x:x, _dung:(x===T?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+p.a+' × '+p.b+' = '+x+'.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(x===T?0:1), sai:(x===T?{}:{'0':'quen-nho'}), goiY:gy()}; }
    var d=phepChia3({het:true, so0:true}), c=chia(d.a,d.b), xq=+String(c.q).replace(/0/g,'');
    if(lv===2){ var dung2=Math.random()<0.5, x2 = dung2 ? c.q : xq;
      return {type:'mcq', figFn:dsBtn41, _lv:2, _kieu:'chia', _a:d.a, _b:d.b, _x:x2, _dung:(dung2?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+d.a+' : '+d.b+' = '+x2+'.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(dung2?0:1), sai:(dung2?{}:{'0':'thieu-so-0'}), goiY:gy()}; }
    return {type:'num', _lv:3, _kieu:'chia', _a:d.a, _b:d.b, _x:xq, q:nguoi('boy','Bạn An')+'<div>Bạn An viết: «<b>'+d.a+' : '+d.b+' = '+xq+'</b>». An làm sai rồi! Thương đúng là bao nhiêu?</div>', ans:c.q, sai:nhanSai([[xq,'thieu-so-0'],[c.q+1,'nham-bang'],[c.q-1,'nham-bang']], c.q), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b;
    if(q._kieu==='nhan'){ var T=a*b; return T<=999 && q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===T) && q.correct===(q._x===T?0:1); }
    var c=chia(a,b); if(c.r!==0 || String(c.q).indexOf('0')<0) return false; if(q._lv===2) return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===c.q) && q.correct===(q._x===c.q?0:1); return q.ans===c.q && q._x!==c.q; }},

  /* D7 — Tìm chữ số thích hợp (trang 2) */
  {name:'Tìm chữ số thích hợp', sec:'Trang 2 — Số?: 1?2 × 4 = 60? (152 × 4 = 608); 3? × 7 = ??6 (38 × 7 = 266)', mt:['MT2'], levels:3,
   muc:['Thừa số ba chữ số thiếu chữ số hàng chục, tích đủ (1?2 × 4 = 608).', 'Thừa số hai chữ số thiếu hàng đơn vị, tích chỉ còn chữ số hàng đơn vị (3? × 7 = ??6).', 'Thừa số ba chữ số thiếu một chữ số, tích thiếu một chữ số (1?2 × 4 = 60?).'],
   make:function(lv){
    var p, idx, anTich, g;
    for(g=0;g<500;g++){
      if(lv<=1){ p=phepNhan(pick([0,1])); idx=1; anTich=[]; }
      else if(lv===2){ p=phepNhan2(1); if([3,7,9,1].indexOf(p.b)<0) continue; idx=0; var L2=String(p.tich).length; anTich=[]; for(var i=1;i<L2;i++) anTich.push(i); }
      else { p=phepNhan(pick([0,1])); idx=pick([1,2]); anTich=[pick([0,1,2])]; if(String(p.tich).length<3) continue; }
      if(duyNhat(p.a,p.b,idx,anTich)) break; }
    var da=String(p.a), ans=+da.charAt(da.length-1-idx);
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,anTS:idx,anTich:anTich}, q:nhanDoc(p.a,p.b,{anTS:idx, anTich:anTich})+'<div>Chữ số ở ô <b class="text-amber-700">?</b> của <b>thừa số</b> là bao nhiêu?</div>', ans:ans, sai:nhanSai([[ans+1,'nham-bang'],[ans-1,'nham-bang'],[p.b,'dao-vai'],[+String(p.tich).charAt(0),'dao-vai']], ans), goiY:gy({'dao-vai':'Bé thử từng chữ số 0–9 vào ô ? của thừa số rồi nhân với '+p.b+' xem tích có khớp các chữ số đã cho không.'})};
  }, check:function(q){ var p=q._pt, da=String(p.a); if(!kiemNhanDoc(q) || !duyNhat(p.a,p.b,p.anTS,p.anTich)) return false; return q.ans===+da.charAt(da.length-1-p.anTS); }},

  /* D8 — Chọn đáp án đúng (trang 3) */
  {name:'Chọn đáp án đúng', sec:'Trang 3 — 192 × 4 = 768 (A 468, B 768, C 786, D 867); 906 : 3 = 302; số dư của 628 : 8 là 4', mt:['MT3'], levels:3,
   muc:['Tích của phép nhân có nhớ (192 × 4) trong bốn số.', 'Thương của phép chia hết, có chữ số 0 (906 : 3).', 'Số dư của phép chia có dư (628 : 8).'],
   make:function(lv){
    var p, T, ch, sai={}, i, bt;
    if(lv<=1){ p=phepNhan(1); T=p.tich; bt=p.a+' × '+p.b; ch=[[T,''],[ketQuaSai(p.a,p.b,'quen-nho'),'quen-nho'],[+String(T).split('').reverse().join(''),'nham-bang'],[T+100,'nham-bang'],[T-10,'nham-bang']]; }
    else if(lv===2){ p=phepChia3({het:true, so0:true}); T=p.q; bt=p.a+' : '+p.b; var th=String(T); ch=[[T,''],[+th.replace(/0/g,''),'thieu-so-0'],[+th.split('').reverse().join(''),'nham-bang'],[T+1,'nham-bang'],[T*10>999 ? T-10 : T*10,'nham-hang']]; }
    else { p=phepChia3({het:false}); T=p.r; bt=p.a+' : '+p.b; ch=[[T,''],[T+p.b,'du-lon-hon-chia'],[p.q%10,'nham-thuong-du'],[T+1,'nham-bang'],[T-1,'nham-bang']]; }
    var seen=[T], opts=[[T,'']]; for(i=1;i<ch.length && opts.length<4;i++){ var v=ch[i][0]; if(Number.isInteger(v) && v>0 && v<=999 && seen.indexOf(v)<0){ seen.push(v); opts.push(ch[i]); } }
    opts=shuffle(opts); var cs=opts.map(function(o){ return String(o[0]); }); opts.forEach(function(o,k){ if(o[0]!==T) sai[String(k)]=o[1]||'nham-bang'; });
    return {type:'mcq', cot:2, _lv:lv, _a:p.a, _b:p.b, _T:T, _dung:String(T), q:bieuThucTo(bt)+'<div>'+(lv<=1 ? 'Tích' : (lv===2 ? 'Thương' : 'Số dư'))+' của phép tính này là số nào?</div>', choices:cs, correct:cs.indexOf(String(T)), sai:sai, goiY:gy()};
  }, check:function(q){ var e = q._lv<=1 ? q._a*q._b : (q._lv===2 ? q._a/q._b : q._a%q._b); if(q._lv===2 && (q._a%q._b!==0 || String(e).indexOf('0')<0)) return false; if(q._lv===3 && q._a%q._b===0) return false; return kiemMCQ(q) && q.choices.length>=3 && +q._dung===e && e===q._T && e<=999; }},

  /* D9 — Tìm thành phần (trang 3) */
  {name:'Tìm thành phần chưa biết', sec:'Trang 3 — ? × 6 = 186 (31); ? : 7 = 105 (735); 72 : ? = 8 (9)', mt:['MT3'], levels:3,
   muc:['Tìm thừa số: ? × 6 = 186.', 'Tìm số bị chia: ? : 7 = 105.', 'Tìm số chia: 72 : ? = 8.'],
   make:function(lv){
    var b, x, T;
    if(lv<=1){ b=rnd(2,9); x=rnd(11,Math.floor(999/b)); T=x*b; return {type:'num', _lv:1, _kieu:'ts', _b:b, _T:T, q:kyHieu('Tìm số thích hợp', oHoi()+'× '+b+' = '+T), ans:x, sai:nhanSai([[T*b>999 ? 0 : T*b,'chon-sai-phep'],[T-b,'chon-sai-phep'],[x+1,'nham-bang'],[T,'dao-vai']], x), goiY:gy({'chon-sai-phep':'Muốn tìm thừa số, lấy tích chia cho thừa số kia: '+T+' : '+b+'.'})}; }
    if(lv===2){ b=rnd(2,9); x=rnd(11,Math.floor(999/b)); T=x; return {type:'num', _lv:2, _kieu:'sbc', _b:b, _T:x, q:kyHieu('Tìm số thích hợp', oHoi()+': '+b+' = '+x), ans:x*b, sai:nhanSai([[x%b===0 ? x/b : 0,'chon-sai-phep'],[x+b,'chon-sai-phep'],[x*b+10,'nham-bang'],[x,'dao-vai']], x*b), goiY:gy({'chon-sai-phep':'Muốn tìm số bị chia, lấy thương nhân với số chia: '+x+' × '+b+'.'})}; }
    b=rnd(2,9); x=rnd(2,9); T=b*x; return {type:'num', _lv:3, _kieu:'sc', _T:T, _q:x, q:kyHieu('Tìm số thích hợp', T+' :'+oHoi()+'= '+x), ans:b, sai:nhanSai([[T*x>999 ? 0 : T*x,'chon-sai-phep'],[T-x,'chon-sai-phep'],[b+1,'nham-bang'],[x,'dao-vai']], b), goiY:gy({'chon-sai-phep':'Muốn tìm số chia, lấy số bị chia chia cho thương: '+T+' : '+x+'.'})};
  }, check:function(q){ if(q._kieu==='ts') return q._T%q._b===0 && q.ans===q._T/q._b && q._T<=999; if(q._kieu==='sbc') return q.ans===q._T*q._b && q.ans<=999; return q._T%q._q===0 && q.ans===q._T/q._q && q.ans>=2 && q.ans<=9; }},

  /* D10 — Đố em: xếp chữ số (trang 3) */
  {name:'Đố em: xếp chữ số', sec:'Trang 3 — Dùng ba chữ số 1, 2, 3 điền vào (hai chữ số) × (một chữ số) = 63: 21 × 3 = 63', mt:['MT3'], levels:3,
   muc:['Ba chữ số 1, 2, 3: phép nào bằng 63 (chọn trong bốn cách xếp).', 'Bộ ba chữ số khác, kết quả khác.', 'Bộ ba chữ số khác, hỏi phép có tích lớn hơn 80 (hoặc đúng một tích cho trước).'],
   make:function(lv){
    var bo = lv<=1 ? [1,2,3] : pick([[1,2,4],[2,3,4],[1,3,4],[1,2,5],[2,3,5],[1,2,3]]), cach=[], i, j, k;
    for(i=0;i<3;i++) for(j=0;j<3;j++) for(k=0;k<3;k++) if(i!==j && j!==k && i!==k){ var a=bo[i]*10+bo[j], b=bo[k]; cach.push({t:a+' × '+b, v:a*b}); }
    var ds=shuffle(cach.slice()).slice(0,4), vals=ds.map(function(c){ return c.v; }), g=0;
    while(g<50 && new Set(vals).size<4){ g++; ds=shuffle(cach.slice()).slice(0,4); vals=ds.map(function(c){ return c.v; }); }
    var dung = lv<=1 ? ds.filter(function(c){ return c.v===63; })[0] : null; if(lv<=1 && !dung){ dung={t:'21 × 3', v:63}; ds[0]=dung; }
    if(!dung) dung=pick(ds);
    var T=dung.v, th=shuffle(ds.map(function(c){ return c.t; })), sai={}; th.forEach(function(t,n){ if(t!==dung.t) sai[String(n)]='nham-bang'; });
    return {type:'mcq', cot:2, _lv:lv, _bo:bo, _ds:th, _T:T, _dung:dung.t, q:'<div>Dùng ba chữ số <b>'+bo.join(', ')+'</b>, mỗi chữ số một lần, viết phép nhân (số có hai chữ số) × (số có một chữ số). Phép nhân nào có tích bằng <b class="text-2xl text-orange-600">'+T+'</b>?</div>', choices:th, correct:th.indexOf(dung.t), sai:sai, goiY:gy({'nham-bang':'Bé tính tích của từng cách xếp rồi so với '+T+'.'})};
  }, check:function(q){ var ds=q._ds, bo=q._bo.slice().sort().join(''), ok=ds.every(function(t){ var m=/^(\d)(\d) × (\d)$/.exec(t); return m && [m[1],m[2],m[3]].sort().join('')===bo; }), v=ds.map(tinhBT); return ok && kiemMCQ(q) && ds.length===4 && v.filter(function(x){ return x===q._T; }).length===1 && tinhBT(q._dung)===q._T; }},

  /* D11 — Giải toán nhân, chia (trang 1, 2, 3) */
  {name:'Giải toán nhân, chia', sec:'Trang 1–3 — Hai xe mỗi xe 45 học sinh; 256 cái bánh mỗi hộp 8; Mai hái gấp 3 lần Mi 25 bông; thùng 28 l, can 5 l', mt:['MT4'], levels:3,
   muc:['Hai xe, mỗi xe 45 học sinh; Mai hái gấp 3 lần Mi.', '256 bánh, mỗi hộp 8 cái; cả hai bạn hái bao nhiêu bông.', 'Thùng 28 l, can 5 l: cần ít nhất mấy can.'],
   make:function(lv){
    if(lv<=1){ if(Math.random()<0.5){ var n=rnd(2,4), m=rnd(30,99); while(n*m>999) m-=10; return {type:'num', _lv:1, _kieu:'nhan', _n:n, _m:m, q:'<div>Có <b>'+n+' xe ô tô</b>, mỗi xe chở <b>'+m+' học sinh</b>. Hỏi '+n+' xe chở tất cả bao nhiêu học sinh?</div>', ans:n*m, unit:'học sinh', sai:nhanSai([[n+m,'cong-thay-nhan'],[n*m+10,'nham-bang'],[m,'thieu-buoc']], n*m), goiY:gy()}; }
      var mi=rnd(12,40), k=rnd(2,4); return {type:'num', _lv:1, _kieu:'gap', _mi:mi, _k:k, q:'<div>Mi hái được <b>'+mi+' bông hoa</b>. Mai hái được gấp <b>'+k+' lần</b> Mi. Mai hái được bao nhiêu bông hoa?</div>', ans:mi*k, unit:'bông hoa', sai:nhanSai([[mi+k,'cong-thay-nhan'],[mi*k+mi,'chon-sai-phep'],[mi*k+10,'nham-bang']], mi*k), goiY:gy()}; }
    if(lv===2){ if(Math.random()<0.5){ var h=rnd(4,9), c=rnd(20,120), t=h*c; return {type:'num', _lv:2, _kieu:'chia', _t:t, _h:h, q:'<div>Có <b>'+t+' cái bánh</b> xếp đều vào các hộp, mỗi hộp <b>'+h+' cái</b>. Xếp được bao nhiêu hộp?</div>', ans:c, unit:'hộp', sai:nhanSai([[t-h,'cong-thay-nhan'],[c+1,'nham-bang'],[c-1,'nham-bang'],[+String(c).replace(/0/g,''),'thieu-so-0']], c), goiY:gy()}; }
      var mi2=rnd(12,40), k2=rnd(2,4), ca=mi2+mi2*k2; return {type:'num', _lv:2, _kieu:'ca', _mi:mi2, _k:k2, q:'<div>Mi hái được <b>'+mi2+' bông hoa</b>. Mai hái được gấp <b>'+k2+' lần</b> Mi. Cả hai bạn hái được tất cả bao nhiêu bông hoa?</div>', ans:ca, unit:'bông hoa', sai:nhanSai([[mi2*k2,'thieu-buoc'],[mi2+k2,'cong-thay-nhan'],[ca+10,'nham-bang']], ca), goiY:gy({'thieu-buoc':'Bước 1: Mai hái '+mi2+' × '+k2+'. Bước 2: cộng với '+mi2+'.'})}; }
    var th2=rnd(20,99), can=rnd(3,9); while(th2%can===0) th2++; var q0=Math.floor(th2/can), r0=th2%can;
    return {type:'num', _lv:3, _kieu:'it', _th:th2, _can:can, q:'<div>Thùng có <b>'+th2+' l</b> nước mắm, rót vào các can, mỗi can <b>'+can+' l</b>. Cần ít nhất bao nhiêu can để rót hết số nước mắm đó? (Số lít còn lại cũng cần một can.)</div>', ans:q0+1, unit:'can', sai:nhanSai([[q0,'quen-du'],[r0,'nham-thuong-du'],[q0+2,'nham-bang']], q0+1), goiY:gy({'quen-du':'Rót được '+q0+' can đầy, còn '+r0+' l cũng cần một can nữa: '+q0+' + 1 = '+(q0+1)+'.'})};
  }, check:function(q){ var k=q._kieu; if(k==='nhan') return q.ans===q._n*q._m && q.ans<=999; if(k==='gap') return q.ans===q._mi*q._k; if(k==='chia') return q._t%q._h===0 && q.ans===q._t/q._h; if(k==='ca') return q.ans===q._mi+q._mi*q._k && q.ans<=999; return q._th%q._can!==0 && q.ans===Math.floor(q._th/q._can)+1; }},

  /* D12 — Một phần mấy của ngôi sao (trang 3) */
  {name:'Một phần mấy của ngôi sao', sec:'Trang 3 — 15 ngôi sao xếp 3 hàng 5 cột: 1/3 số ngôi sao là 5 ngôi sao; 1/5 số ngôi sao là 3 ngôi sao', mt:['MT4'], levels:3,
   muc:['15 ngôi sao (3 hàng × 5 cột): 1/3 số ngôi sao là mấy.', '1/5 số ngôi sao là mấy.', 'Lưới khác (4 × 6, 2 × 7, 3 × 8): một phần mấy.'],
   make:function(lv){
    var rc = lv<=2 ? [3,5] : pick([[4,6],[2,7],[3,8],[4,5],[2,9]]), r=rc[0], c=rc[1], n=r*c, k = lv<=1 ? r : (lv===2 ? c : pick([r,c])), ans=n/k;
    return {type:'num', _lv:lv, _r:r, _c:c, _k:k, q:luoiSao(r,c)+'<div>Có '+n+' ngôi sao xếp thành '+r+' hàng, mỗi hàng '+c+' ngôi sao. '+phanSo(k)+' số ngôi sao là bao nhiêu ngôi sao?</div>', ans:ans, unit:'ngôi sao', sai:nhanSai([[n-k,'chon-sai-phep'],[k,'dao-vai'],[n,'dao-vai'],[ans+1,'dem-sai']], ans), goiY:gy({'chon-sai-phep':'Một phần '+k+' của '+n+' là '+n+' : '+k+'.', 'dao-vai':'Chia '+n+' ngôi sao thành '+k+' phần bằng nhau, mỗi phần là '+(n/k)+' ngôi sao.'})};
  }, check:function(q){ var d=docSao(q.q); if(d.r!==q._r || d.c!==q._c || d.n!==q._r*q._c) return false; return (q._k===q._r || q._k===q._c) && q.ans===d.n/q._k && (q._lv<=1 ? q._k===q._r : (q._lv===2 ? q._k===q._c : true)); }}
 ]
};
