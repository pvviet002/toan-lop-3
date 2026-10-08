/* bai-16.js — Bài 16: Điểm ở giữa, trung điểm của đoạn thẳng. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH ngay từ đầu.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-16.md) và chỉnh sửa của thầy trên PR:
   5 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Thao tác thước / gập dây của sách đổi thành chọn hoặc điền số. Mọi số đo do mã tính từ toạ độ và khớp hình;
   check() tính lại thẳng hàng / ở giữa / trung điểm từ toạ độ chứ không tin nhãn. Không số thập phân: mọi phép chia đôi chia hết.
   Đoạn thẳng LUÔN có trung điểm: câu hỏi cào cào hỏi "có nhảy tới ĐÚNG trung điểm được không" (số ô chẵn hay lẻ), không hỏi "có trung điểm không".
   Hình mới viết ngay trong file này (không sửa figures.js): duongThang, gapKhuc, luoiDiem, thuocCm, thanhChiaO, dayGap.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn16(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h){ return svgHinh(w, h).replace('<svg ', '<svg class="text-slate-700" '); }
var CHU=['A','B','C','D','E','H','K','M','N','P'];
function ten(k){ return shuffle(CHU.slice()).slice(0,k); }

/* ---- Hình học trên toạ độ nguyên (đơn vị cm hoặc ô) ---- */
function cross(a,b,c){ return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]); }
function thangHang(a,b,c){ return cross(a,b,c)===0; }
function giuaDiem(p,a,b){ return cross(a,b,p)===0 && ((p[0]-a[0])*(p[0]-b[0])+(p[1]-a[1])*(p[1]-b[1]))<0; }
function laTrungDiem(m,a,b){ return m[0]*2===a[0]+b[0] && m[1]*2===a[1]+b[1]; }
function ptOf(P, t){ for(var i=0;i<P.length;i++) if(P[i].t===t) return [P[i].x, P[i].y||0]; return null; }

/* ---- Hình mới 1: đường thẳng có các điểm, nhãn cm giữa hai điểm liền kề (trên đường). pts = [{t, x, y}] y=1: điểm ngoài đường ---- */
function duongThang(pts, hienCm){
  var on=pts.filter(function(p){ return !p.y; }).sort(function(a,b){ return a.x-b.x; }), mn=Math.min.apply(null, pts.map(function(p){ return p.x; })), mx=Math.max.apply(null, pts.map(function(p){ return p.x; })), span=Math.max(1, mx-mn);
  var sc=Math.min(40, 250/span), tot=span*sc, x0=(300-tot)/2, s=svgX(300, 142), i;
  function X(v){ return x0+(v-mn)*sc; }
  s+='<line x1="'+(X(on[0].x)-18).toFixed(1)+'" y1="62" x2="'+(X(on[on.length-1].x)+18).toFixed(1)+'" y2="62" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
  var chen = false; for(i=0;i+1<on.length;i++) if((on[i+1].x-on[i].x)*sc<56) chen=true;
  if(hienCm) for(i=0;i+1<on.length;i++){ var cx=(X(on[i].x)+X(on[i+1].x))/2, cy = 96+(chen ? (i%2)*26 : 0);
    s+='<path d="M'+X(on[i].x).toFixed(1)+' 72 L'+X(on[i].x).toFixed(1)+' '+(cy-12)+' M'+X(on[i+1].x).toFixed(1)+' 72 L'+X(on[i+1].x).toFixed(1)+' '+(cy-12)+'" stroke="'+HM.day+'" stroke-width="1.5" fill="none" stroke-dasharray="3 3"/>'
     +nhanVien(cx.toFixed(1), cy, 56, 24, (on[i+1].x-on[i].x)+' cm', 16); }
  pts.forEach(function(p){ var px=X(p.x), py = p.y ? 38 : 62;
    s+='<circle cx="'+px.toFixed(1)+'" cy="'+py+'" r="7" fill="'+HM.cam+'"/><text x="'+px.toFixed(1)+'" y="'+(py-14)+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+p.t+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}

/* ---- Hình mới 2: đường gấp khúc A–M–B nối B–N–C (SGK Hoạt động 1). cong = true: B–N–C lệch hướng.
   Khung SVG tự tính từ toạ độ các điểm và nhãn cm nên không có nhãn nào tràn ra ngoài. ---- */
function gapKhuc(am, mb, bn, nc, cong){
  var u=22, ang=(cong ? -40 : 0)*Math.PI/180, c0=Math.cos(ang), s0=Math.sin(ang), R=Math.round;
  var A=[0,0], M=[am*u,0], B=[(am+mb)*u,0], N=[B[0]+bn*u*c0, B[1]+bn*u*s0], C=[B[0]+(bn+nc)*u*c0, B[1]+(bn+nc)*u*s0], pills=[], xs=[], ys=[];
  pills.push({x:(A[0]+M[0])/2, y:26, t:am}, {x:(M[0]+B[0])/2, y:26, t:mb});
  if(cong){ var nx=-s0, ny=c0; pills.push({x:(B[0]+N[0])/2+nx*24, y:(B[1]+N[1])/2+ny*24, t:bn}, {x:(N[0]+C[0])/2+nx*24, y:(N[1]+C[1])/2+ny*24, t:nc}); }
  else pills.push({x:(B[0]+N[0])/2, y:26, t:bn}, {x:(N[0]+C[0])/2, y:26, t:nc});
  [A,M,B,N,C].forEach(function(p){ xs.push(p[0]-12, p[0]+12); ys.push(p[1]-36, p[1]+10); });
  pills.forEach(function(p){ xs.push(p.x-23, p.x+23); ys.push(p.y-13, p.y+13); });
  var x0=Math.min.apply(null, xs), y0=Math.min.apply(null, ys), W=Math.ceil(Math.max.apply(null, xs)-x0), H=Math.ceil(Math.max.apply(null, ys)-y0), s=svgX(W, H)+'<g transform="translate('+R(-x0)+','+R(-y0)+')">';
  s+='<path d="M'+A[0]+' '+A[1]+' L'+R(B[0])+' '+B[1]+' L'+R(C[0])+' '+R(C[1])+'" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  function diem(p, t, dx, dy){ return '<circle cx="'+R(p[0])+'" cy="'+R(p[1])+'" r="7" fill="'+HM.cam+'"/><text x="'+R(p[0]+dx)+'" y="'+R(p[1]+dy)+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+t+'</text>'; }
  pills.forEach(function(p){ s+=nhanVien(R(p.x), R(p.y), 42, 22, p.t+' cm', 15); });
  s+=diem(A,'A',0,-14)+diem(M,'M',0,-14)+diem(B,'B',0,-14)+diem(N,'N',-2,-14)+diem(C,'C',0,-14);
  return '<div class="flex justify-center my-2">'+s+'</g></svg></div>';
}

/* ---- Hình mới 3: lưới ô vuông w × h; điểm có nhãn chữ ở giao điểm; vài đoạn nối. pts = [{t, x, y}], segs = [[tên, tên]] ---- */
function luoiDiem(w, h, pts, segs){
  var o=28, m=32, W=w*o+2*m, H=h*o+2*m, s=svgX(W, H), i;
  for(i=0;i<=w;i++) s+='<line x1="'+(m+i*o)+'" y1="'+m+'" x2="'+(m+i*o)+'" y2="'+(m+h*o)+'" stroke="'+HM.day+'" stroke-width="1.5"/>';
  for(i=0;i<=h;i++) s+='<line x1="'+m+'" y1="'+(m+i*o)+'" x2="'+(m+w*o)+'" y2="'+(m+i*o)+'" stroke="'+HM.day+'" stroke-width="1.5"/>';
  function P(t){ for(var k=0;k<pts.length;k++) if(pts[k].t===t) return pts[k]; return null; }
  (segs||[]).forEach(function(g){ var a=P(g[0]), b=P(g[1]); s+='<line x1="'+(m+a.x*o)+'" y1="'+(m+a.y*o)+'" x2="'+(m+b.x*o)+'" y2="'+(m+b.y*o)+'" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'; });
  pts.forEach(function(p){ var cx=m+p.x*o, cy=m+p.y*o, dx = p.x>=w ? -13 : 13, dy = p.y<=0 ? -12 : (p.y>=h ? 24 : -9), an = p.x>=w ? 'end' : 'start';
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="6" fill="'+HM.cam+'"/><text x="'+(cx+dx)+'" y="'+(cy+dy)+'" text-anchor="'+an+'" font-size="18" '+HFONT+' fill="currentColor">'+p.t+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}

/* ---- Hình mới 4: thước chia cm từ vạch dau đến vạch cuoi; các điểm đặt đúng vạch ---- */
function thuocCm(pts, dau, cuoi){
  var n=cuoi-dau, sc=Math.min(36, 270/n), x0=(300-n*sc)/2, s=svgX(300, 104), buoc = sc*1>=28 ? 1 : 2, i;
  s+='<rect x="'+(x0-6)+'" y="52" width="'+(n*sc+12)+'" height="40" rx="8" fill="'+HM.vang+'"/>';
  for(i=0;i<=n;i++){ var x=x0+i*sc, lon=(i%buoc===0);
    s+='<line x1="'+x.toFixed(1)+'" y1="52" x2="'+x.toFixed(1)+'" y2="'+(lon?70:63)+'" stroke="'+HM.chu+'" stroke-width="2"/>';
    if(lon) s+='<text x="'+x.toFixed(1)+'" y="86" text-anchor="middle" font-size="14" '+HFONT+' fill="'+HM.chu+'">'+(dau+i)+'</text>'; }
  pts.forEach(function(p){ var x=x0+(p.v-dau)*sc;
    s+='<path d="M'+(x-7).toFixed(1)+' 34 L'+(x+7).toFixed(1)+' 34 L'+x.toFixed(1)+' 50 Z" fill="'+HM.cam+'"/><text x="'+x.toFixed(1)+'" y="26" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+p.t+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}

/* ---- Hình mới 5: thanh chia n ô đều từ A đến B; ghim chữ ở các vạch; cào cào ở vạch cao (vẽ đơn giản: thân + hai mắt) ---- */
function thanhChiaO(n, ghim, cao){
  var W=300, x0=20, sc=(W-2*x0)/n, s=svgX(W, 110), i;
  for(i=0;i<n;i++) s+='<rect x="'+(x0+i*sc).toFixed(1)+'" y="56" width="'+sc.toFixed(1)+'" height="30" fill="'+(i%2?HM.goNhat:HM.vang)+'"/>';
  s+='<text x="'+x0+'" y="106" text-anchor="middle" font-size="18" '+HFONT+' fill="currentColor">A</text><text x="'+(x0+n*sc)+'" y="106" text-anchor="middle" font-size="18" '+HFONT+' fill="currentColor">B</text>';
  (ghim||[]).forEach(function(g){ var x=x0+g.v*sc; s+='<path d="M'+(x-6).toFixed(1)+' 38 L'+(x+6).toFixed(1)+' 38 L'+x.toFixed(1)+' 54 Z" fill="'+HM.cam+'"/><text x="'+x.toFixed(1)+'" y="30" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+g.t+'</text>'; });
  if(cao!==undefined && cao!==null){ var cx=x0+cao*sc;
    s+='<ellipse cx="'+cx.toFixed(1)+'" cy="44" rx="14" ry="9" fill="'+HM.xanhLa+'"/><circle cx="'+(cx+9).toFixed(1)+'" cy="38" r="5" fill="'+HM.xanhLa+'"/><circle cx="'+(cx+11).toFixed(1)+'" cy="37" r="2.2" fill="#fff"/>'
     +'<path d="M'+(cx-12).toFixed(1)+' 49 L'+(cx-18).toFixed(1)+' 56 M'+(cx+2).toFixed(1)+' 51 L'+(cx+4).toFixed(1)+' 56" stroke="'+HM.xanhLa+'" stroke-width="3" stroke-linecap="round" fill="none"/>'; }
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}

/* ---- Hình mới 6: sợi dây thẳng dài dai cm, không có vạch cm ---- */
function dayGap(dai){
  var s=svgX(300, 70);
  s+='<path d="M24 36 C80 22 130 50 180 36 S250 24 276 36" stroke="'+HM.go+'" stroke-width="7" stroke-linecap="round" fill="none"/>'
   +'<path d="M24 52 L276 52 M24 46 L24 58 M276 46 L276 58" stroke="currentColor" stroke-width="2" fill="none"/>'+nhanVien(150, 60, 70, 24, dai+' cm', 16);
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}

var BAI = {
 n: 16,
 title: 'Điểm Ở Giữa, Trung Điểm Của Đoạn Thẳng',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-giua-trung-diem':'Nhầm "ở giữa" với "trung điểm"', 'khong-thang-hang':'Quên kiểm tra ba điểm có thẳng hàng không',
       'chia-doi-sai':'Nhầm khi chia đôi độ dài', 'doc-sai-thuoc':'Đọc sai vạch trên thước'},
 muctieu: [
  {id:'MT1', ten:'Thẳng hàng và điểm ở giữa', muc:['Nhận ra điểm ở giữa của ba điểm thẳng hàng trên một đường thẳng, có nhãn độ dài.', 'Tìm ba điểm thẳng hàng trên lưới; nói đúng điểm ở giữa hai điểm nào.', 'Ba điểm KHÔNG thẳng hàng thì không có điểm "ở giữa" (bẫy).']},
  {id:'MT2', ten:'Trung điểm của đoạn thẳng', muc:['Nhận ra trung điểm khi hai đoạn bằng nhau.', 'Tính độ dài khi biết trung điểm; chọn điểm là trung điểm.', 'Chọn đoạn thẳng nhận H làm trung điểm; tính độ dài hai bước.']},
  {id:'MT3', ten:'Phân biệt ở giữa và trung điểm', muc:['Đ hay S: điểm ở giữa nhưng hai đoạn không bằng nhau.', 'Đ hay S: nhận ra điểm không thẳng hàng; ở giữa nhưng không là trung điểm.', 'Tìm lỗi của bạn: chọn lý do vì sao sai.']},
  {id:'MT4', ten:'Trung điểm trên lưới và thước', muc:['Đọc vạch trên thước cm: M có ở chính giữa A và B không.', 'Trên lưới: đếm ô để tìm trung điểm của đoạn nằm ngang hoặc thẳng đứng; có điểm nhiễu.', 'Thước không bắt đầu từ 0; điểm nhiễu sát trung điểm; cánh diều.']},
  {id:'MT5', ten:'Vận dụng', muc:['Cào cào nhảy bước đều: chọn vị trí trung điểm; gập đôi dây để lấy nửa độ dài.', 'Cào cào đã nhảy vài bước: cần nhảy thêm mấy bước tới trung điểm; gập dây khác.', 'Cào cào có nhảy tới ĐÚNG trung điểm được không (số ô chẵn hay lẻ); gập đôi hai lần để lấy một phần tư.']}
 ],
 topics: [
  /* D1 — Điểm ở giữa (Khám phá a) */
  {name:'Điểm ở giữa', sec:'Khám phá a — Điểm ở giữa', mt:['MT1'], levels:3,
   muc:['Ba điểm thẳng hàng có nhãn độ dài, chọn điểm ở giữa.', 'Tên điểm bị đổi chỗ, chọn điểm ở giữa.', 'Có điểm ngoài đường thẳng và điểm nằm ngoài đoạn (bẫy).'],
   make:function(lv){
    var nm=ten(4), g1=rnd(2,3), g2=rnd(2,3), g3=rnd(2,3), p;
    if(lv<=2){ var ns = lv<=1 ? nm.slice(0,3).sort() : nm.slice(0,3), pts=[{t:ns[0],x:0},{t:ns[1],x:g1},{t:ns[2],x:g1+g2}], ch=ns.slice(), dung=ns[1];
      var sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='lech-nhom'; });
      return {type:'mcq', _pts:pts, _dung:dung, q:duongThang(pts,true)+'<div>Ba điểm '+ns[0]+', '+ns[1]+', '+ns[2]+' thẳng hàng. Điểm nào ở giữa hai điểm còn lại?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'lech-nhom':'Điểm ở giữa nằm giữa hai điểm kia trên đường thẳng. Bé nhìn thứ tự các điểm.'}}; }
    var a=nm[0], b=nm[1], c=nm[2], f=nm[3], pts3=[{t:a,x:0},{t:b,x:g1},{t:c,x:g1+g2},{t:f,x:g1+g2+g3},{t:'D',x:1,y:1}];
    if(nm.indexOf('D')>=0) pts3[4].t='K'; var dn=pts3[4].t;
    if([a,b,c,f].indexOf(dn)>=0){ pts3[4].t = ['E','H','M','N','P'].filter(function(x){ return [a,b,c,f].indexOf(x)<0; })[0]; dn=pts3[4].t; }
    var ch3=shuffle([b, dn, f]), sai3={}; ch3.forEach(function(x,i){ if(x===dn) sai3[String(i)]='khong-thang-hang'; else if(x===f) sai3[String(i)]='lech-nhom'; });
    return {type:'mcq', _pts:pts3, _a:a, _c:c, _dung:b, q:duongThang(pts3,true)+'<div>Điểm nào ở giữa hai điểm '+a+' và '+c+'?</div>', choices:ch3, correct:ch3.indexOf(b), sai:sai3,
      goiY:{'khong-thang-hang':'Điểm '+dn+' không nằm trên đường thẳng, nên không ở giữa.', 'lech-nhom':'Điểm '+f+' nằm ngoài đoạn '+a+c+', không ở giữa '+a+' và '+c+'.'}};
  }, check:function(q){ var P=q._pts, ds;
    if(q._a){ var A=ptOf(P,q._a), C=ptOf(P,q._c); ds=q.choices.filter(function(t){ return giuaDiem(ptOf(P,t),A,C); }); return ds.length===1 && ds[0]===q._dung && kiemMCQ(q); }
    var T=q.choices.map(function(t){ return ptOf(P,t); }); ds=q.choices.filter(function(t,i){ var o=T.filter(function(_,j){ return j!==i; }); return giuaDiem(T[i], o[0], o[1]); }); return ds.length===1 && ds[0]===q._dung && kiemMCQ(q); }},

  /* D2 — Trung điểm (Khám phá b) */
  {name:'Trung điểm', sec:'Khám phá b — Trung điểm của đoạn thẳng', mt:['MT2'], levels:3,
   muc:['H ở giữa D và E, DH = HE: H là trung điểm của đoạn nào.', 'Chọn điểm là trung điểm của đoạn DE trong các điểm.', 'DH khác HE: chọn đoạn nhận H làm trung điểm.'],
   make:function(lv){
    var nm=ten(4), h=rnd(2,4), D=nm[0], H=nm[1], E=nm[2], F=nm[3];
    if(lv<=1){ var pts=[{t:D,x:0},{t:H,x:h},{t:E,x:2*h}], ch=[D+E, D+H, H+E], dung=D+E, sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='lech-nhom'; }); shuffle(ch);
      sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='lech-nhom'; });
      return {type:'mcq', _pts:pts, _H:H, _dung:dung, q:duongThang(pts,true)+'<div>Điểm '+H+' là trung điểm của đoạn thẳng nào?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'lech-nhom':'Trung điểm ở giữa hai đầu của đoạn VÀ cách đều hai đầu: '+D+H+' = '+H+E+'.'}}; }
    if(lv===2){ var Q=h, Pp, pts2; do { Pp=rnd(1,2*h-1); } while(Pp===Q); pts2=[{t:D,x:0},{t:H,x:Pp},{t:F,x:Q},{t:E,x:2*h},{t:nm[3]==='K'?'M':'K',x:1,y:1}];
      var r=pts2[4].t; if([D,H,E,F].indexOf(r)>=0){ r=['N','P','A','B','C'].filter(function(x){ return [D,H,E,F].indexOf(x)<0; })[0]; pts2[4].t=r; }
      var ch2=shuffle([H, F, r]), sai2={}; ch2.forEach(function(x,i){ if(x===H) sai2[String(i)]='nham-giua-trung-diem'; else if(x===r) sai2[String(i)]='khong-thang-hang'; });
      return {type:'mcq', _pts:pts2, _D:D, _E:E, _dung:F, q:duongThang(pts2,true)+'<div>Điểm nào là trung điểm của đoạn thẳng '+D+E+'?</div>', choices:ch2, correct:ch2.indexOf(F), sai:sai2,
        goiY:{'nham-giua-trung-diem':'Điểm '+H+' ở giữa '+D+' và '+E+' nhưng hai đoạn không bằng nhau, nên chưa là trung điểm.', 'khong-thang-hang':'Điểm '+r+' không nằm trên đoạn '+D+E+'.'}}; }
    var g=rnd(2,3), pts3=[{t:D,x:0},{t:H,x:h},{t:E,x:2*h},{t:F,x:2*h+g}], ch3=[D+E, D+F, E+F], dung3=D+E, sai3={}; shuffle(ch3); ch3.forEach(function(c,i){ if(c!==dung3) sai3[String(i)]='nham-giua-trung-diem'; });
    return {type:'mcq', _pts:pts3, _H:H, _dung:dung3, q:duongThang(pts3,true)+'<div>Điểm '+H+' là trung điểm của đoạn thẳng nào?</div>', choices:ch3, correct:ch3.indexOf(dung3), sai:sai3,
      goiY:{'nham-giua-trung-diem':'Điểm '+H+' có thể ở giữa mà hai đoạn không bằng nhau. Bé so hai độ dài từ '+H+' tới hai đầu.'}};
  }, check:function(q){ var P=q._pts, c;
    if(q._H){ var Hh=ptOf(P,q._H); c=q.choices.filter(function(s){ return laTrungDiem(Hh, ptOf(P,s[0]), ptOf(P,s[1])); }); return c.length===1 && c[0]===q._dung && kiemMCQ(q); }
    var A=ptOf(P,q._D), B=ptOf(P,q._E); c=q.choices.filter(function(t){ return laTrungDiem(ptOf(P,t),A,B); }); return c.length===1 && c[0]===q._dung && kiemMCQ(q); }},

  /* D3 — Đ, S trên đường gấp khúc (Hoạt động 1) */
  {name:'Đ/S gấp khúc', sec:'Hoạt động 1 — Đ, S? (đường gấp khúc)', mt:['MT3'], levels:3,
   muc:['Đ hay S: điểm ở giữa hai đoạn bằng nhau hoặc không bằng nhau.', 'Đ hay S: bẫy ba điểm không thẳng hàng.', 'Đ hay S: ở giữa nhưng không là trung điểm.'],
   make:function(lv){
    var am=rnd(2,3), mb = Math.random()<0.5 ? am : (5-am), cong = lv>=2, bn=rnd(2,cong?4:3), nc = lv>=3 ? (bn===2 ? 3 : (bn===4 ? 3 : bn+pick([-1,1]))) : rnd(2,cong?4:3), loai;
    loai = lv<=1 ? pick(['mAB','nGiua']) : (lv===2 ? pick(['bGiua','mAB','nGiua']) : pick(['nTrung','nGiua','mAB']));
    var cau, dung;
    if(loai==='mAB'){ cau='M là trung điểm của đoạn thẳng AB'; dung=(am===mb); }
    else if(loai==='nGiua'){ cau='N ở giữa hai điểm B và C'; dung=true; }
    else if(loai==='nTrung'){ cau='N là trung điểm của đoạn thẳng BC'; dung=(bn===nc); }
    else { cau='B ở giữa hai điểm M và N'; dung=!cong; }
    var lab = dung ? {} : {'0': (loai==='bGiua' ? 'khong-thang-hang' : 'nham-giua-trung-diem')};
    return {type:'mcq', figFn:dsBtn16, _am:am, _mb:mb, _bn:bn, _nc:nc, _cong:cong, _loai:loai, _dung:(dung?'Đ':'S'), q:gapKhuc(am,mb,bn,nc,cong)+'<div class="text-xl font-extrabold text-orange-700 my-2">'+cau+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(dung?0:1), sai:lab,
      goiY:{'khong-thang-hang':'Ba điểm M, B, N không nằm trên một đường thẳng nên B không ở giữa M và N.', 'nham-giua-trung-diem':'Trung điểm phải ở giữa VÀ hai đoạn bằng nhau. Bé so hai độ dài.', 'chung':'Bé xem ba điểm có thẳng hàng không, rồi so hai độ dài.'}};
  }, check:function(q){ var t = q._loai==='mAB' ? q._am===q._mb : (q._loai==='nGiua' ? true : (q._loai==='nTrung' ? q._bn===q._nc : !q._cong)); return q._dung===(t?'Đ':'S') && q.correct===(t?0:1) && q.choices.join()==='Đ,S'; }},

  /* D4 — Ba điểm thẳng hàng trên lưới (Hoạt động 2: hình chữ H) */
  {name:'Thẳng hàng trên lưới', sec:'Hoạt động 2 — Ba điểm thẳng hàng trên lưới', mt:['MT1'], levels:3,
   muc:['Chọn ba điểm thẳng hàng trên hình chữ H.', 'Điểm H ở giữa hai điểm nào.', 'Chọn bộ ba KHÔNG thẳng hàng.'],
   make:function(lv){
    var hv=rnd(2,3), hw=rnd(2,3), nm=['A','H','B','C','K','D','M'], W=2*hw+2, Hh=2*hv;
    var pts=[{t:'A',x:1,y:0},{t:'H',x:1,y:hv},{t:'B',x:1,y:2*hv},{t:'C',x:1+2*hw,y:0},{t:'K',x:1+2*hw,y:hv},{t:'D',x:1+2*hw,y:2*hv},{t:'M',x:1+hw,y:hv}], segs=[['A','B'],['C','D'],['H','K']];
    function P(t){ for(var i=0;i<pts.length;i++) if(pts[i].t===t) return [pts[i].x, pts[i].y]; }
    var tri=[['A','H','B'],['C','K','D'],['H','M','K']], non=[['A','H','M'],['B','H','M'],['C','K','M'],['D','K','M'],['A','H','K'],['B','K','M']];
    function bien(t){ return t.join(', '); }
    var hinh=luoiDiem(W, Hh, pts, segs);
    if(lv<=1){ var d=pick(tri), ds=shuffle(non.slice()).slice(0,2), ch=shuffle([bien(d), bien(ds[0]), bien(ds[1])]);
      return {type:'mcq', _pts:pts, _dung:bien(d), q:hinh+'<div>Ba điểm nào thẳng hàng?</div>', choices:ch, correct:ch.indexOf(bien(d)), cot:1, sai:(function(){ var o={}; ch.forEach(function(c,i){ if(c!==bien(d)) o[String(i)]='khong-thang-hang'; }); return o; })(),
        goiY:{'khong-thang-hang':'Ba điểm thẳng hàng cùng nằm trên một đường thẳng. Bé kiểm tra nét thẳng nối ba điểm.'}}; }
    if(lv===2){ var cases=[['H','A','B'],['K','C','D'],['M','H','K']], cs=pick(cases), mid=cs[0], ext=[cs[1],cs[2]], dis=[[cs[1], 'M'],[ 'H','K'].filter(function(x){ return x!==mid; }).concat(['D'])];
      var op=[ext.join(' và '), (mid==='M' ? 'A và B' : 'M và '+ext[0]), (mid==='M' ? 'C và D' : ext[0]+' và K')]; op=op.filter(function(x,i,a){ return a.indexOf(x)===i; });
      var cc=shuffle(op), dung2=ext.join(' và ');
      return {type:'mcq', _pts:pts, _mid:mid, _ext:ext, _dung:dung2, q:hinh+'<div>Điểm '+mid+' ở giữa hai điểm nào?</div>', choices:cc, correct:cc.indexOf(dung2), cot:1, sai:(function(){ var o={}; cc.forEach(function(c,i){ if(c!==dung2) o[String(i)]='khong-thang-hang'; }); return o; })(),
        goiY:{'khong-thang-hang':'Điểm ở giữa phải cùng nằm trên một đường thẳng với hai điểm kia.'}}; }
    var nd=pick(non), sa=shuffle(tri.slice()).slice(0,2), ch3=shuffle([bien(nd), bien(sa[0]), bien(sa[1])]);
    return {type:'mcq', _pts:pts, _dung:bien(nd), _khong:true, q:hinh+'<div>Ba điểm nào <b>KHÔNG</b> thẳng hàng?</div>', choices:ch3, correct:ch3.indexOf(bien(nd)), cot:1, sai:(function(){ var o={}; ch3.forEach(function(c,i){ if(c!==bien(nd)) o[String(i)]='lech-nhom'; }); return o; })(),
      goiY:{'lech-nhom':'Bé tìm bộ ba KHÔNG thẳng hàng. Hai bộ kia cùng nằm trên một nét thẳng.'}};
  }, check:function(q){ var P=q._pts;
    function bo(c){ var t=c.split(', ').map(function(x){ return ptOf(P,x); }); return thangHang(t[0],t[1],t[2]); }
    if(q._mid){ var M=ptOf(P,q._mid); var okc=q.choices.filter(function(c){ var t=c.split(' và ').map(function(x){ return ptOf(P,x); }); return giuaDiem(M,t[0],t[1]); }); return okc.length===1 && okc[0]===q._dung && kiemMCQ(q); }
    var n=q.choices.filter(function(c){ return bo(c); }).length; return q._khong ? (n===2 && !bo(q._dung) && kiemMCQ(q)) : (n===1 && bo(q._dung) && kiemMCQ(q)); }},

  /* D5 — Trung điểm trên lưới (Hoạt động 3, Luyện tập 2) */
  {name:'Trung điểm trên lưới', sec:'Hoạt động 3, Luyện tập 2 — Trung điểm trên lưới', mt:['MT4'], levels:3,
   muc:['Đoạn nằm ngang, đếm ô, một điểm nhiễu.', 'Đoạn nằm ngang hoặc thẳng đứng, nhiều điểm nhiễu.', 'Hình cánh diều: O là trung điểm của đoạn nào.'],
   make:function(lv){
    var nm=ten(5);
    if(lv<=2){ var half=rnd(2,4), ng = lv<=1 ? true : Math.random()<0.5, W = ng ? 2*half+2 : 4, H = ng ? 3 : 2*half+2, M=nm[0], N=nm[1], T=nm[2], X=nm[3], Y=nm[4], pts=[], k;
      if(ng){ pts=[{t:M,x:1,y:1},{t:N,x:1+2*half,y:1},{t:T,x:1+half,y:1},{t:X,x:Math.max(2,1+half-1),y:1}]; if(lv>=2) pts.push({t:Y,x:Math.min(2*half,1+half+1),y:1}); }
      else { pts=[{t:M,x:2,y:1},{t:N,x:2,y:1+2*half},{t:T,x:2,y:1+half},{t:X,x:2,y:1+half-1}]; if(lv>=2) pts.push({t:Y,x:2,y:1+half+1}); }
      var ch=shuffle(pts.slice(2).map(function(p){ return p.t; })), sai={}; ch.forEach(function(c,i){ if(c!==T) sai[String(i)]='lech-nhom'; });
      return {type:'mcq', _pts:pts, _M:M, _N:N, _dung:T, q:luoiDiem(W,H,pts,[[M,N]])+'<div>Điểm nào là trung điểm của đoạn thẳng '+M+N+'? (đếm ô)</div>', choices:ch, correct:ch.indexOf(T), sai:sai,
        goiY:{'lech-nhom':'Bé đếm số ô từ '+M+' tới điểm đó và từ điểm đó tới '+N+'. Hai số ô phải bằng nhau.'}}; }
    var w=rnd(2,3), p=rnd(5,6), A=[4,0], C=[4,8], O=[4,p], B=[4-w,p], D=[4+w,p], pts3=[{t:'A',x:A[0],y:A[1]},{t:'B',x:B[0],y:B[1]},{t:'C',x:C[0],y:C[1]},{t:'D',x:D[0],y:D[1]},{t:'O',x:O[0],y:O[1]}];
    var ch3=shuffle(['AC','BD','AB']), sai3={}; ch3.forEach(function(c,i){ if(c==='AC') sai3[String(i)]='nham-giua-trung-diem'; else if(c==='AB') sai3[String(i)]='khong-thang-hang'; });
    return {type:'mcq', _pts:pts3, _dung:'BD', q:luoiDiem(8,8,pts3,[['A','B'],['B','C'],['C','D'],['D','A'],['A','C'],['B','D']])+'<div>Điểm O là trung điểm của đoạn thẳng nào?</div>', choices:ch3, correct:ch3.indexOf('BD'), sai:sai3,
      goiY:{'nham-giua-trung-diem':'Điểm O ở giữa A và C nhưng OA và OC không bằng nhau. Bé đếm ô.', 'khong-thang-hang':'O không nằm trên đoạn AB.'}};
  }, check:function(q){ var P=q._pts, c;
    if(q._M){ var a=ptOf(P,q._M), b=ptOf(P,q._N); c=q.choices.filter(function(t){ return laTrungDiem(ptOf(P,t),a,b); }); return c.length===1 && c[0]===q._dung && kiemMCQ(q); }
    var O=ptOf(P,'O'); c=q.choices.filter(function(s){ return laTrungDiem(O, ptOf(P,s[0]), ptOf(P,s[1])); }); return c.length===1 && c[0]==='BD' && q._dung==='BD' && kiemMCQ(q); }},

  /* D6 — Trên thước cm (Luyện tập 1) */
  {name:'Trên thước cm', sec:'Luyện tập 1 — Trên thước cm', mt:['MT4'], levels:3,
   muc:['Đọc vạch: M có ở chính giữa A và B không.', 'B có là trung điểm của AC không.', 'Thước không bắt đầu từ vạch 0.'],
   make:function(lv){
    var dau = lv>=3 ? rnd(1,3) : 0, a, b, m, c, cau, dung, lab={}, pts, cuoi;
    if(lv!==2){ var h=rnd(2,5); a=dau; b=a+2*h; var sai = Math.random()<0.5; m = sai ? a+h+pick([-1,1]) : a+h; dung=(m===a+h); cuoi=b+2; pts=[{t:'A',v:a},{t:'M',v:m},{t:'B',v:b}]; cau='M có là trung điểm của đoạn thẳng AB không?';
      if(!dung) lab={'0': Math.abs(m-(a+h))===1 ? 'doc-sai-thuoc' : 'nham-giua-trung-diem'}; }
    else { var h2=rnd(2,5); a=0; b=h2; var sai2=Math.random()<0.5; c = sai2 ? 2*h2+pick([-1,1]) : 2*h2; dung=(c===2*h2); cuoi=Math.max(c,b)+1; pts=[{t:'A',v:a},{t:'B',v:b},{t:'C',v:c}]; cau='B có là trung điểm của đoạn thẳng AC không?';
      if(!dung) lab={'0':'doc-sai-thuoc'}; a=0; m=b; b=c; }
    return {type:'mcq', figFn:dsBtn16, _A:a, _M:m, _B:b, _dung:(dung?'Đ':'S'), q:thuocCm(pts, dau, cuoi)+'<div class="text-xl font-extrabold text-orange-700 my-2">'+cau+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(dung?0:1), sai:lab, goiY:{'doc-sai-thuoc':'Bé đọc lại vạch của từng điểm trên thước, rồi tính khoảng cách.', 'nham-giua-trung-diem':'M ở giữa A và B nhưng chưa cách đều hai đầu. Bé so hai khoảng cách.', 'chung':'Bé đọc vạch của từng điểm, so hai khoảng cách.'}};
  }, check:function(q){ var t=(q._M-q._A===q._B-q._M); return (q._dung==='Đ')===t && q.correct===(t?0:1) && q.choices.join()==='Đ,S' && q._B>q._A; }},

  /* D7 — Cào cào nhảy (Luyện tập 3). Đoạn thẳng LUÔN có trung điểm; hỏi về bước nhảy, số ô chẵn hay lẻ */
  {name:'Cào cào nhảy', sec:'Luyện tập 3 — Cào cào nhảy', mt:['MT5'], levels:3,
   muc:['Thanh chia ô đều, chọn vạch là trung điểm của AB.', 'Cào cào đã nhảy vài bước: cần nhảy thêm mấy bước tới trung điểm.', 'Cào cào nhảy từng ô có dừng ĐÚNG ở trung điểm được không; trung điểm cách A mấy ô.'],
   make:function(lv){
    if(lv<=1){ var n=pick([6,8,10]), nm=ten(3), v=[n/2, n/2-1, n/2+1], ch=shuffle(nm.slice()), gh=nm.map(function(t,i){ return {t:t, v:v[i]}; }), dung=nm[0], sai={};
      ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='chia-doi-sai'; });
      return {type:'mcq', _n:n, _gh:gh, _dung:dung, q:thanhChiaO(n, gh)+'<div>Thanh AB chia thành '+n+' ô bằng nhau. Điểm nào là trung điểm của AB?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'chia-doi-sai':'Trung điểm cách A đúng một nửa số ô: '+n+' ô thì cách A '+(n/2)+' ô.'}}; }
    if(lv===2){ var n2=pick([8,10,12]), k=rnd(1,n2/2-1), ans=n2/2-k;
      return {type:'num', _n:n2, _k:k, _e:ans, q:thanhChiaO(n2, [], k)+'<div>Thanh AB chia thành '+n2+' ô bằng nhau. Cào cào ở A, đã nhảy '+k+' ô. Cần nhảy thêm mấy ô để tới trung điểm của AB?</div>', ans:ans, unit:'ô',
        sai:nhanSai([[n2-k,'chia-doi-sai'],[n2/2,'chia-doi-sai'],[ans-1,'lech-nhom'],[ans+1,'lech-nhom']], ans), goiY:{'chia-doi-sai':'Trung điểm cách A '+(n2/2)+' ô. Cào cào đã nhảy '+k+' ô rồi.', 'lech-nhom':'Bé đếm lại số ô cần nhảy thêm.'}}; }
    var n3=rnd(5,13);
    if(Math.random()<0.5){ var chan=(n3%2===0), dung3=chan?'Đ':'S';
      return {type:'mcq', figFn:dsBtn16, _n:n3, _dung:dung3, _kieu:'dd', q:thanhChiaO(n3, [], 0)+'<div>Thanh AB chia thành '+n3+' ô bằng nhau. Cào cào nhảy từng ô một, mỗi bước 1 ô. Cào cào có thể dừng ĐÚNG ở trung điểm của AB không?</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:(chan?0:1), sai:(chan?{}:{'0':'chia-doi-sai'}), goiY:{'chia-doi-sai':'Số ô lẻ thì không chia đôi được thành hai phần có số ô bằng nhau: trung điểm nằm GIỮA một ô, cào cào không dừng đúng ở đó.', 'chung':'Bé xem số ô là chẵn hay lẻ.'}}; }
    var n4=pick([6,8,10,12,14]);
    return {type:'num', _n:n4, _kieu:'o', _e:n4/2, q:thanhChiaO(n4, [], 0)+'<div>Thanh AB chia thành '+n4+' ô bằng nhau. Từ A đi mấy ô thì tới trung điểm của AB?</div>', ans:n4/2, unit:'ô',
      sai:nhanSai([[n4,'chia-doi-sai'],[n4/2-1,'lech-nhom'],[n4/2+1,'lech-nhom'],[n4-2,'chia-doi-sai']], n4/2), goiY:{'chia-doi-sai':'Trung điểm chia đoạn thẳng thành hai phần bằng nhau: lấy số ô chia 2.', 'lech-nhom':'Bé đếm lại số ô.'}};
  }, check:function(q){ if(q._gh){ var d=q._gh.filter(function(g){ return g.v*2===q._n; }); return d.length===1 && d[0].t===q._dung && kiemMCQ(q); }
    if(q._kieu==='dd') return (q._dung==='Đ')===(q._n%2===0) && q.correct===(q._n%2===0?0:1) && q.choices.join()==='Đ,S';
    if(q._kieu==='o') return q._n%2===0 && q.ans===q._n/2;
    return q._n%2===0 && q._k>=1 && q._k<q._n/2 && q.ans===q._n/2-q._k; }},

  /* D8 — Gập đôi dây (Luyện tập 4): chọn cách đúng để lấy nửa / một phần tư dây */
  {name:'Gập đôi dây', sec:'Luyện tập 4 — Gập đôi dây', mt:['MT5'], levels:3,
   muc:['Lấy nửa sợi dây 20 cm khi không có thước chia cm.', 'Lấy nửa sợi dây có độ dài khác.', 'Gập đôi hai lần để lấy một phần tư.'],
   make:function(lv){
    var dai = lv<=1 ? 20 : (lv===2 ? pick([16,24,30]) : pick([16,20,24])), muc = lv>=3 ? dai/4 : dai/2, dung, ds;
    if(lv<=2){ dung='Gập đôi sợi dây cho hai đầu trùng nhau, chỗ gập cách mỗi đầu '+(dai/2)+' cm.';
      ds=[[dung,''],['Gập đôi sợi dây, chỗ gập cách mỗi đầu '+dai+' cm.','chia-doi-sai'],['Gập sợi dây thành hai phần, một phần dài hơn phần kia.','nham-giua-trung-diem'],['Gập sợi dây thành bốn phần bằng nhau, lấy một phần.','chia-doi-sai']]; }
    else { dung='Gập đôi sợi dây, rồi gập đôi một lần nữa; mỗi phần dài '+(dai/4)+' cm.';
      ds=[[dung,''],['Gập đôi sợi dây một lần; mỗi phần dài '+(dai/2)+' cm.','chia-doi-sai'],['Gập sợi dây thành ba phần, lấy một phần.','chia-doi-sai'],['Gập sợi dây thành hai phần, một phần dài hơn phần kia.','nham-giua-trung-diem']]; }
    shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, _dai:dai, _muc:muc, _dung:dung, q:dayGap(dai)+'<div>Sợi dây dài '+dai+' cm, không có thước chia cm. Làm thế nào để lấy một đoạn dây dài '+muc+' cm?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'chia-doi-sai':'Gập đôi thì mỗi phần bằng một nửa. Muốn một phần tư thì gập đôi hai lần.', 'nham-giua-trung-diem':'Hai phần phải BẰNG NHAU thì chỗ gập mới là trung điểm.', 'chung':'Gập đôi cho hai đầu trùng nhau.'}};
  }, check:function(q){ return q._dai%2===0 && ((q._muc===q._dai/2) || (q._dai%4===0 && q._muc===q._dai/4)) && kiemMCQ(q) && q._dung.indexOf(String(q._muc))>=0; }},

  /* D9 — Tính độ dài khi biết trung điểm (không có trong SGK) */
  {name:'Tính độ dài', sec:'Tính độ dài khi biết trung điểm', mt:['MT2'], levels:3,
   muc:['Biết DH, H là trung điểm DE: tính DE.', 'Biết DE, H là trung điểm DE: tính HE.', 'Hai bước: K là trung điểm DH, tính DK.'],
   make:function(lv){
    var nm=ten(4), D=nm[0], H=nm[1], E=nm[2], K=nm[3];
    if(lv<=1){ var a=rnd(2,6), pts=[{t:D,x:0},{t:H,x:a},{t:E,x:2*a}];
      return {type:'num', _e:2*a, q:duongThang([{t:D,x:0},{t:H,x:a},{t:E,x:2*a}], false)+'<div>Điểm '+H+' là trung điểm của đoạn thẳng '+D+E+'. Biết '+D+H+' = '+a+' cm. Hỏi '+D+E+' dài bao nhiêu xăng-ti-mét?</div>', ans:2*a, unit:'cm',
        sai:nhanSai([[a,'chia-doi-sai'],[a+a/2|0,'chia-doi-sai'],[2*a-1,'lech-nhom'],[2*a+1,'lech-nhom'],[a+2,'cong-thay-nhan']], 2*a), goiY:{'chia-doi-sai':'H là trung điểm nên HE = DH = '+a+' cm. DE = DH + HE.', 'cong-thay-nhan':'DE là cả đoạn: cộng DH và HE.'}, _f:'gap'}; }
    if(lv===2){ var b=2*rnd(3,8), h=b/2;
      return {type:'num', _e:h, q:duongThang([{t:D,x:0},{t:H,x:h},{t:E,x:b}], false)+'<div>Điểm '+H+' là trung điểm của đoạn thẳng '+D+E+'. Biết '+D+E+' = '+b+' cm. Hỏi '+H+E+' dài bao nhiêu xăng-ti-mét?</div>', ans:h, unit:'cm',
        sai:nhanSai([[b,'chia-doi-sai'],[2*b,'chia-doi-sai'],[h-1,'lech-nhom'],[h+1,'lech-nhom']], h), goiY:{'chia-doi-sai':'Trung điểm chia đoạn thẳng thành hai phần bằng nhau: lấy '+b+' chia 2.', 'lech-nhom':'Bé nhẩm: 2 lần mấy bằng '+b+'?'}, _f:'nua'}; }
    var c=4*rnd(2,4), h3=c/2, k=c/4;
    return {type:'num', _e:k, q:duongThang([{t:D,x:0},{t:K,x:k},{t:H,x:h3},{t:E,x:c}], false)+'<div>Điểm '+H+' là trung điểm của đoạn thẳng '+D+E+', điểm '+K+' là trung điểm của đoạn thẳng '+D+H+'. Biết '+D+E+' = '+c+' cm. Hỏi '+D+K+' dài bao nhiêu xăng-ti-mét?</div>', ans:k, unit:'cm',
      sai:nhanSai([[h3,'thieu-buoc'],[c,'dao-vai'],[k-1,'lech-nhom'],[k+1,'lech-nhom']], k), goiY:{'thieu-buoc':'Bé mới tìm '+D+H+' = '+h3+' cm. Còn bước chia đôi '+D+H+' để tìm '+D+K+'.', 'dao-vai':'Số '+c+' là độ dài '+D+E+', bài hỏi '+D+K+'.', 'lech-nhom':'Bé nhẩm: 2 lần mấy bằng '+h3+'?'}, _f:'tu'};
  }, check:function(q){ return Number.isInteger(q.ans) && q.ans>=2 && q.ans===q._e && q.ans>0; }},

  /* D10 — Đúng hay sai? Tìm lỗi (không có trong SGK) */
  {name:'Đúng / Sai', sec:'Tìm lỗi — Bạn nói đúng hay sai?', mt:['MT3'], levels:3,
   muc:['Bạn nói B là trung điểm vì B ở giữa: đúng hay sai.', 'Thẳng hàng nhưng hai đoạn không bằng nhau.', 'Chọn lý do vì sao bạn sai.'],
   make:function(lv){
    var nm=ten(3), A=nm[0], B=nm[1], C=nm[2], ab=rnd(2,4), kieu, bc, cong=false;
    kieu = lv<=1 ? 'lech' : (lv===2 ? pick(['lech','dung']) : pick(['lech','cong']));
    bc = kieu==='dung' ? ab : ab+pick([-1,1]); if(bc<2) bc=ab+1;
    var pts = kieu==='cong' ? [{t:A,x:0},{t:B,x:ab,y:1},{t:C,x:ab+bc}] : [{t:A,x:0},{t:B,x:ab},{t:C,x:ab+bc}];
    var that = kieu==='dung', hinh=duongThang(pts, kieu!=='cong'), cau='Bạn An nói: "'+B+' là trung điểm của đoạn thẳng '+A+C+' vì '+B+' ở giữa '+A+' và '+C+'."';
    if(lv<=2){ var lab = that ? {} : {'0':'nham-giua-trung-diem'};
      return {type:'mcq', figFn:dsBtn16, _kieu:kieu, _ab:ab, _bc:bc, _dung:(that?'Đ':'S'), q:hinh+'<div class="text-lg font-bold text-slate-700 my-2">'+cau+'</div><div class="text-base text-slate-500">Bạn An nói đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:(that?0:1), sai:lab, goiY:{'nham-giua-trung-diem':'Trung điểm phải ở giữa VÀ hai đoạn bằng nhau. Bé so '+A+B+' với '+B+C+'.', 'chung':'Bé so hai độ dài '+A+B+' và '+B+C+'.'}}; }
    var lyDo={lech:'Sai, vì '+A+B+' không bằng '+B+C+'.', cong:'Sai, vì ba điểm '+A+', '+B+', '+C+' không thẳng hàng.', dung:'Đúng, vì '+A+B+' = '+B+C+'.'}, dung=lyDo[kieu], ch=shuffle([lyDo.lech, lyDo.cong, lyDo.dung]), sai={};
    ch.forEach(function(c,i){ if(c===lyDo.dung) sai[String(i)]='nham-giua-trung-diem'; else if(c!==dung) sai[String(i)] = kieu==='cong' ? 'nham-giua-trung-diem' : 'khong-thang-hang'; });
    return {type:'mcq', cot:1, _kieu:kieu, _ab:ab, _bc:bc, _dung:dung, _ly:true, q:hinh+'<div class="text-lg font-bold text-slate-700 my-2">'+cau+'</div><div>Bạn An nói sai. Vì sao?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'khong-thang-hang':'Bé xem ba điểm có nằm trên một đường thẳng không.', 'nham-giua-trung-diem':'Bé so hai đoạn có bằng nhau không, và ba điểm có thẳng hàng không.'}};
  }, check:function(q){ if(q._ly) return (q._kieu==='lech' ? q._ab!==q._bc : q._kieu==='cong') && kiemMCQ(q);
    var t=(q._kieu==='dung'); return (q._dung==='Đ')===t && q.correct===(t?0:1) && q.choices.join()==='Đ,S' && (t ? q._ab===q._bc : q._ab!==q._bc); }}
 ]
};
