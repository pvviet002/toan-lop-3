/* bai-10.js — Bài 10: Bảng nhân 7, bảng chia 7. Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-10.md):
   5 MỤC TIÊU (muctieu) × 13 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Mỗi câu gắn nhãn lỗi cho đáp án nhiễu (q.sai) + gợi ý (q.goiY) để engine phản hồi đúng kiểu sai.
   Hình dùng chung (figures.js): doiKeoCo, soDo (qua arrowBox), bong, daySo, tuanLe, hopCoc, bangCot, bnBang, bnDaySo.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Hình riêng Bài 10: dùng hình chung của figures.js ---- */
/* Sơ đồ mũi tên: (vào) op -> [ra]; ô chưa biết (null) hiện "?" */
function arrowBox(inp, op, out){ return soDo([{v:inp, h:'tron'}, {v:(out===undefined ? null : out), h:'vuong'}], [op]); }
function bt7(lv){   /* một phép tính với 7 (Mức 1: 7 × 1..5) */
  if(lv<=1){ var k=rnd(1,5); return Math.random()<0.5 ? '7 × '+k : k+' × 7'; }
  var k2=rnd(1,10); return Math.random()<0.5 ? '7 × '+k2 : (7*k2)+' : 7';
}

/* ---- Tiện ích riêng bài 10 (chép từ bài 9, đổi 6 thành 7) ---- */
/* Bảng nhãn lỗi cho đáp số: ds = [[giá trị, nhãn], …]; bỏ giá trị <= 0 hoặc trùng đáp án đúng */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
/* Nhãn lỗi hay gặp khi tính 7 × k: dòng bên cạnh, cộng thay nhân, nhầm sang bảng 6 hoặc bảng 8 */
function saiNhan7(k){ return nhanSai([[7*(k-1),'canh-dong'],[7*(k+1),'canh-dong'],[7+k,'cong-thay-nhan'],[6*k,'nham-bang'],[8*k,'nham-bang']], 7*k); }
function goiYNhan7(k){ return {'canh-dong': k>1 ? '7 × '+k+' = 7 × '+(k-1)+' + 7. Bé tính lại nhé!' : '7 × 1 = 7.',
  'cong-thay-nhan':'7 × '+k+' là '+k+' lần số 7, không phải 7 + '+k+'.', 'nham-bang':'Đây là bảng nhân 7: 7, 14, 21, 28, 35, 42, 49, 56, 63, 70.'}; }
function saiChia7(k){ return nhanSai([[k-1,'canh-dong'],[k+1,'canh-dong'],[7*k-7,'cong-thay-nhan'],[7,'dao-vai']], k); }
function goiYChia7(k){ return {'canh-dong':'Bé nhẩm: 7 × mấy = '+(7*k)+'?', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'dao-vai':'Tìm số mà 7 × số đó = '+(7*k)+'.'}; }
function dsBtn10(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-4xl font-extrabold text-orange-600">'+bt+'</div>'; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
/* Lưới 2 cột các quả bóng (câu hỏi dạng số: cần thấy cả bốn quả cùng lúc) */
function luoiBong(ds){ return '<div class="grid grid-cols-2 gap-2 justify-items-center mb-2 mx-auto" style="max-width:260px">'+ds.map(function(t){ return bong(t); }).join('')+'</div>'; }
/* Hai phép chia ở hai bảng khác nhau (SGK Hoạt động 2 chỉ có phép nhân; đây là dạng mở rộng cho Mức 2) */
function capChia(){
  var p=rnd(2,10), N=7*p, mode=Math.random(), b, bs=[2,3,4,5,6].filter(function(x){ return N%x===0; });
  if(mode<0.4 && bs.length){ b=pick(bs); return [N+' : 7', N+' : '+b]; }          /* cùng số bị chia, khác số chia */
  b=pick([2,3,4,5,6]);
  if(mode<0.7) return [N+' : 7', (b*p)+' : '+b];                                  /* hai thương bằng nhau */
  return [N+' : 7', (b*rnd(1,10))+' : '+b];
}

var BAI = {
 n: 10,
 title: 'Bảng Nhân 7, Bảng Chia 7',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 muctieu: [
  {id:'MT1', ten:'Ý nghĩa phép nhân', muc:['Đếm các nhóm 7 bằng phép cộng các số 7 (2–3 nhóm).', 'Nhận ra phép nhân 7 × n khi có nhiều nhóm bằng nhau; viết tổng các số 7 thành phép nhân.', 'Làm ngược: biết tổng, tìm số nhóm; nhận ra cách viết sai.']},
  {id:'MT2', ten:'Bảng nhân 7', muc:['Nhớ 7 × 1 đến 7 × 5.', 'Nhớ cả bảng nhân 7, đổi chỗ thừa số, nhận ra kết quả sai.', 'Dùng kết quả đã biết để tính nhanh (7 × 7 = 49 nên 7 × 8 = 49 + 7), tìm lỗi sai của bạn.']},
  {id:'MT3', ten:'Bảng chia 7', muc:['Chia nhẩm cho 7 với số nhỏ (14 : 7 … 35 : 7).', 'Chia nhẩm cả bảng chia 7; từ phép nhân suy ra phép chia.', 'Từ một phép nhân suy ra cả hai phép chia; tìm số bị chia; tìm lỗi sai của bạn.']},
  {id:'MT4', ten:'Liên hệ phép tính', muc:['Tính theo mũi tên một bước, đếm thêm 7, so sánh phép tính với một số.', 'Mũi tên nhân hoặc chia, đếm thêm hoặc bớt 7, so sánh hai phép tính, đếm số quả bóng thoả điều kiện.', 'Mũi tên ngược (tìm ô đầu), dãy bị che ô bên cạnh, bóng thoả hai điều kiện, so sánh phép tính hai bước.']},
  {id:'MT5', ten:'Giải toán', muc:['Bài toán một phép nhân với số nhỏ, có hình để đếm.', 'Bài toán chia đều hoặc nhân với số lớn hơn; chọn đúng phép tính.', 'Bài toán hai bước; chọn biểu thức cho bài toán hai bước.']}
 ],
 topics: [
  /* D1 — Đội kéo co → phép nhân (Khám phá) */
  {name:'Đội kéo co', sec:'Khám phá — Phép nhân 7 là phép cộng các số 7', mt:['MT1'], levels:3,
   muc:['Đếm số bạn của 2–3 đội bằng phép cộng các số 7.', 'Cộng nhiều số 7 (4–5 đội) mà không cần gợi ý phép nhân.', 'Làm ngược lại: biết tổng số bạn, tìm số đội.'],
   make:function(lv){
    if(lv>=3){ var m=rnd(3,9);
      return {type:'num', _e:m, q:doiKeoCo(1)+'<div>Mỗi đội kéo co có 7 bạn. Có tất cả '+(7*m)+' bạn chơi kéo co.</div><div class="mt-1">Hỏi có mấy đội?</div>', ans:m, unit:'đội',
        sai:nhanSai([[7*m,'chon-sai-phep'],[m-1,'lech-nhom'],[m+1,'lech-nhom']], m), goiY:{'chon-sai-phep':'Bé tìm xem 7 × mấy = '+(7*m)+'.', 'lech-nhom':'Bé nhẩm: 7 × mấy = '+(7*m)+'?'}}; }
    var n = lv<=1 ? rnd(2,3) : rnd(4,5), add=[]; for(var i=0;i<n;i++) add.push('7');
    return {type:'num', _e:7*n, q:doiKeoCo(n)+'<div class="text-slate-600 text-base mb-2">Mỗi đội kéo co có 7 bạn. Có '+n+' đội chơi.</div>'
      +'<div class="text-xl">'+add.join(' + ')+' = ?</div>'+(lv<=1 ? '<div class="text-slate-500 text-base mt-1">(tức là 7 × '+n+')</div>' : ''), ans:7*n, unit:'bạn',
      sai:nhanSai([[7+n,'cong-thay-nhan'],[7*(n-1),'lech-nhom'],[7*(n+1),'lech-nhom']], 7*n), goiY:{'cong-thay-nhan':'Có '+n+' đội, mỗi đội 7 bạn: cộng '+n+' số 7.', 'lech-nhom':'Bé đếm lại số đội nhé!'}};
  }, check:function(q){ return q.ans===q._e; }},

  /* D2 — Tổng các số 7 → phép nhân (không có trong SGK) */
  {name:'Tổng số 7', sec:'Viết tổng các số 7 thành phép nhân', mt:['MT1'], levels:3,
   muc:['Viết tổng 2–3 số 7 thành phép nhân.', 'Viết tổng 5–7 số 7 thành phép nhân.', 'Nhận ra cách viết sai (đếm nhầm số các số 7).'],
   make:function(lv){
    var k = lv<=1 ? rnd(2,3) : (lv===2 ? rnd(5,7) : rnd(4,7)), a=[]; for(var i=0;i<k;i++) a.push('7');
    if(lv>=3){ var m = Math.random()<0.5 ? k : k+pick([-1,1]), dung = m===k ? 'Đ' : 'S';
      return {type:'mcq', figFn:dsBtn10, _dung:dung, q:'<div class="text-2xl font-extrabold text-orange-600 my-2">'+a.join(' + ')+' = 7 × '+m+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:(dung==='Đ'?0:1), sai:(dung==='Đ'?{}:{'0':'lech-nhom'}), goiY:{'lech-nhom':'Bé đếm lại xem có mấy số 7 nhé!'}}; }
    return {type:'num', _e:k, q:'<div class="text-2xl font-extrabold text-orange-600 my-2">'+a.join(' + ')+' = 7 ×'+oHoi()+'</div>', ans:k,
      sai:nhanSai([[k-1,'lech-nhom'],[k+1,'lech-nhom'],[7*k,'dao-vai']], k), goiY:{'lech-nhom':'Bé đếm lại xem có mấy số 7 nhé!', 'dao-vai':'Ô trống là số lần lấy 7, không phải kết quả.'}};
  }, check:function(q){ return q.type==='mcq' ? kiemMCQ(q) : q.ans===q._e; }},

  /* D3 — Tính nhẩm bảng nhân 7 (không có trong SGK) */
  {name:'Nhân nhẩm', sec:'Tính nhẩm bảng nhân 7', mt:['MT2'], levels:3,
   muc:['Nhớ 7 × 1 đến 7 × 5.', 'Nhớ 7 × 6 đến 7 × 10, cả khi đổi chỗ thừa số.', 'Dùng kết quả đã biết để tính nhanh kết quả bên cạnh.'],
   make:function(lv){
    var k;
    if(lv<=1){ k=rnd(1,5); return {type:'num', _e:7*k, q:kyHieu('Tính nhẩm', '7 × '+k+' ='+oHoi()), ans:7*k, sai:saiNhan7(k), goiY:goiYNhan7(k)}; }
    if(lv===2){ k=pick([6,7,8,9,10,rnd(2,10)]); var bt = Math.random()<0.6 ? '7 × '+k : k+' × 7';
      return {type:'num', _e:7*k, q:kyHieu('Tính nhẩm', bt+' ='+oHoi()), ans:7*k, sai:saiNhan7(k), goiY:goiYNhan7(k)}; }
    k=rnd(3,9); var len=Math.random()<0.6, k2=len?k+1:k-1, kq=7*k2;
    return {type:'num', _e:kq, q:'<div class="text-slate-600 mb-1">Biết <b>7 × '+k+' = '+(7*k)+'</b>.</div>'+kyHieu('Vậy', '7 × '+k2+' ='+oHoi()), ans:kq,
      sai:nhanSai([[7*k,'sai-buoc'],[7*k+(len?1:-1),'sai-buoc'],[7+k2,'cong-thay-nhan']], kq), goiY:{'sai-buoc': len ? 'Thêm một lần 7 vào '+(7*k)+'.' : 'Bớt một lần 7 từ '+(7*k)+'.', 'cong-thay-nhan':'7 × '+k2+' là '+k2+' lần số 7, không phải 7 + '+k2+'.'}};
  }, check:function(q){ return q.ans===q._e; }},

  /* D4 — Hoàn thành bảng nhân 7 (Khám phá) */
  {name:'Lập bảng', sec:'Khám phá — Hoàn thành bảng nhân 7', mt:['MT2'], levels:3,
   muc:['Điền các dòng đầu bảng nhân 7.', 'Điền các dòng cuối bảng, hoặc hàng Tích trong bảng nhiều cột.', 'Điền khi các dòng bên cạnh cũng bị che — phải nhớ, không đếm thêm.'],
   make:function(lv){
    if(lv<=2 && Math.random()<0.5){   /* bảng nhiều cột: Thừa số · Thừa số · Tích */
      var ks=[], dsK = lv<=1 ? [1,2,3,4,5] : [6,7,8,9,10]; while(ks.length<5){ var x=pick(lv<=1?[1,2,3,4,5,6,7]:[2,3,4,5,6,7,8,9,10]); if(ks.indexOf(x)<0) ks.push(x); }
      var c=rnd(0,4), k=pick(dsK); if(ks.indexOf(k)>=0 && ks.indexOf(k)!==c) ks[ks.indexOf(k)]=ks[c]; ks[c]=k;
      var cot=ks.map(function(v){ return [7, v, 7*v]; });
      return {type:'num', _e:7*k, q:bangCot(['Thừa số','Thừa số','Tích'], cot, {c:c, r:2})+'<div class="mt-1">Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:7*k, sai:saiNhan7(k), goiY:goiYNhan7(k)};
    }
    var q=bnBang(7, lv, false); q._e=q.ans; q.sai=saiNhan7(q._k); q.goiY=goiYNhan7(q._k); return q;
  }, check:function(q){ return q.ans===q._e && q.ans%7===0; }},

  /* D5 — Tính nhẩm bảng chia 7 (không có trong SGK) */
  {name:'Chia nhẩm', sec:'Tính nhẩm bảng chia 7', mt:['MT3'], levels:3,
   muc:['Chia nhẩm 14 : 7 đến 35 : 7.', 'Chia nhẩm 42 : 7 đến 70 : 7.', 'Từ một phép nhân suy ra phép chia cho thừa số kia (7 × 5 = 35 nên 35 : 5 = 7).'],
   make:function(lv){
    if(lv>=3){ var k=pick([2,3,4,5,6,8,9]);
      return {type:'num', _e:7, q:'<div class="text-slate-600 mb-1">Biết <b>7 × '+k+' = '+(7*k)+'</b>.</div>'+kyHieu('Vậy', (7*k)+' : '+k+' ='+oHoi()), ans:7,
        sai:nhanSai([[k,'dao-vai'],[7*k-k,'cong-thay-nhan']], 7), goiY:{'dao-vai':'Từ 7 × '+k+' = '+(7*k)+' ta có '+(7*k)+' : 7 = '+k+' và '+(7*k)+' : '+k+' = ?', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.'}}; }
    var k2 = lv<=1 ? rnd(2,5) : rnd(6,10);
    return {type:'num', _e:k2, q:kyHieu('Tính nhẩm', (7*k2)+' : 7 ='+oHoi()), ans:k2, sai:saiChia7(k2), goiY:goiYChia7(k2)};
  }, check:function(q){ return q.ans===q._e; }},

  /* D6 — Từ phép nhân suy ra phép chia (không có trong SGK) */
  {name:'Nhân → chia', sec:'Từ phép nhân suy ra phép chia', mt:['MT3'], levels:3,
   muc:['Điền kết quả phép chia suy ra từ một phép nhân.', 'Chọn phép chia đúng suy ra từ một phép nhân.', 'Tìm phép tính KHÔNG suy ra được từ một phép nhân.'],
   make:function(lv){
    var k = lv<=1 ? rnd(2,6) : pick([2,3,4,5,6,8,9,10]), P=7*k, dau='<div class="text-2xl font-extrabold text-orange-600 my-2">7 × '+k+' = '+P+'</div>';
    if(lv<=1) return {type:'num', _e:k, q:dau+kyHieu('Vậy', P+' : 7 ='+oHoi()), ans:k, sai:nhanSai([[7,'dao-vai'],[P-7,'cong-thay-nhan']], k), goiY:{'dao-vai':'Trong 7 × '+k+' = '+P+', lấy '+P+' chia cho 7 được số nào?', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.'}};
    var ch, dung;
    if(lv===2){ dung=P+' : 7 = '+k; ch=[dung, P+' : 7 = 7', P+' : '+k+' = '+k, k+' : 7 = '+P]; shuffle(ch);
      var sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='dao-vai'; });
      return {type:'mcq', cot:1, _dung:dung, q:dau+'<div>Từ phép nhân trên, phép chia nào đúng?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'dao-vai':'Từ 7 × '+k+' = '+P+': '+P+' : 7 = '+k+' và '+P+' : '+k+' = 7.'}}; }
    dung=P+' : 7 = 7'; ch=[dung, k+' × 7 = '+P, P+' : 7 = '+k, P+' : '+k+' = 7']; shuffle(ch);
    return {type:'mcq', cot:1, _dung:dung, q:dau+'<div>Phép tính nào <b>KHÔNG</b> suy ra được từ phép nhân trên?</div>', choices:ch, correct:ch.indexOf(dung),
      goiY:{'chung':'Từ 7 × '+k+' = '+P+' ta có: '+k+' × 7 = '+P+', '+P+' : 7 = '+k+', '+P+' : '+k+' = 7. Phép còn lại là sai.'}};
  }, check:function(q){ return q.type==='mcq' ? kiemMCQ(q) : q.ans===q._e; }},

  /* D7 — Sơ đồ mũi tên (Hoạt động 1: Số?) */
  {name:'Mũi tên', sec:'Hoạt động 1 — Số?', mt:['MT4'], levels:3,
   muc:['Tính 7 × 2 đến 7 × 5 theo mũi tên.', 'Tính nhân hoặc chia với 7 tới 7 × 10 theo mũi tên.', 'Tìm số ở ô ĐẦU khi biết kết quả (tính ngược).'],
   make:function(lv){
    var k = lv<=1 ? rnd(2,5) : rnd(2,10), hoi='<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>';
    function nhan(){ return {type:'num', _a:7*k, q:arrowBox(7, '× '+k)+hoi, ans:7*k, sai:saiNhan7(k), goiY:goiYNhan7(k)}; }
    function chia(){ return {type:'num', _a:k, q:arrowBox(7*k, ': 7')+hoi, ans:k, sai:saiChia7(k), goiY:goiYChia7(k)}; }
    if(lv<=1) return nhan();
    if(lv===2) return Math.random()<0.5 ? nhan() : chia();
    var ngc='<div>Số ở ô đầu <b class="text-amber-700">?</b> là bao nhiêu?</div>';
    if(Math.random()<0.5) return {type:'num', _a:k, q:arrowBox(null, '× 7', 7*k)+ngc, ans:k,
      sai:nhanSai([[7*k,'dao-vai'],[k-1,'canh-dong'],[k+1,'canh-dong'],[7*k-7,'cong-thay-nhan']], k), goiY:{'dao-vai':'Số '+(7*k)+' là kết quả ở ô cuối. Ô đầu nhân 7 ra '+(7*k)+'.', 'canh-dong':'Bé nhẩm: mấy × 7 = '+(7*k)+'?', 'cong-thay-nhan':'Mũi tên × 7: muốn quay về ô đầu thì chia cho 7.'}};
    return {type:'num', _a:7*k, q:arrowBox(null, ': 7', k)+ngc, ans:7*k,
      sai:nhanSai([[k,'dao-vai'],[7*k-7,'canh-dong'],[7*k+7,'canh-dong'],[k+7,'cong-thay-nhan']], 7*k), goiY:{'dao-vai':'Số '+k+' là kết quả ở ô cuối. Ô đầu chia 7 được '+k+'.', 'canh-dong':'Bé nhẩm: mấy : 7 = '+k+'?', 'cong-thay-nhan':'Mũi tên : 7: muốn quay về ô đầu thì nhân với 7.'}};
  }, check:function(q){ return q.ans===q._a && q.ans>0; }},

  /* D8 — Chọn quả bóng theo điều kiện (Hoạt động 2) */
  {name:'Chọn bóng', sec:'Hoạt động 2 — Chọn phép tính theo điều kiện', mt:['MT4'], levels:3,
   muc:['Chọn quả bóng có kết quả bé hơn một số, các kết quả khác xa nhau.', 'Chọn quả bóng, hoặc đếm số quả bóng có kết quả bé hơn một số; các kết quả gần nhau.', 'Chọn (hoặc đếm) quả bóng thoả HAI điều kiện: lớn hơn số này và bé hơn số kia.'],
   make:function(lv){
    var cnt = lv<=1 ? 3 : 4, pool=[], g=0;
    while(pool.length<cnt && g<300){ g++; var t=bt7(lv), v=tinhBT(t); if(!pool.some(function(p){ return p.v===v; }) && (lv>1 || pool.every(function(p){ return Math.abs(p.v-v)>=5; }))) pool.push({t:t, v:v}); }
    var vals=pool.map(function(p){ return p.v; }).sort(function(a,b){ return a-b; }), order=pool.slice(); shuffle(order);
    var bts=order.map(function(o){ return o.t; }), chung='Bé tính kết quả của từng quả bóng rồi so với số trong câu hỏi.';
    var dem = (lv===2 && Math.random()<0.5) || (lv>=3 && Math.random()<0.3);
    if(dem){ var i, j, N, ans, lo, hi, cau;
      if(lv===2){ ans=rnd(1,3); N=vals[ans]; lo=-1; hi=N; cau='<b>kết quả bé hơn '+N+'</b>'; }
      else { var pr=pick([[0,2],[1,3],[0,3]]); i=pr[0]; j=pr[1]; lo=vals[i]; hi=vals[j]; ans=j-i-1; cau='<b>kết quả lớn hơn '+lo+'</b> và <b>bé hơn '+hi+'</b>'; }
      return {type:'num', _bts:bts, _lo:lo, _hi:hi, q:luoiBong(bts)+'<div>Có bao nhiêu quả bóng ghi phép tính có '+cau+'?</div>', ans:ans, unit:'quả',
        sai:nhanSai([[ans+1,'lech-nhom'],[ans-1,'lech-nhom']], ans), goiY:{'lech-nhom':'Bé tính kết quả từng quả bóng rồi đếm. Quả có kết quả đúng bằng số đã cho thì không tính.'}}; }
    if(lv>=3){ var m=rnd(1,cnt-2), lo3=vals[m-1], hi3=vals[m+1];
      return {type:'mcq', figFn:bong, _lo:lo3, _hi:hi3, q:'<div>Quả bóng nào có kết quả <b>lớn hơn '+lo3+'</b> và <b>bé hơn '+hi3+'</b>?</div>', choices:bts, correct:order.findIndex(function(o){ return o.v===vals[m]; }), goiY:{'chung':chung}}; }
    var N1=vals[1];
    return {type:'mcq', figFn:bong, _lo:-1, _hi:N1, q:'<div>Quả bóng nào ghi phép tính có <b>kết quả bé hơn '+N1+'</b>?</div>', choices:bts, correct:order.findIndex(function(o){ return o.v===vals[0]; }), goiY:{'chung':chung}};
  }, check:function(q){
    if(q.type==='num'){ var c=q._bts.filter(function(t){ var v=tinhBT(t); return v>q._lo && v<q._hi; }).length; return c>=1 && q.ans===c; }
    var ok=q.choices.filter(function(c){ var v=tinhBT(c); return v>q._lo && v<q._hi; }); return ok.length===1 && ok[0]===q.choices[q.correct] && new Set(q.choices).size===q.choices.length; }},

  /* D9 — Số còn thiếu trong dãy đếm thêm/bớt 7 (Luyện tập) */
  {name:'Số còn thiếu', sec:'Luyện tập — Nêu các số còn thiếu', mt:['MT4'], levels:3,
   muc:['Đếm thêm 7 từ 7, tìm số ở đầu dãy.', 'Đếm thêm hoặc bớt 7, tìm số ở giữa dãy.', 'Dãy không bắt đầu từ 7 và ô bên cạnh bị che — dùng bước đếm 7.'],
   make:function(lv){
    var q=bnDaySo(7, lv, 'tron', 'thoi'), a=q.ans;
    q.sai=nhanSai([[a+7,'canh-dong'],[a-7,'canh-dong'],[a+1,'sai-buoc'],[a-1,'sai-buoc'],[a+6,'sai-buoc'],[a-6,'sai-buoc'],[a+8,'sai-buoc'],[a-8,'sai-buoc']], a);
    q.goiY={'canh-dong':'Bé đếm lại đúng vị trí ô có dấu ? nhé!', 'sai-buoc':'Mỗi ô hơn (hoặc kém) ô bên cạnh đúng 7.'};
    return q;
  }, check:bnKiemDay},

  /* D10 — So sánh (Luyện tập). Mức 2 có thêm cặp hai phép chia khác số chia */
  {name:'So sánh', sec:'Luyện tập — So sánh (>, <, =)', mt:['MT4'], levels:3,
   muc:['So sánh một phép tính với một số.', 'So sánh hai phép tính nhân, chia (cả hai phép chia khác số chia).', 'So sánh phép tính hai bước (7 × 4 + 7 và 7 × 5).'],
   make:function(lv){
    var A, B, ab;
    if(lv<=1){ A=bt7(1); var v=tinhBT(A); B=String(v+pick([-5,-3,0,3,5])); if(+B<=0) B=String(v+3); }
    else if(lv===2){
      if(Math.random()<0.5){ A=bt7(2); B=bt7(2); if(Math.random()<0.3){ var k=rnd(2,10); A='7 × '+k; B=k+' × 7'; } }
      else { ab=capChia(); A=ab[0]; B=ab[1]; if(Math.random()<0.5){ var t0=A; A=B; B=t0; } }
    }
    else { var k3=rnd(2,9), j=rnd(k3,k3+2); A='7 × '+k3+(Math.random()<0.5?' + 7':' − 7'); B='7 × '+j; if(Math.random()<0.5){ var t=A; A=B; B=t; } }
    var va=tinhBT(A), vb=tinhBT(B), sign = va>vb ? '>' : (va<vb ? '<' : '='), ds=['>','<','='], correct=ds.indexOf(sign), sai={};
    if(lv>=3) ds.forEach(function(c,i){ if(i!==correct) sai[String(i)]='sai-buoc'; });
    return {type:'mcq', _a:A, _b:B, q:'<div class="text-2xl font-extrabold text-orange-700 my-2">'+A+' &nbsp; ? &nbsp; '+B+'</div><div>Điền dấu thích hợp:</div>', choices:ds, correct:correct, sai:sai,
      goiY:{'sai-buoc':'Bé tính 7 × k trước, rồi thêm (hoặc bớt) đúng một lần 7. Sau đó so sánh.', 'chung':'Bé tính kết quả của từng vế rồi so sánh.'}};
  }, check:function(q){ var va=tinhBT(q._a), vb=tinhBT(q._b); return Number.isInteger(va) && Number.isInteger(vb) && q.choices[q.correct]===(va>vb?'>':(va<vb?'<':'=')); }},

  /* D11 — Đúng hay sai? Tìm lỗi (không có trong SGK) */
  {name:'Đúng / Sai', sec:'Tìm lỗi — Bạn tính đúng hay sai?', mt:['MT2','MT3'], levels:3,
   muc:['Nhận ra kết quả sai thô (cộng thay nhân).', 'Nhận ra kết quả sai tinh (nhầm dòng bên cạnh, nhầm bảng).', 'Chỉ ra lỗi của bạn và tìm kết quả đúng.'],
   make:function(lv, mt){
    var chia = (mt==='MT3'), k = lv<=1 ? rnd(2,5) : rnd(2,10), dung = chia ? k : 7*k, X, tag;
    var bt = chia ? (7*k)+' : 7' : '7 × '+k;
    var loaiSai = lv<=1 ? [[chia ? 7*k-7 : 7+k, 'cong-thay-nhan']]
      : (chia ? [[k-1,'canh-dong'],[k+1,'canh-dong']] : [[7*(k-1),'canh-dong'],[7*(k+1),'canh-dong'],[6*k,'nham-bang'],[8*k,'nham-bang']]);
    var ls=pick(loaiSai.filter(function(p){ return p[0]>0 && p[0]!==dung; }));
    if(lv>=3){ X=ls[0]; tag=ls[1];
      return {type:'num', mt:(chia?'MT3':'MT2'), _e:dung, q:'<div class="flex justify-center mb-1">'+anh('boy', 72, 'Bạn An')+'</div><div>Bạn An tính: <b class="text-orange-600">'+bt+' = '+X+'</b>. An tính sai rồi!</div><div class="mt-1">Kết quả đúng là bao nhiêu?</div>',
        ans:dung, sai:nhanSai([[X, tag]], dung), goiY: chia ? goiYChia7(k) : goiYNhan7(k)}; }
    var laDung=Math.random()<0.5; X = laDung ? dung : ls[0]; tag = laDung ? '' : ls[1];
    var sai = laDung ? {} : {'0': tag};
    var gy = chia ? goiYChia7(k) : goiYNhan7(k); gy.chung = laDung ? 'Phép tính này đúng. Bé nhẩm lại bảng '+(chia?'chia':'nhân')+' 7 nhé!' : 'Bé nhẩm lại '+bt+' nhé!';
    return {type:'mcq', mt:(chia?'MT3':'MT2'), figFn:dsBtn10, _dung:(laDung?'Đ':'S'), _X:X, _k:k, _chia:chia,
      q:'<div class="text-3xl font-extrabold text-orange-600 my-2">'+bt+' = '+X+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(laDung?0:1), sai:sai, goiY:gy};
  }, check:function(q){ if(q.type==='num') return q.ans===q._e; var d = q._chia ? q._k : 7*q._k; return kiemMCQ(q) && (q._dung==='Đ') === (q._X===d); }},

  /* D12 — Toán có lời: tuần lễ (Hoạt động 3), cốc xếp vào hộp (Luyện tập 3) */
  {name:'Giải toán', sec:'Hoạt động 3, Luyện tập 3 — Giải toán', mt:['MT5'], levels:3,
   muc:['Bài toán một phép nhân với số nhỏ (tuần lễ), có hình để đếm.', 'Bài toán một phép nhân hoặc phép chia đều với 7.', 'Bài toán hai bước (tuần lễ và ngày lẻ, chia rồi nhân).'],
   make:function(lv){
    var n = lv<=1 ? rnd(2,5) : rnd(2,9);
    if(lv<=1 || (lv===2 && Math.random()<0.5)) return {type:'num', _e:7*n, q:tuanLe(lv<=1 ? n : 1)+'Mỗi tuần lễ có 7 ngày. Bố của Mai đi công tác '+n+' tuần lễ. Hỏi bố của Mai đi công tác bao nhiêu ngày?', ans:7*n, unit:'ngày',
      sai:(lv<=1 ? nhanSai([[7+n,'cong-thay-nhan'],[7*(n-1),'lech-nhom'],[7*(n+1),'lech-nhom']], 7*n) : saiNhan7(n)), goiY:(lv<=1 ? {'cong-thay-nhan':n+' tuần lễ, mỗi tuần lễ 7 ngày: 7 × '+n+'.', 'lech-nhom':'Bé đếm lại số tuần lễ nhé!'} : goiYNhan7(n))};
    if(lv===2) return {type:'num', _e:n, q:'<div class="flex justify-center mb-2">'+hopCoc(7)+'</div>Có '+(7*n)+' cái cốc xếp đều vào 7 hộp. Hỏi mỗi hộp có mấy cái cốc?', ans:n, unit:'cái',
      sai:nhanSai([[7*n-7,'cong-thay-nhan'],[49*n,'chon-sai-phep'],[n-1,'canh-dong'],[n+1,'canh-dong']], n), goiY:{'chon-sai-phep':'Xếp đều vào các hộp thì dùng phép chia.', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'canh-dong':'Bé nhẩm: 7 × mấy = '+(7*n)+'?'}};
    if(Math.random()<0.5){ var d=rnd(1,6);
      return {type:'num', _e:7*n+d, q:tuanLe(1)+'Bố của Mai đi công tác '+n+' tuần lễ và '+d+' ngày. Hỏi bố của Mai đi công tác tất cả bao nhiêu ngày?', ans:7*n+d, unit:'ngày',
        sai:nhanSai([[7*n,'thieu-buoc'],[n+d,'cong-thay-nhan'],[7*(n+d),'lech-nhom']], 7*n+d), goiY:{'thieu-buoc':'Bé tìm số ngày của '+n+' tuần lễ, rồi cộng thêm '+d+' ngày nữa.', 'cong-thay-nhan':'Mỗi tuần lễ có 7 ngày: '+n+' tuần lễ là 7 × '+n+' ngày.', 'lech-nhom':'Chỉ '+n+' tuần lễ mới nhân với 7; '+d+' ngày là ngày lẻ.'}}; }
    var p=rnd(2,5), h=rnd(2,6);
    return {type:'num', _e:p*h, q:'<div class="flex justify-center mb-2">'+hopCoc(7)+'</div>Có '+(7*p)+' cái cốc xếp đều vào 7 hộp. Hỏi '+h+' hộp như thế có bao nhiêu cái cốc?', ans:p*h, unit:'cái',
      sai:nhanSai([[p,'thieu-buoc'],[7*p,'thieu-buoc'],[7*h,'lech-nhom']], p*h), goiY:{'thieu-buoc':'Bước 1: tìm mỗi hộp có mấy cái cốc. Bước 2: tìm '+h+' hộp có bao nhiêu cái cốc.', 'lech-nhom':'Mỗi hộp không phải có 7 cái cốc. Bé chia '+(7*p)+' cho 7 trước nhé!'}};
  }, check:function(q){ return q.ans===q._e && q.ans>0; }},

  /* D13 — Chọn phép tính cho bài toán (không có trong SGK) */
  {name:'Chọn phép tính', sec:'Chọn phép tính — không cần tính ra kết quả', mt:['MT5'], levels:3,
   muc:['Chọn phép nhân cho tình huống gộp nhiều nhóm bằng nhau.', 'Chọn phép chia cho tình huống chia thành các phần bằng nhau.', 'Chọn biểu thức cho bài toán hai bước.'],
   make:function(lv){
    var ds, q, hinh;   /* ds = [[lựa chọn, nhãn lỗi]] — phần tử đầu là đáp án đúng; hinh = hình gợi tình huống (không có số để đếm) */
    if(lv<=1){ var n=rnd(2,9), ctx=pick([['Mỗi tuần lễ có 7 ngày. Có '+n+' tuần lễ.','số ngày',tuanLe(1)],['Mỗi đội kéo co có 7 bạn. Có '+n+' đội.','số bạn',doiKeoCo(1)],['Mỗi hộp có 7 cái cốc. Có '+n+' hộp.','số cốc',hopCoc(1)]]);
      ds=[['7 × '+n,''], ['7 + '+n,'cong-thay-nhan'], [(7*n)+' : 7','chon-sai-phep']]; hinh=ctx[2]; q='<div>'+ctx[0]+'</div><div class="mt-1">Phép tính nào tìm được <b>'+ctx[1]+'</b>?</div>'; }
    else if(lv===2){ var k=rnd(3,10), P=7*k, ct=pick([['Có '+P+' cái cốc xếp đều vào 7 hộp.','số cốc mỗi hộp',hopCoc(7)],['Có '+P+' bạn chia đều thành 7 đội.','số bạn mỗi đội',anh('girl',52)+anh('boy',52)],['Bố đi công tác '+P+' ngày. Mỗi tuần lễ có 7 ngày.','số tuần lễ bố đi',tuanLe(1)]]);
      ds=[[P+' : 7',''], [P+' × 7','chon-sai-phep'], [P+' − 7','cong-thay-nhan'], ['7 : '+P,'dao-vai']]; hinh=ct[2]; q='<div>'+ct[0]+'</div><div class="mt-1">Phép tính nào tìm được <b>'+ct[1]+'</b>?</div>'; }
    else { var n3=rnd(3,8), m3=rnd(2,9); if(m3===n3) m3=n3+1;
      ds=[['7 × '+n3+' − '+m3,''], ['7 × '+n3+' + '+m3,'chon-sai-phep'], ['7 + '+n3+' − '+m3,'cong-thay-nhan'], ['7 × '+m3+' − '+n3,'dao-vai']]; hinh=hopCoc(1);
      q='<div>Có '+n3+' hộp cốc, mỗi hộp 7 cái. Các bạn đã dùng '+m3+' cái.</div><div class="mt-1">Phép tính nào tìm được <b>số cốc còn lại</b>?</div>'; }
    var dung=ds[0][0]; shuffle(ds);
    var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, _dung:dung, q:'<div class="flex justify-center gap-1 mb-2">'+hinh+'</div>'+q, choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'chon-sai-phep':'Gộp nhiều nhóm bằng nhau: phép nhân. Chia thành phần bằng nhau: phép chia. Bớt đi: phép trừ.', 'cong-thay-nhan':'Có nhiều nhóm bằng nhau thì dùng phép nhân (hoặc chia), không phải cộng, trừ với 7.', 'dao-vai':'Bé xem lại: số nào là số hộp, số nào là số cốc mỗi hộp?'}};
  }, check:kiemMCQ}
 ]
};
