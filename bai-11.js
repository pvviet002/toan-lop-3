/* bai-11.js — Bài 11: Bảng nhân 8, bảng chia 8. Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-11.md):
   5 MỤC TIÊU (muctieu) × 14 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Mỗi câu gắn nhãn lỗi cho đáp án nhiễu (q.sai) + gợi ý (q.goiY) để engine phản hồi đúng kiểu sai.
   Hình dùng chung (figures.js): bachTuoc, conCua, hopBut, soDo, daySo, bangCot, bnBang, bnDaySo, flower, xepHang.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích riêng bài 11 (chép từ bài 10, đổi 7 thành 8) ---- */
/* Bảng nhãn lỗi cho đáp số: ds = [[giá trị, nhãn], …]; bỏ giá trị <= 0 hoặc trùng đáp án đúng */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
/* Nhãn lỗi hay gặp khi tính 8 × k: dòng bên cạnh, cộng thay nhân, nhầm sang bảng 7 hoặc bảng 9 */
function saiNhan8(k){ return nhanSai([[8*(k-1),'canh-dong'],[8*(k+1),'canh-dong'],[8+k,'cong-thay-nhan'],[7*k,'nham-bang'],[9*k,'nham-bang']], 8*k); }
function goiYNhan8(k){ return {'canh-dong': k>1 ? '8 × '+k+' = 8 × '+(k-1)+' + 8. Bé tính lại nhé!' : '8 × 1 = 8.',
  'cong-thay-nhan':'8 × '+k+' là '+k+' lần số 8, không phải 8 + '+k+'.', 'nham-bang':'Đây là bảng nhân 8: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80.'}; }
function saiChia8(k){ return nhanSai([[k-1,'canh-dong'],[k+1,'canh-dong'],[8*k-8,'cong-thay-nhan'],[8,'dao-vai']], k); }
function goiYChia8(k){ return {'canh-dong':'Bé nhẩm: 8 × mấy = '+(8*k)+'?', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'dao-vai':'Tìm số mà 8 × số đó = '+(8*k)+'.'}; }
function dsBtn11(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-4xl font-extrabold text-orange-600">'+bt+'</div>'; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
/* Bộ ba nhãn của dạng "con cua": hỏi càng mà nhân nhầm với số chân */
function ghepBang(ks, c, k){ if(ks.indexOf(k)>=0 && ks.indexOf(k)!==c) ks[ks.indexOf(k)]=ks[c]; ks[c]=k; return ks; }

var BAI = {
 n: 11,
 title: 'Bảng Nhân 8, Bảng Chia 8',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-so-moi-con':'Lấy nhầm số chân hay số càng của mỗi con'},
 muctieu: [
  {id:'MT1', ten:'Ý nghĩa phép nhân', muc:['Đếm các nhóm 8 bằng phép cộng các số 8 (2–3 nhóm).', 'Nhận ra phép nhân 8 × n khi có nhiều nhóm bằng nhau; viết tổng các số 8 thành phép nhân.', 'Làm ngược: biết tổng, tìm số nhóm; nhận ra cách viết sai.']},
  {id:'MT2', ten:'Bảng nhân 8', muc:['Nhớ 8 × 1 đến 8 × 5.', 'Nhớ cả bảng nhân 8, đổi chỗ thừa số, nhận ra kết quả sai.', 'Dùng kết quả đã biết để tính nhanh (8 × 7 = 56 nên 8 × 8 = 56 + 8), tìm lỗi sai của bạn.']},
  {id:'MT3', ten:'Bảng chia 8', muc:['Chia nhẩm cho 8 với số nhỏ (16 : 8 … 40 : 8).', 'Chia nhẩm cả bảng chia 8; từ phép nhân suy ra phép chia.', 'Từ một phép nhân suy ra cả hai phép chia; tìm số bị chia; tìm lỗi sai của bạn.']},
  {id:'MT4', ten:'Liên hệ phép tính', muc:['Đếm thêm 8 (đầu dãy); sơ đồ nhân 8 rồi cộng một số nhỏ; chọn kết quả, các đáp án xa nhau.', 'Đếm thêm hoặc bớt 8 (giữa dãy); sơ đồ cộng số có hai chữ số; chọn kết quả nhân hoặc chia, đáp án gần nhau.', 'Dãy bị che ô bên cạnh; sơ đồ có trừ hoặc chia; chọn kết quả phép tính hai bước.']},
  {id:'MT5', ten:'Giải toán', muc:['Bài toán một phép nhân với số nhỏ, có hình để đếm; chọn phép nhân cho tình huống.', 'Nhân với số lớn hơn; câu hỏi về càng (khác số chân mỗi con); chọn phép chia.', 'Bài toán hai bước (hộp bút và bút lẻ; chân cộng càng; hơn kém); chọn biểu thức hai bước.']}
 ],
 topics: [
  /* D1 — Bạch tuộc → phép nhân (Khám phá a) */
  {name:'Bạch tuộc', sec:'Khám phá a — Phép nhân 8 là phép cộng các số 8', mt:['MT1'], levels:3,
   muc:['Đếm xúc tu của 2–3 con bằng phép cộng các số 8.', 'Cộng nhiều số 8 (4–5 con) mà không cần gợi ý phép nhân.', 'Biết tổng số xúc tu, tìm số con bạch tuộc.'],
   make:function(lv){
    if(lv>=3){ var m=rnd(3,9);
      return {type:'num', _e:m, q:'<div class="flex justify-center mb-2">'+bachTuoc(72)+'</div><div>Mỗi con bạch tuộc có 8 xúc tu. Đếm được tất cả '+(8*m)+' xúc tu.</div><div class="mt-1">Hỏi có mấy con bạch tuộc?</div>', ans:m, unit:'con',
        sai:nhanSai([[8*m,'chon-sai-phep'],[m-1,'lech-nhom'],[m+1,'lech-nhom']], m), goiY:{'chon-sai-phep':'Bé tìm xem 8 × mấy = '+(8*m)+'.', 'lech-nhom':'Bé nhẩm: 8 × mấy = '+(8*m)+'?'}}; }
    var n = lv<=1 ? rnd(2,3) : rnd(4,5), oc=[], add=[];
    for(var i=0;i<n;i++){ oc.push(bachTuoc()); add.push('8'); }
    return {type:'num', _e:8*n, q:xepHang(oc, 3)+'<div class="text-slate-600 text-base mb-2">Mỗi con bạch tuộc có 8 xúc tu. Có '+n+' con bạch tuộc.</div>'
      +'<div class="text-xl">'+add.join(' + ')+' = ?</div>'+(lv<=1 ? '<div class="text-slate-500 text-base mt-1">(tức là 8 × '+n+')</div>' : ''), ans:8*n, unit:'xúc tu',
      sai:nhanSai([[8+n,'cong-thay-nhan'],[8*(n-1),'lech-nhom'],[8*(n+1),'lech-nhom']], 8*n), goiY:{'cong-thay-nhan':'Có '+n+' con, mỗi con 8 xúc tu: cộng '+n+' số 8.', 'lech-nhom':'Bé đếm lại số con bạch tuộc nhé!'}};
  }, check:function(q){ return q.ans===q._e; }},

  /* D2 — Tổng các số 8 → phép nhân (không có trong SGK) */
  {name:'Tổng số 8', sec:'Viết tổng các số 8 thành phép nhân', mt:['MT1'], levels:3,
   muc:['Viết tổng 2–3 số 8 thành phép nhân.', 'Viết tổng 5–7 số 8 thành phép nhân.', 'Nhận ra cách viết sai (đếm nhầm số các số 8).'],
   make:function(lv){
    var k = lv<=1 ? rnd(2,3) : (lv===2 ? rnd(5,7) : rnd(4,7)), a=[]; for(var i=0;i<k;i++) a.push('8');
    if(lv>=3){ var m = Math.random()<0.5 ? k : k+pick([-1,1]), dung = m===k ? 'Đ' : 'S';
      return {type:'mcq', figFn:dsBtn11, _dung:dung, q:'<div class="text-2xl font-extrabold text-orange-600 my-2">'+a.join(' + ')+' = 8 × '+m+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:(dung==='Đ'?0:1), sai:(dung==='Đ'?{}:{'0':'lech-nhom'}), goiY:{'lech-nhom':'Bé đếm lại xem có mấy số 8 nhé!'}}; }
    return {type:'num', _e:k, q:'<div class="text-2xl font-extrabold text-orange-600 my-2">'+a.join(' + ')+' = 8 ×'+oHoi()+'</div>', ans:k,
      sai:nhanSai([[k-1,'lech-nhom'],[k+1,'lech-nhom'],[8*k,'dao-vai']], k), goiY:{'lech-nhom':'Bé đếm lại xem có mấy số 8 nhé!', 'dao-vai':'Ô trống là số lần lấy 8, không phải kết quả.'}};
  }, check:function(q){ return q.type==='mcq' ? kiemMCQ(q) : q.ans===q._e; }},

  /* D3 — Tính nhẩm bảng nhân 8 (không có trong SGK) */
  {name:'Nhân nhẩm', sec:'Tính nhẩm bảng nhân 8', mt:['MT2'], levels:3,
   muc:['Nhớ 8 × 1 đến 8 × 5.', 'Nhớ 8 × 6 đến 8 × 10, cả khi đổi chỗ thừa số.', 'Dùng kết quả đã biết để tính nhanh kết quả bên cạnh.'],
   make:function(lv){
    var k;
    if(lv<=1){ k=rnd(1,5); return {type:'num', _e:8*k, q:kyHieu('Tính nhẩm', '8 × '+k+' ='+oHoi()), ans:8*k, sai:saiNhan8(k), goiY:goiYNhan8(k)}; }
    if(lv===2){ k=pick([6,7,8,9,10,rnd(2,10)]); var bt = Math.random()<0.6 ? '8 × '+k : k+' × 8';
      return {type:'num', _e:8*k, q:kyHieu('Tính nhẩm', bt+' ='+oHoi()), ans:8*k, sai:saiNhan8(k), goiY:goiYNhan8(k)}; }
    k=rnd(3,9); var len=Math.random()<0.6, k2=len?k+1:k-1, kq=8*k2;
    return {type:'num', _e:kq, q:'<div class="text-slate-600 mb-1">Biết <b>8 × '+k+' = '+(8*k)+'</b>.</div>'+kyHieu('Vậy', '8 × '+k2+' ='+oHoi()), ans:kq,
      sai:nhanSai([[8*k,'sai-buoc'],[8*k+(len?1:-1),'sai-buoc'],[8+k2,'cong-thay-nhan']], kq), goiY:{'sai-buoc': len ? 'Thêm một lần 8 vào '+(8*k)+'.' : 'Bớt một lần 8 từ '+(8*k)+'.', 'cong-thay-nhan':'8 × '+k2+' là '+k2+' lần số 8, không phải 8 + '+k2+'.'}};
  }, check:function(q){ return q.ans===q._e; }},

  /* D4 — Hoàn thành bảng nhân 8 / bảng Thừa số - Thừa số - Tích (Khám phá b, Hoạt động 1a) */
  {name:'Bảng nhân', sec:'Khám phá b, Hoạt động 1a — Bảng nhân 8', mt:['MT2'], levels:3,
   muc:['Điền các dòng đầu bảng nhân 8.', 'Điền các dòng cuối bảng, hoặc hàng Tích trong bảng nhiều cột.', 'Điền khi các dòng bên cạnh cũng bị che — phải nhớ, không đếm thêm.'],
   make:function(lv){
    if(lv<=2 && Math.random()<0.5){   /* bảng nhiều cột: Thừa số · Thừa số · Tích */
      var ks=[]; while(ks.length<5){ var x=pick(lv<=1?[1,2,3,4,5,6,7]:[2,3,4,5,6,7,8,9,10]); if(ks.indexOf(x)<0) ks.push(x); }
      var c=rnd(0,4), k=pick(lv<=1 ? [1,2,3,4,5] : [6,7,8,9,10]); ghepBang(ks, c, k);
      var cot=ks.map(function(v){ return [8, v, 8*v]; });
      return {type:'num', _e:8*k, q:bangCot(['Thừa số','Thừa số','Tích'], cot, {c:c, r:2})+'<div class="mt-1">Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:8*k, sai:saiNhan8(k), goiY:goiYNhan8(k)};
    }
    var q=bnBang(8, lv, false); q._e=q.ans; q.sai=saiNhan8(q._k); q.goiY=goiYNhan8(q._k); return q;
  }, check:function(q){ return q.ans===q._e && q.ans%8===0; }},

  /* D5 — Tính nhẩm bảng chia 8 (không có trong SGK) */
  {name:'Chia nhẩm', sec:'Tính nhẩm bảng chia 8', mt:['MT3'], levels:3,
   muc:['Chia nhẩm 16 : 8 đến 40 : 8.', 'Chia nhẩm 48 : 8 đến 80 : 8.', 'Từ một phép nhân suy ra phép chia cho thừa số kia (8 × 5 = 40 nên 40 : 5 = 8).'],
   make:function(lv){
    if(lv>=3){ var k=pick([2,3,4,5,6,7,9]);
      return {type:'num', _e:8, q:'<div class="text-slate-600 mb-1">Biết <b>8 × '+k+' = '+(8*k)+'</b>.</div>'+kyHieu('Vậy', (8*k)+' : '+k+' ='+oHoi()), ans:8,
        sai:nhanSai([[k,'dao-vai'],[8*k-k,'cong-thay-nhan']], 8), goiY:{'dao-vai':'Từ 8 × '+k+' = '+(8*k)+' ta có '+(8*k)+' : 8 = '+k+' và '+(8*k)+' : '+k+' = ?', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.'}}; }
    var k2 = lv<=1 ? rnd(2,5) : rnd(6,10);
    return {type:'num', _e:k2, q:kyHieu('Tính nhẩm', (8*k2)+' : 8 ='+oHoi()), ans:k2, sai:saiChia8(k2), goiY:goiYChia8(k2)};
  }, check:function(q){ return q.ans===q._e; }},

  /* D6 — Từ phép nhân suy ra phép chia (không có trong SGK; ý có ở Khám phá a) */
  {name:'Nhân → chia', sec:'Từ phép nhân suy ra phép chia', mt:['MT3'], levels:3,
   muc:['Điền kết quả phép chia suy ra từ một phép nhân.', 'Chọn phép chia đúng suy ra từ một phép nhân.', 'Tìm phép tính KHÔNG suy ra được từ một phép nhân.'],
   make:function(lv){
    var k = lv<=1 ? rnd(2,6) : pick([2,3,4,5,6,7,9,10]), P=8*k, dau='<div class="text-2xl font-extrabold text-orange-600 my-2">8 × '+k+' = '+P+'</div>';
    if(lv<=1) return {type:'num', _e:k, q:dau+kyHieu('Vậy', P+' : 8 ='+oHoi()), ans:k, sai:nhanSai([[8,'dao-vai'],[P-8,'cong-thay-nhan']], k), goiY:{'dao-vai':'Trong 8 × '+k+' = '+P+', lấy '+P+' chia cho 8 được số nào?', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.'}};
    var ch, dung;
    if(lv===2){ dung=P+' : 8 = '+k; ch=[dung, P+' : 8 = 8', P+' : '+k+' = '+k, k+' : 8 = '+P]; shuffle(ch);
      var sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='dao-vai'; });
      return {type:'mcq', cot:1, _dung:dung, q:dau+'<div>Từ phép nhân trên, phép chia nào đúng?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'dao-vai':'Từ 8 × '+k+' = '+P+': '+P+' : 8 = '+k+' và '+P+' : '+k+' = 8.'}}; }
    dung=P+' : 8 = 8'; ch=[dung, k+' × 8 = '+P, P+' : 8 = '+k, P+' : '+k+' = 8']; shuffle(ch);
    return {type:'mcq', cot:1, _dung:dung, q:dau+'<div>Phép tính nào <b>KHÔNG</b> suy ra được từ phép nhân trên?</div>', choices:ch, correct:ch.indexOf(dung),
      goiY:{'chung':'Từ 8 × '+k+' = '+P+' ta có: '+k+' × 8 = '+P+', '+P+' : 8 = '+k+', '+P+' : '+k+' = 8. Phép còn lại là sai.'}};
  }, check:function(q){ return q.type==='mcq' ? kiemMCQ(q) : q.ans===q._e; }},

  /* D7 — Bảng chia 8 / bảng Số bị chia - Số chia - Thương (Khám phá b, Hoạt động 1b) */
  {name:'Bảng chia', sec:'Khám phá b, Hoạt động 1b — Bảng chia 8', mt:['MT3'], levels:3,
   muc:['Tìm thương trong bảng, số nhỏ.', 'Tìm thương trong bảng, số lớn (48 : 8 … 80 : 8), hoặc điền bảng chia 8.', 'Tìm số bị chia trong bảng.'],
   make:function(lv){
    if(lv===2 && Math.random()<0.4){ var q; do { q=bnBang(8, 2, true); } while(!q._div);
      q._e=q.ans; q.sai=saiChia8(q._k); q.goiY=goiYChia8(q._k); return q; }
    var ks=[]; while(ks.length<5){ var x=rnd(2,10); if(ks.indexOf(x)<0) ks.push(x); }
    var c=rnd(0,4), k = lv<=1 ? rnd(2,5) : (lv===2 ? rnd(6,10) : rnd(2,10)); ghepBang(ks, c, k);
    var cot=ks.map(function(v){ return [8*v, 8, v]; }), r = lv>=3 ? 0 : 2, ans = r===0 ? 8*k : k;
    var sai = r===0 ? nhanSai([[8*(k-1),'canh-dong'],[8*(k+1),'canh-dong'],[8+k,'cong-thay-nhan'],[k,'dao-vai']], ans) : saiChia8(k);
    return {type:'num', _e:ans, q:bangCot(['Số bị chia','Số chia','Thương'], cot, {c:c, r:r})+'<div class="mt-1">Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ans, sai:sai,
      goiY: r===0 ? {'canh-dong':'Số bị chia = thương × số chia = '+k+' × 8.', 'cong-thay-nhan':'Số bị chia = thương × số chia, không phải cộng.', 'dao-vai':'Ô trống là số bị chia: lấy thương nhân với số chia.'} : goiYChia8(k)};
  }, check:function(q){ return q.ans===q._e && q.ans>0; }},

  /* D8 — Số còn thiếu trong dãy đếm thêm/bớt 8 (Luyện tập 1) */
  {name:'Số còn thiếu', sec:'Luyện tập 1 — Nêu các số còn thiếu', mt:['MT4'], levels:3,
   muc:['Đếm thêm 8 từ 8, tìm số ở đầu dãy.', 'Đếm thêm hoặc bớt 8, tìm số ở giữa dãy.', 'Dãy không bắt đầu từ 8 và ô bên cạnh bị che — dùng bước đếm 8.'],
   make:function(lv){
    var q=bnDaySo(8, lv, 'vuong', 'tron'), a=q.ans;
    q.sai=nhanSai([[a+8,'canh-dong'],[a-8,'canh-dong'],[a+1,'sai-buoc'],[a-1,'sai-buoc'],[a+7,'sai-buoc'],[a-7,'sai-buoc'],[a+9,'sai-buoc'],[a-9,'sai-buoc']], a);
    q.goiY={'canh-dong':'Bé đếm lại đúng vị trí ô có dấu ? nhé!', 'sai-buoc':'Mỗi ô hơn (hoặc kém) ô bên cạnh đúng 8.'};
    return q;
  }, check:bnKiemDay},

  /* D9 — Sơ đồ hai bước (Luyện tập 2) */
  {name:'Sơ đồ', sec:'Luyện tập 2 — Số? (sơ đồ hai bước)', mt:['MT4'], levels:3,
   muc:['Nhân 8 với số nhỏ rồi cộng thêm một số nhỏ.', 'Nhân 8 với số tới 9 rồi cộng một số có hai chữ số.', 'Hai bước có trừ hoặc chia (8 × 6 rồi : 4).'],
   make:function(lv){
    var k, m, d, op2, kq, sai, gy;
    if(lv<=2){ k = lv<=1 ? rnd(2,4) : rnd(2,9); m = lv<=1 ? rnd(1,9) : rnd(10,30); op2='+ '+m; kq=8*k+m;
      sai=nhanSai([[8*k,'thieu-buoc'],[k+m,'cong-thay-nhan']], kq);
      gy={'thieu-buoc':'Bé mới làm xong mũi tên thứ nhất. Còn mũi tên + '+m+' nữa!', 'cong-thay-nhan':'Mũi tên × '+k+' là lấy 8 nhân '+k+', rồi mới cộng '+m+'.'}; }
    else if(Math.random()<0.5){ k=rnd(3,10); m=rnd(5,8*k-5); op2='− '+m; kq=8*k-m;
      sai=nhanSai([[8*k,'thieu-buoc'],[8*k+m,'chon-sai-phep']], kq);
      gy={'thieu-buoc':'Bé mới làm xong mũi tên thứ nhất. Còn mũi tên − '+m+' nữa!', 'chon-sai-phep':'Mũi tên − '+m+' là bớt đi '+m+', kết quả nhỏ hơn.'}; }
    else { k=pick([2,3,4,5,6,7,8,9,10]); d=pick([2,4]); op2=': '+d; kq=8*k/d;
      sai=nhanSai([[8*k,'thieu-buoc'],[8*k-d,'cong-thay-nhan']], kq);
      gy={'thieu-buoc':'Bé mới làm xong mũi tên thứ nhất. Còn mũi tên : '+d+' nữa!', 'cong-thay-nhan':'Mũi tên : '+d+' là phép chia cho '+d+', không phải phép trừ.'}; }
    return {type:'num', _bt:'8 × '+k+' '+op2, q:soDo([{v:8, h:'vuong'}, {v:'', h:'tron'}, {v:null, h:'vuong'}], ['× '+k, op2])+'<div>Số ở ô cuối cùng là bao nhiêu?</div>', ans:kq, sai:sai, goiY:gy};
  }, check:function(q){ var v=tinhBT(q._bt); return q.ans===v && Number.isInteger(v) && v>0; }},

  /* D10 — Chọn kết quả cho phép tính (Luyện tập 3; hình hoa chở phép tính) */
  {name:'Chọn kết quả', sec:'Luyện tập 3 — Chọn kết quả cho phép tính', mt:['MT4'], levels:3,
   muc:['Chọn kết quả của phép nhân 8 với số nhỏ, các đáp án khác xa nhau.', 'Chọn kết quả phép nhân, chia với 8, các đáp án gần nhau.', 'Chọn kết quả phép tính hai bước (8 × 5 + 8).'],
   make:function(lv){
    var t, v, lab, gy, cnt = lv<=1 ? 3 : 4, k;
    if(lv<=1){ k=rnd(2,5); t='8 × '+k; v=8*k; lab=saiNhan8(k); gy=goiYNhan8(k); }
    else if(lv===2){ k=rnd(2,10);
      if(Math.random()<0.5){ t='8 × '+k; v=8*k; lab=saiNhan8(k); gy=goiYNhan8(k); }
      else { t=(8*k)+' : 8'; v=k; lab=saiChia8(k); gy=goiYChia8(k); } }
    else { k=rnd(2,9); var cong=Math.random()<0.5; t='8 × '+k+(cong?' + 8':' − 8'); v = cong ? 8*k+8 : 8*k-8;
      lab=nhanSai([[8*k,'thieu-buoc'],[(cong ? 8*k-8 : 8*k+8),'chon-sai-phep'],[8*k+(cong?16:-16),'canh-dong']], v);
      gy={'thieu-buoc':'Bé tính 8 × '+k+' trước, rồi còn phải '+(cong?'thêm':'bớt')+' 8 nữa.', 'chon-sai-phep':'Bé xem lại dấu '+(cong?'+':'−')+' nhé!', 'canh-dong':'Bé tính lại 8 × '+k+' rồi '+(cong?'thêm':'bớt')+' đúng một lần 8.'}; }
    var cand=shuffle(Object.keys(lab).map(Number)), out=[v], i;
    for(i=0;i<cand.length && out.length<cnt;i++) if(out.indexOf(cand[i])<0) out.push(cand[i]);
    soChon(v, lv, 8, cnt+3).forEach(function(x){ if(out.length<cnt && out.indexOf(x)<0) out.push(x); });
    shuffle(out);
    var sai={}; out.forEach(function(c,j){ if(lab[String(c)]) sai[String(j)]=lab[String(c)]; });
    return {type:'mcq', _t:t, q:'<div class="flex justify-center mb-1">'+flower(t)+'</div><div>Phép tính trên bông hoa có kết quả bằng bao nhiêu?</div>', choices:out.map(String), correct:out.indexOf(v), sai:sai, goiY:gy};
  }, check:function(q){ var v=tinhBT(q._t), c=q.choices.filter(function(x){ return +x===v; }).length; return c===1 && +q.choices[q.correct]===v && new Set(q.choices).size===q.choices.length; }},

  /* D11 — Hộp bút: nối câu với phép tính, tính số bút (Hoạt động 2) */
  {name:'Hộp bút', sec:'Hoạt động 2 — Hộp bút', mt:['MT5'], levels:3,
   muc:['Chọn phép nhân cho n hộp bút, mỗi hộp 8 chiếc.', 'Tính số bút của tới 10 hộp.', 'Tính ngược (biết số bút, tìm số hộp) hoặc bài hai bước (có bút lẻ).'],
   make:function(lv){
    var n;
    if(lv<=1){ n=pick([3,4,5,6,10]); var dung='8 × '+n, ch=[dung, '8 + '+n, (8*n)+' : 8', '8 × '+(n+1)]; shuffle(ch);
      var sai={}; ch.forEach(function(c,i){ if(c===dung) return; sai[String(i)] = c.indexOf('+')>=0 ? 'cong-thay-nhan' : (c.indexOf(':')>=0 ? 'chon-sai-phep' : 'lech-nhom'); });
      return {type:'mcq', cot:1, _dung:dung, q:'<div class="flex justify-center mb-2">'+hopBut(8)+'</div><div>Mỗi hộp bút có 8 chiếc bút chì màu. Phép tính nào cho biết số bút của <b>'+n+' hộp bút</b>?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'cong-thay-nhan':'Có '+n+' hộp, mỗi hộp 8 chiếc: dùng phép nhân, không phải cộng 8 với '+n+'.', 'chon-sai-phep':'Gộp các hộp lại thì dùng phép nhân.', 'lech-nhom':'Bé đếm lại số hộp nhé!'}}; }
    if(lv===2){ n=rnd(5,10);
      return {type:'num', _e:8*n, q:'<div class="flex justify-center mb-2">'+hopBut(8)+'</div><div>Mỗi hộp bút có 8 chiếc bút chì màu. Hỏi '+n+' hộp bút như thế có bao nhiêu chiếc bút chì màu?</div>', ans:8*n, unit:'chiếc', sai:saiNhan8(n), goiY:goiYNhan8(n)}; }
    var m=rnd(3,9);
    if(Math.random()<0.5) return {type:'num', _e:m, q:'<div class="flex justify-center mb-2">'+hopBut(8)+'</div><div>Có '+(8*m)+' chiếc bút chì màu xếp vào các hộp, mỗi hộp 8 chiếc. Hỏi xếp được mấy hộp?</div>', ans:m, unit:'hộp',
      sai:nhanSai([[8*m,'chon-sai-phep'],[m-1,'lech-nhom'],[m+1,'lech-nhom']], m), goiY:{'chon-sai-phep':'Xếp đều vào các hộp thì dùng phép chia.', 'lech-nhom':'Bé nhẩm: 8 × mấy = '+(8*m)+'?'}};
    var le=rnd(1,7);
    return {type:'num', _e:8*m+le, q:'<div class="flex justify-center mb-2">'+hopBut(8)+'</div><div>Lan có '+m+' hộp bút chì màu, mỗi hộp 8 chiếc, và '+le+' chiếc bút lẻ. Hỏi Lan có tất cả bao nhiêu chiếc bút chì màu?</div>', ans:8*m+le, unit:'chiếc',
      sai:nhanSai([[8*m,'thieu-buoc'],[m+le,'cong-thay-nhan'],[8*(m+le),'lech-nhom']], 8*m+le), goiY:{'thieu-buoc':'Bé tìm số bút của '+m+' hộp, rồi cộng thêm '+le+' chiếc bút lẻ.', 'cong-thay-nhan':m+' hộp, mỗi hộp 8 chiếc: 8 × '+m+', không phải '+m+' + '+le+'.', 'lech-nhom':'Chỉ '+m+' hộp mới nhân với 8; '+le+' chiếc bút lẻ không nằm trong hộp.'}};
  }, check:function(q){ return q.type==='mcq' ? kiemMCQ(q) : (q.ans===q._e && q.ans>0); }},

  /* D12 — Đúng hay sai? Tìm lỗi (không có trong SGK) */
  {name:'Đúng / Sai', sec:'Tìm lỗi — Bạn tính đúng hay sai?', mt:['MT2','MT3'], levels:3,
   muc:['Nhận ra kết quả sai thô (cộng thay nhân).', 'Nhận ra kết quả sai tinh (nhầm dòng bên cạnh, nhầm bảng).', 'Chỉ ra lỗi của bạn và tìm kết quả đúng.'],
   make:function(lv, mt){
    var chia = (mt==='MT3'), k = lv<=1 ? rnd(2,5) : rnd(2,10), dung = chia ? k : 8*k, X, tag;
    var bt = chia ? (8*k)+' : 8' : '8 × '+k;
    var loaiSai = lv<=1 ? [[chia ? 8*k-8 : 8+k, 'cong-thay-nhan']]
      : (chia ? [[k-1,'canh-dong'],[k+1,'canh-dong']] : [[8*(k-1),'canh-dong'],[8*(k+1),'canh-dong'],[7*k,'nham-bang'],[9*k,'nham-bang']]);
    var ls=pick(loaiSai.filter(function(p){ return p[0]>0 && p[0]!==dung; }));
    if(lv>=3){ X=ls[0]; tag=ls[1];
      return {type:'num', mt:(chia?'MT3':'MT2'), _e:dung, q:'<div class="flex justify-center mb-1">'+anh('boy', 72, 'Bạn An')+'</div><div>Bạn An tính: <b class="text-orange-600">'+bt+' = '+X+'</b>. An tính sai rồi!</div><div class="mt-1">Kết quả đúng là bao nhiêu?</div>',
        ans:dung, sai:nhanSai([[X, tag]], dung), goiY: chia ? goiYChia8(k) : goiYNhan8(k)}; }
    var laDung=Math.random()<0.5; X = laDung ? dung : ls[0]; tag = laDung ? '' : ls[1];
    var sai = laDung ? {} : {'0': tag};
    var gy = chia ? goiYChia8(k) : goiYNhan8(k); gy.chung = laDung ? 'Phép tính này đúng. Bé nhẩm lại bảng '+(chia?'chia':'nhân')+' 8 nhé!' : 'Bé nhẩm lại '+bt+' nhé!';
    return {type:'mcq', mt:(chia?'MT3':'MT2'), figFn:dsBtn11, _dung:(laDung?'Đ':'S'), _X:X, _k:k, _chia:chia,
      q:'<div class="text-3xl font-extrabold text-orange-600 my-2">'+bt+' = '+X+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(laDung?0:1), sai:sai, goiY:gy};
  }, check:function(q){ if(q.type==='num') return q.ans===q._e; var d = q._chia ? q._k : 8*q._k; return kiemMCQ(q) && (q._dung==='Đ') === (q._X===d); }},

  /* D13 — Con cua: 8 chân, 2 càng (Luyện tập 4). BẪY: hỏi càng thì nhân với 2, không nhân với 8 */
  {name:'Con cua', sec:'Luyện tập 4 — Giải toán (con cua)', mt:['MT5'], levels:3,
   muc:['Bài toán một phép nhân với số nhỏ (số chân), có hình từng con.', 'Hỏi số chân hoặc số càng; càng nhân với 2, không nhân với 8.', 'Bài toán hai bước (chân cộng càng, hoặc chân nhiều hơn càng).'],
   make:function(lv){
    var n = lv<=1 ? rnd(2,4) : rnd(2,9), cua=[], i;
    if(lv<=1){ for(i=0;i<n;i++) cua.push(conCua());
      return {type:'num', _e:8*n, q:xepHang(cua, 4)+'Mỗi con cua có 8 cái chân. Hỏi '+n+' con cua có bao nhiêu cái chân?', ans:8*n, unit:'chân',
        sai:nhanSai([[8+n,'cong-thay-nhan'],[8*(n-1),'lech-nhom'],[8*(n+1),'lech-nhom']], 8*n), goiY:{'cong-thay-nhan':n+' con, mỗi con 8 cái chân: 8 × '+n+'.', 'lech-nhom':'Bé đếm lại số con cua nhé!'}}; }
    var hinh='<div class="flex justify-center mb-2">'+conCua(72)+'</div>';
    if(lv===2){
      if(Math.random()<0.6) return {type:'num', _e:8*n, q:hinh+'Mỗi con cua có 8 cái chân và 2 cái càng. Hỏi '+n+' con cua có bao nhiêu cái chân?', ans:8*n, unit:'chân', sai:saiNhan8(n), goiY:goiYNhan8(n)};
      return {type:'num', _e:2*n, q:hinh+'Mỗi con cua có 8 cái chân và 2 cái càng. Hỏi '+n+' con cua có bao nhiêu cái càng?', ans:2*n, unit:'càng',
        sai:nhanSai([[8*n,'nham-so-moi-con'],[2+n,'cong-thay-nhan'],[2*(n-1),'lech-nhom'],[2*(n+1),'lech-nhom']], 2*n),
        goiY:{'nham-so-moi-con':'Câu này hỏi càng. Mỗi con cua có mấy cái càng?', 'cong-thay-nhan':'Mỗi con có 2 cái càng: '+n+' con thì 2 × '+n+'.', 'lech-nhom':'Bé đếm lại số con cua nhé!'}}; }
    if(Math.random()<0.5) return {type:'num', _e:10*n, q:hinh+'Mỗi con cua có 8 cái chân và 2 cái càng. Hỏi '+n+' con cua có tất cả bao nhiêu cái chân và càng?', ans:10*n, unit:'cái',
      sai:nhanSai([[8*n,'thieu-buoc'],[2*n,'thieu-buoc'],[10+n,'cong-thay-nhan']], 10*n), goiY:{'thieu-buoc':'Bé tìm số chân và số càng của '+n+' con, rồi cộng lại.', 'cong-thay-nhan':'Một con có 8 + 2 = 10 cái. '+n+' con thì 10 × '+n+'.'}};
    return {type:'num', _e:6*n, q:hinh+'Mỗi con cua có 8 cái chân và 2 cái càng. Hỏi '+n+' con cua có số chân nhiều hơn số càng bao nhiêu cái?', ans:6*n, unit:'cái',
      sai:nhanSai([[10*n,'chon-sai-phep'],[8*n,'thieu-buoc'],[2*n,'thieu-buoc']], 6*n), goiY:{'chon-sai-phep':'Hỏi nhiều hơn bao nhiêu thì bé lấy số chân trừ số càng.', 'thieu-buoc':'Bé tìm số chân và số càng của '+n+' con, rồi lấy số chân trừ số càng.'}};
  }, check:function(q){ return q.ans===q._e && q.ans>0; }},

  /* D14 — Chọn phép tính cho bài toán (không có trong SGK) */
  {name:'Chọn phép tính', sec:'Chọn phép tính — không cần tính ra kết quả', mt:['MT5'], levels:3,
   muc:['Chọn phép nhân cho tình huống gộp nhiều nhóm bằng nhau.', 'Chọn phép chia cho tình huống chia thành các phần bằng nhau.', 'Chọn biểu thức cho bài toán hai bước.'],
   make:function(lv){
    var ds, q, hinh;   /* ds = [[lựa chọn, nhãn lỗi]] — phần tử đầu là đáp án đúng; hinh = hình gợi tình huống (không có số để đếm) */
    if(lv<=1){ var n=rnd(2,9), ctx=pick([['Mỗi con bạch tuộc có 8 xúc tu. Có '+n+' con bạch tuộc.','số xúc tu',bachTuoc(56)],['Mỗi hộp bút có 8 chiếc bút chì màu. Có '+n+' hộp bút.','số bút chì màu',hopBut(8,52)],['Mỗi con cua có 8 cái chân. Có '+n+' con cua.','số chân',conCua(52)]]);
      ds=[['8 × '+n,''], ['8 + '+n,'cong-thay-nhan'], [(8*n)+' : 8','chon-sai-phep']]; hinh=ctx[2]; q='<div>'+ctx[0]+'</div><div class="mt-1">Phép tính nào tìm được <b>'+ctx[1]+'</b>?</div>'; }
    else if(lv===2){ var k=rnd(3,10), P=8*k, ct=pick([['Có '+P+' chiếc bút chì màu xếp đều vào 8 hộp.','số bút mỗi hộp',hopBut(8,52)],['Có '+P+' xúc tu. Mỗi con bạch tuộc có 8 xúc tu.','số con bạch tuộc',bachTuoc(56)],['Có '+P+' bạn chia đều thành 8 nhóm.','số bạn mỗi nhóm',anh('girl',52)+anh('boy',52)]]);
      ds=[[P+' : 8',''], [P+' × 8','chon-sai-phep'], [P+' − 8','cong-thay-nhan'], ['8 : '+P,'dao-vai']]; hinh=ct[2]; q='<div>'+ct[0]+'</div><div class="mt-1">Phép tính nào tìm được <b>'+ct[1]+'</b>?</div>'; }
    else { var n3=rnd(3,8), m3=rnd(2,9); if(m3===n3) m3=n3+1;
      ds=[['8 × '+n3+' − '+m3,''], ['8 × '+n3+' + '+m3,'chon-sai-phep'], ['8 + '+n3+' − '+m3,'cong-thay-nhan'], ['8 × '+m3+' − '+n3,'dao-vai']]; hinh=hopBut(8,52);
      q='<div>Lớp mua '+n3+' hộp bút chì màu, mỗi hộp 8 chiếc. Các bạn đã dùng '+m3+' chiếc.</div><div class="mt-1">Phép tính nào tìm được <b>số bút còn lại</b>?</div>'; }
    var dung=ds[0][0]; shuffle(ds);
    var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, _dung:dung, q:'<div class="flex justify-center gap-1 mb-2">'+hinh+'</div>'+q, choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'chon-sai-phep':'Gộp nhiều nhóm bằng nhau: phép nhân. Chia thành phần bằng nhau: phép chia. Bớt đi: phép trừ.', 'cong-thay-nhan':'Có nhiều nhóm bằng nhau thì dùng phép nhân (hoặc chia), không phải cộng, trừ với 8.', 'dao-vai':'Bé xem lại: số nào là số hộp, số nào là số bút mỗi hộp?'}};
  }, check:kiemMCQ}
 ]
};
