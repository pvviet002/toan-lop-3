/* bai-19.js — Bài 19: Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-19.md) và chỉnh sửa của thầy trên PR:
   5 MỤC TIÊU (muctieu) × 13 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Hai phần ghi trong sec: "Phần 1 — Tam giác, tứ giác" và "Phần 2 — Hình chữ nhật, hình vuông".
   Thao tác của sách đổi thành chọn một / đếm / điền số: chọn nhiều hình → đếm hoặc chọn một; cắt giấy → chọn đoạn cắt; đo → đếm ô; que tính → trắc nghiệm, đếm số cách.
   Mọi loại hình, số đo, số hình do mã tính từ toạ độ; check() tính lại, không tin nhãn. Không số thập phân.
   Không hỏi đếm tứ giác trong hình có điểm nằm giữa một cạnh (hình thang ABED có C trên DE chỉ đếm tam giác). Câu đếm hoặc chọn hình chữ nhật không để hình vuông chung trong hình.
   Hình mới viết ngay trong file này (không sửa figures.js): hinhDaGiac, veTamTu, hinhGhep, giayCat, luoiHinh, giayRach, hcnNhan, duongVong, queTinh.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn19(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
var CHU=['A','B','C','D','E','G','H','K','M','N','P','Q'];
function chuMoi(){ return shuffle(CHU.slice()); }
function f1(v){ return v.toFixed(1); }
function donVi(u){ var l=Math.hypot(u[0],u[1])||1; return [u[0]/l, u[1]/l]; }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }

/* ---- Hình học trên toạ độ ---- */
function cross3(a, b, c){ return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]); }
function gocGiua(O, A, B){ var u=[A[0]-O[0], A[1]-O[1]], v=[B[0]-O[0], B[1]-O[1]], c=(u[0]*v[0]+u[1]*v[1])/(Math.hypot(u[0],u[1])*Math.hypot(v[0],v[1])); return Math.acos(Math.max(-1, Math.min(1, c)))*180/Math.PI; }
/* phân loại tứ giác theo toạ độ bốn đỉnh liên tiếp: hv, hcn, thoi, bh (bình hành), thang, khac */
function phanLoai4(P){
  var s=[0,1,2,3].map(function(i){ return [P[(i+1)%4][0]-P[i][0], P[(i+1)%4][1]-P[i][1]]; }), len=s.map(function(v){ return Math.round(Math.hypot(v[0],v[1])*1e6); });
  var vuong=[0,1,2,3].every(function(i){ var a=s[i], b=s[(i+1)%4]; return Math.abs(a[0]*b[0]+a[1]*b[1])<1e-6; }), bang=len.every(function(l){ return l===len[0]; });
  if(vuong) return bang ? 'hv' : 'hcn';
  var p1=Math.abs(s[0][0]*s[2][1]-s[0][1]*s[2][0])<1e-6, p2=Math.abs(s[1][0]*s[3][1]-s[1][1]*s[3][0])<1e-6;
  if(p1 && p2) return bang ? 'thoi' : 'bh';
  return (p1 || p2) ? 'thang' : 'khac';
}
/* tam giác, tứ giác trong hình ghép: pts = {tên:[x,y]}, segs = các đoạn tối đa theo thứ tự các điểm trên đoạn, ví dụ ['D','C','E'] */
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

/* ---- Hình mới 1: đa giác có tên đỉnh. poly = các điểm (y hướng lên), ten = tên đỉnh; o = {cw, ch, cheo: [[i,j]] nét đứt} ---- */
function hinhDaGiac(poly, ten, o){
  o=o||{}; var W=o.cw||260, H=o.ch||200, xs=poly.map(function(p){ return p[0]; }), ys=poly.map(function(p){ return p[1]; }), mnx=Math.min.apply(null,xs), mxx=Math.max.apply(null,xs), mny=Math.min.apply(null,ys), mxy=Math.max.apply(null,ys);
  var k=Math.min((W-70)/(mxx-mnx||1), (H-70)/(mxy-mny||1), 44), cx=W/2, cy=H/2, s=svgX(W,H), cen=[0,0];
  function X(p){ return cx+(p[0]-(mnx+mxx)/2)*k; } function Y(p){ return cy-(p[1]-(mny+mxy)/2)*k; }
  poly.forEach(function(p){ cen[0]+=p[0]/poly.length; cen[1]+=p[1]/poly.length; });
  s+='<polygon points="'+poly.map(function(p){ return f1(X(p))+','+f1(Y(p)); }).join(' ')+'" fill="'+HM.troi+'" fill-opacity="0.25" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>';
  (o.cheo||[]).forEach(function(c){ var a=poly[c[0]], b=poly[c[1]]; s+='<path d="M'+f1(X(a))+' '+f1(Y(a))+' L'+f1(X(b))+' '+f1(Y(b))+'" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4" fill="none" stroke-opacity="0.7"/>'; });
  poly.forEach(function(p, i){ var d=donVi([X(p)-X(cen), Y(p)-Y(cen)]);
    s+='<circle cx="'+f1(X(p))+'" cy="'+f1(Y(p))+'" r="5" fill="'+HM.cam+'"/><text x="'+f1(X(p)+d[0]*17)+'" y="'+f1(Y(p)+d[1]*17+7)+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+ten[i]+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
var MAU_TG=[[[0,0],[5,0],[2,4]],[[0,0],[4,0],[4,3]],[[0,0],[5,0],[3,3]],[[0,0],[4,0],[1,3]]];
var MAU_TU=[[[0,0],[5,0],[4,3],[1,3]],[[0,0],[5,0],[5,3],[0,3]],[[0,0],[5,0],[4,3],[0,3]],[[1,0],[5,0],[4,3],[0,3]]];
function lat(P, mir){ return P.map(function(p){ return [mir ? -p[0] : p[0], p[1]]; }); }
var MAU_NGU=[[3,5],[0,3],[1,0],[5,0],[6,3]];

/* ---- Hình mới 2 (D3): các hình khép kín hoặc hở; spec = {loai: tg | tu | hoTg | hoTu | congTg}; ô 104 × 112 có nhãn A, B, C ---- */
function veTamTu(specs){
  var cw=106, chh=112, s=svgX(specs.length*cw, chh), ten=['A','B','C'];
  specs.forEach(function(sp, idx){
    var P = sp.loai==='tu' || sp.loai==='hoTu' ? lat(MAU_TU[sp.mau%MAU_TU.length], sp.mir) : lat(MAU_TG[sp.mau%MAU_TG.length], sp.mir), xs=P.map(function(p){ return p[0]; }), ys=P.map(function(p){ return p[1]; }),
        mnx=Math.min.apply(null,xs), mxx=Math.max.apply(null,xs), mny=Math.min.apply(null,ys), mxy=Math.max.apply(null,ys), k=Math.min(70/(mxx-mnx||1), 62/(mxy-mny||1)), ox=idx*cw+cw/2, oy=40;
    function X(p){ return ox+(p[0]-(mnx+mxx)/2)*k; } function Y(p){ return oy+(mxy-p[1])*k-(mxy-mny)*k/2+6; }
    var n=P.length, d='M'+f1(X(P[0]))+' '+f1(Y(P[0])), i;
    for(i=1;i<=n;i++){ var a=P[i-1], b=P[i%n], ultima=(i===n);
      if(sp.loai.indexOf('ho')===0 && ultima){ var t=0.62; d+=' L'+f1(X(a)+(X(b)-X(a))*t)+' '+f1(Y(a)+(Y(b)-Y(a))*t); }
      else if(sp.loai==='congTg' && ultima){ var mx=(X(a)+X(b))/2, my=(Y(a)+Y(b))/2, nx=-(Y(b)-Y(a)), ny=(X(b)-X(a)), l=Math.hypot(nx,ny)||1; d+=' Q'+f1(mx+nx/l*16)+' '+f1(my+ny/l*16)+' '+f1(X(b))+' '+f1(Y(b)); }
      else d+=' L'+f1(X(b))+' '+f1(Y(b)); }
    s+='<path d="'+d+'" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="'+(sp.loai.indexOf('ho')===0 ? 'none' : HM.troi)+'" fill-opacity="0.25"/>'
      +'<text x="'+(ox)+'" y="'+(chh-10)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+ten[idx]+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
/* kết luận từ spec: số cạnh của hình khép kín thẳng, hoặc 0 nếu không phải hình khép kín thẳng */
function soCanhTG(sp){ if(sp.loai==='tg') return 3; if(sp.loai==='tu') return 4; return 0; }

/* ---- Hình mới 3 (D4): hình ghép từ các đoạn thẳng. spec = {pts:{tên:[x,y]}, segs:[[tên…]]} (mỗi phần tử segs là một đoạn tối đa, liệt kê các điểm theo thứ tự trên đoạn) ---- */
function hinhGhep(sp){
  var W=260, H=200, ten=Object.keys(sp.pts), xs=ten.map(function(t){ return sp.pts[t][0]; }), ys=ten.map(function(t){ return sp.pts[t][1]; }), mnx=Math.min.apply(null,xs), mxx=Math.max.apply(null,xs), mny=Math.min.apply(null,ys), mxy=Math.max.apply(null,ys);
  var k=Math.min((W-80)/(mxx-mnx||1), (H-80)/(mxy-mny||1), 44), s=svgX(W,H), cen=[(mnx+mxx)/2, (mny+mxy)/2];
  function X(p){ return W/2+(p[0]-cen[0])*k; } function Y(p){ return H/2-(p[1]-cen[1])*k; }
  sp.segs.forEach(function(sg){ var a=sp.pts[sg[0]], b=sp.pts[sg[sg.length-1]]; s+='<path d="M'+f1(X(a))+' '+f1(Y(a))+' L'+f1(X(b))+' '+f1(Y(b))+'" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>'; });
  ten.forEach(function(t){ var p=sp.pts[t], d=donVi([p[0]-cen[0], -(p[1]-cen[1])]);
    s+='<circle cx="'+f1(X(p))+'" cy="'+f1(Y(p))+'" r="5" fill="'+HM.cam+'"/><text x="'+f1(X(p)+d[0]*17)+'" y="'+f1(Y(p)+d[1]*17+7)+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+t+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
/* đặt tên điểm cho một mẫu: mau = {pts:{x:[..]}, segs:[[..]]} dùng các khoá tạm; ten = bảng đổi tên */
function doiTen(mau, bang){ var pts={}, segs; Object.keys(mau.pts).forEach(function(t){ pts[bang[t]]=mau.pts[t]; }); segs=mau.segs.map(function(sg){ return sg.map(function(t){ return bang[t]; }); }); return {pts:pts, segs:segs}; }
var MAU_G1={pts:{a:[2,4],b:[0,0],c:[5,0],d:[2,0]}, segs:[['a','b'],['b','d','c'],['c','a'],['a','d']]};
var MAU_G2={pts:{a:[1,3],b:[5,3],e:[6,0],d:[0,0],c:[3,0]}, segs:[['a','b'],['b','e'],['d','c','e'],['d','a'],['a','c'],['b','c']]};
var MAU_G3={pts:{a:[3,5],b:[0,3],c:[1,0],d:[5,0],e:[6,3]}, segs:[['a','b'],['b','c'],['c','d'],['d','e'],['e','a'],['a','c'],['a','d']]};

/* ---- Hình mới 4 (D5): tờ giấy hình chữ nhật ABCD có điểm M trên AB, N trên DC; cat = cặp tên điểm vẽ nét đứt (hoặc null) ---- */
function toaDoGiay(m, n, w, h){ return {A:[0,h], M:[m,h], B:[w,h], C:[w,0], N:[n,0], D:[0,0]}; }
function giayCat(m, n, w, h, cat, tenM, tenN){
  var P=toaDoGiay(m,n,w,h), W=280, H=170, k=Math.min(220/w, 100/h), ox=(W-w*k)/2, oy=34, s=svgX(W,H);
  function X(p){ return ox+p[0]*k; } function Y(p){ return oy+(h-p[1])*k; }
  s+='<rect x="'+f1(ox)+'" y="'+f1(oy)+'" width="'+f1(w*k)+'" height="'+f1(h*k)+'" fill="'+HM.vang+'" fill-opacity="0.35" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>';
  if(cat){ var a=P[cat[0]], b=P[cat[1]]; s+='<path d="M'+f1(X(a))+' '+f1(Y(a))+' L'+f1(X(b))+' '+f1(Y(b))+'" stroke="'+HM.camDam+'" stroke-width="3" stroke-dasharray="7 5" fill="none"/>'; }
  var nhan={A:['A',-1,-1],B:['B',1,-1],C:['C',1,1],D:['D',-1,1],M:[tenM,0,-1],N:[tenN,0,1]};
  Object.keys(P).forEach(function(t){ var p=P[t], nh=nhan[t];
    s+='<circle cx="'+f1(X(p))+'" cy="'+f1(Y(p))+'" r="5" fill="'+HM.cam+'"/><text x="'+f1(X(p)+nh[1]*16)+'" y="'+f1(Y(p)+nh[2]*17+7)+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+nh[0]+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
/* tách tờ giấy theo đoạn nối hai điểm P, Q trên biên; trả về [số cạnh phần 1, số cạnh phần 2] (bỏ điểm thẳng hàng) */
function catGiay(P, p, q){
  var cyc=['A','M','B','C','N','D'], i=cyc.indexOf(p), j=cyc.indexOf(q);
  function phan(a, b){ var o=[], t=a; while(true){ o.push(cyc[t]); if(t===b) break; t=(t+1)%cyc.length; } return o; }
  function demCanh(o){ var d=0, n=o.length, t; for(t=0;t<n;t++){ if(Math.abs(cross3(P[o[(t+n-1)%n]],P[o[t]],P[o[(t+1)%n]]))>1e-9) d++; } return d; }
  return [demCanh(phan(i,j)), demCanh(phan(j,i))];
}
function moTaCat(c){ return c[0]===3 && c[1]===3 ? 'Hai tam giác' : (c[0]===4 && c[1]===4 ? 'Hai tứ giác' : ((c[0]===3 && c[1]===4) || (c[0]===4 && c[1]===3) ? 'Một tam giác và một tứ giác' : '')); }

/* ---- Hình mới 5 (D7, D8): lưới ô vuông, mỗi ô một lưới; mỗi hình là đa giác (toạ độ ô, y hướng lên); nhan = có chữ A, B, C, D dưới mỗi lưới ---- */
function luoiHinh(polys, n, c, o){
  o=o||{}; var pad=8, cap=o.nhan?26:0, gw=n*c, pw=gw+2*pad, cols=o.cols||polys.length, rows=Math.ceil(polys.length/cols), s=svgX(cols*pw, rows*(gw+2*pad+cap)), i, ten=['A','B','C','D'];
  polys.forEach(function(P, idx){ var ox=(idx%cols)*pw+pad, oy=Math.floor(idx/cols)*(gw+2*pad+cap)+pad;
    for(i=0;i<=n;i++) s+='<line x1="'+(ox+i*c)+'" y1="'+oy+'" x2="'+(ox+i*c)+'" y2="'+(oy+gw)+'" stroke="'+HM.day+'" stroke-width="1.5"/><line x1="'+ox+'" y1="'+(oy+i*c)+'" x2="'+(ox+gw)+'" y2="'+(oy+i*c)+'" stroke="'+HM.day+'" stroke-width="1.5"/>';
    s+='<polygon points="'+P.map(function(p){ return (ox+p[0]*c)+','+(oy+(n-p[1])*c); }).join(' ')+'" fill="'+HM.troi+'" fill-opacity="0.3" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>';
    if(o.nhan) s+='<text x="'+(ox+gw/2)+'" y="'+(oy+gw+22)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+ten[idx]+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
/* các loại hình trên lưới: trả về mảng đỉnh đã đặt trong lưới n × n */
var MAU_LUOI={
  hv:function(r){ return [[0,0],[r,0],[r,r],[0,r]]; },
  hcn:function(w,h){ return [[0,0],[w,0],[w,h],[0,h]]; },
  thoi:function(k){ return [[0,k],[2*k,0],[4*k,k],[2*k,2*k]]; },
  bh:function(){ return [[0,0],[3,0],[4,2],[1,2]]; },
  thang:function(){ return [[0,0],[4,0],[3,2],[1,2]]; },
  tg:function(){ return [[0,0],[4,0],[1,3]]; }
};
function datLuoi(P, n, xoay, mir){
  var Q=P.map(function(p){ return xoay ? [p[1],p[0]] : [p[0],p[1]]; }), xs=Q.map(function(p){ return p[0]; }), ys=Q.map(function(p){ return p[1]; }), w=Math.max.apply(null,xs)-Math.min.apply(null,xs), h=Math.max.apply(null,ys)-Math.min.apply(null,ys);
  var dx=rnd(0,Math.max(0,n-w)), dy=rnd(0,Math.max(0,n-h));
  return Q.map(function(p){ var x = mir ? (w-p[0]) : p[0]; return [x+dx, p[1]+dy]; });
}

/* ---- Hình mới 6 (D9): tờ giấy có mép rách bên phải trên lưới; các đường cắt đặt tên A, B, C. huong='ngang': đường cắt thẳng đứng; 'doc': đường cắt nằm ngang ---- */
function giayRach(W, H, ks, huong, ten){
  var c=26, mt=34, ml=30, ph=huong==='ngang' ? 1 : 1, gw=W*c, gh=H*c, VW=gw+ml+34, VH=gh+mt+30, s=svgX(VW, VH), i, jag=[], t;
  function X(x){ return ml+x*c; } function Y(y){ return mt+(H-y)*c; }
  /* mép rách ở phía xa của hướng cắt */
  var pts=[];
  if(huong==='ngang'){ pts.push([0,0],[W,0]); for(t=0;t<H;t++) pts.push([W-(t%2?0.5:0), t+0.5],[W-(t%2?0:0.5), t+1]); pts.push([0,H]); }
  else { pts.push([0,0],[W,0],[W,H]); for(t=W;t>0;t--) pts.push([t-0.5, H-(t%2?0.5:0)],[t-1, H-(t%2?0:0.5)]); }
  for(i=0;i<=W;i++) s+='<line x1="'+X(i)+'" y1="'+Y(0)+'" x2="'+X(i)+'" y2="'+Y(H)+'" stroke="'+HM.day+'" stroke-width="1.5"/>';
  for(i=0;i<=H;i++) s+='<line x1="'+X(0)+'" y1="'+Y(i)+'" x2="'+X(W)+'" y2="'+Y(i)+'" stroke="'+HM.day+'" stroke-width="1.5"/>';
  s+='<polygon points="'+pts.map(function(p){ return f1(X(p[0]))+','+f1(Y(p[1])); }).join(' ')+'" fill="'+HM.vang+'" fill-opacity="0.4" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>';
  ks.forEach(function(k, idx){
    if(huong==='ngang') s+='<path d="M'+X(k)+' '+Y(0)+' L'+X(k)+' '+(Y(H)-8)+'" stroke="'+HM.camDam+'" stroke-width="3" stroke-dasharray="7 5" fill="none"/><text x="'+X(k)+'" y="'+(Y(H)-14)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+ten[idx]+'</text>';
    else s+='<path d="M'+X(0)+' '+Y(k)+' L'+(X(W)+8)+' '+Y(k)+'" stroke="'+HM.camDam+'" stroke-width="3" stroke-dasharray="7 5" fill="none"/><text x="'+(X(W)+22)+'" y="'+(Y(k)+7)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+ten[idx]+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}

/* ---- Hình mới 7 (D10): hình chữ nhật ABCD (A trên trái, B trên phải, C dưới phải, D dưới trái); nhan = {AB:'20 dm', BC:'13 dm', …} mỗi cạnh nhiều nhất một nhãn, đặt giữa cạnh ---- */
function hcnNhan(nhan){
  var W=300, H=190, x0=50, y0=40, w=200, h=110, s=svgX(W,H);
  s+='<rect x="'+x0+'" y="'+y0+'" width="'+w+'" height="'+h+'" fill="'+HM.vang+'" fill-opacity="0.3" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>';
  var cc={AB:[x0+w/2,y0],BC:[x0+w,y0+h/2],CD:[x0+w/2,y0+h],DA:[x0,y0+h/2]};
  Object.keys(nhan).forEach(function(c){ s+=nhanVien(Math.round(cc[c][0]), Math.round(cc[c][1]), 66, 26, nhan[c], 16); });
  var P={A:[x0-16,y0-10],B:[x0+w+16,y0-10],C:[x0+w+16,y0+h+22],D:[x0-16,y0+h+22]};
  [['A',x0,y0],['B',x0+w,y0],['C',x0+w,y0+h],['D',x0,y0+h]].forEach(function(p){ s+='<circle cx="'+p[1]+'" cy="'+p[2]+'" r="5" fill="'+HM.cam+'"/><text x="'+P[p[0]][0]+'" y="'+P[p[0]][1]+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+p[0]+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}

/* ---- Hình mới 8 (D11): đường thẳng A–C–D–B, đoạn CD hỏng; đi vòng theo hình chữ nhật CMND (C, D trên đường; M, N phía dưới). Nhãn đặt giữa CM và MN ---- */
function duongVong(cm, mn){
  var W=300, H=190, s=svgX(W,H), yL=50, xC=80, xD=220, yM=140;
  s+='<path d="M20 '+yL+' L'+xC+' '+yL+'" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M'+xC+' '+yL+' L'+xD+' '+yL+'" stroke="'+HM.do+'" stroke-width="3" stroke-dasharray="3 6" stroke-linecap="round" fill="none"/><path d="M'+xD+' '+yL+' L280 '+yL+'" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>';
  s+='<path d="M'+xC+' '+yL+' L'+xC+' '+yM+' L'+xD+' '+yM+' L'+xD+' '+yL+'" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  s+=nhanVien(xC, Math.round((yL+yM)/2), 66, 26, cm+' km', 16)+nhanVien(Math.round((xC+xD)/2), yM, 66, 26, mn+' km', 16);
  [['A',20,yL,-1,-1],['C',xC,yL,0,-1],['D',xD,yL,0,-1],['B',280,yL,1,-1],['M',xC,yM,-1,1],['N',xD,yM,1,1]].forEach(function(p){ s+='<circle cx="'+p[1]+'" cy="'+p[2]+'" r="5" fill="'+HM.cam+'"/><text x="'+(p[1]+p[3]*16)+'" y="'+(p[2]+p[4]*(p[4]<0?14:17)+7)+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+p[0]+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}

/* ---- Hình mới 9 (D12): hình chữ nhật xếp bằng que tính. a que mỗi cạnh dài, b que mỗi cạnh ngắn; mỗi que là một thanh data-dem="que", các que tách rời, không chồng nhau ---- */
function queTinh(a, b, px){
  var u=Math.min(34, 220/Math.max(a,b)), m=16, W=a*u+2*m+12, H=b*u+2*m+12, s=svgX(W,H,px), i, j, t=9;
  var ox=m+6, oy=m+6;
  for(i=0;i<a;i++){ var x=ox+i*u+4;
    s+='<rect data-dem="que" x="'+f1(x)+'" y="'+f1(oy-t/2)+'" width="'+f1(u-8)+'" height="'+t+'" rx="4" fill="'+HM.vangDam+'"/><rect data-dem="que" x="'+f1(x)+'" y="'+f1(oy+b*u-t/2)+'" width="'+f1(u-8)+'" height="'+t+'" rx="4" fill="'+HM.vangDam+'"/>'; }
  for(j=0;j<b;j++){ var y=oy+j*u+5;
    s+='<rect data-dem="que" x="'+f1(ox-t/2)+'" y="'+f1(y)+'" width="'+t+'" height="'+f1(u-10)+'" rx="4" fill="'+HM.vangDam+'"/><rect data-dem="que" x="'+f1(ox+a*u-t/2)+'" y="'+f1(y)+'" width="'+t+'" height="'+f1(u-10)+'" rx="4" fill="'+HM.vangDam+'"/>'; }
  return '<div class="flex justify-center my-1">'+s+'</svg></div>';
}
function soCach(n){ var nua=n/2, d=0, r; for(r=1;r<nua-r;r++) d++; return d; }   /* số hình chữ nhật có chiều dài lớn hơn chiều rộng và nửa chu vi n/2 */

/* Đúng hay sai của một câu về hình chữ nhật, hình vuông ABCD (đỉnh theo thứ tự P[0..3]); tính từ toạ độ */
function truthTag(P, tag){
  var k=phanLoai4(P), d=function(i,j){ return Math.round(Math.hypot(P[i][0]-P[j][0], P[i][1]-P[j][1])*1e6); };
  if(tag==='goc4') return k==='hv' || k==='hcn';
  if(tag==='bang4') return k==='hv';
  if(tag==='daingan') return k==='hcn';
  if(tag==='ABeCD') return d(0,1)===d(2,3);
  if(tag==='ABeBC') return d(0,1)===d(1,2);
  return false;
}

var BAI = {
 n: 19,
 title: 'Hình Tam Giác, Hình Tứ Giác. Hình Chữ Nhật, Hình Vuông',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-tam-tu':'Nhầm tam giác với tứ giác', 'nham-dinh-canh':'Nhầm đỉnh với cạnh', 'dem-sot-hinh':'Đếm sót hoặc thừa hình', 'cat-sai':'Chọn sai đoạn cắt',
       'nham-thoi-vuong':'Nhầm hình thoi với hình vuông', 'nham-hv-hcn':'Nhầm hình vuông với hình chữ nhật', 'nham-canh-doi':'Nhầm cạnh đối'},
 muctieu: [
  {id:'MT1', ten:'Tam giác, tứ giác: đỉnh, cạnh, góc', muc:['Số đỉnh, số cạnh, số góc của tam giác, tứ giác.', 'Nêu tên cạnh của tam giác, tứ giác; mệnh đề đúng sai.', 'Nhận ra hình KHÔNG phải tam giác, tứ giác (đường hở, cạnh cong); ngũ giác.']},
  {id:'MT2', ten:'Đếm và cắt hình', muc:['Đếm tam giác trong hình chia đơn giản; cắt hình chữ nhật theo đường chéo.', 'Hình thang ABED, C trên DE: đếm tam giác; cắt theo MN.', 'Ngũ giác có hai đoạn nối: đếm tam giác, tứ giác; chọn đoạn cắt cho một tam giác và một tứ giác.']},
  {id:'MT3', ten:'Nhận ra hình chữ nhật, hình vuông', muc:['Số góc vuông của hình chữ nhật; chọn hình vuông trong ba hình khác hẳn.', 'Hình vuông trong nhiều hình (có hình thoi); chọn hình chữ nhật; cạnh bằng nhau.', 'Đếm hình chữ nhật trong bốn hình; Đ hay S; tìm lỗi của bạn.']},
  {id:'MT4', ten:'Cạnh của hình chữ nhật, hình vuông', muc:['Đếm ô: cạnh hình vuông; cạnh đối bằng nhau (một cạnh đã cho).', 'Chiều dài, chiều rộng; cắt giấy để được hình vuông; hai cạnh đã cho.', 'Chiều dài hơn chiều rộng; đoạn cắt gần đúng; cạnh đối khi cho hai cạnh kề.']},
  {id:'MT5', ten:'Vận dụng', muc:['Đường vòng: tìm CD; số que của hình chữ nhật.', 'Đường vòng C–M–N–D; chọn hình xếp bằng 10 que.', 'Đi vòng dài hơn đi thẳng; đếm số cách xếp hình chữ nhật bằng que tính.']}
 ],
 topics: [
  /* D1 — Đỉnh, cạnh, góc (Khám phá phần 1) */
  {name:'Đỉnh, cạnh, góc', sec:'Phần 1 — Tam giác, tứ giác — Đỉnh, cạnh, góc', mt:['MT1'], levels:3,
   muc:['Hình tam giác hoặc tứ giác: có mấy đỉnh, cạnh hoặc góc.', 'Đ hay S về số đỉnh, cạnh, góc.', 'Có cả ngũ giác: có mấy cạnh; nhiều hơn tam giác mấy cạnh.'],
   make:function(lv){
    var nm=chuMoi(), mir=Math.random()<0.5, loai, P, ten, so, thuoc;
    if(lv<=1){ loai=pick(['tg','tu']); P = loai==='tg' ? lat(pick(MAU_TG),mir) : lat(pick(MAU_TU),mir); so = loai==='tg' ? 3 : 4; thuoc=pick(['đỉnh','cạnh','góc']); ten=nm.slice(0,so);
      return {type:'num', _P:P, _kieu:'so', _e:so, q:hinhDaGiac(P,ten)+'<div>Hình này là '+(loai==='tg'?'hình tam giác':'hình tứ giác')+' '+ten.join('')+'. Hình có bao nhiêu <b>'+thuoc+'</b>?</div>', ans:so, unit:thuoc,
        sai:nhanSai([[so===3?4:3,'nham-tam-tu'],[so+1,'nham-tam-tu'],[so-1,'nham-tam-tu']], so), goiY:{'nham-tam-tu':'Tam giác có 3 đỉnh, 3 cạnh, 3 góc. Tứ giác có 4 đỉnh, 4 cạnh, 4 góc.'}}; }
    if(lv===2){ loai=pick(['tg','tu']); P = loai==='tg' ? lat(pick(MAU_TG),mir) : lat(pick(MAU_TU),mir); so = loai==='tg' ? 3 : 4; thuoc=pick(['đỉnh','cạnh','góc']); ten=nm.slice(0,so);
      var x = Math.random()<0.5 ? so : (so===3?4:3), dung = x===so ? 'Đ' : 'S';
      return {type:'mcq', figFn:dsBtn19, _P:P, _kieu:'ds', _e:so, _x:x, _dung:dung, q:hinhDaGiac(P,ten)+'<div class="text-xl font-extrabold text-orange-700 my-1">'+(loai==='tg'?'Hình tam giác ':'Hình tứ giác ')+ten.join('')+' có '+x+' '+thuoc+'.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:(dung==='Đ'?0:1), sai:(dung==='Đ'?{}:{'0':'nham-tam-tu'}), goiY:{'nham-tam-tu':'Tam giác có 3 đỉnh, 3 cạnh, 3 góc. Tứ giác có 4 đỉnh, 4 cạnh, 4 góc.', 'chung':'Bé đếm số đỉnh của hình rồi so với đề bài.'}}; }
    var kinds=[['tg',3],['tu',4],['ngu',5]], kd=pick(kinds); P = kd[0]==='tg' ? lat(pick(MAU_TG),mir) : (kd[0]==='tu' ? lat(pick(MAU_TU),mir) : lat(MAU_NGU,mir)); so=kd[1]; ten=nm.slice(0,so);
    var hon = Math.random()<0.5 && so>3, ans = hon ? so-3 : so;
    if(hon===false && so===3) hon=false;
    return {type:'num', _P:P, _kieu:(hon?'hon':'canh'), _e:ans, q:hinhDaGiac(P,ten)+'<div>'+(hon ? 'Hình '+ten.join('')+' có nhiều hơn hình tam giác mấy cạnh?' : 'Hình '+ten.join('')+' có bao nhiêu cạnh?')+'</div>', ans:ans, unit:'cạnh',
      sai:nhanSai([[so,'nham-tam-tu'],[so===3?4:3,'nham-tam-tu'],[ans+1,'nham-tam-tu'],[ans-1,'nham-tam-tu']], ans), goiY:{'nham-tam-tu':'Bé đếm số đỉnh hoặc số cạnh của hình. Hình có bao nhiêu đỉnh thì có bấy nhiêu cạnh.'}};
  }, check:function(q){ var n=q._P.length, ok = q._P.length>=3 && q._P.length<=5;
    if(q._kieu==='so') return ok && q.ans===n && q.ans===q._e;
    if(q._kieu==='ds') return ok && q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===n) && q.correct===(q._x===n?0:1);
    if(q._kieu==='hon') return ok && q.ans===n-3 && n>3;
    return ok && q.ans===n; }},

  /* D2 — Tên đỉnh và cạnh (Hoạt động 1 phần 1) */
  {name:'Tên đỉnh và cạnh', sec:'Phần 1 — Tam giác, tứ giác — Hoạt động 1: nêu tên đỉnh, cạnh', mt:['MT1'], levels:3,
   muc:['Chọn tên một cạnh của tam giác.', 'Tứ giác ABCD có những cạnh nào.', 'Đoạn nào KHÔNG phải cạnh của tứ giác (nối hai đỉnh đối diện).'],
   make:function(lv){
    var nm=chuMoi(), mir=Math.random()<0.5, sai={}, ch, dung, cau, P, ten, chu;
    if(lv<=1){ P=lat(pick(MAU_TG),mir); ten=nm.slice(0,3); var ngoai=nm[3], ngoai2=nm[4];
      dung=ten[0]+ten[1]; ch=shuffle([dung, ten[1]+ngoai, ngoai2+ten[2]]); cau='Đoạn nào là <b>cạnh</b> của tam giác '+ten.join('')+'?'; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-dinh-canh'; });
      return {type:'mcq', _P:P, _ten:ten, _lv:1, _dung:dung, q:hinhDaGiac(P,ten)+'<div>'+cau+'</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:{'nham-dinh-canh':'Cạnh nối hai đỉnh của hình. Cả hai chữ cái đều phải là đỉnh của tam giác.'}}; }
    P=lat(pick(MAU_TU),mir); ten=nm.slice(0,4);
    if(lv===2){ var cs=[ten[0]+ten[1], ten[1]+ten[2], ten[2]+ten[3], ten[3]+ten[0]]; dung=cs.join(', '); var sai1=[cs[0],cs[1],cs[2],ten[0]+ten[2]].join(', '), sai2=[cs[0],ten[1]+ten[3],cs[2],cs[3]].join(', ');
      ch=shuffle([dung,sai1,sai2]); ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-dinh-canh'; });
      return {type:'mcq', cot:1, _P:P, _ten:ten, _lv:2, _dung:dung, q:hinhDaGiac(P,ten)+'<div>Các <b>cạnh</b> của tứ giác '+ten.join('')+' là gì?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:{'nham-dinh-canh':'Mỗi cạnh nối hai đỉnh liền nhau, đi một vòng quanh hình. Đoạn nối hai đỉnh đối diện không phải cạnh.'}}; }
    var kc=ten[0]+ten[2]; dung=kc; ch=shuffle([dung, ten[0]+ten[1], ten[2]+ten[3]]); ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-dinh-canh'; });
    return {type:'mcq', _P:P, _ten:ten, _lv:3, _dung:dung, q:hinhDaGiac(P,ten,{cheo:[[0,2]]})+'<div>Đoạn nào <b>không phải</b> là cạnh của tứ giác '+ten.join('')+'?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'nham-dinh-canh':'Đoạn nét đứt nối hai đỉnh đối diện, không phải cạnh. Cạnh là các đoạn đi quanh hình.'}};
  }, check:function(q){ var ten=q._ten, n=ten.length;
    function laCanh(a,b){ var i=ten.indexOf(a), j=ten.indexOf(b); if(i<0||j<0) return false; return (i+1)%n===j || (j+1)%n===i; }
    if(q._lv===1){ var dd=q.choices.filter(function(c){ return laCanh(c[0],c[1]); }); return dd.length===1 && dd[0]===q._dung && kiemMCQ(q); }
    if(q._lv===2){ var d2=q.choices.filter(function(c){ return c.split(', ').every(function(e){ return laCanh(e[0],e[1]); }) && c.split(', ').length===4; }); return d2.length===1 && d2[0]===q._dung && kiemMCQ(q); }
    var d3=q.choices.filter(function(c){ return !laCanh(c[0],c[1]); }); return d3.length===1 && d3[0]===q._dung && kiemMCQ(q); }},

  /* D3 — Đúng hình, sai hình (không có trong SGK) */
  {name:'Đúng hình, sai hình', sec:'Phần 1 — Tam giác, tứ giác — Hình nào là tam giác, tứ giác?', mt:['MT1'], levels:3,
   muc:['Hình khép kín và hình hở: hình nào là tam giác.', 'Có hình có cạnh cong.', 'Đ hay S: "Hình này là tứ giác." (đường hở có bốn đoạn).'],
   make:function(lv){
    var mir=Math.random()<0.5, specs, dungI, cau, loaiHoi = lv===2 ? pick(['tg','tu']) : 'tg', ch, sai={};
    function sp(loai){ return {loai:loai, mau:rnd(0,3), mir:Math.random()<0.5}; }
    if(lv<=1){ specs=[sp(loaiHoi==='tu'?'tu':'tg'), sp(loaiHoi==='tu'?'hoTu':'hoTg')]; }
    else if(lv===2){ specs = loaiHoi==='tg' ? [sp('tg'), sp('hoTg'), sp('congTg')] : [sp('tu'), sp('hoTu'), sp('tg')]; }
    if(lv<=2){ var ord=shuffle(specs.map(function(_,i){ return i; })), ss=ord.map(function(i){ return specs[i]; }), dungI=ord.indexOf(0), tenH=['Hình A','Hình B','Hình C'].slice(0,ss.length);
      ch=tenH; ch.forEach(function(c,i){ if(i!==dungI) sai[String(i)]='nham-tam-tu'; });
      var tu = (lv===2 && loaiHoi==='tu');
      return {type:'mcq', _specs:ss, _tu:tu, _dung:ch[dungI], q:veTamTu(ss)+'<div>Hình nào là <b>'+(tu?'hình tứ giác':'hình tam giác')+'</b>?</div>', choices:ch, correct:dungI, sai:sai,
        goiY:{'nham-tam-tu':'Tam giác có 3 cạnh thẳng, nối liền thành một vòng kín. Tứ giác có 4 cạnh thẳng nối liền. Hình có chỗ hở hoặc cạnh cong thì không phải.'}}; }
    var laTu=Math.random()<0.5, s1 = laTu ? sp('tu') : (Math.random()<0.5 ? sp('hoTu') : sp('hoTg')), dung = soCanhTG(s1)===4 ? 'Đ' : 'S';
    return {type:'mcq', figFn:dsBtn19, _specs:[s1], _kieu:'ds', _dung:dung, q:veTamTu([s1])+'<div class="text-xl font-extrabold text-orange-700 my-1">Hình A là hình tứ giác.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(dung==='Đ'?0:1), sai:(dung==='Đ'?{}:{'0':'nham-tam-tu'}), goiY:{'nham-tam-tu':'Tứ giác phải có 4 cạnh thẳng nối liền thành một vòng kín. Hình có chỗ hở thì không phải tứ giác.', 'chung':'Bé xem hình có khép kín không và đếm số cạnh.'}};
  }, check:function(q){ var ss=q._specs;
    if(q._kieu==='ds') return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(soCanhTG(ss[0])===4) && q.correct===(soCanhTG(ss[0])===4?0:1);
    var want = q._tu ? 4 : 3, dd=ss.filter(function(s){ return soCanhTG(s)===want; }); return dd.length===1 && ss.indexOf(dd[0])===q.correct && q.choices[q.correct]===q._dung; }},

  /* D4 — Đếm hình trong hình ghép (Hoạt động 2 phần 1). Chỉ đếm TAM GIÁC trong hình có điểm nằm giữa cạnh; tứ giác chỉ đếm ở ngũ giác có hai đoạn nối */
  {name:'Đếm hình ghép', sec:'Phần 1 — Tam giác, tứ giác — Hoạt động 2: đếm hình trong hình ghép', mt:['MT2'], levels:3,
   muc:['Tam giác chia thành hai phần: đếm tam giác.', 'Hình thang ABED, C trên DE, nối AC, BC: đếm tam giác.', 'Ngũ giác có hai đoạn nối từ một đỉnh: đếm tam giác, tứ giác.'],
   make:function(lv){
    var nm=chuMoi(), mau = lv<=1 ? MAU_G1 : (lv===2 ? MAU_G2 : MAU_G3), bang={}, ks=Object.keys(mau.pts), i;
    ks.forEach(function(k, idx){ bang[k]=nm[idx]; });
    var g=doiTen(mau, bang), kieu = lv<=2 ? 'tg' : pick(['tg','tu','tong']), tg=dsTamGiac(g.pts,g.segs), tu=dsTuGiac(g.pts,g.segs), ans, cau;
    if(kieu==='tg'){ ans=tg.length; cau='Có bao nhiêu <b>hình tam giác</b> trong hình?'; }
    else if(kieu==='tu'){ ans=tu.length; cau='Có bao nhiêu <b>hình tứ giác</b> trong hình? (Hình ngũ giác lớn không tính.)'; }
    else { ans=tg.length+tu.length; cau='Có tất cả bao nhiêu hình tam giác và hình tứ giác trong hình? (Hình ngũ giác lớn không tính.)'; }
    return {type:'num', _g:g, _kieu:kieu, _lv:lv, _e:ans, q:hinhGhep(g)+'<div>'+cau+'</div>', ans:ans, unit:'hình',
      sai:nhanSai([[ans+1,'dem-sot-hinh'],[ans-1,'dem-sot-hinh'],[ans+2,'dem-sot-hinh'],[ans-2,'dem-sot-hinh']], ans),
      goiY:{'dem-sot-hinh':'Bé đếm các hình nhỏ trước, rồi đếm các hình ghép từ hai hay ba hình nhỏ. Mỗi hình phải có các cạnh nằm trên các đoạn đã vẽ.'}};
  }, check:function(q){ var g=q._g, tg=dsTamGiac(g.pts,g.segs), tu=dsTuGiac(g.pts,g.segs), e = q._kieu==='tg' ? tg.length : (q._kieu==='tu' ? tu.length : tg.length+tu.length);
    if(q._kieu!=='tg' && q._lv<3) return false;
    if(q._kieu!=='tg' && Object.keys(g.pts).length!==5) return false;
    return q.ans===e && q.ans===q._e && e>=1; }},

  /* D5 — Cắt tờ giấy (Hoạt động 3 phần 1) */
  {name:'Cắt tờ giấy', sec:'Phần 1 — Tam giác, tứ giác — Hoạt động 3: cắt tờ giấy hình chữ nhật', mt:['MT2'], levels:3,
   muc:['Cắt theo đường chéo: hai phần là hình gì.', 'Cắt theo MN, hoặc theo đoạn nối một đỉnh với M hoặc N.', 'Chọn đoạn cắt để được một tam giác và một tứ giác.'],
   make:function(lv){
    var nm=shuffle(['E','G','H','K','M','N','P','Q']), tM=nm[0], tN=nm[1], w=rnd(5,6), h=3, m=rnd(1,w-1), n=rnd(1,w-1), P=toaDoGiay(m,n,w,h), sai={}, ch, dung, cau, cat=null, ten2={M:tM,N:tN}, kieu, cacCat;
    function ten(p){ return p.split('').map(function(c){ return c==='M' ? tM : (c==='N' ? tN : c); }).join(''); }
    if(lv<=1){ var c1=pick(['AC','BD']); cat=[c1[0],c1[1]]; dung='Hai tam giác'; ch=['Hai tam giác','Hai tứ giác','Một tam giác và một tứ giác']; cau='Em cắt tờ giấy hình chữ nhật ABCD theo đoạn thẳng '+c1+' (nét đứt). Hai phần nhận được là hình gì?'; kieu='cat'; }
    else if(lv===2){ var c2=pick(['MN','MN','AN','MC','MD','BN']); cat=[c2[0],c2[1]]; dung = c2==='MN' ? 'Hai tứ giác' : 'Một tam giác và một tứ giác'; ch=['Hai tam giác','Hai tứ giác','Một tam giác và một tứ giác']; cau='Em cắt tờ giấy hình chữ nhật ABCD theo đoạn thẳng '+ten(c2)+' (nét đứt). Hai phần nhận được là hình gì?'; kieu='cat'; }
    else { var dungC=pick(['AN','MC','MD','BN']), sais=shuffle(['AC','BD','MN']).slice(0,2); dung=ten(dungC); ch=shuffle([dung].concat(sais.map(ten))); cau='Em cắt tờ giấy hình chữ nhật ABCD theo một đoạn thẳng. Cắt theo đoạn nào thì được <b>một tam giác và một tứ giác</b>?'; kieu='chon'; cacCat=null; }
    ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='cat-sai'; });
    return {type:'mcq', cot:(kieu==='chon'?0:1), _P:P, _kieu:kieu, _cat:cat, _ten:ten2, _cacCat:cacCat, _dung:dung, q:giayCat(m,n,w,h,(lv<=2?cat:null),tM,tN)+'<div>'+cau+'</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'cat-sai':'Bé thử vẽ đoạn cắt, rồi đếm số cạnh của mỗi phần: 3 cạnh là tam giác, 4 cạnh là tứ giác.'}};
  }, check:function(q){ var P=q._P, tM=q._ten.M, tN=q._ten.N;
    function unten(c){ return c.split('').map(function(x){ return x===tM ? 'M' : (x===tN ? 'N' : x); }).join(''); }
    if(q._kieu==='cat'){ var c=catGiay(P, q._cat[0], q._cat[1]); return moTaCat(c)===q._dung && new Set(q.choices).size===3 && kiemMCQ(q); }
    var dd=q.choices.filter(function(x){ var u=unten(x); return moTaCat(catGiay(P,u[0],u[1]))==='Một tam giác và một tứ giác'; });
    return dd.length===1 && dd[0]===q._dung && kiemMCQ(q); }},

  /* D6 — Đặc điểm hình chữ nhật, hình vuông (Khám phá phần 2). Không có câu "hình vuông cũng là hình chữ nhật" */
  {name:'Đặc điểm hình', sec:'Phần 2 — Hình chữ nhật, hình vuông — Khám phá: đặc điểm', mt:['MT3'], levels:3,
   muc:['Hình chữ nhật có mấy góc vuông.', 'Hình vuông có mấy cạnh bằng nhau; hình chữ nhật có mấy cặp cạnh bằng nhau.', 'Đ hay S về hình đã vẽ (cạnh đối, góc vuông, 4 cạnh bằng nhau).'],
   make:function(lv){
    var nm=chuMoi(), ten=nm.slice(0,4), hv=Math.random()<0.5, w=hv?rnd(2,4):rnd(4,6), h=hv?w:rnd(2,3), P=[[0,h],[w,h],[w,0],[0,0]], hinh=hinhDaGiac(P,ten,{cw:260,ch:170}), nome=ten.join('');
    if(lv<=1){ return {type:'num', _P:P, _kieu:'gv', _e:4, q:hinh+'<div>Hình '+(hv?'vuông ':'chữ nhật ')+nome+' có bao nhiêu <b>góc vuông</b>?</div>', ans:4, unit:'góc',
      sai:nhanSai([[2,'lech-nhom'],[3,'lech-nhom'],[1,'lech-nhom']], 4), goiY:{'lech-nhom':'Hình chữ nhật và hình vuông đều có 4 góc vuông, ở bốn đỉnh.'}}; }
    if(lv===2){ if(hv) return {type:'num', _P:P, _kieu:'cb', _e:4, q:hinh+'<div>Hình vuông '+nome+' có bao nhiêu <b>cạnh bằng nhau</b>?</div>', ans:4, unit:'cạnh',
        sai:nhanSai([[2,'nham-hv-hcn'],[3,'lech-nhom'],[1,'lech-nhom']], 4), goiY:{'nham-hv-hcn':'Hình vuông có cả 4 cạnh bằng nhau. Hình chữ nhật chỉ có các cạnh đối bằng nhau.', 'lech-nhom':'Hình vuông có 4 cạnh bằng nhau.'}};
      return {type:'num', _P:P, _kieu:'cap', _e:2, q:hinh+'<div>Hình chữ nhật '+nome+' có bao nhiêu <b>cặp cạnh bằng nhau</b>?</div>', ans:2, unit:'cặp',
        sai:nhanSai([[4,'nham-hv-hcn'],[1,'lech-nhom'],[3,'lech-nhom']], 2), goiY:{'nham-hv-hcn':'Hình chữ nhật có hai cạnh dài bằng nhau và hai cạnh ngắn bằng nhau: 2 cặp cạnh bằng nhau.', 'lech-nhom':'Hai cạnh dài là một cặp, hai cạnh ngắn là một cặp.'}}; }
    var nom=nome, a=ten[0], b=ten[1], c=ten[2], d=ten[3], cacCau;
    if(hv) cacCau=[['Hình '+nom+' có 4 góc vuông.','goc4'],['Hình '+nom+' có 4 cạnh bằng nhau.','bang4'],['Hình '+nom+' có hai cạnh dài và hai cạnh ngắn.','daingan']];
    else cacCau=[['Hình '+nom+' có cạnh '+a+b+' bằng cạnh '+c+d+'.','ABeCD'],['Hình '+nom+' có cạnh '+a+b+' bằng cạnh '+b+c+'.','ABeBC'],['Hình '+nom+' có 4 góc vuông.','goc4'],['Hình '+nom+' có 4 cạnh bằng nhau.','bang4']];
    var cc=pick(cacCau), v=truthTag(P, cc[1]), dung=v?'Đ':'S';
    return {type:'mcq', figFn:dsBtn19, _P:P, _kieu:'ds', _tag:cc[1], _dung:dung, q:hinh+'<div class="text-xl font-extrabold text-orange-700 my-1">'+cc[0]+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(v?0:1), sai:(v?{}:{'0':'nham-hv-hcn'}), goiY:{'nham-hv-hcn':'Hình chữ nhật có hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau, và 4 góc vuông. Hình vuông có cả 4 cạnh bằng nhau.', 'chung':'Bé nhìn hình và so các cạnh, các góc.'}};
  }, check:function(q){ var P=q._P, kd=phanLoai4(P);
    if(!(kd==='hv' || kd==='hcn')) return false;
    if(q._kieu==='ds'){ var v=truthTag(P,q._tag); return q.choices.join()==='Đ,S' && (q._dung==='Đ')===v && q.correct===(v?0:1); }
    if(q._kieu==='gv') return q.ans===4;
    if(q._kieu==='cb') return kd==='hv' && q.ans===4;
    return kd==='hcn' && q.ans===2; }},

  /* D7 — Hình nào là hình vuông, hình chữ nhật (Hoạt động 1 phần 2) */
  {name:'Hình vuông, hình chữ nhật', sec:'Phần 2 — Hình chữ nhật, hình vuông — Hoạt động 1: nhận ra hình', mt:['MT3'], levels:3,
   muc:['Chọn hình vuông trong ba hình khác hẳn.', 'Chọn hình vuông hoặc hình chữ nhật trong bốn hình (có hình thoi, hình bình hành).', 'Đếm số hình chữ nhật trong bốn hình.'],
   make:function(lv){
    var n=6, polys, sai={}, ch, dung, dungI, tenH=['Hình A','Hình B','Hình C','Hình D'];
    function dat(P, xoay){ return datLuoi(P, n, xoay, Math.random()<0.5); }
    if(lv<=1){ var r=rnd(3,4), ps=[dat(MAU_LUOI.hv(r),false), dat(MAU_LUOI.tg(),false), dat(MAU_LUOI.hcn(6,2),false)], ord=shuffle([0,1,2]); polys=ord.map(function(i){ return ps[i]; }); dungI=ord.indexOf(0); ch=tenH.slice(0,3);
      ch.forEach(function(c,i){ if(i!==dungI) sai[String(i)] = ord[i]===2 ? 'nham-hv-hcn' : 'lech-nhom'; });
      return {type:'mcq', _polys:polys, _kieu:'hv', _dung:ch[dungI], q:luoiHinh(polys,n,16,{nhan:true,cols:3})+'<div>Hình nào là <b>hình vuông</b>?</div>', choices:ch, correct:dungI, sai:sai,
        goiY:{'nham-hv-hcn':'Hình vuông có 4 cạnh bằng nhau. Bé đếm ô của từng cạnh.', 'lech-nhom':'Hình vuông có 4 góc vuông và 4 cạnh bằng nhau.'}}; }
    if(lv===2){ var hoi=pick(['hv','hcn']), dungP, ps2;
      if(hoi==='hv'){ dungP=dat(MAU_LUOI.hv(3),false); ps2=[dungP, dat(MAU_LUOI.hcn(2,4),false), dat(MAU_LUOI.thoi(1),false), dat(MAU_LUOI.bh(),false)]; var nhan=['','nham-hv-hcn','nham-thoi-vuong','lech-nhom']; }
      else { dungP=dat(MAU_LUOI.hcn(4,2),false); ps2=[dungP, dat(MAU_LUOI.bh(),false), dat(MAU_LUOI.thang(),false), dat(MAU_LUOI.thoi(1),false)]; var nhan=['','nham-hv-hcn','nham-hv-hcn','nham-thoi-vuong']; }
      var ord2=shuffle([0,1,2,3]); polys=ord2.map(function(i){ return ps2[i]; }); dungI=ord2.indexOf(0); ch=tenH.slice(0,4); ch.forEach(function(c,i){ if(i!==dungI) sai[String(i)]=nhan[ord2[i]]; });
      return {type:'mcq', _polys:polys, _kieu:hoi, _dung:ch[dungI], q:luoiHinh(polys,n,16,{nhan:true,cols:2})+'<div>Hình nào là <b>'+(hoi==='hv'?'hình vuông':'hình chữ nhật')+'</b>?</div>', choices:ch, correct:dungI, sai:sai,
        goiY:{'nham-thoi-vuong':'Hình thoi có 4 cạnh bằng nhau nhưng KHÔNG có 4 góc vuông. Bé dùng ê ke thử các góc.', 'nham-hv-hcn':'Bé đếm ô các cạnh và dùng ê ke thử các góc.', 'lech-nhom':'Hình có 4 góc vuông mới là hình vuông hoặc hình chữ nhật.'}}; }
    var k=rnd(1,3), loai=['hcn','hcn','hcn'].slice(0,k).map(function(_, i){ return i; }), ps3=[], i2;
    for(i2=0;i2<k;i2++){ var dims=pick([[4,2],[5,2],[5,3],[4,1],[6,3],[6,2]]); ps3.push([dat(MAU_LUOI.hcn(dims[0],dims[1]), Math.random()<0.5), 'hcn']); }
    var khac=shuffle(['bh','thang','thoi','tg']), j2=0; while(ps3.length<4){ var kk=khac[j2++ % khac.length]; ps3.push([dat(kk==='thoi'?MAU_LUOI.thoi(1):MAU_LUOI[kk](), false), kk]); }
    shuffle(ps3); polys=ps3.map(function(p){ return p[0]; });
    var tuGiac=ps3.filter(function(p){ return p[1]!=='tg'; }).length;
    return {type:'num', _polys:polys, _kieu:'dem', _e:k, q:luoiHinh(polys,n,16,{nhan:true,cols:2})+'<div>Có bao nhiêu <b>hình chữ nhật</b> trong các hình trên?</div>', ans:k, unit:'hình',
      sai:nhanSai([[k+1,'dem-sot-hinh'],[k-1,'dem-sot-hinh'],[tuGiac,'nham-hv-hcn']], k), goiY:{'dem-sot-hinh':'Bé xem từng hình, dùng ê ke thử 4 góc của từng hình, rồi đếm các hình có 4 góc vuông.', 'nham-hv-hcn':'Hình bình hành, hình thang, hình thoi có 4 cạnh nhưng chưa có 4 góc vuông, nên không phải hình chữ nhật.'}};
  }, check:function(q){ var ps=q._polys, kd=ps.map(function(p){ return p.length===4 ? phanLoai4(p) : 'tg'; });
    if(q._kieu==='dem'){ var n=kd.filter(function(t){ return t==='hcn'; }).length; return n===q.ans && n===q._e && n>=1 && kd.indexOf('hv')<0; }
    var want = q._kieu==='hv' ? 'hv' : 'hcn', dd=kd.filter(function(t){ return t===want; }); return dd.length===1 && kd.indexOf(want)===q.correct && q.choices[q.correct]===q._dung && (want==='hv' ? true : kd.indexOf('hv')<0); }},

  /* D8 — Đếm ô trên lưới (Hoạt động 2 phần 2). 1 ô = 1 cm */
  {name:'Đếm ô trên lưới', sec:'Phần 2 — Hình chữ nhật, hình vuông — Hoạt động 2: đo trên lưới', mt:['MT4'], levels:3,
   muc:['Hình vuông: cạnh dài mấy ô (mấy cm).', 'Hình chữ nhật: chiều dài hoặc chiều rộng.', 'Chiều dài hơn chiều rộng mấy ô.'],
   make:function(lv){
    var nx=7, ny=6, a, b, P, cau, ans, kieu, sai;
    if(lv<=1){ var r=rnd(2,5); P=datLuoi(MAU_LUOI.hv(r), 6, false, false); kieu='canh'; ans=r; cau='Mỗi ô vuông có cạnh 1 cm. Cạnh của hình vuông dài bao nhiêu xăng-ti-mét?'; sai=nhanSai([[r+1,'lech-nhom'],[r-1,'lech-nhom'],[4*r,'cong-thay-nhan'],[r*r,'dem-sot-hinh']], r); }
    else { a=rnd(4,6); b=rnd(2,3); var xoay=Math.random()<0.5; P=datLuoi(MAU_LUOI.hcn(a,b), 6, xoay, false);
      if(lv===2){ var dai=Math.random()<0.5; kieu = dai ? 'dai' : 'rong'; ans = dai ? a : b; cau = 'Mỗi ô vuông có cạnh 1 cm. '+(dai ? 'Chiều dài (cạnh dài) của hình chữ nhật là bao nhiêu xăng-ti-mét?' : 'Chiều rộng (cạnh ngắn) của hình chữ nhật là bao nhiêu xăng-ti-mét?'); sai=nhanSai([[a+b,'cong-thay-nhan'],[a,'lech-nhom'],[b,'lech-nhom'],[ans+1,'lech-nhom'],[ans-1,'lech-nhom']], ans); }
      else { kieu='hon'; ans=a-b; cau='Mỗi ô vuông có cạnh 1 cm. Chiều dài hơn chiều rộng bao nhiêu xăng-ti-mét?'; sai=nhanSai([[a,'lech-nhom'],[b,'lech-nhom'],[a+b,'cong-thay-nhan'],[ans+1,'lech-nhom']], ans); } }
    return {type:'num', _P:P, _kieu:kieu, _e:ans, q:luoiHinh([P],6,26,{})+'<div>'+cau+'</div>', ans:ans, unit:'cm', sai:sai,
      goiY:{'lech-nhom':'Bé đếm ô dọc theo cạnh cần hỏi, từ đỉnh này tới đỉnh kia. Mỗi ô là 1 cm.', 'cong-thay-nhan':'Muốn biết hơn bao nhiêu thì lấy chiều dài trừ chiều rộng.', 'dem-sot-hinh':'Đây là số cm của một cạnh, không phải số ô của cả hình.'}};
  }, check:function(q){ var P=q._P, kd=phanLoai4(P), xs=P.map(function(p){ return p[0]; }), ys=P.map(function(p){ return p[1]; }), w=Math.max.apply(null,xs)-Math.min.apply(null,xs), h=Math.max.apply(null,ys)-Math.min.apply(null,ys), dai=Math.max(w,h), rong=Math.min(w,h), e;
    if(q._kieu==='canh'){ e=w; return kd==='hv' && w===h && q.ans===e; }
    if(kd!=='hcn') return false; e = q._kieu==='dai' ? dai : (q._kieu==='rong' ? rong : dai-rong); return q.ans===e && q.ans===q._e && e>=1; }},

  /* D9 — Cắt để được hình vuông (Hoạt động 3 phần 2): tờ giấy có mép rách */
  {name:'Cắt để được hình vuông', sec:'Phần 2 — Hình chữ nhật, hình vuông — Hoạt động 3: cắt tờ giấy rách mép', mt:['MT4'], levels:3,
   muc:['Hai đoạn cắt khác hẳn: chọn đoạn cắt được hình vuông.', 'Ba đoạn cắt, có đoạn lệch một ô.', 'Đoạn cắt nằm ngang trên tờ giấy đặt đứng.'],
   make:function(lv){
    var nm=chuMoi(), ten=nm.slice(0,3), h=rnd(3,4), W=8, ks, huong, dung=h, n=lv<=1 ? 2 : 3, sai={};
    if(lv<=1){ ks=shuffle([h, h+rnd(2,3)]); huong='ngang'; }
    else if(lv===2){ ks=shuffle([h, h-1, h+1]); huong='ngang'; }
    else { ks=shuffle([h, h-1, h+2]); huong='doc'; }
    var dungI=ks.indexOf(h), ch=ten.slice(0,n);
    ch.forEach(function(c,i){ if(i!==dungI) sai[String(i)]='lech-nhom'; });
    var hinh = huong==='ngang' ? giayRach(W,h,ks,'ngang',ten) : giayRach(h,W,ks,'doc',ten);
    return {type:'mcq', _W:(huong==='ngang'?W:h), _H:(huong==='ngang'?h:W), _ks:ks, _huong:huong, _dung:ch[dungI], q:hinh+'<div>Em cắt tờ giấy theo một đoạn nét đứt để phần '+(huong==='ngang'?'bên trái':'phía dưới')+' là một <b>hình vuông</b>. Cắt theo đoạn nào? (Mỗi ô vuông có cạnh 1 cm.)</div>', choices:ch, correct:dungI, sai:sai,
      goiY:{'lech-nhom':'Hình vuông có 4 cạnh bằng nhau. Bé đếm ô: cạnh dọc bao nhiêu ô thì cạnh ngang cũng bấy nhiêu ô.'}};
  }, check:function(q){ var ks=q._ks, nho = q._huong==='ngang' ? q._H : q._W, dd=ks.filter(function(k){ return k===nho; }); return dd.length===1 && ks.indexOf(nho)===q.correct && q.choices[q.correct]===q._dung && new Set(ks).size===ks.length && ks.every(function(k){ return k>=1 && k<=7; }); }},

  /* D10 — Cạnh đối bằng nhau (Luyện tập 1) */
  {name:'Cạnh đối bằng nhau', sec:'Phần 2 — Hình chữ nhật, hình vuông — Luyện tập 1: cạnh đối', mt:['MT4'], levels:3,
   muc:['Biết một cạnh, tìm cạnh đối.', 'Biết hai cạnh kề, tìm một cạnh còn lại.', 'Bốn nhà ở bốn đỉnh: khoảng cách giữa hai nhà ở cạnh nhau.'],
   make:function(lv){
    var a=rnd(8,25), b=rnd(8,25); while(b===a) b=rnd(8,25);
    var cacCap=[['AB','CD'],['BC','DA']], cap=pick(cacCap), cap2=cacCap.filter(function(c){ return c!==cap; })[0], nhan={}, hoi, ans, kieu, cau, sai;
    var gt={AB:a,CD:a,BC:b,DA:b};
    if(lv<=1){ var cd=pick(cap), doi = cd==='AB' ? 'CD' : (cd==='CD' ? 'AB' : (cd==='BC' ? 'DA' : 'BC')); nhan[cd]=gt[cd]+' dm'; hoi=doi; ans=gt[cd]; cau='Hình chữ nhật ABCD có '+cd+' = '+gt[cd]+' dm. Hỏi '+hoi+' dài bao nhiêu đề-xi-mét?'; sai=nhanSai([[gt[cd]+1,'lech-nhom'],[gt[cd]-1,'lech-nhom'],[2*gt[cd],'cong-thay-nhan']], ans); kieu='doi'; }
    else { var c1=pick(['AB','CD']), c2=pick(['BC','DA']); nhan[c1]=gt[c1]+' dm'; nhan[c2]=gt[c2]+' dm'; var hoiCan=pick(['AB','CD','BC','DA'].filter(function(x){ return x!==c1 && x!==c2; })); hoi=hoiCan; ans=gt[hoi];
      if(lv===2) cau='Hình chữ nhật ABCD có '+c1+' = '+gt[c1]+' dm và '+c2+' = '+gt[c2]+' dm. Hỏi '+hoi+' dài bao nhiêu đề-xi-mét?';
      else cau='Bốn bạn ở bốn nhà A, B, C, D là bốn đỉnh của một khu đất hình chữ nhật ABCD. '+c1+' = '+gt[c1]+' dm, '+c2+' = '+gt[c2]+' dm. Nhà ở '+hoi[0]+' cách nhà ở '+hoi[1]+' bao nhiêu đề-xi-mét?';
      var kia = (hoi==='AB'||hoi==='CD') ? gt[c2] : gt[c1]; sai=nhanSai([[kia,'nham-canh-doi'],[gt[c1]+gt[c2],'cong-thay-nhan'],[ans+1,'lech-nhom'],[ans-1,'lech-nhom']], ans); kieu='hai'; }
    return {type:'num', _gt:gt, _nhan:nhan, _hoi:hoi, _kieu:kieu, _e:ans, q:hcnNhan(nhan)+'<div>'+cau+'</div>', ans:ans, unit:'dm', sai:sai,
      goiY:{'nham-canh-doi':'Hai cạnh đối bằng nhau: AB = CD và BC = DA. Cạnh kề thì khác nhau.', 'cong-thay-nhan':'Bài hỏi một cạnh, không phải cộng hai cạnh.', 'lech-nhom':'Bé tìm cạnh đối của cạnh cần hỏi: hai cạnh đối bằng nhau.'}};
  }, check:function(q){ var gt=q._gt, nhan=q._nhan, kc=Object.keys(nhan); if(!(gt.AB===gt.CD && gt.BC===gt.DA && gt.AB!==gt.BC)) return false;
    if(!kc.every(function(c){ return parseInt(nhan[c],10)===gt[c]; })) return false; if(kc.indexOf(q._hoi)>=0) return false;
    if(q._kieu==='doi') return kc.length===1 && q.ans===gt[q._hoi]; return kc.length===2 && q.ans===gt[q._hoi]; }},

  /* D11 — Đường vòng (Luyện tập 2) */
  {name:'Đường vòng', sec:'Phần 2 — Hình chữ nhật, hình vuông — Luyện tập 2: đường vòng', mt:['MT5'], levels:3,
   muc:['CD bằng MN: tìm CD.', 'Đường vòng C–M–N–D dài bao nhiêu km.', 'Đi vòng dài hơn đi thẳng bao nhiêu km.'],
   make:function(lv){
    var cm=rnd(1,3), mn=rnd(2,5); while(mn===cm) mn=rnd(2,5);
    var ans, cau, sai;
    if(lv<=1){ ans=mn; cau='CMND là hình chữ nhật. Đoạn đường CD bị hỏng, người ta đi vòng theo C–M–N–D. Đoạn đường CD dài bao nhiêu ki-lô-mét?'; sai=nhanSai([[cm,'nham-canh-doi'],[cm+mn,'cong-thay-nhan'],[2*cm+mn,'thieu-buoc']], ans); }
    else if(lv===2){ ans=2*cm+mn; cau='CMND là hình chữ nhật. Đoạn đường CD bị hỏng, người ta đi vòng theo C–M–N–D. Đường đi vòng C–M–N–D dài bao nhiêu ki-lô-mét?'; sai=nhanSai([[cm+mn,'thieu-buoc'],[mn,'thieu-buoc'],[2*(cm+mn),'nham-canh-doi'],[cm+mn+cm+1,'lech-nhom']], ans); }
    else { ans=2*cm; cau='CMND là hình chữ nhật. Đi vòng theo C–M–N–D thì dài hơn đi thẳng theo CD bao nhiêu ki-lô-mét?'; sai=nhanSai([[2*cm+mn,'thieu-buoc'],[cm,'thieu-buoc'],[mn,'nham-canh-doi'],[cm+mn,'cong-thay-nhan']], ans); }
    return {type:'num', _cm:cm, _mn:mn, _lv:lv, _e:ans, q:duongVong(cm,mn)+'<div>'+cau+'</div>', ans:ans, unit:'km', sai:sai,
      goiY:{'nham-canh-doi':'CMND là hình chữ nhật: CD = MN và ND = CM (cạnh đối bằng nhau).', 'thieu-buoc':'Đường vòng đi qua ba đoạn: CM, MN, ND, với ND = CM. Muốn biết hơn bao nhiêu thì lấy đường vòng trừ đường thẳng CD.', 'cong-thay-nhan':'Bé xem lại đường đi vòng gồm những đoạn nào.', 'lech-nhom':'Bé cộng đủ ba đoạn CM, MN, ND.'}};
  }, check:function(q){ var cd=q._mn, vong=2*q._cm+q._mn, e = q._lv<=1 ? cd : (q._lv===2 ? vong : vong-cd); return q.ans===e && q.ans===q._e && q._cm!==q._mn && e>=1; }},

  /* D12 — Que tính (Luyện tập 3) */
  {name:'Que tính', sec:'Phần 2 — Hình chữ nhật, hình vuông — Luyện tập 3: xếp hình chữ nhật bằng que tính', mt:['MT5'], levels:3,
   muc:['Hình chữ nhật xếp bằng que: đếm số que.', 'Chọn hình chữ nhật xếp bằng đúng 10 que.', 'Đếm số cách xếp hình chữ nhật có chiều dài khác chiều rộng bằng n que.'],
   make:function(lv){
    if(lv<=1){ var a=rnd(2,4), b=rnd(1,2); if(b>=a) b=a-1; var n=2*(a+b);
      return {type:'num', _a:a, _b:b, _kieu:'dem', _e:n, q:queTinh(a,b)+'<div>Hình chữ nhật xếp bằng que tính như hình. Hình dùng bao nhiêu que tính?</div>', ans:n, unit:'que',
        sai:nhanSai([[a+b,'lech-nhom'],[2*a,'dem-sot-hinh'],[n+2,'dem-sot-hinh'],[n-2,'dem-sot-hinh']], n), goiY:{'lech-nhom':'Hình có 2 cạnh dài và 2 cạnh ngắn: bé cộng số que của cả bốn cạnh.', 'dem-sot-hinh':'Bé đếm từng que trên cả bốn cạnh.'}}; }
    if(lv===2){ var sai={};
      var ps=[[4,1],[3,2],[3,1],[4,2],[5,1],[5,2]], dung=pick([[4,1],[3,2]]), nhieu=shuffle(ps.filter(function(p){ return 2*(p[0]+p[1])!==10; })).slice(0,2);
      var codes=shuffle([dung.join('x')].concat(nhieu.map(function(p){ return p.join('x'); })));
      codes.forEach(function(c,i){ var p=c.split('x').map(Number); if(2*(p[0]+p[1])!==10) sai[String(i)]='lech-nhom'; });
      return {type:'mcq', cot:1, figFn:function(c){ var p=c.split('x').map(Number); return queTinh(p[0],p[1],150); }, _codes:codes, _dung:dung.join('x'), q:'<div>Hình nào xếp bằng đúng <b>10 que tính</b>?</div>', choices:codes, correct:codes.indexOf(dung.join('x')), sai:sai,
        goiY:{'lech-nhom':'Bé đếm số que của cả bốn cạnh của từng hình, rồi so với 10.'}}; }
    var nn=pick([10,14,18]), ans=soCach(nn);
    return {type:'num', _n:nn, _kieu:'cach', _e:ans, q:'<div class="text-lg font-bold text-slate-700 my-1">Có '+nn+' que tính. Em xếp các que thành một hình chữ nhật có <b>chiều dài khác chiều rộng</b>, dùng hết '+nn+' que. Mỗi cạnh của hình là một hàng que nối liền nhau.</div><div>Có bao nhiêu cách xếp khác nhau? (Chiều dài lớn hơn chiều rộng; mỗi cạnh dùng ít nhất 1 que.)</div>', ans:ans, unit:'cách',
      sai:nhanSai([[ans+1,'dem-sot-hinh'],[ans-1,'dem-sot-hinh'],[nn/2,'lech-nhom'],[ans+2,'dem-sot-hinh']], ans), goiY:{'dem-sot-hinh':'Nửa số que là tổng chiều dài và chiều rộng. Bé liệt kê các cặp (dài, rộng) có tổng bằng nửa số que, dài lớn hơn rộng.', 'lech-nhom':'Nửa số que là tổng của chiều dài và chiều rộng, không phải số cách.'}};
  }, check:function(q){ if(q._kieu==='dem') return q.ans===2*(q._a+q._b) && q._a>q._b && demDem(q.q,'que')===q.ans;
    if(q._kieu==='cach'){ var c=0, d, r, nua=q._n/2; for(r=1;r<nua-r;r++) c++; return q._n%4===2 && q.ans===c && q.ans===q._e && c>=2; }
    var hop=q.choices.filter(function(c){ var p=c.split('x').map(Number); return p[0]>p[1] && 2*(p[0]+p[1])===10 && demDem(queTinh(p[0],p[1]),'que')===10; }); return hop.length===1 && hop[0]===q._dung && kiemMCQ(q); }},

  /* D13 — Tìm lỗi (không có trong SGK). Lời đề: "Bạn An nói: «…». Em thấy thế nào?" — lựa chọn "Đồng ý, vì…" / "Không đồng ý, vì…" */
  {name:'Tìm lỗi', sec:'Phần 2 — Hình chữ nhật, hình vuông — Tìm lỗi: bạn nói đúng hay sai?', mt:['MT3'], levels:3,
   muc:['Mệnh đề về hình thoi, hình thang: đúng hay sai.', 'Hình bình hành, hình chữ nhật đứng hẹp.', 'Bạn An nói; em đồng ý hay không đồng ý, vì sao.'],
   make:function(lv){
    var n=6, kinds=[['thoi','Hình thoi có 4 cạnh bằng nhau nên là hình vuông.',MAU_LUOI.thoi(1),'nham-thoi-vuong','hình thoi không có 4 góc vuông'],['bh','Hình bình hành có các cạnh đối bằng nhau nên là hình chữ nhật.',MAU_LUOI.bh(),'nham-hv-hcn','hình bình hành không có 4 góc vuông'],['thang','Hình thang có 4 cạnh nên là hình chữ nhật.',MAU_LUOI.thang(),'nham-hv-hcn','hình thang không có 4 góc vuông']], kd=pick(kinds), P=datLuoi(kd[2], n, false, false), hinh=luoiHinh([P],n,22,{}), sai={};
    if(lv<=2){ var dungMD=Math.random()<0.25, cau, PP, hh, dung;
      if(dungMD){ var r=rnd(3,4), Pv=datLuoi(MAU_LUOI.hv(r), n, false, false); cau='Hình trên là hình vuông vì có 4 cạnh bằng nhau và 4 góc vuông.'; return {type:'mcq', figFn:dsBtn19, _polys:[Pv], _lv:lv, _kieu:'ds', _want:'hv', _dung:'Đ', q:luoiHinh([Pv],n,22,{})+'<div class="text-xl font-extrabold text-orange-700 my-1">'+cau+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:0, sai:{}, goiY:{'chung':'Hình có 4 góc vuông và 4 cạnh bằng nhau là hình vuông.'}}; }
      return {type:'mcq', figFn:dsBtn19, _polys:[P], _lv:lv, _kieu:'ds', _want:kd[0], _dung:'S', q:hinh+'<div class="text-xl font-extrabold text-orange-700 my-1">'+kd[1].replace('nên là','nên là')+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:1, sai:{'0':kd[3]}, goiY:{'nham-thoi-vuong':'Hình thoi có 4 cạnh bằng nhau nhưng không có 4 góc vuông. Bé dùng ê ke thử.', 'nham-hv-hcn':'Hình chữ nhật phải có 4 góc vuông. Bé dùng ê ke thử các góc.', 'chung':'Bé xem hình có 4 góc vuông không.'}}; }
    var dungC='Không đồng ý, vì '+kd[4]+'.', ch=shuffle([dungC, 'Đồng ý, vì '+(kd[0]==='thoi'?'hình thoi có 4 cạnh bằng nhau':'hình này có 4 cạnh')+'.', 'Không đồng ý, vì hình này chỉ có 3 cạnh.']);
    ch.forEach(function(c,i){ if(c!==dungC) sai[String(i)] = c.indexOf('Đồng ý')===0 ? kd[3] : 'lech-nhom'; });
    return {type:'mcq', cot:1, _polys:[P], _lv:3, _kieu:'ly', _want:kd[0], _dung:dungC, q:hinh+'<div class="text-lg font-bold text-slate-700 my-1">Bạn An nói: «'+kd[1]+'»</div><div>Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dungC), sai:sai,
      goiY:{'nham-thoi-vuong':'Hình thoi có 4 cạnh bằng nhau nhưng KHÔNG có 4 góc vuông.', 'nham-hv-hcn':'Hình chữ nhật phải có 4 góc vuông.', 'lech-nhom':'Bé dùng ê ke thử các góc của hình.'}};
  }, check:function(q){ var P=q._polys[0], k=phanLoai4(P);
    if(q._kieu==='ds'){ var t = q._want==='hv' ? (k==='hv') : false; return q.choices.join()==='Đ,S' && (q._dung==='Đ')===t && q.correct===(t?0:1) && (q._want==='hv' ? k==='hv' : k===q._want); }
    return k===q._want && k!=='hv' && k!=='hcn' && kiemMCQ(q); }}
 ]
};
