/* bai-10.js — NỘI DUNG Bài 10 (Bảng nhân 7, bảng chia 7). Engine v2.
   Hình riêng của bài: kids (kéo co), arrowBox (mũi tên), ball (quả bóng).
   rnd/pick/shuffle ở figures.js.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Hình riêng Bài 10 ---- */
function kids(rows){ var s='<div class="mb-2">'; for(var r=0;r<rows;r++){ s+='<div style="font-size:1.5rem;line-height:1.25">'+'🧒'.repeat(7)+'</div>'; } s+='</div>'; return s; }
function arrowBox(inp, op){
  return '<div class="flex items-center justify-center gap-2 my-3 flex-wrap">'
   +'<span style="width:60px;height:60px" class="inline-flex items-center justify-center rounded-full bg-amber-400 text-white font-extrabold text-2xl">'+inp+'</span>'
   +'<span class="text-slate-500 font-extrabold text-lg">'+op+' →</span>'
   +'<span style="width:60px;height:60px" class="inline-flex items-center justify-center rounded-xl bg-white border-2 border-amber-400 text-amber-600 font-extrabold text-2xl">?</span>'
   +'</div>';
}
/* Quả bóng: múi màu nhạt, phép tính nằm trên nhãn trắng đủ rộng -> chữ đen đọc rõ */
function ball(expr){
  return '<svg width="104" height="104" viewBox="0 0 104 104" style="max-width:100%;height:auto;display:block">'
   +'<circle cx="52" cy="52" r="48" fill="#fef3c7"/>'
   +'<path d="M52 4 A48 48 0 0 1 100 52 L52 52 Z" fill="#bfdbfe"/>'
   +'<path d="M52 100 A48 48 0 0 1 4 52 L52 52 Z" fill="#bbf7d0"/>'
   +'<circle cx="52" cy="52" r="48" fill="none" stroke="#f59e0b" stroke-width="3"/>'
   +'<rect x="9" y="37" width="86" height="30" rx="15" fill="#ffffff" stroke="#f59e0b" stroke-width="1.5"/>'
   +'<text x="52" y="58" text-anchor="middle" font-size="18" font-weight="800" fill="#111827" font-family="system-ui,Segoe UI,Roboto,sans-serif">'+expr+'</text>'
   +'</svg>';
}

var BAI = {
 n: 10,
 title: 'Bảng Nhân 7, Bảng Chia 7',
 sub: 'Bé chọn một hoạt động rồi luyện tập nhé!',
 goal: 10,
 topics: [
  {name:'Khám phá', sec:'Khám phá — Phép nhân 7 là phép cộng các số 7', make:function(){
    var n=rnd(2,4); var add=[]; for(var i=0;i<n;i++) add.push('7');
    return {type:'num', q: kids(n)
      +'<div class="text-slate-600 text-base mb-2">Mỗi đội kéo co có 7 bạn. Có '+n+' đội chơi.</div>'
      +'<div class="text-xl">'+add.join(' + ')+' = ?</div>'
      +'<div class="text-slate-500 text-base mt-1">(tức là 7 × '+n+')</div>', ans:7*n, unit:'bạn'};
  }},
  {name:'Mũi tên', sec:'Hoạt động 1 — Số?', make:function(){
    if(Math.random()<0.5){ var k=rnd(2,10); return {type:'num', q: arrowBox(7, '× '+k)+'<div>Số ở ô <b class="text-amber-600">?</b> là bao nhiêu?</div>', ans:7*k}; }
    var k=rnd(2,10); return {type:'num', q: arrowBox(7*k, ': 7')+'<div>Số ở ô <b class="text-amber-600">?</b> là bao nhiêu?</div>', ans:k};
  }},
  {name:'Chọn bóng', sec:'Hoạt động 2 — Chọn phép tính theo điều kiện', make:function(){
    function mk(){ if(Math.random()<0.5){ var k=rnd(1,10); return {t:'7 × '+k, v:7*k}; } var k=rnd(1,10); return {t:(7*k)+' : 7', v:k}; }
    var pool=[]; while(pool.length<4){ var e=mk(); if(!pool.some(function(p){return p.v===e.v;})) pool.push(e); }
    var vals=pool.map(function(p){return p.v;}).slice().sort(function(a,b){return a-b;});
    var N=vals[1]; var correctVal=vals[0];
    var order=pool.slice(); shuffle(order);
    return {type:'mcq', figFn:ball, _N:N, q:'<div>Quả bóng nào ghi phép tính có <b>kết quả bé hơn '+N+'</b>?</div>', choices:order.map(function(o){return o.t;}), correct:order.findIndex(function(o){return o.v===correctVal;})};
  }, check:function(q){ function val(t){ if(t.indexOf('×')>=0){var p=t.split(' × ');return parseInt(p[0],10)*parseInt(p[1],10);} var p=t.split(' : ');return parseInt(p[0],10)/parseInt(p[1],10); } var vs=q.choices.map(val); var mn=Math.min.apply(null,vs); var below=vs.filter(function(v){return v<q._N;}).length; return below===1 && vs[q.correct]===mn && mn<q._N; }},
  {name:'Số còn thiếu', sec:'Luyện tập — Nêu các số còn thiếu', make:function(){
    var up=Math.random()<0.5; var seq=[]; for(var i=1;i<=8;i++) seq.push(7*i); if(!up) seq.reverse();
    var hi=rnd(1,6); var ans=seq[hi];
    var chips='<div class="flex flex-wrap justify-center items-center gap-2 mb-3">';
    for(var i=0;i<seq.length;i++){
      if(up){ chips+= (i===hi)
         ? '<span style="width:48px;height:48px" class="inline-flex items-center justify-center rounded-full bg-white border-2 border-amber-400 text-amber-600 font-extrabold text-xl">?</span>'
         : '<span style="width:48px;height:48px" class="inline-flex items-center justify-center rounded-full bg-amber-400 text-white font-extrabold text-base">'+seq[i]+'</span>';
      } else { chips+= (i===hi)
         ? '<span style="width:44px;height:44px;transform:rotate(45deg)" class="inline-flex items-center justify-center bg-white border-2 border-sky-400 text-sky-600 font-extrabold"><span style="transform:rotate(-45deg)">?</span></span>'
         : '<span style="width:44px;height:44px;transform:rotate(45deg)" class="inline-flex items-center justify-center bg-sky-400 text-white font-extrabold"><span style="transform:rotate(-45deg);font-size:.9rem">'+seq[i]+'</span></span>';
      }
    }
    chips+='</div>';
    return {type:'num', _hi:hi, _seq:seq, q: chips+'<div>Dãy số đếm '+(up?'thêm':'bớt')+' 7. Số còn thiếu ở ô <b class="'+(up?'text-amber-600':'text-sky-600')+'">?</b> là bao nhiêu?</div>', ans:ans};
  }, check:function(q){ return q.ans===q._seq[q._hi] && q.ans%7===0; }},
  {name:'Lập bảng', sec:'Khám phá — Hoàn thành bảng nhân 7', make:function(){
    var k=rnd(2,10);
    var rows='<div class="text-center text-orange-600 font-extrabold mb-1">Bảng nhân 7</div>';
    for(var i=1;i<=10;i++){ rows+='<div class="'+(i===k?'bg-amber-200 rounded font-extrabold':'')+'">7 × '+i+' = '+(i===k?'<span class="text-amber-700">?</span>':(7*i))+'</div>'; }
    var tbl='<div style="display:inline-block;text-align:left"><div style="border:2px solid #fcd34d;border-radius:12px;background:#fff;padding:8px 18px;font-weight:700;line-height:1.5">'+rows+'</div></div>';
    return {type:'num', q: tbl+'<div class="mt-2">Số còn thiếu ở <b class="text-amber-600">7 × '+k+'</b> là bao nhiêu?</div>', ans:7*k};
  }},
  {name:'So sánh', sec:'Luyện tập — So sánh (>, <, =)', make:function(){
    function mk(){ var r=rnd(1,3); if(r===1){ var k=rnd(1,10); return {t:'7 × '+k, v:7*k}; } if(r===2){ var k=rnd(1,10); return {t:(7*k)+' : 7', v:k}; } var k=rnd(1,10); return {t:k+' × 7', v:7*k}; }
    var A=mk(), B=mk();
    if(Math.random()<0.3){ var k=rnd(2,10); A={t:'7 × '+k, v:7*k}; B={t:k+' × 7', v:7*k}; }
    var correct = A.v>B.v ? '>' : (A.v<B.v ? '<' : '=');
    return {type:'mcq', _sign:correct, q:'<div class="text-2xl font-extrabold text-orange-600 my-2">'+A.t+' &nbsp; ? &nbsp; '+B.t+'</div><div>Điền dấu thích hợp:</div>', choices:['>','<','='], correct:['>','<','='].indexOf(correct)};
  }, check:function(q){ return q.choices[q.correct]===q._sign; }},
  {name:'Giải toán', sec:'Luyện tập — Giải toán', make:function(){
    var n=rnd(2,9);
    if(Math.random()<0.5) return {type:'num', q:'<div class="text-5xl mb-2">📅</div>Mỗi tuần lễ có 7 ngày. Bố của Mai đi công tác '+n+' tuần lễ. Hỏi bố của Mai đi công tác bao nhiêu ngày?', ans:7*n, unit:'ngày'};
    var tot=7*n; return {type:'num', q:'<div class="text-5xl mb-2">🥤</div>Có '+tot+' cái cốc xếp đều vào 7 hộp. Hỏi mỗi hộp có mấy cái cốc?', ans:n, unit:'cái'};
  }}
 ]
};
