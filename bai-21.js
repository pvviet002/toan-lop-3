/* bai-21.js — Bài 21: Khối lập phương, khối hộp chữ nhật. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-21.md) và chỉnh sửa của thầy trên PR #10:
   4 MỤC TIÊU (muctieu) × 9 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Hình khối vẽ bằng SVG phép chiếu xiên: mặt trước là hình chữ nhật (hoặc hình vuông), mặt sau dịch lên phải và lên trên; cạnh khuất nét đứt.
   Số đỉnh, cạnh, mặt do mã tính từ 8 đỉnh và 12 cạnh; mỗi cạnh tô màu, mỗi bông hoa, mỗi mặt tô màu mang data-dem để check() đếm lại.
   Khối hộp chữ nhật trong mọi câu hỏi "mặt là hình gì" có ba kích thước KHÁC nhau (không có mặt vuông). Không số thập phân.
   Hình mới viết ngay trong file này (không sửa figures.js): khoiHop, haiKhoi, duongKien, denLong.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn21(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function f1(v){ return v.toFixed(1); }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoiNoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }

/* ---- Khối hộp: 8 đỉnh A..H (A, B, C, D mặt trước: dưới trái, dưới phải, trên phải, trên trái; E, F, G, H mặt sau, E ở sau-dưới-trái là đỉnh khuất) ---- */
var CANH=[['A','B','w'],['D','C','w'],['E','F','w'],['H','G','w'],['A','D','h'],['B','C','h'],['E','H','h'],['F','G','h'],['A','E','d'],['B','F','d'],['C','G','d'],['D','H','d']];
var KHUAT={'AE':1,'EF':1,'EH':1};
var DINH_NHIN=['A','B','C','D','F','G','H'];
function idCanh(x, y){ return x<y ? x+y : y+x; }
function canhKe(x, y){ return CANH.some(function(c){ return idCanh(c[0],c[1])===idCanh(x,y); }); }
var MAU_CANH={xanh:HM.troiDam, do:HM.do, cam:HM.camDam, to:HM.do};
/* các kích thước (đơn vị vẽ): hộp chữ nhật có BA kích thước khác nhau, lập phương có ba kích thước bằng nhau */
var HOP3=[[4,2,3],[5,3,2],[3,2,4],[4,3,2],[5,2,3],[3,4,2],[5,3,4],[4,2,5]];
function kichHop(){ return pick(HOP3); }
function toaDoKhoi(a, b, c, k, ox, oy){
  var W=a*k, H=c*k, dx=b*k*0.5, dy=b*k*0.36, P={A:[ox,oy+H],B:[ox+W,oy+H],C:[ox+W,oy],D:[ox,oy]};
  ['E','F','G','H'].forEach(function(t, i){ var f=P[['A','B','C','D'][i]]; P[t]=[f[0]+dx, f[1]-dy]; });
  return {P:P, W:W, H:H, dx:dx, dy:dy};
}
function veKhoiTrong(sp, ox, oy){
  var a=sp.a, b=sp.b, c=sp.c, k=sp.k, T=toaDoKhoi(a,b,c,k,ox,oy), P=T.P, s='', cx=ox+(T.W+T.dx)/2, cy=oy+(T.H-T.dy)/2;
  function poly(ds, fill, op, dem){ return '<polygon '+(dem?'data-dem="'+dem+'" ':'')+'points="'+ds.map(function(t){ return f1(P[t][0])+','+f1(P[t][1]); }).join(' ')+'" fill="'+fill+'" fill-opacity="'+op+'" stroke="none"/>'; }
  s+='<g data-khoi="'+a+','+b+','+c+'">';
  [['ABCD','tr'],['DCGH','tren'],['BFGC','phai']].forEach(function(f){
    if(sp.mat===f[1]) s+=poly(f[0].split(''), HM.cam, 0.7, 'mat'); else s+=poly(f[0].split(''), HM.vang, 0.22, null); });
  var ht=[], nhin=[];
  CANH.forEach(function(e){ (KHUAT[idCanh(e[0],e[1])] ? ht : nhin).push(e); });
  ht.concat(nhin).forEach(function(e){
    var id=idCanh(e[0],e[1]), mau = sp.canh && sp.canh[id] ? sp.canh[id] : (sp.huong && sp.huong[e[2]] ? sp.huong[e[2]] : null), kh=!!KHUAT[id];
    s+='<line '+(mau ? 'data-dem="'+mau+'" ' : '')+'x1="'+f1(P[e[0]][0])+'" y1="'+f1(P[e[0]][1])+'" x2="'+f1(P[e[1]][0])+'" y2="'+f1(P[e[1]][1])+'" stroke="'+(mau ? MAU_CANH[mau] : 'currentColor')+'" stroke-width="'+(mau==='to' ? 6 : (mau ? 4.5 : 3))+'" stroke-linecap="round"'+(kh ? ' stroke-dasharray="7 6"' : '')+(kh && !mau ? ' stroke-opacity="0.75"' : '')+'/>'; });
  if(sp.cheo){ s+='<line data-dem="to" x1="'+f1(P[sp.cheo[0]][0])+'" y1="'+f1(P[sp.cheo[0]][1])+'" x2="'+f1(P[sp.cheo[1]][0])+'" y2="'+f1(P[sp.cheo[1]][1])+'" stroke="'+HM.do+'" stroke-width="5" stroke-linecap="round"/>'; }
  function ngoai(t, d){ var v=[P[t][0]-cx, P[t][1]-cy], l=Math.hypot(v[0],v[1])||1; return [P[t][0]+v[0]/l*d, P[t][1]+v[1]/l*d]; }
  if(sp.nhan) Object.keys(P).forEach(function(t){ var q=ngoai(t,19);
    s+='<circle cx="'+f1(P[t][0])+'" cy="'+f1(P[t][1])+'" r="4.5" fill="'+HM.cam+'"/><text x="'+f1(q[0])+'" y="'+f1(q[1]+7)+'" text-anchor="middle" font-size="19" '+HFONT+' fill="currentColor">'+t+'</text>'; });
  if(sp.dinh) s+='<circle data-dem="to" cx="'+f1(P[sp.dinh][0])+'" cy="'+f1(P[sp.dinh][1])+'" r="9" fill="'+HM.do+'"/>';
  if(sp.hoa){ var thuTu={2:[-18,18],3:[-36,0,36],4:[-54,-18,18,54],5:[-72,-36,0,36,72]}, m=sp.hoa.m;
    sp.hoa.dinh.forEach(function(t){ var v=[P[t][0]-cx, P[t][1]-cy], g0=Math.atan2(v[1],v[0]);
      s+='<circle cx="'+f1(P[t][0])+'" cy="'+f1(P[t][1])+'" r="4.5" fill="'+HM.goDam+'"/>';
      thuTu[m].forEach(function(dg){ var g=g0+dg*Math.PI/180, x=P[t][0]+25*Math.cos(g), y=P[t][1]+25*Math.sin(g), j, hoaS='<g data-dem="hoa">';
        for(j=0;j<5;j++){ var an=j*72*Math.PI/180; hoaS+='<circle cx="'+f1(x+4*Math.cos(an))+'" cy="'+f1(y+4*Math.sin(an))+'" r="3" fill="'+HM.hong+'"/>'; }
        s+=hoaS+'<circle cx="'+f1(x)+'" cy="'+f1(y)+'" r="2.6" fill="'+HM.vang+'"/></g>'; }); }); }
  if(sp.kien){ var D=sp.kien;
    var a0=ngoai(D[0],26), a1=ngoai(D[D.length-1],24), gx=a1[0], gy=a1[1];
    s+='<g transform="translate('+f1(a0[0])+' '+f1(a0[1])+') scale(1.9)" fill="'+HM.goDam+'" stroke="'+HM.goDam+'" stroke-width="1.2" stroke-linecap="round"><path d="M-8 -6 L8 6 M-8 6 L8 -6 M-10 0 L10 0 M-12 -2 L-14 -5 M-12 2 L-14 5" fill="none"/>'
     +'<circle cx="-7" cy="0" r="4" stroke="none"/><circle cx="0" cy="0" r="3.4" stroke="none"/><circle cx="7" cy="0" r="4.6" stroke="none"/></g>'
     +'<ellipse cx="'+f1(gx)+'" cy="'+f1(gy)+'" rx="12" ry="6.5" transform="rotate(-25 '+f1(gx)+' '+f1(gy)+')" fill="'+HM.vang+'" stroke="'+HM.goDam+'" stroke-width="2"/>'; }
  return s+'</g>';
}
/* khối đơn: sp = {a, b, c, k?, mat, canh, huong, cheo, nhan, dinh, hoa, kien}; k tự tính cho vừa khung 250 × 170 */
function khoiHop(sp){
  var a=sp.a, b=sp.b, c=sp.c, k=sp.k || Math.min(250/(a+0.5*b), 150/(c+0.36*b)), m = (sp.hoa || sp.kien) ? 44 : (sp.nhan ? 34 : 16), dx=b*k*0.5, dy=b*k*0.36;
  var W=Math.round(a*k+dx+2*m), H=Math.round(c*k+dy+2*m), s=svgX(W,H);
  sp.k=k;
  return khungHinh(s+veKhoiTrong(sp, m, m+dy));
}
function docKhoi(s){ var o=[], re=/<g data-khoi="(\d+),(\d+),(\d+)">/g, m; while((m=re.exec(String(s)))) o.push([+m[1],+m[2],+m[3]]); return o; }
/* nhiều khối cạnh nhau, mỗi khối có tên Khối A, B, C bên dưới; mọi khối cùng tỉ lệ k */
function haiKhoi(sps, k){
  var cw=0, ch=0, i, T=[];
  sps.forEach(function(sp){ sp.k=k; var w=sp.a*k+0.5*sp.b*k, h=sp.c*k+0.36*sp.b*k; cw=Math.max(cw,w); ch=Math.max(ch,h); });
  cw=Math.round(cw+28); var H=Math.round(ch+60), W=cw*sps.length, s=svgX(W,H), ten=['A','B','C'];
  sps.forEach(function(sp, idx){ var w=sp.a*k+0.5*sp.b*k, ox=idx*cw+(cw-w)/2, oy=14+ch-(sp.c*k+0.36*sp.b*k)+0.36*sp.b*k;
    s+=veKhoiTrong(sp, ox, oy)+'<text x="'+(idx*cw+cw/2)+'" y="'+(H-12)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">Khối '+ten[idx]+'</text>'; });
  return khungHinh(s);
}
/* đỉnh và cạnh của khối: mã tính, không tin nhãn */
function demDinh(){ return DINH_NHIN.length+1; }
function demCanh(){ return CANH.length; }
function demMat(){ return 6; }

/* ---- Hình mới 2 (D5): đường đi của con kiến trên khung hộp: dãy đỉnh liền nhau theo các cạnh; mỗi cạnh trên đường đi là một nét cam data-dem="cam" ---- */
function lapDuong(L, canKhuat){
  var tu={}, ten=['A','B','C','D','E','F','G','H'];
  ten.forEach(function(t){ tu[t]=[]; });
  CANH.forEach(function(e){ tu[e[0]].push(e[1]); tu[e[1]].push(e[0]); });
  for(var tr=0;tr<5000;tr++){
    var v=pick(DINH_NHIN), D=[v], kq=true, i;
    for(i=0;i<L;i++){ var ds=tu[D[D.length-1]].filter(function(x){ return D.indexOf(x)<0; }); if(!ds.length){ kq=false; break; } D.push(pick(ds)); }
    if(!kq || D[D.length-1]==='E') continue;
    var kh=0; for(i=0;i<L;i++) if(KHUAT[idCanh(D[i],D[i+1])]) kh++;
    if(canKhuat ? kh<1 : kh>0) continue;
    return D;
  }
  return null;
}
function canhDuong(D){ var o={}, i; for(i=0;i<D.length-1;i++) o[idCanh(D[i],D[i+1])]='cam'; return o; }
function duongHopLe(D){ var i, seen={}; for(i=0;i<D.length-1;i++){ if(!canhKe(D[i],D[i+1])) return false; var id=idCanh(D[i],D[i+1]); if(seen[id]) return false; seen[id]=1; } return true; }

/* ---- Hình mới 3 (D7): đèn lồng khối lập phương: khung nan tre (12 cạnh) và mặt dán giấy màu; n đèn xếp thành hàng, mỗi đèn mang data-dem="den" ---- */
function denLong(n){
  var cols=Math.min(n,3), rows=Math.ceil(n/cols), u=46, dx=0.5*u, dy=0.36*u, cw=Math.round(u+dx+22), ch=Math.round(u+dy+20), mau=[HM.do,HM.cam,HM.vang,HM.hong,HM.la,HM.troi], s=svgX(cols*cw, rows*ch), i;
  for(i=0;i<n;i++){
    var ox=(i%cols)*cw+11, oy=Math.floor(i/cols)*ch+10+dy, T=toaDoKhoi(1,1,1,u,ox,oy), P=T.P, m=mau[i%mau.length];
    function pl(ds, op, dem){ return '<polygon '+(dem?'data-dem="'+dem+'" ':'')+'points="'+ds.map(function(t){ return f1(P[t][0])+','+f1(P[t][1]); }).join(' ')+'" fill="'+m+'" fill-opacity="'+op+'" stroke="none"/>'; }
    s+=pl(['A','B','C','D'],0.55,'den')+pl(['D','C','G','H'],0.35,null)+pl(['B','F','G','C'],0.75,null);
    CANH.forEach(function(e){ var kh=!!KHUAT[idCanh(e[0],e[1])];
      s+='<line x1="'+f1(P[e[0]][0])+'" y1="'+f1(P[e[0]][1])+'" x2="'+f1(P[e[1]][0])+'" y2="'+f1(P[e[1]][1])+'" stroke="'+HM.go+'" stroke-width="3.2" stroke-linecap="round"'+(kh ? ' stroke-dasharray="6 5" stroke-opacity="0.8"' : '')+'/>'; });
  }
  return khungHinh(s);
}

/* ---- Đáp án nhiễu cho các dạng nhận xét "Em thấy thế nào?": mo(n) viết lý do có số n; x = số bạn nói, T = số đúng ---- */
function haiNhanXet(x, T, mo, altFn){
  var maiDung = x===T, alt, ch;
  if(maiDung){ if(altFn) alt=altFn(T); else { alt=T+pick([-2,-1,1,2]); if(alt<=0) alt=T+1; } ch=[['Đồng ý, vì '+mo(T), true, T],['Không đồng ý, vì '+mo(alt), false, alt]]; }
  else ch=[['Đồng ý, vì '+mo(x), true, x],['Không đồng ý, vì '+mo(T), false, T]];
  shuffle(ch);
  var idx=ch.map(function(c){ return c[2]; }).indexOf(T);
  return {choices:ch.map(function(c){ return c[0]; }), correct:idx, ds:ch};
}
function kiemNhanXet(q){
  var ds=q._ds, T=q._T, x=q._x, maiDung = x===T;
  return ds.length===2 && q.choices.length===2 && ds.filter(function(c){ return c[2]===T; }).length===1 && ds[q.correct][2]===T && ds[q.correct][1]===maiDung
    && q.choices[q.correct]===q._dung && new Set(q.choices).size===2;
}
/* một câu nói về số đỉnh / cạnh / mặt của khối: loai 'dinh' | 'canh' | 'mat' */
var SO_LOAI={dinh:8, canh:12, mat:6}, TEN_LOAI={dinh:'đỉnh', canh:'cạnh', mat:'mặt'};
function soThat(loai){ return loai==='dinh' ? demDinh() : (loai==='canh' ? demCanh() : demMat()); }

var BAI = {
 n: 21,
 title: 'Khối Lập Phương, Khối Hộp Chữ Nhật',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-dinh-canh-mat':'Nhầm đỉnh, cạnh, mặt', 'nham-hinh-mat':'Nhầm hình của mặt', 'dem-sot-canh':'Đếm sót hoặc thừa cạnh', 'nham-lap-phuong':'Nhầm khối lập phương với khối hộp chữ nhật'},
 muctieu: [
  {id:'MT1', ten:'Nhận biết khối: đỉnh, cạnh, mặt', muc:['Khối có mấy đỉnh, mấy cạnh, mấy mặt; chỉ ra phần được tô là đỉnh, cạnh hay mặt.', 'Hai khối cùng đếm; nhận ra tên mặt được tô; đoạn nét đứt vẫn là cạnh.', 'Đúng hay sai về số đỉnh, cạnh, mặt; khối nào là khối lập phương (các cạnh ghi cm).']},
  {id:'MT2', ten:'Mặt của khối', muc:['Mặt tô màu của khối lập phương là hình gì.', 'Tấm gỗ vừa khít mặt trước của khung hộp chữ nhật là hình gì.', 'Mặt trên, mặt bên của khối hộp chữ nhật và khối lập phương là hình gì.']},
  {id:'MT3', ten:'Đếm cạnh', muc:['Đếm cạnh xanh (4 cạnh); con kiến bò qua 3 cạnh.', 'Đếm cạnh đỏ (8 cạnh); kiến bò qua 4–5 cạnh.', 'Cộng, so sánh số cạnh xanh và đỏ; kiến bò qua 6 cạnh, có cả cạnh khuất.']},
  {id:'MT4', ten:'Vận dụng phép nhân', muc:['Hoa ở mỗi đỉnh: 8 × 3; đèn lồng có 12 nan, 6 tờ giấy.', 'Mỗi đỉnh 2, 4, 5 bông hoa; n đèn lồng cần bao nhiêu tờ giấy.', 'Hoa chỉ ở 4 đỉnh; n đèn lồng cần bao nhiêu nan tre, nan tre nhiều hơn tờ giấy bao nhiêu.']}
 ],
 topics: [
  /* D1 — Đỉnh, cạnh, mặt (Khám phá) */
  {name:'Đỉnh, cạnh, mặt', sec:'Khám phá — Khối hộp chữ nhật và khối lập phương có mấy đỉnh, mấy cạnh, mấy mặt', mt:['MT1'], levels:3,
   muc:['Khối hộp chữ nhật hoặc khối lập phương có mấy đỉnh, cạnh hoặc mặt.', 'Cả hai khối (hộp chữ nhật và lập phương) có tất cả mấy đỉnh, cạnh hoặc mặt.', 'Đúng hay sai: câu nói về số đỉnh, cạnh, mặt của khối.'],
   make:function(lv){
    var loai=pick(['dinh','canh','mat']), T=SO_LOAI[loai], lap=Math.random()<0.5, kt = lap ? [3,3,3] : kichHop();
    if(lv<=1){
      return {type:'num', _lv:1, _loai:loai, q:khoiHop({a:kt[0],b:kt[1],c:kt[2]})+'<div>Đây là khối '+(lap ? 'lập phương' : 'hộp chữ nhật')+'. Khối có bao nhiêu <b>'+TEN_LOAI[loai]+'</b>?</div>', ans:T, unit:TEN_LOAI[loai],
        sai:nhanSai([[loai==='dinh' ? 7 : (loai==='canh' ? 9 : 3),'dem-sot-canh'],[loai==='dinh' ? 12 : (loai==='canh' ? 8 : 8),'nham-dinh-canh-mat'],[loai==='dinh' ? 6 : (loai==='canh' ? 6 : 12),'nham-dinh-canh-mat'],[4,'nham-dinh-canh-mat']], T),
        goiY:{'dem-sot-canh':'Bé nhớ: đỉnh, cạnh, mặt không nhìn thấy (bị che, vẽ nét đứt) vẫn tính. Khối có 8 đỉnh, 12 cạnh, 6 mặt.', 'nham-dinh-canh-mat':'Đỉnh là điểm góc, cạnh là đoạn nối hai đỉnh, mặt là hình phẳng bao quanh. Khối có 8 đỉnh, 12 cạnh, 6 mặt.'}}; }
    if(lv===2){ var kh=kichHop(), tot=2*T;
      return {type:'num', _lv:2, _loai:loai, q:haiKhoi([{a:kh[0],b:kh[1],c:kh[2]},{a:3,b:3,c:3}], 22)+'<div>Khối A là khối hộp chữ nhật, khối B là khối lập phương. Cả hai khối có tất cả bao nhiêu <b>'+TEN_LOAI[loai]+'</b>?</div>', ans:tot, unit:TEN_LOAI[loai],
        sai:nhanSai([[T,'thieu-buoc'],[tot-2,'dem-sot-canh'],[tot+2,'dem-sot-canh'],[T+(loai==='dinh'?4:(loai==='canh'?6:2)),'nham-dinh-canh-mat']], tot),
        goiY:{'thieu-buoc':'Bé mới đếm một khối. Còn khối kia nữa: hai khối đều có '+T+' '+TEN_LOAI[loai]+'.', 'dem-sot-canh':'Mỗi khối có '+T+' '+TEN_LOAI[loai]+', kể cả những phần không nhìn thấy.', 'nham-dinh-canh-mat':'Bé xem lại: hỏi đỉnh, cạnh hay mặt?'}}; }
    var x = Math.random()<0.5 ? T : pick([T-1,T+1,T-2,T+2,T*2].filter(function(v){ return v>0 && v!==T; })), dung = x===T;
    return {type:'mcq', figFn:dsBtn21, _lv:3, _loai:loai, _x:x, _dung:(dung?'Đ':'S'), q:khoiHop({a:kt[0],b:kt[1],c:kt[2]})+'<div class="text-xl font-extrabold text-orange-700 my-1">Khối '+(lap ? 'lập phương' : 'hộp chữ nhật')+' có '+x+' '+TEN_LOAI[loai]+'.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(dung?0:1), sai:(dung?{}:{'0':'nham-dinh-canh-mat'}), _lap:lap,
      goiY:{'nham-dinh-canh-mat':'Khối có 8 đỉnh, 12 cạnh, 6 mặt (tính cả những phần bị che).', 'chung':'Khối có 8 đỉnh, 12 cạnh, 6 mặt.'}};
  }, check:function(q){
    var k=docKhoi(q.q), T=soThat(q._loai);
    if(q._lv===2){ return k.length===2 && k[0][0]!==k[0][1] && k[0][1]!==k[0][2] && k[0][0]!==k[0][2] && k[1][0]===k[1][1] && k[1][1]===k[1][2] && q.ans===2*T && demDem(q.q,'to')===0; }
    if(k.length!==1) return false;
    if(q._lv===1) return q.ans===T && T===SO_LOAI[q._loai];
    return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===T) && q.correct===(q._x===T?0:1); }},

  /* D2 — Chỉ đỉnh, cạnh, mặt (Khám phá: chỉ ra) */
  {name:'Chỉ đỉnh, cạnh, mặt', sec:'Khám phá — Chỉ ra một đỉnh, một cạnh, một mặt của khối', mt:['MT1'], levels:3,
   muc:['Phần tô màu đỏ là đỉnh, cạnh hay mặt.', 'Mặt tô màu là mặt trước, mặt trên, mặt bên phải hay mặt sau.', 'Đoạn màu đỏ (nét đứt hoặc đường chéo) có phải là cạnh của khối không.'],
   make:function(lv){
    var kt=kichHop(), sp={a:kt[0],b:kt[1],c:kt[2],nhan:false};
    if(lv<=1){ var kieu=pick(['dinh','canh','mat']), dung = kieu==='dinh' ? 'đỉnh' : (kieu==='canh' ? 'cạnh' : 'mặt');
      if(kieu==='dinh') sp.dinh=pick(DINH_NHIN); else if(kieu==='canh'){ var vis=CANH.filter(function(e){ return !KHUAT[idCanh(e[0],e[1])]; }), e=pick(vis); sp.canh={}; sp.canh[idCanh(e[0],e[1])]='to'; } else sp.mat=pick(['tr','tren','phai']);
      var ch=shuffle(['đỉnh','cạnh','mặt']), sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-dinh-canh-mat'; });
      return {type:'mcq', _lv:1, _kieu:kieu, _dung:dung, q:khoiHop(sp)+'<div>Phần tô <b>màu '+(kieu==='mat' ? 'cam' : 'đỏ')+'</b> trên hình là gì của khối?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'nham-dinh-canh-mat':'Đỉnh là điểm góc, cạnh là đoạn nối hai đỉnh, mặt là hình phẳng bao quanh khối.'}}; }
    if(lv===2){ var m=pick(['tr','tren','phai']), ten={tr:'mặt trước', tren:'mặt trên', phai:'mặt bên phải'}, cs=shuffle([ten.tr, ten.tren, ten.phai, 'mặt sau']), sai2={};
      sp.mat=m; cs.forEach(function(c,i){ if(c!==ten[m]) sai2[String(i)]='nham-dinh-canh-mat'; });
      return {type:'mcq', _lv:2, _mat:m, _dung:ten[m], q:khoiHop(sp)+'<div>Mặt tô màu cam là mặt nào của khối?</div>', choices:cs, correct:cs.indexOf(ten[m]), sai:sai2,
        goiY:{'nham-dinh-canh-mat':'Mặt trước quay về phía bé, mặt trên ở phía trên, mặt bên phải ở phía bên phải. Mặt sau bị che.'}}; }
    var laCanh=Math.random()<0.5;
    var ed3=null; if(laCanh){ ed3=pick(['AE','EF','EH']); sp.canh={}; sp.canh[ed3]='to'; }
    else { sp.cheo=pick([['A','C'],['B','D'],['D','G'],['C','F'],['B','G']]); }
    return {type:'mcq', _lv:3, _laCanh:laCanh, _cheo:sp.cheo, _ed:ed3, _dung:(laCanh?'Có':'Không'), q:khoiHop(sp)+'<div>Đoạn màu đỏ trên hình có phải là một <b>cạnh</b> của khối không?</div>', choices:['Có','Không'], correct:(laCanh?0:1), sai:(laCanh?{'1':'dem-sot-canh'}:{'0':'nham-dinh-canh-mat'}),
      goiY:{'dem-sot-canh':'Nét đứt là cạnh bị che. Cạnh nét đứt vẫn là cạnh của khối.', 'nham-dinh-canh-mat':'Cạnh nối hai đỉnh kề nhau. Đoạn chéo trong một mặt không phải là cạnh.'}};
  }, check:function(q){
    var k=docKhoi(q.q); if(k.length!==1 || !(k[0][0]!==k[0][1] && k[0][1]!==k[0][2] && k[0][0]!==k[0][2])) return false;
    if(q._lv===1){ var dd=demDem(q.q,'to'), mm=demDem(q.q,'mat'); return q._kieu==='mat' ? (mm===1 && dd===0) : (dd===1 && mm===0); }
    if(q._lv===2) return demDem(q.q,'mat')===1 && kiemMCQ(q);
    var dd2=demDem(q.q,'to'); if(dd2!==1) return false;
    var dong=/<line data-dem="to"[^>]*>/.exec(q.q); if(!dong) return false;
    if(q._laCanh) return !!KHUAT[q._ed] && /stroke-dasharray/.test(dong[0]) && /stroke-width="6"/.test(dong[0]) && q.correct===0;
    return !!q._cheo && !canhKe(q._cheo[0],q._cheo[1]) && !/stroke-dasharray/.test(dong[0]) && /stroke-width="5"/.test(dong[0]) && q.correct===1; }},

  /* D3 — Mặt của khối (Hoạt động 1b) */
  {name:'Mặt của khối', sec:'Khám phá, Hoạt động 1b — Mặt của khối là hình gì? Tấm gỗ vừa khít mặt trước', mt:['MT2'], levels:3,
   muc:['Mặt tô màu của khối lập phương là hình gì.', 'Tấm gỗ vừa khít mặt trước của khung hộp chữ nhật (hình tròn, tam giác, chữ nhật).', 'Mặt trên hoặc mặt bên của khối hộp chữ nhật hoặc khối lập phương là hình gì.'],
   make:function(lv){
    var lap, mat, kt, tl, ch, dung, cau;
    if(lv<=1){ lap=true; mat='tr'; }
    else if(lv===2){ lap=false; mat='tr'; }
    else { lap=Math.random()<0.4; mat=pick(['tren','phai']); }
    kt = lap ? [3,3,3] : kichHop();
    dung = lap ? 'hình vuông' : 'hình chữ nhật';
    ch = lap ? ['hình vuông','hình tròn','hình tam giác'] : (lv===2 ? ['hình chữ nhật','hình tròn','hình tam giác'] : ['hình chữ nhật','hình vuông','hình tròn','hình tam giác']);
    ch=shuffle(ch.slice()); var sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-hinh-mat'; });
    cau = lv===2 ? 'Tấm gỗ vừa khít với <b>mặt trước</b> của khung (phần tô màu cam) có dạng hình gì?' : 'Mặt tô màu cam của khối là hình gì?';
    return {type:'mcq', cot:1, _lv:lv, _lap:lap, _mat:mat, _dung:dung, q:khoiHop({a:kt[0],b:kt[1],c:kt[2],mat:mat})+'<div>Đây là khối '+(lap ? 'lập phương' : 'hộp chữ nhật')+'. '+cau+'</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'nham-hinh-mat':'Mặt của khối hộp chữ nhật là hình chữ nhật. Mặt của khối lập phương là hình vuông.'}};
  }, check:function(q){
    var k=docKhoi(q.q); if(k.length!==1 || demDem(q.q,'mat')!==1) return false;
    var kt=k[0], phanBiet = kt[0]!==kt[1] && kt[1]!==kt[2] && kt[0]!==kt[2], bang = kt[0]===kt[1] && kt[1]===kt[2];
    if(q._lap ? !bang : !phanBiet) return false;
    if(q._lv===1 && !(q._lap && q._mat==='tr')) return false;
    if(q._lv===2 && (q._lap || q._mat!=='tr')) return false;
    return kiemMCQ(q) && q._dung===(q._lap ? 'hình vuông' : 'hình chữ nhật') && (q._lap ? q.choices.indexOf('hình chữ nhật')<0 : true); }},

  /* D4 — Đếm cạnh tô màu (Hoạt động 1a) */
  {name:'Đếm cạnh tô màu', sec:'Hoạt động 1a — Khung sắt hình hộp chữ nhật có cạnh sơn xanh và đỏ', mt:['MT3'], levels:3,
   muc:['Có mấy cạnh sơn xanh (4 cạnh).', 'Có mấy cạnh sơn đỏ (8 cạnh).', 'Tất cả cạnh xanh và đỏ, hoặc cạnh đỏ nhiều hơn cạnh xanh mấy cạnh.'],
   make:function(lv){
    var kt=kichHop(), huong = pick([{h:'xanh',w:'do',d:'do'},{h:'xanh',w:'do',d:'do'},{w:'xanh',h:'do',d:'do'},{d:'xanh',w:'do',h:'do'}]), nx=4, nd=8, ask, cau, ans, sai, goi;
    if(lv<=1){ ask='xanh'; ans=4; cau='Khung có bao nhiêu cạnh sơn <b>màu xanh</b>?'; sai=[[8,'lech-nhom'],[3,'dem-sot-canh'],[5,'dem-sot-canh'],[12,'lech-nhom']]; }
    else if(lv===2){ ask='do'; ans=8; cau='Khung có bao nhiêu cạnh sơn <b>màu đỏ</b>?'; sai=[[4,'lech-nhom'],[7,'dem-sot-canh'],[9,'dem-sot-canh'],[12,'lech-nhom'],[6,'dem-sot-canh']]; }
    else if(Math.random()<0.5){ ask='tong'; ans=12; cau='Khung có tất cả bao nhiêu cạnh sơn xanh và đỏ?'; sai=[[8,'lech-nhom'],[4,'lech-nhom'],[11,'dem-sot-canh'],[9,'dem-sot-canh'],[13,'dem-sot-canh']]; }
    else { ask='hon'; ans=4; cau='Cạnh sơn <b>màu đỏ</b> nhiều hơn cạnh sơn <b>màu xanh</b> bao nhiêu cạnh?'; sai=[[8,'lech-nhom'],[12,'lech-nhom'],[3,'dem-sot-canh'],[5,'dem-sot-canh']]; }
    goi={'lech-nhom':'Bé đếm lại đúng màu được hỏi: cạnh xanh có 4, cạnh đỏ có 8.', 'dem-sot-canh':'Bé đếm lần lượt từng cạnh, kể cả các cạnh bị che (nét đứt). Mỗi cạnh chỉ đếm một lần.'};
    return {type:'num', _lv:lv, _ask:ask, q:khoiHop({a:kt[0],b:kt[1],c:kt[2],huong:huong})+'<div>Khung sắt hình hộp chữ nhật có các cạnh sơn xanh hoặc đỏ. Cạnh nét đứt là cạnh bị che.</div><div class="mt-1">'+cau+'</div>', ans:ans, unit:'cạnh', sai:nhanSai(sai, ans), goiY:goi};
  }, check:function(q){
    var k=docKhoi(q.q), nx=demDem(q.q,'xanh'), nd=demDem(q.q,'do');
    if(k.length!==1 || nx!==4 || nd!==8 || nx+nd!==CANH.length) return false;
    var e = q._ask==='xanh' ? nx : (q._ask==='do' ? nd : (q._ask==='tong' ? nx+nd : nd-nx));
    return q.ans===e; }},

  /* D5 — Con kiến bò (Luyện tập 1) */
  {name:'Con kiến bò', sec:'Luyện tập 1 — Con kiến bò theo các cạnh màu cam trên khung hộp tới hạt gạo', mt:['MT3'], levels:3,
   muc:['Đường đi gồm 3 cạnh.', 'Đường đi gồm 4 hoặc 5 cạnh.', 'Đường đi dài 6 cạnh, có cạnh bị che (nét đứt).'],
   make:function(lv){
    var L = lv<=1 ? 3 : (lv===2 ? rnd(4,5) : 6), kt=kichHop(), D=lapDuong(L, lv>=3), sp={a:kt[0],b:kt[1],c:kt[2],canh:canhDuong(D),kien:D}, i, kh=0;
    for(i=0;i<L;i++) if(KHUAT[idCanh(D[i],D[i+1])]) kh++;
    return {type:'num', _lv:lv, _D:D, _L:L, _kh:kh, q:khoiHop(sp)+'<div>Con kiến bò theo các <b>cạnh màu cam</b> của khung nhôm hình hộp chữ nhật, từ chỗ con kiến tới hạt gạo (chấm vàng).</div><div class="mt-1">Con kiến bò qua bao nhiêu cạnh?</div>', ans:L, unit:'cạnh',
      sai:nhanSai([[L-1,'dem-sot-canh'],[L+1,'dem-sot-canh'],[L-kh,'dem-sot-canh'],[L+2,'dem-sot-canh']], L),
      goiY:{'dem-sot-canh':'Bé đếm từng nét cam nối liền nhau từ chỗ con kiến tới hạt gạo. Nét đứt cũng là cạnh nên vẫn đếm; mỗi cạnh chỉ đếm một lần.'}};
  }, check:function(q){
    var D=q._D, L=q._L, k=docKhoi(q.q);
    if(k.length!==1 || D.length!==L+1 || !duongHopLe(D) || D[D.length-1]==='E' || D[0]==='E') return false;
    if(demDem(q.q,'cam')!==L || q.ans!==L) return false;
    var kh=0, i; for(i=0;i<L;i++) if(KHUAT[idCanh(D[i],D[i+1])]) kh++;
    return L>=3 && L<=6 && (q._lv<3 ? kh===0 : kh>=1) && kh===q._kh; }},

  /* D6 — Hoa ở đỉnh (Hoạt động 2) */
  {name:'Hoa ở đỉnh', sec:'Hoạt động 2 — Gần mỗi đỉnh khối lập phương gỗ chạm mấy bông hoa; tất cả bao nhiêu bông', mt:['MT4'], levels:3,
   muc:['Mỗi đỉnh 3 bông hoa, cả 8 đỉnh: 8 × 3 = 24.', 'Mỗi đỉnh 2, 4 hoặc 5 bông hoa, cả 8 đỉnh.', 'Chỉ gần 4 đỉnh có hoa (xem hình), mỗi đỉnh một số bông.'],
   make:function(lv){
    var m, cau, ans, tu, sp={a:3,b:3,c:3,hoa:null};
    if(lv<=1){ m=3; sp.hoa={dinh:DINH_NHIN.slice(), m:m}; ans=8*m; cau='Khối lập phương gỗ có <b>8 đỉnh</b>. Gần mỗi đỉnh chạm <b>'+m+' bông hoa</b> (hình chỉ vẽ hoa ở các đỉnh nhìn thấy).</div><div class="mt-1">Tất cả có bao nhiêu bông hoa?'; }
    else if(lv===2){ m=pick([2,4,5]); sp.hoa={dinh:DINH_NHIN.slice(), m:m}; ans=8*m; cau='Khối lập phương gỗ có <b>8 đỉnh</b>. Gần mỗi đỉnh chạm <b>'+m+' bông hoa</b> (hình chỉ vẽ hoa ở các đỉnh nhìn thấy).</div><div class="mt-1">Tất cả có bao nhiêu bông hoa?'; }
    else { m=pick([2,3,4,5]); tu=shuffle(DINH_NHIN.slice()).slice(0,4); sp.hoa={dinh:tu, m:m}; ans=4*m; cau='Gần <b>4 đỉnh</b> của khối lập phương gỗ có hoa (xem hình), mỗi đỉnh có <b>'+m+' bông hoa</b>.</div><div class="mt-1">Tất cả có bao nhiêu bông hoa?'; }
    var n=sp.hoa.dinh.length;
    return {type:'num', _lv:lv, _m:m, _n:n, q:khoiHop(sp)+'<div>'+cau+'</div>', ans:ans, unit:'bông hoa',
      sai:nhanSai([[(lv>=3?3:7)*m,'thieu-buoc'],[(lv>=3?4:8)+m,'cong-thay-nhan'],[6*m,'nham-dinh-canh-mat'],[12*m,'nham-dinh-canh-mat'],[ans+m,'thieu-buoc']], ans),
      goiY:{'thieu-buoc':'Bé nhớ: khối lập phương có 8 đỉnh, kể cả đỉnh bị che. Có '+m+' bông hoa ở mỗi đỉnh.', 'cong-thay-nhan':'Mỗi đỉnh có '+m+' bông hoa: phép nhân, không phải phép cộng.', 'nham-dinh-canh-mat':'Hoa ở các đỉnh. Khối lập phương có 8 đỉnh.'}};
  }, check:function(q){
    var k=docKhoi(q.q), dem=demDem(q.q,'hoa');
    if(k.length!==1 || k[0][0]!==k[0][1] || k[0][1]!==k[0][2]) return false;
    if(q._lv<=2) return dem===7*q._m && q.ans===8*q._m && q._n===7;
    return q._n===4 && dem===4*q._m && q.ans===dem; }},

  /* D7 — Đèn lồng (Luyện tập 2) */
  {name:'Đèn lồng', sec:'Luyện tập 2 — Đèn lồng khối lập phương: mỗi cạnh một nan tre, mỗi mặt một tờ giấy màu', mt:['MT4'], levels:3,
   muc:['Một đèn lồng có mấy nan tre hoặc mấy tờ giấy màu.', 'Nhiều đèn lồng cần bao nhiêu tờ giấy màu (6 × n).', 'n đèn lồng cần tất cả bao nhiêu nan tre, hoặc nan tre nhiều hơn tờ giấy bao nhiêu.'],
   make:function(lv){
    var n, hoi, ans, cau, sai, goi;
    var dau='<div>Đèn lồng là khối lập phương: <b>mỗi cạnh</b> là một nan tre, <b>mỗi mặt</b> dán một tờ giấy màu.</div>';
    if(lv<=1){ n=1; hoi=pick(['nan','giay']); ans = hoi==='nan' ? 12 : 6; cau='Mỗi đèn lồng cần bao nhiêu '+(hoi==='nan' ? '<b>nan tre</b>' : '<b>tờ giấy màu</b>')+'?'; sai=hoi==='nan' ? [[8,'nham-dinh-canh-mat'],[6,'nham-dinh-canh-mat'],[9,'dem-sot-canh']] : [[12,'nham-dinh-canh-mat'],[8,'nham-dinh-canh-mat'],[3,'dem-sot-canh']]; }
    else if(lv===2){ n=rnd(2,5); hoi='giay'; ans=6*n; cau='Có '+n+' chiếc đèn lồng như thế. Cần tất cả bao nhiêu <b>tờ giấy màu</b>?'; sai=[[6+n,'cong-thay-nhan'],[6,'thieu-buoc'],[12*n,'nham-dinh-canh-mat'],[6*(n-1),'lech-nhom'],[6*(n+1),'lech-nhom']]; }
    else if(Math.random()<0.5){ n=rnd(3,8); hoi='nan'; ans=12*n; cau='Có '+n+' chiếc đèn lồng như thế. Cần tất cả bao nhiêu <b>nan tre</b>?'; sai=[[12+n,'cong-thay-nhan'],[12,'thieu-buoc'],[6*n,'nham-dinh-canh-mat'],[12*(n-1),'lech-nhom'],[12*(n+1),'lech-nhom']]; }
    else { n=rnd(2,6); hoi='hon'; ans=6*n; cau='Có '+n+' chiếc đèn lồng như thế. Số <b>nan tre</b> nhiều hơn số <b>tờ giấy màu</b> bao nhiêu?'; sai=[[12*n,'thieu-buoc'],[6,'thieu-buoc'],[18*n,'cong-thay-nhan'],[6*(n-1),'lech-nhom'],[6*(n+1),'lech-nhom']]; }
    goi={'nham-dinh-canh-mat':'Khối lập phương có 12 cạnh (12 nan tre) và 6 mặt (6 tờ giấy màu).', 'dem-sot-canh':'Bé nhớ cả các cạnh và mặt bị che. Khối có 12 cạnh, 6 mặt.', 'cong-thay-nhan':'Mỗi đèn cần cùng một số, có '+n+' đèn: phép nhân, không phải phép cộng.',
      'thieu-buoc':hoi==='hon' ? 'Bé tìm số nan tre và số tờ giấy của '+n+' đèn rồi tìm hiệu, hoặc mỗi đèn nan tre hơn giấy 6 (12 − 6).' : 'Bé mới tính cho một đèn. Còn '+n+' đèn như thế nữa!', 'lech-nhom':'Bé đếm lại số đèn lồng nhé!'};
    return {type:'num', _n:n, _hoi:hoi, _lv:lv, q:denLong(n)+dau+'<div class="mt-1">'+cau+'</div>', ans:ans, unit: hoi==='nan' ? 'nan tre' : (hoi==='hon' ? 'nan tre' : 'tờ giấy'), sai:nhanSai(sai, ans), goiY:goi};
  }, check:function(q){
    var n=q._n; if(demDem(q.q,'den')!==n) return false;
    var e = q._hoi==='nan' ? 12*n : (q._hoi==='giay' ? 6*n : 6*n);
    if(q._hoi==='hon') e = 12*n-6*n;
    return q.ans===e && q.ans<100; }},

  /* D8 — Khối nào là khối lập phương (không có trong SGK) */
  {name:'Khối nào là khối lập phương', sec:'Nhận ra khối lập phương nhờ số đo các cạnh', mt:['MT1'], levels:3,
   muc:['Hai khối: một lập phương, một hộp chữ nhật có ba số đo khác nhau.', 'Ba khối: một lập phương, hai hộp chữ nhật có ba số đo khác nhau.', 'Có khối hộp chữ nhật hai số đo bằng nhau, mặt trước nhìn như hình vuông.'],
   make:function(lv){
    var n = lv<=1 ? 2 : 3, s=pick([3,4,5]), ks=[[s,s,s]], i, ten=['A','B','C'];
    function ba(){ var d=shuffle([2,3,4,5,6].filter(function(v){ return v!==s; })).slice(0,3); return d; }
    if(lv>=3){ var t=pick([2,3,4,5,6].filter(function(v){ return v!==s; })), bay=[s,s,t]; shuffle(bay); ks.push(bay); ks.push(ba()); }
    else for(i=1;i<n;i++) ks.push(ba());
    shuffle(ks);
    var di=ks.findIndex(function(v){ return v[0]===v[1] && v[1]===v[2]; }), ch=ks.map(function(v,idx){ return 'Khối '+ten[idx]; }), sai={};
    ch.forEach(function(c,idx){ if(idx!==di) sai[String(idx)]='nham-lap-phuong'; });
    var mota=ks.map(function(v,idx){ return '<div>Khối '+ten[idx]+': dài\u00a0'+v[0]+'\u00a0cm, rộng\u00a0'+v[1]+'\u00a0cm, cao\u00a0'+v[2]+'\u00a0cm.</div>'; }).join('');
    var sps=ks.map(function(v){ return {a:v[0],b:v[1],c:v[2]}; });
    return {type:'mcq', _ks:ks, _dung:ch[di], q:haiKhoi(sps, n===2 ? 14 : 12)+'<div class="text-left inline-block my-1">'+mota+'</div><div class="mt-1">Khối nào là khối <b>lập phương</b>?</div>', choices:ch, correct:di, sai:sai,
      goiY:{'nham-lap-phuong':'Khối lập phương có tất cả các cạnh bằng nhau: dài, rộng và cao đều bằng nhau. Bé so cả ba số đo.'}};
  }, check:function(q){
    var k=docKhoi(q.q), ks=q._ks, dem=ks.filter(function(v){ return v[0]===v[1] && v[1]===v[2]; }).length;
    if(k.length!==ks.length || dem!==1) return false;
    var ok=true; ks.forEach(function(v,i){ if(k[i][0]!==v[0] || k[i][1]!==v[1] || k[i][2]!==v[2]) ok=false; });
    return ok && kiemMCQ(q) && q.choices.length===ks.length; }},

  /* D9 — Đúng / Sai tìm lỗi (không có trong SGK) */
  {name:'Đúng / Sai', sec:'Tìm lỗi — Đỉnh, cạnh, mặt và hình của mặt', mt:['MT1','MT2'], levels:3,
   muc:['Đúng hay sai: một câu về khối.', 'Đúng hay sai: câu có số (số cạnh, số mặt, số đỉnh).', 'Bạn An nói: em thấy thế nào?'],
   make:function(lv, mt){
    var ds, loai, T, x, hnx, mo, lbl;
    if(lv<=1){
      ds = mt==='MT1' ? pick([['Khối hộp chữ nhật có 8 đỉnh.',true,'nham-dinh-canh-mat'],['Khối hộp chữ nhật có 6 cạnh.',false,'nham-dinh-canh-mat'],['Khối lập phương có 12 cạnh.',true,'nham-dinh-canh-mat'],['Khối lập phương có 8 mặt.',false,'nham-dinh-canh-mat']])
        : pick([['Các mặt của khối lập phương là hình vuông.',true,'nham-hinh-mat'],['Các mặt của khối hộp chữ nhật là hình tròn.',false,'nham-hinh-mat'],['Khối hộp chữ nhật có các mặt là hình chữ nhật.',true,'nham-hinh-mat'],['Khối lập phương có các mặt là hình tam giác.',false,'nham-hinh-mat']]);
      return {type:'mcq', figFn:dsBtn21, mt:mt, _lv:1, _mt:mt, _thatSu:ds[1], _dung:(ds[1]?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+ds[0]+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(ds[1]?0:1), sai:(ds[1]?{}:{'0':ds[2]}),
        goiY:{'nham-dinh-canh-mat':'Khối hộp chữ nhật và khối lập phương đều có 8 đỉnh, 12 cạnh, 6 mặt.', 'nham-hinh-mat':'Mặt của khối hộp chữ nhật là hình chữ nhật. Mặt của khối lập phương là hình vuông.', 'chung':'Bé nhớ lại: khối có 8 đỉnh, 12 cạnh, 6 mặt.'}}; }
    if(mt==='MT1'){
      loai=pick(['dinh','canh','mat']); T=SO_LOAI[loai]; var kl=Math.random()<0.5 ? 'lập phương' : 'hộp chữ nhật';
      x = Math.random()<0.5 ? T : pick([T-2,T+2,T-1,T+1,T*2].filter(function(v){ return v>0 && v!==T; }));
      if(lv===2){ var dung=x===T;
        return {type:'mcq', figFn:dsBtn21, mt:mt, _lv:2, _mt:mt, _loai:loai, _x:x, _dung:(dung?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">Khối '+kl+' có '+x+' '+TEN_LOAI[loai]+'.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(dung?0:1), sai:(dung?{}:{'0':'nham-dinh-canh-mat'}),
          goiY:{'nham-dinh-canh-mat':'Khối có 8 đỉnh, 12 cạnh, 6 mặt.', 'chung':'Khối có 8 đỉnh, 12 cạnh, 6 mặt.'}}; }
      mo=function(v){ return 'khối có '+v+' '+TEN_LOAI[loai]; }; hnx=haiNhanXet(x, T, mo); var sai1={}; sai1[String(1-hnx.correct)]='nham-dinh-canh-mat';
      return {type:'mcq', cot:1, mt:mt, _lv:3, _mt:mt, _loai:loai, _x:x, _T:T, _ds:hnx.ds, _dung:hnx.choices[hnx.correct], q:nguoiNoi('boy','Bạn An')+'<div>Bạn An nói: «Khối '+kl+' có <b>'+x+' '+TEN_LOAI[loai]+'</b>.» Em thấy thế nào?</div>', choices:hnx.choices, correct:hnx.correct, sai:sai1,
        goiY:{'nham-dinh-canh-mat':'Khối hộp chữ nhật và khối lập phương đều có 8 đỉnh, 12 cạnh, 6 mặt.', 'chung':'Khối có 8 đỉnh, 12 cạnh, 6 mặt.'}}; }
    /* MT2: hình của mặt */
    var lap=Math.random()<0.5, dungHinh = lap ? 'hình vuông' : 'hình chữ nhật', khac=pick(['hình tròn','hình tam giác']), noi = Math.random()<0.5 ? dungHinh : khac, dd = noi===dungHinh, tenKhoi = lap ? 'lập phương' : 'hộp chữ nhật';
    if(lv===2) return {type:'mcq', figFn:dsBtn21, mt:mt, _lv:2, _mt:mt, _lap:lap, _noi:noi, _dung:(dd?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">Mặt của khối '+tenKhoi+' là '+noi+'.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(dd?0:1), sai:(dd?{}:{'0':'nham-hinh-mat'}),
      goiY:{'nham-hinh-mat':'Mặt của khối hộp chữ nhật là hình chữ nhật. Mặt của khối lập phương là hình vuông.', 'chung':'Mặt của khối lập phương là hình vuông, mặt của khối hộp chữ nhật là hình chữ nhật.'}};
    mo=function(v){ return 'mặt của khối '+tenKhoi+' là '+v; };
    hnx=haiNhanXet(noi, dungHinh, mo, function(){ return pick(['hình tròn','hình tam giác']); }); var sai2={}; sai2[String(1-hnx.correct)]='nham-hinh-mat';
    return {type:'mcq', cot:1, mt:mt, _lv:3, _mt:mt, _lap:lap, _x:noi, _T:dungHinh, _ds:hnx.ds, _dung:hnx.choices[hnx.correct], q:nguoiNoi('boy','Bạn An')+'<div>Bạn An nói: «Mặt của khối '+tenKhoi+' là <b>'+noi+'</b>.» Em thấy thế nào?</div>', choices:hnx.choices, correct:hnx.correct, sai:sai2,
      goiY:{'nham-hinh-mat':'Mặt của khối hộp chữ nhật là hình chữ nhật. Mặt của khối lập phương là hình vuông.', 'chung':'Mặt của khối lập phương là hình vuông, mặt của khối hộp chữ nhật là hình chữ nhật.'}};
  }, check:function(q){
    if(q._lv<=1) return q.choices.join()==='Đ,S' && (q._dung==='Đ')===q._thatSu && q.correct===(q._thatSu?0:1);
    if(q._mt==='MT1'){
      if(q._lv===2) return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===SO_LOAI[q._loai]) && q.correct===(q._x===SO_LOAI[q._loai]?0:1);
      return kiemNhanXet(q) && q._T===SO_LOAI[q._loai] && q._T===soThat(q._loai); }
    var dungH = q._lap ? 'hình vuông' : 'hình chữ nhật';
    if(q._lv===2) return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._noi===dungH) && q.correct===(q._noi===dungH?0:1);
    return kiemNhanXet(q) && q._T===dungH; }}
 ]
};
