/* bai-17.js — Bài 17: Hình tròn. Tâm, bán kính, đường kính của hình tròn. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH ngay từ đầu.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-17.md) và chỉnh sửa của thầy trên PR:
   4 MỤC TIÊU (muctieu) × 8 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Thao tác vẽ bằng com pa của sách đổi thành nhận ra / chọn hình vẽ đúng. Mọi số đo do mã tính từ toạ độ và khớp hình;
   check() tính lại "qua tâm / không qua tâm" từ góc của điểm, không tin nhãn. Không số thập phân; đường kính luôn chẵn.
   Từ ngữ lớp 3: "nằm sát nhau (chạm nhau)", không dùng "tiếp xúc".
   Hình mới viết ngay trong file này (không sửa figures.js): hinhTron, baHoaTron.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn17(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
var CHU=['A','B','C','D','M','N','P','Q'];
function chuMoi(){ return shuffle(CHU.slice()); }
/* Khoảng cách góc (độ) giữa hai góc, trong [0,180] */
function lechGoc(a, b){ var d=Math.abs(a-b)%360; return d>180 ? 360-d : d; }

/* ---- Hình mới 1: hình tròn tâm O. sp = {pts:[{t, ang, k}], seg:[[tên, tên, nhãn?]]}
   Điểm t nằm ở góc ang (độ), cách tâm k lần bán kính (k=1: trên đường tròn; k<1: bên trong; k>1: bên ngoài). 'O' là tâm. ---- */
function viTri(sp, t){
  var C=130, R=84;
  if(t==='O') return [C, C];
  for(var i=0;i<sp.pts.length;i++) if(sp.pts[i].t===t){ var a=sp.pts[i].ang*Math.PI/180, k=sp.pts[i].k||1; return [C+R*k*Math.cos(a), C-R*k*Math.sin(a)]; }
  return null;
}
function hinhTron(sp, px){
  var C=130, R=84, s=svgX(260, 260, px||240), i;
  s+='<circle cx="'+C+'" cy="'+C+'" r="'+R+'" fill="'+HM.troi+'" fill-opacity="0.22" stroke="currentColor" stroke-width="3"/>';
  sp.seg.forEach(function(g){ var a=viTri(sp,g[0]), b=viTri(sp,g[1]); s+='<line x1="'+a[0].toFixed(1)+'" y1="'+a[1].toFixed(1)+'" x2="'+b[0].toFixed(1)+'" y2="'+b[1].toFixed(1)+'" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'; });
  /* Nhãn độ dài: kẹp CẢ đoạn nó đo bằng một ngoặc song song với đoạn (hai đầu có vạch), nhãn nằm giữa ngoặc. Ngoặc dời sang bên trái / phía trên. */
  var hop=[];
  sp.seg.forEach(function(g){ if(g[2]){ var a=viTri(sp,g[0]), b=viTri(sp,g[1]), dx=b[0]-a[0], dy=b[1]-a[1], ln=Math.hypot(dx,dy)||1, nx=-dy/ln, ny=dx/ln, d=26;
      if(nx>0.05 || (Math.abs(nx)<=0.05 && ny>0)){ nx=-nx; ny=-ny; }
      var a2=[a[0]+nx*d, a[1]+ny*d], b2=[b[0]+nx*d, b[1]+ny*d], px0=Math.round((a2[0]+b2[0])/2), py0=Math.round((a2[1]+b2[1])/2), f=function(v){ return v.toFixed(1); };
      s+='<path d="M'+f(a[0])+' '+f(a[1])+' L'+f(a2[0]+nx*6)+' '+f(a2[1]+ny*6)+' M'+f(b[0])+' '+f(b[1])+' L'+f(b2[0]+nx*6)+' '+f(b2[1]+ny*6)+'" stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="3 3" stroke-opacity="0.7"/>'
       +'<path d="M'+f(a2[0]+nx*6)+' '+f(a2[1]+ny*6)+' L'+f(a2[0]-nx*6)+' '+f(a2[1]-ny*6)+' M'+f(b2[0]+nx*6)+' '+f(b2[1]+ny*6)+' L'+f(b2[0]-nx*6)+' '+f(b2[1]-ny*6)+' M'+f(a2[0])+' '+f(a2[1])+' L'+f(b2[0])+' '+f(b2[1])+'" stroke="'+HM.doDam+'" stroke-width="2.5" stroke-linecap="round" fill="none"/>';
      hop.push([px0-29, py0-12, px0+29, py0+12]);
      s+=nhanVien(px0, py0, 58, 24, g[2], 16); } });
  /* chữ O: thử bốn góc quanh tâm, chọn góc không đụng nhãn cm */
  var ox=C+10, oy=C+24, tot=-1;
  [[10,24],[-26,24],[10,-10],[-26,-10]].forEach(function(c){ var bx=[C+c[0]-2, C+c[1]-20, C+c[0]+22, C+c[1]+4], d=0; hop.forEach(function(h){ if(bx[0]<h[2]+4 && bx[2]>h[0]-4 && bx[1]<h[3]+4 && bx[3]>h[1]-4) d++; });
    if(tot<0 && d===0){ tot=1; ox=C+c[0]; oy=C+c[1]; } });
  s+='<circle cx="'+C+'" cy="'+C+'" r="5.5" fill="'+HM.cam+'"/><text x="'+ox+'" y="'+oy+'" font-size="20" '+HFONT+' fill="currentColor">O</text>';
  sp.pts.forEach(function(p){ var a=p.ang*Math.PI/180, k=p.k||1, x=C+R*k*Math.cos(a), y=C-R*k*Math.sin(a), lx=C+(R*k+18)*Math.cos(a), ly=C-(R*k+18)*Math.sin(a)+7;
    s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="5.5" fill="'+HM.cam+'"/><text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+p.t+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
/* Phân loại một đoạn từ góc nhìn hình học: 'bk' bán kính · 'dk' đường kính · 'day' dây không qua tâm · 'khac' còn lại */
function loaiDoan(sp, a, b){
  function P(t){ for(var i=0;i<sp.pts.length;i++) if(sp.pts[i].t===t) return sp.pts[i]; return null; }
  if(a==='O' || b==='O'){ var q=P(a==='O' ? b : a); return q && (q.k||1)===1 ? 'bk' : 'khac'; }
  var p=P(a), r=P(b); if(!p || !r || (p.k||1)!==1 || (r.k||1)!==1) return 'khac';
  return lechGoc(p.ang, r.ang)===180 ? 'dk' : 'day';
}
/* Chọn các cặp góc: nd đường kính (hai đầu đối nhau), nday dây KHÔNG qua tâm, nle điểm lẻ; mọi điểm cách nhau >= sep độ */
function layGoc(nd, nday, nle, sep){
  for(var tr=0;tr<4000;tr++){
    var ds=[], tat=[], ok=true, i, a, b;
    function them(g){ for(var j=0;j<tat.length;j++) if(lechGoc(tat[j],g)<sep) return false; tat.push(g); return true; }
    for(i=0;i<nd && ok;i++){ a=5*rnd(0,71); if(!them(a) || !them((a+180)%360)) ok=false; else ds.push([a,(a+180)%360]); }
    var days=[]; for(i=0;i<nday && ok;i++){ a=5*rnd(0,71); b=(a+5*rnd(12,28)*(Math.random()<0.5?1:-1)+720)%360; if(lechGoc(a,b)>=140 || lechGoc(a,b)<60 || !them(a) || !them(b)) ok=false; else days.push([a,b]); }
    var le=[]; for(i=0;i<nle && ok;i++){ a=5*rnd(0,71); if(!them(a)) ok=false; else le.push(a); }
    if(ok) return {dk:ds, day:days, le:le};
  }
  if(sep>14) return layGoc(nd, nday, nle, sep-6);   /* không xếp được: nới khoảng cách tối thiểu rồi thử lại */
  return {dk:[[30,210],[120,300],[75,255]].slice(0,nd), day:[[100,215],[330,60],[160,260]].slice(0,nday), le:[10,160,250].slice(0,nle)};
}

/* ---- Hình mới 2: các hình tròn nằm sát nhau trên một hàng (tâm thẳng hàng); rs = bán kính (cm) từng hình.
   Mỗi hình tròn có MỘT đoạn bán kính vẽ thẳng từ tâm lên điểm trên đường tròn, nhãn cm nằm ngay trên đầu đoạn đó (mỗi đoạn một nhãn).
   duong = true: vẽ đường bò A–B–C–D (A ở mép trái hình đầu, D ở mép phải hình cuối, B và C là tâm hai hình ngoài cùng). ---- */
function baHoaTron(rs, duong){
  var tong=rs.reduce(function(a,b){ return a+b; },0), mx=Math.max.apply(null, rs), k=Math.min(80/mx, 250/(2*tong)), W=300, x0=(W-2*tong*k)/2, y=Math.round(mx*k+36), H=Math.round(y+mx*k+12), s=svgX(W, H), cx=[], x=x0, i, ten, f=function(v){ return v.toFixed(1); };
  ten = rs.length===3 ? ['B','O','C'] : (rs.length===2 ? ['B','C'] : ['B']);
  for(i=0;i<rs.length;i++){ cx.push(x+rs[i]*k); x+=2*rs[i]*k; }
  for(i=0;i<rs.length;i++) s+='<circle cx="'+f(cx[i])+'" cy="'+y+'" r="'+f(rs[i]*k)+'" fill="'+HM.xanhLa+'" fill-opacity="0.28" stroke="currentColor" stroke-width="2.5"/>';
  if(duong){ s+='<path d="M'+f(x0)+' '+y+' L'+f(x0+2*tong*k)+' '+y+'" stroke="'+HM.doDam+'" stroke-width="5" stroke-linecap="round"/>'; }
  for(i=0;i<rs.length;i++){ var top=y-rs[i]*k;
    s+='<path d="M'+f(cx[i])+' '+y+' L'+f(cx[i])+' '+f(top)+'" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="'+f(cx[i])+'" cy="'+f(top)+'" r="4.5" fill="'+HM.cam+'"/>'
     +nhanVien(Math.round(cx[i]), Math.round(top-18), 48, 24, rs[i]+' cm', 16);
    s+='<circle cx="'+f(cx[i])+'" cy="'+y+'" r="5.5" fill="'+HM.cam+'"/><text x="'+f(cx[i])+'" y="'+(y+26)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+ten[i]+'</text>'; }
  if(duong){ s+='<circle cx="'+f(x0)+'" cy="'+y+'" r="5.5" fill="'+HM.cam+'"/><text x="'+f(x0-8)+'" y="'+(y+26)+'" text-anchor="end" font-size="20" '+HFONT+' fill="currentColor">A</text>'
    +'<circle cx="'+f(x0+2*tong*k)+'" cy="'+y+'" r="5.5" fill="'+HM.cam+'"/><text x="'+f(x0+2*tong*k+8)+'" y="'+(y+26)+'" text-anchor="start" font-size="20" '+HFONT+' fill="currentColor">D</text>'; }
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
/* khoảng cách hai tâm ngoài cùng B và C (cm) từ danh sách bán kính */
function bcTu(rs){ var t=0, i; for(i=0;i<rs.length;i++) t+=2*rs[i]; return t-rs[0]-rs[rs.length-1]; }

var BAI = {
 n: 17,
 title: 'Hình Tròn. Tâm, Bán Kính, Đường Kính',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-ban-kinh-duong-kinh':'Nhầm bán kính với đường kính', 'nham-day-duong-kinh':'Nhầm dây không qua tâm là đường kính', 'nham-bc':'Nhầm khoảng cách giữa hai tâm',
       'quen-doan-dau-cuoi':'Quên đoạn đầu và đoạn cuối của đường bò', 'chia-doi-sai':'Nhầm khi chia đôi độ dài', 'nham-giua-trung-diem':'Nhầm trung điểm với một điểm khác'},
 muctieu: [
  {id:'MT1', ten:'Nhận ra tâm, bán kính, đường kính', muc:['Nhận ra tâm O, một bán kính, một đường kính trên hình tròn có nhãn.', 'Nhiều đoạn trên hình: chọn đúng đoạn là bán kính, đúng đoạn là đường kính.', 'Nhận ra hình VẼ ĐÚNG trong các hình gần giống nhau; đoạn dài gấp đôi bán kính.']},
  {id:'MT2', ten:'Đường kính hay dây?', muc:['Đoạn đi qua tâm là đường kính (hình đơn giản).', 'Phân biệt đường kính với dây CD KHÔNG qua tâm (bẫy).', 'Tìm lỗi của bạn; đếm số đường kính trên hình.']},
  {id:'MT3', ten:'Quan hệ trong hình tròn', muc:['Tâm là trung điểm của đường kính; đổi bán kính ra đường kính (số nhỏ).', 'Đổi giữa bán kính và đường kính, đường kính là số chẵn; biết AB tìm AO.', 'Hai đường kính cắt nhau ở đâu; so sánh các đoạn.']},
  {id:'MT4', ten:'Tính độ dài trên hình ghép', muc:['Hai hình tròn nằm sát nhau: khoảng cách giữa hai tâm.', 'Ba hình tròn nằm sát nhau: BC bằng 4 lần bán kính (bẫy: 2 lần).', 'Đường bò A–B–C–D có đoạn đầu và đoạn cuối; bán kính các hình khác nhau.']}
 ],
 topics: [
  /* D1 — Nhận ra tâm, bán kính, đường kính (Khám phá, Hoạt động) */
  {name:'Tâm, bán kính, đường kính', sec:'Khám phá, Hoạt động — Tâm, bán kính, đường kính', mt:['MT1'], levels:3,
   muc:['Hình tròn tâm O: chọn tâm, bán kính, đường kính.', 'Nhiều đoạn trên hình: chọn đúng tên.', 'Đoạn nào dài gấp đôi bán kính.'],
   make:function(lv){
    var nm=chuMoi(), sp, ch, dung, kieu, cau, sai={}, i;
    if(lv<=1){ var g=layGoc(1,0,1,50), M=nm[0], A=nm[1], B=nm[2]; sp={pts:[{t:M,ang:g.le[0]},{t:A,ang:g.dk[0][0]},{t:B,ang:g.dk[0][1]}], seg:[['O',M],[A,B]]};
      kieu=pick(['tam','bk','dk']);
      if(kieu==='tam'){ ch=shuffle(['O',M,A]); dung='O'; cau='Điểm nào là <b>tâm</b> của hình tròn?'; }
      else if(kieu==='bk'){ ch=shuffle(['O'+M, A+B]); dung='O'+M; cau='Đoạn thẳng nào là <b>bán kính</b>?'; }
      else { ch=shuffle(['O'+M, A+B]); dung=A+B; cau='Đoạn thẳng nào là <b>đường kính</b>?'; }
      ch.forEach(function(c,k){ if(c!==dung) sai[String(k)] = kieu==='tam' ? 'lech-nhom' : 'nham-ban-kinh-duong-kinh'; });
      return {type:'mcq', _sp:sp, _kieu:kieu, _dung:dung, q:hinhTron(sp)+'<div>'+cau+'</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'lech-nhom':'Tâm là điểm ở chính giữa hình tròn, bé thấy chữ O.', 'nham-ban-kinh-duong-kinh':'Bán kính nối tâm O với một điểm trên đường tròn. Đường kính đi qua tâm, hai đầu trên đường tròn.'}}; }
    if(lv===2){ var g2=layGoc(2,0,2,34), M2=nm[0], N2=nm[1], A2=nm[2], B2=nm[3], C2=nm[4], D2=nm[5];
      sp={pts:[{t:M2,ang:g2.le[0]},{t:N2,ang:g2.le[1]},{t:A2,ang:g2.dk[0][0]},{t:B2,ang:g2.dk[0][1]},{t:C2,ang:g2.dk[1][0]},{t:D2,ang:g2.dk[1][1]}], seg:[['O',M2],['O',N2],[A2,B2],[C2,D2]]};
      var dk = Math.random()<0.5; if(dk){ ch=shuffle([A2+B2, 'O'+M2, 'O'+N2]); dung=A2+B2; cau='Đoạn thẳng nào là <b>đường kính</b>?'; } else { ch=shuffle(['O'+M2, A2+B2, C2+D2]); dung='O'+M2; cau='Đoạn thẳng nào là <b>bán kính</b>?'; }
      ch.forEach(function(c,k){ if(c!==dung) sai[String(k)]='nham-ban-kinh-duong-kinh'; });
      return {type:'mcq', _sp:sp, _kieu:(dk?'dk':'bk'), _dung:dung, q:hinhTron(sp)+'<div>'+cau+'</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'nham-ban-kinh-duong-kinh':'Bán kính nối tâm O với một điểm trên đường tròn. Đường kính đi qua tâm, hai đầu trên đường tròn.'}}; }
    var g3=layGoc(1,0,3,34), M3=nm[0], N3=nm[1], P3=nm[2], A3=nm[3], B3=nm[4];
    sp={pts:[{t:M3,ang:g3.le[0]},{t:N3,ang:g3.le[1]},{t:P3,ang:g3.le[2]},{t:A3,ang:g3.dk[0][0]},{t:B3,ang:g3.dk[0][1]}], seg:[['O',M3],['O',N3],['O',P3],[A3,B3]]};
    ch=shuffle([A3+B3, 'O'+N3, 'O'+P3]); dung=A3+B3; ch.forEach(function(c,k){ if(c!==dung) sai[String(k)]='nham-ban-kinh-duong-kinh'; });
    return {type:'mcq', _sp:sp, _kieu:'gap', _M:M3, _dung:dung, q:hinhTron(sp)+'<div>Đoạn thẳng nào <b>dài gấp đôi</b> đoạn thẳng O'+M3+'?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'nham-ban-kinh-duong-kinh':'Các bán kính đều bằng nhau. Đường kính dài gấp đôi bán kính.'}};
  }, check:function(q){ var sp=q._sp;
    if(q._kieu==='tam') return q._dung==='O' && q.choices.filter(function(c){ return c==='O'; }).length===1 && kiemMCQ(q);
    var loai = (q._kieu==='bk') ? 'bk' : 'dk', ok=q.choices.filter(function(c){ return loaiDoan(sp, c[0], c[1])===loai; });
    return ok.length===1 && ok[0]===q._dung && kiemMCQ(q); }},

  /* D2 — Hình vẽ đúng: nhận ra hình vẽ đúng (Luyện tập 1: vẽ bằng com pa đổi thành chọn hình) */
  {name:'Hình vẽ đúng', sec:'Luyện tập 1 — Hình nào vẽ đúng?', mt:['MT1'], levels:3,
   muc:['Hình nào vẽ đúng đường kính AB: các hình khác hẳn nhau.', 'Hình nào vẽ đúng đường kính AB: các dây lệch ít.', 'Hình nào vẽ đúng bán kính OM: M trên, trong hay ngoài đường tròn.'],
   make:function(lv){
    var codes, dung, cau;
    function spDk(a, b){ return {pts:[{t:'A',ang:a},{t:'B',ang:b}], seg:[['A','B']]}; }
    if(lv<=2){ var a0=5*rnd(0,35), sai1 = lv<=1 ? [(a0+90)%360, (a0+270)%360] : [(a0+150)%360, (a0+210)%360];
      codes=['dk:'+a0+':'+((a0+180)%360), 'dk:'+a0+':'+sai1[0], 'dk:'+a0+':'+sai1[1]]; if(lv>=2){ codes[1]='dk:'+a0+':'+((a0+155)%360); codes[2]='dk:'+a0+':'+((a0+205)%360); }
      dung=codes[0]; cau='Hình nào vẽ <b>đúng</b> đường kính AB của hình tròn tâm O?'; }
    else { var a1=5*rnd(0,71); codes=['bk:'+a1+':1', 'bk:'+a1+':0.55', 'bk:'+a1+':1.2']; dung=codes[0]; cau='Hình nào vẽ <b>đúng</b> bán kính OM của hình tròn tâm O?'; }
    shuffle(codes);
    function sp(c){ var p=c.split(':'); if(p[0]==='dk') return spDk(+p[1], +p[2]); return {pts:[{t:'M',ang:+p[1],k:+p[2]}], seg:[['O','M']]}; }
    var sai={}; codes.forEach(function(c,i){ if(c!==dung) sai[String(i)] = c.split(':')[0]==='dk' ? 'nham-day-duong-kinh' : 'nham-ban-kinh-duong-kinh'; });
    return {type:'mcq', cot:1, figFn:function(c){ return hinhTron(sp(c), 190); }, _codes:codes, _dung:dung, q:'<div>'+cau+'</div>', choices:codes, correct:codes.indexOf(dung), sai:sai,
      goiY:{'nham-day-duong-kinh':'Đường kính phải đi qua tâm O. Bé xem đoạn AB có qua O không.', 'nham-ban-kinh-duong-kinh':'Bán kính nối tâm O với một điểm TRÊN đường tròn: M không được ở trong hay ngoài đường tròn.'}};
  }, check:function(q){ var okc=q.choices.filter(function(c){ var p=c.split(':'); return p[0]==='dk' ? lechGoc(+p[1], +p[2])===180 : (+p[2])===1; });
    var xa=q.choices.every(function(c){ var p=c.split(':'); return p[0]==='dk' ? (lechGoc(+p[1], +p[2])===180 || Math.abs(lechGoc(+p[1], +p[2])-180)>=20) : true; });
    return okc.length===1 && okc[0]===q._dung && xa && kiemMCQ(q); }},

  /* D3 — Đường kính hay dây? (Hoạt động: bẫy dây CD không qua tâm) */
  {name:'Đường kính hay dây', sec:'Hoạt động — Đường kính hay dây?', mt:['MT2'], levels:3,
   muc:['Một đoạn qua tâm: có phải đường kính không.', 'Dây CD không qua tâm: có phải đường kính không (bẫy).', 'Nhiều đoạn: đếm số đường kính.'],
   make:function(lv){
    var nm=chuMoi();
    if(lv<=2){ var qua = lv<=1 ? true : (Math.random()<0.4), g=layGoc(qua?1:0, qua?0:1, 1, 50), sp, X, Y, le=nm[2];
      X=nm[0]; Y=nm[1]; var ang = qua ? g.dk[0] : g.day[0]; sp={pts:[{t:X,ang:ang[0]},{t:Y,ang:ang[1]}], seg:[[X,Y]]};
      var dung = qua ? 'Đ' : 'S';
      return {type:'mcq', figFn:dsBtn17, _sp:sp, _X:X, _Y:Y, _dung:dung, q:hinhTron(sp)+'<div class="text-xl font-extrabold text-orange-700 my-1">'+X+Y+' là đường kính của hình tròn tâm O</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:(qua?0:1), sai:(qua?{}:{'0':'nham-day-duong-kinh'}), goiY:{'nham-day-duong-kinh':'Đoạn '+X+Y+' nối hai điểm trên đường tròn nhưng KHÔNG đi qua tâm O, nên không phải đường kính.', 'chung':'Bé xem đoạn thẳng có đi qua tâm O không.'}}; }
    var kd=rnd(1,3), kday=4-kd, g3=layGoc(kd, kday, 0, 28), pts=[], seg=[], i;
    for(i=0;i<kd;i++){ pts.push({t:nm[2*i],ang:g3.dk[i][0]}); pts.push({t:nm[2*i+1],ang:g3.dk[i][1]}); seg.push([nm[2*i],nm[2*i+1]]); }
    for(i=0;i<kday;i++){ var a=nm[2*(kd+i)], b=nm[2*(kd+i)+1]; pts.push({t:a,ang:g3.day[i][0]}); pts.push({t:b,ang:g3.day[i][1]}); seg.push([a,b]); }
    var sp3={pts:pts, seg:seg};
    return {type:'num', _sp:sp3, _e:kd, q:hinhTron(sp3)+'<div>Trên hình có bao nhiêu đoạn thẳng là <b>đường kính</b>?</div>', ans:kd, unit:'đoạn',
      sai:nhanSai([[kd+1,'nham-day-duong-kinh'],[kd+2,'nham-day-duong-kinh'],[kd-1,'lech-nhom']], kd), goiY:{'nham-day-duong-kinh':'Chỉ đoạn nào đi qua tâm O mới là đường kính. Bé loại các dây không qua tâm.', 'lech-nhom':'Bé đếm lại các đoạn đi qua tâm O.'}};
  }, check:function(q){ var sp=q._sp;
    if(q.type==='num'){ var n=sp.seg.filter(function(g){ return loaiDoan(sp, g[0], g[1])==='dk'; }).length; return n===q._e && q.ans===n && n>=1; }
    var t=(loaiDoan(sp, q._X, q._Y)==='dk'); return (q._dung==='Đ')===t && q.correct===(t?0:1) && q.choices.join()==='Đ,S'; }},

  /* D4 — Đúng hay sai? Tìm lỗi (không có trong SGK) */
  {name:'Đúng / Sai', sec:'Tìm lỗi — Bạn nói đúng hay sai?', mt:['MT2'], levels:3,
   muc:['Bạn nói OM là đường kính: đúng hay sai.', 'Bạn nói dây gần tâm là đường kính: đúng hay sai.', 'Chọn lý do vì sao bạn sai.'],
   make:function(lv){
    var nm=chuMoi(), C=nm[0], D=nm[1], M=nm[2];
    if(lv<=1){ var laDk=Math.random()<0.5, g=layGoc(1,0,1,50), sp={pts:[{t:M,ang:g.le[0]},{t:C,ang:g.dk[0][0]},{t:D,ang:g.dk[0][1]}], seg:[['O',M],[C,D]]}, X = laDk ? C+D : 'O'+M, dung = laDk ? 'Đ' : 'S';
      return {type:'mcq', figFn:dsBtn17, _sp:sp, _X:X, _dung:dung, q:hinhTron(sp)+'<div class="text-lg font-bold text-slate-700 my-1">Bạn An nói: "'+X+' là đường kính."</div><div class="text-base text-slate-500">Bạn An nói đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:(laDk?0:1), sai:(laDk?{}:{'0':'nham-ban-kinh-duong-kinh'}), goiY:{'nham-ban-kinh-duong-kinh':'O'+M+' nối tâm O với M trên đường tròn: đó là bán kính, không phải đường kính.', 'chung':'Đường kính đi qua tâm O, hai đầu trên đường tròn.'}}; }
    var gc=layGoc(0,1,0,40), sp2={pts:[{t:C,ang:gc.day[0][0]},{t:D,ang:gc.day[0][1]}], seg:[[C,D]]}, X2=C+D;
    var cau='<div class="text-lg font-bold text-slate-700 my-1">Bạn An nói: "'+X2+' là đường kính vì '+X2+' nối hai điểm trên đường tròn."</div>';
    if(lv===2) return {type:'mcq', figFn:dsBtn17, _sp:sp2, _X:X2, _dung:'S', q:hinhTron(sp2)+cau+'<div class="text-base text-slate-500">Bạn An nói đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:1, sai:{'0':'nham-day-duong-kinh'}, goiY:{'nham-day-duong-kinh':'Đường kính phải đi qua TÂM O. '+X2+' không đi qua O.', 'chung':'Bé xem '+X2+' có đi qua tâm O không.'}};
    var dung3='Sai, vì '+X2+' không đi qua tâm O.', ch=shuffle([dung3, 'Sai, vì '+X2+' ngắn hơn bán kính.', 'Đúng, vì '+X2+' nối hai điểm trên đường tròn.']), sai={};
    ch.forEach(function(c,i){ if(c!==dung3) sai[String(i)] = c.indexOf('Đúng')===0 ? 'nham-day-duong-kinh' : 'nham-ban-kinh-duong-kinh'; });
    return {type:'mcq', cot:1, _sp:sp2, _X:X2, _dung:dung3, _ly:true, q:hinhTron(sp2)+cau+'<div>Bạn An nói sai. Vì sao?</div>', choices:ch, correct:ch.indexOf(dung3), sai:sai,
      goiY:{'nham-day-duong-kinh':'Nối hai điểm trên đường tròn chưa đủ: đường kính còn phải đi qua tâm O.', 'nham-ban-kinh-duong-kinh':'Bé xem lại: '+X2+' không đi qua tâm O, và nó dài hơn bán kính.'}};
  }, check:function(q){ var sp=q._sp, t=(loaiDoan(sp, q._X[0], q._X[1])==='dk');
    if(q._ly) return !t && kiemMCQ(q); return (q._dung==='Đ')===t && q.correct===(t?0:1) && q.choices.join()==='Đ,S'; }},

  /* D5 — Tâm là trung điểm của đường kính (Khám phá) */
  {name:'Tâm là trung điểm', sec:'Khám phá — Tâm là trung điểm của đường kính', mt:['MT3'], levels:3,
   muc:['O là trung điểm của đoạn nào.', 'Biết AB, tính AO.', 'Hai đường kính AB và CD cắt nhau tại đâu.'],
   make:function(lv){
    var nm=chuMoi();
    if(lv<=1){ var g=layGoc(1,1,0,40), A=nm[0], B=nm[1], C=nm[2], D=nm[3], sp={pts:[{t:A,ang:g.dk[0][0]},{t:B,ang:g.dk[0][1]},{t:C,ang:g.day[0][0]},{t:D,ang:g.day[0][1]}], seg:[[A,B],[C,D]]};
      var ch=shuffle([A+B, C+D, 'O'+A]), dung=A+B, sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)] = c===(C+D) ? 'nham-day-duong-kinh' : 'nham-giua-trung-diem'; });
      return {type:'mcq', _sp:sp, _dung:dung, _kieu:'td', q:hinhTron(sp)+'<div>Điểm O là trung điểm của đoạn thẳng nào?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'nham-day-duong-kinh':'O không ở giữa '+C+D+': '+C+D+' không đi qua tâm O.', 'nham-giua-trung-diem':'O là một đầu của đoạn O'+A+', nên O không là trung điểm của nó.'}}; }
    if(lv===2){ var a=2*rnd(3,8), g2=layGoc(1,0,0,40), A2=nm[0], B2=nm[1], sp2={pts:[{t:A2,ang:g2.dk[0][0]},{t:B2,ang:g2.dk[0][1]}], seg:[[A2,B2,a+' cm']]}, h=a/2;
      return {type:'num', _sp:sp2, _a:a, _e:h, q:hinhTron(sp2)+'<div>Đường kính '+A2+B2+' dài '+a+' cm. Hỏi đoạn thẳng '+A2+'O dài bao nhiêu xăng-ti-mét?</div>', ans:h, unit:'cm',
        sai:nhanSai([[a,'chia-doi-sai'],[2*a,'chia-doi-sai'],[h-1,'lech-nhom'],[h+1,'lech-nhom']], h), goiY:{'chia-doi-sai':'Tâm O là trung điểm của '+A2+B2, 'lech-nhom':'Bé nhẩm: 2 lần mấy bằng '+a+'?'}}; }
    var g3=layGoc(2,0,1,34), A3=nm[0], B3=nm[1], C3=nm[2], D3=nm[3], P3=nm[4], sp3={pts:[{t:A3,ang:g3.dk[0][0]},{t:B3,ang:g3.dk[0][1]},{t:C3,ang:g3.dk[1][0]},{t:D3,ang:g3.dk[1][1]},{t:P3,ang:g3.le[0]}], seg:[[A3,B3],[C3,D3]]};
    var dung3='Tại tâm O', ch3=shuffle([dung3, 'Tại điểm '+A3, 'Tại điểm '+P3]), sai3={}; ch3.forEach(function(c,i){ if(c!==dung3) sai3[String(i)]='nham-giua-trung-diem'; });
    return {type:'mcq', cot:1, _sp:sp3, _dung:dung3, _kieu:'cat', q:hinhTron(sp3)+'<div>Hai đường kính '+A3+B3+' và '+C3+D3+' cắt nhau tại đâu?</div>', choices:ch3, correct:ch3.indexOf(dung3), sai:sai3,
      goiY:{'nham-giua-trung-diem':'Mọi đường kính đều đi qua tâm O, nên hai đường kính cắt nhau tại tâm O.'}};
  }, check:function(q){ var sp=q._sp;
    if(q.type==='num') return q._a%2===0 && q.ans===q._a/2 && q.ans>=1 && loaiDoan(sp, sp.seg[0][0], sp.seg[0][1])==='dk';
    if(q._kieu==='cat') return sp.seg.every(function(g){ return loaiDoan(sp,g[0],g[1])==='dk'; }) && q._dung==='Tại tâm O' && kiemMCQ(q);
    var ok=q.choices.filter(function(c){ return loaiDoan(sp,c[0],c[1])==='dk'; }); return ok.length===1 && ok[0]===q._dung && kiemMCQ(q); }},

  /* D6 — Bán kính ↔ đường kính (Khám phá: đường kính = 2 lần bán kính) */
  {name:'Bán kính và đường kính', sec:'Khám phá — Đường kính gấp đôi bán kính', mt:['MT3'], levels:3,
   muc:['Biết bán kính, tìm đường kính (số nhỏ).', 'Biết đường kính (số chẵn), tìm bán kính.', 'So sánh hai hình tròn: một cho bán kính, một cho đường kính.'],
   make:function(lv){
    var nm=chuMoi(), g=layGoc(1,0,1,50), A=nm[0], B=nm[1], M=nm[2];
    if(lv<=1){ var r=rnd(2,5), sp={pts:[{t:M,ang:g.le[0]}], seg:[['O',M,r+' cm']]};
      return {type:'num', _sp:sp, _r:r, _e:2*r, _kieu:'d', q:hinhTron(sp)+'<div>Hình tròn tâm O có bán kính O'+M+' = '+r+' cm. Hỏi đường kính của hình tròn dài bao nhiêu xăng-ti-mét?</div>', ans:2*r, unit:'cm',
        sai:nhanSai([[r,'nham-ban-kinh-duong-kinh'],[r+2,'cong-thay-nhan'],[2*r-1,'lech-nhom'],[2*r+1,'lech-nhom']], 2*r), goiY:{'nham-ban-kinh-duong-kinh':'Đường kính dài gấp đôi bán kính.', 'cong-thay-nhan':'Gấp đôi nghĩa là nhân 2, không phải cộng 2.', 'lech-nhom':'Bé nhẩm: 2 × '+r+' = ?'}}; }
    if(lv===2){ var d=2*rnd(3,8), sp2={pts:[{t:A,ang:g.dk[0][0]},{t:B,ang:g.dk[0][1]}], seg:[[A,B,d+' cm']]}, h=d/2;
      return {type:'num', _sp:sp2, _d:d, _e:h, _kieu:'r', q:hinhTron(sp2)+'<div>Hình tròn tâm O có đường kính '+A+B+' = '+d+' cm. Hỏi bán kính của hình tròn dài bao nhiêu xăng-ti-mét?</div>', ans:h, unit:'cm',
        sai:nhanSai([[d,'nham-ban-kinh-duong-kinh'],[2*d,'chia-doi-sai'],[d-2,'cong-thay-nhan'],[h-1,'lech-nhom'],[h+1,'lech-nhom']], h), goiY:{'nham-ban-kinh-duong-kinh':'Bán kính chỉ bằng một nửa đường kính.', 'chia-doi-sai':'Bán kính bé hơn đường kính: lấy đường kính chia 2.', 'cong-thay-nhan':'Muốn tìm một nửa thì chia 2, không phải trừ 2.', 'lech-nhom':'Bé nhẩm: 2 × mấy = '+d+'?'}}; }
    var r3=rnd(3,8), d3 = Math.random()<0.34 ? 2*r3 : 2*rnd(3,9), dung3 = 2*r3>d3 ? 'Hình thứ nhất' : (2*r3<d3 ? 'Hình thứ hai' : 'Bằng nhau'), ch=['Hình thứ nhất','Hình thứ hai','Bằng nhau'], sai={};
    ch.forEach(function(c,i){ if(c!==dung3) sai[String(i)]='nham-ban-kinh-duong-kinh'; });
    return {type:'mcq', cot:1, _r:r3, _d:d3, _dung:dung3, q:'<div>Hình tròn thứ nhất có bán kính '+r3+' cm. Hình tròn thứ hai có đường kính '+d3+' cm.</div><div class="mt-1">Hình tròn nào lớn hơn?</div>', choices:ch, correct:ch.indexOf(dung3), sai:sai,
      goiY:{'nham-ban-kinh-duong-kinh':'Bé đổi cả hai về cùng một loại: đường kính của hình thứ nhất là '+(2*r3)+' cm. Rồi so sánh.'}};
  }, check:function(q){ if(q._kieu==='d') return q.ans===2*q._r && q._sp.seg[0][2]===q._r+' cm';
    if(q._kieu==='r') return q._d%2===0 && q.ans===q._d/2 && q.ans>=1;
    var t=2*q._r, e = t>q._d ? 'Hình thứ nhất' : (t<q._d ? 'Hình thứ hai' : 'Bằng nhau'); return e===q._dung && q._d%2===0 && kiemMCQ(q); }},

  /* D7 — Bọ ngựa bò (Luyện tập 2): ba bông hoa hình tròn nằm sát nhau, tâm B, O, C thẳng hàng */
  {name:'Bọ ngựa bò', sec:'Luyện tập 2 — Bọ ngựa bò qua ba bông hoa', mt:['MT4'], levels:3,
   muc:['Hai bông hoa nằm sát nhau: khoảng cách giữa hai tâm.', 'Ba bông hoa: BC bằng 4 bán kính (bẫy: 2 lần).', 'Bọ ngựa bò A–B–C–D: cả đoạn đầu và đoạn cuối.'],
   make:function(lv){
    var r=rnd(3,9), n = lv<=1 ? 2 : 3, rs=[], i; for(i=0;i<n;i++) rs.push(r);
    if(lv<=2){ var bc=bcTu(rs), hoi = lv<=1 ? 'Hai bông hoa hình tròn bằng nhau, bán kính '+r+' cm, nằm sát nhau (chạm nhau). B và C là tâm hai bông hoa. Hỏi BC dài bao nhiêu xăng-ti-mét?' : 'Ba bông hoa hình tròn bằng nhau, bán kính '+r+' cm, nằm sát nhau (chạm nhau). Ba tâm B, O, C thẳng hàng. Hỏi BC dài bao nhiêu xăng-ti-mét?';
      return {type:'num', _rs:rs, _kieu:'bc', _e:bc, q:baHoaTron(rs,false)+'<div>'+hoi+'</div>', ans:bc, unit:'cm',
        sai:nhanSai([[2*r,'nham-bc'],[r,'nham-bc'],[bc-r,'lech-nhom'],[bc+r,'lech-nhom']], bc), goiY:{'nham-bc':'Từ tâm B tới tâm C đi qua cả đường kính của hình tròn giữa. Bé cộng đủ các bán kính.', 'lech-nhom':'Bé đếm lại số bán kính trên đoạn BC.'}}; }
    var tong=bcTu(rs)+2*r;
    return {type:'num', _rs:rs, _kieu:'bo', _e:tong, q:baHoaTron(rs,true)+'<div>Ba bông hoa hình tròn bằng nhau, bán kính '+r+' cm, nằm sát nhau. Bọ ngựa bò từ A tới B, tới C, rồi tới D (A, D trên đường tròn). Hỏi bọ ngựa bò quãng đường dài bao nhiêu xăng-ti-mét?</div>', ans:tong, unit:'cm',
      sai:nhanSai([[bcTu(rs),'quen-doan-dau-cuoi'],[bcTu(rs)+r,'quen-doan-dau-cuoi'],[2*r+2*r,'nham-bc'],[tong-r,'lech-nhom'],[tong+r,'lech-nhom']], tong),
      goiY:{'quen-doan-dau-cuoi':'Bọ ngựa còn bò đoạn AB ở đầu và đoạn CD ở cuối, mỗi đoạn bằng một bán kính.', 'nham-bc':'BC bằng 4 bán kính, không phải 2 bán kính.', 'lech-nhom':'Bé cộng lại: AB + BC + CD.'}};
  }, check:function(q){ var rs=q._rs, n=rs.length; if(rs.some(function(v){ return v!==rs[0]; })) return false; var bc=bcTu(rs);
    if(q._kieu==='bc') return bc===(n===2 ? 2 : 4)*rs[0] && q.ans===bc && demHinh(q.q)===n;
    return q.ans===bc+2*rs[0] && q.ans===6*rs[0] && demHinh(q.q)===3; }},

  /* D8 — Hai hình tròn nằm sát nhau (không có trong SGK) */
  {name:'Hình tròn sát nhau', sec:'Hai hình tròn nằm sát nhau — khoảng cách hai tâm', mt:['MT4'], levels:3,
   muc:['Hai hình tròn nằm sát nhau: khoảng cách giữa hai tâm.', 'Ba hình tròn có bán kính khác nhau: BC.', 'Bọ ngựa bò A–B–C–D, bán kính các hình khác nhau.'],
   make:function(lv){
    var rs, n = lv<=1 ? 2 : 3, i; rs=[]; for(i=0;i<n;i++) rs.push(rnd(2,6));
    if(lv>=2 && rs.every(function(v){ return v===rs[0]; })) rs[1] = rs[1]===6 ? 5 : rs[1]+1;
    if(lv<=1 && rs[0]===rs[1]) rs[1] = rs[1]===6 ? 5 : rs[1]+1;
    var bc=bcTu(rs), r1=rs[0], rN=rs[n-1], mid=n===3 ? rs[1] : 0;
    if(lv<=1) return {type:'num', _rs:rs, _kieu:'bc', _e:bc, q:baHoaTron(rs,false)+'<div>Hai hình tròn nằm sát nhau (chạm nhau), bán kính '+r1+' cm và '+rN+' cm. B và C là tâm. Hỏi BC dài bao nhiêu xăng-ti-mét?</div>', ans:bc, unit:'cm',
      sai:nhanSai([[2*bc,'nham-bc'],[Math.abs(r1-rN),'cong-thay-nhan'],[bc-1,'lech-nhom'],[bc+1,'lech-nhom']], bc), goiY:{'nham-bc':'Từ tâm B tới tâm C là một bán kính của hình thứ nhất cộng một bán kính của hình thứ hai.', 'cong-thay-nhan':'Hai hình nằm sát nhau: bé CỘNG hai bán kính, không trừ.', 'lech-nhom':'Bé cộng lại hai bán kính.'}};
    if(lv===2) return {type:'num', _rs:rs, _kieu:'bc', _e:bc, q:baHoaTron(rs,false)+'<div>Ba hình tròn nằm sát nhau (chạm nhau), bán kính '+rs[0]+' cm, '+rs[1]+' cm và '+rs[2]+' cm. Ba tâm B, O, C thẳng hàng. Hỏi BC dài bao nhiêu xăng-ti-mét?</div>', ans:bc, unit:'cm',
      sai:nhanSai([[r1+rs[1]+rN,'nham-bc'],[r1+rN,'nham-bc'],[2*rs[1],'nham-bc'],[bc-1,'lech-nhom'],[bc+1,'lech-nhom']], bc), goiY:{'nham-bc':'BC đi qua cả đường kính của hình tròn giữa: cộng bán kính hình đầu, 2 lần bán kính hình giữa, bán kính hình cuối.', 'lech-nhom':'Bé cộng lại các đoạn trên BC.'}};
    var tong=bc+r1+rN;
    return {type:'num', _rs:rs, _kieu:'bo', _e:tong, q:baHoaTron(rs,true)+'<div>Ba hình tròn nằm sát nhau, bán kính '+rs[0]+' cm, '+rs[1]+' cm và '+rs[2]+' cm. Bọ ngựa bò từ A tới B, tới C, rồi tới D (A, D trên đường tròn). Hỏi bọ ngựa bò quãng đường dài bao nhiêu xăng-ti-mét?</div>', ans:tong, unit:'cm',
      sai:nhanSai([[bc,'quen-doan-dau-cuoi'],[bc+r1,'quen-doan-dau-cuoi'],[bc+rN,'quen-doan-dau-cuoi'],[tong-1,'lech-nhom'],[tong+1,'lech-nhom']], tong),
      goiY:{'quen-doan-dau-cuoi':'Bọ ngựa còn bò đoạn AB ở đầu và đoạn CD ở cuối.', 'lech-nhom':'Bé cộng lại: AB + BC + CD.'}};
  }, check:function(q){ var rs=q._rs, n=rs.length, bc=bcTu(rs);
    if(q._kieu==='bc') return q.ans===bc && bc===(n===2 ? rs[0]+rs[1] : rs[0]+2*rs[1]+rs[2]) && demHinh(q.q)===n;
    return n===3 && q.ans===bc+rs[0]+rs[2] && q.ans===2*(rs[0]+rs[1]+rs[2]) && demHinh(q.q)===3; }}
 ]
};
/* Đếm số hình tròn (thân hoa) trong chuỗi SVG của câu hỏi */
function demHinh(s){ var m=String(s).match(/fill-opacity="0.28"/g); return m ? m.length : 0; }
