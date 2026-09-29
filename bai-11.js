/* bai-11.js — NỘI DUNG Bài 11 (Bảng nhân 8, bảng chia 8). Engine v2, THÍCH ỨNG 3 mức (levels:3, make(lv)).
   Hình riêng của bài: octopus (bạch tuộc 8 xúc tu). arrow2 + bộ sinh câu dùng chung ở figures.js.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Con bạch tuộc 8 xúc tu (hình riêng Bài 11) ---- */
function octopus(){
  return '<svg width="62" height="62" viewBox="0 0 100 100" style="display:inline-block">'
   +'<ellipse cx="50" cy="90" rx="28" ry="4" fill="rgba(0,0,0,.1)"/>'
   +'<path d="M24 46 Q24 14 50 14 Q76 14 76 46 L76 58 Q50 66 24 58 Z" fill="#a78bfa"/>'
   +'<circle cx="40" cy="40" r="7" fill="#fff"/><circle cx="60" cy="40" r="7" fill="#fff"/>'
   +'<circle cx="40" cy="41" r="3.5" fill="#1f2937"/><circle cx="60" cy="41" r="3.5" fill="#1f2937"/>'
   +'<circle cx="36" cy="50" r="3.5" fill="#f9a8d4"/><circle cx="64" cy="50" r="3.5" fill="#f9a8d4"/>'
   +'<g stroke="#8b5cf6" stroke-width="6" stroke-linecap="round" fill="none">'
   +'<path d="M27 57 Q16 72 20 88"/><path d="M35 61 Q28 78 32 90"/><path d="M43 63 Q40 80 44 91"/><path d="M50 63 Q50 80 50 92"/>'
   +'<path d="M57 63 Q60 80 56 91"/><path d="M65 61 Q72 78 68 90"/><path d="M73 57 Q84 72 80 88"/><path d="M50 64 Q52 78 63 89"/>'
   +'</g></svg>';
}

var BAI = {
 n: 11,
 title: 'Bảng Nhân 8, Bảng Chia 8',
 sub: 'Bé chọn một hoạt động rồi luyện tập nhé!',
 goal: 10,
 topics: [
  {name:'Khám phá', sec:'Khám phá — Phép nhân 8 là phép cộng các số 8', levels:3,
   muc:['Đếm xúc tu của 2–3 con bạch tuộc bằng phép cộng các số 8.', 'Cộng nhiều số 8 (4–5 con) mà không cần gợi ý phép nhân.', 'Làm ngược lại: biết tổng số xúc tu, tìm số con bạch tuộc.'],
   make:function(lv){
    if(lv>=3){ var m=rnd(3,9);
      return {type:'num', _n:m, _nguoc:true, q:'<div class="flex justify-center mb-2">'+octopus()+'</div><div>Mỗi con bạch tuộc có 8 xúc tu. Đếm được tất cả '+(8*m)+' xúc tu.</div><div class="mt-1">Hỏi có mấy con bạch tuộc?</div>', ans:m, unit:'con'}; }
    var n = lv<=1 ? rnd(2,3) : rnd(4,5), oc='', add=[];
    for(var i=0;i<n;i++){ oc+=octopus(); add.push('8'); }
    return {type:'num', _n:n, _nguoc:false, q:'<div class="flex justify-center gap-1 mb-2 flex-wrap">'+oc+'</div>'
      +'<div class="text-slate-600 text-base mb-2">Mỗi con bạch tuộc có 8 xúc tu. Có '+n+' con bạch tuộc.</div>'
      +'<div class="text-xl">'+add.join(' + ')+' = ?</div>'
      +(lv<=1 ? '<div class="text-slate-500 text-base mt-1">(tức là 8 × '+n+')</div>' : ''), ans:8*n, unit:'xúc tu'};
  }, check:function(q){ return q._nguoc ? q.ans===q._n : q.ans===8*q._n; }},

  {name:'Lập bảng', sec:'Khám phá — Hoàn thành bảng nhân 8', levels:3,
   muc:['Điền các dòng đầu của bảng nhân 8.', 'Điền các dòng cuối (8 × 6 đến 8 × 10).', 'Điền khi các dòng bên cạnh cũng bị che — phải nhớ, không đếm thêm.'],
   make:function(lv){ return bnBang(8, lv, false); }, check:bnKiemBang},

  {name:'Hộp bút', sec:'Hoạt động 2 — Số?', levels:3,
   muc:['Tính số bút của 2–4 hộp, mỗi hộp 8 chiếc.', 'Tính số bút của tới 10 hộp.', 'Tính ngược (biết số bút, tìm số hộp) hoặc bài hai bước (có bút lẻ).'],
   make:function(lv){
    var n = lv<=1 ? rnd(2,4) : rnd(5,10);
    if(lv<=2) return {type:'num', _e:8*n, q:'<div class="text-5xl mb-2">&#128397;&#65039;</div><div>Mỗi hộp bút có 8 chiếc bút chì màu. Hỏi '+n+' hộp bút như thế có bao nhiêu chiếc bút chì màu?</div>', ans:8*n, unit:'chiếc'};
    var m=rnd(3,9);
    if(Math.random()<0.5) return {type:'num', _e:m, q:'<div class="text-5xl mb-2">&#128397;&#65039;</div><div>Có '+(8*m)+' chiếc bút chì màu xếp vào các hộp, mỗi hộp 8 chiếc. Hỏi xếp được mấy hộp?</div>', ans:m, unit:'hộp'};
    var le=rnd(1,7);
    return {type:'num', _e:8*m+le, q:'<div class="text-5xl mb-2">&#128397;&#65039;</div><div>Lan có '+m+' hộp bút chì màu, mỗi hộp 8 chiếc, và '+le+' chiếc bút lẻ. Hỏi Lan có tất cả bao nhiêu chiếc bút chì màu?</div>', ans:8*m+le, unit:'chiếc'};
  }, check:function(q){ return q.ans===q._e && q.ans>0; }},

  {name:'Số còn thiếu', sec:'Luyện tập — Nêu các số còn thiếu', levels:3,
   muc:['Đếm thêm 8 từ 8, tìm số ở đầu dãy.', 'Đếm thêm hoặc bớt 8, tìm số ở giữa dãy.', 'Dãy không bắt đầu từ 8 và ô bên cạnh bị che — dùng bước đếm 8.'],
   make:function(lv){ return bnDaySo(8, lv, 'vuong', 'tron'); }, check:bnKiemDay},

  {name:'Sơ đồ', sec:'Luyện tập — Sơ đồ hai bước', levels:3,
   muc:['Nhân 8 với số nhỏ rồi cộng thêm một số nhỏ.', 'Nhân 8 với số tới 9 rồi cộng một số có hai chữ số.', 'Hai bước có trừ hoặc chia (8 × 6 rồi : 4).'],
   make:function(lv){
    var k, m, op2, kq;
    if(lv<=1){ k=rnd(2,4); m=rnd(1,9); op2='+ '+m; kq=8*k+m; }
    else if(lv===2){ k=rnd(2,9); m=rnd(10,30); op2='+ '+m; kq=8*k+m; }
    else if(Math.random()<0.5){ k=rnd(3,10); m=rnd(5,8*k-5); op2='− '+m; kq=8*k-m; }
    else { k=pick([2,3,4,5,6,7,8,9,10]); var d=pick([2,4]); op2=': '+d; kq=8*k/d; }
    return {type:'num', _bt:'8 × '+k+' '+op2, q: arrow2(8, '× '+k, op2)+'<div>Số ở ô cuối cùng là bao nhiêu?</div>', ans:kq};
  }, check:function(q){ var p=q._bt.split(' '), a=8*(+p[2]), v = p[3]==='+' ? a+(+p[4]) : (p[3]===':' ? a/(+p[4]) : a-(+p[4])); return q.ans===v && Number.isInteger(v) && v>0; }},

  {name:'Chọn kết quả', sec:'Luyện tập — Chọn kết quả cho phép tính', levels:3,
   muc:['Chọn kết quả của phép nhân 8 với số nhỏ, các đáp án khác xa nhau.', 'Chọn kết quả phép nhân, chia với 8, các đáp án gần nhau.', 'Chọn kết quả phép tính hai bước (8 × 5 + 8).'],
   make:function(lv){
    var t;
    if(lv<=1){ var k=rnd(2,5); t='8 × '+k; }
    else if(lv===2){ var k2=rnd(2,10); t = Math.random()<0.5 ? '8 × '+k2 : (8*k2)+' : 8'; }
    else { var k3=rnd(2,9); t='8 × '+k3+(Math.random()<0.5?' + 8':' − 8'); }
    var v=tinhBT(t), ch=soChon(v, lv, 8, lv<=1?3:4);
    return {type:'mcq', _t:t, q:'<div>Phép tính <b class="text-orange-700 text-2xl">'+t+'</b> có kết quả bằng bao nhiêu?</div>', choices:ch.map(String), correct:ch.indexOf(v)};
  }, check:function(q){ var v=tinhBT(q._t), c=q.choices.filter(function(x){ return +x===v; }).length; return c===1 && +q.choices[q.correct]===v; }},

  {name:'Giải toán', sec:'Luyện tập — Giải toán (con cua)', levels:3,
   muc:['Bài toán một phép nhân với số nhỏ.', 'Bài toán một phép nhân (chân hoặc càng cua) với số lớn hơn.', 'Bài toán hai bước (gộp chân và càng, hoặc so sánh hơn kém).'],
   make:function(lv){
    var n = lv<=1 ? rnd(2,4) : rnd(2,9);
    if(lv<=1) return {type:'num', _e:8*n, q:'<div class="text-5xl mb-2">&#129408;</div>Mỗi con cua có 8 cái chân. Hỏi '+n+' con cua có bao nhiêu cái chân?', ans:8*n, unit:'chân'};
    if(lv===2) return Math.random()<0.6
      ? {type:'num', _e:8*n, q:'<div class="text-5xl mb-2">&#129408;</div>Mỗi con cua có 8 cái chân. Hỏi '+n+' con cua có bao nhiêu cái chân?', ans:8*n, unit:'chân'}
      : {type:'num', _e:2*n, q:'<div class="text-5xl mb-2">&#129408;</div>Mỗi con cua có 2 cái càng. Hỏi '+n+' con cua có bao nhiêu cái càng?', ans:2*n, unit:'càng'};
    if(Math.random()<0.5) return {type:'num', _e:10*n, q:'<div class="text-5xl mb-2">&#129408;</div>Mỗi con cua có 8 cái chân và 2 cái càng. Hỏi '+n+' con cua có tất cả bao nhiêu cái chân và càng?', ans:10*n, unit:'cái'};
    return {type:'num', _e:6*n, q:'<div class="text-5xl mb-2">&#129408;</div>Mỗi con cua có 8 cái chân và 2 cái càng. Hỏi '+n+' con cua có số chân nhiều hơn số càng bao nhiêu cái?', ans:6*n, unit:'cái'};
  }, check:function(q){ return q.ans===q._e && q.ans>0; }}
 ]
};
