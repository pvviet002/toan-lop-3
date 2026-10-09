/* bai-36.js — Bài 36: Nhân số có ba chữ số với số có một chữ số. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-36.md, PR #28): 4 MỤC TIÊU (muctieu) × 9 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Thừa số thứ nhất có ba chữ số, thừa số thứ hai 2–9, tích luôn <= 999. Không số âm, không số thập phân.
   Hình mới viết ngay trong file này (không sửa figures.js): nhanDoc3 (đặt tính nhân dọc, số nhớ nhỏ, ô "?"); canDia chép từ bài 35 (xếp được 4 vật một bên); bảng tri chép từ bài 13.
   Mỗi chữ số trong khung đặt tính mang data-pt; check() tính lại từ hai thừa số, không tin chữ số vẽ ra. Mọi đẳng thức trong phương án "Đồng ý / Không đồng ý" đúng số học.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
function so(n){ return n>=1000 ? Math.floor(n/1000)+' '+('00'+(n%1000)).slice(-3) : String(n); }
var GOI={'nham-bang':'Bé nhẩm lại bảng nhân rồi tính từng hàng: đơn vị, chục, trăm.', 'cong-thay-nhan':'Có nhiều phần bằng nhau thì nhân, không cộng hai số với nhau.', 'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!', 'dao-vai':'Bé xem lại: ô ? là thừa số hay tích?', 'chon-sai-phep':'Bé đọc kỹ: gấp lên là nhân, bớt đi là trừ, gộp lại là cộng.',
  'quen-nho':'Nhân ở một hàng được số có hai chữ số thì viết chữ số đơn vị, NHỚ chữ số chục sang hàng bên trái.', 'nho-sai-hang':'Số nhớ cộng vào hàng liền bên trái, không nhảy cách hàng.', 'nham-hang':'3 trăm × 3 = 9 trăm, tức là 900. Bé nhẩm theo trăm rồi viết đủ hai chữ số 0.', 'thieu-so-0':'Tích phải có đủ chữ số 0 ở hàng đơn vị: 250 × 3 = 750, không phải 75.', 'nham-cao-thap':'Đĩa cân bên nào thấp hơn thì bên đó nặng hơn.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
function theTinh(ds){
  var s='<div class="flex flex-wrap justify-center gap-2 my-2">';
  ds.forEach(function(t){ s+='<span class="inline-block px-3 py-2 rounded-xl border-2 border-amber-300 text-slate-700 font-extrabold text-xl whitespace-nowrap">'+t+'</span>'; });
  return s+'</div>';
}
function docThe(s){ var o=[], re=/<span class="inline-block px-3 py-2[^>]*>([^<]*)<\/span>/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }
/* Bảng ba hàng (chép từ bài 13): nhãn r1/r2/r3, giá trị v1/v2/v3, hide = chỉ số ô "?" */
function tri(r1,r2,r3, v1,v2,v3, hide){
  function cell(v,on){ return '<td data-o="'+(on?'?':v)+'" class="px-5 py-1 text-center text-lg '+(on?'bg-amber-100 text-amber-700 font-extrabold':'font-bold text-slate-700')+'" style="border:1px solid #fcd34d">'+(on?'?':v)+'</td>'; }
  function lab(t){ return '<td class="px-3 py-1 font-bold text-slate-600 bg-amber-50" style="border:1px solid #fcd34d">'+t+'</td>'; }
  return '<table class="mx-auto border-collapse my-2" style="border:2px solid #fcd34d;border-radius:8px;overflow:hidden">'
   +'<tr>'+lab(r1)+cell(v1,hide===0)+'</tr><tr>'+lab(r2)+cell(v2,hide===1)+'</tr><tr>'+lab(r3)+cell(v3,hide===2)+'</tr></table>';
}
function docTri(s){ var o=[], re=/data-o="([^"]*)"/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }

/* ---- Phép nhân: các chữ số và số nhớ từng hàng ---- */
function buocNhan(a, b){
  var a2=Math.floor(a/100), a1=Math.floor(a/10)%10, a0=a%10, p0=a0*b, c0=Math.floor(p0/10), p1=a1*b+c0, c1=Math.floor(p1/10), p2=a2*b+c1, tich=a*b;
  return {a2:a2, a1:a1, a0:a0, c0:c0, c1:c1, d0:p0%10, d1:p1%10, d2:p2, tich:tich, soNho:(c0>0?1:0)+(c1>0?1:0)};
}
/* ---- Hình mới 1 (D2, D3, D9): đặt tính nhân dọc. Cột chữ số: trăm (44) · chục (80) · đơn vị (116); dấu × ở x=14.
   Hàng 1: thừa số a · Hàng 2: × b · gạch ngang · Hàng 3: tích. tuy.an = 'tram'|'chuc'|'donvi' (một chữ số của tích là ô "?") hoặc 'tich' (cả tích là ô "?").
   tuy.nho = ghi số nhớ nhỏ phía trên cột chục, trăm. tuy.bieuDien = tích do bạn An viết (có thể sai). ---- */
function nhanDoc3(a, b, tuy){
  tuy=tuy||{}; var B=buocNhan(a,b), X=[44,80,116], s=svgX(150,182,150), i;
  function hang(x, y, ch, id){
    var r='';
    if(ch==='?') r+='<rect x="'+(x-17)+'" y="'+(y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
    return r+'<text data-pt="'+id+'" x="'+x+'" y="'+y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(ch==='?'?HM.hoi:'currentColor')+'">'+ch+'</text>'; }
  if(tuy.nho){ if(B.c0>0) s+='<text data-pt="n1" x="'+(X[1]+13)+'" y="22" text-anchor="middle" font-size="16" '+HFONT+' fill="currentColor" opacity=".75">'+B.c0+'</text>'; if(B.c1>0) s+='<text data-pt="n2" x="'+(X[0]+13)+'" y="22" text-anchor="middle" font-size="16" '+HFONT+' fill="currentColor" opacity=".75">'+B.c1+'</text>'; }
  s+=hang(X[0], 64, String(B.a2), 'a2')+hang(X[1], 64, String(B.a1), 'a1')+hang(X[2], 64, String(B.a0), 'a0');
  s+='<text x="14" y="114" text-anchor="middle" font-size="28" '+HFONT+' fill="currentColor">&#215;</text>'+hang(X[2], 114, String(b), 'b0');
  s+='<line x1="26" y1="128" x2="136" y2="128" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
  if(tuy.an==='tich'){ s+='<rect x="'+(X[0]-20)+'" y="138" width="'+(X[2]-X[0]+40)+'" height="38" rx="8" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/><text data-pt="p" x="'+X[1]+'" y="168" text-anchor="middle" font-size="34" '+HFONT+' fill="'+HM.hoi+'">?</text>'; }
  else { var d=String(tuy.bieuDien!==undefined ? tuy.bieuDien : B.tich), L=d.length; for(i=0;i<L;i++){ var vt=3-L+i, id='p'+(L-1-i), an=(tuy.an==='tram'&&vt===0)||(tuy.an==='chuc'&&vt===1)||(tuy.an==='donvi'&&vt===2); s+=hang(X[vt], 168, an ? '?' : d.charAt(i), id); } }
  return khungHinh(s);
}
function docPT(s){ var o={}, re=/data-pt="(\w+)"[^>]*>([^<]*)<\/text>/g, m; while((m=re.exec(String(s)))) o[m[1]]=m[2]; return o; }
/* kiểm hình nhanDoc3 đúng với a, b và cách che; bieuDien = tích hiện trong hình (nếu khác tích thật) */
function kiemNhan3(q){
  var p=q._pt, B=buocNhan(p.a,p.b), d=docPT(q.q), want={a2:String(B.a2), a1:String(B.a1), a0:String(B.a0), b0:String(p.b)}, i;
  if(p.nho){ if(B.c0>0) want.n1=String(B.c0); if(B.c1>0) want.n2=String(B.c1); }
  if(p.an==='tich') want.p='?';
  else { var t=String(p.bieuDien!==undefined ? p.bieuDien : B.tich), L=t.length; for(i=0;i<L;i++){ var vt=3-L+i, an=(p.an==='tram'&&vt===0)||(p.an==='chuc'&&vt===1)||(p.an==='donvi'&&vt===2); want['p'+(L-1-i)] = an ? '?' : t.charAt(i); } }
  var ids=Object.keys(want);
  return p.a>=100 && p.a<=999 && p.b>=2 && p.b<=9 && B.tich<=999 && ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; });
}
/* sinh phép nhân ba chữ số × một chữ số với số lần nhớ cho trước (0, 1, 2) và tích <= 999 */
function phepNhan(soNho, lo){
  lo=lo||{}; for(var g=0;g<4000;g++){ var b=rnd(2,9), a=rnd(100, Math.floor(999/b)), B=buocNhan(a,b);
    if(B.soNho!==soNho) continue; if(lo.coSo0 && B.a1!==0) continue; if(lo.khongSo0 && (B.a1===0 || B.a0===0)) continue; if(lo.tramLon && B.a2<2) continue;
    return {a:a, b:b, tich:B.tich}; }
  return {a:111, b:2, tich:222};
}
function chuSoTich(t, vt){ var d=('00'+t).slice(-3); return +d.charAt(vt); }

/* ---- Hình (D7): cân đĩa, chép từ bài 35; mỗi bên xếp tối đa 4 vật. {g, k:'can', nhan} quả cân hoặc chén có nhãn; {g, k:'goi', an:true} gói hàng "?" ---- */
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

/* ---- Bạn An: lời lý do (mọi đẳng thức đúng số học) ---- */
function loiNhanHang(a0, b){ var p=a0*b; return b+' × '+a0+' = '+p+(p>=10 ? ', viết '+(p%10)+' nhớ '+Math.floor(p/10) : ''); }
function lyDoDung(a, b){ var B=buocNhan(a,b); return loiNhanHang(B.a0,b)+'; '+b+' × '+B.a1+' = '+(B.a1*b)+(B.c0 ? ', thêm '+B.c0+' bằng '+(B.a1*b+B.c0) : '')+(B.c1 ? ', viết '+B.d1+' nhớ '+B.c1 : ''); }
function lyDoYeu(a, b){ var B=buocNhan(a,b); return b+' × '+B.a1+' = '+(B.a1*b)+' và '+b+' × '+B.a2+' = '+(B.a2*b); }
function ketQuaSai(a, b, kieu){ var B=buocNhan(a,b);
  if(kieu==='quen-nho') return Number(''+(B.a2*b)+String(B.a1*b%10)+String(B.d0)) ;
  return B.tich + (B.c0 ? 90*B.c0 : 0) + (B.c1 ? 900*B.c1 : 0); }
function okEq(s){ var re=/(\d+) × (\d+) = (\d+)/g, m, n=0, ok=true; while((m=re.exec(s))){ n++; if((+m[1])*(+m[2])!==+m[3]) ok=false; } return ok && n>=1; }

var BAI = {
 n: 36,
 title: 'Nhân Số Có Ba Chữ Số Với Số Có Một Chữ Số',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-nho':'Quên nhớ', 'nho-sai-hang':'Nhớ nhầm hàng', 'nham-hang':'Nhẩm sai hàng (3 trăm × 3 = 90)', 'thieu-so-0':'Tích thiếu chữ số 0', 'nham-cao-thap':'Nhầm đĩa cân nặng với đĩa cân nhẹ'},
 muctieu: [
  {id:'MT1', ten:'Nhân không nhớ', muc:['140 × 2, 312 × 3: ô ? là một chữ số của tích; 2 tháp khối cầu.', '203 × 4, 131 × 5: điền cả tích; có chữ số 0 ở giữa; 3 tháp.', 'Thừa số đến 333 × 3; tích gần 1 000; số tháp khác.']},
  {id:'MT2', ten:'Nhân có nhớ', muc:['215 × 4 có ghi số nhớ: ô ? ở hàng có nhớ; bảng thừa số – tích.', '162 × 4, 108 × 5: nhớ một lần, không ghi số nhớ; 253 × 3 trong bảng.', '209 × 4, 114 × 7, 107 × 9: nhớ hai lần; tìm thừa số từ tích.']},
  {id:'MT3', ten:'Nhẩm và vận dụng', muc:['200 × 2, 300 × 3 theo mẫu "2 trăm × 2"; mèo gấp 3 lần hải âu; ấm và 3 chén 128 g; 3 hũ mật 250 ml.', '400 × 2; số khác; đã dùng 525 ml còn bao nhiêu.', 'Chọn thẻ nhẩm có kết quả 800; cả hai con bao nhiêu ngày; ấm nặng hơn chén; còn hơn hay kém một hũ.']},
  {id:'MT4', ten:'Tìm lỗi', muc:['Bạn An tính 215 × 4 = 840: em thấy thế nào?', 'An sai ở bước nào: quên nhớ, nhớ nhầm hàng.', 'Kết quả đúng là bao nhiêu; An nhẩm 300 × 3 = 90.']}
 ],
 topics: [
  /* D1 — Xếp tháp khối cầu (Khám phá) */
  {name:'Xếp tháp khối cầu', sec:'Khám phá — Mỗi tháp xếp từ 140 khối cầu, xếp 2 tháp cần bao nhiêu khối cầu: 140 × 2 = 280', mt:['MT1'], levels:3,
   muc:['2 tháp, mỗi tháp 140 (hoặc số tròn chục) khối cầu.', '2 hoặc 3 tháp, số khối cầu bất kì (không nhớ).', 'Số tháp 2–3, số khối cầu có nhớ; tích gần 1 000.'],
   make:function(lv){
    var k, a, p, vat=pick([['tháp','khối cầu'],['hộp','viên bi'],['túi','hạt dẻ'],['thùng','quả táo']]);
    if(lv<=1){ k=2; a=10*rnd(10,44); } else if(lv===2){ p=phepNhan(0); k=p.b<=3 ? p.b : pick([2,3]); a=p.a; while(a*k>999) a-=10; } else { k=pick([2,3]); a=rnd(120,Math.floor(999/k)); }
    var ans=a*k;
    return {type:'num', _lv:lv, _a:a, _k:k, q:'<div>Mỗi '+vat[0]+(vat[0]==='tháp' ? ' xếp từ' : ' có')+' <b>'+a+' '+vat[1]+'</b>. '+(vat[0]==='tháp' ? 'Xếp' : 'Có')+' <b>'+k+' '+vat[0]+'</b> như thế thì '+(vat[0]==='tháp' ? 'cần' : 'có tất cả')+' bao nhiêu '+vat[1]+'?</div>', ans:ans, unit:vat[1],
      sai:nhanSai([[a+k,'cong-thay-nhan'],[ans+10,'nham-bang'],[ans-10,'nham-bang'],[a,'thieu-buoc'],[ketQuaSai(a,k,'quen-nho'),'quen-nho']], ans), goiY:gy()};
  }, check:function(q){ return q.ans===q._a*q._k && q._a>=100 && q._k>=2 && q._k<=3 && q.ans<=999 && (q._lv<=1 ? q._a%10===0 : true); }},

  /* D2 — Đặt tính không nhớ (Hoạt động 1) */
  {name:'Đặt tính không nhớ', sec:'Hoạt động 1 — Tính: 312 × 3; 203 × 4; 427 × 2; 131 × 5', mt:['MT1'], levels:3,
   muc:['Ô ? là một chữ số của tích (312 × 3).', 'Điền cả tích; thừa số có chữ số 0 ở giữa (203 × 4).', 'Điền cả tích; thừa số có hàng trăm 2–3 (243 × 2, 131 × 5).'],
   make:function(lv){
    var p, an, ans, B, sai;
    if(lv<=1){ p=phepNhan(0,{khongSo0:true}); an=pick(['tram','chuc','donvi']); }
    else if(lv===2){ p=phepNhan(0,{coSo0:true}); an='tich'; }
    else { p=phepNhan(0,{tramLon:true}); an='tich'; }
    B=buocNhan(p.a,p.b);
    if(an==='tich'){ ans=B.tich; sai=[[p.a+p.b,'cong-thay-nhan'],[ans+10,'nham-bang'],[ans-100,'nham-bang'],[Number(''+(B.a2*p.b)+String(B.a0*p.b)),'thieu-so-0'],[ans+100,'nham-bang']]; }
    else { var vt = an==='tram' ? 0 : (an==='chuc' ? 1 : 2), tsA = an==='tram' ? B.a2 : (an==='chuc' ? B.a1 : B.a0); ans=chuSoTich(B.tich, vt); sai=[[tsA,'dao-vai'],[tsA+p.b,'cong-thay-nhan'],[ans+1,'nham-bang'],[ans-1,'nham-bang']]; }
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an}, q:nhanDoc3(p.a, p.b, {an:an})+'<div>'+(an==='tich' ? 'Tích ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : 'Chữ số ở ô <b class="text-amber-700">?</b> là bao nhiêu?')+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){
    var p=q._pt, B=buocNhan(p.a,p.b); if(!kiemNhan3(q) || B.soNho!==0) return false;
    if(q._lv===2 && B.a1!==0) return false;
    var e = p.an==='tich' ? B.tich : chuSoTich(B.tich, p.an==='tram' ? 0 : (p.an==='chuc' ? 1 : 2)); return q.ans===e; }},

  /* D3 — Đặt tính có nhớ (Khám phá b, Hoạt động 2) */
  {name:'Đặt tính có nhớ', sec:'Khám phá, Hoạt động 2 — 215 × 4 = 860 (4 nhân 5 bằng 20, viết 0 nhớ 2); 162 × 4; 250 × 3; 108 × 5', mt:['MT2'], levels:3,
   muc:['Nhớ một lần, có ghi số nhớ: ô ? ở hàng có nhớ.', 'Nhớ một lần, không ghi số nhớ: điền cả tích.', 'Nhớ hai lần: điền cả tích (209 × 4, 114 × 7, 107 × 9).'],
   make:function(lv){
    var p, an, ans, B, sai, nho=false;
    if(lv<=1){ p=phepNhan(1); nho=true; B=buocNhan(p.a,p.b); an = B.c0>0 ? 'chuc' : 'tram'; }
    else if(lv===2){ p=phepNhan(1); an='tich'; }
    else { p=phepNhan(2); an='tich'; }
    B=buocNhan(p.a,p.b);
    if(an==='tich'){ ans=B.tich; sai=[[ketQuaSai(p.a,p.b,'quen-nho'),'quen-nho'],[ketQuaSai(p.a,p.b,'nho-sai-hang')>999 ? 0 : ketQuaSai(p.a,p.b,'nho-sai-hang'),'nho-sai-hang'],[p.a+p.b,'cong-thay-nhan'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    else { var vt = an==='tram' ? 0 : 1; ans=chuSoTich(B.tich, vt); var khongNho = vt===1 ? (B.a1*p.b)%10 : (B.a2*p.b)%10; sai=[[khongNho,'quen-nho'],[ans+1,'nham-bang'],[ans-1,'nham-bang'],[vt===1 ? B.a1 : B.a2,'dao-vai']]; }
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an,nho:nho}, q:nhanDoc3(p.a, p.b, {an:an, nho:nho})+'<div>'+(nho ? 'Số nhỏ phía trên là số nhớ. ' : '')+(an==='tich' ? 'Tích ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : 'Chữ số ở ô <b class="text-amber-700">?</b> là bao nhiêu?')+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){
    var p=q._pt, B=buocNhan(p.a,p.b); if(!kiemNhan3(q)) return false;
    if(q._lv<=2 && B.soNho!==1) return false; if(q._lv===3 && B.soNho!==2) return false;
    if(p.an!=='tich'){ var vt = p.an==='tram' ? 0 : 1; if(vt===1 && B.c0===0) return false; if(vt===0 && B.c1===0) return false; return q.ans===chuSoTich(B.tich, vt); }
    return q.ans===B.tich; }},

  /* D4 — Bảng thừa số – tích (Luyện tập 1) */
  {name:'Bảng thừa số – tích', sec:'Luyện tập 1 — Số?: thừa số 209, thừa số 4, tích ?; 253 × 3; 114 × 7; 107 × 9', mt:['MT2'], levels:3,
   muc:['Ô ? là tích, nhớ một lần (209 × 4).', 'Ô ? là tích, nhớ hai lần (253 × 3, 114 × 7).', 'Ô ? là thừa số thứ hai khi biết tích (836 = 209 × ?).'],
   make:function(lv){
    var p = lv<=1 ? phepNhan(1) : phepNhan(2), B=buocNhan(p.a,p.b);
    if(lv<=2) return {type:'num', _lv:lv, _a:p.a, _b:p.b, _hide:2, q:tri('Thừa số','Thừa số','Tích', p.a, p.b, B.tich, 2)+'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:B.tich, sai:nhanSai([[ketQuaSai(p.a,p.b,'quen-nho'),'quen-nho'],[p.a+p.b,'cong-thay-nhan'],[B.tich+10,'nham-bang'],[B.tich-10,'nham-bang']], B.tich), goiY:gy()};
    return {type:'num', _lv:3, _a:p.a, _b:p.b, _hide:1, q:tri('Thừa số','Thừa số','Tích', p.a, p.b, B.tich, 1)+'<div>Thừa số ở ô <b class="text-amber-700">?</b> là bao nhiêu? (Thừa số đó là số có một chữ số.)</div>', ans:p.b, sai:nhanSai([[B.tich-p.a,'chon-sai-phep'],[p.b+1,'nham-bang'],[p.b-1,'nham-bang'],[B.tich,'dao-vai']], p.b), goiY:gy({'chon-sai-phep':'Tích chia cho thừa số đã biết thì được thừa số kia: '+B.tich+' : '+p.a+'.'})};
  }, check:function(q){ var t=docTri(q.q), T=q._a*q._b; if(t.length!==3 || T>999) return false;
    if(q._hide===2) return t[0]===String(q._a) && t[1]===String(q._b) && t[2]==='?' && q.ans===T;
    return t[0]===String(q._a) && t[1]==='?' && t[2]===String(T) && q.ans===q._b && q._b>=2 && q._b<=9; }},

  /* D5 — Nhẩm số tròn trăm (Luyện tập 2) */
  {name:'Nhẩm số tròn trăm', sec:'Luyện tập 2 — Tính nhẩm theo mẫu 200 × 2: 2 trăm × 2 = 4 trăm; 300 × 3; 200 × 4; 400 × 2', mt:['MT3'], levels:3,
   muc:['200 × 2, 300 × 3 (có gợi ý "2 trăm × 2").', '400 × 2, 100 × 9: nhẩm không gợi ý.', 'Chọn thẻ có kết quả 800 (hoặc 600, 900) trong bốn thẻ.'],
   make:function(lv){
    if(lv<=2){ var a=100*rnd(1, lv<=1 ? 3 : 4), b=rnd(2, Math.floor(9/(a/100))), ans=a*b, tr=a/100;
      return {type:'num', _lv:lv, _a:a, _b:b, q:kyHieu('Tính nhẩm', a+' × '+b+' ='+oHoi())+(lv<=1 ? '<div class="text-base text-slate-500">Mẫu: 200 × 2: 2 trăm × 2 = 4 trăm. Vậy 200 × 2 = 400.</div><div class="text-base text-slate-600">'+tr+' trăm × '+b+' = ? trăm</div>' : ''), ans:ans, sai:nhanSai([[ans/10,'nham-hang'],[ans/100,'nham-hang'],[a+b,'cong-thay-nhan'],[ans+100,'nham-bang']], ans), goiY:gy()}; }
    var T=pick([600,800,900]), cands=[], x, y, g;
    for(x=1;x<=9;x++) for(y=2;y<=9;y++) if(x*100*y<=900) cands.push(x*100+' × '+y);
    var dung=shuffle(cands.filter(function(t){ return tinhBT(t)===T; }))[0], khac=shuffle(cands.filter(function(t){ return tinhBT(t)!==T; })), ds=[dung];
    for(g=0;g<khac.length && ds.length<4;g++){ if(ds.every(function(t){ return tinhBT(t)!==tinhBT(khac[g]); })) ds.push(khac[g]); }
    ds=shuffle(ds); var sai={}; ds.forEach(function(t,i){ if(t!==dung) sai[String(i)]='nham-hang'; });
    return {type:'mcq', cot:1, _lv:3, _T:T, _ds:ds, _dung:dung, q:theTinh(ds)+'<div>Phép tính nào có kết quả bằng <b class="text-2xl text-orange-600">'+T+'</b>?</div>', choices:ds, correct:ds.indexOf(dung), sai:sai, goiY:gy({'nham-hang':'Bé nhẩm từng thẻ theo trăm: ví dụ 4 trăm × 2 = 8 trăm = 800.'})};
  }, check:function(q){
    if(q._lv<=2) return q._a%100===0 && q.ans===q._a*q._b && q.ans<=900 && q._b>=2;
    var ds=q._ds, v=ds.map(function(t){ return tinhBT(t); }); return kiemMCQ(q) && ds.length===4 && docThe(q.q).join('|')===ds.join('|') && v.filter(function(x){ return x===q._T; }).length===1 && tinhBT(q._dung)===q._T && new Set(v).size===4; }},

  /* D6 — Gấp n lần (Hoạt động 3) */
  {name:'Gấp n lần', sec:'Hoạt động 3 — Hải âu 118 ngày tuổi, mèo gấp 3 lần: 118 × 3 = 354 ngày', mt:['MT3'], levels:3,
   muc:['Hải âu 118 ngày tuổi, mèo gấp 3 lần (hoặc số tương tự).', 'Số khác: một con vật gấp 2–4 lần con kia.', 'Cả hai con bao nhiêu ngày tuổi (hai bước).'],
   make:function(lv){
    var cap=pick([['con hải âu','con mèo','ngày tuổi'],['cây cam','cây bưởi','quả'],['bạn Mai','anh của Mai','bước chân'],['chú thỏ','chú ngựa','cân nặng (kg)']]), a, k, ans, u=cap[2].indexOf('(')>0 ? 'kg' : cap[2];
    if(lv<=1){ k=3; a=pick([118,112,105,124,116]); } else { k=rnd(2,4); a=rnd(102, Math.floor(999/k)); }
    if(lv<=2){ ans=a*k; return {type:'num', _lv:lv, _a:a, _k:k, q:'<div>'+cap[0].charAt(0).toUpperCase()+cap[0].slice(1)+' có <b>'+a+' '+u+'</b>. '+cap[1].charAt(0).toUpperCase()+cap[1].slice(1)+' có số '+u+' gấp <b>'+k+' lần</b> '+cap[0]+'. '+cap[1].charAt(0).toUpperCase()+cap[1].slice(1)+' có bao nhiêu '+u+'?</div>', ans:ans, unit:u, sai:nhanSai([[a+k,'cong-thay-nhan'],[ketQuaSai(a,k,'quen-nho'),'quen-nho'],[ans+10,'nham-bang'],[ans-10,'nham-bang']], ans), goiY:gy({'cong-thay-nhan':'Gấp '+k+' lần là nhân với '+k+'.'})}; }
    k=pick([2,3]); a=rnd(102, Math.floor(999/(k+1))); ans=a+a*k;
    return {type:'num', _lv:3, _a:a, _k:k, _ca:true, q:'<div>'+cap[0].charAt(0).toUpperCase()+cap[0].slice(1)+' có <b>'+a+' '+u+'</b>. '+cap[1].charAt(0).toUpperCase()+cap[1].slice(1)+' có số '+u+' gấp <b>'+k+' lần</b> '+cap[0]+'. Cả hai có tất cả bao nhiêu '+u+'?</div>', ans:ans, unit:u, sai:nhanSai([[a*k,'thieu-buoc'],[a+k,'cong-thay-nhan'],[a*k+k,'chon-sai-phep'],[ans+10,'nham-bang']], ans), goiY:gy({'thieu-buoc':'Bước 1: tìm số của '+cap[1]+' ('+a+' × '+k+'). Bước 2: cộng với '+a+'.'})};
  }, check:function(q){ var e = q._ca ? q._a+q._a*q._k : q._a*q._k; return q.ans===e && e<=999 && q._a>=100 && q._k>=2 && q._k<=4; }},

  /* D7 — Ấm và chén trên cân (Luyện tập 3) */
  {name:'Ấm và chén trên cân', sec:'Luyện tập 3 — Cái ấm cân bằng với 3 cái chén, mỗi chén 128 g: ấm nặng 128 × 3 = 384 g', mt:['MT3'], levels:3,
   muc:['Ấm cân bằng với 3 chén 128 g.', '2–4 chén, mỗi chén 110–240 g.', 'Ấm nặng hơn một chén bao nhiêu gam (hai bước).'],
   make:function(lv){
    var n, g, T, vat=pick([['cái ấm','cái chén'],['hộp sữa','gói kẹo'],['quả dứa','quả cam']]);
    if(lv<=1){ n=3; g=pick([128,120,115,132]); } else { n=rnd(2,4); g=rnd(110, Math.min(240, Math.floor(999/n))); }
    T=n*g; var tr=[{g:T,k:'goi',an:true}], ph=[], i; for(i=0;i<n;i++) ph.push({g:g,k:'can',nhan:true});
    if(lv<=2) return {type:'num', _lv:lv, _n:n, _g:g, q:canDia(tr, ph)+'<div>Cân thăng bằng: một '+vat[0]+' nặng bằng <b>'+n+' '+vat[1]+'</b>, mỗi '+vat[1]+' nặng <b>'+g+' g</b>. '+vat[0].charAt(0).toUpperCase()+vat[0].slice(1)+' nặng bao nhiêu gam?</div>', ans:T, unit:'g', sai:nhanSai([[g+n,'cong-thay-nhan'],[g,'thieu-buoc'],[ketQuaSai(g,n,'quen-nho'),'quen-nho'],[T+10,'nham-bang']], T), goiY:gy({'cong-thay-nhan':n+' '+vat[1]+' giống nhau: nhân '+g+' với '+n+'.'})};
    var ans=T-g;
    return {type:'num', _lv:3, _n:n, _g:g, _hon:true, q:canDia(tr, ph)+'<div>Cân thăng bằng: một '+vat[0]+' nặng bằng <b>'+n+' '+vat[1]+'</b>, mỗi '+vat[1]+' nặng <b>'+g+' g</b>. '+vat[0].charAt(0).toUpperCase()+vat[0].slice(1)+' nặng hơn một '+vat[1]+' bao nhiêu gam?</div>', ans:ans, unit:'g', sai:nhanSai([[T,'thieu-buoc'],[T+g,'chon-sai-phep'],[ans+10,'nham-bang'],[g,'dao-vai']], ans), goiY:gy({'thieu-buoc':'Bước 1: '+vat[0]+' nặng '+g+' × '+n+'. Bước 2: trừ đi '+g+'.'})};
  }, check:function(q){ var d=docCanNhieu(q.q)[0]; if(!d || d.nghieng!=='can') return false; var t=tongBen(d.items,'t'), p=tongBen(d.items,'p'), ch=d.items.filter(function(x){ return x.s==='p'; });
    return t===p && ch.length===q._n && ch.every(function(x){ return x.g===q._g; }) && t===q._n*q._g && t<=999 && q.ans===(q._hon ? t-q._g : t); }},

  /* D8 — Mật ong còn lại (Luyện tập 4) */
  {name:'Mật ong còn lại', sec:'Luyện tập 4 — Gấu đen có 3 hũ mật ong, mỗi hũ 250 ml, đã dùng 525 ml: còn 3 × 250 − 525 = 225 ml', mt:['MT3'], levels:3,
   muc:['3 hũ mật ong, mỗi hũ 250 ml: có tất cả bao nhiêu ml.', 'Đã dùng 525 ml: còn lại bao nhiêu ml (hai bước).', 'Số khác; còn lại nhiều hơn hay ít hơn một hũ (chọn).'],
   make:function(lv){
    var vat=pick([['hũ mật ong','ml','Gấu đen'],['chai nước','ml','Bạn Mai'],['gói đường','g','Mẹ'],['cuộn chỉ','mm','Cô Ba']]), n, v, T, d;
    if(lv<=1){ n=pick([2,3,4]); v=pick([250,120,150,200,110]); while(n*v>999) n--; T=n*v;
      return {type:'num', _lv:1, _n:n, _v:v, q:'<div>'+vat[2]+' có <b>'+n+' '+vat[0]+'</b>, mỗi '+vat[0].split(' ')[0]+' đựng <b>'+v+' '+vat[1]+'</b>. '+vat[2]+' có tất cả bao nhiêu '+vat[1]+'?</div>', ans:T, unit:vat[1], sai:nhanSai([[n+v,'cong-thay-nhan'],[T+10,'nham-bang'],[ketQuaSai(v,n,'quen-nho'),'quen-nho'],[v,'thieu-buoc']], T), goiY:gy()}; }
    n=pick([2,3,4]); v=10*rnd(11,30); while(n*v>999) v-=10; T=n*v; d=10*rnd(Math.floor(T/40)+1, Math.floor(T/10)-5); if(d<=0) d=10; var con=T-d;
    if(lv===2) return {type:'num', _lv:2, _n:n, _v:v, _d:d, q:'<div>'+vat[2]+' có <b>'+n+' '+vat[0]+'</b>, mỗi '+vat[0].split(' ')[0]+' đựng <b>'+v+' '+vat[1]+'</b>. '+vat[2]+' đã dùng hết <b>'+d+' '+vat[1]+'</b>. '+vat[2]+' còn lại bao nhiêu '+vat[1]+'?</div>', ans:con, unit:vat[1], sai:nhanSai([[T,'thieu-buoc'],[v-d>0 ? v-d : 0,'thieu-buoc'],[T+d>999 ? 0 : T+d,'chon-sai-phep'],[con+10,'nham-bang'],[con-10,'nham-bang']], con), goiY:gy({'thieu-buoc':'Bước 1: tất cả có '+v+' × '+n+'. Bước 2: lấy số đó trừ đi '+d+'.'})};
    var ch=['Nhiều hơn một '+vat[0].split(' ')[0],'Ít hơn một '+vat[0].split(' ')[0],'Bằng đúng một '+vat[0].split(' ')[0]], dung = con>v ? ch[0] : (con<v ? ch[1] : ch[2]), sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='thieu-buoc'; });
    return {type:'mcq', cot:1, _lv:3, _n:n, _v:v, _d:d, _dung:dung, q:'<div>'+vat[2]+' có <b>'+n+' '+vat[0]+'</b>, mỗi '+vat[0].split(' ')[0]+' đựng <b>'+v+' '+vat[1]+'</b>. '+vat[2]+' đã dùng hết <b>'+d+' '+vat[1]+'</b>. Số '+vat[1]+' còn lại so với một '+vat[0].split(' ')[0]+' thì thế nào?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy({'thieu-buoc':'Bé tính số còn lại ('+v+' × '+n+' − '+d+' = '+con+') rồi so với '+v+'.'})};
  }, check:function(q){ var T=q._n*q._v; if(T>999) return false; if(q._lv<=1) return q.ans===T;
    var con=T-q._d; if(con<=0 || q._d<=0) return false; if(q._lv===2) return q.ans===con;
    var e = con>q._v ? 'Nhiều hơn' : (con<q._v ? 'Ít hơn' : 'Bằng đúng'); return kiemMCQ(q) && q.choices.length===3 && q._dung.indexOf(e)===0; }},

  /* D9 — Bạn An tính có đúng? (không có trong SGK) */
  {name:'Bạn An tính có đúng?', sec:'Tìm lỗi — Bạn An tính 215 × 4 = 840: em thấy thế nào? An sai ở bước nào? Kết quả đúng là bao nhiêu?', mt:['MT4'], levels:3,
   muc:['Bạn An tính một phép có nhớ: em thấy thế nào (quên nhớ).', 'An sai ở bước nào: quên nhớ hay nhớ nhầm hàng.', 'Kết quả đúng là bao nhiêu; An nhẩm 300 × 3 = 90.'],
   make:function(lv){
    var p=phepNhan(1), a=p.a, b=p.b, B=buocNhan(a,b), T=B.tich;
    if(lv<=1){ var dung=Math.random()<0.5, x = dung ? T : ketQuaSai(a,b,'quen-nho'), dungC, saiC;
      if(dung){ dungC='Đồng ý, vì '+lyDoDung(a,b); saiC='Không đồng ý, vì '+lyDoYeu(a,b); } else { dungC='Không đồng ý, vì '+lyDoDung(a,b); saiC='Đồng ý, vì '+lyDoYeu(a,b); }
      var ch=shuffle([dungC,saiC]), s1={}; s1[String(1-ch.indexOf(dungC))]='quen-nho';
      return {type:'mcq', cot:1, _lv:1, _a:a, _b:b, _x:x, _dung:dungC, q:nguoi('boy','Bạn An')+nhanDoc3(a,b,{bieuDien:x})+'<div>Bạn An đặt tính và viết tích là <b>'+x+'</b>. Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dungC), sai:s1, goiY:gy()}; }
    if(lv===2){ var kieu=pick(['quen-nho','nho-sai-hang']), x2=ketQuaSai(a,b,kieu); if(x2>999){ kieu='quen-nho'; x2=ketQuaSai(a,b,kieu); }
      var hang = B.c0>0 ? 'hàng chục' : 'hàng trăm', hang2 = B.c0>0 ? 'hàng trăm' : 'hàng nghìn';
      var ch2=['Quên nhớ '+(B.c0||B.c1)+' sang '+hang,'Nhớ '+(B.c0||B.c1)+' nhầm sang '+hang2,'Nhân sai bảng nhân '+b], dung2 = kieu==='quen-nho' ? ch2[0] : ch2[1], s2={}; ch2.forEach(function(c,i){ if(c!==dung2) s2[String(i)]=(kieu==='quen-nho' ? 'nho-sai-hang' : 'quen-nho'); });
      return {type:'mcq', cot:1, _lv:2, _a:a, _b:b, _x:x2, _kieu:kieu, _dung:dung2, q:nguoi('boy','Bạn An')+nhanDoc3(a,b,{bieuDien:x2})+'<div>Bạn An viết tích là <b>'+x2+'</b>, nhưng tích đúng là <b>'+T+'</b>. An đã sai ở bước nào?</div>', choices:ch2, correct:ch2.indexOf(dung2), sai:s2, goiY:gy({'nho-sai-hang':'Bé nhân lại từng hàng: '+lyDoDung(a,b)+'.','quen-nho':'Bé nhân lại từng hàng: '+lyDoDung(a,b)+'.'})}; }
    if(Math.random()<0.5){ var x3=ketQuaSai(a,b,'quen-nho');
      return {type:'num', _lv:3, _a:a, _b:b, _x:x3, _nham:false, q:nguoi('boy','Bạn An')+nhanDoc3(a,b,{bieuDien:x3})+'<div>Bạn An viết tích là <b>'+x3+'</b>. An tính sai rồi! Tích đúng là bao nhiêu?</div>', ans:T, sai:nhanSai([[x3,'quen-nho'],[T+10,'nham-bang'],[T-10,'nham-bang'],[a+b,'cong-thay-nhan']], T), goiY:gy()}; }
    var a4=100*rnd(1,4), b4=rnd(2, Math.floor(9/(a4/100))), T4=a4*b4, x4=T4/10;
    return {type:'num', _lv:3, _a:a4, _b:b4, _x:x4, _nham:true, q:nguoi('boy','Bạn An')+'<div>Bạn An nhẩm: «<b>'+a4+' × '+b4+' = '+x4+'</b>». An nhẩm sai rồi! Kết quả đúng là bao nhiêu?</div>', ans:T4, sai:nhanSai([[x4,'nham-hang'],[T4/100,'nham-hang'],[a4+b4,'cong-thay-nhan'],[T4+100,'nham-bang']], T4), goiY:gy()};
  }, check:function(q){
    var T=q._a*q._b; if(T>999) return false;
    if(q._lv<=1) return q.choices.length===2 && q.choices.every(okEq) && kiemMCQ(q) && /^Đồng ý/.test(q._dung)===(q._x===T) && (/^Đồng ý/.test(q._dung) ? true : q._x!==T);
    if(q._lv===2) return kiemMCQ(q) && q.choices.length===3 && q._x!==T && (q._kieu==='quen-nho' ? /^Quên nhớ/.test(q._dung) : /^Nhớ .* nhầm/.test(q._dung)) && ketQuaSai(q._a,q._b,q._kieu)===q._x;
    if(q._nham) return q._a%100===0 && q.ans===T && q._x===T/10;
    return q.ans===T && q._x!==T && ketQuaSai(q._a,q._b,'quen-nho')===q._x; }}
 ]
};
