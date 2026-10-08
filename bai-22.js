/* bai-22.js — Bài 22: Luyện tập chung (hình vuông, trung điểm, hình hình tròn, đếm hình, hình khối ghép). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-22.md) và chỉnh sửa của thầy trên PR #10:
   4 MỤC TIÊU (muctieu) × 9 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Thao tác của sách đổi thành chọn một / đếm / điền số / Đúng-Sai. Mọi số đo, số hình, số lá, số mặt do mã tính từ số liệu;
   check() đọc lại số liệu từ chính chuỗi SVG (data-r, data-p, data-dem, data-cm, data-goc, data-kich), không tin nhãn. Không số thập phân.
   Luật đếm hình (bài 19): chỉ đếm hình KHÔNG có điểm nằm giữa cạnh; hai đoạn nối chung đỉnh không cắt nhau.
   Hình mới viết ngay trong file này (không sửa figures.js): luoiVuong, trongVuong, aoLaSung, tronBanKinh, khoiGhep; hinhGhep chép từ bai-19.js.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn22(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
var CHU=['A','B','C','D','E','G','H','K','M','N','P','Q'];
function chuMoi(){ return shuffle(CHU.slice()); }
function f1(v){ return v.toFixed(1); }
function donVi(u){ var l=Math.hypot(u[0],u[1])||1; return [u[0]/l, u[1]/l]; }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function cross3(a, b, c){ return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]); }
function lechGoc(a, b){ var d=Math.abs(a-b)%360; return d>180 ? 360-d : d; }
function pill(cx, cy, w, h, v, co, cm){ return '<g data-cm="'+cm+'">'+nhanVien(Math.round(cx), Math.round(cy), w, h, v, co)+'</g>'; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }

/* ---- Hình mới 1 (D1, D2, D9): các khung lưới ô vuông, mỗi khung một hình chữ nhật (hoặc hình vuông) cạnh nằm trên đường lưới.
   hs = [{x, y, w, h, diem:[[px,py,tên?]], ten:true|false (nhãn A, B, C, D), cap:'Hình 1', pill:[x1,y1,x2,y2,chữ] (nhãn giữa đoạn)}]; o = {n, c, pad}.
   Mỗi hình mang data-r="x,y,w,h", mỗi điểm mang data-p="px,py" (toạ độ ô, y hướng lên) để check() đọc lại. ---- */
function luoiVuong(hs, o){
  var n=o.n, c=o.c, pad=o.pad, gw=n*c, pw=gw+2*pad, cap=o.cap ? 30 : 0, ph=gw+2*pad+cap, s=svgX(hs.length*pw, ph), i;
  hs.forEach(function(h, idx){
    var ox=idx*pw+pad, oy=pad;
    function X(x){ return ox+x*c; } function Y(y){ return oy+(n-y)*c; }
    for(i=0;i<=n;i++) s+='<line x1="'+(ox+i*c)+'" y1="'+oy+'" x2="'+(ox+i*c)+'" y2="'+(oy+gw)+'" stroke="'+HM.day+'" stroke-width="1.5"/><line x1="'+ox+'" y1="'+(oy+i*c)+'" x2="'+(ox+gw)+'" y2="'+(oy+i*c)+'" stroke="'+HM.day+'" stroke-width="1.5"/>';
    s+='<rect data-f="'+idx+'" data-r="'+[h.x,h.y,h.w,h.h].join(',')+'" x="'+X(h.x)+'" y="'+Y(h.y+h.h)+'" width="'+(h.w*c)+'" height="'+(h.h*c)+'" fill="'+HM.troi+'" fill-opacity="0.25" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>';
    if(h.ten){ [['A',h.x,h.y+h.h,-1,-1],['B',h.x+h.w,h.y+h.h,1,-1],['C',h.x+h.w,h.y,1,1],['D',h.x,h.y,-1,1]].forEach(function(v){
      s+='<circle cx="'+X(v[1])+'" cy="'+Y(v[2])+'" r="4.5" fill="'+HM.cam+'"/><text x="'+f1(X(v[1])+v[3]*13)+'" y="'+f1(Y(v[2])+(v[4]<0 ? -9 : 23))+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+v[0]+'</text>'; }); }
    if(h.pill) s+=pill((X(h.pill[0])+X(h.pill[2]))/2, (Y(h.pill[1])+Y(h.pill[3]))/2, 36, 26, h.pill[4], 16, h.pill[4]);
    h.diem.forEach(function(p){
      s+='<circle data-f="'+idx+'" data-p="'+p[0]+','+p[1]+'" cx="'+X(p[0])+'" cy="'+Y(p[1])+'" r="5" fill="'+HM.cam+'"/>';
      if(p[2]){ var tx=X(p[0]), ty=Y(p[1]);
        if(p[1]===h.y+h.h) ty-=14; else if(p[1]===h.y) ty+=24; else if(p[0]===h.x) { tx-=17; ty+=7; } else { tx+=17; ty+=7; }
        s+='<text x="'+f1(tx)+'" y="'+f1(ty)+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+p[2]+'</text>'; } });
    if(h.cap) s+='<text x="'+(ox+gw/2)+'" y="'+(oy+gw+pad+20)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+h.cap+'</text>';
  });
  return khungHinh(s);
}
function docLuoi(s){
  var hs=[], re=/<rect data-f="(\d+)" data-r="([\d,]+)"/g, m, rp=/<circle data-f="(\d+)" data-p="([\d,]+)"/g;
  while((m=re.exec(String(s)))) hs[+m[1]]={r:m[2].split(',').map(Number), p:[]};
  while((m=rp.exec(String(s)))) if(hs[+m[1]]) hs[+m[1]].p.push(m[2].split(',').map(Number));
  return hs;
}
function laTrungDiem(r, p){ var x=r[0], y=r[1], w=r[2], h=r[3];
  if((p[1]===y+h || p[1]===y) && p[0]>x && p[0]<x+w) return 2*p[0]===2*x+w;
  if((p[0]===x || p[0]===x+w) && p[1]>y && p[1]<y+h) return 2*p[1]===2*y+h;
  return false; }
/* Hình đúng = hình vuông VÀ mỗi cạnh có đúng một điểm và điểm đó là trung điểm */
function hinhDung(hh){
  var r=hh.r, x=r[0], y=r[1], w=r[2], h=r[3];
  if(w!==h || hh.p.length!==4) return false;
  var canh=[[0,0],[0,0],[0,0],[0,0]];   /* trên, dưới, trái, phải: [số điểm, số trung điểm] */
  hh.p.forEach(function(p){ var k = p[1]===y+h ? 0 : (p[1]===y ? 1 : (p[0]===x ? 2 : 3)); canh[k][0]++; if(laTrungDiem(r,p)) canh[k][1]++; });
  return canh.every(function(k){ return k[0]===1 && k[1]===1; });
}
/* Bốn điểm trên bốn cạnh của hình (x, y, w, h); lech = [chỉ số cạnh 0..3, bước ±1] để đặt một điểm lệch khỏi trung điểm */
function bonDiem(x, y, w, h, lech){
  var P=[[x+w/2, y+h],[x+w/2, y],[x, y+h/2],[x+w, y+h/2]];
  if(lech){ var k=lech[0]; if(k<2) P[k][0]+=lech[1]; else P[k][1]+=lech[1]; }
  return P;
}

/* ---- Hình mới 2 (D3): tờ giấy tròn trong tờ giấy vuông (kieu 'vuong') hoặc hai tờ giấy tròn trong hình chữ nhật (kieu 'hai').
   sp.bk = số cm ghi trên bán kính (bán kính vẽ thẳng lên từ tâm) · sp.canh = số cm ghi giữa cạnh trên. Nhãn nằm trong <g data-cm="…"> ---- */
function trongVuong(sp){
  var W=300, H=sp.kieu==='vuong' ? 232 : 178, s=svgX(W,H), cx, cy, R, i;
  if(sp.kieu==='vuong'){
    var S=170, x0=(W-S)/2, y0=36; cx=W/2; cy=y0+S/2; R=S/2;
    s+='<rect x="'+x0+'" y="'+y0+'" width="'+S+'" height="'+S+'" fill="'+HM.vang+'" fill-opacity="0.3" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>'
     +'<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="'+HM.troi+'" fill-opacity="0.3" stroke="currentColor" stroke-width="3"/>';
    if(sp.bk) s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+cx+'" y2="'+(cy-R)+'" stroke="'+HM.doDam+'" stroke-width="3" stroke-linecap="round"/>'+pill(cx, cy-R/2, 62, 26, sp.bk+' cm', 16, sp.bk);
    if(sp.canh) s+=pill(cx, y0, 62, 26, sp.canh+' cm', 16, sp.canh);
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="5" fill="'+HM.cam+'"/><text x="'+(cx-18)+'" y="'+(cy+24)+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">O</text>';
  } else {
    var x1=40, y1=26, h=110; R=h/2;
    s+='<rect x="'+x1+'" y="'+y1+'" width="'+(4*R)+'" height="'+h+'" fill="'+HM.vang+'" fill-opacity="0.3" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>';
    for(i=0;i<2;i++){ cx=x1+R+i*2*R; cy=y1+R; s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="'+HM.troi+'" fill-opacity="0.3" stroke="currentColor" stroke-width="3"/><circle cx="'+cx+'" cy="'+cy+'" r="5" fill="'+HM.cam+'"/>'; }
    if(sp.bk){ cx=x1+R; cy=y1+R; s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+cx+'" y2="'+(cy-R)+'" stroke="'+HM.doDam+'" stroke-width="3" stroke-linecap="round"/>'+pill(cx, cy-R/2, 62, 26, sp.bk+' cm', 16, sp.bk); }
  }
  return khungHinh(s);
}
function docCm(s){ var o=[], re=/<g data-cm="([^"]+)">/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }

/* ---- Hình mới 3 (D4): ao hình chữ nhật, các lá súng hình tròn xếp sát nhau dọc cạnh trên (dai lá) và cạnh trái (rong lá);
   lá ở góc tính cho cả hai cạnh. Mỗi lá là một vòng tròn data-dem="la", các lá cách nhau 2 đơn vị (không chồng nhau). ---- */
function aoLaSung(dai, rong){
  var m=12, dp=Math.min(40, Math.floor(280/dai)), W=dai*dp+2*m, H=rong*dp+2*m, s=svgX(W,H), i, j;
  s+='<rect x="'+m+'" y="'+m+'" width="'+(dai*dp)+'" height="'+(rong*dp)+'" rx="8" fill="'+HM.troi+'" fill-opacity="0.3" stroke="currentColor" stroke-width="3"/>';
  for(i=0;i<dai;i++) s+='<circle data-dem="la" cx="'+(m+dp*(i+0.5))+'" cy="'+(m+dp/2)+'" r="'+(dp/2-2)+'" fill="'+HM.xanhLa+'"/>';
  for(j=1;j<rong;j++) s+='<circle data-dem="la" cx="'+(m+dp/2)+'" cy="'+(m+dp*(j+0.5))+'" r="'+(dp/2-2)+'" fill="'+HM.xanhLa+'"/>';
  return khungHinh(s);
}

/* ---- Hình ghép từ các đoạn (chép từ bai-19.js): pts = {tên:[x,y]}, segs = các đoạn tối đa theo thứ tự điểm ---- */
function chungDoan(segs, a, b){ for(var i=0;i<segs.length;i++) if(segs[i].indexOf(a)>=0 && segs[i].indexOf(b)>=0) return true; return false; }
function dsTamGiac(pts, segs){
  var ten=Object.keys(pts), out=[], i, j, k;
  for(i=0;i<ten.length;i++) for(j=i+1;j<ten.length;j++) for(k=j+1;k<ten.length;k++){ var a=ten[i], b=ten[j], c=ten[k];
    if(Math.abs(cross3(pts[a],pts[b],pts[c]))>1e-9 && chungDoan(segs,a,b) && chungDoan(segs,b,c) && chungDoan(segs,a,c)) out.push(a+b+c); }
  return out;
}
function dsTuGiac(pts, segs){
  var ten=Object.keys(pts), out=[], i, j, k, l;
  function loi(o){ var n=o.length, s=0, t; for(t=0;t<n;t++){ var z=cross3(pts[o[t]],pts[o[(t+1)%n]],pts[o[(t+2)%n]]); if(Math.abs(z)<1e-9) return false; if(s===0) s=z>0?1:-1; else if((z>0?1:-1)!==s) return false; } return true; }
  for(i=0;i<ten.length;i++) for(j=i+1;j<ten.length;j++) for(k=j+1;k<ten.length;k++) for(l=k+1;l<ten.length;l++){
    var q=[ten[i],ten[j],ten[k],ten[l]], thu=[[q[0],q[1],q[2],q[3]],[q[0],q[1],q[3],q[2]],[q[0],q[2],q[1],q[3]]], ok=false;
    thu.forEach(function(o){ if(!ok && loi(o) && chungDoan(segs,o[0],o[1]) && chungDoan(segs,o[1],o[2]) && chungDoan(segs,o[2],o[3]) && chungDoan(segs,o[3],o[0])) ok=true; });
    if(ok) out.push(q.join('')); }
  return out;
}
function hinhGhep(sp){
  var W=260, H=200, ten=Object.keys(sp.pts), xs=ten.map(function(t){ return sp.pts[t][0]; }), ys=ten.map(function(t){ return sp.pts[t][1]; }), mnx=Math.min.apply(null,xs), mxx=Math.max.apply(null,xs), mny=Math.min.apply(null,ys), mxy=Math.max.apply(null,ys);
  var k=Math.min((W-80)/(mxx-mnx||1), (H-80)/(mxy-mny||1), 44), s=svgX(W,H), cen=[(mnx+mxx)/2, (mny+mxy)/2];
  function X(p){ return W/2+(p[0]-cen[0])*k; } function Y(p){ return H/2-(p[1]-cen[1])*k; }
  sp.segs.forEach(function(sg){ var a=sp.pts[sg[0]], b=sp.pts[sg[sg.length-1]]; s+='<path d="M'+f1(X(a))+' '+f1(Y(a))+' L'+f1(X(b))+' '+f1(Y(b))+'" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>'; });
  ten.forEach(function(t){ var p=sp.pts[t], d=donVi([p[0]-cen[0], -(p[1]-cen[1])]);
    s+='<circle cx="'+f1(X(p))+'" cy="'+f1(Y(p))+'" r="5" fill="'+HM.cam+'"/><text x="'+f1(X(p)+d[0]*17)+'" y="'+f1(Y(p)+d[1]*17+7)+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+t+'</text>'; });
  return khungHinh(s);
}
function doiTen(mau, bang){ var pts={}, segs; Object.keys(mau.pts).forEach(function(t){ pts[bang[t]]=mau.pts[t]; }); segs=mau.segs.map(function(sg){ return sg.map(function(t){ return bang[t]; }); }); return {pts:pts, segs:segs}; }
/* lật hoặc xoay mẫu cho đỡ nhàm: sx, sy = ±1; xoay = đổi chỗ x, y */
function bienMau(mau, sx, sy, xoay){ var pts={}; Object.keys(mau.pts).forEach(function(t){ var p=mau.pts[t], q=[p[0]*sx, p[1]*sy]; pts[t]= xoay ? [q[1],q[0]] : q; }); return {pts:pts, segs:mau.segs}; }
var MAU_T4={pts:{a:[1,3],b:[5,3],c:[4,0],d:[0,0]}, segs:[['a','b'],['b','c'],['c','d'],['d','a'],['a','c']]};
var MAU_N1={pts:{a:[3,5],b:[0,3],c:[1,0],d:[5,0],e:[6,3]}, segs:[['a','b'],['b','c'],['c','d'],['d','e'],['e','a'],['a','c']]};
var MAU_N2={pts:{a:[3,5],b:[0,3],c:[1,0],d:[5,0],e:[6,3]}, segs:[['a','b'],['b','c'],['c','d'],['d','e'],['e','a'],['a','c'],['a','d']]};
var MAU_L6={pts:{a:[-2.6,1.1],b:[-2.6,-1.1],c:[0,-2.2],d:[2.6,-1.1],e:[2.6,1.1],f:[0,2.2]}, segs:[['a','b'],['b','c'],['c','d'],['d','e'],['e','f'],['f','a'],['a','c'],['a','d'],['a','e']]};
/* hai đoạn có cắt nhau ở điểm bên trong cả hai đoạn không (chung đầu mút thì không tính) */
function catNhau(p, q, r, t){ var d1=cross3(p,q,r), d2=cross3(p,q,t), d3=cross3(r,t,p), d4=cross3(r,t,q); return d1*d2<-1e-9 && d3*d4<-1e-9; }
function khongCatNhau(g){
  var d=g.segs.map(function(sg){ return [g.pts[sg[0]], g.pts[sg[sg.length-1]]]; }), i, j;
  for(i=0;i<d.length;i++) for(j=i+1;j<d.length;j++) if(catNhau(d[i][0],d[i][1],d[j][0],d[j][1])) return false;
  return true;
}

/* ---- Hình mới 4 (D6): hình tròn tâm O, các bán kính OA, OB, … ở các góc angs (độ, y hướng lên), nhãn chữ ngoài đầu mút; ê ke vẽ bên phải.
   Mỗi đầu mút mang data-goc="tên:góc" để check() đọc lại. ---- */
function tronBanKinh(angs, ten){
  var W=380, H=292, C=144, cy=140, R=84, s=svgX(W,H), i;
  s+='<circle cx="'+C+'" cy="'+cy+'" r="'+R+'" fill="'+HM.troi+'" fill-opacity="0.22" stroke="currentColor" stroke-width="3"/>';
  angs.forEach(function(a){ var r=a*Math.PI/180; s+='<line x1="'+C+'" y1="'+cy+'" x2="'+f1(C+R*Math.cos(r))+'" y2="'+f1(cy-R*Math.sin(r))+'" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'; });
  /* chữ O đặt ở hướng xa mọi bán kính nhất */
  var best=45, bd=-1;
  [45,135,225,315,0,90,180,270].forEach(function(p){ var m=999; angs.forEach(function(a){ m=Math.min(m, lechGoc(a,p)); }); if(m>bd){ bd=m; best=p; } });
  var pr=best*Math.PI/180;
  s+='<circle cx="'+C+'" cy="'+cy+'" r="5.5" fill="'+HM.cam+'"/><text x="'+f1(C+21*Math.cos(pr))+'" y="'+f1(cy-21*Math.sin(pr)+7)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">O</text>';
  angs.forEach(function(a, k){ var r=a*Math.PI/180;
    s+='<circle data-goc="'+ten[k]+':'+a+'" cx="'+f1(C+R*Math.cos(r))+'" cy="'+f1(cy-R*Math.sin(r))+'" r="5.5" fill="'+HM.cam+'"/><text x="'+f1(C+(R+20)*Math.cos(r))+'" y="'+f1(cy-(R+20)*Math.sin(r)+7)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+ten[k]+'</text>'; });
  s+='<path d="M290 240 L290 168 L360 240 Z" fill="'+HM.vang+'" fill-opacity="0.55" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M290 224 L306 224 L306 240" fill="none" stroke="currentColor" stroke-width="2.5"/>'
   +'<text x="324" y="264" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">ê ke</text>';
  return khungHinh(s);
}
function docGoc(s){ var o={}, re=/data-goc="([^:"]+):(-?\d+)"/g, m; while((m=re.exec(String(s)))) o[m[1]]=+m[2]; return o; }
/* Bộ góc: đúng MỘT cặp vuông góc (90 độ), mọi cặp khác lệch >= 12 độ so với 90 độ; hai bán kính cách nhau >= 28 độ.
   n = số bán kính; gan = có ít nhất một cặp lệch đúng 12–16 độ (gần vuông); tuyetDoi = bán kính vuông nằm ngang / thẳng đứng */
function layBoGoc(n, gan, truc){
  for(var tr=0;tr<6000;tr++){
    var a0 = truc ? 90*rnd(0,3) : 5*rnd(0,71), A=[a0, (a0+90)%360], k;
    for(k=2;k<n;k++) A.push(5*rnd(0,71));
    var ok=true, nearMiss=false, i, j;
    for(i=0;i<n && ok;i++) for(j=i+1;j<n;j++){ var d=lechGoc(A[i],A[j]), vuong=(i===0 && j===1);
      if(d<28){ ok=false; break; }
      if(!vuong){ var e=Math.abs(d-90); if(e<12){ ok=false; break; } if(e<=16) nearMiss=true; } }
    if(ok && (!gan || nearMiss)) return A;
  }
  return null;
}
function soCapVuong(A){ var d=0, i, j; for(i=0;i<A.length;i++) for(j=i+1;j<A.length;j++) if(lechGoc(A[i],A[j])===90) d++; return d; }
function khoangVuong(A){ var m=999, i, j; for(i=0;i<A.length;i++) for(j=i+1;j<A.length;j++){ var d=lechGoc(A[i],A[j]); if(d!==90) m=Math.min(m, Math.abs(d-90)); } return m; }

/* ---- Hình mới 5 (D7, D8): khối hộp ghép từ các khối nhỏ, phép chiếu xiên (mặt trước, mặt trên, mặt phải), a × b × c khối (rộng, sâu, cao).
   son = {tr, tren, phai} mặt nào tô đỏ; mỗi ô đỏ thấy được là một hình data-dem="do" (các ô không chồng nhau). Kích thước ghi trong <g data-kich="a,b,c">. ---- */
function khoiGhep(a, b, c, son){
  son=son||{}; var u=Math.min(58, Math.floor(200/Math.max(a,c)), Math.floor(230/(a+0.45*b))), dx=0.45*u, dy=0.34*u, m=12, W=Math.round(a*u+b*dx+2*m), H=Math.round(c*u+b*dy+2*m), s=svgX(W,H), X0=m, Y0=m+b*dy, i, j, k;
  function P(x,y){ return f1(x)+','+f1(y); }
  function poly(pts, tomau){ return '<polygon '+(tomau?'data-dem="do" ':'')+'points="'+pts.map(function(p){ return P(p[0],p[1]); }).join(' ')+'" fill="'+(tomau?HM.do:HM.vang)+'" fill-opacity="'+(tomau?'0.85':'0.4')+'" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'; }
  s+='<g data-kich="'+a+','+b+','+c+'">';
  for(i=0;i<a;i++) for(j=0;j<c;j++) s+=poly([[X0+i*u,Y0+j*u],[X0+(i+1)*u,Y0+j*u],[X0+(i+1)*u,Y0+(j+1)*u],[X0+i*u,Y0+(j+1)*u]], son.tr);
  for(i=0;i<a;i++) for(k=0;k<b;k++) s+=poly([[X0+i*u+dx*k,Y0-dy*k],[X0+(i+1)*u+dx*k,Y0-dy*k],[X0+(i+1)*u+dx*(k+1),Y0-dy*(k+1)],[X0+i*u+dx*(k+1),Y0-dy*(k+1)]], son.tren);
  for(k=0;k<b;k++) for(j=0;j<c;j++) s+=poly([[X0+a*u+dx*k,Y0+j*u-dy*k],[X0+a*u+dx*(k+1),Y0+j*u-dy*(k+1)],[X0+a*u+dx*(k+1),Y0+(j+1)*u-dy*(k+1)],[X0+a*u+dx*k,Y0+(j+1)*u-dy*k]], son.phai);
  return khungHinh(s+'</g>');
}
function docKich(s){ var m=/data-kich="(\d+),(\d+),(\d+)"/.exec(String(s)); return m ? [+m[1],+m[2],+m[3]] : null; }

/* ---- Đáp án nhiễu cho các dạng nhận xét "Em thấy thế nào?": mo(n) viết lý do có số n; x = số bạn nói, T = số đúng ---- */
function haiNhanXet(x, T, mo){
  var maiDung = x===T, alt, ch;
  if(maiDung){ alt=T+pick([-2,-1,1,2]); if(alt<=0) alt=T+1; ch=[['Đồng ý, vì '+mo(T), true, T],['Không đồng ý, vì '+mo(alt), false, alt]]; }
  else ch=[['Đồng ý, vì '+mo(x), true, x],['Không đồng ý, vì '+mo(T), false, T]];
  shuffle(ch);
  var idx=ch.map(function(c){ return c[2]; }).indexOf(T);
  return {choices:ch.map(function(c){ return c[0]; }), correct:idx, ds:ch, maiDung:maiDung};
}
function kiemNhanXet(q){
  var ds=q._ds, T=q._T, x=q._x, maiDung = x===T;
  return ds.length===2 && q.choices.length===2 && ds.filter(function(c){ return c[2]===T; }).length===1 && ds[q.correct][2]===T && ds[q.correct][1]===maiDung
    && q.choices[q.correct]===q._dung && new Set(q.choices).size===2;
}
/* mảng ba khung cho D1 (kiểu 'dung' | 'off' | 'off2' | 'hcn'), hình đặt trong lưới n × n */
function dangKhung(kieu, s, n){
  var w=s, h=s, x, y, P, ks;
  if(kieu==='hcn'){ var dm=pick(s===6 ? [[6,4],[4,6]] : [[6,4],[6,2],[4,2],[4,6],[2,6],[2,4]]); w=dm[0]; h=dm[1]; }
  x=rnd(0,n-w); y=rnd(0,n-h); P=bonDiem(x,y,w,h,null);
  if(kieu==='off' || kieu==='off2'){
    ks=shuffle([0,1,2,3]).slice(0, kieu==='off' ? 1 : 2);
    P=bonDiem(x,y,w,h,[ks[0], pick([-1,1])]);
    if(ks[1]!==undefined){ var k=ks[1], d=pick([-1,1]); if(k<2) P[k][0]+=d; else P[k][1]+=d; }
  }
  return {x:x, y:y, w:w, h:h, diem:P};
}

var BAI = {
 n: 22,
 title: 'Luyện Tập Chung',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-hv-hcn':'Nhầm hình vuông với hình chữ nhật', 'lech-trung-diem':'Điểm lệch khỏi trung điểm', 'dem-sot-o':'Đếm sót ô trên lưới', 'nham-ban-kinh-duong-kinh':'Nhầm bán kính với đường kính',
       'dem-sot-la':'Đếm sót hoặc thừa lá', 'dem-sot-hinh':'Đếm sót hoặc thừa hình', 'nham-tam-tu':'Nhầm tam giác với tứ giác', 'goc-gan-vuong':'Nhầm góc gần vuông', 'dem-sot-mat':'Đếm sót mặt của khối nhỏ'},
 muctieu: [
  {id:'MT1', ten:'Hình vuông và trung điểm', muc:['Điểm M có là trung điểm cạnh không (cạnh 4–6 ô); trung điểm cách đỉnh mấy ô.', 'Chọn hình vẽ đúng trong ba hình (hình vuông cạnh 4 ô, có bẫy hình chữ nhật và điểm lệch).', 'Chọn hình đúng khi ba hình gần giống nhau (cạnh 6 ô); biết AM tìm AB; bạn nói đúng hay sai.']},
  {id:'MT2', ten:'Hình tròn và độ dài', muc:['Bán kính 2–4 cm, cạnh hình vuông bao quanh; 3–4 lá súng liền.', 'Cho cạnh hình vuông, tìm bán kính; 5–7 lá súng liền, đường kính 1 dm.', 'Hai tờ giấy tròn cạnh nhau trong hình chữ nhật; lá súng đường kính 2 dm; chiều dài hơn chiều rộng bao nhiêu.']},
  {id:'MT3', ten:'Đếm hình và góc vuông', muc:['Đếm tam giác trong hình có một đường chéo; chọn cặp bán kính tạo góc vuông (bốn bán kính nằm ngang, thẳng đứng).', 'Đếm tam giác, tứ giác trong ngũ giác có hai đường chéo; bốn bán kính xoay bất kỳ.', 'Hình sáu cạnh có ba đường chéo; năm bán kính, có cặp gần vuông.']},
  {id:'MT4', ten:'Hình khối ghép', muc:['Một mặt khối lớn gồm mấy mặt khối nhỏ (4); khối 2 × 2 × 2 gồm 8 khối nhỏ.', 'Sơn đỏ mọi mặt khối 2 × 2 × 2: 6 × 4 = 24 mặt nhỏ; khối nhỏ xếp 2 × 2 × 3, 3 × 3 × 2.', 'Chỉ sơn một số mặt; khối 3 × 3 × 3 (mỗi mặt 9 ô vuông).']}
 ],
 topics: [
  /* D1 — Hình vuông và trung điểm (Tiết 1, Luyện tập 1) */
  {name:'Hình vuông và trung điểm', sec:'Tiết 1, Luyện tập 1 — Hình vuông và trung điểm của mỗi cạnh trên giấy ô', mt:['MT1'], levels:3,
   muc:['Đúng hay sai: M là trung điểm của cạnh, hoặc đây là hình vuông.', 'Chọn trong ba hình: một hình chữ nhật, một hình vuông có điểm lệch, một hình đúng.', 'Ba hình gần giống nhau (cạnh 6 ô): hình chữ nhật 6 × 4, điểm lệch một ô.'],
   make:function(lv){
    var s, h, i;
    if(lv<=1){ s=pick([4,6]); var n=10, x=rnd(1,n-1-s), y=rnd(1,n-1-s);
      if(Math.random()<0.5){ var dung=Math.random()<0.5, xm = dung ? x+s/2 : x+s/2+pick([-1,1]);
        return {type:'mcq', figFn:dsBtn22, mt:'MT1', _lv:1, _kieu:'td', _dung:(dung?'Đ':'S'),
          q:luoiVuong([{x:x,y:y,w:s,h:s,ten:true,diem:[[xm,y+s,'M']]}], {n:n,c:20,pad:28})+'<div class="text-xl font-extrabold text-orange-700 my-1">M là trung điểm của cạnh AB.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
          choices:['Đ','S'], correct:(dung?0:1), sai:(dung?{}:{'0':'lech-trung-diem'}),
          goiY:{'lech-trung-diem':'Trung điểm cách đều hai đầu cạnh. Bé đếm số ô từ M tới A và từ M tới B.', 'chung':'Bé đếm số ô từ M tới A và từ M tới B xem có bằng nhau không.'}}; }
      var laVuong=Math.random()<0.5, dm=pick([[6,4],[4,2],[6,2],[4,6]]), w2 = laVuong ? s : dm[0], h2 = laVuong ? s : dm[1], x2=rnd(1,n-1-w2), y2=rnd(1,n-1-h2);
      return {type:'mcq', figFn:dsBtn22, mt:'MT1', _lv:1, _kieu:'hv', _dung:(laVuong?'Đ':'S'),
        q:luoiVuong([{x:x2,y:y2,w:w2,h:h2,ten:true,diem:[]}], {n:n,c:20,pad:28})+'<div class="text-xl font-extrabold text-orange-700 my-1">ABCD là hình vuông.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:(laVuong?0:1), sai:(laVuong?{}:{'0':'nham-hv-hcn'}),
        goiY:{'nham-hv-hcn':'Hình vuông có bốn cạnh bằng nhau. Bé đếm số ô của hai cạnh kề nhau.', 'chung':'Bé đếm số ô của hai cạnh kề nhau xem có bằng nhau không.'}}; }
    s = lv===2 ? 4 : 6;
    var typ = lv===2 ? ['dung','hcn','off'] : pick([['dung','hcn','off'],['dung','off','off2'],['dung','hcn','off2']]);
    shuffle(typ);
    var hs=typ.map(function(t, k){ var f=dangKhung(t, s, 6); f.cap='Hình '+(k+1); return f; });
    var ch=['Hình 1','Hình 2','Hình 3'], di=typ.indexOf('dung'), sai={};
    typ.forEach(function(t,k){ if(t==='hcn') sai[String(k)]='nham-hv-hcn'; else if(t!=='dung') sai[String(k)]='lech-trung-diem'; });
    return {type:'mcq', mt:'MT1', _lv:lv, _kieu:'ba', _typ:typ, _dung:ch[di], q:'<div>Mai vẽ một <b>hình vuông</b> trên giấy ô, rồi vẽ <b>trung điểm</b> của mỗi cạnh. Hình nào Mai vẽ đúng?</div>'+luoiVuong(hs, {n:6,c:20,pad:10,cap:true}),
      choices:ch, correct:di, sai:sai,
      goiY:{'nham-hv-hcn':'Hình vuông có bốn cạnh bằng nhau. Bé đếm số ô của hai cạnh kề nhau.', 'lech-trung-diem':'Mỗi điểm phải cách đều hai đầu cạnh. Bé đếm số ô về hai phía của từng điểm.'}};
   }, check:function(q){
    var fr=docLuoi(q.q), dungs;
    if(q._lv<=1){ if(fr.length!==1) return false;
      if(q._kieu==='td') return fr[0].p.length===1 && laTrungDiem(fr[0].r, fr[0].p[0])===(q._dung==='Đ') && q.correct===(q._dung==='Đ'?0:1) && fr[0].r[2]===fr[0].r[3];
      return fr[0].p.length===0 && (fr[0].r[2]===fr[0].r[3])===(q._dung==='Đ') && q.correct===(q._dung==='Đ'?0:1); }
    if(fr.length!==3) return false;
    dungs=fr.map(hinhDung);
    return dungs.filter(function(d){ return d; }).length===1 && dungs[q.correct] && kiemMCQ(q) && q.choices.length===3
      && fr.every(function(f, k){ return (q._typ[k]==='hcn') === (f.r[2]!==f.r[3]) && f.p.length===4; }); }},

  /* D2 — Trung điểm cách đỉnh mấy ô (không có trong SGK) */
  {name:'Trung điểm cách đỉnh mấy ô', sec:'Trung điểm của cạnh hình vuông cách đỉnh mấy ô?', mt:['MT1'], levels:3,
   muc:['Cạnh 4 ô: trung điểm cách đỉnh A mấy ô.', 'Cạnh 6 hoặc 8 ô: trung điểm cách đỉnh B mấy ô.', 'Biết AM (M là trung điểm), tìm độ dài cạnh AB.'],
   make:function(lv){
    var s, n=10, k, x, y;
    if(lv<=1){ s=4; x=rnd(1,n-1-s); y=rnd(1,n-1-s); k=s/2;
      return {type:'num', _lv:1, _s:s, _k:k, q:luoiVuong([{x:x,y:y,w:s,h:s,ten:true,diem:[[x+k,y+s,'M']]}], {n:n,c:20,pad:28})+'<div>Hình vuông ABCD có cạnh <b>'+s+' ô</b>. M là trung điểm của cạnh AB.</div><div class="mt-1">M cách đỉnh A mấy ô?</div>', ans:k, unit:'ô',
        sai:nhanSai([[s,'dem-sot-o'],[k+1,'dem-sot-o'],[k-1,'dem-sot-o']], k), goiY:{'dem-sot-o':'Trung điểm chia cạnh thành hai phần bằng nhau. Bé đếm số ô từ A tới M.'}}; }
    if(lv===2){ s=pick([6,8]); x=rnd(1,n-1-s); y=rnd(1,n-1-s); k=s/2;
      return {type:'num', _lv:2, _s:s, _k:k, q:luoiVuong([{x:x,y:y,w:s,h:s,ten:true,diem:[[x+k,y+s,'M']]}], {n:n,c:20,pad:28})+'<div>Hình vuông ABCD có cạnh <b>'+s+' ô</b>. M là trung điểm của cạnh AB.</div><div class="mt-1">M cách đỉnh B mấy ô?</div>', ans:k, unit:'ô',
        sai:nhanSai([[s,'dem-sot-o'],[k+1,'dem-sot-o'],[k-1,'dem-sot-o']], k), goiY:{'dem-sot-o':'Trung điểm chia cạnh thành hai phần bằng nhau. Bé đếm số ô từ M tới B.'}}; }
    k=pick([2,3,4]); s=2*k; x=rnd(1,n-1-s); y=rnd(1,n-1-s);
    return {type:'num', _lv:3, _s:s, _k:k, q:luoiVuong([{x:x,y:y,w:s,h:s,ten:true,diem:[[x+k,y+s,'M']],pill:[x,y+s,x+k,y+s,k+' ô']}], {n:n,c:22,pad:28})+'<div>M là trung điểm của cạnh AB của hình vuông ABCD. Đoạn AM dài <b>'+k+' ô</b>.</div><div class="mt-1">Cạnh AB dài mấy ô?</div>', ans:s, unit:'ô',
      sai:nhanSai([[k,'dem-sot-o'],[s+1,'dem-sot-o'],[s-1,'dem-sot-o'],[k+2,'cong-thay-nhan']], s), goiY:{'dem-sot-o':'M cách đều A và B, nên AB gấp đôi AM.', 'cong-thay-nhan':'AB gồm hai đoạn bằng nhau AM và MB: AB = AM + MB.'}};
  }, check:function(q){
    var fr=docLuoi(q.q), f=fr[0];
    if(fr.length!==1 || f.p.length!==1 || f.r[2]!==f.r[3] || f.r[2]!==q._s || !laTrungDiem(f.r, f.p[0])) return false;
    var am=f.p[0][0]-f.r[0];
    if(q._lv<=2) return am===q._k && q.ans===q._k && q._s===2*q._k;
    var cm=docCm(q.q);
    return am===q._k && cm.length===1 && cm[0]===q._k+' ô' && q.ans===2*q._k && q.ans===q._s; }},

  /* D3 — Giấy tròn trong giấy vuông (Tiết 1, Luyện tập 2) */
  {name:'Giấy tròn trong giấy vuông', sec:'Tiết 1, Luyện tập 2 — Tờ giấy tròn dán vào tờ giấy vuông', mt:['MT2'], levels:3,
   muc:['Biết bán kính, tìm cạnh hình vuông (bằng đường kính).', 'Biết cạnh hình vuông (chẵn), tìm bán kính.', 'Hai tờ giấy tròn cạnh nhau trong hình chữ nhật: tìm chiều dài hoặc chiều rộng.'],
   make:function(lv){
    var r, S;
    if(lv<=1){ r=pick([2,3,4]);
      return {type:'num', _lv:1, _r:r, q:trongVuong({kieu:'vuong', bk:r})+'<div>Tờ giấy hình tròn dán vừa khít vào tờ giấy hình vuông (hình tròn chạm cả bốn cạnh). Bán kính hình tròn như hình vẽ.</div><div class="mt-1">Cạnh hình vuông dài mấy xăng-ti-mét?</div>', ans:2*r, unit:'cm',
        sai:nhanSai([[r,'nham-ban-kinh-duong-kinh'],[4*r,'nham-ban-kinh-duong-kinh'],[2*r+2,'thieu-buoc']], 2*r), goiY:{'nham-ban-kinh-duong-kinh':'Cạnh hình vuông bằng đường kính hình tròn, mà đường kính gấp đôi bán kính.', 'thieu-buoc':'Cạnh hình vuông bằng đường kính, đường kính gấp đôi bán kính. Bé tính lại nhé!'}}; }
    if(lv===2){ S=pick([8,10,12]);
      return {type:'num', _lv:2, _S:S, q:trongVuong({kieu:'vuong', canh:S})+'<div>Tờ giấy hình tròn dán vừa khít vào tờ giấy hình vuông (hình tròn chạm cả bốn cạnh). Cạnh hình vuông như hình vẽ.</div><div class="mt-1">Bán kính hình tròn dài mấy xăng-ti-mét?</div>', ans:S/2, unit:'cm',
        sai:nhanSai([[S,'nham-ban-kinh-duong-kinh'],[2*S,'nham-ban-kinh-duong-kinh'],[S/2+1,'thieu-buoc'],[S/2-1,'thieu-buoc']], S/2), goiY:{'nham-ban-kinh-duong-kinh':'Cạnh hình vuông bằng đường kính. Bán kính bằng một nửa đường kính.', 'thieu-buoc':'Bán kính bằng một nửa đường kính. Bé chia đôi cạnh hình vuông nhé!'}}; }
    r=pick([3,4,5]); var hoi=pick(['dai','rong']);
    return {type:'num', _lv:3, _r:r, _hoi:hoi, q:trongVuong({kieu:'hai', bk:r})+'<div>Hai tờ giấy hình tròn bằng nhau được dán vừa khít vào một tờ giấy hình chữ nhật: hai hình tròn chạm nhau và chạm các cạnh. Bán kính mỗi hình tròn như hình vẽ.</div><div class="mt-1">'+(hoi==='dai' ? 'Chiều dài' : 'Chiều rộng')+' của hình chữ nhật là mấy xăng-ti-mét?</div>',
      ans: hoi==='dai' ? 4*r : 2*r, unit:'cm',
      sai: nhanSai(hoi==='dai' ? [[2*r,'thieu-buoc'],[r*2+r,'thieu-buoc'],[r,'nham-ban-kinh-duong-kinh'],[2*r+2,'thieu-buoc']] : [[r,'nham-ban-kinh-duong-kinh'],[4*r,'thieu-buoc'],[2*r+2,'thieu-buoc']], hoi==='dai' ? 4*r : 2*r),
      goiY:{'thieu-buoc':hoi==='dai' ? 'Chiều dài gồm hai đường kính của hai hình tròn xếp liền nhau.' : 'Chiều rộng bằng một đường kính, đường kính gấp đôi bán kính.', 'nham-ban-kinh-duong-kinh':'Đường kính gấp đôi bán kính. Bé tính lại nhé!'}};
  }, check:function(q){
    var cm=docCm(q.q);
    if(cm.length!==1) return false;
    if(q._lv===1) return cm[0]===String(q._r) && q.ans===2*q._r && q.q.indexOf('<rect')>=0;
    if(q._lv===2) return cm[0]===String(q._S) && q._S%2===0 && q.ans===q._S/2;
    return cm[0]===String(q._r) && q.ans===(q._hoi==='dai' ? 4*q._r : 2*q._r); }},

  /* D4 — Lá súng trên ao (Tiết 1, Luyện tập 3) */
  {name:'Lá súng trên ao', sec:'Tiết 1, Luyện tập 3 — Lá súng xếp sát nhau dọc hai cạnh của ao', mt:['MT2'], levels:3,
   muc:['3–4 lá liền, đường kính 1 dm: chiều dài hoặc chiều rộng của ao.', '5–7 lá (chiều dài), 3–5 lá (chiều rộng), đường kính 1 dm.', 'Đường kính 2 dm; chiều dài hơn chiều rộng mấy dm.'],
   make:function(lv){
    var dai, rong, d, hoi;
    if(lv<=1){ dai=rnd(3,4); rong=rnd(2,3); d=1; hoi=pick(['dai','rong']); }
    else if(lv===2){ dai=rnd(5,7); rong=rnd(3,5); d=1; hoi=pick(['dai','rong']); }
    else { dai=rnd(5,7); rong=rnd(3,4); d=pick([1,2,2]); hoi=pick(['dai','hon']); }
    if(rong>=dai) rong=dai-1;
    var ans = hoi==='dai' ? dai*d : (hoi==='rong' ? rong*d : (dai-rong)*d), cau = hoi==='dai' ? 'Chiều dài' : (hoi==='rong' ? 'Chiều rộng' : 'Chiều dài hơn chiều rộng');
    var sai = hoi==='hon' ? [[(dai+rong-1)*d,'dem-sot-la'],[dai*d,'dem-sot-la'],[(dai-rong+1)*d,'dem-sot-la'],[(dai-rong-1)*d,'dem-sot-la']]
      : [[(dai+rong-1)*d,'dem-sot-la'],[((hoi==='dai')?dai-1:rong-1)*d,'dem-sot-la'],[((hoi==='dai')?dai+1:rong+1)*d,'dem-sot-la'],[((hoi==='dai')?rong:dai)*d,'lech-nhom'],[(hoi==='dai'?dai:rong),'thieu-buoc']];
    return {type:'num', _lv:lv, _dai:dai, _rong:rong, _d:d, _hoi:hoi, q:aoLaSung(dai, rong)+'<div>Ao hình chữ nhật. Các lá súng hình tròn, mỗi lá có đường kính <b>'+d+' dm</b>, xếp sát nhau dọc hai cạnh của ao (lá ở góc tính cho cả hai cạnh).</div><div class="mt-1">'+cau+' của ao '+(hoi==='hon'?'bao nhiêu đề-xi-mét?':'là bao nhiêu đề-xi-mét?')+'</div>',
      ans:ans, unit:'dm', sai:nhanSai(sai, ans),
      goiY:{'dem-sot-la':'Bé đếm số lá dọc đúng cạnh được hỏi (lá ở góc tính cho cả hai cạnh), rồi nhân với đường kính '+d+' dm.', 'lech-nhom':'Bé xem lại: hỏi chiều dài hay chiều rộng?', 'thieu-buoc':'Mỗi lá dài '+d+' dm. Bé nhân số lá với '+d+'.'}};
  }, check:function(q){
    var s=q.q, dem=demDem(s,'la');
    if(dem!==q._dai+q._rong-1 || q._dai<=q._rong) return false;
    var e = q._hoi==='dai' ? q._dai*q._d : (q._hoi==='rong' ? q._rong*q._d : (q._dai-q._rong)*q._d);
    return q.ans===e && e>0 && q.ans===q.ans; }},

  /* D5 — Đếm tam giác và tứ giác (Tiết 2, Luyện tập 1) */
  {name:'Đếm tam giác và tứ giác', sec:'Tiết 2, Luyện tập 1 — Tam giác, tứ giác trong hình có đường chéo', mt:['MT3'], levels:3,
   muc:['Tứ giác (hoặc ngũ giác) có một đường chéo: đếm tam giác.', 'Ngũ giác ABCDE có hai đường chéo AC, AD: đếm tam giác hoặc tứ giác.', 'Hình sáu cạnh có ba đường chéo chung đỉnh: tam giác, tứ giác, hoặc cả hai.'],
   make:function(lv){
    var nm=chuMoi(), mau, kieu, ngu=false;
    if(lv<=1){ mau = Math.random()<0.5 ? MAU_T4 : MAU_N1; kieu='tg'; }
    else if(lv===2){ mau=MAU_N2; kieu=pick(['tg','tu']); }
    else { mau=MAU_L6; kieu=pick(['tg','tu','tong']); }
    mau=bienMau(mau, pick([1,-1]), pick([1,-1]), Math.random()<0.4 && mau!==MAU_L6);
    var bang={}, ks=Object.keys(mau.pts); ks.forEach(function(k, idx){ bang[k]=nm[idx]; });
    var g=doiTen(mau, bang), tg=dsTamGiac(g.pts,g.segs), tu=dsTuGiac(g.pts,g.segs), ans, cau, ghi='';
    if(lv>=2) ghi=' (Không tính hình '+(ks.length===5 ? 'ngũ giác' : 'sáu cạnh')+' lớn.)';
    if(kieu==='tg'){ ans=tg.length; cau='Có bao nhiêu <b>hình tam giác</b> trong hình?'; }
    else if(kieu==='tu'){ ans=tu.length-(ks.length===4 ? 1 : 0); cau='Có bao nhiêu <b>hình tứ giác</b> trong hình?'+ghi; }
    else { ans=tg.length+tu.length; cau='Có tất cả bao nhiêu hình tam giác và hình tứ giác trong hình?'+ghi; }
    var fig=hinhGhep(g);
    return {type:'num', _g:g, _kieu:kieu, _lv:lv, _fig:fig, q:fig+'<div>'+cau+'</div>', ans:ans, unit:'hình',
      sai:nhanSai([[ans+1,'dem-sot-hinh'],[ans-1,'dem-sot-hinh'],[ans+2,'dem-sot-hinh'],[ans-2,'dem-sot-hinh'],[kieu==='tg' ? tu.length : tg.length,'nham-tam-tu']], ans),
      goiY:{'dem-sot-hinh':'Bé liệt kê theo tên các đỉnh (ví dụ ABC, ACD, …) và chỉ đếm hình có các cạnh nằm trên các đoạn đã vẽ.', 'nham-tam-tu':'Tam giác có ba đỉnh, tứ giác có bốn đỉnh. Bé xem lại hình được hỏi nhé!'}};
   }, check:function(q){
    var g=q._g, tg=dsTamGiac(g.pts,g.segs), tu=dsTuGiac(g.pts,g.segs), n=Object.keys(g.pts).length, e;
    if(q.q.indexOf(hinhGhep(g))!==0 || !khongCatNhau(g)) return false;
    if(q._kieu==='tg') e=tg.length; else if(q._kieu==='tu') e=tu.length-(n===4 ? 1 : 0); else e=tg.length+tu.length;
    if(q._lv<=1 && q._kieu!=='tg') return false;
    if(q._lv===2 && q._kieu==='tong') return false;
    return q.ans===e && e>=1; }},

  /* D6 — Hai bán kính vuông góc bằng ê ke (Tiết 2, Luyện tập 2) */
  {name:'Hai bán kính vuông góc', sec:'Tiết 2, Luyện tập 2 — Dùng ê ke tìm hai bán kính tạo thành góc vuông', mt:['MT3'], levels:3,
   muc:['Bốn bán kính, cặp vuông góc nằm ngang và thẳng đứng.', 'Bốn bán kính xoay bất kỳ.', 'Năm bán kính, có cặp gần vuông góc (lệch ít nhất 12 độ).'],
   make:function(lv){
    var n = lv>=3 ? 5 : 4, A=layBoGoc(n, lv>=3, lv<=1), ten=shuffle(['A','B','C','D','E','G','H','K']).slice(0,n), i, j, tat=[];
    if(!A) return null;
    var cap=function(i,j){ return 'O'+ten[i]+' và O'+ten[j]; };
    for(i=0;i<n;i++) for(j=i+1;j<n;j++) tat.push([i,j]);
    var dungCap=[0,1], sai=tat.filter(function(p){ return !(p[0]===0 && p[1]===1); });
    if(lv>=3){ sai.sort(function(a,b){ return Math.abs(lechGoc(A[a[0]],A[a[1]])-90)-Math.abs(lechGoc(A[b[0]],A[b[1]])-90); }); var gan=sai.slice(0,2), xa=shuffle(sai.slice(2)).slice(0,1); sai=gan.concat(xa); }
    else sai=shuffle(sai).slice(0,3);
    var sel=shuffle([dungCap].concat(sai)), ch=sel.map(function(p){ return cap(p[0],p[1]); }), dung=cap(0,1), saim={};
    sel.forEach(function(p,k){ if(!(p[0]===0 && p[1]===1)) saim[String(k)]='goc-gan-vuong'; });
    return {type:'mcq', _A:A, _ten:ten, _dung:dung, q:tronBanKinh(A, ten)+'<div>Dùng <b>ê ke</b> kiểm tra: hai bán kính nào của hình tròn tâm O tạo thành <b>góc vuông</b>?</div>', choices:ch, correct:ch.indexOf(dung), sai:saim,
      goiY:{'goc-gan-vuong':'Đặt đỉnh góc vuông của ê ke vào tâm O, một cạnh ê ke trùng một bán kính. Cạnh còn lại phải trùng đúng bán kính kia.'}};
   }, check:function(q){
    var A=q._A, ten=q._ten, d=docGoc(q.q), n=A.length, ok=true;
    ten.forEach(function(t,k){ if(d[t]!==A[k]) ok=false; });
    if(!ok || Object.keys(d).length!==n) return false;
    if(soCapVuong(A)!==1 || lechGoc(A[0],A[1])!==90 || khoangVuong(A)<12) return false;
    var i, j; for(i=0;i<n;i++) for(j=i+1;j<n;j++) if(lechGoc(A[i],A[j])<28) return false;
    return kiemMCQ(q) && q.choices.length===4 && q.choices[q.correct]==='O'+ten[0]+' và O'+ten[1]; }},

  /* D7 — Khối 2 × 2 × 2 sơn đỏ (Tiết 2, Luyện tập 3) */
  {name:'Khối ghép sơn đỏ', sec:'Tiết 2, Luyện tập 3 — Ghép 8 khối lập phương nhỏ, sơn đỏ khối lớn', mt:['MT4'], levels:3,
   muc:['Một mặt khối lớn được sơn đỏ gồm mấy mặt khối nhỏ (đếm 4).', 'Sơn đỏ mọi mặt khối 2 × 2 × 2: 6 × 4 = 24 mặt khối nhỏ.', 'Chỉ sơn một số mặt, hoặc khối 3 × 3 × 3 (mỗi mặt 9 ô).'],
   make:function(lv){
    var n, t, son, cau, sai, goi;
    if(lv<=1){ n=2; t=1; son={tr:true};
      return {type:'num', _lv:1, _n:2, _t:1, _son:son, q:khoiGhep(2,2,2,son)+'<div>Khối lập phương lớn ghép từ <b>8</b> khối lập phương nhỏ. Mặt trước của khối lớn được sơn đỏ như hình vẽ.</div><div class="mt-1">Có bao nhiêu mặt của khối nhỏ được sơn đỏ?</div>', ans:4, unit:'mặt',
        sai:nhanSai([[8,'cong-thay-nhan'],[2,'dem-sot-mat'],[3,'dem-sot-mat'],[1,'dem-sot-mat']], 4), goiY:{'cong-thay-nhan':'Chỉ đếm các ô đỏ trên mặt trước.', 'dem-sot-mat':'Bé đếm lại các ô đỏ trên mặt trước nhé!'}}; }
    if(lv===2){ n=2; t=6; son={tr:true,tren:true,phai:true};
      return {type:'num', _lv:2, _n:2, _t:6, _son:son, q:khoiGhep(2,2,2,son)+'<div>Khối lập phương lớn ghép từ <b>8</b> khối lập phương nhỏ. Người ta sơn đỏ <b>mọi mặt</b> của khối lớn, kể cả các mặt không nhìn thấy.</div><div class="mt-1">Có tất cả bao nhiêu mặt của khối nhỏ được sơn đỏ?</div>', ans:24, unit:'mặt',
        sai:nhanSai([[12,'dem-sot-mat'],[16,'dem-sot-mat'],[20,'dem-sot-mat'],[10,'cong-thay-nhan'],[8,'cong-thay-nhan']], 24),
        goiY:{'dem-sot-mat':'Khối lớn có 6 mặt, mỗi mặt gồm 4 mặt của khối nhỏ. Bé nhớ đếm cả các mặt không nhìn thấy: 6 × 4.', 'cong-thay-nhan':'Mỗi mặt của khối lớn có 4 mặt của khối nhỏ, có 6 mặt lớn: phép nhân 6 × 4.'}}; }
    var v=pick([['tat3',3,6,{tr:true,tren:true,phai:true},'mọi mặt'],['day2',2,5,{tr:true,tren:true,phai:true},'tất cả các mặt, trừ mặt đáy (mặt dưới)'],['day3',3,5,{tr:true,tren:true,phai:true},'tất cả các mặt, trừ mặt đáy (mặt dưới)'],['trenday',2,2,{tren:true},'mặt trên và mặt dưới (hai mặt)']]);
    n=v[1]; t=v[2]; son=v[3];
    return {type:'num', _lv:3, _n:n, _t:t, _son:son, q:khoiGhep(n,n,n,son)+'<div>Khối lập phương lớn ghép từ <b>'+(n*n*n)+'</b> khối lập phương nhỏ. Người ta sơn đỏ <b>'+v[4]+'</b> của khối lớn (kể cả các mặt không nhìn thấy).</div><div class="mt-1">Có tất cả bao nhiêu mặt của khối nhỏ được sơn đỏ?</div>', ans:n*n*t, unit:'mặt',
      sai:nhanSai([[n*n*3,'dem-sot-mat'],[n*n*(t-1),'dem-sot-mat'],[n*n*(t+1),'dem-sot-mat'],[n*n*n*t,'cong-thay-nhan']], n*n*t),
      goiY:{'dem-sot-mat':'Mỗi mặt của khối lớn gồm '+(n*n)+' mặt của khối nhỏ. Bé đếm đúng số mặt lớn được sơn, kể cả mặt không nhìn thấy, rồi nhân với '+(n*n)+'.', 'cong-thay-nhan':'Mỗi mặt của khối lớn gồm '+(n*n)+' mặt của khối nhỏ: lấy số mặt lớn được sơn nhân với '+(n*n)+'.'}};
  }, check:function(q){
    var k=docKich(q.q), n=q._n, son=q._son;
    if(!k || k[0]!==n || k[1]!==n || k[2]!==n) return false;
    var dem=(son.tr?n*n:0)+(son.tren?n*n:0)+(son.phai?n*n:0);
    if(demDem(q.q,'do')!==dem) return false;
    var nhin=(son.tr?1:0)+(son.tren?1:0)+(son.phai?1:0);
    return q._t>=nhin && q._t<=6 && q.ans===n*n*q._t && (q._lv!==1 || q.ans===dem); }},

  /* D8 — Ghép khối nhỏ (không có trong SGK) */
  {name:'Ghép khối nhỏ', sec:'Đếm số khối nhỏ ghép thành khối lớn', mt:['MT4'], levels:3,
   muc:['Lớp dưới 4 khối, lớp trên 4 khối: tất cả 8 khối.', 'Mỗi lớp có b hàng, mỗi hàng a khối, xếp c lớp (khối 2 × 2 × 3, 3 × 3 × 2).', 'Khối 3 × 3 × 3 và các khối lớn hơn.'],
   make:function(lv){
    var d, a, b, c;
    if(lv<=1){ a=2; b=2; c=2; }
    else { d = lv===2 ? pick([[2,2,3],[3,2,2],[3,3,2],[2,2,4]]) : pick([[3,3,3],[4,3,2],[3,3,4],[4,2,3]]); a=d[0]; b=d[1]; c=d[2]; }
    var ans=a*b*c, cau = lv<=1 ? 'Lớp dưới xếp 4 khối nhỏ, lớp trên cũng xếp 4 khối nhỏ.' : 'Mỗi lớp có '+b+' hàng, mỗi hàng có '+a+' khối nhỏ. Có '+c+' lớp như thế.';
    return {type:'num', _a:a, _b:b, _c:c, q:khoiGhep(a,b,c,{})+'<div>Khối lớn ghép từ các khối lập phương nhỏ bằng nhau. '+cau+'</div><div class="mt-1">Khối lớn gồm tất cả bao nhiêu khối nhỏ?</div>', ans:ans, unit:'khối',
      sai:nhanSai([[a*b,'thieu-buoc'],[a+b+c,'cong-thay-nhan'],[a*c+a*b+b*c,'dem-sot-mat'],[ans-a,'dem-sot-mat'],[ans+a,'dem-sot-mat']], ans),
      goiY:{'thieu-buoc':'Bé mới tính một lớp. Còn phải nhân với số lớp.', 'cong-thay-nhan':'Số khối là '+b+' hàng × '+a+' khối × '+c+' lớp, không phải cộng.', 'dem-sot-mat':'Bé không chỉ đếm các khối nhìn thấy: các khối bị che cũng được tính.'}};
  }, check:function(q){
    var k=docKich(q.q);
    return !!k && k[0]===q._a && k[1]===q._b && k[2]===q._c && demDem(q.q,'do')===0 && q.ans===q._a*q._b*q._c && q.ans>=8 && q.ans<=100; }},

  /* D9 — Đúng / Sai tìm lỗi (không có trong SGK) */
  {name:'Đúng / Sai', sec:'Tìm lỗi — Hình vuông, hình tròn, đếm hình', mt:['MT1','MT2','MT3'], levels:3,
   muc:['Đúng hay sai về hình vuông, hình tròn, tam giác, tứ giác (câu ngắn).', 'Đúng hay sai: câu có số (trung điểm, bán kính, đếm hình).', 'Bạn Mai nói: em thấy thế nào?'],
   make:function(lv, mt){
    var ds, T, x, mo, hnx, sailab, ph, laDung, g, fig;
    if(mt==='MT1'){
      if(lv<=1){ ds=pick([['Hình vuông có bốn cạnh bằng nhau.',true,'nham-hv-hcn'],['Hình vuông có hai cạnh dài và hai cạnh ngắn.',false,'nham-hv-hcn'],['Trung điểm của một cạnh cách đều hai đầu cạnh.',true,'lech-trung-diem'],['Trung điểm của một cạnh cách một đầu 1 ô và cách đầu kia 3 ô.',false,'lech-trung-diem']]);
        return {type:'mcq', figFn:dsBtn22, mt:mt, _lv:1, _mt:mt, _ph:ds[0], _thatSu:ds[1], _dung:(ds[1]?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+ds[0]+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(ds[1]?0:1), sai:(ds[1]?{}:{'0':ds[2]}),
          goiY:{'nham-hv-hcn':'Hình vuông có bốn cạnh bằng nhau.', 'lech-trung-diem':'Trung điểm cách đều hai đầu của cạnh.', 'chung':'Bé nhớ lại: hình vuông có bốn cạnh bằng nhau, trung điểm cách đều hai đầu cạnh.'}}; }
      var s=pick([4,6,8]); T=s/2;
      if(lv===2){ x = Math.random()<0.5 ? T : pick([T-1,T+1,s]); laDung = x===T;
        return {type:'mcq', figFn:dsBtn22, mt:mt, _lv:2, _mt:mt, _s:s, _x:x, _dung:(laDung?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">Hình vuông ABCD có cạnh '+s+' ô. Trung điểm M của cạnh AB cách A là '+x+' ô.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(laDung?0:1), sai:(laDung?{}:{'0':'dem-sot-o'}),
          goiY:{'dem-sot-o':'Trung điểm chia cạnh thành hai phần bằng nhau, mỗi phần '+T+' ô.', 'chung':'Trung điểm chia cạnh '+s+' ô thành hai phần bằng nhau.'}}; }
      x = Math.random()<0.5 ? T : pick([T-1,T+1,s]); mo=function(v){ return 'AM dài '+v+' ô'; }; hnx=haiNhanXet(x, T, mo); var sai1={}; sai1[String(1-hnx.correct)]='dem-sot-o';
      return {type:'mcq', cot:1, mt:mt, _lv:3, _mt:mt, _s:s, _x:x, _T:T, _ds:hnx.ds, _dung:hnx.choices[hnx.correct], q:'<div class="flex justify-center mb-1">'+anh('girl',72,'Bạn Mai')+'</div><div>Hình vuông ABCD có cạnh <b>'+s+' ô</b>. M là trung điểm của cạnh AB.</div><div class="mt-1">Bạn Mai nói: «AM dài <b>'+x+' ô</b>.» Em thấy thế nào?</div>', choices:hnx.choices, correct:hnx.correct, sai:sai1,
        goiY:{'dem-sot-o':'M là trung điểm nên AM bằng một nửa cạnh AB: '+s+' ô chia đôi.', 'chung':'M là trung điểm nên AM bằng MB, và bằng một nửa AB.'}}; }
    if(mt==='MT2'){
      if(lv<=1){ ds=pick([['Bán kính của hình tròn bằng một nửa đường kính.',true],['Đường kính của hình tròn dài gấp đôi bán kính.',true],['Bán kính của hình tròn dài hơn đường kính.',false],['Hình tròn có nhiều bán kính, mỗi bán kính dài một khác.',false]]);
        return {type:'mcq', figFn:dsBtn22, mt:mt, _lv:1, _mt:mt, _ph:ds[0], _thatSu:ds[1], _dung:(ds[1]?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+ds[0]+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(ds[1]?0:1), sai:(ds[1]?{}:{'0':'nham-ban-kinh-duong-kinh'}),
          goiY:{'nham-ban-kinh-duong-kinh':'Đường kính gấp đôi bán kính. Mọi bán kính của một hình tròn đều bằng nhau.', 'chung':'Đường kính gấp đôi bán kính.'}}; }
      var r=rnd(2,9); T=2*r;
      if(lv===2){ var thuan=Math.random()<0.5; x = Math.random()<0.5 ? (thuan?T:r) : (thuan ? pick([r,T+2,T-2]) : pick([T,r+1,r-1])); laDung = thuan ? x===T : x===r;
        return {type:'mcq', figFn:dsBtn22, mt:mt, _lv:2, _mt:mt, _r:r, _thuan:thuan, _x:x, _dung:(laDung?'Đ':'S'),
          q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+(thuan ? 'Hình tròn có bán kính '+r+' cm thì đường kính là '+x+' cm.' : 'Hình tròn có đường kính '+T+' cm thì bán kính là '+x+' cm.')+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
          choices:['Đ','S'], correct:(laDung?0:1), sai:(laDung?{}:{'0':'nham-ban-kinh-duong-kinh'}), goiY:{'nham-ban-kinh-duong-kinh':'Đường kính gấp đôi bán kính, bán kính bằng một nửa đường kính.', 'chung':'Đường kính gấp đôi bán kính.'}}; }
      x = Math.random()<0.5 ? T : pick([r,T+2,T-2,4*r]); mo=function(v){ return 'cạnh hình vuông dài '+v+' cm'; }; hnx=haiNhanXet(x, T, mo); var sai2={}; sai2[String(1-hnx.correct)]='nham-ban-kinh-duong-kinh';
      return {type:'mcq', cot:1, mt:mt, _lv:3, _mt:mt, _r:r, _x:x, _T:T, _ds:hnx.ds, _dung:hnx.choices[hnx.correct], q:'<div class="flex justify-center mb-1">'+anh('girl',72,'Bạn Mai')+'</div><div>Tờ giấy hình tròn bán kính <b>'+r+' cm</b> dán vừa khít vào tờ giấy hình vuông (hình tròn chạm cả bốn cạnh).</div><div class="mt-1">Bạn Mai nói: «Cạnh hình vuông dài <b>'+x+' cm</b>.» Em thấy thế nào?</div>', choices:hnx.choices, correct:hnx.correct, sai:sai2,
        goiY:{'nham-ban-kinh-duong-kinh':'Cạnh hình vuông bằng đường kính hình tròn, đường kính gấp đôi bán kính '+r+' cm.', 'chung':'Cạnh hình vuông bằng đường kính hình tròn.'}}; }
    /* MT3 */
    if(lv<=1){ ds=pick([['Hình tam giác có 3 đỉnh.',true,'nham-tam-tu'],['Hình tứ giác có 3 cạnh.',false,'nham-tam-tu'],['Ê ke dùng để kiểm tra góc vuông.',true,'goc-gan-vuong'],['Hai bán kính bất kỳ của hình tròn luôn tạo thành góc vuông.',false,'goc-gan-vuong']]);
      return {type:'mcq', figFn:dsBtn22, mt:mt, _lv:1, _mt:mt, _ph:ds[0], _thatSu:ds[1], _dung:(ds[1]?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+ds[0]+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(ds[1]?0:1), sai:(ds[1]?{}:{'0':ds[2]}),
        goiY:{'nham-tam-tu':'Tam giác có 3 đỉnh, 3 cạnh. Tứ giác có 4 đỉnh, 4 cạnh.', 'goc-gan-vuong':'Chỉ khi dùng ê ke kiểm tra thấy khít mới là góc vuông.', 'chung':'Bé nhớ lại cách dùng ê ke và số đỉnh, số cạnh của tam giác, tứ giác.'}}; }
    var nm=chuMoi(), mau = lv===2 ? MAU_N2 : MAU_L6, bang={}, ks=Object.keys(mau.pts), loai=pick(['tg','tu']);
    ks.forEach(function(k, idx){ bang[k]=nm[idx]; });
    g=doiTen(mau, bang); fig=hinhGhep(g);
    T = loai==='tg' ? dsTamGiac(g.pts,g.segs).length : dsTuGiac(g.pts,g.segs).length-0;
    var ten = loai==='tg' ? 'hình tam giác' : 'hình tứ giác', ghi = ' (Không tính hình '+(ks.length===5 ? 'ngũ giác' : 'sáu cạnh')+' lớn.)';
    x = Math.random()<0.5 ? T : pick([T-1,T+1]);
    if(lv===2){ laDung=x===T;
      return {type:'mcq', figFn:dsBtn22, mt:mt, _lv:2, _mt:mt, _g:g, _fig:fig, _loai:loai, _x:x, _dung:(laDung?'Đ':'S'), q:fig+'<div class="text-xl font-extrabold text-orange-700 my-1">Trong hình có '+x+' '+ten+'.'+ghi+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:(laDung?0:1), sai:(laDung?{}:{'0':'dem-sot-hinh'}), goiY:{'dem-sot-hinh':'Bé liệt kê theo tên các đỉnh và chỉ đếm hình có các cạnh nằm trên các đoạn đã vẽ.', 'chung':'Bé liệt kê các hình theo tên các đỉnh rồi đếm.'}}; }
    mo=function(v){ return 'có '+v+' '+ten; }; hnx=haiNhanXet(x, T, mo); var sai3={}; sai3[String(1-hnx.correct)]='dem-sot-hinh';
    return {type:'mcq', cot:1, mt:mt, _lv:3, _mt:mt, _g:g, _fig:fig, _loai:loai, _x:x, _T:T, _ds:hnx.ds, _dung:hnx.choices[hnx.correct], q:fig+'<div class="flex justify-center mb-1">'+anh('girl',64,'Bạn Mai')+'</div><div>Bạn Mai nói: «Trong hình có <b>'+x+' '+ten+'</b>.'+ghi+'» Em thấy thế nào?</div>', choices:hnx.choices, correct:hnx.correct, sai:sai3,
      goiY:{'dem-sot-hinh':'Bé liệt kê các hình theo tên các đỉnh (ví dụ ABC, ACD, …) rồi đếm.', 'chung':'Bé liệt kê các hình theo tên các đỉnh rồi đếm.'}};
  }, check:function(q){
    var mt=q._mt, g, e;
    if(q._lv<=1) return q.choices.join()==='Đ,S' && (q._dung==='Đ')===q._thatSu && q.correct===(q._thatSu?0:1);
    if(mt==='MT1'){
      if(q._lv===2) return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===q._s/2) && q.correct===(q._x===q._s/2?0:1) && q._s%2===0;
      return kiemNhanXet(q) && q._T===q._s/2 && q._s%2===0; }
    if(mt==='MT2'){
      if(q._lv===2){ var tr = q._thuan ? q._x===2*q._r : q._x===q._r; return q.choices.join()==='Đ,S' && (q._dung==='Đ')===tr && q.correct===(tr?0:1); }
      return kiemNhanXet(q) && q._T===2*q._r; }
    g=q._g; if(q.q.indexOf(q._fig)!==0 || q._fig!==hinhGhep(g) || !khongCatNhau(g)) return false;
    e = q._loai==='tg' ? dsTamGiac(g.pts,g.segs).length : dsTuGiac(g.pts,g.segs).length;
    if(q._lv===2) return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===e) && q.correct===(q._x===e?0:1) && e>=1;
    return kiemNhanXet(q) && q._T===e && e>=1; }}
 ]
};
