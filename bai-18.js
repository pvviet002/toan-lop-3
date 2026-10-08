/* bai-18.js — Bài 18: Góc. Góc vuông, góc không vuông. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH ngay từ đầu.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-18.md) và chỉnh sửa của thầy trên PR:
   4 MỤC TIÊU (muctieu) × 9 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Chỉ dùng "góc vuông / góc không vuông" (lớp 3 chưa học góc nhọn, góc tù). Ê ke thật của sách đổi thành hình ê ke SVG áp vào góc;
   vẽ góc vuông trên lưới đổi thành chọn hình vẽ đúng hoặc chọn điểm thứ ba. Mọi góc do mã tính từ toạ độ; check() tính lại, không tin nhãn.
   Góc "gần vuông" (bẫy của sách) lệch ít nhất 12 độ so với góc vuông. Đa giác ở dạng đếm góc vuông luôn LỒI (không có chỗ lõm).
   Hình mới viết ngay trong file này (không sửa figures.js): hinhGoc, hinhEke, luoiGoc3, luoiDiem7, hinhPhang.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn18(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
var CHU=['A','B','C','D','E','G','I','K','M','N','P','Q'];
function chuMoi(){ return shuffle(CHU.slice()); }
var RAD=Math.PI/180;
function f1(v){ return v.toFixed(1); }

/* ---- Hình học trên toạ độ ---- */
/* số đo góc AOB (độ) tính từ toạ độ ba điểm */
function gocGiua(O, A, B){ var u=[A[0]-O[0], A[1]-O[1]], v=[B[0]-O[0], B[1]-O[1]], c=(u[0]*v[0]+u[1]*v[1])/(Math.hypot(u[0],u[1])*Math.hypot(v[0],v[1])); return Math.acos(Math.max(-1, Math.min(1, c)))/RAD; }
function laVuong(O, A, B){ return Math.abs(gocGiua(O,A,B)-90)<0.5; }
/* góc "không vuông" phải lệch ít nhất 12 độ so với 90 (mắt thấy khác) */
function xaVuong(O, A, B){ return Math.abs(gocGiua(O,A,B)-90)>=11.99; }
function diemTu(O, deg, len){ return [O[0]+len*Math.cos(deg*RAD), O[1]-len*Math.sin(deg*RAD)]; }
function donVi(u){ var l=Math.hypot(u[0],u[1])||1; return [u[0]/l, u[1]/l]; }
/* một góc: đỉnh O, tia thứ nhất theo hướng rot (độ), tia thứ hai quay thêm ang độ; đặt giữa ô (cx,cy) */
function datGoc(cx, cy, rot, ang, len, ten){
  var O=[0,0], A=diemTu(O,rot,len), B=diemTu(O,rot+ang,len), xs=[0,A[0],B[0]], ys=[0,A[1],B[1]];
  var dx=cx-(Math.min.apply(null,xs)+Math.max.apply(null,xs))/2, dy=cy-(Math.min.apply(null,ys)+Math.max.apply(null,ys))/2;
  return {O:[O[0]+dx,O[1]+dy], A:[A[0]+dx,A[1]+dy], B:[B[0]+dx,B[1]+dy], ten:ten||null};
}
/* vẽ một góc g = {O,A,B,ten:[tên đỉnh, tên A, tên B]}; vuong = đánh dấu ô vuông ở đỉnh */
function veGoc(g, vuong){
  var O=g.O, A=g.A, B=g.B, uA=donVi([A[0]-O[0],A[1]-O[1]]), uB=donVi([B[0]-O[0],B[1]-O[1]]), s='', t=g.ten;
  s+='<path d="M'+f1(A[0])+' '+f1(A[1])+' L'+f1(O[0])+' '+f1(O[1])+' L'+f1(B[0])+' '+f1(B[1])+'" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  if(vuong){ var p1=[O[0]+uA[0]*13,O[1]+uA[1]*13], p2=[p1[0]+uB[0]*13,p1[1]+uB[1]*13], p3=[O[0]+uB[0]*13,O[1]+uB[1]*13];
    s+='<path d="M'+f1(p1[0])+' '+f1(p1[1])+' L'+f1(p2[0])+' '+f1(p2[1])+' L'+f1(p3[0])+' '+f1(p3[1])+'" stroke="currentColor" stroke-width="2" fill="none"/>'; }
  s+='<circle cx="'+f1(O[0])+'" cy="'+f1(O[1])+'" r="5.5" fill="'+HM.cam+'"/>';
  if(t && t[1]) s+='<circle cx="'+f1(A[0])+'" cy="'+f1(A[1])+'" r="4.5" fill="'+HM.cam+'"/>';
  if(t && t[2]) s+='<circle cx="'+f1(B[0])+'" cy="'+f1(B[1])+'" r="4.5" fill="'+HM.cam+'"/>';
  function chu(P, d, tx){ return '<text x="'+f1(P[0]+d[0]*17)+'" y="'+f1(P[1]+d[1]*17+7)+'" text-anchor="middle" font-size="18" '+HFONT+' fill="currentColor">'+tx+'</text>'; }
  if(t){ var bis=donVi([-(uA[0]+uB[0]), -(uA[1]+uB[1])]);
    if(t[0]) s+=chu(O, bis, t[0]); if(t[1]) s+=chu(A, uA, t[1]); if(t[2]) s+=chu(B, uB, t[2]); }
  return s;
}
/* Hình mới 1: nhiều góc xếp thành lưới ô; specs = [{ang, rot, ten}]; sp.g được ghi lại để check() dùng; o = {cols, cw, ch, len, vuong} */
function hinhGoc(specs, o){
  var cols=o.cols||1, cw=o.cw||108, chh=o.ch||104, len=o.len||36, rows=Math.ceil(specs.length/cols), s=svgX(cols*cw, rows*chh);
  specs.forEach(function(sp, i){ var cx=(i%cols)*cw+cw/2, cy=Math.floor(i/cols)*chh+chh/2; sp.g=datGoc(cx, cy, sp.rot, sp.ang, len, sp.ten); s+=veGoc(sp.g, o.vuong && sp.ang===90); });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
/* Hình mới 2: góc có ê ke áp vào (tam giác vuông xanh nhạt, góc vuông của ê ke đặt khít ở đỉnh, một cạnh trùng tia thứ nhất) */
function hinhEke(theta, coEke, rot, ten, sp){
  var O=[130,125], A=diemTu(O,rot,100), B=diemTu(O,rot+theta,106), E1=diemTu(O,rot,74), E2=diemTu(O,rot+90,74), s=svgX(260, 250);
  var u=donVi([E1[0]-O[0],E1[1]-O[1]]), v=donVi([E2[0]-O[0],E2[1]-O[1]]);
  if(coEke) s+='<path d="M'+f1(O[0])+' '+f1(O[1])+' L'+f1(E1[0])+' '+f1(E1[1])+' L'+f1(E2[0])+' '+f1(E2[1])+' Z" fill="'+HM.troi+'" fill-opacity="0.35" stroke="'+HM.troiDam+'" stroke-width="2.5" stroke-linejoin="round"/>'
    +'<path d="M'+f1(O[0]+u[0]*14)+' '+f1(O[1]+u[1]*14)+' L'+f1(O[0]+(u[0]+v[0])*14)+' '+f1(O[1]+(u[1]+v[1])*14)+' L'+f1(O[0]+v[0]*14)+' '+f1(O[1]+v[1]*14)+'" stroke="'+HM.troiDam+'" stroke-width="2" fill="none"/>';
  sp.g={O:O, A:A, B:B, ten:ten};
  return '<div class="flex justify-center my-2">'+s+veGoc(sp.g, false)+'</svg></div>';
}

var ANG_XA=[35,45,55,65,125,135,145];       /* góc không vuông, khác 90 rõ ràng */
var ANG_GAN=[75,78,102,105];                 /* góc "gần vuông": lệch 12 đến 15 độ */

var BAI = {
 n: 18,
 title: 'Góc. Góc Vuông, Góc Không Vuông',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-dinh-canh':'Nhầm đỉnh với cạnh', 'goc-gan-vuong':'Nhầm góc gần vuông là góc vuông', 'goc-xien':'Nhầm cạnh xiên là góc vuông', 'dem-sot-goc':'Đếm sót hoặc thừa góc vuông'},
 muctieu: [
  {id:'MT1', ten:'Đỉnh, cạnh và tên góc', muc:['Chọn đỉnh của góc; chọn hai cạnh của góc.', 'Gọi tên góc theo đỉnh và cạnh; hình có hai góc.', 'Đ hay S: câu nói về đỉnh, cạnh của góc (bẫy nhầm đỉnh với cạnh).']},
  {id:'MT2', ten:'Góc vuông, góc không vuông', muc:['Dùng ê ke: khít hoàn toàn hay hở rõ.', 'Góc vuông trong nhiều góc; ê ke hở ít.', 'Góc gần vuông không phải góc vuông; tìm lỗi của bạn.']},
  {id:'MT3', ten:'Góc vuông trên lưới ô vuông', muc:['Chọn góc vuông có hai cạnh theo đường lưới (ngang, dọc).', 'Chọn điểm thứ ba để được góc vuông; có cạnh xiên không vuông.', 'Bẫy cạnh xiên; góc vuông xiên theo đường chéo ô.']},
  {id:'MT4', ten:'Đếm góc vuông trong hình', muc:['Đếm góc vuông trong tam giác, hình chữ nhật.', 'Đếm trong hình ngôi nhà, hình thang vuông.', 'Hình nào có nhiều góc vuông nhất.']}
 ],
 topics: [
  /* D1 — Đỉnh và cạnh (Khám phá b) */
  {name:'Đỉnh và cạnh', sec:'Khám phá b — Đỉnh và cạnh của góc', mt:['MT1'], levels:3,
   muc:['Chọn đỉnh của góc.', 'Chọn hai cạnh của góc.', 'Hình có hai góc: chọn hai cạnh của góc thứ hai.'],
   make:function(lv){
    var nm=chuMoi(), X=nm[0], Y=nm[1], Z=nm[2], rot=5*rnd(0,71), sai={}, sp, ch, dung, cau, seg;
    if(lv<=2){ sp=[{ang:pick([50,60,70,110,130]), rot:rot, ten:[X,Y,Z]}]; seg=[[X,Y],[X,Z]];
      if(lv<=1){ ch=shuffle([X,Y,Z]); dung=X; cau='Điểm nào là <b>đỉnh</b> của góc?'; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-dinh-canh'; }); }
      else { dung=X+Y+' và '+X+Z; ch=shuffle([dung, X+Y+' và '+Y+Z, X+Z+' và '+Y+Z]); cau='Hai <b>cạnh</b> của góc đỉnh '+X+' là gì?'; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-dinh-canh'; }); }
      return {type:'mcq', cot:(lv>=2?1:0), _sp:sp, _seg:seg, _lv:lv, _dung:dung, q:hinhGoc(sp,{cols:1, cw:230, ch:200, len:80})+'<div>'+cau+'</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'nham-dinh-canh':'Đỉnh là điểm chung của hai cạnh. Cạnh là hai tia đi ra từ đỉnh.'}}; }
    var P=nm[3], M=nm[4], N=nm[5];
    sp=[{ang:pick([60,70,110]), rot:5*rnd(0,35), ten:[X,Y,Z]}, {ang:pick([55,65,120,130]), rot:5*rnd(36,71), ten:[P,M,N]}]; seg=[[X,Y],[X,Z],[P,M],[P,N]];
    dung=P+M+' và '+P+N; ch=shuffle([dung, X+Y+' và '+X+Z, P+M+' và '+X+Z]); ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-dinh-canh'; });
    return {type:'mcq', cot:1, _sp:sp, _seg:seg, _lv:3, _P:P, _dung:dung, q:hinhGoc(sp,{cols:2, cw:150, ch:150, len:56})+'<div>Hai <b>cạnh</b> của góc đỉnh '+P+' là gì?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'nham-dinh-canh':'Hai cạnh của góc đều đi ra từ đỉnh. Bé tìm hai đoạn bắt đầu từ đỉnh đó.'}};
  }, check:function(q){ var seg=q._seg, i;
    function laCanh(a,b){ for(var k=0;k<seg.length;k++) if((seg[k][0]===a&&seg[k][1]===b)||(seg[k][0]===b&&seg[k][1]===a)) return true; return false; }
    if(q._lv===1){ var dinh=seg[0][0]; return seg[1][0]===dinh && q._dung===dinh && kiemMCQ(q); }
    var dd=q.choices.filter(function(c){ var p=c.split(' và '); var v=q._lv===3 ? q._P : seg[0][0]; return laCanh(p[0][0],p[0][1]) && laCanh(p[1][0],p[1][1]) && p[0][0]===v && p[1][0]===v; });
    return dd.length===1 && dd[0]===q._dung && kiemMCQ(q); }},

  /* D2 — Gọi tên góc (Hoạt động) */
  {name:'Gọi tên góc', sec:'Hoạt động — Gọi tên đỉnh và cạnh của góc', mt:['MT1'], levels:3,
   muc:['Chọn mô tả đúng cho góc trong hình.', 'Hình có hai góc: chọn mô tả đúng cho góc thứ hai.', 'Mô tả đúng đỉnh nhưng sai cạnh là bẫy.'],
   make:function(lv){
    var nm=chuMoi(), X=nm[0], Y=nm[1], Z=nm[2], sai={}, sp, ch, dung, cau, seg, W2=nm[3], M=nm[4], N=nm[5];
    function mt(v,a,b){ return 'Góc đỉnh '+v+', cạnh '+v+a+', '+v+b; }
    if(lv<=1){ sp=[{ang:pick([50,60,110,130]), rot:5*rnd(0,71), ten:[X,Y,Z]}]; seg=[[X,Y],[X,Z]]; dung=mt(X,Y,Z); ch=shuffle([dung, mt(Y,X,Z), mt(Z,X,Y)]); cau='Mô tả nào đúng với góc trong hình?'; }
    else if(lv===2){ sp=[{ang:pick([60,70,110]), rot:5*rnd(0,35), ten:[X,Y,Z]}, {ang:pick([55,65,120,130]), rot:5*rnd(36,71), ten:[W2,M,N]}]; seg=[[X,Y],[X,Z],[W2,M],[W2,N]]; dung=mt(W2,M,N); ch=shuffle([dung, mt(X,Y,Z), mt(M,W2,N)]); cau='Mô tả nào đúng với góc đỉnh '+W2+'?'; }
    else { sp=[{ang:pick([50,60,110,130]), rot:5*rnd(0,71), ten:[X,Y,Z]}]; seg=[[X,Y],[X,Z]]; dung=mt(X,Y,Z); ch=shuffle([dung, 'Góc đỉnh '+X+', cạnh '+X+Y+', '+Y+Z, 'Góc đỉnh '+X+', cạnh '+X+Z+', '+Y+Z]); cau='Mô tả nào đúng với góc trong hình?'; }
    ch.forEach(function(c,i){ if(c!==dung) sai[String(i)] = (lv>=3 || c.indexOf('đỉnh '+X)<0) ? 'nham-dinh-canh' : 'lech-nhom'; });
    return {type:'mcq', cot:1, _sp:sp, _seg:seg, _lv:lv, _dich:(lv===2?W2:X), _dung:dung, q:hinhGoc(sp,{cols:(lv===2?2:1), cw:(lv===2?150:230), ch:(lv===2?150:200), len:(lv===2?56:80)})+'<div>'+cau+'</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'nham-dinh-canh':'Đỉnh là điểm chung của hai cạnh: hai cạnh đều bắt đầu từ đỉnh.', 'lech-nhom':'Bé tìm chữ ở đỉnh của góc cần mô tả, rồi đọc hai cạnh đi ra từ đỉnh đó.'}};
  }, check:function(q){ var seg=q._seg;
    function laCanh(a,b){ for(var k=0;k<seg.length;k++) if((seg[k][0]===a&&seg[k][1]===b)||(seg[k][0]===b&&seg[k][1]===a)) return true; return false; }
    var dd=q.choices.filter(function(c){ var m=c.match(/^Góc đỉnh (.), cạnh (..), (..)$/); return m && m[1]===q._dich && laCanh(m[2][0],m[2][1]) && laCanh(m[3][0],m[3][1]) && m[2][0]===m[1] && m[3][0]===m[1] && m[2]!==m[3]; });
    return dd.length===1 && dd[0]===q._dung && kiemMCQ(q); }},

  /* D3 — Dùng ê ke (Khám phá c) */
  {name:'Dùng ê ke', sec:'Khám phá c — Dùng ê ke kiểm tra góc vuông', mt:['MT2'], levels:3,
   muc:['Ê ke khít hai cạnh: góc vuông; ê ke hở rõ: góc không vuông.', 'Ê ke hở ít (lệch 12 độ trở lên).', 'Không có ê ke: góc gần vuông.'],
   make:function(lv){
    var nm=chuMoi(), O=nm[0], A=nm[1], B=nm[2], co=Math.random()<0.5, theta, coEke = lv<=2, sp={};
    if(lv<=1) theta = co ? 90 : pick([50,60,125,135,145]);
    else if(lv===2) theta = co ? 90 : pick(ANG_GAN);
    else theta = co ? 90 : pick(ANG_GAN);
    var dung = theta===90 ? 'Có' : 'Không', ch=['Có','Không'], sai={};
    if(dung==='Có') sai['1']='lech-nhom'; else sai['0'] = (lv>=2 ? 'goc-gan-vuong' : 'lech-nhom');
    return {type:'mcq', _sp:sp, _theta:theta, _dung:dung, q:hinhEke(theta, coEke, 5*rnd(0,71), [O,A,B], sp)+'<div>'+(coEke ? 'Em đặt ê ke vào góc đỉnh '+O+' như hình. ' : '')+'Góc đỉnh '+O+' có phải là góc vuông không?</div>', choices:ch, correct:(dung==='Có'?0:1), sai:sai,
      goiY:{'goc-gan-vuong':'Góc gần vuông vẫn chưa vuông. Nếu ê ke hở một chút thì không phải góc vuông.', 'lech-nhom':'Ê ke khít cả hai cạnh thì là góc vuông. Hở thì không phải.', 'chung':'Bé xem hai cạnh của góc có khít với góc vuông của ê ke không.'}};
  }, check:function(q){ var g=q._sp.g, v=laVuong(g.O,g.A,g.B), x=xaVuong(g.O,g.A,g.B); return (v || x) && q._dung===(v?'Có':'Không') && q.correct===(v?0:1) && q.choices.join()==='Có,Không'; }},

  /* D4 — Sáu góc (Hoạt động) */
  {name:'Sáu góc', sec:'Hoạt động — Góc nào là góc vuông?', mt:['MT2'], levels:3,
   muc:['Ba góc, chọn góc vuông.', 'Bốn góc, có một góc gần vuông (bẫy).', 'Sáu góc: đếm số góc vuông.'],
   make:function(lv){
    var nm=chuMoi(), n = lv<=1 ? 3 : (lv===2 ? 4 : 6), k, items=[], i, nR, nG;
    nR = lv>=3 ? rnd(1,2) : 1; nG = lv<=1 ? 0 : (lv===2 ? 1 : 2);
    for(i=0;i<n;i++){ var loai = i<nR ? 'v' : (i<nR+nG ? 'g' : 'x'); items.push({ang: loai==='v' ? 90 : (loai==='g' ? pick(ANG_GAN) : pick(ANG_XA)), rot:5*rnd(0,71), ten:[nm[i],null,null], _l:loai}); }
    shuffle(items);
    var cols = n===3 ? 3 : (n===4 ? 2 : 3), hinh=hinhGoc(items,{cols:cols, cw:108, ch:104, len:36});
    if(lv<=2){ var dung=items.filter(function(it){ return it._l==='v'; })[0].ten[0], ch=items.map(function(it){ return it.ten[0]; }), sai={};
      shuffle(ch); ch.forEach(function(c,j){ if(c!==dung){ var it=items.filter(function(x){ return x.ten[0]===c; })[0]; sai[String(j)] = it._l==='g' ? 'goc-gan-vuong' : 'lech-nhom'; } });
      return {type:'mcq', _sp:items, _dung:dung, q:hinh+'<div>Em dùng ê ke thử từng góc. Góc đỉnh nào là <b>góc vuông</b>?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'goc-gan-vuong':'Góc đó gần vuông nhưng ê ke vẫn hở. Bé thử lại từng góc với ê ke.', 'lech-nhom':'Góc vuông khít với góc của ê ke. Bé thử lại từng góc.'}}; }
    return {type:'num', _sp:items, _e:nR, q:hinh+'<div>Em dùng ê ke thử từng góc. Có bao nhiêu <b>góc vuông</b>?</div>', ans:nR, unit:'góc',
      sai:nhanSai([[nR+nG,'goc-gan-vuong'],[nR+1,'lech-nhom'],[nR-1,'lech-nhom']], nR), goiY:{'goc-gan-vuong':'Bé không đếm các góc gần vuông: ê ke còn hở thì chưa phải góc vuông.', 'lech-nhom':'Bé thử ê ke từng góc, đánh dấu góc nào khít.'}};
  }, check:function(q){ var it=q._sp, nv=it.filter(function(x){ return laVuong(x.g.O,x.g.A,x.g.B); }).length, ok=it.every(function(x){ return laVuong(x.g.O,x.g.A,x.g.B) || xaVuong(x.g.O,x.g.A,x.g.B); });
    if(!ok) return false;
    if(q.type==='num') return q.ans===nv && nv>=1 && nv<=2 && it.length===6;
    var dd=it.filter(function(x){ return laVuong(x.g.O,x.g.A,x.g.B); }); return nv===1 && dd[0].ten[0]===q._dung && kiemMCQ(q); }},

  /* D5 — Đúng / Sai (không có trong SGK). MT1: đỉnh, cạnh · MT2: góc vuông */
  {name:'Đúng / Sai', sec:'Tìm lỗi — Bạn nói đúng hay sai?', mt:['MT1','MT2'], levels:3,
   muc:['Mệnh đề đơn về đỉnh hoặc góc vuông.', 'Mệnh đề về cạnh; góc gần vuông.', 'Bạn An nói; chọn lý do vì sao sai.'],
   make:function(lv, mt){
    var m = mt || pick(['MT1','MT2']), nm=chuMoi(), X=nm[0], Y=nm[1], Z=nm[2], sai={}, dung, sp, cau, hinh, ch, lyDo;
    if(m==='MT1'){ sp=[{ang:pick([50,60,110,130]), rot:5*rnd(0,71), ten:[X,Y,Z]}]; hinh=hinhGoc(sp,{cols:1, cw:230, ch:200, len:80});
      if(lv<=1){ var dungMD=Math.random()<0.5, dd = dungMD ? X : pick([Y,Z]); cau=dd+' là đỉnh của góc.'; dung=dungMD?'Đ':'S'; var meta1=dd; if(!dungMD) sai['0']='nham-dinh-canh'; }
      else if(lv===2){ var d2=Math.random()<0.5, ca = d2 ? X+Y+' và '+X+Z : X+Y+' và '+Y+Z; cau=ca+' là hai cạnh của góc đỉnh '+X+'.'; dung=d2?'Đ':'S'; var meta2=ca; if(!d2) sai['0']='nham-dinh-canh'; }
      else { var cau3=Y+Z+' là một cạnh của góc đỉnh '+X+'.'; ch=shuffle(['Sai, vì '+Y+Z+' không đi ra từ đỉnh '+X+'.', 'Đúng, vì '+Y+Z+' nối hai điểm ở hai cạnh.', 'Sai, vì '+X+' không phải là đỉnh.']); lyDo='Sai, vì '+Y+Z+' không đi ra từ đỉnh '+X+'.';
        ch.forEach(function(c,i){ if(c!==lyDo) sai[String(i)]='nham-dinh-canh'; });
        return {type:'mcq', cot:1, _m:'MT1', mt:'MT1', _sp:sp, _lv:3, _X:X, _Y:Y, _Z:Z, _dung:lyDo, q:hinh+'<div class="text-lg font-bold text-slate-700 my-1">Bạn An nói: "'+cau3+'"</div><div>Bạn An nói sai. Vì sao?</div>', choices:ch, correct:ch.indexOf(lyDo), sai:sai,
          goiY:{'nham-dinh-canh':'Hai cạnh của góc đều đi ra từ đỉnh. Đoạn '+Y+Z+' không đi ra từ đỉnh '+X+'.'}}; }
      return {type:'mcq', figFn:dsBtn18, _m:'MT1', mt:'MT1', _sp:sp, _lv:lv, _dd:meta1, _cs:meta2, _dung:dung, q:hinh+'<div class="text-xl font-extrabold text-orange-700 my-1">'+cau+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:(dung==='Đ'?0:1), sai:sai, goiY:{'nham-dinh-canh':'Đỉnh là điểm chung của hai cạnh. Hai cạnh đều đi ra từ đỉnh.', 'chung':'Bé tìm đỉnh của góc, rồi xem hai cạnh có đi ra từ đỉnh không.'}}; }
    /* MT2: góc vuông */
    var laV = Math.random()<0.5, ang = laV ? 90 : (lv<=1 ? pick(ANG_XA) : pick(ANG_GAN));
    sp=[{ang:ang, rot:5*rnd(0,71), ten:[X,Y,Z]}]; hinh=hinhGoc(sp,{cols:1, cw:230, ch:200, len:80});
    cau='Góc đỉnh '+X+' là góc vuông.'; dung=laV?'Đ':'S'; if(!laV) sai['0'] = (ang===90 ? '' : (lv>=2 ? 'goc-gan-vuong' : 'lech-nhom'));
    if(lv>=3){ ang = pick(ANG_GAN); sp=[{ang:ang, rot:5*rnd(0,71), ten:[X,Y,Z]}]; hinh=hinhGoc(sp,{cols:1, cw:230, ch:200, len:80}); lyDo='Sai, vì khi đặt ê ke vào thì hai cạnh không khít: góc này chưa vuông.';
      ch=shuffle([lyDo, 'Đúng, vì góc gần vuông cũng là góc vuông.', 'Sai, vì góc vuông phải có hai cạnh dài bằng nhau.']); sai={}; ch.forEach(function(c,i){ if(c!==lyDo) sai[String(i)] = c.indexOf('Đúng')===0 ? 'goc-gan-vuong' : 'lech-nhom'; });
      return {type:'mcq', cot:1, _m:'MT2', mt:'MT2', _sp:sp, _lv:3, _dung:lyDo, q:hinh+'<div class="text-lg font-bold text-slate-700 my-1">Bạn An nói: "Góc đỉnh '+X+' là góc vuông vì trông gần vuông."</div><div>Bạn An nói sai. Vì sao?</div>', choices:ch, correct:ch.indexOf(lyDo), sai:sai,
        goiY:{'goc-gan-vuong':'Góc gần vuông vẫn chưa vuông: ê ke còn hở.', 'lech-nhom':'Muốn biết góc có vuông không, bé dùng ê ke, không đo độ dài cạnh.'}}; }
    return {type:'mcq', figFn:dsBtn18, _m:'MT2', mt:'MT2', _sp:sp, _lv:lv, _dung:dung, q:hinh+'<div class="text-xl font-extrabold text-orange-700 my-1">'+cau+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(dung==='Đ'?0:1), sai:(laV?{}:{'0':(lv>=2?'goc-gan-vuong':'lech-nhom')}), goiY:{'goc-gan-vuong':'Góc gần vuông vẫn chưa vuông. Bé dùng ê ke thử nhé.', 'lech-nhom':'Góc vuông khít với góc của ê ke.', 'chung':'Bé dùng ê ke thử góc.'}};
  }, check:function(q){ var g=q._sp[0].g;
    if(q._m==='MT2'){ var v=laVuong(g.O,g.A,g.B), x=xaVuong(g.O,g.A,g.B); if(!(v||x)) return false; if(q._lv>=3) return !v && kiemMCQ(q); return (q._dung==='Đ')===v && q.choices.join()==='Đ,S' && q.correct===(v?0:1); }
    if(q._lv>=3) return kiemMCQ(q);
    var sp=q._sp[0], v=sp.ten[0], rays=[[v,sp.ten[1]],[v,sp.ten[2]]];
    function laC(a,b){ return rays.some(function(r){ return (r[0]===a&&r[1]===b)||(r[0]===b&&r[1]===a); }); }
    var truth = q._lv===1 ? (q._dd===v) : (function(){ var p=q._cs.split(' và '); return laC(p[0][0],p[0][1]) && laC(p[1][0],p[1][1]); })();
    return q.choices.join()==='Đ,S' && (q._dung==='Đ')===truth && q.correct===(truth?0:1); }},

  /* D6 — Góc vuông trên lưới (Luyện tập 1: vẽ → chọn hình) */
  {name:'Góc vuông trên lưới', sec:'Luyện tập 1 — Hình nào vẽ góc vuông trên lưới ô vuông?', mt:['MT3'], levels:3,
   muc:['Ba hình trên lưới, một hình có hai cạnh đi ngang và đi dọc.', 'Cạnh xiên không vuông là bẫy.', 'Góc vuông xiên theo đường chéo ô là hình đúng.'],
   make:function(lv){
    var cand=taoLuoi3(lv), ch=['Hình A','Hình B','Hình C'], dungI=cand.dung, dung=ch[dungI], sai={};
    ch.forEach(function(c,i){ if(i!==dungI) sai[String(i)] = lv>=2 ? 'goc-xien' : 'lech-nhom'; });
    return {type:'mcq', _gs:cand.gs, _dung:dung, q:luoiGoc3(cand.gs)+'<div>Hình nào vẽ <b>góc vuông</b>?</div>', choices:ch, correct:dungI, sai:sai,
      goiY:{'goc-xien':'Góc vuông có hai cạnh đi ngang và đi dọc theo các đường lưới, hoặc cùng theo đường chéo các ô. Cạnh xiên lệch thì không vuông.', 'lech-nhom':'Góc vuông trên lưới ô vuông: một cạnh đi ngang, một cạnh đi dọc.'}};
  }, check:function(q){ var gs=q._gs, nv=gs.filter(function(g){ return laVuong(g.O,g.A,g.B); }), ok=gs.every(function(g){ return laVuong(g.O,g.A,g.B) || xaVuong(g.O,g.A,g.B); });
    return ok && nv.length===1 && gs.indexOf(nv[0])===q.correct && q.choices[q.correct]===q._dung && new Set(q.choices).size===3; }},

  /* D7 — Điểm thứ ba (Luyện tập 1: hoàn thành góc vuông) */
  {name:'Điểm thứ ba', sec:'Luyện tập 1 — Chọn điểm để được góc vuông', mt:['MT3'], levels:3,
   muc:['Cho O, A theo đường lưới: chọn điểm B để góc AOB vuông.', 'Bốn điểm, có điểm gần đúng (bẫy cạnh xiên).', 'O, A không theo đường ngang, dọc.'],
   make:function(lv){
    var nm=chuMoi(), tO=nm[0], tA=nm[1], ts=[nm[2],nm[3],nm[4]], sp=taoDiem7(lv), ch=shuffle(ts.slice()), dung=ts[sp.dung], sai={};
    ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='goc-xien'; });
    return {type:'mcq', _sp:sp, _t:ts, _dung:dung, q:luoiDiem7(sp, tO, tA, ts)+'<div>Điểm nào cùng với '+tO+', '+tA+' tạo thành <b>góc vuông</b> '+tA+tO+'?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'goc-xien':'Góc vuông tại '+tO+': hai cạnh '+tO+tA+' và cạnh còn lại phải khít với ê ke. Bé thử từng điểm: cạnh xiên lệch thì không vuông.'}};
  }, check:function(q){ var sp=q._sp, O=sp.O, A=sp.A, nv=sp.P.filter(function(p){ return laVuong(O,A,p); }), ok=sp.P.every(function(p){ return laVuong(O,A,p) || xaVuong(O,A,p); });
    return ok && nv.length===1 && sp.P.indexOf(nv[0])===sp.dung && q._t[sp.dung]===q._dung && kiemMCQ(q); }},

  /* D8 — Đếm góc vuông (Luyện tập 2) */
  {name:'Đếm góc vuông', sec:'Luyện tập 2 — Hình có bao nhiêu góc vuông?', mt:['MT4'], levels:3,
   muc:['Đếm góc vuông trong tam giác vuông, hình chữ nhật.', 'Hình ngôi nhà, hình thang vuông.', 'Ngũ giác cụt một góc; tam giác cân cao hẹp.'],
   make:function(lv){
    var ten = lv<=1 ? pick(['tgv','hcn']) : (lv===2 ? pick(['nha','thang']) : pick(['ngu','tcan'])), P=taoDaGiac(ten), n=demVuong(P), nv=P.length;
    return {type:'num', _P:P, _e:n, q:hinhPhang([P],{cw:230, ch:180})+'<div>Em dùng ê ke thử từng góc. Hình trên có bao nhiêu <b>góc vuông</b>?</div>', ans:n, unit:'góc',
      sai:nhanSai([[n+1,'dem-sot-goc'],[n-1,'dem-sot-goc'],[n+2,'dem-sot-goc'],[nv,'lech-nhom']], n),
      goiY:{'dem-sot-goc':'Bé đi vòng quanh hình, dùng ê ke thử từng đỉnh và đếm các góc khít.', 'lech-nhom':'Số đỉnh khác số góc vuông. Bé chỉ đếm các góc khít với ê ke.'}};
  }, check:function(q){ var P=q._P; return convex(P) && daLech(P) && q.ans===demVuong(P) && q.ans===q._e; }},

  /* D9 — Hình nhiều góc vuông nhất (Luyện tập 2) */
  {name:'Nhiều góc vuông nhất', sec:'Luyện tập 2 — Hình nào có nhiều góc vuông nhất?', mt:['MT4'], levels:3,
   muc:['Hai hình: hình nào có nhiều góc vuông hơn.', 'Ba hình, đúng một hình nhiều nhất.', 'Có tam giác cân cao hẹp (không có góc vuông).'],
   make:function(lv){
    var pool = lv<=1 ? ['tgv','thang','hcn'] : ['tgv','thang','nha','ngu','hcn','tcan'], n = lv<=1 ? 2 : 3, ten, ps, cs, mx, dem=0;
    do { ten=shuffle(pool.slice()).slice(0,n); if(lv>=3 && ten.indexOf('tcan')<0) ten[0]='tcan'; ps=ten.map(taoDaGiac); cs=ps.map(demVuong); mx=Math.max.apply(null,cs); dem++; }
    while(dem<200 && (cs.filter(function(c){ return c===mx; }).length!==1 || (new Set(ten)).size!==n));
    var ch=['Hình A','Hình B','Hình C'].slice(0,n), dungI=cs.indexOf(mx), sai={}; ch.forEach(function(c,i){ if(i!==dungI) sai[String(i)]='dem-sot-goc'; });
    return {type:'mcq', _ps:ps, _dung:ch[dungI], q:hinhPhang(ps,{cw:(n===2?150:108), ch:(n===2?150:108), nhan:true})+'<div>Hình nào có <b>nhiều góc vuông nhất</b>?</div>', choices:ch, correct:dungI, sai:sai,
      goiY:{'dem-sot-goc':'Bé dùng ê ke thử từng góc của mỗi hình, đếm số góc vuông rồi so sánh.'}};
  }, check:function(q){ var cs=q._ps.map(demVuong), mx=Math.max.apply(null,cs); return q._ps.every(function(P){ return convex(P) && daLech(P); }) && cs.filter(function(c){ return c===mx; }).length===1 && cs.indexOf(mx)===q.correct && q.choices[q.correct]===q._dung; }}
 ]
};

/* ---- Lưới ô vuông: vẽ ba góc (D6) ---- */
/* Quay một vectơ k lần 90 độ rồi lật theo trục x nếu mir; dùng để đổi hướng mà vẫn giữ góc */
function bien(v, k, mir){ var x=v[0], y=v[1], t; for(var i=0;i<k;i++){ t=x; x=-y; y=t; } return [mir ? -x : x, y]; }
/* Đặt hai vectơ v1, v2 từ một điểm O trong lưới 0..n; trả về {O,A,B} theo toạ độ ô (y hướng lên) hoặc null */
function datTrongLuoi(v1, v2, n){
  var ds=[], x, y;
  for(x=0;x<=n;x++) for(y=0;y<=n;y++){ var a=[x+v1[0],y+v1[1]], b=[x+v2[0],y+v2[1]]; if(a[0]>=0&&a[0]<=n&&a[1]>=0&&a[1]<=n&&b[0]>=0&&b[0]<=n&&b[1]>=0&&b[1]<=n) ds.push({O:[x,y],A:a,B:b}); }
  return ds.length ? pick(ds) : null;
}
/* Ba phương án: một góc vuông, hai góc không vuông. Mỗi phương án có hai vectơ chọn từ danh sách; kiểm bằng tích vô hướng */
function taoLuoi3(lv){
  var gs, tries=0;
  while(tries++<400){
    var ap=function(v1,v2){ var k=rnd(0,3), m=rnd(0,1); return datTrongLuoi(bien(v1,k,m), bien(v2,k,m), 5); };
    var a=rnd(2,3), b=rnd(2,3), right, wr1, wr2;
    if(lv<=2) right = ap([a,0],[0,b]); else { var d1=rnd(1,2), d2=rnd(1,2); right = ap([d1,d1],[-d2,d2]); }
    if(lv<=1){ wr1=ap([a,0],[2,2]); wr2=ap([0,b],[-2,1]); }
    else if(lv===2){ wr1=ap([a,0],[1,3]); wr2=ap([0,b],[-3,1]); }
    else { wr1=ap([2,2],[-2,1]); wr2=ap([2,2],[-1,2]); }
    if(!right||!wr1||!wr2) continue;
    gs=[right,wr1,wr2];
    if(!gs.slice(1).every(function(g){ return xaVuong(g.O,g.A,g.B); })) continue;
    var order=shuffle([0,1,2]), res=order.map(function(i){ return gs[i]; });
    return {gs:res, dung:order.indexOf(0)};
  }
  return null;
}
function luoiGoc3(gs){
  var c=20, n=5, pad=8, gw=n*c, W=gs.length*(gw+2*pad), H=gw+2*pad+26, s=svgX(W,H), i, j, ten=['A','B','C'];
  gs.forEach(function(g, idx){ var ox=pad+idx*(gw+2*pad)+0, oy=pad;
    for(i=0;i<=n;i++){ s+='<line x1="'+(ox+i*c)+'" y1="'+oy+'" x2="'+(ox+i*c)+'" y2="'+(oy+gw)+'" stroke="'+HM.day+'" stroke-width="1.5"/><line x1="'+ox+'" y1="'+(oy+i*c)+'" x2="'+(ox+gw)+'" y2="'+(oy+i*c)+'" stroke="'+HM.day+'" stroke-width="1.5"/>'; }
    function P(p){ return [ox+p[0]*c, oy+(n-p[1])*c]; }
    var O=P(g.O), A=P(g.A), B=P(g.B);
    s+='<path d="M'+A[0]+' '+A[1]+' L'+O[0]+' '+O[1]+' L'+B[0]+' '+B[1]+'" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
      +'<circle cx="'+O[0]+'" cy="'+O[1]+'" r="4.5" fill="'+HM.cam+'"/><circle cx="'+A[0]+'" cy="'+A[1]+'" r="4" fill="'+HM.cam+'"/><circle cx="'+B[0]+'" cy="'+B[1]+'" r="4" fill="'+HM.cam+'"/>'
      +'<text x="'+(ox+gw/2)+'" y="'+(oy+gw+22)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+ten[idx]+'</text>'; });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}

/* ---- Lưới ô vuông: chọn điểm thứ ba (D7) ---- */
function taoDiem7(lv){
  var n=6, tries=0;
  while(tries++<600){
    var k=rnd(0,3), m=rnd(0,1), va, vd, vs=[], i;
    if(lv<=2){ va=bien([rnd(2,3),0],k,m); vd=bien([0,rnd(1,3)*(Math.random()<0.5?1:-1)],k,m); }
    else { var q1=rnd(1,2); va=bien([q1,q1],k,m); var q2=rnd(1,2); vd=bien([-q2,q2*(Math.random()<0.5?1:-1)],k,m); if(vd[0]*va[0]+vd[1]*va[1]!==0) continue; }
    var cho=[];
    for(i=0;i<2;i++){ var w, g=0; do { w=[rnd(-3,3),rnd(-3,3)]; g++; } while(g<200 && (w[0]===0&&w[1]===0 || Math.abs(gocGiua([0,0],va,w)-90)<(lv<=1?25:12) || gocGiua([0,0],va,w)<15 || gocGiua([0,0],va,w)>165)); cho.push(w); }
    var vs3=[vd, cho[0], cho[1]], sig=vs3.map(function(v){ return v[0]+','+v[1]; });
    if(new Set(sig).size<3) continue;
    var ds=[], x, y;
    for(x=0;x<=n;x++) for(y=0;y<=n;y++){ var inb=function(p){ return p[0]>=0&&p[0]<=n&&p[1]>=0&&p[1]<=n; }, a=[x+va[0],y+va[1]], ps=vs3.map(function(v){ return [x+v[0],y+v[1]]; });
      if(inb(a) && ps.every(inb)) ds.push({O:[x,y],A:a,P:ps}); }
    if(!ds.length) continue;
    var r=pick(ds), order=shuffle([0,1,2]), P=order.map(function(i){ return r.P[i]; });
    if(!P.slice().every(function(p,i){ return laVuong(r.O,r.A,p) || xaVuong(r.O,r.A,p); })) continue;
    return {O:r.O, A:r.A, P:P, dung:order.indexOf(0), n:n};
  }
  return null;
}
function luoiDiem7(sp, tO, tA, ts){
  var c=28, n=sp.n, m=26, W=n*c+2*m, H=n*c+2*m, s=svgX(W,H), i;
  for(i=0;i<=n;i++){ s+='<line x1="'+(m+i*c)+'" y1="'+m+'" x2="'+(m+i*c)+'" y2="'+(m+n*c)+'" stroke="'+HM.day+'" stroke-width="1.5"/><line x1="'+m+'" y1="'+(m+i*c)+'" x2="'+(m+n*c)+'" y2="'+(m+i*c)+'" stroke="'+HM.day+'" stroke-width="1.5"/>'; }
  function X(p){ return m+p[0]*c; } function Y(p){ return m+(n-p[1])*c; }
  s+='<path d="M'+X(sp.O)+' '+Y(sp.O)+' L'+X(sp.A)+' '+Y(sp.A)+'" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>';
  function diem(p, t, hs){ var dx = p[0]>=n ? -12 : 12, an = p[0]>=n ? 'end' : 'start', dy = p[1]<=0 ? 20 : -8;
    return '<circle cx="'+X(p)+'" cy="'+Y(p)+'" r="'+(hs?5.5:5)+'" fill="'+HM.cam+'"/><text x="'+(X(p)+dx)+'" y="'+(Y(p)+dy)+'" text-anchor="'+an+'" font-size="18" '+HFONT+' fill="currentColor">'+t+'</text>'; }
  s+=diem(sp.O, tO, true)+diem(sp.A, tA, false);
  sp.P.forEach(function(p, i){ s+=diem(p, ts[i], false); });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}

/* ---- Đa giác lồi trên lưới (D8, D9) ---- */
function goc3(P, i){ var n=P.length, a=P[(i+n-1)%n], b=P[i], c=P[(i+1)%n]; return gocGiua(b,a,c); }
function demVuong(P){ var k=0, i; for(i=0;i<P.length;i++) if(Math.abs(goc3(P,i)-90)<0.5) k++; return k; }
/* mọi góc hoặc đúng 90 độ, hoặc lệch ít nhất 12 độ */
function daLech(P){ var i; for(i=0;i<P.length;i++){ var d=Math.abs(goc3(P,i)-90); if(d>=0.5 && d<11.99) return false; } return true; }
/* đa giác lồi: các tích có hướng liên tiếp cùng dấu */
function convex(P){ var n=P.length, sg=0, i; for(i=0;i<n;i++){ var a=P[i], b=P[(i+1)%n], c=P[(i+2)%n], z=(b[0]-a[0])*(c[1]-b[1])-(b[1]-a[1])*(c[0]-b[0]); if(z===0) return false; if(sg===0) sg=z>0?1:-1; else if((z>0?1:-1)!==sg) return false; } return true; }
function xoay(P, k, mir){ return P.map(function(p){ var v=bien(p,k,mir); return [v[0],v[1]]; }); }
function taoDaGiac(ten){
  var P, t=0;
  do { var w, h, c;
    if(ten==='tgv'){ w=rnd(2,4); h=rnd(2,4); P=xoay([[0,0],[w,0],[0,h]], rnd(0,3), rnd(0,1)); }
    else if(ten==='hcn'){ w=rnd(3,5); h=rnd(1,3); P=xoay([[0,0],[w,0],[w,h],[0,h]], rnd(0,3), rnd(0,1)); }
    else if(ten==='thang'){ w=rnd(3,5); c=rnd(1,w-1); h=rnd(2,3); P=xoay([[0,0],[w,0],[c,h],[0,h]], rnd(0,3), rnd(0,1)); }
    else if(ten==='nha'){ h=rnd(2,3); c=pick([1,3]); P=xoay([[0,0],[4,0],[4,h],[2,h+c],[0,h]], 0, rnd(0,1)); }
    else if(ten==='ngu'){ w=rnd(3,5); h=rnd(3,4); c=rnd(1,2); P=xoay([[0,0],[w,0],[w,h-c],[w-c,h],[0,h]], 0, rnd(0,1)); }
    else { var q=pick([[2,4],[4,4],[4,5]]); P=xoay([[0,0],[q[0],0],[q[0]/2,q[1]]], 0, 0); }
    t++;
  } while(t<100 && !(convex(P) && daLech(P)));
  return P;
}
/* Hình mới 5: một hay nhiều đa giác, mỗi đa giác trong một ô cw × ch; nhan = có chữ A, B, C dưới mỗi hình */
function hinhPhang(polys, o){
  var cw=o.cw||108, chh=o.ch||108, cap=o.nhan?28:0, s=svgX(polys.length*cw, chh+cap), ten=['A','B','C'];
  polys.forEach(function(P, i){
    var xs=P.map(function(p){ return p[0]; }), ys=P.map(function(p){ return p[1]; }), mnx=Math.min.apply(null,xs), mxx=Math.max.apply(null,xs), mny=Math.min.apply(null,ys), mxy=Math.max.apply(null,ys),
        k=Math.min((cw-26)/(mxx-mnx||1), (chh-26)/(mxy-mny||1), 34), cx=i*cw+cw/2, cy=chh/2;
    var pts=P.map(function(p){ return f1(cx+(p[0]-(mnx+mxx)/2)*k)+','+f1(cy-(p[1]-(mny+mxy)/2)*k); }).join(' ');
    s+='<polygon points="'+pts+'" fill="'+HM.troi+'" fill-opacity="0.25" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>';
    if(o.nhan) s+='<text x="'+cx+'" y="'+(chh+22)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+ten[i]+'</text>';
  });
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
