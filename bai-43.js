/* bai-43.js — Bài 43: Ôn tập hình học và đo lường (Chủ đề 7). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-43.md, PR #31): 4 MỤC TIÊU (muctieu) × 11 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Không chép hình lưới của sách: mọi hình do mã dựng với toạ độ nguyên; check() đọc lại toạ độ, đoạn, tên điểm từ chuỗi SVG (data-p, data-seg, data-loai, data-dem, data-kich, data-g)
   và tính lại: góc vuông bằng tích vô hướng, trung điểm bằng toạ độ, bán kính / đường kính bằng vị trí điểm trên đường tròn.
   Hình mới: luoiHinh43 (lưới điểm có đoạn nối, data), hinhTronOD (tâm O, các đoạn OA, AB…), khoiSan (sàn khối lập phương và khối trụ, data-dem). Chép: canDia (bài 36), gapKhuc (bài 38), khoiGhep (bài 22).
   Số đo: "1 000 g", "1 000 ml" viết bằng so(). QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function f1(v){ return (+v).toFixed(1); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
function so(n){ return n>=1000 ? Math.floor(n/1000)+' '+('00'+(n%1000)).slice(-3) : String(n); }
var GOI={'nham-vuong':'Góc vuông là góc mà hai cạnh vuông góc với nhau, kiểm bằng ê ke. Trên lưới: một cạnh nằm ngang, một cạnh thẳng đứng.', 'dem-sot-goc':'Ở chỗ hai đường cắt nhau có BỐN góc; ở chỗ một đường chạm vào giữa đường kia có HAI góc. Bé đếm từng đỉnh.', 'nham-trung-diem':'Trung điểm là điểm nằm GIỮA đoạn thẳng và chia đoạn thành hai phần bằng nhau. Bé đếm số ô hai bên.',
  'nham-hinh':'Hình vuông có bốn cạnh bằng nhau và bốn góc vuông; hình chữ nhật có hai cạnh dài, hai cạnh ngắn; hình tam giác có ba cạnh.', 'nham-bk-dk':'Bán kính nối tâm O với một điểm trên đường tròn. Đường kính nối hai điểm trên đường tròn và ĐI QUA tâm O.', 'dem-sot':'Bé đếm lại từng khối, từng đoạn nhé.', 'nham-khoi':'Khối lập phương có sáu mặt vuông; khối trụ có hai mặt tròn.',
  'nham-dinh':'Khối ở ĐỈNH của khối hộp được sơn ba mặt. Khối hộp nào cũng có 8 đỉnh.', 'uoc-luong-sai':'Bé hình dung vật thật: 1 mm rất mỏng, 1 cm bằng đốt ngón tay, 1 dm bằng gang tay; 1 g rất nhẹ, 1 kg bằng một túi đường.', 'quen-doi':'Bé viết đủ đơn vị và chữ số: 200 g × 5 = 1 000 g.',
  'nham-bang':'Bé tính lại cho đúng nhé.', 'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!', 'chon-sai-phep':'Cân thăng bằng: hai bên nặng bằng nhau. Bé lấy tổng bên này trừ quả cân bên kia.', 'cong-thay-nhan':'Nhiều đoạn bằng nhau: nhân, không cộng từng đoạn cũng được nhưng đừng cộng sai.', 'dao-vai':'Bé xem lại câu hỏi hỏi gì.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
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
/* Bộ hình chữ thập / chữ T / ngũ giác ABCDE với AC ngang, BI dọc cắt tại K, I trên ED */
function dungNguGiac(){
  var hw=rnd(2,3), up=rnd(2,3), dn=rnd(1,2), ox=rnd(0,1), oy=0, pts={};
  pts.A=[ox, oy+dn]; pts.C=[ox+2*hw, oy+dn]; pts.B=[ox+hw, oy+dn+up]; pts.K=[ox+hw, oy+dn]; pts.I=[ox+hw, oy]; pts.E=[ox+hw-rnd(1,hw), oy]; pts.D=[ox+hw+rnd(1,hw), oy];
  if(pts.E[0]===pts.A[0]) pts.E[0]+=1; if(pts.D[0]===pts.C[0]) pts.D[0]-=1;
  return {pts:pts, w:ox+2*hw+1, h:dn+up+1};
}

/* ---- Hình mới 2 (D5): hình tròn tâm O, các điểm trên đường tròn ở góc (độ), đoạn nối: 'OA' bán kính, 'AB' đường kính nếu hai góc lệch 180, 'khac' nếu không ---- */
function hinhTronOD(goc, doan){
  var W=300, H=260, C=150, cy=130, R=96, s=svgX(W,H), ten=Object.keys(goc);
  s+='<circle cx="'+C+'" cy="'+cy+'" r="'+R+'" fill="'+HM.troi+'" fill-opacity="0.22" stroke="currentColor" stroke-width="3"/>';
  function P(t){ if(t==='O') return [C,cy]; var r=goc[t]*Math.PI/180; return [C+R*Math.cos(r), cy-R*Math.sin(r)]; }
  doan.forEach(function(d){ var a=P(d.charAt(0)), b=P(d.charAt(1)), loai = (d.charAt(0)==='O'||d.charAt(1)==='O') ? 'bk' : (Math.abs(((goc[d.charAt(0)]-goc[d.charAt(1)])%360+360)%360-180)<0.5 ? 'dk' : 'khac');
    s+='<line data-loai="'+d+':'+loai+'" x1="'+f1(a[0])+'" y1="'+f1(a[1])+'" x2="'+f1(b[0])+'" y2="'+f1(b[1])+'" stroke="'+(loai==='dk' ? HM.doDam : (loai==='bk' ? HM.troiDam : HM.go))+'" stroke-width="3.5" stroke-linecap="round"/>'; });
  s+='<circle cx="'+C+'" cy="'+cy+'" r="5.5" fill="'+HM.cam+'"/><text x="'+(C+16)+'" y="'+(cy-10)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">O</text>';
  ten.forEach(function(t){ var p=P(t), r=goc[t]*Math.PI/180; s+='<circle data-goc="'+t+':'+goc[t]+'" cx="'+f1(p[0])+'" cy="'+f1(p[1])+'" r="5.5" fill="'+HM.cam+'"/><text x="'+f1(C+(R+20)*Math.cos(r))+'" y="'+f1(cy-(R+20)*Math.sin(r)+7)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+t+'</text>'; });
  return khungHinh(s);
}
function docTronOD(s){ var o={}, re=/data-loai="(\w\w):(\w+)"/g, m; while((m=re.exec(String(s)))) o[m[1]]=m[2]; return o; }
/* bộ góc: n điểm cách nhau >= 35 độ; coDK = có một cặp đối tâm */
function layGocTron(n, coDK){ for(var g=0;g<2000;g++){ var A=[], i, j, ok=true; A.push(10*rnd(0,35)); if(coDK) A.push((A[0]+180)%360); while(A.length<n) A.push(10*rnd(0,35));
    for(i=0;i<n&&ok;i++) for(j=i+1;j<n;j++){ var d=Math.abs(A[i]-A[j])%360; d = d>180 ? 360-d : d; if(d<35 || (!coDK && d===180) || (coDK && d===180 && !((i===0&&j===1)))){ ok=false; break; } }
    if(ok) return A; } return [0,180,90,270].slice(0,n); }

/* ---- Hình mới 3 (D6): sàn gồm các khối lập phương (hàng) và trên đó các khối trụ; mỗi khối data-dem="lp" hoặc "tru" ---- */
function khoiSan(nLP, nTru){
  var u=34, dx=12, dy=8, W=nLP*u+dx+24, H=u+dy+70, s=svgX(Math.max(W,180),H), i, X0=12, Y0=H-u-12;
  var mau=[HM.tim, HM.vang, HM.troi, HM.la];
  for(i=0;i<nLP;i++){ var x=X0+i*u, c=mau[i%mau.length];
    s+='<g data-dem="lp"><polygon points="'+x+','+Y0+' '+(x+u)+','+Y0+' '+(x+u)+','+(Y0+u)+' '+x+','+(Y0+u)+'" fill="'+c+'" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'
      +'<polygon points="'+x+','+Y0+' '+(x+dx)+','+(Y0-dy)+' '+(x+u+dx)+','+(Y0-dy)+' '+(x+u)+','+Y0+'" fill="'+c+'" fill-opacity="0.7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'
      +(i===nLP-1 ? '<polygon points="'+(x+u)+','+Y0+' '+(x+u+dx)+','+(Y0-dy)+' '+(x+u+dx)+','+(Y0+u-dy)+' '+(x+u)+','+(Y0+u)+'" fill="'+c+'" fill-opacity="0.5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' : '')+'</g>'; }
  var mt=[HM.xanhLa, HM.do, HM.vangDam, HM.troiDam], hs=[44,30,52,38];
  for(i=0;i<nTru;i++){ var cx=X0+16+i*Math.max(u, (nLP*u-16)/Math.max(1,nTru)), h=hs[i%hs.length], yb=Y0-dy+2, rx=12, ry=5;
    s+='<g data-dem="tru"><rect x="'+(cx-rx)+'" y="'+(yb-h)+'" width="'+(2*rx)+'" height="'+h+'" fill="'+mt[i%mt.length]+'" stroke="currentColor" stroke-width="2"/><ellipse cx="'+cx+'" cy="'+(yb-h)+'" rx="'+rx+'" ry="'+ry+'" fill="'+mt[i%mt.length]+'" stroke="currentColor" stroke-width="2"/><path d="M'+(cx-rx)+' '+yb+' A'+rx+' '+ry+' 0 0 0 '+(cx+rx)+' '+yb+'" fill="none" stroke="currentColor" stroke-width="2"/></g>'; }
  return khungHinh(s);
}
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }

/* Ngân hàng ước lượng: [vật, đáp đúng, hai đáp sai] theo mức */
var UOC=[
  [1,'Quyển sách Toán 3 tập một dày khoảng','5 mm',['5 cm','5 dm']], [1,'Chiếc bút mực nặng khoảng','20 g',['2 kg','20 kg']], [1,'Một lọ thuốc nhỏ mắt có khoảng','15 ml',['15 l','150 l']],
  [2,'Nhiệt độ cơ thể người bình thường khoảng','37 °C',['35 °C','50 °C']], [2,'Chiếc cặp sách của em nặng khoảng','2 kg',['2 g','20 kg']], [2,'Một cốc nước đầy có khoảng','250 ml',['25 ml','25 l']], [2,'Chiều cao cái bàn học khoảng','7 dm',['7 mm','7 m']],
  [3,'Chiều dài lớp học khoảng','8 m',['8 cm','8 dm']], [3,'Một hộp sữa nhỏ có khoảng','180 ml',['18 ml','18 l']], [3,'Một quả cam nặng khoảng','200 g',['2 g','20 kg']], [3,'Nhiệt độ nước đá đang tan là','0 °C',['37 °C','100 °C']], [3,'Chiều dày cái bàn gỗ khoảng','3 cm',['3 mm','3 dm']]
];
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
function gapKhuc(ds){
  var tong=ds.reduce(function(x,y){ return x+y; },0), nho=Math.min.apply(null, ds), sc=Math.min(22, 300/tong), P=[[0,0]], i, ang=[-0.45, 0.35, -0.3];
  for(i=0;i<ds.length;i++){ var L=ds[i]*sc, a=ang[i%3], p=P[P.length-1]; P.push([p[0]+L*Math.cos(a), p[1]+L*Math.sin(a)]); }
  var minY=Math.min.apply(null, P.map(function(p){ return p[1]; })), maxY=Math.max.apply(null, P.map(function(p){ return p[1]; })), PX=40, PT=46, PB=46, W=Math.round(P[P.length-1][0]+2*PX), H=Math.round(maxY-minY+PT+PB), ox=PX, oy=PT-minY, s=svgX(W,H), TEN='ABCDE';
  var Q=P.map(function(p){ return [p[0]+ox, p[1]+oy]; });
  s+='<path d="M'+Q.map(function(p){ return p[0].toFixed(1)+' '+p[1].toFixed(1); }).join(' L')+'" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
  Q.forEach(function(p,j){ s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="2.5" fill="none" stroke="currentColor" stroke-width="6"/>'; var up = (j===0) ? false : (ang[(j-1)%3]<0), tx = j===0 ? p[0]-22 : (j===Q.length-1 ? p[0]+22 : p[0]), ty = (j===0 || j===Q.length-1) ? p[1]+8 : (up ? p[1]-14 : p[1]+28); s+='<text x="'+tx.toFixed(1)+'" y="'+ty.toFixed(1)+'" text-anchor="middle" font-size="22" '+HFONT+' fill="currentColor">'+TEN.charAt(j)+'</text>'; });
  for(i=0;i<ds.length;i++){ var mx=(Q[i][0]+Q[i+1][0])/2, my=(Q[i][1]+Q[i+1][1])/2, up2=ang[i%3]<0, lx=mx, ly = up2 ? my+24 : my-24;
    s+='<g data-seg="'+i+'" data-cm="'+ds[i]+'">'+nhanVien(+lx.toFixed(1), +ly.toFixed(1), String(ds[i]).length*12+44, 30, ds[i]+' cm', 18)+'</g>'; }
  return khungHinh(s);
}
function docGK(s){ var o=[], re=/data-seg="(\d+)" data-cm="(\d+)"/g, m; while((m=re.exec(String(s)))) o.push(+m[2]); return o; }
function okEq(s){ var re=/(\d+) ([+−×:]) (\d+) = (\d+)/g, m, n=0, ok=true; while((m=re.exec(s))){ n++; if(tinhBT(m[1]+' '+m[2]+' '+m[3])!==+m[4]) ok=false; } return ok && n>=1; }
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

var DON=[['mm','mi-li-mét'],['g','gam'],['ml','mi-li-lít']];
var BAI = {
 n: 43,
 title: 'Ôn Tập Hình Học Và Đo Lường',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-vuong':'Nhầm góc vuông với góc không vuông', 'dem-sot-goc':'Đếm sót góc', 'nham-trung-diem':'Nhầm trung điểm', 'nham-hinh':'Nhầm tên hình', 'nham-bk-dk':'Nhầm bán kính với đường kính', 'dem-sot':'Đếm sót', 'nham-khoi':'Nhầm khối lập phương với khối trụ', 'nham-dinh':'Nhầm số khối ở đỉnh', 'uoc-luong-sai':'Ước lượng sai đơn vị', 'quen-doi':'Viết thiếu chữ số hoặc đơn vị'},
 muctieu: [
  {id:'MT1', ten:'Góc, trung điểm, hình trên lưới', muc:['Mấy góc vuông ở chỗ hai đường vuông góc cắt nhau; K có là trung điểm không; hình trên lưới là hình gì.', 'Góc không vuông đỉnh A; trung điểm của hai đoạn; hình nào là hình vuông.', 'Đếm góc vuông cả hình; chọn cặp trung điểm đúng; hình chữ nhật dài mấy ô.']},
  {id:'MT2', ten:'Hình tròn và khối', muc:['OA là bán kính hay đường kính; mấy khối trụ; khối hộp 2 × 2 × 2 sơn ba mặt.', 'Đoạn nào là đường kính; mấy khối lập phương; 3 × 2 × 2.', 'Đếm bán kính; cả hai loại khối; khối hộp lớn hơn.']},
  {id:'MT3', ten:'Đo lường', muc:['Gấp khúc 28 × 3; sách dày 5 mm; cộng trừ số đo.', 'Cân đĩa bưởi 900 g; bút 20 g, thuốc 15 ml; nhân chia số đo.', 'Cân ba quả cân; 37 °C; mì và sữa (hai bước).']},
  {id:'MT4', ten:'Tìm lỗi', muc:['Bạn An nói cân nặng quả bưởi: em thấy thế nào.', 'An gọi OA là đường kính: em thấy thế nào.', 'An ước lượng sai: em thấy thế nào.']}
 ],
 topics: [
  /* D1 — Góc vuông trên lưới (Bài 1a trang 1) */
  {name:'Góc vuông trên lưới', sec:'Bài 1a trang 1 — Đường thẳng AC và BI vuông góc cắt nhau tại K; I nằm trên ED: có mấy góc vuông', mt:['MT1'], levels:3,
   muc:['Hai đường vuông góc cắt nhau tại K: mấy góc vuông đỉnh K.', 'Đường BI chạm vào giữa ED tại I: mấy góc vuông đỉnh I.', 'Cả hình: có mấy góc vuông (đỉnh K và đỉnh I).'],
   make:function(lv){
    var H=dungNguGiac(), pts=H.pts, segs, hoi, ans, loi;
    if(lv<=1){ segs=[['A','C'],['B','I']]; hoi='K'; ans=demGocVuongTai('K',pts,segs); loi='Hai đường thẳng AC và BI cắt nhau tại K. Có bao nhiêu góc vuông đỉnh K?'; }
    else if(lv===2){ segs=[['E','D'],['B','I']]; hoi='I'; ans=demGocVuongTai('I',pts,segs); loi='Đoạn thẳng BI chạm vào đoạn thẳng ED tại I. Có bao nhiêu góc vuông đỉnh I?'; }
    else { segs=[['A','B'],['B','C'],['C','D'],['D','E'],['E','A'],['A','C'],['B','I']]; hoi='KI'; ans=demGocVuongTai('K',pts,segs)+demGocVuongTai('I',pts,segs); loi='Hình ABCDE có AC và BI cắt nhau tại K, I nằm trên ED. Có bao nhiêu góc vuông có đỉnh K hoặc đỉnh I?'; }
    var ve={}; Object.keys(pts).forEach(function(k){ if(segs.some(function(g){ return g.indexOf(k)>=0; }) || k==='K' || (lv===3)) ve[k]=pts[k]; }); if(lv===2) delete ve.K;
    return {type:'num', _lv:lv, _hoi:hoi, q:luoiHinh43(H.w, H.h, ve, segs)+'<div>'+loi+'</div>', ans:ans, unit:'góc vuông', sai:nhanSai([[ans-1,'dem-sot-goc'],[ans-2,'dem-sot-goc'],[ans+1,'nham-vuong'],[1,'dem-sot-goc']], ans), goiY:gy()};
  }, check:function(q){ var d=docHinh43(q.q), e = q._hoi==='KI' ? demGocVuongTai('K',d.pts,d.segs)+demGocVuongTai('I',d.pts,d.segs) : demGocVuongTai(q._hoi,d.pts,d.segs); return q.ans===e && e>=2 && (q._lv<=1 ? e===4 : (q._lv===2 ? e===2 : e===6)); }},

  /* D2 — Góc không vuông đỉnh A (Bài 1b trang 1) */
  {name:'Góc không vuông đỉnh A', sec:'Bài 1b trang 1 — Các góc đỉnh A tạo bởi AB, AC, AE: có mấy góc không vuông', mt:['MT1'], levels:3,
   muc:['Góc đỉnh A, cạnh AB và AC có vuông không (Có / Không).', 'Có mấy góc không vuông đỉnh A (AB, AC, AE).', 'Đỉnh khác (C), cạnh khác.'],
   make:function(lv){
    var H=dungNguGiac(), pts=H.pts, segs=[['A','B'],['B','C'],['C','D'],['D','E'],['E','A'],['A','C']], T = lv===3 ? 'C' : 'A';
    if(lv<=1){ var ve1={A:pts.A,B:pts.B,C:pts.C}, s1=[['A','B'],['A','C']], v=laVuong(pts.A,pts.B,pts.C);
      return {type:'mcq', _lv:1, _T:'A', _dung:(v?'Có':'Không'), q:luoiHinh43(H.w,H.h,ve1,s1)+'<div>Góc đỉnh A, cạnh AB và AC có phải là góc vuông không?</div>', choices:['Có','Không'], correct:(v?0:1), sai:(v?{'1':'nham-vuong'}:{'0':'nham-vuong'}), goiY:gy()}; }
    var ve={A:pts.A,B:pts.B,C:pts.C,D:pts.D,E:pts.E}, gocs=cacGocTai(T,pts,segs), kv=gocs.filter(function(g){ return Math.abs(g-90)>=0.5; }).length;
    return {type:'num', _lv:lv, _T:T, q:luoiHinh43(H.w,H.h,ve,segs)+'<div>Xét các góc đỉnh '+T+' tạo bởi các đoạn thẳng đi qua '+T+' trong hình. Có bao nhiêu góc <b>không vuông</b> đỉnh '+T+'?</div>', ans:kv, unit:'góc', sai:nhanSai([[kv-1,'dem-sot-goc'],[kv+1,'nham-vuong'],[gocs.length-kv,'nham-vuong']], kv), goiY:gy({'dem-sot-goc':'Ở đỉnh '+T+' có ba đoạn đi qua nên có ba góc: bé xét từng cặp cạnh.'})};
  }, check:function(q){ var d=docHinh43(q.q); if(q._lv<=1) return q._dung===(laVuong(d.pts.A,d.pts.B,d.pts.C)?'Có':'Không') && kiemMCQ(q); var g=cacGocTai(q._T,d.pts,d.segs); return g.length===3 && q.ans===g.filter(function(x){ return Math.abs(x-90)>=0.5; }).length && q.ans>=1; }},

  /* D3 — Trung điểm trên lưới (Bài 1c trang 1) */
  {name:'Trung điểm trên lưới', sec:'Bài 1c trang 1 — Trung điểm của đoạn thẳng AC là K, của đoạn thẳng ED là I', mt:['MT1'], levels:3,
   muc:['K có là trung điểm của AC không (Có / Không).', 'Điểm nào là trung điểm của ED (chọn).', 'Chọn cặp (đoạn, trung điểm) đúng.'],
   make:function(lv){
    var H=dungNguGiac(), pts=H.pts;
    if(lv<=1){ var dung=Math.random()<0.5; if(!dung) pts.K=[pts.K[0]+pick([-1,1]), pts.K[1]]; var ve={A:pts.A,C:pts.C,K:pts.K}, v=laTrungDiem(pts.K,pts.A,pts.C);
      return {type:'mcq', _lv:1, _dung:(v?'Có':'Không'), q:luoiHinh43(H.w,H.h,ve,[['A','C']])+'<div>Điểm K có phải là trung điểm của đoạn thẳng AC không?</div>', choices:['Có','Không'], correct:(v?0:1), sai:(v?{'1':'nham-trung-diem'}:{'0':'nham-trung-diem'}), goiY:gy()}; }
    if(lv===2){ var e=rnd(1,Math.max(1,Math.min(pts.K[0]-pts.A[0]-1, pts.C[0]-pts.K[0]-1))); pts.I=[pts.K[0], 0]; pts.E=[pts.K[0]-e, 0]; pts.D=[pts.K[0]+e, 0]; var ve2={E:pts.E,D:pts.D,I:pts.I,K:pts.K,B:pts.B}, ch=['I','K','D'], d2='I', sai={}; ch.forEach(function(c,i){ if(c!==d2) sai[String(i)]='nham-trung-diem'; });
      return {type:'mcq', cot:2, _lv:2, _dung:d2, q:luoiHinh43(H.w,H.h,ve2,[['E','D'],['B','I']])+'<div>Điểm nào là trung điểm của đoạn thẳng ED?</div>', choices:ch, correct:0, sai:sai, goiY:gy()}; }
    var e=rnd(1,Math.max(1,Math.min(pts.K[0]-pts.A[0]-1, pts.C[0]-pts.K[0]-1))); pts.I=[pts.K[0], 0]; pts.E=[pts.K[0]-e, 0]; pts.D=[pts.K[0]+e, 0];
    var ve3={A:pts.A,C:pts.C,K:pts.K,E:pts.E,D:pts.D,I:pts.I}, ch3=shuffle(['K là trung điểm của AC, I là trung điểm của ED','I là trung điểm của AC, K là trung điểm của ED','K là trung điểm của ED, D là trung điểm của EI','A là trung điểm của KC, I là trung điểm của ED']), d3='K là trung điểm của AC, I là trung điểm của ED', sai3={}; ch3.forEach(function(c,i){ if(c!==d3) sai3[String(i)]='nham-trung-diem'; });
    return {type:'mcq', cot:1, _lv:3, _dung:d3, q:luoiHinh43(H.w,H.h,ve3,[['A','C'],['E','D'],['K','I']])+'<div>Câu nào đúng?</div>', choices:ch3, correct:ch3.indexOf(d3), sai:sai3, goiY:gy()};
  }, check:function(q){ var d=docHinh43(q.q), p=d.pts; if(q._lv<=1) return kiemMCQ(q) && q._dung===(laTrungDiem(p.K,p.A,p.C)?'Có':'Không'); if(q._lv===2) return kiemMCQ(q) && laTrungDiem(p.I,p.E,p.D) && !laTrungDiem(p.K,p.E,p.D); return kiemMCQ(q) && laTrungDiem(p.K,p.A,p.C) && laTrungDiem(p.I,p.E,p.D) && !laTrungDiem(p.I,p.A,p.C); }},

  /* D4 — Hình trên lưới (Bài 2 trang 1) */
  {name:'Hình trên lưới', sec:'Bài 2 trang 1 — Vẽ hình theo mẫu trên lưới ô vuông: hình tam giác, hình chữ nhật, hình vuông (trên web: nhận dạng hình)', mt:['MT1'], levels:3,
   muc:['Hình vẽ trên lưới là hình gì.', 'Hình nào là hình vuông trong ba hình.', 'Hình chữ nhật có chiều dài mấy ô.'],
   make:function(lv){
    var w=8, h=5, pts={}, polys=[], i;
    function hcn(x,y,a,b,ten){ ten.split('').forEach(function(t,i){ pts[t]=[[x,y],[x+a,y],[x+a,y+b],[x,y+b]][i]; }); polys.push({pts:ten.split('')}); }
    if(lv<=1){ var loai=pick(['tg','hcn','hv']); if(loai==='tg'){ pts.A=[1,1]; pts.B=[5,1]; pts.C=[rnd(2,4),4]; polys.push({pts:['A','B','C']}); } else if(loai==='hcn'){ hcn(1,1,rnd(4,6),rnd(2,3),'ABCD'); } else { var r=rnd(2,4); hcn(1,1,r,r,'ABCD'); }
      var ch=shuffle(['Hình tam giác','Hình chữ nhật','Hình vuông']), dung = loai==='tg' ? 'Hình tam giác' : (loai==='hcn' ? 'Hình chữ nhật' : 'Hình vuông'), sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-hinh'; });
      return {type:'mcq', cot:1, _lv:1, _loai:loai, _dung:dung, q:luoiHinh43(w,h,pts,[],polys)+'<div>Hình vẽ trên lưới ô vuông là hình gì?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    if(lv===2){ var r2=rnd(2,3), a=rnd(3,4), b=rnd(1,2); if(a===r2) a++; hcn(0,1,r2,r2,'ABCD'); hcn(r2+1,1,a,b,'EFGH'); pts.M=[r2+a+2,1]; pts.N=[r2+a+4,1]; pts.P=[r2+a+3,4]; polys.push({pts:['M','N','P']}); w=Math.max(w, r2+a+5);
      var ch2=['Hình ABCD','Hình EFGH','Hình MNP'], d2='Hình ABCD', sai2={}; ch2.forEach(function(c,i){ if(c!==d2) sai2[String(i)]='nham-hinh'; });
      return {type:'mcq', cot:1, _lv:2, _dung:d2, q:luoiHinh43(w,h,pts,[],polys)+'<div>Hình nào là hình vuông?</div>', choices:ch2, correct:0, sai:sai2, goiY:gy()}; }
    var a3=rnd(4,7), b3=rnd(2,3); hcn(1,1,a3,b3,'ABCD'); var hoiDai=Math.random()<0.5;
    return {type:'num', _lv:3, _a:a3, _b:b3, _hoi:(hoiDai?'dai':'rong'), q:luoiHinh43(w,h,pts,[],polys)+'<div>Hình chữ nhật ABCD vẽ trên lưới ô vuông. Chiều '+(hoiDai?'dài':'rộng')+' của hình chữ nhật bằng mấy cạnh ô vuông?</div>', ans:(hoiDai?a3:b3), unit:'cạnh ô vuông', sai:nhanSai([[hoiDai?b3:a3,'dao-vai'],[(hoiDai?a3:b3)+1,'dem-sot'],[a3*b3,'dao-vai']], hoiDai?a3:b3), goiY:gy({'dao-vai':'Chiều dài là cạnh dài hơn, chiều rộng là cạnh ngắn hơn. Bé đếm số ô dọc theo cạnh.'})};
  }, check:function(q){ var d=docHinh43(q.q), p=d.pts;
    function laHCN(t){ var P=t.split('').map(function(k){ return p[k]; }); return P.length===4 && laVuong(P[0],P[1],P[3]) && laVuong(P[1],P[0],P[2]) && laVuong(P[2],P[1],P[3]); }
    function canh(a,b){ return Math.hypot(p[a][0]-p[b][0], p[a][1]-p[b][1]); }
    if(q._lv<=1){ var loai=q._loai; if(loai==='tg') return kiemMCQ(q) && Object.keys(p).length===3 && q._dung==='Hình tam giác'; var hv=laHCN('ABCD') && canh('A','B')===canh('B','C'); return kiemMCQ(q) && laHCN('ABCD') && (loai==='hv' ? hv && q._dung==='Hình vuông' : !hv && q._dung==='Hình chữ nhật'); }
    if(q._lv===2) return kiemMCQ(q) && laHCN('ABCD') && canh('A','B')===canh('B','C') && laHCN('EFGH') && canh('E','F')!==canh('F','G') && q._dung==='Hình ABCD';
    var dai=Math.max(canh('A','B'),canh('B','C')), rong=Math.min(canh('A','B'),canh('B','C')); return laHCN('ABCD') && dai!==rong && q.ans===(q._hoi==='dai' ? dai : rong); }},

  /* D5 — Bán kính, đường kính (Bài 3a trang 1) */
  {name:'Bán kính, đường kính', sec:'Bài 3a trang 1 — Hình tròn tâm O với các điểm A, B, C, D, M, N trên đường tròn: nêu tên đường kính, bán kính', mt:['MT2'], levels:3,
   muc:['Đoạn OA là bán kính hay đường kính.', 'Đoạn nào là đường kính trong bốn đoạn.', 'Đếm số bán kính (hoặc đường kính) trong hình.'],
   make:function(lv){
    var ten=['A','B','C','D','M','N'];
    if(lv<=1){ var g1=layGocTron(2,true), goc={A:g1[0],B:g1[1]}, laBK=Math.random()<0.5, doan = laBK ? ['OA'] : ['AB'], ch=['Bán kính','Đường kính'], dung = laBK ? 'Bán kính' : 'Đường kính', sai={}; sai[String(1-ch.indexOf(dung))]='nham-bk-dk';
      return {type:'mcq', cot:2, _lv:1, _doan:doan[0], _dung:dung, q:hinhTronOD(goc, doan)+'<div>Đoạn thẳng <b>'+doan[0]+'</b> trong hình tròn tâm O là bán kính hay đường kính?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    if(lv===2){ var g2=layGocTron(4,true), goc2={A:g2[0],B:g2[1],C:g2[2],D:g2[3]}, doan2=shuffle(['AB','OC','OD','CD']), loai=docTronOD(hinhTronOD(goc2,doan2)), ok=doan2.filter(function(d){ return loai[d]==='dk'; });
      if(ok.length!==1) return BAI.topics[4].make(2); var d2=ok[0], sai2={}; doan2.forEach(function(d,i){ if(d!==d2) sai2[String(i)]=(loai[d]==='bk' ? 'nham-bk-dk' : 'nham-bk-dk'); });
      return {type:'mcq', cot:2, _lv:2, _dung:d2, q:hinhTronOD(goc2, doan2)+'<div>Đoạn thẳng nào là <b>đường kính</b> của hình tròn tâm O?</div>', choices:doan2, correct:doan2.indexOf(d2), sai:sai2, goiY:gy()}; }
    var n=rnd(4,6), g3=layGocTron(n,true), goc3={}, i; for(i=0;i<n;i++) goc3[ten[i]]=g3[i];
    var bk=shuffle(ten.slice(0,n)).slice(0,rnd(2,n-1)).map(function(t){ return 'O'+t; }), doan3=shuffle(bk.concat(['AB'])), hoiBK=Math.random()<0.5, ans = hoiBK ? bk.length : 1;
    return {type:'num', _lv:3, _hoi:(hoiBK?'bk':'dk'), q:hinhTronOD(goc3, doan3)+'<div>Trong hình tròn tâm O, có bao nhiêu đoạn thẳng là <b>'+(hoiBK ? 'bán kính' : 'đường kính')+'</b>?</div>', ans:ans, unit:'đoạn', sai:nhanSai([[ans+1,'dem-sot'],[ans-1,'dem-sot'],[hoiBK ? 1 : bk.length,'nham-bk-dk'],[doan3.length,'nham-bk-dk']], ans), goiY:gy()};
  }, check:function(q){ var loai=docTronOD(q.q), ks=Object.keys(loai);
    if(q._lv<=1) return ks.length===1 && kiemMCQ(q) && q._dung===(loai[q._doan]==='bk' ? 'Bán kính' : 'Đường kính');
    if(q._lv===2) return ks.length===4 && kiemMCQ(q) && loai[q._dung]==='dk' && ks.filter(function(k){ return loai[k]==='dk'; }).length===1;
    var nb=ks.filter(function(k){ return loai[k]==='bk'; }).length, nd=ks.filter(function(k){ return loai[k]==='dk'; }).length; return q.ans===(q._hoi==='bk' ? nb : nd) && nd===1 && nb>=2; }},

  /* D6 — Đếm khối (Bài 3b trang 1) */
  {name:'Đếm khối', sec:'Bài 3b trang 1 — Hình xếp bởi mấy khối lập phương, mấy khối trụ', mt:['MT2'], levels:3,
   muc:['Có mấy khối trụ.', 'Có mấy khối lập phương.', 'Có tất cả bao nhiêu khối.'],
   make:function(lv){
    var nLP=rnd(4,8), nTru=rnd(1,3), hoi = lv<=1 ? 'tru' : (lv===2 ? 'lp' : 'ca'), ans = hoi==='tru' ? nTru : (hoi==='lp' ? nLP : nLP+nTru);
    return {type:'num', _lv:lv, _hoi:hoi, q:khoiSan(nLP,nTru)+'<div>Hình trên xếp bởi các khối lập phương (hàng dưới) và các khối trụ (đặt bên trên). '+(hoi==='tru' ? 'Có bao nhiêu khối trụ?' : (hoi==='lp' ? 'Có bao nhiêu khối lập phương?' : 'Có tất cả bao nhiêu khối?'))+'</div>', ans:ans, unit:'khối', sai:nhanSai([[ans+1,'dem-sot'],[ans-1,'dem-sot'],[hoi==='tru' ? nLP : nTru,'nham-khoi'],[hoi==='ca' ? nLP : nLP+nTru,'nham-khoi']], ans), goiY:gy()};
  }, check:function(q){ var lp=demDem(q.q,'lp'), tru=demDem(q.q,'tru'); return lp>=4 && tru>=1 && q.ans===(q._hoi==='tru' ? tru : (q._hoi==='lp' ? lp : lp+tru)); }},

  /* D7 — Sơn ba mặt (Bài 4 trang 1) */
  {name:'Sơn ba mặt', sec:'Bài 4 trang 1 — Xếp các khối lập phương nhỏ thành khối hộp 3 × 2 × 2 rồi sơn tất cả các mặt: 8 khối ở đỉnh được sơn 3 mặt', mt:['MT2'], levels:3,
   muc:['Khối hộp 2 × 2 × 2: mấy khối ở đỉnh.', 'Khối hộp 3 × 2 × 2: mấy khối được sơn 3 mặt.', 'Khối hộp lớn hơn (4 × 2 × 2, 3 × 3 × 2): mấy khối được sơn 3 mặt.'],
   make:function(lv){
    var k = lv<=1 ? [2,2,2] : (lv===2 ? [3,2,2] : pick([[4,2,2],[3,3,2],[4,3,2],[3,2,3]])), a=k[0], b=k[1], c=k[2], tong=a*b*c;
    return {type:'num', _lv:lv, q:khoiGhep(a,b,c)+'<div>Xếp '+tong+' khối lập phương nhỏ thành khối hộp chữ nhật như hình rồi sơn <b>tất cả các mặt ngoài</b>. '+(lv<=1 ? 'Có bao nhiêu khối nhỏ nằm ở đỉnh của khối hộp?' : 'Có bao nhiêu khối nhỏ được sơn <b>đúng ba mặt</b>?')+'</div>', ans:8, unit:'khối', sai:nhanSai([[tong,'nham-dinh'],[6,'nham-dinh'],[12,'nham-dinh'],[4,'nham-dinh'],[tong-8,'nham-dinh']], 8), goiY:gy({'nham-dinh':'Chỉ các khối ở đỉnh mới lộ ba mặt. Khối hộp nào cũng có 8 đỉnh.'})};
  }, check:function(q){ var k=docKich(q.q); return !!k && k.every(function(x){ return x>=2; }) && q.ans===8 && (q._lv<=1 ? k.join()==='2,2,2' : (q._lv===2 ? k.join()==='3,2,2' : k[0]*k[1]*k[2]>12)); }},

  /* D8 — Gấp khúc và cân đĩa (Bài 1 trang 2) */
  {name:'Gấp khúc và cân đĩa', sec:'Bài 1 trang 2 — Đường gấp khúc ABCD có ba đoạn 28 mm: 84 mm; cân thăng bằng: 500 g + 500 g = quả bưởi + 100 g: bưởi 900 g', mt:['MT3'], levels:3,
   muc:['Đường gấp khúc ba đoạn bằng nhau.', 'Cân đĩa: hai quả cân một bên, vật và một quả cân bên kia.', 'Cân với ba quả cân; đường gấp khúc bốn đoạn.'],
   make:function(lv){
    if(lv<=1 || (lv===3 && Math.random()<0.5)){ var n = lv===3 ? 4 : 3, d=pick([28,25,30,32,35,24]), ds=[], i; for(i=0;i<n;i++) ds.push(d); var T=d*n;
      return {type:'num', _lv:lv, _kieu:'gk', _ds:ds, q:gapKhuc(ds)+'<div>Đường gấp khúc '+'ABCDE'.slice(0,n+1)+' có '+n+' đoạn thẳng bằng nhau, mỗi đoạn dài <b>'+d+' mm</b>. Đường gấp khúc dài bao nhiêu mi-li-mét?</div>', ans:T, unit:'mm', sai:nhanSai([[d+n,'cong-thay-nhan'],[d*(n-1),'dem-sot'],[T+10,'nham-bang'],[d,'thieu-buoc']], T), goiY:gy({'dem-sot':'Đường gấp khúc có '+n+' đoạn: '+d+' × '+n+'.'})}; }
    var P=[100,200,500,50], tl=[], tp=[], L, R, vat, g=0, ten=pick(['Quả bưởi','Quả dưa','Túi gạo','Hộp bánh']);
    do{ g++; tl=[pick(P),pick(P)]; if(lv===3 && Math.random()<0.5) tl.push(pick(P)); tp=[pick(P)]; L=tl.reduce(function(a,b){ return a+b; },0); R=tp[0]; vat=L-R; }while(g<300 && (vat<=0 || vat>999 || L>999));
    var trai=tl.map(function(x){ return {g:x,k:'can'}; }), phai=[{g:vat,k:'goi',an:true}].concat(tp.map(function(x){ return {g:x,k:'can'}; }));
    return {type:'num', _lv:lv, _kieu:'can', _vat:vat, q:canDia(trai, phai)+'<div>Cân thăng bằng. Bên trái có các quả cân, bên phải có '+ten.toLowerCase()+' và quả cân. '+ten+' nặng bao nhiêu gam?</div>', ans:vat, unit:'g', sai:nhanSai([[L+R>999 ? 0 : L+R,'chon-sai-phep'],[L,'thieu-buoc'],[R,'dao-vai'],[vat+100,'nham-bang']], vat), goiY:gy({'thieu-buoc':'Hai bên nặng bằng nhau: '+ten.toLowerCase()+' = tổng bên trái − quả cân bên phải.'})};
  }, check:function(q){ if(q._kieu==='gk'){ var d=docGK(q.q); return d.join()===q._ds.join() && q.ans===d.reduce(function(a,b){ return a+b; },0) && new Set(d).size===1; }
    var c=docCanNhieu(q.q)[0]; if(!c || c.nghieng!=='can') return false; var t=tongBen(c.items,'t'), p=tongBen(c.items,'p'), goi=c.items.filter(function(x){ return x.k==='goi'; }); return t===p && goi.length===1 && goi[0].s==='p' && q.ans===goi[0].g && q.ans===q._vat && t<=999; }},

  /* D9 — Chọn số đo thích hợp (Bài 2 trang 2) */
  {name:'Chọn số đo thích hợp', sec:'Bài 2 trang 2 — Quyển sách dày khoảng 5 mm; bút mực nặng khoảng 20 g; lọ thuốc nhỏ mắt 15 ml; nhiệt độ cơ thể 37 °C', mt:['MT3'], levels:3,
   muc:['Sách dày 5 mm / 5 cm / 5 dm.', 'Bút 20 g; thuốc 15 ml; nhiệt độ 37 °C; cặp sách 2 kg.', 'Vật khác: lớp học 8 m, hộp sữa 180 ml, quả cam 200 g, nước đá 0 °C.'],
   make:function(lv){
    var ds=UOC.filter(function(u){ return u[0]===lv; }), u=pick(ds), ch=shuffle([u[2]].concat(u[3])), sai={}; ch.forEach(function(c,i){ if(c!==u[2]) sai[String(i)]='uoc-luong-sai'; });
    return {type:'mcq', cot:1, _lv:lv, _vat:u[1], _dung:u[2], q:'<div>'+u[1]+' bao nhiêu? Chọn số đo thích hợp.</div>', choices:ch, correct:ch.indexOf(u[2]), sai:sai, goiY:gy()};
  }, check:function(q){ var u=UOC.filter(function(x){ return x[1]===q._vat; })[0]; return !!u && kiemMCQ(q) && q.choices.length===3 && q._dung===u[2]; }},

  /* D10 — Tính với số đo (Bài 3, Bài 4 trang 2) */
  {name:'Tính với số đo', sec:'Bài 3, 4 trang 2 — 480 mm + 120 mm; 840 mm : 3; 200 g × 5 = 1 000 g; 1 000 ml − 500 ml; 3 gói mì 80 g và 1 hộp sữa 455 g', mt:['MT3'], levels:3,
   muc:['Cộng, trừ số đo.', 'Nhân, chia số đo (200 g × 5 = 1 000 g).', 'Ba gói mì 80 g và một hộp sữa 455 g (hai bước).'],
   make:function(lv){
    var u=pick(DON);
    if(lv<=1){ var cong=Math.random()<0.5, a=rnd(100,800), b=rnd(20,199), ans = cong ? a+b : a-b; while(ans>1000 || ans<=0){ a=rnd(100,800); b=rnd(20,199); ans = cong ? a+b : a-b; }
      return {type:'num', _lv:1, _kieu:(cong?'+':'−'), _a:a, _b:b, q:kyHieu('Tính', a+' '+u[0]+(cong?' + ':' − ')+b+' '+u[0]+' ='+oHoi()), ans:ans, unit:u[0], sai:nhanSai([[cong?a-b:a+b,'chon-sai-phep'],[ans+10,'nham-bang'],[ans-10,'nham-bang'],[ans+100,'nham-bang']], ans), goiY:gy({'chon-sai-phep':'Bé xem dấu phép tính: cộng hay trừ.'})}; }
    if(lv===2){ var nhan=Math.random()<0.5, k=rnd(2,9), m, T; if(nhan){ m=pick([100,120,150,200,250,105,110,130]); while(m*k>1000) k--; T=m*k; } else { m=rnd(100,333); T=m; m=m*k; while(m>1000){ k--; m=T*k; } }
      var bt = nhan ? m+' '+u[0]+' × '+k : m+' '+u[0]+' : '+k, ans2 = nhan ? T : T;
      return {type:'num', _lv:2, _kieu:(nhan?'×':':'), _a:m, _b:k, q:kyHieu('Tính', bt+' ='+oHoi())+(ans2===1000 ? '<div class="text-base text-slate-500">Kết quả có bốn chữ số: viết dạng 1 000.</div>' : ''), ans:ans2, unit:u[0], sai:nhanSai([[nhan ? m+k : m-k,'chon-sai-phep'],[ans2+10,'nham-bang'],[nhan ? ans2/10 : ans2*10,'quen-doi']], ans2), goiY:gy()}; }
    var n=rnd(2,4), g=pick([80,75,85,90,70]), s=pick([455,380,420,365]), T3=n*g+s;
    return {type:'num', _lv:3, _kieu:'hai', _n:n, _g:g, _s:s, q:'<div>Một gói mì tôm nặng <b>'+g+' g</b>, một hộp sữa nặng <b>'+s+' g</b>. Hỏi '+n+' gói mì tôm và 1 hộp sữa nặng tất cả bao nhiêu gam?</div><div class="text-base text-slate-500">Biểu thức: '+n+' × '+g+' + '+s+'</div>', ans:T3, unit:'g', sai:nhanSai([[n*g,'thieu-buoc'],[g+s,'thieu-buoc'],[(n+s)*g>999 ? 0 : (n+s)*g,'chon-sai-phep'],[T3+10,'nham-bang']], T3), goiY:gy({'thieu-buoc':'Bước 1: '+n+' gói mì nặng '+g+' × '+n+'. Bước 2: cộng với '+s+'.'})};
  }, check:function(q){ var k=q._kieu; if(k==='+') return q.ans===q._a+q._b && q.ans<=1000; if(k==='−') return q.ans===q._a-q._b && q.ans>0; if(k==='×') return q.ans===q._a*q._b && q.ans<=1000; if(k===':') return q._a%q._b===0 && q.ans===q._a/q._b; return q.ans===q._n*q._g+q._s && q.ans<=999; }},

  /* D11 — Bạn An nói (không có trong SGK) */
  {name:'Bạn An nói', sec:'Tìm lỗi — An nói cân nặng quả bưởi; An gọi OA là đường kính; An ước lượng sách dày 5 cm', mt:['MT4'], levels:3,
   muc:['An nói quả bưởi nặng bằng tổng hai bên: em thấy thế nào.', 'An gọi bán kính là đường kính: em thấy thế nào.', 'An ước lượng sai đơn vị: em thấy thế nào.'],
   make:function(lv){
    if(lv<=1){ var P=[100,200,300,400], a=pick(P), b=pick(P), c=pick([50,100]), L=a+b, vat=L-c, g=0; while(g<50 && vat<=0){ g++; a=pick(P); b=pick(P); L=a+b; vat=L-c; }
      var dung=Math.random()<0.5, x = dung ? vat : L+c, dungC, saiC;
      if(dung){ dungC='Đồng ý, vì '+a+' + '+b+' = '+L+' và '+L+' − '+c+' = '+vat; saiC='Không đồng ý, vì '+L+' + '+c+' = '+(L+c); } else { dungC='Không đồng ý, vì '+a+' + '+b+' = '+L+' và '+L+' − '+c+' = '+vat; saiC='Đồng ý, vì '+L+' + '+c+' = '+(L+c); }
      var ch=shuffle([dungC,saiC]), sai={}; sai[String(ch.indexOf(saiC))]='chon-sai-phep';
      return {type:'mcq', cot:1, _lv:1, _a:a, _b:b, _c:c, _x:x, _dung:dungC, q:nguoi('boy','Bạn An')+canDia([{g:a,k:'can'},{g:b,k:'can'}],[{g:vat,k:'goi',an:true},{g:c,k:'can'}])+'<div>Cân thăng bằng. Bạn An nói: «Quả bưởi nặng <b>'+x+' g</b>.» Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dungC), sai:sai, goiY:gy()}; }
    if(lv===2){ var g2=layGocTron(2,true), goc={A:g2[0],B:g2[1]}, laBK=Math.random()<0.5, doan = laBK ? 'OA' : 'AB', anNoi = laBK ? 'đường kính' : 'bán kính', dung2='Không đồng ý, vì '+(laBK ? 'OA nối tâm O với điểm A trên đường tròn nên OA là bán kính' : 'AB nối hai điểm trên đường tròn và đi qua tâm O nên AB là đường kính'), sai2='Đồng ý, vì '+(laBK ? 'OA có một đầu là tâm O' : 'AB có hai đầu nằm trên đường tròn'), ch2=shuffle([dung2,sai2]), s2={}; s2[String(ch2.indexOf(sai2))]='nham-bk-dk';
      return {type:'mcq', cot:1, _lv:2, _doan:doan, _dung:dung2, q:nguoi('boy','Bạn An')+hinhTronOD(goc,[doan])+'<div>Bạn An nói: «Đoạn thẳng '+doan+' là '+anNoi+' của hình tròn tâm O.» Em thấy thế nào?</div>', choices:ch2, correct:ch2.indexOf(dung2), sai:s2, goiY:gy()}; }
    var u=pick(UOC.filter(function(x){ return x[0]<=2; })), saiDo=pick(u[3]), dung3='Không đồng ý, vì '+u[1].toLowerCase()+' '+u[2]+' mới hợp lí', sai3='Đồng ý, vì '+saiDo+' là số đo hợp lí', ch3=shuffle([dung3,sai3]), s3={}; s3[String(ch3.indexOf(sai3))]='uoc-luong-sai';
    return {type:'mcq', cot:1, _lv:3, _vat:u[1], _dung:dung3, q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «'+u[1]+' <b>'+saiDo+'</b>.» Em thấy thế nào?</div>', choices:ch3, correct:ch3.indexOf(dung3), sai:s3, goiY:gy()};
  }, check:function(q){
    if(q._lv<=1){ var vat=q._a+q._b-q._c; return vat>0 && q.choices.length===2 && q.choices.every(okEq) && kiemMCQ(q) && /^Đồng ý/.test(q._dung)===(q._x===vat); }
    if(q._lv===2){ var loai=docTronOD(q.q); return kiemMCQ(q) && q.choices.length===2 && /^Không đồng ý/.test(q._dung) && ((q._doan==='OA' && loai.OA==='bk') || (q._doan==='AB' && loai.AB==='dk')); }
    var u=UOC.filter(function(x){ return x[1]===q._vat; })[0]; return !!u && kiemMCQ(q) && q.choices.length===2 && /^Không đồng ý/.test(q._dung) && q._dung.indexOf(u[2])>0; }}
 ]
};
