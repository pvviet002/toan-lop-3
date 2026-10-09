/* bai-44.js — Bài 44: Ôn tập chung (cuối Tập 1, Chủ đề 7). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-44.md, PR #31): 4 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình: nhanDoc (bài 41), chiaDoc2 (bài 26/41), chiaDoc3 (bài 37), luoiNha (mới: ngôi nhà trên lưới ô vuông, dựng từ luoiHinh43 bài 43 với toạ độ nguyên do mã chọn),
   gapKhuc (bài 38, thêm đơn vị), canDia (bài 36), theTinh (bài 38). Mọi hàm chép nguyên (mỗi bài một tệp). Mọi kết quả <= 999, không "1 000".
   check() đọc lại hình từ chuỗi SVG (data-pt, data-p, data-seg, data-g, data-cm) và tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
var TRU='−', NHAN='×', CHIA=':';
var GOI={'nham-bang':'Bé tính lại từng bước cho đúng nhé.', 'cong-thay-nhan':'Nhiều phần bằng nhau thì nhân, không cộng.', 'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!', 'dao-vai':'Bé xem lại câu hỏi hỏi gì.', 'chon-sai-phep':'Bé đọc kỹ: gấp lên là nhân, gộp lại là cộng, cân thăng bằng thì hai bên nặng bằng nhau.',
  'quen-nho':'Nhân ở một hàng được số có hai chữ số thì viết chữ số đơn vị, NHỚ chữ số chục sang hàng bên trái.', 'nho-sai-hang':'Số nhớ cộng vào hàng liền bên trái.', 'quen-ha':'Chia xong một hàng, bé HẠ chữ số tiếp theo xuống rồi chia tiếp.', 'thieu-so-0':'Hạ chữ số xuống mà không chia được thì viết 0 ở thương rồi hạ tiếp (720 : 4 = 180).',
  'du-lon-hon-chia':'Số dư luôn bé hơn số chia.', 'nham-thuong-du':'Thương là kết quả phép chia, số dư là phần còn lại.', 'nham-hang':'Bé nhẩm theo chục, theo trăm rồi viết đủ chữ số 0.', 'tru-sai-buoc':'Bé tính lại bước trừ.',
  'nham-trung-diem':'Trung điểm là điểm nằm GIỮA đoạn thẳng và chia đoạn thành hai phần bằng nhau. Bé đếm số ô hai bên.', 'nham-vuong':'Góc vuông là góc có hai cạnh vuông góc với nhau, kiểm bằng ê ke. Trên lưới: một cạnh nằm ngang, một cạnh thẳng đứng.', 'dem-sot-goc':'Bé đếm từng đỉnh của hình, mỗi đỉnh xét xem góc có vuông không.',
  'tinh-trai-sang-phai':'Có nhân, chia thì làm NHÂN, CHIA trước, rồi mới cộng, trừ.', 'bo-ngoac':'Có dấu ngoặc thì tính TRONG NGOẶC trước.', 'nhan-chia-sau':'Nhân, chia trước; cộng, trừ sau.', 'nham-gia-tri':'Giá trị của biểu thức là kết quả sau khi tính hết mọi phép tính.', 'dem-sot-phep':'Bé xét từng thẻ rồi đếm lại nhé!'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
function bieuThucTo(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
/* phép nhân hai chữ số × một chữ số, tích <= 999, số lần nhớ cho trước (0 hoặc 1; tính nhớ ở hàng đơn vị) */
function phepNhan2(soNho){ for(var g=0;g<3000;g++){ var b=rnd(2,9), a=rnd(11,99), c0=Math.floor((a%10)*b/10); if(a%10===0 || a*b>999) continue; if((c0>0?1:0)!==soNho) continue; return {a:a,b:b,tich:a*b}; } return {a:12,b:4,tich:48}; }
function docPT(s){ var o={}, re=/data-pt="(\w+)"[^>]*>([^<]*)<\/text>/g, m; while((m=re.exec(String(s)))) o[m[1]]=m[2]; return o; }
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
function bieuThuc(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
function tinhBT2(t){ var s=String(t), m; while((m=/\(([^()]+)\)/.exec(s))) s=s.replace(m[0], String(tinhBT(m[1]))); return tinhBT(s); }
function tinhTSP(t){ var tk=String(t).replace(/[()]/g,'').replace(/−/g,'-').trim().split(/\s+/), r=+tk[0], i; for(i=1;i<tk.length;i+=2){ var o=tk[i], v=+tk[i+1]; r = o==='+' ? r+v : (o==='-' ? r-v : (o==='×' ? r*v : r/v)); } return r; }
function tinhBoNgoac(t){ return tinhBT(String(t).replace(/[()]/g,'')); }
function okSo(v){ return Number.isInteger(v) && v>=0 && v<=999; }
function laBT(t){ return /^\d+( [+−×:] \d+)+$/.test(t); }
function soPhep(t){ return (String(t).match(/[+−×:]/g)||[]).length; }
/* Mọi bước của biểu thức (không ngoặc, theo đúng thứ tự) đều là số nguyên không âm <= 999 */
function okBuoc(t){ var s=String(t), m; while((m=/\(([^()]+)\)/.exec(s))){ var v=tinhBT(m[1]); if(!okSo(v) || !okBuocPhang(m[1])) return false; s=s.replace(m[0], String(v)); } return okBuocPhang(s) && okSo(tinhBT(s)); }
function okBuocPhang(t){ var tk=String(t).replace(/−/g,'-').trim().split(/\s+/), vals=[+tk[0]], ops=[], i;
  for(i=1;i<tk.length;i+=2){ var o=tk[i], v=+tk[i+1]; if(o==='×'){ vals[vals.length-1]*=v; } else if(o===':'){ if(v===0 || vals[vals.length-1]%v!==0) return false; vals[vals.length-1]/=v; } else { ops.push(o); vals.push(v); } if(!okSo(vals[vals.length-1])) return false; }
  var r=vals[0]; for(i=0;i<ops.length;i++){ r = ops[i]==='+' ? r+vals[i+1] : r-vals[i+1]; if(!okSo(r)) return false; } return true; }
/* ---- Bộ sinh với số ba chữ số (ôn tập) ---- */
function btTrai3(){ for(var g=0;g<500;g++){ var k=pick(['−+','+−','−−']), a=rnd(300,900), b=rnd(100,a-50), c=rnd(10,150), t = k==='−+' ? a+' − '+b+' + '+c : (k==='+−' ? a+' + '+c+' − '+b : a+' − '+b+' − '+c); if(okBuoc(t)) return t; } return '731 − 680 + 19'; }
function btNhanChia(){ for(var g=0;g<500;g++){ var a=rnd(11,99), b=rnd(2,9), c=pick([2,3,4,5,6,7,8,9].filter(function(x){ return (a*b)%x===0; })), t = Math.random()<0.5 ? a+' × '+b+' : '+c : (a*c)+' : '+c+' × '+b; if(okBuoc(t) && tinhBT2(t)<=999) return t; } return '63 × 2 : 7'; }
function btUuTien3(){ for(var g=0;g<500;g++){ var k=pick(['×−','+:','+×','−:']), a, b, c, t;
    if(k==='×−'){ a=rnd(11,30); b=rnd(2,9); c=rnd(10,a*b-10); t=a+' × '+b+' − '+c; } else if(k==='+:'){ c=rnd(2,9); b=c*rnd(10,40); a=rnd(100,600); t=a+' + '+b+' : '+c; } else if(k==='+×'){ a=rnd(100,500); b=rnd(11,40); c=rnd(2,9); t=a+' + '+b+' × '+c; } else { c=rnd(2,9); b=c*rnd(10,40); a=rnd(b/c+20,900); t=a+' − '+b+' : '+c; }
    if(okBuoc(t) && tinhTSP(t)!==tinhBT2(t)) return t; } return '14 × 6 − 29'; }
function btNgoac3(){ for(var g=0;g<500;g++){ var k=pick(['−(−','×(:','(+):','(+)×','×(−']), a, b, c, t;
    if(k==='−(−'){ b=rnd(50,300); c=rnd(10,b-10); a=rnd(b,600); t=a+' − ('+b+' − '+c+')'; } else if(k==='×(:'){ a=rnd(2,9); c=rnd(2,9); b=c*rnd(2,12); t=a+' × ('+b+' : '+c+')'; } else if(k==='(+):'){ c=rnd(2,9); var s1=c*rnd(10,60); a=rnd(10,s1-10); b=s1-a; t='('+a+' + '+b+') : '+c; } else if(k==='(+)×'){ c=rnd(2,5); b=rnd(10,60); a=rnd(10,60); t='('+a+' + '+b+') × '+c; } else { a=rnd(2,9); b=rnd(20,60); c=rnd(1,b-1); t=a+' × ('+b+' − '+c+')'; }
    if(okBuoc(t) && okSo(tinhBoNgoac(t)) && tinhBoNgoac(t)!==tinhBT2(t)) return t; } return '182 − (96 − 54)'; }
/* n biểu thức có giá trị đôi một khác nhau, lấy từ bộ sinh gen */
function nhieuBT(gen, n){ var ds=[], g; for(g=0;g<300 && ds.length<n;g++){ var t=gen(); if(ds.every(function(x){ return tinhBT2(x)!==tinhBT2(t) && x!==t; })) ds.push(t); } return ds; }
function nhieuGiaTri(t){ var v=tinhBT2(t); return [[tinhTSP(t),'tinh-trai-sang-phai'],[tinhBoNgoac(t),'bo-ngoac'],[v+1,'nham-bang'],[v-1,'nham-bang'],[v+10,'nham-bang']]; }
function gocGiua(O, A, B){ var u=[A[0]-O[0], A[1]-O[1]], v=[B[0]-O[0], B[1]-O[1]], c=(u[0]*v[0]+u[1]*v[1])/(Math.hypot(u[0],u[1])*Math.hypot(v[0],v[1])); return Math.acos(Math.max(-1, Math.min(1, c)))*180/Math.PI; }
function laVuong(O, A, B){ return Math.abs(gocGiua(O,A,B)-90)<0.5; }
function laTrungDiem(m, a, b){ return m[0]*2===a[0]+b[0] && m[1]*2===a[1]+b[1] && !(a[0]===b[0] && a[1]===b[1]); }
/* ---- Hình mới 1 (D1–D4): lưới ô vuông w × h (toạ độ y hướng lên), điểm có tên, đoạn nối. pts = {T:[x,y]}, segs = [['A','B'], …], polys = [{pts:['A','B','C'], ten}] ---- */
function luoiHinh43(w, h, pts, segs, polys){
  var o=30, m=30, W=w*o+2*m, H=h*o+2*m, s=svgX(W,H), i, k;
  for(i=0;i<=w;i++) s+='<line x1="'+(m+i*o)+'" y1="'+m+'" x2="'+(m+i*o)+'" y2="'+(m+h*o)+'" stroke="'+HM.day+'" stroke-width="1.5"/>';
  for(i=0;i<=h;i++) s+='<line x1="'+m+'" y1="'+(m+i*o)+'" x2="'+(m+w*o)+'" y2="'+(m+i*o)+'" stroke="'+HM.day+'" stroke-width="1.5"/>';
  function X(p){ return m+p[0]*o; } function Y(p){ return m+(h-p[1])*o; }
  (polys||[]).forEach(function(pg){ s+='<polygon data-poly="'+pg.pts.join('')+'" points="'+pg.pts.map(function(t){ return X(pts[t])+','+Y(pts[t]); }).join(' ')+'" fill="'+HM.troi+'" fill-opacity="0.25" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>'; });
  (segs||[]).forEach(function(g){ var a=pts[g[0]], b=pts[g[1]]; s+='<line data-seg="'+g[0]+g[1]+'" x1="'+X(a)+'" y1="'+Y(a)+'" x2="'+X(b)+'" y2="'+Y(b)+'" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'; });
  for(k in pts){ var p=pts[k], cx=X(p), cy=Y(p), dx = p[0]>=w ? 14 : (p[0]<=0 ? -14 : 0), dy = p[1]>=h ? -11 : (p[1]<=0 ? 25 : (dx ? 7 : -11)), an = dx>0 ? 'start' : (dx<0 ? 'end' : 'middle');
    if(dx===0 && p[1]>0 && p[1]<h){ dx=12; an='start'; dy=-8; }
    s+='<circle data-p="'+k+':'+p[0]+','+p[1]+'" cx="'+cx+'" cy="'+cy+'" r="5.5" fill="'+HM.cam+'"/><text x="'+(cx+dx)+'" y="'+(cy+dy)+'" text-anchor="'+an+'" font-size="19" '+HFONT+' fill="currentColor">'+k+'</text>'; }
  return khungHinh(s);
}
function docHinh43(s){ var pts={}, segs=[], re=/data-p="(\w):(-?\d+),(-?\d+)"/g, rs=/data-seg="(\w)(\w)"/g, m; while((m=re.exec(String(s)))) pts[m[1]]=[+m[2],+m[3]]; while((m=rs.exec(String(s)))) segs.push([m[1],m[2]]); return {pts:pts, segs:segs}; }
/* các góc tại đỉnh T tạo bởi những đoạn đi qua T (kể cả T nằm giữa đoạn): trả về mảng góc (độ) giữa từng cặp tia */
function cacGocTai(T, pts, segs){
  var tia=[], O=pts[T];
  segs.forEach(function(g){ var a=pts[g[0]], b=pts[g[1]];
    if(g[0]===T) tia.push(b); else if(g[1]===T) tia.push(a);
    else if(laTrungDiem(O,a,b) || (Math.abs((b[0]-a[0])*(O[1]-a[1])-(b[1]-a[1])*(O[0]-a[0]))<0.001 && (O[0]-a[0])*(O[0]-b[0])+(O[1]-a[1])*(O[1]-b[1])<0)){ tia.push(a); tia.push(b); } });
  var ds=[], i, j; for(i=0;i<tia.length;i++) for(j=i+1;j<tia.length;j++){ var g=gocGiua(O,tia[i],tia[j]); if(g>0.5 && g<179.5) ds.push(g); }
  return ds;
}
function demGocVuongTai(T, pts, segs){ return cacGocTai(T,pts,segs).filter(function(g){ return Math.abs(g-90)<0.5; }).length; }
function canDia(trai, phai, nghieng){
  var W=390, H=236, xL=104, xR=286, yBeam=70, yPan=172, s=svgX(W,H), dy = nghieng==='trai' ? 14 : (nghieng==='phai' ? -14 : 0), yb1=yBeam+dy, yb2=yBeam-dy, yp1=yPan+dy, yp2=yPan-dy;
  s+='<path data-nghieng="'+(nghieng||'can')+'" d="M'+xL+' '+yb1+' L'+xR+' '+yb2+'" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>'
    +'<path d="M195 '+yBeam+' V216 M155 220 H235" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>'
    +'<path d="M'+xL+' '+yb1+' L24 '+yp1+' M'+xL+' '+yb1+' L184 '+yp1+' M'+xR+' '+yb2+' L206 '+yp2+' M'+xR+' '+yb2+' L366 '+yp2+'" fill="none" stroke="currentColor" stroke-width="1.8" opacity=".5"/>'
    +'<path d="M24 '+yp1+' H184 Q184 '+(yp1+16)+' 104 '+(yp1+16)+' Q24 '+(yp1+16)+' 24 '+yp1+'" fill="'+HM.vang+'" fill-opacity="0.5" stroke="currentColor" stroke-width="2.5"/>'
    +'<path d="M206 '+yp2+' H366 Q366 '+(yp2+16)+' 286 '+(yp2+16)+' Q206 '+(yp2+16)+' 206 '+yp2+'" fill="'+HM.vang+'" fill-opacity="0.5" stroke="currentColor" stroke-width="2.5"/>';
  function xep(ds, cx, side, yp){
    var n=ds.length, o='', pos=[], i;
    var w=function(d){ return d.k==='goi' ? 74 : (d.nhan ? 70 : 66); }, h=function(d){ return d.k==='goi' ? 46 : (d.nhan ? 40 : 34); };
    if(n===1) pos=[[cx,0]]; else if(n===2) pos=[[cx-38,0],[cx+38,0]]; else if(n===3) pos=[[cx-38,0],[cx+38,0],[cx,1]]; else pos=[[cx-38,0],[cx+38,0],[cx-38,1],[cx+38,1]];
    for(i=0;i<n;i++){ var d=ds[i], ww=w(d), hh=h(d), x=pos[i][0]-ww/2, y=yp-hh-pos[i][1]*46, tx=pos[i][0], ty=y+hh/2+6;
      if(d.k==='goi') o+='<rect data-g="'+d.g+'" data-s="'+side+'" data-k="goi" x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" rx="8" fill="'+HM.cam+'" fill-opacity="0.55" stroke="currentColor" stroke-width="2.5"/><text x="'+tx+'" y="'+(ty+(d.an?2:0))+'" text-anchor="middle" font-size="'+((d.an || d.nhan)?24:18)+'" '+HFONT+' fill="'+(d.an?HM.hoi:HM.chu)+'">'+(d.an?'?':(d.nhan ? d.nhan : d.g+' g'))+'</text>';
      else o+='<rect data-dem="vat" data-g="'+d.g+'" data-s="'+side+'" data-k="can" x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" rx="6" fill="'+(d.nhan ? HM.troi : HM.xam)+'" stroke="currentColor" stroke-width="2.5"/>'+(d.nhan ? nhanVien(tx, y+hh/2, 60, 30, d.g+' g', 18) : '<text x="'+tx+'" y="'+ty+'" text-anchor="middle" font-size="18" '+HFONT+' fill="'+HM.chu+'">'+d.g+' g</text>'); }
    return o;
  }
  s+=xep(trai, xL, 't', yp1)+xep(phai, xR, 'p', yp2);
  return khungHinh(s);
}
function docCanNhieu(html){ return String(html).split('<svg ').slice(1).map(function(seg){ var o=[], re=/<rect (?:data-dem="vat" )?data-g="(\d+)" data-s="(\w)" data-k="(\w+)"/g, m, n=/data-nghieng="(\w+)"/.exec(seg); while((m=re.exec(seg))) o.push({g:+m[1], s:m[2], k:m[3]}); return {items:o, nghieng:n ? n[1] : null}; }); }
function tongBen(o, s){ var t=0; o.forEach(function(d){ if(d.s===s) t+=d.g; }); return t; }
function gapKhuc(ds, dv){ dv=dv||'cm';
  var tong=ds.reduce(function(x,y){ return x+y; },0), nho=Math.min.apply(null, ds), sc=Math.min(22, 300/tong), P=[[0,0]], i, ang=[-0.45, 0.35, -0.3];
  for(i=0;i<ds.length;i++){ var L=ds[i]*sc, a=ang[i%3], p=P[P.length-1]; P.push([p[0]+L*Math.cos(a), p[1]+L*Math.sin(a)]); }
  var minY=Math.min.apply(null, P.map(function(p){ return p[1]; })), maxY=Math.max.apply(null, P.map(function(p){ return p[1]; })), PX=40, PT=46, PB=46, W=Math.round(P[P.length-1][0]+2*PX), H=Math.round(maxY-minY+PT+PB), ox=PX, oy=PT-minY, s=svgX(W,H), TEN='ABCDE';
  var Q=P.map(function(p){ return [p[0]+ox, p[1]+oy]; });
  s+='<path d="M'+Q.map(function(p){ return p[0].toFixed(1)+' '+p[1].toFixed(1); }).join(' L')+'" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
  Q.forEach(function(p,j){ s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="2.5" fill="none" stroke="currentColor" stroke-width="6"/>'; var up = (j===0) ? false : (ang[(j-1)%3]<0), tx = j===0 ? p[0]-22 : (j===Q.length-1 ? p[0]+22 : p[0]-16), ty = (j===0 || j===Q.length-1) ? p[1]+8 : (up ? p[1]-14 : p[1]+28); s+='<text x="'+tx.toFixed(1)+'" y="'+ty.toFixed(1)+'" text-anchor="middle" font-size="22" '+HFONT+' fill="currentColor">'+TEN.charAt(j)+'</text>'; });
  for(i=0;i<ds.length;i++){ var mx=(Q[i][0]+Q[i+1][0])/2, my=(Q[i][1]+Q[i+1][1])/2, up2=ang[i%3]<0, lx=mx, ly = up2 ? my+24 : my-24;
    s+='<g data-seg="'+i+'" data-cm="'+ds[i]+'">'+nhanVien(+lx.toFixed(1), +ly.toFixed(1), String(ds[i]).length*12+44, 30, ds[i]+' '+dv, 18)+'</g>'; }
  return khungHinh(s);
}
function docGK(s){ var o=[], re=/data-seg="(\d+)" data-cm="(\d+)"/g, m; while((m=re.exec(String(s)))) o.push(+m[2]); return o; }

/* ---- Hình mới (D4, D5): ngôi nhà trên lưới ô vuông. Thân là hình chữ nhật BCDE (BC ở trên, ED ở dưới), mái là tam giác ABC đỉnh A.
   M là trung điểm của BC, Q là trung điểm của BM, N là trung điểm của ED, P là trung điểm của ND. w = 4 hoặc 8 để mọi toạ độ nguyên. ---- */
function dungNha(w, h1, r){
  var pts={B:[0,h1], C:[w,h1], D:[w,0], E:[0,0], A:[w/2,h1+r], M:[w/2,h1], Q:[w/4,h1], N:[w/2,0], P:[3*w/4,0]};
  return {pts:pts, w:w, h:h1+r, segs:[['A','B'],['A','C'],['B','C'],['C','D'],['D','E'],['E','B']]};
}
function luoiNha(H, ve){ return luoiHinh43(H.w, H.h, ve, H.segs, [{pts:['B','C','D','E']},{pts:['A','B','C']}]); }
function nhaNgauNhien(lv){ var w = lv<=1 ? pick([4,8]) : pick([4,4,8]), h1=rnd(2,3), r = w===4 ? rnd(1,3) : rnd(1,2); return dungNha(w,h1,r); }
/* câu "X là trung điểm của YZ, …": đúng khi mọi mệnh đề đúng theo toạ độ */
function cauTrungDiemDung(cau, pts){ var re=/(\w) là trung điểm của (\w)(\w)/g, m, n=0, ok=true; while((m=re.exec(cau))){ n++; if(!pts[m[1]] || !pts[m[2]] || !pts[m[3]] || !laTrungDiem(pts[m[1]], pts[m[2]], pts[m[3]])) ok=false; } return n>=1 && ok; }
/* số góc vuông ở năm đỉnh A, B, C, D, E của ngôi nhà */
function demGocVuongNha(pts, segs){ var n=0; ['A','B','C','D','E'].forEach(function(T){ if(pts[T]) n+=demGocVuongTai(T, pts, segs); }); return n; }
/* cân thăng bằng: đọc hình, trả về {vat, ok} — gói ? nằm một bên, các quả cân hai bên */
function docCanGoi(html){ var c=docCanNhieu(html)[0]; if(!c || c.nghieng!=='can') return null; var goi=c.items.filter(function(x){ return x.k==='goi'; }); if(goi.length!==1) return null; var s=goi[0].s, k = s==='t' ? 'p' : 't', vat=tongBen(c.items.filter(function(x){ return x.k==='can'; }), k)-tongBen(c.items.filter(function(x){ return x.k==='can'; }), s); return {vat:vat, g:goi[0].g, canBang:tongBen(c.items,'t')===tongBen(c.items,'p')}; }
var TEN_LOI={'thieu-so-0':'Thương thiếu chữ số 0', 'quen-nho':'Quên nhớ khi nhân', 'quen-ha':'Quên hạ chữ số'};

var BAI = {
 n: 44,
 title: 'Ôn Tập Chung',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-nho':'Quên nhớ', 'nho-sai-hang':'Nhớ nhầm hàng', 'quen-ha':'Quên hạ chữ số', 'thieu-so-0':'Thương thiếu chữ số 0', 'nham-trung-diem':'Nhầm trung điểm', 'nham-vuong':'Nhầm góc vuông với góc không vuông', 'dem-sot-goc':'Đếm sót góc vuông', 'tinh-trai-sang-phai':'Làm từ trái sang phải khi có nhân, chia', 'bo-ngoac':'Bỏ dấu ngoặc', 'nham-hang':'Nhẩm sai hàng', 'dem-sot-phep':'Đếm sót hoặc thừa thẻ'},
 muctieu: [
  {id:'MT1', ten:'Nhân, chia', muc:['213 × 3 (không nhớ); 69 : 3 (hai chữ số); chọn tích đúng; An tính 720 : 4 = 18: em thấy thế nào.', '217 × 4, 72 × 3 (có nhớ); 963 : 3, 265 : 5; chọn thương đúng; An sai ở đâu.', '106 × 8, 161 × 5 (nhớ, có 0); 720 : 4 = 180 (thương có 0); kết quả đúng là bao nhiêu.']},
  {id:'MT2', ten:'Hình học', muc:['M có là trung điểm của BC không; góc đỉnh B có vuông không.', 'Trung điểm của BM, ND; hình chữ nhật có mấy góc vuông.', 'Chọn câu đúng về trung điểm; cả ngôi nhà có mấy góc vuông.']},
  {id:'MT3', ten:'Biểu thức', muc:['175 + 42 − 75; 12 × (12 − 9).', '96 : 3 × 5; 60 : (2 × 3).', 'Nhân chia trước với số ba chữ số; thẻ nào bằng số đã cho.']},
  {id:'MT4', ten:'Đo lường và giải toán', muc:['Gấp khúc 30 + 42 + 28; 5 can mỗi can 10 l.', 'Túi muối 200 + 200 + 100; thùng 100 l và 5 can; tuần sau gấp 3 lần.', 'Cân có quả cân cả hai bên; cả hai tuần (hai bước).']}
 ],
 topics: [
  /* D1 — Đặt tính nhân (Bài 1 trang 1, trang 2) */
  {name:'Đặt tính nhân', sec:'Bài 1 trang 1, 2 — 213 × 3 = 639; 217 × 4 = 868; 161 × 5 = 805; 72 × 3 = 216; 116 × 6 = 696; 106 × 8 = 848', mt:['MT1'], levels:3,
   muc:['Không nhớ (213 × 3): ô ? là một chữ số của tích.', 'Nhớ một lần (217 × 4, 72 × 3): điền cả tích.', 'Nhớ hai lần hoặc thừa số có chữ số 0 (161 × 5, 106 × 8): điền cả tích.'],
   make:function(lv){
    var p, an, ans, B, sai;
    if(lv<=1){ p=phepNhan(0,{khongSo0:true}); an=pick(['tram','chuc','donvi']); }
    else if(lv===2){ p = Math.random()<0.5 ? phepNhan(1) : phepNhan2(1); an='tich'; }
    else { p = Math.random()<0.5 ? phepNhan(2) : phepNhan(1,{coSo0:true}); an='tich'; }
    B=buocNhan(p.a,p.b);
    if(an==='tich'){ ans=B.tich; sai=[[ketQuaSai(p.a,p.b,'quen-nho'),'quen-nho'],[ketQuaSai(p.a,p.b,'nho-sai-hang')>999 ? 0 : ketQuaSai(p.a,p.b,'nho-sai-hang'),'nho-sai-hang'],[p.a+p.b,'cong-thay-nhan'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    else { var vt = an==='tram' ? 0 : (an==='chuc' ? 1 : 2), tsA = an==='tram' ? B.a2 : (an==='chuc' ? B.a1 : B.a0); ans=chuSoTich(B.tich, vt); sai=[[tsA,'dao-vai'],[tsA+p.b,'cong-thay-nhan'],[ans+1,'nham-bang'],[ans-1,'nham-bang']]; }
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an}, q:nhanDoc(p.a, p.b, {an:an})+'<div>'+(an==='tich' ? 'Tích ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : 'Chữ số ở ô <b class="text-amber-700">?</b> là bao nhiêu?')+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var p=q._pt, B=buocNhan(p.a,p.b); if(!kiemNhanDoc(q) || B.tich>999) return false; var nho = p.a>=100 ? B.soNho : (B.c0>0 ? 1 : 0);
    if(q._lv<=1 && !(p.a>=100 && nho===0)) return false; if(q._lv===2 && nho!==1) return false; if(q._lv===3 && !(p.a>=100 && nho>=1 && (nho===2 || B.a1===0))) return false;
    var e = p.an==='tich' ? B.tich : chuSoTich(B.tich, p.an==='tram' ? 0 : (p.an==='chuc' ? 1 : 2)); return q.ans===e; }},

  /* D2 — Đặt tính chia (Bài 2 trang 1, trang 2) */
  {name:'Đặt tính chia', sec:'Bài 2 trang 1, 2 — 69 : 3 = 23; 68 : 4 = 17; 80 : 5 = 16; 963 : 3 = 321; 265 : 5 = 53; 720 : 4 = 180', mt:['MT1'], levels:3,
   muc:['Số bị chia hai chữ số (69 : 3, 68 : 4): điền thương.', 'Số bị chia ba chữ số, chia hết (963 : 3, 265 : 5): điền thương.', 'Thương có chữ số 0 (720 : 4 = 180): điền thương.'],
   make:function(lv){
    var d, c, ans, sai, hinh;
    if(lv<=1){ d=phepHaiBuoc({het:true, q0khac0:true}); c=chia(d.a,d.b); hinh=chiaDoc2(d.a,d.b,{an:'q0'}); sai=[[Math.floor(c.q/10),'quen-ha'],[c.q+1,'nham-bang'],[c.q-1,'nham-bang'],[d.a-d.b,'chon-sai-phep']]; }
    else { d = lv===2 ? phepChia3({het:true, khong0:true}) : phepChia3({het:true, so0:true}); c=chia(d.a,d.b); hinh=chiaDoc3(d.a,d.b,{an:'q0'}); sai=nhieuChia(d.a,d.b); }
    ans=c.q;
    return {type:'num', _lv:lv, _kieu:(lv<=1?'hai':'ba'), _pt:{a:d.a,b:d.b,an:'q0'}, q:hinh+'<div>Thương của phép chia <b>'+d.a+' : '+d.b+'</b> là bao nhiêu? (Ô <b class="text-amber-700">?</b> là chữ số cuối của thương.)</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var p=q._pt, c=chia(p.a,p.b), th=String(c.q); if(c.r!==0 || c.q<10) return false;
    if(q._kieu==='hai') return q._lv<=1 && p.a<=99 && Math.floor(p.a/10)>=p.b && kiemChia2(q) && q.ans===c.q;
    if(!kiemChia3(q)) return false; if(q._lv===2 && th.indexOf('0')>=0) return false; if(q._lv===3 && th.indexOf('0')<0) return false; return q.ans===c.q; }},

  /* D3 — Chọn kết quả đúng (không có trong SGK) */
  {name:'Chọn kết quả đúng', sec:'Ôn tập — Chọn kết quả đúng của phép nhân, phép chia trong bốn số', mt:['MT1'], levels:3,
   muc:['Tích của 213 × 3 trong bốn số.', 'Thương của 963 : 3 trong bốn số.', 'Thương có chữ số 0 (720 : 4): 180 hay 18, 108, 190.'],
   make:function(lv){
    var p, T, ch, sai={}, i, bt;
    if(lv<=1){ p = Math.random()<0.5 ? phepNhan(0) : phepNhan(1); T=p.tich; bt=p.a+' × '+p.b; ch=[[T,''],[ketQuaSai(p.a,p.b,'quen-nho'),'quen-nho'],[T+10,'nham-bang'],[p.a+p.b,'cong-thay-nhan'],[T-100,'nham-bang']]; }
    else if(lv===2){ p=phepChia3({het:true, khong0:true}); T=p.q; bt=p.a+' : '+p.b; var th=String(T); ch=[[T,''],[T+1,'nham-bang'],[T*10>999 ? T-10 : T*10,'nham-hang'],[+th.split('').reverse().join(''),'nham-bang'],[T-1,'nham-bang']]; }
    else { p=phepChia3({het:true, so0:true}); T=p.q; bt=p.a+' : '+p.b; var th3=String(T), dao = th3.charAt(1)==='0' ? +(th3.charAt(0)+th3.charAt(2)+'0') : +(th3.charAt(0)+'0'+th3.charAt(1)); ch=[[T,''],[+th3.replace(/0/g,''),'thieu-so-0'],[dao,'nham-hang'],[T+10,'nham-bang'],[T-10,'nham-bang']]; }
    var seen=[T], opts=[[T,'']]; for(i=1;i<ch.length && opts.length<4;i++){ var v=ch[i][0]; if(Number.isInteger(v) && v>0 && v<=999 && seen.indexOf(v)<0){ seen.push(v); opts.push(ch[i]); } }
    opts=shuffle(opts); var cs=opts.map(function(o){ return String(o[0]); }); opts.forEach(function(o,k){ if(o[0]!==T) sai[String(k)]=o[1]||'nham-bang'; });
    return {type:'mcq', cot:2, _lv:lv, _a:p.a, _b:p.b, _T:T, _dung:String(T), q:bieuThucTo(bt)+'<div>'+(lv<=1 ? 'Tích' : 'Thương')+' của phép tính này là số nào?</div>', choices:cs, correct:cs.indexOf(String(T)), sai:sai, goiY:gy()};
  }, check:function(q){ var e = q._lv<=1 ? q._a*q._b : q._a/q._b; if(q._lv>=2 && (q._a%q._b!==0 || e<10)) return false; if(q._lv===2 && String(e).indexOf('0')>=0) return false; if(q._lv===3 && String(e).indexOf('0')<0) return false; return kiemMCQ(q) && q.choices.length>=3 && +q._dung===e && e===q._T && e<=999; }},

  /* D4 — Trung điểm ngôi nhà (Bài 3a trang 1) */
  {name:'Trung điểm ngôi nhà', sec:'Bài 3a trang 1 — Ngôi nhà trên lưới: M là trung điểm của BC, N của ED, Q của BM, P của ND', mt:['MT2'], levels:3,
   muc:['M có là trung điểm của BC không (Có / Không).', 'Điểm nào là trung điểm của BM (hoặc ND).', 'Chọn câu đúng trong bốn câu về trung điểm.'],
   make:function(lv){
    var H=nhaNgauNhien(lv), pts=H.pts;
    if(lv<=1){ var dung=Math.random()<0.5; if(!dung) pts.M=[pts.M[0]+pick([-1,1]), pts.M[1]]; var ve={A:pts.A,B:pts.B,C:pts.C,D:pts.D,E:pts.E,M:pts.M}, v=laTrungDiem(pts.M,pts.B,pts.C);
      return {type:'mcq', _lv:1, _dung:(v?'Có':'Không'), q:luoiNha(H, ve)+'<div>Ngôi nhà vẽ trên lưới ô vuông. Điểm M có phải là trung điểm của đoạn thẳng BC không?</div>', choices:['Có','Không'], correct:(v?0:1), sai:(v?{'1':'nham-trung-diem'}:{'0':'nham-trung-diem'}), goiY:gy()}; }
    if(lv===2){ var hoiBM=Math.random()<0.5, doan = hoiBM ? 'BM' : 'ND', d2 = hoiBM ? 'Q' : 'P', ch=shuffle(['Q','M','N','P']), sai={}; ch.forEach(function(c,i){ if(c!==d2) sai[String(i)]='nham-trung-diem'; });
      return {type:'mcq', cot:2, _lv:2, _doan:doan, _dung:d2, q:luoiNha(H, pts)+'<div>Ngôi nhà vẽ trên lưới ô vuông. Điểm nào là trung điểm của đoạn thẳng <b>'+doan+'</b>?</div>', choices:ch, correct:ch.indexOf(d2), sai:sai, goiY:gy()}; }
    var d3='M là trung điểm của BC, P là trung điểm của ND', ch3=shuffle([d3, 'Q là trung điểm của BC, N là trung điểm của ED', 'M là trung điểm của BC, N là trung điểm của ND', 'P là trung điểm của ED, Q là trung điểm của BM']), sai3={}; ch3.forEach(function(c,i){ if(c!==d3) sai3[String(i)]='nham-trung-diem'; });
    return {type:'mcq', cot:1, _lv:3, _dung:d3, q:luoiNha(H, pts)+'<div>Ngôi nhà vẽ trên lưới ô vuông. Câu nào đúng?</div>', choices:ch3, correct:ch3.indexOf(d3), sai:sai3, goiY:gy()};
  }, check:function(q){ var p=docHinh43(q.q).pts; if(!kiemMCQ(q)) return false;
    if(q._lv<=1) return q._dung===(laTrungDiem(p.M,p.B,p.C)?'Có':'Không');
    if(q._lv===2){ var a=q._doan.charAt(0), b=q._doan.charAt(1); return q.choices.length===4 && laTrungDiem(p[q._dung],p[a],p[b]) && q.choices.filter(function(c){ return laTrungDiem(p[c],p[a],p[b]); }).length===1; }
    return q.choices.length===4 && cauTrungDiemDung(q._dung,p) && q.choices.filter(function(c){ return cauTrungDiemDung(c,p); }).length===1; }},

  /* D5 — Góc vuông ngôi nhà (Bài 3b trang 1) */
  {name:'Góc vuông ngôi nhà', sec:'Bài 3b trang 1 — Ngôi nhà có mấy góc vuông: bốn góc của hình chữ nhật BCDE; mái không vuông', mt:['MT2'], levels:3,
   muc:['Góc đỉnh B (cạnh BC, BE) hay đỉnh A (cạnh AB, AC) có vuông không.', 'Hình chữ nhật BCDE có mấy góc vuông.', 'Cả ngôi nhà có bao nhiêu góc vuông (mái có thể vuông).'],
   make:function(lv){
    var H=nhaNgauNhien(lv), pts=H.pts, ve={A:pts.A,B:pts.B,C:pts.C,D:pts.D,E:pts.E};
    if(lv<=1){ var canh={A:['B','C'],B:['C','E'],C:['B','D'],D:['C','E'],E:['D','B']}, T=pick(['A','A','B','C','D','E']), c=canh[T], v=laVuong(pts[T],pts[c[0]],pts[c[1]]);
      return {type:'mcq', _lv:1, _T:T, _c:c, _dung:(v?'Có':'Không'), q:luoiNha(H, ve)+'<div>Ngôi nhà vẽ trên lưới ô vuông. Góc đỉnh '+T+', cạnh '+T+c[0]+' và '+T+c[1]+' có phải là góc vuông không?</div>', choices:['Có','Không'], correct:(v?0:1), sai:(v?{'1':'nham-vuong'}:{'0':'nham-vuong'}), goiY:gy()}; }
    if(lv===2) return {type:'num', _lv:2, q:luoiNha(H, ve)+'<div>Ngôi nhà vẽ trên lưới ô vuông. Hình chữ nhật BCDE có bao nhiêu góc vuông?</div>', ans:4, unit:'góc vuông', sai:nhanSai([[2,'dem-sot-goc'],[3,'dem-sot-goc'],[5,'nham-vuong'],[1,'dem-sot-goc']], 4), goiY:gy()};
    var n=demGocVuongNha(pts, H.segs);
    return {type:'num', _lv:3, q:luoiNha(H, ve)+'<div>Ngôi nhà vẽ trên lưới ô vuông gồm mái ABC và thân BCDE. Cả ngôi nhà có bao nhiêu góc vuông (xét các góc ở đỉnh A, B, C, D, E)?</div>', ans:n, unit:'góc vuông', sai:nhanSai([[n-1,'dem-sot-goc'],[n+1,'nham-vuong'],[n-2,'dem-sot-goc'],[n+2,'nham-vuong']], n), goiY:gy({'nham-vuong':'Góc ở đỉnh A chỉ vuông khi hai cạnh mái vuông góc với nhau. Góc ABE và góc ACD lớn hơn góc vuông.'})};
  }, check:function(q){ var d=docHinh43(q.q), p=d.pts; if(!p.A || !p.B || !p.C || !p.D || !p.E) return false; var hcn = laVuong(p.B,p.C,p.E) && laVuong(p.C,p.B,p.D) && laVuong(p.D,p.C,p.E) && laVuong(p.E,p.D,p.B); if(!hcn) return false;
    if(q._lv<=1) return kiemMCQ(q) && q._dung===(laVuong(p[q._T],p[q._c[0]],p[q._c[1]])?'Có':'Không');
    if(q._lv===2) return q.ans===4; var n=demGocVuongNha(p, d.segs); return d.segs.length===6 && q.ans===n && n>=4 && n<=5; }},

  /* D6 — Biểu thức không ngoặc (Bài 4a trang 1, trang 2) */
  {name:'Biểu thức không ngoặc', sec:'Bài 4a trang 1, 2 — 175 + 42 − 75 = 142; 96 : 3 × 5 = 160', mt:['MT3'], levels:3,
   muc:['Chỉ cộng trừ với số ba chữ số (175 + 42 − 75).', 'Chỉ nhân chia (96 : 3 × 5).', 'Nhân chia trước, cộng trừ sau với số lớn.'],
   make:function(lv){
    var t = lv<=1 ? btTrai3() : (lv===2 ? btNhanChia() : btUuTien3()), T=tinhBT2(t), tk=t.split(' '), b1=tk.slice(0,3).join(' '), v1=tinhBT(b1), sai;
    if(lv===3) sai=nhieuGiaTri(t).concat([[tinhBT(b1),'thieu-buoc']]); else sai=[[v1,'thieu-buoc'],[T+1,'nham-bang'],[T-1,'nham-bang'],[T+10,'nham-bang'],[tinhBT(tk.slice(2).join(' ')),'nham-gia-tri']];
    return {type:'num', _lv:lv, _bt:t, q:kyHieu('Tính giá trị của biểu thức', t+' ='+oHoi()), ans:T, sai:nhanSai(sai, T), goiY:gy({'thieu-buoc': lv===3 ? 'Bé làm phép nhân, chia trước rồi mới cộng, trừ.' : 'Bé làm phép đầu được '+v1+', rồi làm tiếp phép sau.', 'nham-gia-tri':'Bé làm từ trái sang phải: '+b1+' = '+v1+' trước.'})};
  }, check:function(q){ var t=q._bt; if(!laBT(t) || !okBuoc(t) || q.ans!==tinhBT2(t) || soPhep(t)!==2) return false;
    if(q._lv<=1) return !/[×:]/.test(t) && /\d{3}/.test(t); if(q._lv===2) return /[×:]/.test(t) && !/[+−]/.test(t); return /[×:]/.test(t) && /[+−]/.test(t) && tinhTSP(t)!==tinhBT2(t); }},

  /* D7 — Biểu thức có ngoặc (Bài 4b trang 1, trang 2) */
  {name:'Biểu thức có ngoặc', sec:'Bài 4b trang 1, 2 — 12 × (12 − 9) = 36; 60 : (2 × 3) = 10', mt:['MT3'], levels:3,
   muc:['a × (b − c): 12 × (12 − 9).', 'a : (b × c): 60 : (2 × 3).', 'Bốn thẻ có ngoặc và không ngoặc: thẻ nào bằng số đã cho.'],
   make:function(lv){
    var t, g;
    if(lv<=1){ for(g=0;g<300;g++){ var a=rnd(2,30), b=rnd(5,20), c=rnd(1,b-1); t=a+' × ('+b+' − '+c+')'; if(okBuoc(t) && okSo(tinhBoNgoac(t)) && tinhBoNgoac(t)!==tinhBT2(t)) break; } }
    else if(lv===2){ for(g=0;g<300;g++){ var b2=rnd(2,5), c2=rnd(2,5), a2=b2*c2*rnd(2,30); t=a2+' : ('+b2+' × '+c2+')'; if(okBuoc(t) && okSo(tinhBoNgoac(t)) && tinhBoNgoac(t)!==tinhBT2(t)) break; } }
    else { var ds=nhieuBT(function(){ return Math.random()<0.7 ? btNgoac3() : btUuTien3(); }, 4), dung=pick(ds), T3=tinhBT2(dung), sai3={}; ds.forEach(function(x,i){ if(x!==dung) sai3[String(i)]=(tinhBoNgoac(x)===T3 ? 'bo-ngoac' : (tinhTSP(x)===T3 ? 'tinh-trai-sang-phai' : 'nham-bang')); });
      return {type:'mcq', cot:1, _lv:3, _ds:ds, _T:T3, _dung:dung, q:theTinh(ds)+'<div>Thẻ nào ghi biểu thức có giá trị bằng <b class="text-2xl text-orange-600">'+T3+'</b>?</div>', choices:ds, correct:ds.indexOf(dung), sai:sai3, goiY:gy({'nham-bang':'Bé tính giá trị từng thẻ rồi so với '+T3+'.'})}; }
    var T=tinhBT2(t), trong=/\(([^()]+)\)/.exec(t)[1];
    return {type:'num', _lv:lv, _bt:t, q:kyHieu('Tính giá trị của biểu thức', t+' ='+oHoi()), ans:T, sai:nhanSai(nhieuGiaTri(t).concat([[tinhBT(trong),'thieu-buoc']]), T), goiY:gy({'thieu-buoc':'Trong ngoặc được '+tinhBT(trong)+', bé làm tiếp phép còn lại.'})};
  }, check:function(q){
    if(q._lv===3){ var ds=q._ds; if(docThe(q.q).join('|')!==ds.join('|') || ds.length!==4 || !ds.every(okBuoc)) return false; return kiemMCQ(q) && ds.filter(function(t){ return tinhBT2(t)===q._T; }).length===1 && tinhBT2(q._dung)===q._T; }
    var t=q._bt; if(!okBuoc(t) || q.ans!==tinhBT2(t) || tinhBoNgoac(t)===tinhBT2(t)) return false; return q._lv<=1 ? /^\d+ × \(\d+ − \d+\)$/.test(t) : /^\d+ : \(\d+ × \d+\)$/.test(t); }},

  /* D8 — Gấp khúc và túi muối (Bài 3 trang 2) */
  {name:'Gấp khúc và túi muối', sec:'Bài 3 trang 2 — Đường gấp khúc ABCD: 30 mm + 42 mm + 28 mm = 100 mm; túi muối cân bằng hai quả cân 200 g và một quả 100 g: 500 g', mt:['MT4'], levels:3,
   muc:['Đường gấp khúc ABCD ba đoạn khác nhau (mm).', 'Túi muối một bên, các quả cân bên kia.', 'Cân có quả cân cả hai bên.'],
   make:function(lv){
    if(lv<=1){ var ds=[], g=0; while(ds.length<3 && g<100){ g++; var d=rnd(20,45); if(ds.indexOf(d)<0) ds.push(d); } var T=ds[0]+ds[1]+ds[2];
      return {type:'num', _lv:1, _kieu:'gk', _ds:ds, q:gapKhuc(ds,'mm')+'<div>Đường gấp khúc ABCD có ba đoạn thẳng dài <b>'+ds[0]+' mm</b>, <b>'+ds[1]+' mm</b>, <b>'+ds[2]+' mm</b>. Đường gấp khúc dài bao nhiêu mi-li-mét?</div>', ans:T, unit:'mm', sai:nhanSai([[ds[0]+ds[1],'thieu-buoc'],[ds[1]+ds[2],'thieu-buoc'],[T+10,'nham-bang'],[T-10,'nham-bang']], T), goiY:gy({'thieu-buoc':'Độ dài đường gấp khúc bằng tổng độ dài ba đoạn: '+ds[0]+' + '+ds[1]+' + '+ds[2]+'.'})}; }
    var P=[100,200,500,50], can=[], ben=[], L, R, vat, g2=0, ten=pick(['Túi muối','Túi đường','Gói bột','Hộp bánh']);
    do{ g2++; can=[pick(P),pick(P)]; if(Math.random()<0.5) can.push(pick(P)); ben = lv===3 ? [pick([50,100,200])] : []; L=can.reduce(function(a,b){ return a+b; },0); R=ben.reduce(function(a,b){ return a+b; },0); vat=L-R; }while(g2<300 && (vat<=0 || L>999));
    var trai=[{g:vat,k:'goi',an:true}].concat(ben.map(function(x){ return {g:x,k:'can'}; })), phai=can.map(function(x){ return {g:x,k:'can'}; });
    var sai = lv===3 ? [[L+R>999 ? 0 : L+R,'chon-sai-phep'],[L,'thieu-buoc'],[R,'dao-vai'],[vat+100,'nham-bang']] : [[can[0]+can[1],'thieu-buoc'],[vat+100,'nham-bang'],[vat-100,'nham-bang'],[can.length,'dao-vai']];
    return {type:'num', _lv:lv, _kieu:'can', _vat:vat, q:canDia(trai, phai)+'<div>Cân thăng bằng. Bên trái có '+ten.toLowerCase()+(ben.length ? ' và quả cân' : '')+', bên phải có các quả cân. '+ten+' nặng bao nhiêu gam?</div>', ans:vat, unit:'g', sai:nhanSai(sai, vat), goiY:gy({'thieu-buoc': lv===3 ? 'Hai bên nặng bằng nhau: '+ten.toLowerCase()+' = tổng quả cân bên phải − quả cân bên trái.' : 'Bé cộng tất cả các quả cân bên phải.'})};
  }, check:function(q){ if(q._kieu==='gk'){ var d=docGK(q.q); return d.join()===q._ds.join() && d.length===3 && new Set(d).size===3 && q.ans===d[0]+d[1]+d[2]; }
    var c=docCanGoi(q.q); return !!c && c.canBang && c.vat===q._vat && q.ans===q._vat && c.g===q._vat && q._vat>0 && q._vat<=999; }},

  /* D9 — Nước mắm và thùng sách (Bài 5 trang 1, trang 2) */
  {name:'Nước mắm và thùng sách', sec:'Bài 5 trang 1, 2 — 1 thùng 100 l và 5 can mỗi can 10 l: 150 l; tuần đầu 20 thùng, tuần sau gấp 3 lần: 60 thùng, cả hai tuần 80 thùng', mt:['MT4'], levels:3,
   muc:['5 can, mỗi can 10 l: bao nhiêu lít.', 'Thùng 100 l và 5 can (hai bước); tuần sau gấp 3 lần 20 thùng.', 'Cả hai tuần bao nhiêu thùng (hai bước).'],
   make:function(lv){
    var vat=pick([['nước mắm','can','l'],['dầu ăn','can','l'],['nước lọc','bình','l']]);
    if(lv<=1){ var n=rnd(3,9), k=pick([5,10,20]);
      return {type:'num', _lv:1, _kieu:'can', _n:n, _k:k, q:'<div>Một cửa hàng có <b>'+n+' '+vat[1]+' '+vat[0]+'</b>, mỗi '+vat[1]+' chứa <b>'+k+' l</b>. Cửa hàng có bao nhiêu lít '+vat[0]+' trong các '+vat[1]+'?</div>', ans:n*k, unit:'l', sai:nhanSai([[n+k,'cong-thay-nhan'],[n*k+10,'nham-bang'],[k,'dao-vai']], n*k), goiY:gy()}; }
    if(lv===2 && Math.random()<0.5){ var n2=rnd(3,9), k2=pick([5,10,20]), th=pick([100,200,50]), T2=th+n2*k2;
      return {type:'num', _lv:2, _kieu:'thung', _n:n2, _k:k2, _th:th, q:'<div>Một cửa hàng có <b>1 thùng '+vat[0]+' '+th+' l</b> và <b>'+n2+' '+vat[1]+'</b>, mỗi '+vat[1]+' <b>'+k2+' l</b>. Cửa hàng có tất cả bao nhiêu lít '+vat[0]+'?</div>', ans:T2, unit:'l', sai:nhanSai([[n2*k2,'thieu-buoc'],[th+n2+k2,'cong-thay-nhan'],[th+n2*k2+10,'nham-bang'],[th,'thieu-buoc']], T2), goiY:gy({'thieu-buoc':'Bước 1: '+n2+' '+vat[1]+' có '+k2+' × '+n2+' lít. Bước 2: cộng với '+th+' l của thùng.'})}; }
    var a=rnd(10,60), g=rnd(2,5), sau=a*g, ca=a+sau; while(ca>999){ a-=5; sau=a*g; ca=a+sau; }
    var ten=pick([['thùng sách','thùng'],['hộp bút','hộp'],['túi gạo','túi']]), de='<div>Tuần đầu một đội tình nguyện quyên góp được <b>'+a+' '+ten[0]+'</b>, tuần sau quyên góp được <b>gấp '+g+' lần</b> tuần đầu. ';
    if(lv===2) return {type:'num', _lv:2, _kieu:'sau', _a:a, _g:g, q:de+'Tuần sau đội quyên góp được bao nhiêu '+ten[0]+'?</div>', ans:sau, unit:ten[1], sai:nhanSai([[a+g,'cong-thay-nhan'],[ca,'dao-vai'],[sau+10,'nham-bang']], sau), goiY:gy()};
    return {type:'num', _lv:3, _kieu:'ca', _a:a, _g:g, q:de+'Cả hai tuần đội quyên góp được bao nhiêu '+ten[0]+'?</div>', ans:ca, unit:ten[1], sai:nhanSai([[sau,'thieu-buoc'],[a+g,'cong-thay-nhan'],[sau-a,'chon-sai-phep'],[ca+10,'nham-bang']], ca), goiY:gy({'thieu-buoc':'Bước 1: tuần sau được '+a+' × '+g+'. Bước 2: cộng với '+a+' của tuần đầu.'})};
  }, check:function(q){ var k=q._kieu; if(k==='can') return q.ans===q._n*q._k && q.ans<=999; if(k==='thung') return q.ans===q._th+q._n*q._k && q.ans<=999; var sau=q._a*q._g; if(q._a+sau>999) return false; return q.ans===(k==='sau' ? sau : q._a+sau); }},

  /* D10 — Bạn An làm (không có trong SGK) */
  {name:'Bạn An làm', sec:'Tìm lỗi — An tính 720 : 4 = 18 (thiếu chữ số 0); An quên nhớ khi nhân', mt:['MT1'], levels:3,
   muc:['An tính 720 : 4 = 18: em thấy thế nào.', 'An sai ở đâu: thiếu chữ số 0 hay quên nhớ.', 'Kết quả đúng là bao nhiêu.'],
   make:function(lv){
    if(lv<=1){ var d=phepChia3({het:true, so0:true}), c=chia(d.a,d.b), xq=+String(c.q).replace(/0/g,''), dung=Math.random()<0.5, x = dung ? c.q : xq, dungC, saiC;
      if(dung){ dungC='Đồng ý, vì '+c.q+' × '+d.b+' = '+d.a; saiC='Không đồng ý, vì '+xq+' × '+d.b+' = '+(xq*d.b); } else { dungC='Không đồng ý, vì '+c.q+' × '+d.b+' = '+d.a; saiC='Đồng ý, vì '+xq+' × '+d.b+' = '+(xq*d.b); }
      var ch=shuffle([dungC,saiC]), sai={}; sai[String(ch.indexOf(saiC))]='thieu-so-0';
      return {type:'mcq', cot:1, _lv:1, _a:d.a, _b:d.b, _x:x, _dung:dungC, q:nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+d.a+' : '+d.b+' = '+x+'</b>». Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dungC), sai:sai, goiY:gy({'thieu-so-0':'Bé thử lại: thương × số chia phải bằng số bị chia.'})}; }
    var kind=pick(['thieu-so-0','quen-nho']), a, b, x, T;
    if(kind==='thieu-so-0'){ var d2=phepChia3({het:true, so0:true}); a=d2.a; b=d2.b; T=d2.q; x=+String(T).replace(/0/g,''); } else { var p=phepNhan(1); a=p.a; b=p.b; T=p.tich; x=ketQuaSai(a,b,'quen-nho'); }
    var noi = a+(kind==='thieu-so-0' ? ' : ' : ' × ')+b+' = '+x;
    if(lv===3) return {type:'num', _lv:3, _kind:kind, _a:a, _b:b, _x:x, q:nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+noi+'</b>». An tính sai rồi! Kết quả đúng là bao nhiêu?</div>', ans:T, sai:nhanSai([[x,kind],[T+1,'nham-bang'],[T-1,'nham-bang'],[T+10,'nham-bang']], T), goiY:gy()};
    var kinds=['thieu-so-0','quen-nho','quen-ha'], ch2=shuffle(kinds.slice()).map(function(k){ return TEN_LOI[k]; }), dung2=TEN_LOI[kind], sai2={}; ch2.forEach(function(c,i){ if(c!==dung2) sai2[String(i)]=kinds.filter(function(k){ return TEN_LOI[k]===c; })[0]; });
    return {type:'mcq', cot:1, _lv:2, _kind:kind, _a:a, _b:b, _x:x, _dung:dung2, q:nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+noi+'</b>». An làm sai rồi! An sai ở đâu?</div>', choices:ch2, correct:ch2.indexOf(dung2), sai:sai2, goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b;
    if(q._lv<=1){ var c=chia(a,b); if(c.r!==0 || String(c.q).indexOf('0')<0) return false; return q.choices.length===2 && q.choices.every(okEq) && kiemMCQ(q) && /^Đồng ý/.test(q._dung)===(q._x===c.q); }
    var T = q._kind==='thieu-so-0' ? a/b : a*b; if(!Number.isInteger(T) || T>999 || q._x===T) return false; if(q._kind==='thieu-so-0' && String(T).indexOf('0')<0) return false;
    if(q._lv===3) return q.ans===T; return kiemMCQ(q) && q.choices.length===3 && q._dung===TEN_LOI[q._kind]; }}
 ]
};
