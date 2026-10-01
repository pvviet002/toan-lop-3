/* bai-10.js — NỘI DUNG Bài 10 (Bảng nhân 7, bảng chia 7). Engine v2, THÍCH ỨNG 3 mức (levels:3, make(lv)).
   Hình: doiKeoCo, soDo (qua arrowBox), bong, daySo, tuanLe, hopCoc — đều ở figures.js. Bộ sinh câu dùng chung ở figures.js.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Hình riêng Bài 10: dùng hình chung của figures.js (doiKeoCo, soDo, bong, tuanLe, hopCoc) ---- */
/* Sơ đồ mũi tên: (vào) op -> [ra]; ô chưa biết (null) hiện "?" */
function arrowBox(inp, op, out){ return soDo([{v:inp, h:'tron'}, {v:(out===undefined ? null : out), h:'vuong'}], [op]); }
function bt7(lv){   /* một phép tính với 7 (Mức 1: 7 × 1..5) */
  if(lv<=1){ var k=rnd(1,5); return Math.random()<0.5 ? '7 × '+k : k+' × 7'; }
  var k2=rnd(1,10); return Math.random()<0.5 ? '7 × '+k2 : (7*k2)+' : 7';
}

var BAI = {
 n: 10,
 title: 'Bảng Nhân 7, Bảng Chia 7',
 sub: 'Bé chọn một hoạt động rồi luyện tập nhé!',
 goal: 10,
 topics: [
  {name:'Khám phá', sec:'Khám phá — Phép nhân 7 là phép cộng các số 7', levels:3,
   muc:['Đếm số bạn của 2–3 đội bằng phép cộng các số 7.', 'Cộng nhiều số 7 (4–5 đội) mà không cần gợi ý phép nhân.', 'Làm ngược lại: biết tổng số bạn, tìm số đội.'],
   make:function(lv){
    if(lv>=3){ var m=rnd(3,9);
      return {type:'num', _n:m, _nguoc:true, q:doiKeoCo(1)+'<div>Mỗi đội kéo co có 7 bạn. Có tất cả '+(7*m)+' bạn chơi kéo co.</div><div class="mt-1">Hỏi có mấy đội?</div>', ans:m, unit:'đội'}; }
    var n = lv<=1 ? rnd(2,3) : rnd(4,5), add=[]; for(var i=0;i<n;i++) add.push('7');
    return {type:'num', _n:n, _nguoc:false, q: doiKeoCo(n)
      +'<div class="text-slate-600 text-base mb-2">Mỗi đội kéo co có 7 bạn. Có '+n+' đội chơi.</div>'
      +'<div class="text-xl">'+add.join(' + ')+' = ?</div>'
      +(lv<=1 ? '<div class="text-slate-500 text-base mt-1">(tức là 7 × '+n+')</div>' : ''), ans:7*n, unit:'bạn'};
  }, check:function(q){ return q._nguoc ? q.ans===q._n : q.ans===7*q._n; }},

  {name:'Mũi tên', sec:'Hoạt động 1 — Số?', levels:3,
   muc:['Tính 7 × 2 đến 7 × 5 theo mũi tên.', 'Tính nhân hoặc chia với 7 tới 7 × 10 theo mũi tên.', 'Tìm số ở ô ĐẦU khi biết kết quả (tính ngược).'],
   make:function(lv){
    var k = lv<=1 ? rnd(2,5) : rnd(2,10);
    if(lv<=1) return {type:'num', _a:7*k, q: arrowBox(7, '× '+k)+'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:7*k};
    if(lv===2) return Math.random()<0.5
      ? {type:'num', _a:7*k, q: arrowBox(7, '× '+k)+'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:7*k}
      : {type:'num', _a:k, q: arrowBox(7*k, ': 7')+'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:k};
    return Math.random()<0.5
      ? {type:'num', _a:k, q: arrowBox(null, '× 7', 7*k)+'<div>Số ở ô đầu <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:k}
      : {type:'num', _a:7*k, q: arrowBox(null, ': 7', k)+'<div>Số ở ô đầu <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:7*k};
  }, check:function(q){ return q.ans===q._a && q.ans>0; }},

  {name:'Chọn bóng', sec:'Hoạt động 2 — Chọn phép tính theo điều kiện', levels:3,
   muc:['Chọn quả bóng có kết quả bé hơn một số, các kết quả khác xa nhau.', 'Chọn quả bóng có kết quả bé hơn một số, các kết quả gần nhau.', 'Chọn quả bóng thoả HAI điều kiện: lớn hơn số này và bé hơn số kia.'],
   make:function(lv){
    var cnt = lv<=1 ? 3 : 4, pool=[], g=0;
    while(pool.length<cnt && g<300){ g++; var t=bt7(lv), v=tinhBT(t); if(!pool.some(function(p){ return p.v===v; }) && (lv>1 || pool.every(function(p){ return Math.abs(p.v-v)>=5; }))) pool.push({t:t, v:v}); }
    var vals=pool.map(function(p){ return p.v; }).sort(function(a,b){ return a-b; }), order=pool.slice(); shuffle(order);
    if(lv>=3){ var i=rnd(1,cnt-2), lo=vals[i-1], hi=vals[i+1];
      return {type:'mcq', figFn:bong, _lo:lo, _hi:hi, q:'<div>Quả bóng nào có kết quả <b>lớn hơn '+lo+'</b> và <b>bé hơn '+hi+'</b>?</div>', choices:order.map(function(o){ return o.t; }), correct:order.findIndex(function(o){ return o.v===vals[i]; })}; }
    var N=vals[1];
    return {type:'mcq', figFn:bong, _lo:-1, _hi:N, q:'<div>Quả bóng nào ghi phép tính có <b>kết quả bé hơn '+N+'</b>?</div>', choices:order.map(function(o){ return o.t; }), correct:order.findIndex(function(o){ return o.v===vals[0]; })};
  }, check:function(q){ var ok=q.choices.filter(function(c){ var v=tinhBT(c); return v>q._lo && v<q._hi; }); return ok.length===1 && ok[0]===q.choices[q.correct]; }},

  {name:'Số còn thiếu', sec:'Luyện tập — Nêu các số còn thiếu', levels:3,
   muc:['Đếm thêm 7 từ 7, tìm số ở đầu dãy.', 'Đếm thêm hoặc bớt 7, tìm số ở giữa dãy.', 'Dãy không bắt đầu từ 7 và ô bên cạnh bị che — dùng bước đếm 7.'],
   make:function(lv){ return bnDaySo(7, lv, 'tron', 'thoi'); }, check:bnKiemDay},

  {name:'Lập bảng', sec:'Khám phá — Hoàn thành bảng nhân 7', levels:3,
   muc:['Điền các dòng đầu của bảng nhân 7.', 'Điền các dòng cuối (7 × 6 đến 7 × 10).', 'Điền khi các dòng bên cạnh cũng bị che — phải nhớ, không đếm thêm.'],
   make:function(lv){ return bnBang(7, lv, false); }, check:bnKiemBang},

  {name:'So sánh', sec:'Luyện tập — So sánh (>, <, =)', levels:3,
   muc:['So sánh một phép tính với một số.', 'So sánh hai phép tính nhân, chia với 7.', 'So sánh phép tính hai bước (7 × 4 + 7 và 7 × 5).'],
   make:function(lv){
    var A, B;
    if(lv<=1){ A=bt7(1); var v=tinhBT(A); B=String(v+pick([-5,-3,0,3,5])); if(+B<=0) B=String(v+3); }
    else if(lv===2){ A=bt7(2); B=bt7(2); if(Math.random()<0.3){ var k=rnd(2,10); A='7 × '+k; B=k+' × 7'; } }
    else { var k3=rnd(2,9), j=rnd(k3,k3+2); A='7 × '+k3+(Math.random()<0.5?' + 7':' − 7'); B='7 × '+j; if(Math.random()<0.5){ var t=A; A=B; B=t; } }
    var va=tinhBT(A), vb=tinhBT(B), sign = va>vb ? '>' : (va<vb ? '<' : '=');
    return {type:'mcq', _a:A, _b:B, q:'<div class="text-2xl font-extrabold text-orange-700 my-2">'+A+' &nbsp; ? &nbsp; '+B+'</div><div>Điền dấu thích hợp:</div>', choices:['>','<','='], correct:['>','<','='].indexOf(sign)};
  }, check:function(q){ var va=tinhBT(q._a), vb=tinhBT(q._b); return q.choices[q.correct]===(va>vb?'>':(va<vb?'<':'=')); }},

  {name:'Giải toán', sec:'Luyện tập — Giải toán', levels:3,
   muc:['Bài toán một phép nhân với số nhỏ.', 'Bài toán một phép nhân hoặc phép chia với 7.', 'Bài toán hai bước (tuần lễ và ngày lẻ, chia rồi nhân).'],
   make:function(lv){
    var n = lv<=1 ? rnd(2,5) : rnd(2,9);
    if(lv<=1 || (lv===2 && Math.random()<0.5)) return {type:'num', _e:7*n, q:tuanLe(lv<=1 ? n : 1)+'Mỗi tuần lễ có 7 ngày. Bố của Mai đi công tác '+n+' tuần lễ. Hỏi bố của Mai đi công tác bao nhiêu ngày?', ans:7*n, unit:'ngày'};
    if(lv===2) return {type:'num', _e:n, q:'<div class="flex justify-center mb-2">'+hopCoc(7)+'</div>Có '+(7*n)+' cái cốc xếp đều vào 7 hộp. Hỏi mỗi hộp có mấy cái cốc?', ans:n, unit:'cái'};
    if(Math.random()<0.5){ var d=rnd(1,6);
      return {type:'num', _e:7*n+d, q:tuanLe(1)+'Bố của Mai đi công tác '+n+' tuần lễ và '+d+' ngày. Hỏi bố của Mai đi công tác tất cả bao nhiêu ngày?', ans:7*n+d, unit:'ngày'}; }
    var p=rnd(2,5), h=rnd(2,6);
    return {type:'num', _e:p*h, q:'<div class="flex justify-center mb-2">'+hopCoc(7)+'</div>Có '+(7*p)+' cái cốc xếp đều vào 7 hộp. Hỏi '+h+' hộp như thế có bao nhiêu cái cốc?', ans:p*h, unit:'cái'};
  }, check:function(q){ return q.ans===q._e && q.ans>0; }}
 ]
};
