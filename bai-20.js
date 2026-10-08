/* bai-20.js — Bài 20: Thực hành vẽ góc vuông, đường tròn, hình vuông, hình chữ nhật và vẽ trang trí. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-20.md) và chỉnh sửa của thầy trên PR.
   5 MỤC TIÊU (muctieu) × 13 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   BÀI THỰC HÀNH: web không có công cụ vẽ, nên mọi thao tác của sách đổi thành nhận ra hình vẽ đúng, đếm, chọn.
   Bỏ: tự vẽ hình em thích, tô màu (làm trên giấy ở lớp). Mọi góc, tâm, số ô, số phần do mã tính từ toạ độ; check() tính lại.
   Hình ghép (tàu hoả, rô-bốt, ngôi nhà) ghép từ KHỐI RỜI, không chồng nhau; mỗi khối mang data-dem="hv" hoặc "hcn".
   Hình mới viết ngay trong file này (không sửa figures.js); hàm hình học chép từ bài 18.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn20(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
var CHU=['A','B','C','D','E','G','H','K','M','N','P','Q'];
function chuMoi(){ return shuffle(CHU.slice()); }
var RAD=Math.PI/180;
function f1(v){ return v.toFixed(1); }
var ANG_XA=[35,45,55,65,125,135,145];       /* góc không vuông, khác 90 rõ ràng */
var ANG_GAN=[75,78,102,105];                 /* góc "gần vuông": lệch 12 đến 15 độ */

/* ---- Hình học trên toạ độ (chép từ bài 18) ---- */
function gocGiua(O, A, B){ var u=[A[0]-O[0], A[1]-O[1]], v=[B[0]-O[0], B[1]-O[1]], c=(u[0]*v[0]+u[1]*v[1])/(Math.hypot(u[0],u[1])*Math.hypot(v[0],v[1])); return Math.acos(Math.max(-1, Math.min(1, c)))/RAD; }
function laVuong(O, A, B){ return Math.abs(gocGiua(O,A,B)-90)<0.5; }
function xaVuong(O, A, B){ return Math.abs(gocGiua(O,A,B)-90)>=11.99; }
function diemTu(O, deg, len){ return [O[0]+len*Math.cos(deg*RAD), O[1]-len*Math.sin(deg*RAD)]; }
function donVi(u){ var l=Math.hypot(u[0],u[1])||1; return [u[0]/l, u[1]/l]; }
function datGoc(cx, cy, rot, ang, len, ten){
  var O=[0,0], A=diemTu(O,rot,len), B=diemTu(O,rot+ang,len), xs=[0,A[0],B[0]], ys=[0,A[1],B[1]];
  var dx=cx-(Math.min.apply(null,xs)+Math.max.apply(null,xs))/2, dy=cy-(Math.min.apply(null,ys)+Math.max.apply(null,ys))/2;
  return {O:[O[0]+dx,O[1]+dy], A:[A[0]+dx,A[1]+dy], B:[B[0]+dx,B[1]+dy], ten:ten||null};
}
function veGoc(g){
  var O=g.O, A=g.A, B=g.B, uA=donVi([A[0]-O[0],A[1]-O[1]]), uB=donVi([B[0]-O[0],B[1]-O[1]]), s='', t=g.ten;
  s+='<path d="M'+f1(A[0])+' '+f1(A[1])+' L'+f1(O[0])+' '+f1(O[1])+' L'+f1(B[0])+' '+f1(B[1])+'" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  s+='<circle cx="'+f1(O[0])+'" cy="'+f1(O[1])+'" r="5.5" fill="'+HM.cam+'"/>';
  if(t && t[1]) s+='<circle cx="'+f1(A[0])+'" cy="'+f1(A[1])+'" r="4.5" fill="'+HM.cam+'"/>';
  if(t && t[2]) s+='<circle cx="'+f1(B[0])+'" cy="'+f1(B[1])+'" r="4.5" fill="'+HM.cam+'"/>';
  function chu(P, d, tx){ return '<text x="'+f1(P[0]+d[0]*17)+'" y="'+f1(P[1]+d[1]*17+7)+'" text-anchor="middle" font-size="18" '+HFONT+' fill="currentColor">'+tx+'</text>'; }
  if(t){ var bis=donVi([-(uA[0]+uB[0]), -(uA[1]+uB[1])]);
    if(t[0]) s+=chu(O, bis, t[0]); if(t[1]) s+=chu(A, uA, t[1]); if(t[2]) s+=chu(B, uB, t[2]); }
  return s;
}
/* góc có ê ke giấy áp vào (tam giác vuông xanh nhạt, góc vuông ở đỉnh, một cạnh trùng tia thứ nhất) */
function hinhEke(theta, coEke, rot, ten, sp){
  var O=[130,130], A=diemTu(O,rot,84), B=diemTu(O,rot+theta,88), E1=diemTu(O,rot,62), E2=diemTu(O,rot+90,62), s=svgX(260, 260);
  var u=donVi([E1[0]-O[0],E1[1]-O[1]]), v=donVi([E2[0]-O[0],E2[1]-O[1]]);
  if(coEke) s+='<path d="M'+f1(O[0])+' '+f1(O[1])+' L'+f1(E1[0])+' '+f1(E1[1])+' L'+f1(E2[0])+' '+f1(E2[1])+' Z" fill="'+HM.troi+'" fill-opacity="0.35" stroke="'+HM.troiDam+'" stroke-width="2.5" stroke-linejoin="round"/>'
    +'<path d="M'+f1(O[0]+u[0]*14)+' '+f1(O[1]+u[1]*14)+' L'+f1(O[0]+(u[0]+v[0])*14)+' '+f1(O[1]+(u[1]+v[1])*14)+' L'+f1(O[0]+v[0]*14)+' '+f1(O[1]+v[1]*14)+'" stroke="'+HM.troiDam+'" stroke-width="2" fill="none"/>';
  sp.g={O:O, A:A, B:B, ten:ten};
  return '<div class="flex justify-center my-2">'+s+veGoc(sp.g)+'</svg></div>';
}

/* ---- Đa giác lồi trên lưới (chép từ bài 18) ---- */
function bien(v, k, mir){ var x=v[0], y=v[1], t; for(var i=0;i<k;i++){ t=x; x=-y; y=t; } return [mir ? -x : x, y]; }
function goc3(P, i){ var n=P.length, a=P[(i+n-1)%n], b=P[i], c=P[(i+1)%n]; return gocGiua(b,a,c); }
function demVuong(P){ var k=0, i; for(i=0;i<P.length;i++) if(Math.abs(goc3(P,i)-90)<0.5) k++; return k; }
function daLech(P){ var i; for(i=0;i<P.length;i++){ var d=Math.abs(goc3(P,i)-90); if(d>=0.5 && d<11.99) return false; } return true; }
function convex(P){ var n=P.length, sg=0, i; for(i=0;i<n;i++){ var a=P[i], b=P[(i+1)%n], c=P[(i+2)%n], z=(b[0]-a[0])*(c[1]-b[1])-(b[1]-a[1])*(c[0]-b[0]); if(z===0) return false; if(sg===0) sg=z>0?1:-1; else if((z>0?1:-1)!==sg) return false; } return true; }
function xoay(P, k, mir){ return P.map(function(p){ var v=bien(p,k,mir); return [v[0],v[1]]; }); }
function taoDaGiac(ten){
  var P, t=0;
  do { var w, h, c;
    if(ten==='tgv'){ w=rnd(2,4); h=rnd(2,4); P=xoay([[0,0],[w,0],[0,h]], rnd(0,3), rnd(0,1)); }
    else if(ten==='hcn'){ w=rnd(3,5); h=rnd(1,3); P=xoay([[0,0],[w,0],[w,h],[0,h]], rnd(0,3), rnd(0,1)); }
    else if(ten==='thang'){ w=rnd(3,5); c=rnd(1,w-1); h=rnd(2,3); P=xoay([[0,0],[w,0],[c,h],[0,h]], rnd(0,3), rnd(0,1)); }
    else if(ten==='ngu'){ w=rnd(3,5); h=rnd(3,4); c=rnd(1,2); P=xoay([[0,0],[w,0],[w,h-c],[w-c,h],[0,h]], 0, rnd(0,1)); }
    else { var q=pick([[2,4],[4,4],[4,5]]); P=xoay([[0,0],[q[0],0],[q[0]/2,q[1]]], 0, 0); }
    t++;
  } while(t<100 && !(convex(P) && daLech(P)));
  return P;
}
function hinhPhang(polys, o){
  var cw=o.cw||108, chh=o.ch||108, s=svgX(polys.length*cw, chh);
  polys.forEach(function(P, i){
    var xs=P.map(function(p){ return p[0]; }), ys=P.map(function(p){ return p[1]; }), mnx=Math.min.apply(null,xs), mxx=Math.max.apply(null,xs), mny=Math.min.apply(null,ys), mxy=Math.max.apply(null,ys),
        k=Math.min((cw-26)/(mxx-mnx||1), (chh-26)/(mxy-mny||1), 34), cx=i*cw+cw/2, cy=chh/2;
    var pts=P.map(function(p){ return f1(cx+(p[0]-(mnx+mxx)/2)*k)+','+f1(cy-(p[1]-(mny+mxy)/2)*k); }).join(' ');
    s+='<polygon points="'+pts+'" fill="'+HM.troi+'" fill-opacity="0.25" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>';
  });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}

/* ---- Hình mới 1 (D1, D13): một góc theo mã "X:độ:xoay"; X là tên đỉnh, hai điểm còn lại là hai trong A, B, C ---- */
function gocTuMa(code){ var p=code.split(':'), X=p[0], con=['A','B','C'].filter(function(t){ return t!==X; }); return datGoc(100, 98, +p[2], +p[1], 62, [X, con[0], con[1]]); }
function figGoc(code){ return svgX(200,190,200)+veGoc(gocTuMa(code))+'</svg>'; }

/* ---- Hình mới 2 (D2, D13): đường tròn có chấm I theo mã "kiểu:xoay"; kiểu = tam, l35, l55, tren, ngoai (khoảng cách chấm I tới tâm / bán kính) ---- */
var TY_LE={tam:0, l35:0.35, l55:0.55, tren:1, ngoai:1.45};
function figTron(code){
  var p=code.split(':'), r=TY_LE[p[0]], rot=+p[1], C=[100,100], R=48, I=diemTu(C, rot, R*r), s=svgX(200,200,190), d = r===0 ? [0.7,-0.7] : donVi([I[0]-C[0], I[1]-C[1]]);
  s+='<circle cx="100" cy="100" r="48" fill="'+HM.xanhLa+'" fill-opacity="0.25" stroke="currentColor" stroke-width="3"/>'
    +'<circle cx="'+f1(I[0])+'" cy="'+f1(I[1])+'" r="5.5" fill="'+HM.cam+'"/>'
    +'<text x="'+f1(I[0]+d[0]*17)+'" y="'+f1(I[1]+d[1]*17+7)+'" text-anchor="middle" font-size="21" font-family="Georgia,Times New Roman,serif" font-weight="800" fill="currentColor">I</text>';
  return s+'</svg>';
}
function khoangTam(code){ return TY_LE[code.split(':')[0]]; }

/* ---- Hình mới 3 (D3, D13): tờ giấy hình chữ nhật có hai nếp gấp theo mã "m<độ>:xoay" (hai nếp cắt nhau tạo góc đó) hoặc "song:xoay" (hai nếp song song) ---- */
function catHcn(O, deg, x0, y0, x1, y1){
  var dx=Math.cos(deg*RAD), dy=-Math.sin(deg*RAD), lo=-1e9, hi=1e9;
  if(Math.abs(dx)>1e-9){ var a=(x0-O[0])/dx, b=(x1-O[0])/dx; lo=Math.max(lo, Math.min(a,b)); hi=Math.min(hi, Math.max(a,b)); }
  if(Math.abs(dy)>1e-9){ var c=(y0-O[1])/dy, d=(y1-O[1])/dy; lo=Math.max(lo, Math.min(c,d)); hi=Math.min(hi, Math.max(c,d)); }
  return [[O[0]+lo*dx, O[1]+lo*dy],[O[0]+hi*dx, O[1]+hi*dy]];
}
function gocNep(code){ var p=code.split(':'); return p[0]==='song' ? 0 : +p[0].slice(1); }
function figNep(code){
  var p=code.split(':'), rot=+p[1], song=(p[0]==='song'), th=gocNep(code), O=[100,85], s=svgX(200,170,190);
  s+='<rect x="16" y="14" width="168" height="142" rx="4" fill="'+HM.vang+'" fill-opacity="0.35" stroke="currentColor" stroke-width="2.5"/>';
  var l1=catHcn(O, rot, 16, 14, 184, 156), O2 = song ? diemTu(O, rot+90, 38) : O, l2=catHcn(O2, rot+(song?0:th), 16, 14, 184, 156);
  s+='<path d="M'+f1(l1[0][0])+' '+f1(l1[0][1])+' L'+f1(l1[1][0])+' '+f1(l1[1][1])+'" stroke="'+HM.camDam+'" stroke-width="2.5" stroke-dasharray="6 4" fill="none"/>'
    +'<path d="M'+f1(l2[0][0])+' '+f1(l2[0][1])+' L'+f1(l2[1][0])+' '+f1(l2[1][1])+'" stroke="'+HM.camDam+'" stroke-width="2.5" stroke-dasharray="6 4" fill="none"/>';
  if(!song) s+='<circle cx="100" cy="85" r="5" fill="'+HM.cam+'"/>';
  return s+'</svg>';
}

/* ---- Hình mới 4 (D6, D7): lưới ô vuông có các hình chữ nhật {x,y,w,h} theo ô (y hướng lên) ---- */
function veLuoi(shapes, nx, ny, c, o){
  var pad=8, cap=o.nhan?26:0, gw=nx*c, gh=ny*c, pw=gw+2*pad, s=svgX(shapes.length*pw, gh+2*pad+cap), i, ten=['A','B','C'];
  shapes.forEach(function(sh, idx){ var ox=idx*pw+pad, oy=pad;
    for(i=0;i<=nx;i++) s+='<line x1="'+(ox+i*c)+'" y1="'+oy+'" x2="'+(ox+i*c)+'" y2="'+(oy+gh)+'" stroke="'+HM.day+'" stroke-width="1.5"/>';
    for(i=0;i<=ny;i++) s+='<line x1="'+ox+'" y1="'+(oy+i*c)+'" x2="'+(ox+gw)+'" y2="'+(oy+i*c)+'" stroke="'+HM.day+'" stroke-width="1.5"/>';
    s+='<rect x="'+(ox+sh.x*c)+'" y="'+(oy+(ny-sh.y-sh.h)*c)+'" width="'+(sh.w*c)+'" height="'+(sh.h*c)+'" fill="'+HM.troi+'" fill-opacity="0.3" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>';
    if(o.nhan) s+='<text x="'+(ox+gw/2)+'" y="'+(oy+gh+22)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+ten[idx]+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
/* đặt hình chữ nhật w × h ngẫu nhiên trong lưới nx × ny; trả về {x,y,w,h} */
function datHcn(w, h, nx, ny){ return {x:rnd(0,nx-w), y:rnd(0,ny-h), w:w, h:h}; }

/* ---- Hình mới 5 (D8, D9): hình ghép từ khối rời (tàu hoả, rô-bốt, ngôi nhà). Khối {x,y,w,h} theo đơn vị (y hướng lên);
   khối vuông (w = h) mang data-dem="hv", khối chữ nhật (w khác h) mang data-dem="hcn". Khối đặt sát nhau, vẽ thu vào 1,5 đơn vị để có khe, không chồng nhau. ---- */
function khoiGhep(ten, n, chan){
  var bl, hu, wu, extra='', u;
  if(ten==='tau'){ bl=[{x:0,y:0,w:4,h:2},{x:0,y:2,w:1,h:1},{x:4,y:0,w:2,h:2}]; for(var i=0;i<n;i++) bl.push({x:6+4*i,y:0,w:4,h:2}); hu=4; wu=6+4*n; u = n>=3 ? 15 : 19; }
  else if(ten==='robot'){ bl=[{x:2,y:6,w:2,h:2},{x:1,y:3,w:4,h:3},{x:0,y:3,w:1,h:3},{x:5,y:3,w:1,h:3},{x:1,y:0,w:1,h:3},{x:4,y:0,w:1,h:3}]; if(chan){ bl.push({x:0,y:0,w:1,h:1},{x:5,y:0,w:1,h:1}); } hu=8; wu=6; u=22; }
  else { bl=[{x:0,y:0,w:3,h:2},{x:0,y:2,w:3,h:3},{x:3,y:0,w:2,h:5},{x:5,y:0,w:3,h:2},{x:5,y:2,w:3,h:3},{x:6,y:6,w:1,h:2}]; hu=8; wu=8; u=24; }
  return {bl:bl, hu:hu, wu:wu, u:u, ten:ten};
}
function veKhoi(g){
  var u=g.u, pad=10, W=g.wu*u+2*pad, H=(g.hu+0.9)*u+2*pad, s=svgX(W,H), ten=g.ten;
  function X(x){ return pad+x*u; } function Y(y){ return pad+(g.hu-y)*u; }
  if(ten==='nha') s+='<polygon points="'+X(-0.4)+','+Y(5)+' '+X(8.4)+','+Y(5)+' '+X(4)+','+Y(8)+'" fill="'+HM.do+'" fill-opacity="0.85"/>';
  g.bl.forEach(function(b){ var kind = b.w===b.h ? 'hv' : 'hcn';
    s+='<rect data-dem="'+kind+'" x="'+f1(X(b.x)+1.5)+'" y="'+f1(Y(b.y+b.h)+1.5)+'" width="'+f1(b.w*u-3)+'" height="'+f1(b.h*u-3)+'" rx="3" fill="'+(kind==='hv' ? HM.cam : HM.troi)+'"/>'; });
  if(ten==='tau'){ g.bl.forEach(function(b){ if(b.y===0 && b.w>=2){ var yy=Y(0)+2; s+='<circle cx="'+f1(X(b.x)+0.9*u)+'" cy="'+f1(yy+3)+'" r="'+f1(0.42*u)+'" fill="'+HM.goDam+'"/><circle cx="'+f1(X(b.x+b.w)-0.9*u)+'" cy="'+f1(yy+3)+'" r="'+f1(0.42*u)+'" fill="'+HM.goDam+'"/>'; } });
    s+='<circle cx="'+f1(X(0.9))+'" cy="'+f1(Y(3.7))+'" r="'+f1(0.4*u)+'" fill="'+HM.xam+'"/><circle cx="'+f1(X(1.6))+'" cy="'+f1(Y(4.2))+'" r="'+f1(0.3*u)+'" fill="'+HM.xam+'"/>'; }
  if(ten==='robot'){ s+='<circle cx="'+f1(X(2.6))+'" cy="'+f1(Y(7))+'" r="3" fill="#fff"/><circle cx="'+f1(X(3.4))+'" cy="'+f1(Y(7))+'" r="3" fill="#fff"/>'
    +'<path d="M'+f1(X(2.5))+' '+f1(Y(6.4))+' L'+f1(X(3.5))+' '+f1(Y(6.4))+'" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none"/>'
    +'<path d="M'+f1(X(3))+' '+f1(Y(8)+1)+' L'+f1(X(3))+' '+f1(Y(8)-9)+'" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/><circle cx="'+f1(X(3))+'" cy="'+f1(Y(8)-11)+'" r="3.5" fill="'+HM.do+'"/>'; }
  if(ten==='nha') s+='<circle cx="'+f1(X(3.35))+'" cy="'+f1(Y(2.2))+'" r="3" fill="#fff"/>';
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
function demKhoi(g){ var hv=0, hcn=0; g.bl.forEach(function(b){ if(b.w===b.h) hv++; else hcn++; }); return {hv:hv, hcn:hcn}; }
function khongChong(bl){ var i, j; for(i=0;i<bl.length;i++) for(j=i+1;j<bl.length;j++){ var a=bl[i], b=bl[j]; if(a.x<b.x+b.w && b.x<a.x+a.w && a.y<b.y+b.h && b.y<a.y+a.h) return false; } return true; }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }

/* ---- Hình mới 6 (D10, D11, D12): các đường tròn. Đường tròn {x,y,r} theo đơn vị bất kỳ; vẽ vừa khung 240 × 210 ---- */
function veTrangTri(cs, o){
  o=o||{}; var W=240, H=210, xs=[], ys=[];
  cs.forEach(function(c){ xs.push(c.x-c.r, c.x+c.r); ys.push(c.y-c.r, c.y+c.r); });
  var mnx=Math.min.apply(null,xs), mxx=Math.max.apply(null,xs), mny=Math.min.apply(null,ys), mxy=Math.max.apply(null,ys), k=Math.min((W-40)/(mxx-mnx), (H-40)/(mxy-mny)), s=svgX(W,H), mau=[HM.xanhLa, HM.troi, HM.hong, HM.vang];
  function X(x){ return W/2+(x-(mnx+mxx)/2)*k; } function Y(y){ return H/2-(y-(mny+mxy)/2)*k; }
  cs.forEach(function(c, i){ s+='<circle cx="'+f1(X(c.x))+'" cy="'+f1(Y(c.y))+'" r="'+f1(c.r*k)+'" fill="'+mau[i%4]+'" fill-opacity="0.3" stroke="currentColor" stroke-width="2.5"/>'; });
  if(o.tam) cs.forEach(function(c){ s+='<circle cx="'+f1(X(c.x))+'" cy="'+f1(Y(c.y))+'" r="4.5" fill="'+HM.cam+'"/>'; });
  return {svg:s, X:X, Y:Y, k:k};
}
/* đếm các phần (miền trong hình do các nét tròn chia ra, không đếm miền ngoài) bằng quét điểm + thành phần liên thông; trả về mảng số vòng tròn phủ mỗi phần */
var BO_NHO_PHAN={};
function quetPhan(cs){
  var key=JSON.stringify(cs); if(BO_NHO_PHAN[key]) return BO_NHO_PHAN[key];
  var N=100, xs=[], ys=[], i, j;
  cs.forEach(function(c){ xs.push(c.x-c.r, c.x+c.r); ys.push(c.y-c.r, c.y+c.r); });
  var mnx=Math.min.apply(null,xs), mny=Math.min.apply(null,ys), sp=Math.max(Math.max.apply(null,xs)-mnx, Math.max.apply(null,ys)-mny)/N, mask=new Array(N*N), seen=new Array(N*N), out=[];
  for(i=0;i<N;i++) for(j=0;j<N;j++){ var px=mnx+(i+0.5)*sp, py=mny+(j+0.5)*sp, m=0; cs.forEach(function(c, t){ if((px-c.x)*(px-c.x)+(py-c.y)*(py-c.y)<c.r*c.r) m|=(1<<t); }); mask[i*N+j]=m; }
  for(i=0;i<N*N;i++){ if(!mask[i] || seen[i]) continue; var st=[i], mk=mask[i], dem=0; seen[i]=true;
    while(st.length){ var q=st.pop(), qi=Math.floor(q/N), qj=q%N; dem++; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var a=qi+d[0], b=qj+d[1]; if(a>=0&&a<N&&b>=0&&b<N){ var r=a*N+b; if(!seen[r] && mask[r]===mk){ seen[r]=true; st.push(r); } } }); }
    if(dem>=12){ var pc=0, mm=mk; while(mm){ pc+=mm&1; mm>>=1; } out.push(pc); } }
  BO_NHO_PHAN[key]=out; return out;
}

var BAI = {
 n: 20,
 title: 'Thực Hành Vẽ Góc Vuông, Đường Tròn, Hình Vuông, Hình Chữ Nhật',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa! (Phần vẽ, gấp, tô màu của sách em làm trên giấy ở lớp.)',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'goc-gan-vuong':'Nhầm góc gần vuông là góc vuông', 'nham-dinh-canh':'Nhầm đỉnh với cạnh', 'tam-lech':'Nhầm tâm đường tròn', 'dem-sot-hinh':'Đếm sót hoặc thừa hình',
       'dem-sot-goc':'Đếm sót hoặc thừa góc vuông', 'nham-hv-hcn':'Nhầm hình vuông với hình chữ nhật khi đếm', 'dem-sot-phan':'Đếm sót hoặc thừa phần'},
 muctieu: [
  {id:'MT1', ten:'Nhận ra hình vẽ đúng: góc vuông, đường tròn', muc:['Hình nào vẽ đúng góc vuông; hình nào có tâm I.', 'Góc lệch ít là bẫy; chấm I lệch khỏi giữa hình tròn.', 'Đỉnh sai chỗ; chấm I nằm trên đường tròn (bẫy); Đ hay S.']},
  {id:'MT2', ten:'Ê ke giấy và góc vuông', muc:['Hai nếp gấp tạo góc vuông cho ê ke giấy; ê ke khít góc.', 'Ê ke hở ít; đếm góc vuông của hình đơn giản.', 'Ngũ giác cụt một góc: đếm góc vuông; tam giác cân cao hẹp.']},
  {id:'MT3', ten:'Hình vuông, hình chữ nhật trên lưới', muc:['Chọn hình đúng theo mẫu; đếm ô một cạnh.', 'Chiều dài, chiều rộng khác nhau; hình sai lệch một ô.', 'Hình đặt đứng; chiều dài hơn chiều rộng bao nhiêu ô.']},
  {id:'MT4', ten:'Hình ghép từ hình vuông, hình chữ nhật', muc:['Đếm hình chữ nhật hoặc hình vuông trong tàu hoả hoặc rô-bốt.', 'Đếm trong ngôi nhà; đếm góc vuông của các khối.', 'Hình chữ nhật nhiều hơn hình vuông bao nhiêu.']},
  {id:'MT5', ten:'Vẽ trang trí từ đường tròn', muc:['Tâm đường tròn thứ hai nằm ngay trên nét tròn thứ nhất; đếm phần của một và hai đường tròn.', 'Chọn hình đúng ở bước 2; phần nằm trong đúng một hoặc cả hai đường tròn.', 'Chọn hình đúng ở bước 3; ba đường tròn: đúng một, đúng hai, cả ba.']}
 ],
 topics: [
  /* D1 — Góc vuông vẽ đúng (Tiết 1, HĐ1) */
  {name:'Góc vuông vẽ đúng', sec:'Tiết 1, HĐ1 — Hình nào vẽ đúng góc vuông đỉnh A, cạnh AB, AC?', mt:['MT1'], levels:3,
   muc:['Ba hình, hai hình khác hẳn góc vuông.', 'Có góc gần vuông (lệch 12 độ trở lên).', 'Góc vuông nhưng đỉnh không phải A.'],
   make:function(lv){
    var r=shuffle([10,40,70,100,130,160,190,220,250,280,310,340]).slice(0,3), dung='A:90:'+r[0], ds;
    if(lv<=1) ds=[[dung,''],['A:'+pick([50,60,125,135])+':'+r[1],'lech-nhom'],['A:'+pick([35,45,145])+':'+r[2],'lech-nhom']];
    else if(lv===2){ var g1=pick(ANG_GAN), g2=pick(ANG_GAN.filter(function(a){ return a!==g1; })); ds=[[dung,''],['A:'+g1+':'+r[1],'goc-gan-vuong'],['A:'+g2+':'+r[2],'goc-gan-vuong']]; }
    else ds=[[dung,''],['B:90:'+r[1],'nham-dinh-canh'],['A:'+pick(ANG_GAN)+':'+r[2],'goc-gan-vuong']];
    shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, figFn:figGoc, _dung:dung, q:'<div>Hình nào vẽ <b>đúng</b> góc vuông đỉnh A, cạnh AB, AC?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'goc-gan-vuong':'Góc gần vuông vẫn chưa vuông: dùng ê ke thử, nếu hở thì không phải góc vuông.', 'nham-dinh-canh':'Đề bài cần góc vuông ở đỉnh A, hai cạnh AB và AC. Bé xem chữ ở đỉnh của từng hình.', 'lech-nhom':'Bé dùng ê ke thử góc: khít là góc vuông.'}};
  }, check:function(q){ var dd=q.choices.filter(function(c){ var g=gocTuMa(c); return g.ten[0]==='A' && laVuong(g.O,g.A,g.B); });
    var xa=q.choices.every(function(c){ var g=gocTuMa(c); return laVuong(g.O,g.A,g.B) || xaVuong(g.O,g.A,g.B); });
    return dd.length===1 && dd[0]===q._dung && xa && kiemMCQ(q); }},

  /* D2 — Đường tròn tâm I (Tiết 1, HĐ1) */
  {name:'Đường tròn tâm I', sec:'Tiết 1, HĐ1 — Hình nào vẽ đúng đường tròn tâm I?', mt:['MT1'], levels:3,
   muc:['Chấm I ở giữa; hai hình khác hẳn.', 'Chấm I lệch khỏi giữa hình tròn.', 'Chấm I nằm trên đường tròn (bẫy).'],
   make:function(lv){
    var r=shuffle([20,60,100,140,180,220,260,300,340]).slice(0,3), dung='tam:'+r[0], ds;
    if(lv<=1) ds=[[dung,''],['ngoai:'+r[1],'tam-lech'],['l55:'+r[2],'tam-lech']];
    else if(lv===2) ds=[[dung,''],['l35:'+r[1],'tam-lech'],['l55:'+r[2],'tam-lech']];
    else ds=[[dung,''],['tren:'+r[1],'tam-lech'],['l35:'+r[2],'tam-lech']];
    shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, figFn:function(c){ return figTron(c); }, _dung:dung, q:'<div>Hình nào vẽ <b>đúng</b> đường tròn tâm I?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'tam-lech':'Tâm cách đều mọi điểm trên đường tròn: tâm nằm chính giữa hình tròn, không nằm trên nét tròn.'}};
  }, check:function(q){ var dd=q.choices.filter(function(c){ return khoangTam(c)===0; }), xa=q.choices.every(function(c){ var t=khoangTam(c); return t===0 || t>=0.3; });
    return dd.length===1 && dd[0]===q._dung && xa && kiemMCQ(q); }},

  /* D3 — Gấp ê ke giấy (Tiết 1, HĐ2) */
  {name:'Gấp ê ke giấy', sec:'Tiết 1, HĐ2 — Gấp ê ke giấy', mt:['MT2'], levels:3,
   muc:['Hai nếp gấp tạo góc vuông; hai hình khác hẳn.', 'Nếp thứ hai lệch ít (12 độ trở lên).', 'Hai nếp gấp không cắt nhau (song song) là hình sai.'],
   make:function(lv){
    var r=shuffle([20,30,40,50,60,70]).slice(0,3), dung='m90:'+r[0], ds;
    if(lv<=1) ds=[[dung,''],['m45:'+r[1],'lech-nhom'],['song:'+r[2],'lech-nhom']];
    else if(lv===2){ ds=[[dung,''],['m78:'+r[1],'goc-gan-vuong'],['m102:'+r[2],'goc-gan-vuong']]; }
    else ds=[[dung,''],['m78:'+r[1],'goc-gan-vuong'],['song:'+r[2],'lech-nhom']];
    shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, figFn:figNep, _dung:dung, q:'<div>Gấp tờ giấy làm đôi, rồi gấp đôi tiếp để làm ê ke giấy. Hình nào có hai nếp gấp tạo thành <b>góc vuông</b>?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'goc-gan-vuong':'Hai nếp gần vuông nhưng chưa vuông. Bé dùng ê ke thử: khít mới là góc vuông.', 'lech-nhom':'Muốn có ê ke giấy, hai nếp gấp phải cắt nhau và tạo thành góc vuông.'}};
  }, check:function(q){ var dd=q.choices.filter(function(c){ return gocNep(c)===90; }), xa=q.choices.every(function(c){ var t=gocNep(c); return t===90 || Math.abs(t-90)>=11.99; });
    return dd.length===1 && dd[0]===q._dung && xa && kiemMCQ(q); }},

  /* D4 — Ê ke giấy khít hay hở (Tiết 1, HĐ2a) */
  {name:'Ê ke giấy', sec:'Tiết 1, HĐ2a — Dùng ê ke giấy kiểm tra góc vuông', mt:['MT2'], levels:3,
   muc:['Ê ke khít hai cạnh hoặc hở rõ.', 'Ê ke hở ít (lệch 12 độ trở lên).', 'Không có ê ke, góc gần vuông.'],
   make:function(lv){
    var nm=chuMoi(), O=nm[0], A=nm[1], B=nm[2], co=Math.random()<0.5, theta, coEke = lv<=2, sp={};
    theta = co ? 90 : (lv<=1 ? pick([50,60,125,135,145]) : pick(ANG_GAN));
    var dung = theta===90 ? 'Có' : 'Không', sai={};
    if(dung==='Có') sai['1']='lech-nhom'; else sai['0'] = (lv>=2 ? 'goc-gan-vuong' : 'lech-nhom');
    return {type:'mcq', _sp:sp, _dung:dung, q:hinhEke(theta, coEke, 5*rnd(0,71), [O,A,B], sp)+'<div>'+(coEke ? 'Em đặt ê ke giấy vào góc đỉnh '+O+' như hình. ' : '')+'Góc đỉnh '+O+' có phải là góc vuông không?</div>', choices:['Có','Không'], correct:(dung==='Có'?0:1), sai:sai,
      goiY:{'goc-gan-vuong':'Góc gần vuông vẫn chưa vuông. Nếu ê ke hở một chút thì không phải góc vuông.', 'lech-nhom':'Ê ke khít cả hai cạnh thì là góc vuông. Hở thì không phải.', 'chung':'Bé xem hai cạnh của góc có khít với góc vuông của ê ke không.'}};
  }, check:function(q){ var g=q._sp.g, v=laVuong(g.O,g.A,g.B), x=xaVuong(g.O,g.A,g.B); return (v || x) && q._dung===(v?'Có':'Không') && q.correct===(v?0:1) && q.choices.join()==='Có,Không'; }},

  /* D5 — Ngũ giác cụt một góc: đếm góc vuông (Tiết 1, HĐ2b) */
  {name:'Đếm góc vuông', sec:'Tiết 1, HĐ2b — Hình có mấy góc vuông?', mt:['MT2'], levels:3,
   muc:['Hình chữ nhật, tam giác vuông.', 'Hình thang vuông, tam giác vuông.', 'Ngũ giác cụt một góc; tam giác cân cao hẹp.'],
   make:function(lv){
    var ten = lv<=1 ? pick(['hcn','tgv']) : (lv===2 ? pick(['thang','tgv']) : pick(['ngu','tcan'])), P=taoDaGiac(ten), n=demVuong(P), nv=P.length;
    return {type:'num', _P:P, _e:n, q:hinhPhang([P],{cw:230, ch:180})+'<div>Em dùng ê ke thử từng góc. Hình trên có bao nhiêu <b>góc vuông</b>?</div>', ans:n, unit:'góc',
      sai:nhanSai([[n+1,'dem-sot-goc'],[n-1,'dem-sot-goc'],[n+2,'dem-sot-goc'],[nv,'dem-sot-goc']], n),
      goiY:{'dem-sot-goc':'Bé đi vòng quanh hình, dùng ê ke thử từng đỉnh và đếm các góc khít. Chỗ cụt không phải góc vuông.'}};
  }, check:function(q){ var P=q._P; return convex(P) && daLech(P) && q.ans===demVuong(P) && q.ans===q._e; }},

  /* D6 — Hình vẽ đúng theo mẫu (Tiết 1, HĐ3) */
  {name:'Hình vẽ đúng theo mẫu', sec:'Tiết 1, HĐ3 — Hình vuông, hình chữ nhật trên lưới ô vuông', mt:['MT3'], levels:3,
   muc:['Hình vuông cạnh n ô: ba hình khác hẳn.', 'Hình chữ nhật dài a ô, rộng b ô: có hình lệch một ô.', 'Hình đặt đứng; hình lệch một ô.'],
   make:function(lv){
    var nx=6, ny=6, mau, dungI, texto, ds;
    if(lv<=1){ var n=rnd(2,3); texto='Hình vuông có cạnh '+n+' ô.'; ds=[[n,n],[n+2,1],[n+1,2]]; }
    else if(lv===2){ var a=rnd(4,5), b=rnd(2,3); texto='Hình chữ nhật có chiều dài '+a+' ô, chiều rộng '+b+' ô.'; ds=[[a,b],[a-1,b],[a,b+1]]; }
    else { var a3=rnd(4,5), b3=rnd(2,3); texto='Hình chữ nhật có chiều dài '+a3+' ô, chiều rộng '+b3+' ô.'; ds=[[b3,a3],[a3,b3-1],[a3+1,b3]]; }
    var order=shuffle([0,1,2]), shapes=order.map(function(i){ var d=ds[i], sw=d[0], sh=d[1]; if(lv<=2 && i>0 && Math.random()<0.5){ var t=sw; sw=sh; sh=t; } if(lv<=2 && i===0 && lv===2 && Math.random()<0.5){ var t2=sw; sw=sh; sh=t2; } return datHcn(sw, sh, nx, ny); });
    dungI=order.indexOf(0); var ch=['Hình A','Hình B','Hình C'], sai={}; ch.forEach(function(c,i){ if(i!==dungI) sai[String(i)]='lech-nhom'; });
    return {type:'mcq', _shapes:shapes, _lv:lv, _ds:ds[0], _dung:ch[dungI], q:veLuoi(shapes, nx, ny, 18, {nhan:true})+'<div>'+texto+' Hình nào vẽ <b>đúng</b>?</div>', choices:ch, correct:dungI, sai:sai,
      goiY:{'lech-nhom':'Bé đếm ô theo hàng ngang và theo cột dọc của từng hình, rồi so với đề bài.'}};
  }, check:function(q){ var sh=q._shapes, d=q._ds, ok;
    if(q._lv<=1) ok=sh.filter(function(s){ return s.w===s.h && s.w===d[0]; }); else ok=sh.filter(function(s){ return Math.max(s.w,s.h)===Math.max(d[0],d[1]) && Math.min(s.w,s.h)===Math.min(d[0],d[1]); });
    return ok.length===1 && sh.indexOf(ok[0])===q.correct && sh.every(function(s){ return s.x>=0 && s.y>=0 && s.x+s.w<=6 && s.y+s.h<=6; }) && q.choices[q.correct]===q._dung; }},

  /* D7 — Đếm ô trên lưới (Tiết 1, HĐ3) */
  {name:'Đếm ô trên lưới', sec:'Tiết 1, HĐ3 — Đếm ô: cạnh, chiều dài, chiều rộng', mt:['MT3'], levels:3,
   muc:['Hình vuông: cạnh dài mấy ô.', 'Hình chữ nhật: chiều dài hoặc chiều rộng mấy ô.', 'Chiều dài hơn chiều rộng mấy ô.'],
   make:function(lv){
    var nx=7, ny=6, sh, cau, ans, a, b, dung, sai;
    if(lv<=1){ var n=rnd(2,5); sh=datHcn(n,n,nx,ny); cau='Cạnh của hình vuông dài bao nhiêu ô?'; ans=n; sai=nhanSai([[n+1,'lech-nhom'],[n-1,'lech-nhom'],[4*n,'dem-sot-goc'],[n*n,'dem-sot-hinh']], n); }
    else { a=rnd(4,6); b=rnd(2,3); var dung_ngang=Math.random()<0.5; sh = dung_ngang ? datHcn(a,b,nx,ny) : datHcn(b,a,nx,ny);
      if(lv===2){ var dai=Math.random()<0.5; cau = dai ? 'Chiều dài (cạnh dài) của hình chữ nhật là bao nhiêu ô?' : 'Chiều rộng (cạnh ngắn) của hình chữ nhật là bao nhiêu ô?'; ans = dai ? a : b; sai=nhanSai([[a+b,'lech-nhom'],[a,'lech-nhom'],[b,'lech-nhom'],[a-1,'lech-nhom'],[a+1,'lech-nhom']], ans); }
      else { cau='Chiều dài hơn chiều rộng bao nhiêu ô?'; ans=a-b; sai=nhanSai([[a,'lech-nhom'],[b,'lech-nhom'],[a+b,'cong-thay-nhan'],[a-b+1,'lech-nhom']], ans); } }
    return {type:'num', _sh:sh, _lv:lv, _kieu:cau.charAt(0)==='C' && cau.indexOf('hơn')>0 ? 'hon' : (cau.indexOf('Chiều dài (')===0 ? 'dai' : (cau.indexOf('Chiều rộng')===0 ? 'rong' : 'canh')), _e:ans, q:veLuoi([sh], nx, ny, 26, {})+'<div>'+cau+'</div>', ans:ans, unit:'ô', sai:sai,
      goiY:{'lech-nhom':'Bé đếm ô dọc theo cạnh cần hỏi, từ đỉnh này tới đỉnh kia.', 'cong-thay-nhan':'Muốn biết hơn bao nhiêu thì lấy chiều dài trừ chiều rộng.', 'dem-sot-goc':'Đây là cạnh, không phải chu vi.', 'dem-sot-hinh':'Đây là số ô một cạnh, không phải số ô cả hình.'}};
  }, check:function(q){ var s=q._sh, dai=Math.max(s.w,s.h), rong=Math.min(s.w,s.h), e;
    if(q._kieu==='canh') e=(s.w===s.h)?s.w:-1; else if(q._kieu==='dai') e=dai; else if(q._kieu==='rong') e=rong; else e=dai-rong;
    return e>0 && q.ans===e && q.ans===q._e && (q._lv<=1 ? s.w===s.h : s.w!==s.h); }},

  /* D8 — Đếm hình trong hình ghép (Tiết 2, HĐ1) */
  {name:'Đếm hình ghép', sec:'Tiết 2, HĐ1 — Hình ghép từ hình vuông, hình chữ nhật', mt:['MT4'], levels:3,
   muc:['Tàu hoả, rô-bốt: đếm hình chữ nhật (không kể hình vuông) hoặc hình vuông.', 'Ngôi nhà, rô-bốt, tàu hoả: đếm một loại hình.', 'Hình chữ nhật nhiều hơn hình vuông bao nhiêu.'],
   make:function(lv){
    var ten = lv<=1 ? pick(['tau','robot']) : pick(['tau','robot','nha']), n = ten==='tau' ? rnd(2,3) : 0, chan = ten==='robot' && Math.random()<0.5, g=khoiGhep(ten, n, chan), c=demKhoi(g), tong=c.hv+c.hcn, cau, ans, kieu;
    if(lv<=2){ kieu = (lv<=1 ? (ten==='tau' ? 'hcn' : 'hv') : pick(['hcn','hv'])); if(ten==='tau' && kieu==='hv' && lv<=1) kieu='hcn';
      cau = kieu==='hcn' ? 'Có bao nhiêu <b>hình chữ nhật</b> (không kể hình vuông)?' : 'Có bao nhiêu <b>hình vuông</b>?'; ans = kieu==='hcn' ? c.hcn : c.hv; }
    else { kieu='hon'; cau='Hình chữ nhật (không kể hình vuông) nhiều hơn hình vuông bao nhiêu hình?'; ans=c.hcn-c.hv; }
    var nome = ten==='tau' ? 'Tàu hoả' : (ten==='robot' ? 'Rô-bốt' : 'Ngôi nhà');
    return {type:'num', _g:g, _kieu:kieu, _e:ans, q:veKhoi(g)+'<div>'+nome+' được ghép từ các khối rời. '+cau+'</div>', ans:ans, unit:'hình',
      sai:nhanSai([[ans+1,'dem-sot-hinh'],[ans-1,'dem-sot-hinh'],[tong,'nham-hv-hcn'],[kieu==='hcn'?c.hv:c.hcn,'nham-hv-hcn']], ans),
      goiY:{'dem-sot-hinh':'Bé đếm từng khối một, đánh dấu từng khối đã đếm.', 'nham-hv-hcn':'Hình vuông có bốn cạnh bằng nhau. Hình chữ nhật ở câu này có hai cạnh dài, hai cạnh ngắn. Bé đếm riêng từng loại.'}};
  }, check:function(q){ var g=q._g, c=demKhoi(g), hv=demDem(q.q,'hv'), hcn=demDem(q.q,'hcn');
    if(!(khongChong(g.bl) && hv===c.hv && hcn===c.hcn)) return false;
    var e = q._kieu==='hcn' ? c.hcn : (q._kieu==='hv' ? c.hv : c.hcn-c.hv); return q.ans===e && q.ans===q._e && e>0; }},

  /* D9 — Góc vuông trong hình ghép (không có trong SGK) */
  {name:'Góc vuông hình ghép', sec:'Đếm góc vuông của các khối trong hình ghép', mt:['MT4'], levels:3,
   muc:['Tàu hoả: mỗi khối có 4 góc vuông, tất cả bao nhiêu góc vuông.', 'Rô-bốt: nhiều khối.', 'Ngôi nhà: mái nhà hình tam giác không có góc vuông.'],
   make:function(lv){
    var ten = lv<=1 ? 'tau' : (lv===2 ? 'robot' : 'nha'), n = ten==='tau' ? rnd(2,3) : 0, chan = ten==='robot' && Math.random()<0.5, g=khoiGhep(ten, n, chan), c=demKhoi(g), kh=c.hv+c.hcn, ans=4*kh, nome = ten==='tau' ? 'Tàu hoả' : (ten==='robot' ? 'Rô-bốt' : 'Ngôi nhà');
    return {type:'num', _g:g, _e:ans, q:veKhoi(g)+'<div>'+nome+' được ghép từ các khối rời, mỗi khối là hình vuông hoặc hình chữ nhật có 4 góc vuông.'+(ten==='nha' ? ' Mái nhà là hình tam giác, không có góc vuông.' : '')+' Các khối có tất cả bao nhiêu góc vuông?</div>', ans:ans, unit:'góc',
      sai:nhanSai([[kh,'cong-thay-nhan'],[ans+4,'dem-sot-goc'],[ans-4,'dem-sot-goc'],[4*c.hcn,'dem-sot-goc'],[4*c.hv,'dem-sot-goc']], ans),
      goiY:{'cong-thay-nhan':'Mỗi khối có 4 góc vuông. Bé đếm số khối rồi nhân với 4.', 'dem-sot-goc':'Bé đếm đủ số khối (cả hình vuông và hình chữ nhật), rồi nhân với 4.'}};
  }, check:function(q){ var g=q._g, c=demKhoi(g), kh=demDem(q.q,'hv')+demDem(q.q,'hcn'); return khongChong(g.bl) && kh===c.hv+c.hcn && q.ans===4*kh && q.ans===q._e; }},

  /* D10 — Tâm đường tròn thứ hai (Tiết 2, HĐ2 bước 2) */
  {name:'Tâm đường tròn thứ hai', sec:'Tiết 2, HĐ2 bước 2 — Chọn tâm đường tròn thứ hai', mt:['MT5'], levels:3,
   muc:['Ba điểm: một điểm nằm ngay trên nét tròn.', 'Điểm gần đúng là bẫy.', 'Bốn điểm, có cả điểm trùng tâm đường tròn thứ nhất.'],
   make:function(lv){
    var nm=chuMoi(), tam=nm[0], ts=[nm[1],nm[2],nm[3],nm[4]], R=52, n = lv<=2 ? 3 : 4, ty, a0, a0=rnd(0,89), angs=shuffle(n===3 ? [a0,a0+120,a0+240] : [a0,a0+90,a0+180,a0+270]);
    ty = lv<=1 ? [1,0,1.6] : (lv===2 ? [1,0.65,1.35] : [1,0,0.65,1.35]);
    var pts=[], i, C=[130,130], s=svgX(260,260,260);
    s+='<circle cx="130" cy="130" r="'+(R*1.0)+'" fill="'+HM.xanhLa+'" fill-opacity="0.25" stroke="currentColor" stroke-width="3"/>';
    ty.forEach(function(t, k){ pts.push(t===0 ? [C[0],C[1]] : diemTu(C, angs[k], R*t)); });
    var order=shuffle(ty.map(function(_, k){ return k; })), P=order.map(function(k){ return pts[k]; }), T=order.map(function(k){ return ty[k]; });
    var off=[[16,30],[-16,30],[16,-14],[-16,-14]], best=off[0], bd=-1;
    off.forEach(function(o){ var m=1e9; pts.forEach(function(p, k){ if(ty[k]!==0){ m=Math.min(m, Math.hypot(p[0]-(130+o[0]), p[1]-(130+o[1]))); } }); if(m>bd){ bd=m; best=o; } });
    s+='<circle cx="130" cy="130" r="5.5" fill="'+HM.cam+'"/><text x="'+(130+best[0])+'" y="'+(130+best[1])+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+tam+'</text>';
    P.forEach(function(p, k){ if(T[k]===0) return; var d = T[k]<1 ? donVi([C[0]-p[0], C[1]-p[1]]) : donVi([p[0]-C[0], p[1]-C[1]]); s+='<circle cx="'+f1(p[0])+'" cy="'+f1(p[1])+'" r="5" fill="'+HM.cam+'"/><text x="'+f1(p[0]+d[0]*17)+'" y="'+f1(p[1]+d[1]*17+7)+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+ts[k]+'</text>'; });
    var cand=[], dungT=ts[T.indexOf(1)], sai={}; for(i=0;i<P.length;i++) if(T[i]!==0) cand.push(i);
    var ch=cand.map(function(k){ return ts[k]; }); if(T.indexOf(0)>=0){ ch.push(tam); }
    ch=shuffle(ch); ch.forEach(function(c,j){ if(c!==dungT) sai[String(j)]='tam-lech'; });
    return {type:'mcq', _C:C, _P:P, _T:T, _ts:ts, _tam:tam, _dung:dungT, _R:R, q:'<div class="flex justify-center my-2">'+s+'</svg></div><div>Vẽ đường tròn thứ hai: tâm nằm ngay trên nét tròn thứ nhất. Chọn điểm làm tâm đường tròn thứ hai.</div>', choices:ch, correct:ch.indexOf(dungT), sai:sai,
      goiY:{'tam-lech':'Tâm đường tròn thứ hai phải nằm ngay trên nét tròn thứ nhất: không ở giữa, không bên trong, không bên ngoài nét tròn.'}};
  }, check:function(q){ var C=q._C, R=q._R, dd=[], i;
    for(i=0;i<q._P.length;i++){ var d=Math.hypot(q._P[i][0]-C[0], q._P[i][1]-C[1]); if(Math.abs(d-R)<0.6) dd.push(i); else if(Math.abs(d-R)<0.25*R) return false; }
    return dd.length===1 && q._T[dd[0]]===1 && q._ts[dd[0]]===q._dung && kiemMCQ(q); }},

  /* D11 — Hình đúng ở bước 2, bước 3 (Tiết 2, HĐ2) */
  {name:'Hình đúng ở bước 2, bước 3', sec:'Tiết 2, HĐ2 — Hình nào vẽ đúng ở bước 2, bước 3?', mt:['MT5'], levels:3,
   muc:['Bước 2: tâm nằm ngay trên nét tròn thứ nhất; hai hình khác hẳn.', 'Bước 2: có hình gần đúng.', 'Bước 3: đường tròn thứ ba có tâm nằm ngay trên nét tròn thứ nhất.'],
   make:function(lv){
    var r=shuffle([0,1,2]), dung, ds;
    function ma(b, kieu, t){ return b+':'+kieu+':'+t; }
    if(lv<=1){ dung=ma('b2','tren',r[0]); ds=[[dung,''],[ma('b2','trong',r[1]),'tam-lech'],[ma('b2','ngoai',r[2]),'tam-lech']]; }
    else if(lv===2){ dung=ma('b2','tren',r[0]); ds=[[dung,''],[ma('b2','t75',r[1]),'tam-lech'],[ma('b2','t130',r[2]),'tam-lech']]; }
    else { dung=ma('b3','tren',r[0]); ds=[[dung,''],[ma('b3','trong',r[1]),'tam-lech'],[ma('b3','ngoai',r[2]),'tam-lech']]; }
    shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]='tam-lech'; });
    var buoc = lv>=3 ? 'Bước 3: vẽ đường tròn thứ ba, tâm nằm ngay trên nét tròn thứ nhất.' : 'Bước 2: vẽ đường tròn thứ hai, tâm nằm ngay trên nét tròn thứ nhất.';
    return {type:'mcq', cot:1, figFn:figBuoc, _dung:dung, q:'<div>'+buoc+' Hình nào vẽ <b>đúng</b>?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'tam-lech':'Bé nhìn chấm tâm của đường tròn mới: nó phải nằm ngay trên nét tròn thứ nhất.'}};
  }, check:function(q){ var dd=q.choices.filter(function(c){ return tyLeBuoc(c)===1; }), xa=q.choices.every(function(c){ var t=tyLeBuoc(c); return t===1 || Math.abs(t-1)>=0.25; });
    return dd.length===1 && dd[0]===q._dung && xa && kiemMCQ(q); }},

  /* D12 — Đếm số phần (Tiết 2, HĐ2: tô màu → đếm phần) */
  {name:'Đếm số phần', sec:'Tiết 2, HĐ2 — Hình có bao nhiêu phần để tô màu?', mt:['MT5'], levels:3,
   muc:['Một, hai đường tròn: đếm phần.', 'Hai đường tròn cắt nhau: phần nằm trong đúng một hoặc cả hai đường tròn.', 'Ba đường tròn: phần nằm trong đúng một, đúng hai hoặc cả ba đường tròn.'],
   make:function(lv){
    var r=rnd(1,1), cs, cau, ans, hinh;
    if(lv<=1){ var kieu=pick(['mot','cat','roi']);
      cs = kieu==='mot' ? [{x:0,y:0,r:1}] : (kieu==='cat' ? [{x:-0.5,y:0,r:1},{x:0.5,y:0,r:1}] : [{x:-1.3,y:0,r:1},{x:1.3,y:0,r:1}]);
      ans = kieu==='mot' ? 1 : (kieu==='cat' ? 3 : 2); cau='Hình có bao nhiêu <b>phần</b> (miền bên trong do các nét tròn chia ra, không đếm phần bên ngoài)?'; }
    else if(lv===2){ cs=[{x:-0.5,y:0,r:1},{x:0.5,y:0,r:1}]; var m1=Math.random()<0.5; ans = m1 ? 2 : 1;
      cau = m1 ? 'Có bao nhiêu phần nằm trong <b>đúng một</b> đường tròn?' : 'Có bao nhiêu phần nằm trong <b>cả hai</b> đường tròn?'; }
    else { cs=[{x:0,y:0,r:1},{x:1,y:0,r:1},{x:0.5,y:0.866,r:1}]; var k=pick([1,2,3]); ans = k===3 ? 1 : 3;
      cau = k===1 ? 'Có bao nhiêu phần nằm trong <b>đúng một</b> đường tròn?' : (k===2 ? 'Có bao nhiêu phần nằm trong <b>đúng hai</b> đường tròn?' : 'Có bao nhiêu phần nằm trong <b>cả ba</b> đường tròn?'); var kk=k; }
    var v=veTrangTri(cs,{tam:(lv>=2)}); hinh='<div class="flex justify-center my-2">'+v.svg+'</svg></div>';
    var tong = lv<=1 ? ans : (lv===2 ? 3 : 7);
    return {type:'num', _cs:cs, _lv:lv, _k:(lv>=3 ? kk : (lv===2 ? (ans===2?1:2) : 0)), _e:ans, q:hinh+'<div>'+cau+'</div>', ans:ans, unit:'phần',
      sai:nhanSai([[tong,'dem-sot-phan'],[ans+1,'dem-sot-phan'],[ans-1,'dem-sot-phan'],[ans+2,'dem-sot-phan']], ans),
      goiY:{'dem-sot-phan':'Bé đếm cả phần chung của các đường tròn. Mỗi miền bị các nét tròn ngăn ra là một phần.'}};
  }, check:function(q){ var pc=quetPhan(q._cs), e;
    if(q._lv<=1) e=pc.length; else if(q._lv===2) e = q._k===1 ? pc.filter(function(c){ return c===1; }).length : pc.filter(function(c){ return c===2; }).length; else e=pc.filter(function(c){ return c===q._k; }).length;
    if(q._lv>=3 && pc.length!==7) return false; if(q._lv===2 && pc.length!==3) return false;
    return q.ans===e && q.ans===q._e && e>=1; }},

  /* D13 — Đúng / Sai tìm lỗi (không có trong SGK). MT1: góc vuông, đường tròn · MT2: ê ke giấy, nếp gấp */
  {name:'Đúng / Sai', sec:'Tìm lỗi — Bạn nói đúng hay sai?', mt:['MT1','MT2'], levels:3,
   muc:['Mệnh đề đơn về hình vẽ.', 'Mệnh đề về chấm I nằm trên đường tròn; nếp gấp lệch.', 'Bạn An nói; chọn lý do vì sao sai.'],
   make:function(lv, mt){
    var m = mt || pick(['MT1','MT2']), sai={}, dung, cau, hinh, code, ch, lyDo, laDung;
    if(m==='MT1'){
      if(Math.random()<0.5){   /* góc vuông đỉnh A */
        var rot=5*rnd(0,71); laDung = lv>=3 ? false : Math.random()<0.5;
        code = laDung ? 'A:90:'+rot : (lv<=1 ? 'A:'+pick(ANG_XA)+':'+rot : (Math.random()<0.5 ? 'B:90:'+rot : 'A:'+pick(ANG_GAN)+':'+rot));
        hinh='<div class="flex justify-center my-1">'+figGoc(code)+'</div>'; cau='Hình trên vẽ đúng góc vuông đỉnh A, cạnh AB, AC.';
        var gc=gocTuMa(code); laDung = gc.ten[0]==='A' && laVuong(gc.O,gc.A,gc.B); dung=laDung?'Đ':'S'; if(!laDung) sai['0'] = gc.ten[0]!=='A' ? 'nham-dinh-canh' : (lv>=2 ? 'goc-gan-vuong' : 'lech-nhom');
        if(lv>=3 && !laDung){ lyDo = gc.ten[0]!=='A' ? 'Sai, vì góc vuông này có đỉnh là '+gc.ten[0]+', không phải đỉnh A.' : 'Sai, vì khi đặt ê ke vào thì hai cạnh không khít: góc này chưa vuông.';
          ch=shuffle([lyDo, gc.ten[0]!=='A' ? 'Sai, vì góc này không phải góc vuông.' : 'Sai, vì hai cạnh phải dài bằng nhau.', 'Đúng, vì trông giống góc vuông.']); sai={}; ch.forEach(function(c,i){ if(c!==lyDo) sai[String(i)] = c.indexOf('Đúng')===0 ? 'goc-gan-vuong' : 'nham-dinh-canh'; });
          return {type:'mcq', cot:1, _m:'MT1', mt:'MT1', _lv:3, _code:code, _kieu:'goc', _dung:lyDo, q:hinh+'<div class="text-lg font-bold text-slate-700 my-1">Bạn An nói: "'+cau+'"</div><div>Bạn An nói sai. Vì sao?</div>', choices:ch, correct:ch.indexOf(lyDo), sai:sai,
            goiY:{'goc-gan-vuong':'Góc gần vuông vẫn chưa vuông: ê ke còn hở.', 'nham-dinh-canh':'Bé xem chữ ở đỉnh của góc và dùng ê ke thử góc.'}}; }
        return {type:'mcq', figFn:dsBtn20, _m:'MT1', mt:'MT1', _lv:lv, _code:code, _kieu:'goc', _dung:dung, q:hinh+'<div class="text-xl font-extrabold text-orange-700 my-1">'+cau+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(laDung?0:1), sai:sai,
          goiY:{'goc-gan-vuong':'Góc gần vuông vẫn chưa vuông. Bé dùng ê ke thử.', 'nham-dinh-canh':'Đề nói góc vuông ở đỉnh A. Bé xem chữ ở đỉnh của hình.', 'lech-nhom':'Góc vuông khít với góc của ê ke.', 'chung':'Bé dùng ê ke thử góc và xem chữ ở đỉnh.'}}; }
      /* đường tròn tâm I */
      var rot2=5*rnd(0,71); laDung = lv>=3 ? false : Math.random()<0.5; code = laDung ? 'tam:'+rot2 : (lv<=1 ? 'ngoai:'+rot2 : (lv===2 ? 'l55:'+rot2 : 'tren:'+rot2));
      hinh='<div class="flex justify-center my-1">'+figTron(code)+'</div>'; cau = lv>=2 ? 'Chấm I là tâm của đường tròn.' : 'Chấm I là tâm của đường tròn.'; laDung = khoangTam(code)===0; dung=laDung?'Đ':'S'; if(!laDung) sai['0']='tam-lech';
      if(lv>=3 && !laDung){ lyDo='Sai, vì I nằm ngay trên nét tròn, không nằm chính giữa hình tròn.'; ch=shuffle([lyDo, 'Đúng, vì đường tròn đi qua I.', 'Sai, vì hình này không phải đường tròn.']); sai={}; ch.forEach(function(c,i){ if(c!==lyDo) sai[String(i)]='tam-lech'; });
        return {type:'mcq', cot:1, _m:'MT1', mt:'MT1', _lv:3, _code:code, _kieu:'tron', _dung:lyDo, q:hinh+'<div class="text-lg font-bold text-slate-700 my-1">Bạn An nói: "'+cau+'"</div><div>Bạn An nói sai. Vì sao?</div>', choices:ch, correct:ch.indexOf(lyDo), sai:sai,
          goiY:{'tam-lech':'Tâm nằm chính giữa hình tròn, cách đều mọi điểm trên nét tròn.'}}; }
      return {type:'mcq', figFn:dsBtn20, _m:'MT1', mt:'MT1', _lv:lv, _code:code, _kieu:'tron', _dung:dung, q:hinh+'<div class="text-xl font-extrabold text-orange-700 my-1">'+cau+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(laDung?0:1), sai:sai,
        goiY:{'tam-lech':'Tâm nằm chính giữa hình tròn, cách đều mọi điểm trên nét tròn.', 'chung':'Bé xem chấm I có nằm chính giữa hình tròn không.'}}; }
    /* MT2: nếp gấp, ê ke giấy */
    var rot3=pick([20,30,40,50,60,70]); laDung = lv>=3 ? false : Math.random()<0.5; code = laDung ? 'm90:'+rot3 : (lv<=1 ? 'm45:'+rot3 : (lv===2 ? pick(['m78:'+rot3,'m102:'+rot3]) : (Math.random()<0.5 ? 'song:'+rot3 : 'm78:'+rot3)));
    hinh='<div class="flex justify-center my-1">'+figNep(code)+'</div>'; cau='Hai nếp gấp tạo thành góc vuông, gấp được ê ke giấy.'; laDung = gocNep(code)===90; dung=laDung?'Đ':'S'; if(!laDung) sai['0'] = lv>=2 ? 'goc-gan-vuong' : 'lech-nhom';
    if(lv>=3 && !laDung){ lyDo = gocNep(code)===0 ? 'Sai, vì hai nếp gấp song song, không cắt nhau.' : 'Sai, vì hai nếp gấp cắt nhau nhưng chưa tạo góc vuông (ê ke còn hở).';
      ch=shuffle([lyDo, 'Đúng, vì hai nếp gấp đều thẳng.', gocNep(code)===0 ? 'Sai, vì tờ giấy không phải hình chữ nhật.' : 'Sai, vì hai nếp gấp song song.']); sai={}; ch.forEach(function(c,i){ if(c!==lyDo) sai[String(i)] = c.indexOf('Đúng')===0 ? 'goc-gan-vuong' : 'lech-nhom'; });
      return {type:'mcq', cot:1, _m:'MT2', mt:'MT2', _lv:3, _code:code, _kieu:'nep', _dung:lyDo, q:hinh+'<div class="text-lg font-bold text-slate-700 my-1">Bạn An nói: "'+cau+'"</div><div>Bạn An nói sai. Vì sao?</div>', choices:ch, correct:ch.indexOf(lyDo), sai:sai,
        goiY:{'goc-gan-vuong':'Hai nếp thẳng chưa đủ: chúng phải cắt nhau và tạo thành góc vuông.', 'lech-nhom':'Bé xem hai nếp gấp có cắt nhau không và có tạo góc vuông không.'}}; }
    return {type:'mcq', figFn:dsBtn20, _m:'MT2', mt:'MT2', _lv:lv, _code:code, _kieu:'nep', _dung:dung, q:hinh+'<div class="text-xl font-extrabold text-orange-700 my-1">'+cau+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(laDung?0:1), sai:sai,
      goiY:{'goc-gan-vuong':'Hai nếp gần vuông nhưng chưa vuông. Bé dùng ê ke thử.', 'lech-nhom':'Hai nếp gấp phải cắt nhau và tạo thành góc vuông.', 'chung':'Bé xem hai nếp gấp có tạo thành góc vuông không.'}};
  }, check:function(q){ var t;
    if(q._kieu==='goc'){ var g=gocTuMa(q._code), v=g.ten[0]==='A' && laVuong(g.O,g.A,g.B), ok=laVuong(g.O,g.A,g.B) || xaVuong(g.O,g.A,g.B); if(!ok) return false; t=v; }
    else if(q._kieu==='tron'){ var k=khoangTam(q._code); if(!(k===0 || k>=0.3)) return false; t=(k===0); }
    else { var a=gocNep(q._code); if(!(a===90 || Math.abs(a-90)>=11.99)) return false; t=(a===90); }
    if(q._lv>=3) return !t && kiemMCQ(q);
    return q.choices.join()==='Đ,S' && (q._dung==='Đ')===t && q.correct===(t?0:1); }}
 ]
};

/* ---- Hình mới 7 (D11): hình bước 2, bước 3 theo mã "b2|b3:kiểu:xoay"; kiểu = tren, trong, ngoai, t75, t130 (khoảng cách tâm / bán kính) ---- */
var TY_LE_BUOC={tren:1, trong:0.5, ngoai:1.6, t75:0.75, t130:1.3};
function tyLeBuoc(code){ return TY_LE_BUOC[code.split(':')[1]]; }
function figBuoc(code){
  var p=code.split(':'), b=p[0], t=TY_LE_BUOC[p[1]], rot=+p[2]*40+25, cs=[{x:0,y:0,r:1}], C2=diemTu([0,0], rot, t);
  cs.push({x:C2[0], y:C2[1], r:1});
  if(b==='b3'){ var C3=diemTu([0,0], rot+120, t); cs.push({x:C3[0], y:C3[1], r:1}); }
  var v=veTrangTri(cs,{tam:true});
  return v.svg+'</svg>';
}
