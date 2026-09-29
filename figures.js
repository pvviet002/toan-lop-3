/* figures.js — Thư viện DÙNG CHUNG: hàm ngẫu nhiên + hình vẽ lại (SVG gốc).
   Mọi hình là hàm trả CHUỖI (không chạm DOM) nên chạy được cả trong Node để kiểm.
   QUY TẮC: viết bằng nối chuỗi, KHÔNG backtick và KHÔNG template literal (để chèn được editor GitHub). */

/* ---- Hàm ngẫu nhiên (dùng trong generator của từng bài) ---- */
function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

/* ---- Con bọ rùa (đổi số chấm nếu cần) ---- */
function ladybug(){
  return '<svg width="54" height="54" viewBox="0 0 100 100" style="display:inline-block">'
   +'<ellipse cx="50" cy="90" rx="26" ry="5" fill="rgba(0,0,0,.12)"/>'
   +'<circle cx="50" cy="30" r="15" fill="#1f2937"/>'
   +'<circle cx="44" cy="27" r="3" fill="#fff"/><circle cx="56" cy="27" r="3" fill="#fff"/>'
   +'<circle cx="50" cy="62" r="30" fill="#dc2626"/>'
   +'<line x1="50" y1="34" x2="50" y2="92" stroke="#1f2937" stroke-width="3"/>'
   +'<circle cx="37" cy="52" r="5" fill="#1f2937"/><circle cx="63" cy="52" r="5" fill="#1f2937"/>'
   +'<circle cx="33" cy="66" r="5" fill="#1f2937"/><circle cx="67" cy="66" r="5" fill="#1f2937"/>'
   +'<circle cx="42" cy="80" r="5" fill="#1f2937"/><circle cx="58" cy="80" r="5" fill="#1f2937"/>'
   +'</svg>';
}
/* ---- Xe tải chở một phép tính (SVG thuần: chữ nằm gọn trong thùng xe, tự co theo khung) ---- */
function truck(expr){
  var dai = String(expr).length>7, T = dai ? 134 : 96, W = T+54;   /* biểu thức dài -> thùng xe dài ra, chữ vẫn to */
  return '<svg width="'+W+'" height="72" viewBox="0 0 '+W+' 72" style="max-width:100%;height:auto;display:block">'
   +'<rect x="4" y="12" width="'+T+'" height="40" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>'
   +'<path d="M'+(T+4)+' 22 h26 l16 16 v14 h-42 z" fill="#f87171" stroke="#dc2626" stroke-width="2"/>'
   +'<rect x="'+(T+10)+'" y="26" width="20" height="14" rx="2" fill="#bae6fd"/>'
   +'<circle cx="32" cy="58" r="9" fill="#374151"/><circle cx="'+(T+16)+'" cy="58" r="9" fill="#374151"/>'
   +'<text x="'+(4+T/2)+'" y="39" text-anchor="middle" font-size="'+(dai?18:19)+'" font-weight="800" fill="#7c2d12" font-family="system-ui,Segoe UI,Roboto,sans-serif">'+expr+'</text>'
   +'</svg>';
}
/* ---- Đồng hồ kim ---- */
function clockSVG(h,m){
  var s='<svg width="150" height="150" viewBox="0 0 140 140">';
  s+='<circle cx="70" cy="70" r="66" fill="#fff" stroke="#f59e0b" stroke-width="5"/>';
  for(var n=1;n<=12;n++){ var a=(n/12)*2*Math.PI-Math.PI/2; s+='<text x="'+(70+52*Math.cos(a)).toFixed(1)+'" y="'+(70+52*Math.sin(a)+5).toFixed(1)+'" font-size="13" font-weight="bold" text-anchor="middle" fill="#334155">'+n+'</text>'; }
  var ha=(((h%12)+m/60)/12)*2*Math.PI-Math.PI/2; s+='<line x1="70" y1="70" x2="'+(70+30*Math.cos(ha)).toFixed(1)+'" y2="'+(70+30*Math.sin(ha)).toFixed(1)+'" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>';
  var ma=(m/60)*2*Math.PI-Math.PI/2; s+='<line x1="70" y1="70" x2="'+(70+45*Math.cos(ma)).toFixed(1)+'" y2="'+(70+45*Math.sin(ma)).toFixed(1)+'" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>';
  s+='<circle cx="70" cy="70" r="4" fill="#ef4444"/></svg>'; return s;
}
/* ---- Con rồng múa (generic) ---- */
function dragon(){
  return '<svg width="122" height="66" viewBox="0 0 160 84" style="display:inline-block">'
   +'<ellipse cx="86" cy="78" rx="60" ry="4" fill="rgba(0,0,0,.1)"/>'
   +'<path d="M46 46 Q66 20 88 42 Q110 64 132 42" stroke="#16a34a" stroke-width="15" fill="none" stroke-linecap="round"/>'
   +'<path d="M46 46 Q66 20 88 42 Q110 64 132 42" stroke="#f59e0b" stroke-width="15" fill="none" stroke-linecap="round" stroke-dasharray="3 16"/>'
   +'<path d="M132 42 l14 -7 l-2 9 l10 3 l-13 6 z" fill="#22c55e"/>'
   +'<circle cx="34" cy="42" r="19" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>'
   +'<circle cx="27" cy="37" r="4" fill="#fff"/><circle cx="27" cy="37" r="1.8" fill="#1f2937"/>'
   +'<path d="M18 47 q-9 3 -14 -2" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>'
   +'<path d="M34 23 l4 -12 l5 12 z" fill="#f59e0b"/>'
   +'<path d="M24 24 l1 -9 l5 8 z" fill="#f59e0b"/>'
   +'</svg>';
}
/* ---- Quả dưa hấu chở một phép tính (nhãn trắng — chữ không đè lên sọc) ---- */
function melon(expr){
  return '<svg width="132" height="70" viewBox="0 0 132 70" style="max-width:100%;height:auto;display:block">'
   +'<ellipse cx="64" cy="38" rx="58" ry="27" fill="#4ade80" stroke="#16a34a" stroke-width="3"/>'
   +'<path d="M30 15 Q40 38 30 61" stroke="#15803d" stroke-width="2.5" fill="none"/>'
   +'<path d="M64 12 Q74 38 64 64" stroke="#15803d" stroke-width="2.5" fill="none"/>'
   +'<path d="M98 15 Q88 38 98 61" stroke="#15803d" stroke-width="2.5" fill="none"/>'
   +'<path d="M120 24 q9 -3 12 -10" stroke="#15803d" stroke-width="3" fill="none" stroke-linecap="round"/>'
   +'<rect x="21" y="24" width="86" height="28" rx="14" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>'
   +'<text x="64" y="44" text-anchor="middle" font-size="'+coChu(expr,18)+'" font-weight="800" fill="#14532d" font-family="system-ui,Segoe UI,Roboto,sans-serif">'+expr+'</text>'
   +'</svg>';
}
/* ---- Bông hoa hướng dương chở một phép tính (nhãn trắng giữa nhuỵ) ---- */
function flower(expr){
  var s='<svg width="118" height="118" viewBox="0 0 120 120" style="max-width:100%;height:auto;display:block">'
   +'<g fill="#facc15" stroke="#eab308" stroke-width="1.5">';
  for(var i=0;i<12;i++){ var a=i*30; var r=a*Math.PI/180; var x=60+34*Math.cos(r), y=60+34*Math.sin(r);
    s+='<ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="9" ry="17" transform="rotate('+a+' '+x.toFixed(1)+' '+y.toFixed(1)+')"/>'; }
  s+='</g><circle cx="60" cy="60" r="26" fill="#b45309"/>'
   +'<rect x="20" y="46" width="80" height="28" rx="14" fill="#ffffff" stroke="#b45309" stroke-width="1.5"/>'
   +'<text x="60" y="66" text-anchor="middle" font-size="'+coChu(expr,18)+'" font-weight="800" fill="#7c2d12" font-family="system-ui,Segoe UI,Roboto,sans-serif">'+expr+'</text>'
   +'</svg>';
  return s;
}
/* ---- Sơ đồ hai bước: [a] op1-> (?) op2-> [?] ---- */
function arrow2(a, op1, op2){
  return '<div class="flex items-center justify-center gap-1 md:gap-2 my-3 flex-wrap">'
   +'<span style="width:52px;height:52px" class="inline-flex items-center justify-center rounded-lg bg-emerald-400 text-white font-extrabold text-xl">'+a+'</span>'
   +'<span class="text-slate-500 font-bold text-sm">'+op1+' &#8594;</span>'
   +'<span style="width:52px;height:52px" class="inline-flex items-center justify-center rounded-full bg-slate-100 border border-slate-300 text-slate-400 font-extrabold text-lg">?</span>'
   +'<span class="text-slate-500 font-bold text-sm">'+op2+' &#8594;</span>'
   +'<span style="width:52px;height:52px" class="inline-flex items-center justify-center rounded-xl bg-white border-2 border-amber-400 text-amber-600 font-extrabold text-xl">?</span>'
   +'</div>';
}

/* =====================================================================================
   BỘ SINH CÂU DÙNG CHUNG THEO 3 MỨC (Thông tư 27: 1 Nhận biết · 2 Hiểu · 3 Vận dụng)
   cho các bài BẢNG NHÂN / BẢNG CHIA b (bài 9–12 và các bài bảng sau). Mỗi hàm nhận (b, lv).
   ===================================================================================== */
/* Cỡ chữ cho phép tính trong hình (xe tải, dưa hấu, hoa): biểu thức dài thì thu nhỏ để nằm gọn nhãn */
function coChu(expr, goc){ var n=String(expr).length; return n<=7 ? goc : (n<=9 ? goc-4 : goc-6); }
/* Tính giá trị biểu thức kiểu '9 × 4 + 9', '45 : 9', '7 × 3 − 7' (× : trước, + − sau) — dùng cho check() */
function tinhBT(t){
  var tk=String(t).replace(/\u2212/g,'-').trim().split(/\s+/), vals=[+tk[0]], ops=[];
  for(var i=1;i<tk.length;i+=2){ var o=tk[i], v=+tk[i+1];
    if(o==='×') vals[vals.length-1]*=v; else if(o===':') vals[vals.length-1]/=v; else { ops.push(o); vals.push(v); } }
  var r=vals[0]; for(var j=0;j<ops.length;j++) r = ops[j]==='+' ? r+vals[j+1] : r-vals[j+1];
  return r;
}
/* cnt đáp số khác nhau (có v): Mức 1 lệch XA (dễ loại), Mức 2–3 lệch GẦN (±1, ±2, ±b) */
function soChon(v, lv, b, cnt){
  cnt=cnt||4; var d = lv<=1 ? [2*b,-2*b,3*b,-3*b,10,-10,20] : [1,-1,2,-2,b,-b,3,-3];
  var out=[v], g=0; while(out.length<cnt && g<300){ g++; var x=v+pick(d); if(x>0 && out.indexOf(x)<0) out.push(x); }
  shuffle(out); return out;
}
/* Ô "?" trong phép tính */
function oHoi(){ return '<span class="inline-block px-2 mx-1 border-2 border-amber-500 rounded-lg text-amber-700">?</span>'; }
/* Hạt số trong dãy: hinh 'tron'|'vuong'|'thoi'; loai 'so'|'hoi'|'an' (… = ô bị che) */
function hatSo(v, hinh, loai){
  var cls = loai==='hoi' ? 'bg-white border-2 border-amber-500 text-amber-700 text-xl'
          : (loai==='an' ? 'bg-slate-100 border border-slate-300 text-slate-500 text-base'
          : (hinh==='thoi' ? 'bg-sky-300' : 'bg-amber-300')+' text-slate-900 text-base');
  var txt = loai==='hoi' ? '?' : (loai==='an' ? '&#8230;' : v);
  if(hinh==='thoi') return '<span style="width:42px;height:42px;transform:rotate(45deg)" class="inline-flex items-center justify-center font-extrabold '+cls+'"><span style="transform:rotate(-45deg)">'+txt+'</span></span>';
  return '<span style="width:46px;height:46px" class="inline-flex items-center justify-center font-extrabold '+(hinh==='tron'?'rounded-full':'rounded-lg')+' '+cls+'">'+txt+'</span>';
}
/* DÃY SỐ đếm thêm/bớt b. Mức 1: đếm thêm từ b, ô cần tìm ở đầu dãy · Mức 2: thêm hoặc bớt, ô bất kỳ ·
   Mức 3: dãy KHÔNG bắt đầu từ b và ô liền kề cũng bị che -> phải dùng bước đếm b */
function bnDaySo(b, lv, hinhLen, hinhXuong){
  var up = lv<=1 ? true : Math.random()<0.5, dau = lv>=3 ? rnd(2,4) : 1, dai = lv>=3 ? 7 : 8, seq=[];
  for(var i=0;i<dai;i++) seq.push(b*(dau+i)); if(!up) seq.reverse();
  var hi = lv<=1 ? rnd(1,3) : rnd(1,dai-2), an = lv>=3 ? (hi+1<=dai-2 ? hi+1 : hi-1) : -1, hinh = up ? (hinhLen||'tron') : (hinhXuong||'thoi');
  var s='<div class="flex flex-wrap justify-center items-center gap-2 mb-3">';
  for(var j=0;j<dai;j++) s+=hatSo(seq[j], hinh, j===hi ? 'hoi' : (j===an ? 'an' : 'so'));
  return {type:'num', _hi:hi, _seq:seq, _b:b, q:s+'</div><div>Dãy số đếm '+(up?'thêm':'bớt')+' '+b+'. Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:seq[hi]};
}
function bnKiemDay(q){ return q.ans===q._seq[q._hi] && q.ans%q._b===0 && q.ans>0; }
/* HOÀN THÀNH BẢNG nhân/chia b. Mức 1: dòng đầu bảng (b×2..b×5) · Mức 2: dòng cuối (b×6..b×10), có thể là bảng chia ·
   Mức 3: hai dòng liền kề cũng bị che -> không đếm thêm từ dòng trên được */
function bnBang(b, lv, choChia){
  var laChia = !!choChia && lv>=2 && Math.random()<0.5, k = lv<=1 ? rnd(2,5) : (lv===2 ? rnd(6,10) : rnd(3,9));
  var an = lv>=3 ? [k-1,k+1] : [], mau = laChia ? '#7dd3fc' : '#fcd34d';
  var rows='<div class="text-center '+(laChia?'text-sky-700':'text-orange-700')+' font-extrabold mb-1">Bảng '+(laChia?'chia ':'nhân ')+b+'</div>';
  for(var i=1;i<=10;i++){
    var trai = laChia ? (b*i)+' : '+b : b+' × '+i, phai = laChia ? i : b*i;
    if(i===k) rows+='<div class="'+(laChia?'bg-sky-100':'bg-amber-200')+' rounded font-extrabold">'+trai+' = <span class="'+(laChia?'text-sky-700':'text-amber-700')+'">?</span></div>';
    else if(an.indexOf(i)>=0) rows+='<div class="text-slate-500">'+trai+' = &#8230;</div>';
    else rows+='<div>'+trai+' = '+phai+'</div>';
  }
  var tbl='<div style="display:inline-block;text-align:left"><div style="border:2px solid '+mau+';border-radius:12px;background:#fff;padding:8px 18px;font-weight:700;line-height:1.5">'+rows+'</div></div>';
  return {type:'num', _k:k, _b:b, _div:laChia, q:tbl+'<div class="mt-2">Số còn thiếu ở <b class="text-amber-700">'+(laChia?(b*k)+' : '+b:b+' × '+k)+'</b> là bao nhiêu?</div>', ans:laChia?k:b*k};
}
function bnKiemBang(q){ return q._div ? q.ans===q._k : q.ans===q._b*q._k; }
/* TÍNH NHẨM với b. Mức 1: b × 1..5 · Mức 2: b × k, k × b, (b·k) : b với k tới 10 ·
   Mức 3: tìm số thích hợp (thừa số / số chia / số bị chia chưa biết) */
function bnTinh(b, lv){
  var r=Math.random(), k;
  function o(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-4xl font-extrabold text-orange-600">'+bt+'</div>'; }
  if(lv<=1){ k=rnd(1,5); return {type:'num', _b:b, _k:k, _dang:'tich', q:o('Tính nhẩm', b+' × '+k+' ='+oHoi()), ans:b*k}; }
  if(lv===2){ k=rnd(1,10);
    if(r<0.4) return {type:'num', _b:b, _k:k, _dang:'tich', q:o('Tính nhẩm', b+' × '+k+' ='+oHoi()), ans:b*k};
    if(r<0.7) return {type:'num', _b:b, _k:k, _dang:'tich', q:o('Tính nhẩm', k+' × '+b+' ='+oHoi()), ans:b*k};
    return {type:'num', _b:b, _k:k, _dang:'thuong', q:o('Tính nhẩm', (b*k)+' : '+b+' ='+oHoi()), ans:k};
  }
  k=rnd(2,10);
  if(r<0.35) return {type:'num', _b:b, _k:k, _dang:'thuong', q:o('Tìm số thích hợp', b+' ×'+oHoi()+'= '+(b*k)), ans:k};
  if(r<0.7) return {type:'num', _b:b, _k:k, _dang:'thuong', q:o('Tìm số thích hợp', (b*k)+' :'+oHoi()+'= '+b), ans:k};
  return {type:'num', _b:b, _k:k, _dang:'tich', q:o('Tìm số thích hợp', oHoi()+': '+b+' = '+k), ans:b*k};
}
function bnKiemTinh(q){ return q._dang==='tich' ? q.ans===q._b*q._k : q.ans===q._k; }

/* ---- Hộp bút chì màu có n chiếc bút (SGK bài 9 LT4) ---- */
function hopBut(n){
  n=n||6; var mau=['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#ec4899','#14b8a6','#f97316','#84cc16','#6366f1'];
  var s='<svg width="56" height="72" viewBox="0 0 56 72" style="display:inline-block">', b=40/n;
  for(var i=0;i<n;i++){ var x=8+i*b+b/2, y=6+(i%2)*5;
    s+='<rect x="'+(x-2.4).toFixed(1)+'" y="'+y+'" width="4.8" height="34" fill="'+mau[i%mau.length]+'"/>'
     +'<path d="M'+(x-2.4).toFixed(1)+' '+y+' L'+x.toFixed(1)+' '+(y-6)+' L'+(x+2.4).toFixed(1)+' '+y+' Z" fill="#fde68a"/>'; }
  return s+'<rect x="4" y="28" width="48" height="41" rx="4" fill="#fdba74" stroke="#c2410c" stroke-width="1.5"/>'
    +'<rect x="11" y="46" width="34" height="9" rx="2" fill="#fff7ed"/></svg>';
}
/* ---- Bông hoa nhỏ mang một số (hoặc "?") — chuỗi phép tính bướm → hoa (SGK bài 9 LT2) ---- */
function hoaNho(v){
  var s='<svg width="60" height="60" viewBox="0 0 60 60" style="display:inline-block;vertical-align:middle">';
  for(var i=0;i<6;i++){ var a=i*Math.PI/3; s+='<circle cx="'+(30+15*Math.cos(a)).toFixed(1)+'" cy="'+(30+15*Math.sin(a)).toFixed(1)+'" r="11" fill="#fca5a5" stroke="#dc2626" stroke-width="1.2"/>'; }
  return s+'<circle cx="30" cy="30" r="14" fill="#fef3c7" stroke="#b45309" stroke-width="1.5"/>'
    +'<text x="30" y="36" text-anchor="middle" font-size="'+(String(v).length>2?13:16)+'" font-weight="800" fill="'+(v==='?'?'#b45309':'#7c2d12')+'" font-family="system-ui,Segoe UI,Roboto,sans-serif">'+v+'</text></svg>';
}
function buomNho(v){
  return '<svg width="64" height="56" viewBox="0 0 64 56" style="display:inline-block;vertical-align:middle">'
   +'<ellipse cx="18" cy="20" rx="15" ry="13" fill="#f9a8d4" stroke="#db2777" stroke-width="1.5"/><ellipse cx="46" cy="20" rx="15" ry="13" fill="#f9a8d4" stroke="#db2777" stroke-width="1.5"/>'
   +'<ellipse cx="20" cy="40" rx="11" ry="10" fill="#fbcfe8" stroke="#db2777" stroke-width="1.5"/><ellipse cx="44" cy="40" rx="11" ry="10" fill="#fbcfe8" stroke="#db2777" stroke-width="1.5"/>'
   +'<rect x="29" y="10" width="6" height="38" rx="3" fill="#4b5563"/>'
   +'<rect x="18" y="19" width="28" height="20" rx="10" fill="#ffffff" stroke="#db2777" stroke-width="1"/>'
   +'<text x="32" y="34" text-anchor="middle" font-size="15" font-weight="800" fill="#831843" font-family="system-ui,Segoe UI,Roboto,sans-serif">'+v+'</text></svg>';
}
/* dau = số ở con bướm; buoc = ['× 4', ': 3', …]; giaTri = số ở từng bông hoa (null -> "?") */
function chuoiBuom(dau, buoc, giaTri){
  var s='<div class="flex items-center justify-center gap-1 flex-wrap my-2">'+buomNho(dau);
  for(var i=0;i<buoc.length;i++) s+='<span class="text-slate-600 font-extrabold text-base whitespace-nowrap">'+buoc[i]+' &#8594;</span>'+hoaNho(giaTri[i]===null?'?':giaTri[i]);
  return s+'</div>';
}
/* ---- Thanh gỗ dài «dai» cm cưa thành n đoạn bằng nhau (SGK bài 9 LT5) ---- */
function thanhGo(n, dai){
  var W=260, s='<svg width="'+W+'" height="62" viewBox="0 0 260 62" style="max-width:100%;height:auto;display:inline-block">';
  s+='<rect x="1" y="1" width="258" height="60" rx="10" fill="#fffbeb" stroke="#fcd34d" stroke-width="1"/>';   /* nền sáng riêng: đọc được cả ở giao diện Tối */
  s+='<text x="130" y="14" text-anchor="middle" font-size="14" font-weight="800" fill="#7c2d12" font-family="system-ui,Segoe UI,Roboto,sans-serif">'+dai+' cm</text>';
  s+='<path d="M10 20 L10 16 M10 18 L250 18 M250 16 L250 20" stroke="#92400e" stroke-width="1.5" fill="none"/>';
  s+='<rect x="10" y="26" width="240" height="22" rx="3" fill="#f59e0b" stroke="#92400e" stroke-width="1.5"/>';
  for(var i=1;i<n;i++){ var x=(10+i*240/n).toFixed(1); s+='<line x1="'+x+'" y1="24" x2="'+x+'" y2="50" stroke="#7c2d12" stroke-width="2" stroke-dasharray="3 2"/>'; }
  return s+'</svg>';
}
/* ---- Bảng nhiều cột kiểu SGK: nhan = 3 nhãn dòng; cot = mảng cột [a,b,c]; o = {c:cột, r:dòng} ô "?" ---- */
function bangCot(nhan, cot, o){
  var bd='style="border:1px solid #fcd34d"', s='<table class="mx-auto border-collapse my-2" style="border:2px solid #fcd34d">';
  for(var r=0;r<3;r++){
    s+='<tr><td class="px-2 py-1 text-left font-bold text-slate-600 bg-amber-50 whitespace-nowrap" '+bd+'>'+nhan[r]+'</td>';
    for(var c=0;c<cot.length;c++){ var hoi=(c===o.c && r===o.r);
      s+='<td class="px-2 py-1 text-center '+(hoi?'bg-amber-100 text-amber-700 font-extrabold':'font-bold text-slate-700')+'" style="border:1px solid #fcd34d;min-width:34px">'+(hoi?'?':cot[c][r])+'</td>'; }
    s+='</tr>';
  }
  return s+'</table>';
}
