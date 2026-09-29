/* bai-13.js — NỘI DUNG Bài 13 (Tìm thành phần trong phép nhân, phép chia). Engine v2, THÍCH ỨNG 3 mức.
   Bám SGK trang in 39-41: Tìm thừa số · Tìm số bị chia · Tìm số chia · bảng · sơ đồ · giải toán.
   Mức 1 = số nhỏ (bảng 2–5) · Mức 2 = bảng 2–9 · Mức 3 = vế còn lại là một phép tính / tính ngược hai bước / bài hai bước.
   Hình riêng: jug (ca nước). rnd/pick/shuffle + tinhBT ở figures.js.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Ca đựng nước (hình riêng Bài 13) ---- */
function jug(){
  return '<svg width="46" height="58" viewBox="0 0 60 74" style="display:inline-block">'
   +'<path d="M14 16 h30 a3 3 0 0 1 3 3 v44 a7 7 0 0 1 -7 7 h-22 a7 7 0 0 1 -7 -7 v-44 a3 3 0 0 1 3 -3 z" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>'
   +'<path d="M47 26 q11 1 11 12 q0 11 -11 12" fill="none" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>'
   +'<path d="M13 40 h34 v20 a7 7 0 0 1 -7 7 h-20 a7 7 0 0 1 -7 -7 z" fill="#38bdf8"/>'
   +'<ellipse cx="30" cy="16" rx="17" ry="4" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>'
   +'</svg>';
}
/* Ô ẩn (?) màu hổ phách trong phép tính */
function ubox(){ return '<span style="width:44px;height:44px" class="inline-flex items-center justify-center rounded-lg bg-white border-2 border-amber-500 text-amber-700 font-extrabold text-2xl align-middle">?</span>'; }
/* Một dòng phép tính lớn (chuỗi HTML đã dựng sẵn) */
function eqline(html){ return '<div class="flex items-center justify-center gap-2 flex-wrap text-3xl font-extrabold text-slate-700 my-3">'+html+'</div>'; }
/* Bảng 3 dòng tìm thành phần: nhãn r1/r2/r3, giá trị v1/v2/v3, ô hide = ? */
function tri(r1,r2,r3, v1,v2,v3, hide){
  function cell(v,on){ return '<td class="px-5 py-1 text-center text-lg '+(on?'bg-amber-100 text-amber-700 font-extrabold':'font-bold text-slate-700')+'" style="border:1px solid #fcd34d">'+(on?'?':v)+'</td>'; }
  function lab(t){ return '<td class="px-3 py-1 font-bold text-slate-600 bg-amber-50" style="border:1px solid #fcd34d">'+t+'</td>'; }
  return '<table class="mx-auto border-collapse my-2" style="border:2px solid #fcd34d;border-radius:8px;overflow:hidden">'
   +'<tr>'+lab(r1)+cell(v1,hide===0)+'</tr>'
   +'<tr>'+lab(r2)+cell(v2,hide===1)+'</tr>'
   +'<tr>'+lab(r3)+cell(v3,hide===2)+'</tr></table>';
}
function oVuong(v){ return v===null
  ? '<span style="width:56px;height:56px" class="inline-flex items-center justify-center rounded-xl bg-white border-2 border-amber-500 text-amber-700 font-extrabold text-2xl">?</span>'
  : '<span style="width:56px;height:56px" class="inline-flex items-center justify-center rounded-full bg-emerald-300 text-slate-900 font-extrabold text-2xl">'+v+'</span>'; }
function muiTen(op){ return '<span class="text-slate-600 font-bold">'+op+' &#8594;</span>'; }
/* Sơ đồ tìm số ĐẦU: [?] --op--> (R)  ·  hai bước: [?] --op1--> ( ) --op2--> (R) */
function arrowFind(op, R){ return '<div class="flex items-center justify-center gap-1 md:gap-2 my-3 flex-wrap">'+oVuong(null)+muiTen(op)+oVuong(R)+'</div>'; }
function arrowFind2(op1, op2, R){
  return '<div class="flex items-center justify-center gap-1 md:gap-2 my-3 flex-wrap">'+oVuong(null)+muiTen(op1)
   +'<span style="width:48px;height:48px" class="inline-flex items-center justify-center rounded-full bg-slate-100 border border-slate-300 text-slate-500 font-extrabold text-lg">&#8230;</span>'
   +muiTen(op2)+oVuong(R)+'</div>';
}
/* Cặp thừa số khác của P (b × c, b,c ≤ 10), khác cặp {x,y} — cho Mức 3 */
function capKhac(P, x, y){
  var o=[]; for(var b=2;b<=10;b++){ var c=P/b; if(Number.isInteger(c) && c>=2 && c<=10 && !((b===x&&c===y)||(b===y&&c===x))) o.push(b+' × '+c); }
  return o.length ? pick(o) : null;
}
function soLon(lv){ return lv<=1 ? rnd(2,5) : (lv===2 ? rnd(2,9) : rnd(4,9)); }   /* chỉ trong các bảng đã học (2–9) */

var BAI = {
 n: 13,
 title: 'Tìm Thành Phần Trong Phép Nhân, Phép Chia',
 sub: 'Bé chọn một hoạt động rồi luyện tập nhé!',
 goal: 10,
 topics: [
  {name:'Khám phá', sec:'Khám phá — Tìm thừa số (chia đều)', levels:3,
   muc:['Chia đều số lít nước cho 2–3 ca (số nhỏ).', 'Chia đều số lít nước cho tới 5 ca.', 'Bài hai bước: tìm một ca rồi tính vài ca.'],
   make:function(lv){
    var n = lv<=1 ? rnd(2,3) : rnd(2,5), each = lv<=1 ? rnd(2,5) : rnd(2,9), tot=n*each, js='';
    for(var i=0;i<n;i++) js+=jug();
    if(lv>=3){ var h=rnd(2,4); if(h===n) h=n+1;
      return {type:'num', _e:each*h, q:'<div class="flex justify-center gap-1 mb-2 flex-wrap">'+js+'</div>'
        +'<div class="text-slate-600 text-base mb-1">'+n+' ca đựng nước như nhau, tất cả '+tot+' l nước.</div>'
        +'<div>Hỏi '+h+' ca như thế đựng bao nhiêu lít nước?</div>', ans:each*h, unit:'lít'}; }
    return {type:'num', _e:each, q:'<div class="flex justify-center gap-1 mb-2 flex-wrap">'+js+'</div>'
      +'<div class="text-slate-600 text-base mb-1">'+n+' ca đựng nước như nhau, tất cả '+tot+' l nước.</div>'
      +'<div>Hỏi mỗi ca đựng mấy lít nước?</div>'
      +(lv<=1 ? '<div class="text-slate-500 text-sm mt-1">(? × '+n+' = '+tot+')</div>' : ''), ans:each, unit:'lít'};
  }, check:function(q){ return q.ans===q._e && q.ans>0; }},

  {name:'Tìm thừa số', sec:'Hoạt động 1 — Tìm thừa số', levels:3,
   muc:['Tìm thừa số trong bảng nhân 2–5.', 'Tìm thừa số trong bảng nhân 2–9.', 'Tìm thừa số khi vế kia là một phép nhân khác (? × 4 = 3 × 8).'],
   make:function(lv){
    var f1=soLon(lv), f2=soLon(lv), P=f1*f2, ve=String(P);
    if(lv>=3){ var k=capKhac(P, f1, f2); if(k) ve=k; }
    var eq, ans;
    if(Math.random()<0.5){ eq=ubox()+'<span>× '+f2+' = '+ve+'</span>'; ans=f1; }
    else { eq='<span>'+f1+' ×</span>'+ubox()+'<span>= '+ve+'</span>'; ans=f2; }
    return {type:'num', _a:ans, _f1:f1, _f2:f2, _ve:ve, q:(lv<=1?'<div class="text-slate-500 text-sm mb-1">Muốn tìm một thừa số, lấy tích chia cho thừa số kia.</div>':'')+eqline(eq), ans:ans};
  }, check:function(q){ return q._f1*q._f2===tinhBT(q._ve) && (q.ans===q._f1 || q.ans===q._f2) && q.ans===q._a; }},

  {name:'Bảng thừa số', sec:'Hoạt động 2 — Số? (thừa số và tích)', levels:3,
   muc:['Tìm tích của hai thừa số nhỏ.', 'Tìm thừa số hoặc tích trong bảng nhân 2–9.', 'Tìm thừa số với các số lớn (tới 10).'],
   make:function(lv){
    var f1=soLon(lv), f2=soLon(lv), P=f1*f2, hide = lv<=1 ? 2 : (lv===2 ? rnd(0,2) : rnd(0,1));
    var ans = hide===0?f1 : (hide===1?f2 : P);
    return {type:'num', _a:ans, _f1:f1, _f2:f2, _h:hide, q: tri('Thừa số','Thừa số','Tích', f1,f2,P, hide)+'<div class="mt-1">Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ans};
  }, check:function(q){ return q.ans===[q._f1,q._f2,q._f1*q._f2][q._h]; }},

  {name:'Tìm số bị chia', sec:'Khám phá — Tìm số bị chia', levels:3,
   muc:['Tìm số bị chia với số chia, thương nhỏ (bảng 2–5).', 'Tìm số bị chia trong bảng chia 2–9.', 'Tìm số bị chia khi thương là một phép nhân (? : 4 = 2 × 3).'],
   make:function(lv){
    var b=soLon(lv), q2, ve;
    if(lv>=3){ var c=rnd(2,3), d=rnd(2,5); if(c*d>10) d=2; q2=c*d; ve=c+' × '+d; } else { q2=soLon(lv); ve=String(q2); }
    var D=b*q2;
    return {type:'num', _a:D, _b:b, _ve:ve, q:(lv<=1?'<div class="text-slate-500 text-sm mb-1">Muốn tìm số bị chia, lấy thương nhân với số chia.</div>':'')
      +eqline(ubox()+'<span>: '+b+' = '+ve+'</span>'), ans:D};
  }, check:function(q){ return q.ans===q._b*tinhBT(q._ve) && q.ans===q._a; }},

  {name:'Tìm số chia', sec:'Hoạt động 1 — Tìm số chia', levels:3,
   muc:['Tìm số chia với số nhỏ (bảng 2–5).', 'Tìm số chia trong bảng chia 2–9.', 'Tìm số chia khi thương là một phép chia khác (24 : ? = 20 : 5).'],
   make:function(lv){
    var s=soLon(lv), q2=(lv>=3 ? rnd(2,9) : soLon(lv)), D=s*q2, ve=String(q2);
    if(lv>=3){ var x=pick([2,3,4,5]); ve=(q2*x)+' : '+x; }
    return {type:'num', _a:s, _D:D, _ve:ve, q:(lv<=1?'<div class="text-slate-500 text-sm mb-1">Muốn tìm số chia, lấy số bị chia chia cho thương.</div>':'')
      +eqline('<span>'+D+' :</span>'+ubox()+'<span>= '+ve+'</span>'), ans:s};
  }, check:function(q){ return q._D/q.ans===tinhBT(q._ve) && q.ans===q._a; }},

  {name:'Bảng chia', sec:'Hoạt động 2 — Số? (số bị chia, số chia, thương)', levels:3,
   muc:['Tìm thương với số nhỏ.', 'Tìm số bị chia, số chia hoặc thương trong bảng chia 2–9.', 'Tìm số chia hoặc số bị chia với các số lớn (tới 10).'],
   make:function(lv){
    var s=soLon(lv), q2=soLon(lv), D=s*q2, hide = lv<=1 ? 2 : (lv===2 ? rnd(0,2) : rnd(0,1));
    var ans = hide===0?D : (hide===1?s : q2);
    return {type:'num', _a:ans, _s:s, _q:q2, _h:hide, q: tri('Số bị chia','Số chia','Thương', D,s,q2, hide)+'<div class="mt-1">Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ans};
  }, check:function(q){ return q.ans===[q._s*q._q,q._s,q._q][q._h]; }},

  {name:'Sơ đồ', sec:'Luyện tập — Số?', levels:3,
   muc:['Tìm số đầu khi biết kết quả sau một phép nhân hoặc chia cho 2, 3.', 'Tìm số đầu sau một phép nhân hoặc chia cho 2–5.', 'Tìm số đầu qua HAI bước (tính ngược từ cuối về đầu).'],
   make:function(lv){
    if(lv>=3){ var st=rnd(2,9), k=rnd(2,4), m=rnd(2,9), R;
      if(Math.random()<0.5){ R=st*k+m; return {type:'num', _a:st, _bt:st+' × '+k+' + '+m, _R:R, q: arrowFind2('× '+k, '+ '+m, R)+'<div>Số ở ô đầu <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:st}; }
      var m2=rnd(1,st*k-1); R=st*k-m2; return {type:'num', _a:st, _bt:st+' × '+k+' − '+m2, _R:R, q: arrowFind2('× '+k, '− '+m2, R)+'<div>Số ở ô đầu <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:st}; }
    var k2 = lv<=1 ? rnd(2,3) : rnd(2,5);
    if(Math.random()<0.5){ var s0 = lv<=1 ? rnd(2,5) : rnd(2,10), R1=s0*k2; return {type:'num', _a:s0, _bt:s0+' × '+k2, _R:R1, q: arrowFind('× '+k2, R1)+'<div>Số ở ô vuông <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:s0}; }
    var R2 = lv<=1 ? rnd(2,5) : rnd(2,10), s2=R2*k2; return {type:'num', _a:s2, _bt:s2+' : '+k2, _R:R2, q: arrowFind(': '+k2, R2)+'<div>Số ở ô vuông <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:s2};
  }, check:function(q){ return q.ans===q._a && tinhBT(q._bt)===q._R && +q._bt.split(' ')[0]===q.ans; }},

  {name:'Giải toán', sec:'Luyện tập — Giải toán', levels:3,
   muc:['Bài toán một bước với số nhỏ.', 'Bài toán một bước: tìm số đĩa, số người mỗi ca-bin, số bông hoa.', 'Bài toán hai bước (chia rồi trừ, chia rồi nhân).'],
   make:function(lv){
    var r=Math.random();
    if(lv<=1){ var L=rnd(2,4), b=rnd(2,5); return {type:'num', _a:L*b, q:'<div class="text-5xl mb-2">&#127803;</div>Mai cắm hết số bông hoa vào '+L+' lọ, mỗi lọ có '+b+' bông. Hỏi Mai đã cắm tất cả bao nhiêu bông hoa?', ans:L*b, unit:'bông'}; }
    if(lv===2){
      if(r<0.34){ var m=rnd(2,7), d=rnd(3,7), T=m*d; return {type:'num', _a:d, q:'<div class="text-5xl mb-2">&#127818;</div>Có '+T+' quả cam xếp vào các đĩa, mỗi đĩa '+m+' quả. Hỏi xếp được mấy đĩa cam như vậy?', ans:d, unit:'đĩa'}; }
      if(r<0.67){ var n=rnd(3,6), each=rnd(3,8), T2=n*each; return {type:'num', _a:each, q:'<div class="text-5xl mb-2">&#128668;</div>'+n+' ca-bin chở tất cả '+T2+' người, mỗi ca-bin chở như nhau. Hỏi mỗi ca-bin chở bao nhiêu người?', ans:each, unit:'người'}; }
      var L2=rnd(2,6), b2=rnd(3,8); return {type:'num', _a:L2*b2, q:'<div class="text-5xl mb-2">&#127803;</div>Mai cắm hết số bông hoa vào '+L2+' lọ, mỗi lọ có '+b2+' bông. Hỏi Mai đã cắm tất cả bao nhiêu bông hoa?', ans:L2*b2, unit:'bông'};
    }
    if(r<0.5){ var m3=rnd(2,6), d3=rnd(4,9), ban=rnd(1,d3-1);
      return {type:'num', _a:d3-ban, q:'<div class="text-5xl mb-2">&#127818;</div>Có '+(m3*d3)+' quả cam xếp vào các đĩa, mỗi đĩa '+m3+' quả. Đã bán '+ban+' đĩa. Hỏi còn lại mấy đĩa cam?', ans:d3-ban, unit:'đĩa'}; }
    var n3=rnd(3,6), e3=rnd(3,8), h3=rnd(2,4); if(h3===n3) h3=2;
    return {type:'num', _a:e3*h3, q:'<div class="text-5xl mb-2">&#128668;</div>'+n3+' ca-bin chở tất cả '+(n3*e3)+' người, mỗi ca-bin chở như nhau. Hỏi '+h3+' ca-bin như thế chở bao nhiêu người?', ans:e3*h3, unit:'người'};
  }, check:function(q){ return q.ans===q._a && q.ans>0; }}
 ]
};
