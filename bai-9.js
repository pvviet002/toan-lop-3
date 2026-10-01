/* bai-9.js — Bài 9: Bảng nhân 6, bảng chia 6 (SGK trang in 28–30). Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (E:/Dat_Thoi/Lop3/phan-tich-su-pham/bai-09.md):
   5 MỤC TIÊU (muctieu) × 13 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Mỗi câu gắn nhãn lỗi cho đáp án nhiễu (q.sai) + gợi ý (q.goiY) để engine phản hồi đúng kiểu sai.
   Hình dùng chung (figures.js): ladybug, truck, hopBut, chuoiBuom, thanhGo, bangCot, bnBang, bnDaySo.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích riêng bài 9 ---- */
/* Bảng nhãn lỗi cho đáp số: ds = [[giá trị, nhãn], …]; bỏ giá trị <= 0 hoặc trùng đáp án đúng */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
/* Nhãn lỗi hay gặp khi tính 6 × k */
function saiNhan6(k){ return nhanSai([[6*(k-1),'canh-dong'],[6*(k+1),'canh-dong'],[6+k,'cong-thay-nhan'],[7*k,'nham-bang'],[5*k,'nham-bang']], 6*k); }
function goiYNhan6(k){ return {'canh-dong': k>1 ? '6 × '+k+' = 6 × '+(k-1)+' + 6. Bé tính lại nhé!' : '6 × 1 = 6.',
  'cong-thay-nhan':'6 × '+k+' là '+k+' lần số 6, không phải 6 + '+k+'.', 'nham-bang':'Đây là bảng nhân 6: 6, 12, 18, 24, 30, …'}; }
function saiChia6(k){ return nhanSai([[k-1,'canh-dong'],[k+1,'canh-dong'],[6*k-6,'cong-thay-nhan'],[6,'dao-vai']], k); }
function goiYChia6(k){ return {'canh-dong':'Bé nhẩm: 6 × mấy = '+(6*k)+'?', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'dao-vai':'Tìm số mà 6 × số đó = '+(6*k)+'.'}; }
function dsBtn9(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-4xl font-extrabold text-orange-600">'+bt+'</div>'; }
/* Phép tính (bảng 2–5, không có thừa số 6) có kết quả v — cho dạng "Xe tải cùng kết quả" (SGK: 6 × 3 và 2 × 9) */
function bang25(v){
  var o=[]; for(var x=2;x<=5;x++){ if(v%x===0 && v/x<=10 && v/x>=1 && v/x!==6) o.push(x+' × '+(v/x)); if(v*x<=50) o.push((v*x)+' : '+x); }
  return o;
}
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }

var BAI = {
 n: 9,
 title: 'Bảng Nhân 6, Bảng Chia 6',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 muctieu: [
  {id:'MT1', ten:'Ý nghĩa phép nhân', muc:['Đếm các nhóm 6 bằng phép cộng các số 6 (2–3 nhóm).', 'Nhận ra phép nhân 6 × n trong tình huống có nhiều nhóm bằng nhau.', 'Làm ngược: biết tổng, tìm số nhóm; nhận ra cách viết sai.']},
  {id:'MT2', ten:'Bảng nhân 6', muc:['Nhớ 6 × 1 đến 6 × 5.', 'Nhớ cả bảng nhân 6, đổi chỗ thừa số, nhận ra kết quả sai.', 'Dùng kết quả đã biết để tính nhanh (6 × 7 = 6 × 6 + 6), tìm lỗi sai của bạn.']},
  {id:'MT3', ten:'Bảng chia 6', muc:['Chia nhẩm cho 6 với số nhỏ (12 : 6 … 30 : 6).', 'Chia nhẩm cả bảng chia 6; từ phép nhân suy ra phép chia.', 'Từ một phép nhân suy ra cả hai phép chia; tìm số bị chia.']},
  {id:'MT4', ten:'Liên hệ phép tính', muc:['Nhận ra đổi chỗ thừa số không đổi kết quả; đếm thêm 6.', 'Tìm phép tính ở bảng khác cùng kết quả; tính hai bước liên tiếp.', 'Tính liên tiếp ba bước; hiểu 6 × 5 = 6 × 4 + 6.']},
  {id:'MT5', ten:'Giải toán', muc:['Bài toán một phép nhân với số nhỏ, có hình để đếm.', 'Bài toán chia thành các phần bằng nhau; chọn đúng phép tính.', 'Bài toán hai bước.']}
 ],
 topics: [
  /* D1 — Bọ rùa → phép nhân (Khám phá a) */
  {name:'Bọ rùa', sec:'Khám phá — Mỗi con bọ rùa có 6 chấm', mt:['MT1'], levels:3,
   muc:['Đếm chấm của 2–3 con bằng phép cộng các số 6.', 'Chọn phép nhân đúng cho 4–6 con bọ rùa.', 'Biết tổng số chấm, tìm số con bọ rùa.'],
   make:function(lv){
    if(lv>=3){ var m=rnd(3,9);
      return {type:'num', _e:m, q:'<div class="flex justify-center mb-2">'+ladybug(72)+'</div><div>Mỗi con bọ rùa có 6 chấm ở cánh. Đếm được tất cả '+(6*m)+' chấm.</div><div class="mt-1">Hỏi có mấy con bọ rùa?</div>', ans:m, unit:'con',
        sai:nhanSai([[6*m,'chon-sai-phep'],[m-1,'lech-nhom'],[m+1,'lech-nhom']], m), goiY:{'chon-sai-phep':'Bé tìm xem 6 × mấy = '+(6*m)+'.'}}; }
    var n = lv<=1 ? rnd(2,3) : rnd(4,6), bugs=[]; for(var i=0;i<n;i++) bugs.push(ladybug());
    if(lv<=1){ var add=[]; for(var j=0;j<n;j++) add.push('6');
      return {type:'num', _e:6*n, q:xepHang(bugs, 4)+'<div class="text-slate-600 text-base mb-2">Mỗi con bọ rùa có 6 chấm ở cánh. Có '+n+' con bọ rùa.</div>'
        +'<div class="text-xl">'+add.join(' + ')+' = ?</div><div class="text-slate-500 text-base mt-1">(tức là 6 × '+n+')</div>', ans:6*n, unit:'chấm',
        sai:nhanSai([[6+n,'cong-thay-nhan'],[6*(n-1),'lech-nhom'],[6*(n+1),'lech-nhom']], 6*n), goiY:{'cong-thay-nhan':'Có '+n+' con, mỗi con 6 chấm: cộng '+n+' số 6.'}}; }
    var dung='6 × '+n, ch=[dung, '6 + '+n, '6 × '+(n-1), '6 × '+(n+1)]; shuffle(ch);
    var sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)] = c.indexOf('+')>=0 ? 'cong-thay-nhan' : 'lech-nhom'; });
    return {type:'mcq', _dung:dung, q:xepHang(bugs, 4)+'<div>Phép tính nào cho biết số chấm của '+n+' con bọ rùa?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai};
  }, check:function(q){ return q.type==='mcq' ? kiemMCQ(q) : q.ans===q._e; }},

  /* D2 — Tổng các số 6 → phép nhân (Khám phá a) */
  {name:'Tổng số 6', sec:'Khám phá — Viết tổng các số 6 thành phép nhân', mt:['MT1'], levels:3,
   muc:['Viết tổng 2–3 số 6 thành phép nhân.', 'Viết tổng 5–7 số 6 thành phép nhân.', 'Nhận ra cách viết sai (đếm nhầm số các số 6).'],
   make:function(lv){
    var k = lv<=1 ? rnd(2,3) : (lv===2 ? rnd(5,7) : rnd(4,7)), a=[]; for(var i=0;i<k;i++) a.push('6');
    if(lv>=3){ var m = Math.random()<0.5 ? k : k+pick([-1,1]), dung = m===k ? 'Đ' : 'S';
      return {type:'mcq', figFn:dsBtn9, _dung:dung, q:'<div class="text-2xl font-extrabold text-orange-600 my-2">'+a.join(' + ')+' = 6 × '+m+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:(dung==='Đ'?0:1), sai:(dung==='Đ'?{}:{'0':'lech-nhom'}), goiY:{'lech-nhom':'Bé đếm lại xem có mấy số 6 nhé!'}}; }
    return {type:'num', _e:k, q:'<div class="text-2xl font-extrabold text-orange-600 my-2">'+a.join(' + ')+' = 6 ×'+oHoi()+'</div>', ans:k,
      sai:nhanSai([[k-1,'lech-nhom'],[k+1,'lech-nhom'],[6*k,'dao-vai']], k), goiY:{'lech-nhom':'Bé đếm lại xem có mấy số 6 nhé!', 'dao-vai':'Ô trống là số lần lấy 6, không phải kết quả.'}};
  }, check:function(q){ return q.type==='mcq' ? kiemMCQ(q) : q.ans===q._e; }},

  /* D3 — Tính nhẩm bảng nhân 6 (HĐ1a) */
  {name:'Nhân nhẩm', sec:'Hoạt động 1 — Tính nhẩm (bảng nhân 6)', mt:['MT2'], levels:3,
   muc:['Nhớ 6 × 1 đến 6 × 5.', 'Nhớ 6 × 6 đến 6 × 10, cả khi đổi chỗ thừa số.', 'Dùng kết quả đã biết để tính nhanh kết quả bên cạnh.'],
   make:function(lv){
    var k;
    if(lv<=1){ k=rnd(1,5); return {type:'num', _e:6*k, q:kyHieu('Tính nhẩm', '6 × '+k+' ='+oHoi()), ans:6*k, sai:saiNhan6(k), goiY:goiYNhan6(k)}; }
    if(lv===2){ k=pick([6,7,8,9,10,rnd(2,10)]); var bt = Math.random()<0.6 ? '6 × '+k : k+' × 6';
      return {type:'num', _e:6*k, q:kyHieu('Tính nhẩm', bt+' ='+oHoi()), ans:6*k, sai:saiNhan6(k), goiY:goiYNhan6(k)}; }
    k=rnd(3,9); var len=Math.random()<0.6, k2=len?k+1:k-1, kq=6*k2;
    return {type:'num', _e:kq, q:'<div class="text-slate-600 mb-1">Biết <b>6 × '+k+' = '+(6*k)+'</b>.</div>'+kyHieu('Vậy', '6 × '+k2+' ='+oHoi()), ans:kq,
      sai:nhanSai([[6*k,'sai-buoc'],[6*k+(len?1:-1),'sai-buoc'],[6+k2,'cong-thay-nhan']], kq), goiY:{'sai-buoc': len ? 'Thêm một lần 6 vào '+(6*k)+'.' : 'Bớt một lần 6 từ '+(6*k)+'.'}};
  }, check:function(q){ return q.ans===q._e; }},

  /* D4 — Hoàn thành bảng nhân 6 / hàng Tích (KP b, LT3a) */
  {name:'Bảng nhân', sec:'Khám phá — Hoàn thành bảng nhân 6', mt:['MT2'], levels:3,
   muc:['Điền các dòng đầu bảng nhân 6.', 'Điền các dòng cuối bảng, hoặc hàng Tích trong bảng nhiều cột.', 'Điền khi các dòng bên cạnh cũng bị che — phải nhớ, không đếm thêm.'],
   make:function(lv){
    if(lv<=2 && Math.random()<0.5){   /* bảng nhiều cột như LT3a */
      var ks=[], dsK = lv<=1 ? [1,2,3,4,5] : [6,7,8,9,10]; while(ks.length<5){ var x=pick(lv<=1?[1,2,3,4,5,6,7]:[2,3,4,5,6,7,8,9,10]); if(ks.indexOf(x)<0) ks.push(x); }
      var c=rnd(0,4), k=pick(dsK); if(ks.indexOf(k)>=0 && ks.indexOf(k)!==c) ks[ks.indexOf(k)]=ks[c]; ks[c]=k;
      var cot=ks.map(function(v){ return [6, v, 6*v]; });
      return {type:'num', _e:6*k, q:bangCot(['Thừa số','Thừa số','Tích'], cot, {c:c, r:2})+'<div class="mt-1">Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:6*k, sai:saiNhan6(k), goiY:goiYNhan6(k)};
    }
    var q=bnBang(6, lv, false); q._e=q.ans; q.sai=saiNhan6(q._k); q.goiY=goiYNhan6(q._k); return q;
  }, check:function(q){ return q.ans===q._e && q.ans%6===0; }},

  /* D5 — Tính nhẩm bảng chia 6 (HĐ1b, c) */
  {name:'Chia nhẩm', sec:'Hoạt động 1 — Tính nhẩm (bảng chia 6)', mt:['MT3'], levels:3,
   muc:['Chia nhẩm 12 : 6 đến 30 : 6.', 'Chia nhẩm 36 : 6 đến 60 : 6.', 'Từ một phép nhân suy ra phép chia cho thừa số kia (6 × 5 = 30 nên 30 : 5 = 6).'],
   make:function(lv){
    if(lv>=3){ var k=pick([2,3,4,5,7,8,9]);
      return {type:'num', _e:6, q:'<div class="text-slate-600 mb-1">Biết <b>6 × '+k+' = '+(6*k)+'</b>.</div>'+kyHieu('Vậy', (6*k)+' : '+k+' ='+oHoi()), ans:6,
        sai:nhanSai([[k,'dao-vai'],[6*k-k,'cong-thay-nhan']], 6), goiY:{'dao-vai':'Từ 6 × '+k+' = '+(6*k)+' ta có '+(6*k)+' : 6 = '+k+' và '+(6*k)+' : '+k+' = ?'}}; }
    var k2 = lv<=1 ? rnd(2,5) : rnd(6,10);
    return {type:'num', _e:k2, q:kyHieu('Tính nhẩm', (6*k2)+' : 6 ='+oHoi()), ans:k2, sai:saiChia6(k2), goiY:goiYChia6(k2)};
  }, check:function(q){ return q.ans===q._e; }},

  /* D6 — Từ phép nhân suy ra phép chia (Khám phá a: 6 × 4 = 24 → 24 : 6 = 4) */
  {name:'Nhân → chia', sec:'Khám phá — Từ phép nhân suy ra phép chia', mt:['MT3'], levels:3,
   muc:['Điền kết quả phép chia suy ra từ một phép nhân.', 'Chọn phép chia đúng suy ra từ một phép nhân.', 'Tìm phép tính KHÔNG suy ra được từ một phép nhân.'],
   make:function(lv){
    var k = lv<=1 ? rnd(2,6) : pick([3,4,5,7,8,9,10]), P=6*k, dau='<div class="text-2xl font-extrabold text-orange-600 my-2">6 × '+k+' = '+P+'</div>';
    if(lv<=1) return {type:'num', _e:k, q:dau+kyHieu('Vậy', P+' : 6 ='+oHoi()), ans:k, sai:nhanSai([[6,'dao-vai'],[P-6,'cong-thay-nhan']], k), goiY:{'dao-vai':'Trong 6 × '+k+' = '+P+', lấy '+P+' chia cho 6 được số nào?'}};
    var ch, dung;
    if(lv===2){ dung=P+' : 6 = '+k; ch=[dung, P+' : 6 = 6', P+' : '+k+' = '+k, k+' : 6 = '+P]; shuffle(ch);
      var sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='dao-vai'; });
      return {type:'mcq', cot:1, _dung:dung, q:dau+'<div>Từ phép nhân trên, phép chia nào đúng?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'dao-vai':'Từ 6 × '+k+' = '+P+': '+P+' : 6 = '+k+' và '+P+' : '+k+' = 6.'}}; }
    dung=P+' : 6 = 6'; ch=[dung, k+' × 6 = '+P, P+' : 6 = '+k, P+' : '+k+' = 6']; shuffle(ch);
    return {type:'mcq', cot:1, _dung:dung, q:dau+'<div>Phép tính nào <b>KHÔNG</b> suy ra được từ phép nhân trên?</div>', choices:ch, correct:ch.indexOf(dung),
      goiY:{'chung':'Từ 6 × '+k+' = '+P+' ta có: '+k+' × 6 = '+P+', '+P+' : 6 = '+k+', '+P+' : '+k+' = 6. Phép còn lại là sai.'}};
  }, check:function(q){ return q.type==='mcq' ? kiemMCQ(q) : q.ans===q._e; }},

  /* D7 — Bảng Số bị chia – Số chia – Thương (LT3b) */
  {name:'Bảng chia', sec:'Luyện tập 3 — Số? (số bị chia, số chia, thương)', mt:['MT3'], levels:3,
   muc:['Tìm thương trong bảng, số nhỏ.', 'Tìm thương trong bảng, số lớn (36 : 6 … 60 : 6).', 'Tìm số bị chia trong bảng.'],
   make:function(lv){
    var ks=[]; while(ks.length<5){ var x=rnd(2,10); if(ks.indexOf(x)<0) ks.push(x); }
    var c=rnd(0,4), k = lv<=1 ? rnd(2,5) : (lv===2 ? rnd(6,10) : rnd(2,10)); if(ks.indexOf(k)>=0 && ks.indexOf(k)!==c) ks[ks.indexOf(k)]=ks[c]; ks[c]=k;
    var cot=ks.map(function(v){ return [6*v, 6, v]; }), r = lv>=3 ? 0 : 2, ans = r===0 ? 6*k : k;
    var sai = r===0 ? nhanSai([[6*(k-1),'canh-dong'],[6*(k+1),'canh-dong'],[6+k,'cong-thay-nhan'],[k,'dao-vai']], ans) : saiChia6(k);
    return {type:'num', _e:ans, q:bangCot(['Số bị chia','Số chia','Thương'], cot, {c:c, r:r})+'<div class="mt-1">Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ans, sai:sai,
      goiY: r===0 ? {'canh-dong':'Số bị chia = thương × số chia = '+k+' × 6.', 'cong-thay-nhan':'Số bị chia = thương × số chia, không phải cộng.', 'dao-vai':'Ô trống là số bị chia: lấy thương nhân với số chia.'} : goiYChia6(k)};
  }, check:function(q){ return q.ans===q._e; }},

  /* D8 — Hai phép tính cùng kết quả: xe tải (HĐ2) */
  {name:'Xe tải', sec:'Hoạt động 2 — Hai phép tính nào có cùng kết quả?', mt:['MT4'], levels:3,
   muc:['Nhận ra đổi chỗ hai thừa số thì kết quả không đổi (6 × 5 = 5 × 6).', 'Tìm phép tính ở bảng khác có cùng kết quả (6 × 3 = 2 × 9; 12 : 6 = 6 : 3).', 'Hiểu cấu tạo bảng nhân: 6 × 5 = 6 × 4 + 6.'],
   make:function(lv){
    var target, V, dung, ds=[], sai={};
    function them(t){ var v=tinhBT(t); if(v!==V && v>0 && Number.isInteger(v) && ds.every(function(x){ return tinhBT(x)!==v; })) ds.push(t); }
    if(lv<=1){ var a=rnd(2,9); target='6 × '+a; V=6*a; dung=a+' × 6'; them('6 × '+(a>3?a-2:a+2)); them((a>5?a-4:a+3)+' × 6'); them('6 × '+(a>4?a-3:a+3)); }
    else if(lv===2){
      if(Math.random()<0.5){ var a2=rnd(1,5); target='6 × '+a2; V=6*a2; } else { var a3=rnd(2,8); target=(6*a3)+' : 6'; V=a3; }
      dung=pick(bang25(V)); [V-1,V+1,V+2,V-2,V+3,V-6,V+6].forEach(function(w){ if(w>=1){ var o=bang25(w); if(o.length) them(pick(o)); } });
    } else { var a4=rnd(3,9); target='6 × '+a4; V=6*a4; dung = Math.random()<0.5 ? '6 × '+(a4-1)+' + 6' : '6 × '+(a4+1)+' − 6';
      them('6 × '+(a4-1)+' + 1'); them('6 × '+(a4+1)+' + 6'); them('5 × '+a4+' + 6'); them('6 × '+a4+' + 6'); }
    shuffle(ds); var ch=[dung].concat(ds.slice(0, lv<=1?2:3)); shuffle(ch);
    ch.forEach(function(c,i){ if(c===dung) return; var v=tinhBT(c); sai[String(i)] = Math.abs(v-V)===6 ? 'canh-dong' : (c.indexOf('+ 1')>=0 ? 'sai-buoc' : ''); if(!sai[String(i)]) delete sai[String(i)]; });
    return {type:'mcq', figFn:truck, cot:(lv>=3?1:2), _dung:dung, _v:V, q:'<div class="mb-1">Phép tính trên xe tải nào có <b>cùng kết quả</b> với:</div><div class="flex justify-center my-2">'+truck(target)+'</div>',
      choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:{'chung':'Bé tính kết quả của '+target+' trước, rồi tính từng xe tải.', 'canh-dong':'Xe này hơn (kém) đúng 6. Bé tính lại '+target+' nhé!'}};
  }, check:function(q){ var c=q.choices.filter(function(x){ return tinhBT(x)===q._v; }).length; return c===1 && tinhBT(q.choices[q.correct])===q._v && kiemMCQ(q); }},

  /* D9 — Số còn thiếu trong dãy đếm thêm/bớt 6 (LT1) */
  {name:'Dãy số', sec:'Luyện tập 1 — Nêu các số còn thiếu', mt:['MT4'], levels:3,
   muc:['Đếm thêm 6 từ 6, tìm số ở đầu dãy.', 'Đếm thêm hoặc bớt 6, tìm số ở giữa dãy.', 'Dãy không bắt đầu từ 6 và ô bên cạnh bị che — dùng bước đếm 6.'],
   make:function(lv){
    var q=bnDaySo(6, lv, 'tron', 'thoi'), a=q.ans;
    q.sai=nhanSai([[a+6,'canh-dong'],[a-6,'canh-dong'],[a+1,'sai-buoc'],[a-1,'sai-buoc'],[a+5,'sai-buoc'],[a-5,'sai-buoc'],[a+7,'sai-buoc'],[a-7,'sai-buoc']], a);
    q.goiY={'canh-dong':'Bé đếm lại đúng vị trí ô có dấu ? nhé!', 'sai-buoc':'Mỗi ô hơn (hoặc kém) ô bên cạnh đúng 6.'};
    return q;
  }, check:bnKiemDay},

  /* D10 — Tính liên tiếp: con bướm → bông hoa (LT2: 6 × 4 : 3 : 2) */
  {name:'Bướm và hoa', sec:'Luyện tập 2 — Số? (tính liên tiếp)', mt:['MT4'], levels:3,
   muc:['Tính một bước: 6 × k.', 'Tính hai bước liên tiếp (nhân rồi chia).', 'Tính ba bước liên tiếp như SGK, hoặc tìm số ở bông hoa giữa.'],
   make:function(lv){
    var k, P, d1, d2, Q, R, i;
    if(lv<=1){ k=rnd(2,5); return {type:'num', _bt:'6 × '+k, q:chuoiBuom(6, ['× '+k], [null])+'<div>Số ở bông hoa là bao nhiêu?</div>', ans:6*k, sai:saiNhan6(k), goiY:goiYNhan6(k)}; }
    var dv=function(x){ var o=[]; for(i=2;i<=9;i++) if(x%i===0 && x/i>=2) o.push(i); return o; };
    do { k=rnd(2,9); P=6*k; d1=pick(dv(P)); Q=P/d1; } while(lv>=3 && !dv(Q).length);
    if(lv===2) return {type:'num', _bt:'6 × '+k+' : '+d1, q:chuoiBuom(6, ['× '+k, ': '+d1], [null,null])+'<div>Số ở bông hoa cuối cùng là bao nhiêu?</div>', ans:Q,
      sai:nhanSai([[P,'thieu-buoc']], Q), goiY:{'thieu-buoc':'Bé mới tính xong bông hoa đầu. Còn bước : '+d1+' nữa!'}};
    d2=pick(dv(Q)); R=Q/d2; var giua=Math.random()<0.3;
    return {type:'num', _bt: giua ? '6 × '+k+' : '+d1 : '6 × '+k+' : '+d1+' : '+d2, q:chuoiBuom(6, ['× '+k, ': '+d1, ': '+d2], [null,null,null])
      +'<div>Số ở bông hoa '+(giua?'<b>thứ hai</b>':'<b>cuối cùng</b>')+' là bao nhiêu?</div>', ans:(giua?Q:R),
      sai:(giua ? nhanSai([[P,'thieu-buoc'],[R,'dao-vai']], Q) : nhanSai([[P,'thieu-buoc'],[Q,'thieu-buoc']], R)), goiY:{'thieu-buoc':'Bé tính lần lượt từng mũi tên, đủ các bước nhé!', 'dao-vai':'Câu hỏi là bông hoa thứ hai.'}};
  }, check:function(q){ return q.ans===tinhBT(q._bt) && Number.isInteger(q.ans); }},

  /* D11 — Đúng hay sai? Tìm lỗi (dạng thêm, không có trong SGK) */
  {name:'Đúng / Sai', sec:'Tìm lỗi — Bạn tính đúng hay sai?', mt:['MT2','MT3'], levels:3,
   muc:['Nhận ra kết quả sai thô (cộng thay nhân).', 'Nhận ra kết quả sai tinh (nhầm dòng bên cạnh, nhầm bảng).', 'Chỉ ra lỗi của bạn và tìm kết quả đúng.'],
   make:function(lv, mt){
    var chia = (mt==='MT3'), k = lv<=1 ? rnd(2,5) : rnd(2,10), dung = chia ? k : 6*k, X, tag;
    var bt = chia ? (6*k)+' : 6' : '6 × '+k;
    var loaiSai = lv<=1 ? [[chia ? 6*k-6 : 6+k, 'cong-thay-nhan']]
      : (chia ? [[k-1,'canh-dong'],[k+1,'canh-dong']] : [[6*(k-1),'canh-dong'],[6*(k+1),'canh-dong'],[7*k,'nham-bang']]);
    var ls=pick(loaiSai.filter(function(p){ return p[0]>0 && p[0]!==dung; }));
    if(lv>=3){ X=ls[0]; tag=ls[1];
      return {type:'num', mt:(chia?'MT3':'MT2'), _e:dung, q:'<div class="flex justify-center mb-1">'+anh('boy', 72, 'Bạn An')+'</div><div>Bạn An tính: <b class="text-orange-600">'+bt+' = '+X+'</b>. An tính sai rồi!</div><div class="mt-1">Kết quả đúng là bao nhiêu?</div>',
        ans:dung, sai:nhanSai([[X, tag]], dung), goiY: chia ? goiYChia6(k) : goiYNhan6(k)}; }
    var laDung=Math.random()<0.5; X = laDung ? dung : ls[0]; tag = laDung ? '' : ls[1];
    var sai = laDung ? {} : {'0': tag};
    var gy = chia ? goiYChia6(k) : goiYNhan6(k); gy.chung = laDung ? 'Phép tính này đúng. Bé nhẩm lại bảng '+(chia?'chia':'nhân')+' 6 nhé!' : 'Bé nhẩm lại '+bt+' nhé!';
    return {type:'mcq', mt:(chia?'MT3':'MT2'), figFn:dsBtn9, _dung:(laDung?'Đ':'S'), _X:X, _k:k, _chia:chia,
      q:'<div class="text-3xl font-extrabold text-orange-600 my-2">'+bt+' = '+X+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(laDung?0:1), sai:sai, goiY:gy};
  }, check:function(q){ if(q.type==='num') return q.ans===q._e; var d = q._chia ? q._k : 6*q._k; return kiemMCQ(q) && (q._dung==='Đ') === (q._X===d); }},

  /* D12 — Toán có lời: hộp bút (LT4), thanh gỗ (LT5) */
  {name:'Giải toán', sec:'Luyện tập 4, 5 — Giải toán', mt:['MT5'], levels:3,
   muc:['Bài toán một phép nhân với số nhỏ, có hình để đếm.', 'Bài toán chia thành phần bằng nhau (thanh gỗ), hoặc phép nhân số lớn hơn.', 'Bài toán hai bước.'],
   make:function(lv){
    var n, hops='', i;
    if(lv<=1){ n=rnd(2,4); for(i=0;i<n;i++) hops+=hopBut(6);
      return {type:'num', _e:6*n, q:'<div class="flex justify-center gap-2 mb-2 flex-wrap">'+hops+'</div><div>Mỗi hộp có 6 chiếc bút chì màu. Hỏi '+n+' hộp như thế có bao nhiêu chiếc bút chì màu?</div>', ans:6*n, unit:'chiếc',
        sai:nhanSai([[6+n,'cong-thay-nhan'],[6*(n-1),'lech-nhom'],[6*(n+1),'lech-nhom']], 6*n), goiY:{'cong-thay-nhan':n+' hộp, mỗi hộp 6 chiếc: 6 × '+n+'.'}}; }
    var k=rnd(4,10);
    if(lv===2){
      if(Math.random()<0.6) return {type:'num', _e:k, q:'<div class="flex justify-center mb-2">'+thanhGo(6, 6*k)+'</div><div>Một thanh gỗ dài '+(6*k)+' cm được cưa thành 6 đoạn bằng nhau. Hỏi mỗi đoạn gỗ dài bao nhiêu xăng-ti-mét?</div>', ans:k, unit:'cm',
        sai:nhanSai([[6*k-6,'cong-thay-nhan'],[36*k,'chon-sai-phep'],[k-1,'canh-dong'],[k+1,'canh-dong']], k), goiY:{'chon-sai-phep':'Cưa thành các đoạn bằng nhau thì dùng phép chia.', 'canh-dong':'Bé nhẩm: 6 × mấy = '+(6*k)+'?'}};
      n=rnd(5,9); return {type:'num', _e:6*n, q:'<div class="flex justify-center mb-2">'+hopBut(6)+'</div><div>Mỗi hộp có 6 chiếc bút chì màu. Hỏi '+n+' hộp như thế có bao nhiêu chiếc bút chì màu?</div>', ans:6*n, unit:'chiếc',
        sai:saiNhan6(n), goiY:goiYNhan6(n)};
    }
    if(Math.random()<0.5){ n=rnd(3,8); var m=rnd(2,6*n-2);
      return {type:'num', _e:6*n-m, q:'<div class="flex justify-center mb-2">'+hopBut(6)+'</div><div>Lớp mua '+n+' hộp bút chì màu, mỗi hộp 6 chiếc. Các bạn đã dùng '+m+' chiếc. Hỏi còn lại bao nhiêu chiếc bút chì màu?</div>', ans:6*n-m, unit:'chiếc',
        sai:nhanSai([[6*n,'thieu-buoc'],[6*n+m,'chon-sai-phep']], 6*n-m), goiY:{'thieu-buoc':'Bé đã tìm được số bút đã mua. Còn bước trừ đi số bút đã dùng!', 'chon-sai-phep':'Đã dùng thì số bút còn lại ít đi: dùng phép trừ.'}}; }
    var h=rnd(2,4);
    return {type:'num', _e:h*k, q:'<div class="flex justify-center mb-2">'+thanhGo(6, 6*k)+'</div><div>Một thanh gỗ dài '+(6*k)+' cm được cưa thành 6 đoạn bằng nhau. Hỏi '+h+' đoạn gỗ như thế dài bao nhiêu xăng-ti-mét?</div>', ans:h*k, unit:'cm',
      sai:nhanSai([[k,'thieu-buoc'],[6*k,'thieu-buoc']], h*k), goiY:{'thieu-buoc':'Bước 1: tìm một đoạn dài bao nhiêu. Bước 2: tìm '+h+' đoạn.'}};
  }, check:function(q){ return q.ans===q._e && q.ans>0; }},

  /* D13 — Chọn phép tính cho bài toán (dạng thêm, không có trong SGK) */
  {name:'Chọn phép tính', sec:'Chọn phép tính — không cần tính ra kết quả', mt:['MT5'], levels:3,
   muc:['Chọn phép nhân cho tình huống gộp nhiều nhóm bằng nhau.', 'Chọn phép chia cho tình huống chia thành các phần bằng nhau.', 'Chọn biểu thức cho bài toán hai bước.'],
   make:function(lv){
    var ds, q, hinh;   /* ds = [[lựa chọn, nhãn lỗi]] — phần tử đầu là đáp án đúng; hinh = hình gợi tình huống (không có số để đếm) */
    if(lv<=1){ var n=rnd(2,9), ctx=pick([['Mỗi hộp có 6 chiếc bút chì màu. Có '+n+' hộp bút.','số bút chì màu',hopBut(6,52)],['Mỗi bó hoa có 6 bông. Có '+n+' bó hoa.','số bông hoa',anh('bouquet',56)],['Mỗi con bọ rùa có 6 chấm. Có '+n+' con bọ rùa.','số chấm',ladybug(52)]]);
      ds=[['6 × '+n,''], ['6 + '+n,'cong-thay-nhan'], [(6*n)+' : 6','chon-sai-phep']]; hinh=ctx[2]; q='<div>'+ctx[0]+'</div><div class="mt-1">Phép tính nào tìm được <b>'+ctx[1]+'</b>?</div>'; }
    else if(lv===2){ var k=rnd(3,10), P=6*k, ct=pick([['Có '+P+' bông hoa, bó đều thành 6 bó.','số bông hoa mỗi bó',anh('bouquet',56)],['Một thanh gỗ dài '+P+' cm cưa thành 6 đoạn bằng nhau.','độ dài mỗi đoạn',thanhGo(6,P)],['Có '+P+' học sinh xếp đều thành 6 hàng.','số học sinh mỗi hàng',anh('girl',52)+anh('boy',52)]]);
      ds=[[P+' : 6',''], [P+' × 6','chon-sai-phep'], [P+' − 6','cong-thay-nhan'], ['6 : '+P,'dao-vai']]; hinh=ct[2]; q='<div>'+ct[0]+'</div><div class="mt-1">Phép tính nào tìm được <b>'+ct[1]+'</b>?</div>'; }
    else { var n3=rnd(3,8), m3=rnd(2,9); if(m3===n3) m3=n3+1;
      ds=[['6 × '+n3+' − '+m3,''], ['6 × '+n3+' + '+m3,'chon-sai-phep'], ['6 + '+n3+' − '+m3,'cong-thay-nhan'], ['6 × '+m3+' − '+n3,'dao-vai']]; hinh=hopBut(6,52);
      q='<div>Lớp mua '+n3+' hộp bút chì màu, mỗi hộp 6 chiếc. Các bạn đã dùng '+m3+' chiếc.</div><div class="mt-1">Phép tính nào tìm được <b>số bút còn lại</b>?</div>'; }
    var dung=ds[0][0]; shuffle(ds);
    var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, _dung:dung, q:'<div class="flex justify-center gap-1 mb-2">'+hinh+'</div>'+q, choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'chon-sai-phep':'Gộp nhiều nhóm bằng nhau: phép nhân. Chia thành phần bằng nhau: phép chia. Bớt đi: phép trừ.', 'cong-thay-nhan':'Có nhiều nhóm bằng nhau thì dùng phép nhân (hoặc chia), không phải cộng, trừ với 6.', 'dao-vai':'Bé xem lại: số nào là số hộp, số nào là số bút mỗi hộp?'}};
  }, check:kiemMCQ}
 ]
};
