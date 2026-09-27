/* bai-9.js — NỘI DUNG Bài 9 (Bảng nhân 6, bảng chia 6). Engine v2.
   Hình dùng chung từ figures.js: ladybug, truck. rnd/pick/shuffle cũng ở figures.js.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */
var BAI = {
 n: 9,
 title: 'Bảng Nhân 6, Bảng Chia 6',
 sub: 'Bé chọn một hoạt động rồi luyện tập nhé!',
 goal: 10,
 topics: [
  {name:'Khám phá', sec:'Khám phá — Phép nhân 6 là phép cộng các số 6', make:function(){
    var n=rnd(2,5); var bugs=''; for(var i=0;i<n;i++) bugs+=ladybug();
    var add=[]; for(var i=0;i<n;i++) add.push('6');
    return {type:'num', q:'<div class="flex justify-center gap-1 mb-2 flex-wrap">'+bugs+'</div>'
      +'<div class="text-slate-600 text-base mb-2">Mỗi con bọ rùa có 6 chấm ở cánh. Có '+n+' con bọ rùa.</div>'
      +'<div class="text-xl">'+add.join(' + ')+' = ?</div>'
      +'<div class="text-slate-500 text-base mt-1">(tức là 6 × '+n+')</div>', ans:6*n, unit:'chấm'};
  }},
  {name:'Tính nhẩm', sec:'Hoạt động 1 — Tính nhẩm', make:function(){
    if(Math.random()<0.5){ var k=rnd(1,10); return {type:'num', q:'<div class="text-3xl font-extrabold text-orange-600">6 × '+k+' = ?</div>', ans:6*k}; }
    var k=rnd(1,10); return {type:'num', q:'<div class="text-3xl font-extrabold text-orange-600">'+(6*k)+' : 6 = ?</div>', ans:k};
  }},
  {name:'Lập bảng', sec:'Khám phá — Hoàn thành bảng nhân 6', make:function(){
    var k=rnd(2,10);
    var rows='<div class="text-center text-orange-600 font-extrabold mb-1">Bảng nhân 6</div>';
    for(var i=1;i<=10;i++){ rows+='<div class="'+(i===k?'bg-amber-200 rounded font-extrabold':'')+'">6 × '+i+' = '+(i===k?'<span class="text-amber-700">?</span>':(6*i))+'</div>'; }
    var tbl='<div style="display:inline-block;text-align:left"><div style="border:2px solid #fcd34d;border-radius:12px;background:#fff;padding:8px 18px;font-weight:700;line-height:1.5">'+rows+'</div></div>';
    return {type:'num', q: tbl+'<div class="mt-2">Số còn thiếu ở <b class="text-amber-600">6 × '+k+'</b> là bao nhiêu?</div>', ans:6*k};
  }},
  {name:'Cùng kết quả', sec:'Hoạt động 2 — Hai phép tính nào có cùng kết quả?', make:function(){
    var a=rnd(2,9); var V=6*a; var correct='3 × '+(2*a);
    var pool=[]; function add(t,v){ if(v!==V && !pool.some(function(p){return p.v===v;})) pool.push({t:t,v:v}); }
    add('6 × '+(a+1),6*(a+1)); add('6 × '+(a>2?a-1:a+2),6*(a>2?a-1:a+2)); add('5 × '+a,5*a); add('2 × '+a,2*a); add('4 × '+a,4*a); add((V+6)+' : 6',a+1);
    shuffle(pool); var choices=[{t:correct}].concat(pool.slice(0,3)); shuffle(choices);
    return {type:'mcq', figFn:truck, _v:V, q:'<div class="mb-1">Phép tính trên xe tải nào có <b>cùng kết quả</b> với:</div><div class="flex justify-center my-2">'+truck('6 × '+a)+'</div>', choices:choices.map(function(c){return c.t;}), correct:choices.findIndex(function(c){return c.t===correct;})};
  }, check:function(q){ function val(t){ if(t.indexOf('×')>=0){var p=t.split(' × ');return parseInt(p[0],10)*parseInt(p[1],10);} var p=t.split(' : ');return parseInt(p[0],10)/parseInt(p[1],10); } var cnt=q.choices.filter(function(c){return val(c)===q._v;}).length; return cnt===1 && val(q.choices[q.correct])===q._v; }},
  {name:'Số còn thiếu', sec:'Luyện tập — Nêu các số còn thiếu', make:function(){
    var up=Math.random()<0.5; var seq=[]; for(var i=1;i<=8;i++) seq.push(6*i); if(!up) seq.reverse();
    var hi=rnd(1,6); var ans=seq[hi];
    var chips='<div class="flex flex-wrap justify-center items-center gap-2 mb-3">';
    for(var i=0;i<seq.length;i++){
      if(up){ chips+= (i===hi)
         ? '<span style="width:48px;height:48px" class="inline-flex items-center justify-center rounded-full bg-white border-2 border-amber-400 text-amber-600 font-extrabold text-xl">?</span>'
         : '<span style="width:48px;height:48px" class="inline-flex items-center justify-center rounded-full bg-amber-400 text-white font-extrabold text-lg">'+seq[i]+'</span>';
      } else { chips+= (i===hi)
         ? '<span style="width:42px;height:42px;transform:rotate(45deg)" class="inline-flex items-center justify-center bg-white border-2 border-sky-400 text-sky-600 font-extrabold"><span style="transform:rotate(-45deg)">?</span></span>'
         : '<span style="width:42px;height:42px;transform:rotate(45deg)" class="inline-flex items-center justify-center bg-sky-400 text-white font-extrabold"><span style="transform:rotate(-45deg)">'+seq[i]+'</span></span>';
      }
    }
    chips+='</div>';
    return {type:'num', _hi:hi, _seq:seq, q: chips+'<div>Dãy số đếm '+(up?'thêm':'bớt')+' 6. Số còn thiếu ở ô <b class="'+(up?'text-amber-600':'text-sky-600')+'">?</b> là bao nhiêu?</div>', ans:ans};
  }, check:function(q){ return q.ans===q._seq[q._hi] && q.ans%6===0; }},
  {name:'Giải toán', sec:'Luyện tập — Giải toán', make:function(){
    var n=rnd(2,9);
    if(Math.random()<0.5) return {type:'num', q:'<div class="text-5xl mb-2">🎁</div>Mỗi hộp có 6 cái bánh. Hỏi '+n+' hộp như thế có tất cả bao nhiêu cái bánh?', ans:6*n, unit:'cái'};
    var tot=6*n; return {type:'num', q:'<div class="text-5xl mb-2">🍬</div>Có '+tot+' cái kẹo chia đều cho 6 bạn. Hỏi mỗi bạn được bao nhiêu cái kẹo?', ans:n, unit:'cái'};
  }}
 ]
};
