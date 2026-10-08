/* figures.js — Thư viện DÙNG CHUNG: hàm ngẫu nhiên + hình vẽ lại (SVG gốc).
   Mọi hình là hàm trả CHUỖI (không chạm DOM) nên chạy được cả trong Node để kiểm.
   QUY TẮC: viết bằng nối chuỗi, KHÔNG backtick và KHÔNG template literal (để chèn được editor GitHub). */

/* ---- Hàm ngẫu nhiên (dùng trong generator của từng bài) ---- */
function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

/* =====================================================================================
   QUY CHUẨN HÌNH (skill sk-ve-hinh-tieuhoc) — phong cách PHẲNG kiểu Fluent Emoji:
   mảng màu đặc, KHÔNG viền đen, bo tròn, mỗi vật thêm tối đa một sắc đậm hơn để tạo khối.
   Số trên hình: nhãn TRẮNG, chữ #212121 đậm; ô "?" chữ #B45309.
   Nhân vật / đồ vật trang trí: ảnh có sẵn trong hinh/ (Fluent Emoji, giấy phép MIT — xem hinh/LICENSE-fluentui-emoji.txt).
   Vật mà học sinh phải ĐẾM (chấm bọ rùa, số bút…): TỰ VẼ ở đây để đếm được đúng, và gắn data-dem="<loại>"
   lên TỪNG chi tiết để đếm — kiem_dem.mjs (skill sk-ve-hinh-tieuhoc) đếm lại tự động.
   ===================================================================================== */
var HM = {do:'#F8312F', doDam:'#CA0B4A', cam:'#FF822D', camDam:'#FF6723', vang:'#FCD53F', vangDam:'#FFB02E',
  la:'#86D72F', xanhLa:'#00D26A', troi:'#26C9FC', troiDam:'#00A6ED', hong:'#FF6DC6', tim:'#8D65C5', timDam:'#321B41',
  den:'#212121', goNhat:'#F3AD61', go:'#D37034', goDam:'#7D4533', xam:'#E6E6E6', chu:'#212121', hoi:'#B45309', day:'#CBD5E1'};
var HFONT = 'font-family="system-ui,Segoe UI,Roboto,sans-serif" font-weight="800"';
/* Mở thẻ SVG tự co theo khung (max-width:100%); px = bề rộng hiển thị (mặc định = w) */
function svgHinh(w, h, px){ px=px||w; return '<svg width="'+px+'" height="'+Math.round(px*h/w)+'" viewBox="0 0 '+w+' '+h+'" style="max-width:100%;height:auto;display:inline-block;vertical-align:middle">'; }
/* Ảnh trong kho hinh/: anh() dùng thẳng trong câu hỏi; anhSVG() đặt bên trong một SVG ghép (để gắn nhãn số) */
function anh(ten, px, alt){ return '<img src="hinh/'+ten+'.svg" width="'+px+'" height="'+px+'" alt="'+(alt||'')+'" style="display:inline-block;vertical-align:middle">'; }
function anhSVG(ten, x, y, s){ return '<image href="hinh/'+ten+'.svg" x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'"/>'; }
/* Nhãn số trắng: tròn (tâm cx,cy bán kính r) hoặc viên thuốc (rộng w, cao h) */
function chuSo(cx, cy, v, co){ var s=String(v); return '<text x="'+cx+'" y="'+(cy+co*0.36).toFixed(1)+'" text-anchor="middle" font-size="'+co+'" '+HFONT+' fill="'+(s==='?'?HM.hoi:HM.chu)+'">'+s+'</text>'; }
function nhanTron(cx, cy, r, v, co){ return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#fff"/>'+chuSo(cx, cy, v, co||16); }
function nhanVien(cx, cy, w, h, v, co){ return '<rect x="'+(cx-w/2)+'" y="'+(cy-h/2)+'" width="'+w+'" height="'+h+'" rx="'+(h/2)+'" fill="#fff"/>'+chuSo(cx, cy, v, co||18); }
/* Xếp các hình thành hàng cân đối (6 con -> 3 + 3, không để 5 + 1); toiDa = số hình nhiều nhất một hàng */
function xepHang(ds, toiDa){
  var soHang=Math.ceil(ds.length/toiDa), moiHang=Math.ceil(ds.length/soHang), s='<div class="flex flex-col items-center gap-1 mb-2">';
  for(var i=0;i<ds.length;i+=moiHang) s+='<div class="flex justify-center gap-2">'+ds.slice(i,i+moiHang).join('')+'</div>';
  return s+'</div>';
}

/* ---- Con bọ rùa: đúng 6 chấm, mỗi cánh 3 chấm tách rời (học sinh đếm được) ---- */
function ladybug(px){
  var c=HM.den, s=svgHinh(32,32,px||56), chan='<path d="M9 13 L5 10.5"/><path d="M23 13 L27 10.5"/><path d="M6 19 H2.5"/><path d="M26 19 H29.5"/><path d="M8 25.5 L5 28.5"/><path d="M24 25.5 L27 28.5"/>'
   +'<path d="M14 5 L12.2 2"/><path d="M18 5 L19.8 2"/>';
  /* quầng trắng mờ dưới phần màu đen: nền trắng thì không thấy, giao diện Tối thì đầu + chân không bị chìm */
  s+='<g stroke="#fff" stroke-opacity=".5" stroke-width="3.4" stroke-linecap="round" fill="none">'+chan+'</g><ellipse cx="16" cy="8.4" rx="7" ry="5.4" fill="#fff" fill-opacity=".5"/>'
   +'<g stroke="'+c+'" stroke-width="1.6" stroke-linecap="round" fill="none">'+chan+'</g>'
   +'<ellipse cx="16" cy="8.4" rx="6" ry="4.4" fill="'+c+'"/>'
   +'<circle cx="13.7" cy="6.6" r="1.1" fill="#fff"/><circle cx="18.3" cy="6.6" r="1.1" fill="#fff"/>'
   +'<circle cx="16" cy="19" r="11" fill="'+HM.do+'"/>'
   +'<path d="M16 8.5 V30" stroke="'+c+'" stroke-width="1.3"/>';
  [[11,14.2],[9.6,19.6],[11.6,25],[21,14.2],[22.4,19.6],[20.4,25]].forEach(function(p){ s+='<circle data-dem="cham" cx="'+p[0]+'" cy="'+p[1]+'" r="2.3" fill="'+c+'"/>'; });
  return s+'</svg>';
}
/* ---- Xe tải chở một phép tính: thùng vàng mang nhãn trắng, biểu thức dài thì thùng dài ra (chữ không nhỏ đi) ---- */
function truck(expr){
  var dai=String(expr).length>7, T=dai?132:96, W=T+48, s=svgHinh(W,70);
  s+='<rect x="2" y="4" width="'+T+'" height="42" rx="7" fill="'+HM.vang+'"/>'
   +'<rect x="2" y="38" width="'+T+'" height="8" fill="'+HM.vangDam+'"/>'
   +'<path d="M'+(T+6)+' 16 H'+(T+30)+' Q'+(T+34)+' 16 '+(T+36)+' 20 L'+(T+44)+' 34 V46 H'+(T+6)+' Z" fill="'+HM.xam+'"/>'
   +'<path d="M'+(T+12)+' 21 H'+(T+29)+' L'+(T+35)+' 32 H'+(T+12)+' Z" fill="'+HM.troi+'"/>'
   +'<rect x="2" y="44" width="'+(W-4)+'" height="12" rx="5" fill="'+HM.cam+'"/>'
   +'<rect x="'+(W-7)+'" y="46" width="5" height="5" rx="1.5" fill="'+HM.doDam+'"/>'
   +'<circle cx="24" cy="58" r="9" fill="'+HM.timDam+'"/><circle cx="24" cy="58" r="3.6" fill="#F4F4F4"/>'
   +'<circle cx="'+(T+22)+'" cy="58" r="9" fill="'+HM.timDam+'"/><circle cx="'+(T+22)+'" cy="58" r="3.6" fill="#F4F4F4"/>'
   +nhanVien(2+T/2, 22, T-14, 28, expr, dai?17:19);
  return s+'</svg>';
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
/* Dãy số = MỘT hình SVG: các hạt cách đều trên một sợi dây, co theo màn hình, không xuống dòng, không đè nhau.
   hinh 'tron'|'vuong'|'thoi'; hi = vị trí ô "?"; an = vị trí ô bị che (… ), -1 nếu không có */
function daySo(seq, hi, an, hinh, nen){
  var P=46, n=seq.length, W=n*P+4, s=svgHinh(W,52);   /* 8 hạt = 372 đơn vị: trên điện thoại chỉ co ~0,9 lần, chữ vẫn to */
  s+='<line x1="'+(2+P/2)+'" y1="26" x2="'+(W-2-P/2)+'" y2="26" stroke="'+HM.day+'" stroke-width="3" stroke-linecap="round"/>';
  for(var i=0;i<n;i++){
    var cx=2+P/2+i*P, loai = i===hi ? 'hoi' : (i===an ? 'an' : 'so');
    var f = loai==='hoi' ? '#fff' : (loai==='an' ? HM.xam : nen), vien = loai==='hoi' ? ' stroke="'+HM.vangDam+'" stroke-width="3"' : '';
    if(hinh==='tron') s+='<circle data-tach="1" cx="'+cx+'" cy="26" r="20" fill="'+f+'"'+vien+'/>';
    else if(hinh==='thoi') s+='<rect data-tach="1" x="'+(cx-15)+'" y="11" width="30" height="30" rx="4" transform="rotate(45 '+cx+' 26)" fill="'+f+'"'+vien+'/>';
    else s+='<rect data-tach="1" x="'+(cx-19)+'" y="7" width="38" height="38" rx="9" fill="'+f+'"'+vien+'/>';
    if(loai==='an') s+='<text x="'+cx+'" y="31" text-anchor="middle" font-size="18" '+HFONT+' fill="#475569">&#8230;</text>';
    else s+=chuSo(cx, 26, loai==='hoi' ? '?' : seq[i], loai==='hoi' ? 21 : (String(seq[i]).length>2 ? 15 : 18));
  }
  return s+'</svg>';
}
/* DÃY SỐ đếm thêm/bớt b. Mức 1: đếm thêm từ b, ô cần tìm ở đầu dãy · Mức 2: thêm hoặc bớt, ô bất kỳ ·
   Mức 3: dãy KHÔNG bắt đầu từ b và ô liền kề cũng bị che -> phải dùng bước đếm b */
function bnDaySo(b, lv, hinhLen, hinhXuong){
  var up = lv<=1 ? true : Math.random()<0.5, dau = lv>=3 ? rnd(2,4) : 1, dai = lv>=3 ? 7 : 8, seq=[];
  for(var i=0;i<dai;i++) seq.push(b*(dau+i)); if(!up) seq.reverse();
  var hi = lv<=1 ? rnd(1,3) : rnd(1,dai-2), an = lv>=3 ? (hi+1<=dai-2 ? hi+1 : hi-1) : -1, hinh = up ? (hinhLen||'tron') : (hinhXuong||'thoi');
  var s='<div class="flex justify-center mb-3">'+daySo(seq, hi, an, hinh, up ? HM.vang : HM.troi);
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

/* ---- Hộp bút chì màu có n chiếc bút (SGK bài 9 LT4) — bút tách rời, đếm được ---- */
function hopBut(n, px){
  n=n||6; var mau=[HM.do,HM.cam,HM.vang,HM.xanhLa,HM.hong,HM.tim,HM.la,HM.doDam,HM.vangDam,HM.camDam];
  var L=Math.max(52, n*8), W=L+12, s=svgHinh(W,80,px||Math.round(60*W/64)), p=L/n, w=Math.min(7,p-2);   /* > 6 bút: hộp rộng ra, bút không mảnh đi */
  for(var i=0;i<n;i++){ var x=6+i*p+p/2, t=3+(i%2)*6, m=mau[i%mau.length];
    s+='<path d="M'+(x-w/2).toFixed(1)+' '+(t+9)+' L'+x.toFixed(1)+' '+t+' L'+(x+w/2).toFixed(1)+' '+(t+9)+' Z" fill="'+HM.goNhat+'"/>'
     +'<path d="M'+(x-1.5).toFixed(1)+' '+(t+3)+' L'+x.toFixed(1)+' '+t+' L'+(x+1.5).toFixed(1)+' '+(t+3)+' Z" fill="'+m+'"/>'
     +'<rect data-dem="but" x="'+(x-w/2).toFixed(1)+'" y="'+(t+9)+'" width="'+w.toFixed(1)+'" height="40" fill="'+m+'"/>'; }
  return s+'<rect x="2" y="36" width="'+(W-4)+'" height="42" rx="7" fill="'+HM.troi+'"/><rect x="2" y="36" width="'+(W-4)+'" height="9" rx="4" fill="'+HM.troiDam+'"/>'
    +'<rect x="'+(W/2-17)+'" y="55" width="34" height="11" rx="5.5" fill="#fff"/></svg>';
}
/* ---- Chuỗi tính liên tiếp: con bướm mang số → (phép tính) → bông hoa → … (SGK bài 9 LT2)
   MỘT hình SVG: co theo màn hình, không rớt bông hoa xuống dòng. dau = số ở con bướm;
   buoc = ['× 4', ': 3', …]; giaTri = số ở từng bông hoa (null -> "?"). Phép tính dùng currentColor -> đổi màu theo giao diện. */
function chuoiBuom(dau, buoc, giaTri){
  var F=56, A=(buoc.length>=3 ? 44 : 50), W=F+buoc.length*(A+F)+4, phong = buoc.length<=1 ? 1.4 : (buoc.length===2 ? 1.15 : 1);   /* ít bước thì vẽ to hơn */
  var s='<svg class="text-slate-700" width="'+Math.round(W*phong)+'" height="'+Math.round(70*phong)+'" viewBox="0 0 '+W+' 70" style="max-width:100%;height:auto;display:inline-block">'
   +'<g transform="translate(2,5)">'+anhSVG('butterfly',0,0,F)+nhanTron(F/2,F/2+3,13.5,dau,17)+'</g>', x=2+F;
  for(var i=0;i<buoc.length;i++){
    s+='<text x="'+(x+A/2)+'" y="27" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+buoc[i]+'</text>'
     +'<path d="M'+(x+6)+' 38 H'+(x+A-8)+' M'+(x+A-14)+' 33 L'+(x+A-7)+' 38 L'+(x+A-14)+' 43" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>';
    x+=A; var v = giaTri[i]===null ? '?' : giaTri[i];
    s+='<g transform="translate('+x+',5)">'+anhSVG('cherry_blossom',0,0,F)+nhanTron(F/2,F/2,14.5,v,String(v).length>2?14:17)+'</g>'; x+=F;
  }
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
/* ---- Thanh gỗ dài «dai» cm cưa thành n đoạn bằng nhau (SGK bài 9 LT5) ---- */
function thanhGo(n, dai){
  var s=svgHinh(260,68);
  s+='<path d="M10 13 V25 M250 13 V25 M10 19 H250" stroke="'+HM.vangDam+'" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
   +nhanVien(130, 19, 76, 24, dai+' cm', 15)
   +'<rect x="10" y="32" width="240" height="30" rx="6" fill="'+HM.goNhat+'"/>'
   +'<rect x="10" y="54" width="240" height="8" rx="3" fill="'+HM.go+'"/>'
   +'<path d="M26 40 H104 M58 47 H196 M142 39 H232" stroke="'+HM.go+'" stroke-width="1.5" stroke-linecap="round" opacity=".55" fill="none"/>';
  for(var i=1;i<n;i++){ var x=(10+i*240/n).toFixed(1); s+='<line data-dem="vach" x1="'+x+'" y1="29" x2="'+x+'" y2="65" stroke="'+HM.goDam+'" stroke-width="2.2" stroke-dasharray="4 3"/>'; }
  return s+'</svg>';
}
/* ---- Đội kéo co: mỗi đội một hàng 7 bạn (trai/gái xen kẽ) nắm sợi dây — đếm được 7 bạn mỗi đội (SGK bài 10) ---- */
function doiKeoCo(soDoi, moiDoi){
  moiDoi=moiDoi||7; var W=moiDoi*42+56, out='<div class="flex flex-col items-center gap-1 mb-2">';
  for(var d=0;d<soDoi;d++){
    var s=svgHinh(W,58)+'<path d="M4 45 H'+(W-4)+'" stroke="'+HM.go+'" stroke-width="5" stroke-linecap="round"/>'
      +'<path d="M4 45 H'+(W-4)+'" stroke="'+HM.goNhat+'" stroke-width="2" stroke-dasharray="5 5"/>';
    for(var i=0;i<moiDoi;i++){ var cx=28+i*42;   /* mặt bạn nhỏ + hai bàn tay nắm dây */
      s+=anhSVG((i+d)%2 ? 'girl' : 'boy', cx-20, 4, 40).replace('<image', '<image data-dem="ban"')
        +'<circle cx="'+(cx-9)+'" cy="45" r="4.5" fill="#FFC83D"/><circle cx="'+(cx+9)+'" cy="45" r="4.5" fill="#FFC83D"/>'; }
    out+=s+'</svg>';
  }
  return out+'</div>';
}
/* ---- Sơ đồ mũi tên kiểu SGK: (ô) —phép→ [ô] … ; nut = [{v: số hoặc null, h:'tron'|'vuong'}], phep = ['× 4', …].
   v null -> ô "?" trắng viền hổ phách. Phép tính dùng currentColor -> đổi màu theo giao diện. ---- */
function soDo(nut, phep){
  var D=56, A=74, W=nut.length*D+(nut.length-1)*A+8, phong = nut.length<=2 ? 1.25 : 1, x=4;
  var s='<svg class="text-slate-700" width="'+Math.round(W*phong)+'" height="'+Math.round(72*phong)+'" viewBox="0 0 '+W+' 72" style="max-width:100%;height:auto;display:inline-block">';
  for(var i=0;i<nut.length;i++){
    var o=nut[i], hoi=(o.v===null || o.v===undefined), trong=(o.v===''), f=hoi ? '#fff' : (trong ? HM.xam : HM.vang), vien=hoi ? ' stroke="'+HM.vangDam+'" stroke-width="3"' : '';
    if(o.h==='tron') s+='<circle cx="'+(x+D/2)+'" cy="44" r="'+(D/2-1.5)+'" fill="'+f+'"'+vien+'/>';
    else s+='<rect x="'+(x+1.5)+'" y="17.5" width="'+(D-3)+'" height="'+(D-3)+'" rx="12" fill="'+f+'"'+vien+'/>';
    if(!trong) s+=chuSo(x+D/2, 44, hoi ? '?' : o.v, hoi ? 24 : (String(o.v).length>2 ? 18 : 22));   /* v:'' = ô trung gian để trống (không hỏi) */
    x+=D;
    if(i<phep.length){
      s+='<text x="'+(x+A/2)+'" y="30" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+phep[i]+'</text>'
       +'<path d="M'+(x+8)+' 44 H'+(x+A-8)+' M'+(x+A-15)+' 38 L'+(x+A-8)+' 44 L'+(x+A-15)+' 50" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>';
      x+=A;
    }
  }
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
/* ---- Con bạch tuộc: đúng 8 xúc tu xoè rời nhau, đầu che gốc xúc tu (SGK bài 11) ---- */
function bachTuoc(px){
  var s=svgHinh(64,64,px||60), c=HM.tim;
  for(var i=0;i<8;i++){ var bx=18+i*28/7, ex=4+i*56/7;   /* đầu xúc tu cách nhau 8 đơn vị, KHÔNG móc cong (móc chạm nhau -> khó đếm) */
    s+='<path data-dem="xuctu" d="M'+bx.toFixed(1)+' 32 Q'+((bx+ex)/2).toFixed(1)+' 52 '+ex.toFixed(1)+' 60" stroke="'+c+'" stroke-width="4" fill="none" stroke-linecap="round"/>'; }
  return s+'<ellipse cx="32" cy="23" rx="18" ry="17" fill="'+c+'"/>'
    +'<ellipse cx="26" cy="15" rx="5" ry="3.5" fill="#fff" fill-opacity=".35"/>'
    +'<circle cx="25" cy="25" r="4.6" fill="#fff"/><circle cx="39" cy="25" r="4.6" fill="#fff"/>'
    +'<circle cx="25.6" cy="25.8" r="2.4" fill="'+HM.den+'"/><circle cx="39.6" cy="25.8" r="2.4" fill="'+HM.den+'"/>'
    +'<circle cx="21" cy="32" r="2.6" fill="'+HM.hong+'"/><circle cx="43" cy="32" r="2.6" fill="'+HM.hong+'"/></svg>';
}
/* ---- Con cua: đúng 8 chân (4 mỗi bên) và 2 càng — đếm được (SGK bài 11) ---- */
function conCua(px){
  var s=svgHinh(72,56,px||64), d=HM.doDam, chan='';
  for(var i=0;i<4;i++){ var y=29+i*4, ey=33+i*6.5;
    chan+='<path data-dem="chan" d="M24 '+y+' L13 '+(ey-4)+' L6 '+ey+'"/><path data-dem="chan" d="M48 '+y+' L59 '+(ey-4)+' L66 '+ey+'"/>'; }
  s+='<g stroke="'+d+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">'+chan
   +'<path d="M27 24 L16 15"/><path d="M45 24 L56 15"/><path d="M31 21 V12"/><path d="M41 21 V12"/></g>';
  /* hai càng: hình tròn có khe kẹp */
  s+='<path data-dem="cang" d="M14 15 m-8 0 a8 8 0 1 0 16 0 l-6 -2 l4 -6 a8 8 0 0 0 -14 8 z" fill="'+HM.do+'"/>'
   +'<path data-dem="cang" d="M58 15 m8 0 a8 8 0 1 1 -16 0 l6 -2 l-4 -6 a8 8 0 0 1 14 8 z" fill="'+HM.do+'"/>'
   +'<ellipse cx="36" cy="33" rx="17" ry="12" fill="'+HM.do+'"/><ellipse cx="36" cy="38" rx="14" ry="6" fill="'+d+'" fill-opacity=".35"/>'
   +'<circle cx="31" cy="11" r="3.4" fill="#fff"/><circle cx="41" cy="11" r="3.4" fill="#fff"/>'
   +'<circle cx="31" cy="11" r="1.7" fill="'+HM.den+'"/><circle cx="41" cy="11" r="1.7" fill="'+HM.den+'"/>';
  return s+'</svg>';
}
/* ---- Quả bóng mang phép tính: 6 múi màu HM (nhìn từ trên), nhãn trắng ngang giữa ---- */
function bong(expr){
  var s=svgHinh(104,104), c=52, r=48, mau=[HM.do,HM.vang,HM.troi,HM.do,HM.vang,HM.troi];
  for(var i=0;i<6;i++){ var a0=(i*60-90)*Math.PI/180, a1=((i+1)*60-90)*Math.PI/180;
    s+='<path d="M'+c+' '+c+' L'+(c+r*Math.cos(a0)).toFixed(1)+' '+(c+r*Math.sin(a0)).toFixed(1)+' A'+r+' '+r+' 0 0 1 '+(c+r*Math.cos(a1)).toFixed(1)+' '+(c+r*Math.sin(a1)).toFixed(1)+' Z" fill="'+mau[i]+'"/>'; }
  return s+'<path d="M22 34 A34 34 0 0 1 44 15" stroke="#fff" stroke-opacity=".6" stroke-width="5" fill="none" stroke-linecap="round"/>'
    +nhanVien(52, 54, 88, 30, expr, coChu(expr,18))+'</svg>';
}
/* ---- Tuần lễ = một dải 7 ô ngày (T2 … CN); soTuan dải xếp chồng — đếm được 7 ngày mỗi tuần ---- */
var THU=['T2','T3','T4','T5','T6','T7','CN'];
function tuanLe(soTuan){
  var out='<div class="flex flex-col items-center gap-1 mb-2">';
  for(var t=0;t<soTuan;t++){ var s=svgHinh(296,40);
    for(var i=0;i<7;i++) s+='<rect data-dem="ngay" x="'+(2+i*42)+'" y="2" width="38" height="36" rx="8" fill="'+(i===6 ? HM.cam : HM.troi)+'"/>'+chuSo(21+i*42, 20, THU[i], 14);
    out+=s+'</svg>'; }
  return out+'</div>';
}
/* ---- Các hộp đựng cốc: đếm được số hộp; mặt hộp in hình cái cốc (không vẽ cốc rời để khỏi đếm nhầm) ---- */
function hopCoc(soHop){
  var s=svgHinh(soHop*44+4, 48);
  for(var i=0;i<soHop;i++){ var x=2+i*44;
    s+='<rect data-dem="hop" x="'+(x+2)+'" y="12" width="36" height="34" rx="4" fill="'+HM.goNhat+'"/>'
     +'<rect x="'+x+'" y="6" width="40" height="10" rx="3" fill="'+HM.go+'"/>'   /* nắp phẳng (không vát — vát trông như mái nhà) */
     +'<path d="M'+(x+13)+' 22 H'+(x+27)+' L'+(x+25)+' 38 H'+(x+15)+' Z" fill="#fff" fill-opacity=".9"/>'; }
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
/* ---- Đội múa rồng: con rồng dài, 9 bạn nhỏ cầm gậy đỡ thân rồng — đếm được 9 người mỗi đội (SGK bài 12) ---- */
function doiMuaRong(soDoi, moiDoi){
  moiDoi=moiDoi||9; var P=38, x0=66, W=x0+moiDoi*P+14, out='<div class="flex flex-col items-center gap-1 mb-2">';
  for(var d=0;d<soDoi;d++){
    var s=svgHinh(W,92), than='M40 26';
    for(var i=0;i<=moiDoi;i++){ var x=x0-6+i*P; than+=' Q'+(x-P/2)+' '+(i%2 ? 8 : 40)+' '+x+' 24'; }
    for(var k=0;k<moiDoi;k++){ var cx=x0+12+k*P;   /* gậy từ thân rồng xuống tay bạn nhỏ */
      s+='<line x1="'+cx+'" y1="26" x2="'+cx+'" y2="62" stroke="'+HM.goDam+'" stroke-width="2.5" stroke-linecap="round"/>'; }
    s+='<path d="'+than+'" stroke="'+HM.xanhLa+'" stroke-width="15" fill="none" stroke-linecap="round"/>'
     +'<path d="'+than+'" stroke="'+HM.vang+'" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="1 10"/>'
     +'<path d="M'+(W-14)+' 24 l10 -9 l-1 9 l7 5 l-11 3 z" fill="'+HM.vangDam+'"/>';                 /* đuôi */
    s+='<path d="M22 12 l3 -10 l5 9 z M34 11 l5 -9 l3 10 z" fill="'+HM.vangDam+'"/>'                  /* sừng */
     +'<circle cx="32" cy="26" r="19" fill="'+HM.do+'"/>'
     +'<path d="M14 34 q-8 4 -12 0 M16 38 q-6 7 -12 6" stroke="'+HM.vangDam+'" stroke-width="3" fill="none" stroke-linecap="round"/>'   /* râu */
     +'<circle cx="25" cy="21" r="5" fill="#fff"/><circle cx="24" cy="21" r="2.4" fill="'+HM.den+'"/>'
     +'<path d="M17 31 q8 6 16 1" stroke="'+HM.doDam+'" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    for(var j=0;j<moiDoi;j++){ var cx2=x0+12+j*P;
      s+=anhSVG((j+d)%2 ? 'girl' : 'boy', cx2-17, 56, 34).replace('<image', '<image data-dem="ban"')+'<circle cx="'+(cx2+1)+'" cy="62" r="4" fill="#FFC83D"/>'; }
    out+=s+'</svg>';
  }
  return out+'</div>';
}
/* ---- Quả dưa hấu chở một phép tính: vỏ xanh sọc đậm, nhãn trắng ---- */
function melon(expr){
  var dai=String(expr).length>7, W=dai?168:132, c=W/2, s=svgHinh(W,72);   /* biểu thức dài -> quả dài ra, chữ giữ cỡ */
  s+='<ellipse cx="'+c+'" cy="38" rx="'+(c-4)+'" ry="32" fill="'+HM.xanhLa+'"/>';
  [[-0.66,0.55],[-0.33,0.85],[0,1],[0.33,0.85],[0.66,0.55]].forEach(function(p){ var h=32*p[1], x=c+p[0]*(c-4);
    s+='<path d="M'+x.toFixed(1)+' '+(38-h+2).toFixed(1)+' q'+(p[0]<0?-7:(p[0]>0?7:0))+' '+h.toFixed(1)+' 0 '+(2*h-4).toFixed(1)+'" stroke="#00A35F" stroke-width="6" fill="none" stroke-linecap="round"/>'; });
  return s+'<path d="M'+(W-16)+' 16 q8 -6 12 -14" stroke="'+HM.goDam+'" stroke-width="3" fill="none" stroke-linecap="round"/>'
    +nhanVien(c, 38, dai?128:92, 30, expr, 18)+'</svg>';
}
/* ---- Bông hoa hướng dương chở một phép tính: hai lớp cánh vàng, nhuỵ nâu, nhãn trắng ---- */
function flower(expr){
  var s=svgHinh(120,120);
  for(var i=0;i<12;i++){ var a=i*30+15, r=a*Math.PI/180, x=60+36*Math.cos(r), y=60+36*Math.sin(r);
    s+='<ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="9" ry="18" transform="rotate('+(a+90)+' '+x.toFixed(1)+' '+y.toFixed(1)+')" fill="'+HM.vangDam+'"/>'; }
  for(var j=0;j<12;j++){ var b=j*30, q=b*Math.PI/180, u=60+34*Math.cos(q), v=60+34*Math.sin(q);
    s+='<ellipse cx="'+u.toFixed(1)+'" cy="'+v.toFixed(1)+'" rx="9" ry="17" transform="rotate('+(b+90)+' '+u.toFixed(1)+' '+v.toFixed(1)+')" fill="'+HM.vang+'"/>'; }
  var dai=String(expr).length>7;   /* biểu thức dài: nhãn rộng ra phủ lên cánh, chữ không nhỏ đi */
  return s+'<circle cx="60" cy="60" r="27" fill="'+HM.goDam+'"/>'+nhanVien(60, 60, dai?112:84, 30, expr, dai?16:18)+'</svg>';
}
/* ---- Con thuyền buồm (hình gợi tình huống) ---- */
function thuyen(px){
  return svgHinh(64,64,px||60)
   +'<path d="M31 6 V44" stroke="'+HM.goDam+'" stroke-width="2.5"/>'
   +'<path d="M33 9 L54 40 H33 Z" fill="'+HM.vang+'"/><path d="M29 14 L12 40 H29 Z" fill="'+HM.cam+'"/>'
   +'<path d="M6 44 H58 L50 56 H14 Z" fill="'+HM.do+'"/><path d="M10 50 H54 L50 56 H14 Z" fill="'+HM.doDam+'"/>'
   +'<path d="M2 60 q6 -4 12 0 t12 0 t12 0 t12 0 t12 0" stroke="'+HM.troi+'" stroke-width="3" fill="none" stroke-linecap="round"/></svg>';
}
/* ---- Túi lưới đựng 9 quả cam (3 × 3) — đếm được ---- */
function tuiCam(px, soQua){
  soQua=soQua||9; var s=svgHinh(64,72,px||60);
  s+='<path d="M14 14 Q32 4 50 14" stroke="'+HM.xanhLa+'" stroke-width="3" fill="none" stroke-linecap="round"/>'
   +'<path d="M8 18 H56 L52 66 Q32 72 12 66 Z" fill="'+HM.la+'" fill-opacity=".25"/>';
  for(var i=0;i<soQua;i++){ var cx=18+(i%3)*14, cy=29+Math.floor(i/3)*14;
    s+='<circle data-dem="qua" cx="'+cx+'" cy="'+cy+'" r="6.6" fill="'+HM.cam+'"/><circle cx="'+(cx-2)+'" cy="'+(cy-2)+'" r="1.6" fill="#fff" fill-opacity=".5"/>'; }
  return s+'<path d="M8 18 H56 L52 66 Q32 72 12 66 Z" stroke="'+HM.xanhLa+'" stroke-width="2" fill="none" stroke-dasharray="3 3"/></svg>';
}
/* ---- Một hàng can nhựa (đếm được số can) ---- */
function hangCan(soCan){
  var s=svgHinh(soCan*34+4, 46);
  for(var i=0;i<soCan;i++){ var x=2+i*34;
    s+='<rect data-dem="can" x="'+(x+2)+'" y="10" width="28" height="34" rx="5" fill="'+HM.vangDam+'"/>'
     +'<rect x="'+(x+19)+'" y="3" width="8" height="9" rx="2" fill="'+HM.doDam+'"/>'
     +'<path d="M'+(x+6)+' 14 h9 v-6 h-9 z" fill="none" stroke="'+HM.cam+'" stroke-width="2.5"/>'
     +'<rect x="'+(x+7)+'" y="22" width="18" height="14" rx="3" fill="#fff" fill-opacity=".85"/>'; }
  return s+'</svg>';
}
