/* bai-12.js — NỘI DUNG Bài 12 (Bảng nhân 9, bảng chia 9), bám SGK trang in 36-38. Engine v2, THÍCH ỨNG 3 mức.
   Chỉ khai báo BAI; khung + chấm điểm + thích ứng do engine.js lo. Hình + bộ sinh câu dùng chung ở figures.js.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* Phép tính (bảng 2–5) có kết quả bằng v — cho dạng "Cùng kết quả" (như SGK: 45 : 9 và 20 : 4) */
function btBang25(v){
  var o=[];
  for(var x=2;x<=5;x++){ if(v%x===0 && v/x<=10 && v/x>=1) o.push(x+' × '+(v/x)); if(v*x<=50) o.push((v*x)+' : '+x); }
  return o;
}
function kiemCung(q){ var n=q.choices.filter(function(c){ return tinhBT(c)===q._v; }).length; return n===1 && tinhBT(q.choices[q.correct])===q._v && tinhBT(q._target)===q._v; }

var BAI = {
 n: 12,
 title: 'Bảng Nhân 9, Bảng Chia 9',
 sub: 'Bé chọn một hoạt động rồi luyện tập nhé!',
 goal: 10,
 topics: [
  {name:'Khám phá', sec:'Khám phá — Phép nhân 9 từ phép cộng', levels:3,
   muc:['Đếm số người của 2–3 đội múa rồng bằng phép cộng các số 9.', 'Cộng nhiều số 9 (4 đội) mà không cần gợi ý phép nhân.', 'Làm ngược lại: biết tổng số người, tìm số đội múa rồng.'],
   make:function(lv){
    if(lv>=3){ var m=rnd(3,9);
      return {type:'num', _n:m, _nguoc:true, q:doiMuaRong(1)+'<div>Mỗi đội múa rồng có 9 người. Có tất cả '+(9*m)+' người múa rồng.</div><div class="mt-1">Hỏi có mấy đội múa rồng?</div>', ans:m, unit:'đội'}; }
    var n = lv<=1 ? rnd(2,3) : 4, add=[];
    for(var i=0;i<n;i++) add.push('9');
    return {type:'num', _n:n, _nguoc:false, q:doiMuaRong(n)
      +'<div class="text-slate-600 text-base mb-2">Mỗi đội múa rồng có 9 người. Có '+n+' đội múa rồng như thế.</div>'
      +'<div class="text-xl">'+add.join(' + ')+' = ?</div>'
      +(lv<=1 ? '<div class="text-slate-500 text-base mt-1">(tức là 9 × '+n+')</div>' : ''), ans:9*n, unit:'người'};
  }, check:function(q){ return q._nguoc ? q.ans===q._n : q.ans===9*q._n; }},

  {name:'Lập bảng', sec:'Khám phá — Hoàn thành bảng nhân 9, bảng chia 9', levels:3,
   muc:['Điền các dòng đầu của bảng nhân 9.', 'Điền các dòng cuối của bảng nhân 9 hoặc bảng chia 9.', 'Điền khi các dòng bên cạnh cũng bị che — phải nhớ, không đếm thêm.'],
   make:function(lv){ return bnBang(9, lv, true); }, check:bnKiemBang},

  {name:'Tính nhẩm', sec:'Hoạt động 1 — Tính nhẩm', levels:3,
   muc:['Nhớ 9 × 1 đến 9 × 5.', 'Nhớ cả bảng nhân 9 và bảng chia 9, đổi chỗ các thừa số.', 'Tìm số chưa biết trong phép nhân, phép chia với 9.'],
   make:function(lv){ return bnTinh(9, lv); }, check:bnKiemTinh},

  {name:'Cùng kết quả', sec:'Hoạt động 2 — Hai phép tính cùng kết quả', levels:3,
   muc:['Nhận ra đổi chỗ hai thừa số thì kết quả không đổi (9 × 4 = 4 × 9).',
        'Tìm phép tính ở bảng khác có cùng kết quả (45 : 9 = 20 : 4).',
        'Hiểu cấu tạo bảng nhân: 9 × 5 = 9 × 4 + 9.'],
   make:function(lv){
    var target, V, dung, ds=[], them=function(t){ var v=tinhBT(t); if(v!==V && v>0 && ds.every(function(x){ return tinhBT(x)!==v; })) ds.push(t); };
    if(lv<=1){ var a=rnd(2,9); target='9 × '+a; V=9*a; dung=a+' × 9'; them('9 × '+(a>3?a-2:a+2)); them('9 × '+(a>4?a-3:a+3)); them((a>5?a-4:a+4)+' × 9'); }
    else if(lv===2){ var a2=rnd(2,10); target=(9*a2)+' : 9'; V=a2; dung=pick(btBang25(a2));
      [a2-1,a2+1,a2+2,a2-2,a2+3].forEach(function(w){ if(w>=1){ var o=btBang25(w); if(o.length) them(pick(o)); } }); }
    else { var a3=rnd(3,9); target='9 × '+a3; V=9*a3; dung='9 × '+(a3-1)+' + 9'; them('9 × '+(a3-1)+' + 1'); them('9 × '+(a3+1)+' + 9'); them('9 × '+a3+' + 9'); them('8 × '+a3+' + 9'); }
    shuffle(ds); var ch=[dung].concat(ds.slice(0, lv<=1?2:3)); shuffle(ch);
    return {type:'mcq', figFn:melon, _target:target, _v:V,
      q:'<div class="mb-1">Phép tính nào có cùng kết quả với</div><div class="flex justify-center my-2">'+melon(target)+'</div>', choices:ch, correct:ch.indexOf(dung)};
  }, check:kiemCung},

  {name:'Số còn thiếu', sec:'Luyện tập — Nêu các số còn thiếu', levels:3,
   muc:['Đếm thêm 9 từ 9, tìm số ở đầu dãy.', 'Đếm thêm hoặc bớt 9, tìm số ở giữa dãy.', 'Dãy không bắt đầu từ 9 và ô bên cạnh bị che — dùng bước đếm 9.'],
   make:function(lv){ return bnDaySo(9, lv, 'vuong', 'tron'); }, check:bnKiemDay},

  {name:'Sơ đồ', sec:'Luyện tập — Số?', levels:3,
   muc:['Nhân 9 với 2 hoặc 3 rồi chia cho 3 hoặc 9.', 'Nhân 9 rồi chia cho một số trong bảng chia đã học.', 'Số lớn hơn: nhân 9 với số tới 10 rồi chia cho 4, 5, 6, 8.'],
   make:function(lv){
    var p = lv<=1 ? rnd(2,3) : (lv===2 ? rnd(2,6) : rnd(4,10)), mid=9*p, divs=[];
    for(var q2=2;q2<=9;q2++){ if(mid%q2!==0 || mid/q2>10 && lv<3) continue; if(lv<=1 && [3,9].indexOf(q2)<0) continue; if(lv>=3 && (q2===9 || q2<4)) continue; divs.push(q2); }
    if(!divs.length) divs=[9];
    var qd=pick(divs);
    return {type:'num', _mid:mid, _qd:qd, q: soDo([{v:9, h:'vuong'}, {v:'', h:'tron'}, {v:null, h:'vuong'}], ['× '+p, ': '+qd])+'<div>Số ở ô cuối cùng là bao nhiêu?</div>', ans: mid/qd};
  }, check:function(q){ return q._mid%q._qd===0 && q.ans===q._mid/q._qd; }},

  {name:'So với 10', sec:'Luyện tập — Kết quả lớn hơn hay bé hơn 10?', levels:3,
   muc:['So kết quả với 10 khi kết quả khác xa 10.', 'So kết quả với 10 khi kết quả rất gần 10 (9, 10, 11…).', 'So kết quả phép tính hai bước với 10.'],
   make:function(lv){
    var e;
    if(lv<=1) e=pick(['9 × 3','9 × 4','9 × 5','9 × 6','9 × 8','9 × 9','18 : 9','27 : 9','36 : 9','45 : 9']);
    else if(lv===2) e=pick(['9 × 1','9 × 2','90 : 9','90 : 9','81 : 9','63 : 9','72 : 9','54 : 9']);
    else e=pick(['9 × 2 − 9','9 × 2 − 7','81 : 9 + 1','81 : 9 + 2','72 : 9 + 2','90 : 9 − 1','9 × 3 − 18','63 : 9 + 3','45 : 9 + 6','36 : 9 + 5']);
    var v=tinhBT(e), correct = v>10 ? 0 : (v<10 ? 1 : 2);
    return {type:'mcq', _e:e,
      q:'<div class="mb-1">Kết quả của phép tính trên bông hoa so với <b>10</b> thế nào?</div><div class="flex justify-center my-2">'+flower(e)+'</div>',
      choices:['Lớn hơn 10','Bé hơn 10','Bằng 10'], correct:correct};
  }, check:function(q){ var v=tinhBT(q._e); return q.correct===(v>10?0:(v<10?1:2)) && Number.isInteger(v); }},

  {name:'Giải toán', sec:'Luyện tập — Giải toán', levels:3,
   muc:['Bài toán một phép nhân với số nhỏ.', 'Bài toán một phép nhân hoặc phép chia với 9.', 'Bài toán hai bước (nhân rồi trừ, chia rồi nhân).'],
   make:function(lv){
    var r=Math.random(), n = lv<=1 ? rnd(2,5) : rnd(2,9);
    if(lv<=1) return {type:'num', _e:9*n, q:xepHang(Array(n+1).join('x').split('').map(function(){ return thuyen(); }), 5)+'Trên mỗi thuyền có 9 người. Hỏi '+n+' thuyền như thế có bao nhiêu người?', ans:9*n, unit:'người'};
    if(lv===2){
      if(r<0.34) return {type:'num', _e:9*n, q:'<div class="flex justify-center mb-2">'+thuyen(64)+'</div>Trên mỗi thuyền có 9 người. Hỏi '+n+' thuyền như thế có bao nhiêu người?', ans:9*n, unit:'người'};
      if(r<0.68) return {type:'num', _e:9*n, q:'<div class="flex justify-center mb-2">'+tuiCam(64)+'</div>Mỗi túi có 9 quả cam. Hỏi '+n+' túi như thế có bao nhiêu quả cam?', ans:9*n, unit:'quả'};
      return {type:'num', _e:n, q:'<div class="flex justify-center mb-2">'+hangCan(9)+'</div>Chia đều '+(9*n)+' l nước mắm vào 9 cái can. Hỏi mỗi can có bao nhiêu lít nước mắm?', ans:n, unit:'lít'};
    }
    if(r<0.5){ var m=rnd(2,9*n-2);
      return {type:'num', _e:9*n-m, q:'<div class="flex justify-center mb-2">'+thuyen(64)+'</div>Trên mỗi thuyền có 9 người. Có '+n+' thuyền cập bến, đã có '+m+' người lên bờ. Hỏi còn bao nhiêu người trên thuyền?', ans:9*n-m, unit:'người'}; }
    var h=rnd(2,5);
    return {type:'num', _e:n*h, q:'<div class="flex justify-center mb-2">'+hangCan(9)+'</div>Chia đều '+(9*n)+' l nước mắm vào 9 cái can. Hỏi '+h+' can như thế có bao nhiêu lít nước mắm?', ans:n*h, unit:'lít'};
  }, check:function(q){ return q.ans===q._e && q.ans>0; }}
 ]
};
