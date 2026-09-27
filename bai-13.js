/* bai-13.js — NỘI DUNG Bài 13 (Tìm thành phần trong phép nhân, phép chia). Engine v2.
   Bám SGK trang in 39-41: Tìm thừa số · Tìm số bị chia · Tìm số chia · bảng · sơ đồ · giải toán.
   Hình riêng: jug (ca nước). rnd/pick/shuffle ở figures.js.
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
function ubox(){ return '<span style="width:44px;height:44px" class="inline-flex items-center justify-center rounded-lg bg-white border-2 border-amber-400 text-amber-600 font-extrabold text-2xl align-middle">?</span>'; }
/* Một dòng phép tính lớn (chuỗi HTML đã dựng sẵn) */
function eqline(html){ return '<div class="flex items-center justify-center gap-2 flex-wrap text-3xl font-extrabold text-slate-700 my-3">'+html+'</div>'; }
/* Bảng 3 dòng tìm thành phần: nhãn r1/r2/r3, giá trị v1/v2/v3, ô hide = ? */
function tri(r1,r2,r3, v1,v2,v3, hide){
  function cell(v,on){ return '<td class="px-5 py-1 text-center text-lg '+(on?'bg-amber-100 text-amber-700 font-extrabold':'font-bold text-slate-700')+'" style="border:1px solid #fcd34d">'+(on?'?':v)+'</td>'; }
  function lab(t){ return '<td class="px-3 py-1 font-bold text-slate-500 bg-amber-50" style="border:1px solid #fcd34d">'+t+'</td>'; }
  return '<table class="mx-auto border-collapse my-2" style="border:2px solid #fcd34d;border-radius:8px;overflow:hidden">'
   +'<tr>'+lab(r1)+cell(v1,hide===0)+'</tr>'
   +'<tr>'+lab(r2)+cell(v2,hide===1)+'</tr>'
   +'<tr>'+lab(r3)+cell(v3,hide===2)+'</tr></table>';
}
/* Sơ đồ mũi tên một bước tìm số ĐẦU: [?] --op--> (R) */
function arrowFind(op, R){
  return '<div class="flex items-center justify-center gap-1 md:gap-2 my-3 flex-wrap">'
   +'<span style="width:56px;height:56px" class="inline-flex items-center justify-center rounded-xl bg-white border-2 border-amber-400 text-amber-600 font-extrabold text-2xl">?</span>'
   +'<span class="text-slate-500 font-bold">'+op+' &#8594;</span>'
   +'<span style="width:56px;height:56px" class="inline-flex items-center justify-center rounded-full bg-emerald-400 text-white font-extrabold text-2xl">'+R+'</span>'
   +'</div>';
}

var BAI = {
 n: 13,
 title: 'Tìm Thành Phần Trong Phép Nhân, Phép Chia',
 sub: 'Bé chọn một hoạt động rồi luyện tập nhé!',
 goal: 10,
 topics: [
  {name:'Khám phá', sec:'Khám phá — Tìm thừa số (chia đều)', make:function(){
    var n=rnd(2,5), each=rnd(2,9), tot=n*each; var js=''; for(var i=0;i<n;i++) js+=jug();
    return {type:'num', _e:each, q:'<div class="flex justify-center gap-1 mb-2 flex-wrap">'+js+'</div>'
      +'<div class="text-slate-600 text-base mb-1">'+n+' ca đựng nước như nhau, tất cả '+tot+' l nước.</div>'
      +'<div>Hỏi mỗi ca đựng mấy lít nước?</div>'
      +'<div class="text-slate-400 text-sm mt-1">(? × '+n+' = '+tot+')</div>', ans:each, unit:'lít'};
  }, check:function(q){ return q.ans===q._e; }},

  {name:'Tìm thừa số', sec:'Hoạt động 1 — Tìm thừa số', make:function(){
    var f1=rnd(2,9), f2=rnd(2,9), P=f1*f2;
    var eq, ans;
    if(Math.random()<0.5){ eq=ubox()+'<span>× '+f2+' = '+P+'</span>'; ans=f1; }
    else { eq='<span>'+f1+' ×</span>'+ubox()+'<span>= '+P+'</span>'; ans=f2; }
    return {type:'num', _a:ans, q:'<div class="text-slate-500 text-sm mb-1">Muốn tìm một thừa số, lấy tích chia cho thừa số kia.</div>'+eqline(eq), ans:ans};
  }, check:function(q){ return q.ans===q._a; }},

  {name:'Bảng thừa số', sec:'Hoạt động 2 — Số? (thừa số và tích)', make:function(){
    var f1=rnd(2,9), f2=rnd(2,9), P=f1*f2; var hide=rnd(0,2);
    var ans = hide===0?f1 : (hide===1?f2 : P);
    return {type:'num', _a:ans, q: tri('Thừa số','Thừa số','Tích', f1,f2,P, hide)+'<div class="mt-1">Số ở ô <b class="text-amber-600">?</b> là bao nhiêu?</div>', ans:ans};
  }, check:function(q){ return q.ans===q._a; }},

  {name:'Tìm số bị chia', sec:'Khám phá — Tìm số bị chia', make:function(){
    var b=rnd(2,9), q2=rnd(2,9), D=b*q2;
    return {type:'num', _a:D, q:'<div class="text-slate-500 text-sm mb-1">Muốn tìm số bị chia, lấy thương nhân với số chia.</div>'
      +eqline(ubox()+'<span>: '+b+' = '+q2+'</span>'), ans:D};
  }, check:function(q){ return q.ans===q._a; }},

  {name:'Tìm số chia', sec:'Hoạt động 1 — Tìm số chia', make:function(){
    var s=rnd(2,9), q2=rnd(2,9), D=s*q2;
    return {type:'num', _a:s, q:'<div class="text-slate-500 text-sm mb-1">Muốn tìm số chia, lấy số bị chia chia cho thương.</div>'
      +eqline('<span>'+D+' :</span>'+ubox()+'<span>= '+q2+'</span>'), ans:s};
  }, check:function(q){ return q.ans===q._a; }},

  {name:'Bảng chia', sec:'Hoạt động 2 — Số? (số bị chia, số chia, thương)', make:function(){
    var s=rnd(2,9), q2=rnd(2,9), D=s*q2; var hide=rnd(0,2);
    var ans = hide===0?D : (hide===1?s : q2);
    return {type:'num', _a:ans, q: tri('Số bị chia','Số chia','Thương', D,s,q2, hide)+'<div class="mt-1">Số ở ô <b class="text-amber-600">?</b> là bao nhiêu?</div>', ans:ans};
  }, check:function(q){ return q.ans===q._a; }},

  {name:'Sơ đồ', sec:'Luyện tập — Số?', make:function(){
    var k=rnd(2,5);
    if(Math.random()<0.5){ var start=rnd(2,10); var R=start*k; return {type:'num', _a:start, q: arrowFind('× '+k, R)+'<div>Số ở ô vuông <b class="text-amber-600">?</b> là bao nhiêu?</div>', ans:start}; }
    var R2=rnd(2,10); var start2=R2*k; return {type:'num', _a:start2, q: arrowFind(': '+k, R2)+'<div>Số ở ô vuông <b class="text-amber-600">?</b> là bao nhiêu?</div>', ans:start2};
  }, check:function(q){ return q.ans===q._a; }},

  {name:'Giải toán', sec:'Luyện tập — Giải toán', make:function(){
    var r=Math.random();
    if(r<0.34){ var m=rnd(2,7), d=rnd(3,7), T=m*d; return {type:'num', _a:d, q:'<div class="text-5xl mb-2">&#127818;</div>Có '+T+' quả cam xếp vào các đĩa, mỗi đĩa '+m+' quả. Hỏi xếp được mấy đĩa cam như vậy?', ans:d, unit:'đĩa'}; }
    if(r<0.67){ var n=rnd(3,6), each=rnd(3,8), T2=n*each; return {type:'num', _a:each, q:'<div class="text-5xl mb-2">&#128668;</div>'+n+' ca-bin chở tất cả '+T2+' người, mỗi ca-bin chở như nhau. Hỏi mỗi ca-bin chở bao nhiêu người?', ans:each, unit:'người'}; }
    var L=rnd(2,6), b=rnd(3,8); return {type:'num', _a:L*b, q:'<div class="text-5xl mb-2">&#127803;</div>Mai cắm hết số bông hoa vào '+L+' lọ, mỗi lọ có '+b+' bông. Hỏi Mai đã cắm tất cả bao nhiêu bông hoa?', ans:L*b, unit:'bông'};
  }, check:function(q){ return q.ans===q._a && q.ans>0; }}
 ]
};
