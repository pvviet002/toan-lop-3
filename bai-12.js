/* bai-12.js — NỘI DUNG Bài 12 (Bảng nhân 9, bảng chia 9), bám SGK trang in 36-38.
   Chỉ khai báo BAI; khung + chấm điểm + game do engine.js lo. Hình từ figures.js.
   Mỗi topic có thể kèm check(q) trả về true/false để kiemtra.js xác nhận bất biến.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* Các phép tính và giá trị (dùng cho tab Cùng kết quả) */
var MAP={'9 × 1':9,'9 × 2':18,'9 × 3':27,'9 × 4':36,'9 × 5':45,'9 × 6':54,
 '45 : 9':5,'54 : 9':6,'18 : 9':2,'27 : 9':3,'90 : 9':10,'81 : 9':9,
 '2 × 3':6,'3 × 6':18,'18 : 2':9,'20 : 4':5,'4 × 5':20,'6 × 6':36,'2 × 5':10,'5 × 5':25};

var BAI = {
 n: 12,
 title: 'Bảng Nhân 9, Bảng Chia 9',
 sub: 'Bé chọn một hoạt động rồi luyện tập nhé!',
 goal: 10,
 topics: [
  {name:'Khám phá', sec:'Khám phá — Phép nhân 9 từ phép cộng', make:function(){
    var n=rnd(2,4); var dr=''; for(var i=0;i<n;i++) dr+=dragon();
    var add=[]; for(var i=0;i<n;i++) add.push('9');
    return {type:'num', _n:n, q:'<div class="flex justify-center gap-1 mb-2 flex-wrap">'+dr+'</div>'
      +'<div class="text-slate-600 text-base mb-2">Mỗi đội múa rồng có 9 người. Có '+n+' đội múa rồng như thế.</div>'
      +'<div class="text-xl">'+add.join(' + ')+' = ?</div>'
      +'<div class="text-slate-500 text-base mt-1">(tức là 9 × '+n+')</div>', ans:9*n, unit:'người'};
  }, check:function(q){ return q.ans===9*q._n; }},

  {name:'Lập bảng', sec:'Khám phá — Hoàn thành bảng nhân 9, bảng chia 9', make:function(){
    var k=rnd(2,10);
    if(Math.random()<0.5){
      var rows='<div class="text-center text-orange-600 font-extrabold mb-1">Bảng nhân 9</div>';
      for(var i=1;i<=10;i++){ rows+='<div class="'+(i===k?'bg-amber-200 rounded font-extrabold':'')+'">9 × '+i+' = '+(i===k?'<span class="text-amber-700">?</span>':(9*i))+'</div>'; }
      var tbl='<div style="display:inline-block;text-align:left"><div style="border:2px solid #fcd34d;border-radius:12px;background:#fff;padding:8px 18px;font-weight:700;line-height:1.5">'+rows+'</div></div>';
      return {type:'num', _k:k, _div:false, q: tbl+'<div class="mt-2">Số còn thiếu ở <b class="text-amber-600">9 × '+k+'</b> là bao nhiêu?</div>', ans:9*k};
    } else {
      var rows2='<div class="text-center text-sky-600 font-extrabold mb-1">Bảng chia 9</div>';
      for(var i=1;i<=10;i++){ rows2+='<div class="'+(i===k?'bg-sky-100 rounded font-extrabold':'')+'">'+(9*i)+' : 9 = '+(i===k?'<span class="text-sky-700">?</span>':i)+'</div>'; }
      var tbl2='<div style="display:inline-block;text-align:left"><div style="border:2px solid #7dd3fc;border-radius:12px;background:#fff;padding:8px 18px;font-weight:700;line-height:1.5">'+rows2+'</div></div>';
      return {type:'num', _k:k, _div:true, q: tbl2+'<div class="mt-2">Số còn thiếu ở <b class="text-sky-600">'+(9*k)+' : 9</b> là bao nhiêu?</div>', ans:k};
    }
  }, check:function(q){ return q._div ? q.ans===q._k : q.ans===9*q._k; }},

  {name:'Tính nhẩm', sec:'Hoạt động 1 — Tính nhẩm', make:function(){
    var r=Math.random();
    if(r<0.55){ var k=rnd(0,10); return {type:'num', ans:9*k, q:'<div class="text-slate-500 mb-1">Tính nhẩm</div><div class="text-4xl font-extrabold text-orange-600">9 × '+k+' = ?</div>'}; }
    if(r<0.8){ var k=rnd(0,10); return {type:'num', ans:9*k, q:'<div class="text-slate-500 mb-1">Tính nhẩm</div><div class="text-4xl font-extrabold text-orange-600">'+k+' × 9 = ?</div>'}; }
    var k=rnd(2,10); return {type:'num', ans:k, q:'<div class="text-slate-500 mb-1">Tính nhẩm</div><div class="text-4xl font-extrabold text-sky-600">'+(9*k)+' : 9 = ?</div>'};
  }, check:function(q){ return Number.isInteger(q.ans) && q.ans>=0; }},

  {name:'Cùng kết quả', sec:'Hoạt động 2 — Hai phép tính cùng kết quả', make:function(){
    var groups=[
      {v:9, ex:['9 × 1','81 : 9','18 : 2']},
      {v:18, ex:['9 × 2','3 × 6']},
      {v:5, ex:['45 : 9','20 : 4']},
      {v:6, ex:['54 : 9','2 × 3']},
      {v:36, ex:['9 × 4','6 × 6']},
      {v:10, ex:['90 : 9','2 × 5']}
    ];
    var g=pick(groups);
    var ex=shuffle(g.ex.slice()); var target=ex[0], partner=ex[1];
    var keys=Object.keys(MAP).filter(function(k){ return MAP[k]!==g.v && k!==target && k!==partner; });
    shuffle(keys);
    var ds=[], usedVals=[g.v]; var gi=0;
    while(ds.length<2 && gi<keys.length){ var kk=keys[gi++]; if(usedVals.indexOf(MAP[kk])<0){ ds.push(kk); usedVals.push(MAP[kk]); } }
    var choices=shuffle([partner].concat(ds));
    return {type:'mcq', figFn:melon, _target:target, _v:g.v,
      q:'<div class="mb-1">Phép tính nào có cùng kết quả với</div><div class="flex justify-center my-2">'+melon(target)+'</div>',
      choices:choices, correct:choices.indexOf(partner)};
  }, check:function(q){ var same=q.choices.filter(function(c){ return MAP[c]===q._v; }); return same.length===1 && MAP[q.choices[q.correct]]===q._v && MAP[q._target]===q._v; }},

  {name:'Số còn thiếu', sec:'Luyện tập — Nêu các số còn thiếu', make:function(){
    var up=Math.random()<0.5; var seq=[]; for(var i=1;i<=9;i++) seq.push(9*i); if(!up) seq.reverse();
    var hi=rnd(1,7); var ans=seq[hi];
    var chips='<div class="flex flex-wrap justify-center items-center gap-2 mb-3">';
    for(var i=0;i<seq.length;i++){
      if(up){ chips+= (i===hi)
         ? '<span style="width:46px;height:46px" class="inline-flex items-center justify-center rounded-lg bg-white border-2 border-emerald-400 text-emerald-600 font-extrabold text-xl">?</span>'
         : '<span style="width:46px;height:46px" class="inline-flex items-center justify-center rounded-lg bg-emerald-400 text-white font-extrabold text-base">'+seq[i]+'</span>';
      } else { chips+= (i===hi)
         ? '<span style="width:46px;height:46px" class="inline-flex items-center justify-center rounded-md bg-white border-2 border-amber-400 text-amber-600 font-extrabold text-xl">?</span>'
         : '<span style="width:46px;height:46px" class="inline-flex items-center justify-center rounded-md bg-amber-400 text-white font-extrabold text-base">'+seq[i]+'</span>';
      }
    }
    chips+='</div>';
    return {type:'num', _hi:hi, _seq:seq, q: chips+'<div>Dãy số đếm '+(up?'thêm':'bớt')+' 9. Số còn thiếu ở ô <b class="'+(up?'text-emerald-600':'text-amber-600')+'">?</b> là bao nhiêu?</div>', ans:ans};
  }, check:function(q){ return q.ans===q._seq[q._hi] && q.ans%9===0; }},

  {name:'Sơ đồ', sec:'Luyện tập — Số?', make:function(){
    var p=rnd(2,6); var mid=9*p;
    var divs=[]; for(var q=2;q<=9;q++){ if(mid%q===0) divs.push(q); }
    var qd=pick(divs);
    return {type:'num', _mid:mid, _qd:qd, q: arrow2(9, '× '+p, ': '+qd)+'<div>Số ở ô cuối cùng là bao nhiêu?</div>', ans: mid/qd};
  }, check:function(q){ return q._mid%q._qd===0 && q.ans===q._mid/q._qd && Number.isInteger(q.ans); }},

  {name:'So với 10', sec:'Luyện tập — Kết quả lớn hơn hay bé hơn 10?', make:function(){
    var pool=['9 × 2','9 × 3','9 × 4','9 × 5','9 × 6','9 × 1','54 : 9','45 : 9','18 : 9','27 : 9','81 : 9','36 : 9','63 : 9','90 : 9','9 × 9','9 × 8'];
    var e=pick(pool); var v; var parts;
    if(e.indexOf('×')>=0){ parts=e.split(' × '); v=parseInt(parts[0],10)*parseInt(parts[1],10); }
    else { parts=e.split(' : '); v=parseInt(parts[0],10)/parseInt(parts[1],10); }
    var correct = v>10 ? 0 : (v<10 ? 1 : 2);
    return {type:'mcq', _v:v,
      q:'<div class="mb-1">Kết quả của phép tính trên bông hoa so với <b>10</b> thế nào?</div><div class="flex justify-center my-2">'+flower(e)+'</div>',
      choices:['Lớn hơn 10','Bé hơn 10','Bằng 10'], correct:correct};
  }, check:function(q){ var exp=q._v>10?0:(q._v<10?1:2); return exp===q.correct; }},

  {name:'Giải toán', sec:'Luyện tập — Giải toán', make:function(){
    var r=Math.random(); var n=rnd(2,9);
    if(r<0.34) return {type:'num', _e:9*n, q:'<div class="text-5xl mb-2">&#9973;</div>Trên mỗi thuyền có 9 người. Hỏi '+n+' thuyền như thế có bao nhiêu người?', ans:9*n, unit:'người'};
    if(r<0.68) return {type:'num', _e:9*n, q:'<div class="text-5xl mb-2">&#127823;</div>Mỗi túi có 9 quả cam. Hỏi '+n+' túi như thế có bao nhiêu quả cam?', ans:9*n, unit:'quả'};
    return {type:'num', _e:n, q:'<div class="text-5xl mb-2">&#129706;</div>Chia đều '+(9*n)+' l nước mắm vào 9 cái can. Hỏi mỗi can có bao nhiêu lít nước mắm?', ans:n, unit:'lít'};
  }, check:function(q){ return q.ans===q._e && Number.isInteger(q.ans) && q.ans>0; }}
 ]
};
