/* bai-11.js — NỘI DUNG Bài 11 (Bảng nhân 8, bảng chia 8). Engine v2.
   Hình riêng của bài: octopus (bạch tuộc 8 xúc tu). arrow2 dùng chung từ figures.js.
   rnd/pick/shuffle ở figures.js.
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
  {name:'Khám phá', sec:'Khám phá — Phép nhân 8 là phép cộng các số 8', make:function(){
    var n=rnd(2,4); var oc=''; for(var i=0;i<n;i++) oc+=octopus();
    var add=[]; for(var i=0;i<n;i++) add.push('8');
    return {type:'num', q:'<div class="flex justify-center gap-1 mb-2 flex-wrap">'+oc+'</div>'
      +'<div class="text-slate-600 text-base mb-2">Mỗi con bạch tuộc có 8 xúc tu. Có '+n+' con bạch tuộc.</div>'
      +'<div class="text-xl">'+add.join(' + ')+' = ?</div>'
      +'<div class="text-slate-500 text-base mt-1">(tức là 8 × '+n+')</div>', ans:8*n, unit:'xúc tu'};
  }},
  {name:'Lập bảng', sec:'Khám phá — Hoàn thành bảng nhân 8', make:function(){
    var k=rnd(2,10);
    var rows='<div class="text-center text-orange-600 font-extrabold mb-1">Bảng nhân 8</div>';
    for(var i=1;i<=10;i++){ rows+='<div class="'+(i===k?'bg-amber-200 rounded font-extrabold':'')+'">8 × '+i+' = '+(i===k?'<span class="text-amber-700">?</span>':(8*i))+'</div>'; }
    var tbl='<div style="display:inline-block;text-align:left"><div style="border:2px solid #fcd34d;border-radius:12px;background:#fff;padding:8px 18px;font-weight:700;line-height:1.5">'+rows+'</div></div>';
    return {type:'num', q: tbl+'<div class="mt-2">Số còn thiếu ở <b class="text-amber-600">8 × '+k+'</b> là bao nhiêu?</div>', ans:8*k};
  }},
  {name:'Hộp bút', sec:'Hoạt động 2 — Số?', make:function(){
    var n=rnd(2,9);
    return {type:'num', q:'<div class="text-5xl mb-2">🖍️</div><div>Mỗi hộp bút có 8 chiếc bút chì màu. Hỏi '+n+' hộp bút như thế có bao nhiêu chiếc bút chì màu?</div>', ans:8*n, unit:'chiếc'};
  }},
  {name:'Số còn thiếu', sec:'Luyện tập — Nêu các số còn thiếu', make:function(){
    var up=Math.random()<0.5; var seq=[]; for(var i=1;i<=8;i++) seq.push(8*i); if(!up) seq.reverse();
    var hi=rnd(1,6); var ans=seq[hi];
    var chips='<div class="flex flex-wrap justify-center items-center gap-2 mb-3">';
    for(var i=0;i<seq.length;i++){
      if(up){ chips+= (i===hi)
         ? '<span style="width:48px;height:48px" class="inline-flex items-center justify-center rounded-lg bg-white border-2 border-emerald-400 text-emerald-600 font-extrabold text-xl">?</span>'
         : '<span style="width:48px;height:48px" class="inline-flex items-center justify-center rounded-lg bg-emerald-400 text-white font-extrabold text-base">'+seq[i]+'</span>';
      } else { chips+= (i===hi)
         ? '<span style="width:48px;height:48px" class="inline-flex items-center justify-center rounded-full bg-white border-2 border-amber-400 text-amber-600 font-extrabold text-xl">?</span>'
         : '<span style="width:48px;height:48px" class="inline-flex items-center justify-center rounded-full bg-amber-400 text-white font-extrabold text-base">'+seq[i]+'</span>';
      }
    }
    chips+='</div>';
    return {type:'num', _hi:hi, _seq:seq, q: chips+'<div>Dãy số đếm '+(up?'thêm':'bớt')+' 8. Số còn thiếu ở ô <b class="'+(up?'text-emerald-600':'text-amber-600')+'">?</b> là bao nhiêu?</div>', ans:ans};
  }, check:function(q){ return q.ans===q._seq[q._hi] && q.ans%8===0; }},
  {name:'Sơ đồ', sec:'Luyện tập — Sơ đồ hai bước', make:function(){
    var k=rnd(2,9), m=rnd(5,30);
    return {type:'num', _k:k, _m:m, q: arrow2(8, '× '+k, '+ '+m)+'<div>Số ở ô cuối cùng là bao nhiêu?</div>', ans: 8*k+m};
  }, check:function(q){ return q.ans===8*q._k+q._m; }},
  {name:'Chọn kết quả', sec:'Luyện tập — Chọn kết quả cho phép tính', make:function(){
    var e; if(Math.random()<0.5){ var k=rnd(2,10); e={t:'8 × '+k, v:8*k}; } else { var k=rnd(2,10); e={t:(8*k)+' : 8', v:k}; }
    var choices=[e.v]; var guard=0;
    while(choices.length<4 && guard<200){ guard++; var d=e.v + pick([-8,-2,-1,1,2,8,3,-3,4,-4]); if(d>0 && choices.indexOf(d)<0) choices.push(d); }
    shuffle(choices);
    return {type:'mcq', _v:e.v, q:'<div>Phép tính <b class="text-orange-600 text-2xl">'+e.t+'</b> có kết quả bằng bao nhiêu?</div>', choices:choices.map(String), correct:choices.indexOf(e.v)};
  }, check:function(q){ var cnt=q.choices.filter(function(c){return parseInt(c,10)===q._v;}).length; return cnt===1 && parseInt(q.choices[q.correct],10)===q._v; }},
  {name:'Giải toán', sec:'Luyện tập — Giải toán (con cua)', make:function(){
    var n=rnd(2,8);
    if(Math.random()<0.6) return {type:'num', q:'<div class="text-5xl mb-2">🦀</div>Mỗi con cua có 8 cái chân. Hỏi '+n+' con cua có bao nhiêu cái chân?', ans:8*n, unit:'chân'};
    return {type:'num', q:'<div class="text-5xl mb-2">🦀</div>Mỗi con cua có 2 cái càng. Hỏi '+n+' con cua có bao nhiêu cái càng?', ans:2*n, unit:'càng'};
  }}
 ]
};
